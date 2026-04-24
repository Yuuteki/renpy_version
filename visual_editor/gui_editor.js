const params = new URLSearchParams(window.location.search);
const projectPath = params.get("project") || "";
const storageKey = projectPath
  ? `renpy-visual-editor:${projectPath}`
  : "renpy-visual-editor:default";

const guiProjectPathEl = document.getElementById("guiProjectPath");
const guiStatusTextEl = document.getElementById("guiStatusText");
const guiBackButton = document.getElementById("guiBackButton");
const guiSaveButton = document.getElementById("guiSaveButton");
const guiNavButtonEls = Array.from(document.querySelectorAll(".gui-nav-button"));
const guiSectionEls = Array.from(document.querySelectorAll(".gui-section"));
const stylesNavCountEl = document.getElementById("stylesNavCount");
const screensNavCountEl = document.getElementById("screensNavCount");
const configNavCountEl = document.getElementById("configNavCount");
const cursorsNavCountEl = document.getElementById("cursorsNavCount");
const shadersNavCountEl = document.getElementById("shadersNavCount");
const diagnosticsNavCountEl = document.getElementById("diagnosticsNavCount");

const guiStyleEmptyEl = document.getElementById("guiStyleEmpty");
const guiStyleListEl = document.getElementById("guiStyleList");
const newGuiStyleButton = document.getElementById("newGuiStyleButton");
const guiStyleEmptyStateEl = document.getElementById("guiStyleEmptyState");
const guiStyleFormEl = document.getElementById("guiStyleForm");
const guiStyleNameInput = document.getElementById("guiStyleNameInput");
const guiStyleParentInput = document.getElementById("guiStyleParentInput");
const guiStyleVariantInput = document.getElementById("guiStyleVariantInput");
const guiStyleCategoryInput = document.getElementById("guiStyleCategoryInput");
const guiStylePropertiesExpressionInput = document.getElementById("guiStylePropertiesExpressionInput");
const guiStylePrefixSummaryEl = document.getElementById("guiStylePrefixSummary");
const guiStylePrefixTabsEl = document.getElementById("guiStylePrefixTabs");
const guiStylePropertySummaryEl = document.getElementById("guiStylePropertySummary");
const guiStyleCodePreviewEl = document.getElementById("guiStyleCodePreview");
const guiDeleteStyleButton = document.getElementById("guiDeleteStyleButton");

const guiStylePanelContentEls = {
  position: document.getElementById("guiStylePanelPosition"),
  text: document.getElementById("guiStylePanelText"),
  window: document.getElementById("guiStylePanelWindow"),
  button: document.getElementById("guiStylePanelButton"),
  bar: document.getElementById("guiStylePanelBar"),
  box: document.getElementById("guiStylePanelBox"),
  grid: document.getElementById("guiStylePanelGrid"),
  margin: document.getElementById("guiStylePanelMargin"),
};

const guiScreenEmptyEl = document.getElementById("guiScreenEmpty");
const guiScreenListEl = document.getElementById("guiScreenList");
const newGuiScreenButton = document.getElementById("newGuiScreenButton");
const guiScreenTemplateInput = document.getElementById("guiScreenTemplateInput");
const createGuiScreenFromTemplateButton = document.getElementById("createGuiScreenFromTemplateButton");
const guiScreenEmptyStateEl = document.getElementById("guiScreenEmptyState");
const guiScreenEditorEl = document.getElementById("guiScreenEditor");
const guiScreenNameInput = document.getElementById("guiScreenNameInput");
const guiScreenParametersInput = document.getElementById("guiScreenParametersInput");
const guiScreenTagInput = document.getElementById("guiScreenTagInput");
const guiScreenModalInput = document.getElementById("guiScreenModalInput");
const guiScreenZorderInput = document.getElementById("guiScreenZorderInput");
const guiScreenVariantInput = document.getElementById("guiScreenVariantInput");
const guiScreenNotesInput = document.getElementById("guiScreenNotesInput");
const guiDeleteScreenButton = document.getElementById("guiDeleteScreenButton");
const guiNewScreenNodeTypeInput = document.getElementById("guiNewScreenNodeTypeInput");
const guiAddRootNodeButton = document.getElementById("guiAddRootNodeButton");
const guiAddNodeAsChildButton = document.getElementById("guiAddNodeAsChildButton");
const guiScreenNodeTreeEl = document.getElementById("guiScreenNodeTree");
const guiScreenNodeEmptyStateEl = document.getElementById("guiScreenNodeEmptyState");
const guiScreenNodeFormEl = document.getElementById("guiScreenNodeForm");
const guiScreenNodeTypeInput = document.getElementById("guiScreenNodeTypeInput");
const guiScreenNodeTitleInput = document.getElementById("guiScreenNodeTitleInput");
const guiScreenNodeStyleInput = document.getElementById("guiScreenNodeStyleInput");
const guiScreenNodeIdInput = document.getElementById("guiScreenNodeIdInput");
const guiScreenNodePropertiesInput = document.getElementById("guiScreenNodePropertiesInput");
const guiNodeTextField = document.getElementById("guiNodeTextField");
const guiNodeTextInput = document.getElementById("guiNodeTextInput");
const guiNodeDisplayableField = document.getElementById("guiNodeDisplayableField");
const guiNodeDisplayableInput = document.getElementById("guiNodeDisplayableInput");
const guiNodeHoverDisplayableField = document.getElementById("guiNodeHoverDisplayableField");
const guiNodeHoverDisplayableInput = document.getElementById("guiNodeHoverDisplayableInput");
const guiNodeActionFields = document.getElementById("guiNodeActionFields");
const guiNodeActionKindInput = document.getElementById("guiNodeActionKindInput");
const guiNodeActionArgsInput = document.getElementById("guiNodeActionArgsInput");
const guiNodeActionRawInput = document.getElementById("guiNodeActionRawInput");
const guiNodeValueFields = document.getElementById("guiNodeValueFields");
const guiNodeValuePanelTitle = document.getElementById("guiNodeValuePanelTitle");
const guiNodeValuePanelDescription = document.getElementById("guiNodeValuePanelDescription");
const guiNodeValueKindInput = document.getElementById("guiNodeValueKindInput");
const guiNodeValueArgsInput = document.getElementById("guiNodeValueArgsInput");
const guiNodeValueRawInput = document.getElementById("guiNodeValueRawInput");
const guiNodeInputFields = document.getElementById("guiNodeInputFields");
const guiNodeInputDefaultTextInput = document.getElementById("guiNodeInputDefaultTextInput");
const guiNodeInputAllowInput = document.getElementById("guiNodeInputAllowInput");
const guiNodeInputExcludeInput = document.getElementById("guiNodeInputExcludeInput");
const guiNodeInputLengthInput = document.getElementById("guiNodeInputLengthInput");
const guiNodeInputPixelWidthInput = document.getElementById("guiNodeInputPixelWidthInput");
const guiNodeInputMaskInput = document.getElementById("guiNodeInputMaskInput");
const guiNodeInputCopyPasteInput = document.getElementById("guiNodeInputCopyPasteInput");
const guiNodeConditionField = document.getElementById("guiNodeConditionField");
const guiNodeConditionInput = document.getElementById("guiNodeConditionInput");
const guiNodeVariableField = document.getElementById("guiNodeVariableField");
const guiNodeVariableInput = document.getElementById("guiNodeVariableInput");
const guiNodeIterableField = document.getElementById("guiNodeIterableField");
const guiNodeIterableInput = document.getElementById("guiNodeIterableInput");
const guiNodeTargetScreenField = document.getElementById("guiNodeTargetScreenField");
const guiNodeTargetScreenInput = document.getElementById("guiNodeTargetScreenInput");
const guiNodeTargetArgsField = document.getElementById("guiNodeTargetArgsField");
const guiNodeTargetArgsInput = document.getElementById("guiNodeTargetArgsInput");
const guiNodeEventField = document.getElementById("guiNodeEventField");
const guiNodeEventInput = document.getElementById("guiNodeEventInput");
const guiNodeDelayField = document.getElementById("guiNodeDelayField");
const guiNodeDelayInput = document.getElementById("guiNodeDelayInput");
const guiNodeRepeatsField = document.getElementById("guiNodeRepeatsField");
const guiNodeRepeatsInput = document.getElementById("guiNodeRepeatsInput");
const guiNodeKeyField = document.getElementById("guiNodeKeyField");
const guiNodeKeyInput = document.getElementById("guiNodeKeyInput");
const guiNodeDefaultNameField = document.getElementById("guiNodeDefaultNameField");
const guiNodeDefaultNameInput = document.getElementById("guiNodeDefaultNameInput");
const guiNodeDefaultValueField = document.getElementById("guiNodeDefaultValueField");
const guiNodeDefaultValueInput = document.getElementById("guiNodeDefaultValueInput");
const guiNodeTransformField = document.getElementById("guiNodeTransformField");
const guiNodeTransformInput = document.getElementById("guiNodeTransformInput");
const guiNodeGridFields = document.getElementById("guiNodeGridFields");
const guiNodeGridColumnsInput = document.getElementById("guiNodeGridColumnsInput");
const guiNodeGridRowsInput = document.getElementById("guiNodeGridRowsInput");
const guiNodeSidePositionsField = document.getElementById("guiNodeSidePositionsField");
const guiNodeSidePositionsInput = document.getElementById("guiNodeSidePositionsInput");
const guiNodeChildrenHint = document.getElementById("guiNodeChildrenHint");
const guiAddChildNodeButton = document.getElementById("guiAddChildNodeButton");
const guiMoveNodeUpButton = document.getElementById("guiMoveNodeUpButton");
const guiMoveNodeDownButton = document.getElementById("guiMoveNodeDownButton");
const guiDeleteNodeButton = document.getElementById("guiDeleteNodeButton");
const guiScreenPreviewEl = document.getElementById("guiScreenPreview");
const guiScreenCodePreviewEl = document.getElementById("guiScreenCodePreview");
const guiScreenDiagnosticsEl = document.getElementById("guiScreenDiagnostics");

const guiConfigEmptyEl = document.getElementById("guiConfigEmpty");
const guiConfigEntryListEl = document.getElementById("guiConfigEntryList");
const newConfigEntryButton = document.getElementById("newConfigEntryButton");
const newPreferenceEntryButton = document.getElementById("newPreferenceEntryButton");
const newStoreEntryButton = document.getElementById("newStoreEntryButton");
const guiConfigEmptyStateEl = document.getElementById("guiConfigEmptyState");
const guiConfigFormEl = document.getElementById("guiConfigForm");
const guiConfigScopeInput = document.getElementById("guiConfigScopeInput");
const guiConfigNameInput = document.getElementById("guiConfigNameInput");
const guiConfigStorePathInput = document.getElementById("guiConfigStorePathInput");
const guiConfigValueInput = document.getElementById("guiConfigValueInput");
const guiConfigDescriptionInput = document.getElementById("guiConfigDescriptionInput");
const guiDeleteConfigButton = document.getElementById("guiDeleteConfigButton");
const guiConfigCodePreviewEl = document.getElementById("guiConfigCodePreview");

const guiCursorEmptyEl = document.getElementById("guiCursorEmpty");
const guiCursorListEl = document.getElementById("guiCursorList");
const newHardwareCursorButton = document.getElementById("newHardwareCursorButton");
const newDisplayableCursorButton = document.getElementById("newDisplayableCursorButton");
const newCursorUsageButton = document.getElementById("newCursorUsageButton");
const guiCursorEmptyStateEl = document.getElementById("guiCursorEmptyState");
const guiCursorFormEl = document.getElementById("guiCursorForm");
const guiCursorKindInput = document.getElementById("guiCursorKindInput");
const guiCursorNameInput = document.getElementById("guiCursorNameInput");
const guiCursorStyleTargetField = document.getElementById("guiCursorStyleTargetField");
const guiCursorStyleTargetInput = document.getElementById("guiCursorStyleTargetInput");
const guiCursorTargetCursorField = document.getElementById("guiCursorTargetCursorField");
const guiCursorTargetCursorInput = document.getElementById("guiCursorTargetCursorInput");
const guiCursorImageInput = document.getElementById("guiCursorImageInput");
const guiCursorHotspotXInput = document.getElementById("guiCursorHotspotXInput");
const guiCursorHotspotYInput = document.getElementById("guiCursorHotspotYInput");
const guiCursorFramesField = document.getElementById("guiCursorFramesField");
const guiCursorFramesInput = document.getElementById("guiCursorFramesInput");
const guiCursorNoteInput = document.getElementById("guiCursorNoteInput");
const guiDeleteCursorButton = document.getElementById("guiDeleteCursorButton");
const guiCursorReferenceListEl = document.getElementById("guiCursorReferenceList");
const guiCursorCodePreviewEl = document.getElementById("guiCursorCodePreview");

const guiShaderEmptyEl = document.getElementById("guiShaderEmpty");
const guiShaderListEl = document.getElementById("guiShaderList");
const newGuiShaderButton = document.getElementById("newGuiShaderButton");
const guiShaderEmptyStateEl = document.getElementById("guiShaderEmptyState");
const guiShaderFormEl = document.getElementById("guiShaderForm");
const guiShaderModeInput = document.getElementById("guiShaderModeInput");
const guiShaderNameInput = document.getElementById("guiShaderNameInput");
const guiShaderShaderSpecInput = document.getElementById("guiShaderShaderSpecInput");
const guiShaderTargetNameInput = document.getElementById("guiShaderTargetNameInput");
const guiShaderCallbackKeyInput = document.getElementById("guiShaderCallbackKeyInput");
const guiShaderCallbackFunctionInput = document.getElementById("guiShaderCallbackFunctionInput");
const guiShaderCustomShadersInput = document.getElementById("guiShaderCustomShadersInput");
const guiShaderIncludeDefaultInput = document.getElementById("guiShaderIncludeDefaultInput");
const guiShaderRedrawInput = document.getElementById("guiShaderRedrawInput");
const guiDeleteShaderButton = document.getElementById("guiDeleteShaderButton");
const guiShaderUsageListEl = document.getElementById("guiShaderUsageList");
const guiShaderCodePreviewEl = document.getElementById("guiShaderCodePreview");

const guiDiagnosticsOverviewEl = document.getElementById("guiDiagnosticsOverview");
const guiDiagnosticsListEl = document.getElementById("guiDiagnosticsList");
const guiDiagnosticsCodePreviewEl = document.getElementById("guiDiagnosticsCodePreview");

const defaultGuiState = {
  styles: [],
  screens: [],
  config: [],
  preferences: [],
  store: [],
  cursors: [],
  textShaders: [],
};

const stylePrefixMeta = [
  { id: "base", label: "Base", codePrefix: "", summary: "No state prefix. Applies as the default value for the property." },
  { id: "idle", label: "Idle", codePrefix: "idle_", summary: "Used when the widget is not focused." },
  { id: "hover", label: "Hover", codePrefix: "hover_", summary: "Used when the widget is focused or hovered." },
  { id: "selected", label: "Selected", codePrefix: "selected_", summary: "Used for selected widgets before more specific selected states." },
  { id: "insensitive", label: "Insensitive", codePrefix: "insensitive_", summary: "Used when the widget is disabled or unavailable." },
  { id: "selected_idle", label: "Selected Idle", codePrefix: "selected_idle_", summary: "Used when selected and not focused." },
  { id: "selected_hover", label: "Selected Hover", codePrefix: "selected_hover_", summary: "Used when selected and focused." },
  { id: "selected_insensitive", label: "Selected Disabled", codePrefix: "selected_insensitive_", summary: "Used when selected but disabled." },
];

const styleCategoryMeta = {
  text: { label: "Text", spotlightPanelId: "text" },
  window: { label: "Window", spotlightPanelId: "window" },
  button: { label: "Button", spotlightPanelId: "button" },
  bar: { label: "Bar", spotlightPanelId: "bar" },
  box: { label: "Box", spotlightPanelId: "box" },
  grid: { label: "Grid", spotlightPanelId: "grid" },
  margin: { label: "Margin", spotlightPanelId: "margin" },
};

