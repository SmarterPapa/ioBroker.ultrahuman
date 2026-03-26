import * as utils from "@iobroker/adapter-core";
import {
    fetchMetrics,
    parseSleepData,
    computeTimeSeriesStats,
    UltrahumanApiError,
} from "./lib/ultrahuman-api";
import type { MetricData } from "./lib/types";

/** State roles: https://github.com/ioBroker/ioBroker.docs/blob/master/docs/en/dev/stateroles.md */
type StateDef = {
    id: string;
    name: string;
    type: ioBroker.CommonType;
    role: string;
    unit?: string;
};

const ULTRAHUMAN_STATE_DEFS: StateDef[] = [
    { id: "sleep.bedtimeStart", name: "Bedtime start", type: "string", role: "date" },
    { id: "sleep.bedtimeEnd", name: "Bedtime end", type: "string", role: "date" },
    { id: "sleep.timeInBed", name: "Time in bed", type: "number", role: "value", unit: "min" },
    { id: "sleep.timeAsleep", name: "Time asleep", type: "number", role: "value", unit: "min" },
    { id: "sleep.timeToFallAsleep", name: "Time to fall asleep", type: "number", role: "value", unit: "min" },
    { id: "sleep.sleepEfficiency", name: "Sleep efficiency", type: "number", role: "value", unit: "%" },
    { id: "sleep.sleepScore", name: "Sleep score", type: "number", role: "value" },
    { id: "sleep.sleepQuality", name: "Sleep quality", type: "string", role: "text" },
    { id: "sleep.remSleep", name: "REM sleep", type: "number", role: "value", unit: "min" },
    { id: "sleep.deepSleep", name: "Deep sleep", type: "number", role: "value", unit: "min" },
    { id: "sleep.lightSleep", name: "Light sleep", type: "number", role: "value", unit: "min" },
    { id: "sleep.restorativeSleep", name: "Restorative sleep (REM + deep)", type: "number", role: "value", unit: "%" },
    { id: "sleep.sleepCycles", name: "Full sleep cycles", type: "number", role: "value" },
    { id: "sleep.tossesAndTurns", name: "Tosses and turns", type: "number", role: "value" },
    { id: "heart.restingHR", name: "Resting heart rate", type: "number", role: "value", unit: "bpm" },
    { id: "heart.nightRHR", name: "Night resting heart rate", type: "number", role: "value", unit: "bpm" },
    { id: "heart.lastReading", name: "Last HR reading", type: "number", role: "value.health.bpm", unit: "bpm" },
    { id: "heart.avg", name: "Average heart rate", type: "number", role: "value", unit: "bpm" },
    { id: "heart.min", name: "Minimum heart rate", type: "number", role: "value.min", unit: "bpm" },
    { id: "heart.max", name: "Maximum heart rate", type: "number", role: "value.max", unit: "bpm" },
    { id: "heart.trend", name: "Heart rate trend", type: "string", role: "text" },
    { id: "hrv.average", name: "Average HRV", type: "number", role: "time.interval", unit: "ms" },
    { id: "hrv.sleepHRV", name: "Average sleep HRV", type: "number", role: "time.interval", unit: "ms" },
    { id: "hrv.min", name: "Minimum HRV", type: "number", role: "value.min", unit: "ms" },
    { id: "hrv.max", name: "Maximum HRV", type: "number", role: "value.max", unit: "ms" },
    { id: "hrv.trend", name: "HRV trend", type: "string", role: "text" },
    { id: "spo2.avg", name: "Average SpO2", type: "number", role: "value", unit: "%" },
    { id: "spo2.min", name: "Minimum SpO2", type: "number", role: "value.min", unit: "%" },
    { id: "spo2.max", name: "Maximum SpO2", type: "number", role: "value.max", unit: "%" },
    { id: "spo2.latest", name: "Latest SpO2 reading", type: "number", role: "value", unit: "%" },
    { id: "temperature.lastReading", name: "Last temperature reading", type: "number", role: "value.temperature", unit: "°C" },
    { id: "temperature.avg", name: "Average temperature", type: "number", role: "value", unit: "°C" },
    { id: "temperature.min", name: "Minimum temperature", type: "number", role: "value.temperature.min", unit: "°C" },
    { id: "temperature.max", name: "Maximum temperature", type: "number", role: "value.temperature.max", unit: "°C" },
    { id: "activity.steps", name: "Total steps", type: "number", role: "value.health.steps", unit: "steps" },
    { id: "activity.stepsAvg", name: "Average steps", type: "number", role: "value", unit: "steps" },
    { id: "activity.activeMinutes", name: "Active minutes", type: "number", role: "value", unit: "min" },
    { id: "activity.movementIndex", name: "Movement index", type: "number", role: "value" },
    { id: "activity.recoveryIndex", name: "Recovery index", type: "number", role: "value" },
    { id: "activity.vo2Max", name: "VO2 max", type: "number", role: "value", unit: "ml/kg/min" },
    { id: "activity.activityLevel", name: "Activity level", type: "string", role: "text" },
];

