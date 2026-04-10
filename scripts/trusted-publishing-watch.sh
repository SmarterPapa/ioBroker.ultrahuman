#!/usr/bin/env bash
# Daily watch: when ioBroker/testing-action-deploy#19 is closed, optionally switch deploy to
# Trusted Publishing only (remove npm-token) and remove this job from crontab.
#
# Install (once):  ./scripts/trusted-publishing-watch.sh --install-cron
# Manual check:    ./scripts/trusted-publishing-watch.sh
# Apply + cleanup: ./scripts/trusted-publishing-watch.sh --apply
#
# Crontab line contains marker: IOBROKER_ULTRAHUMAN_TP_WATCH

set -euo pipefail
# Cron has no login shell — ensure Homebrew / common paths for `gh` and `git`.
export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:${PATH:-}"

# Must be VAR=value form so cron does not treat it as the command name.
MARKER='IOBROKER_ULTRAHUMAN_TP_WATCH=1'
UPSTREAM_ISSUE='ioBroker/testing-action-deploy'
ISSUE_NUM=19
SCRIPT_PATH="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/$(basename "${BASH_SOURCE[0]}")"
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
WORKFLOW="${REPO_ROOT}/.github/workflows/test-and-release.yml"
LOG_TAG="[tp-watch $(date -u +%Y-%m-%dT%H:%M:%SZ)]"

log() { echo "${LOG_TAG} $*" >&2; }

remove_cron() {
  if ! { crontab -l 2>/dev/null || true; } | grep -q 'IOBROKER_ULTRAHUMAN_TP_WATCH'; then
    log "No crontab line with IOBROKER_ULTRAHUMAN_TP_WATCH found."
    return 0
  fi
  local tmp
  tmp="$(mktemp)"
  { crontab -l 2>/dev/null || true; } | grep -v 'IOBROKER_ULTRAHUMAN_TP_WATCH' >"$tmp" || true
  if [[ -s "$tmp" ]]; then
    crontab "$tmp"
  else
    crontab -r 2>/dev/null || true
  fi
  rm -f "$tmp"
  log "Removed crontab entries for IOBROKER_ULTRAHUMAN_TP_WATCH."
}

install_cron() {
  if { crontab -l 2>/dev/null || true; } | grep -q 'IOBROKER_ULTRAHUMAN_TP_WATCH'; then
    log "Cron already installed (marker present)."
    exit 0
  fi
  # PATH for non-interactive cron. If `gh` fails under cron (Keychain), edit crontab and add GH_TOKEN=... before the script path.
  mkdir -p "${HOME}/Library/Logs"
  local logfile="${HOME}/Library/Logs/iobroker-ultrahuman-tp-watch.log"
  local line="0 9 * * * $MARKER PATH=/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin $SCRIPT_PATH --apply >>${logfile} 2>&1"
  ( { crontab -l 2>/dev/null || true; }; echo "$line" ) | crontab -
  log "Installed daily cron (09:00): $line"
}

workflow_uses_token() {
  grep -q 'npm-token:' "$WORKFLOW" 2>/dev/null
}

issue_closed() {
  local state
  state="$(gh api "repos/${UPSTREAM_ISSUE}/issues/${ISSUE_NUM}" --jq .state 2>/dev/null || echo OPEN)"
  [[ "$state" == "CLOSED" ]]
}

notify_macos() {
  if [[ "$(uname -s)" == "Darwin" ]] && command -v osascript &>/dev/null; then
    osascript -e "display notification \"Issue #${ISSUE_NUM} closed — review Trusted Publishing / run watch script with --apply\" with title \"ioBroker.ultrahuman\"" 2>/dev/null || true
  fi
}

apply_workflow() {
  if ! workflow_uses_token; then
    log "Workflow already has no npm-token; nothing to commit."
    return 0
  fi
  cat > "$WORKFLOW.tmp" << 'YAML'
name: Test and Release

# Run this job on all pushes and pull requests
# as well as tags with a semantic version
on:
  push:
    branches:
      - "main"
    tags:
      # normal versions
      - "v[0-9]+.[0-9]+.[0-9]+"
      # pre-releases
      - "v[0-9]+.[0-9]+.[0-9]+-**"
  pull_request: {}

# Cancel previous PR/branch runs when a new commit is pushed
concurrency:
  group: ${{ github.ref }}
  cancel-in-progress: true

jobs:
  # Performs quick checks before the expensive test runs
  check-and-lint:
    if: contains(github.event.head_commit.message, '[skip ci]') == false

    runs-on: ubuntu-latest

    steps:
      - uses: ioBroker/testing-action-check@v1
        with:
          node-version: '22.x'
          lint: true

  # Runs adapter tests on all supported node versions and OSes
  adapter-tests:
    needs: [check-and-lint]

    if: contains(github.event.head_commit.message, '[skip ci]') == false

    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        node-version: [20.x, 22.x, 24.x]
        os: [ubuntu-latest, windows-latest, macos-latest]

    steps:
      - uses: ioBroker/testing-action-adapter@v1
        with:
          node-version: ${{ matrix.node-version }}
          os: ${{ matrix.os }}
          build: true

  # Deploy: Trusted Publishing (OIDC) via testing-action-deploy — npm-token removed after upstream fix (see testing-action-deploy#19).
  deploy:
    needs: [check-and-lint, adapter-tests]

    if: |
      contains(github.event.head_commit.message, '[skip ci]') == false &&
      github.event_name == 'push' &&
      startsWith(github.ref, 'refs/tags/v')

    runs-on: ubuntu-latest

    permissions:
      contents: write
      id-token: write

    steps:
      - uses: ioBroker/testing-action-deploy@v1
        with:
          node-version: '22.x'
          build: true
          github-token: ${{ secrets.GITHUB_TOKEN }}
YAML
  mv "$WORKFLOW.tmp" "$WORKFLOW"
}

case "${1:-}" in
  --install-cron)
    install_cron
    exit 0
    ;;
  --uninstall-cron)
    remove_cron
    exit 0
    ;;
esac

if ! command -v gh &>/dev/null; then
  log "ERROR: gh CLI not found. Install: https://cli.github.com/"
  exit 1
fi

if ! gh auth status &>/dev/null; then
  log "ERROR: gh not logged in. Run: gh auth login"
  exit 1
fi

if ! issue_closed; then
  log "Upstream issue https://github.com/${UPSTREAM_ISSUE}/issues/${ISSUE_NUM} is still open — nothing to do."
  exit 0
fi

log "Upstream issue #${ISSUE_NUM} is CLOSED."

if [[ "${1:-}" != "--apply" ]]; then
  notify_macos
  log "Run with --apply to remove npm-token from workflow, commit, push, and uninstall cron."
  log "Or: edit workflow manually after verifying OIDC publish on a test tag."
  exit 0
fi

# --apply
cd "$REPO_ROOT"
if ! workflow_uses_token; then
  notify_macos
  remove_cron
  log "Workflow already OIDC-only; crontab cleaned up."
  exit 0
fi

apply_workflow
if git diff --quiet "$WORKFLOW"; then
  log "No workflow changes (unexpected)."
  exit 1
fi

npm test --silent
git add "$WORKFLOW"
git commit -m "ci(deploy): remove npm-token; Trusted Publishing after testing-action-deploy#19 closed

Automated by scripts/trusted-publishing-watch.sh --apply
Upstream: https://github.com/${UPSTREAM_ISSUE}/issues/${ISSUE_NUM}"

git push origin main
notify_macos
remove_cron
log "Pushed workflow update and removed cron job."
