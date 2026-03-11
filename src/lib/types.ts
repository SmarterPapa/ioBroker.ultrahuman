/**
 * TypeScript interfaces for the Ultrahuman Partner API response.
 * Derived from the Pydantic models in the ultrahuman-dashboard project
 * (https://github.com/mt-krainski/ultrahuman-dashboard) by Matt Krainski, MIT License.
 * Extended with additional metrics from the Ultrahuman Vision developer docs.
 */

export interface ValueTimestamp {
    value: number | null;
    timestamp: number;
}

export interface HRObject {
    day_start_timestamp: number;
    title: string;
    values: ValueTimestamp[];
    last_reading: number;
    unit: string;
}

export interface TempObject {
    day_start_timestamp: number;
    title: string;
    values: ValueTimestamp[];
    last_reading: number;
    unit: string;
}

export interface HRVObject {
    day_start_timestamp: number;
    title: string;
    values: ValueTimestamp[];
    subtitle: string;
    avg: number;
    trend_title?: string;
    trend_direction?: string;
}

export interface StepsObject {
    day_start_timestamp: number;
    values: ValueTimestamp[];
    subtitle: string;
    total: number;
    avg: number;
    trend_title?: string;
    trend_direction?: string;
}

export interface NightRHRObject {
    day_start_timestamp: number;
    title: string;
    values: ValueTimestamp[];
    subtitle: string;
    avg: number;
    trend_title?: string;
    trend_direction?: string;
}

export interface AvgSleepHRVObject {
    value: number;
    day_start_timestamp: number;
}

export interface GlucoseObject {
    day_start_timestamp: number;
    title: string;
    values: ValueTimestamp[];
}

export interface SingleValueMetric {
    day_start_timestamp: number;
    title?: string;
    value?: number;
}

export interface SpO2Object {
    day_start_timestamp: number;
    title?: string;
    values: ValueTimestamp[];
    avg?: number;
    min?: number;
    max?: number;
}

export interface ActiveMinutesObject {
    day_start_timestamp: number;
    title?: string;
    value?: number;
    values?: ValueTimestamp[];
}

export interface SleepGraphSegment {
    type: "awake" | "light" | "deep" | "rem";
    start: number;
    end: number;
}

export interface SleepObject {
    bedtime_start: number;
    bedtime_end: number;
    quick_metrics: unknown[];
    quick_metrics_tiled: unknown[];
    sleep_stages: unknown[];
    sleep_graph: { data: SleepGraphSegment[] };
    movement_graph: Record<string, unknown>;
    hr_graph: Record<string, unknown>;
    hrv_graph: Record<string, unknown>;
    temp_graph: Record<string, unknown>;
    respiratory_graph?: unknown;
    summary: unknown[];
    sleep_inertia_trend: Record<string, unknown>;
    sleep_inertia_interpretation: Record<string, unknown>;
    score_trend: Record<string, unknown>;
    index_tracking_params: unknown[];
    spo2?: Record<string, unknown>;
    toss_turn: Record<string, unknown>;
    sleep_cycles: Record<string, unknown>;
}

export interface MetricDataItem {
    type: string;
    object: unknown;
}

export interface UltrahumanApiResponse {
    data: {
        metric_data: MetricDataItem[];
    };
    error: unknown;
    status: number;
}

export interface MetricData {
    hr?: HRObject;
    temp?: TempObject;
    hrv?: HRVObject;
    steps?: StepsObject;
    night_rhr?: NightRHRObject;
    avg_sleep_hrv?: AvgSleepHRVObject;
    sleep?: SleepObject;
    glucose?: GlucoseObject;
    metabolic_score?: SingleValueMetric;
    glucose_variability?: SingleValueMetric;
    average_glucose?: SingleValueMetric;
    hba1c?: SingleValueMetric;
    time_in_target?: SingleValueMetric;
    recovery_index?: SingleValueMetric;
    movement_index?: SingleValueMetric;
    vo2_max?: SingleValueMetric;
    sleep_rhr?: SingleValueMetric;
    spo2?: SpO2Object;
    active_minutes?: ActiveMinutesObject;
}

export interface ParsedSleepData {
    bedtimeStart: string;
    bedtimeEnd: string;
    timeInBedMinutes: number;
    timeAsleepMinutes: number;
    timeToFallAsleepMinutes: number;
    sleepEfficiency: number;
    sleepScore: number | null;
    sleepQuality: "excellent" | "good" | "fair" | "poor" | null;
    remSleepMinutes: number;
    deepSleepMinutes: number;
    lightSleepMinutes: number;
    restorativeSleepPercent: number | null;
    sleepCycles: number | null;
    tossesAndTurns: number | null;
}

export interface TimeSeriesStats {
    count: number;
    avg: number;
    min: number;
    max: number;
    latest: number | null;
    trend: "rising" | "falling" | "stable";
}