class Ultrahuman extends utils.Adapter {
    private pollingTimer: ioBroker.Interval | undefined = undefined;

    public constructor(options: Partial<utils.AdapterOptions> = {}) {
        super({ ...options, name: "ultrahuman" });
        this.on("ready", this.onReady.bind(this));
        this.on("unload", this.onUnload.bind(this));
    }

    private async onReady(): Promise<void> {
        await this.createObjectTree();
        await this.syncStateCommonMetadata();

        if (!this.config.apiSecret || !this.config.userEmail) {
            this.log.error("API secret and user email must be configured – open adapter settings");
            this.setState("info.connection", false, true);
            return;
        }

        const intervalMin = Math.max(this.config.pollingInterval || 30, 5);

        await this.poll();

        this.pollingTimer = this.setInterval(() => {
            void this.poll();
        }, intervalMin * 60 * 1000);
        this.log.info(`Polling every ${intervalMin} minutes`);
    }

    private onUnload(callback: () => void): void {
        try {
            if (this.pollingTimer !== undefined) {
                this.clearInterval(this.pollingTimer);
                this.pollingTimer = undefined;
            }
            this.setState("info.connection", false, true);
        } finally {
            callback();
        }
    }

    // ------------------------------------------------------------------
    // Object tree
    // ------------------------------------------------------------------

    private async createObjectTree(): Promise<void> {
        const channels: { id: string; name: string }[] = [
            { id: "sleep", name: "Sleep data" },
            { id: "heart", name: "Heart rate" },
            { id: "hrv", name: "Heart rate variability" },
            { id: "spo2", name: "Blood oxygen (SpO2)" },
            { id: "temperature", name: "Skin temperature" },
            { id: "activity", name: "Activity metrics" },
        ];

        for (const ch of channels) {
            await this.setObjectNotExistsAsync(ch.id, {
                type: "channel",
                common: { name: ch.name },
                native: {},
            });
        }

        await this.setObjectNotExistsAsync("info.lastUpdate", {
            type: "state",
            common: { name: "Last successful update", type: "string", role: "date", read: true, write: false, def: "" },
            native: {},
        });

        for (const s of ULTRAHUMAN_STATE_DEFS) {
            await this.setObjectNotExistsAsync(s.id, {
                type: "state",
                common: {
                    name: s.name,
                    type: s.type,
                    role: s.role,
                    ...(s.unit !== undefined ? { unit: s.unit } : {}),
                    read: true,
                    write: false,
                    def: s.type === "number" ? 0 : "",
                },
                native: {},
            });
        }
    }