const stylePropertyGroups = {
  position: [
    { key: "xpos", label: "xpos", type: "position", placeholder: "e.g. 0.5, 320, absolute(24)", help: "Position value along the X axis." },
    { key: "ypos", label: "ypos", type: "position", placeholder: "e.g. 0.5, 180, absolute(12)", help: "Position value along the Y axis." },
    { key: "xalign", label: "xalign", type: "float", placeholder: "e.g. 0.0 to 1.0", help: "Sets xpos and xanchor together as a relative float." },
    { key: "yalign", label: "yalign", type: "float", placeholder: "e.g. 0.0 to 1.0", help: "Sets ypos and yanchor together as a relative float." },
    { key: "xfill", label: "xfill", type: "bool", help: "Whether the displayable fills horizontal space." },
    { key: "yfill", label: "yfill", type: "bool", help: "Whether the displayable fills vertical space." },
    { key: "xminimum", label: "xminimum", type: "int", placeholder: "e.g. 320", help: "Minimum width in pixels." },
    { key: "yminimum", label: "yminimum", type: "int", placeholder: "e.g. 96", help: "Minimum height in pixels." },
  ],
  text: [
    { key: "color", label: "color", type: "color", placeholder: "#ffffff", help: "Primary text color." },
    { key: "font", label: "font", type: "string", placeholder: "e.g. gui/fonts/display.ttf", help: "Font file or font name." },
    { key: "size", label: "size", type: "int", placeholder: "e.g. 36", help: "Text size in pixels." },
    { key: "outlines", label: "outlines", type: "tuple", placeholder: 'e.g. [(1, "#000000", 0, 0)]', help: "List of outline tuples." },
    { key: "line_spacing", label: "line_spacing", type: "int", placeholder: "e.g. 8", help: "Additional spacing between lines." },
    { key: "layout", label: "layout", type: "string", placeholder: 'e.g. "tex" or "subtitle"', help: "Text layout strategy." },
    { key: "slow_cps", label: "slow_cps", type: "int", placeholder: "e.g. 32", help: "Characters per second for slow text." },
    { key: "textshader", label: "textshader", type: "string", placeholder: 'e.g. "wave:10"', help: "Apply a text shader by default for this style." },
  ],
  window: [
    { key: "background", label: "background", type: "displayable", placeholder: 'e.g. "#1f2430" or Frame("gui/frame.png", 16, 16)', help: "Window background displayable." },
    { key: "foreground", label: "foreground", type: "displayable", placeholder: 'e.g. Frame("gui/overlay.png", 16, 16)', help: "Foreground displayable drawn above children." },
    { key: "padding", label: "padding", type: "tuple", placeholder: "e.g. (24, 18) or (24, 18, 24, 18)", help: "Inner padding tuple for the window." },
    { key: "xfill", label: "xfill", type: "bool", help: "Whether the window stretches horizontally." },
    { key: "yfill", label: "yfill", type: "bool", help: "Whether the window stretches vertically." },
    { key: "size_group", label: "size_group", type: "string", placeholder: "e.g. choice_buttons", help: "Keep windows with the same group at matching size." },
  ],
  button: [
    { key: "background", label: "background", type: "displayable", placeholder: 'e.g. "#243142" or "gui/button_idle.png"', help: "Background displayable for button states." },
    { key: "child", label: "child", type: "displayable", placeholder: 'e.g. Text("Start", style="menu_button_text")', help: "Explicit child displayable that replaces button content." },
    { key: "hover_sound", label: "hover_sound", type: "string", placeholder: "e.g. audio/ui/hover.ogg", help: "Audio path when the button is hovered." },
    { key: "activate_sound", label: "activate_sound", type: "string", placeholder: "e.g. audio/ui/click.ogg", help: "Audio path when the button is activated." },
    { key: "focus_mask", label: "focus_mask", type: "displayable", placeholder: 'e.g. True or "gui/button_mask.png"', help: "Focus mask used for irregular interactive areas." },
    { key: "keyboard_focus", label: "keyboard_focus", type: "bool", help: "Whether the button can receive keyboard focus." },
    { key: "mouse", label: "mouse", type: "string", placeholder: "e.g. menu", help: "Mouse cursor style used when focused." },
  ],
  bar: [
    { key: "bar_vertical", label: "bar_vertical", type: "bool", help: "Switch the bar to a vertical orientation." },
    { key: "bar_invert", label: "bar_invert", type: "bool", help: "Invert the fill direction." },
    { key: "left_gutter", label: "left_gutter", type: "int", placeholder: "e.g. 8", help: "Left gutter in pixels." },
    { key: "right_gutter", label: "right_gutter", type: "int", placeholder: "e.g. 8", help: "Right gutter in pixels." },
    { key: "base_bar", label: "base_bar", type: "displayable", placeholder: 'e.g. "#1a1d24" or "gui/bar_base.png"', help: "Base bar displayable." },
    { key: "thumb", label: "thumb", type: "displayable", placeholder: 'e.g. "gui/bar_thumb.png"', help: "Thumb displayable shown on draggable bars." },
    { key: "thumb_offset", label: "thumb_offset", type: "tuple", placeholder: "e.g. 6 or (6, 0)", help: "Thumb offset from the bar track." },
  ],
  box: [
    { key: "spacing", label: "spacing", type: "int", placeholder: "e.g. 16", help: "Default spacing between children." },
    { key: "first_spacing", label: "first_spacing", type: "int", placeholder: "e.g. 24", help: "Override spacing between the first and second child." },
    { key: "box_wrap", label: "box_wrap", type: "bool", help: "Wrap children across rows or columns." },
    { key: "box_wrap_spacing", label: "box_wrap_spacing", type: "int", placeholder: "e.g. 12", help: "Spacing between wrapped rows or columns." },
    { key: "box_reverse", label: "box_reverse", type: "bool", help: "Reverse the child order." },
    { key: "box_align", label: "box_align", type: "float", placeholder: "e.g. 0.5", help: "Align children within the extra space." },
    { key: "box_justify", label: "box_justify", type: "string", placeholder: 'e.g. "all", "first", or True', help: "Distribute children across available space." },
  ],
  grid: [
    { key: "spacing", label: "spacing", type: "int", placeholder: "e.g. 18", help: "Default spacing between grid cells." },
    { key: "xspacing", label: "xspacing", type: "int", placeholder: "e.g. 24", help: "Horizontal grid spacing." },
    { key: "yspacing", label: "yspacing", type: "int", placeholder: "e.g. 12", help: "Vertical grid spacing." },
  ],
  margin: [
    { key: "margin", label: "margin", type: "tuple", placeholder: "e.g. (16, 12) or (16, 12, 16, 12)", help: "Outer margin tuple." },
    { key: "xmargin", label: "xmargin", type: "int", placeholder: "e.g. 24", help: "Horizontal margin." },
    { key: "ymargin", label: "ymargin", type: "int", placeholder: "e.g. 18", help: "Vertical margin." },
    { key: "left_margin", label: "left_margin", type: "int", placeholder: "e.g. 12", help: "Left margin in pixels." },
    { key: "right_margin", label: "right_margin", type: "int", placeholder: "e.g. 12", help: "Right margin in pixels." },
    { key: "top_margin", label: "top_margin", type: "int", placeholder: "e.g. 10", help: "Top margin in pixels." },
    { key: "bottom_margin", label: "bottom_margin", type: "int", placeholder: "e.g. 10", help: "Bottom margin in pixels." },
  ],
};

const stylePropertyRegistry = Object.values(stylePropertyGroups).reduce((registry, properties) => {
  properties.forEach((property) => {
    registry[property.key] = property;
  });
  return registry;
}, {});

const stylePropertyOrder = Object.values(stylePropertyGroups)
  .flat()
  .reduce((order, property, index) => {
    order[property.key] = index;
    return order;
  }, {});

const screenNodeMeta = {
  text: { label: "Text", supportsChildren: false, fields: { text: true } },
  textbutton: { label: "TextButton", supportsChildren: false, fields: { text: true, action: true } },
  button: { label: "Button", supportsChildren: true, fields: { text: true, action: true } },
  imagebutton: { label: "ImageButton", supportsChildren: false, fields: { displayable: true, hoverDisplayable: true, action: true } },
  frame: { label: "Frame", supportsChildren: true, fields: {} },
  window: { label: "Window", supportsChildren: true, fields: {} },
  vbox: { label: "VBox", supportsChildren: true, fields: {} },
  hbox: { label: "HBox", supportsChildren: true, fields: {} },
  fixed: { label: "Fixed", supportsChildren: true, fields: {} },
  grid: { label: "Grid", supportsChildren: true, fields: { grid: true } },
  null: { label: "Null", supportsChildren: false, fields: {} },
  bar: { label: "Bar", supportsChildren: false, fields: { value: true } },
  vbar: { label: "VBar", supportsChildren: false, fields: { value: true } },
  input: { label: "Input", supportsChildren: false, fields: { value: true, inputSettings: true } },
  viewport: { label: "Viewport", supportsChildren: true, fields: {} },
  vpgrid: { label: "VPGrid", supportsChildren: true, fields: { grid: true } },
  side: { label: "Side", supportsChildren: true, fields: { side: true } },
  add: { label: "Add", supportsChildren: false, fields: { displayable: true } },
  if: { label: "If", supportsChildren: true, fields: { condition: true } },
  showif: { label: "ShowIf", supportsChildren: true, fields: { condition: true } },
  for: { label: "For", supportsChildren: true, fields: { variable: true, iterable: true } },
  use: { label: "Use", supportsChildren: false, fields: { targetScreen: true, targetArgs: true } },
  default: { label: "Default", supportsChildren: false, fields: { defaultPair: true } },
  on: { label: "On", supportsChildren: true, fields: { event: true } },
  timer: { label: "Timer", supportsChildren: false, fields: { delay: true, repeats: true, action: true } },
  key: { label: "Key", supportsChildren: false, fields: { key: true, action: true } },
  transform: { label: "Transform", supportsChildren: true, fields: { transform: true } },
};

const screenNodeTypeOrder = [
  "text",
  "textbutton",
  "button",
  "imagebutton",
  "frame",
  "window",
  "vbox",
  "hbox",
  "fixed",
  "grid",
  "null",
  "bar",
  "vbar",
  "input",
  "viewport",
  "vpgrid",
  "side",
  "add",
  "if",
  "showif",
  "for",
  "use",
  "default",
  "on",
  "timer",
  "key",
  "transform",
];

const screenActionMeta = [
  { id: "none", label: "No Action", placeholder: "" },
  { id: "raw", label: "Raw Expression", placeholder: '[SetVariable("page", 2), Return()]' },
  { id: "ShowMenu", label: "ShowMenu(screen)", placeholder: '"preferences"' },
  { id: "Return", label: "Return(value)", placeholder: "" },
  { id: "Jump", label: "Jump(label)", placeholder: '"start"' },
  { id: "Call", label: "Call(label)", placeholder: '"inventory"' },
  { id: "Start", label: "Start()", placeholder: "" },
  { id: "Quit", label: "Quit(confirm=False)", placeholder: "confirm=False" },
  { id: "SetVariable", label: "SetVariable(name, value)", placeholder: '"flag", True' },
  { id: "ToggleVariable", label: "ToggleVariable(name)", placeholder: '"show_advanced"' },
  { id: "Preference", label: "Preference(name, value)", placeholder: '"display", "fullscreen"' },
  { id: "FileAction", label: "FileAction(slot)", placeholder: "1" },
  { id: "Play", label: "Play(channel, file)", placeholder: '"music", "audio/bgm.ogg"' },
  { id: "Stop", label: "Stop(channel)", placeholder: '"music"' },
  { id: "Function", label: "Function(callable, ...)", placeholder: 'renpy.notify, "Saved"' },
];

const screenValueMeta = [
  { id: "none", label: "No Value", placeholder: "" },
  { id: "raw", label: "Raw Expression", placeholder: 'Preference("music volume")' },
  { id: "Preference", label: "Preference(name)", placeholder: '"text speed"' },
  { id: "VariableValue", label: "VariableValue(name)", placeholder: '"player_name"' },
  { id: "ScreenVariableValue", label: "ScreenVariableValue(name)", placeholder: '"current_page"' },
  { id: "LocalVariableValue", label: "LocalVariableValue(name)", placeholder: '"selected_item"' },
  { id: "FieldValue", label: "FieldValue(obj, field)", placeholder: 'persistent.settings, "seen"' },
];

const screenInputValueMeta = [
  { id: "none", label: "No InputValue", placeholder: "" },
  { id: "raw", label: "Raw Expression", placeholder: 'VariableInputValue("player_name", default=True, returnable=False)' },
  { id: "VariableInputValue", label: "VariableInputValue(variable)", placeholder: '"player_name", default=True, returnable=False' },
  { id: "ScreenVariableInputValue", label: "ScreenVariableInputValue(variable)", placeholder: '"current_page", default=True, returnable=False' },
  { id: "LocalVariableInputValue", label: "LocalVariableInputValue(variable)", placeholder: '"nickname", default=True, returnable=False' },
  { id: "FieldInputValue", label: "FieldInputValue(object, field)", placeholder: 'persistent.player, "nickname", default=True, returnable=False' },
  { id: "DictInputValue", label: "DictInputValue(dict, key)", placeholder: 'persistent.profile, "nickname", default=True, returnable=False' },
  { id: "FilePageNameInputValue", label: "FilePageNameInputValue(...)", placeholder: 'pattern="Page {}", auto="Automatic saves", quick="Quick saves", page=None, default=False' },
];

const knownScreenValueKinds = new Set(
  [...screenValueMeta, ...screenInputValueMeta].map((item) => item.id),
);

function getValueMetaForNodeType(nodeType) {
  return nodeType === "input" ? screenInputValueMeta : screenValueMeta;
}

const specialScreenTemplateMeta = [
  { id: "say", label: "say", description: "Dialogue window with speaker and body text." },
  { id: "choice", label: "choice", description: "A menu/choice list with vertically stacked buttons." },
  { id: "input", label: "input", description: "Special renpy.input() screen with prompt + input id field." },
  { id: "nvl", label: "nvl", description: "NVL text stack with a loose window layout." },
  { id: "notify", label: "notify", description: "Temporary notification popup." },
  { id: "skip_indicator", label: "skip_indicator", description: "Compact skipping status notice." },
  { id: "ctc", label: "ctc", description: "Click-to-continue marker." },
  { id: "main_menu", label: "main_menu", description: "Main menu shell with the usual buttons." },
  { id: "navigation", label: "navigation", description: "Reusable navigation list for menu screens." },
  { id: "save", label: "save", description: "Save screen scaffold with a slot grid." },
  { id: "load", label: "load", description: "Load screen scaffold with a slot grid." },
  { id: "preferences", label: "preferences", description: "Preference screen with display and volume controls." },
  { id: "confirm", label: "confirm", description: "Confirmation dialog with yes/no buttons." },
];

let uniqueIdCounter = 0;

function createId(prefix) {
  uniqueIdCounter += 1;
  return `${prefix}_${Date.now().toString(36)}_${uniqueIdCounter}`;
}

function buildTemplateNode(type, patch = {}, children = []) {
  return normalizeGuiScreenNode({ type, ...patch, children }, 0);
}

function buildTemplateScreen(definition) {
  return normalizeGuiScreen(definition, 0);
}

