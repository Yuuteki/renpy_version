const params = new URLSearchParams(window.location.search);
const projectPath = params.get("project") || "";

const projectPathEl = document.getElementById("projectPath");
const projectFilesEl = document.getElementById("projectFiles");
const canvasEl = document.getElementById("canvas");
const gridOverlayEl = canvasEl.querySelector(".grid-overlay");
const graphNodesEl = document.getElementById("graphNodes");
const statusTextEl = document.getElementById("statusText");
const sidebarEl = document.getElementById("sidebar");
const sidebarToggleButton = document.getElementById("sidebarToggleButton");
const sidebarCloseButton = document.getElementById("sidebarCloseButton");

const inspectorEmptyEl = document.getElementById("inspectorEmpty");
const inspectorFormEl = document.getElementById("inspectorForm");
const nodeIdInput = document.getElementById("nodeIdInput");
const nodeTypeInput = document.getElementById("nodeTypeInput");
const nodeTitleInput = document.getElementById("nodeTitleInput");
const nodeContentInput = document.getElementById("nodeContentInput");

const saveDraftButton = document.getElementById("saveDraftButton");
const exportButton = document.getElementById("exportButton");
const newGraphButton = document.getElementById("newGraphButton");

const storageKey = projectPath
  ? `renpy-visual-editor:${projectPath}`
  : "renpy-visual-editor:default";

const defaultGraph = {
  meta: {
    name: "Main Flow",
  },
  viewport: {
    x: 0,
    y: 0,
    scale: 1,
  },
  nodes: [
    {
      id: "start",
      type: "start",
      title: "Start",
      content: "Entry point for this visual script.",
      x: 48,
      y: 48,
    },
    {
      id: "dialogue_1",
      type: "dialogue",
      title: "Opening Dialogue",
      content: "Welcome to the visual editor prototype.",
      x: 320,
      y: 176,
    },
  ],
  selectedNodeId: "dialogue_1",
};

let state = normalizeState(loadState());
let sidebarOpen = true;
let panSession = null;

function loadState() {
  try {
    const raw = window.localStorage.getItem(storageKey);

    if (!raw) {
      return structuredClone(defaultGraph);
    }

    return JSON.parse(raw);
  } catch (error) {
    console.error(error);
    return structuredClone(defaultGraph);
  }
}

function normalizeState(rawState) {
  return {
    meta: {
      ...defaultGraph.meta,
      ...(rawState.meta || {}),
    },
    viewport: {
      ...defaultGraph.viewport,
      ...(rawState.viewport || {}),
      scale: clampScale(rawState.viewport?.scale ?? defaultGraph.viewport.scale),
    },
    nodes: Array.isArray(rawState.nodes) && rawState.nodes.length
      ? rawState.nodes
      : structuredClone(defaultGraph.nodes),
    selectedNodeId: rawState.selectedNodeId || defaultGraph.selectedNodeId,
  };
}

function saveState(message) {
  window.localStorage.setItem(storageKey, JSON.stringify(state, null, 2));

  if (message) {
    setStatus(message);
  }
}

function setStatus(message) {
  statusTextEl.textContent = message;
}

function setSidebarState(nextOpen) {
  sidebarOpen = nextOpen;
  sidebarEl.classList.toggle("is-open", sidebarOpen);
  sidebarToggleButton.setAttribute("aria-expanded", String(sidebarOpen));
  sidebarToggleButton.querySelector(".sidebar-toggle-label").textContent = sidebarOpen ? "Hide" : "Tools";
}

function clampScale(value) {
  return Math.min(2.5, Math.max(0.35, value));
}

function formatZoom(scale) {
  return `${Math.round(scale * 100)}%`;
}

function renderViewport() {
  const { x, y, scale } = state.viewport;
  const gridSize = 28 * scale;

  graphNodesEl.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
  gridOverlayEl.style.backgroundSize = `${gridSize}px ${gridSize}px`;
  gridOverlayEl.style.backgroundPosition = `${x}px ${y}px`;
}

function renderProjectInfo() {
  if (!projectPath) {
    projectPathEl.textContent = "No project path was provided by the launcher.";
    projectFilesEl.textContent =
      "Expected data file: <project>/visual_editor/project.json | Export target: <project>/game/generated_visual_editor.rpy";
    return;
  }

  projectPathEl.textContent = projectPath;
  projectFilesEl.textContent =
    `${projectPath}/visual_editor/project.json | ${projectPath}/game/generated_visual_editor.rpy`;
}

function renderGraph() {
  graphNodesEl.innerHTML = "";

  state.nodes.forEach((node) => {
    const el = document.createElement("button");
    el.type = "button";
    el.className = "graph-node";

    if (node.id === state.selectedNodeId) {
      el.classList.add("is-selected");
    }

    el.style.left = `${node.x}px`;
    el.style.top = `${node.y}px`;

    el.innerHTML = `
      <p class="node-type">${escapeHtml(node.type)}</p>
      <h3 class="node-title">${escapeHtml(node.title)}</h3>
      <p class="node-content">${escapeHtml(node.content)}</p>
    `;

    el.addEventListener("click", () => {
      state.selectedNodeId = node.id;
      render();
    });

    graphNodesEl.appendChild(el);
  });
}

