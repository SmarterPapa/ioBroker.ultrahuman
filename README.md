<p align="center">
  <a href="https://smarterpapa.de">
    <img src="admin/smarterpapa-logo.png" alt="SmarterPapa" width="120" />
  </a>
</p>

<p align="center">
  <img src="admin/ultrahuman.png" alt="Ultrahuman" width="100" />
</p>

# ioBroker.ultrahuman

[![License](https://img.shields.io/github/license/SmarterPapa/ioBroker.ultrahuman)](https://github.com/SmarterPapa/ioBroker.ultrahuman/blob/main/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/SmarterPapa/ioBroker.ultrahuman)](https://github.com/SmarterPapa/ioBroker.ultrahuman/issues)

## Ultrahuman Ring Adapter for ioBroker

This adapter reads health metrics from your **Ultrahuman Ring** via the [Ultrahuman Partner API](https://blog.ultrahuman.com/blog/accessing-the-ultrahuman-partnership-api/) and creates ioBroker objects you can use in visualizations, scripts, and automations.

### Installation

**From GitHub (recommended for now):**
```
iobroker url https://github.com/SmarterPapa/ioBroker.ultrahuman
```

### Available metrics

| Channel           | State              | Description                   | Unit     |
|-------------------|--------------------|-------------------------------|----------|
| `sleep`           | `bedtimeStart`     | Time you went to bed          | ISO 8601 |
| `sleep`           | `bedtimeEnd`       | Time you got up               | ISO 8601 |
| `sleep`           | `timeInBed`        | Total time in bed             | min      |
| `sleep`           | `timeAsleep`       | Total time asleep             | min      |
| `sleep`           | `timeToFallAsleep` | How long it took to fall asleep | min    |
| `sleep`           | `sleepEfficiency`  | Sleep efficiency              | %        |
| `sleep`           | `sleepScore`       | Sleep score                   |          |
| `sleep`           | `sleepQuality`     | Sleep quality (excellent/good/fair/poor) |  |
| `sleep`           | `remSleep`         | REM sleep duration            | min      |
| `sleep`           | `deepSleep`        | Deep sleep duration           | min      |
| `sleep`           | `lightSleep`       | Light sleep duration          | min      |
| `sleep`           | `restorativeSleep` | Restorative sleep (REM + deep) | %       |
| `sleep`           | `sleepCycles`      | Full sleep cycles             |          |
| `heart`           | `restingHR`        | Resting heart rate (sleep)    | bpm      |
| `heart`           | `nightRHR`         | Night resting heart rate      | bpm      |
| `heart`           | `lastReading`      | Last HR reading               | bpm      |
| `heart`           | `avg` / `min` / `max` | Heart rate statistics      | bpm      |
| `heart`           | `trend`            | Heart rate trend              |          |
| `hrv`             | `average`          | Average HRV                   | ms       |
| `hrv`             | `sleepHRV`         | Average sleep HRV             | ms       |
| `hrv`             | `min` / `max`      | HRV statistics                | ms       |
| `hrv`             | `trend`            | HRV trend                     |          |
| `spo2`            | `avg` / `min` / `max` | Blood oxygen statistics    | %        |
| `temperature`     | `lastReading`      | Last skin temperature         | °C       |
| `temperature`     | `avg` / `min` / `max` | Temperature statistics     | °C       |
| `activity`        | `steps`            | Total steps today             | steps    |
| `activity`        | `stepsAvg`         | Average steps                 | steps    |
| `activity`        | `activeMinutes`    | Active minutes                | min      |
| `activity`        | `movementIndex`    | Movement index                |          |
| `activity`        | `recoveryIndex`    | Recovery index                |          |
| `activity`        | `vo2Max`           | VO2 max                       | ml/kg/min|
| `info`            | `connection`       | API connection status         | boolean  |
| `info`            | `lastUpdate`       | Last successful update        | ISO 8601 |

### Prerequisites

You need access to the **Ultrahuman Partner API**:

1. Send an email to **feedback@ultrahuman.com** and request API access for personal use.
2. You will receive an **API Key** and an **Access Code**.
3. In the Ultrahuman app, go to **Profile > Settings > Partner ID** and enter the **Access Code**.
4. Configure the **API Key** and your account email in the adapter settings.

### Configuration

| Setting            | Description                                  | Default |
|--------------------|----------------------------------------------|---------|
| API Secret         | Your Ultrahuman Partner API authorization key | —       |
| User Email         | Email address linked to your Ultrahuman account | —    |
| Polling Interval   | How often to fetch data (minutes)            | 30      |

The minimum polling interval is 5 minutes. Since ring data syncs periodically (not in real-time), 30 minutes is recommended.

### Support

If you find this adapter useful, consider supporting the development:

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/smarterpapa)

### Acknowledgments

API integration based on [ultrahuman-dashboard](https://github.com/mt-krainski/ultrahuman-dashboard) by Matt Krainski (MIT License).

## Changelog

### 0.1.1 (2026-03-11)
* Fixed responsive design for Admin UI
* Added i18n translation files
* Updated dependencies (@iobroker/adapter-core, @iobroker/testing)
* Fixed io-package.json schema (encryptedNative/protectedNative)
* Minimum Node.js version set to 20

### 0.1.0 (2026-03-08)
* Initial release
* Sleep data (efficiency, duration, stages, score, cycles)
* Heart rate metrics (resting, night, average, min/max, trend)
* HRV data (average, sleep, min/max, trend)
* SpO2 monitoring (if supported by ring)
* Skin temperature
* Activity tracking (steps, active minutes, movement/recovery index, VO2 max)

## License

MIT License — see [LICENSE](LICENSE) for details.

Copyright (c) 2026 [SmarterPapa](https://smarterpapa.de)
