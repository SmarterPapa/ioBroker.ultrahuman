![Logo](admin/ultrahuman.png)

# ioBroker.ultrahuman

[![NPM version](https://img.shields.io/npm/v/iobroker.ultrahuman.svg)](https://www.npmjs.com/package/iobroker.ultrahuman)
[![License](https://img.shields.io/npm/l/iobroker.ultrahuman.svg)](https://github.com/SmarterPapa/ioBroker.ultrahuman/blob/main/LICENSE)

## Ultrahuman Ring Adapter for ioBroker

This adapter reads health metrics from your **Ultrahuman Ring** via the [Ultrahuman Partner API](https://blog.ultrahuman.com/blog/accessing-the-ultrahuman-partnership-api/) and creates ioBroker objects you can use in visualizations, scripts, and automations.

### Available metrics

| Channel           | State              | Description                   | Unit     |
|-------------------|--------------------|-------------------------------|----------|
| `sleep`           | `bedtimeStart`     | Time you went to bed          | ISO 8601 |
| `sleep`           | `bedtimeEnd`       | Time you got up               | ISO 8601 |
| `sleep`           | `timeInBed`        | Total time in bed             | min      |
| `sleep`           | `timeAsleep`       | Total time asleep             | min      |
| `sleep`           | `timeToFallAsleep` | How long it took to fall asleep | min    |
| `sleep`           | `sleepEfficiency`  | Sleep efficiency              | %        |
| `heart`           | `restingHR`        | Resting heart rate (sleep)    | bpm      |
| `heart`           | `nightRHR`         | Night resting heart rate      | bpm      |
| `heart`           | `lastReading`      | Last HR reading               | bpm      |
| `hrv`             | `average`          | Average HRV                   | ms       |
| `hrv`             | `sleepHRV`         | Average sleep HRV             | ms       |
| `temperature`     | `lastReading`      | Last skin temperature         | °C       |
| `activity`        | `steps`            | Total steps today             | steps    |
| `activity`        | `stepsAvg`         | Average steps                 | steps    |
| `activity`        | `movementIndex`    | Movement index                |          |
| `activity`        | `recoveryIndex`    | Recovery index                |          |
| `activity`        | `vo2Max`           | VO2 max                       | ml/kg/min|
| `info`            | `connection`       | API connection status         | boolean  |
| `info`            | `lastUpdate`       | Last successful update        | ISO 8601 |

### Prerequisites

You need access to the **Ultrahuman Partner API**:

1. Obtain an API authorization key from Ultrahuman.
2. In the Ultrahuman app, go to **Profile > Settings > Partner ID** and enter the data-sharing code provided with your API key.
3. Configure the API key and your account email in the adapter settings.

### Configuration

| Setting            | Description                                  | Default |
|--------------------|----------------------------------------------|---------|
| API Secret         | Your Ultrahuman Partner API authorization key | —       |
| User Email         | Email address linked to your Ultrahuman account | —    |
| Polling Interval   | How often to fetch data (minutes)            | 30      |

The minimum polling interval is 5 minutes. Since ring data syncs periodically (not in real-time), 30 minutes is recommended.

### Acknowledgments

API integration based on [ultrahuman-dashboard](https://github.com/mt-krainski/ultrahuman-dashboard) by Matt Krainski (MIT License).

## License

MIT License — see [LICENSE](LICENSE) for details.

Copyright (c) 2026 SmarterPapa