function createScreenTemplate(templateId) {
  switch (templateId) {
    case "say":
      return buildTemplateScreen({
        id: createId("screen"),
        name: "say",
        tag: "say",
        modal: false,
        notes: "Speaker/namebox plus dialogue body.",
        nodes: [
          buildTemplateNode("window", { title: "Dialogue Window", style: "say_window" }, [
            buildTemplateNode("vbox", { title: "Dialogue Stack", style: "say_vbox" }, [
              buildTemplateNode("text", { title: "Who", text: "who", style: "say_label" }),
              buildTemplateNode("text", { title: "What", text: "what", style: "say_dialogue" }),
            ]),
          ]),
        ],
      });
    case "choice":
      return buildTemplateScreen({
        id: createId("screen"),
        name: "choice",
        notes: "A simple choice list for the choice screen.",
        nodes: [
          buildTemplateNode("window", { title: "Choice Window", style: "choice_window" }, [
            buildTemplateNode("vbox", { title: "Choices", style: "choice_vbox" }, [
              buildTemplateNode("text", { title: "Prompt", text: "_(\"Choose:\")", style: "choice_prompt" }),
              buildTemplateNode("textbutton", { title: "Choice A", text: "_(\"Choice A\")", style: "choice_button", actionKind: "Return", actionArgs: '"choice_a"' }),
              buildTemplateNode("textbutton", { title: "Choice B", text: "_(\"Choice B\")", style: "choice_button", actionKind: "Return", actionArgs: '"choice_b"' }),
            ]),
          ]),
        ],
      });
    case "input":
      return buildTemplateScreen({
        id: createId("screen"),
        name: "input",
        parameters: "prompt",
        notes: "Special screen used by renpy.input(). Keep one input node with id \"input\".",
        nodes: [
          buildTemplateNode("window", { title: "Input Window", style: "input_window" }, [
            buildTemplateNode("vbox", { title: "Input Layout", style: "input_vbox" }, [
              buildTemplateNode("text", { title: "Prompt", text: "prompt", style: "input_prompt" }),
              buildTemplateNode("input", { title: "Input Field", style: "input_field", nodeId: "input" }),
            ]),
          ]),
        ],
      });
    case "nvl":
      return buildTemplateScreen({
        id: createId("screen"),
        name: "nvl",
        tag: "nvl",
        notes: "NVL mode stack.",
        nodes: [
          buildTemplateNode("window", { title: "NVL Window", style: "nvl_window" }, [
            buildTemplateNode("vbox", { title: "NVL Stack", style: "nvl_vbox" }, [
              buildTemplateNode("text", { title: "Entry 1", text: "entry.who", style: "nvl_label" }),
              buildTemplateNode("text", { title: "Entry 1 Body", text: "entry.what", style: "nvl_dialogue" }),
            ]),
          ]),
        ],
      });
    case "notify":
      return buildTemplateScreen({
        id: createId("screen"),
        name: "notify",
        notes: "Floating notification popup.",
        nodes: [
          buildTemplateNode("frame", { title: "Notify Frame", style: "notify_frame" }, [
            buildTemplateNode("text", { title: "Notify Text", text: "message", style: "notify_text" }),
          ]),
        ],
      });
    case "skip_indicator":
      return buildTemplateScreen({
        id: createId("screen"),
        name: "skip_indicator",
        notes: "Small skip notice.",
        nodes: [
          buildTemplateNode("frame", { title: "Skip Frame", style: "skip_indicator_frame" }, [
            buildTemplateNode("text", { title: "Skip Text", text: "_(\"Skipping\")", style: "skip_indicator_text" }),
          ]),
        ],
      });
    case "ctc":
      return buildTemplateScreen({
        id: createId("screen"),
        name: "ctc",
        notes: "Click-to-continue marker.",
        nodes: [
          buildTemplateNode("add", { title: "CTC Image", displayable: '"gui/ctc.png"', style: "ctc_displayable" }),
        ],
      });
    case "navigation":
      return buildTemplateScreen({
        id: createId("screen"),
        name: "navigation",
        tag: "menu",
        modal: false,
        notes: "Reusable menu navigation list.",
        nodes: [
          buildTemplateNode("vbox", { title: "Navigation Buttons", style: "navigation_vbox" }, [
            buildTemplateNode("textbutton", { title: "History", text: "_(\"History\")", actionKind: "ShowMenu", actionArgs: '"history"', style: "navigation_button" }),
            buildTemplateNode("textbutton", { title: "Save", text: "_(\"Save\")", actionKind: "ShowMenu", actionArgs: '"save"', style: "navigation_button" }),
            buildTemplateNode("textbutton", { title: "Load", text: "_(\"Load\")", actionKind: "ShowMenu", actionArgs: '"load"', style: "navigation_button" }),
            buildTemplateNode("textbutton", { title: "Preferences", text: "_(\"Preferences\")", actionKind: "ShowMenu", actionArgs: '"preferences"', style: "navigation_button" }),
          ]),
        ],
      });
    case "main_menu":
      return buildTemplateScreen({
        id: createId("screen"),
        name: "main_menu",
        tag: "menu",
        modal: true,
        zorder: "100",
        notes: "Main menu shell.",
        nodes: [
          buildTemplateNode("frame", { title: "Main Menu Frame", style: "main_menu_frame" }, [
            buildTemplateNode("vbox", { title: "Main Menu Buttons", style: "main_menu_vbox" }, [
              buildTemplateNode("text", { title: "Game Title", text: "_(\"Game Title\")", style: "main_menu_title" }),
              buildTemplateNode("textbutton", { title: "Start", text: "_(\"Start\")", actionKind: "Start", style: "main_menu_button" }),
              buildTemplateNode("textbutton", { title: "Load", text: "_(\"Load Game\")", actionKind: "ShowMenu", actionArgs: '"load"', style: "main_menu_button" }),
              buildTemplateNode("textbutton", { title: "Preferences", text: "_(\"Preferences\")", actionKind: "ShowMenu", actionArgs: '"preferences"', style: "main_menu_button" }),
              buildTemplateNode("textbutton", { title: "Quit", text: "_(\"Quit\")", actionKind: "Quit", actionArgs: "confirm=False", style: "main_menu_button" }),
            ]),
          ]),
        ],
      });
    case "save":
      return buildTemplateScreen({
        id: createId("screen"),
        name: "save",
        tag: "menu",
        modal: true,
        zorder: "100",
        notes: "Save screen scaffold.",
        nodes: [
          buildTemplateNode("vbox", { title: "Save Layout", style: "file_screen_vbox" }, [
            buildTemplateNode("text", { title: "Save Title", text: "_(\"Save Game\")", style: "file_screen_title" }),
            buildTemplateNode("grid", { title: "Save Slots", gridColumns: "2", gridRows: "3", style: "file_slot_grid" }, [
              buildTemplateNode("button", { title: "Slot Button", text: "_(\"Slot 1\")", actionKind: "FileAction", actionArgs: "1", style: "file_slot_button" }),
            ]),
          ]),
        ],
      });
    case "load":
      return buildTemplateScreen({
        id: createId("screen"),
        name: "load",
        tag: "menu",
        modal: true,
        zorder: "100",
        notes: "Load screen scaffold.",
        nodes: [
          buildTemplateNode("vbox", { title: "Load Layout", style: "file_screen_vbox" }, [
            buildTemplateNode("text", { title: "Load Title", text: "_(\"Load Game\")", style: "file_screen_title" }),
            buildTemplateNode("grid", { title: "Load Slots", gridColumns: "2", gridRows: "3", style: "file_slot_grid" }, [
              buildTemplateNode("button", { title: "Slot Button", text: "_(\"Slot 1\")", actionKind: "FileAction", actionArgs: "1", style: "file_slot_button" }),
            ]),
          ]),
        ],
      });
    case "preferences":
      return buildTemplateScreen({
        id: createId("screen"),
        name: "preferences",
        tag: "menu",
        modal: true,
        zorder: "100",
        notes: "Preference screen scaffold based on Preference actions and values.",
        nodes: [
          buildTemplateNode("vbox", { title: "Preferences Layout", style: "preferences_vbox" }, [
            buildTemplateNode("text", { title: "Preferences Title", text: "_(\"Preferences\")", style: "preferences_title" }),
            buildTemplateNode("hbox", { title: "Display Mode", style: "preferences_row" }, [
              buildTemplateNode("textbutton", { title: "Window", text: "_(\"Window\")", actionKind: "Preference", actionArgs: '"display", "window"', style: "preferences_button" }),
              buildTemplateNode("textbutton", { title: "Fullscreen", text: "_(\"Fullscreen\")", actionKind: "Preference", actionArgs: '"display", "fullscreen"', style: "preferences_button" }),
            ]),
            buildTemplateNode("bar", { title: "Text Speed", style: "preferences_bar", valueKind: "Preference", valueArgs: '"text speed"' }),
            buildTemplateNode("bar", { title: "Music Volume", style: "preferences_bar", valueKind: "Preference", valueArgs: '"music volume"' }),
            buildTemplateNode("bar", { title: "Sound Volume", style: "preferences_bar", valueKind: "Preference", valueArgs: '"sound volume"' }),
            buildTemplateNode("bar", { title: "Voice Volume", style: "preferences_bar", valueKind: "Preference", valueArgs: '"voice volume"' }),
          ]),
        ],
      });
    case "confirm":
      return buildTemplateScreen({
        id: createId("screen"),
        name: "confirm",
        tag: "menu",
        modal: true,
        notes: "Confirmation dialog scaffold.",
        nodes: [
          buildTemplateNode("frame", { title: "Confirm Frame", style: "confirm_frame" }, [
            buildTemplateNode("vbox", { title: "Confirm Layout", style: "confirm_vbox" }, [
              buildTemplateNode("text", { title: "Confirm Prompt", text: "message", style: "confirm_prompt" }),
              buildTemplateNode("hbox", { title: "Confirm Actions", style: "confirm_hbox" }, [
                buildTemplateNode("textbutton", { title: "Yes", text: "_(\"Yes\")", actionKind: "Return", actionArgs: "True", style: "confirm_button" }),
                buildTemplateNode("textbutton", { title: "No", text: "_(\"No\")", actionKind: "Return", actionArgs: "False", style: "confirm_button" }),
              ]),
            ]),
          ]),
        ],
      });
    default:
      return buildTemplateScreen({
        id: createId("screen"),
        name: templateId || "screen_template",
        notes: "Generic template scaffold.",
        nodes: [
          buildTemplateNode("vbox", { title: "Root VBox", style: "screen_root_vbox" }, [
            buildTemplateNode("text", { title: "Heading", text: "_(\"Heading\")", style: "screen_heading" }),
          ]),
        ],
      });
  }
}

let projectState = ensureProjectState(loadProjectState());
let activeSectionId = "stylesSection";
let activeStyleId = projectState.gui.styles[0]?.id ?? null;
let activeStylePrefixId = "base";
let activeScreenId = projectState.gui.screens[0]?.id ?? null;
let activeScreenNodeId = getFirstNodeId(projectState.gui.screens[0]?.nodes ?? []);
let activeConfigEntryKey = getAllConfigEntries(projectState.gui)[0]?.key ?? null;
let activeCursorId = projectState.gui.cursors[0]?.id ?? null;
let activeShaderId = projectState.gui.textShaders[0]?.id ?? null;

function loadProjectState() {
  try {
    const raw = window.localStorage.getItem(storageKey);

    if (!raw) {
      return { gui: structuredClone(defaultGuiState) };
    }

    return JSON.parse(raw);
  } catch (error) {
    console.error(error);
    return { gui: structuredClone(defaultGuiState) };
  }
}

function ensureProjectState(rawState) {
  const normalizedState = rawState && typeof rawState === "object" && !Array.isArray(rawState)
    ? { ...rawState }
    : {};

  normalizedState.gui = normalizeGuiState(normalizedState.gui);
  return normalizedState;
}

function normalizeGuiState(rawGui) {
  if (!rawGui || typeof rawGui !== "object" || Array.isArray(rawGui)) {
    return structuredClone(defaultGuiState);
  }

  return {
    styles: Array.isArray(rawGui.styles)
      ? rawGui.styles.map((style, index) => normalizeGuiStyle(style, index))
      : [],
    screens: Array.isArray(rawGui.screens)
      ? rawGui.screens.map((screen, index) => normalizeGuiScreen(screen, index))
      : [],
    config: Array.isArray(rawGui.config)
      ? rawGui.config.map((entry, index) => normalizeGuiConfigEntry(entry, index, "config"))
      : [],
    preferences: Array.isArray(rawGui.preferences)
      ? rawGui.preferences.map((entry, index) => normalizeGuiConfigEntry(entry, index, "preferences"))
      : [],
    store: Array.isArray(rawGui.store)
      ? rawGui.store.map((entry, index) => normalizeGuiConfigEntry(entry, index, "store"))
      : [],
    cursors: Array.isArray(rawGui.cursors)
      ? rawGui.cursors.map((entry, index) => normalizeGuiCursorEntry(entry, index))
      : [],
    textShaders: Array.isArray(rawGui.textShaders)
      ? rawGui.textShaders.map((entry, index) => normalizeGuiShaderEntry(entry, index))
      : [],
  };
}

function normalizeGuiStyle(style, index) {
  return {
    id: style?.id || `gui_style_${index + 1}`,
    name: `${style?.name || ""}`.trim() || `gui_style_${index + 1}`,
    parent: `${style?.parent || ""}`.trim(),
    variant: `${style?.variant || ""}`.trim(),
    category: Object.prototype.hasOwnProperty.call(styleCategoryMeta, style?.category) ? style.category : "text",
    propertiesExpression: `${style?.propertiesExpression || ""}`.trim(),
    properties: Array.isArray(style?.properties)
      ? style.properties
        .map((property, propertyIndex) => normalizeGuiStyleProperty(property, propertyIndex))
        .filter((property) => property.key)
      : [],
  };
}

function normalizeGuiStyleProperty(property, index) {
  const definition = stylePropertyRegistry[property?.key] || {};
  const validPrefixIds = new Set(stylePrefixMeta.map((prefix) => prefix.id));
  const supportedTypes = new Set(["color", "bool", "int", "float", "position", "tuple", "displayable", "string"]);
  const type = supportedTypes.has(property?.type) ? property.type : (definition.type || "string");
  let value = "";

  if (type === "bool") {
    if (property?.value === true || property?.value === "true" || property?.value === "True") {
      value = "true";
    } else if (property?.value === false || property?.value === "false" || property?.value === "False") {
      value = "false";
    }
  } else {
    value = `${property?.value ?? ""}`.trim();
  }

  return {
    id: property?.id || `gui_style_property_${Date.now()}_${index}`,
    key: `${property?.key || ""}`.trim(),
    prefix: validPrefixIds.has(property?.prefix) ? property.prefix : "base",
    type,
    value,
  };
}

function normalizeGuiScreen(screen, index) {
  return {
    id: screen?.id || `gui_screen_${index + 1}`,
    name: `${screen?.name || ""}`.trim() || `screen_${index + 1}`,
    parameters: `${screen?.parameters || ""}`.trim(),
    tag: `${screen?.tag || ""}`.trim(),
    modal: screen?.modal === true || screen?.modal === "true",
    zorder: `${screen?.zorder ?? ""}`.trim(),
    variant: `${screen?.variant || ""}`.trim(),
    notes: `${screen?.notes || ""}`.trim(),
    nodes: Array.isArray(screen?.nodes)
      ? screen.nodes.map((node, nodeIndex) => normalizeGuiScreenNode(node, nodeIndex))
      : [],
  };
}

function normalizeGuiScreenNode(node, index) {
  const validType = Object.prototype.hasOwnProperty.call(screenNodeMeta, node?.type) ? node.type : "text";
  const normalizedChildren = Array.isArray(node?.children)
    ? node.children.map((child, childIndex) => normalizeGuiScreenNode(child, childIndex))
    : [];

  return {
    id: node?.id || createId("screen_node"),
    type: validType,
    title: `${node?.title || ""}`.trim() || `${screenNodeMeta[validType].label} ${index + 1}`,
    style: `${node?.style || ""}`.trim(),
    nodeId: `${node?.nodeId || node?.idProperty || ""}`.trim(),
    propertiesExpression: `${node?.propertiesExpression || ""}`.trim(),
    text: `${node?.text || ""}`.trim(),
    displayable: `${node?.displayable || ""}`.trim(),
    hoverDisplayable: `${node?.hoverDisplayable || ""}`.trim(),
    actionKind: screenActionMeta.some((item) => item.id === node?.actionKind) ? node.actionKind : "none",
    actionArgs: `${node?.actionArgs || ""}`.trim(),
    actionRaw: `${node?.actionRaw || ""}`.trim(),
    valueKind: knownScreenValueKinds.has(node?.valueKind) ? node.valueKind : "none",
    valueArgs: `${node?.valueArgs || ""}`.trim(),
    valueRaw: `${node?.valueRaw || ""}`.trim(),
    inputDefaultText: `${node?.inputDefaultText ?? ""}`,
    inputAllow: `${node?.inputAllow ?? ""}`,
    inputExclude: `${node?.inputExclude ?? ""}`,
    inputLength: `${node?.inputLength ?? ""}`.trim(),
    inputPixelWidth: `${node?.inputPixelWidth ?? ""}`.trim(),
    inputMask: `${node?.inputMask ?? ""}`,
    inputCopyPaste: node?.inputCopyPaste !== false && node?.inputCopyPaste !== "false",
    condition: `${node?.condition || ""}`.trim(),
    variableName: `${node?.variableName || ""}`.trim(),
    iterableExpression: `${node?.iterableExpression || ""}`.trim(),
    targetScreen: `${node?.targetScreen || ""}`.trim(),
    targetArguments: `${node?.targetArguments || ""}`.trim(),
    eventName: `${node?.eventName || ""}`.trim(),
    delay: `${node?.delay || ""}`.trim(),
    repeats: node?.repeats === true || node?.repeats === "true",
    keyName: `${node?.keyName || ""}`.trim(),
    defaultName: `${node?.defaultName || ""}`.trim(),
    defaultValue: `${node?.defaultValue || ""}`.trim(),
    transformName: `${node?.transformName || ""}`.trim(),
    gridColumns: `${node?.gridColumns || ""}`.trim(),
    gridRows: `${node?.gridRows || ""}`.trim(),
    sidePositions: `${node?.sidePositions || ""}`.trim(),
    children: normalizedChildren,
  };
}

function normalizeGuiConfigEntry(entry, index, scope) {
  return {
    id: entry?.id || `${scope}_entry_${index + 1}`,
    scope,
    name: `${entry?.name || ""}`.trim() || `${scope}_entry_${index + 1}`,
    storePath: `${entry?.storePath || ""}`.trim(),
    value: `${entry?.value || ""}`.trim(),
    description: `${entry?.description || ""}`.trim(),
  };
}

function normalizeGuiCursorEntry(entry, index) {
  const validKind = ["hardware", "displayable", "usage"].includes(entry?.kind) ? entry.kind : "hardware";
  return {
    id: entry?.id || `cursor_entry_${index + 1}`,
    kind: validKind,
    name: `${entry?.name || ""}`.trim() || `${validKind}_cursor_${index + 1}`,
    styleTarget: `${entry?.styleTarget || ""}`.trim(),
    targetCursor: `${entry?.targetCursor || ""}`.trim(),
    image: `${entry?.image || ""}`.trim(),
    hotspotX: `${entry?.hotspotX ?? ""}`.trim(),
    hotspotY: `${entry?.hotspotY ?? ""}`.trim(),
    framesExpression: `${entry?.framesExpression || ""}`.trim(),
    note: `${entry?.note || ""}`.trim(),
  };
}

function normalizeGuiShaderEntry(entry, index) {
  const validMode = ["default", "style", "callback", "custom"].includes(entry?.mode) ? entry.mode : "default";
  return {
    id: entry?.id || `textshader_entry_${index + 1}`,
    mode: validMode,
    name: `${entry?.name || ""}`.trim() || `${validMode}_shader_${index + 1}`,
    shaderSpec: `${entry?.shaderSpec || ""}`.trim(),
    targetName: `${entry?.targetName || ""}`.trim(),
    callbackKey: `${entry?.callbackKey || ""}`.trim(),
    callbackFunction: `${entry?.callbackFunction || ""}`.trim(),
    customShaders: `${entry?.customShaders || ""}`.trim(),
    includeDefault: entry?.includeDefault !== false && entry?.includeDefault !== "false",
    redraw: `${entry?.redraw || ""}`.trim(),
  };
}

function getAllConfigEntries(guiState = projectState.gui) {
  return [
    ...guiState.config.map((entry) => ({ scope: "config", entry, key: `config:${entry.id}` })),
    ...guiState.preferences.map((entry) => ({ scope: "preferences", entry, key: `preferences:${entry.id}` })),
    ...guiState.store.map((entry) => ({ scope: "store", entry, key: `store:${entry.id}` })),
  ];
}

function getFirstNodeId(nodes) {
  if (!Array.isArray(nodes) || !nodes.length) {
    return null;
  }

  return nodes[0]?.id || null;
}

function createBlankGuiStyle() {
  let nextIndex = projectState.gui.styles.length + 1;
  const existingIds = new Set(projectState.gui.styles.map((style) => style.id));

  while (existingIds.has(`gui_style_${nextIndex}`)) {
    nextIndex += 1;
  }

  return normalizeGuiStyle({
    id: `gui_style_${nextIndex}`,
    name: `gui_style_${nextIndex}`,
    parent: "default",
    variant: "",
    category: "text",
    propertiesExpression: "",
    properties: [],
  }, nextIndex - 1);
}

function createBlankGuiScreen() {
  let nextIndex = projectState.gui.screens.length + 1;
  const existingNames = new Set(projectState.gui.screens.map((screen) => screen.name));

  while (existingNames.has(`screen_${nextIndex}`)) {
    nextIndex += 1;
  }

  return normalizeGuiScreen({
    id: createId("screen"),
    name: `screen_${nextIndex}`,
    parameters: "",
    tag: "",
    modal: false,
    zorder: "",
    variant: "",
    notes: "",
    nodes: [],
  }, nextIndex - 1);
}

function createBlankScreenNode(type = "text") {
  const validType = Object.prototype.hasOwnProperty.call(screenNodeMeta, type) ? type : "text";
  const label = screenNodeMeta[validType].label;
  return normalizeGuiScreenNode({
    id: createId("screen_node"),
    type: validType,
    title: label,
    text: validType === "text" ? "_(\"Text\")" : "",
    inputCopyPaste: true,
  }, 0);
}

function createBlankConfigEntry(scope = "config") {
  const baseArray = projectState.gui[scope] || [];
  const nextIndex = baseArray.length + 1;
  return normalizeGuiConfigEntry({
    id: createId(`${scope}_entry`),
    name: `${scope}_entry_${nextIndex}`,
    value: "",
    description: "",
  }, nextIndex - 1, scope);
}

