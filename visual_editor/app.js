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
const sidebarCollapsedRailEl = document.getElementById("sidebarCollapsedRail");
const sidebarPanelEls = Array.from(document.querySelectorAll(".sidebar-panel"));
const collapsedRailButtonEls = Array.from(sidebarCollapsedRailEl.querySelectorAll(".collapsed-rail-button"));
const inspectorSidebarEl = document.getElementById("inspectorSidebar");
const addBlockDockEl = document.getElementById("addBlockDock");
const addBlockToggleButton = document.getElementById("addBlockToggleButton");
const deleteNodeButton = document.getElementById("deleteNodeButton");
const nodeContextMenuEl = document.getElementById("nodeContextMenu");
const contextDeleteButton = document.getElementById("contextDeleteButton");
const newLabelButton = document.getElementById("newLabelButton");
const labelGraphListEl = document.getElementById("labelGraphList");
const characterListEl = document.getElementById("characterList");
const characterListEmptyEl = document.getElementById("characterListEmpty");
const charactersListViewEl = document.getElementById("charactersListView");
const characterDetailViewEl = document.getElementById("characterDetailView");
const newCharacterButton = document.getElementById("newCharacterButton");
const characterBackButton = document.getElementById("characterBackButton");
const characterIdInput = document.getElementById("characterIdInput");
const characterNameInput = document.getElementById("characterNameInput");
const characterKindInput = document.getElementById("characterKindInput");
const characterCodePreviewEl = document.getElementById("characterCodePreview");
const visualProjectStatsEl = document.getElementById("visualProjectStats");

const inspectorEmptyEl = document.getElementById("inspectorEmpty");
const inspectorFormEl = document.getElementById("inspectorForm");
const nodeIdInput = document.getElementById("nodeIdInput");
const nodeTypeInput = document.getElementById("nodeTypeInput");
const nodeTitleInput = document.getElementById("nodeTitleInput");
const nodeContentInput = document.getElementById("nodeContentInput");

const saveDraftButton = document.getElementById("saveDraftButton");
const exportButton = document.getElementById("exportButton");

const storageKey = projectPath
  ? `renpy-visual-editor:${projectPath}`
  : "renpy-visual-editor:default";

const defaultViewport = {
  x: 0,
  y: 0,
  scale: 1,
};

const defaultStarterNodes = [
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
];

const defaultProjectState = {
  meta: {
    name: "Ren'Py Visual Project",
  },
  graphs: [
    {
      id: "label_start",
      label: "start",
      viewport: structuredClone(defaultViewport),
      nodes: structuredClone(defaultStarterNodes),
      selectedNodeId: "dialogue_1",
    },
  ],
  characters: [],
  activeGraphId: "label_start",
};

let state = normalizeState(loadState());
let sidebarOpen = true;
let activeSidebarSectionId = "projectOverviewSection";
let inspectorOpen = true;
let addBlockOpen = false;
let panSession = null;
let dragSession = null;
let contextMenuNodeId = null;
let draggedLabelGraphId = null;
let labelOrderChangedDuringDrag = false;
let renamingGraphId = null;
let activeCharacterId = null;
let characterDetailOpen = false;

function loadState() {
  try {
    const raw = window.localStorage.getItem(storageKey);

    if (!raw) {
      return structuredClone(defaultProjectState);
    }

    return JSON.parse(raw);
  } catch (error) {
    console.error(error);
    return structuredClone(defaultProjectState);
  }
}

function normalizeState(rawState) {
  const normalizedGraphs = Array.isArray(rawState.graphs) && rawState.graphs.length
    ? rawState.graphs.map((graph, index) => normalizeGraph(graph, index))
    : [normalizeLegacyGraph(rawState)];
  const normalizedCharacters = Array.isArray(rawState.characters)
    ? rawState.characters.map((character, index) => normalizeCharacter(character, index))
    : [];
  const activeGraphId = normalizedGraphs.some((graph) => graph.id === rawState.activeGraphId)
    ? rawState.activeGraphId
    : normalizedGraphs[0]?.id ?? null;

  return {
    meta: {
      ...defaultProjectState.meta,
      ...(rawState.meta || {}),
    },
    graphs: normalizedGraphs,
    characters: normalizedCharacters,
    activeGraphId,
  };
}