    /** Align roles/units with ioBroker docs; updates existing installations after adapter upgrade. */
    private async syncStateCommonMetadata(): Promise<void> {
        for (const s of ULTRAHUMAN_STATE_DEFS) {
            await this.extendObjectAsync(s.id, {
                type: "state",
                common: {
                    name: s.name,
                    type: s.type,
                    role: s.role,
                    ...(s.unit !== undefined ? { unit: s.unit } : {}),
                    read: true,
                    write: false,
                },
            });
        }
        await this.extendObjectAsync("info.lastUpdate", {
            common: { role: "date", read: true, write: false },
        });
        await this.extendObjectAsync("info.connection", {
            common: {
                role: "indicator.reachable",
                name: "API connection status",
                type: "boolean",
                read: true,
                write: false,
            },
        });
    }

    // ------------------------------------------------------------------
    // Polling & data update
    // ------------------------------------------------------------------

    private async poll(): Promise<void> {
        const today = new Date();
        this.log.debug("Fetching metrics from Ultrahuman API...");

        let metrics: MetricData;
        try {
            metrics = await fetchMetrics(
                this.config.apiSecret,
                this.config.userEmail,
                today,
            );
        } catch (err) {
            await this.handleApiError(err);
            return;
        }

        this.setState("info.connection", true, true);

        try {
            await this.updateStates(metrics);
            this.setState("info.lastUpdate", new Date().toISOString(), true);
            this.log.debug("States updated successfully");
        } catch (err) {
            const message = err instanceof Error ? err.message : String(err);
            this.log.error(`Error processing metrics data: ${message}`);
        }
    }

    private async updateStates(metrics: MetricData): Promise<void> {
        const sleep = parseSleepData(metrics);
        if (sleep) {
            await this.setStateAsync("sleep.bedtimeStart", sleep.bedtimeStart, true);
            await this.setStateAsync("sleep.bedtimeEnd", sleep.bedtimeEnd, true);
            await this.setStateAsync("sleep.timeInBed", sleep.timeInBedMinutes, true);
            await this.setStateAsync("sleep.timeAsleep", sleep.timeAsleepMinutes, true);
            await this.setStateAsync("sleep.timeToFallAsleep", sleep.timeToFallAsleepMinutes, true);
            await this.setStateAsync("sleep.sleepEfficiency", sleep.sleepEfficiency, true);
            if (sleep.sleepScore != null) {
                await this.setStateAsync("sleep.sleepScore", sleep.sleepScore, true);
            }
            if (sleep.sleepQuality != null) {
                await this.setStateAsync("sleep.sleepQuality", sleep.sleepQuality, true);
            }
            await this.setStateAsync("sleep.remSleep", sleep.remSleepMinutes, true);
            await this.setStateAsync("sleep.deepSleep", sleep.deepSleepMinutes, true);
            await this.setStateAsync("sleep.lightSleep", sleep.lightSleepMinutes, true);
            if (sleep.restorativeSleepPercent != null) {
                await this.setStateAsync("sleep.restorativeSleep", sleep.restorativeSleepPercent, true);
            }
            if (sleep.sleepCycles != null) {
                await this.setStateAsync("sleep.sleepCycles", sleep.sleepCycles, true);
            }
            if (sleep.tossesAndTurns != null) {
                await this.setStateAsync("sleep.tossesAndTurns", sleep.tossesAndTurns, true);
            }
        }

        if (metrics.hr) {
            await this.setStateAsync("heart.lastReading", metrics.hr.last_reading, true);
            const hrStats = computeTimeSeriesStats(metrics.hr.values);
            if (hrStats) {
                await this.setStateAsync("heart.avg", hrStats.avg, true);
                await this.setStateAsync("heart.min", hrStats.min, true);
                await this.setStateAsync("heart.max", hrStats.max, true);
                await this.setStateAsync("heart.trend", hrStats.trend, true);
            }
        }
        if (metrics.night_rhr) {
            await this.setStateAsync("heart.nightRHR", metrics.night_rhr.avg, true);
        }
        if (metrics.sleep_rhr?.value != null) {
            await this.setStateAsync("heart.restingHR", metrics.sleep_rhr.value, true);
        }

        if (metrics.hrv) {
            await this.setStateAsync("hrv.average", metrics.hrv.avg, true);
            const hrvStats = computeTimeSeriesStats(metrics.hrv.values);
            if (hrvStats) {
                await this.setStateAsync("hrv.min", hrvStats.min, true);
                await this.setStateAsync("hrv.max", hrvStats.max, true);
                await this.setStateAsync("hrv.trend", hrvStats.trend, true);
            }
        }
        if (metrics.avg_sleep_hrv) {
            await this.setStateAsync("hrv.sleepHRV", metrics.avg_sleep_hrv.value, true);
        }

        if (metrics.spo2) {
            const spo2Stats = computeTimeSeriesStats(metrics.spo2.values);
            if (spo2Stats) {
                await this.setStateAsync("spo2.avg", spo2Stats.avg, true);
                await this.setStateAsync("spo2.min", spo2Stats.min, true);
                await this.setStateAsync("spo2.max", spo2Stats.max, true);
                await this.setStateAsync("spo2.latest", spo2Stats.latest ?? spo2Stats.avg, true);
            } else if (metrics.spo2.avg != null) {
                await this.setStateAsync("spo2.avg", metrics.spo2.avg, true);
                if (metrics.spo2.min != null) {
                    await this.setStateAsync("spo2.min", metrics.spo2.min, true);
                }
                if (metrics.spo2.max != null) {
                    await this.setStateAsync("spo2.max", metrics.spo2.max, true);
                }
            }
        }

        if (metrics.temp) {
            await this.setStateAsync("temperature.lastReading", metrics.temp.last_reading, true);
            const tempStats = computeTimeSeriesStats(metrics.temp.values);
            if (tempStats) {
                await this.setStateAsync("temperature.avg", tempStats.avg, true);
                await this.setStateAsync("temperature.min", tempStats.min, true);
                await this.setStateAsync("temperature.max", tempStats.max, true);
            }
        }

        if (metrics.steps) {
            await this.setStateAsync("activity.steps", metrics.steps.total, true);
            await this.setStateAsync("activity.stepsAvg", metrics.steps.avg, true);
            await this.setStateAsync("activity.activityLevel", classifyActivityLevel(metrics.steps.total), true);
        }
        if (metrics.active_minutes?.value != null) {
            await this.setStateAsync("activity.activeMinutes", metrics.active_minutes.value, true);
        }
        if (metrics.movement_index?.value != null) {
            await this.setStateAsync("activity.movementIndex", metrics.movement_index.value, true);
        }
        if (metrics.recovery_index?.value != null) {
            await this.setStateAsync("activity.recoveryIndex", metrics.recovery_index.value, true);
        }
        if (metrics.vo2_max?.value != null) {
            await this.setStateAsync("activity.vo2Max", metrics.vo2_max.value, true);
        }
    }

