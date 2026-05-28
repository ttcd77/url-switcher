const DEFAULT_ENVS = [
  { name: "Localhost",  baseUrl: "http://localhost:3000" },
  { name: "Staging",    baseUrl: "https://staging.example.com" },
  { name: "Production", baseUrl: "https://example.com" }
];

document.addEventListener("DOMContentLoaded", init);

async function init() {
  const stored = await chrome.storage.sync.get("envs");
  let envs = (stored.envs && stored.envs.length > 0) ? stored.envs : DEFAULT_ENVS;

  const container = document.getElementById("env-rows");

  function render() {
    container.innerHTML = "";
    envs.forEach((env, idx) => {
      const row = document.createElement("div");
      row.className = "env-row";

      const label = document.createElement("label");
      label.textContent = `Env ${idx + 1}`;
      row.appendChild(label);

      const nameInput = document.createElement("input");
      nameInput.type = "text";
      nameInput.placeholder = "Name (e.g. Localhost)";
      nameInput.value = env.name;
      nameInput.addEventListener("input", () => { envs[idx].name = nameInput.value; });
      row.appendChild(nameInput);

      const urlInput = document.createElement("input");
      urlInput.type = "text";
      urlInput.placeholder = "Base URL (e.g. http://localhost:3000)";
      urlInput.value = env.baseUrl;
      urlInput.addEventListener("input", () => { envs[idx].baseUrl = urlInput.value; });
      row.appendChild(urlInput);

      const removeBtn = document.createElement("button");
      removeBtn.className = "btn-remove";
      removeBtn.textContent = "×";
      removeBtn.title = "Remove";
      removeBtn.addEventListener("click", () => {
        envs.splice(idx, 1);
        render();
      });
      row.appendChild(removeBtn);

      container.appendChild(row);
    });
  }

  render();

  // Save
  document.getElementById("btn-save").addEventListener("click", async () => {
    // Filter out rows with empty name or URL
    const valid = envs.filter(e => e.name.trim() && e.baseUrl.trim());
    await chrome.storage.sync.set({ envs: valid });
    envs = valid;
    showToast("Saved");
    render();
  });

  // Add
  document.getElementById("btn-add").addEventListener("click", () => {
    envs.push({ name: "", baseUrl: "" });
    render();
  });

  // Reset
  document.getElementById("btn-reset").addEventListener("click", async () => {
    await chrome.storage.sync.set({ envs: DEFAULT_ENVS });
    envs = [...DEFAULT_ENVS];
    render();
    showToast("Reset to defaults");
  });
}

function showToast(msg) {
  const el = document.getElementById("toast");
  el.textContent = msg;
  el.classList.add("show");
  setTimeout(() => el.classList.remove("show"), 1800);
}
