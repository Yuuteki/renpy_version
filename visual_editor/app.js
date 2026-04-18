const params = new URLSearchParams(window.location.search);
const projectPath = params.get("project") || "";

const projectPathEl = document.getElementById("projectPath");
const projectFilesEl = document.getElementById("projectFiles");
const canvasEl = document.getElementById("canvas");
const gridOverlayEl = canvasEl.querySelector(".grid-overlay");
const graphConnectionsEl = document.getElementById("graphConnections");
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
const labelListViewEl = document.getElementById("labelListView");
const labelCodePreviewViewEl = document.getElementById("labelCodePreviewView");
const labelPreviewBackButton = document.getElementById("labelPreviewBackButton");
const labelCodePreviewTitleEl = document.getElementById("labelCodePreviewTitle");
const labelCodePreviewEl = document.getElementById("labelCodePreview");
const labelContextMenuEl = document.getElementById("labelContextMenu");
const contextRenameLabelButton = document.getElementById("contextRenameLabelButton");
const contextDeleteLabelButton = document.getElementById("contextDeleteLabelButton");
const imageContextMenuEl = document.getElementById("imageContextMenu");
const contextDeleteImageButton = document.getElementById("contextDeleteImageButton");
const characterContextMenuEl = document.getElementById("characterContextMenu");
const contextDeleteCharacterButton = document.getElementById("contextDeleteCharacterButton");
const imageDefinitionListEl = document.getElementById("imageDefinitionList");
const imageDefinitionEmptyEl = document.getElementById("imageDefinitionEmpty");
const imagesListViewEl = document.getElementById("imagesListView");
const imageDefinitionDetailViewEl = document.getElementById("imageDefinitionDetailView");
const newImageDefinitionButton = document.getElementById("newImageDefinitionButton");
const imageDefinitionBackButton = document.getElementById("imageDefinitionBackButton");
const imageDefinitionNameInput = document.getElementById("imageDefinitionNameInput");
const imageDefinitionCategoryInput = document.getElementById("imageDefinitionCategoryInput");
const imageDefinitionSourcePathInput = document.getElementById("imageDefinitionSourcePathInput");
const imageDefinitionBrowseButton = document.getElementById("imageDefinitionBrowseButton");
const imageDefinitionFileInput = document.getElementById("imageDefinitionFileInput");
const imageDefinitionZoomInput = document.getElementById("imageDefinitionZoomInput");
const imageDefinitionXAnchorInput = document.getElementById("imageDefinitionXAnchorInput");
const imageDefinitionYAnchorInput = document.getElementById("imageDefinitionYAnchorInput");
const imageDefinitionXPosInput = document.getElementById("imageDefinitionXPosInput");
const imageDefinitionYPosInput = document.getElementById("imageDefinitionYPosInput");
const imageDefinitionCodePreviewEl = document.getElementById("imageDefinitionCodePreview");
const characterListEl = document.getElementById("characterList");
const characterListEmptyEl = document.getElementById("characterListEmpty");
const charactersListViewEl = document.getElementById("charactersListView");
const characterDetailViewEl = document.getElementById("characterDetailView");
const newCharacterButton = document.getElementById("newCharacterButton");
const characterBackButton = document.getElementById("characterBackButton");
const characterIdInput = document.getElementById("characterIdInput");
const characterNameInput = document.getElementById("characterNameInput");
const characterKindInput = document.getElementById("characterKindInput");
const characterDynamicInput = document.getElementById("characterDynamicInput");
const characterImageInput = document.getElementById("characterImageInput");
const characterVoiceTagInput = document.getElementById("characterVoiceTagInput");
const characterWhoColorInput = document.getElementById("characterWhoColorInput");
const characterWhoStyleInput = document.getElementById("characterWhoStyleInput");
const characterWhatStyleInput = document.getElementById("characterWhatStyleInput");
const characterWindowStyleInput = document.getElementById("characterWindowStyleInput");
const characterWindowBackgroundInput = document.getElementById("characterWindowBackgroundInput");
const characterWhoPrefixInput = document.getElementById("characterWhoPrefixInput");
const characterWhoSuffixInput = document.getElementById("characterWhoSuffixInput");
const characterWhatPrefixInput = document.getElementById("characterWhatPrefixInput");
const characterWhatSuffixInput = document.getElementById("characterWhatSuffixInput");
const characterConditionInput = document.getElementById("characterConditionInput");
const characterInteractInput = document.getElementById("characterInteractInput");
const characterAdvanceInput = document.getElementById("characterAdvanceInput");
const characterCtcInput = document.getElementById("characterCtcInput");
const characterCtcPauseInput = document.getElementById("characterCtcPauseInput");
const characterCtcTimedPauseInput = document.getElementById("characterCtcTimedPauseInput");
const characterCtcPositionInput = document.getElementById("characterCtcPositionInput");
const characterCodePreviewEl = document.getElementById("characterCodePreview");
const visualProjectStatsEl = document.getElementById("visualProjectStats");

const inspectorEmptyEl = document.getElementById("inspectorEmpty");
const startInspectorFormEl = document.getElementById("startInspectorForm");
const startNodeTypeInput = document.getElementById("startNodeTypeInput");
const imageInspectorFormEl = document.getElementById("imageInspectorForm");
const imageNodeTypeInput = document.getElementById("imageNodeTypeInput");
const imageNodeModeInput = document.getElementById("imageNodeModeInput");
const imageNodeNameLabelEl = document.getElementById("imageNodeNameLabel");
const imageNodeNameInput = document.getElementById("imageNodeNameInput");
const imageNodeLayerInput = document.getElementById("imageNodeLayerInput");
const imageNodeAtInput = document.getElementById("imageNodeAtInput");
const imageNodeAliasInput = document.getElementById("imageNodeAliasInput");
const imageNodeBehindInput = document.getElementById("imageNodeBehindInput");
const imageNodeZorderInput = document.getElementById("imageNodeZorderInput");
const imageDeleteNodeButton = document.getElementById("imageDeleteNodeButton");
const animationInspectorFormEl = document.getElementById("animationInspectorForm");
const animationNodeTypeInput = document.getElementById("animationNodeTypeInput");
const animationNodeTransitionInput = document.getElementById("animationNodeTransitionInput");
const animationDeleteNodeButton = document.getElementById("animationDeleteNodeButton");
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

const imageCategoryMeta = {
  background: {
    label: "Background",
    empty: "No background images yet.",
  },
  character: {
    label: "Character",
    empty: "No character images yet.",
  },
  others: {
    label: "Others",
    empty: "No other images yet.",
  },
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

const nodePortOffset = 8;

const defaultProjectState = {
  meta: {
    name: "Ren'Py Visual Project",
  },
  graphs: [
    {
      id: "label_start",
      label: "start",
      viewport: structuredClone(defaultViewport),
      edges: [],
      nodes: structuredClone(defaultStarterNodes),
      selectedNodeId: "dialogue_1",
    },
  ],
  images: [],
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
let connectionSession = null;
let contextMenuNodeId = null;
let contextMenuLabelGraphId = null;
let contextMenuImageDefinitionId = null;
let contextMenuCharacterId = null;
let draggedLabelGraphId = null;
let labelOrderChangedDuringDrag = false;
let renamingGraphId = null;
let labelCodePreviewGraphId = null;
let activeImageDefinitionId = null;
let imageDefinitionDetailOpen = false;
let imageCategorySectionState = {
  background: true,
  character: true,
  others: true,
};
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
  const normalizedImageDefinitions = Array.isArray(rawState.images)
    ? rawState.images.map((image, index) => normalizeImageDefinition(image, index))
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
    images: normalizedImageDefinitions,
    characters: normalizedCharacters,
    activeGraphId,
  };
}