function normalizeGraph(graph, index) {
  const nodes = Array.isArray(graph.nodes)
    ? graph.nodes
    : structuredClone(defaultStarterNodes);
  const selectedNodeId = nodes.some((node) => node.id === graph.selectedNodeId)
    ? graph.selectedNodeId
    : (nodes[0]?.id ?? null);

  return {
    id: graph.id || `label_${index + 1}`,
    label: graph.label || `label_${index + 1}`,
    viewport: {
      ...defaultViewport,
      ...(graph.viewport || {}),
      scale: clampScale(graph.viewport?.scale ?? defaultViewport.scale),
    },
    nodes,
    selectedNodeId,
  };
}

function normalizeLegacyGraph(rawState) {
  const graph = normalizeGraph({
    id: "label_main",
    label: rawState.meta?.name || "main",
    viewport: rawState.viewport,
    nodes: rawState.nodes,
    selectedNodeId: rawState.selectedNodeId,
  }, 0);

  return graph;
}

function normalizeCharacter(character, index) {
  return {
    id: character.id || `character_${index + 1}`,
    name: character.name || `Character ${index + 1}`,
    kind: character.kind || "adv",
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
  sidebarToggleButton.classList.toggle("is-collapsed", !sidebarOpen);
  sidebarToggleButton.setAttribute("aria-expanded", String(sidebarOpen));
  sidebarToggleButton.setAttribute("aria-label", sidebarOpen ? "Collapse sidebar" : "Expand sidebar");
  sidebarToggleButton.title = sidebarOpen ? "Collapse sidebar" : "Expand sidebar";
}

function setSidebarSection(sectionId) {
  activeSidebarSectionId = sectionId;

  sidebarPanelEls.forEach((panel) => {
    panel.classList.toggle("is-active", panel.id === activeSidebarSectionId);
  });

  collapsedRailButtonEls.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.sidebarSection === activeSidebarSectionId);
  });
}

function openSidebarSection(sectionId) {
  setSidebarSection(sectionId);
  setSidebarState(true);
}

function setInspectorState(nextOpen) {
  inspectorOpen = nextOpen;
  inspectorSidebarEl.classList.toggle("is-open", inspectorOpen);
  addBlockDockEl.classList.toggle("is-offset-for-inspector", inspectorOpen);
}

function setAddBlockState(nextOpen) {
  addBlockOpen = nextOpen;
  addBlockDockEl.classList.toggle("is-open", addBlockOpen);
  addBlockToggleButton.setAttribute("aria-expanded", String(addBlockOpen));
}

function setContextMenuState(nextOpen, options = {}) {
  if (!nextOpen) {
    contextMenuNodeId = null;
    nodeContextMenuEl.classList.remove("is-open");
    return;
  }

  contextMenuNodeId = options.nodeId ?? contextMenuNodeId;
  nodeContextMenuEl.classList.add("is-open");
  nodeContextMenuEl.style.left = "0px";
  nodeContextMenuEl.style.top = "0px";

  const margin = 12;
  const menuWidth = nodeContextMenuEl.offsetWidth;
  const menuHeight = nodeContextMenuEl.offsetHeight;
  const left = Math.min(
    Math.max(margin, options.x ?? margin),
    window.innerWidth - menuWidth - margin,
  );
  const top = Math.min(
    Math.max(margin, options.y ?? margin),
    window.innerHeight - menuHeight - margin,
  );

  nodeContextMenuEl.style.left = `${left}px`;
  nodeContextMenuEl.style.top = `${top}px`;
}

function getActiveGraph() {
  return state.graphs.find((graph) => graph.id === state.activeGraphId) ?? null;
}

function createBlankGraph(label) {
  return {
    id: `label_${Date.now()}`,
    label,
    viewport: structuredClone(defaultViewport),
    nodes: [
      {
        id: "start",
        type: "start",
        title: "Start",
        content: `Entry point for ${label}.`,
        x: 48,
        y: 48,
      },
    ],
    selectedNodeId: "start",
  };
}

function createBlankCharacter() {
  const nextIndex = state.characters.length + 1;

  return {
    id: `character_${nextIndex}`,
    name: `Character ${nextIndex}`,
    kind: "adv",
  };
}

function getActiveCharacter() {
  return state.characters.find((character) => character.id === activeCharacterId) ?? null;
}

function clampScale(value) {
  return Math.min(2.5, Math.max(0.35, value));
}

function formatZoom(scale) {
  return `${Math.round(scale * 100)}%`;
}