function createBlankCursorEntry(kind = "hardware") {
  const nextIndex = projectState.gui.cursors.length + 1;
  return normalizeGuiCursorEntry({
    id: createId("cursor_entry"),
    kind,
    name: `${kind}_cursor_${nextIndex}`,
    image: "",
    hotspotX: "",
    hotspotY: "",
    framesExpression: "",
    styleTarget: "",
    targetCursor: "",
    note: "",
  }, nextIndex - 1);
}

function createBlankShaderEntry(mode = "default") {
  const nextIndex = projectState.gui.textShaders.length + 1;
  return normalizeGuiShaderEntry({
    id: createId("textshader_entry"),
    mode,
    name: `${mode}_shader_${nextIndex}`,
    shaderSpec: "",
    targetName: "",
    callbackKey: "",
    callbackFunction: "",
    customShaders: "",
    includeDefault: true,
    redraw: "",
  }, nextIndex - 1);
}

function getActiveStyle() {
  return projectState.gui.styles.find((style) => style.id === activeStyleId) ?? null;
}

function getActiveScreen() {
  return projectState.gui.screens.find((screen) => screen.id === activeScreenId) ?? null;
}

function findNodeContextInList(nodes, nodeId, parent = null, depth = 0) {
  for (let index = 0; index < nodes.length; index += 1) {
    const node = nodes[index];

    if (node.id === nodeId) {
      return {
        node,
        parent,
        siblings: nodes,
        index,
        depth,
      };
    }

    const childResult = findNodeContextInList(node.children, nodeId, node, depth + 1);

    if (childResult) {
      return childResult;
    }
  }

  return null;
}

function getActiveScreenNodeContext() {
  const activeScreen = getActiveScreen();

  if (!activeScreen || !activeScreenNodeId) {
    return null;
  }

  return findNodeContextInList(activeScreen.nodes, activeScreenNodeId, null, 0);
}

function getActiveConfigEntryContext() {
  const allEntries = getAllConfigEntries();
  return allEntries.find((item) => item.key === activeConfigEntryKey) ?? null;
}

function getActiveCursor() {
  return projectState.gui.cursors.find((entry) => entry.id === activeCursorId) ?? null;
}

function getActiveShader() {
  return projectState.gui.textShaders.find((entry) => entry.id === activeShaderId) ?? null;
}

function saveProjectState(message = "Saved GUI draft.") {
  projectState.gui = normalizeGuiState(projectState.gui);
  window.localStorage.setItem(storageKey, JSON.stringify(projectState, null, 2));
  setStatus(message);
}

function setStatus(message) {
  if (guiStatusTextEl) {
    guiStatusTextEl.textContent = message;
  }
}

function escapeHtml(value) {
  return `${value ?? ""}`
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatRenpyQuotedString(value) {
  return `"${`${value ?? ""}`
    .replaceAll("\\", "\\\\")
    .replaceAll("\"", "\\\"")
    .replaceAll("\n", "\\n")}"`;
}

function isQuotedString(value) {
  return (
    (value.startsWith("\"") && value.endsWith("\""))
    || (value.startsWith("'") && value.endsWith("'"))
  );
}

function isNumericLiteral(value) {
  return /^-?\d+(?:\.\d+)?$/.test(`${value || ""}`.trim());
}

function looksLikeRenpyExpression(value) {
  const trimmed = `${value || ""}`.trim();

  if (!trimmed) {
    return false;
  }

  if (["True", "False", "None"].includes(trimmed)) {
    return true;
  }

  if (isNumericLiteral(trimmed)) {
    return true;
  }

  if (
    trimmed.includes("(")
    || trimmed.startsWith("[")
    || trimmed.startsWith("{")
  ) {
    return true;
  }

  return /^[A-Za-z_][A-Za-z0-9_\.]*(?:\[[^\]]+\])*$/.test(trimmed);
}

function looksLikeTextExpression(value) {
  const trimmed = `${value || ""}`.trim();

  if (!trimmed) {
    return false;
  }

  if (isQuotedString(trimmed) || trimmed.startsWith("_(")) {
    return true;
  }

  if (trimmed.includes("(") || trimmed.startsWith("[") || trimmed.startsWith("{")) {
    return true;
  }

  return /^[a-z_][A-Za-z0-9_\.]*$/.test(trimmed);
}

function isValidHexColor(value) {
  return /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(value);
}

function normalizeColorForPicker(value) {
  const trimmed = `${value || ""}`.trim();

  if (/^#[0-9a-fA-F]{3}$/.test(trimmed)) {
    return `#${trimmed[1]}${trimmed[1]}${trimmed[2]}${trimmed[2]}${trimmed[3]}${trimmed[3]}`;
  }

  if (/^#[0-9a-fA-F]{6}$/.test(trimmed)) {
    return trimmed;
  }

  if (/^#[0-9a-fA-F]{4}$/.test(trimmed)) {
    return `#${trimmed[1]}${trimmed[1]}${trimmed[2]}${trimmed[2]}${trimmed[3]}${trimmed[3]}`;
  }

  if (/^#[0-9a-fA-F]{8}$/.test(trimmed)) {
    return `#${trimmed.slice(1, 7)}`;
  }

  return "#ffffff";
}

function formatStyleStringLikeValue(value) {
  const trimmed = `${value || ""}`.trim();

  if (!trimmed) {
    return "";
  }

  if (isQuotedString(trimmed) || looksLikeRenpyExpression(trimmed)) {
    return trimmed;
  }

  return formatRenpyQuotedString(trimmed);
}

function formatStyleColorValue(value) {
  const trimmed = `${value || ""}`.trim();

  if (!trimmed) {
    return "";
  }

  if (trimmed.startsWith("#")) {
    return formatRenpyQuotedString(trimmed);
  }

  if (
    isQuotedString(trimmed)
    || trimmed.startsWith("(")
    || trimmed.startsWith("[")
    || trimmed.startsWith("Color(")
    || looksLikeRenpyExpression(trimmed)
  ) {
    return trimmed;
  }

  return formatRenpyQuotedString(trimmed);
}

function formatStyleDisplayableValue(value) {
  const trimmed = `${value || ""}`.trim();

  if (!trimmed) {
    return "";
  }

  if (
    isQuotedString(trimmed)
    || trimmed.startsWith("[")
    || trimmed.startsWith("{")
    || trimmed.includes("(")
    || looksLikeRenpyExpression(trimmed)
  ) {
    return trimmed;
  }

  if (trimmed.startsWith("#")) {
    return formatRenpyQuotedString(trimmed);
  }

  return formatRenpyQuotedString(trimmed);
}

function formatStyleVariantValue(value) {
  const trimmed = `${value || ""}`.trim();

  if (!trimmed) {
    return "";
  }

  if (
    isQuotedString(trimmed)
    || trimmed.startsWith("[")
    || trimmed.startsWith("(")
    || trimmed.includes(".")
  ) {
    return trimmed;
  }

  return formatRenpyQuotedString(trimmed);
}

function formatGeneralValue(value) {
  const trimmed = `${value || ""}`.trim();

  if (!trimmed) {
    return "";
  }

  if (isQuotedString(trimmed) || looksLikeRenpyExpression(trimmed)) {
    return trimmed;
  }

  return formatRenpyQuotedString(trimmed);
}

function formatStringLikeValue(value) {
  const trimmed = `${value || ""}`.trim();

  if (!trimmed) {
    return "";
  }

  if (
    isQuotedString(trimmed)
    || trimmed.includes("(")
    || /^[A-Za-z_][A-Za-z0-9_\.]*(?:\[[^\]]+\])*$/.test(trimmed)
  ) {
    return trimmed;
  }

  return formatRenpyQuotedString(trimmed);
}

function formatStyleReference(value) {
  const trimmed = `${value || ""}`.trim();

  if (!trimmed) {
    return "";
  }

  if (isQuotedString(trimmed) || trimmed.includes(".") || trimmed.includes("(")) {
    return trimmed;
  }

  return formatRenpyQuotedString(trimmed);
}

function formatScreenTextValue(value) {
  const trimmed = `${value || ""}`.trim();

  if (!trimmed) {
    return formatRenpyQuotedString("");
  }

  if (looksLikeTextExpression(trimmed)) {
    return trimmed;
  }

  return formatRenpyQuotedString(trimmed);
}

function splitRawLines(value) {
  return `${value || ""}`
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function indentLine(line, indentLevel) {
  return `${"    ".repeat(indentLevel)}${line}`;
}

function formatActionExpression(kind, args, raw) {
  const trimmedArgs = `${args || ""}`.trim();
  const trimmedRaw = `${raw || ""}`.trim();

  if (kind === "raw") {
    return trimmedRaw;
  }

  if (!kind || kind === "none") {
    return "";
  }

  if (["Start"].includes(kind)) {
    return `${kind}()`;
  }

  if (kind === "Quit") {
    return trimmedArgs ? `Quit(${trimmedArgs})` : "Quit()";
  }

  if (trimmedArgs) {
    return `${kind}(${trimmedArgs})`;
  }

  return `${kind}()`;
}

function formatValueExpression(kind, args, raw) {
  const trimmedArgs = `${args || ""}`.trim();
  const trimmedRaw = `${raw || ""}`.trim();

  if (kind === "raw") {
    return trimmedRaw;
  }

  if (!kind || kind === "none") {
    return "";
  }

  if (trimmedArgs) {
    return `${kind}(${trimmedArgs})`;
  }

  return `${kind}()`;
}

function updateActiveStyle(patch) {
  const activeStyle = getActiveStyle();

  if (!activeStyle) {
    return;
  }

  Object.assign(activeStyle, patch);
  render();
  saveProjectState(`Updated style "${activeStyle.name}".`);
}

function updateActiveStyleProperty(key, prefix, type, rawValue) {
  const activeStyle = getActiveStyle();

  if (!activeStyle || !key) {
    return;
  }

  const nextValue = type === "bool"
    ? `${rawValue || ""}`.trim().toLowerCase()
    : `${rawValue ?? ""}`.trim();
  const existingIndex = activeStyle.properties.findIndex((property) => property.key === key && property.prefix === prefix);

  if (!nextValue) {
    if (existingIndex >= 0) {
      activeStyle.properties.splice(existingIndex, 1);
    }
    render();
    saveProjectState(`Cleared ${key} on "${activeStyle.name}".`);
    return;
  }

  const nextProperty = normalizeGuiStyleProperty({
    id: activeStyle.properties[existingIndex]?.id,
    key,
    prefix,
    type,
    value: nextValue,
  }, existingIndex >= 0 ? existingIndex : activeStyle.properties.length);

  if (existingIndex >= 0) {
    activeStyle.properties.splice(existingIndex, 1, nextProperty);
  } else {
    activeStyle.properties.push(nextProperty);
  }

  render();
  saveProjectState(`Updated ${key} on "${activeStyle.name}".`);
}

function deleteActiveStyle() {
  const activeStyle = getActiveStyle();

  if (!activeStyle) {
    return;
  }

  projectState.gui.styles = projectState.gui.styles.filter((style) => style.id !== activeStyle.id);
  activeStyleId = projectState.gui.styles[0]?.id ?? null;
  render();
  saveProjectState(`Deleted style "${activeStyle.name}".`);
}

function updateActiveScreen(patch) {
  const activeScreen = getActiveScreen();

  if (!activeScreen) {
    return;
  }

  Object.assign(activeScreen, patch);
  render();
  saveProjectState(`Updated screen "${activeScreen.name}".`);
}

function updateActiveScreenNode(patch) {
  const nodeContext = getActiveScreenNodeContext();

  if (!nodeContext?.node) {
    return;
  }

  Object.assign(nodeContext.node, patch);
  render();
  saveProjectState(`Updated node "${nodeContext.node.title}".`);
}

function setActiveNodeType(nextType) {
  const nodeContext = getActiveScreenNodeContext();
  const nextMeta = screenNodeMeta[nextType];

  if (!nodeContext?.node || !nextMeta) {
    return;
  }

  if (!nextMeta.supportsChildren && nodeContext.node.children.length) {
    const confirmed = window.confirm(`"${nextMeta.label}" does not support child nodes. Delete the existing children and continue?`);

    if (!confirmed) {
      render();
      setStatus("Kept the current node type.");
      return;
    }

    nodeContext.node.children = [];
  }

  nodeContext.node.type = nextType;
  nodeContext.node.title = `${nextMeta.label}`;

  if (nextType === "input") {
    nodeContext.node.text = "";
    if (!getValueMetaForNodeType("input").some((item) => item.id === nodeContext.node.valueKind)) {
      nodeContext.node.valueKind = "none";
      nodeContext.node.valueArgs = "";
      nodeContext.node.valueRaw = "";
    }

    if (typeof nodeContext.node.inputCopyPaste !== "boolean") {
      nodeContext.node.inputCopyPaste = true;
    }
  } else {
    const validValueKinds = getValueMetaForNodeType(nextType);

    if (!validValueKinds.some((item) => item.id === nodeContext.node.valueKind)) {
      nodeContext.node.valueKind = "none";
      nodeContext.node.valueArgs = "";
      nodeContext.node.valueRaw = "";
    }
  }

  render();
  saveProjectState(`Changed node type to "${nextMeta.label}".`);
}

function deleteActiveScreen() {
  const activeScreen = getActiveScreen();

  if (!activeScreen) {
    return;
  }

  projectState.gui.screens = projectState.gui.screens.filter((screen) => screen.id !== activeScreen.id);
  activeScreenId = projectState.gui.screens[0]?.id ?? null;
  activeScreenNodeId = getFirstNodeId(getActiveScreen()?.nodes ?? []);
  render();
  saveProjectState(`Deleted screen "${activeScreen.name}".`);
}

function addRootNode(type) {
  const activeScreen = getActiveScreen();

  if (!activeScreen) {
    return;
  }

  const node = createBlankScreenNode(type);
  activeScreen.nodes.push(node);
  activeScreenNodeId = node.id;
  render();
  saveProjectState(`Added root ${screenNodeMeta[node.type].label} node.`);
}

function addChildNode(type) {
  const nodeContext = getActiveScreenNodeContext();

  if (!nodeContext?.node) {
    return;
  }

  const meta = screenNodeMeta[nodeContext.node.type];

  if (!meta?.supportsChildren) {
    setStatus(`${meta?.label || "This node"} cannot contain child nodes.`);
    return;
  }

  const child = createBlankScreenNode(type);
  nodeContext.node.children.push(child);
  activeScreenNodeId = child.id;
  render();
  saveProjectState(`Added child ${screenNodeMeta[child.type].label} node.`);
}

function deleteActiveScreenNode() {
  const nodeContext = getActiveScreenNodeContext();

  if (!nodeContext?.node) {
    return;
  }

  nodeContext.siblings.splice(nodeContext.index, 1);
  activeScreenNodeId = nodeContext.siblings[nodeContext.index]?.id
    || nodeContext.siblings[nodeContext.index - 1]?.id
    || nodeContext.parent?.id
    || getFirstNodeId(getActiveScreen()?.nodes ?? []);
  render();
  saveProjectState(`Deleted node "${nodeContext.node.title}".`);
}

function moveActiveScreenNode(direction) {
  const nodeContext = getActiveScreenNodeContext();

  if (!nodeContext?.node) {
    return;
  }

  const nextIndex = direction === "up" ? nodeContext.index - 1 : nodeContext.index + 1;

  if (nextIndex < 0 || nextIndex >= nodeContext.siblings.length) {
    return;
  }

  const [node] = nodeContext.siblings.splice(nodeContext.index, 1);
  nodeContext.siblings.splice(nextIndex, 0, node);
  activeScreenNodeId = node.id;
  render();
  saveProjectState(`Moved node "${node.title}".`);
}

function updateConfigEntry(patch) {
  const context = getActiveConfigEntryContext();

  if (!context?.entry) {
    return;
  }

  Object.assign(context.entry, patch);
  render();
  saveProjectState(`Updated ${context.scope} entry "${context.entry.name}".`);
}

function maybeMoveConfigEntryToNewScope(nextScope) {
  const context = getActiveConfigEntryContext();

  if (!context?.entry || context.scope === nextScope) {
    return;
  }

  projectState.gui[context.scope] = projectState.gui[context.scope].filter((entry) => entry.id !== context.entry.id);
  const nextEntry = normalizeGuiConfigEntry(context.entry, projectState.gui[nextScope].length, nextScope);
  projectState.gui[nextScope].push(nextEntry);
  activeConfigEntryKey = `${nextScope}:${nextEntry.id}`;
}

function deleteActiveConfigEntry() {
  const context = getActiveConfigEntryContext();

  if (!context?.entry) {
    return;
  }

  projectState.gui[context.scope] = projectState.gui[context.scope].filter((entry) => entry.id !== context.entry.id);
  activeConfigEntryKey = getAllConfigEntries(projectState.gui)[0]?.key ?? null;
  render();
  saveProjectState(`Deleted ${context.scope} entry "${context.entry.name}".`);
}

function updateActiveCursor(patch) {
  const activeCursor = getActiveCursor();

  if (!activeCursor) {
    return;
  }

  Object.assign(activeCursor, patch);
  render();
  saveProjectState(`Updated cursor entry "${activeCursor.name}".`);
}

function deleteActiveCursor() {
  const activeCursor = getActiveCursor();

  if (!activeCursor) {
    return;
  }

  projectState.gui.cursors = projectState.gui.cursors.filter((entry) => entry.id !== activeCursor.id);
  activeCursorId = projectState.gui.cursors[0]?.id ?? null;
  render();
  saveProjectState(`Deleted cursor entry "${activeCursor.name}".`);
}

function updateActiveShader(patch) {
  const activeShader = getActiveShader();

  if (!activeShader) {
    return;
  }

  Object.assign(activeShader, patch);
  render();
  saveProjectState(`Updated shader entry "${activeShader.name}".`);
}

function deleteActiveShader() {
  const activeShader = getActiveShader();

  if (!activeShader) {
    return;
  }

  projectState.gui.textShaders = projectState.gui.textShaders.filter((entry) => entry.id !== activeShader.id);
  activeShaderId = projectState.gui.textShaders[0]?.id ?? null;
  render();
  saveProjectState(`Deleted shader entry "${activeShader.name}".`);
}

function getStyleProperty(style, key, prefix = activeStylePrefixId) {
  return style?.properties.find((property) => property.key === key && property.prefix === prefix) ?? null;
}

function getStylePropertyValue(style, key, prefix = activeStylePrefixId) {
  return getStyleProperty(style, key, prefix)?.value ?? "";
}

function formatGuiStylePropertyValue(property) {
  if (!property?.value) {
    return "";
  }

  if (property.type === "color") {
    return formatStyleColorValue(property.value);
  }

  if (property.type === "bool") {
    return property.value === "false" ? "False" : "True";
  }

  if (property.type === "string") {
    return formatStyleStringLikeValue(property.value);
  }

  if (property.type === "displayable") {
    return formatStyleDisplayableValue(property.value);
  }

  return `${property.value}`.trim();
}

function formatGuiStyleCode(style) {
  if (!style) {
    return "";
  }

  const styleName = `${style.name || ""}`.trim() || "gui_style";
  const parentName = `${style.parent || ""}`.trim();
  const headerParts = ["style", styleName];

  if (parentName) {
    headerParts.push("is", parentName);
  }

  const bodyLines = [];
  const variantValue = formatStyleVariantValue(style.variant);

  if (variantValue) {
    bodyLines.push(`    variant ${variantValue}`);
  }

  if (`${style.propertiesExpression || ""}`.trim()) {
    bodyLines.push(`    properties ${style.propertiesExpression.trim()}`);
  }

  const prefixOrder = stylePrefixMeta.reduce((order, prefix, index) => {
    order[prefix.id] = index;
    return order;
  }, {});

  const sortedProperties = [...style.properties]
    .filter((property) => property.key && property.value !== "")
    .sort((left, right) => {
      const prefixDistance = (prefixOrder[left.prefix] ?? 0) - (prefixOrder[right.prefix] ?? 0);

      if (prefixDistance !== 0) {
        return prefixDistance;
      }

      return (stylePropertyOrder[left.key] ?? 999) - (stylePropertyOrder[right.key] ?? 999);
    });

  sortedProperties.forEach((property) => {
    const prefixMeta = stylePrefixMeta.find((prefix) => prefix.id === property.prefix);
    const prefixCode = prefixMeta?.codePrefix || "";
    const formattedValue = formatGuiStylePropertyValue(property);

    if (!formattedValue) {
      return;
    }

    bodyLines.push(`    ${prefixCode}${property.key} ${formattedValue}`);
  });

  if (!bodyLines.length) {
    return headerParts.join(" ");
  }

  return `${headerParts.join(" ")}:\n${bodyLines.join("\n")}`;
}

function renderStyleList() {
  const hasStyles = projectState.gui.styles.length > 0;

  if (!hasStyles) {
    activeStyleId = null;
  } else if (!getActiveStyle()) {
    activeStyleId = projectState.gui.styles[0].id;
  }

  guiStyleEmptyEl.classList.toggle("hidden", hasStyles);
  guiStyleListEl.innerHTML = "";

  projectState.gui.styles.forEach((style) => {
    const card = document.createElement("div");
    card.className = "character-card";
    card.setAttribute("role", "button");
    card.tabIndex = 0;

    if (style.id === activeStyleId) {
      card.classList.add("is-active");
    }

    const propertyCount = style.properties.length;
    const propertyLabel = propertyCount === 1 ? "property" : "properties";
    card.innerHTML = `
      <strong>${escapeHtml(style.name)}</strong>
      <span>${escapeHtml(`${styleCategoryMeta[style.category]?.label || "Style"} · ${propertyCount} ${propertyLabel}`)}</span>
    `;

    const openStyle = () => {
      activeStyleId = style.id;
      render();
      setStatus(`Opened style "${style.name}".`);
    };

    card.addEventListener("click", openStyle);
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openStyle();
      }
    });

    guiStyleListEl.appendChild(card);
  });
}

