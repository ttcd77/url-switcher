# URL Environment Switcher — Privacy Policy

**Last updated:** May 28, 2026

## Data Collection: None.

This extension does not collect, transmit, or store any personal data. It does not use analytics, tracking pixels, error reporting services, or any third-party services.

## Local Storage

The extension uses the browser's built-in `browser.storage.sync` (also accessible as `chrome.storage.sync`) API solely to save your environment URL configurations (e.g., "Localhost → http://localhost:3000"). This data:

- Never leaves your browser (except Firefox Sync between your signed-in devices, which you control)
- Is only used to populate the environment buttons in the popup
- Can be deleted at any time by clearing extension data in Firefox settings, or by clicking "Reset to defaults" in the Options page

## Permissions Used

| Permission | Purpose |
|---|---|
| `storage` | Save your environment URL configurations |
| `tabs` | Read the current tab's URL to detect which environment you're on, and navigate to the switched URL |

## No Network Requests

The extension makes zero outbound network requests. All functionality is client-side.

## Third Parties

None. No third-party services, APIs, or libraries are used.

## Changes

If this policy changes, the updated version will be posted here and in the extension's GitHub repository.

## Contact

hello@selfloom.ai
GitHub: https://github.com/ttcd77/url-switcher
