"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.UltrahumanApiError = void 0;
exports.transformMetricData = transformMetricData;
exports.fetchMetrics = fetchMetrics;
exports.computeTimeSeriesStats = computeTimeSeriesStats;
exports.parseSleepData = parseSleepData;
exports.isCoreSleep = isCoreSleep;
/**
 * Ultrahuman Partner API client.
 * API integration based on ultrahuman-dashboard by Matt Krainski (MIT License).
 * https://github.com/mt-krainski/ultrahuman-dashboard
 */
const axios_1 = __importStar(require("axios"));
const ULTRAHUMAN_PARTNER_API = "https://partner.ultrahuman.com/api/v1/metrics";
const REQUEST_TIMEOUT_MS = 15_000;
const CORE_SLEEP_MINUTES = 5 * 60 + 30;
class UltrahumanApiError extends Error {
    statusCode;
    constructor(message, statusCode) {
        super(message);
        this.name = "UltrahumanApiError";
        this.statusCode = statusCode;
    }
}
exports.UltrahumanApiError = UltrahumanApiError;
function formatDate(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
}
function transformMetricData(raw) {
    const result = {};
    const items = raw.data?.metric_data ?? [];
    for (const item of items) {
        if (item.type && item.object != null) {
            const key = item.type.toLowerCase();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            result[key] = item.object;
        }
    }
    return result;
}
async function fetchMetrics(apiSecret, userEmail, date) {
    let response;
    try {
        response = await axios_1.default.get(ULTRAHUMAN_PARTNER_API, {
            params: {
                date: formatDate(date),
                email: userEmail,
            },
            headers: {
                Authorization: apiSecret,
            },
            timeout: REQUEST_TIMEOUT_MS,
        });
    }
    catch (err) {
        if (err instanceof axios_1.AxiosError) {
            const status = err.response?.status;
            if (status === 401 || status === 403) {
                throw new UltrahumanApiError("Authentication failed – check your API secret and email", status);
            }
            if (status === 429) {
                throw new UltrahumanApiError("Rate limited by Ultrahuman API – try increasing the polling interval", 429);
            }
            throw new UltrahumanApiError(`API request failed: ${err.message}`, status);
        }
        throw err;
    }
    return transformMetricData(response.data);
}
// ---------------------------------------------------------------------------
// Time-series statistics
// ---------------------------------------------------------------------------
function computeTimeSeriesStats(values) {
    const valid = values.filter((v) => v.value != null);
    if (valid.length === 0)
        return null;
    const nums = valid.map((v) => v.value);
    const sum = nums.reduce((a, b) => a + b, 0);
    const avg = sum / nums.length;
    const min = Math.min(...nums);
    const max = Math.max(...nums);
    const latest = nums[nums.length - 1] ?? null;
    const thirdLen = Math.max(1, Math.floor(nums.length / 3));
    const firstThirdAvg = nums.slice(0, thirdLen).reduce((a, b) => a + b, 0) / thirdLen;
    const lastThirdAvg = nums.slice(-thirdLen).reduce((a, b) => a + b, 0) / thirdLen;
    let trend = "stable";
    if (firstThirdAvg > 0) {
        const change = (lastThirdAvg - firstThirdAvg) / firstThirdAvg;
        if (change > 0.05)
            trend = "rising";
        else if (change < -0.05)
            trend = "falling";
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
function getCorrectedBedtimeEnd(sleep) {
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
function getTimeToFallAsleepSeconds(sleep) {
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
function getTimeAsleepSeconds(sleep) {
    let seconds = 0;
    for (const seg of sleep.sleep_graph?.data ?? []) {
        if (seg.type !== "awake") {
            seconds += seg.end - seg.start;
        }
    }
    return seconds;
}
function getSleepStageMinutes(sleep, stageType) {
    let seconds = 0;
    for (const seg of sleep.sleep_graph?.data ?? []) {
        if (seg.type === stageType) {
            seconds += seg.end - seg.start;
        }
    }
    return Math.round(seconds / 60);
}
function countSleepCycles(sleep) {
    const segments = sleep.sleep_graph?.data ?? [];
    let cycles = 0;
    let hadDeep = false;
    let hadRem = false;
    for (const seg of segments) {
        if (seg.type === "deep")
            hadDeep = true;
        if (seg.type === "rem")
            hadRem = true;
        if (hadDeep && hadRem) {
            cycles++;
            hadDeep = false;
            hadRem = false;
        }
    }
    return cycles;
}
function classifySleepQuality(score) {
    if (score == null)
        return null;
    if (score >= 85)
        return "excellent";
    if (score >= 70)
        return "good";
    if (score >= 50)
        return "fair";
    return "poor";
}
function extractSleepScore(sleep) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const scoreTrend = sleep.score_trend;
    if (scoreTrend?.value != null)
        return scoreTrend.value;
    if (scoreTrend?.score != null)
        return scoreTrend.score;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const qm = sleep.quick_metrics;
    if (Array.isArray(qm)) {
        for (const m of qm) {
            if (m?.title?.toLowerCase()?.includes("score") &&
                m?.value != null) {
                return Number(m.value);
            }
        }
    }
    return null;
}
function extractTossesAndTurns(sleep) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tt = sleep.toss_turn;
    if (tt?.count != null)
        return tt.count;
    if (tt?.value != null)
        return tt.value;
    if (tt?.total != null)
        return tt.total;
    return null;
}
function safeTimestampToISO(timestampSeconds) {
    if (timestampSeconds == null || !Number.isFinite(timestampSeconds) || timestampSeconds <= 0) {
        return null;
    }
    try {
        const date = new Date(timestampSeconds * 1000);
        if (isNaN(date.getTime())) {
            return null;
        }
        return date.toISOString();
    }
    catch {
        return null;
    }
}
function parseSleepData(metrics) {
    const sleep = metrics.sleep;
    if (!sleep)
        return null;
    const bedtimeStartTs = sleep.bedtime_start;
    const bedtimeEndTs = getCorrectedBedtimeEnd(sleep);
    // Validate timestamps before processing
    if (bedtimeStartTs == null || bedtimeEndTs == null ||
        !Number.isFinite(bedtimeStartTs) || !Number.isFinite(bedtimeEndTs) ||
        bedtimeStartTs <= 0 || bedtimeEndTs <= 0) {
        return null;
    }
    const bedtimeStartISO = safeTimestampToISO(bedtimeStartTs);
    const bedtimeEndISO = safeTimestampToISO(bedtimeEndTs);
    // If we can't convert timestamps to valid dates, skip this sleep data
    if (!bedtimeStartISO || !bedtimeEndISO) {
        return null;
    }
    const timeInBedSec = bedtimeEndTs - bedtimeStartTs;
    const timeAsleepSec = getTimeAsleepSeconds(sleep);
    const timeToFallAsleepSec = getTimeToFallAsleepSeconds(sleep);
    const efficiency = timeInBedSec > 0 ? timeAsleepSec / timeInBedSec : 0;
    const remMin = getSleepStageMinutes(sleep, "rem");
    const deepMin = getSleepStageMinutes(sleep, "deep");
    const lightMin = getSleepStageMinutes(sleep, "light");
    const totalAsleepMin = Math.round(timeAsleepSec / 60);
    const restorativePercent = totalAsleepMin > 0
        ? Math.round(((remMin + deepMin) / totalAsleepMin) * 1000) / 10
        : null;
    const sleepScore = extractSleepScore(sleep);
    const sleepCycles = countSleepCycles(sleep);
    return {
        bedtimeStart: bedtimeStartISO,
        bedtimeEnd: bedtimeEndISO,
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
function isCoreSleep(asleepMinutes) {
    return asleepMinutes >= CORE_SLEEP_MINUTES;
}
//# sourceMappingURL=ultrahuman-api.js.map