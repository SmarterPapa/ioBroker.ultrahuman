import { expect } from "chai";
import {
    transformMetricData,
    parseSleepData,
    computeTimeSeriesStats,
    isCoreSleep,
} from "../src/lib/ultrahuman-api";
import type { UltrahumanApiResponse, MetricData } from "../src/lib/types";

function makeSleepMetrics(overrides?: Partial<MetricData["sleep"]>): MetricData {
    const baseSleep = {
        bedtime_start: 1700000000,
        bedtime_end: 1700028800,
        quick_metrics: [],
        quick_metrics_tiled: [],
        sleep_stages: [],
        sleep_graph: {
            data: [
                { type: "awake" as const, start: 1700000000, end: 1700000600 },
                { type: "light" as const, start: 1700000600, end: 1700007200 },
                { type: "deep" as const, start: 1700007200, end: 1700014400 },
                { type: "rem" as const, start: 1700014400, end: 1700021600 },
                { type: "light" as const, start: 1700021600, end: 1700028800 },
            ],
        },
        movement_graph: {},
        hr_graph: {},
        hrv_graph: {},
        temp_graph: {},
        summary: [],
        sleep_inertia_trend: {},
        sleep_inertia_interpretation: {},
        score_trend: {},
        index_tracking_params: [],
        toss_turn: {},
        sleep_cycles: {},
    };
    return {
        sleep: { ...baseSleep, ...overrides } as MetricData["sleep"],
    };
}

describe("transformMetricData", () => {
    it("should transform metric_data array into keyed object", () => {
        const raw: UltrahumanApiResponse = {
            data: {
                metric_data: [
                    {
                        type: "HR",
                        object: {
                            day_start_timestamp: 1700000000,
                            title: "Heart Rate",
                            values: [{ value: 72, timestamp: 1700000100 }],
                            last_reading: 72,
                            unit: "bpm",
                        },
                    },
                    {
                        type: "STEPS",
                        object: {
                            day_start_timestamp: 1700000000,
                            values: [],
                            subtitle: "Daily",
                            total: 8500,
                            avg: 7200,
                        },
                    },
                    {
                        type: "VO2_MAX",
                        object: {
                            day_start_timestamp: 1700000000,
                            title: "VO2 Max",
                            value: 42,
                        },
                    },
                ],
            },
            error: null,
            status: 200,
        };

        const result = transformMetricData(raw);

        expect(result.hr).to.not.be.undefined;
        expect(result.hr!.last_reading).to.equal(72);
        expect(result.steps).to.not.be.undefined;
        expect(result.steps!.total).to.equal(8500);
        expect(result.vo2_max).to.not.be.undefined;
        expect(result.vo2_max!.value).to.equal(42);
    });

    it("should handle empty metric_data", () => {
        const raw: UltrahumanApiResponse = {
            data: { metric_data: [] },
            error: null,
            status: 200,
        };

        const result = transformMetricData(raw);
        expect(result.hr).to.be.undefined;
        expect(result.sleep).to.be.undefined;
    });

    it("should skip entries without object", () => {
        const raw: UltrahumanApiResponse = {
            data: {
                metric_data: [
                    { type: "HR", object: null },
                    {
                        type: "TEMP",
                        object: {
                            day_start_timestamp: 1700000000,
                            title: "Temperature",
                            values: [],
                            last_reading: 36.5,
                            unit: "°C",
                        },
                    },
                ],
            },
            error: null,
            status: 200,
        };

        const result = transformMetricData(raw);
        expect(result.hr).to.be.undefined;
        expect(result.temp).to.not.be.undefined;
        expect(result.temp!.last_reading).to.equal(36.5);
    });
});

