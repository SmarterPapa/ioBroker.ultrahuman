/**
 * Ultrahuman Partner API client.
 * API integration based on ultrahuman-dashboard by Matt Krainski (MIT License).
 * https://github.com/mt-krainski/ultrahuman-dashboard
 */
import axios, { AxiosError } from "axios";
import type {
    MetricData,
    MetricDataItem,
    ParsedSleepData,
    SleepObject,
    TimeSeriesStats,
    UltrahumanApiResponse,
    ValueTimestamp,
} from "./types";

const ULTRAHUMAN_PARTNER_API = "https://partner.ultrahuman.com/api/v1/metrics";
const REQUEST_TIMEOUT_MS = 15_000;

const CORE_SLEEP_MINUTES = 5 * 60 + 30;

export class UltrahumanApiError extends Error {
    public statusCode?: number;
    constructor(message: string, statusCode?: number) {
        super(message);
        this.name = "UltrahumanApiError";
        this.statusCode = statusCode;
    }
}

function formatDate(date: Date): string {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
}

export function transformMetricData(raw: UltrahumanApiResponse): MetricData {
    const result: MetricData = {};
    const items: MetricDataItem[] = raw.data?.metric_data ?? [];
    for (const item of items) {
        if (item.type && item.object != null) {
            const key = item.type.toLowerCase() as keyof MetricData;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (result as any)[key] = item.object;
        }
    }
    return result;
}

export async function fetchMetrics(
    apiSecret: string,
    userEmail: string,
    date: Date,
): Promise<MetricData> {
    let response;
    try {
        response = await axios.get<UltrahumanApiResponse>(ULTRAHUMAN_PARTNER_API, {
            params: {
                date: formatDate(date),
                email: userEmail,
            },
            headers: {
                Authorization: apiSecret,
            },
            timeout: REQUEST_TIMEOUT_MS,
        });
    } catch (err) {
        if (err instanceof AxiosError) {
            const status = err.response?.status;
            if (status === 401 || status === 403) {
                throw new UltrahumanApiError(
                    "Authentication failed – check your API secret and email",
                    status,
                );
            }
            if (status === 429) {
                throw new UltrahumanApiError(
                    "Rate limited by Ultrahuman API – try increasing the polling interval",
                    429,
                );
            }
            throw new UltrahumanApiError(
                `API request failed: ${err.message}`,
                status,
            );
        }
        throw err;
    }

    return transformMetricData(response.data);
}

// ---------------------------------------------------------------------------
// Time-series statistics
// ---------------------------------------------------------------------------

export function computeTimeSeriesStats(values: ValueTimestamp[]): TimeSeriesStats | null {
    const valid = values.filter((v) => v.value != null);
    if (valid.length === 0) return null;

    const nums = valid.map((v) => v.value as number);
    const sum = nums.reduce((a, b) => a + b, 0);
    const avg = sum / nums.length;
    const min = Math.min(...nums);
    const max = Math.max(...nums);
    const latest = nums[nums.length - 1] ?? null;

    const thirdLen = Math.max(1, Math.floor(nums.length / 3));
    const firstThirdAvg =
        nums.slice(0, thirdLen).reduce((a, b) => a + b, 0) / thirdLen;
    const lastThirdAvg =
        nums.slice(-thirdLen).reduce((a, b) => a + b, 0) / thirdLen;

    let trend: "rising" | "falling" | "stable" = "stable";
    if (firstThirdAvg > 0) {
        const change = (lastThirdAvg - firstThirdAvg) / firstThirdAvg;
        if (change > 0.05) trend = "rising";
        else if (change < -0.05) trend = "falling";
    }

    return {
        count: valid.length,
        avg: Math.round(avg * 10) / 10,
        min,
        max,
        latest,
        trend,
    };
}

// ---------------------------------------------------------------------------
// Sleep data parsing
// ---------------------------------------------------------------------------

function getCorrectedBedtimeEnd(sleep: SleepObject): number {
    let bedtimeEnd = sleep.bedtime_end;
    const segments = sleep.sleep_graph?.data ?? [];
    for (let i = segments.length - 1; i >= 0; i--) {
        const seg = segments[i];
        if (seg.type === "awake") {
            bedtimeEnd = seg.start;
            continue;
        }
        if (seg.end - seg.start > 300) {
            break;
        }
    }
    return bedtimeEnd;
}

