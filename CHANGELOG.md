# Changelog

All notable changes to URL Environment Switcher.

## [1.0.0] — 2026-05-28

### Added
- Initial release of URL Environment Switcher — a Chrome extension for switching between dev, staging, and production environments in one click.
- **3 configurable environments** (Dev, Staging, Production) stored in `chrome.storage.sync`
- **Smart URL switching** — preserves path, query string, and hash fragment when switching between environments
- **Dark theme popup** with real-time environment detection (highlights which environment you are currently on)
- **Options page** for configuring environment URLs (supports localhost, custom domains, Vercel previews, etc.)
- **Distribution ZIP** — downloadable from landing page, no Chrome Web Store required for install
- **Landing page** at https://ttcd77.github.io/url-switcher/ with realistic browser mockup screenshots
- **SEO FAQ** — 6-question FAQ targeting developer search queries
- **Open Graph + Twitter Cards** for social sharing
- **MIT License**
- **GitHub Issues enabled** for community feedback and bug reports

### Technical
- Manifest V3 architecture
- Permissions: `storage`, `tabs` (minimal surface)
- Zero data collection — no analytics, no server, no tracking
- `chrome.storage.sync` for environment config persistence
- URL matching via origin comparison with path/query/hash preservation
- Cross-linked with sibling project: [Form Handler for Google Sheets](https://github.com/ttcd77/form-handler)

### Known Limitations
- Fixed to exactly 3 environment slots (premium tier planned for unlimited)
- No regex/pattern-based environment detection (planned)
- Not yet listed on Chrome Web Store (pending developer registration)
- No automated environment switching based on URL patterns

### Upcoming
- Chrome Web Store listing ($5 developer registration pending — RQ-005)
- ExtensionPay integration for $4.99 one-time premium tier
- Unlimited environments + domain pattern matching
- Keyboard shortcuts for environment switching

---

Built by [selfloom](https://github.com/ttcd77). MIT licensed. Install at https://ttcd77.github.io/url-switcher/