function renderViewport() {
  const graph = getActiveGraph();
  const { x, y, scale } = graph?.viewport || defaultViewport;
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

function reorderLabelGraphs(movedId, targetId, position) {
  if (!movedId || !targetId || movedId === targetId) {
    return false;
  }

  const movedGraph = state.graphs.find((graph) => graph.id === movedId);

  if (!movedGraph) {
    return false;
  }

  const remainingGraphs = state.graphs.filter((graph) => graph.id !== movedId);
  const targetIndex = remainingGraphs.findIndex((graph) => graph.id === targetId);

  if (targetIndex === -1) {
    return false;
  }

  const insertIndex = position === "after" ? targetIndex + 1 : targetIndex;
  remainingGraphs.splice(insertIndex, 0, movedGraph);
  state.graphs = remainingGraphs;

  return true;
}

function animateLabelGraphDomOrder() {
  const items = Array.from(labelGraphListEl.querySelectorAll(".label-graph-item"));
  const itemMap = new Map(items.map((item) => [item.dataset.graphId, item]));
  const firstRects = new Map(items.map((item) => [item.dataset.graphId, item.getBoundingClientRect()]));

  state.graphs.forEach((graph) => {
    const item = itemMap.get(graph.id);

    if (item) {
      labelGraphListEl.appendChild(item);
    }
  });

  state.graphs.forEach((graph) => {
    const item = itemMap.get(graph.id);
    const firstRect = firstRects.get(graph.id);

    if (!item || !firstRect) {
      return;
    }

    const lastRect = item.getBoundingClientRect();
    const deltaY = firstRect.top - lastRect.top;

    if (!deltaY) {
      return;
    }

    item.style.transition = "none";
    item.style.transform = `translateY(${deltaY}px)`;
    item.getBoundingClientRect();

    window.requestAnimationFrame(() => {
      item.style.transition = "";
      item.style.transform = "";
    });
  });
}

function startLabelRename(graphId) {
  renamingGraphId = graphId;
  renderLabelGraphList();

  window.requestAnimationFrame(() => {
    const input = labelGraphListEl.querySelector(".label-graph-input");
    input?.focus();
    input?.select();
  });
}

function finishLabelRename(graphId, nextLabel, { cancel = false } = {}) {
  const graph = state.graphs.find((currentGraph) => currentGraph.id === graphId);

  if (!graph) {
    renamingGraphId = null;
    render();
    return;
  }

  if (!cancel) {
    const normalizedLabel = nextLabel.trim() || graph.label;

    if (normalizedLabel !== graph.label) {
      graph.label = normalizedLabel;
      saveState(`Renamed label graph to "${graph.label}".`);
    }
  }

  renamingGraphId = null;
  render();
}

function renderLabelGraphList() {
  labelGraphListEl.innerHTML = "";

  state.graphs.forEach((graph) => {
    const item = document.createElement("div");
    item.className = "label-graph-item";
    item.dataset.graphId = graph.id;
    item.draggable = renamingGraphId !== graph.id;

    if (graph.id === state.activeGraphId) {
      item.classList.add("is-active");
    }

    if (graph.id === draggedLabelGraphId) {
      item.classList.add("is-dragging");
    }

    if (graph.id === renamingGraphId) {
      const input = document.createElement("input");
      input.type = "text";
      input.className = "label-graph-input";
      input.value = graph.label;

      const meta = document.createElement("span");
      meta.textContent = `${graph.nodes.length} blocks`;

      input.addEventListener("click", (event) => {
        event.stopPropagation();
      });
      input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          finishLabelRename(graph.id, input.value);
        }

        if (event.key === "Escape") {
          event.preventDefault();
          finishLabelRename(graph.id, graph.label, { cancel: true });
        }
      });
      input.addEventListener("blur", () => {
        if (renamingGraphId === graph.id) {
          finishLabelRename(graph.id, input.value);
        }
      });

      item.appendChild(input);
      item.appendChild(meta);
    } else {
      item.setAttribute("role", "button");
      item.tabIndex = 0;
      item.innerHTML = `
        <strong>${escapeHtml(graph.label)}</strong>
        <span>${graph.nodes.length} blocks</span>
      `;

      item.addEventListener("click", () => {
        state.activeGraphId = graph.id;
        setContextMenuState(false);
        setAddBlockState(false);
        setInspectorState(Boolean(graph.selectedNodeId));
        render();
        setStatus(`Opened label graph "${graph.label}".`);
      });
      item.addEventListener("dblclick", (event) => {
        event.preventDefault();
        event.stopPropagation();
        startLabelRename(graph.id);
      });
      item.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          state.activeGraphId = graph.id;
          setContextMenuState(false);
          setAddBlockState(false);
          setInspectorState(Boolean(graph.selectedNodeId));
          render();
          setStatus(`Opened label graph "${graph.label}".`);
        }
      });
    }

    item.addEventListener("dragstart", (event) => {
      if (renamingGraphId === graph.id) {
        event.preventDefault();
        return;
      }

      draggedLabelGraphId = graph.id;
      labelOrderChangedDuringDrag = false;
      item.classList.add("is-dragging");
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("text/plain", graph.id);
    });
    item.addEventListener("dragover", (event) => {
      if (!draggedLabelGraphId || draggedLabelGraphId === graph.id) {
        return;
      }

      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
      const rect = item.getBoundingClientRect();
      const nextPosition = event.clientY >= rect.top + rect.height / 2 ? "after" : "before";
      const didReorder = reorderLabelGraphs(draggedLabelGraphId, graph.id, nextPosition);

      if (didReorder) {
        labelOrderChangedDuringDrag = true;
        animateLabelGraphDomOrder();
      }
    });
    item.addEventListener("drop", (event) => {
      event.preventDefault();
    });
    item.addEventListener("dragend", () => {
      const movedGraph = state.graphs.find((currentGraph) => currentGraph.id === draggedLabelGraphId);

      labelGraphListEl.classList.add("is-no-transition");
      labelGraphListEl.querySelectorAll(".label-graph-item").forEach((labelItem) => {
        labelItem.classList.remove("is-dragging");
      });

      if (labelOrderChangedDuringDrag && movedGraph) {
        saveState(`Reordered label graph "${movedGraph.label}".`);
      }

      draggedLabelGraphId = null;
      labelOrderChangedDuringDrag = false;
      renderLabelGraphList();

      window.requestAnimationFrame(() => {
        labelGraphListEl.classList.remove("is-no-transition");
      });
    });

    labelGraphListEl.appendChild(item);
  });
}