function renderInspector() {
  const selectedNode = state.nodes.find((node) => node.id === state.selectedNodeId);

  if (!selectedNode) {
    inspectorEmptyEl.classList.remove("hidden");
    inspectorFormEl.classList.add("hidden");
    return;
  }

  inspectorEmptyEl.classList.add("hidden");
  inspectorFormEl.classList.remove("hidden");

  nodeIdInput.value = selectedNode.id;
  nodeTypeInput.value = selectedNode.type;
  nodeTitleInput.value = selectedNode.title;
  nodeContentInput.value = selectedNode.content;
}

function render() {
  renderProjectInfo();
  renderGraph();
  renderInspector();
  renderViewport();
}

function updateSelectedNode(patch) {
  state.nodes = state.nodes.map((node) => {
    if (node.id !== state.selectedNodeId) {
      return node;
    }

    return { ...node, ...patch };
  });

  render();
}

function resetGraph() {
  state = structuredClone(defaultGraph);
  saveState("Created a fresh graph scaffold.");
  render();
}

function exportGraph() {
  saveState("Stored local draft and prepared export placeholder.");
  setStatus("Export placeholder complete. Next step: write generated .rpy into the project.");
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function beginPan(event) {
  if (event.button !== 0) {
    return;
  }

  if (event.target.closest(".graph-node")) {
    return;
  }

  panSession = {
    pointerId: event.pointerId,
    startX: event.clientX,
    startY: event.clientY,
    originX: state.viewport.x,
    originY: state.viewport.y,
  };

  canvasEl.classList.add("is-panning");
  canvasEl.setPointerCapture(event.pointerId);
}

function updatePan(event) {
  if (!panSession || event.pointerId !== panSession.pointerId) {
    return;
  }

  state.viewport.x = panSession.originX + (event.clientX - panSession.startX);
  state.viewport.y = panSession.originY + (event.clientY - panSession.startY);
  renderViewport();
}

function endPan(event) {
  if (!panSession || event.pointerId !== panSession.pointerId) {
    return;
  }

  panSession = null;
  canvasEl.classList.remove("is-panning");
}

function zoomAtPoint(clientX, clientY, deltaY) {
  const rect = canvasEl.getBoundingClientRect();
  const nextScale = clampScale(state.viewport.scale * Math.exp(-deltaY * 0.0015));

  if (nextScale === state.viewport.scale) {
    return;
  }

  const surfaceX = clientX - rect.left;
  const surfaceY = clientY - rect.top;
  const worldX = (surfaceX - state.viewport.x) / state.viewport.scale;
  const worldY = (surfaceY - state.viewport.y) / state.viewport.scale;

  state.viewport.scale = nextScale;
  state.viewport.x = surfaceX - worldX * nextScale;
  state.viewport.y = surfaceY - worldY * nextScale;

  renderViewport();
  setStatus(`Canvas zoom set to ${formatZoom(nextScale)}. Drag empty space to move the view.`);
}

nodeTitleInput.addEventListener("input", (event) => {
  updateSelectedNode({ title: event.target.value });
});

nodeContentInput.addEventListener("input", (event) => {
  updateSelectedNode({ content: event.target.value });
});

saveDraftButton.addEventListener("click", () => {
  saveState("Saved graph draft to local browser storage.");
});

newGraphButton.addEventListener("click", resetGraph);
exportButton.addEventListener("click", exportGraph);
sidebarToggleButton.addEventListener("click", () => {
  setSidebarState(!sidebarOpen);
});
sidebarCloseButton.addEventListener("click", () => {
  setSidebarState(false);
});
canvasEl.addEventListener("pointerdown", beginPan);
canvasEl.addEventListener("pointermove", updatePan);
canvasEl.addEventListener("pointerup", endPan);
canvasEl.addEventListener("pointercancel", endPan);
canvasEl.addEventListener("lostpointercapture", endPan);
canvasEl.addEventListener("wheel", (event) => {
  event.preventDefault();
  zoomAtPoint(event.clientX, event.clientY, event.deltaY);
}, { passive: false });

document.querySelectorAll(".node-card").forEach((button) => {
  button.addEventListener("click", () => {
    const nodeType = button.dataset.nodeType;
    const newNode = {
      id: `${nodeType}_${Date.now()}`,
      type: nodeType,
      title: `${capitalize(nodeType)} Node`,
      content: "New node content.",
      x: 96 + state.nodes.length * 28,
      y: 96 + state.nodes.length * 20,
    };

    state.nodes.push(newNode);
    state.selectedNodeId = newNode.id;
    render();
    setStatus(`Added a ${nodeType} node to the graph.`);
  });
});

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

render();
setSidebarState(true);
setStatus("Visual editor scaffold ready. Drag empty space to move the canvas, and use the mouse wheel to zoom.");