function renderStylePrefixTabs(style) {
  guiStylePrefixTabsEl.innerHTML = stylePrefixMeta.map((prefix) => `
    <button
      class="gui-prefix-tab ${prefix.id === activeStylePrefixId ? "is-active" : ""}"
      type="button"
      data-style-prefix-id="${escapeHtml(prefix.id)}"
    >
      ${escapeHtml(prefix.label)}
    </button>
  `).join("");

  const prefix = stylePrefixMeta.find((item) => item.id === activeStylePrefixId) || stylePrefixMeta[0];
  const currentPrefixPropertyCount = style.properties.filter((property) => property.prefix === activeStylePrefixId).length;
  guiStylePrefixSummaryEl.textContent = `${prefix.summary} ${currentPrefixPropertyCount ? `${currentPrefixPropertyCount} properties are set for this prefix.` : "No explicit properties are set for this prefix yet."}`;
}

function buildPropertyFieldMarkup(style, definition) {
  const value = getStylePropertyValue(style, definition.key, activeStylePrefixId);
  let controlMarkup = "";

  if (definition.type === "color") {
    controlMarkup = `
      <div class="gui-color-row">
        <input
          type="color"
          value="${escapeHtml(normalizeColorForPicker(value))}"
          data-style-property-key="${escapeHtml(definition.key)}"
          data-style-property-type="${escapeHtml(definition.type)}"
          data-style-property-source="picker"
        />
        <input
          type="text"
          value="${escapeHtml(value)}"
          placeholder="${escapeHtml(definition.placeholder || "#ffffff")}"
          data-style-property-key="${escapeHtml(definition.key)}"
          data-style-property-type="${escapeHtml(definition.type)}"
          data-style-property-source="text"
        />
      </div>
    `;
  } else if (definition.type === "bool") {
    controlMarkup = `
      <div class="gui-bool-row">
        <select data-style-property-key="${escapeHtml(definition.key)}" data-style-property-type="${escapeHtml(definition.type)}">
          <option value="" ${!value ? "selected" : ""}>Unset</option>
          <option value="true" ${value === "true" ? "selected" : ""}>True</option>
          <option value="false" ${value === "false" ? "selected" : ""}>False</option>
        </select>
      </div>
    `;
  } else if (definition.type === "int" || definition.type === "float") {
    controlMarkup = `
      <input
        type="number"
        value="${escapeHtml(value)}"
        placeholder="${escapeHtml(definition.placeholder || "")}"
        step="${definition.type === "float" ? "any" : "1"}"
        data-style-property-key="${escapeHtml(definition.key)}"
        data-style-property-type="${escapeHtml(definition.type)}"
      />
    `;
  } else {
    controlMarkup = `
      <input
        type="text"
        value="${escapeHtml(value)}"
        placeholder="${escapeHtml(definition.placeholder || "")}"
        data-style-property-key="${escapeHtml(definition.key)}"
        data-style-property-type="${escapeHtml(definition.type)}"
      />
    `;
  }

  return `
    <label class="gui-property-field">
      <div class="gui-property-field-header">
        <strong>${escapeHtml(definition.label)}</strong>
        <span class="gui-property-type">${escapeHtml(definition.type)}</span>
      </div>
      ${controlMarkup}
      <p class="gui-property-help">${escapeHtml(definition.help || "")}</p>
    </label>
  `;
}

function renderStylePanels(style) {
  const spotlightPanelId = styleCategoryMeta[style.category]?.spotlightPanelId || null;

  Object.entries(guiStylePanelContentEls).forEach(([panelId, panelContentEl]) => {
    const panelDefinitions = stylePropertyGroups[panelId] || [];
    const panelWrapper = panelContentEl.closest(".gui-style-panel");

    if (panelWrapper) {
      panelWrapper.classList.toggle("is-emphasized", panelId === spotlightPanelId);
    }

    panelContentEl.innerHTML = panelDefinitions.map((definition) => buildPropertyFieldMarkup(style, definition)).join("");
  });
}

function renderStylePropertySummary(style) {
  const prefixMeta = stylePrefixMeta.find((prefix) => prefix.id === activeStylePrefixId) || stylePrefixMeta[0];
  const prefixProperties = style.properties
    .filter((property) => property.prefix === activeStylePrefixId)
    .sort((left, right) => (stylePropertyOrder[left.key] ?? 999) - (stylePropertyOrder[right.key] ?? 999));

  if (!prefixProperties.length) {
    guiStylePropertySummaryEl.innerHTML = `<span class="gui-property-pill">${escapeHtml(`${prefixMeta.label}: no explicit properties set`)}</span>`;
    return;
  }

  guiStylePropertySummaryEl.innerHTML = prefixProperties.map((property) => `
    <span class="gui-property-pill">${escapeHtml(`${property.key} = ${property.value}`)}</span>
  `).join("");
}

function renderStyleDetail() {
  const style = getActiveStyle();
  const hasStyle = Boolean(style);

  guiStyleEmptyStateEl.classList.toggle("hidden", hasStyle);
  guiStyleFormEl.classList.toggle("hidden", !hasStyle);

  if (!style) {
    guiStyleCodePreviewEl.textContent = "";
    guiStylePropertySummaryEl.innerHTML = "";
    return;
  }

  guiStyleNameInput.value = style.name;
  guiStyleParentInput.value = style.parent;
  guiStyleVariantInput.value = style.variant;
  guiStyleCategoryInput.value = style.category;
  guiStylePropertiesExpressionInput.value = style.propertiesExpression;
  renderStylePrefixTabs(style);
  renderStylePanels(style);
  renderStylePropertySummary(style);
  guiStyleCodePreviewEl.textContent = formatGuiStyleCode(style);
}

function renderScreenTemplateOptions() {
  const options = specialScreenTemplateMeta.map((template) => `
    <option value="${escapeHtml(template.id)}">${escapeHtml(`${template.label} · ${template.description}`)}</option>
  `).join("");
  guiScreenTemplateInput.innerHTML = options;
}

function renderScreenNodeTypeOptions() {
  const options = screenNodeTypeOrder.map((type) => `
    <option value="${escapeHtml(type)}">${escapeHtml(screenNodeMeta[type].label)}</option>
  `).join("");

  guiNewScreenNodeTypeInput.innerHTML = options;
  guiScreenNodeTypeInput.innerHTML = options;
}

function renderActionValueOptions(nodeType = "text") {
  guiNodeActionKindInput.innerHTML = screenActionMeta.map((item) => `
    <option value="${escapeHtml(item.id)}">${escapeHtml(item.label)}</option>
  `).join("");
  guiNodeValueKindInput.innerHTML = getValueMetaForNodeType(nodeType).map((item) => `
    <option value="${escapeHtml(item.id)}">${escapeHtml(item.label)}</option>
  `).join("");
}

function renderScreenList() {
  const hasScreens = projectState.gui.screens.length > 0;

  if (!hasScreens) {
    activeScreenId = null;
    activeScreenNodeId = null;
  } else if (!getActiveScreen()) {
    activeScreenId = projectState.gui.screens[0].id;
    activeScreenNodeId = getFirstNodeId(projectState.gui.screens[0].nodes);
  }

  guiScreenEmptyEl.classList.toggle("hidden", hasScreens);
  guiScreenListEl.innerHTML = projectState.gui.screens.map((screen) => {
    const nodeCount = countScreenNodes(screen.nodes);
    return `
      <div class="gui-entity-card ${screen.id === activeScreenId ? "is-active" : ""}" data-screen-id="${escapeHtml(screen.id)}">
        <strong>${escapeHtml(screen.name)}</strong>
        <span>${escapeHtml(`${nodeCount} nodes${screen.tag ? ` · tag ${screen.tag}` : ""}`)}</span>
      </div>
    `;
  }).join("");
}

function countScreenNodes(nodes) {
  return nodes.reduce((count, node) => count + 1 + countScreenNodes(node.children), 0);
}

function renderScreenTreeNode(node, depth) {
  const meta = screenNodeMeta[node.type];
  return `
    <div class="gui-tree-node" style="--gui-depth:${depth};">
      <button class="gui-tree-node-card ${node.id === activeScreenNodeId ? "is-active" : ""}" type="button" data-screen-node-id="${escapeHtml(node.id)}">
        <span class="gui-tree-node-meta">${escapeHtml(meta.label)}</span>
        <strong>${escapeHtml(node.title)}</strong>
        <span>${escapeHtml(node.children.length ? `${node.children.length} children` : "leaf node")}</span>
      </button>
      ${node.children.length ? `<div class="gui-tree-children">${node.children.map((child) => renderScreenTreeNode(child, depth + 1)).join("")}</div>` : ""}
    </div>
  `;
}

function renderScreenTree() {
  const activeScreen = getActiveScreen();

  guiScreenNodeTreeEl.innerHTML = activeScreen?.nodes.length
    ? activeScreen.nodes.map((node) => renderScreenTreeNode(node, 0)).join("")
    : `<div class="gui-inline-empty">No nodes yet. Add a root node or start from a template.</div>`;
}

function renderScreenNodeDetail() {
  const nodeContext = getActiveScreenNodeContext();
  const node = nodeContext?.node || null;
  const meta = node ? screenNodeMeta[node.type] : null;
  const hasNode = Boolean(node);

  guiScreenNodeEmptyStateEl.classList.toggle("hidden", hasNode);
  guiScreenNodeFormEl.classList.toggle("hidden", !hasNode);

  if (!node || !meta) {
    return;
  }

  renderActionValueOptions(node.type);
  if (!getValueMetaForNodeType(node.type).some((item) => item.id === node.valueKind)) {
    node.valueKind = "none";
    node.valueArgs = "";
    node.valueRaw = "";
  }

  guiScreenNodeTypeInput.value = node.type;
  guiScreenNodeTitleInput.value = node.title;
  guiScreenNodeStyleInput.value = node.style;
  guiScreenNodeIdInput.value = node.nodeId;
  guiScreenNodePropertiesInput.value = node.propertiesExpression;
  guiNodeTextInput.value = node.text;
  guiNodeDisplayableInput.value = node.displayable;
  guiNodeHoverDisplayableInput.value = node.hoverDisplayable;
  guiNodeActionKindInput.value = node.actionKind;
  guiNodeActionArgsInput.value = node.actionArgs;
  guiNodeActionRawInput.value = node.actionRaw;
  guiNodeValueKindInput.value = node.valueKind;
  guiNodeValueArgsInput.value = node.valueArgs;
  guiNodeValueRawInput.value = node.valueRaw;
  guiNodeInputDefaultTextInput.value = node.inputDefaultText;
  guiNodeInputAllowInput.value = node.inputAllow;
  guiNodeInputExcludeInput.value = node.inputExclude;
  guiNodeInputLengthInput.value = node.inputLength;
  guiNodeInputPixelWidthInput.value = node.inputPixelWidth;
  guiNodeInputMaskInput.value = node.inputMask;
  guiNodeInputCopyPasteInput.checked = node.inputCopyPaste;
  guiNodeConditionInput.value = node.condition;
  guiNodeVariableInput.value = node.variableName;
  guiNodeIterableInput.value = node.iterableExpression;
  guiNodeTargetScreenInput.value = node.targetScreen;
  guiNodeTargetArgsInput.value = node.targetArguments;
  guiNodeEventInput.value = node.eventName;
  guiNodeDelayInput.value = node.delay;
  guiNodeRepeatsInput.value = node.repeats ? "true" : "false";
  guiNodeKeyInput.value = node.keyName;
  guiNodeDefaultNameInput.value = node.defaultName;
  guiNodeDefaultValueInput.value = node.defaultValue;
  guiNodeTransformInput.value = node.transformName;
  guiNodeGridColumnsInput.value = node.gridColumns;
  guiNodeGridRowsInput.value = node.gridRows;
  guiNodeSidePositionsInput.value = node.sidePositions;

  const fields = meta.fields || {};
  guiNodeTextField.classList.toggle("hidden", !fields.text);
  guiNodeDisplayableField.classList.toggle("hidden", !fields.displayable);
  guiNodeHoverDisplayableField.classList.toggle("hidden", !fields.hoverDisplayable);
  guiNodeActionFields.classList.toggle("hidden", !fields.action);
  guiNodeValueFields.classList.toggle("hidden", !fields.value);
  guiNodeInputFields.classList.toggle("hidden", !fields.inputSettings);
  guiNodeConditionField.classList.toggle("hidden", !fields.condition);
  guiNodeVariableField.classList.toggle("hidden", !fields.variable);
  guiNodeIterableField.classList.toggle("hidden", !fields.iterable);
  guiNodeTargetScreenField.classList.toggle("hidden", !fields.targetScreen);
  guiNodeTargetArgsField.classList.toggle("hidden", !fields.targetArgs);
  guiNodeEventField.classList.toggle("hidden", !fields.event);
  guiNodeDelayField.classList.toggle("hidden", !fields.delay);
  guiNodeRepeatsField.classList.toggle("hidden", !fields.repeats);
  guiNodeKeyField.classList.toggle("hidden", !fields.key);
  guiNodeDefaultNameField.classList.toggle("hidden", !fields.defaultPair);
  guiNodeDefaultValueField.classList.toggle("hidden", !fields.defaultPair);
  guiNodeTransformField.classList.toggle("hidden", !fields.transform);
  guiNodeGridFields.classList.toggle("hidden", !fields.grid);
  guiNodeSidePositionsField.classList.toggle("hidden", !fields.side);

  guiAddChildNodeButton.disabled = !meta.supportsChildren;
  guiMoveNodeUpButton.disabled = !nodeContext || nodeContext.index <= 0;
  guiMoveNodeDownButton.disabled = !nodeContext || nodeContext.index >= nodeContext.siblings.length - 1;
  guiNodeChildrenHint.textContent = meta.supportsChildren
    ? `${meta.label} can contain child nodes.`
    : (node.children.length
      ? `${meta.label} normally does not render child nodes. Existing children should be reviewed.`
      : `${meta.label} is a leaf node.`);

  const actionMeta = screenActionMeta.find((item) => item.id === node.actionKind) || screenActionMeta[0];
  const valueMetaList = getValueMetaForNodeType(node.type);
  const valueMeta = valueMetaList.find((item) => item.id === node.valueKind) || valueMetaList[0];
  guiNodeActionArgsInput.placeholder = actionMeta.placeholder || "";
  guiNodeValueArgsInput.placeholder = valueMeta.placeholder || "";
  guiNodeValueRawInput.placeholder = node.type === "input"
    ? 'e.g. VariableInputValue("player_name", default=True)'
    : 'e.g. Preference("music volume")';
  guiNodeValuePanelTitle.textContent = node.type === "input" ? "InputValue" : "Value";
  guiNodeValuePanelDescription.textContent = node.type === "input"
    ? "Bind the input field to an InputValue helper, or use a raw expression for advanced cases."
    : "Used by bars, inputs, and other value-driven displayables.";
}