function openCharacterDetail(characterId) {
  activeCharacterId = characterId;
  characterDetailOpen = true;
  renderCharactersPanel();
  const character = getActiveCharacter();

  if (character) {
    setStatus(`Opened character "${character.name}".`);
  }
}

function closeCharacterDetail() {
  characterDetailOpen = false;
  renderCharactersPanel();
}

function formatCharacterCode(character) {
  if (!character) {
    return "";
  }

  const safeId = character.id.trim() || "character";
  const nameValue = character.name.trim() ? `"${escapeRenpyString(character.name.trim())}"` : "None";

  return `define ${safeId} = Character(${nameValue}, kind=${character.kind})`;
}

function escapeRenpyString(value) {
  return value.replaceAll("\\", "\\\\").replaceAll('"', '\\"');
}

function syncCharacterDetailFields() {
  const character = getActiveCharacter();

  if (!character) {
    characterIdInput.value = "";
    characterNameInput.value = "";
    characterKindInput.value = "adv";
    characterCodePreviewEl.textContent = "";
    return;
  }

  characterIdInput.value = character.id;
  characterNameInput.value = character.name;
  characterKindInput.value = character.kind;
  characterCodePreviewEl.textContent = formatCharacterCode(character);
}

function renderCharactersPanel() {
  const hasCharacters = state.characters.length > 0;

  if (!hasCharacters) {
    activeCharacterId = null;
    characterDetailOpen = false;
  } else if (!getActiveCharacter()) {
    activeCharacterId = state.characters[0].id;
  }

  if (characterDetailOpen && !getActiveCharacter()) {
    characterDetailOpen = false;
  }

  characterListEmptyEl.classList.toggle("hidden", hasCharacters);
  characterListEl.innerHTML = "";

  state.characters.forEach((character) => {
    const item = document.createElement("div");
    item.className = "character-card";
    item.setAttribute("role", "button");
    item.tabIndex = 0;

    if (character.id === activeCharacterId) {
      item.classList.add("is-active");
    }

    item.innerHTML = `
      <strong>${escapeHtml(character.name)}</strong>
      <span>${escapeHtml(character.id)} · ${escapeHtml(character.kind)}</span>
    `;

    item.addEventListener("click", () => {
      activeCharacterId = character.id;
      characterListEl.querySelectorAll(".character-card").forEach((card) => {
        card.classList.toggle("is-active", card === item);
      });
    });
    item.addEventListener("dblclick", (event) => {
      event.preventDefault();
      event.stopPropagation();
      openCharacterDetail(character.id);
    });
    item.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openCharacterDetail(character.id);
      }
    });

    characterListEl.appendChild(item);
  });

  charactersListViewEl.classList.toggle("hidden", characterDetailOpen);
  characterDetailViewEl.classList.toggle("hidden", !characterDetailOpen);
  syncCharacterDetailFields();
}

