import type { MetricData, ParsedSleepData, TimeSeriesStats, UltrahumanApiResponse, ValueTimestamp } from "./types";
export declare class UltrahumanApiError extends Error {
    statusCode?: number;
    constructor(message: string, statusCode?: number);
}
export declare function transformMetricData(raw: UltrahumanApiResponse): MetricData;
export interface ApiKeyAuth {
    mode: "apikey";
    apiSecret: string;
    userEmail: string;
}
export interface OAuthAuth {
    mode: "oauth";
    accessToken: string;
}
export type AuthConfig = ApiKeyAuth | OAuthAuth;
export declare function fetchMetrics(auth: AuthConfig, date: Date): Promise<MetricData>;
export declare function computeTimeSeriesStats(values: ValueTimestamp[]): TimeSeriesStats | null;
export declare function parseSleepData(metrics: MetricData): ParsedSleepData | null;
export declare function isCoreSleep(asleepMinutes: number): boolean;
//# sourceMappingURL=ultrahuman-api.d.ts.map