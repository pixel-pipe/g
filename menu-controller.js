(() => {
  "use strict";

  const DEADZONE = 0.28;
  const RETURN_URL = "mario.html";
  let selectedIndex = 0;
  let prevUp = false;
  let prevDown = false;
  let prevConfirm = false;
  let prevBack = false;
  let items = [];

  function buttonPressed(pad, index) {
    const button = pad.buttons[index];
    return Boolean(button && (button.pressed || button.value > 0.5));
  }

  function currentPad() {
    if (!navigator.getGamepads) return null;
    for (const pad of navigator.getGamepads()) {
      if (pad && pad.connected) return pad;
    }
    return null;
  }

  function syncItems() {
    items = Array.from(document.querySelectorAll("a[href], button:not([disabled])"));
    if (selectedIndex >= items.length) selectedIndex = Math.max(0, items.length - 1);
    updateFocus();
  }

  function updateFocus() {
    items.forEach((item, index) => {
      item.classList.toggle("controller-focus", index === selectedIndex);
      if (index === selectedIndex) item.setAttribute("aria-current", "true");
      else item.removeAttribute("aria-current");
    });
    const current = items[selectedIndex];
    if (current && document.activeElement !== current) {
      current.focus({ preventScroll: true });
    }
  }

  function move(delta) {
    if (!items.length) return;
    selectedIndex = (selectedIndex + delta + items.length) % items.length;
    updateFocus();
  }

  function activate() {
    const current = items[selectedIndex];
    if (current) current.click();
  }

  function returnToMenu() {
    window.location.href = RETURN_URL;
  }

  function poll() {
    const pad = currentPad();
    if (!pad || !items.length) {
      prevUp = false;
      prevDown = false;
      prevConfirm = false;
      prevBack = false;
      requestAnimationFrame(poll);
      return;
    }

    const axisX = pad.axes[0] || 0;
    const axisY = pad.axes[1] || 0;
    const up = axisY < -DEADZONE || axisX < -DEADZONE ||
      buttonPressed(pad, 12) || buttonPressed(pad, 14);
    const down = axisY > DEADZONE || axisX > DEADZONE ||
      buttonPressed(pad, 13) || buttonPressed(pad, 15);
    const confirm = buttonPressed(pad, 0) || buttonPressed(pad, 1);
    const back = buttonPressed(pad, 9) || buttonPressed(pad, 5) || buttonPressed(pad, 7);

    if (up && !prevUp) move(-1);
    if (down && !prevDown) move(1);
    if (confirm && !prevConfirm) activate();
    if (back && !prevBack) returnToMenu();

    prevUp = up;
    prevDown = down;
    prevConfirm = confirm;
    prevBack = back;
    requestAnimationFrame(poll);
  }

  function installStyles() {
    const style = document.createElement("style");
    style.textContent = `
      .controller-focus {
        outline: 4px solid #fde68a !important;
        outline-offset: 4px !important;
        filter: brightness(1.14);
      }
    `;
    document.head.appendChild(style);
  }

  window.addEventListener("keydown", (event) => {
    if (!items.length) return;
    if (event.code === "ArrowUp" || event.code === "KeyW" ||
        event.code === "ArrowLeft" || event.code === "KeyA") {
      event.preventDefault();
      move(-1);
    } else if (event.code === "ArrowDown" || event.code === "KeyS" ||
               event.code === "ArrowRight" || event.code === "KeyD") {
      event.preventDefault();
      move(1);
    } else if (event.code === "Enter" || event.code === "Space") {
      event.preventDefault();
      activate();
    } else if (event.code === "Escape") {
      event.preventDefault();
      returnToMenu();
    }
  }, { passive: false });

  window.addEventListener("DOMContentLoaded", () => {
    installStyles();
    syncItems();
    requestAnimationFrame(poll);
  });
})();