function renderScreenDetail() {
  const activeScreen = getActiveScreen();
  const hasScreen = Boolean(activeScreen);

  guiScreenEmptyStateEl.classList.toggle("hidden", hasScreen);
  guiScreenEditorEl.classList.toggle("hidden", !hasScreen);

  if (!activeScreen) {
    guiScreenPreviewEl.innerHTML = "";
    guiScreenCodePreviewEl.textContent = "";
    guiScreenDiagnosticsEl.innerHTML = "";
    return;
  }

  guiScreenNameInput.value = activeScreen.name;
  guiScreenParametersInput.value = activeScreen.parameters;
  guiScreenTagInput.value = activeScreen.tag;
  guiScreenModalInput.value = activeScreen.modal ? "true" : "false";
  guiScreenZorderInput.value = activeScreen.zorder;
  guiScreenVariantInput.value = activeScreen.variant;
  guiScreenNotesInput.value = activeScreen.notes;
  renderScreenTree();
  renderScreenNodeDetail();
  renderScreenPreview();
  guiScreenCodePreviewEl.textContent = formatGuiScreenCode(activeScreen);
  renderActiveScreenDiagnostics();
}

function formatNodePropertyLines(node, indentLevel) {
  const lines = [];

  if (node.style) {
    lines.push(indentLine(`style ${formatStyleReference(node.style)}`, indentLevel));
  }

  if (node.nodeId) {
    lines.push(indentLine(`id ${formatRenpyQuotedString(node.nodeId)}`, indentLevel));
  }

  const actionExpression = formatActionExpression(node.actionKind, node.actionArgs, node.actionRaw);

  if (actionExpression) {
    lines.push(indentLine(`action ${actionExpression}`, indentLevel));
  }

  const valueExpression = formatValueExpression(node.valueKind, node.valueArgs, node.valueRaw);

  if (valueExpression) {
    lines.push(indentLine(`value ${valueExpression}`, indentLevel));
  }

  if (node.type === "input") {
    if (node.inputDefaultText) {
      lines.push(indentLine(`default ${formatScreenTextValue(node.inputDefaultText)}`, indentLevel));
    }

    if (node.inputAllow.trim()) {
      lines.push(indentLine(`allow ${formatStringLikeValue(node.inputAllow)}`, indentLevel));
    }

    if (node.inputExclude.trim()) {
      lines.push(indentLine(`exclude ${formatStringLikeValue(node.inputExclude)}`, indentLevel));
    }

    if (node.inputLength) {
      lines.push(indentLine(`length ${formatGeneralValue(node.inputLength)}`, indentLevel));
    }

    if (node.inputPixelWidth) {
      lines.push(indentLine(`pixel_width ${formatGeneralValue(node.inputPixelWidth)}`, indentLevel));
    }

    if (node.inputMask.trim()) {
      lines.push(indentLine(`mask ${formatStringLikeValue(node.inputMask)}`, indentLevel));
    }

    if (!node.inputCopyPaste) {
      lines.push(indentLine("copypaste False", indentLevel));
    }
  }

  splitRawLines(node.propertiesExpression).forEach((line) => {
    lines.push(indentLine(line, indentLevel));
  });

  return lines;
}

function formatGuiScreenNodeCode(node, indentLevel = 1) {
  const meta = screenNodeMeta[node.type];
  const propertyLines = formatNodePropertyLines(node, indentLevel + 1);
  const childLines = [];

  if (meta.supportsChildren) {
    if (node.type === "button" && node.text.trim() && !node.children.length) {
      childLines.push(indentLine(`text ${formatScreenTextValue(node.text)}`, indentLevel + 1));
    }

    node.children.forEach((child) => {
      childLines.push(formatGuiScreenNodeCode(child, indentLevel + 1));
    });
  }

  let header = "";
  let forceBlock = meta.supportsChildren;

  switch (node.type) {
    case "text":
      header = `text ${formatScreenTextValue(node.text || "_(\"Text\")")}`;
      break;
    case "textbutton":
      header = `textbutton ${formatScreenTextValue(node.text || "_(\"Button\")")}`;
      break;
    case "button":
      header = "button";
      break;
    case "imagebutton":
      header = `imagebutton idle ${formatGeneralValue(node.displayable || '"gui/button_idle.png"')} hover ${formatGeneralValue(node.hoverDisplayable || '"gui/button_hover.png"')}`;
      break;
    case "frame":
    case "window":
    case "vbox":
    case "hbox":
    case "fixed":
    case "viewport":
      header = node.type;
      break;
    case "grid":
      header = `grid ${node.gridColumns || "1"} ${node.gridRows || "1"}`;
      break;
    case "vpgrid":
      header = `vpgrid ${node.gridColumns || "1"} ${node.gridRows || "1"}`;
      break;
    case "side":
      header = `side ${formatRenpyQuotedString(node.sidePositions || "c")}`;
      break;
    case "null":
      header = "null";
      forceBlock = false;
      break;
    case "bar":
      header = "bar";
      break;
    case "vbar":
      header = "vbar";
      break;
    case "input":
      header = "input";
      break;
    case "add":
      header = `add ${formatGeneralValue(node.displayable || '"gui/placeholder.png"')}`;
      forceBlock = false;
      break;
    case "if":
      header = `if ${node.condition || "True"}:`;
      break;
    case "showif":
      header = `showif ${node.condition || "True"}:`;
      break;
    case "for":
      header = `for ${node.variableName || "item"} in ${node.iterableExpression || "items"}:`;
      break;
    case "use":
      header = node.targetArguments.trim()
        ? `use ${node.targetScreen || "screen_name"}(${node.targetArguments.trim()})`
        : `use ${node.targetScreen || "screen_name"}`;
      forceBlock = false;
      break;
    case "default":
      header = `default ${node.defaultName || "value"} = ${node.defaultValue || "None"}`;
      forceBlock = false;
      break;
    case "on":
      header = `on ${formatScreenTextValue(node.eventName || "_(\"show\")")}:`;
      break;
    case "timer":
      header = `timer ${node.delay || "0.25"}`;
      break;
    case "key":
      header = `key ${formatScreenTextValue(node.keyName || "_(\"game_menu\")")}`;
      break;
    case "transform":
      header = "transform:";
      break;
    default:
      header = `text ${formatScreenTextValue(node.text || "_(\"Text\")")}`;
      break;
  }

  const lines = [];
  const alreadyBlock = header.endsWith(":");
  const needsBlock = alreadyBlock || forceBlock || propertyLines.length || childLines.length;

  if (!needsBlock) {
    lines.push(indentLine(header, indentLevel));
    return lines.join("\n");
  }

  lines.push(indentLine(alreadyBlock ? header : `${header}:`, indentLevel));

  if (!propertyLines.length && !childLines.length && node.type === "transform") {
    lines.push(indentLine("pass", indentLevel + 1));
  } else {
    lines.push(...propertyLines);
    lines.push(...childLines);
  }

  return lines.join("\n");
}

function formatGuiScreenCode(screen) {
  if (!screen) {
    return "";
  }

  const header = [`screen ${screen.name}${screen.parameters ? `(${screen.parameters})` : ":"}`];
  if (screen.parameters) {
    header[0] = `screen ${screen.name}(${screen.parameters}):`;
  }

  const body = [];

  if (screen.tag) {
    body.push(indentLine(`tag ${formatRenpyQuotedString(screen.tag)}`, 1));
  }

  body.push(indentLine(`modal ${screen.modal ? "True" : "False"}`, 1));

  if (screen.zorder) {
    body.push(indentLine(`zorder ${screen.zorder}`, 1));
  }

  if (screen.variant) {
    body.push(indentLine(`variant ${formatGeneralValue(screen.variant)}`, 1));
  }

  if (screen.notes) {
    body.push(indentLine(`# ${screen.notes}`, 1));
  }

  if (!screen.nodes.length) {
    body.push(indentLine("pass", 1));
  } else {
    screen.nodes.forEach((node) => {
      body.push(formatGuiScreenNodeCode(node, 1));
    });
  }

  return `${header[0]}\n${body.join("\n")}`;
}

function renderPreviewNode(node) {
  const meta = screenNodeMeta[node.type];
  const previewLabel = escapeHtml(node.text || node.title || meta.label);
  const childMarkup = node.children.map((child) => renderPreviewNode(child)).join("");

  switch (node.type) {
    case "text":
      return `<div class="gui-preview-text">${previewLabel}</div>`;
    case "textbutton":
    case "button":
      return `<button class="gui-preview-button">${previewLabel}</button>`;
    case "imagebutton":
      return `<button class="gui-preview-button gui-preview-imagebutton"><span>${escapeHtml(node.title || "Image Button")}</span></button>`;
    case "frame":
    case "window":
      return `<div class="gui-preview-frame">${childMarkup || `<div class="gui-preview-placeholder">${escapeHtml(meta.label)}</div>`}</div>`;
    case "vbox":
      return `<div class="gui-preview-vbox">${childMarkup}</div>`;
    case "hbox":
      return `<div class="gui-preview-hbox">${childMarkup}</div>`;
    case "fixed":
      return `<div class="gui-preview-fixed">${childMarkup}</div>`;
    case "grid":
    case "vpgrid":
      return `<div class="gui-preview-grid">${childMarkup}</div>`;
    case "viewport":
      return `<div class="gui-preview-viewport">${childMarkup}</div>`;
    case "side":
      return `<div class="gui-preview-side">${childMarkup}</div>`;
    case "null":
      return `<div class="gui-preview-placeholder">null</div>`;
    case "bar":
    case "vbar":
      return `<div class="gui-preview-bar ${node.type === "vbar" ? "is-vertical" : ""}"><span></span></div>`;
    case "input":
      return `<input class="gui-preview-input" type="${node.inputMask.trim() ? "password" : "text"}" value="${escapeHtml(node.inputDefaultText || "")}" placeholder="${escapeHtml(node.title || "Input")}" />`;
    case "add":
      return `<div class="gui-preview-add">${escapeHtml(node.displayable || "displayable")}</div>`;
    case "if":
    case "showif":
    case "for":
    case "use":
    case "default":
    case "on":
    case "timer":
    case "key":
    case "transform":
      return `
        <div class="gui-preview-logic">
          <strong>${escapeHtml(meta.label)}</strong>
          <span>${escapeHtml(node.title)}</span>
          ${childMarkup}
        </div>
      `;
    default:
      return `<div class="gui-preview-placeholder">${escapeHtml(meta.label)}</div>`;
  }
}

function renderScreenPreview() {
  const activeScreen = getActiveScreen();

  if (!activeScreen) {
    guiScreenPreviewEl.innerHTML = "";
    return;
  }

  guiScreenPreviewEl.innerHTML = `
    <div class="gui-preview-device">
      <div class="gui-preview-header">${escapeHtml(activeScreen.name)}</div>
      <div class="gui-preview-body">
        ${activeScreen.nodes.map((node) => renderPreviewNode(node)).join("") || '<div class="gui-preview-placeholder">No nodes yet.</div>'}
      </div>
    </div>
  `;
}

function renderConfigList() {
  const allEntries = getAllConfigEntries();
  const hasEntries = allEntries.length > 0;

  if (!hasEntries) {
    activeConfigEntryKey = null;
  } else if (!getActiveConfigEntryContext()) {
    activeConfigEntryKey = allEntries[0].key;
  }

  guiConfigEmptyEl.classList.toggle("hidden", hasEntries);
  guiConfigEntryListEl.innerHTML = allEntries.map(({ scope, entry, key }) => `
    <div class="gui-entity-card ${key === activeConfigEntryKey ? "is-active" : ""}" data-config-entry-key="${escapeHtml(key)}">
      <strong>${escapeHtml(entry.name)}</strong>
      <span>${escapeHtml(`${scope}${entry.storePath ? ` · ${entry.storePath}` : ""}`)}</span>
    </div>
  `).join("");
}

function formatConfigEntryCode(entry, scope) {
  if (scope === "config") {
    return `define config.${entry.name} = ${entry.value || "None"}`;
  }

  if (scope === "preferences") {
    return `default preferences.${entry.name} = ${entry.value || "None"}`;
  }

  const storePrefix = entry.storePath ? `${entry.storePath}.` : "";
  return `default ${storePrefix}${entry.name} = ${entry.value || "None"}`;
}

function renderConfigDetail() {
  const context = getActiveConfigEntryContext();
  const hasEntry = Boolean(context?.entry);

  guiConfigEmptyStateEl.classList.toggle("hidden", hasEntry);
  guiConfigFormEl.classList.toggle("hidden", !hasEntry);

  if (!context?.entry) {
    guiConfigCodePreviewEl.textContent = formatAllConfigCode();
    return;
  }

  guiConfigScopeInput.value = context.scope;
  guiConfigNameInput.value = context.entry.name;
  guiConfigStorePathInput.value = context.entry.storePath;
  guiConfigValueInput.value = context.entry.value;
  guiConfigDescriptionInput.value = context.entry.description;
  guiConfigStorePathInput.closest("label").classList.toggle("hidden", context.scope !== "store");
  guiConfigCodePreviewEl.textContent = formatAllConfigCode();
}

function formatAllConfigCode() {
  const lines = [];
  getAllConfigEntries().forEach(({ scope, entry }) => {
    if (entry.description) {
      lines.push(`# ${entry.description}`);
    }
    lines.push(formatConfigEntryCode(entry, scope));
    lines.push("");
  });
  return lines.join("\n").trim();
}

function renderCursorList() {
  const hasEntries = projectState.gui.cursors.length > 0;

  if (!hasEntries) {
    activeCursorId = null;
  } else if (!getActiveCursor()) {
    activeCursorId = projectState.gui.cursors[0].id;
  }

  guiCursorEmptyEl.classList.toggle("hidden", hasEntries);
  guiCursorListEl.innerHTML = projectState.gui.cursors.map((entry) => `
    <div class="gui-entity-card ${entry.id === activeCursorId ? "is-active" : ""}" data-cursor-id="${escapeHtml(entry.id)}">
      <strong>${escapeHtml(entry.name)}</strong>
      <span>${escapeHtml(entry.kind)}</span>
    </div>
  `).join("");
}

function getDefinedCursorNames() {
  return new Set(
    projectState.gui.cursors
      .filter((entry) => entry.kind !== "usage")
      .map((entry) => entry.name)
      .filter(Boolean),
  );
}

function renderCursorDetail() {
  const activeCursor = getActiveCursor();
  const hasEntry = Boolean(activeCursor);

  guiCursorEmptyStateEl.classList.toggle("hidden", hasEntry);
  guiCursorFormEl.classList.toggle("hidden", !hasEntry);

  if (!activeCursor) {
    guiCursorReferenceListEl.innerHTML = "";
    guiCursorCodePreviewEl.textContent = formatAllCursorCode();
    return;
  }

  guiCursorKindInput.value = activeCursor.kind;
  guiCursorNameInput.value = activeCursor.name;
  guiCursorStyleTargetInput.value = activeCursor.styleTarget;
  guiCursorTargetCursorInput.value = activeCursor.targetCursor;
  guiCursorImageInput.value = activeCursor.image;
  guiCursorHotspotXInput.value = activeCursor.hotspotX;
  guiCursorHotspotYInput.value = activeCursor.hotspotY;
  guiCursorFramesInput.value = activeCursor.framesExpression;
  guiCursorNoteInput.value = activeCursor.note;

  guiCursorStyleTargetField.classList.toggle("hidden", activeCursor.kind !== "usage");
  guiCursorTargetCursorField.classList.toggle("hidden", activeCursor.kind !== "usage");
  guiCursorFramesField.classList.toggle("hidden", activeCursor.kind === "usage");

  renderCursorReferenceList();
  guiCursorCodePreviewEl.textContent = formatAllCursorCode();
}

function formatAllCursorCode() {
  const hardwareEntries = projectState.gui.cursors.filter((entry) => entry.kind === "hardware");
  const displayableEntries = projectState.gui.cursors.filter((entry) => entry.kind === "displayable");
  const usageEntries = projectState.gui.cursors.filter((entry) => entry.kind === "usage");
  const lines = [];

  if (hardwareEntries.length) {
    lines.push("define config.mouse = {");
    hardwareEntries.forEach((entry, index) => {
      const mapping = entry.framesExpression.trim()
        ? entry.framesExpression.trim()
        : `[( ${formatGeneralValue(entry.image || '"gui/cursor.png"')}, ${entry.hotspotX || "0"}, ${entry.hotspotY || "0"} )]`;
      lines.push(`    ${formatRenpyQuotedString(entry.name)}: ${mapping}${index < hardwareEntries.length - 1 ? "," : ""}`);
    });
    lines.push("}");
    lines.push("");
  }

  if (displayableEntries.length) {
    const [baseEntry, ...restEntries] = displayableEntries;
    let chain = `define config.mouse_displayable = MouseDisplayable(${formatGeneralValue(baseEntry.image || '"gui/cursor.png"')}, ${baseEntry.hotspotX || "0"}, ${baseEntry.hotspotY || "0"})`;
    restEntries.forEach((entry) => {
      chain += `\n    .add(${formatRenpyQuotedString(entry.name)}, ${formatGeneralValue(entry.image || '"gui/cursor.png"')}, ${entry.hotspotX || "0"}, ${entry.hotspotY || "0"})`;
    });
    lines.push(chain);
    lines.push("");
  }

  if (usageEntries.length) {
    usageEntries.forEach((entry) => {
      lines.push(`style ${entry.styleTarget || "button"}:`);
      lines.push(`    mouse ${formatRenpyQuotedString(entry.targetCursor || entry.name)}`);
      lines.push("");
    });
  }

  return lines.join("\n").trim();
}

