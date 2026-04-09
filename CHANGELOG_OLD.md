# Older changelog (iobroker.ultrahuman)

Recent releases are documented in the [README.md](README.md) changelog section.

### 0.1.6 (2026-03-26)

* State roles aligned with [ioBroker state roles documentation](https://github.com/ioBroker/ioBroker.docs/blob/master/docs/en/dev/stateroles.md) (e.g. `value.health.bpm`, `time.interval` for HRV in ms)
* `info.connection` uses `indicator.reachable`; existing instances get roles updated on adapter start
* Admin UI translations completed for fr, es, it, nl, pl, pt, ru, uk, zh-cn (`npm run i18n:admin` to regenerate from `scripts/`)
* GitHub Actions release: uses **npm Trusted Publishing** (OIDC) when configured on [npm package settings](https://www.npmjs.com/package/iobroker.ultrahuman/access); optional fallback: `NPM_TOKEN` repo secret + `npm-token` in workflow

### 0.1.5 (2026-03-21)

* Added @iobroker/eslint-config for consistent code style
* Switched Dependabot from monthly to weekly schedule
* Code style improvements

### 0.1.4 (2026-03-21)

* Removed GitHub installation instructions (per ioBroker repository requirements)
* Enabled trusted publishing for npm releases

### 0.1.3 (2026-03-13)

* Fixed crash when sleep data contains invalid or missing timestamps
* Added defensive validation for all date/time conversions
* Improved error handling in data processing

### 0.1.2 (2026-03-11)

* Cleaned up devDependencies (removed packages included in @iobroker/testing)
* Added "ioBroker" keyword to package.json
* Added .commitinfo to .gitignore

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