    // ------------------------------------------------------------------
    // Error handling
    // ------------------------------------------------------------------

    private async handleApiError(err: unknown): Promise<void> {
        this.setState("info.connection", false, true);

        if (err instanceof UltrahumanApiError) {
            if (err.statusCode === 401 || err.statusCode === 403) {
                this.log.error(err.message);
                return;
            }
            if (err.statusCode === 429) {
                this.log.warn(err.message);
                return;
            }
            this.log.error(`Ultrahuman API error: ${err.message}`);
            return;
        }

        if (err instanceof Error) {
            if (err.message.includes("ECONNREFUSED") || err.message.includes("ETIMEDOUT")) {
                this.log.warn(`Network error – will retry on next poll: ${err.message}`);
                return;
            }
            this.log.error(`Unexpected error: ${err.message}`);
            return;
        }

        this.log.error(`Unknown error: ${String(err)}`);
    }
}

function classifyActivityLevel(totalSteps: number): string {
    if (totalSteps >= 12000) {
        return "very_active";
    }
    if (totalSteps >= 8000) {
        return "active";
    }
    if (totalSteps >= 5000) {
        return "moderate";
    }
    return "sedentary";
}

if (require.main !== module) {
    module.exports = (options: Partial<utils.AdapterOptions> | undefined) =>
        new Ultrahuman(options);
} else {
    (() => new Ultrahuman())();
}