function renderVisualProjectStats() {
  const graph = getActiveGraph();
  const stats = [
    {
      title: "Current Label",
      value: graph?.label || "None",
    },
    {
      title: "Total Label Graphs",
      value: String(state.graphs.length),
    },
    {
      title: "Blocks In Current Graph",
      value: String(graph?.nodes.length || 0),
    },
    {
      title: "Canvas Zoom",
      value: formatZoom(graph?.viewport.scale ?? defaultViewport.scale),
    },
  ];

  visualProjectStatsEl.innerHTML = stats.map((stat) => `
    <div class="visual-stat-card">
      <strong>${escapeHtml(stat.title)}</strong>
      <span>${escapeHtml(stat.value)}</span>
    </div>
  `).join("");
}

function renderGraph() {
  graphNodesEl.innerHTML = "";
  const graph = getActiveGraph();

  if (!graph) {
    return;
  }

  graph.nodes.forEach((node) => {
    const el = document.createElement("button");
    el.type = "button";
    el.className = "graph-node";

    if (node.id === graph.selectedNodeId) {
      el.classList.add("is-selected");
    }

    el.style.left = `${node.x}px`;
    el.style.top = `${node.y}px`;

    el.innerHTML = `
      <p class="node-type">${escapeHtml(node.type)}</p>
      <h3 class="node-title">${escapeHtml(node.title)}</h3>
      <p class="node-content">${escapeHtml(node.content)}</p>
    `;

    el.addEventListener("pointerdown", (event) => {
      beginNodeDrag(event, node.id, el);
    });
    el.addEventListener("pointermove", updateNodeDrag);
    el.addEventListener("pointerup", endNodeDrag);
    el.addEventListener("pointercancel", endNodeDrag);
    el.addEventListener("lostpointercapture", endNodeDrag);
    el.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      event.stopPropagation();
      selectNode(node.id, el);
      setAddBlockState(false);
      setContextMenuState(true, {
        nodeId: node.id,
        x: event.clientX,
        y: event.clientY,
      });
    });

    graphNodesEl.appendChild(el);
  });
}

function renderInspector() {
  const graph = getActiveGraph();
  const selectedNode = graph?.nodes.find((node) => node.id === graph.selectedNodeId);

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
  renderLabelGraphList();
  renderCharactersPanel();
  renderVisualProjectStats();
  renderGraph();
  renderInspector();
  renderViewport();
}

function updateSelectedNode(patch) {
  const graph = getActiveGraph();

  if (!graph || !graph.selectedNodeId) {
    return;
  }

  graph.nodes = graph.nodes.map((node) => {
    if (node.id !== graph.selectedNodeId) {
      return node;
    }

    return { ...node, ...patch };
  });

  render();
}

function updateActiveCharacter(patch) {
  const character = getActiveCharacter();

  if (!character) {
    return;
  }

  Object.assign(character, patch);

  if (typeof patch.id === "string") {
    activeCharacterId = patch.id;
  }

  syncCharacterDetailFields();
  saveState();
}

function resetGraph() {
  const graph = getActiveGraph();

  if (!graph) {
    return;
  }

  graph.viewport = structuredClone(defaultViewport);
  graph.nodes = structuredClone(defaultStarterNodes);
  graph.selectedNodeId = defaultStarterNodes[1].id;
  setContextMenuState(false);
  setInspectorState(Boolean(graph.selectedNodeId));
  setAddBlockState(false);
  saveState(`Reset label graph "${graph.label}".`);
  render();
}

function exportGraph() {
  saveState("Stored local draft and prepared export placeholder.");
  setStatus("Export placeholder complete. Next step: write generated .rpy into the project.");
}

