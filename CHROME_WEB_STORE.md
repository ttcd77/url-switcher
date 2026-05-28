# Chrome Web Store — Store Listing Preparation

## Store Listing Title
```
URL Environment Switcher — One-Click Dev/Staging/Prod Toggle
```
(Maximum 75 characters — under CWS limit)

---

## Short Description (132 characters max)
```
Switch between localhost, staging, and production environments in one click. Preserves path, query, and hash. Free, open source, zero dependencies.
```
(Count: 143 — trim to fit 132:
```
Switch between localhost, staging, production in one click. Preserves path, query, hash. Free, open source, zero dependencies.
```
Count: 128 ✓)

---

## Full Description (marketing copy)

**Stop copy-pasting URLs between environments.**

URL Environment Switcher is the Chrome extension that saves web developers 30 seconds every time they need to jump from localhost to staging to production — and those seconds add up.

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
- **Syncs across devices.** Settings saved via chrome.storage.sync. Set up once, available everywhere you're signed into Chrome.
- **Open source (MIT).** Full source on GitHub. Fork it, customize it, ship it to your team. No vendor lock-in.

### Perfect For

- Frontend developers jumping between local dev servers and deployed environments
- QA engineers verifying bugs across staging and production
- Backend devs testing APIs at different environments
- Anyone managing multiple deployment stages

### Privacy First

No data collection. No analytics. No tracking. Your environment URLs are stored locally using Chrome's built-in storage. Nothing leaves your browser.

---

## Screenshot Descriptions (5 required for CWS)

### Screenshot 1: Main Popup — Default State
**What to capture:** The extension popup open in the Chrome toolbar, showing the three default environment buttons (Localhost, Staging, Production) with Localhost highlighted as active. The current URL bar should show `https://myapp.vercel.app/products/42` visible in the background tab. The popup shows "Current: Production" in green text.  
**Size:** 1280x800 recommended  
**File:** `screenshot-1-popup.png`

### Screenshot 2: Main Popup — Switching Environment
**What to capture:** The popup after clicking "Staging" — the browser navigated to `https://staging.myapp.com/products/42?debug=true#section`. The popup shows "Current: Staging" highlighted, with the green dot indicator next to the Staging button. The Staging button has the active red border glow.  
**Size:** 1280x800 recommended  
**File:** `screenshot-2-switched.png`

### Screenshot 3: Options Page — Configured Environments
**What to capture:** The Options page (opened via right-click → Options or the ⚙ button in the popup) showing three environment input rows: Localhost → `http://localhost:3000`, Staging → `https://staging.myapp.com`, Production → `https://myapp.com`. The Save and + Add Environment buttons are visible at the bottom.  
**Size:** 1280x800 recommended  
**File:** `screenshot-3-options.png`

### Screenshot 4: Options Page — Custom Environment Added
**What to capture:** The Options page with a fourth environment row added: "Preview" → `https://preview.myapp.com`. The × remove buttons are visible on each row. Shows the full customization capability.  
**Size:** 1280x800 recommended  
**File:** `screenshot-4-custom-env.png`

### Screenshot 5: Extension in Chrome Toolbar
**What to capture:** The Chrome toolbar with the extension icon visible among other extensions. The extension icon (a colored switcher/arrows icon) is pinned. Below it, a browser tab shows a complex URL with path/query/hash to demonstrate what gets preserved during switching.  
**Size:** 1280x800 recommended  
**File:** `screenshot-5-toolbar.png`

---

## Category Recommendation
```
Developer Tools
```
Reasoning: The extension serves software developers by automating environment URL switching during development and testing workflows.

---

## Pricing Strategy

| Tier | Price | Features |
|------|-------|----------|
| **Open Source (GitHub)** | Free | 3 default environments, custom unlimited, MIT license |
| **Chrome Web Store (Free)** | Free | Same as OSS, one-click install |
| **Premium (ExtensionPay, planned)** | $4.99 one-time | Multiple project sets, keyboard shortcuts (Ctrl+1/2/3), import/export configs, team sharing |

The free version on CWS drives discovery and trust. The premium version monetizes power users who manage many projects.

---

## SEO Keywords (for store listing optimization)

Primary keyword: **chrome extension url switcher**

Secondary keywords:
- environment switcher chrome extension
- localhost staging production chrome extension
- url environment toggle
- dev environment switcher
- multi environment url switcher

Integrate these naturally into the description copy above (already done).

---

## Privacy Policy

### URL Environment Switcher — Privacy Policy

**Last updated:** May 28, 2026

**Data Collection: None.**

This extension does not collect, transmit, or store any personal data. It does not use analytics, tracking pixels, error reporting services, or any third-party services.

**Local Storage:**

The extension uses Chrome's built-in `chrome.storage.sync` API solely to save your environment URL configurations (e.g., "Localhost → http://localhost:3000"). This data:
- Never leaves your browser (except Chrome's own sync between your signed-in devices)
- Is only used to populate the environment buttons in the popup
- Can be deleted at any time by clearing extension data in Chrome settings, or by clicking "Reset to defaults" in the Options page

**Permissions Used:**

| Permission | Purpose |
|------------|---------|
| `storage` | Save your environment URL configurations |
| `tabs` | Read the current tab's URL to detect which environment you're on and navigate to the switched URL |

**No Network Requests:**

The extension makes zero outbound network requests. All functionality is client-side.

**Third Parties:** None.

**Changes:** If this policy changes, the updated version will be posted here and in the extension's GitHub repository.

**Contact:** hello@selfloom.ai

---

## Store Listing Metadata

| Field | Value |
|-------|-------|
| Title | URL Environment Switcher — One-Click Dev/Staging/Prod Toggle |
| Category | Developer Tools |
| Language | English |
| Price | Free |
| Developer Email | hello@selfloom.ai |
| Developer Website | https://ttcd77.github.io/url-switcher/ |
| Privacy Policy URL | https://ttcd77.github.io/url-switcher/privacy (needs deployment) |
| Support URL | https://github.com/ttcd77/url-switcher/issues |
| Source Code | https://github.com/ttcd77/url-switcher |
| Manifest Version | 3 |
| Minimum Chrome Version | 88 (Manifest V3 baseline) |

---

## Pre-Submission Checklist

- [ ] Create 5 screenshots (1280x800 PNG) per the descriptions above
- [ ] Deploy privacy policy page to GitHub Pages (or link to repo README privacy section)
- [ ] Verify manifest.json has correct `version` (currently `1.0.0`)
- [ ] Test extension loads without errors in Chrome 88+
- [ ] Test popup displays correctly on dark/light Chrome themes
- [ ] Test Options page saves and loads settings correctly
- [ ] Package extension as .zip (all files at root — no parent folder)
- [ ] Create developer account at Chrome Web Store Developer Dashboard ($5 one-time registration fee)
- [ ] Upload .zip, fill in all fields from this document, upload 5 screenshots
- [ ] Submit for review
