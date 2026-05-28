// Default environments
const DEFAULT_ENVS = [
  { name: "Localhost", baseUrl: "http://localhost:3000" },
  { name: "Staging",   baseUrl: "https://staging.example.com" },
  { name: "Production", baseUrl: "https://example.com" }
];

document.addEventListener("DOMContentLoaded", async () => {
  const urlEl  = document.getElementById("current-url");
  const envEl  = document.getElementById("current-env");
  const listEl = document.getElementById("env-list");
  const optsEl = document.getElementById("btn-options");

  // Load user's configured environments
  const stored = await chrome.storage.sync.get("envs");
  const envs   = (stored.envs && stored.envs.length > 0) ? stored.envs : DEFAULT_ENVS;

  // Get current tab URL
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const currentUrl = (tab && tab.url) || "";

  urlEl.textContent = currentUrl || "No active tab";

  // Detect which environment we're on
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

  if (activeIndex >= 0) {
    envEl.textContent = `Currently on: ${envs[activeIndex].name}`;
  } else {
    envEl.textContent = currentUrl ? "Unknown environment" : "";
  }

  // Render buttons
  envs.forEach((env, idx) => {
    const btn = document.createElement("button");
    btn.className = "env-btn" + (idx === activeIndex ? " active" : "");

    const label = document.createElement("span");
    label.className = "env-label";
    label.textContent = env.name;

    const url   = document.createElement("span");
    url.className = "env-url";
    url.textContent = env.baseUrl;

    btn.appendChild(label);
    btn.appendChild(url);

    btn.addEventListener("click", () => switchTo(env, idx, envs, currentUrl));
    listEl.appendChild(btn);
  });

  // Options button
  optsEl.addEventListener("click", () => {
    chrome.runtime.openOptionsPage();
  });
});

/**
 * Navigate current tab to the selected environment, preserving path/query/hash.
 */
async function switchTo(targetEnv, targetIdx, allEnvs, currentUrl) {
  if (!currentUrl) return;

  let currentParsed;
  try {
    currentParsed = new URL(currentUrl);
  } catch { return; }

  // Figure out which environment the current tab is on (to strip its base)
  const currentOrigin = currentParsed.origin;
  const matchedEnv = allEnvs.find(env => {
    try { return new URL(env.baseUrl).origin === currentOrigin; }
    catch { return false; }
  });

  if (!matchedEnv) {
    // Unknown environment — just warn
    alert("Cannot detect current environment. URL does not match any configured base URL.");
    return;
  }

  // If clicking the already-active env, do nothing
  if (matchedEnv.baseUrl === targetEnv.baseUrl) return;

  // Strip the matched base URL from current URL, keep the rest
  let currentBaseParsed;
  try {
    currentBaseParsed = new URL(matchedEnv.baseUrl);
  } catch { return; }

  // The "remaining" path is the portion after the configured base URL's path
  const basePath = currentBaseParsed.pathname.replace(/\/+$/, "");
  let remainingPath = currentParsed.pathname;

  if (remainingPath.startsWith(basePath + "/")) {
    remainingPath = remainingPath.slice(basePath.length);
  } else if (remainingPath === basePath) {
    remainingPath = "/";
  }

  // Build new URL
  const targetParsed = new URL(targetEnv.baseUrl);
  const newUrl = targetParsed.origin
    + (remainingPath.startsWith("/") ? "" : "/")
    + remainingPath.replace(/^\/+/, "/")
    + currentParsed.search
    + currentParsed.hash;

  // Navigate
  chrome.tabs.update({ url: newUrl });
}