function normalizeGraph(graph, index) {
  const rawNodes = Array.isArray(graph.nodes)
    ? graph.nodes
    : structuredClone(defaultStarterNodes);
  const firstStartNode = rawNodes.find((node) => node?.type === "start") || null;
  const nodes = firstStartNode
    ? rawNodes.filter((node) => node?.type !== "start" || node === firstStartNode)
    : [
      {
        id: "start",
        type: "start",
        title: "Start",
        content: "Entry point for this visual script.",
        x: 48,
        y: 48,
      },
      ...rawNodes,
    ];
  const startNodeId = nodes.find((node) => node?.type === "start")?.id ?? "start";
  const nodeIds = new Set(nodes.map((node) => node.id));
  const edges = Array.isArray(graph.edges)
    ? graph.edges
      .filter((edge) => edge?.fromNodeId && edge?.toNodeId)
      .filter((edge) => (
        nodeIds.has(edge.fromNodeId)
        && nodeIds.has(edge.toNodeId)
        && edge.toNodeId !== startNodeId
      ))
      .map((edge, edgeIndex) => ({
        id: edge.id || `edge_${index + 1}_${edgeIndex + 1}`,
        fromNodeId: edge.fromNodeId,
        toNodeId: edge.toNodeId,
      }))
    : [];
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
    edges,
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
    dynamic: Boolean(character.dynamic),
    image: character.image || "",
    voiceTag: character.voiceTag || "",
    whoColor: character.whoColor || "",
    whoStyle: character.whoStyle || "",
    whatStyle: character.whatStyle || "",
    windowStyle: character.windowStyle || "",
    windowBackground: character.windowBackground || "",
    whoPrefix: character.whoPrefix || "",
    whoSuffix: character.whoSuffix || "",
    whatPrefix: character.whatPrefix || "",
    whatSuffix: character.whatSuffix || "",
    condition: character.condition || "",
    interact: character.interact !== false,
    advance: character.advance !== false,
    ctc: character.ctc || "",
    ctcPause: character.ctcPause || "",
    ctcTimedPause: character.ctcTimedPause || "",
    ctcPosition: character.ctcPosition || "",
  };
}