function deleteNode(nodeId) {
  const graph = getActiveGraph();
  const node = findNode(nodeId);

  if (!graph || !node) {
    return;
  }

  graph.nodes = graph.nodes.filter((currentNode) => currentNode.id !== nodeId);

  if (graph.selectedNodeId === nodeId) {
    graph.selectedNodeId = graph.nodes[0]?.id ?? null;
  }

  setContextMenuState(false);
  render();
  setInspectorState(Boolean(graph.selectedNodeId));
  saveState(`Deleted ${node.title}.`);
}

function findNode(nodeId) {
  return getActiveGraph()?.nodes.find((node) => node.id === nodeId);
}

function selectNode(nodeId, element) {
  const graph = getActiveGraph();

  if (!graph) {
    return;
  }

  graph.selectedNodeId = nodeId;
  setInspectorState(true);
  setAddBlockState(false);
  setContextMenuState(false);

  graphNodesEl.querySelectorAll(".graph-node.is-selected").forEach((nodeEl) => {
    nodeEl.classList.remove("is-selected");
  });

  if (element) {
    element.classList.add("is-selected");
  }

  renderInspector();
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
  const graph = getActiveGraph();

  if (event.button !== 0) {
    return;
  }

  if (!graph || event.target.closest(".graph-node")) {
    return;
  }

  setInspectorState(false);
  setAddBlockState(false);
  setContextMenuState(false);

  panSession = {
    pointerId: event.pointerId,
    startX: event.clientX,
    startY: event.clientY,
    originX: graph.viewport.x,
    originY: graph.viewport.y,
  };

  canvasEl.classList.add("is-panning");
  canvasEl.setPointerCapture(event.pointerId);
}

function beginNodeDrag(event, nodeId, element) {
  const graph = getActiveGraph();

  if (event.button !== 0) {
    return;
  }

  event.stopPropagation();

  const node = graph?.nodes.find((currentNode) => currentNode.id === nodeId);

  if (!node) {
    return;
  }

  selectNode(nodeId, element);

  dragSession = {
    pointerId: event.pointerId,
    nodeId,
    element,
    startX: event.clientX,
    startY: event.clientY,
    originX: node.x,
    originY: node.y,
    moved: false,
  };

  element.classList.add("is-dragging");
  element.setPointerCapture(event.pointerId);
}

function updatePan(event) {
  const graph = getActiveGraph();

  if (!panSession || event.pointerId !== panSession.pointerId) {
    return;
  }

  if (!graph) {
    return;
  }

  graph.viewport.x = panSession.originX + (event.clientX - panSession.startX);
  graph.viewport.y = panSession.originY + (event.clientY - panSession.startY);
  renderViewport();
}

function updateNodeDrag(event) {
  const graph = getActiveGraph();

  if (!dragSession || event.pointerId !== dragSession.pointerId) {
    return;
  }

  const node = graph?.nodes.find((currentNode) => currentNode.id === dragSession.nodeId);

  if (!node) {
    return;
  }

  const deltaX = (event.clientX - dragSession.startX) / graph.viewport.scale;
  const deltaY = (event.clientY - dragSession.startY) / graph.viewport.scale;

  if (Math.abs(deltaX) > 1 || Math.abs(deltaY) > 1) {
    dragSession.moved = true;
  }

  node.x = Math.round(dragSession.originX + deltaX);
  node.y = Math.round(dragSession.originY + deltaY);

  dragSession.element.style.left = `${node.x}px`;
  dragSession.element.style.top = `${node.y}px`;
}

function endPan(event) {
  if (!panSession || event.pointerId !== panSession.pointerId) {
    return;
  }

  panSession = null;
  canvasEl.classList.remove("is-panning");
}

function endNodeDrag(event) {
  if (!dragSession || event.pointerId !== dragSession.pointerId) {
    return;
  }

  const node = findNode(dragSession.nodeId);
  const moved = dragSession.moved;

  dragSession.element.classList.remove("is-dragging");
  dragSession = null;

  if (moved && node) {
    saveState(`Moved ${node.title}.`);
  }
}

