# URL Environment Switcher

<p align="center">
  <img src="https://img.shields.io/badge/version-1.0.0-blue" alt="version">
  <img src="https://img.shields.io/badge/license-MIT-green" alt="license">
  <img src="https://img.shields.io/badge/manifest-v3-orange" alt="manifest v3">
  <img src="https://komarev.com/ghpvc/?username=ttcd77&repo=url-switcher&label=views&color=blueviolet" alt="views">
</p>

> **Stop copy-pasting URLs between environments.** One click to jump from localhost to staging to production — keeping your exact page, query params, and URL hash intact.

Web developers switch environments 50+ times a day during code review, QA, and debugging. Each switch is: select URL bar → copy → open new tab → paste → edit domain → hit enter. URL Environment Switcher turns that into one click.

---

<p align="center">
  <a href="https://ttcd77.github.io/url-switcher/"><strong>Landing Page & Screenshots →</strong></a>
  &nbsp;·&nbsp;
  <a href="#install"><strong>Install in 60 Seconds →</strong></a>
  &nbsp;·&nbsp;
  <a href="docs/dev-guide.md"><strong>Developer Guide →</strong></a>
</p>

---

## What it does

| Problem | Solution |
|---|---|
| Manually editing URLs between localhost/staging/prod | One click in the popup |
| Losing your place (path, query, hash) | All preserved automatically |
| Forgetting which environment you're on | Current environment highlighted in popup |
| Different projects, different URLs | Unlimited custom environments in Options |
| Setting up on every machine | chrome.storage.sync — config follows you |

## Install

### Option A: Download ZIP (no store needed, 60 seconds)

1. **[Download url-switcher-latest.zip](https://github.com/ttcd77/url-switcher/raw/master/url-switcher-latest.zip)** (7.4 KB)
2. Extract the ZIP wherever you keep extensions
3. Go to `chrome://extensions` → toggle **Developer mode** (top right) → **Load unpacked** → select the extracted folder
4. Right-click the extension icon → **Options** → set your environment URLs

### Option B: Git clone

```bash
git clone https://github.com/ttcd77/url-switcher.git
```
Then follow steps 3-4 above, pointing "Load unpacked" at the cloned folder.

*Coming to Chrome Web Store soon — one-click install without Developer Mode. Until then, Option A works identically.*

## Usage

Click the extension icon on any page and the popup shows you:

- Your current URL
- Which environment you're on (highlighted)
- One-click buttons for each configured environment

**Example:** browsing `http://localhost:3000/products/42?tab=reviews#section` → click "Staging" → instantly navigates to `https://staging.example.com/products/42?tab=reviews#section`

### Default environments (replace in Options)

| Environment | Base URL |
|---|---|
| Localhost | `http://localhost:3000` |
| Staging | `https://staging.example.com` |
| Production | `https://example.com` |

Customize these in the Options page (right-click extension icon → **Options**, or click the gear icon in the popup). Add as many environments as you need — QA, preview, dev branches, any URL pattern.

## Why not just use bookmark folders?

| | Manual URL editing | Bookmark folders | **URL Switcher** |
|---|---|---|---|
| Switch environments | Copy-paste-edit | Find bookmark | **One click** |
| Preserves path & query | Manual | No | **Yes** |
| Shows current env | Look at URL bar | No | **Yes, highlighted** |
| Custom environments | Your brain | Limited | **Unlimited** |
| Syncs across devices | No | Yes | **Yes** |
| Cost | Your time | Free | **Free (MIT)** |

## Tech stack

- Pure HTML + CSS + JavaScript — no React, no npm, no build step
- Manifest V3 architecture
- Permissions: `storage` + `tabs` (minimal surface, no data collection)
- `chrome.storage.sync` for cross-device config persistence
- Under 10KB total

## Roadmap

- [ ] Chrome Web Store listing (pending developer registration — see [RQ-005](https://github.com/ttcd77/url-switcher/issues/1))
- [ ] Keyboard shortcuts for each environment
- [ ] Multiple environment sets (switch between project configs)
- [ ] Team sharing — export/import environment configs
- [ ] Premium tier via ExtensionPay ($4.99 one-time) — unlimited envs, pattern matching, priority support

## Contribute

- **Found a bug?** [Open an issue](https://github.com/ttcd77/url-switcher/issues/new)
- **Have a feature idea?** Comment on [Issue #1 (Release Discussion)](https://github.com/ttcd77/url-switcher/issues/1)
- **Want to improve it?** Fork, branch, PR — small focused PRs preferred

⭐ **Star this repo** if it saves you time. Stars help other developers discover it through GitHub search.

## More from selfloom

- **[Form Handler for Google Sheets](https://github.com/ttcd77/form-handler)** — Zero-cost contact form backend. Works with any static site. Google Apps Script, no server needed.

## License

MIT — use it, fork it, ship it to your team. No strings attached.

---

<p align="center">
  <a href="https://github.com/ttcd77/url-switcher/raw/master/url-switcher-latest.zip">Download ZIP</a>
  &nbsp;·&nbsp;
  <a href="https://github.com/ttcd77/url-switcher">GitHub</a>
  &nbsp;·&nbsp;
  <a href="https://ttcd77.github.io/url-switcher/">Landing Page</a>
  &nbsp;·&nbsp;
  <a href="docs/dev-guide.md">Developer Guide</a>
</p>