function normalizeImageDefinition(image, index) {
  const category = Object.prototype.hasOwnProperty.call(imageCategoryMeta, image.category)
    ? image.category
    : "others";

  return {
    id: image.id || `image_${index + 1}`,
    name: image.name || `image_${index + 1}`,
    category,
    sourcePath: image.sourcePath || "",
    zoom: image.zoom || "",
    xanchor: image.xanchor || "",
    yanchor: image.yanchor || "",
    xpos: image.xpos || "",
    ypos: image.ypos || "",
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

function setLabelContextMenuState(nextOpen, options = {}) {
  if (!nextOpen) {
    contextMenuLabelGraphId = null;
    labelContextMenuEl.classList.remove("is-open");
    return;
  }

  contextMenuLabelGraphId = options.graphId ?? contextMenuLabelGraphId;
  labelContextMenuEl.classList.add("is-open");
  labelContextMenuEl.style.left = "0px";
  labelContextMenuEl.style.top = "0px";

  const margin = 12;
  const menuWidth = labelContextMenuEl.offsetWidth;
  const menuHeight = labelContextMenuEl.offsetHeight;
  const left = Math.min(
    Math.max(margin, options.x ?? margin),
    window.innerWidth - menuWidth - margin,
  );
  const top = Math.min(
    Math.max(margin, options.y ?? margin),
    window.innerHeight - menuHeight - margin,
  );

  labelContextMenuEl.style.left = `${left}px`;
  labelContextMenuEl.style.top = `${top}px`;
}

function setImageContextMenuState(nextOpen, options = {}) {
  if (!nextOpen) {
    contextMenuImageDefinitionId = null;
    imageContextMenuEl.classList.remove("is-open");
    return;
  }

  contextMenuImageDefinitionId = options.imageId ?? contextMenuImageDefinitionId;
  imageContextMenuEl.classList.add("is-open");
  imageContextMenuEl.style.left = "0px";
  imageContextMenuEl.style.top = "0px";

  const margin = 12;
  const menuWidth = imageContextMenuEl.offsetWidth;
  const menuHeight = imageContextMenuEl.offsetHeight;
  const left = Math.min(
    Math.max(margin, options.x ?? margin),
    window.innerWidth - menuWidth - margin,
  );
  const top = Math.min(
    Math.max(margin, options.y ?? margin),
    window.innerHeight - menuHeight - margin,
  );

  imageContextMenuEl.style.left = `${left}px`;
  imageContextMenuEl.style.top = `${top}px`;
}

function setCharacterContextMenuState(nextOpen, options = {}) {
  if (!nextOpen) {
    contextMenuCharacterId = null;
    characterContextMenuEl.classList.remove("is-open");
    return;
  }

  contextMenuCharacterId = options.characterId ?? contextMenuCharacterId;
  characterContextMenuEl.classList.add("is-open");
  characterContextMenuEl.style.left = "0px";
  characterContextMenuEl.style.top = "0px";

  const margin = 12;
  const menuWidth = characterContextMenuEl.offsetWidth;
  const menuHeight = characterContextMenuEl.offsetHeight;
  const left = Math.min(
    Math.max(margin, options.x ?? margin),
    window.innerWidth - menuWidth - margin,
  );
  const top = Math.min(
    Math.max(margin, options.y ?? margin),
    window.innerHeight - menuHeight - margin,
  );

  characterContextMenuEl.style.left = `${left}px`;
  characterContextMenuEl.style.top = `${top}px`;
}

function getActiveGraph() {
  return state.graphs.find((graph) => graph.id === state.activeGraphId) ?? null;
}

function getGraphById(graphId) {
  return state.graphs.find((graph) => graph.id === graphId) ?? null;
}

function createBlankGraph(label) {
  return {
    id: `label_${Date.now()}`,
    label,
    viewport: structuredClone(defaultViewport),
    edges: [],
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
    dynamic: false,
    image: "",
    voiceTag: "",
    whoColor: "",
    whoStyle: "",
    whatStyle: "",
    windowStyle: "",
    windowBackground: "",
    whoPrefix: "",
    whoSuffix: "",
    whatPrefix: "",
    whatSuffix: "",
    condition: "",
    interact: true,
    advance: true,
    ctc: "",
    ctcPause: "",
    ctcTimedPause: "",
    ctcPosition: "",
  };
}

function createBlankImageDefinition() {
  const nextIndex = state.images.length + 1;

  return {
    id: `image_${nextIndex}`,
    name: `image_${nextIndex}`,
    category: "others",
    sourcePath: "",
    zoom: "",
    xanchor: "",
    yanchor: "",
    xpos: "",
    ypos: "",
  };
}

function getActiveCharacter() {
  return state.characters.find((character) => character.id === activeCharacterId) ?? null;
}

function getActiveImageDefinition() {
  return state.images.find((image) => image.id === activeImageDefinitionId) ?? null;
}

function getImageNodeMode(node) {
  return node.imageMode || "show";
}

function getImageNodeName(node) {
  return (node.imageName || "").trim();
}

function getAnimationNodeTransition(node) {
  return node.animationTransition || "dissolve";
}

function buildImageSourcePathFromSelection(fileName, category, currentValue = "") {
  const normalizedCurrent = `${currentValue}`.trim().replaceAll("\\", "/");

  if (normalizedCurrent.includes("/")) {
    const segments = normalizedCurrent.split("/");
    segments[segments.length - 1] = fileName;
    return segments.join("/");
  }

  const baseDirectoryByCategory = {
    background: "images/bg",
    character: "images/characters",
    others: "images",
  };

  return `${baseDirectoryByCategory[category] || "images"}/${fileName}`;
}

function getNodeDisplay(node) {
  if (node.type === "start") {
    return {
      typeLabel: "start",
      title: "Start",
      content: "",
    };
  }

  if (node.type === "image") {
    const mode = getImageNodeMode(node);
    const name = getImageNodeName(node);
    const layer = (node.imageLayer || "").trim();
    const at = (node.imageAt || "").trim();
    const title = `${capitalize(mode)} Image`;
    const detailParts = [];

    if (name) {
      detailParts.push(name);
    }

    if (layer) {
      detailParts.push(`layer:${layer}`);
    }

    if (at && mode !== "hide") {
      detailParts.push(`at:${at}`);
    }

    return {
      typeLabel: "image",
      title,
      content: detailParts.join(" · ") || "Configure image action.",
    };
  }

  if (node.type === "animation") {
    return {
      typeLabel: "animation",
      title: "Animation",
      content: getAnimationNodeTransition(node),
    };
  }

  return {
    typeLabel: node.type,
    title: node.title,
    content: node.content,
  };
}

function isStartNode(nodeOrNodeId, graph = getActiveGraph()) {
  if (!graph || !nodeOrNodeId) {
    return false;
  }

  if (typeof nodeOrNodeId === "object") {
    return nodeOrNodeId.type === "start";
  }

  return graph.nodes.some((node) => node.id === nodeOrNodeId && node.type === "start");
}

function clampScale(value) {
  return Math.min(2.5, Math.max(0.35, value));
}

function formatZoom(scale) {
  return `${Math.round(scale * 100)}%`;
}

function resizeConnectionCanvas() {
  const rect = canvasEl.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  const width = Math.max(1, Math.round(rect.width * dpr));
  const height = Math.max(1, Math.round(rect.height * dpr));

  if (graphConnectionsEl.width !== width || graphConnectionsEl.height !== height) {
    graphConnectionsEl.width = width;
    graphConnectionsEl.height = height;
  }

  const context = graphConnectionsEl.getContext("2d");
  context.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { context, rect };
}

function worldToCanvasPoint(x, y, viewport) {
  return {
    x: x * viewport.scale + viewport.x,
    y: y * viewport.scale + viewport.y,
  };
}

function getNodeMetrics(nodeId, graph = getActiveGraph()) {
  if (!graph) {
    return null;
  }

  const node = graph.nodes.find((currentNode) => currentNode.id === nodeId);

  if (!node) {
    return null;
  }

  const nodeElement = graphNodesEl.querySelector(`[data-node-id="${CSS.escape(nodeId)}"]`);
  const width = nodeElement?.offsetWidth ?? 220;
  const height = nodeElement?.offsetHeight ?? 110;

  return { node, width, height };
}

function getNodePortWorldPosition(nodeId, side, graph = getActiveGraph()) {
  const metrics = getNodeMetrics(nodeId, graph);

  if (!metrics) {
    return null;
  }

  const { node, width, height } = metrics;
  return {
    x: side === "input" ? node.x - nodePortOffset : node.x + width + nodePortOffset,
    y: node.y + height / 2,
  };
}

function createConnectionPath(startX, startY, endX, endY) {
  const curve = Math.max(60, Math.abs(endX - startX) * 0.5);
  const cp1X = startX + curve;
  const cp1Y = startY;
  const cp2X = endX - curve;
  const cp2Y = endY;

  return {
    cp1X,
    cp1Y,
    cp2X,
    cp2Y,
  };
}

function drawArrowHead(context, angle, x, y, size, color) {
  context.save();
  context.translate(x, y);
  context.rotate(angle);
  context.beginPath();
  context.moveTo(0, 0);
  context.lineTo(-size, size * 0.55);
  context.lineTo(-size, -size * 0.55);
  context.closePath();
  context.fillStyle = color;
  context.fill();
  context.restore();
}

function drawConnection(context, startX, startY, endX, endY, options = {}) {
  const path = createConnectionPath(startX, startY, endX, endY);
  const color = options.color || "rgba(206, 220, 241, 0.88)";

  context.save();
  context.beginPath();
  context.moveTo(startX, startY);
  context.bezierCurveTo(path.cp1X, path.cp1Y, path.cp2X, path.cp2Y, endX, endY);
  context.lineWidth = options.lineWidth || 2.4;
  context.strokeStyle = color;
  context.lineCap = "round";
  context.lineJoin = "round";

  if (options.dashed) {
    context.setLineDash([8, 8]);
  }

  context.stroke();
  context.restore();

  const arrowAngle = Math.atan2(endY - path.cp2Y, endX - path.cp2X);
  drawArrowHead(context, arrowAngle, endX, endY, options.arrowSize || 10, color);
}

function getConnectionPreviewEndpoint(viewport) {
  if (!connectionSession) {
    return null;
  }

  if (connectionSession.targetNodeId) {
    const targetPort = getNodePortWorldPosition(connectionSession.targetNodeId, "input");

    if (targetPort) {
      return worldToCanvasPoint(targetPort.x, targetPort.y, viewport);
    }
  }

  const rect = canvasEl.getBoundingClientRect();
  return {
    x: connectionSession.currentClientX - rect.left,
    y: connectionSession.currentClientY - rect.top,
  };
}

function updateConnectionTargetFromPointer(clientX, clientY) {
  if (!connectionSession) {
    return;
  }

  const inputPort = document.elementFromPoint(clientX, clientY)?.closest(".node-port-input");
  const targetNodeId = inputPort?.dataset.nodeId || null;

  if (targetNodeId === connectionSession.fromNodeId) {
    connectionSession.targetNodeId = null;
    return;
  }

  connectionSession.targetNodeId = targetNodeId;
}

function hasConnection(graph, fromNodeId, toNodeId) {
  if (!graph) {
    return false;
  }

  return graph.edges.some((edge) => (
    edge.fromNodeId === fromNodeId && edge.toNodeId === toNodeId
  ));
}

function getIncomingEdges(graph, nodeId) {
  if (!graph) {
    return [];
  }

  return graph.edges.filter((edge) => edge.toNodeId === nodeId);
}

function getOutgoingEdges(graph, nodeId) {
  if (!graph) {
    return [];
  }

  return graph.edges.filter((edge) => edge.fromNodeId === nodeId);
}

function removeEdges(graph, edgesToRemove) {
  if (!graph || !edgesToRemove.length) {
    return;
  }

  const edgeIds = new Set(edgesToRemove.map((edge) => edge.id));
  graph.edges = graph.edges.filter((edge) => !edgeIds.has(edge.id));
}

function restoreDetachedEdges(graph, detachedEdges) {
  if (!graph || !detachedEdges?.length) {
    return;
  }

  const nodeIds = new Set(graph.nodes.map((node) => node.id));

  detachedEdges.forEach((edge) => {
    if (!nodeIds.has(edge.fromNodeId) || !nodeIds.has(edge.toNodeId)) {
      return;
    }

    if (hasConnection(graph, edge.fromNodeId, edge.toNodeId)) {
      return;
    }

    graph.edges.push(edge);
  });
}

function beginConnectionDrag(event, fromNodeId, options = {}) {
  const graph = getActiveGraph();

  if (event.button !== 0 || !graph) {
    return;
  }

  event.preventDefault();
  event.stopPropagation();

  const sourceNode = graph.nodes.find((node) => node.id === fromNodeId);

  if (!sourceNode) {
    return;
  }

  setAddBlockState(false);
  setContextMenuState(false);
  setLabelContextMenuState(false);

  connectionSession = {
    pointerId: event.pointerId,
    graphId: graph.id,
    fromNodeId,
    currentClientX: event.clientX,
    currentClientY: event.clientY,
    targetNodeId: null,
    detachedEdges: options.detachedEdges || [],
  };

  updateConnectionTargetFromPointer(event.clientX, event.clientY);
  renderConnections();
}

function updateConnectionDrag(event) {
  if (!connectionSession || event.pointerId !== connectionSession.pointerId) {
    return;
  }

  const graph = getGraphById(connectionSession.graphId);

  if (!graph || graph.id !== state.activeGraphId) {
    connectionSession = null;
    renderConnections();
    return;
  }

  connectionSession.currentClientX = event.clientX;
  connectionSession.currentClientY = event.clientY;
  updateConnectionTargetFromPointer(event.clientX, event.clientY);
  renderConnections();
}

function endConnectionDrag(event) {
  if (!connectionSession || event.pointerId !== connectionSession.pointerId) {
    return;
  }

  updateConnectionTargetFromPointer(event.clientX, event.clientY);

  const completedSession = connectionSession;
  connectionSession = null;

  const graph = getGraphById(completedSession.graphId);

  if (!graph || graph.id !== state.activeGraphId) {
    renderConnections();
    return;
  }

  const { fromNodeId, targetNodeId } = completedSession;

  if (!targetNodeId || targetNodeId === fromNodeId) {
    if (completedSession.detachedEdges.length) {
      const sourceNode = graph.nodes.find((node) => node.id === fromNodeId);
      saveState(`Disconnected ${getNodeDisplay(sourceNode || { type: "node", title: fromNodeId, content: "" }).title}.`);
    }
    renderConnections();
    return;
  }

  if (hasConnection(graph, fromNodeId, targetNodeId)) {
    restoreDetachedEdges(graph, completedSession.detachedEdges);
    setStatus("This connection already exists.");
    renderConnections();
    return;
  }

  const replacedIncomingEdges = getIncomingEdges(graph, targetNodeId);
  removeEdges(graph, replacedIncomingEdges);

  graph.edges.push({
    id: `edge_${Date.now()}_${graph.edges.length + 1}`,
    fromNodeId,
    toNodeId: targetNodeId,
  });

  const sourceNode = graph.nodes.find((node) => node.id === fromNodeId);
  const targetNode = graph.nodes.find((node) => node.id === targetNodeId);
  const wasReconnect = completedSession.detachedEdges.length > 0 || replacedIncomingEdges.length > 0;

  saveState(`${wasReconnect ? "Reconnected" : "Connected"} ${getNodeDisplay(sourceNode || { type: "node", title: fromNodeId, content: "" }).title} to ${getNodeDisplay(targetNode || { type: "node", title: targetNodeId, content: "" }).title}.`);
  renderConnections();
}

function renderConnections() {
  const graph = getActiveGraph();
  const viewport = graph?.viewport || defaultViewport;
  const { context, rect } = resizeConnectionCanvas();

  context.clearRect(0, 0, rect.width, rect.height);

  graphNodesEl.querySelectorAll(".node-port").forEach((port) => {
    port.classList.remove("is-highlighted", "is-connecting");
  });

  if (!graph) {
    return;
  }

  if (connectionSession && connectionSession.graphId !== graph.id) {
    connectionSession = null;
  }

  graph.edges.forEach((edge) => {
    const start = getNodePortWorldPosition(edge.fromNodeId, "output", graph);
    const end = getNodePortWorldPosition(edge.toNodeId, "input", graph);

    if (!start || !end) {
      return;
    }

    const startCanvas = worldToCanvasPoint(start.x, start.y, viewport);
    const endCanvas = worldToCanvasPoint(end.x, end.y, viewport);
    drawConnection(context, startCanvas.x, startCanvas.y, endCanvas.x, endCanvas.y);
  });

  if (!connectionSession || connectionSession.graphId !== graph.id) {
    return;
  }

  const start = getNodePortWorldPosition(connectionSession.fromNodeId, "output", graph);
  const end = getConnectionPreviewEndpoint(viewport);

  if (!start || !end) {
    return;
  }

  const startCanvas = worldToCanvasPoint(start.x, start.y, viewport);
  drawConnection(context, startCanvas.x, startCanvas.y, end.x, end.y, {
    color: connectionSession.targetNodeId
      ? "rgba(97, 179, 255, 0.95)"
      : "rgba(166, 176, 191, 0.7)",
    dashed: !connectionSession.targetNodeId,
    lineWidth: 2.2,
    arrowSize: 9,
  });

  const sourcePort = graphNodesEl.querySelector(`.node-port-output[data-node-id="${CSS.escape(connectionSession.fromNodeId)}"]`);
  sourcePort?.classList.add("is-connecting");

  if (connectionSession.targetNodeId) {
    const targetPort = graphNodesEl.querySelector(`.node-port-input[data-node-id="${CSS.escape(connectionSession.targetNodeId)}"]`);
    targetPort?.classList.add("is-highlighted");
  }
}

function renderViewport() {
  const graph = getActiveGraph();
  const { x, y, scale } = graph?.viewport || defaultViewport;
  const gridSize = 28 * scale;

  graphNodesEl.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
  gridOverlayEl.style.backgroundSize = `${gridSize}px ${gridSize}px`;
  gridOverlayEl.style.backgroundPosition = `${x}px ${y}px`;
  renderConnections();
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

function getReachableNodesInCodeOrder(graph) {
  if (!graph) {
    return [];
  }

  const startNode = graph.nodes.find((node) => node.type === "start");

  if (!startNode) {
    return [];
  }

  const nodeMap = new Map(graph.nodes.map((node) => [node.id, node]));
  const outgoingMap = new Map();

  graph.edges.forEach((edge) => {
    if (!outgoingMap.has(edge.fromNodeId)) {
      outgoingMap.set(edge.fromNodeId, []);
    }

    outgoingMap.get(edge.fromNodeId).push(edge.toNodeId);
  });

  const orderedNodes = [];
  const visited = new Set([startNode.id]);

  function visit(nodeId) {
    const nextNodeIds = outgoingMap.get(nodeId) || [];

    nextNodeIds.forEach((nextNodeId) => {
      if (visited.has(nextNodeId)) {
        return;
      }

      const nextNode = nodeMap.get(nextNodeId);

      if (!nextNode) {
        return;
      }

      visited.add(nextNodeId);
      orderedNodes.push(nextNode);
      visit(nextNodeId);
    });
  }

  visit(startNode.id);
  return orderedNodes;
}

function formatLabelGraphCode(graph) {
  if (!graph) {
    return "";
  }

  const safeLabel = ((graph.label || "label").trim() || "label").replace(/\s+/g, "_");
  const lines = [`label ${safeLabel}:`];
  const orderedNodes = getReachableNodesInCodeOrder(graph);

  if (!orderedNodes.length) {
    lines.push("    pass");
    return lines.join("\n");
  }

  orderedNodes.forEach((node) => {

    if (node.type === "dialogue") {
      const dialogueText = (node.content || node.title || "...").trim() || "...";
      lines.push(`    "${escapeRenpyString(dialogueText)}"`);
      return;
    }

    if (node.type === "menu") {
      const menuText = (node.title || "Choice").trim() || "Choice";
      lines.push("    menu:");
      lines.push(`        "${escapeRenpyString(menuText)}":`);
      lines.push("            pass");
      return;
    }

    if (node.type === "jump") {
      const jumpTarget = (node.content || "next_label").trim() || "next_label";
      lines.push(`    jump ${jumpTarget}`);
      return;
    }

    if (node.type === "image") {
      const mode = getImageNodeMode(node);
      const imageName = getImageNodeName(node);
      const layer = (node.imageLayer || "").trim();
      const at = (node.imageAt || "").trim();
      const alias = (node.imageAlias || "").trim();
      const behind = (node.imageBehind || "").trim();
      const zorder = `${node.imageZorder ?? ""}`.trim();
      const parts = [];

      if (mode === "scene") {
        parts.push("scene");

        if (imageName) {
          parts.push(imageName);
        }

        if (at) {
          parts.push("at", at);
        }

        if (layer) {
          parts.push("onlayer", layer);
        }
      } else if (mode === "hide") {
        parts.push("hide", imageName || "image_tag");

        if (layer) {
          parts.push("onlayer", layer);
        }
      } else {
        parts.push("show", imageName || "image_name");

        if (alias) {
          parts.push("as", alias);
        }

        if (at) {
          parts.push("at", at);
        }

        if (behind) {
          parts.push("behind", behind);
        }

        if (layer) {
          parts.push("onlayer", layer);
        }

        if (zorder) {
          parts.push("zorder", zorder);
        }
      }

      lines.push(`    ${parts.join(" ")}`);
      return;
    }

    if (node.type === "animation") {
      lines.push(`    with ${getAnimationNodeTransition(node)}`);
      return;
    }

    lines.push(`    # ${node.type}: ${node.title || "Untitled Node"}`);
  });

  return lines.join("\n");
}

function syncLabelCodePreview() {
  const graph = getGraphById(labelCodePreviewGraphId);

  if (!graph) {
    labelCodePreviewTitleEl.textContent = "";
    labelCodePreviewEl.textContent = "";
    return;
  }

  labelCodePreviewTitleEl.textContent = graph.label;
  labelCodePreviewEl.textContent = formatLabelGraphCode(graph);
}

function openLabelCodePreview(graphId) {
  const graph = getGraphById(graphId);

  if (!graph) {
    return;
  }

  renamingGraphId = null;
  labelCodePreviewGraphId = graphId;
  state.activeGraphId = graphId;
  setLabelContextMenuState(false);
  labelListViewEl.classList.add("hidden");
  labelCodePreviewViewEl.classList.remove("hidden");
  syncLabelCodePreview();
  setStatus(`Opened code preview for "${graph.label}".`);
}

function closeLabelCodePreview() {
  labelCodePreviewGraphId = null;
  setLabelContextMenuState(false);
  labelCodePreviewViewEl.classList.add("hidden");
  labelListViewEl.classList.remove("hidden");
  setStatus("Returned to label list.");
}

function startLabelRename(graphId) {
  state.activeGraphId = graphId;
  renamingGraphId = graphId;
  setLabelContextMenuState(false);
  labelCodePreviewGraphId = null;
  labelCodePreviewViewEl.classList.add("hidden");
  labelListViewEl.classList.remove("hidden");
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

function deleteLabelGraph(graphId) {
  const graph = getGraphById(graphId);

  if (!graph) {
    setLabelContextMenuState(false);
    return;
  }

  const confirmed = window.confirm(`Delete label "${graph.label}"? This cannot be undone.`);

  if (!confirmed) {
    setLabelContextMenuState(false);
    setStatus(`Kept label graph "${graph.label}".`);
    return;
  }

  state.graphs = state.graphs.filter((currentGraph) => currentGraph.id !== graphId);

  if (state.activeGraphId === graphId) {
    state.activeGraphId = state.graphs[0]?.id ?? null;
  }

  if (labelCodePreviewGraphId === graphId) {
    labelCodePreviewGraphId = null;
  }

  if (renamingGraphId === graphId) {
    renamingGraphId = null;
  }

  if (draggedLabelGraphId === graphId) {
    draggedLabelGraphId = null;
    labelOrderChangedDuringDrag = false;
  }

  if (connectionSession?.graphId === graphId) {
    connectionSession = null;
  }

  setLabelContextMenuState(false);
  setAddBlockState(false);
  setInspectorState(Boolean(getActiveGraph()?.selectedNodeId));
  render();
  saveState(`Deleted label graph "${graph.label}".`);
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
        setLabelContextMenuState(false);
        setAddBlockState(false);
        setInspectorState(Boolean(graph.selectedNodeId));
        render();
        setStatus(`Opened label graph "${graph.label}".`);
      });
      item.addEventListener("dblclick", (event) => {
        event.preventDefault();
        event.stopPropagation();
        openLabelCodePreview(graph.id);
      });
      item.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          state.activeGraphId = graph.id;
          setContextMenuState(false);
          setLabelContextMenuState(false);
          setAddBlockState(false);
          setInspectorState(Boolean(graph.selectedNodeId));
          render();
          setStatus(`Opened label graph "${graph.label}".`);
        }
      });
      item.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        event.stopPropagation();
        state.activeGraphId = graph.id;
        setContextMenuState(false);
        setAddBlockState(false);
        setInspectorState(Boolean(graph.selectedNodeId));
        setLabelContextMenuState(true, {
          graphId: graph.id,
          x: event.clientX,
          y: event.clientY,
        });
        renderLabelGraphList();
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