describe("parseSleepData", () => {
    it("should return null when no sleep data present", () => {
        const result = parseSleepData({});
        expect(result).to.be.null;
    });

    it("should parse basic sleep data correctly", () => {
        const metrics = makeSleepMetrics();
        const result = parseSleepData(metrics);

        expect(result).to.not.be.null;
        expect(result!.bedtimeStart).to.be.a("string");
        expect(result!.bedtimeEnd).to.be.a("string");
        expect(result!.timeInBedMinutes).to.be.a("number");
        expect(result!.timeAsleepMinutes).to.be.a("number");
        expect(result!.timeToFallAsleepMinutes).to.be.a("number");
        expect(result!.sleepEfficiency).to.be.a("number");
    });

    it("should compute time to fall asleep from initial awake segment", () => {
        const metrics = makeSleepMetrics();
        const result = parseSleepData(metrics)!;
        expect(result.timeToFallAsleepMinutes).to.equal(10);
    });

    it("should calculate sleep efficiency", () => {
        const metrics = makeSleepMetrics();
        const result = parseSleepData(metrics)!;
        expect(result.sleepEfficiency).to.be.greaterThan(90);
        expect(result.sleepEfficiency).to.be.lessThanOrEqual(100);
    });

    it("should correct bedtime end by skipping trailing awake segments", () => {
        const metrics = makeSleepMetrics({
            sleep_graph: {
                data: [
                    { type: "light", start: 1700000000, end: 1700010000 },
                    { type: "deep", start: 1700010000, end: 1700020000 },
                    { type: "awake", start: 1700020000, end: 1700028800 },
                ],
            },
            bedtime_end: 1700028800,
        });

        const result = parseSleepData(metrics)!;
        const endDate = new Date(result.bedtimeEnd);
        expect(endDate.getTime() / 1000).to.equal(1700020000);
    });

    it("should compute sleep stage durations", () => {
        const metrics = makeSleepMetrics();
        const result = parseSleepData(metrics)!;

        // light1: 1700000600-1700007200 = 6600s = 110min
        // light2: 1700021600-1700028800 = 7200s = 120min → total 230min
        expect(result.remSleepMinutes).to.equal(120);
        expect(result.deepSleepMinutes).to.equal(120);
        expect(result.lightSleepMinutes).to.equal(230);
    });

    it("should compute restorative sleep percentage", () => {
        const metrics = makeSleepMetrics();
        const result = parseSleepData(metrics)!;
        // REM (120) + Deep (120) = 240 of 470 total ≈ 51.1%
        expect(result.restorativeSleepPercent).to.be.greaterThan(40);
        expect(result.restorativeSleepPercent).to.be.lessThan(60);
    });

    it("should count sleep cycles (deep + rem pairs)", () => {
        const metrics = makeSleepMetrics();
        const result = parseSleepData(metrics)!;
        expect(result.sleepCycles).to.equal(1);
    });

    it("should extract sleep score from score_trend", () => {
        const metrics = makeSleepMetrics({
            score_trend: { value: 82 },
        });
        const result = parseSleepData(metrics)!;
        expect(result.sleepScore).to.equal(82);
        expect(result.sleepQuality).to.equal("good");
    });

    it("should classify sleep quality correctly", () => {
        const excellent = makeSleepMetrics({ score_trend: { value: 90 } });
        expect(parseSleepData(excellent)!.sleepQuality).to.equal("excellent");

        const fair = makeSleepMetrics({ score_trend: { value: 55 } });
        expect(parseSleepData(fair)!.sleepQuality).to.equal("fair");

        const poor = makeSleepMetrics({ score_trend: { value: 30 } });
        expect(parseSleepData(poor)!.sleepQuality).to.equal("poor");
    });

    it("should extract tosses and turns count", () => {
        const metrics = makeSleepMetrics({
            toss_turn: { count: 15 },
        });
        const result = parseSleepData(metrics)!;
        expect(result.tossesAndTurns).to.equal(15);
    });
});

describe("computeTimeSeriesStats", () => {
    it("should return null for empty values", () => {
        expect(computeTimeSeriesStats([])).to.be.null;
    });

    it("should return null when all values are null", () => {
        const values = [
            { value: null, timestamp: 1000 },
            { value: null, timestamp: 2000 },
        ];
        expect(computeTimeSeriesStats(values)).to.be.null;
    });

    it("should compute correct stats", () => {
        const values = [
            { value: 60, timestamp: 1000 },
            { value: 70, timestamp: 2000 },
            { value: 80, timestamp: 3000 },
            { value: 90, timestamp: 4000 },
            { value: 100, timestamp: 5000 },
            { value: 110, timestamp: 6000 },
        ];
        const stats = computeTimeSeriesStats(values)!;
        expect(stats.count).to.equal(6);
        expect(stats.avg).to.equal(85);
        expect(stats.min).to.equal(60);
        expect(stats.max).to.equal(110);
        expect(stats.latest).to.equal(110);
        expect(stats.trend).to.equal("rising");
    });

    it("should detect falling trend", () => {
        const values = [
            { value: 100, timestamp: 1000 },
            { value: 95, timestamp: 2000 },
            { value: 90, timestamp: 3000 },
            { value: 70, timestamp: 4000 },
            { value: 65, timestamp: 5000 },
            { value: 60, timestamp: 6000 },
        ];
        const stats = computeTimeSeriesStats(values)!;
        expect(stats.trend).to.equal("falling");
    });

    it("should detect stable trend", () => {
        const values = [
            { value: 70, timestamp: 1000 },
            { value: 71, timestamp: 2000 },
            { value: 69, timestamp: 3000 },
            { value: 70, timestamp: 4000 },
            { value: 71, timestamp: 5000 },
            { value: 70, timestamp: 6000 },
        ];
        const stats = computeTimeSeriesStats(values)!;
        expect(stats.trend).to.equal("stable");
    });
});

describe("isCoreSleep", () => {
    it("should return true for 6 hours of sleep", () => {
        expect(isCoreSleep(360)).to.be.true;
    });

    it("should return false for 4 hours of sleep", () => {
        expect(isCoreSleep(240)).to.be.false;
    });

    it("should return true at exactly 5h30m", () => {
        expect(isCoreSleep(330)).to.be.true;
    });
});