function getTimeToFallAsleepSeconds(sleep: SleepObject): number {
    let seconds = 0;
    for (const seg of sleep.sleep_graph?.data ?? []) {
        const duration = seg.end - seg.start;
        if (seg.type === "awake") {
            seconds += duration;
            continue;
        }
        if (duration > 300) {
            break;
        }
        seconds += duration;
    }
    return seconds;
}

function getTimeAsleepSeconds(sleep: SleepObject): number {
    let seconds = 0;
    for (const seg of sleep.sleep_graph?.data ?? []) {
        if (seg.type !== "awake") {
            seconds += seg.end - seg.start;
        }
    }
    return seconds;
}

function getSleepStageMinutes(
    sleep: SleepObject,
    stageType: "rem" | "deep" | "light",
): number {
    let seconds = 0;
    for (const seg of sleep.sleep_graph?.data ?? []) {
        if (seg.type === stageType) {
            seconds += seg.end - seg.start;
        }
    }
    return Math.round(seconds / 60);
}

function countSleepCycles(sleep: SleepObject): number {
    const segments = sleep.sleep_graph?.data ?? [];
    let cycles = 0;
    let hadDeep = false;
    let hadRem = false;
    for (const seg of segments) {
        if (seg.type === "deep") hadDeep = true;
        if (seg.type === "rem") hadRem = true;
        if (hadDeep && hadRem) {
            cycles++;
            hadDeep = false;
            hadRem = false;
        }
    }
    return cycles;
}

function classifySleepQuality(
    score: number | null,
): "excellent" | "good" | "fair" | "poor" | null {
    if (score == null) return null;
    if (score >= 85) return "excellent";
    if (score >= 70) return "good";
    if (score >= 50) return "fair";
    return "poor";
}

function extractSleepScore(sleep: SleepObject): number | null {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const scoreTrend = sleep.score_trend as any;
    if (scoreTrend?.value != null) return scoreTrend.value;
    if (scoreTrend?.score != null) return scoreTrend.score;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const qm = sleep.quick_metrics as any[];
    if (Array.isArray(qm)) {
        for (const m of qm) {
            if (
                m?.title?.toLowerCase()?.includes("score") &&
                m?.value != null
            ) {
                return Number(m.value);
            }
        }
    }
    return null;
}

function extractTossesAndTurns(sleep: SleepObject): number | null {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tt = sleep.toss_turn as any;
    if (tt?.count != null) return tt.count;
    if (tt?.value != null) return tt.value;
    if (tt?.total != null) return tt.total;
    return null;
}

export function parseSleepData(metrics: MetricData): ParsedSleepData | null {
    const sleep = metrics.sleep;
    if (!sleep) return null;

    const bedtimeStartTs = sleep.bedtime_start;
    const bedtimeEndTs = getCorrectedBedtimeEnd(sleep);

    const timeInBedSec = bedtimeEndTs - bedtimeStartTs;
    const timeAsleepSec = getTimeAsleepSeconds(sleep);
    const timeToFallAsleepSec = getTimeToFallAsleepSeconds(sleep);

    const efficiency = timeInBedSec > 0 ? timeAsleepSec / timeInBedSec : 0;

    const remMin = getSleepStageMinutes(sleep, "rem");
    const deepMin = getSleepStageMinutes(sleep, "deep");
    const lightMin = getSleepStageMinutes(sleep, "light");
    const totalAsleepMin = Math.round(timeAsleepSec / 60);

    const restorativePercent =
        totalAsleepMin > 0
            ? Math.round(((remMin + deepMin) / totalAsleepMin) * 1000) / 10
            : null;

    const sleepScore = extractSleepScore(sleep);
    const sleepCycles = countSleepCycles(sleep);

    return {
        bedtimeStart: new Date(bedtimeStartTs * 1000).toISOString(),
        bedtimeEnd: new Date(bedtimeEndTs * 1000).toISOString(),
        timeInBedMinutes: Math.round(timeInBedSec / 60),
        timeAsleepMinutes: totalAsleepMin,
        timeToFallAsleepMinutes: Math.round(timeToFallAsleepSec / 60),
        sleepEfficiency: Math.round(efficiency * 1000) / 10,
        sleepScore,
        sleepQuality: classifySleepQuality(sleepScore),
        remSleepMinutes: remMin,
        deepSleepMinutes: deepMin,
        lightSleepMinutes: lightMin,
        restorativeSleepPercent: restorativePercent,
        sleepCycles: sleepCycles > 0 ? sleepCycles : null,
        tossesAndTurns: extractTossesAndTurns(sleep),
    };
}

export function isCoreSleep(asleepMinutes: number): boolean {
    return asleepMinutes >= CORE_SLEEP_MINUTES;
}