function renderCursorReferenceList() {
  const cursorNames = getDefinedCursorNames();
  const references = [];

  projectState.gui.styles.forEach((style) => {
    style.properties
      .filter((property) => property.key === "mouse")
      .forEach((property) => {
        references.push({
          ok: cursorNames.has(property.value) || property.value === "default",
          title: `${style.name} uses cursor "${property.value}"`,
          detail: property.prefix === "base" ? "Base style cursor reference." : `Prefix ${property.prefix}.`,
        });
      });
  });

  projectState.gui.cursors
    .filter((entry) => entry.kind === "usage")
    .forEach((entry) => {
      references.push({
        ok: cursorNames.has(entry.targetCursor),
        title: `${entry.styleTarget || "style"} -> "${entry.targetCursor || entry.name}"`,
        detail: "Usage snippet emitted as a style mouse property.",
      });
    });

  if (!references.length) {
    guiCursorReferenceListEl.innerHTML = `<div class="gui-inline-empty">No cursor references yet.</div>`;
    return;
  }

  guiCursorReferenceListEl.innerHTML = references.map((reference) => `
    <div class="gui-diagnostic-card ${reference.ok ? "is-info" : "is-warning"}">
      <strong>${escapeHtml(reference.title)}</strong>
      <span>${escapeHtml(reference.detail)}</span>
    </div>
  `).join("");
}

function renderShaderList() {
  const hasEntries = projectState.gui.textShaders.length > 0;

  if (!hasEntries) {
    activeShaderId = null;
  } else if (!getActiveShader()) {
    activeShaderId = projectState.gui.textShaders[0].id;
  }

  guiShaderEmptyEl.classList.toggle("hidden", hasEntries);
  guiShaderListEl.innerHTML = projectState.gui.textShaders.map((entry) => `
    <div class="gui-entity-card ${entry.id === activeShaderId ? "is-active" : ""}" data-shader-id="${escapeHtml(entry.id)}">
      <strong>${escapeHtml(entry.name)}</strong>
      <span>${escapeHtml(entry.mode)}</span>
    </div>
  `).join("");
}

function renderShaderDetail() {
  const activeShader = getActiveShader();
  const hasEntry = Boolean(activeShader);

  guiShaderEmptyStateEl.classList.toggle("hidden", hasEntry);
  guiShaderFormEl.classList.toggle("hidden", !hasEntry);

  if (!activeShader) {
    guiShaderUsageListEl.innerHTML = "";
    guiShaderCodePreviewEl.textContent = formatAllShaderCode();
    return;
  }

  guiShaderModeInput.value = activeShader.mode;
  guiShaderNameInput.value = activeShader.name;
  guiShaderShaderSpecInput.value = activeShader.shaderSpec;
  guiShaderTargetNameInput.value = activeShader.targetName;
  guiShaderCallbackKeyInput.value = activeShader.callbackKey;
  guiShaderCallbackFunctionInput.value = activeShader.callbackFunction;
  guiShaderCustomShadersInput.value = activeShader.customShaders;
  guiShaderIncludeDefaultInput.value = activeShader.includeDefault ? "true" : "false";
  guiShaderRedrawInput.value = activeShader.redraw;

  const isDefault = activeShader.mode === "default";
  const isStyle = activeShader.mode === "style";
  const isCallback = activeShader.mode === "callback";
  const isCustom = activeShader.mode === "custom";

  guiShaderTargetNameInput.closest("label").classList.toggle("hidden", !(isStyle || isDefault));
  guiShaderCallbackKeyInput.closest("label").classList.toggle("hidden", !isCallback);
  guiShaderCallbackFunctionInput.closest("label").classList.toggle("hidden", !isCallback);
  guiShaderCustomShadersInput.closest("label").classList.toggle("hidden", !isCustom);
  guiShaderIncludeDefaultInput.closest("label").classList.toggle("hidden", !isCustom);
  guiShaderRedrawInput.closest("label").classList.toggle("hidden", !isCustom);

  renderShaderUsageList();
  guiShaderCodePreviewEl.textContent = formatAllShaderCode();
}

function formatShaderEntryCode(entry) {
  switch (entry.mode) {
    case "default":
      return `define config.default_textshader = ${formatGeneralValue(entry.shaderSpec || '"default"')}`;
    case "style":
      return `style ${entry.targetName || "default"}:\n    textshader ${formatGeneralValue(entry.shaderSpec || '"wave"')}`;
    case "callback":
      return `define config.textshader_callbacks[${formatGeneralValue(entry.callbackKey || '"default"')}] = ${entry.callbackFunction || "get_default_textshader"}`;
    case "custom": {
      const parts = [
        `renpy.register_textshader(${formatRenpyQuotedString(entry.name || "custom_shader")}`,
        `shaders=${entry.customShaders || formatGeneralValue(entry.shaderSpec || '"textshader.wave"')}`,
        `include_default=${entry.includeDefault ? "True" : "False"}`,
      ];
      if (entry.redraw) {
        parts.push(`redraw=${entry.redraw}`);
      }
      return `init python:\n    ${parts.join(", ")})`;
    }
    default:
      return "";
  }
}

function formatAllShaderCode() {
  return projectState.gui.textShaders
    .map((entry) => formatShaderEntryCode(entry))
    .filter(Boolean)
    .join("\n\n");
}

function renderShaderUsageList() {
  const entries = projectState.gui.textShaders.map((entry) => {
    let detail = "";

    switch (entry.mode) {
      case "default":
        detail = "Assigns the default text shader via config.default_textshader.";
        break;
      case "style":
        detail = `Targets style ${entry.targetName || "default"}.`;
        break;
      case "callback":
        detail = `Maps callback key ${entry.callbackKey || "default"} to ${entry.callbackFunction || "callback"}.`;
        break;
      case "custom":
        detail = "Registers a custom text shader.";
        break;
      default:
        detail = "";
    }

    return { title: `${entry.name} · ${entry.mode}`, detail };
  });

  guiShaderUsageListEl.innerHTML = entries.length
    ? entries.map((entry) => `
      <div class="gui-diagnostic-card is-info">
        <strong>${escapeHtml(entry.title)}</strong>
        <span>${escapeHtml(entry.detail)}</span>
      </div>
    `).join("")
    : `<div class="gui-inline-empty">No shader usage notes yet.</div>`;
}

function computeDiagnostics() {
  const diagnostics = [];
  const cursorNames = getDefinedCursorNames();
  const styleNames = new Set(projectState.gui.styles.map((style) => style.name));

  projectState.gui.styles.forEach((style) => {
    if (!style.properties.length && !style.propertiesExpression) {
      diagnostics.push({
        severity: "info",
        title: `Style "${style.name}" is empty`,
        detail: "Empty styles are valid, but they usually mean the style is still a placeholder.",
        snippet: formatGuiStyleCode(style),
      });
    }

    style.properties
      .filter((property) => property.key === "mouse" && property.value)
      .forEach((property) => {
        if (!cursorNames.has(property.value) && property.value !== "default") {
          diagnostics.push({
            severity: "warning",
            title: `Style "${style.name}" references missing cursor "${property.value}"`,
            detail: "The mouse property points to a cursor name that is not defined in the cursor editor.",
            snippet: formatGuiStyleCode(style),
          });
        }
      });
  });

  const specialMenuScreens = new Set(["main_menu", "navigation", "preferences", "save", "load", "confirm"]);

  projectState.gui.screens.forEach((screen) => {
    const nodeCount = countScreenNodes(screen.nodes);
    const isSpecialInputScreen = screen.name === "input";
    const specialInputNodes = [];

    if (!screen.nodes.length) {
      diagnostics.push({
        severity: "error",
        title: `Screen "${screen.name}" has no nodes`,
        detail: "A screen without nodes will render nothing and often indicates an unfinished editor draft.",
        snippet: formatGuiScreenCode(screen),
      });
    }

    if (specialMenuScreens.has(screen.name) && !screen.tag) {
      diagnostics.push({
        severity: "warning",
        title: `Screen "${screen.name}" is missing a menu tag`,
        detail: "Special menu screens usually carry tag \"menu\" so menu transitions and replacements behave consistently.",
        snippet: formatGuiScreenCode(screen),
      });
    }

    if (nodeCount > 24) {
      diagnostics.push({
        severity: "info",
        title: `Screen "${screen.name}" is getting large`,
        detail: "Consider extracting repeated groups into a separate screen and using the use statement for better maintenance.",
        snippet: formatGuiScreenCode(screen),
      });
    }

    walkScreenNodes(screen.nodes, (node) => {
      if (node.type === "input" && node.nodeId === "input") {
        specialInputNodes.push(node);
      }
    });

    if (isSpecialInputScreen && !/\bprompt\b/.test(screen.parameters)) {
      diagnostics.push({
        severity: "error",
        title: `${screen.name} is missing the prompt parameter`,
        detail: "The special input screen should usually be declared as screen input(prompt): so renpy.input() can pass prompt text into it.",
        snippet: formatGuiScreenCode(screen),
      });
    }

    if (isSpecialInputScreen && !specialInputNodes.length) {
      diagnostics.push({
        severity: "error",
        title: `${screen.name} has no input node with id "input"`,
        detail: "The special input screen must contain an input displayable whose id is set to input.",
        snippet: formatGuiScreenCode(screen),
      });
    }

    if (isSpecialInputScreen && specialInputNodes.length > 1) {
      diagnostics.push({
        severity: "warning",
        title: `${screen.name} defines multiple input id nodes`,
        detail: "renpy.input() expects one primary input widget with id \"input\". Multiple matches can make the screen harder to reason about.",
        snippet: formatGuiScreenCode(screen),
      });
    }

    walkScreenNodes(screen.nodes, (node) => {
      const meta = screenNodeMeta[node.type];

      if (!meta.supportsChildren && node.children.length) {
        diagnostics.push({
          severity: "warning",
          title: `${screen.name} · ${node.title} has hidden child nodes`,
          detail: `${meta.label} does not normally render child nodes, so these children should be moved or the node type should be changed.`,
          snippet: formatGuiScreenCode(screen),
        });
      }

      if (["textbutton", "button", "imagebutton", "timer", "key"].includes(node.type)) {
        const actionExpression = formatActionExpression(node.actionKind, node.actionArgs, node.actionRaw);
        if (!actionExpression) {
          diagnostics.push({
            severity: "warning",
            title: `${screen.name} · ${node.title} has no action`,
            detail: "Interactive nodes usually need an action to be useful.",
            snippet: formatGuiScreenCode(screen),
          });
        }
      }

      if (["bar", "vbar"].includes(node.type)) {
        const valueExpression = formatValueExpression(node.valueKind, node.valueArgs, node.valueRaw);
        if (!valueExpression) {
          diagnostics.push({
            severity: "warning",
            title: `${screen.name} · ${node.title} has no value`,
            detail: "Value-driven widgets like bars and inputs usually need a value expression.",
            snippet: formatGuiScreenCode(screen),
          });
        }
      }

      if (node.type === "input") {
        const valueExpression = formatValueExpression(node.valueKind, node.valueArgs, node.valueRaw);
        const isSpecialInputNode = isSpecialInputScreen && node.nodeId === "input";

        if (!valueExpression && !isSpecialInputNode) {
          diagnostics.push({
            severity: "warning",
            title: `${screen.name} · ${node.title} has no InputValue`,
            detail: "Standalone input widgets usually bind an InputValue helper. The common exception is the special input screen used by renpy.input().",
            snippet: formatGuiScreenCode(screen),
          });
        }

        if (!isSpecialInputNode && [
          "VariableInputValue",
          "ScreenVariableInputValue",
          "LocalVariableInputValue",
          "FieldInputValue",
          "DictInputValue",
          "FilePageNameInputValue",
        ].includes(node.valueKind) && !node.valueArgs) {
          diagnostics.push({
            severity: "warning",
            title: `${screen.name} · ${node.title} is missing InputValue arguments`,
            detail: "This InputValue helper needs arguments to know which variable, field, dict key, or page name it should update.",
            snippet: formatGuiScreenCode(screen),
          });
        }
      }

      if (["if", "showif"].includes(node.type) && !node.condition) {
        diagnostics.push({
          severity: "error",
          title: `${screen.name} · ${node.title} is missing a condition`,
          detail: "Conditional blocks need an expression to decide when to render.",
          snippet: formatGuiScreenCode(screen),
        });
      }

      if (node.type === "for" && (!node.variableName || !node.iterableExpression)) {
        diagnostics.push({
          severity: "error",
          title: `${screen.name} · ${node.title} is incomplete`,
          detail: "for blocks need both a loop variable and an iterable expression.",
          snippet: formatGuiScreenCode(screen),
        });
      }

      if (node.type === "use" && !node.targetScreen) {
        diagnostics.push({
          severity: "error",
          title: `${screen.name} · ${node.title} has no target screen`,
          detail: "use statements need a target screen name.",
          snippet: formatGuiScreenCode(screen),
        });
      }

      if (node.type === "default" && (!node.defaultName || !node.defaultValue)) {
        diagnostics.push({
          severity: "error",
          title: `${screen.name} · ${node.title} is missing a default pair`,
          detail: "default statements need both a variable name and a value.",
          snippet: formatGuiScreenCode(screen),
        });
      }
    });
  });

  getAllConfigEntries().forEach(({ scope, entry }) => {
    if (!entry.name || !entry.value) {
      diagnostics.push({
        severity: "warning",
        title: `${scope} entry "${entry.name || "(unnamed)"}" is incomplete`,
        detail: "Config-like entries should have both a name and a value to emit valid code.",
        snippet: formatAllConfigCode(),
      });
    }
  });

  projectState.gui.cursors.forEach((entry) => {
    if (entry.kind !== "usage" && !entry.image && !entry.framesExpression) {
      diagnostics.push({
        severity: "warning",
        title: `Cursor "${entry.name}" is missing image data`,
        detail: "Hardware and displayable cursor entries should define either an image or a raw frame expression.",
        snippet: formatAllCursorCode(),
      });
    }

    if (entry.kind === "usage" && entry.targetCursor && !cursorNames.has(entry.targetCursor)) {
      diagnostics.push({
        severity: "warning",
        title: `Cursor usage "${entry.name}" references missing cursor "${entry.targetCursor}"`,
        detail: "Usage snippets should point at a cursor that is defined in the cursor editor.",
        snippet: formatAllCursorCode(),
      });
    }
  });

  projectState.gui.textShaders.forEach((entry) => {
    if (entry.mode === "default" && !entry.shaderSpec) {
      diagnostics.push({
        severity: "warning",
        title: `Shader "${entry.name}" is missing a shader spec`,
        detail: "Default shader entries need a shader string such as \"wave:10\".",
        snippet: formatAllShaderCode(),
      });
    }

    if (entry.mode === "style" && (!entry.shaderSpec || !entry.targetName)) {
      diagnostics.push({
        severity: "warning",
        title: `Style shader "${entry.name}" is incomplete`,
        detail: "Style-mode shader entries need both a target style and a shader spec.",
        snippet: formatAllShaderCode(),
      });
    }

    if (entry.mode === "style" && entry.targetName && !styleNames.has(entry.targetName)) {
      diagnostics.push({
        severity: "info",
        title: `Style shader "${entry.name}" targets missing style "${entry.targetName}"`,
        detail: "This may be intentional, but often means the style has not been created yet.",
        snippet: formatAllShaderCode(),
      });
    }

    if (entry.mode === "callback" && (!entry.callbackKey || !entry.callbackFunction)) {
      diagnostics.push({
        severity: "warning",
        title: `Callback shader "${entry.name}" is incomplete`,
        detail: "Callback entries need both a callback key and a callback function.",
        snippet: formatAllShaderCode(),
      });
    }

    if (entry.mode === "custom" && (!entry.name || !entry.customShaders)) {
      diagnostics.push({
        severity: "warning",
        title: `Custom shader "${entry.name || "(unnamed)"}" is incomplete`,
        detail: "Custom text shader registrations need a registration name and shaders= expression.",
        snippet: formatAllShaderCode(),
      });
    }
  });

  return diagnostics;
}

function walkScreenNodes(nodes, callback) {
  nodes.forEach((node) => {
    callback(node);
    walkScreenNodes(node.children, callback);
  });
}

function renderActiveScreenDiagnostics() {
  const screen = getActiveScreen();

  if (!screen) {
    guiScreenDiagnosticsEl.innerHTML = "";
    return;
  }

  const diagnostics = computeDiagnostics().filter((item) => item.snippet === formatGuiScreenCode(screen));
  guiScreenDiagnosticsEl.innerHTML = diagnostics.length
    ? diagnostics.map((item) => `
      <div class="gui-diagnostic-card is-${escapeHtml(item.severity)}">
        <strong>${escapeHtml(item.title)}</strong>
        <span>${escapeHtml(item.detail)}</span>
      </div>
    `).join("")
    : `<div class="gui-inline-empty">No active issues detected for this screen.</div>`;
}

function renderDiagnostics() {
  const diagnostics = computeDiagnostics();
  const errorCount = diagnostics.filter((item) => item.severity === "error").length;
  const warningCount = diagnostics.filter((item) => item.severity === "warning").length;
  const infoCount = diagnostics.filter((item) => item.severity === "info").length;

  guiDiagnosticsOverviewEl.innerHTML = `
    <span class="gui-property-pill">Errors: ${errorCount}</span>
    <span class="gui-property-pill">Warnings: ${warningCount}</span>
    <span class="gui-property-pill">Info: ${infoCount}</span>
  `;

  guiDiagnosticsListEl.innerHTML = diagnostics.length
    ? diagnostics.map((item) => `
      <div class="gui-diagnostic-card is-${escapeHtml(item.severity)}">
        <strong>${escapeHtml(item.title)}</strong>
        <span>${escapeHtml(item.detail)}</span>
      </div>
    `).join("")
    : `<div class="gui-inline-empty">No diagnostics to report right now.</div>`;

  guiDiagnosticsCodePreviewEl.textContent = diagnostics
    .map((item) => item.snippet)
    .filter(Boolean)
    .slice(0, 5)
    .join("\n\n");
}

