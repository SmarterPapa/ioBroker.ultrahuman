import type { MetricData, ParsedSleepData, TimeSeriesStats, UltrahumanApiResponse, ValueTimestamp } from "./types";
export declare class UltrahumanApiError extends Error {
    statusCode?: number;
    constructor(message: string, statusCode?: number);
}
export declare function transformMetricData(raw: UltrahumanApiResponse): MetricData;
export declare function fetchMetrics(apiSecret: string, userEmail: string, date: Date): Promise<MetricData>;
export declare function computeTimeSeriesStats(values: ValueTimestamp[]): TimeSeriesStats | null;
export declare function parseSleepData(metrics: MetricData): ParsedSleepData | null;
export declare function isCoreSleep(asleepMinutes: number): boolean;
//# sourceMappingURL=ultrahuman-api.d.ts.map