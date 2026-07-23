(() => {
  const root = document.documentElement;
  const media = window.matchMedia("(prefers-color-scheme: dark)");

  const getStoredTheme = () => {
    try {
      const value = localStorage.getItem("theme");
      return value === "light" || value === "dark" ? value : null;
    } catch {
      return null;
    }
  };

  let theme =
    root.dataset.theme ||
    getStoredTheme() ||
    (media.matches ? "dark" : "light");

  function syncControls() {
    document.querySelectorAll("#theme-btn").forEach((button) => {
      const next = theme === "dark" ? "浅色" : "深色";
      button.setAttribute("aria-label", `切换到${next}模式`);
      button.setAttribute("title", `切换到${next}模式`);
      button.setAttribute("aria-pressed", String(theme === "dark"));
    });
  }

  function applyTheme(nextTheme, persist = false) {
    theme = nextTheme;
    root.dataset.theme = theme;
    root.style.colorScheme = theme;

    if (persist) {
      try {
        localStorage.setItem("theme", theme);
      } catch {
        // Storage can be unavailable in private browsing; the UI still works.
      }
    }

    const color = theme === "dark" ? "#15191f" : "#fbfcfb";
    document
      .querySelector("meta[name='theme-color']")
      ?.setAttribute("content", color);
    syncControls();
    document.dispatchEvent(
      new CustomEvent("themechange", { detail: { theme } }),
    );
  }

  document.addEventListener("click", (event) => {
    const button = event.target.closest?.("#theme-btn");
    if (!button) return;
    applyTheme(theme === "dark" ? "light" : "dark", true);
  });

  document.addEventListener("astro:page-load", syncControls);
  document.addEventListener("astro:after-swap", () => applyTheme(theme));
  window.addEventListener("storage", (event) => {
    if (
      event.key === "theme" &&
      (event.newValue === "light" || event.newValue === "dark")
    ) {
      applyTheme(event.newValue);
    }
  });
  media.addEventListener("change", ({ matches }) => {
    if (!getStoredTheme()) applyTheme(matches ? "dark" : "light");
  });

  applyTheme(theme);
})();