function renderLabelPanel() {
  const showPreview = Boolean(labelCodePreviewGraphId) && !renamingGraphId;

  labelListViewEl.classList.toggle("hidden", showPreview);
  labelCodePreviewViewEl.classList.toggle("hidden", !showPreview);

  if (showPreview) {
    syncLabelCodePreview();
  }

  if (renamingGraphId) {
    labelListViewEl.classList.remove("hidden");
    labelCodePreviewViewEl.classList.add("hidden");
  }
}

function openImageDefinitionDetail(imageId) {
  activeImageDefinitionId = imageId;
  imageDefinitionDetailOpen = true;
  setImageContextMenuState(false);
  renderImagesPanel();
  const image = getActiveImageDefinition();

  if (image) {
    setStatus(`Opened image definition "${image.name}".`);
  }
}

function closeImageDefinitionDetail() {
  imageDefinitionDetailOpen = false;
  setImageContextMenuState(false);
  renderImagesPanel();
}

function deleteImageDefinition(imageId) {
  const image = state.images.find((currentImage) => currentImage.id === imageId);

  if (!image) {
    return;
  }

  state.images = state.images.filter((currentImage) => currentImage.id !== imageId);

  if (activeImageDefinitionId === imageId) {
    activeImageDefinitionId = state.images[0]?.id ?? null;
  }

  if (imageDefinitionDetailOpen && !getActiveImageDefinition()) {
    imageDefinitionDetailOpen = false;
  }

  setImageContextMenuState(false);
  renderImagesPanel();
  saveState(`Deleted image "${image.name}".`);
}

