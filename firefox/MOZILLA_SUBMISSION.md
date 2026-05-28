# Mozilla Add-ons (AMO) — Submission Preparation

## Add-on Metadata

| Field | Value |
|---|---|
| **Add-on Name** | URL Environment Switcher |
| **Version** | 1.0.0 |
| **Gecko ID** | `url-switcher@selfloom.ai` |
| **Minimum Firefox** | 109.0 (Manifest V3 support baseline) |
| **Category** | Developer Tools |
| **Price** | Free |
| **Source Code** | https://github.com/ttcd77/url-switcher |
| **Developer Email** | hello@selfloom.ai |

---

## Short Summary (under 250 chars)

Switch between localhost, staging, and production URLs with one click. Preserves path, query string, and hash.

(Count: 113 characters ✓)

---

## Full Description

**Stop copy-pasting URLs between environments.**

URL Environment Switcher is a Firefox extension that saves web developers time every time they need to jump from localhost to staging to production.

### How It Works

1. Click the extension icon in your toolbar
2. The popup shows which environment you're currently on (localhost, staging, or production)
3. Click any environment button — the current tab instantly navigates to the equivalent URL on that environment
4. Your path, query parameters, and hash fragment are all preserved

### Why Developers Love It

- **One click, not five.** No more selecting the URL bar, deleting the hostname, typing the new one, then hitting enter. One click and you're there.
- **Never lose context.** The hash fragment, query params, and exact path are carried over. No more "wait, which page was I on?"
- **See where you are.** The current environment is highlighted in green. You'll never accidentally run tests against production again.
- **Custom environments.** Need dev, QA, preview, and feature-branch environments? Add them all in the Options page. No limit.
- **Zero bloat.** Pure HTML, CSS, and JavaScript. No React, no npm, no build step. Loads instantly. Under 10KB.
- **Syncs across devices.** Settings saved via browser.storage.sync. Set up once, available everywhere you're signed into Firefox.
- **Open source (MIT).** Full source on GitHub. Fork it, customize it, ship it to your team. No vendor lock-in.

### Perfect For

- Frontend developers jumping between local dev servers and deployed environments
- QA engineers verifying bugs across staging and production
- Backend devs testing APIs at different environments
- Anyone managing multiple deployment stages

---

## Screenshot Specifications

AMO requires at least 1 screenshot (1280x800 recommended, PNG or JPEG).

### Screenshot 1: Main Popup — Default State
The extension popup open in the Firefox toolbar, showing the three default environment buttons (Localhost, Staging, Production) with one highlighted as active. The popup shows "Currently on: Localhost" in green text. Address bar shows a recognizable web URL in the background tab.

### Screenshot 2: Options Page — Configured Environments
The Options page (opened via the gear icon in the popup) showing three environment input rows: Localhost → `http://localhost:3000`, Staging → `https://staging.example.com`, Production → `https://example.com`. The Save and + Add Environment buttons are visible at the bottom.

(Additional screenshots can be uploaded to show switching behavior and custom environments.)

---

## Permissions Justification

| Permission | Justification |
|---|---|
| `storage` | Save environment URL configurations so users don't have to re-enter them. Uses `browser.storage.sync` to sync across Firefox installs. |
| `tabs` | Read the active tab's URL to detect which environment the user is currently on, and update the tab URL when switching environments. We do not read or modify tab content. |

---

## Privacy Policy Summary

This extension does not collect, store, or transmit any personal data. No analytics, no tracking, no third-party services. All environment configurations are stored locally on your device using `browser.storage.sync`. No data leaves the browser. Full privacy policy at `PRIVACY_POLICY.md` in the source repository.

---

## Pre-Submission Checklist

- [ ] Verify `browser_specific_settings` section in manifest.json includes correct `gecko.id`
- [ ] Verify all 3 icon sizes (16, 48, 128) are present and valid PNGs
- [ ] Test extension loads without errors in Firefox 109+
- [ ] Test popup displays correctly in Firefox toolbar
- [ ] Test Options page saves and loads settings correctly
- [ ] Test environment switching preserves path, query string, and hash
- [ ] Package extension as .zip (extension files only at root, no subfolder)
- [ ] Create developer account at addons.mozilla.org (free registration, no fee)
- [ ] Upload .zip to AMO Developer Hub
- [ ] Fill in all metadata fields from this document
- [ ] Upload at least 1 screenshot (1280x800, PNG)
- [ ] Submit for review