function renderTopbar() {
  guiProjectPathEl.textContent = projectPath || "No project path provided.";
}

function renderNav() {
  const diagnostics = computeDiagnostics();
  guiNavButtonEls.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.guiSection === activeSectionId);
  });

  guiSectionEls.forEach((section) => {
    section.classList.toggle("hidden", section.id !== activeSectionId);
    section.classList.toggle("is-active", section.id === activeSectionId);
  });

  stylesNavCountEl.textContent = String(projectState.gui.styles.length);
  screensNavCountEl.textContent = String(projectState.gui.screens.length);
  configNavCountEl.textContent = String(getAllConfigEntries().length);
  cursorsNavCountEl.textContent = String(projectState.gui.cursors.length);
  shadersNavCountEl.textContent = String(projectState.gui.textShaders.length);
  diagnosticsNavCountEl.textContent = String(diagnostics.filter((item) => item.severity !== "info").length);
}

function render() {
  projectState = ensureProjectState(projectState);
  renderTopbar();
  renderNav();
  renderStyleList();
  renderStyleDetail();
  renderScreenList();
  renderScreenDetail();
  renderConfigList();
  renderConfigDetail();
  renderCursorList();
  renderCursorDetail();
  renderShaderList();
  renderShaderDetail();
  renderDiagnostics();
}

function createEntityCardSelectionHandler(event, attributeName, setter) {
  const card = event.target.closest(`[${attributeName}]`);
  if (!card) {
    return null;
  }

  setter(card.getAttribute(attributeName));
  render();
  return card;
}

renderScreenTemplateOptions();
renderScreenNodeTypeOptions();
renderActionValueOptions();

guiNavButtonEls.forEach((button) => {
  button.addEventListener("click", () => {
    activeSectionId = button.dataset.guiSection;
    render();
    setStatus(`Opened ${button.textContent.trim()} section.`);
  });
});

guiBackButton.addEventListener("click", () => {
  const query = projectPath ? `?project=${encodeURIComponent(projectPath)}` : "";
  window.location.href = `./index.html${query}`;
});

guiSaveButton.addEventListener("click", () => {
  saveProjectState("Saved GUI draft.");
});

newGuiStyleButton.addEventListener("click", () => {
  const nextStyle = createBlankGuiStyle();
  projectState.gui.styles.push(nextStyle);
  activeStyleId = nextStyle.id;
  activeStylePrefixId = "base";
  render();
  saveProjectState(`Created style "${nextStyle.name}".`);
});

guiDeleteStyleButton.addEventListener("click", () => {
  const activeStyle = getActiveStyle();
  if (!activeStyle) {
    return;
  }
  if (!window.confirm(`Delete style "${activeStyle.name}"? This cannot be undone.`)) {
    setStatus(`Kept style "${activeStyle.name}".`);
    return;
  }
  deleteActiveStyle();
});

guiStyleFormEl.addEventListener("input", (event) => {
  if (event.target.dataset.stylePropertySource === "picker") {
    updateActiveStyleProperty(
      event.target.dataset.stylePropertyKey,
      activeStylePrefixId,
      event.target.dataset.stylePropertyType,
      event.target.value,
    );
  }
});

guiStyleFormEl.addEventListener("change", (event) => {
  const activeStyle = getActiveStyle();

  if (!activeStyle) {
    return;
  }

  if (event.target === guiStyleNameInput) {
    updateActiveStyle({ name: `${event.target.value || ""}`.trim() || activeStyle.name });
    return;
  }

  if (event.target === guiStyleParentInput) {
    updateActiveStyle({ parent: `${event.target.value || ""}`.trim() });
    return;
  }

  if (event.target === guiStyleVariantInput) {
    updateActiveStyle({ variant: event.target.value });
    return;
  }

  if (event.target === guiStyleCategoryInput) {
    updateActiveStyle({ category: event.target.value });
    return;
  }

  if (event.target === guiStylePropertiesExpressionInput) {
    updateActiveStyle({ propertiesExpression: event.target.value });
    return;
  }

  const key = event.target.dataset.stylePropertyKey;
  const type = event.target.dataset.stylePropertyType;

  if (key && type) {
    updateActiveStyleProperty(key, activeStylePrefixId, type, event.target.value);
  }
});

guiStylePrefixTabsEl.addEventListener("click", (event) => {
  const prefixButton = event.target.closest("[data-style-prefix-id]");
  if (!prefixButton) {
    return;
  }
  activeStylePrefixId = prefixButton.dataset.stylePrefixId;
  render();
  setStatus(`Switched to ${prefixButton.textContent.trim()} prefix editing.`);
});

guiScreenListEl.addEventListener("click", (event) => {
  const card = createEntityCardSelectionHandler(event, "data-screen-id", (value) => {
    activeScreenId = value;
    activeScreenNodeId = getFirstNodeId(getActiveScreen()?.nodes ?? []);
  });

  if (card) {
    setStatus(`Opened screen "${getActiveScreen()?.name || ""}".`);
  }
});

newGuiScreenButton.addEventListener("click", () => {
  const screen = createBlankGuiScreen();
  projectState.gui.screens.push(screen);
  activeScreenId = screen.id;
  activeScreenNodeId = null;
  render();
  saveProjectState(`Created screen "${screen.name}".`);
});

createGuiScreenFromTemplateButton.addEventListener("click", () => {
  const screen = createScreenTemplate(guiScreenTemplateInput.value);
  projectState.gui.screens.push(screen);
  activeScreenId = screen.id;
  activeScreenNodeId = getFirstNodeId(screen.nodes);
  render();
  saveProjectState(`Created screen "${screen.name}" from template.`);
});

guiDeleteScreenButton.addEventListener("click", () => {
  const screen = getActiveScreen();
  if (!screen) {
    return;
  }
  if (!window.confirm(`Delete screen "${screen.name}"? This cannot be undone.`)) {
    setStatus(`Kept screen "${screen.name}".`);
    return;
  }
  deleteActiveScreen();
});

[
  guiScreenNameInput,
  guiScreenParametersInput,
  guiScreenTagInput,
  guiScreenModalInput,
  guiScreenZorderInput,
  guiScreenVariantInput,
  guiScreenNotesInput,
].forEach((input) => {
  input.addEventListener("change", () => {
    const screen = getActiveScreen();
    if (!screen) {
      return;
    }

    updateActiveScreen({
      name: guiScreenNameInput.value.trim() || screen.name,
      parameters: guiScreenParametersInput.value,
      tag: guiScreenTagInput.value.trim(),
      modal: guiScreenModalInput.value === "true",
      zorder: guiScreenZorderInput.value.trim(),
      variant: guiScreenVariantInput.value.trim(),
      notes: guiScreenNotesInput.value.trim(),
    });
  });
});

guiAddRootNodeButton.addEventListener("click", () => {
  addRootNode(guiNewScreenNodeTypeInput.value);
});

guiAddNodeAsChildButton.addEventListener("click", () => {
  addChildNode(guiNewScreenNodeTypeInput.value);
});

guiScreenNodeTreeEl.addEventListener("click", (event) => {
  const card = event.target.closest("[data-screen-node-id]");
  if (!card) {
    return;
  }
  activeScreenNodeId = card.getAttribute("data-screen-node-id");
  render();
  setStatus(`Opened node "${getActiveScreenNodeContext()?.node?.title || ""}".`);
});

guiScreenNodeTypeInput.addEventListener("change", () => {
  setActiveNodeType(guiScreenNodeTypeInput.value);
});

[
  guiScreenNodeTitleInput,
  guiScreenNodeStyleInput,
  guiScreenNodeIdInput,
  guiScreenNodePropertiesInput,
  guiNodeTextInput,
  guiNodeDisplayableInput,
  guiNodeHoverDisplayableInput,
  guiNodeActionKindInput,
  guiNodeActionArgsInput,
  guiNodeActionRawInput,
  guiNodeValueKindInput,
  guiNodeValueArgsInput,
  guiNodeValueRawInput,
  guiNodeInputDefaultTextInput,
  guiNodeInputAllowInput,
  guiNodeInputExcludeInput,
  guiNodeInputLengthInput,
  guiNodeInputPixelWidthInput,
  guiNodeInputMaskInput,
  guiNodeInputCopyPasteInput,
  guiNodeConditionInput,
  guiNodeVariableInput,
  guiNodeIterableInput,
  guiNodeTargetScreenInput,
  guiNodeTargetArgsInput,
  guiNodeEventInput,
  guiNodeDelayInput,
  guiNodeRepeatsInput,
  guiNodeKeyInput,
  guiNodeDefaultNameInput,
  guiNodeDefaultValueInput,
  guiNodeTransformInput,
  guiNodeGridColumnsInput,
  guiNodeGridRowsInput,
  guiNodeSidePositionsInput,
].forEach((input) => {
  input.addEventListener("change", () => {
    updateActiveScreenNode({
      title: guiScreenNodeTitleInput.value.trim() || (getActiveScreenNodeContext()?.node?.title || "Node"),
      style: guiScreenNodeStyleInput.value.trim(),
      nodeId: guiScreenNodeIdInput.value.trim(),
      propertiesExpression: guiScreenNodePropertiesInput.value,
      text: guiNodeTextInput.value.trim(),
      displayable: guiNodeDisplayableInput.value.trim(),
      hoverDisplayable: guiNodeHoverDisplayableInput.value.trim(),
      actionKind: guiNodeActionKindInput.value,
      actionArgs: guiNodeActionArgsInput.value.trim(),
      actionRaw: guiNodeActionRawInput.value.trim(),
      valueKind: guiNodeValueKindInput.value,
      valueArgs: guiNodeValueArgsInput.value.trim(),
      valueRaw: guiNodeValueRawInput.value.trim(),
      inputDefaultText: guiNodeInputDefaultTextInput.value,
      inputAllow: guiNodeInputAllowInput.value,
      inputExclude: guiNodeInputExcludeInput.value,
      inputLength: guiNodeInputLengthInput.value.trim(),
      inputPixelWidth: guiNodeInputPixelWidthInput.value.trim(),
      inputMask: guiNodeInputMaskInput.value,
      inputCopyPaste: guiNodeInputCopyPasteInput.checked,
      condition: guiNodeConditionInput.value.trim(),
      variableName: guiNodeVariableInput.value.trim(),
      iterableExpression: guiNodeIterableInput.value.trim(),
      targetScreen: guiNodeTargetScreenInput.value.trim(),
      targetArguments: guiNodeTargetArgsInput.value.trim(),
      eventName: guiNodeEventInput.value.trim(),
      delay: guiNodeDelayInput.value.trim(),
      repeats: guiNodeRepeatsInput.value === "true",
      keyName: guiNodeKeyInput.value.trim(),
      defaultName: guiNodeDefaultNameInput.value.trim(),
      defaultValue: guiNodeDefaultValueInput.value.trim(),
      transformName: guiNodeTransformInput.value.trim(),
      gridColumns: guiNodeGridColumnsInput.value.trim(),
      gridRows: guiNodeGridRowsInput.value.trim(),
      sidePositions: guiNodeSidePositionsInput.value.trim(),
    });
  });
});

guiAddChildNodeButton.addEventListener("click", () => {
  addChildNode(guiNewScreenNodeTypeInput.value);
});

guiMoveNodeUpButton.addEventListener("click", () => {
  moveActiveScreenNode("up");
});

guiMoveNodeDownButton.addEventListener("click", () => {
  moveActiveScreenNode("down");
});

guiDeleteNodeButton.addEventListener("click", () => {
  const node = getActiveScreenNodeContext()?.node;
  if (!node) {
    return;
  }
  if (!window.confirm(`Delete node "${node.title}"?`)) {
    setStatus(`Kept node "${node.title}".`);
    return;
  }
  deleteActiveScreenNode();
});

guiConfigEntryListEl.addEventListener("click", (event) => {
  const card = event.target.closest("[data-config-entry-key]");
  if (!card) {
    return;
  }
  activeConfigEntryKey = card.getAttribute("data-config-entry-key");
  render();
  setStatus(`Opened ${getActiveConfigEntryContext()?.scope || ""} entry.`);
});

newConfigEntryButton.addEventListener("click", () => {
  const entry = createBlankConfigEntry("config");
  projectState.gui.config.push(entry);
  activeConfigEntryKey = `config:${entry.id}`;
  render();
  saveProjectState(`Created config entry "${entry.name}".`);
});

newPreferenceEntryButton.addEventListener("click", () => {
  const entry = createBlankConfigEntry("preferences");
  projectState.gui.preferences.push(entry);
  activeConfigEntryKey = `preferences:${entry.id}`;
  render();
  saveProjectState(`Created preference entry "${entry.name}".`);
});

newStoreEntryButton.addEventListener("click", () => {
  const entry = createBlankConfigEntry("store");
  projectState.gui.store.push(entry);
  activeConfigEntryKey = `store:${entry.id}`;
  render();
  saveProjectState(`Created store entry "${entry.name}".`);
});

guiConfigFormEl.addEventListener("change", () => {
  const context = getActiveConfigEntryContext();
  if (!context?.entry) {
    return;
  }

  maybeMoveConfigEntryToNewScope(guiConfigScopeInput.value);
  updateConfigEntry({
    name: guiConfigNameInput.value.trim() || context.entry.name,
    storePath: guiConfigStorePathInput.value.trim(),
    value: guiConfigValueInput.value.trim(),
    description: guiConfigDescriptionInput.value.trim(),
  });
});

guiDeleteConfigButton.addEventListener("click", () => {
  const context = getActiveConfigEntryContext();
  if (!context?.entry) {
    return;
  }
  if (!window.confirm(`Delete ${context.scope} entry "${context.entry.name}"?`)) {
    setStatus(`Kept entry "${context.entry.name}".`);
    return;
  }
  deleteActiveConfigEntry();
});

guiCursorListEl.addEventListener("click", (event) => {
  const card = event.target.closest("[data-cursor-id]");
  if (!card) {
    return;
  }
  activeCursorId = card.getAttribute("data-cursor-id");
  render();
  setStatus(`Opened cursor entry "${getActiveCursor()?.name || ""}".`);
});

newHardwareCursorButton.addEventListener("click", () => {
  const entry = createBlankCursorEntry("hardware");
  projectState.gui.cursors.push(entry);
  activeCursorId = entry.id;
  render();
  saveProjectState(`Created hardware cursor "${entry.name}".`);
});

newDisplayableCursorButton.addEventListener("click", () => {
  const entry = createBlankCursorEntry("displayable");
  projectState.gui.cursors.push(entry);
  activeCursorId = entry.id;
  render();
  saveProjectState(`Created displayable cursor "${entry.name}".`);
});

newCursorUsageButton.addEventListener("click", () => {
  const entry = createBlankCursorEntry("usage");
  projectState.gui.cursors.push(entry);
  activeCursorId = entry.id;
  render();
  saveProjectState(`Created cursor usage "${entry.name}".`);
});

guiCursorFormEl.addEventListener("change", () => {
  const cursor = getActiveCursor();
  if (!cursor) {
    return;
  }

  updateActiveCursor({
    kind: guiCursorKindInput.value,
    name: guiCursorNameInput.value.trim() || cursor.name,
    styleTarget: guiCursorStyleTargetInput.value.trim(),
    targetCursor: guiCursorTargetCursorInput.value.trim(),
    image: guiCursorImageInput.value.trim(),
    hotspotX: guiCursorHotspotXInput.value.trim(),
    hotspotY: guiCursorHotspotYInput.value.trim(),
    framesExpression: guiCursorFramesInput.value.trim(),
    note: guiCursorNoteInput.value.trim(),
  });
});

guiDeleteCursorButton.addEventListener("click", () => {
  const cursor = getActiveCursor();
  if (!cursor) {
    return;
  }
  if (!window.confirm(`Delete cursor entry "${cursor.name}"?`)) {
    setStatus(`Kept cursor entry "${cursor.name}".`);
    return;
  }
  deleteActiveCursor();
});

guiShaderListEl.addEventListener("click", (event) => {
  const card = event.target.closest("[data-shader-id]");
  if (!card) {
    return;
  }
  activeShaderId = card.getAttribute("data-shader-id");
  render();
  setStatus(`Opened shader entry "${getActiveShader()?.name || ""}".`);
});

newGuiShaderButton.addEventListener("click", () => {
  const entry = createBlankShaderEntry("default");
  projectState.gui.textShaders.push(entry);
  activeShaderId = entry.id;
  render();
  saveProjectState(`Created shader entry "${entry.name}".`);
});

guiShaderFormEl.addEventListener("change", () => {
  const shader = getActiveShader();
  if (!shader) {
    return;
  }

  updateActiveShader({
    mode: guiShaderModeInput.value,
    name: guiShaderNameInput.value.trim() || shader.name,
    shaderSpec: guiShaderShaderSpecInput.value.trim(),
    targetName: guiShaderTargetNameInput.value.trim(),
    callbackKey: guiShaderCallbackKeyInput.value.trim(),
    callbackFunction: guiShaderCallbackFunctionInput.value.trim(),
    customShaders: guiShaderCustomShadersInput.value.trim(),
    includeDefault: guiShaderIncludeDefaultInput.value === "true",
    redraw: guiShaderRedrawInput.value.trim(),
  });
});

guiDeleteShaderButton.addEventListener("click", () => {
  const shader = getActiveShader();
  if (!shader) {
    return;
  }
  if (!window.confirm(`Delete shader entry "${shader.name}"?`)) {
    setStatus(`Kept shader entry "${shader.name}".`);
    return;
  }
  deleteActiveShader();
});

render();
setStatus("GUI editor ready. Screens, templates, preview, config, cursors, text shaders, and diagnostics are now available.");
