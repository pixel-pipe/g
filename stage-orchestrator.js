(() => {
  "use strict";

  const STAGES = [
    { number: 1, world: "1-1", name: "Overworld", file: "stage-1.html", enemyType: "kuribo" },
    { number: 2, world: "1-2", name: "Underground", file: "stage-2.html", enemyType: "nokonoko" },
    { number: 3, world: "1-3", name: "Castle", file: "stage-3.html", enemyType: "bombhei" },
    { number: 4, world: "1-4", name: "Sky Seesaw", file: "stage-4.html", enemyType: "kuribo" }
  ];
  const GAME_ASSET_VERSION = "2026-05-05-stage1-secret-sky-v3";

  const root = document.getElementById("stageRoot") || document.body;
  const mode = document.body.dataset.mode || (document.body.dataset.stage ? "stage" : "hub");

  injectStyle();

  if (mode === "stage") {
    renderStageShell(Number.parseInt(document.body.dataset.stage || "1", 10));
  } else {
    renderHub();
  }

  window.addEventListener("message", (event) => {
    const data = event.data;
    if (!data || data.source !== "plumber-rush") return;

    const status = document.getElementById("stageStatus");
    if (!status) return;

    if (data.type === "stage-loaded") {
      status.textContent = `${data.world} ${data.name} loaded`;
      return;
    }

    if (data.type === "stage-complete") {
      const nextStage = STAGES[data.levelIndex + 1];
      status.textContent = nextStage
        ? `${data.world} complete. Next: ${nextStage.world} ${nextStage.name}`
        : `${data.world} complete.`;
    }
  });

  function renderHub() {
    root.innerHTML = `
      <div class="dev-shell">
        <header class="devbar">
          <div class="brand">
            <strong>Stage Orchestrator</strong>
            <span id="stageStatus">Full run loaded</span>
          </div>
          <nav class="actions" aria-label="Stage controls">
            <button type="button" data-load="full">Full Run</button>
            ${STAGES.map(stage => `<button type="button" data-load="${stage.number}">${stage.world}</button>`).join("")}
          </nav>
        </header>
        <iframe id="gameFrame" title="Plumber Rush" src="${buildFullRunSrc()}"></iframe>
      </div>
    `;

    root.querySelectorAll("[data-load]").forEach((button) => {
      button.addEventListener("click", () => {
        const value = button.dataset.load;
        const frame = document.getElementById("gameFrame");
        const status = document.getElementById("stageStatus");
        if (value === "full") {
          frame.src = buildFullRunSrc();
          status.textContent = "Full run loaded";
          return;
        }
        const stage = stageByNumber(Number.parseInt(value, 10));
        frame.src = buildStageSrc(stage);
        status.textContent = `${stage.world} ${stage.name} loaded`;
      });
    });
  }

  function renderStageShell(stageNumber) {
    const baseStage = stageByNumber(stageNumber);
    const stage = {
      ...baseStage,
      enemyType: document.body.dataset.enemyType || baseStage.enemyType
    };
    const previousStage = STAGES[stage.number - 2];
    const nextStage = STAGES[stage.number];

    root.innerHTML = `
      <div class="dev-shell">
        <header class="devbar">
          <div class="brand">
            <strong>${stage.world} ${stage.name}</strong>
            <span id="stageStatus">Standalone stage loaded</span>
          </div>
          <nav class="actions" aria-label="Stage navigation">
            <a href="${buildOrchestratorSrc()}">Orchestrator</a>
            <a href="${buildFullRunSrc()}">Full Run</a>
            ${previousStage ? `<a href="${buildStagePageSrc(previousStage)}">Prev</a>` : `<span class="disabled">Prev</span>`}
            ${nextStage ? `<a href="${buildStagePageSrc(nextStage)}">Next</a>` : `<span class="disabled">Next</span>`}
          </nav>
        </header>
        <iframe id="gameFrame" title="${stage.world} ${stage.name}" src="${buildStageSrc(stage)}"></iframe>
      </div>
    `;
  }

  function buildStageSrc(stage) {
    const params = new URLSearchParams();
    params.set("stage", String(stage.number));
    params.set("single", "1");
    params.set("enemyType", stage.enemyType || "default");
    params.set("v", GAME_ASSET_VERSION);
    params.set("orchestrator", "orchestrator.html");
    const nextStage = STAGES[stage.number];
    if (nextStage) params.set("next", nextStage.file);
    return `mario.html?${params.toString()}`;
  }

  function buildFullRunSrc() {
    return `mario.html?v=${encodeURIComponent(GAME_ASSET_VERSION)}`;
  }

  function buildOrchestratorSrc() {
    return `orchestrator.html?v=${encodeURIComponent(GAME_ASSET_VERSION)}`;
  }

  function buildStagePageSrc(stage) {
    return `${stage.file}?v=${encodeURIComponent(GAME_ASSET_VERSION)}`;
  }

  function stageByNumber(stageNumber) {
    return STAGES.find(stage => stage.number === stageNumber) || STAGES[0];
  }

  function injectStyle() {
    if (document.getElementById("stageOrchestratorStyle")) return;
    const style = document.createElement("style");
    style.id = "stageOrchestratorStyle";
    style.textContent = `
      * { box-sizing: border-box; }
      html, body { width: 100%; height: 100%; margin: 0; }
      body {
        background: #0f172a;
        color: #f8fafc;
        font-family: "Courier New", monospace;
        overflow: hidden;
      }
      .dev-shell {
        width: 100%;
        height: 100vh;
        display: grid;
        grid-template-rows: auto minmax(0, 1fr);
      }
      .devbar {
        min-height: 52px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 14px;
        padding: 8px 12px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.16);
        background: #111827;
      }
      .brand {
        min-width: 0;
        display: flex;
        align-items: baseline;
        gap: 12px;
      }
      .brand strong {
        font-size: 16px;
        white-space: nowrap;
      }
      .brand span {
        color: rgba(248, 250, 252, 0.66);
        font-size: 12px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .actions {
        display: flex;
        align-items: center;
        gap: 6px;
        flex-wrap: wrap;
        justify-content: flex-end;
      }
      .actions button,
      .actions a,
      .actions .disabled {
        min-height: 34px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0 12px;
        border: 1px solid rgba(255, 255, 255, 0.18);
        border-radius: 6px;
        background: rgba(255, 255, 255, 0.08);
        color: #f8fafc;
        font: inherit;
        font-size: 13px;
        text-decoration: none;
        white-space: nowrap;
      }
      .actions button {
        cursor: pointer;
      }
      .actions button:hover,
      .actions a:hover {
        background: rgba(250, 204, 21, 0.18);
        border-color: rgba(250, 204, 21, 0.55);
      }
      .actions .disabled {
        color: rgba(248, 250, 252, 0.38);
      }
      iframe {
        width: 100%;
        height: 100%;
        border: 0;
        background: #1f1f1f;
      }
      @media (max-width: 760px) {
        .devbar {
          align-items: stretch;
          flex-direction: column;
        }
        .brand {
          justify-content: space-between;
        }
        .actions {
          justify-content: flex-start;
        }
      }
    `;
    document.head.appendChild(style);
  }
})();
