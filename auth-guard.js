(() => {
  "use strict";

  const SECRET = "plumber-2026-key";
  const PARAM_NAME = "k";
  const STORAGE_KEY = "plumber_rush_auth";

  function readLocalStorage() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function writeLocalStorage(value) {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch (e) {
      /* private mode or storage disabled — ignore */
    }
  }

  function isAuthenticated() {
    if (readLocalStorage() === SECRET) return true;

    const hash = (window.location.hash || "").replace(/^#/, "");
    const hashParams = new URLSearchParams(hash);
    if (hashParams.get(PARAM_NAME) === SECRET) {
      writeLocalStorage(SECRET);
      return true;
    }

    const queryParams = new URLSearchParams(window.location.search || "");
    if (queryParams.get(PARAM_NAME) === SECRET) {
      writeLocalStorage(SECRET);
      return true;
    }

    return false;
  }

  if (isAuthenticated()) return;

  try { window.stop(); } catch (e) { /* not supported on this engine */ }

  const denied =
    '<head>' +
    '<meta charset="utf-8">' +
    '<meta name="viewport" content="width=device-width, initial-scale=1.0">' +
    '<meta name="robots" content="noindex, nofollow">' +
    '<title>Access denied</title>' +
    '<style>' +
    'html, body { margin: 0; height: 100%; background: #050505; color: #ccc;' +
    '  font-family: "Courier New", monospace; display: grid; place-items: center; }' +
    'main { text-align: center; padding: 40px; max-width: 540px; }' +
    'h1 { color: #ff7474; font-size: clamp(28px, 6vw, 56px); margin: 0 0 18px;' +
    '  text-shadow: 4px 4px 0 #1b0d08; letter-spacing: 2px; }' +
    'p { color: #aaa; line-height: 1.6; font-size: clamp(14px, 2vw, 18px); }' +
    'code { color: #fde68a; background: rgba(255,255,255,0.08); padding: 2px 6px;' +
    '  border-radius: 3px; }' +
    '</style>' +
    '</head>' +
    '<body>' +
    '<main>' +
    '<h1>ACCESS DENIED</h1>' +
    '<p>This page is private.<br>Open the URL with the correct <code>#k=...</code> ' +
    'parameter, or ask the owner for the access link.</p>' +
    '</main>' +
    '</body>';

  document.documentElement.innerHTML = denied;
  document.title = "Access denied";
})();
