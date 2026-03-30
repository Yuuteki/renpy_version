const params = new URLSearchParams(window.location.search);
const projectPath = params.get("project") || "";

const projectPathEl = document.getElementById("projectPath");
const projectFilesEl = document.getElementById("projectFiles");
const graphNodesEl = document.getElementById("graphNodes");
const statusTextEl = document.getElementById("statusText");

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

let state = loadState();

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

function saveState(message) {
  window.localStorage.setItem(storageKey, JSON.stringify(state, null, 2));

  if (message) {
    setStatus(message);
  }
}

function setStatus(message) {
  statusTextEl.textContent = message;
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
setStatus("Visual editor scaffold ready. Data currently persists in local browser storage.");
