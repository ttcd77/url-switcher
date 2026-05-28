# URL Environment Switcher

One-click Chrome Extension to switch between localhost, staging, and production environments while preserving the current path, query string, and hash.

## Installation

1. Clone this repo or download the folder
2. Go to `chrome://extensions` in Chrome
3. Enable **Developer mode** (toggle in top right)
4. Click **Load unpacked** and select the `url-switcher/` folder

## Usage

1. Click the extension icon in your toolbar
2. The popup shows your current tab URL and highlights which environment you're on
3. Click any environment button to navigate to the same path on that environment

### Default environments

| Environment | Base URL |
|---|---|
| Localhost | `http://localhost:3000` |
| Staging | `https://staging.example.com` |
| Production | `https://example.com` |

### Custom environments

Right-click the extension icon → **Options** (or click the gear icon in the popup) to configure your own environments. Add, remove, or rename environments and save. Settings sync across your Chrome browsers via `chrome.storage.sync`.

## How it works

When you click an environment button, the extension:

1. Parses your current tab URL
2. Detects which configured environment it matches (by origin)
3. Strips the matched base URL, keeping the path, query, and hash
4. Builds a new URL with the target environment's base

Example: browsing `http://localhost:3000/products/42?tab=reviews` → clicking "Staging" → navigates to `https://staging.example.com/products/42?tab=reviews`

## Roadmap

- **Keyboard shortcuts** — assign hotkeys to each environment
- **Multiple environment sets** — switch between project configs
- **Team management** — share environment configs across a team
- **Paid version** — ExtensionPay integration for team features

## License

MIT