function formatImageDefinitionCode(image) {
  if (!image) {
    return "";
  }

  const safeName = image.name.trim() || "image_name";
  const sourcePath = image.sourcePath.trim() || "images/example.png";
  const lines = [
    `image ${safeName}:`,
    `    "${escapeRenpyString(sourcePath)}"`,
  ];

  if (`${image.zoom}`.trim()) {
    lines.push(`    zoom ${`${image.zoom}`.trim()}`);
  }

  if (`${image.xanchor}`.trim()) {
    lines.push(`    xanchor ${`${image.xanchor}`.trim()}`);
  }

  if (`${image.yanchor}`.trim()) {
    lines.push(`    yanchor ${`${image.yanchor}`.trim()}`);
  }

  if (`${image.xpos}`.trim()) {
    lines.push(`    xpos ${`${image.xpos}`.trim()}`);
  }

  if (`${image.ypos}`.trim()) {
    lines.push(`    ypos ${`${image.ypos}`.trim()}`);
  }

  return lines.join("\n");
}

function syncImageDefinitionDetailFields() {
  const image = getActiveImageDefinition();

  if (!image) {
    imageDefinitionNameInput.value = "";
    imageDefinitionCategoryInput.value = "others";
    imageDefinitionSourcePathInput.value = "";
    imageDefinitionZoomInput.value = "";
    imageDefinitionXAnchorInput.value = "";
    imageDefinitionYAnchorInput.value = "";
    imageDefinitionXPosInput.value = "";
    imageDefinitionYPosInput.value = "";
    imageDefinitionCodePreviewEl.textContent = "";
    return;
  }

  imageDefinitionNameInput.value = image.name;
  imageDefinitionCategoryInput.value = image.category || "others";
  imageDefinitionSourcePathInput.value = image.sourcePath;
  imageDefinitionZoomInput.value = image.zoom;
  imageDefinitionXAnchorInput.value = image.xanchor;
  imageDefinitionYAnchorInput.value = image.yanchor;
  imageDefinitionXPosInput.value = image.xpos;
  imageDefinitionYPosInput.value = image.ypos;
  imageDefinitionCodePreviewEl.textContent = formatImageDefinitionCode(image);
}

function renderImagesPanel() {
  const hasImages = state.images.length > 0;

  if (!hasImages) {
    activeImageDefinitionId = null;
    imageDefinitionDetailOpen = false;
  } else if (!getActiveImageDefinition()) {
    activeImageDefinitionId = state.images[0].id;
  }

  if (imageDefinitionDetailOpen && !getActiveImageDefinition()) {
    imageDefinitionDetailOpen = false;
  }

  imageDefinitionEmptyEl.classList.add("hidden");
  imageDefinitionListEl.innerHTML = "";

  Object.entries(imageCategoryMeta).forEach(([categoryKey, categoryInfo]) => {
    const categoryGroup = document.createElement("section");
    const isExpanded = imageCategorySectionState[categoryKey] !== false;
    const categoryImages = state.images.filter((image) => image.category === categoryKey);
    categoryGroup.className = "image-category-group";
    categoryGroup.classList.toggle("is-collapsed", !isExpanded);

    const toggleButton = document.createElement("button");
    toggleButton.type = "button";
    toggleButton.className = "image-category-toggle";
    toggleButton.setAttribute("aria-expanded", String(isExpanded));
    toggleButton.innerHTML = `
      <span class="image-category-toggle-main">
        <svg class="image-category-toggle-caret" viewBox="0 0 16 16" aria-hidden="true">
          <path d="M3 6.5 8 11l5-4.5"></path>
        </svg>
        <span class="image-category-toggle-label">${escapeHtml(categoryInfo.label)}</span>
      </span>
      <span class="image-category-toggle-count">${categoryImages.length}</span>
    `;

    toggleButton.addEventListener("click", () => {
      imageCategorySectionState[categoryKey] = !isExpanded;
      renderImagesPanel();
    });

    const itemsEl = document.createElement("div");
    itemsEl.className = "image-category-items";

    if (!categoryImages.length) {
      const emptyEl = document.createElement("p");
      emptyEl.className = "image-category-empty";
      emptyEl.textContent = categoryInfo.empty;
      itemsEl.appendChild(emptyEl);
    }

    categoryImages.forEach((image) => {
      const item = document.createElement("div");
      item.className = "character-card";
      item.setAttribute("role", "button");
      item.tabIndex = 0;

      if (image.id === activeImageDefinitionId) {
        item.classList.add("is-active");
      }

      item.innerHTML = `
        <strong>${escapeHtml(image.name)}</strong>
        <span>${escapeHtml(image.sourcePath || "No source path yet")}</span>
      `;

      item.addEventListener("click", () => {
        activeImageDefinitionId = image.id;
        setImageContextMenuState(false);
        renderImagesPanel();
      });
      item.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        activeImageDefinitionId = image.id;
        renderImagesPanel();
        setContextMenuState(false);
        setLabelContextMenuState(false);
        setCharacterContextMenuState(false);
        setImageContextMenuState(true, {
          imageId: image.id,
          x: event.clientX,
          y: event.clientY,
        });
      });
      item.addEventListener("dblclick", (event) => {
        event.preventDefault();
        event.stopPropagation();
        openImageDefinitionDetail(image.id);
      });
      item.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openImageDefinitionDetail(image.id);
        }
      });

      itemsEl.appendChild(item);
    });

    categoryGroup.appendChild(toggleButton);
    categoryGroup.appendChild(itemsEl);
    imageDefinitionListEl.appendChild(categoryGroup);
  });

  imagesListViewEl.classList.toggle("hidden", imageDefinitionDetailOpen);
  imageDefinitionDetailViewEl.classList.toggle("hidden", !imageDefinitionDetailOpen);
  syncImageDefinitionDetailFields();
}