function zoomAtPoint(clientX, clientY, deltaY) {
  const graph = getActiveGraph();

  if (!graph) {
    return;
  }

  const rect = canvasEl.getBoundingClientRect();
  const nextScale = clampScale(graph.viewport.scale * Math.exp(-deltaY * 0.0015));

  if (nextScale === graph.viewport.scale) {
    return;
  }

  const surfaceX = clientX - rect.left;
  const surfaceY = clientY - rect.top;
  const worldX = (surfaceX - graph.viewport.x) / graph.viewport.scale;
  const worldY = (surfaceY - graph.viewport.y) / graph.viewport.scale;

  graph.viewport.scale = nextScale;
  graph.viewport.x = surfaceX - worldX * nextScale;
  graph.viewport.y = surfaceY - worldY * nextScale;

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

exportButton.addEventListener("click", exportGraph);
addBlockToggleButton.addEventListener("click", () => {
  setContextMenuState(false);
  setAddBlockState(!addBlockOpen);
});
newLabelButton.addEventListener("click", () => {
  const nextIndex = state.graphs.length + 1;
  const nextGraph = createBlankGraph(`label_${nextIndex}`);

  state.graphs.push(nextGraph);
  state.activeGraphId = nextGraph.id;
  setContextMenuState(false);
  setInspectorState(true);
  setAddBlockState(false);
  render();
  saveState(`Created label graph "${nextGraph.label}".`);
});
newCharacterButton.addEventListener("click", () => {
  const newCharacter = createBlankCharacter();

  state.characters.push(newCharacter);
  activeCharacterId = newCharacter.id;
  characterDetailOpen = false;
  renderCharactersPanel();
  saveState(`Created character "${newCharacter.name}".`);
});
characterBackButton.addEventListener("click", () => {
  closeCharacterDetail();
  setStatus("Returned to character list.");
});
characterIdInput.addEventListener("input", (event) => {
  updateActiveCharacter({ id: event.target.value });
});
characterNameInput.addEventListener("input", (event) => {
  updateActiveCharacter({ name: event.target.value });
});
characterKindInput.addEventListener("change", (event) => {
  updateActiveCharacter({ kind: event.target.value });
});
deleteNodeButton.addEventListener("click", () => {
  const graph = getActiveGraph();

  if (!graph?.selectedNodeId) {
    return;
  }

  deleteNode(graph.selectedNodeId);
});
contextDeleteButton.addEventListener("click", () => {
  if (!contextMenuNodeId) {
    return;
  }

  deleteNode(contextMenuNodeId);
});
sidebarToggleButton.addEventListener("click", () => {
  setSidebarState(!sidebarOpen);
});
sidebarCollapsedRailEl.querySelectorAll(".collapsed-rail-button").forEach((button) => {
  button.addEventListener("click", () => {
    openSidebarSection(button.dataset.sidebarSection);
  });
});
canvasEl.addEventListener("pointerdown", beginPan);
canvasEl.addEventListener("pointermove", updatePan);
canvasEl.addEventListener("pointerup", endPan);
canvasEl.addEventListener("pointercancel", endPan);
canvasEl.addEventListener("lostpointercapture", endPan);
canvasEl.addEventListener("wheel", (event) => {
  event.preventDefault();
  setContextMenuState(false);
  zoomAtPoint(event.clientX, event.clientY, event.deltaY);
}, { passive: false });

document.addEventListener("pointerdown", (event) => {
  if (nodeContextMenuEl.contains(event.target)) {
    return;
  }

  setContextMenuState(false);
});

labelGraphListEl.addEventListener("dragover", (event) => {
  if (!draggedLabelGraphId) {
    return;
  }

  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
});

labelGraphListEl.addEventListener("drop", (event) => {
  if (!draggedLabelGraphId) {
    return;
  }

  event.preventDefault();
});

document.querySelectorAll(".node-card").forEach((button) => {
  button.addEventListener("click", () => {
    const graph = getActiveGraph();
    const nodeType = button.dataset.nodeType;

    if (!graph) {
      return;
    }

    const newNode = {
      id: `${nodeType}_${Date.now()}`,
      type: nodeType,
      title: `${capitalize(nodeType)} Node`,
      content: "New node content.",
      x: 96 + graph.nodes.length * 28,
      y: 96 + graph.nodes.length * 20,
    };

    graph.nodes.push(newNode);
    graph.selectedNodeId = newNode.id;
    render();
    setInspectorState(true);
    setAddBlockState(false);
    setStatus(`Added a ${nodeType} node to "${graph.label}".`);
  });
});

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

render();
setSidebarSection(activeSidebarSectionId);
setSidebarState(true);
setInspectorState(Boolean(getActiveGraph()?.selectedNodeId));
setAddBlockState(false);
setStatus("Visual editor scaffold ready. Drag empty space to move the canvas, and use the mouse wheel to zoom.");
