# How to Build a Chrome Extension for Environment Switching — A Manifest V3 Developer Guide

*Published May 2026. Source code at [github.com/ttcd77/url-switcher](https://github.com/ttcd77/url-switcher).*

**If you build web applications, you know the drill.** You're debugging a checkout flow on staging, find a bug, fix it locally, and now you need to test the same flow on localhost. You copy the URL, paste it, replace the domain, find the path still works, remember there's a query param... and you've just burned 20 seconds. Repeat 50 times a day, 250 days a year. That's roughly 70 hours a year spent manually editing URLs.

This guide walks through building a Chrome extension that solves this problem — a **URL environment switcher** that toggles between localhost, staging, and production with one click, preserving the full path, query string, and hash. Along the way, you'll learn the fundamentals of Chrome Extension Manifest V3: popups, storage API, options pages, and tab manipulation.

---

## Table of Contents

1. [What we're building](#what-were-building)
2. [Manifest V3: the foundation](#manifest-v3-the-foundation)
3. [The popup: one-click environment detection](#the-popup-one-click-environment-detection)
4. [URL switching: preserving path, query, and hash](#url-switching-preserving-path-query-and-hash)
5. [The options page: custom environments](#the-options-page-custom-environments)
6. [Background service worker](#background-service-worker)
7. [Testing and debugging your extension](#testing-and-debugging-your-extension)
8. [Distribution: Chrome Web Store vs unpacked loading](#distribution-chrome-web-store-vs-unpacked-loading)
9. [Complete source code](#complete-source-code)

---

## What we're building

A Chrome extension that lives in your toolbar. Click the icon, and a popup appears showing:

- Your current tab's full URL
- Which environment you're on (highlighted — localhost, staging, or production)
- Buttons for every other configured environment

Click a button and the current tab navigates to the same page on that environment. If you're on `https://staging.myapp.com/products/42?tab=reviews`, clicking "Production" takes you to `https://myapp.com/products/42?tab=reviews`. The path, query params, and hash are all preserved.

The extension also has an options page where you configure your own environment URLs — any number, any pattern. Settings sync across Chrome browsers via `chrome.storage.sync`.

**Final file structure (11 files, <10KB total):**

```
url-switcher/
├── manifest.json       # Extension config
├── popup.html          # Toolbar popup UI
├── popup.js            # Popup logic (URL detection + switching)
├── popup.css           # Popup styling
├── options.html        # Settings page UI
├── options.js          # Settings CRUD logic
├── background.js       # Service worker (minimal)
├── icons/              # Extension icons (16/48/128)
├── README.md
├── CHANGELOG.md
└── docs/
    └── dev-guide.md    # This document
```

---

## Manifest V3: the foundation

Every Chrome extension starts with `manifest.json`. For Manifest V3, here's what ours looks like:

```json
{
  "manifest_version": 3,
  "name": "URL Environment Switcher",
  "version": "1.0.0",
  "description": "Switch between localhost, staging, and production environments in one click.",
  "permissions": ["storage", "tabs"],
  "action": {
    "default_popup": "popup.html",
    "default_icon": {
      "16": "icons/icon16.png",
      "48": "icons/icon48.png",
      "128": "icons/icon128.png"
    },
    "default_title": "URL Environment Switcher"
  },
  "options_page": "options.html",
  "background": {
    "service_worker": "background.js"
  },
  "icons": {
    "16": "icons/icon16.png",
    "48": "icons/icon48.png",
    "128": "icons/icon128.png"
  }
}
```

Let's walk through the key decisions:

**Permissions.** We request exactly two: `storage` (to save environment configurations) and `tabs` (to read the current tab URL and navigate). No host permissions — the extension doesn't need to access any web page content. This keeps the Chrome Web Store review fast and users' trust high.

**`action.default_popup`** replaces the Manifest V2 `browser_action.default_popup`. When the user clicks the extension icon, Chrome loads `popup.html` in a small popup window. The popup has its own DOM, JavaScript, and CSS — it's a mini web app.

**`options_page`** sets the page that opens when the user right-clicks the extension icon and selects "Options" (or clicks the gear icon inside the popup). This is where environment URLs are configured.

**`background.service_worker`** replaces Manifest V2's persistent background scripts. The service worker is ephemeral — Chrome starts it when needed and terminates it when idle. Ours is minimal (just a log on install), but it's where you'd add context menus, keyboard shortcuts, or extension-pay integration later.

### Why Manifest V3?

Manifest V2 extensions stopped being accepted by the Chrome Web Store in 2024. V3 is the only option for new extensions. Key differences from V2:

- **Service workers replace background pages.** No persistent background process — better for memory and battery.
- **`action` API replaces `browser_action`.** Same functionality, different namespace.
- **No remotely hosted code.** All JavaScript must be bundled in the extension package. CSP restrictions are stricter.
- **Declarative Net Request replaces webRequest blocking.** Not relevant for our extension, but important for ad blockers and content modifiers.

---

## The popup: one-click environment detection

The popup is the user's primary interaction surface. When clicked, it:

1. Reads the current tab URL via `chrome.tabs.query()`
2. Loads configured environments from `chrome.storage.sync`
3. Detects which environment matches the current URL by comparing origins
4. Renders a button for each environment, highlighting the active one
5. Navigates the tab when a button is clicked

Here's the core popup logic (`popup.js`):

### Loading environments and the current tab

```javascript
const DEFAULT_ENVS = [
  { name: "Localhost", baseUrl: "http://localhost:3000" },
  { name: "Staging",   baseUrl: "https://staging.example.com" },
  { name: "Production", baseUrl: "https://example.com" }
];

document.addEventListener("DOMContentLoaded", async () => {
  // Load user's configured environments (or defaults)
  const stored = await chrome.storage.sync.get("envs");
  const envs = (stored.envs && stored.envs.length > 0)
    ? stored.envs
    : DEFAULT_ENVS;

  // Get current tab URL
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true
  });
  const currentUrl = (tab && tab.url) || "";
  // ... detect environment, render buttons
```

The extension uses `chrome.storage.sync` rather than `localStorage`. Why?

- **`localStorage`** is per-origin and tied to the popup's internal URL — it won't persist if the extension updates.
- **`chrome.storage.sync`** syncs across all Chrome browsers where the user is signed in. Set up environments once on your work machine, and they're available on your home laptop.
- **`chrome.storage.local`** is an alternative if you don't want sync (unlimited storage, no network quota). But for environment configs, sync is the right choice.

### Detecting which environment the user is on

```javascript
// Detect which environment we're on by matching origin
let activeIndex = -1;
if (currentUrl) {
  try {
    const cur = new URL(currentUrl);
    const curOrigin = cur.origin;
    activeIndex = envs.findIndex(env => {
      try {
        const envUrl = new URL(env.baseUrl);
        return envUrl.origin === curOrigin;
      } catch { return false; }
    });
  } catch { /* invalid URL */ }
}
```

The matching logic uses `URL.origin` — the scheme + host + port combination. For `http://localhost:3000/products/42`, the origin is `http://localhost:3000`. This is compared against each configured environment's base URL origin.

**Why origin matching rather than `startsWith`?** Consider a user with environments `http://localhost:3000` and `http://localhost:3001`. `startsWith` would match both against `http://localhost:3001/path`. Origin comparison is exact — only port 3001 matches port 3001.

### Rendering buttons

```javascript
envs.forEach((env, idx) => {
  const btn = document.createElement("button");
  btn.className = "env-btn" + (idx === activeIndex ? " active" : "");
  // ... set inner content
  btn.addEventListener("click", () =>
    switchTo(env, idx, envs, currentUrl));
  listEl.appendChild(btn);
});
```

Each button shows the environment name and its base URL. The active environment gets a CSS `active` class — typically a different border color or background to visually confirm "you are here."

---

## URL switching: preserving path, query, and hash

The switching logic is the heart of the extension. Here's how it works:

### Step 1: Parse the current URL

```javascript
const currentParsed = new URL(currentUrl);
// e.g., new URL("https://staging.example.com/products/42?tab=reviews#section")
//   → origin: "https://staging.example.com"
//   → pathname: "/products/42"
//   → search: "?tab=reviews"
//   → hash: "#section"
```

### Step 2: Strip the matched base URL

The current URL might be on staging, but the path includes the base path configured for staging. We need to extract just the "page-specific" portion.

```javascript
const basePath = currentBaseParsed.pathname.replace(/\/+$/, "");
let remainingPath = currentParsed.pathname;

if (remainingPath.startsWith(basePath + "/")) {
  remainingPath = remainingPath.slice(basePath.length);
} else if (remainingPath === basePath) {
  remainingPath = "/";
}
```

If the staging base URL is `https://staging.example.com` (no path), and the current URL is `https://staging.example.com/products/42`, then `basePath` is `""` and `remainingPath` stays `/products/42`. But if the staging base is `https://staging.example.com/app` and the URL is `https://staging.example.com/app/products/42`, we strip the `/app` prefix and get `/products/42`.

### Step 3: Build the target URL

```javascript
const targetParsed = new URL(targetEnv.baseUrl);
const newUrl = targetParsed.origin
  + (remainingPath.startsWith("/") ? "" : "/")
  + remainingPath.replace(/^\/+/, "/")
  + currentParsed.search
  + currentParsed.hash;
```

The target origin replaces the source origin. The remaining path, query string, and hash are appended verbatim. Double-slash and leading-slash edge cases are handled with regex.

### Step 4: Navigate

```javascript
chrome.tabs.update({ url: newUrl });
```

This is the actual navigation — the same as if the user typed the new URL in the address bar. `chrome.tabs.update()` requires the `tabs` permission in the manifest.

---

## The options page: custom environments

The options page (`options.html`) is a standalone HTML page that Chrome opens in a new tab (`chrome://extensions` → extension → "Extension options"). It provides:

- A form to add/remove/edit environment entries (name + base URL)
- Save button that persists to `chrome.storage.sync`
- Validation to prevent duplicate or empty entries

Here's the key storage logic from `options.js`:

```javascript
// Load existing environments
async function loadEnvs() {
  const stored = await chrome.storage.sync.get("envs");
  const envs = stored.envs || DEFAULT_ENVS;
  renderEnvList(envs);
}

// Save environments
async function saveEnvs() {
  const envs = collectEnvData(); // read from form fields
  await chrome.storage.sync.set({ envs });
  showSaveConfirmation();
}
```

**Why a separate options page rather than in-popup settings?** Chrome extensions have a well-known "right-click → Options" affordance. Users expect it. Separating configuration from the one-click switching action keeps the popup fast and focused. The popup is for action; the options page is for setup.

**Sync considerations.** `chrome.storage.sync` has a quota: 100KB total, 8KB per key, 512 items max. Our environment configurations (a few name/URL pairs totaling <1KB) fit well within these limits. If you needed larger storage (e.g., multiple environment sets per project), you'd use `chrome.storage.local`.

---

## Background service worker

The background service worker (`background.js`) is minimal in the current version:

```javascript
chrome.runtime.onInstalled.addListener(() => {
  console.log("URL Environment Switcher installed");
});
```

This is the Manifest V3 equivalent of an "on install" event. Future features that would live here:

- **Keyboard shortcuts:** `chrome.commands` to assign hotkeys per environment (e.g., `Ctrl+Shift+1` for localhost)
- **Context menus:** right-click a link → "Open in Staging"
- **Badge text:** show current environment as a tiny badge on the extension icon
- **ExtensionPay integration:** check premium status on install

The service worker is event-driven. It wakes up when an event fires, processes it, and Chrome terminates it after ~30 seconds of idle. No polling, no timers, no persistent state — this is the correct pattern for Manifest V3.

---

## Testing and debugging your extension

### Loading unpacked

1. Go to `chrome://extensions`
2. Toggle **Developer mode** (top right)
3. Click **Load unpacked**
4. Select the folder containing `manifest.json`

The extension loads instantly. Any changes you make to the source files require clicking the refresh icon on the extension card (or reloading from `chrome://extensions`). For the popup, close and re-open it after each code change.

### Debugging the popup

Right-click the extension icon → **Inspect popup**. This opens Chrome DevTools for the popup window. Console logs, DOM inspection, and breakpoints all work normally.

### Debugging the options page

The options page is a regular web page — open it, right-click → **Inspect**, and you have full DevTools.

### Debugging the service worker

In `chrome://extensions`, find your extension card and click **service worker** (the blue text link). This opens DevTools for the background service worker. The console here shows `onInstalled` logs and any future event handling.

### Common Manifest V3 pitfalls

- **Forgot `tabs` permission?** `chrome.tabs.query()` silently returns `undefined` for the `url` property. The `tabs` permission is required to read tab URLs.
- **Popup closes on navigation?** Yes — this is Chrome's default behavior. The popup is ephemeral. If you need to show a result after navigation, use the badge or a notification.
- **`chrome.storage.sync` not available in Incognito?** Persist to `chrome.storage.local` as fallback.
- **Manifest errors?** `chrome://extensions` shows errors in red. Click "Errors" on the extension card to see details.

---

## Distribution: Chrome Web Store vs unpacked loading

### Option A: Chrome Web Store (recommended for scale)

The Chrome Web Store provides:
- **Discovery:** users search "chrome extension environment switcher" and find your extension
- **Trust:** verified listings with reviews, ratings, and install counts
- **Auto-updates:** Chrome checks for new versions and updates silently
- **Install friction:** one click, no Developer Mode needed

To publish to the CWS, you need:
1. A Google developer account ($5 one-time registration fee)
2. A ZIP of your extension files
3. Store listing content: title, short description (128 chars), full description, screenshots, promotional images
4. A privacy policy (even if you collect no data — state that explicitly)
5. Pass the Chrome Web Store review (typically 1-3 business days)

The review checks for: minimum permissions, no remotely hosted code, Manifest V3 compliance, and content policy adherence. Extensions that only use `storage` and `tabs` permissions with no data collection pass review quickly.

### Option B: Unpacked loading (zero-budget fallback)

Users download the extension files and load them as described in the testing section above. This flow works identically to a published extension but has no auto-updates and requires Developer Mode. It's useful for:

- **Team distribution:** share a ZIP with coworkers
- **Internal tools:** company extensions that don't need public discovery
- **Before CWS registration:** getting users on the extension immediately while the store listing processes

The url-switcher project provides a clean distribution ZIP (`url-switcher-latest.zip`, 7.4KB) that contains only the extension files — no docs, no git history, no landing page. Download, extract, load unpacked, done.

---

## Complete source code

The full source is at **[github.com/ttcd77/url-switcher](https://github.com/ttcd77/url-switcher)** — MIT licensed, 11 files, <10KB total. Clone it, fork it, modify it for your own environments.

**Key files to study:**

| File | Lines | Purpose |
|------|-------|---------|
| `manifest.json` | 25 | Extension declaration, permissions, entry points |
| `popup.js` | 125 | URL parsing, environment detection, tab navigation |
| `popup.html` | 21 | Popup DOM structure |
| `popup.css` | 77 | Dark-themed popup styling |
| `options.html` | 41 | Options page DOM |
| `options.js` | 85 | Environment CRUD + chrome.storage.sync |
| `background.js` | 6 | Service worker (minimal) |

**Why this extension matters for web developers:**

The Chrome Web Store has over 130,000 extensions, but only a handful address the environment-switching workflow. Most developers still manually edit URLs — it's a "death by a thousand papercuts" problem that doesn't feel urgent until you add up the time. A 2019 Stack Overflow survey found that 53% of developers work on web applications, and a typical web developer spends 15-25% of their day testing across environments. A tool that saves 30 seconds per switch, 50 times a day, compounds to roughly an hour per week.

The url-switcher project is free, open source, and built with the minimum viable Manifest V3 code. No frameworks, no build steps, no dependencies. If you've been meaning to build a Chrome extension but found the documentation dense, this is a complete, real-world example to study.

---

## Next steps for your own extension

1. **Fork the repo** and customize `DEFAULT_ENVS` in `popup.js` with your own environment URLs
2. **Add keyboard shortcuts** via `chrome.commands` in `manifest.json` — assign `Ctrl+Shift+1/2/3` for localhost/staging/production
3. **Add multiple project sets** — extend `chrome.storage.sync` to store named environment groups (e.g., "Main App", "Marketing Site", "Admin Panel")
4. **Publish to the Chrome Web Store** — see `CHROME_WEB_STORE.md` in the repo for the exact listing copy, screenshot specs, and submission checklist
5. **Monetize** with ExtensionPay for team features (shared environments, role-based access, sync across teams)

---

*This guide was written as companion documentation for [URL Environment Switcher](https://github.com/ttcd77/url-switcher), an open-source Chrome extension built by [selfloom](https://github.com/ttcd77). Found a bug or want a feature? [Open an issue](https://github.com/ttcd77/url-switcher/issues).*

*Also check out: [Form Handler for Google Sheets](https://github.com/ttcd77/form-handler) — a free, zero-backend contact form solution.*