function openCharacterDetail(characterId) {
  activeCharacterId = characterId;
  characterDetailOpen = true;
  setCharacterContextMenuState(false);
  renderCharactersPanel();
  const character = getActiveCharacter();

  if (character) {
    setStatus(`Opened character "${character.name}".`);
  }
}

function closeCharacterDetail() {
  characterDetailOpen = false;
  setCharacterContextMenuState(false);
  renderCharactersPanel();
}

function deleteCharacter(characterId) {
  const character = state.characters.find((currentCharacter) => currentCharacter.id === characterId);

  if (!character) {
    return;
  }

  state.characters = state.characters.filter((currentCharacter) => currentCharacter.id !== characterId);

  if (activeCharacterId === characterId) {
    activeCharacterId = state.characters[0]?.id ?? null;
  }

  if (characterDetailOpen && !getActiveCharacter()) {
    characterDetailOpen = false;
  }

  setCharacterContextMenuState(false);
  renderCharactersPanel();
  saveState(`Deleted character "${character.name}".`);
}

function formatCharacterCode(character) {
  if (!character) {
    return "";
  }

  const safeId = character.id.trim() || "character";
  const args = [];
  const trimmedName = character.name.trim();

  args.push(trimmedName ? `"${escapeRenpyString(trimmedName)}"` : "None");

  if (character.kind !== "adv") {
    args.push(`kind=${character.kind}`);
  }

  if (character.dynamic) {
    args.push("dynamic=True");
  }

  if (character.image.trim()) {
    args.push(`image="${escapeRenpyString(character.image.trim())}"`);
  }

  if (character.voiceTag.trim()) {
    args.push(`voice_tag="${escapeRenpyString(character.voiceTag.trim())}"`);
  }

  if (character.whoColor.trim()) {
    args.push(`who_color="${escapeRenpyString(character.whoColor.trim())}"`);
  }

  if (character.whoStyle.trim()) {
    args.push(`who_style="${escapeRenpyString(character.whoStyle.trim())}"`);
  }

  if (character.whatStyle.trim()) {
    args.push(`what_style="${escapeRenpyString(character.whatStyle.trim())}"`);
  }

  if (character.windowStyle.trim()) {
    args.push(`window_style="${escapeRenpyString(character.windowStyle.trim())}"`);
  }

  if (character.windowBackground.trim()) {
    args.push(`window_background="${escapeRenpyString(character.windowBackground.trim())}"`);
  }

  if (character.whoPrefix.trim()) {
    args.push(`who_prefix="${escapeRenpyString(character.whoPrefix.trim())}"`);
  }

  if (character.whoSuffix.trim()) {
    args.push(`who_suffix="${escapeRenpyString(character.whoSuffix.trim())}"`);
  }

  if (character.whatPrefix.trim()) {
    args.push(`what_prefix="${escapeRenpyString(character.whatPrefix.trim())}"`);
  }

  if (character.whatSuffix.trim()) {
    args.push(`what_suffix="${escapeRenpyString(character.whatSuffix.trim())}"`);
  }

  if (character.condition.trim()) {
    args.push(`condition="${escapeRenpyString(character.condition.trim())}"`);
  }

  if (!character.interact) {
    args.push("interact=False");
  }

  if (!character.advance) {
    args.push("advance=False");
  }

  if (character.ctc.trim()) {
    args.push(`ctc=${character.ctc.trim()}`);
  }

  if (character.ctcPause.trim()) {
    args.push(`ctc_pause=${character.ctcPause.trim()}`);
  }

  if (character.ctcTimedPause.trim()) {
    args.push(`ctc_timedpause=${character.ctcTimedPause.trim()}`);
  }

  if (character.ctcPosition.trim()) {
    args.push(`ctc_position="${escapeRenpyString(character.ctcPosition.trim())}"`);
  }

  return `define ${safeId} = Character(\n    ${args.join(",\n    ")}\n)`;
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
    characterDynamicInput.checked = false;
    characterImageInput.value = "";
    characterVoiceTagInput.value = "";
    characterWhoColorInput.value = "";
    characterWhoStyleInput.value = "";
    characterWhatStyleInput.value = "";
    characterWindowStyleInput.value = "";
    characterWindowBackgroundInput.value = "";
    characterWhoPrefixInput.value = "";
    characterWhoSuffixInput.value = "";
    characterWhatPrefixInput.value = "";
    characterWhatSuffixInput.value = "";
    characterConditionInput.value = "";
    characterInteractInput.checked = true;
    characterAdvanceInput.checked = true;
    characterCtcInput.value = "";
    characterCtcPauseInput.value = "";
    characterCtcTimedPauseInput.value = "";
    characterCtcPositionInput.value = "";
    characterCodePreviewEl.textContent = "";
    return;
  }

  characterIdInput.value = character.id;
  characterNameInput.value = character.name;
  characterKindInput.value = character.kind;
  characterDynamicInput.checked = character.dynamic;
  characterImageInput.value = character.image;
  characterVoiceTagInput.value = character.voiceTag;
  characterWhoColorInput.value = character.whoColor;
  characterWhoStyleInput.value = character.whoStyle;
  characterWhatStyleInput.value = character.whatStyle;
  characterWindowStyleInput.value = character.windowStyle;
  characterWindowBackgroundInput.value = character.windowBackground;
  characterWhoPrefixInput.value = character.whoPrefix;
  characterWhoSuffixInput.value = character.whoSuffix;
  characterWhatPrefixInput.value = character.whatPrefix;
  characterWhatSuffixInput.value = character.whatSuffix;
  characterConditionInput.value = character.condition;
  characterInteractInput.checked = character.interact;
  characterAdvanceInput.checked = character.advance;
  characterCtcInput.value = character.ctc;
  characterCtcPauseInput.value = character.ctcPause;
  characterCtcTimedPauseInput.value = character.ctcTimedPause;
  characterCtcPositionInput.value = character.ctcPosition;
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
      setCharacterContextMenuState(false);
      characterListEl.querySelectorAll(".character-card").forEach((card) => {
        card.classList.toggle("is-active", card === item);
      });
    });
    item.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      activeCharacterId = character.id;
      renderCharactersPanel();
      setContextMenuState(false);
      setLabelContextMenuState(false);
      setImageContextMenuState(false);
      setCharacterContextMenuState(true, {
        characterId: character.id,
        x: event.clientX,
        y: event.clientY,
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
    const isStart = node.type === "start";
    const display = getNodeDisplay(node);
    const el = document.createElement("button");
    el.type = "button";
    el.className = "graph-node";
    el.dataset.nodeId = node.id;

    if (node.id === graph.selectedNodeId) {
      el.classList.add("is-selected");
    }

    el.style.left = `${node.x}px`;
    el.style.top = `${node.y}px`;

    el.innerHTML = `
      <p class="node-type">${escapeHtml(display.typeLabel)}</p>
      <h3 class="node-title">${escapeHtml(display.title || "Untitled Node")}</h3>
      ${display.content ? `<p class="node-content">${escapeHtml(display.content)}</p>` : ""}
      ${isStart ? "" : `<span class="node-port node-port-input" data-node-id="${escapeHtml(node.id)}" data-port="input"></span>`}
      <span class="node-port node-port-output" data-node-id="${escapeHtml(node.id)}" data-port="output"></span>
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

      if (isStart) {
        setContextMenuState(false);
        return;
      }

      setContextMenuState(true, {
        nodeId: node.id,
        x: event.clientX,
        y: event.clientY,
      });
    });

    const outputPort = el.querySelector(".node-port-output");
    outputPort?.addEventListener("pointerdown", (event) => {
      const outgoingEdges = getOutgoingEdges(graph, node.id);

      if (outgoingEdges.length) {
        removeEdges(graph, outgoingEdges);
      }

      beginConnectionDrag(event, node.id, {
        detachedEdges: outgoingEdges,
      });
    });

    const inputPort = el.querySelector(".node-port-input");
    inputPort?.addEventListener("pointerdown", (event) => {
      const incomingEdges = getIncomingEdges(graph, node.id);
      const existingEdge = incomingEdges[0];

      if (!existingEdge) {
        return;
      }

      removeEdges(graph, [existingEdge]);
      beginConnectionDrag(event, existingEdge.fromNodeId, {
        detachedEdges: [existingEdge],
      });
    });

    graphNodesEl.appendChild(el);
  });

  renderConnections();
}

function renderInspector() {
  const graph = getActiveGraph();
  const selectedNode = graph?.nodes.find((node) => node.id === graph.selectedNodeId);

  if (!selectedNode) {
    inspectorEmptyEl.classList.remove("hidden");
    startInspectorFormEl.classList.add("hidden");
    imageInspectorFormEl.classList.add("hidden");
    animationInspectorFormEl.classList.add("hidden");
    inspectorFormEl.classList.add("hidden");
    return;
  }

  const selectedIsStart = selectedNode.type === "start";
  const selectedIsImage = selectedNode.type === "image";
  const selectedIsAnimation = selectedNode.type === "animation";

  inspectorEmptyEl.classList.add("hidden");
  startInspectorFormEl.classList.toggle("hidden", !selectedIsStart);
  imageInspectorFormEl.classList.toggle("hidden", !selectedIsImage);
  animationInspectorFormEl.classList.toggle("hidden", !selectedIsAnimation);
  inspectorFormEl.classList.toggle("hidden", selectedIsStart || selectedIsImage || selectedIsAnimation);

  if (selectedIsStart) {
    startNodeTypeInput.value = "Start";
    return;
  }

  if (selectedIsImage) {
    const imageMode = getImageNodeMode(selectedNode);
    const imageNameFieldEl = imageNodeNameInput.closest("label");
    const imageAtFieldEl = imageNodeAtInput.closest("label");
    const imageAliasFieldEl = imageNodeAliasInput.closest("label");
    const imageBehindFieldEl = imageNodeBehindInput.closest("label");
    const imageZorderFieldEl = imageNodeZorderInput.closest("label");

    imageNodeTypeInput.value = "Image";
    imageNodeModeInput.value = imageMode;
    imageNodeNameInput.value = selectedNode.imageName || "";
    imageNodeLayerInput.value = selectedNode.imageLayer || "";
    imageNodeAtInput.value = selectedNode.imageAt || "";
    imageNodeAliasInput.value = selectedNode.imageAlias || "";
    imageNodeBehindInput.value = selectedNode.imageBehind || "";
    imageNodeZorderInput.value = selectedNode.imageZorder || "";

    imageNodeNameLabelEl.textContent = imageMode === "hide"
      ? "Target Tag"
      : imageMode === "scene"
        ? "Image Name (Optional)"
        : "Image Name";

    imageNameFieldEl.classList.remove("hidden");
    imageAtFieldEl.classList.toggle("hidden", imageMode === "hide");
    imageAliasFieldEl.classList.toggle("hidden", imageMode !== "show");
    imageBehindFieldEl.classList.toggle("hidden", imageMode !== "show");
    imageZorderFieldEl.classList.toggle("hidden", imageMode !== "show");
    return;
  }

  if (selectedIsAnimation) {
    animationNodeTypeInput.value = "Animation";
    animationNodeTransitionInput.value = getAnimationNodeTransition(selectedNode);
    return;
  }

  nodeIdInput.value = selectedNode.id;
  nodeTypeInput.value = selectedNode.type;
  nodeTitleInput.value = selectedNode.title;
  nodeContentInput.value = selectedNode.content;
  nodeTitleInput.disabled = false;
  nodeContentInput.disabled = false;
  deleteNodeButton.disabled = false;
}

function render() {
  renderProjectInfo();
  renderLabelGraphList();
  renderLabelPanel();
  renderImagesPanel();
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

  if (isStartNode(graph.selectedNodeId, graph)) {
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

function updateActiveImageDefinition(patch) {
  const image = getActiveImageDefinition();

  if (!image) {
    return;
  }

  Object.assign(image, patch);
  syncImageDefinitionDetailFields();
  renderImagesPanel();
  saveState();
}

function resetGraph() {
  const graph = getActiveGraph();

  if (!graph) {
    return;
  }

  graph.viewport = structuredClone(defaultViewport);
  graph.edges = [];
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

  if (node.type === "start") {
    setContextMenuState(false);
    setStatus("Start block is fixed for each label graph and cannot be deleted.");
    return;
  }

  graph.nodes = graph.nodes.filter((currentNode) => currentNode.id !== nodeId);
  graph.edges = graph.edges.filter((edge) => (
    edge.fromNodeId !== nodeId && edge.toNodeId !== nodeId
  ));

  if (graph.selectedNodeId === nodeId) {
    graph.selectedNodeId = graph.nodes[0]?.id ?? null;
  }

  setContextMenuState(false);
  render();
  setInspectorState(Boolean(graph.selectedNodeId));
  saveState(`Deleted ${getNodeDisplay(node).title}.`);
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
  renderConnections();
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
    saveState(`Moved ${getNodeDisplay(node).title}.`);
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
imageNodeModeInput.addEventListener("change", (event) => {
  updateSelectedNode({ imageMode: event.target.value });
});
imageNodeNameInput.addEventListener("input", (event) => {
  updateSelectedNode({ imageName: event.target.value });
});
imageNodeLayerInput.addEventListener("input", (event) => {
  updateSelectedNode({ imageLayer: event.target.value });
});
imageNodeAtInput.addEventListener("input", (event) => {
  updateSelectedNode({ imageAt: event.target.value });
});
imageNodeAliasInput.addEventListener("input", (event) => {
  updateSelectedNode({ imageAlias: event.target.value });
});
imageNodeBehindInput.addEventListener("input", (event) => {
  updateSelectedNode({ imageBehind: event.target.value });
});
imageNodeZorderInput.addEventListener("input", (event) => {
  updateSelectedNode({ imageZorder: event.target.value });
});
animationNodeTransitionInput.addEventListener("change", (event) => {
  updateSelectedNode({ animationTransition: event.target.value });
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
  setLabelContextMenuState(false);
  setInspectorState(true);
  setAddBlockState(false);
  render();
  saveState(`Created label graph "${nextGraph.label}".`);
});
labelPreviewBackButton.addEventListener("click", () => {
  closeLabelCodePreview();
});
contextRenameLabelButton.addEventListener("click", () => {
  if (!contextMenuLabelGraphId) {
    return;
  }

  startLabelRename(contextMenuLabelGraphId);
});
contextDeleteLabelButton.addEventListener("click", () => {
  if (!contextMenuLabelGraphId) {
    return;
  }

  deleteLabelGraph(contextMenuLabelGraphId);
});
contextDeleteImageButton.addEventListener("click", () => {
  if (!contextMenuImageDefinitionId) {
    return;
  }

  deleteImageDefinition(contextMenuImageDefinitionId);
});
contextDeleteCharacterButton.addEventListener("click", () => {
  if (!contextMenuCharacterId) {
    return;
  }

  deleteCharacter(contextMenuCharacterId);
});
newImageDefinitionButton.addEventListener("click", () => {
  const newImage = createBlankImageDefinition();

  state.images.push(newImage);
  activeImageDefinitionId = newImage.id;
  imageCategorySectionState[newImage.category] = true;
  imageDefinitionDetailOpen = false;
  setImageContextMenuState(false);
  renderImagesPanel();
  saveState(`Created image definition "${newImage.name}".`);
});
imageDefinitionBackButton.addEventListener("click", () => {
  closeImageDefinitionDetail();
  setStatus("Returned to image list.");
});
imageDefinitionNameInput.addEventListener("input", (event) => {
  updateActiveImageDefinition({ name: event.target.value });
});
imageDefinitionCategoryInput.addEventListener("change", (event) => {
  imageCategorySectionState[event.target.value] = true;
  updateActiveImageDefinition({ category: event.target.value });
});
imageDefinitionSourcePathInput.addEventListener("input", (event) => {
  updateActiveImageDefinition({ sourcePath: event.target.value });
});
imageDefinitionBrowseButton.addEventListener("click", () => {
  if (!getActiveImageDefinition()) {
    setStatus("Create or select an image definition before browsing for a file.");
    return;
  }

  imageDefinitionFileInput.value = "";
  imageDefinitionFileInput.click();
});
imageDefinitionFileInput.addEventListener("change", (event) => {
  const image = getActiveImageDefinition();
  const file = event.target.files?.[0];

  if (!image || !file) {
    return;
  }

  const nextSourcePath = buildImageSourcePathFromSelection(
    file.name,
    image.category,
    image.sourcePath,
  );

  updateActiveImageDefinition({ sourcePath: nextSourcePath });
  setStatus(`Selected "${file.name}" for image source. Adjust the path if needed.`);
});
imageDefinitionZoomInput.addEventListener("input", (event) => {
  updateActiveImageDefinition({ zoom: event.target.value });
});
imageDefinitionXAnchorInput.addEventListener("input", (event) => {
  updateActiveImageDefinition({ xanchor: event.target.value });
});
imageDefinitionYAnchorInput.addEventListener("input", (event) => {
  updateActiveImageDefinition({ yanchor: event.target.value });
});
imageDefinitionXPosInput.addEventListener("input", (event) => {
  updateActiveImageDefinition({ xpos: event.target.value });
});
imageDefinitionYPosInput.addEventListener("input", (event) => {
  updateActiveImageDefinition({ ypos: event.target.value });
});
newCharacterButton.addEventListener("click", () => {
  const newCharacter = createBlankCharacter();

  state.characters.push(newCharacter);
  activeCharacterId = newCharacter.id;
  characterDetailOpen = false;
  setCharacterContextMenuState(false);
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
characterDynamicInput.addEventListener("change", (event) => {
  updateActiveCharacter({ dynamic: event.target.checked });
});
characterImageInput.addEventListener("input", (event) => {
  updateActiveCharacter({ image: event.target.value });
});
characterVoiceTagInput.addEventListener("input", (event) => {
  updateActiveCharacter({ voiceTag: event.target.value });
});
characterWhoColorInput.addEventListener("input", (event) => {
  updateActiveCharacter({ whoColor: event.target.value });
});
characterWhoStyleInput.addEventListener("input", (event) => {
  updateActiveCharacter({ whoStyle: event.target.value });
});
characterWhatStyleInput.addEventListener("input", (event) => {
  updateActiveCharacter({ whatStyle: event.target.value });
});
characterWindowStyleInput.addEventListener("input", (event) => {
  updateActiveCharacter({ windowStyle: event.target.value });
});
characterWindowBackgroundInput.addEventListener("input", (event) => {
  updateActiveCharacter({ windowBackground: event.target.value });
});
characterWhoPrefixInput.addEventListener("input", (event) => {
  updateActiveCharacter({ whoPrefix: event.target.value });
});
characterWhoSuffixInput.addEventListener("input", (event) => {
  updateActiveCharacter({ whoSuffix: event.target.value });
});
characterWhatPrefixInput.addEventListener("input", (event) => {
  updateActiveCharacter({ whatPrefix: event.target.value });
});
characterWhatSuffixInput.addEventListener("input", (event) => {
  updateActiveCharacter({ whatSuffix: event.target.value });
});
characterConditionInput.addEventListener("input", (event) => {
  updateActiveCharacter({ condition: event.target.value });
});
characterInteractInput.addEventListener("change", (event) => {
  updateActiveCharacter({ interact: event.target.checked });
});
characterAdvanceInput.addEventListener("change", (event) => {
  updateActiveCharacter({ advance: event.target.checked });
});
characterCtcInput.addEventListener("input", (event) => {
  updateActiveCharacter({ ctc: event.target.value });
});
characterCtcPauseInput.addEventListener("input", (event) => {
  updateActiveCharacter({ ctcPause: event.target.value });
});
characterCtcTimedPauseInput.addEventListener("input", (event) => {
  updateActiveCharacter({ ctcTimedPause: event.target.value });
});
characterCtcPositionInput.addEventListener("change", (event) => {
  updateActiveCharacter({ ctcPosition: event.target.value });
});
deleteNodeButton.addEventListener("click", () => {
  const graph = getActiveGraph();

  if (!graph?.selectedNodeId) {
    return;
  }

  deleteNode(graph.selectedNodeId);
});
imageDeleteNodeButton.addEventListener("click", () => {
  const graph = getActiveGraph();

  if (!graph?.selectedNodeId) {
    return;
  }

  deleteNode(graph.selectedNodeId);
});
animationDeleteNodeButton.addEventListener("click", () => {
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
  setLabelContextMenuState(false);
  zoomAtPoint(event.clientX, event.clientY, event.deltaY);
}, { passive: false });
document.addEventListener("pointermove", updateConnectionDrag);
document.addEventListener("pointerup", endConnectionDrag);
document.addEventListener("pointercancel", endConnectionDrag);
window.addEventListener("resize", renderConnections);

document.addEventListener("pointerdown", (event) => {
  if (nodeContextMenuEl.contains(event.target)) {
    return;
  }

  if (labelContextMenuEl.contains(event.target)) {
    return;
  }

  if (imageContextMenuEl.contains(event.target)) {
    return;
  }

  if (characterContextMenuEl.contains(event.target)) {
    return;
  }

  setContextMenuState(false);
  setLabelContextMenuState(false);
  setImageContextMenuState(false);
  setCharacterContextMenuState(false);
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

    if (nodeType === "start") {
      setStatus("Each label graph already has one fixed Start block.");
      return;
    }

    const newNode = createNodeForType(nodeType, graph);

    graph.nodes.push(newNode);
    graph.selectedNodeId = newNode.id;
    render();
    setInspectorState(true);
    setAddBlockState(false);
    setStatus(`Added a ${nodeType} node to "${graph.label}".`);
  });
});

function createNodeForType(nodeType, graph) {
  const baseNode = {
    id: `${nodeType}_${Date.now()}`,
    type: nodeType,
    title: `${capitalize(nodeType)} Node`,
    content: "New node content.",
    x: 96 + graph.nodes.length * 28,
    y: 96 + graph.nodes.length * 20,
  };

  if (nodeType === "image") {
    return {
      ...baseNode,
      title: "Show Image",
      content: "",
      imageMode: "show",
      imageName: "",
      imageLayer: "",
      imageAt: "",
      imageAlias: "",
      imageBehind: "",
      imageZorder: "",
    };
  }

  if (nodeType === "animation") {
    return {
      ...baseNode,
      title: "Animation",
      content: "",
      animationTransition: "dissolve",
    };
  }

  if (nodeType === "dialogue") {
    return {
      ...baseNode,
      title: "Dialogue",
      content: "New dialogue line.",
    };
  }

  if (nodeType === "menu") {
    return {
      ...baseNode,
      title: "Choice",
      content: "Add menu choices here.",
    };
  }

  if (nodeType === "jump") {
    return {
      ...baseNode,
      title: "Jump",
      content: "next_label",
    };
  }

  return baseNode;
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

render();
setSidebarSection(activeSidebarSectionId);
setSidebarState(true);
setInspectorState(Boolean(getActiveGraph()?.selectedNodeId));
setAddBlockState(false);
setStatus("Visual editor scaffold ready. Drag empty space to move the canvas, and use the mouse wheel to zoom.");
