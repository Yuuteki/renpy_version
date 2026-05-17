function getLaunchParams() {
  if (window.location.search) {
    return new URLSearchParams(window.location.search);
  }

  if (window.location.hash) {
    const hash = window.location.hash.startsWith("#?")
      ? window.location.hash.slice(2)
      : window.location.hash.slice(1);

    return new URLSearchParams(hash);
  }

  return new URLSearchParams();
}

const params = getLaunchParams();
const i18n = window.visualEditorI18n || {
  t(key, vars = {}) {
    return `${key}`.replace(/\{(\w+)\}/g, (_match, name) => (
      Object.prototype.hasOwnProperty.call(vars, name) ? `${vars[name]}` : `{${name}}`
    ));
  },
  getLocale() {
    return "en";
  },
  setLocale() {},
  applyTranslations() {},
  translateText(value) {
    return value;
  },
};
const t = (key, vars = {}) => i18n.t(key, vars);
const tt = (value) => i18n.translateText ? i18n.translateText(value) : value;
const projectPath = params.get("project") || "";
const bridgeUrl = params.get("bridge") || "";
const bridgeToken = params.get("token") || "";
const hasBridge = Boolean(bridgeUrl && bridgeToken);
const launchSidebarSectionId = params.get("section") || "";
const launchGuiSectionId = params.get("guiSection") || "";
const returnedFromGuiEditor = params.get("returnedFrom") === "gui";
const guiSectionStorageKey = projectPath
  ? `renpy-visual-editor:gui-section:${projectPath}`
  : "renpy-visual-editor:gui-section:default";

const projectPathEl = document.getElementById("projectPath");
const projectFilesEl = document.getElementById("projectFiles");
const localeSelect = document.getElementById("localeSelect");
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
const labelReplaySettingsFormEl = document.getElementById("labelReplaySettingsForm");
const labelReplayEnabledInput = document.getElementById("labelReplayEnabledInput");
const labelReplayTitleInput = document.getElementById("labelReplayTitleInput");
const labelReplayLockedModeInput = document.getElementById("labelReplayLockedModeInput");
const labelReplayScopeInput = document.getElementById("labelReplayScopeInput");
const labelReplayAutoEndInput = document.getElementById("labelReplayAutoEndInput");
const labelReplayActionPreviewEl = document.getElementById("labelReplayActionPreview");
const labelExportSettingsFormEl = document.getElementById("labelExportSettingsForm");
const labelExportModeInput = document.getElementById("labelExportModeInput");
const labelExportPathInput = document.getElementById("labelExportPathInput");
const labelExportLabelInput = document.getElementById("labelExportLabelInput");
const labelExportMarkerInput = document.getElementById("labelExportMarkerInput");
const labelExportStatusNoteEl = document.getElementById("labelExportStatusNote");
const labelAdoptSelectFieldEl = document.getElementById("labelAdoptSelectField");
const labelAdoptSelectEl = document.getElementById("labelAdoptSelect");
const labelExportMarkerNoteEl = document.getElementById("labelExportMarkerNote");
const labelAdoptButton = document.getElementById("labelAdoptButton");
const labelClearExportBindingButton = document.getElementById("labelClearExportBindingButton");
const labelCodePreviewEl = document.getElementById("labelCodePreview");
const labelContextMenuEl = document.getElementById("labelContextMenu");
const contextRenameLabelButton = document.getElementById("contextRenameLabelButton");
const contextDeleteLabelButton = document.getElementById("contextDeleteLabelButton");
const imageContextMenuEl = document.getElementById("imageContextMenu");
const contextDeleteImageButton = document.getElementById("contextDeleteImageButton");
const audioContextMenuEl = document.getElementById("audioContextMenu");
const contextDeleteAudioButton = document.getElementById("contextDeleteAudioButton");
const characterContextMenuEl = document.getElementById("characterContextMenu");
const contextDeleteCharacterButton = document.getElementById("contextDeleteCharacterButton");
const imageDefinitionListEl = document.getElementById("imageDefinitionList");
const imageDefinitionEmptyEl = document.getElementById("imageDefinitionEmpty");
const imagesListViewEl = document.getElementById("imagesListView");
const imageDefinitionDetailViewEl = document.getElementById("imageDefinitionDetailView");
const imageDefinitionDetailFormEl = document.getElementById("imageDefinitionDetailForm");
const newImageDefinitionButton = document.getElementById("newImageDefinitionButton");
const imageDefinitionBackButton = document.getElementById("imageDefinitionBackButton");
const imageDefinitionStaticFieldsEl = document.getElementById("imageDefinitionStaticFields");
const imageDefinitionLayeredFieldsEl = document.getElementById("imageDefinitionLayeredFields");
const imageDefinitionMovieFieldsEl = document.getElementById("imageDefinitionMovieFields");
const imageDefinitionSolidFieldsEl = document.getElementById("imageDefinitionSolidFields");
const imageDefinitionCompositeFieldsEl = document.getElementById("imageDefinitionCompositeFields");
const imageDefinitionPlaceholderFieldsEl = document.getElementById("imageDefinitionPlaceholderFields");
const imageDefinitionAnimationFieldsEl = document.getElementById("imageDefinitionAnimationFields");
const imageDefinitionSideImageHelpEl = document.getElementById("imageDefinitionSideImageHelp");
const imageDefinitionNameInput = document.getElementById("imageDefinitionNameInput");
const imageDefinitionCategoryInput = document.getElementById("imageDefinitionCategoryInput");
const imageDefinitionTypeInput = document.getElementById("imageDefinitionTypeInput");
const imageDefinitionIsSideImageInput = document.getElementById("imageDefinitionIsSideImageInput");
const imageDefinitionSourcePathInput = document.getElementById("imageDefinitionSourcePathInput");
const imageDefinitionBrowseButton = document.getElementById("imageDefinitionBrowseButton");
const imageDefinitionFileInput = document.getElementById("imageDefinitionFileInput");
const imageDefinitionMovieBrowseButton = document.getElementById("imageDefinitionMovieBrowseButton");
const imageDefinitionMovieFileInput = document.getElementById("imageDefinitionMovieFileInput");
const imageDefinitionMovieLoopInput = document.getElementById("imageDefinitionMovieLoopInput");
const imageDefinitionAddCompositeLayerButton = document.getElementById("imageDefinitionAddCompositeLayerButton");
const imageDefinitionCompositeLayerListEl = document.getElementById("imageDefinitionCompositeLayerList");
const imageDefinitionCompositeDisplayableOptionsEl = document.getElementById("imageDefinitionCompositeDisplayableOptions");
const imageDefinitionAtlEditorEl = document.getElementById("imageDefinitionAtlEditor");
const imageDefinitionAtlStepListEl = document.getElementById("imageDefinitionAtlStepList");
const imageDefinitionAddAtlStepButton = document.getElementById("imageDefinitionAddAtlStepButton");
const imageDefinitionZoomInput = document.getElementById("imageDefinitionZoomInput");
const imageDefinitionXAnchorInput = document.getElementById("imageDefinitionXAnchorInput");
const imageDefinitionYAnchorInput = document.getElementById("imageDefinitionYAnchorInput");
const imageDefinitionXPosInput = document.getElementById("imageDefinitionXPosInput");
const imageDefinitionYPosInput = document.getElementById("imageDefinitionYPosInput");
const imageDefinitionMatrixColorModeInput = document.getElementById("imageDefinitionMatrixColorModeInput");
const imageDefinitionMatrixColorPresetFieldsEl = document.getElementById("imageDefinitionMatrixColorPresetFields");
const imageDefinitionMatrixColorTintFieldEl = document.getElementById("imageDefinitionMatrixColorTintField");
const imageDefinitionMatrixColorTintInput = document.getElementById("imageDefinitionMatrixColorTintInput");
const imageDefinitionMatrixColorSaturationFieldEl = document.getElementById("imageDefinitionMatrixColorSaturationField");
const imageDefinitionMatrixColorSaturationInput = document.getElementById("imageDefinitionMatrixColorSaturationInput");
const imageDefinitionMatrixColorSepiaFieldEl = document.getElementById("imageDefinitionMatrixColorSepiaField");
const imageDefinitionMatrixColorSepiaInput = document.getElementById("imageDefinitionMatrixColorSepiaInput");
const imageDefinitionMatrixColorInvertFieldEl = document.getElementById("imageDefinitionMatrixColorInvertField");
const imageDefinitionMatrixColorInvertInput = document.getElementById("imageDefinitionMatrixColorInvertInput");
const imageDefinitionMatrixColorBrightnessFieldEl = document.getElementById("imageDefinitionMatrixColorBrightnessField");
const imageDefinitionMatrixColorBrightnessInput = document.getElementById("imageDefinitionMatrixColorBrightnessInput");
const imageDefinitionMatrixColorHueFieldEl = document.getElementById("imageDefinitionMatrixColorHueField");
const imageDefinitionMatrixColorHueInput = document.getElementById("imageDefinitionMatrixColorHueInput");
const imageDefinitionMatrixColorOpacityFieldEl = document.getElementById("imageDefinitionMatrixColorOpacityField");
const imageDefinitionMatrixColorOpacityInput = document.getElementById("imageDefinitionMatrixColorOpacityInput");
const imageDefinitionMatrixColorizeBlackFieldEl = document.getElementById("imageDefinitionMatrixColorizeBlackField");
const imageDefinitionMatrixColorizeBlackInput = document.getElementById("imageDefinitionMatrixColorizeBlackInput");
const imageDefinitionMatrixColorizeWhiteFieldEl = document.getElementById("imageDefinitionMatrixColorizeWhiteField");
const imageDefinitionMatrixColorizeWhiteInput = document.getElementById("imageDefinitionMatrixColorizeWhiteInput");
const imageDefinitionAddLayeredAlwaysButton = document.getElementById("imageDefinitionAddLayeredAlwaysButton");
const imageDefinitionLayeredAlwaysListEl = document.getElementById("imageDefinitionLayeredAlwaysList");
const imageDefinitionAddLayeredGroupButton = document.getElementById("imageDefinitionAddLayeredGroupButton");
const imageDefinitionLayeredGroupListEl = document.getElementById("imageDefinitionLayeredGroupList");
const imageDefinitionLayeredDisplayableOptionsEl = document.getElementById("imageDefinitionLayeredDisplayableOptions");
const imageDefinitionCodePreviewEl = document.getElementById("imageDefinitionCodePreview");
const live2dDefinitionListEl = document.getElementById("live2dDefinitionList");
const live2dDefinitionEmptyEl = document.getElementById("live2dDefinitionEmpty");
const live2dListViewEl = document.getElementById("live2dListView");
const live2dDefinitionDetailViewEl = document.getElementById("live2dDefinitionDetailView");
const live2dDefinitionDetailFormEl = document.getElementById("live2dDefinitionDetailForm");
const newLive2DDefinitionButton = document.getElementById("newLive2DDefinitionButton");
const live2dDefinitionBackButton = document.getElementById("live2dDefinitionBackButton");
const live2dDefinitionBrowseButton = document.getElementById("live2dDefinitionBrowseButton");
const live2dDefinitionFileInput = document.getElementById("live2dDefinitionFileInput");
const live2dDefinitionDeleteButton = document.getElementById("live2dDefinitionDeleteButton");
const live2dDefinitionCodePreviewEl = document.getElementById("live2dDefinitionCodePreview");
const audioDefinitionListEl = document.getElementById("audioDefinitionList");
const audioDefinitionEmptyEl = document.getElementById("audioDefinitionEmpty");
const audioListViewEl = document.getElementById("audioListView");
const audioDefinitionDetailViewEl = document.getElementById("audioDefinitionDetailView");
const audioDefinitionDetailFormEl = document.getElementById("audioDefinitionDetailForm");
const newAudioDefinitionButton = document.getElementById("newAudioDefinitionButton");
const audioDefinitionBackButton = document.getElementById("audioDefinitionBackButton");
const audioDefinitionBrowseButton = document.getElementById("audioDefinitionBrowseButton");
const audioDefinitionFileInput = document.getElementById("audioDefinitionFileInput");
const audioDefinitionCodePreviewEl = document.getElementById("audioDefinitionCodePreview");
const audioDefinitionVoiceOwnerFieldEl = document.getElementById("audioDefinitionVoiceOwnerField");
const audioDefinitionVoiceOwnerInput = document.getElementById("audioDefinitionVoiceOwnerInput");
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
const variableListEl = document.getElementById("variableList");
const variableListEmptyEl = document.getElementById("variableListEmpty");
const variablesListViewEl = document.getElementById("variablesListView");
const variableDetailViewEl = document.getElementById("variableDetailView");
const newVariableButton = document.getElementById("newVariableButton");
const variableBackButton = document.getElementById("variableBackButton");
const variableTypeInput = document.getElementById("variableTypeInput");
const variableStoreInput = document.getElementById("variableStoreInput");
const variableNameInput = document.getElementById("variableNameInput");
const variableValueInput = document.getElementById("variableValueInput");
const variableDeleteButton = document.getElementById("variableDeleteButton");
const variableCodePreviewEl = document.getElementById("variableCodePreview");
const achievementListEl = document.getElementById("achievementList");
const achievementListEmptyEl = document.getElementById("achievementListEmpty");
const achievementsListViewEl = document.getElementById("achievementsListView");
const achievementDetailViewEl = document.getElementById("achievementDetailView");
const newAchievementButton = document.getElementById("newAchievementButton");
const achievementBackButton = document.getElementById("achievementBackButton");
const achievementNameInput = document.getElementById("achievementNameInput");
const achievementTitleInput = document.getElementById("achievementTitleInput");
const achievementDescriptionInput = document.getElementById("achievementDescriptionInput");
const achievementNotesInput = document.getElementById("achievementNotesInput");
const achievementSteamNameInput = document.getElementById("achievementSteamNameInput");
const achievementProgressEnabledInput = document.getElementById("achievementProgressEnabledInput");
const achievementProgressFieldsEl = document.getElementById("achievementProgressFields");
const achievementStatMaxInput = document.getElementById("achievementStatMaxInput");
const achievementStatModuloInput = document.getElementById("achievementStatModuloInput");
const achievementDeleteButton = document.getElementById("achievementDeleteButton");
const achievementCodePreviewEl = document.getElementById("achievementCodePreview");
const achievementUsagePreviewEl = document.getElementById("achievementUsagePreview");
const definitionListEl = document.getElementById("definitionList");
const definitionListEmptyEl = document.getElementById("definitionListEmpty");
const definitionsListViewEl = document.getElementById("definitionsListView");
const definitionDetailViewEl = document.getElementById("definitionDetailView");
const newDefinitionButton = document.getElementById("newDefinitionButton");
const definitionBackButton = document.getElementById("definitionBackButton");
const definitionModeInput = document.getElementById("definitionModeInput");
const definitionDefineFieldsEl = document.getElementById("definitionDefineFields");
const definitionInitPythonFieldsEl = document.getElementById("definitionInitPythonFields");
const definitionTargetInput = document.getElementById("definitionTargetInput");
const definitionOperatorInput = document.getElementById("definitionOperatorInput");
const definitionPriorityInput = document.getElementById("definitionPriorityInput");
const definitionValueInput = document.getElementById("definitionValueInput");
const definitionInitPriorityInput = document.getElementById("definitionInitPriorityInput");
const definitionInitHideInput = document.getElementById("definitionInitHideInput");
const definitionInitStoreInput = document.getElementById("definitionInitStoreInput");
const definitionCodeInput = document.getElementById("definitionCodeInput");
const definitionDeleteButton = document.getElementById("definitionDeleteButton");
const definitionCodePreviewEl = document.getElementById("definitionCodePreview");
const visualProjectStatsEl = document.getElementById("visualProjectStats");
const projectHealthSummaryEl = document.getElementById("projectHealthSummary");
const projectHealthTimestampEl = document.getElementById("projectHealthTimestamp");
const projectHealthPillsEl = document.getElementById("projectHealthPills");
const projectHealthChecklistEl = document.getElementById("projectHealthChecklist");
const guiEditorProjectSummaryEl = document.getElementById("guiEditorProjectSummary");
const guiEditorStatusNoteEl = document.getElementById("guiEditorStatusNote");
const openGuiEditorButton = document.getElementById("openGuiEditorButton");
const projectVoiceSettingsFormEl = document.getElementById("projectVoiceSettingsForm");
const projectVoiceModeInput = document.getElementById("projectVoiceModeInput");
const projectAutoVoiceTemplateFieldEl = document.getElementById("projectAutoVoiceTemplateField");
const projectAutoVoiceTemplateInput = document.getElementById("projectAutoVoiceTemplateInput");
const projectVoiceMultilingualInput = document.getElementById("projectVoiceMultilingualInput");
const projectDefaultDialogueVoiceInput = document.getElementById("projectDefaultDialogueVoiceInput");
const projectVoiceCodePreviewEl = document.getElementById("projectVoiceCodePreview");
const projectSideImageSettingsFormEl = document.getElementById("projectSideImageSettingsForm");
const projectSideImageTagInput = document.getElementById("projectSideImageTagInput");
const projectSideImageOnlyNotShowingInput = document.getElementById("projectSideImageOnlyNotShowingInput");
const projectSideImagePrefixTagInput = document.getElementById("projectSideImagePrefixTagInput");
const projectSideImageNullInput = document.getElementById("projectSideImageNullInput");
const projectSideImageSameTransformInput = document.getElementById("projectSideImageSameTransformInput");
const projectSideImageChangeTransformInput = document.getElementById("projectSideImageChangeTransformInput");
const projectSideImageCodePreviewEl = document.getElementById("projectSideImageCodePreview");
const projectSaveLoadSettingsFormEl = document.getElementById("projectSaveLoadSettingsForm");
const projectHasAutosaveInput = document.getElementById("projectHasAutosaveInput");
const projectAutosaveFrequencyInput = document.getElementById("projectAutosaveFrequencyInput");
const projectHasQuicksaveInput = document.getElementById("projectHasQuicksaveInput");
const projectRollbackEnabledInput = document.getElementById("projectRollbackEnabledInput");
const projectRollbackLengthInput = document.getElementById("projectRollbackLengthInput");
const projectHardRollbackLimitInput = document.getElementById("projectHardRollbackLimitInput");
const projectFixRollbackWithoutChoiceInput = document.getElementById("projectFixRollbackWithoutChoiceInput");
const projectSaveLoadCodePreviewEl = document.getElementById("projectSaveLoadCodePreview");
const projectKeymapSettingsFormEl = document.getElementById("projectKeymapSettingsForm");
const projectKeymapCustomEventNameInput = document.getElementById("projectKeymapCustomEventNameInput");
const projectKeymapAddCustomEventButton = document.getElementById("projectKeymapAddCustomEventButton");
const projectKeymapCategoryListEl = document.getElementById("projectKeymapCategoryList");
const projectKeymapCodePreviewEl = document.getElementById("projectKeymapCodePreview");
const imageTagSuggestionListEl = document.getElementById("imageTagSuggestionList");

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
const imageNodeAtOptionsEl = document.getElementById("imageNodeAtOptions");
const imageNodeAtPresetChipsEl = document.getElementById("imageNodeAtPresetChips");
const imageNodeAliasInput = document.getElementById("imageNodeAliasInput");
const imageNodeBehindInput = document.getElementById("imageNodeBehindInput");
const imageNodeZorderInput = document.getElementById("imageNodeZorderInput");
const imageNodeLive2DFieldsEl = document.getElementById("imageNodeLive2DFields");
const imageNodeLive2DHelpEl = document.getElementById("imageNodeLive2DHelp");
const imageNodeLive2DMotionInput = document.getElementById("imageNodeLive2DMotionInput");
const imageNodeLive2DExpressionInput = document.getElementById("imageNodeLive2DExpressionInput");
const imageNodeLive2DNonexclusiveListEl = document.getElementById("imageNodeLive2DNonexclusiveList");
const imageNodeLive2DRemovalListEl = document.getElementById("imageNodeLive2DRemovalList");
const imageNodeLive2DStillInput = document.getElementById("imageNodeLive2DStillInput");
const imageNodeLive2DAdditionalInput = document.getElementById("imageNodeLive2DAdditionalInput");
const imageNodeLayeredFieldsEl = document.getElementById("imageNodeLayeredFields");
const imageNodeLayeredHelpEl = document.getElementById("imageNodeLayeredHelp");
const imageNodeLayeredGroupListEl = document.getElementById("imageNodeLayeredGroupList");
const imageDeleteNodeButton = document.getElementById("imageDeleteNodeButton");
const animationInspectorFormEl = document.getElementById("animationInspectorForm");
const animationNodeTypeInput = document.getElementById("animationNodeTypeInput");
const animationNodeTransitionInput = document.getElementById("animationNodeTransitionInput");
const animationDeleteNodeButton = document.getElementById("animationDeleteNodeButton");
const audioInspectorFormEl = document.getElementById("audioInspectorForm");
const audioNodeTypeInput = document.getElementById("audioNodeTypeInput");
const audioNodeActionInput = document.getElementById("audioNodeActionInput");
const audioNodeResourceFieldEl = document.getElementById("audioNodeResourceField");
const audioNodeResourceInput = document.getElementById("audioNodeResourceInput");
const audioNodeChannelInput = document.getElementById("audioNodeChannelInput");
const audioNodeLoopFieldEl = document.getElementById("audioNodeLoopField");
const audioNodeLoopInput = document.getElementById("audioNodeLoopInput");
const audioNodeFadeInFieldEl = document.getElementById("audioNodeFadeInField");
const audioNodeFadeInInput = document.getElementById("audioNodeFadeInInput");
const audioNodeFadeOutFieldEl = document.getElementById("audioNodeFadeOutField");
const audioNodeFadeOutInput = document.getElementById("audioNodeFadeOutInput");
const audioNodeVolumeFieldEl = document.getElementById("audioNodeVolumeField");
const audioNodeVolumeInput = document.getElementById("audioNodeVolumeInput");
const audioNodeIfChangedFieldEl = document.getElementById("audioNodeIfChangedField");
const audioNodeIfChangedInput = document.getElementById("audioNodeIfChangedInput");
const audioDeleteNodeButton = document.getElementById("audioDeleteNodeButton");
const dialogueInspectorFormEl = document.getElementById("dialogueInspectorForm");
const dialogueNodeTypeInput = document.getElementById("dialogueNodeTypeInput");
const dialogueCharacterInput = document.getElementById("dialogueCharacterInput");
const dialogueVoiceEnabledInput = document.getElementById("dialogueVoiceEnabledInput");
const dialogueTextToolsEl = document.getElementById("dialogueTextTools");
const dialogueVoiceLinesGroupEl = document.getElementById("dialogueVoiceLinesGroup");
const dialogueAddVoiceLineButton = document.getElementById("dialogueAddVoiceLineButton");
const dialogueVoiceLineListEl = document.getElementById("dialogueVoiceLineList");
const dialogueContentFieldEl = document.getElementById("dialogueContentField");
const dialogueNodeContentInput = document.getElementById("dialogueNodeContentInput");
const dialogueDeleteNodeButton = document.getElementById("dialogueDeleteNodeButton");
const inputInspectorFormEl = document.getElementById("inputInspectorForm");
const inputNodeTypeInput = document.getElementById("inputNodeTypeInput");
const inputNodeVariableInput = document.getElementById("inputNodeVariableInput");
const inputNodePromptInput = document.getElementById("inputNodePromptInput");
const inputNodeDefaultInput = document.getElementById("inputNodeDefaultInput");
const inputNodeAllowInput = document.getElementById("inputNodeAllowInput");
const inputNodeExcludeInput = document.getElementById("inputNodeExcludeInput");
const inputNodeLengthInput = document.getElementById("inputNodeLengthInput");
const inputNodePixelWidthInput = document.getElementById("inputNodePixelWidthInput");
const inputNodeScreenInput = document.getElementById("inputNodeScreenInput");
const inputNodeMaskInput = document.getElementById("inputNodeMaskInput");
const inputNodeFallbackInput = document.getElementById("inputNodeFallbackInput");
const inputNodeTrimInput = document.getElementById("inputNodeTrimInput");
const inputNodeCopyPasteInput = document.getElementById("inputNodeCopyPasteInput");
const inputDeleteNodeButton = document.getElementById("inputDeleteNodeButton");
const achievementInspectorFormEl = document.getElementById("achievementInspectorForm");
const achievementNodeTypeInput = document.getElementById("achievementNodeTypeInput");
const achievementNodeActionInput = document.getElementById("achievementNodeActionInput");
const achievementNodeNameFieldEl = document.getElementById("achievementNodeNameField");
const achievementNodeNameInput = document.getElementById("achievementNodeNameInput");
const achievementNodeProgressFieldsEl = document.getElementById("achievementNodeProgressFields");
const achievementNodeProgressModeInput = document.getElementById("achievementNodeProgressModeInput");
const achievementNodeProgressValueInput = document.getElementById("achievementNodeProgressValueInput");
const achievementNodeSyncHelpEl = document.getElementById("achievementNodeSyncHelp");
const achievementDeleteNodeButton = document.getElementById("achievementDeleteNodeButton");
const menuInspectorFormEl = document.getElementById("menuInspectorForm");
const menuNodeTypeInput = document.getElementById("menuNodeTypeInput");
const menuNodePromptInput = document.getElementById("menuNodePromptInput");
const menuChoiceListEl = document.getElementById("menuChoiceList");
const menuAddChoiceButton = document.getElementById("menuAddChoiceButton");
const menuDeleteNodeButton = document.getElementById("menuDeleteNodeButton");
const conditionInspectorFormEl = document.getElementById("conditionInspectorForm");
const conditionNodeTypeInput = document.getElementById("conditionNodeTypeInput");
const conditionAddClauseButton = document.getElementById("conditionAddClauseButton");
const conditionToggleElseButton = document.getElementById("conditionToggleElseButton");
const conditionClauseListEl = document.getElementById("conditionClauseList");
const conditionDeleteNodeButton = document.getElementById("conditionDeleteNodeButton");
const flowInspectorFormEl = document.getElementById("flowInspectorForm");
const flowNodeTypeInput = document.getElementById("flowNodeTypeInput");
const flowNodeModeInput = document.getElementById("flowNodeModeInput");
const flowNodeTargetFieldEl = document.getElementById("flowNodeTargetField");
const flowNodeTargetInput = document.getElementById("flowNodeTargetInput");
const flowDeleteNodeButton = document.getElementById("flowDeleteNodeButton");
const screenInspectorFormEl = document.getElementById("screenInspectorForm");
const screenNodeTypeInput = document.getElementById("screenNodeTypeInput");
const screenNodeModeInput = document.getElementById("screenNodeModeInput");
const screenNodeNameInput = document.getElementById("screenNodeNameInput");
const screenNodeNameSuggestionsEl = document.getElementById("screenNodeNameSuggestions");
const screenNodeArgumentsFieldEl = document.getElementById("screenNodeArgumentsField");
const screenNodeArgumentsInput = document.getElementById("screenNodeArgumentsInput");
const screenNodeResultVariableFieldEl = document.getElementById("screenNodeResultVariableField");
const screenNodeResultVariableInput = document.getElementById("screenNodeResultVariableInput");
const screenNodeSpecialInfoEl = document.getElementById("screenNodeSpecialInfo");
const screenNodeMissingInfoEl = document.getElementById("screenNodeMissingInfo");
const screenDeleteNodeButton = document.getElementById("screenDeleteNodeButton");
const pythonInspectorFormEl = document.getElementById("pythonInspectorForm");
const pythonNodeTypeInput = document.getElementById("pythonNodeTypeInput");
const pythonNodeModeInput = document.getElementById("pythonNodeModeInput");
const pythonNodeStoreFieldEl = document.getElementById("pythonNodeStoreField");
const pythonNodeStoreInput = document.getElementById("pythonNodeStoreInput");
const pythonNodeHideFieldEl = document.getElementById("pythonNodeHideField");
const pythonNodeHideInput = document.getElementById("pythonNodeHideInput");
const pythonNodeCodeInput = document.getElementById("pythonNodeCodeInput");
const pythonDeleteNodeButton = document.getElementById("pythonDeleteNodeButton");
const inspectorFormEl = document.getElementById("inspectorForm");
const nodeIdInput = document.getElementById("nodeIdInput");
const nodeTypeInput = document.getElementById("nodeTypeInput");
const nodeTitleInput = document.getElementById("nodeTitleInput");
const nodeContentInput = document.getElementById("nodeContentInput");

const saveDraftButton = document.getElementById("saveDraftButton");
const exportButton = document.getElementById("exportButton");
const takeoverLegacyFilesButton = document.getElementById("takeoverLegacyFilesButton");
const takeoverLegacyFilesNoteEl = document.getElementById("takeoverLegacyFilesNote");

const storageKey = projectPath
  ? `renpy-visual-editor:${projectPath}`
  : "renpy-visual-editor:default";

const defaultViewport = {
  x: 0,
  y: 0,
  scale: 1,
};

const defaultProjectMeta = {
  name: "Ren'Py Visual Project",
  voiceMode: "manual",
  autoVoiceTemplate: "voice/{id}.ogg",
  multilingualVoices: true,
  defaultDialogueVoiceEnabled: false,
  sideImageTag: "",
  sideImageOnlyNotShowing: false,
  sideImagePrefixTag: "side",
  sideImageNull: "",
  sideImageSameTransform: "",
  sideImageChangeTransform: "",
  hasAutosave: true,
  autosaveFrequency: "200",
  hasQuicksave: true,
  rollbackEnabled: true,
  rollbackLength: "128",
  hardRollbackLimit: "100",
  fixRollbackWithoutChoice: false,
  keymapOverrides: {},
};

const defaultExportMap = {
  labels: {},
};

const generatedProjectSettingsPath = "game/visual_editor_generated/00_project_settings.rpy";
const generatedDefinitionsPath = "game/visual_editor_generated/10_definitions.rpy";
const generatedGuiPath = "game/visual_editor_generated/20_gui.rpy";
const generatedLabelsPath = "game/generated_visual_editor.rpy";

const projectKeymapEventCategories = [
  {
    id: "dialogue",
    label: "Dialogue & Core",
    description: "Advance text, rollback, open menus, and common project shortcuts.",
    eventIds: [
      "dismiss",
      "rollback",
      "rollforward",
      "game_menu",
      "hide_windows",
      "screenshot",
      "toggle_fullscreen",
    ],
  },
  {
    id: "navigation",
    label: "Skip & Focus Navigation",
    description: "Skip controls and directional navigation between buttons or focusable widgets.",
    eventIds: [
      "skip",
      "toggle_skip",
      "fast_skip",
      "focus_left",
      "focus_right",
      "focus_up",
      "focus_down",
    ],
  },
  {
    id: "input",
    label: "Text Input",
    description: "Editing and moving inside input fields.",
    eventIds: [
      "input_backspace",
      "input_enter",
      "input_left",
      "input_right",
      "input_up",
      "input_down",
      "input_delete",
    ],
  },
  {
    id: "viewport",
    label: "Viewports & Bars",
    description: "Scrolling viewports and interacting with bar widgets.",
    eventIds: [
      "viewport_leftarrow",
      "viewport_rightarrow",
      "viewport_uparrow",
      "viewport_downarrow",
      "viewport_pageup",
      "viewport_pagedown",
      "viewport_wheelup",
      "viewport_wheeldown",
      "bar_activate",
      "bar_deactivate",
      "bar_left",
      "bar_right",
      "bar_up",
      "bar_down",
    ],
  },
];

const projectKeymapEventMeta = [
  {
    id: "dismiss",
    label: "Dismiss / Advance",
    description: "Advance dialogue, confirm buttons, and continue through say statements.",
    defaultBindings: ["K_RETURN", "K_SPACE", "K_KP_ENTER", "K_SELECT", "mouseup_1"],
  },
  {
    id: "rollback",
    label: "Rollback",
    description: "Move backward through dialogue and interaction history.",
    defaultBindings: ["anyrepeat_K_PAGEUP", "anyrepeat_KP_PAGEUP", "K_AC_BACK", "mousedown_4"],
  },
  {
    id: "rollforward",
    label: "Roll Forward",
    description: "Move forward again after rollback where allowed.",
    defaultBindings: ["anyrepeat_K_PAGEDOWN", "anyrepeat_KP_PAGEDOWN", "mousedown_5"],
  },
  {
    id: "game_menu",
    label: "Game Menu",
    description: "Open the standard game menu and navigation overlay.",
    defaultBindings: ["K_ESCAPE", "K_MENU", "K_PAUSE", "mouseup_3"],
  },
  {
    id: "hide_windows",
    label: "Hide Windows",
    description: "Temporarily hide the dialogue and UI windows.",
    defaultBindings: ["mouseup_2", "noshift_K_h"],
  },
  {
    id: "screenshot",
    label: "Screenshot",
    description: "Capture a screenshot through Ren'Py's screenshot action.",
    defaultBindings: ["alt_K_s", "alt_shift_K_s", "noshift_K_s"],
  },
  {
    id: "toggle_fullscreen",
    label: "Toggle Fullscreen",
    description: "Switch between windowed and fullscreen display.",
    defaultBindings: ["alt_K_RETURN", "alt_K_KP_ENTER", "K_F11", "noshift_K_f"],
  },
  {
    id: "skip",
    label: "Hold To Skip",
    description: "Temporarily skip while the key is held down.",
    defaultBindings: ["anymod_K_LCTRL", "anymod_K_RCTRL"],
  },
  {
    id: "toggle_skip",
    label: "Toggle Skip",
    description: "Toggle skip mode on or off.",
    defaultBindings: ["K_TAB"],
  },
  {
    id: "fast_skip",
    label: "Fast Skip",
    description: "Use the fast skip binding for quick-forward style flow.",
    defaultBindings: [">", "shift_K_PERIOD"],
  },
  {
    id: "focus_left",
    label: "Focus Left",
    description: "Move UI focus to the left.",
    defaultBindings: ["anyrepeat_K_LEFT", "anyrepeat_KP_LEFT"],
  },
  {
    id: "focus_right",
    label: "Focus Right",
    description: "Move UI focus to the right.",
    defaultBindings: ["anyrepeat_K_RIGHT", "anyrepeat_KP_RIGHT"],
  },
  {
    id: "focus_up",
    label: "Focus Up",
    description: "Move UI focus upward.",
    defaultBindings: ["anyrepeat_K_UP", "anyrepeat_KP_UP"],
  },
  {
    id: "focus_down",
    label: "Focus Down",
    description: "Move UI focus downward.",
    defaultBindings: ["anyrepeat_K_DOWN", "anyrepeat_KP_DOWN"],
  },
  {
    id: "input_backspace",
    label: "Input Backspace",
    description: "Delete one character before the caret inside an input field.",
    defaultBindings: ["anyrepeat_K_BACKSPACE"],
  },
  {
    id: "input_enter",
    label: "Input Enter",
    description: "Confirm the current input field.",
    defaultBindings: ["K_RETURN", "K_KP_ENTER"],
  },
  {
    id: "input_left",
    label: "Input Left",
    description: "Move the caret left in an input field.",
    defaultBindings: ["anyrepeat_K_LEFT", "anyrepeat_KP_LEFT"],
  },
  {
    id: "input_right",
    label: "Input Right",
    description: "Move the caret right in an input field.",
    defaultBindings: ["anyrepeat_K_RIGHT", "anyrepeat_KP_RIGHT"],
  },
  {
    id: "input_up",
    label: "Input Up",
    description: "Move through multi-line input upward.",
    defaultBindings: ["anyrepeat_K_UP", "anyrepeat_KP_UP"],
  },
  {
    id: "input_down",
    label: "Input Down",
    description: "Move through multi-line input downward.",
    defaultBindings: ["anyrepeat_K_DOWN", "anyrepeat_KP_DOWN"],
  },
  {
    id: "input_delete",
    label: "Input Delete",
    description: "Delete one character after the caret.",
    defaultBindings: ["anyrepeat_K_DELETE", "anyrepeat_KP_DELETE"],
  },
  {
    id: "viewport_leftarrow",
    label: "Viewport Left",
    description: "Scroll a viewport to the left with the keyboard.",
    defaultBindings: ["anyrepeat_K_LEFT", "anyrepeat_KP_LEFT"],
  },
  {
    id: "viewport_rightarrow",
    label: "Viewport Right",
    description: "Scroll a viewport to the right with the keyboard.",
    defaultBindings: ["anyrepeat_K_RIGHT", "anyrepeat_KP_RIGHT"],
  },
  {
    id: "viewport_uparrow",
    label: "Viewport Up",
    description: "Scroll a viewport upward with the keyboard.",
    defaultBindings: ["anyrepeat_K_UP", "anyrepeat_KP_UP"],
  },
  {
    id: "viewport_downarrow",
    label: "Viewport Down",
    description: "Scroll a viewport downward with the keyboard.",
    defaultBindings: ["anyrepeat_K_DOWN", "anyrepeat_KP_DOWN"],
  },
  {
    id: "viewport_pageup",
    label: "Viewport Page Up",
    description: "Scroll a viewport by one page upward.",
    defaultBindings: ["anyrepeat_K_PAGEUP", "anyrepeat_KP_PAGEUP"],
  },
  {
    id: "viewport_pagedown",
    label: "Viewport Page Down",
    description: "Scroll a viewport by one page downward.",
    defaultBindings: ["anyrepeat_K_PAGEDOWN", "anyrepeat_KP_PAGEDOWN"],
  },
  {
    id: "viewport_wheelup",
    label: "Viewport Wheel Up",
    description: "Scroll a viewport upward with the mouse wheel.",
    defaultBindings: ["mousedown_4"],
  },
  {
    id: "viewport_wheeldown",
    label: "Viewport Wheel Down",
    description: "Scroll a viewport downward with the mouse wheel.",
    defaultBindings: ["mousedown_5"],
  },
  {
    id: "bar_activate",
    label: "Bar Activate",
    description: "Grab or activate a bar control.",
    defaultBindings: ["mousedown_1", "K_RETURN", "K_KP_ENTER", "K_SELECT"],
  },
  {
    id: "bar_deactivate",
    label: "Bar Deactivate",
    description: "Release or confirm a bar control interaction.",
    defaultBindings: ["mouseup_1", "K_RETURN", "K_KP_ENTER", "K_SELECT"],
  },
  {
    id: "bar_left",
    label: "Bar Left",
    description: "Move a bar value to the left.",
    defaultBindings: ["anyrepeat_K_LEFT", "anyrepeat_KP_LEFT"],
  },
  {
    id: "bar_right",
    label: "Bar Right",
    description: "Move a bar value to the right.",
    defaultBindings: ["anyrepeat_K_RIGHT", "anyrepeat_KP_RIGHT"],
  },
  {
    id: "bar_up",
    label: "Bar Up",
    description: "Move a bar value upward.",
    defaultBindings: ["anyrepeat_K_UP", "anyrepeat_KP_UP"],
  },
  {
    id: "bar_down",
    label: "Bar Down",
    description: "Move a bar value downward.",
    defaultBindings: ["anyrepeat_K_DOWN", "anyrepeat_KP_DOWN"],
  },
];

const projectKeymapEventMetaById = Object.fromEntries(
  projectKeymapEventMeta.map((meta) => [meta.id, meta]),
);

const autoManagedGuiScreenNames = new Set([
  "say",
  "choice",
  "input",
  "nvl",
  "notify",
  "skip_indicator",
  "ctc",
  "main_menu",
  "navigation",
  "save",
  "load",
  "preferences",
  "confirm",
]);

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

const imageDefinitionTypeMeta = {
  static: {
    label: "Static Image",
  },
  layered: {
    label: "Layered Image",
  },
  movie: {
    label: "Movie",
  },
  solid: {
    label: "Solid",
  },
  composite: {
    label: "Composite",
  },
  placeholder: {
    label: "Placeholder",
  },
};

const builtInTransformPresets = [
  "left",
  "center",
  "right",
  "truecenter",
  "top",
  "topleft",
  "topright",
  "offscreenleft",
  "offscreenright",
  "reset",
];

const imageAtlStepTypeMeta = {
  set: {
    label: "Set Properties",
  },
  pause: {
    label: "Pause",
  },
  interpolate: {
    label: "Interpolate",
  },
  contains: {
    label: "Contains",
  },
  repeat: {
    label: "Repeat",
  },
};

const imageAtlWarperOptions = [
  "linear",
  "ease",
  "easein",
  "easeout",
  "pause",
  "ease_quad",
  "ease_cubic",
  "ease_back",
  "ease_bounce",
  "ease_elastic",
];

const matrixColorBuilderDefaults = {
  tintColor: "#ffffff",
  saturationValue: "1.0",
  sepiaTint: "#ffeec2",
  invertValue: "1.0",
  brightnessValue: "0.0",
  hueValue: "0.0",
  opacityValue: "1.0",
  colorizeBlack: "#000000",
  colorizeWhite: "#ffffff",
};

const matrixColorBuilderFieldMeta = {
  tint: [
    imageDefinitionMatrixColorTintFieldEl,
  ],
  saturation: [
    imageDefinitionMatrixColorSaturationFieldEl,
  ],
  sepia: [
    imageDefinitionMatrixColorSepiaFieldEl,
  ],
  invert: [
    imageDefinitionMatrixColorInvertFieldEl,
  ],
  brightness: [
    imageDefinitionMatrixColorBrightnessFieldEl,
  ],
  hue: [
    imageDefinitionMatrixColorHueFieldEl,
  ],
  opacity: [
    imageDefinitionMatrixColorOpacityFieldEl,
  ],
  colorize: [
    imageDefinitionMatrixColorizeBlackFieldEl,
    imageDefinitionMatrixColorizeWhiteFieldEl,
  ],
};

const audioChannelMeta = {
  music: {
    label: "Music",
    empty: "No music audio yet.",
  },
  sound: {
    label: "Sound",
    empty: "No sound effects yet.",
  },
  voice: {
    label: "Voice",
    empty: "No voice audio yet.",
  },
};

const audioDefinitionFieldDefaults = {
  channel: "music",
  sourcePath: "",
  voiceCharacterId: "",
  voiceSpeaker: "Narrator",
};

const achievementFieldDefaults = {
  title: "",
  description: "",
  notes: "",
  steamName: "",
  progressEnabled: false,
  statMax: "",
  statModulo: "",
};

const live2dDefinitionFieldDefaults = {
  modelPath: "",
  zoom: "",
  top: "0.0",
  base: "1.0",
  height: "1.0",
  loop: false,
  fadeMode: "default",
  seamless: "",
  defaultFade: "",
  motions: "",
  expressions: "",
  nonexclusive: "",
  aliases: "",
};

const imageDefinitionFieldDefaults = {
  category: "others",
  definitionType: "static",
  isSideImage: false,
  sourcePath: "",
  layeredImageFormat: "",
  layeredOfferScreen: "default",
  layeredAt: "",
  layeredAlwaysLayers: [],
  layeredGroups: [],
  moviePlay: "",
  movieSize: "",
  movieChannel: "movie",
  movieSideMask: false,
  movieMask: "",
  movieMaskChannel: "",
  movieStartImage: "",
  movieFallbackImage: "",
  movieLoop: true,
  movieGroup: "",
  movieKeepLastFrame: false,
  solidColor: "#ffffff",
  compositeSize: "",
  compositeLayers: [],
  placeholderBase: "auto",
  placeholderFull: false,
  placeholderFlip: false,
  placeholderText: "",
  atlEnabled: false,
  atlSteps: [],
  pos: "",
  xpos: "",
  ypos: "",
  anchor: "",
  xanchor: "",
  yanchor: "",
  align: "",
  alignaround: "",
  xalign: "",
  yalign: "",
  offset: "",
  xoffset: "",
  yoffset: "",
  xycenter: "",
  xcenter: "",
  ycenter: "",
  around: "",
  angle: "",
  radius: "",
  anchoraround: "",
  anchorangle: "",
  anchorradius: "",
  zoom: "",
  xzoom: "",
  yzoom: "",
  size: "",
  xsize: "",
  ysize: "",
  xysize: "",
  maxsize: "",
  fit: "",
  xtile: "",
  ytile: "",
  rotate: "",
  rotate_pad: false,
  transform_anchor: false,
  orientation: "",
  xrotate: "",
  yrotate: "",
  zrotate: "",
  zpos: "",
  zzoom: "",
  alpha: "",
  additive: "",
  blur: "",
  nearest: false,
  subpixel: false,
  blend: "",
  matrixcolor: "",
  matrixtransform: "",
  matrixanchor: "",
  crop: "",
  crop_relative: false,
  corner1: "",
  corner2: "",
  shader: "",
  mesh: false,
  mesh_pad: "",
  perspective: "",
  xpan: "",
  ypan: "",
  fps: "",
  point_to: "",
  delay: "",
  events: false,
  show_cancels_hide: false,
};

const imageDefinitionBooleanFields = new Set([
  "isSideImage",
  "rotate_pad",
  "transform_anchor",
  "nearest",
  "subpixel",
  "crop_relative",
  "mesh",
  "events",
  "show_cancels_hide",
  "movieSideMask",
  "movieLoop",
  "movieKeepLastFrame",
  "placeholderFull",
  "placeholderFlip",
  "atlEnabled",
]);

const imageDefinitionCodePropertyOrder = [
  "pos",
  "xpos",
  "ypos",
  "anchor",
  "xanchor",
  "yanchor",
  "align",
  "alignaround",
  "xalign",
  "yalign",
  "offset",
  "xoffset",
  "yoffset",
  "xycenter",
  "xcenter",
  "ycenter",
  "around",
  "angle",
  "radius",
  "anchoraround",
  "anchorangle",
  "anchorradius",
  "zoom",
  "xzoom",
  "yzoom",
  "size",
  "xsize",
  "ysize",
  "xysize",
  "maxsize",
  "fit",
  "xtile",
  "ytile",
  "rotate",
  "rotate_pad",
  "transform_anchor",
  "orientation",
  "xrotate",
  "yrotate",
  "zrotate",
  "zpos",
  "zzoom",
  "alpha",
  "additive",
  "blur",
  "nearest",
  "subpixel",
  "blend",
  "matrixcolor",
  "matrixtransform",
  "matrixanchor",
  "crop",
  "crop_relative",
  "corner1",
  "corner2",
  "shader",
  "mesh",
  "mesh_pad",
  "perspective",
  "xpan",
  "ypan",
  "fps",
  "point_to",
  "delay",
  "events",
  "show_cancels_hide",
];

const imageDefinitionFieldEls = Array.from(
  imageDefinitionDetailFormEl.querySelectorAll("[data-image-field]"),
);

const live2dDefinitionFieldEls = Array.from(
  live2dDefinitionDetailFormEl.querySelectorAll("[data-live2d-field]"),
);

const audioDefinitionFieldEls = Array.from(
  audioDefinitionDetailFormEl.querySelectorAll("[data-audio-field]"),
);

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
  meta: structuredClone(defaultProjectMeta),
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
  live2d: [],
  audio: [],
  characters: [],
  variables: [],
  achievements: [],
  definitions: [],
  gui: normalizeGuiState(null),
  activeGraphId: "label_start",
};

const guiSectionLabelById = {
  stylesSection: "gui.nav.styles",
  screensSection: "gui.nav.screens",
  extrasSection: "gui.nav.extras",
  configSection: "gui.nav.config",
  pythonUiSection: "gui.nav.python",
  cursorsSection: "gui.nav.cursors",
  shadersSection: "gui.nav.shaders",
  diagnosticsSection: "gui.nav.diagnostics",
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
let bridgeScriptSymbols = null;
let bridgeSymbolsLoading = false;
let activeImageDefinitionId = null;
let imageDefinitionDetailOpen = false;
let imageCategorySectionState = {
  background: true,
  character: true,
  others: true,
};
let activeLive2DDefinitionId = null;
let live2dDefinitionDetailOpen = false;
let layeredGroupSectionState = {};
let layeredAttributeSectionState = {};
let contextMenuAudioDefinitionId = null;
let activeAudioDefinitionId = null;
let audioDefinitionDetailOpen = false;
let audioChannelSectionState = {
  music: true,
  sound: true,
  voice: true,
};
let activeCharacterId = null;
let characterDetailOpen = false;
let activeVariableId = null;
let variableDetailOpen = false;
let activeAchievementId = null;
let achievementDetailOpen = false;
let activeDefinitionId = null;
let definitionDetailOpen = false;
let projectHealthState = {
  loading: false,
  data: null,
  error: "",
  lastUpdatedAt: 0,
};
let projectHealthRefreshTimer = null;
let projectJsonSyncMeta = {
  level: hasBridge ? "warn" : "bad",
  text: hasBridge ? t("sync.project_json.initial_wait") : t("sync.bridge.disconnected"),
};
let exportSyncMeta = {
  level: "warn",
  text: t("sync.export.initial_wait"),
};
let assetImportMeta = {
  level: "warn",
  text: t("sync.assets.initial_wait"),
};
let pendingLaunchStatusText = "";
let projectKeymapCategoryState = {
  dialogue: true,
  navigation: false,
  input: false,
  viewport: false,
  custom: true,
};
let dialogueTextTarget = {
  kind: "content",
  lineId: null,
};

const dialogueTextToolSpecs = {
  interpolate: {
    mode: "insert",
    text: "[variable]",
    selectionStartOffset: 1,
    selectionEndOffset: 9,
    status: "Inserted interpolation placeholder.",
  },
  newline: {
    mode: "insert",
    text: "\\n",
    status: "Inserted a line break escape.",
  },
  escapeBracket: {
    mode: "insert",
    text: "[[",
    status: "Inserted the escape for [.",
  },
  escapeBrace: {
    mode: "insert",
    text: "{{",
    status: "Inserted the escape for {.",
  },
  escapeRuby: {
    mode: "insert",
    text: "【【",
    status: "Inserted the escape for 【.",
  },
  bold: {
    mode: "wrap",
    before: "{b}",
    after: "{/b}",
    placeholder: "text",
    status: "Wrapped text with a bold tag.",
  },
  italic: {
    mode: "wrap",
    before: "{i}",
    after: "{/i}",
    placeholder: "text",
    status: "Wrapped text with an italic tag.",
  },
  color: {
    mode: "wrap",
    before: "{color=#ffffff}",
    after: "{/color}",
    placeholder: "text",
    status: "Wrapped text with a color tag.",
  },
  size: {
    mode: "wrap",
    before: "{size=+10}",
    after: "{/size}",
    placeholder: "text",
    status: "Wrapped text with a size tag.",
  },
  image: {
    mode: "insert",
    text: "{image=heart.png}",
    selectionStartOffset: 7,
    selectionEndOffset: 16,
    status: "Inserted an inline image tag.",
  },
  wait: {
    mode: "insert",
    text: "{w}",
    status: "Inserted a wait tag.",
  },
  paragraph: {
    mode: "insert",
    text: "{p}",
    status: "Inserted a paragraph pause tag.",
  },
  noWait: {
    mode: "insert",
    text: "{nw}",
    status: "Inserted a no-wait tag.",
  },
  fast: {
    mode: "insert",
    text: "{fast}",
    status: "Inserted a fast tag.",
  },
  done: {
    mode: "insert",
    text: "{done}",
    status: "Inserted a done tag.",
  },
};

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

function getBridgeEndpoint(path) {
  const baseUrl = bridgeUrl.endsWith("/") ? bridgeUrl : `${bridgeUrl}/`;
  const url = new URL(path, baseUrl);
  url.searchParams.set("token", bridgeToken);
  return url.toString();
}

async function callBridge(path, payload = null) {
  if (!hasBridge) {
    throw new Error("Launcher bridge is not connected.");
  }

  const options = payload
    ? {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }
    : { method: "GET" };

  const response = await fetch(getBridgeEndpoint(path), options);
  const text = await response.text();
  let data = {};

  if (text) {
    try {
      data = JSON.parse(text);
    } catch (error) {
      throw new Error(`Launcher bridge returned invalid JSON: ${error.message}`);
    }
  }

  if (!response.ok || data.ok === false) {
    const bridgeError = new Error(data.error || `Launcher bridge request failed with HTTP ${response.status}.`);
    bridgeError.status = response.status;
    bridgeError.bridgeData = data;
    throw bridgeError;
  }

  return data;
}

function getGuiSectionLabel(sectionId) {
  const key = guiSectionLabelById[sectionId];
  return key ? t(key) : t("index.gui_editor.label");
}

function getStoredGuiSectionId() {
  const raw = window.localStorage.getItem(guiSectionStorageKey) || "";
  return Object.prototype.hasOwnProperty.call(guiSectionLabelById, raw) ? raw : "";
}

function storeGuiSectionId(sectionId) {
  if (Object.prototype.hasOwnProperty.call(guiSectionLabelById, sectionId)) {
    window.localStorage.setItem(guiSectionStorageKey, sectionId);
  }
}

function renderLocaleOptions(selectEl) {
  if (!selectEl) {
    return;
  }

  const locales = [
    { value: "en", label: t("ui.language.english") },
    { value: "zh-CN", label: t("ui.language.zhCN") },
  ];

  selectEl.innerHTML = locales.map((locale) => (
    `<option value="${escapeHtml(locale.value)}">${escapeHtml(locale.label)}</option>`
  )).join("");
}

function syncLocaleControl() {
  if (localeSelect) {
    renderLocaleOptions(localeSelect);
    localeSelect.value = i18n.getLocale();
  }
}

function applyCurrentLocale() {
  i18n.applyTranslations(document);
  syncLocaleControl();
}

function formatTimestamp(timestamp) {
  if (!timestamp) {
    return t("common.not_written_yet");
  }

  try {
    return new Intl.DateTimeFormat(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(timestamp));
  } catch (error) {
    return new Date(timestamp).toLocaleString();
  }
}

function setProjectJsonSyncMeta(level, text) {
  projectJsonSyncMeta = { level, text };
}

function setExportSyncMeta(level, text) {
  exportSyncMeta = { level, text };
}

function setAssetImportMeta(level, text) {
  assetImportMeta = { level, text };
}

function hasLocalConfirmScreen() {
  return normalizeGuiState(state.gui).screens.some((screen) => {
    const name = `${screen?.name || ""}`.trim();
    return name === "confirm" || name === "yesno_prompt";
  });
}

function summarizeHealthPaths(paths, emptyText) {
  if (!Array.isArray(paths) || !paths.length) {
    return emptyText;
  }

  const [first, second, third, ...rest] = paths;
  const visible = [first, second, third].filter(Boolean);
  return `${visible.join(", ")}${rest.length ? t("health.paths.more", { count: rest.length }) : ""}`;
}

function buildLocalProjectHealth() {
  const health = projectHealthState.data;
  const legacyGuiExisting = Array.isArray(health?.legacyGuiFiles)
    ? health.legacyGuiFiles.filter((entry) => entry.exists).map((entry) => entry.relativePath)
    : [];
  const legacyScriptExisting = Array.isArray(health?.legacyScriptFiles)
    ? health.legacyScriptFiles.filter((entry) => entry.exists).map((entry) => entry.relativePath)
    : [];
  const missingAssets = Array.isArray(health?.missingAssets) ? health.missingAssets : [];
  const confirmMode = health?.confirmScreen?.mode || (hasLocalConfirmScreen() ? "project" : "fallback");
  const pills = [
    {
      label: hasBridge ? t("health.bridge.connected") : t("health.bridge.offline"),
      level: hasBridge ? "good" : "bad",
    },
    {
      label: t("health.pill.project_json", { text: projectJsonSyncMeta.text }),
      level: projectJsonSyncMeta.level,
    },
    {
      label: t("health.pill.export", { text: exportSyncMeta.text }),
      level: exportSyncMeta.level,
    },
    {
      label: t("health.pill.assets", { text: assetImportMeta.text }),
      level: assetImportMeta.level,
    },
  ];
  const checklist = [
    {
      title: t("health.item.legacy_script.title"),
      level: legacyScriptExisting.length ? "warn" : "good",
      detail: legacyScriptExisting.length
        ? t("health.item.legacy_script.remaining", { paths: summarizeHealthPaths(legacyScriptExisting, "") })
        : t("health.item.legacy_script.ok"),
    },
    {
      title: t("health.item.legacy_gui.title"),
      level: legacyGuiExisting.length ? "warn" : "good",
      detail: legacyGuiExisting.length
        ? t("health.item.legacy_gui.remaining", { paths: summarizeHealthPaths(legacyGuiExisting, "") })
        : t("health.item.legacy_gui.ok"),
    },
    {
      title: t("health.item.confirm.title"),
      level: confirmMode === "project" ? "good" : "warn",
      detail: confirmMode === "project"
        ? t("health.item.confirm.project")
        : t("health.item.confirm.fallback"),
    },
    {
      title: t("health.item.assets.title"),
      level: missingAssets.length ? "bad" : "good",
      detail: missingAssets.length
        ? t("health.item.assets.missing", {
          count: missingAssets.length,
          paths: summarizeHealthPaths(missingAssets.map((entry) => `${entry.kind}:${entry.path}`), ""),
        })
        : t("health.item.assets.ok"),
    },
  ];
  let summary = t("health.summary.ready");

  if (projectHealthState.error) {
    summary = t("health.summary.error", { message: projectHealthState.error });
  } else if (hasBridge && !projectHealthState.data && projectHealthState.loading) {
    summary = t("health.summary.scan_running");
  } else if (hasBridge && !projectHealthState.data) {
    summary = t("health.summary.scan_waiting");
  } else if (!hasBridge) {
    summary = t("health.summary.bridge_offline");
  } else if (missingAssets.length) {
    summary = t("health.summary.assets_missing", { count: missingAssets.length });
  } else if (legacyGuiExisting.length || legacyScriptExisting.length) {
    summary = t("health.summary.legacy_remaining");
  }

  return {
    summary,
    pills,
    checklist,
    timestamp: projectHealthState.lastUpdatedAt || health?.stateFile?.modifiedAt || 0,
  };
}

function renderProjectHealth() {
  if (!projectHealthSummaryEl || !projectHealthPillsEl || !projectHealthChecklistEl || !projectHealthTimestampEl) {
    return;
  }

  const localHealth = buildLocalProjectHealth();
  projectHealthSummaryEl.textContent = localHealth.summary;
  projectHealthTimestampEl.textContent = projectHealthState.loading
    ? t("health.timestamp.refreshing")
    : (localHealth.timestamp
      ? t("health.timestamp.updated", { time: formatTimestamp(localHealth.timestamp) })
      : t("health.timestamp.waiting"));
  projectHealthPillsEl.innerHTML = localHealth.pills.map((pill) => `
    <span class="project-health-pill is-${escapeHtml(pill.level)}">${escapeHtml(pill.label)}</span>
  `).join("");
  projectHealthChecklistEl.innerHTML = localHealth.checklist.map((item) => `
    <div class="project-health-item is-${escapeHtml(item.level)}">
      <strong>${escapeHtml(item.title)}</strong>
      <span>${escapeHtml(item.detail)}</span>
    </div>
  `).join("");
}

async function refreshProjectHealth() {
  if (!hasBridge) {
    projectHealthState = {
      loading: false,
      data: null,
      error: "",
      lastUpdatedAt: Date.now(),
    };
    renderProjectHealth();
    renderGuiEditorPanel();
    return;
  }

  projectHealthState.loading = true;
  renderProjectHealth();

  try {
    const response = await callBridge("health", { state });
    projectHealthState = {
      loading: false,
      data: response.health || null,
      error: "",
      lastUpdatedAt: Date.now(),
    };
  } catch (error) {
    console.error(error);
    projectHealthState = {
      loading: false,
      data: projectHealthState.data,
      error: error.message,
      lastUpdatedAt: Date.now(),
    };
  }

  renderProjectHealth();
  renderGuiEditorPanel();
}

function queueProjectHealthRefresh({ immediate = false } = {}) {
  window.clearTimeout(projectHealthRefreshTimer);

  if (immediate) {
    void refreshProjectHealth();
    return;
  }

  projectHealthRefreshTimer = window.setTimeout(() => {
    void refreshProjectHealth();
  }, 500);
}

let bridgeSaveTimer = null;

function queueBridgeStateSave() {
  if (!hasBridge) {
    return;
  }

  window.clearTimeout(bridgeSaveTimer);
  setProjectJsonSyncMeta("warn", t("sync.project_json.queued"));
  bridgeSaveTimer = window.setTimeout(async () => {
    try {
      await callBridge("state", { state });
      setProjectJsonSyncMeta("good", t("sync.project_json.good"));
      queueProjectHealthRefresh();
    } catch (error) {
      console.error(error);
      setProjectJsonSyncMeta("bad", t("sync.project_json.failed", { message: error.message }));
      setStatus(t("sync.project_json.failed", { message: error.message }));
    }
  }, 350);
}

async function hydrateStateFromBridge() {
  if (!hasBridge) {
    if (pendingLaunchStatusText) {
      setStatus(pendingLaunchStatusText);
      pendingLaunchStatusText = "";
    }
    queueProjectHealthRefresh({ immediate: true });
    return;
  }

  try {
    const response = await callBridge("state");

    if (response.exists && response.state) {
      state = normalizeState(response.state);
      window.localStorage.setItem(storageKey, JSON.stringify(state, null, 2));
      render();
      setSidebarSection(activeSidebarSectionId);
      setInspectorState(Boolean(getActiveGraph()?.selectedNodeId));
      setProjectJsonSyncMeta("good", t("sync.project_json.loaded"));
      setStatus(pendingLaunchStatusText || t("status.loaded_project_state"));
      pendingLaunchStatusText = "";
    } else if (response.importedState) {
      state = normalizeState(response.importedState);
      window.localStorage.setItem(storageKey, JSON.stringify(state, null, 2));
      render();
      setSidebarSection(activeSidebarSectionId);
      setInspectorState(Boolean(getActiveGraph()?.selectedNodeId));
      await callBridge("state", { state });
      setProjectJsonSyncMeta("good", t("sync.project_json.imported"));

      const importSources = Array.isArray(response.importSummary?.sourcePaths) && response.importSummary.sourcePaths.length
        ? response.importSummary.sourcePaths
        : [`${response.importSummary?.sourcePath || "game/options.rpy"}`.trim()].filter(Boolean);
      const importedCounts = [
        response.importSummary?.styleCount || 0,
        response.importSummary?.screenCount || 0,
        response.importSummary?.configCount || 0,
        response.importSummary?.guiVariableCount || 0,
        response.importSummary?.guiPreferenceCount || 0,
        response.importSummary?.preferenceCount || 0,
        response.importSummary?.storeCount || 0,
        response.importSummary?.definitionCount || 0,
      ];
      const importedTotal = importedCounts.reduce((sum, count) => sum + count, 0);
      setStatus(pendingLaunchStatusText || t("status.imported_project_state", {
        sources: importSources.join(" + "),
        suffix: importedTotal ? ` (${importedTotal} items).` : ".",
      }));
      pendingLaunchStatusText = "";
    } else {
      await callBridge("state", { state });
      setProjectJsonSyncMeta("good", t("sync.project_json.created"));
      setStatus(pendingLaunchStatusText || t("status.created_project_state"));
      pendingLaunchStatusText = "";
    }
  } catch (error) {
    console.error(error);
    setProjectJsonSyncMeta("bad", t("status.bridge_unavailable", { message: error.message }));
    setStatus(t("status.bridge_unavailable", { message: error.message }));
  } finally {
    queueProjectHealthRefresh({ immediate: true });
  }
}

function normalizeProjectKeymapBindings(bindings) {
  if (!Array.isArray(bindings)) {
    return [];
  }

  return bindings
    .map((binding) => `${binding ?? ""}`.trim())
    .filter(Boolean)
    .filter((binding, index, source) => source.indexOf(binding) === index);
}

function normalizeProjectKeymapEntry(entry) {
  return {
    useCustomList: entry?.useCustomList === true,
    bindings: normalizeProjectKeymapBindings(entry?.bindings),
    rawExpression: `${entry?.rawExpression || ""}`.trim(),
  };
}

function normalizeProjectKeymapOverrides(rawOverrides) {
  if (!rawOverrides || typeof rawOverrides !== "object" || Array.isArray(rawOverrides)) {
    return {};
  }

  return Object.fromEntries(
    Object.entries(rawOverrides).map(([eventId, entry]) => [eventId, normalizeProjectKeymapEntry(entry)]),
  );
}

function normalizeLabelExportBinding(binding, graphId) {
  if (!binding || typeof binding !== "object" || Array.isArray(binding)) {
    return null;
  }

  if (binding.mode !== "managed_label_body") {
    return null;
  }

  const path = `${binding.path || ""}`.trim();

  if (!path) {
    return null;
  }

  const label = `${binding.label || ""}`.trim();
  const markerId = `${binding.markerId || ""}`.trim()
    || `visual-editor:${getSafeLabelName(label || graphId || "label")}`;

  return {
    mode: "managed_label_body",
    path,
    label,
    markerId,
  };
}

function normalizeExportMap(rawExportMap) {
  if (!rawExportMap || typeof rawExportMap !== "object" || Array.isArray(rawExportMap)) {
    return structuredClone(defaultExportMap);
  }

  const rawLabels = rawExportMap.labels && typeof rawExportMap.labels === "object" && !Array.isArray(rawExportMap.labels)
    ? rawExportMap.labels
    : {};

  return {
    labels: Object.fromEntries(
      Object.entries(rawLabels)
        .map(([graphId, binding]) => [graphId, normalizeLabelExportBinding(binding, graphId)])
        .filter(([, binding]) => Boolean(binding)),
    ),
  };
}

function normalizeGuiState(rawGui) {
  if (!rawGui || typeof rawGui !== "object" || Array.isArray(rawGui)) {
    return {
      styles: [],
      screens: [],
      config: [],
      guiVariables: [],
      guiPreferences: [],
      preferences: [],
      store: [],
      pythonUiHelpers: [],
      cursors: [],
      textShaders: [],
      replayMenu: null,
      musicRooms: [],
      galleries: [],
    };
  }

  return {
    styles: Array.isArray(rawGui.styles) ? rawGui.styles : [],
    screens: Array.isArray(rawGui.screens) ? rawGui.screens : [],
    config: Array.isArray(rawGui.config) ? rawGui.config : [],
    guiVariables: Array.isArray(rawGui.guiVariables) ? rawGui.guiVariables : [],
    guiPreferences: Array.isArray(rawGui.guiPreferences) ? rawGui.guiPreferences : [],
    preferences: Array.isArray(rawGui.preferences) ? rawGui.preferences : [],
    store: Array.isArray(rawGui.store) ? rawGui.store : [],
    pythonUiHelpers: Array.isArray(rawGui.pythonUiHelpers) ? rawGui.pythonUiHelpers : [],
    cursors: Array.isArray(rawGui.cursors) ? rawGui.cursors : [],
    textShaders: Array.isArray(rawGui.textShaders) ? rawGui.textShaders : [],
    replayMenu: rawGui.replayMenu && typeof rawGui.replayMenu === "object" && !Array.isArray(rawGui.replayMenu)
      ? rawGui.replayMenu
      : null,
    musicRooms: Array.isArray(rawGui.musicRooms) ? rawGui.musicRooms : [],
    galleries: Array.isArray(rawGui.galleries) ? rawGui.galleries : [],
  };
}

function normalizeState(rawState) {
  const rawMeta = rawState.meta || {};
  const normalizedGraphs = Array.isArray(rawState.graphs) && rawState.graphs.length
    ? rawState.graphs.map((graph, index) => normalizeGraph(graph, index))
    : [normalizeLegacyGraph(rawState)];
  const normalizedCharacters = Array.isArray(rawState.characters)
    ? rawState.characters.map((character, index) => normalizeCharacter(character, index))
    : [];
  const normalizedImageDefinitions = Array.isArray(rawState.images)
    ? rawState.images.map((image, index) => normalizeImageDefinition(image, index))
    : [];
  const normalizedLive2DDefinitions = Array.isArray(rawState.live2d)
    ? rawState.live2d.map((definition, index) => normalizeLive2DDefinition(definition, index))
    : [];
  const normalizedAudioDefinitions = Array.isArray(rawState.audio)
    ? rawState.audio.map((audioDefinition, index) => normalizeAudioDefinition(audioDefinition, index))
    : [];
  const normalizedVariables = Array.isArray(rawState.variables)
    ? rawState.variables.map((variable, index) => normalizeVariable(variable, index))
    : [];
  const normalizedAchievements = Array.isArray(rawState.achievements)
    ? rawState.achievements.map((achievement, index) => normalizeAchievement(achievement, index))
    : [];
  const normalizedDefinitions = Array.isArray(rawState.definitions)
    ? rawState.definitions.map((definition, index) => normalizeDefinition(definition, index))
    : [];
  const activeGraphId = normalizedGraphs.some((graph) => graph.id === rawState.activeGraphId)
    ? rawState.activeGraphId
    : normalizedGraphs[0]?.id ?? null;

  return {
    meta: {
      ...defaultProjectMeta,
      ...rawMeta,
      name: rawMeta.name || defaultProjectMeta.name,
      voiceMode: rawMeta.voiceMode === "auto" ? "auto" : "manual",
      autoVoiceTemplate: `${rawMeta.autoVoiceTemplate || ""}`.trim() || defaultProjectMeta.autoVoiceTemplate,
      multilingualVoices: rawMeta.multilingualVoices !== false,
      defaultDialogueVoiceEnabled: rawMeta.defaultDialogueVoiceEnabled === true,
      sideImageTag: `${rawMeta.sideImageTag || ""}`.trim(),
      sideImageOnlyNotShowing: rawMeta.sideImageOnlyNotShowing === true,
      sideImagePrefixTag: `${rawMeta.sideImagePrefixTag || ""}`.trim() || defaultProjectMeta.sideImagePrefixTag,
      sideImageNull: `${rawMeta.sideImageNull || ""}`.trim(),
      sideImageSameTransform: `${rawMeta.sideImageSameTransform || ""}`.trim(),
      sideImageChangeTransform: `${rawMeta.sideImageChangeTransform || ""}`.trim(),
      hasAutosave: rawMeta.hasAutosave !== false && rawMeta.hasAutosave !== "false",
      autosaveFrequency: `${rawMeta.autosaveFrequency ?? ""}`.trim() || defaultProjectMeta.autosaveFrequency,
      hasQuicksave: rawMeta.hasQuicksave !== false && rawMeta.hasQuicksave !== "false",
      rollbackEnabled: rawMeta.rollbackEnabled !== false && rawMeta.rollbackEnabled !== "false",
      rollbackLength: `${rawMeta.rollbackLength ?? ""}`.trim() || defaultProjectMeta.rollbackLength,
      hardRollbackLimit: `${rawMeta.hardRollbackLimit ?? ""}`.trim() || defaultProjectMeta.hardRollbackLimit,
      fixRollbackWithoutChoice: rawMeta.fixRollbackWithoutChoice === true || rawMeta.fixRollbackWithoutChoice === "true",
      keymapOverrides: normalizeProjectKeymapOverrides(rawMeta.keymapOverrides),
    },
    graphs: normalizedGraphs,
    images: normalizedImageDefinitions,
    live2d: normalizedLive2DDefinitions,
    audio: normalizedAudioDefinitions,
    characters: normalizedCharacters,
    variables: normalizedVariables,
    achievements: normalizedAchievements,
    definitions: normalizedDefinitions,
    gui: normalizeGuiState(rawState.gui),
    activeGraphId,
  };
}

function normalizeGraph(graph, index) {
  const rawNodes = Array.isArray(graph.nodes)
    ? graph.nodes.map((node, nodeIndex) => normalizeGraphNode(node, index, nodeIndex))
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
      .map((edge, edgeIndex) => normalizeGraphEdge(edge, nodes, index, edgeIndex))
      .filter(Boolean)
    : [];
  const selectedNodeId = nodes.some((node) => node.id === graph.selectedNodeId)
    ? graph.selectedNodeId
    : (nodes[0]?.id ?? null);

  return {
    id: graph.id || `label_${index + 1}`,
    label: graph.label || `label_${index + 1}`,
    replay: normalizeGraphReplay(graph.replay, graph.label || `label_${index + 1}`),
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

function normalizeGraphReplay(replay, labelName = "") {
  const lockedMode = ["auto", "unlocked", "locked"].includes(replay?.lockedMode)
    ? replay.lockedMode
    : "auto";

  return {
    enabled: replay?.enabled === true,
    title: `${replay?.title || ""}`.trim() || `${labelName || ""}`.trim(),
    lockedMode,
    scope: `${replay?.scope || ""}`.trim(),
    autoEnd: replay?.autoEnd === true,
  };
}

function normalizeGraphEdge(edge, nodes, graphIndex, edgeIndex) {
  const sourceNode = nodes.find((node) => node.id === edge.fromNodeId);
  const targetNode = nodes.find((node) => node.id === edge.toNodeId);
  const startNodeId = nodes.find((node) => node?.type === "start")?.id ?? "start";

  if (!sourceNode || !targetNode) {
    return null;
  }

  if (
    targetNode.id === startNodeId
    || !nodeAllowsOutgoingConnections(sourceNode)
    || !nodeAllowsIncomingConnections(targetNode)
  ) {
    return null;
  }

  const fromPortId = normalizeOutputPortId(sourceNode, edge.fromPortId);

  return {
    id: edge.id || `edge_${graphIndex + 1}_${edgeIndex + 1}`,
    fromNodeId: edge.fromNodeId,
    fromPortId,
    toNodeId: edge.toNodeId,
  };
}

function normalizeGraphNode(node, graphIndex, nodeIndex) {
  if (!node || typeof node !== "object") {
    return {
      id: `node_${graphIndex + 1}_${nodeIndex + 1}`,
      type: "menu",
      title: "Node",
      content: "",
      x: 96 + nodeIndex * 28,
      y: 96 + nodeIndex * 20,
    };
  }

  if (node.type === "jump") {
    return {
      ...node,
      type: "flow",
      title: "Jump",
      flowMode: "jump",
      flowTargetGraphId: node.flowTargetGraphId || "",
      flowTargetLabel: node.flowTargetLabel || node.content || "next_label",
      content: node.content || "",
    };
  }

  if (node.type === "flow") {
    const normalizedMode = ["jump", "call", "return"].includes(node.flowMode)
      ? node.flowMode
      : "jump";

    return {
      ...node,
      flowMode: normalizedMode,
      flowTargetGraphId: node.flowTargetGraphId || "",
      flowTargetLabel: node.flowTargetLabel || node.content || "",
    };
  }

  if (node.type === "image") {
    return {
      ...node,
      title: node.title || "Show Image",
      imageMode: ["show", "scene", "hide"].includes(node.imageMode)
        ? node.imageMode
        : "show",
      imageDefinitionId: node.imageDefinitionId || "",
      imageName: node.imageName || "",
      imageLayer: node.imageLayer || "",
      imageAt: node.imageAt || "",
      imageAlias: node.imageAlias || "",
      imageBehind: node.imageBehind || "",
      imageZorder: node.imageZorder || "",
      imageLive2DMotion: `${node.imageLive2DMotion || ""}`.trim(),
      imageLive2DExpression: `${node.imageLive2DExpression || ""}`.trim(),
      imageLive2DNonexclusive: normalizeLive2DAttributeSelectionList(node.imageLive2DNonexclusive),
      imageLive2DRemovals: normalizeLive2DAttributeSelectionList(node.imageLive2DRemovals),
      imageLive2DStill: Boolean(node.imageLive2DStill),
      imageLive2DAdditionalAttributes: `${node.imageLive2DAdditionalAttributes || ""}`.trim(),
      imageLayeredSelections: normalizeImageNodeLayeredSelectionState(node.imageLayeredSelections),
    };
  }

  if (node.type === "dialogue") {
    const hasLegacyVoiceData = (
      node.dialogueVoiceMode === "manual"
      || node.dialogueVoiceMode === "auto"
      || `${node.dialogueVoicePath || ""}`.trim().length > 0
      || Boolean(node.dialogueVoiceAudioId)
      || Boolean(node.dialogueVoiceAudioName)
      || (Array.isArray(node.dialogueLines) && node.dialogueLines.length > 0)
    );

    return {
      ...node,
      title: node.title || "Dialogue",
      dialogueCharacterId: node.dialogueCharacterId || "",
      dialogueSpeaker: node.dialogueSpeaker || "Narrator",
      dialogueVoiceEnabled: Object.prototype.hasOwnProperty.call(node, "dialogueVoiceEnabled")
        ? Boolean(node.dialogueVoiceEnabled)
        : hasLegacyVoiceData,
      dialogueLines: normalizeDialogueVoiceLines(node.dialogueLines, {
        fallbackTextSource: node.content,
        legacyVoiceAudioId: node.dialogueVoiceAudioId || "",
        legacyVoiceAudioName: node.dialogueVoiceAudioName || "",
        legacyVoicePath: node.dialogueVoicePath || "",
      }),
    };
  }

  if (node.type === "input") {
    return {
      ...node,
      title: node.title || "Input",
      inputVariable: `${node.inputVariable || ""}`.trim() || "player_name",
      inputPrompt: `${node.inputPrompt || node.content || ""}`.trim() || "Enter a value.",
      inputDefault: `${node.inputDefault ?? ""}`,
      inputAllow: `${node.inputAllow ?? ""}`,
      inputExclude: `${node.inputExclude ?? ""}`,
      inputLength: `${node.inputLength ?? ""}`.trim(),
      inputPixelWidth: `${node.inputPixelWidth ?? ""}`.trim(),
      inputScreen: `${node.inputScreen || ""}`.trim() || "input",
      inputMask: `${node.inputMask ?? ""}`,
      inputFallback: `${node.inputFallback ?? ""}`,
      inputTrim: Object.prototype.hasOwnProperty.call(node, "inputTrim")
        ? Boolean(node.inputTrim)
        : true,
      inputCopyPaste: node.inputCopyPaste !== false && node.inputCopyPaste !== "false",
      content: `${node.inputPrompt || node.content || ""}`.trim(),
    };
  }

  if (node.type === "achievement") {
    const achievementAction = ["grant", "progress", "clear", "sync"].includes(node.achievementAction)
      ? node.achievementAction
      : "grant";

    return {
      ...node,
      title: node.title || `Achievement ${capitalize(achievementAction)}`,
      achievementAction,
      achievementId: `${node.achievementId || ""}`.trim(),
      achievementName: `${node.achievementName || ""}`.trim(),
      achievementProgressMode: node.achievementProgressMode === "add" ? "add" : "set",
      achievementProgressValue: `${node.achievementProgressValue || ""}`.trim() || "1",
    };
  }

  if (node.type === "input") {
    const target = `${node.inputVariable || ""}`.trim() || "player_name";
    const prompt = `${node.inputPrompt || ""}`.trim();
    const fallback = `${node.inputFallback || ""}`.trim();
    const detailParts = [target];

    if (prompt) {
      detailParts.push(prompt);
    }

    if (fallback) {
      detailParts.push(`fallback:${fallback}`);
    }

    return {
      typeLabel: "input",
      title: "Input",
      content: detailParts.join(" · ") || "Configure renpy.input().",
    };
  }

  if (node.type === "menu") {
    const fallbackPrompt = node.menuPrompt
      || (node.content && node.content !== "Add menu choices here." ? node.content : "")
      || "";

    return {
      ...node,
      title: node.title || "Choice",
      menuPrompt: fallbackPrompt,
      menuChoices: normalizeMenuChoices(node.menuChoices),
    };
  }

  if (node.type === "condition") {
    return {
      ...node,
      title: node.title || "Condition",
      conditionClauses: normalizeConditionClauses(node.conditionClauses),
    };
  }

  if (node.type === "screen") {
    const screenMode = ["show", "call", "hide"].includes(node.screenMode)
      ? node.screenMode
      : "show";

    return {
      ...node,
      title: node.title || `${capitalize(screenMode)} Screen`,
      screenMode,
      screenName: `${node.screenName || node.content || ""}`.trim(),
      screenArguments: `${node.screenArguments || ""}`,
      screenResultVariable: `${node.screenResultVariable || ""}`.trim(),
      content: `${node.screenName || node.content || ""}`.trim(),
    };
  }

  if (node.type === "python") {
    return {
      ...node,
      title: node.title || "Python",
      pythonMode: node.pythonMode === "block" ? "block" : "line",
      pythonCode: node.pythonCode || node.content || "",
      pythonStore: node.pythonStore || "",
      pythonHide: Boolean(node.pythonHide),
    };
  }

  if (node.type === "audio") {
    return {
      ...node,
      title: node.title || "Audio Play",
      audioAction: ["play", "queue", "stop"].includes(node.audioAction)
        ? node.audioAction
        : "play",
      audioDefinitionId: node.audioDefinitionId || "",
      audioName: node.audioName || "",
      audioChannel: Object.prototype.hasOwnProperty.call(audioChannelMeta, node.audioChannel)
        ? node.audioChannel
        : "music",
      audioLoop: Boolean(node.audioLoop),
      audioFadeIn: node.audioFadeIn || "",
      audioFadeOut: node.audioFadeOut || "",
      audioVolume: node.audioVolume || "",
      audioIfChanged: Boolean(node.audioIfChanged),
    };
  }

  return node;
}

function createMenuChoice(index = 1) {
  return {
    id: `menu_choice_${Date.now()}_${index}`,
    text: `Choice ${index}`,
    condition: "",
    conditionMode: "none",
    conditionVariableId: "",
    conditionVariableTarget: "",
    conditionAchievementId: "",
    conditionAchievementName: "",
    conditionAchievementState: "has",
    conditionOperator: "is_true",
    conditionValue: "",
  };
}

function createConditionClause(kind = "if", index = 1) {
  return {
    id: `condition_clause_${Date.now()}_${index}`,
    kind,
    condition: "",
    conditionMode: kind === "else"
      ? "none"
      : "expression",
    conditionVariableId: "",
    conditionVariableTarget: "",
    conditionAchievementId: "",
    conditionAchievementName: "",
    conditionAchievementState: "has",
    conditionOperator: "is_true",
    conditionValue: "",
  };
}

function getMenuChoicePortId(choiceId) {
  return `choice:${choiceId}`;
}

function getConditionClausePortId(clauseId) {
  return `condition:${clauseId}`;
}

function getVariableById(variableId) {
  return state.variables.find((variable) => variable.id === variableId) ?? null;
}

function getConditionalExpression(choice) {
  if (!choice) {
    return "";
  }

  const mode = choice.conditionMode || "none";

  if (mode === "expression") {
    return `${choice.condition || ""}`.trim();
  }

  if (mode === "achievement") {
    const achievement = getAchievementById(choice.conditionAchievementId);
    const achievementName = achievement
      ? getAchievementRegisterName(achievement)
      : `${choice.conditionAchievementName || ""}`.trim();

    if (!achievementName) {
      return "";
    }

    const hasExpression = `achievement.has(${formatRenpyQuotedString(achievementName)})`;

    return choice.conditionAchievementState === "not_has"
      ? `not ${hasExpression}`
      : hasExpression;
  }

  if (mode !== "simple") {
    return "";
  }

  const variable = getVariableById(choice.conditionVariableId);
  const target = variable
    ? getVariableTarget(variable)
    : `${choice.conditionVariableTarget || ""}`.trim();
  const operator = choice.conditionOperator || "is_true";
  const value = `${choice.conditionValue || ""}`.trim();

  if (!target) {
    return "";
  }

  if (operator === "is_true") {
    return target;
  }

  if (operator === "is_false") {
    return `not ${target}`;
  }

  if (!value) {
    return target;
  }

  return `${target} ${operator} ${value}`;
}

function buildConditionalVariableOptions(choice) {
  const currentVariable = getVariableById(choice.conditionVariableId);
  const fallbackTarget = `${choice.conditionVariableTarget || ""}`.trim();
  const hasMissingVariable = Boolean(choice.conditionVariableId) && !currentVariable && fallbackTarget;
  const missingValue = hasMissingVariable ? `__missing__:${fallbackTarget}` : "";

  const options = ['<option value="">Select a default variable...</option>'];

  if (hasMissingVariable) {
    options.push(`<option value="${escapeHtml(missingValue)}">Legacy / Missing: ${escapeHtml(fallbackTarget)}</option>`);
  }

  state.variables.forEach((variable) => {
    options.push(
      `<option value="${escapeHtml(variable.id)}">${escapeHtml(getVariableTarget(variable))}</option>`,
    );
  });

  return {
    options: options.join(""),
    value: currentVariable
      ? currentVariable.id
      : (missingValue || ""),
  };
}

function buildConditionalAchievementOptions(choice) {
  return buildAchievementSelectionOptions({
    achievementId: choice?.conditionAchievementId || "",
    achievementName: choice?.conditionAchievementName || "",
  });
}

function normalizeConditionClauses(rawClauses) {
  const sourceClauses = Array.isArray(rawClauses) ? rawClauses : [];
  const conditionalClauses = [];
  let elseClause = null;

  sourceClauses.forEach((clause, index) => {
    if (!clause || typeof clause !== "object") {
      conditionalClauses.push(createConditionClause(conditionalClauses.length === 0 ? "if" : "elif", index + 1));
      return;
    }

    if (clause.kind === "else") {
      if (!elseClause) {
        elseClause = {
          ...createConditionClause("else", index + 1),
          id: clause.id || `condition_clause_${Date.now()}_${index + 1}`,
        };
      }
      return;
    }

    conditionalClauses.push({
      ...createConditionClause(conditionalClauses.length === 0 ? "if" : "elif", index + 1),
      ...clause,
      kind: conditionalClauses.length === 0 ? "if" : "elif",
      conditionMode: (
        clause.conditionMode === "simple"
        || clause.conditionMode === "expression"
        || clause.conditionMode === "achievement"
      )
        ? clause.conditionMode
        : "expression",
      conditionVariableId: clause.conditionVariableId || "",
      conditionVariableTarget: clause.conditionVariableTarget || "",
      conditionAchievementId: clause.conditionAchievementId || "",
      conditionAchievementName: clause.conditionAchievementName || "",
      conditionAchievementState: clause.conditionAchievementState === "not_has" ? "not_has" : "has",
      conditionOperator: clause.conditionOperator || "is_true",
      conditionValue: clause.conditionValue || "",
      condition: `${clause.condition || ""}`.trim(),
    });
  });

  if (!conditionalClauses.length) {
    conditionalClauses.push(createConditionClause("if", 1));
  }

  if (elseClause) {
    conditionalClauses.push(elseClause);
  }

  return conditionalClauses;
}

function normalizeMenuChoices(rawChoices) {
  if (!Array.isArray(rawChoices) || !rawChoices.length) {
    return [createMenuChoice(1)];
  }

  const normalizedChoices = rawChoices.map((choice, index) => {
    if (!choice || typeof choice !== "object") {
      return createMenuChoice(index + 1);
    }

    return {
      id: choice.id || `menu_choice_${Date.now()}_${index + 1}`,
      text: `${choice.text || ""}`.trim() || `Choice ${index + 1}`,
      condition: `${choice.condition || ""}`.trim(),
      conditionMode: (
        choice.conditionMode === "simple"
        || choice.conditionMode === "expression"
        || choice.conditionMode === "achievement"
        || choice.conditionMode === "none"
      )
        ? choice.conditionMode
        : (`${choice.condition || ""}`.trim() ? "expression" : "none"),
      conditionVariableId: choice.conditionVariableId || "",
      conditionVariableTarget: choice.conditionVariableTarget || "",
      conditionAchievementId: choice.conditionAchievementId || "",
      conditionAchievementName: choice.conditionAchievementName || "",
      conditionAchievementState: choice.conditionAchievementState === "not_has" ? "not_has" : "has",
      conditionOperator: choice.conditionOperator || "is_true",
      conditionValue: choice.conditionValue || "",
    };
  });

  return normalizedChoices.length ? normalizedChoices : [createMenuChoice(1)];
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
  const normalizedFields = {};
  const hasLayeredMetadata = Boolean(
    `${image.layeredImageFormat || ""}`.trim()
    || `${image.layeredAt || ""}`.trim()
    || (Array.isArray(image.layeredAlwaysLayers) && image.layeredAlwaysLayers.length)
    || (Array.isArray(image.layeredGroups) && image.layeredGroups.length),
  );
  const hasMovieMetadata = Boolean(
    `${image.moviePlay || ""}`.trim()
    || `${image.movieMask || ""}`.trim()
    || `${image.movieStartImage || ""}`.trim()
    || `${image.movieFallbackImage || ""}`.trim(),
  );
  const hasCompositeMetadata = Boolean(
    `${image.compositeSize || ""}`.trim()
    || (Array.isArray(image.compositeLayers) && image.compositeLayers.length),
  );
  const hasPlaceholderMetadata = Boolean(
    image.placeholderFull
    || image.placeholderFlip
    || `${image.placeholderText || ""}`.trim()
    || (
      `${image.placeholderBase || ""}`.trim()
      && `${image.placeholderBase || ""}`.trim() !== imageDefinitionFieldDefaults.placeholderBase
    ),
  );
  const normalizedDefinitionType = Object.prototype.hasOwnProperty.call(
    imageDefinitionTypeMeta,
    image.definitionType,
  )
    ? image.definitionType
    : (
      hasLayeredMetadata
        ? "layered"
        :
      hasMovieMetadata
        ? "movie"
        : hasCompositeMetadata
          ? "composite"
          : hasPlaceholderMetadata
            ? "placeholder"
            : "static"
    );

  Object.entries(imageDefinitionFieldDefaults).forEach(([field, defaultValue]) => {
    if (field === "category") {
      normalizedFields.category = Object.prototype.hasOwnProperty.call(imageCategoryMeta, image.category)
        ? image.category
        : defaultValue;
      return;
    }

    if (field === "definitionType") {
      normalizedFields.definitionType = normalizedDefinitionType;
      return;
    }

    if (field === "isSideImage") {
      normalizedFields.isSideImage = Boolean(image.isSideImage) && normalizedDefinitionType !== "layered";
      return;
    }

    if (field === "movieChannel") {
      normalizedFields.movieChannel = `${image.movieChannel || ""}`.trim() || "movie";
      return;
    }

    if (field === "layeredOfferScreen") {
      normalizedFields.layeredOfferScreen = ["default", "true", "false"].includes(image.layeredOfferScreen)
        ? image.layeredOfferScreen
        : defaultValue;
      return;
    }

    if (field === "layeredAlwaysLayers") {
      normalizedFields.layeredAlwaysLayers = normalizeLayeredAlwaysLayers(image.layeredAlwaysLayers);
      return;
    }

    if (field === "layeredGroups") {
      normalizedFields.layeredGroups = normalizeLayeredGroups(image.layeredGroups);
      return;
    }

    if (field === "compositeLayers") {
      normalizedFields.compositeLayers = normalizeCompositeLayers(image.compositeLayers);
      return;
    }

    if (field === "atlSteps") {
      normalizedFields.atlSteps = normalizeImageAtlSteps(image.atlSteps);
      return;
    }

    if (typeof defaultValue === "boolean") {
      normalizedFields[field] = Boolean(image[field]);
      return;
    }

    if (Array.isArray(defaultValue)) {
      normalizedFields[field] = structuredClone(defaultValue);
      return;
    }

    if (Object.prototype.hasOwnProperty.call(image, field)) {
      normalizedFields[field] = image[field] || "";
      return;
    }

    normalizedFields[field] = defaultValue;
  });

  if (normalizedFields.movieKeepLastFrame) {
    normalizedFields.movieLoop = false;
  }

  return {
    id: image.id || `image_${index + 1}`,
    name: image.name || `image_${index + 1}`,
    ...normalizedFields,
  };
}

function normalizeLive2DDefinition(definition, index) {
  return {
    id: definition.id || `live2d_${index + 1}`,
    definitionKind: "live2d",
    name: definition.name || `live2d_${index + 1}`,
    modelPath: definition.modelPath || "",
    zoom: definition.zoom || "",
    top: `${definition.top ?? live2dDefinitionFieldDefaults.top}`.trim() || live2dDefinitionFieldDefaults.top,
    base: `${definition.base ?? live2dDefinitionFieldDefaults.base}`.trim() || live2dDefinitionFieldDefaults.base,
    height: `${definition.height ?? live2dDefinitionFieldDefaults.height}`.trim() || live2dDefinitionFieldDefaults.height,
    loop: Boolean(definition.loop),
    fadeMode: ["default", "true", "false"].includes(definition.fadeMode)
      ? definition.fadeMode
      : live2dDefinitionFieldDefaults.fadeMode,
    seamless: definition.seamless || "",
    defaultFade: definition.defaultFade || "",
    motions: definition.motions || "",
    expressions: definition.expressions || "",
    nonexclusive: definition.nonexclusive || "",
    aliases: definition.aliases || "",
  };
}

function normalizeVariable(variable, index) {
  return {
    id: variable.id || `variable_${index + 1}`,
    store: variable.store || "",
    name: variable.name || `flag_${index + 1}`,
    value: variable.value || "0",
  };
}

function normalizeAchievement(achievement, index) {
  const safeName = `${achievement?.name || ""}`.trim() || `achievement_${index + 1}`;
  const statMax = `${achievement?.statMax ?? ""}`.trim();

  return {
    id: achievement?.id || `achievement_${index + 1}`,
    name: safeName,
    title: `${achievement?.title || ""}`.trim(),
    description: `${achievement?.description || ""}`.trim(),
    notes: `${achievement?.notes || ""}`.trim(),
    steamName: `${achievement?.steamName || ""}`.trim(),
    progressEnabled: achievement?.progressEnabled === true || Boolean(statMax),
    statMax,
    statModulo: `${achievement?.statModulo ?? ""}`.trim(),
  };
}

function normalizeAudioDefinition(audioDefinition, index) {
  return {
    id: audioDefinition.id || `audio_${index + 1}`,
    name: audioDefinition.name || `audio_${index + 1}`,
    channel: Object.prototype.hasOwnProperty.call(audioChannelMeta, audioDefinition.channel)
      ? audioDefinition.channel
      : "music",
    sourcePath: audioDefinition.sourcePath || "",
    voiceCharacterId: audioDefinition.voiceCharacterId || "",
    voiceSpeaker: audioDefinition.voiceSpeaker || "Narrator",
  };
}

function normalizeDefinition(definition, index) {
  const mode = definition.mode === "init_python" ? "init_python" : "define";

  return {
    id: definition.id || `definition_${index + 1}`,
    mode,
    target: definition.target || `value_${index + 1}`,
    operator: ["=", "+=", "|="].includes(definition.operator) ? definition.operator : "=",
    priority: definition.priority || "",
    value: definition.value || "",
    initPriority: definition.initPriority || "",
    initHide: Boolean(definition.initHide),
    initStore: definition.initStore || "",
    code: definition.code || "",
  };
}

function saveState(message) {
  window.localStorage.setItem(storageKey, JSON.stringify(state, null, 2));
  queueBridgeStateSave();
  queueProjectHealthRefresh();

  if (message) {
    setStatus(message);
  }
}

function setStatus(message) {
  statusTextEl.textContent = i18n.translateText ? i18n.translateText(message) : message;
}

function setSidebarToggleLabel() {
  const label = t(sidebarOpen ? "sidebar.collapse" : "sidebar.expand");
  sidebarToggleButton.setAttribute("aria-label", label);
  sidebarToggleButton.title = label;
}

function setSidebarState(nextOpen) {
  sidebarOpen = nextOpen;
  sidebarEl.classList.toggle("is-open", sidebarOpen);
  sidebarToggleButton.classList.toggle("is-collapsed", !sidebarOpen);
  sidebarToggleButton.setAttribute("aria-expanded", String(sidebarOpen));
  setSidebarToggleLabel();
}

function setSidebarSection(sectionId) {
  const nextSectionId = sidebarPanelEls.some((panel) => panel.id === sectionId)
    ? sectionId
    : "projectOverviewSection";
  activeSidebarSectionId = nextSectionId;

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

function setAudioContextMenuState(nextOpen, options = {}) {
  if (!nextOpen) {
    contextMenuAudioDefinitionId = null;
    audioContextMenuEl.classList.remove("is-open");
    return;
  }

  contextMenuAudioDefinitionId = options.audioId ?? contextMenuAudioDefinitionId;
  audioContextMenuEl.classList.add("is-open");
  audioContextMenuEl.style.left = "0px";
  audioContextMenuEl.style.top = "0px";

  const margin = 12;
  const menuWidth = audioContextMenuEl.offsetWidth;
  const menuHeight = audioContextMenuEl.offsetHeight;
  const left = Math.min(
    Math.max(margin, options.x ?? margin),
    window.innerWidth - menuWidth - margin,
  );
  const top = Math.min(
    Math.max(margin, options.y ?? margin),
    window.innerHeight - menuHeight - margin,
  );

  audioContextMenuEl.style.left = `${left}px`;
  audioContextMenuEl.style.top = `${top}px`;
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
    replay: normalizeGraphReplay({}, label),
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

function createCompositeLayer(index, overrides = {}) {
  return {
    id: overrides.id || `composite_layer_${Date.now()}_${index}`,
    position: `${overrides.position || ""}`.trim() || "(0, 0)",
    displayable: `${overrides.displayable || overrides.child || ""}`.trim(),
  };
}

function normalizeCompositeLayers(rawLayers) {
  if (!Array.isArray(rawLayers)) {
    return [];
  }

  return rawLayers
    .filter((layer) => layer && typeof layer === "object")
    .map((layer, index) => createCompositeLayer(index + 1, layer));
}

function createLayeredAlwaysLayer(index, overrides = {}) {
  return {
    id: overrides.id || `layered_always_${Date.now()}_${index}`,
    displayable: `${overrides.displayable || overrides.image || ""}`.trim(),
    when: `${overrides.when || ""}`.trim(),
    at: `${overrides.at || ""}`.trim(),
  };
}

function normalizeLayeredAlwaysLayers(rawLayers) {
  if (!Array.isArray(rawLayers)) {
    return [];
  }

  return rawLayers
    .filter((layer) => layer && typeof layer === "object")
    .map((layer, index) => createLayeredAlwaysLayer(index + 1, layer));
}

function createLayeredAttribute(index, overrides = {}) {
  const normalizedDisplayMode = ["auto", "explicit", "null"].includes(overrides.displayMode)
    ? overrides.displayMode
    : (
      overrides.nullDisplay
        ? "null"
        : `${overrides.displayable || overrides.image || ""}`.trim()
          ? "explicit"
          : "auto"
    );

  return {
    id: overrides.id || `layered_attribute_${Date.now()}_${index}`,
    name: `${overrides.name || ""}`.trim() || `attribute_${index}`,
    displayMode: normalizedDisplayMode,
    displayable: `${overrides.displayable || overrides.image || ""}`.trim(),
    isDefault: Boolean(overrides.isDefault || overrides.default),
    when: `${overrides.when || ""}`.trim(),
    at: `${overrides.at || ""}`.trim(),
  };
}

function normalizeLayeredAttributes(rawAttributes, { allowDefaults = true } = {}) {
  if (!Array.isArray(rawAttributes) || !rawAttributes.length) {
    return [createLayeredAttribute(1)];
  }

  return rawAttributes
    .filter((attribute) => attribute && typeof attribute === "object")
    .map((attribute, index) => {
      const nextAttribute = createLayeredAttribute(index + 1, attribute);

      if (!allowDefaults) {
        nextAttribute.isDefault = false;
      }

      return nextAttribute;
    });
}

function createLayeredGroup(index, overrides = {}) {
  const mode = overrides.mode === "multiple" ? "multiple" : "single";

  return {
    id: overrides.id || `layered_group_${Date.now()}_${index}`,
    name: `${overrides.name || ""}`.trim() || `group_${index}`,
    mode,
    auto: Boolean(overrides.auto),
    prefix: `${overrides.prefix || ""}`.trim(),
    variant: `${overrides.variant || ""}`.trim(),
    attributes: normalizeLayeredAttributes(overrides.attributes, {
      allowDefaults: mode !== "multiple",
    }),
  };
}

function normalizeLayeredGroups(rawGroups) {
  if (!Array.isArray(rawGroups)) {
    return [];
  }

  return rawGroups
    .filter((group) => group && typeof group === "object")
    .map((group, index) => createLayeredGroup(index + 1, group));
}

function createImageAtlStep(index, overrides = {}) {
  const normalizedType = Object.prototype.hasOwnProperty.call(imageAtlStepTypeMeta, overrides.type)
    ? overrides.type
    : "interpolate";
  const defaultProperties = normalizedType === "interpolate"
    ? "xalign 1.0"
    : "xalign 0.5";

  return {
    id: overrides.id || `atl_step_${Date.now()}_${index}`,
    type: normalizedType,
    warper: imageAtlWarperOptions.includes(overrides.warper) ? overrides.warper : "linear",
    duration: `${overrides.duration || ""}`.trim() || "1.0",
    properties: `${overrides.properties || overrides.target || ""}`.trim() || defaultProperties,
    expression: `${overrides.expression || ""}`.trim() || "\"images/example.png\"",
  };
}

function normalizeImageAtlSteps(rawSteps) {
  if (!Array.isArray(rawSteps)) {
    return [];
  }

  return rawSteps
    .filter((step) => step && typeof step === "object")
    .map((step, index) => createImageAtlStep(index + 1, step));
}

function createBlankImageDefinition() {
  const nextIndex = state.images.length + 1;

  return {
    id: `image_${nextIndex}`,
    name: `image_${nextIndex}`,
    ...structuredClone(imageDefinitionFieldDefaults),
  };
}

function createBlankLive2DDefinition() {
  const nextIndex = state.live2d.length + 1;

  return {
    id: `live2d_${nextIndex}`,
    definitionKind: "live2d",
    name: `live2d_${nextIndex}`,
    ...structuredClone(live2dDefinitionFieldDefaults),
  };
}

function createBlankAudioDefinition() {
  const nextIndex = state.audio.length + 1;

  return {
    id: `audio_${nextIndex}`,
    name: `audio_${nextIndex}`,
    ...structuredClone(audioDefinitionFieldDefaults),
  };
}

function createBlankVariable() {
  const nextIndex = state.variables.length + 1;

  return {
    id: `variable_${nextIndex}`,
    store: "",
    name: `flag_${nextIndex}`,
    value: "0",
  };
}

function createBlankAchievement() {
  const nextIndex = state.achievements.length + 1;

  return {
    id: `achievement_${nextIndex}`,
    name: `achievement_${nextIndex}`,
    ...structuredClone(achievementFieldDefaults),
  };
}

function createBlankDefinition() {
  const nextIndex = state.definitions.length + 1;

  return {
    id: `definition_${nextIndex}`,
    mode: "define",
    target: `value_${nextIndex}`,
    operator: "=",
    priority: "",
    value: "",
    initPriority: "",
    initHide: false,
    initStore: "",
    code: "",
  };
}

function getActiveCharacter() {
  return state.characters.find((character) => character.id === activeCharacterId) ?? null;
}

function getCharacterById(characterId) {
  return state.characters.find((character) => character.id === characterId) ?? null;
}

function getActiveImageDefinition() {
  return state.images.find((image) => image.id === activeImageDefinitionId) ?? null;
}

function getImageDefinitionById(imageId) {
  return state.images.find((image) => image.id === imageId) ?? null;
}

function getActiveLive2DDefinition() {
  return state.live2d.find((definition) => definition.id === activeLive2DDefinitionId) ?? null;
}

function getLive2DDefinitionById(definitionId) {
  return state.live2d.find((definition) => definition.id === definitionId) ?? null;
}

function getVisualResourceById(definitionId) {
  return getImageDefinitionById(definitionId) || getLive2DDefinitionById(definitionId);
}

function getActiveAudioDefinition() {
  return state.audio.find((audioDefinition) => audioDefinition.id === activeAudioDefinitionId) ?? null;
}

function getAudioDefinitionById(audioId) {
  return state.audio.find((audioDefinition) => audioDefinition.id === audioId) ?? null;
}

function getActiveAchievement() {
  return state.achievements.find((achievement) => achievement.id === activeAchievementId) ?? null;
}

function getAchievementById(achievementId) {
  return state.achievements.find((achievement) => achievement.id === achievementId) ?? null;
}

function getAudioDefinitionVoiceOwner(audioDefinition) {
  if (audioDefinition?.voiceCharacterId) {
    const selectedCharacter = getCharacterById(audioDefinition.voiceCharacterId);

    if (selectedCharacter) {
      return {
        kind: "character",
        id: selectedCharacter.id,
        name: selectedCharacter.name || selectedCharacter.id,
      };
    }

    return {
      kind: "character",
      id: audioDefinition.voiceCharacterId,
      name: audioDefinition.voiceSpeaker || audioDefinition.voiceCharacterId,
    };
  }

  return {
    kind: "narrator",
    id: null,
    name: "Narrator",
  };
}

function buildAudioDefinitionVoiceOwnerOptions(selectEl, audioDefinition) {
  if (!selectEl) {
    return;
  }

  const owner = getAudioDefinitionVoiceOwner(audioDefinition);
  const hasMissingCharacter = Boolean(audioDefinition?.voiceCharacterId) && !getCharacterById(audioDefinition.voiceCharacterId);
  const missingValue = hasMissingCharacter ? `__missing__:${audioDefinition.voiceCharacterId}` : "";

  selectEl.innerHTML = "";

  const narratorOption = document.createElement("option");
  narratorOption.value = "";
  narratorOption.textContent = "Narrator";
  selectEl.appendChild(narratorOption);

  if (hasMissingCharacter) {
    const missingOption = document.createElement("option");
    missingOption.value = missingValue;
    missingOption.textContent = `Legacy / Missing: ${owner.name}`;
    selectEl.appendChild(missingOption);
  }

  state.characters.forEach((character) => {
    const option = document.createElement("option");
    option.value = character.id;
    option.textContent = character.name || character.id;
    selectEl.appendChild(option);
  });

  if (owner.kind === "character" && owner.id && !hasMissingCharacter) {
    selectEl.value = owner.id;
    return;
  }

  selectEl.value = missingValue || "";
}

function syncAudioDefinitionVoiceOwnerField(audioDefinition) {
  const isVoiceAudio = audioDefinition?.channel === "voice";

  if (audioDefinitionVoiceOwnerFieldEl) {
    audioDefinitionVoiceOwnerFieldEl.classList.toggle("hidden", !isVoiceAudio);
    audioDefinitionVoiceOwnerFieldEl.hidden = !isVoiceAudio;
  }

  buildAudioDefinitionVoiceOwnerOptions(audioDefinitionVoiceOwnerInput, audioDefinition);

  if (!isVoiceAudio && audioDefinitionVoiceOwnerInput) {
    audioDefinitionVoiceOwnerInput.value = "";
  }
}

function doesAudioDefinitionMatchSpeaker(audioDefinition, speaker) {
  if (!audioDefinition || audioDefinition.channel !== "voice") {
    return false;
  }

  const owner = getAudioDefinitionVoiceOwner(audioDefinition);

  if (speaker?.kind === "character") {
    return owner.kind === "character" && owner.id === speaker.id;
  }

  return owner.kind === "narrator";
}

function getAudioDefinitionSubtitle(audioDefinition) {
  const sourcePath = audioDefinition?.sourcePath || "No source path yet";

  if (audioDefinition?.channel !== "voice") {
    return sourcePath;
  }

  const owner = getAudioDefinitionVoiceOwner(audioDefinition);
  return `${owner.name} · ${sourcePath}`;
}

function getActiveVariable() {
  return state.variables.find((variable) => variable.id === activeVariableId) ?? null;
}

function getActiveDefinition() {
  return state.definitions.find((definition) => definition.id === activeDefinitionId) ?? null;
}

function getProjectVoiceMode() {
  return state.meta.voiceMode === "auto" ? "auto" : "manual";
}

function getProjectAutoVoiceTemplate() {
  return `${state.meta.autoVoiceTemplate || ""}`.trim() || defaultProjectMeta.autoVoiceTemplate;
}

function getProjectDefaultDialogueVoiceEnabled() {
  return state.meta.defaultDialogueVoiceEnabled === true;
}

function getProjectSideImageTag() {
  return `${state.meta.sideImageTag || ""}`.trim();
}

function getProjectSideImageOnlyNotShowing() {
  return state.meta.sideImageOnlyNotShowing === true;
}

function getProjectSideImagePrefixTag() {
  return `${state.meta.sideImagePrefixTag || ""}`.trim() || defaultProjectMeta.sideImagePrefixTag;
}

function getProjectSideImageNullExpression() {
  return `${state.meta.sideImageNull || ""}`.trim();
}

function getProjectSideImageSameTransform() {
  return `${state.meta.sideImageSameTransform || ""}`.trim();
}

function getProjectSideImageChangeTransform() {
  return `${state.meta.sideImageChangeTransform || ""}`.trim();
}

function getProjectHasAutosave() {
  return state.meta.hasAutosave !== false;
}

function getProjectAutosaveFrequency() {
  return `${state.meta.autosaveFrequency ?? ""}`.trim() || defaultProjectMeta.autosaveFrequency;
}

function getProjectHasQuicksave() {
  return state.meta.hasQuicksave !== false;
}

function getProjectRollbackEnabled() {
  return state.meta.rollbackEnabled !== false;
}

function getProjectRollbackLength() {
  return `${state.meta.rollbackLength ?? ""}`.trim() || defaultProjectMeta.rollbackLength;
}

function getProjectHardRollbackLimit() {
  return `${state.meta.hardRollbackLimit ?? ""}`.trim() || defaultProjectMeta.hardRollbackLimit;
}

function getProjectFixRollbackWithoutChoice() {
  return state.meta.fixRollbackWithoutChoice === true;
}

function getProjectKeymapOverrides() {
  return normalizeProjectKeymapOverrides(state.meta.keymapOverrides);
}

function cloneProjectKeymapOverrides() {
  return Object.fromEntries(
    Object.entries(getProjectKeymapOverrides()).map(([eventId, entry]) => [
      eventId,
      {
        ...entry,
        bindings: [...entry.bindings],
      },
    ]),
  );
}

function compactProjectKeymapOverrides(overrides) {
  return Object.fromEntries(
    Object.entries(normalizeProjectKeymapOverrides(overrides))
      .filter(([, entry]) => entry.useCustomList || entry.rawExpression),
  );
}

function getProjectKeymapEventMeta(eventId) {
  const knownMeta = projectKeymapEventMetaById[eventId];

  if (knownMeta) {
    return knownMeta;
  }

  return {
    id: eventId,
    label: eventId,
    description: t("project-keymap-custom-event-description"),
    defaultBindings: [],
  };
}

function getProjectKeymapCategoryLabel(category) {
  return tt(category.label);
}

function getProjectKeymapCategoryDescription(category) {
  return tt(category.description);
}

function getProjectKeymapEventLabel(meta) {
  return tt(meta.label);
}

function getProjectKeymapEventDescription(meta) {
  return tt(meta.description);
}

function getProjectKeymapStatusLabel(entry) {
  if (entry.rawExpression) {
    return t("project-keymap-status-raw");
  }

  if (entry.useCustomList) {
    return t("project-keymap-status-custom");
  }

  return t("project-keymap-status-default");
}

function getProjectKeymapOverrideEntry(eventId) {
  return getProjectKeymapOverrides()[eventId] || {
    useCustomList: false,
    bindings: [],
    rawExpression: "",
  };
}

function getProjectKeymapEffectiveBindings(eventId) {
  const meta = getProjectKeymapEventMeta(eventId);
  const entry = getProjectKeymapOverrideEntry(eventId);

  if (entry.useCustomList) {
    return [...entry.bindings];
  }

  return [...meta.defaultBindings];
}

function updateProjectKeymapOverrides(mutator) {
  const overrides = cloneProjectKeymapOverrides();

  mutator(overrides);

  updateProjectMeta({
    keymapOverrides: compactProjectKeymapOverrides(overrides),
  });
}

function addProjectKeymapBinding(eventId, binding) {
  const normalizedBinding = `${binding || ""}`.trim();

  if (!normalizedBinding) {
    return false;
  }

  let added = false;

  updateProjectKeymapOverrides((overrides) => {
    const currentBindings = getProjectKeymapEffectiveBindings(eventId);

    if (currentBindings.includes(normalizedBinding)) {
      return;
    }

    overrides[eventId] = normalizeProjectKeymapEntry({
      ...getProjectKeymapOverrideEntry(eventId),
      useCustomList: true,
      bindings: [...currentBindings, normalizedBinding],
    });
    added = true;
  });

  return added;
}

function removeProjectKeymapBinding(eventId, binding) {
  const normalizedBinding = `${binding || ""}`.trim();

  if (!normalizedBinding) {
    return false;
  }

  let removed = false;

  updateProjectKeymapOverrides((overrides) => {
    const currentBindings = getProjectKeymapEffectiveBindings(eventId);

    if (!currentBindings.includes(normalizedBinding)) {
      return;
    }

    overrides[eventId] = normalizeProjectKeymapEntry({
      ...getProjectKeymapOverrideEntry(eventId),
      useCustomList: true,
      bindings: currentBindings.filter((item) => item !== normalizedBinding),
    });
    removed = true;
  });

  return removed;
}

function setProjectKeymapRawExpression(eventId, rawExpression) {
  const normalizedRawExpression = `${rawExpression || ""}`.trim();

  updateProjectKeymapOverrides((overrides) => {
    const currentEntry = getProjectKeymapOverrideEntry(eventId);

    overrides[eventId] = normalizeProjectKeymapEntry({
      ...currentEntry,
      rawExpression: normalizedRawExpression,
    });

    if (!normalizedRawExpression && !overrides[eventId].useCustomList) {
      delete overrides[eventId];
    }
  });
}

function resetProjectKeymapEvent(eventId) {
  updateProjectKeymapOverrides((overrides) => {
    delete overrides[eventId];
  });
}

function ensureProjectKeymapCustomEvent(eventId) {
  const normalizedEventId = `${eventId || ""}`.trim();

  if (!normalizedEventId) {
    return false;
  }

  let created = false;

  updateProjectKeymapOverrides((overrides) => {
    if (overrides[normalizedEventId] || projectKeymapEventMetaById[normalizedEventId]) {
      return;
    }

    overrides[normalizedEventId] = normalizeProjectKeymapEntry({
      useCustomList: true,
      bindings: [],
      rawExpression: "",
    });
    created = true;
  });

  return created;
}

function getRenderableProjectKeymapCategories() {
  const knownIds = new Set(projectKeymapEventMeta.map((meta) => meta.id));
  const customEventIds = Object.keys(getProjectKeymapOverrides())
    .filter((eventId) => !knownIds.has(eventId))
    .sort((left, right) => left.localeCompare(right));

  const categories = projectKeymapEventCategories.map((category) => ({
    ...category,
    eventIds: [...category.eventIds],
  }));

  if (customEventIds.length) {
    categories.push({
      id: "custom",
      label: "Custom Events",
      description: "Event overrides you added outside the tracked common preset list.",
      eventIds: customEventIds,
    });
  }

  return categories;
}

function formatProjectVoiceCode() {
  const lines = [];

  if (getProjectVoiceMode() === "auto") {
    lines.push(`define config.auto_voice = "${escapeRenpyString(getProjectAutoVoiceTemplate())}"`);
  } else {
    lines.push("# Automatic voice disabled.");
    lines.push("# Dialogue blocks can still emit manual voice statements.");
  }

  if (state.meta.multilingualVoices !== false) {
    lines.push("# Localized voice files can live under game/tl/<language>/...");
  }

  return lines.join("\n");
}

function formatProjectSideImageCode() {
  const lines = [];

  if (getProjectSideImageTag()) {
    lines.push(`define config.side_image_tag = "${escapeRenpyString(getProjectSideImageTag())}"`);
  }

  if (getProjectSideImageOnlyNotShowing()) {
    lines.push("define config.side_image_only_not_showing = True");
  }

  if (getProjectSideImagePrefixTag() !== defaultProjectMeta.sideImagePrefixTag) {
    lines.push(`define config.side_image_prefix_tag = "${escapeRenpyString(getProjectSideImagePrefixTag())}"`);
  }

  if (getProjectSideImageNullExpression()) {
    lines.push(`define config.side_image_null = ${getProjectSideImageNullExpression()}`);
  }

  if (getProjectSideImageSameTransform()) {
    lines.push(`define config.side_image_same_transform = ${getProjectSideImageSameTransform()}`);
  }

  if (getProjectSideImageChangeTransform()) {
    lines.push(`define config.side_image_change_transform = ${getProjectSideImageChangeTransform()}`);
  }

  if (!lines.length) {
    lines.push("# Side image config is currently using Ren'Py defaults.");
  }

  lines.push("# Remember to add SideImage() inside the say screen to display avatar portraits.");
  return lines.join("\n");
}

function formatProjectSaveLoadCode() {
  const lines = [];

  if (!getProjectHasAutosave()) {
    lines.push("define config.has_autosave = False");
  }

  if (getProjectAutosaveFrequency() !== defaultProjectMeta.autosaveFrequency) {
    lines.push(`define config.autosave_frequency = ${getProjectAutosaveFrequency()}`);
  }

  if (!getProjectHasQuicksave()) {
    lines.push("define config.has_quicksave = False");
  }

  if (!getProjectRollbackEnabled()) {
    lines.push("define config.rollback_enabled = False");
  }

  if (getProjectRollbackLength() !== defaultProjectMeta.rollbackLength) {
    lines.push(`define config.rollback_length = ${getProjectRollbackLength()}`);
  }

  if (getProjectHardRollbackLimit() !== defaultProjectMeta.hardRollbackLimit) {
    lines.push(`define config.hard_rollback_limit = ${getProjectHardRollbackLimit()}`);
  }

  if (getProjectFixRollbackWithoutChoice()) {
    lines.push("define config.fix_rollback_without_choice = True");
  }

  if (!lines.length) {
    lines.push("# Save, load, autosave, quicksave, and rollback are currently using Ren'Py defaults.");
  }

  lines.push("# Save/load screens can expose auto and quick pages only when the corresponding flags are enabled.");
  return lines.join("\n");
}

function formatProjectKeymapBindingList(bindings) {
  return `[ ${bindings.map((binding) => formatRenpyStringLikeArgument(binding)).join(", ")} ]`;
}

function formatProjectKeymapCode() {
  const overrides = getProjectKeymapOverrides();
  const overrideEntries = Object.entries(overrides)
    .sort((left, right) => left[0].localeCompare(right[0]))
    .filter(([, entry]) => entry.useCustomList || entry.rawExpression);

  if (!overrideEntries.length) {
    return [
      "# Using Ren'Py default key bindings.",
      "# Add overrides here only when your project genuinely needs custom input behavior.",
    ].join("\n");
  }

  const lines = ["init python:"];

  overrideEntries.forEach(([eventId, entry]) => {
    const valueExpression = entry.rawExpression
      ? entry.rawExpression
      : formatProjectKeymapBindingList(entry.bindings);

    lines.push(`    config.keymap["${escapeRenpyString(eventId)}"] = ${valueExpression}`);
  });

  return lines.join("\n");
}

function getAvailableImageTags() {
  const tags = new Set();

  state.characters.forEach((character) => {
    const linkedTag = `${character.image || ""}`.trim();

    if (linkedTag) {
      tags.add(linkedTag);
    }
  });

  state.images.forEach((image) => {
    const imageName = `${image.name || ""}`.trim();

    if (!imageName) {
      return;
    }

    const [tag] = imageName.split(/\s+/);

    if (tag) {
      tags.add(tag);
    }
  });

  state.live2d.forEach((definition) => {
    const live2dName = `${definition.name || ""}`.trim();

    if (live2dName) {
      tags.add(live2dName.split(/\s+/)[0]);
    }
  });

  return [...tags].sort((left, right) => left.localeCompare(right));
}

function getDialogueVoiceEnabled(node) {
  if (Object.prototype.hasOwnProperty.call(node || {}, "dialogueVoiceEnabled")) {
    return Boolean(node?.dialogueVoiceEnabled);
  }

  return (
    node?.dialogueVoiceMode === "manual"
    || node?.dialogueVoiceMode === "auto"
    || (Array.isArray(node?.dialogueLines) && node.dialogueLines.length > 0)
  );
}

function createDialogueVoiceLine(index = 1) {
  return {
    id: `dialogue_line_${Date.now()}_${index}`,
    text: "",
    voiceAudioId: "",
    voiceAudioName: "",
    voicePath: "",
  };
}

function normalizeDialogueVoiceLine(line, index, legacyPatch = {}) {
  const baseLine = createDialogueVoiceLine(index);
  const source = line && typeof line === "object"
    ? line
    : { text: `${line || ""}` };

  return {
    ...baseLine,
    ...legacyPatch,
    ...source,
    id: source.id || baseLine.id,
    text: `${source.text || ""}`,
    voiceAudioId: source.voiceAudioId || legacyPatch.voiceAudioId || "",
    voiceAudioName: source.voiceAudioName || legacyPatch.voiceAudioName || "",
    voicePath: source.voicePath || legacyPatch.voicePath || "",
  };
}

function splitDialogueTextIntoBlocks(content, { fallbackBlocks = ["..."] } = {}) {
  const normalizedContent = `${content || ""}`.replace(/\r\n?/g, "\n").trim();

  if (!normalizedContent) {
    return fallbackBlocks;
  }

  const blocks = normalizedContent
    .split(/\n\s*\n+/)
    .map((block) => block.split("\n").map((line) => line.trimEnd()).join("\n").trim())
    .filter(Boolean);

  return blocks.length ? blocks : fallbackBlocks;
}

function normalizeDialogueVoiceLines(rawLines, {
  fallbackTextSource = "",
  legacyVoiceAudioId = "",
  legacyVoiceAudioName = "",
  legacyVoicePath = "",
} = {}) {
  const sourceLines = Array.isArray(rawLines) && rawLines.length
    ? rawLines
    : splitDialogueTextIntoBlocks(fallbackTextSource, { fallbackBlocks: [] }).map((text) => ({ text }));

  return sourceLines.map((line, index) => normalizeDialogueVoiceLine(
    line,
    index + 1,
    index === 0
      ? {
        voiceAudioId: legacyVoiceAudioId,
        voiceAudioName: legacyVoiceAudioName,
        voicePath: legacyVoicePath,
      }
      : {},
  ));
}

function getDialogueVoiceLines(node, { ensureAtLeastOne = false } = {}) {
  const lines = Array.isArray(node?.dialogueLines)
    ? node.dialogueLines.map((line, index) => normalizeDialogueVoiceLine(line, index + 1))
    : [];

  if (!lines.length && ensureAtLeastOne) {
    return [createDialogueVoiceLine(1)];
  }

  return lines;
}

function getDialogueLineVoiceResource(line) {
  const audioDefinition = getAudioDefinitionById(line?.voiceAudioId || "");

  if (audioDefinition) {
    return {
      kind: "definition",
      id: audioDefinition.id,
      name: audioDefinition.name,
      sourcePath: audioDefinition.sourcePath || "",
      channel: audioDefinition.channel || "",
    };
  }

  const legacyName = `${line?.voiceAudioName || ""}`.trim();

  return {
    kind: legacyName ? "missing" : "empty",
    id: "",
    name: legacyName,
    sourcePath: "",
    channel: "",
  };
}

function buildDialogueVoiceLineResourceOptions(selectEl, node, line) {
  if (!selectEl) {
    return;
  }

  const speaker = getDialogueSpeaker(node);
  const currentResource = getDialogueLineVoiceResource(line);
  const currentAudioDefinition = getAudioDefinitionById(line?.voiceAudioId || "");
  const matchingVoiceDefinitions = state.audio.filter((audioDefinition) => (
    doesAudioDefinitionMatchSpeaker(audioDefinition, speaker)
  ));
  const hasLegacyMissingAudio = currentResource.kind === "missing" && currentResource.name;
  const missingValue = hasLegacyMissingAudio
    ? `__missing__:${currentResource.name}`
    : "";

  selectEl.innerHTML = "";

  const placeholderOption = document.createElement("option");
  placeholderOption.value = "";
  placeholderOption.textContent = matchingVoiceDefinitions.length
    ? `Select ${speaker.name} voice`
    : `No voice audio for ${speaker.name}`;
  selectEl.appendChild(placeholderOption);

  if (missingValue) {
    const missingOption = document.createElement("option");
    missingOption.value = missingValue;
    missingOption.textContent = `Legacy / Missing: ${currentResource.name}`;
    selectEl.appendChild(missingOption);
  }

  matchingVoiceDefinitions.forEach((audioDefinition) => {
    const option = document.createElement("option");
    option.value = audioDefinition.id;
    option.textContent = `${audioDefinition.name} · ${audioDefinition.sourcePath || "No source path yet"}`;
    selectEl.appendChild(option);
  });

  if (
    currentResource.kind === "definition"
    && currentResource.id
    && currentAudioDefinition
    && doesAudioDefinitionMatchSpeaker(currentAudioDefinition, speaker)
  ) {
    selectEl.value = currentResource.id;
    return;
  }

  if (missingValue) {
    selectEl.value = missingValue;
    return;
  }

  selectEl.value = "";
}

function getDialogueLineVoicePath(line, speaker = null) {
  const currentAudioDefinition = getAudioDefinitionById(line?.voiceAudioId || "");

  if (currentAudioDefinition && speaker && !doesAudioDefinitionMatchSpeaker(currentAudioDefinition, speaker)) {
    return "";
  }

  const resource = getDialogueLineVoiceResource(line);

  return `${resource.sourcePath || ""}`.trim();
}

function sanitizeDialogueVoiceLinesForSpeaker(dialogueLines, speaker) {
  return getDialogueVoiceLines({ dialogueLines }).map((line) => {
    const currentAudioDefinition = getAudioDefinitionById(line.voiceAudioId || "");

    if (!currentAudioDefinition) {
      return line;
    }

    if (doesAudioDefinitionMatchSpeaker(currentAudioDefinition, speaker)) {
      return line;
    }

    return {
      ...line,
      voiceAudioId: "",
      voiceAudioName: "",
    };
  });
}

function getDialogueVoiceSummary(node) {
  if (!getDialogueVoiceEnabled(node)) {
    return "";
  }

  const speaker = getDialogueSpeaker(node);
  const voiceLines = getDialogueVoiceLines(node);
  const voicedLineCount = voiceLines.filter((line) => getDialogueLineVoicePath(line, speaker)).length;

  return voicedLineCount
    ? `voice lines:${voicedLineCount}`
    : "voice lines";
}

function getImageNodeMode(node) {
  return node.imageMode || "show";
}

function getImageNodeName(node) {
  const selectedImage = getVisualResourceById(node.imageDefinitionId);

  if (selectedImage) {
    return (selectedImage.name || "").trim();
  }

  return (node.imageName || "").trim();
}

function normalizeLive2DAttributeSelectionList(rawValue) {
  const sourceValues = Array.isArray(rawValue)
    ? rawValue
    : typeof rawValue === "string"
      ? splitLive2DList(rawValue)
      : [];

  return sourceValues
    .map((value) => `${value || ""}`.trim())
    .filter(Boolean)
    .filter((value, index, source) => source.indexOf(value) === index);
}

function getImageNodeLive2DState(node) {
  return {
    motion: `${node?.imageLive2DMotion || ""}`.trim(),
    expression: `${node?.imageLive2DExpression || ""}`.trim(),
    nonexclusive: normalizeLive2DAttributeSelectionList(node?.imageLive2DNonexclusive),
    removals: normalizeLive2DAttributeSelectionList(node?.imageLive2DRemovals),
    still: Boolean(node?.imageLive2DStill),
    additionalAttributes: `${node?.imageLive2DAdditionalAttributes || ""}`.trim(),
  };
}

function normalizeImageNodeLayeredSelectionState(rawSelections) {
  if (!rawSelections || typeof rawSelections !== "object" || Array.isArray(rawSelections)) {
    return {};
  }

  const normalizedSelections = {};

  Object.entries(rawSelections).forEach(([groupId, selection]) => {
    if (!groupId || !Array.isArray(selection)) {
      return;
    }

    const nextSelection = selection
      .map((attributeId) => `${attributeId || ""}`.trim())
      .filter(Boolean)
      .filter((attributeId, index, source) => source.indexOf(attributeId) === index);

    if (nextSelection.length) {
      normalizedSelections[groupId] = nextSelection;
    }
  });

  return normalizedSelections;
}

function getImageNodeLayeredSelectionMap(node, imageDefinition = null) {
  const selectedImage = imageDefinition || getImageDefinitionById(node?.imageDefinitionId || "");

  if (!selectedImage || getImageDefinitionType(selectedImage) !== "layered") {
    return {};
  }

  const storedSelections = normalizeImageNodeLayeredSelectionState(node?.imageLayeredSelections);
  const normalizedSelections = {};

  normalizeLayeredGroups(selectedImage.layeredGroups).forEach((group) => {
    const validAttributeIds = new Set(group.attributes.map((attribute) => attribute.id));
    const nextSelection = (storedSelections[group.id] || [])
      .filter((attributeId) => validAttributeIds.has(attributeId))
      .filter((attributeId, index, source) => source.indexOf(attributeId) === index);

    if (!nextSelection.length) {
      return;
    }

    normalizedSelections[group.id] = group.mode === "multiple"
      ? nextSelection
      : nextSelection.slice(0, 1);
  });

  return normalizedSelections;
}

function getLayeredGroupDefaultAttribute(group) {
  if (!group || group.mode === "multiple") {
    return null;
  }

  return group.attributes.find((attribute) => attribute.isDefault) ?? null;
}

function getLayeredAttributeInspectorLabel(attribute) {
  const metaParts = [];

  if (attribute.displayMode === "null") {
    metaParts.push("null");
  }

  if (attribute.isDefault) {
    metaParts.push("default");
  }

  return metaParts.length
    ? `${attribute.name} · ${metaParts.join(" · ")}`
    : attribute.name;
}

function getLayeredAttributeStateKey(groupId, attributeId) {
  return `${groupId}:${attributeId}`;
}

function isLayeredGroupExpanded(groupId) {
  return layeredGroupSectionState[groupId] !== false;
}

function isLayeredAttributeExpanded(groupId, attributeId) {
  return layeredAttributeSectionState[getLayeredAttributeStateKey(groupId, attributeId)] !== false;
}

function getLayeredAttributeDisplayModeLabel(displayMode) {
  if (displayMode === "explicit") {
    return "Explicit";
  }

  if (displayMode === "null") {
    return "Null";
  }

  return "Auto";
}

function getImageNodeLayeredAttributeNames(node, imageDefinition = null) {
  const selectedImage = imageDefinition || getImageDefinitionById(node?.imageDefinitionId || "");

  if (!selectedImage || getImageDefinitionType(selectedImage) !== "layered") {
    return [];
  }

  const selectionMap = getImageNodeLayeredSelectionMap(node, selectedImage);
  const attributeNames = [];

  normalizeLayeredGroups(selectedImage.layeredGroups).forEach((group) => {
    const selectedAttributeIds = selectionMap[group.id] || [];

    group.attributes.forEach((attribute) => {
      if (selectedAttributeIds.includes(attribute.id) && `${attribute.name || ""}`.trim()) {
        attributeNames.push(attribute.name.trim());
      }
    });
  });

  return attributeNames;
}

function getLive2DDefinitionMotionOptions(definition) {
  return splitLive2DList(definition?.motions);
}

function getLive2DDefinitionExpressionOptions(definition) {
  const options = splitLive2DList(definition?.expressions);

  if (!options.includes("null")) {
    options.unshift("null");
  }

  return options.filter((value, index, source) => source.indexOf(value) === index);
}

function getLive2DDefinitionNonexclusiveOptions(definition) {
  return splitLive2DList(definition?.nonexclusive);
}

function getLive2DDefinitionAliasKeys(definition) {
  return parseLive2DAliases(definition?.aliases)
    .map(([aliasKey]) => aliasKey)
    .filter((value, index, source) => source.indexOf(value) === index);
}

function getImageNodeLive2DAttributeTokens(node, definition = null) {
  const selectedDefinition = definition || getLive2DDefinitionById(node?.imageDefinitionId || "");

  if (!selectedDefinition) {
    return [];
  }

  const live2dState = getImageNodeLive2DState(node);
  const tokens = [];

  if (live2dState.motion) {
    tokens.push(live2dState.motion);
  }

  if (live2dState.expression) {
    tokens.push(live2dState.expression);
  }

  tokens.push(...live2dState.nonexclusive);

  if (live2dState.still) {
    tokens.push("still");
  }

  tokens.push(...live2dState.removals.map((attribute) => `-${attribute}`));
  tokens.push(...splitLive2DList(live2dState.additionalAttributes));

  return tokens.filter((value, index, source) => source.indexOf(value) === index);
}

function getImageNodeResourceAttributeTokens(node, resource = null) {
  const selectedResource = resource || getVisualResourceById(node?.imageDefinitionId || "");

  if (!selectedResource) {
    return [];
  }

  if (getVisualResourceKind(selectedResource) === "live2d") {
    return getImageNodeLive2DAttributeTokens(node, selectedResource);
  }

  if (getImageDefinitionType(selectedResource) === "layered") {
    return getImageNodeLayeredAttributeNames(node, selectedResource);
  }

  return [];
}

function buildImageNodeResourceOptions(selectEl, node, { mode = "show" } = {}) {
  if (!selectEl) {
    return;
  }

  const totalVisualResources = state.images.length + state.live2d.length;
  const currentSelectedResource = getVisualResourceById(node?.imageDefinitionId || "");
  const placeholderText = totalVisualResources
    ? (mode === "scene" ? "Optional imported asset" : "Select imported asset")
    : "No imported assets";
  const currentLegacyName = !currentSelectedResource && (node?.imageName || "").trim();
  const legacyValue = currentLegacyName ? `__legacy__:${currentLegacyName}` : "";

  selectEl.innerHTML = "";

  const placeholderOption = document.createElement("option");
  placeholderOption.value = "";
  placeholderOption.textContent = placeholderText;
  selectEl.appendChild(placeholderOption);

  if (currentLegacyName) {
    const legacyOption = document.createElement("option");
    legacyOption.value = legacyValue;
    legacyOption.textContent = `Legacy / Missing: ${currentLegacyName}`;
    selectEl.appendChild(legacyOption);
  }

  state.images.forEach((image) => {
    const option = document.createElement("option");
    option.value = image.id;
    option.textContent = `${image.name} · ${getImageDefinitionTypeLabel(image)} · ${tt(imageCategoryMeta[image.category]?.label || "Others")}`;
    selectEl.appendChild(option);
  });

  state.live2d.forEach((definition) => {
    const option = document.createElement("option");
    option.value = definition.id;
    option.textContent = `${definition.name} · ${getLive2DDefinitionSummary(definition)}`;
    selectEl.appendChild(option);
  });

  if (node?.imageDefinitionId && currentSelectedResource) {
    selectEl.value = node.imageDefinitionId;
    return;
  }

  if (legacyValue) {
    selectEl.value = legacyValue;
    return;
  }

  selectEl.value = "";
}

function populateInspectorSelectWithOptionalLegacy(selectEl, options, {
  placeholderText,
  value = "",
} = {}) {
  if (!selectEl) {
    return;
  }

  const normalizedOptions = options
    .map((option) => `${option || ""}`.trim())
    .filter(Boolean)
    .filter((option, index, source) => source.indexOf(option) === index);
  const normalizedValue = `${value || ""}`.trim();

  selectEl.innerHTML = "";

  const placeholderOption = document.createElement("option");
  placeholderOption.value = "";
  placeholderOption.textContent = placeholderText;
  selectEl.appendChild(placeholderOption);

  if (normalizedValue && !normalizedOptions.includes(normalizedValue)) {
    const missingOption = document.createElement("option");
    missingOption.value = normalizedValue;
    missingOption.textContent = `Current / Missing: ${normalizedValue}`;
    selectEl.appendChild(missingOption);
  }

  normalizedOptions.forEach((optionValue) => {
    const option = document.createElement("option");
    option.value = optionValue;
    option.textContent = optionValue;
    selectEl.appendChild(option);
  });

  selectEl.value = normalizedValue || "";
}

function renderImageNodeAtOptions() {
  if (!imageNodeAtOptionsEl) {
    return;
  }

  imageNodeAtOptionsEl.innerHTML = builtInTransformPresets
    .map((preset) => `<option value="${escapeHtml(preset)}"></option>`)
    .join("");
}

function renderImageNodeLayeredInspector(node) {
  if (!imageNodeLayeredFieldsEl || !imageNodeLayeredHelpEl || !imageNodeLayeredGroupListEl) {
    return;
  }

  const selectedImage = getImageDefinitionById(node?.imageDefinitionId || "");
  const shouldShow = Boolean(
    node
    && node.type === "image"
    && getImageNodeMode(node) !== "hide"
    && selectedImage
    && getImageDefinitionType(selectedImage) === "layered",
  );

  imageNodeLayeredFieldsEl.classList.toggle("hidden", !shouldShow);

  if (!shouldShow) {
    imageNodeLayeredHelpEl.textContent = "";
    imageNodeLayeredGroupListEl.innerHTML = "";
    return;
  }

  const layeredGroups = normalizeLayeredGroups(selectedImage.layeredGroups);
  const selectionMap = getImageNodeLayeredSelectionMap(node, selectedImage);

  imageNodeLayeredHelpEl.textContent = layeredGroups.length
    ? "Choose the explicit layered attributes this block should append after the image name. Leave a single-choice group empty to use the definition default."
    : "This layered image does not have any groups yet, so there is nothing extra to configure here.";

  if (!layeredGroups.length) {
    imageNodeLayeredGroupListEl.innerHTML = '<p class="image-definition-empty">No layered groups yet.</p>';
    return;
  }

  imageNodeLayeredGroupListEl.innerHTML = layeredGroups.map((group) => {
    const selectedAttributeIds = selectionMap[group.id] || [];
    const defaultAttribute = getLayeredGroupDefaultAttribute(group);
    const modeLabel = group.mode === "multiple" ? "Multiple" : "Single";
    const subtitle = defaultAttribute
      ? `Default: ${escapeHtml(defaultAttribute.name)}`
      : group.mode === "multiple"
        ? "Select any matching attributes."
        : "No default attribute.";

    const controlMarkup = group.mode === "multiple"
      ? `
        <div class="layered-inline-grid">
          ${group.attributes.map((attribute) => `
            <label class="character-checkbox">
              <input
                data-image-layered-group-id="${escapeHtml(group.id)}"
                data-image-layered-attribute-id="${escapeHtml(attribute.id)}"
                type="checkbox"
                ${selectedAttributeIds.includes(attribute.id) ? "checked" : ""}
              />
              <span>${escapeHtml(getLayeredAttributeInspectorLabel(attribute))}</span>
            </label>
          `).join("")}
        </div>
      `
      : `
        <label>
          Selected Attribute
          <select data-image-layered-group-id="${escapeHtml(group.id)}">
            <option value="">${defaultAttribute ? `Use default (${escapeHtml(defaultAttribute.name)})` : "No explicit attribute"}</option>
            ${group.attributes.map((attribute) => `
              <option value="${escapeHtml(attribute.id)}" ${selectedAttributeIds[0] === attribute.id ? "selected" : ""}>
                ${escapeHtml(getLayeredAttributeInspectorLabel(attribute))}
              </option>
            `).join("")}
          </select>
        </label>
      `;

    return `
      <div class="menu-choice-item layered-group-item">
        <div class="menu-choice-item-header">
          <strong>${escapeHtml(group.name)}</strong>
          <span>${escapeHtml(modeLabel)}</span>
        </div>
        <p class="image-definition-help">${subtitle}</p>
        ${controlMarkup}
      </div>
    `;
  }).join("");
}

function renderImageNodeLive2DInspector(node) {
  if (
    !imageNodeLive2DFieldsEl
    || !imageNodeLive2DHelpEl
    || !imageNodeLive2DMotionInput
    || !imageNodeLive2DExpressionInput
    || !imageNodeLive2DNonexclusiveListEl
    || !imageNodeLive2DRemovalListEl
    || !imageNodeLive2DStillInput
    || !imageNodeLive2DAdditionalInput
  ) {
    return;
  }

  const definition = getLive2DDefinitionById(node?.imageDefinitionId || "");
  const shouldShow = Boolean(
    node
    && node.type === "image"
    && getImageNodeMode(node) !== "hide"
    && definition,
  );

  imageNodeLive2DFieldsEl.classList.toggle("hidden", !shouldShow);

  if (!shouldShow) {
    imageNodeLive2DHelpEl.textContent = "";
    imageNodeLive2DMotionInput.innerHTML = '<option value="">No explicit motion</option>';
    imageNodeLive2DExpressionInput.innerHTML = '<option value="">Use default expression</option>';
    imageNodeLive2DNonexclusiveListEl.innerHTML = "";
    imageNodeLive2DRemovalListEl.innerHTML = "";
    imageNodeLive2DStillInput.checked = false;
    imageNodeLive2DAdditionalInput.value = "";
    return;
  }

  const live2dState = getImageNodeLive2DState(node);
  const motionOptions = getLive2DDefinitionMotionOptions(definition);
  const expressionOptions = getLive2DDefinitionExpressionOptions(definition);
  const nonexclusiveOptions = getLive2DDefinitionNonexclusiveOptions(definition);
  const aliasKeys = getLive2DDefinitionAliasKeys(definition);
  const aliasPreview = aliasKeys.slice(0, 4).join(", ");

  imageNodeLive2DHelpEl.textContent = aliasPreview
    ? `Choose the explicit motion and expression for this Live2D model. Additional Attributes can include aliases such as ${aliasPreview}.`
    : "Choose the explicit motion and expression for this Live2D model. Use Additional Attributes for aliases or custom tags.";

  populateInspectorSelectWithOptionalLegacy(
    imageNodeLive2DMotionInput,
    motionOptions,
    {
      placeholderText: "No explicit motion",
      value: live2dState.motion,
    },
  );
  populateInspectorSelectWithOptionalLegacy(
    imageNodeLive2DExpressionInput,
    expressionOptions,
    {
      placeholderText: "Use default expression",
      value: live2dState.expression,
    },
  );

  imageNodeLive2DNonexclusiveListEl.innerHTML = nonexclusiveOptions.length
    ? `
      <div class="menu-choice-item">
        <div class="layered-inline-grid">
          ${nonexclusiveOptions.map((attribute) => `
            <label class="character-checkbox">
              <input
                data-image-live2d-role="nonexclusive"
                data-image-live2d-attribute="${escapeHtml(attribute)}"
                type="checkbox"
                ${live2dState.nonexclusive.includes(attribute) ? "checked" : ""}
              />
              <span>${escapeHtml(attribute)}</span>
            </label>
          `).join("")}
        </div>
      </div>
    `
    : '<p class="image-definition-empty">No nonexclusive attributes defined for this model.</p>';

  imageNodeLive2DRemovalListEl.innerHTML = nonexclusiveOptions.length
    ? `
      <div class="menu-choice-item">
        <div class="layered-inline-grid">
          ${nonexclusiveOptions.map((attribute) => `
            <label class="character-checkbox">
              <input
                data-image-live2d-role="removal"
                data-image-live2d-attribute="${escapeHtml(attribute)}"
                type="checkbox"
                ${live2dState.removals.includes(attribute) ? "checked" : ""}
              />
              <span>-${escapeHtml(attribute)}</span>
            </label>
          `).join("")}
        </div>
      </div>
    `
    : '<p class="image-definition-empty">No removable nonexclusive attributes defined for this model.</p>';

  imageNodeLive2DStillInput.checked = live2dState.still;
  imageNodeLive2DAdditionalInput.value = live2dState.additionalAttributes;
  imageNodeLive2DAdditionalInput.placeholder = aliasPreview
    ? `e.g. ${aliasPreview}`
    : "e.g. smile_alias, costume_alt";
}

function getAudioNodeAction(node) {
  return ["play", "queue", "stop"].includes(node?.audioAction)
    ? node.audioAction
    : "play";
}

function getAudioNodeChannel(node) {
  if (Object.prototype.hasOwnProperty.call(audioChannelMeta, node?.audioChannel)) {
    return node.audioChannel;
  }

  const selectedAudio = getAudioDefinitionById(node?.audioDefinitionId || "");

  return selectedAudio?.channel || "music";
}

function getAudioNodeResource(node) {
  const selectedAudio = getAudioDefinitionById(node?.audioDefinitionId || "");

  if (selectedAudio) {
    return {
      kind: "definition",
      id: selectedAudio.id,
      name: (selectedAudio.name || "").trim(),
      sourcePath: (selectedAudio.sourcePath || "").trim(),
    };
  }

  const fallbackName = `${node?.audioName || ""}`.trim();

  if (fallbackName) {
    return {
      kind: "missing",
      id: "",
      name: fallbackName,
      sourcePath: "",
    };
  }

  return {
    kind: "empty",
    id: "",
    name: "",
    sourcePath: "",
  };
}

function formatAudioResourceReference(name) {
  const trimmedName = `${name || ""}`.trim();

  if (!trimmedName) {
    return "audio.audio_name";
  }

  if (trimmedName.startsWith("audio.")) {
    return trimmedName;
  }

  if (/[\\/]/.test(trimmedName) || /\.(ogg|mp3|wav|opus|m4a)$/i.test(trimmedName)) {
    return `"${escapeRenpyString(trimmedName)}"`;
  }

  return `audio.${trimmedName}`;
}

function buildAudioNodeResourceOptions(selectEl, node) {
  if (!selectEl) {
    return;
  }

  const resource = getAudioNodeResource(node);
  const hasMissingAudio = resource.kind === "missing" && resource.name;
  const missingValue = hasMissingAudio ? `__missing__:${resource.name}` : "";

  selectEl.innerHTML = "";

  const placeholderOption = document.createElement("option");
  placeholderOption.value = "";
  placeholderOption.textContent = state.audio.length
    ? "Select imported audio"
    : "No imported audio";
  selectEl.appendChild(placeholderOption);

  if (hasMissingAudio) {
    const missingOption = document.createElement("option");
    missingOption.value = missingValue;
    missingOption.textContent = `Legacy / Missing: ${resource.name}`;
    selectEl.appendChild(missingOption);
  }

  state.audio.forEach((audioDefinition) => {
    const option = document.createElement("option");
    option.value = audioDefinition.id;
    option.textContent = `${audioDefinition.name} · ${audioChannelMeta[audioDefinition.channel]?.label || "Audio"}`;
    selectEl.appendChild(option);
  });

  if (resource.kind === "definition" && resource.id) {
    selectEl.value = resource.id;
    return;
  }

  if (missingValue) {
    selectEl.value = missingValue;
    return;
  }

  selectEl.value = "";
}

function buildAudioSourcePathFromSelection(fileName, channel, currentValue = "") {
  const normalizedCurrent = `${currentValue}`.trim().replaceAll("\\", "/");

  if (normalizedCurrent.includes("/")) {
    const segments = normalizedCurrent.split("/");
    segments[segments.length - 1] = fileName;
    return segments.join("/");
  }

  const baseDirectoryByChannel = {
    music: "audio/music",
    sound: "audio/sfx",
    voice: "audio/voice",
  };

  return `${baseDirectoryByChannel[channel] || "audio"}/${fileName}`;
}

function getAnimationNodeTransition(node) {
  return node.animationTransition || "dissolve";
}

function getDialogueSpeaker(node) {
  const selectedCharacter = getCharacterById(node.dialogueCharacterId);

  if (selectedCharacter) {
    return {
      kind: "character",
      id: selectedCharacter.id,
      name: selectedCharacter.name || selectedCharacter.id,
    };
  }

  if (node.dialogueCharacterId) {
    return {
      kind: "character",
      id: node.dialogueCharacterId,
      name: node.dialogueSpeaker || node.dialogueCharacterId,
    };
  }

  return {
    kind: "narrator",
    id: null,
    name: "Narrator",
  };
}

function buildDialogueCharacterOptions(selectEl, node) {
  if (!selectEl) {
    return;
  }

  const speaker = getDialogueSpeaker(node);
  const hasMissingCharacter = Boolean(node?.dialogueCharacterId) && !getCharacterById(node.dialogueCharacterId);
  const missingValue = hasMissingCharacter ? `__missing__:${node.dialogueCharacterId}` : "";

  selectEl.innerHTML = "";

  const narratorOption = document.createElement("option");
  narratorOption.value = "";
  narratorOption.textContent = "Narrator";
  selectEl.appendChild(narratorOption);

  if (hasMissingCharacter) {
    const missingOption = document.createElement("option");
    missingOption.value = missingValue;
    missingOption.textContent = `Legacy / Missing: ${speaker.name}`;
    selectEl.appendChild(missingOption);
  }

  state.characters.forEach((character) => {
    const option = document.createElement("option");
    option.value = character.id;
    option.textContent = `${character.name} · ${character.id}`;
    selectEl.appendChild(option);
  });

  if (speaker.kind === "narrator") {
    selectEl.value = "";
    return;
  }

  if (getCharacterById(speaker.id)) {
    selectEl.value = speaker.id;
    return;
  }

  if (missingValue) {
    selectEl.value = missingValue;
    return;
  }

  selectEl.value = "";
}

function isDialogueTextField(field) {
  return field === dialogueNodeContentInput || (
    field?.dataset?.dialogueLineField === "text"
  );
}

function updateDialogueTextTarget(field) {
  if (!isDialogueTextField(field)) {
    return;
  }

  if (field === dialogueNodeContentInput) {
    dialogueTextTarget = {
      kind: "content",
      lineId: null,
    };
    return;
  }

  dialogueTextTarget = {
    kind: "line",
    lineId: field.dataset.dialogueLineId || null,
  };
}

function getSelectedDialogueNode() {
  const graph = getActiveGraph();
  const selectedNode = graph?.nodes.find((node) => node.id === graph.selectedNodeId);

  return selectedNode?.type === "dialogue" ? selectedNode : null;
}

function resolveDialogueTextField() {
  const activeElement = document.activeElement;

  if (isDialogueTextField(activeElement)) {
    updateDialogueTextTarget(activeElement);
    return activeElement;
  }

  if (dialogueTextTarget.kind === "line" && dialogueTextTarget.lineId) {
    const lineInput = dialogueVoiceLineListEl?.querySelector(
      `input[data-dialogue-line-id="${CSS.escape(dialogueTextTarget.lineId)}"][data-dialogue-line-field="text"]`,
    );

    if (lineInput) {
      return lineInput;
    }
  }

  const selectedNode = getSelectedDialogueNode();

  if (selectedNode && getDialogueVoiceEnabled(selectedNode)) {
    return dialogueVoiceLineListEl?.querySelector('input[data-dialogue-line-field="text"]') || null;
  }

  return dialogueNodeContentInput;
}

function applyDialogueTextToolSpec(field, spec) {
  if (!field || !spec) {
    return;
  }

  field.focus();
  updateDialogueTextTarget(field);

  const currentValue = `${field.value || ""}`;
  const start = typeof field.selectionStart === "number" ? field.selectionStart : currentValue.length;
  const end = typeof field.selectionEnd === "number" ? field.selectionEnd : start;
  const selectedText = currentValue.slice(start, end);
  let nextValue = currentValue;
  let selectionStart = start;
  let selectionEnd = start;

  if (spec.mode === "wrap") {
    const innerText = selectedText || spec.placeholder || "";
    const insertedText = `${spec.before || ""}${innerText}${spec.after || ""}`;
    nextValue = `${currentValue.slice(0, start)}${insertedText}${currentValue.slice(end)}`;
    selectionStart = start + `${spec.before || ""}`.length;
    selectionEnd = selectionStart + innerText.length;
  } else {
    const insertedText = spec.text || "";
    nextValue = `${currentValue.slice(0, start)}${insertedText}${currentValue.slice(end)}`;
    selectionStart = start + (spec.selectionStartOffset ?? insertedText.length);
    selectionEnd = start + (spec.selectionEndOffset ?? insertedText.length);
  }

  field.value = nextValue;
  field.setSelectionRange(selectionStart, selectionEnd);
  field.dispatchEvent(new Event("input", { bubbles: true }));

  if (spec.status) {
    setStatus(spec.status);
  }
}

function insertDialogueTextTool(toolId) {
  const spec = dialogueTextToolSpecs[toolId];
  const selectedNode = getSelectedDialogueNode();

  if (!spec || !selectedNode) {
    return;
  }

  let field = resolveDialogueTextField();

  if (!field && getDialogueVoiceEnabled(selectedNode)) {
    const nextLine = createDialogueVoiceLine(getDialogueVoiceLines(selectedNode).length + 1);

    dialogueTextTarget = {
      kind: "line",
      lineId: nextLine.id,
    };

    updateSelectedDialogueNode((node) => ({
      ...node,
      dialogueLines: [...getDialogueVoiceLines(node), nextLine],
    }));

    window.requestAnimationFrame(() => {
      const nextField = resolveDialogueTextField();

      if (nextField) {
        applyDialogueTextToolSpec(nextField, spec);
      }
    });
    return;
  }

  if (!field) {
    setStatus("Select dialogue content or create a voice line first.");
    return;
  }

  applyDialogueTextToolSpec(field, spec);
}

function isFlowNode(node) {
  return node?.type === "flow" || node?.type === "jump";
}

function getFlowNodeMode(node) {
  if (node?.type === "jump") {
    return "jump";
  }

  if (node?.type !== "flow") {
    return "";
  }

  return ["jump", "call", "return"].includes(node.flowMode)
    ? node.flowMode
    : "jump";
}

function getFlowNodeTarget(node) {
  const targetGraph = getGraphById(node?.flowTargetGraphId || "");

  if (targetGraph) {
    return {
      kind: "graph",
      graphId: targetGraph.id,
      label: targetGraph.label,
    };
  }

  const fallbackLabel = `${node?.flowTargetLabel || node?.content || ""}`.trim();

  return {
    kind: fallbackLabel ? "missing" : "empty",
    graphId: "",
    label: fallbackLabel,
  };
}

function getAvailableGuiScreens() {
  const screenMap = new Map();

  normalizeGuiState(state.gui).screens.forEach((screen) => {
    const screenName = `${screen?.name || ""}`.trim();

    if (!screenName || screenMap.has(screenName)) {
      return;
    }

    screenMap.set(screenName, screen);
  });

  return [...screenMap.entries()]
    .sort((left, right) => left[0].localeCompare(right[0]))
    .map((entry) => entry[1]);
}

function getGuiScreenByName(screenName) {
  const normalizedName = `${screenName || ""}`.trim();

  if (!normalizedName) {
    return null;
  }

  return getAvailableGuiScreens().find((screen) => `${screen?.name || ""}`.trim() === normalizedName) || null;
}

function isSpecialGuiScreenName(screenName) {
  return autoManagedGuiScreenNames.has(`${screenName || ""}`.trim());
}

function getScreenNodeMode(node) {
  return ["show", "call", "hide"].includes(node?.screenMode)
    ? node.screenMode
    : "show";
}

function getScreenNodeName(node) {
  return `${node?.screenName || node?.content || ""}`.trim();
}

function getAchievementNodeAction(node) {
  return ["grant", "progress", "clear", "sync"].includes(node?.achievementAction)
    ? node.achievementAction
    : "grant";
}

function getAchievementNodeName(node) {
  const achievement = getAchievementById(node?.achievementId || "");

  return achievement
    ? getAchievementRegisterName(achievement)
    : `${node?.achievementName || ""}`.trim();
}

function buildAchievementNodeOptions(selectEl, node) {
  if (!selectEl) {
    return;
  }

  const achievementOptions = buildAchievementSelectionOptions({
    achievementId: node?.achievementId || "",
    achievementName: node?.achievementName || "",
  }, {
    emptyLabel: state.achievements.length ? "Select an achievement..." : "No achievements available",
  });

  selectEl.innerHTML = achievementOptions.options;
  selectEl.value = achievementOptions.value;
}

function buildScreenNodeSuggestionOptions(datalistEl, currentName = "") {
  if (!datalistEl) {
    return;
  }

  const suggestionNames = new Set(
    getAvailableGuiScreens()
      .map((screen) => `${screen?.name || ""}`.trim())
      .filter(Boolean),
  );

  autoManagedGuiScreenNames.forEach((screenName) => {
    suggestionNames.add(screenName);
  });

  const normalizedCurrentName = `${currentName || ""}`.trim();

  if (normalizedCurrentName) {
    suggestionNames.add(normalizedCurrentName);
  }

  datalistEl.innerHTML = [...suggestionNames]
    .sort((left, right) => left.localeCompare(right))
    .map((screenName) => `<option value="${escapeHtml(screenName)}"></option>`)
    .join("");
}

function buildFlowTargetOptions(selectEl, node) {
  if (!selectEl) {
    return;
  }

  selectEl.innerHTML = "";

  const placeholderOption = document.createElement("option");
  placeholderOption.value = "";
  placeholderOption.textContent = state.graphs.length ? "Select a label..." : "No labels available";
  selectEl.appendChild(placeholderOption);

  const target = getFlowNodeTarget(node);

  if (target.kind === "missing" && target.label) {
    const missingOption = document.createElement("option");
    missingOption.value = `__missing__:${target.label}`;
    missingOption.textContent = `${target.label} · Missing`;
    selectEl.appendChild(missingOption);
  }

  state.graphs.forEach((graph) => {
    const option = document.createElement("option");
    option.value = graph.id;
    option.textContent = graph.label;
    selectEl.appendChild(option);
  });

  if (target.kind === "graph" && target.graphId) {
    selectEl.value = target.graphId;
    return;
  }

  if (target.kind === "missing" && target.label) {
    selectEl.value = `__missing__:${target.label}`;
    return;
  }

  selectEl.value = "";
}

function nodeAllowsIncomingConnections(node) {
  return node?.type !== "start";
}

function nodeAllowsOutgoingConnections(node) {
  if (!node) {
    return false;
  }

  if (node.type === "start") {
    return true;
  }

  if (isFlowNode(node)) {
    return getFlowNodeMode(node) === "call";
  }

  return true;
}

function getMenuChoices(node) {
  return normalizeMenuChoices(node?.menuChoices);
}

function getConditionClauses(node) {
  return normalizeConditionClauses(node?.conditionClauses);
}

function getDefaultOutputPortId(node) {
  if (node?.type === "menu") {
    const firstChoice = getMenuChoices(node)[0];
    return firstChoice ? getMenuChoicePortId(firstChoice.id) : "output";
  }

  if (node?.type === "condition") {
    const firstClause = getConditionClauses(node)[0];
    return firstClause ? getConditionClausePortId(firstClause.id) : "output";
  }

  return "output";
}

function normalizeOutputPortId(node, fromPortId) {
  const normalizedPortId = fromPortId || getDefaultOutputPortId(node);

  if (node?.type !== "menu") {
    if (node?.type === "condition") {
      const validPortIds = new Set(
        getConditionClauses(node).map((clause) => getConditionClausePortId(clause.id)),
      );

      return validPortIds.has(normalizedPortId)
        ? normalizedPortId
        : getDefaultOutputPortId(node);
    }

    return "output";
  }

  const validPortIds = new Set(
    getMenuChoices(node).map((choice) => getMenuChoicePortId(choice.id)),
  );

  return validPortIds.has(normalizedPortId)
    ? normalizedPortId
    : getDefaultOutputPortId(node);
}

function renderDialogueVoiceLineList(node) {
  if (!dialogueVoiceLineListEl) {
    return;
  }

  const dialogueLines = getDialogueVoiceLines(node);

  if (!dialogueLines.length) {
    dialogueVoiceLineListEl.innerHTML = `
      <p class="panel-empty-state">No voice lines yet. Click New to add one.</p>
    `;
    return;
  }

  dialogueVoiceLineListEl.innerHTML = dialogueLines.map((line, index) => `
    <div class="menu-choice-item">
      <div class="menu-choice-item-header">
        <span>Line ${index + 1}</span>
        <button
          class="danger-button menu-choice-remove-button"
          type="button"
          data-remove-dialogue-line-id="${escapeHtml(line.id)}"
        >
          Remove
        </button>
      </div>
      <label class="dialogue-voice-line-field">
        <span>Line</span>
        <input
          type="text"
          value="${escapeHtml(line.text || "")}"
          placeholder="One spoken line per item..."
          data-dialogue-line-id="${escapeHtml(line.id)}"
          data-dialogue-line-field="text"
        />
      </label>
      <label class="dialogue-voice-line-field">
        <span>Voice</span>
        <select
          data-dialogue-line-id="${escapeHtml(line.id)}"
          data-dialogue-line-field="voiceAudioId"
        ></select>
      </label>
    </div>
  `).join("");

  dialogueLines.forEach((line) => {
    const selectEl = dialogueVoiceLineListEl.querySelector(
      `select[data-dialogue-line-id="${CSS.escape(line.id)}"][data-dialogue-line-field="voiceAudioId"]`,
    );

    buildDialogueVoiceLineResourceOptions(selectEl, node, line);
  });
}

function syncDialogueInspectorVoiceMode(dialogueHasVoice) {
  if (dialogueVoiceLinesGroupEl) {
    dialogueVoiceLinesGroupEl.classList.toggle("hidden", !dialogueHasVoice);
    dialogueVoiceLinesGroupEl.hidden = !dialogueHasVoice;
  }

  if (dialogueContentFieldEl) {
    dialogueContentFieldEl.classList.toggle("hidden", dialogueHasVoice);
    dialogueContentFieldEl.hidden = dialogueHasVoice;
  }
}

function renderMenuChoiceList(node) {
  if (!menuChoiceListEl) {
    return;
  }

  const choices = getMenuChoices(node);

  menuChoiceListEl.innerHTML = choices.map((choice, index) => `
    <div class="menu-choice-item">
      <div class="menu-choice-item-header">
        <span>Choice ${index + 1}</span>
        <button
          class="danger-button menu-choice-remove-button"
          type="button"
          data-remove-menu-choice-id="${escapeHtml(choice.id)}"
        >
          Remove
        </button>
      </div>
      <input
        type="text"
        value="${escapeHtml(choice.text)}"
        placeholder="e.g. Go left"
        data-menu-choice-id="${escapeHtml(choice.id)}"
        data-menu-choice-field="text"
      />
      <select
        data-menu-choice-id="${escapeHtml(choice.id)}"
        data-menu-choice-field="conditionMode"
      >
        <option value="none" ${choice.conditionMode === "none" ? "selected" : ""}>No Condition</option>
        <option value="simple" ${choice.conditionMode === "simple" ? "selected" : ""}>Default Variable</option>
        <option value="achievement" ${choice.conditionMode === "achievement" ? "selected" : ""}>Achievement</option>
        <option value="expression" ${choice.conditionMode === "expression" ? "selected" : ""}>Expression</option>
      </select>
      ${choice.conditionMode === "simple"
        ? (() => {
          const variableOptions = buildConditionalVariableOptions(choice);
          const comparisonOperators = [
            ["is_true", "is True"],
            ["is_false", "is False"],
            ["==", "=="],
            ["!=", "!="],
            [">", ">"],
            [">=", ">="],
            ["<", "<"],
            ["<=", "<="],
            ["in", "in"],
            ["not in", "not in"],
          ];
          const needsValue = !["is_true", "is_false"].includes(choice.conditionOperator);

          return `
            <select
              data-menu-choice-id="${escapeHtml(choice.id)}"
              data-menu-choice-field="conditionVariableId"
            >
              ${variableOptions.options}
            </select>
            <select
              data-menu-choice-id="${escapeHtml(choice.id)}"
              data-menu-choice-field="conditionOperator"
            >
              ${comparisonOperators.map(([value, label]) => `
                <option value="${escapeHtml(value)}" ${choice.conditionOperator === value ? "selected" : ""}>${escapeHtml(label)}</option>
              `).join("")}
            </select>
            ${needsValue
              ? `
                <input
                  type="text"
                  value="${escapeHtml(choice.conditionValue || "")}"
                  placeholder="e.g. 3"
                  data-menu-choice-id="${escapeHtml(choice.id)}"
                  data-menu-choice-field="conditionValue"
                />
              `
              : ""}
          `;
        })()
        : choice.conditionMode === "achievement"
          ? (() => {
            const achievementOptions = buildConditionalAchievementOptions(choice);

            return `
              <select
                data-menu-choice-id="${escapeHtml(choice.id)}"
                data-menu-choice-field="conditionAchievementId"
              >
                ${achievementOptions.options}
              </select>
              <select
                data-menu-choice-id="${escapeHtml(choice.id)}"
                data-menu-choice-field="conditionAchievementState"
              >
                <option value="has" ${choice.conditionAchievementState !== "not_has" ? "selected" : ""}>Has Achievement</option>
                <option value="not_has" ${choice.conditionAchievementState === "not_has" ? "selected" : ""}>Does Not Have Achievement</option>
              </select>
            `;
          })()
        : choice.conditionMode === "expression"
          ? `
            <input
              type="text"
              value="${escapeHtml(choice.condition || "")}"
              placeholder="e.g. points > 3 and route_open"
              data-menu-choice-id="${escapeHtml(choice.id)}"
              data-menu-choice-field="condition"
            />
          `
          : ""}
    </div>
  `).join("");

  choices.forEach((choice) => {
    const selectEl = menuChoiceListEl.querySelector(
      `select[data-menu-choice-id="${CSS.escape(choice.id)}"][data-menu-choice-field="conditionVariableId"]`,
    );

    if (selectEl) {
      const variableOptions = buildConditionalVariableOptions(choice);
      selectEl.value = variableOptions.value;
    }

    const achievementSelectEl = menuChoiceListEl.querySelector(
      `select[data-menu-choice-id="${CSS.escape(choice.id)}"][data-menu-choice-field="conditionAchievementId"]`,
    );

    if (achievementSelectEl) {
      const achievementOptions = buildConditionalAchievementOptions(choice);
      achievementSelectEl.innerHTML = achievementOptions.options;
      achievementSelectEl.value = achievementOptions.value;
    }
  });
}

function renderConditionClauseList(node) {
  if (!conditionClauseListEl) {
    return;
  }

  const clauses = getConditionClauses(node);
  const hasElseClause = clauses.some((clause) => clause.kind === "else");

  conditionToggleElseButton.textContent = hasElseClause ? "Remove Else" : "Add Else";

  conditionClauseListEl.innerHTML = clauses.map((clause, index) => `
    <div class="menu-choice-item">
      <div class="menu-choice-item-header">
        <span>${clause.kind === "if" ? "If" : clause.kind === "elif" ? `Elif ${index}` : "Else"}</span>
        ${clause.kind === "elif"
          ? `
            <button
              class="danger-button menu-choice-remove-button"
              type="button"
              data-remove-condition-clause-id="${escapeHtml(clause.id)}"
            >
              Remove
            </button>
          `
          : ""}
      </div>
      ${clause.kind !== "else"
        ? `
          <select
            data-condition-clause-id="${escapeHtml(clause.id)}"
            data-condition-clause-field="conditionMode"
          >
            <option value="simple" ${clause.conditionMode === "simple" ? "selected" : ""}>Default Variable</option>
            <option value="achievement" ${clause.conditionMode === "achievement" ? "selected" : ""}>Achievement</option>
            <option value="expression" ${clause.conditionMode === "expression" ? "selected" : ""}>Expression</option>
          </select>
          ${clause.conditionMode === "simple"
            ? (() => {
              const variableOptions = buildConditionalVariableOptions(clause);
              const comparisonOperators = [
                ["is_true", "is True"],
                ["is_false", "is False"],
                ["==", "=="],
                ["!=", "!="],
                [">", ">"],
                [">=", ">="],
                ["<", "<"],
                ["<=", "<="],
                ["in", "in"],
                ["not in", "not in"],
              ];
              const needsValue = !["is_true", "is_false"].includes(clause.conditionOperator);

              return `
                <select
                  data-condition-clause-id="${escapeHtml(clause.id)}"
                  data-condition-clause-field="conditionVariableId"
                >
                  ${variableOptions.options}
                </select>
                <select
                  data-condition-clause-id="${escapeHtml(clause.id)}"
                  data-condition-clause-field="conditionOperator"
                >
                  ${comparisonOperators.map(([value, label]) => `
                    <option value="${escapeHtml(value)}" ${clause.conditionOperator === value ? "selected" : ""}>${escapeHtml(label)}</option>
                  `).join("")}
                </select>
                ${needsValue
                  ? `
                    <input
                      type="text"
                      value="${escapeHtml(clause.conditionValue || "")}"
                      placeholder="e.g. 3"
                      data-condition-clause-id="${escapeHtml(clause.id)}"
                      data-condition-clause-field="conditionValue"
                    />
                  `
                  : ""}
              `;
            })()
            : clause.conditionMode === "achievement"
              ? (() => {
                const achievementOptions = buildConditionalAchievementOptions(clause);

                return `
                  <select
                    data-condition-clause-id="${escapeHtml(clause.id)}"
                    data-condition-clause-field="conditionAchievementId"
                  >
                    ${achievementOptions.options}
                  </select>
                  <select
                    data-condition-clause-id="${escapeHtml(clause.id)}"
                    data-condition-clause-field="conditionAchievementState"
                  >
                    <option value="has" ${clause.conditionAchievementState !== "not_has" ? "selected" : ""}>Has Achievement</option>
                    <option value="not_has" ${clause.conditionAchievementState === "not_has" ? "selected" : ""}>Does Not Have Achievement</option>
                  </select>
                `;
              })()
            : `
              <input
                type="text"
                value="${escapeHtml(clause.condition || "")}"
                placeholder="e.g. points > 3 and route_open"
                data-condition-clause-id="${escapeHtml(clause.id)}"
                data-condition-clause-field="condition"
              />
            `}
        `
        : `<p class="panel-empty-state">Fallback branch used when no earlier condition matches.</p>`}
    </div>
  `).join("");

  clauses.forEach((clause) => {
    const selectEl = conditionClauseListEl.querySelector(
      `select[data-condition-clause-id="${CSS.escape(clause.id)}"][data-condition-clause-field="conditionVariableId"]`,
    );

    if (selectEl) {
      const variableOptions = buildConditionalVariableOptions(clause);
      selectEl.value = variableOptions.value;
    }

    const achievementSelectEl = conditionClauseListEl.querySelector(
      `select[data-condition-clause-id="${CSS.escape(clause.id)}"][data-condition-clause-field="conditionAchievementId"]`,
    );

    if (achievementSelectEl) {
      const achievementOptions = buildConditionalAchievementOptions(clause);
      achievementSelectEl.innerHTML = achievementOptions.options;
      achievementSelectEl.value = achievementOptions.value;
    }
  });
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

function buildMovieSourcePathFromSelection(fileName, currentValue = "") {
  const normalizedCurrent = `${currentValue}`.trim().replaceAll("\\", "/");

  if (normalizedCurrent.includes("/")) {
    const segments = normalizedCurrent.split("/");
    segments[segments.length - 1] = fileName;
    return segments.join("/");
  }

  return `movies/${fileName}`;
}

function buildLive2DModelPathFromSelection(fileName, currentValue = "") {
  const normalizedCurrent = `${currentValue}`.trim().replaceAll("\\", "/");

  if (normalizedCurrent.includes("/")) {
    const segments = normalizedCurrent.split("/");
    segments[segments.length - 1] = fileName;
    return segments.join("/");
  }

  return `Resources/${fileName}`;
}

function shouldMatchExistingProjectAsset(currentValue = "") {
  return !`${currentValue}`.trim().replaceAll("\\", "/").includes("/");
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(`${reader.result || ""}`);
    reader.onerror = () => reject(new Error(`Unable to read "${file?.name || "selected file"}".`));
    reader.readAsDataURL(file);
  });
}

async function encodeFileAsBase64(file) {
  const dataUrl = await readFileAsDataUrl(file);
  const commaIndex = dataUrl.indexOf(",");

  if (commaIndex === -1) {
    throw new Error(`Unable to encode "${file?.name || "selected file"}" for project import.`);
  }

  return dataUrl.slice(commaIndex + 1);
}

async function importSelectedAssetFile(file, suggestedPath, currentValue = "") {
  const normalizedSuggestedPath = `${suggestedPath || ""}`.trim().replaceAll("\\", "/");

  if (!hasBridge) {
    return {
      path: normalizedSuggestedPath,
      imported: false,
      matchedExisting: false,
      overwrote: false,
      localOnly: true,
    };
  }

  const contentBase64 = await encodeFileAsBase64(file);
  let matchExisting = shouldMatchExistingProjectAsset(currentValue);
  let allowOverwrite = false;

  while (true) {
    try {
      return await callBridge("import_asset_file", {
        path: normalizedSuggestedPath,
        fileName: file.name,
        contentBase64,
        matchExisting,
        allowOverwrite,
      });
    } catch (error) {
      const bridgeData = error?.bridgeData || {};

      if (error?.status === 409 && bridgeData?.conflictType === "ambiguous_existing_asset") {
        const matches = Array.isArray(bridgeData.matches) ? bridgeData.matches.filter(Boolean) : [];
        const confirmed = window.confirm(
          t("asset.conflict.multiple", {
            file: file.name,
            matches: matches.join("\n"),
            path: normalizedSuggestedPath,
          }),
        );

        if (!confirmed) {
          return {
            canceled: true,
            conflictType: "ambiguous_existing_asset",
          };
        }

        matchExisting = false;
        continue;
      }

      if (error?.status === 409 && bridgeData?.conflictType === "overwrite_asset") {
        const targetPath = `${bridgeData.path || normalizedSuggestedPath}`.trim();
        const confirmed = window.confirm(
          t("asset.conflict.overwrite", { path: targetPath }),
        );

        if (!confirmed) {
          return {
            canceled: true,
            conflictType: "overwrite_asset",
            path: targetPath,
          };
        }

        allowOverwrite = true;
        matchExisting = false;
        continue;
      }

      throw error;
    }
  }
}

function formatImportedAssetStatus(resourceLabel, fileName, result) {
  const resolvedPath = `${result?.path || ""}`.trim();

  if (result?.canceled) {
    if (result.conflictType === "ambiguous_existing_asset") {
      return t("asset.status.keep_multiple", { resource: resourceLabel, file: fileName });
    }

    if (result.conflictType === "overwrite_asset") {
      return t("asset.status.keep_existing", { resource: resourceLabel, path: resolvedPath || "target file" });
    }

    return t("asset.status.keep_current", { resource: resourceLabel });
  }

  if (result?.matchedExisting && resolvedPath) {
    return t("asset.status.match", { resource: resourceLabel, path: resolvedPath, file: fileName });
  }

  if (result?.imported && resolvedPath) {
    return result.overwrote
      ? t("asset.status.updated", { resource: resourceLabel, path: resolvedPath, file: fileName })
      : t("asset.status.imported", { resource: resourceLabel, path: resolvedPath, file: fileName });
  }

  if (result?.localOnly && resolvedPath) {
    return t("asset.status.local_only", { resource: resourceLabel, file: fileName });
  }

  if (resolvedPath) {
    return t("asset.status.set", { resource: resourceLabel, path: resolvedPath });
  }

  return t("asset.status.selected", { resource: resourceLabel, file: fileName });
}

function getAssetImportLevel(result) {
  if (result?.canceled) {
    return "warn";
  }

  if (result?.localOnly) {
    return "warn";
  }

  if (result?.matchedExisting || result?.imported) {
    return "good";
  }

  return "warn";
}

function getImageDefinitionType(image) {
  return Object.prototype.hasOwnProperty.call(imageDefinitionTypeMeta, image?.definitionType)
    ? image.definitionType
    : "static";
}

function getImageDefinitionTypeLabel(image) {
  return tt(imageDefinitionTypeMeta[getImageDefinitionType(image)]?.label || imageDefinitionTypeMeta.static.label);
}

function getVisualResourceKind(resource) {
  return resource?.definitionKind === "live2d" ? "live2d" : "image";
}

function getVisualResourceTypeLabel(resource) {
  return getVisualResourceKind(resource) === "live2d"
    ? "Live2D"
    : getImageDefinitionTypeLabel(resource);
}

function splitLive2DList(value) {
  return `${value || ""}`
    .split(/\r?\n|,/)
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function parseLive2DAliases(value) {
  return `${value || ""}`
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => line.match(/^(.+?)\s*(?:=|:)\s*(.+)$/))
    .filter(Boolean)
    .map((match) => [match[1].trim(), match[2].trim()])
    .filter(([aliasKey, aliasValue]) => aliasKey && aliasValue);
}

function formatLive2DStringListCode(values) {
  return `[${values.map((value) => formatRenpyQuotedString(value)).join(", ")}]`;
}

function formatLive2DAliasCode(aliases) {
  return `{ ${aliases.map(([key, value]) => `${formatRenpyQuotedString(key)}: ${formatRenpyQuotedString(value)}`).join(", ")} }`;
}

function getLive2DDefinitionSummary(definition) {
  const motionCount = splitLive2DList(definition?.motions).length;
  const expressionCount = splitLive2DList(definition?.expressions).length;

  if (!motionCount && !expressionCount) {
    return `Live2D · ${definition?.modelPath || "No model path yet"}`;
  }

  return `Live2D · ${motionCount} ${motionCount === 1 ? "motion" : "motions"} · ${expressionCount} ${expressionCount === 1 ? "expression" : "expressions"}`;
}

function formatLive2DDefinitionCode(definition) {
  if (!definition) {
    return "";
  }

  const safeName = `${definition.name || ""}`.trim() || "live2d_model";
  const modelPath = `${definition.modelPath || ""}`.trim() || "Resources/Hiyori";
  const constructorArgs = [formatRenpyQuotedString(modelPath)];
  const motionList = splitLive2DList(definition.motions);
  const expressionList = splitLive2DList(definition.expressions);
  const nonexclusiveList = splitLive2DList(definition.nonexclusive);
  const aliases = parseLive2DAliases(definition.aliases);

  if (`${definition.zoom || ""}`.trim()) {
    constructorArgs.push(`zoom=${definition.zoom.trim()}`);
  }

  if (`${definition.top || ""}`.trim() && definition.top.trim() !== live2dDefinitionFieldDefaults.top) {
    constructorArgs.push(`top=${definition.top.trim()}`);
  }

  if (`${definition.base || ""}`.trim() && definition.base.trim() !== live2dDefinitionFieldDefaults.base) {
    constructorArgs.push(`base=${definition.base.trim()}`);
  }

  if (`${definition.height || ""}`.trim() && definition.height.trim() !== live2dDefinitionFieldDefaults.height) {
    constructorArgs.push(`height=${definition.height.trim()}`);
  }

  if (definition.loop) {
    constructorArgs.push("loop=True");
  }

  if (definition.fadeMode === "true") {
    constructorArgs.push("fade=True");
  } else if (definition.fadeMode === "false") {
    constructorArgs.push("fade=False");
  }

  if (`${definition.seamless || ""}`.trim()) {
    constructorArgs.push(`seamless=${definition.seamless.trim()}`);
  }

  if (`${definition.defaultFade || ""}`.trim()) {
    constructorArgs.push(`default_fade=${definition.defaultFade.trim()}`);
  }

  if (nonexclusiveList.length) {
    constructorArgs.push(`nonexclusive=${formatLive2DStringListCode(nonexclusiveList)}`);
  }

  if (aliases.length) {
    constructorArgs.push(`alias=${formatLive2DAliasCode(aliases)}`);
  }

  const lines = [
    "define config.gl2 = True",
    "",
    `image ${safeName} = Live2D(`,
  ];

  constructorArgs.forEach((arg, index) => {
    lines.push(`    ${arg}${index < constructorArgs.length - 1 ? "," : ""}`);
  });
  lines.push(")");

  if (motionList.length || expressionList.length) {
    lines.push("");
  }

  if (motionList.length) {
    lines.push(`# Motions: ${motionList.join(", ")}`);
  }

  if (expressionList.length) {
    lines.push(`# Expressions: ${expressionList.join(", ")}`);
  }

  return lines.join("\n");
}

function formatRenpyQuotedString(value) {
  const normalizedValue = `${value || ""}`.trim();

  if (!normalizedValue) {
    return "\"\"";
  }

  const isQuotedString = (
    (normalizedValue.startsWith("\"") && normalizedValue.endsWith("\""))
    || (normalizedValue.startsWith("'") && normalizedValue.endsWith("'"))
  );
  const unquotedValue = isQuotedString
    ? normalizedValue.slice(1, -1)
    : normalizedValue;

  return `"${escapeRenpyString(unquotedValue)}"`;
}

function parseRenpyQuotedString(value) {
  const normalizedValue = `${value || ""}`.trim();
  const isQuotedString = (
    (normalizedValue.startsWith("\"") && normalizedValue.endsWith("\""))
    || (normalizedValue.startsWith("'") && normalizedValue.endsWith("'"))
  );

  if (!isQuotedString) {
    return null;
  }

  return normalizedValue
    .slice(1, -1)
    .replace(/\\\\/g, "\\")
    .replace(/\\"/g, "\"")
    .replace(/\\'/g, "'")
    .replace(/\\n/g, "\n");
}

function parseSimpleMatrixColorExpression(expression) {
  const normalizedExpression = `${expression || ""}`.trim();

  if (!normalizedExpression) {
    return { mode: "none" };
  }

  if (/^IdentityMatrix\(\s*\)$/.test(normalizedExpression)) {
    return { mode: "identity" };
  }

  const tintMatch = normalizedExpression.match(/^TintMatrix\(\s*(.+)\s*\)$/);

  if (tintMatch) {
    const tintColor = parseRenpyQuotedString(tintMatch[1]);

    if (tintColor !== null) {
      return {
        mode: "tint",
        tintColor,
      };
    }
  }

  const saturationMatch = normalizedExpression.match(/^SaturationMatrix\(\s*([^,()]+)\s*\)$/);

  if (saturationMatch) {
    return {
      mode: "saturation",
      saturationValue: saturationMatch[1].trim(),
    };
  }

  const sepiaMatch = normalizedExpression.match(/^SepiaMatrix\(\s*(.+)\s*\)$/);

  if (sepiaMatch) {
    const sepiaTint = parseRenpyQuotedString(sepiaMatch[1]);

    if (sepiaTint !== null) {
      return {
        mode: "sepia",
        sepiaTint,
      };
    }
  }

  const invertMatch = normalizedExpression.match(/^InvertMatrix\(\s*([^,()]+)\s*\)$/);

  if (invertMatch) {
    return {
      mode: "invert",
      invertValue: invertMatch[1].trim(),
    };
  }

  const brightnessMatch = normalizedExpression.match(/^BrightnessMatrix\(\s*([^,()]+)\s*\)$/);

  if (brightnessMatch) {
    return {
      mode: "brightness",
      brightnessValue: brightnessMatch[1].trim(),
    };
  }

  const hueMatch = normalizedExpression.match(/^HueMatrix\(\s*([^,()]+)\s*\)$/);

  if (hueMatch) {
    return {
      mode: "hue",
      hueValue: hueMatch[1].trim(),
    };
  }

  const opacityMatch = normalizedExpression.match(/^OpacityMatrix\(\s*([^,()]+)\s*\)$/);

  if (opacityMatch) {
    return {
      mode: "opacity",
      opacityValue: opacityMatch[1].trim(),
    };
  }

  const colorizeMatch = normalizedExpression.match(/^ColorizeMatrix\(\s*(.+?)\s*,\s*(.+?)\s*\)$/);

  if (colorizeMatch) {
    const colorizeBlack = parseRenpyQuotedString(colorizeMatch[1]);
    const colorizeWhite = parseRenpyQuotedString(colorizeMatch[2]);

    if (colorizeBlack !== null && colorizeWhite !== null) {
      return {
        mode: "colorize",
        colorizeBlack,
        colorizeWhite,
      };
    }
  }

  return { mode: "custom" };
}

function getImageDefinitionSummary(image) {
  const definitionType = getImageDefinitionType(image);
  const sideImagePrefix = image?.isSideImage ? `${tt("Side Image")} · ` : "";

  if (definitionType === "layered") {
    const alwaysCount = normalizeLayeredAlwaysLayers(image.layeredAlwaysLayers).length;
    const groupCount = normalizeLayeredGroups(image.layeredGroups).length;
    return `${tt("Layered")} · ${groupCount} ${tt(groupCount === 1 ? "group" : "groups")} · ${alwaysCount} ${tt("always")}`;
  }

  if (definitionType === "movie") {
    return `${sideImagePrefix}${tt("Movie")} · ${image.moviePlay || tt("No play path yet")}`;
  }

  if (definitionType === "solid") {
    return `${sideImagePrefix}${tt("Solid")} · ${image.solidColor || imageDefinitionFieldDefaults.solidColor}`;
  }

  if (definitionType === "composite") {
    const layerCount = normalizeCompositeLayers(image.compositeLayers).length;
    return `${sideImagePrefix}${tt("Composite")} · ${layerCount} ${tt(layerCount === 1 ? "layer" : "layers")}`;
  }

  if (definitionType === "placeholder") {
    const baseLabelMap = {
      auto: "Auto",
      bg: "Background",
      boy: "Boy",
      girl: "Girl",
    };

    return `${sideImagePrefix}${tt("Placeholder")} · ${tt(baseLabelMap[image.placeholderBase] || "Auto")}`;
  }

  return `${sideImagePrefix}${tt("Static")} · ${image.sourcePath || tt("No source path yet")}`;
}

function formatMovieDisplayableValue(value) {
  const normalizedValue = `${value || ""}`.trim();

  if (!normalizedValue) {
    return "";
  }

  const isQuotedString = (
    (normalizedValue.startsWith("\"") && normalizedValue.endsWith("\""))
    || (normalizedValue.startsWith("'") && normalizedValue.endsWith("'"))
  );

  if (isQuotedString) {
    return normalizedValue;
  }

  const looksLikeFilePath = (
    normalizedValue.includes("/")
    || normalizedValue.includes("\\")
    || /\.[a-z0-9]{2,5}$/i.test(normalizedValue)
  );

  if (looksLikeFilePath) {
    return `"${escapeRenpyString(normalizedValue.replaceAll("\\", "/"))}"`;
  }

  return normalizedValue;
}

function getImageDefinitionMovieLoop(image) {
  if (image?.movieKeepLastFrame) {
    return false;
  }

  return image?.movieLoop !== false;
}

function getDialogueBlocks(node, { fallbackBlocks = ["..."] } = {}) {
  if (getDialogueVoiceEnabled(node)) {
    const voicedBlocks = getDialogueVoiceLines(node)
      .map((line) => `${line.text || ""}`.trim())
      .filter(Boolean);

    return voicedBlocks.length ? voicedBlocks : fallbackBlocks;
  }

  return splitDialogueTextIntoBlocks(node?.content || "", { fallbackBlocks });
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
    const selectedResource = getVisualResourceById(node.imageDefinitionId);
    const resourceAttributes = mode === "hide" ? [] : getImageNodeResourceAttributeTokens(node, selectedResource);
    const layer = (node.imageLayer || "").trim();
    const at = (node.imageAt || "").trim();
    const title = `${capitalize(mode)} Image`;
    const detailParts = [];

    if (name) {
      detailParts.push(name);
    }

    if (selectedResource && getVisualResourceKind(selectedResource) === "live2d") {
      detailParts.push("Live2D");
    }

    if (resourceAttributes.length) {
      detailParts.push(`attrs:${resourceAttributes.join(", ")}`);
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

  if (node.type === "audio") {
    const action = getAudioNodeAction(node);
    const resource = getAudioNodeResource(node);
    const channel = getAudioNodeChannel(node);
    const detailParts = [];

    if (action !== "stop" && resource.name) {
      detailParts.push(resource.name);
    }

    detailParts.push(channel);

    if (action === "stop") {
      if (`${node.audioFadeOut || ""}`.trim()) {
        detailParts.push(`fadeout:${node.audioFadeOut.trim()}`);
      }
    } else {
      if (node.audioLoop) {
        detailParts.push("loop");
      }

      if (`${node.audioFadeIn || ""}`.trim()) {
        detailParts.push(`fadein:${node.audioFadeIn.trim()}`);
      }

      if (`${node.audioVolume || ""}`.trim()) {
        detailParts.push(`vol:${node.audioVolume.trim()}`);
      }

      if (action === "play" && node.audioIfChanged) {
        detailParts.push("if_changed");
      }
    }

    return {
      typeLabel: "audio",
      title: `Audio ${capitalize(action)}`,
      content: detailParts.join(" · ") || "Configure audio playback.",
    };
  }

  if (node.type === "dialogue") {
    const speaker = getDialogueSpeaker(node);
    const dialogueBlocks = getDialogueBlocks(node, { fallbackBlocks: [] });
    const firstBlock = dialogueBlocks[0];
    const previewText = firstBlock ? firstBlock.replace(/\n+/g, " / ") : "";
    const moreLineCount = dialogueBlocks.length - 1;
    const summary = moreLineCount > 0
      ? `${previewText} (+${moreLineCount} more blocks)`
      : previewText;
    const voiceSummary = getDialogueVoiceSummary(node);

    return {
      typeLabel: "dialogue",
      title: speaker.kind === "narrator" ? "Narration" : `Dialogue · ${speaker.name}`,
      content: [summary || "Enter dialogue content.", voiceSummary].filter(Boolean).join(" · "),
    };
  }

  if (node.type === "achievement") {
    const action = getAchievementNodeAction(node);
    const achievementName = getAchievementNodeName(node);
    const detailParts = [];

    if (achievementName) {
      detailParts.push(achievementName);
    }

    if (action === "progress") {
      detailParts.push(`${node.achievementProgressMode === "add" ? "add" : "set"}:${`${node.achievementProgressValue || ""}`.trim() || "1"}`);
    } else if (action === "sync") {
      detailParts.push("push local state");
    }

    return {
      typeLabel: "achievement",
      title: `Achievement ${capitalize(action)}`,
      content: detailParts.join(" · ") || "Configure achievement action.",
    };
  }

  if (node.type === "menu") {
    const menuPrompt = `${node.menuPrompt || ""}`.trim();
    const choiceCount = getMenuChoices(node).length;
    const choiceLabel = choiceCount === 1 ? "1 choice" : `${choiceCount} choices`;

    return {
      typeLabel: "menu",
      title: "Choice",
      content: menuPrompt ? `${menuPrompt} · ${choiceLabel}` : choiceLabel,
    };
  }

  if (node.type === "condition") {
    const clauses = getConditionClauses(node);
    const firstConditionalClause = clauses.find((clause) => clause.kind !== "else");
    const firstCondition = firstConditionalClause
      ? getConditionalExpression(firstConditionalClause)
      : "";

    return {
      typeLabel: "condition",
      title: "Condition",
      content: firstCondition || `${clauses.length} clauses`,
    };
  }

  if (isFlowNode(node)) {
    const flowMode = getFlowNodeMode(node);
    const target = getFlowNodeTarget(node);

    return {
      typeLabel: "flow",
      title: capitalize(flowMode || "flow"),
      content: flowMode === "return"
        ? "Return to caller."
        : (target.label || "Select target label."),
    };
  }

  if (node.type === "screen") {
    const screenMode = getScreenNodeMode(node);
    const screenName = getScreenNodeName(node);
    const screenArguments = `${node.screenArguments || ""}`.trim();
    const screenResultVariable = `${node.screenResultVariable || ""}`.trim();
    const detailParts = [];

    if (screenName) {
      detailParts.push(screenName);
    }

    if (screenName && isSpecialGuiScreenName(screenName)) {
      detailParts.push("auto-managed");
    } else if (screenName && !getGuiScreenByName(screenName)) {
      detailParts.push("external");
    }

    if (screenArguments && screenMode !== "hide") {
      detailParts.push("args");
    }

    if (screenMode === "call" && screenResultVariable) {
      detailParts.push(`return:${screenResultVariable}`);
    }

    return {
      typeLabel: "screen",
      title: `${capitalize(screenMode)} Screen`,
      content: detailParts.join(" · ") || "Choose a GUI screen to show or call.",
    };
  }

  if (node.type === "python") {
    const mode = node.pythonMode === "block" ? "block" : "line";
    const code = `${node.pythonCode || ""}`.trim();
    const firstLine = code.split(/\r?\n/, 1)[0] || "";

    return {
      typeLabel: "python",
      title: mode === "block" ? "Python Block" : "Python Line",
      content: firstLine || (mode === "block" ? "Add python block code." : "Add a single python statement."),
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

function getPortSelector(nodeId, side, portId = null) {
  let selector = `.node-port-${side}[data-node-id="${CSS.escape(nodeId)}"]`;

  if (portId) {
    selector += `[data-port-id="${CSS.escape(portId)}"]`;
  }

  return selector;
}

function getNodePortCanvasPosition(nodeId, side, graph = getActiveGraph(), { portId = null } = {}) {
  const portEl = graphNodesEl.querySelector(getPortSelector(nodeId, side, portId));

  if (portEl) {
    const canvasRect = canvasEl.getBoundingClientRect();
    const portRect = portEl.getBoundingClientRect();

    return {
      x: portRect.left + (portRect.width / 2) - canvasRect.left,
      y: portRect.top + (portRect.height / 2) - canvasRect.top,
    };
  }

  const metrics = getNodeMetrics(nodeId, graph);

  if (!metrics) {
    return null;
  }

  const { node, width, height } = metrics;
  const worldPosition = {
    x: side === "input" ? node.x - nodePortOffset : node.x + width + nodePortOffset,
    y: node.y + height / 2,
  };

  return worldToCanvasPoint(worldPosition.x, worldPosition.y, graph?.viewport || defaultViewport);
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

function getConnectionPreviewEndpoint() {
  if (!connectionSession) {
    return null;
  }

  if (connectionSession.targetNodeId) {
    const targetPort = getNodePortCanvasPosition(connectionSession.targetNodeId, "input");

    if (targetPort) {
      return targetPort;
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

function hasConnection(graph, fromNodeId, toNodeId, fromPortId = "output") {
  if (!graph) {
    return false;
  }

  return graph.edges.some((edge) => (
    edge.fromNodeId === fromNodeId
    && edge.toNodeId === toNodeId
    && (edge.fromPortId || "output") === fromPortId
  ));
}

function getIncomingEdges(graph, nodeId) {
  if (!graph) {
    return [];
  }

  return graph.edges.filter((edge) => edge.toNodeId === nodeId);
}

function getOutgoingEdges(graph, nodeId, { fromPortId = null } = {}) {
  if (!graph) {
    return [];
  }

  return graph.edges.filter((edge) => {
    if (edge.fromNodeId !== nodeId) {
      return false;
    }

    if (!fromPortId) {
      return true;
    }

    return (edge.fromPortId || "output") === fromPortId;
  });
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

    if (hasConnection(graph, edge.fromNodeId, edge.toNodeId, edge.fromPortId || "output")) {
      return;
    }

    graph.edges.push({
      ...edge,
      fromPortId: edge.fromPortId || "output",
    });
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
  setImageContextMenuState(false);
  setAudioContextMenuState(false);
  setCharacterContextMenuState(false);

  connectionSession = {
    pointerId: event.pointerId,
    graphId: graph.id,
    fromNodeId,
    fromPortId: options.fromPortId || getDefaultOutputPortId(sourceNode),
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

  const { fromNodeId, fromPortId, targetNodeId } = completedSession;

  if (!targetNodeId || targetNodeId === fromNodeId) {
    if (completedSession.detachedEdges.length) {
      const sourceNode = graph.nodes.find((node) => node.id === fromNodeId);
      saveState(`Disconnected ${getNodeDisplay(sourceNode || { type: "node", title: fromNodeId, content: "" }).title}.`);
    }
    renderConnections();
    return;
  }

  if (hasConnection(graph, fromNodeId, targetNodeId, fromPortId)) {
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
    fromPortId,
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
    const start = getNodePortCanvasPosition(edge.fromNodeId, "output", graph, {
      portId: edge.fromPortId || "output",
    });
    const end = getNodePortCanvasPosition(edge.toNodeId, "input", graph);

    if (!start || !end) {
      return;
    }

    drawConnection(context, start.x, start.y, end.x, end.y);
  });

  if (!connectionSession || connectionSession.graphId !== graph.id) {
    return;
  }

  const start = getNodePortCanvasPosition(connectionSession.fromNodeId, "output", graph, {
    portId: connectionSession.fromPortId || "output",
  });
  const end = getConnectionPreviewEndpoint();

  if (!start || !end) {
    return;
  }

  drawConnection(context, start.x, start.y, end.x, end.y, {
    color: connectionSession.targetNodeId
      ? "rgba(97, 179, 255, 0.95)"
      : "rgba(166, 176, 191, 0.7)",
    dashed: !connectionSession.targetNodeId,
    lineWidth: 2.2,
    arrowSize: 9,
  });

  const sourcePort = graphNodesEl.querySelector(getPortSelector(
    connectionSession.fromNodeId,
    "output",
    connectionSession.fromPortId || "output",
  ));
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
  const takeoverMeta = state?.meta?.legacyGuiTakeover && typeof state.meta.legacyGuiTakeover === "object"
    ? state.meta.legacyGuiTakeover
    : null;
  const isLegacyGuiTakenOver = Boolean(takeoverMeta?.takenOver);

  if (!projectPath) {
    projectPathEl.textContent = t("index.project_path.launcher_missing");
    projectFilesEl.textContent = t("index.project_files.expected");

    if (takeoverLegacyFilesButton) {
      takeoverLegacyFilesButton.hidden = true;
      takeoverLegacyFilesButton.disabled = true;
    }

    if (takeoverLegacyFilesNoteEl) {
      takeoverLegacyFilesNoteEl.textContent = t("index.takeover.note.open_from_launcher");
    }

    renderProjectHealth();
    return;
  }

  projectPathEl.textContent = projectPath;
  projectFilesEl.textContent =
    `${projectPath}/visual_editor/project.json | ${projectPath}/game/generated_visual_editor.rpy`;

  if (takeoverLegacyFilesButton) {
    takeoverLegacyFilesButton.hidden = isLegacyGuiTakenOver;
    takeoverLegacyFilesButton.disabled = isLegacyGuiTakenOver || !hasBridge;
  }

  if (takeoverLegacyFilesNoteEl) {
    if (!hasBridge) {
      takeoverLegacyFilesNoteEl.textContent = t("index.takeover.note.bridge_required");
    } else if (takeoverMeta?.takenOver) {
      const backupRoot = `${takeoverMeta.backupRoot || ""}`.trim();
      takeoverLegacyFilesNoteEl.innerHTML = backupRoot
        ? t("index.takeover.note.active_with_backup_html", { backupRoot: escapeHtml(backupRoot) })
        : t("index.takeover.note.active_default_html");
    } else {
      takeoverLegacyFilesNoteEl.innerHTML = t("index.takeover.default_html");
    }
  }

  renderProjectHealth();
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

function getSafeLabelName(label) {
  return ((label || "label").trim() || "label").replace(/\s+/g, "_");
}

function getPrimaryOutgoingEdge(graph, nodeId, { fromPortId = null } = {}) {
  return getOutgoingEdges(graph, nodeId, { fromPortId })[0] || null;
}

function appendIndentedLine(lines, indentLevel, text) {
  lines.push(`${"    ".repeat(indentLevel)}${text}`);
}

function appendNodeCode(graph, nodeId, lines, indentLevel, visited = new Set()) {
  if (!graph || !nodeId || visited.has(nodeId)) {
    return;
  }

  const node = graph.nodes.find((currentNode) => currentNode.id === nodeId);

  if (!node) {
    return;
  }

  visited.add(nodeId);

  if (node.type === "start") {
    const nextEdge = getPrimaryOutgoingEdge(graph, node.id);

    if (nextEdge) {
      appendNodeCode(graph, nextEdge.toNodeId, lines, indentLevel, visited);
    }

    return;
  }

  if (node.type === "dialogue") {
    const speaker = getDialogueSpeaker(node);
    const dialogueHasVoice = getDialogueVoiceEnabled(node);
    const dialogueEntries = dialogueHasVoice
      ? getDialogueVoiceLines(node, { ensureAtLeastOne: true }).map((line) => ({
        text: `${line.text || ""}`.trim() || "...",
        voicePath: getDialogueLineVoicePath(line, speaker),
      }))
      : getDialogueBlocks(node, { fallbackBlocks: ["..."] }).map((text) => ({
        text,
        voicePath: "",
      }));

    dialogueEntries.forEach((entry) => {
      if (entry.voicePath) {
        appendIndentedLine(lines, indentLevel, `voice "${escapeRenpyString(entry.voicePath)}"`);
      }

      if (speaker.kind === "character" && speaker.id) {
        appendIndentedLine(lines, indentLevel, `${speaker.id} "${escapeRenpyString(entry.text)}"`);
        return;
      }

      appendIndentedLine(lines, indentLevel, `"${escapeRenpyString(entry.text)}"`);
    });
  } else if (node.type === "input") {
    const target = `${node.inputVariable || ""}`.trim() || "player_name";
    const args = [
      `"${escapeRenpyString(`${node.inputPrompt || ""}`.trim() || "Enter a value.")}"`,
    ];
    const defaultText = `${node.inputDefault ?? ""}`;
    const allow = `${node.inputAllow ?? ""}`;
    const exclude = `${node.inputExclude ?? ""}`;
    const length = `${node.inputLength ?? ""}`.trim();
    const pixelWidth = `${node.inputPixelWidth ?? ""}`.trim();
    const screenName = `${node.inputScreen || ""}`.trim();
    const mask = `${node.inputMask ?? ""}`;

    if (defaultText) {
      args.push(`default=${formatRenpyStringLikeArgument(defaultText)}`);
    }

    if (allow.trim()) {
      args.push(`allow=${formatRenpyStringLikeArgument(allow)}`);
    }

    if (exclude.trim()) {
      args.push(`exclude=${formatRenpyStringLikeArgument(exclude)}`);
    }

    if (length) {
      args.push(`length=${formatRenpyArgumentValue(length)}`);
    }

    if (pixelWidth) {
      args.push(`pixel_width=${formatRenpyArgumentValue(pixelWidth)}`);
    }

    if (screenName && screenName !== "input") {
      args.push(`screen=${formatRenpyStringLikeArgument(screenName)}`);
    }

    if (mask.trim()) {
      args.push(`mask=${formatRenpyStringLikeArgument(mask)}`);
    }

    if (node.inputCopyPaste === false) {
      args.push("copypaste=False");
    }

    const inputExpression = `renpy.input(${args.join(", ")})${node.inputTrim !== false ? ".strip()" : ""}`;

    appendIndentedLine(lines, indentLevel, `$ ${target} = ${inputExpression}`);

    if (`${node.inputFallback ?? ""}`.trim()) {
      appendIndentedLine(lines, indentLevel, `if not ${target}:`);
      appendIndentedLine(
        lines,
        indentLevel + 1,
        `$ ${target} = ${formatRenpyStringLikeArgument(node.inputFallback)}`,
      );
    }
  } else if (node.type === "achievement") {
    const action = getAchievementNodeAction(node);
    const achievementName = getAchievementNodeName(node);

    if (action === "sync") {
      appendIndentedLine(lines, indentLevel, "$ achievement.sync()");
    } else if (!achievementName) {
      appendIndentedLine(lines, indentLevel, `# Achievement ${action}: choose an achievement.`);
    } else if (action === "grant") {
      appendIndentedLine(lines, indentLevel, `$ achievement.grant(${formatRenpyQuotedString(achievementName)})`);
    } else if (action === "clear") {
      appendIndentedLine(lines, indentLevel, `$ achievement.clear(${formatRenpyQuotedString(achievementName)})`);
    } else {
      const progressValue = `${node.achievementProgressValue || ""}`.trim() || "1";
      const progressExpression = node.achievementProgressMode === "add"
        ? `achievement.get_progress(${formatRenpyQuotedString(achievementName)}) + (${progressValue})`
        : progressValue;
      appendIndentedLine(
        lines,
        indentLevel,
        `$ achievement.progress(${formatRenpyQuotedString(achievementName)}, ${progressExpression})`,
      );
    }
  } else if (node.type === "audio") {
    const action = getAudioNodeAction(node);
    const channel = getAudioNodeChannel(node);

    if (action === "stop") {
      const fadeOut = `${node.audioFadeOut || ""}`.trim();
      appendIndentedLine(
        lines,
        indentLevel,
        `stop ${channel}${fadeOut ? ` fadeout ${fadeOut}` : ""}`,
      );
    } else {
      const resource = getAudioNodeResource(node);
      const parts = [
        action,
        channel,
        formatAudioResourceReference(resource.name || resource.sourcePath),
      ];
      const fadeIn = `${node.audioFadeIn || ""}`.trim();
      const volume = `${node.audioVolume || ""}`.trim();

      if (node.audioLoop) {
        parts.push("loop");
      }

      if (fadeIn) {
        parts.push("fadein", fadeIn);
      }

      if (volume) {
        parts.push("volume", volume);
      }

      if (action === "play" && node.audioIfChanged) {
        parts.push("if_changed");
      }

      appendIndentedLine(lines, indentLevel, parts.join(" "));
    }
  } else if (node.type === "menu") {
    const menuPrompt = `${node.menuPrompt || ""}`.trim();
    const menuChoices = getMenuChoices(node);

    appendIndentedLine(lines, indentLevel, "menu:");

    if (menuPrompt) {
      appendIndentedLine(lines, indentLevel + 1, `"${escapeRenpyString(menuPrompt)}"`);
    }

    menuChoices.forEach((choice, index) => {
      const choiceText = `${choice.text || ""}`.trim() || `Choice ${index + 1}`;
      const choiceCondition = getConditionalExpression(choice);
      const branchEdge = getPrimaryOutgoingEdge(graph, node.id, {
        fromPortId: getMenuChoicePortId(choice.id),
      });

      appendIndentedLine(
        lines,
        indentLevel + 1,
        `"${escapeRenpyString(choiceText)}"${choiceCondition ? ` if ${choiceCondition}` : ""}:`,
      );

      if (!branchEdge) {
        appendIndentedLine(lines, indentLevel + 2, "pass");
        return;
      }

      appendNodeCode(graph, branchEdge.toNodeId, lines, indentLevel + 2, new Set(visited));
    });

    return;
  } else if (node.type === "condition") {
    const clauses = getConditionClauses(node);

    clauses.forEach((clause, index) => {
      const branchEdge = getPrimaryOutgoingEdge(graph, node.id, {
        fromPortId: getConditionClausePortId(clause.id),
      });
      const clauseCondition = getConditionalExpression(clause);
      let headerLine = "else:";

      if (clause.kind === "if") {
        headerLine = `if ${clauseCondition || "True"}:`;
      } else if (clause.kind === "elif") {
        headerLine = `elif ${clauseCondition || "False"}:`;
      }

      appendIndentedLine(lines, indentLevel, headerLine);

      if (!branchEdge) {
        appendIndentedLine(lines, indentLevel + 1, "pass");
        return;
      }

      appendNodeCode(graph, branchEdge.toNodeId, lines, indentLevel + 1, new Set(visited));
    });

    return;
  } else if (isFlowNode(node)) {
    const flowMode = getFlowNodeMode(node);
    const target = getSafeLabelName(getFlowNodeTarget(node).label || "next_label");

    if (flowMode === "return") {
      appendIndentedLine(lines, indentLevel, "return");
      return;
    }

    appendIndentedLine(lines, indentLevel, `${flowMode} ${target}`);

    if (flowMode !== "call") {
      return;
    }
  } else if (node.type === "screen") {
    const screenMode = getScreenNodeMode(node);
    const screenName = getScreenNodeName(node);
    const screenArguments = `${node.screenArguments || ""}`.trim();
    const screenResultVariable = `${node.screenResultVariable || ""}`.trim();

    if (!screenName) {
      appendIndentedLine(lines, indentLevel, `# ${capitalize(screenMode)} screen: choose a screen name.`);
    } else if (screenMode === "hide") {
      appendIndentedLine(lines, indentLevel, `hide screen ${screenName}`);
    } else if (screenMode === "call") {
      const callTarget = screenArguments ? `${screenName}(${screenArguments})` : screenName;
      appendIndentedLine(lines, indentLevel, `call screen ${callTarget}`);

      if (screenResultVariable) {
        appendIndentedLine(lines, indentLevel, `$ ${screenResultVariable} = _return`);
      }
    } else {
      const showTarget = screenArguments ? `${screenName}(${screenArguments})` : screenName;
      appendIndentedLine(lines, indentLevel, `show screen ${showTarget}`);
    }
  } else if (node.type === "image") {
    const mode = getImageNodeMode(node);
    const imageName = getImageNodeName(node);
    const resourceAttributes = mode === "hide" ? [] : getImageNodeResourceAttributeTokens(node);
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
        parts.push(...resourceAttributes);
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
      parts.push(...resourceAttributes);

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

    appendIndentedLine(lines, indentLevel, parts.join(" "));
  } else if (node.type === "animation") {
    appendIndentedLine(lines, indentLevel, `with ${getAnimationNodeTransition(node)}`);
  } else if (node.type === "python") {
    const pythonMode = node.pythonMode === "block" ? "block" : "line";
    const pythonCode = `${node.pythonCode || ""}`.trim();
    const pythonLine = pythonCode.split(/\r?\n/, 1)[0]?.trim() || "";

    if (pythonMode === "block") {
      const storeText = `${node.pythonStore || ""}`.trim();
      const hideText = node.pythonHide ? " hide" : "";
      const storeClause = storeText ? ` in ${storeText}` : "";
      appendIndentedLine(lines, indentLevel, `python${hideText}${storeClause}:`);

      if (pythonCode) {
        pythonCode.split(/\r?\n/).forEach((line) => {
          appendIndentedLine(lines, indentLevel + 1, line);
        });
      } else {
        appendIndentedLine(lines, indentLevel + 1, "pass");
      }
    } else if (pythonLine) {
      appendIndentedLine(lines, indentLevel, `$ ${pythonLine}`);
    } else {
      appendIndentedLine(lines, indentLevel, "# Empty python line");
    }
  } else {
    appendIndentedLine(lines, indentLevel, `# ${node.type}: ${node.title || "Untitled Node"}`);
  }

  const nextEdge = getPrimaryOutgoingEdge(graph, node.id);

  if (nextEdge) {
    appendNodeCode(graph, nextEdge.toNodeId, lines, indentLevel, visited);
  }
}

function formatLabelGraphCode(graph) {
  if (!graph) {
    return "";
  }

  const safeLabel = getSafeLabelName(graph.label);
  const lines = [`label ${safeLabel}:`, ...buildLabelGraphBodyLines(graph)];

  return lines.join("\n");
}

function buildLabelGraphBodyLines(graph) {
  const lines = [];
  const startNode = graph.nodes.find((node) => node.type === "start");
  const startEdge = startNode ? getPrimaryOutgoingEdge(graph, startNode.id) : null;

  if (!startEdge) {
    lines.push("    pass");
  } else {
    appendNodeCode(graph, startEdge.toNodeId, lines, 1);
  }

  if (graph.replay?.enabled && graph.replay?.autoEnd) {
    lines.push("");
    lines.push("    $ renpy.end_replay()");
  }

  return lines;
}

function formatLabelGraphBodyCode(graph) {
  return buildLabelGraphBodyLines(graph).join("\n");
}

function splitGuiRawLines(value) {
  return `${value || ""}`
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function indentGuiLine(line, indentLevel) {
  return `${"    ".repeat(indentLevel)}${line}`;
}

function formatGuiGeneralValue(value, fallback = "\"\"") {
  return formatRenpyArgumentValue(value) || fallback;
}

function formatGuiStringValue(value, fallback = "\"\"") {
  return formatRenpyStringLikeArgument(value) || fallback;
}

function formatGuiScreenTextValue(value) {
  const trimmed = `${value || ""}`.trim();

  if (!trimmed) {
    return "\"\"";
  }

  if (
    (trimmed.startsWith("\"") && trimmed.endsWith("\""))
    || (trimmed.startsWith("'") && trimmed.endsWith("'"))
    || trimmed.startsWith("_(")
    || trimmed.includes("(")
    || trimmed.startsWith("[")
    || trimmed.startsWith("{")
  ) {
    return trimmed;
  }

  return formatRenpyQuotedString(trimmed);
}

const guiStylePrefixMap = {
  base: "",
  idle: "idle_",
  hover: "hover_",
  selected: "selected_",
  insensitive: "insensitive_",
  selected_idle: "selected_idle_",
  selected_hover: "selected_hover_",
  selected_insensitive: "selected_insensitive_",
};

function formatGuiStylePropertyValue(property) {
  const value = `${property?.value || ""}`.trim();

  if (!value) {
    return "";
  }

  if (property.type === "bool") {
    return value === "false" ? "False" : "True";
  }

  if (property.type === "color" && value.startsWith("#")) {
    return formatRenpyQuotedString(value);
  }

  if (property.type === "string") {
    return formatGuiStringValue(value);
  }

  return formatGuiGeneralValue(value);
}

function formatGuiStyleCode(style) {
  if (!style) {
    return "";
  }

  const styleName = `${style.name || ""}`.trim() || "visual_editor_style";
  const parent = `${style.parent || ""}`.trim();
  const header = parent ? `style ${styleName} is ${parent}` : `style ${styleName}`;
  const lines = [];

  if (`${style.variant || ""}`.trim()) {
    lines.push(indentGuiLine(`variant ${formatGuiGeneralValue(style.variant)}`, 1));
  }

  if (`${style.propertiesExpression || ""}`.trim()) {
    lines.push(indentGuiLine(`properties ${style.propertiesExpression.trim()}`, 1));
  }

  (Array.isArray(style.properties) ? style.properties : [])
    .filter((property) => property?.key && `${property.value || ""}`.trim())
    .forEach((property) => {
      const prefix = guiStylePrefixMap[property.prefix] ?? "";
      const formattedValue = formatGuiStylePropertyValue(property);

      if (formattedValue) {
        lines.push(indentGuiLine(`${prefix}${property.key} ${formattedValue}`, 1));
      }
    });

  return lines.length ? `${header}:\n${lines.join("\n")}` : header;
}

function formatGuiActionExpression(kind, args, raw) {
  const trimmedArgs = `${args || ""}`.trim();
  const trimmedRaw = `${raw || ""}`.trim();

  if (kind === "raw") {
    return trimmedRaw;
  }

  if (!kind || kind === "none") {
    return "";
  }

  if (kind === "AchievementSync") {
    return "achievement.Sync()";
  }

  if (kind === "GuiRebuild") {
    return "Function(gui.rebuild)";
  }

  if (kind === "Start") {
    return "Start()";
  }

  if (kind === "Quit") {
    return trimmedArgs ? `Quit(${trimmedArgs})` : "Quit()";
  }

  return trimmedArgs ? `${kind}(${trimmedArgs})` : `${kind}()`;
}

function formatGuiValueExpression(kind, args, raw) {
  const trimmedArgs = `${args || ""}`.trim();
  const trimmedRaw = `${raw || ""}`.trim();

  if (kind === "raw") {
    return trimmedRaw;
  }

  if (!kind || kind === "none") {
    return "";
  }

  return trimmedArgs ? `${kind}(${trimmedArgs})` : `${kind}()`;
}

function formatGuiNodePropertyLines(node, indentLevel) {
  const lines = [];

  if (`${node.style || ""}`.trim()) {
    lines.push(indentGuiLine(`style ${formatGuiStringValue(node.style)}`, indentLevel));
  }

  if (`${node.nodeId || ""}`.trim()) {
    lines.push(indentGuiLine(`id ${formatRenpyQuotedString(node.nodeId)}`, indentLevel));
  }

  const actionExpression = formatGuiActionExpression(node.actionKind, node.actionArgs, node.actionRaw);
  if (actionExpression) {
    lines.push(indentGuiLine(`action ${actionExpression}`, indentLevel));
  }

  const valueExpression = formatGuiValueExpression(node.valueKind, node.valueArgs, node.valueRaw);
  if (valueExpression) {
    lines.push(indentGuiLine(`value ${valueExpression}`, indentLevel));
  }

  if (node.type === "input") {
    if (`${node.inputDefaultText || ""}`.trim()) {
      lines.push(indentGuiLine(`default ${formatGuiScreenTextValue(node.inputDefaultText)}`, indentLevel));
    }

    if (`${node.inputAllow || ""}`.trim()) {
      lines.push(indentGuiLine(`allow ${formatGuiStringValue(node.inputAllow)}`, indentLevel));
    }

    if (`${node.inputExclude || ""}`.trim()) {
      lines.push(indentGuiLine(`exclude ${formatGuiStringValue(node.inputExclude)}`, indentLevel));
    }

    if (`${node.inputLength || ""}`.trim()) {
      lines.push(indentGuiLine(`length ${formatGuiGeneralValue(node.inputLength)}`, indentLevel));
    }

    if (`${node.inputPixelWidth || ""}`.trim()) {
      lines.push(indentGuiLine(`pixel_width ${formatGuiGeneralValue(node.inputPixelWidth)}`, indentLevel));
    }

    if (`${node.inputMask || ""}`.trim()) {
      lines.push(indentGuiLine(`mask ${formatGuiStringValue(node.inputMask)}`, indentLevel));
    }

    if (node.inputCopyPaste === false) {
      lines.push(indentGuiLine("copypaste False", indentLevel));
    }
  }

  splitGuiRawLines(node.propertiesExpression).forEach((line) => {
    lines.push(indentGuiLine(line, indentLevel));
  });

  return lines;
}

const guiContainerNodeTypes = new Set([
  "button",
  "frame",
  "window",
  "vbox",
  "hbox",
  "fixed",
  "viewport",
  "grid",
  "vpgrid",
  "side",
  "if",
  "showif",
  "for",
  "on",
  "transform",
]);

function formatGuiScreenNodeCode(node, indentLevel = 1) {
  if (!node) {
    return "";
  }

  const children = Array.isArray(node.children) ? node.children : [];
  const propertyLines = formatGuiNodePropertyLines(node, indentLevel + 1);
  const childLines = children.map((child) => formatGuiScreenNodeCode(child, indentLevel + 1)).filter(Boolean);
  let header = "";
  let forceBlock = guiContainerNodeTypes.has(node.type);

  switch (node.type) {
    case "text":
      header = `text ${formatGuiScreenTextValue(node.text || "Text")}`;
      break;
    case "label":
      header = `label ${formatGuiScreenTextValue(node.text || "Label")}`;
      break;
    case "textbutton":
      header = `textbutton ${formatGuiScreenTextValue(node.text || "Button")}`;
      break;
    case "button":
      header = "button";
      if (`${node.text || ""}`.trim() && !childLines.length) {
        childLines.push(indentGuiLine(`text ${formatGuiScreenTextValue(node.text)}`, indentLevel + 1));
      }
      break;
    case "imagebutton":
      header = `imagebutton idle ${formatGuiGeneralValue(node.displayable || "\"gui/button_idle.png\"")} hover ${formatGuiGeneralValue(node.hoverDisplayable || "\"gui/button_hover.png\"")}`;
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
    case "vbar":
    case "input":
      header = node.type;
      break;
    case "add":
      header = `add ${formatGuiGeneralValue(node.displayable || "\"gui/placeholder.png\"")}`;
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
      header = `${node.targetArguments ? `use ${node.targetScreen || "screen_name"}(${node.targetArguments})` : `use ${node.targetScreen || "screen_name"}`}`;
      forceBlock = false;
      break;
    case "default":
      header = `default ${node.defaultName || "value"} = ${node.defaultValue || "None"}`;
      forceBlock = false;
      break;
    case "on":
      header = `on ${formatGuiScreenTextValue(node.eventName || "show")}:`;
      break;
    case "timer":
      header = `timer ${node.delay || "0.25"}`;
      break;
    case "key":
      header = `key ${formatGuiScreenTextValue(node.keyName || "game_menu")}`;
      break;
    case "transform":
      header = "transform:";
      break;
    case "transclude":
      header = "transclude";
      forceBlock = false;
      break;
    case "raw":
      header = `${node.text || ""}`.trim() || "pass";
      forceBlock = false;
      break;
    default:
      header = `text ${formatGuiScreenTextValue(node.text || node.title || "Text")}`;
      break;
  }

  const alreadyBlock = header.endsWith(":");
  const needsBlock = node.type === "raw"
    ? Boolean(propertyLines.length || childLines.length)
    : (alreadyBlock || forceBlock || propertyLines.length || childLines.length);

  if (!needsBlock) {
    return indentGuiLine(header, indentLevel);
  }

  const lines = [indentGuiLine(node.type === "raw" ? header : (alreadyBlock ? header : `${header}:`), indentLevel)];
  lines.push(...propertyLines);
  lines.push(...childLines);

  if (lines.length === 1) {
    lines.push(indentGuiLine("pass", indentLevel + 1));
  }

  return lines.join("\n");
}

function formatGuiScreenCode(screen) {
  if (!screen) {
    return "";
  }

  const screenName = `${screen.name || ""}`.trim() || "visual_editor_screen";
  const parameters = `${screen.parameters || ""}`.trim();
  const lines = [`screen ${screenName}${parameters ? `(${parameters})` : ""}:`];

  if (`${screen.tag || ""}`.trim()) {
    lines.push(indentGuiLine(`tag ${formatRenpyQuotedString(screen.tag)}`, 1));
  }

  lines.push(indentGuiLine(`modal ${screen.modal ? "True" : "False"}`, 1));

  if (`${screen.zorder || ""}`.trim()) {
    lines.push(indentGuiLine(`zorder ${screen.zorder}`, 1));
  }

  if (`${screen.variant || ""}`.trim()) {
    lines.push(indentGuiLine(`variant ${formatGuiGeneralValue(screen.variant)}`, 1));
  }

  splitGuiRawLines(screen.headStatements).forEach((line) => {
    lines.push(indentGuiLine(line, 1));
  });

  if (`${screen.notes || ""}`.trim()) {
    lines.push(indentGuiLine(`# ${screen.notes.trim()}`, 1));
  }

  const nodes = Array.isArray(screen.nodes) ? screen.nodes : [];
  if (!nodes.length) {
    lines.push(indentGuiLine("pass", 1));
  } else {
    nodes.forEach((node) => {
      lines.push(formatGuiScreenNodeCode(node, 1));
    });
  }

  return lines.join("\n");
}

function formatGuiConfigEntryCode(entry, scope) {
  if (!entry) {
    return "";
  }

  if (scope === "config") {
    return `define config.${entry.name} = ${entry.value || "None"}`;
  }

  if (scope === "guiVariables") {
    return `define gui.${entry.name} = ${entry.value || "None"}`;
  }

  if (scope === "guiPreferences") {
    const preferenceName = `${entry.storePath || ""}`.trim() || entry.name;
    return `define gui.${entry.name} = gui.preference(${formatRenpyQuotedString(preferenceName)}, ${entry.value || "None"})`;
  }

  if (scope === "preferences") {
    return `default preferences.${entry.name} = ${entry.value || "None"}`;
  }

  const storePrefix = entry.storePath ? `${entry.storePath}.` : "";
  return `default ${storePrefix}${entry.name} = ${entry.value || "None"}`;
}

function formatAllGuiConfigCode(gui) {
  const lines = [];
  [
    ["config", gui.config],
    ["guiVariables", gui.guiVariables],
    ["guiPreferences", gui.guiPreferences],
    ["preferences", gui.preferences],
    ["store", gui.store],
  ].forEach(([scope, entries]) => {
    (Array.isArray(entries) ? entries : []).forEach((entry) => {
      if (entry.description) {
        lines.push(`# ${entry.description}`);
      }
      lines.push(formatGuiConfigEntryCode(entry, scope));
      lines.push("");
    });
  });
  return lines.join("\n").trim();
}

function parseGuiLeadingParameterName(parameterList) {
  const match = `${parameterList || ""}`.trim().match(/^([A-Za-z_][A-Za-z0-9_]*)/);
  return match ? match[1] : "";
}

function formatGuiPythonUiHelperName(entry) {
  return `${entry?.name || ""}`.trim() || "VisualEditorHelper";
}

function formatGuiPythonStatementBlockValue(value) {
  const trimmed = `${value || ""}`.trim().toLowerCase();
  if (!trimmed || trimmed === "false") {
    return "False";
  }
  if (trimmed === "true") {
    return "True";
  }
  return formatRenpyQuotedString(trimmed);
}

function buildGuiPythonMethodBlock(signature, rawBody, indentLevel, fallbackLines) {
  const lines = [indentGuiLine(signature, indentLevel)];
  const bodyLines = splitGuiRawLines(rawBody);
  (bodyLines.length ? bodyLines : fallbackLines).forEach((line) => {
    lines.push(indentGuiLine(line, indentLevel + 1));
  });
  return lines;
}

function formatGuiPythonUiEntryCode(entry) {
  if (!entry) {
    return "";
  }

  const lines = [];
  const helperName = formatGuiPythonUiHelperName(entry);

  if (entry.notes) {
    lines.push(`# ${entry.notes}`);
  }

  switch (entry.kind) {
    case "action":
      lines.push("init python:");
      lines.push(indentGuiLine(`class ${helperName}(Action):`, 1));
      lines.push(indentGuiLine(`alt = ${entry.actionAlt ? formatGuiGeneralValue(entry.actionAlt) : "None"}`, 2));
      if (entry.parameters) {
        lines.push(...buildGuiPythonMethodBlock(`def __init__(self, ${entry.parameters}):`, "", 2, ["pass"]));
      }
      lines.push(...buildGuiPythonMethodBlock("def __call__(self):", entry.actionCallBody, 2, ["return None"]));
      lines.push(...buildGuiPythonMethodBlock("def get_sensitive(self):", "", 2, [`return ${entry.actionSensitive || "True"}`]));
      lines.push(...buildGuiPythonMethodBlock("def get_selected(self):", "", 2, [`return ${entry.actionSelected || "False"}`]));
      lines.push(...buildGuiPythonMethodBlock("def get_tooltip(self):", "", 2, [`return ${entry.actionTooltip || "None"}`]));
      break;
    case "barvalue":
      lines.push("init python:");
      lines.push(indentGuiLine(`class ${helperName}(BarValue):`, 1));
      lines.push(indentGuiLine(`alt = ${entry.barAlt ? formatGuiGeneralValue(entry.barAlt) : "\"Bar\""}`, 2));
      if (entry.parameters) {
        lines.push(...buildGuiPythonMethodBlock(`def __init__(self, ${entry.parameters}):`, "", 2, ["pass"]));
      }
      lines.push(...buildGuiPythonMethodBlock("def get_adjustment(self):", "", 2, [`return ${entry.barAdjustment || "ui.adjustment(range=100, value=0)"}`]));
      lines.push(...buildGuiPythonMethodBlock("def get_style(self):", "", 2, [`return ${entry.barStyle || "(\"bar\", \"vbar\")"}`]));
      lines.push(...buildGuiPythonMethodBlock("def get_tooltip(self):", "", 2, [`return ${entry.barTooltip || "None"}`]));
      break;
    case "inputvalue":
      lines.push("init python:");
      lines.push(indentGuiLine(`class ${helperName}(InputValue):`, 1));
      lines.push(indentGuiLine(`default = ${entry.inputDefault === "false" ? "False" : "True"}`, 2));
      lines.push(indentGuiLine(`editable = ${entry.inputEditable === "false" ? "False" : "True"}`, 2));
      lines.push(indentGuiLine(`returnable = ${entry.inputReturnable === "true" ? "True" : "False"}`, 2));
      if (entry.parameters) {
        lines.push(...buildGuiPythonMethodBlock(`def __init__(self, ${entry.parameters}):`, "", 2, ["pass"]));
      }
      lines.push(...buildGuiPythonMethodBlock("def get_text(self):", "", 2, [`return ${entry.inputGetText || "\"\""}`]));
      lines.push(...buildGuiPythonMethodBlock("def set_text(self, s):", entry.inputSetTextBody, 2, ["pass"]));
      lines.push(...buildGuiPythonMethodBlock("def enter(self):", entry.inputEnterBody, 2, ["return InputValue.enter(self)"]));
      break;
    case "displayable":
      lines.push("init python:");
      lines.push(indentGuiLine(`class ${helperName}(renpy.Displayable):`, 1));
      lines.push(...buildGuiPythonMethodBlock(`def __init__(self, ${entry.parameters || "child=None, **kwargs"}):`, entry.displayableInitBody, 2, [
        `super(${helperName}, self).__init__()`,
        "self.child = renpy.displayable(child) if child is not None else None",
      ]));
      lines.push(...buildGuiPythonMethodBlock("def render(self, width, height, st, at):", entry.displayableRenderBody, 2, [
        "render = renpy.Render(width, height)",
        "return render",
      ]));
      lines.push(...buildGuiPythonMethodBlock("def event(self, ev, x, y, st):", entry.displayableEventBody, 2, ["return None"]));
      break;
    case "statement": {
      const statementKeyword = entry.parameters || "custom_statement";
      const registerArgs = [
        formatRenpyQuotedString(statementKeyword),
        `parse=parse_${helperName}`,
        `execute=execute_${helperName}`,
        `block=${formatGuiPythonStatementBlockValue(entry.statementBlock)}`,
      ];
      lines.push("python early:");
      lines.push(...buildGuiPythonMethodBlock(`def parse_${helperName}(lexer):`, entry.statementParseBody, 1, ["return lexer.rest()"]));
      lines.push(...buildGuiPythonMethodBlock(`def execute_${helperName}(parsed_object):`, entry.statementExecuteBody, 1, ["pass"]));
      lines.push(indentGuiLine(`renpy.register_statement(${registerArgs.join(", ")})`, 1));
      break;
    }
    case "restart_helper": {
      const parameterList = entry.parameters || "value";
      const leadingParameter = parseGuiLeadingParameterName(parameterList) || "value";
      lines.push("init python:");
      lines.push(indentGuiLine(`def ${helperName}(${parameterList}):`, 1));
      const bodyLines = [];
      if (entry.restartTarget) {
        bodyLines.push(`${entry.restartTarget} = ${entry.restartValue || leadingParameter}`);
      }
      bodyLines.push(...splitGuiRawLines(entry.restartBody));
      bodyLines.push("renpy.restart_interaction()");
      bodyLines.forEach((line) => lines.push(indentGuiLine(line, 2)));
      break;
    }
    case "define_screen":
      lines.push("init python:");
      lines.push(...buildGuiPythonMethodBlock(`def ${helperName}(${entry.parameters || ""}):`, entry.defineBody, 1, [
        "ui.window(style=\"say_window\")",
        "ui.text(\"Python-defined screen placeholder\")",
      ]));
      lines.push(indentGuiLine(`renpy.define_screen(${formatRenpyQuotedString(entry.defineScreenName || "python_screen")}, ${helperName}, modal=${entry.defineModal === "true" ? "True" : "False"}, zorder=${entry.defineZorder || "0"})`, 1));
      break;
    default:
      return "";
  }

  return lines.join("\n");
}

function formatAllGuiPythonUiCode(gui) {
  return (Array.isArray(gui.pythonUiHelpers) ? gui.pythonUiHelpers : [])
    .map((entry) => formatGuiPythonUiEntryCode(entry))
    .filter(Boolean)
    .join("\n\n");
}

function formatAllGuiCursorCode(gui) {
  const entries = Array.isArray(gui.cursors) ? gui.cursors : [];
  const hardwareEntries = entries.filter((entry) => entry.kind === "hardware");
  const displayableEntries = entries.filter((entry) => entry.kind === "displayable");
  const usageEntries = entries.filter((entry) => entry.kind === "usage");
  const lines = [];

  if (hardwareEntries.length) {
    lines.push("define config.mouse = {");
    hardwareEntries.forEach((entry, index) => {
      const mapping = `${entry.framesExpression || ""}`.trim()
        || `[( ${formatGuiGeneralValue(entry.image || "\"gui/cursor.png\"")}, ${entry.hotspotX || "0"}, ${entry.hotspotY || "0"} )]`;
      lines.push(`    ${formatRenpyQuotedString(entry.name)}: ${mapping}${index < hardwareEntries.length - 1 ? "," : ""}`);
    });
    lines.push("}");
    lines.push("");
  }

  if (displayableEntries.length) {
    const [baseEntry, ...restEntries] = displayableEntries;
    let chain = `define config.mouse_displayable = MouseDisplayable(${formatGuiGeneralValue(baseEntry.image || "\"gui/cursor.png\"")}, ${baseEntry.hotspotX || "0"}, ${baseEntry.hotspotY || "0"})`;
    restEntries.forEach((entry) => {
      chain += `\n    .add(${formatRenpyQuotedString(entry.name)}, ${formatGuiGeneralValue(entry.image || "\"gui/cursor.png\"")}, ${entry.hotspotX || "0"}, ${entry.hotspotY || "0"})`;
    });
    lines.push(chain);
    lines.push("");
  }

  usageEntries.forEach((entry) => {
    lines.push(`style ${entry.styleTarget || "button"}:`);
    lines.push(`    mouse ${formatRenpyQuotedString(entry.targetCursor || entry.name)}`);
    lines.push("");
  });

  return lines.join("\n").trim();
}

function formatGuiShaderEntryCode(entry) {
  switch (entry.mode) {
    case "default":
      return `define config.default_textshader = ${formatGuiGeneralValue(entry.shaderSpec || "\"default\"")}`;
    case "style":
      return `style ${entry.targetName || "default"}:\n    textshader ${formatGuiGeneralValue(entry.shaderSpec || "\"wave\"")}`;
    case "callback":
      return `define config.textshader_callbacks[${formatGuiGeneralValue(entry.callbackKey || "\"default\"")}] = ${entry.callbackFunction || "get_default_textshader"}`;
    case "custom": {
      const parts = [
        `renpy.register_textshader(${formatRenpyQuotedString(entry.name || "custom_shader")}`,
        `shaders=${entry.customShaders || formatGuiGeneralValue(entry.shaderSpec || "\"textshader.wave\"")}`,
        `include_default=${entry.includeDefault !== false ? "True" : "False"}`,
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

function formatAllGuiShaderCode(gui) {
  return (Array.isArray(gui.textShaders) ? gui.textShaders : [])
    .map((entry) => formatGuiShaderEntryCode(entry))
    .filter(Boolean)
    .join("\n\n");
}

function getGuiReplayGraphs() {
  return state.graphs
    .filter((graph) => graph?.replay?.enabled)
    .map((graph) => ({
      label: getSafeLabelName(graph.label),
      title: `${graph.replay?.title || ""}`.trim() || getSafeLabelName(graph.label),
      lockedMode: graph.replay?.lockedMode || "auto",
      scope: `${graph.replay?.scope || ""}`.trim(),
    }));
}

function formatGuiReplayAction(graph) {
  const args = [formatRenpyQuotedString(graph.label)];
  if (graph.scope) {
    args.push(`scope=${graph.scope}`);
  }
  if (graph.lockedMode === "locked") {
    args.push("locked=True");
  } else if (graph.lockedMode === "unlocked") {
    args.push("locked=False");
  }
  return `Replay(${args.join(", ")})`;
}

function formatGuiReplayMenuCode(gui) {
  const replayMenu = gui.replayMenu;
  if (!replayMenu) {
    return "";
  }

  const replayGraphs = getGuiReplayGraphs();
  const lines = [`screen ${replayMenu.screenName || "replay_gallery"}():`];

  if (replayMenu.tagMenu) {
    lines.push(indentGuiLine("tag menu", 1));
  }

  lines.push(indentGuiLine("modal True", 1));
  lines.push(indentGuiLine("vbox:", 1));
  lines.push(indentGuiLine(`text ${formatGuiScreenTextValue(replayMenu.title || "Replay Gallery")}`, 2));

  if (replayGraphs.length) {
    replayGraphs.forEach((graph) => {
      lines.push(indentGuiLine(`textbutton ${formatGuiScreenTextValue(graph.title)} action ${formatGuiReplayAction(graph)}`, 2));
    });
  } else {
    lines.push(indentGuiLine(`text ${formatGuiScreenTextValue(replayMenu.emptyText || "No replay scenes are enabled yet.")}`, 2));
  }

  lines.push(indentGuiLine(`textbutton ${formatGuiScreenTextValue("Back")} action ${replayMenu.returnAction || "Return()"}`, 2));
  return lines.join("\n");
}

function getGuiAudioDefinition(audioId) {
  return state.audio.find((entry) => entry.id === audioId) || null;
}

function getGuiMusicTrackSource(track) {
  const importedAudio = getGuiAudioDefinition(track?.audioDefinitionId || "");
  return `${importedAudio?.sourcePath || track?.filename || ""}`.trim();
}

function getGuiMusicTrackTitle(track) {
  const importedAudio = getGuiAudioDefinition(track?.audioDefinitionId || "");
  return `${track?.title || ""}`.trim() || `${importedAudio?.name || ""}`.trim() || getGuiMusicTrackSource(track) || "Untitled Track";
}

function formatGuiMusicRoomCode(room) {
  if (!room) {
    return "";
  }

  const lines = ["init python:"];
  const args = [
    `channel=${formatRenpyQuotedString(room.channel || "music")}`,
    `fadeout=${room.fadeout || "0.0"}`,
    `fadein=${room.fadein || "0.0"}`,
    `loop=${room.loop ? "True" : "False"}`,
    `single_track=${room.singleTrack ? "True" : "False"}`,
    `shuffle=${room.shuffle ? "True" : "False"}`,
  ];
  const instanceName = room.instanceName || "visual_music_room";
  const tracks = Array.isArray(room.tracks) ? room.tracks : [];

  if (room.stopAction) {
    args.push(`stop_action=${room.stopAction}`);
  }

  lines.push(indentGuiLine(`${instanceName} = MusicRoom(${args.join(", ")})`, 1));
  tracks.forEach((track) => {
    const source = getGuiMusicTrackSource(track);
    if (!source) {
      lines.push(indentGuiLine(`# Skipped ${getGuiMusicTrackTitle(track)} because no audio file is configured.`, 1));
      return;
    }
    const addArgs = [formatGuiGeneralValue(source)];
    if (track.alwaysUnlocked) {
      addArgs.push("always_unlocked=True");
    }
    if (track.actionExpression) {
      addArgs.push(`action=${track.actionExpression}`);
    }
    lines.push(indentGuiLine(`${instanceName}.add(${addArgs.join(", ")})`, 1));
  });

  lines.push("");
  lines.push(`screen ${room.screenName || "music_room"}():`);
  lines.push(indentGuiLine("modal True", 1));
  if (room.autoPlay && tracks.some((track) => getGuiMusicTrackSource(track))) {
    lines.push(indentGuiLine('on "show":', 1));
    lines.push(indentGuiLine(`action ${instanceName}.Play()`, 2));
  }
  lines.push(indentGuiLine("vbox:", 1));
  lines.push(indentGuiLine(`text ${formatGuiScreenTextValue(room.name || "Music Room")}`, 2));
  tracks.filter((track) => getGuiMusicTrackSource(track)).forEach((track) => {
    const source = getGuiMusicTrackSource(track);
    lines.push(indentGuiLine(`textbutton ${formatGuiScreenTextValue(getGuiMusicTrackTitle(track))} action ${instanceName}.Play(${formatGuiGeneralValue(source)})`, 2));
  });
  lines.push(indentGuiLine(`textbutton ${formatGuiScreenTextValue("Back")} action Return()`, 2));
  return lines.join("\n");
}

function formatGuiGalleryCode(gallery) {
  if (!gallery) {
    return "";
  }

  const instanceName = gallery.instanceName || "visual_gallery";
  const buttons = Array.isArray(gallery.buttons) ? gallery.buttons : [];
  const columns = Math.max(1, Number.parseInt(gallery.columns, 10) || 3);
  const rows = Math.max(1, Math.ceil(Math.max(buttons.length, 1) / columns));
  const lines = ["init python:", indentGuiLine(`${instanceName} = Gallery()`, 1)];

  if (gallery.lockedButton) {
    lines.push(indentGuiLine(`${instanceName}.locked_button = ${formatGuiGeneralValue(gallery.lockedButton)}`, 1));
  }
  if (gallery.transition) {
    lines.push(indentGuiLine(`${instanceName}.transition = ${gallery.transition}`, 1));
  }

  buttons.forEach((button) => {
    lines.push(indentGuiLine(`${instanceName}.button(${formatRenpyQuotedString(button.name || "gallery_button")})`, 1));
    splitGuiRawLines(button.conditions).forEach((line) => {
      lines.push(indentGuiLine(`${instanceName}.condition(${formatGuiGeneralValue(line)})`, 1));
    });
    splitGuiRawLines(button.imageLines).forEach((line) => {
      const method = button.autoUnlock ? "unlock_image" : "image";
      lines.push(indentGuiLine(`${instanceName}.${method}(${line})`, 1));
    });
  });

  lines.push("");
  lines.push(`screen ${gallery.screenName || "gallery"}():`);
  if (gallery.tagMenu) {
    lines.push(indentGuiLine("tag menu", 1));
  }
  lines.push(indentGuiLine("modal True", 1));
  if (gallery.background) {
    lines.push(indentGuiLine(`add ${formatGuiGeneralValue(gallery.background)}`, 1));
  }
  lines.push(indentGuiLine("vbox:", 1));
  lines.push(indentGuiLine(`text ${formatGuiScreenTextValue(gallery.name || "Gallery")}`, 2));
  if (buttons.length) {
    lines.push(indentGuiLine(`grid ${columns} ${rows}:`, 2));
    buttons.forEach((button) => {
      const thumb = `${button.unlockedThumb || ""}`.trim() || "Solid(\"#3a3a3a\")";
      lines.push(indentGuiLine(`add ${instanceName}.make_button(${formatRenpyQuotedString(button.name || "gallery_button")}, ${formatGuiGeneralValue(thumb)})`, 3));
    });
  } else {
    lines.push(indentGuiLine(`text ${formatGuiScreenTextValue("No gallery buttons configured yet.")}`, 2));
  }
  lines.push(indentGuiLine(`textbutton ${formatGuiScreenTextValue("Back")} action Return()`, 2));
  return lines.join("\n");
}

function hasGuiScreenNamed(gui, name) {
  return (Array.isArray(gui?.screens) ? gui.screens : []).some((screen) => `${screen?.name || ""}`.trim() === name);
}

function formatFallbackConfirmScreenCode() {
  return [
    "screen confirm(message, yes_action, no_action):",
    indentGuiLine("modal True", 1),
    indentGuiLine("zorder 200", 1),
    "",
    indentGuiLine("frame:", 1),
    indentGuiLine("xalign 0.5", 2),
    indentGuiLine("yalign 0.5", 2),
    indentGuiLine("xpadding 40", 2),
    indentGuiLine("ypadding 30", 2),
    indentGuiLine("vbox:", 2),
    indentGuiLine("spacing 24", 3),
    indentGuiLine("label _(message):", 3),
    indentGuiLine("xalign 0.5", 4),
    indentGuiLine("hbox:", 3),
    indentGuiLine("xalign 0.5", 4),
    indentGuiLine("spacing 40", 4),
    indentGuiLine('textbutton _("Yes") action yes_action', 4),
    indentGuiLine('textbutton _("No") action no_action', 4),
    "",
    indentGuiLine('key "game_menu" action no_action', 1),
  ].join("\n");
}

function formatGuiGeneratedCode(gui = state.gui) {
  const hasConfirmScreen = hasGuiScreenNamed(gui, "confirm");
  const hasYesNoPromptScreen = hasGuiScreenNamed(gui, "yesno_prompt");
  const screenSections = [];

  if (!hasConfirmScreen && !hasYesNoPromptScreen) {
    screenSections.push(formatFallbackConfirmScreenCode());
  }

  screenSections.push((Array.isArray(gui.screens) ? gui.screens : []).map(formatGuiScreenCode).filter(Boolean).join("\n\n"));

  const sections = [
    (Array.isArray(gui.styles) ? gui.styles : []).map(formatGuiStyleCode).filter(Boolean).join("\n\n"),
    screenSections.filter(Boolean).join("\n\n"),
    formatAllGuiConfigCode(gui),
    formatAllGuiPythonUiCode(gui),
    formatAllGuiCursorCode(gui),
    formatAllGuiShaderCode(gui),
    formatGuiReplayMenuCode(gui),
    (Array.isArray(gui.musicRooms) ? gui.musicRooms : []).map(formatGuiMusicRoomCode).filter(Boolean).join("\n\n"),
    (Array.isArray(gui.galleries) ? gui.galleries : []).map(formatGuiGalleryCode).filter(Boolean).join("\n\n"),
  ].filter(Boolean);

  return sections.join("\n\n");
}

function buildGeneratedSection(title, code) {
  const trimmed = `${code || ""}`.trim();
  return trimmed ? `# --- ${title} ---\n${trimmed}` : "";
}

function buildGeneratedArtifactCode(sections, emptyComment) {
  const bodySections = sections.filter(Boolean);

  return [
    "# This file was generated by Ren'Py Visual Editor.",
    "# Do not edit this file by hand unless you also update visual_editor/project.json.",
    "",
    ...(bodySections.length ? bodySections : [`# ${emptyComment}`]),
    "",
  ].join("\n");
}

function getGraphExportBinding(graph) {
  if (!graph) {
    return null;
  }

  return state.exportMap?.labels?.[graph.id] ?? null;
}

function getGraphExportLabel(graph) {
  const binding = getGraphExportBinding(graph);
  return `${binding?.label || graph?.label || graph?.id || "label"}`.trim() || `${graph?.id || "label"}`;
}

function getGraphExportLabelName(graph) {
  return getSafeLabelName(getGraphExportLabel(graph));
}

function buildProjectSettingsExportCode() {
  return [
    formatProjectVoiceCode(),
    formatProjectSideImageCode(),
    formatProjectSaveLoadCode(),
    formatProjectKeymapCode(),
  ].filter(Boolean).join("\n\n");
}

function buildDefinitionsExportCode() {
  return [
    ...state.definitions.map(formatDefinitionCode),
    ...state.variables.map(formatVariableCode),
    ...state.characters.map(formatCharacterCode),
    ...state.images.map(formatImageDefinitionCode),
    ...state.live2d.map(formatLive2DDefinitionCode),
    ...state.audio.map(formatAudioDefinitionCode),
    ...state.achievements.map(formatAchievementCode),
  ].filter(Boolean).join("\n\n");
}

function createManagedFileArtifact(path, sections, emptyComment, symbols = []) {
  return {
    type: "managed_file",
    path,
    code: buildGeneratedArtifactCode(sections, emptyComment),
    symbols,
  };
}

function createManagedLabelBodyArtifact(graph, binding) {
  const exportLabel = getGraphExportLabelName({
    ...graph,
    label: binding.label || graph.label,
  });
  const markerId = `${binding.markerId || ""}`.trim() || `visual-editor:${exportLabel}`;

  return {
    type: "managed_label_body",
    path: binding.path,
    label: exportLabel,
    markerId,
    code: formatLabelGraphBodyCode(graph),
    symbols: [{ type: "label", name: exportLabel }],
  };
}

function buildVisualEditorExportArtifacts() {
  state = normalizeState(state);

  const projectSettingsCode = buildProjectSettingsExportCode();
  const definitionCode = buildDefinitionsExportCode();
  const guiCode = formatGuiGeneratedCode(state.gui);
  const unmanagedGraphs = [];
  const artifacts = [
    createManagedFileArtifact(
      generatedProjectSettingsPath,
      [buildGeneratedSection("Project Settings", projectSettingsCode)],
      "No visual editor project settings were exported.",
    ),
    createManagedFileArtifact(
      generatedDefinitionsPath,
      [buildGeneratedSection("Definitions", definitionCode)],
      "No visual editor definitions were exported.",
    ),
    createManagedFileArtifact(
      generatedGuiPath,
      [buildGeneratedSection("GUI", guiCode)],
      "No visual editor GUI content was exported.",
    ),
  ];

  state.graphs.forEach((graph) => {
    const binding = getGraphExportBinding(graph);

    if (binding?.mode === "managed_label_body" && binding.path) {
      artifacts.push(createManagedLabelBodyArtifact(graph, binding));
      return;
    }

    unmanagedGraphs.push(graph);
  });

  artifacts.push(createManagedFileArtifact(
    generatedLabelsPath,
    [buildGeneratedSection("Labels", unmanagedGraphs.map(formatLabelGraphCode).filter(Boolean).join("\n\n"))],
    "No unmanaged visual editor labels were exported.",
    unmanagedGraphs.map((graph) => ({
      type: "label",
      name: getGraphExportLabelName(graph),
    })),
  ));

  return artifacts;
}

function indexBridgeSymbols(entries) {
  return Object.fromEntries(
    entries.reduce((map, entry) => {
      const key = `${entry?.name || ""}`.trim();

      if (!key) {
        return map;
      }

      if (!map.has(key)) {
        map.set(key, []);
      }

      map.get(key).push(entry);
      return map;
    }, new Map()),
  );
}

function normalizeArtifactPath(path) {
  return `${path || ""}`.trim().replace(/\\/g, "/");
}

function findVisualEditorExportConflicts(symbols, artifacts) {
  const labelIndex = indexBridgeSymbols(Array.isArray(symbols?.labels) ? symbols.labels : []);
  const conflicts = [];
  const seen = new Set();

  artifacts.forEach((artifact) => {
    const artifactPath = normalizeArtifactPath(artifact.path);
    const artifactSymbols = Array.isArray(artifact.symbols) ? artifact.symbols : [];

    artifactSymbols.forEach((symbol) => {
      if (symbol?.type !== "label") {
        return;
      }

      const symbolName = `${symbol.name || ""}`.trim();

      if (!symbolName) {
        return;
      }

      const existing = labelIndex[symbolName] || [];

      if (artifact.type === "managed_label_body") {
        const matching = existing.filter((entry) => normalizeArtifactPath(entry.path) === artifactPath);
        const conflicting = existing.filter((entry) => normalizeArtifactPath(entry.path) !== artifactPath);

        if (matching.length === 1 && !conflicting.length) {
          return;
        }

        const reference = (conflicting[0] || matching[0] || existing[0] || { path: artifactPath, line: 0 });
        const key = `${artifact.type}:${symbolName}:${reference.path}:${reference.line || 0}`;

        if (seen.has(key)) {
          return;
        }

        seen.add(key);
        conflicts.push({
          type: "label",
          name: symbolName,
          path: reference.path,
          line: reference.line || 0,
          message: `Label "${symbolName}" already exists in ${reference.path}:${reference.line || 0}; please adopt or rename before exporting.`,
        });
        return;
      }

      if (!existing.length) {
        return;
      }

      const reference = existing[0];
      const key = `${artifact.type}:${symbolName}:${reference.path}:${reference.line || 0}`;

      if (seen.has(key)) {
        return;
      }

      seen.add(key);
      conflicts.push({
        type: "label",
        name: symbolName,
        path: reference.path,
        line: reference.line || 0,
        message: `Label "${symbolName}" already exists in ${reference.path}:${reference.line || 0}; please adopt or rename before exporting.`,
      });
    });
  });

  return conflicts;
}

function summarizeVisualEditorExportConflicts(conflicts) {
  if (!conflicts.length) {
    return "";
  }

  if (conflicts.length === 1) {
    return conflicts[0].message;
  }

  return `${conflicts[0].message} ${conflicts.length - 1} additional conflict(s) found.`;
}

function getDefaultGraphMarkerId(graph) {
  return `visual-editor:${getSafeLabelName(graph?.label || "label")}`;
}

async function refreshBridgeSymbols({ force = false } = {}) {
  if (!hasBridge) {
    bridgeScriptSymbols = null;
    bridgeSymbolsLoading = false;
    return null;
  }

  if (bridgeSymbolsLoading) {
    return bridgeScriptSymbols;
  }

  if (bridgeScriptSymbols && !force) {
    return bridgeScriptSymbols;
  }

  bridgeSymbolsLoading = true;

  try {
    const response = await callBridge("symbols");
    bridgeScriptSymbols = response.symbols || { labels: [], screens: [], defines: [] };
    return bridgeScriptSymbols;
  } catch (error) {
    console.error(error);
    return bridgeScriptSymbols;
  } finally {
    bridgeSymbolsLoading = false;
  }
}

function getExistingLabelMatches(graph) {
  if (!graph) {
    return [];
  }

  const safeLabel = getSafeLabelName(graph.label);
  return Array.isArray(bridgeScriptSymbols?.labels)
    ? bridgeScriptSymbols.labels.filter((entry) => entry?.name === safeLabel)
    : [];
}

function getAvailableProjectLabelTargets() {
  return Array.isArray(bridgeScriptSymbols?.labels)
    ? [...bridgeScriptSymbols.labels].sort((left, right) => (
      `${left.path || ""}:${left.line || 0}:${left.name || ""}`
        .localeCompare(`${right.path || ""}:${right.line || 0}:${right.name || ""}`)
    ))
    : [];
}

function findGraphUsingManagedTarget(path, label, excludedGraphId = "") {
  const normalizedPath = normalizeArtifactPath(path);
  const normalizedLabel = getSafeLabelName(label);

  return state.graphs.find((graph) => {
    if (!graph || graph.id === excludedGraphId) {
      return false;
    }

    const binding = getGraphExportBinding(graph);

    return Boolean(
      binding
      && binding.mode === "managed_label_body"
      && normalizeArtifactPath(binding.path) === normalizedPath
      && getSafeLabelName(binding.label || "") === normalizedLabel
    );
  }) || null;
}

function populateLabelAdoptOptions(targets, graph) {
  if (!labelAdoptSelectEl) {
    return;
  }

  labelAdoptSelectEl.innerHTML = "";
  const currentBinding = getGraphExportBinding(graph);
  const preferredLabel = getGraphExportLabelName(graph);
  let selectedValue = "";

  targets.forEach((entry) => {
    const boundGraph = findGraphUsingManagedTarget(entry.path, entry.name, graph?.id || "");
    const option = document.createElement("option");
    const value = JSON.stringify({
      path: entry.path,
      name: entry.name,
      line: entry.line || 0,
    });
    option.value = value;
    option.textContent = boundGraph
      ? `${entry.name} - ${entry.path}:${entry.line || 0} (bound to ${boundGraph.label})`
      : `${entry.name} - ${entry.path}:${entry.line || 0}`;
    option.disabled = Boolean(boundGraph);
    labelAdoptSelectEl.appendChild(option);

    if (
      !option.disabled
      && currentBinding
      && currentBinding.path === entry.path
      && getSafeLabelName(currentBinding.label || "") === getSafeLabelName(entry.name)
    ) {
      selectedValue = value;
    } else if (!selectedValue && !option.disabled && getSafeLabelName(entry.name) === preferredLabel) {
      selectedValue = value;
    } else if (!selectedValue && !option.disabled) {
      selectedValue = value;
    }
  });

  labelAdoptSelectEl.value = selectedValue;
}

function renderLabelExportSettings() {
  if (!labelExportSettingsFormEl) {
    return;
  }

  const graph = getGraphById(labelCodePreviewGraphId);
  labelExportSettingsFormEl.classList.toggle("hidden", !graph);

  if (!graph) {
    labelExportModeInput.value = "";
    labelExportPathInput.value = "";
    labelExportLabelInput.value = "";
    labelExportMarkerInput.value = "";
    labelExportStatusNoteEl.textContent = "";
    labelAdoptSelectFieldEl?.classList.add("hidden");
    labelExportMarkerNoteEl?.classList.add("hidden");
    labelAdoptButton?.classList.add("hidden");
    labelClearExportBindingButton?.classList.add("hidden");
    return;
  }

  const binding = getGraphExportBinding(graph);
  const safeLabel = getSafeLabelName(graph.label);
  const matches = getExistingLabelMatches(graph);
  const allTargets = getAvailableProjectLabelTargets();
  const markerId = binding?.markerId || getDefaultGraphMarkerId(graph);
  const currentTargetPath = binding?.path || generatedLabelsPath;
  const currentTargetLabel = binding?.label || safeLabel;

  labelExportModeInput.value = binding?.mode === "managed_label_body" ? "Managed Existing Label" : "Generated File";
  labelExportPathInput.value = currentTargetPath;
  labelExportLabelInput.value = currentTargetLabel;
  labelExportMarkerInput.value = binding?.mode === "managed_label_body" ? markerId : "Not used";

  labelExportMarkerNoteEl.textContent = binding?.mode === "managed_label_body"
    ? `Managed marker: ${markerId}`
    : "Managed markers are only inserted after you adopt an existing project label.";
  labelExportMarkerNoteEl.classList.remove("hidden");

  if (!hasBridge) {
    labelExportStatusNoteEl.textContent = "Open this editor from the Ren'Py launcher to adopt an existing label target.";
    labelAdoptSelectFieldEl?.classList.add("hidden");
    labelAdoptButton?.classList.add("hidden");
    labelClearExportBindingButton?.classList.add("hidden");
    return;
  }

  if (bridgeSymbolsLoading && !bridgeScriptSymbols) {
    labelExportStatusNoteEl.textContent = "Scanning project scripts for matching labels...";
    labelAdoptSelectFieldEl?.classList.add("hidden");
    labelAdoptButton?.classList.add("hidden");
    labelClearExportBindingButton?.classList.add("hidden");
    return;
  }

  if (binding?.mode === "managed_label_body" && binding.path) {
    labelExportStatusNoteEl.textContent = `This graph writes into ${binding.path} under label ${binding.label || safeLabel}. Exports now replace only that managed marker block.`;
    if (allTargets.length) {
      populateLabelAdoptOptions(allTargets, graph);
      labelAdoptSelectFieldEl?.classList.remove("hidden");
      labelAdoptButton.textContent = "Rebind To Selected Label";
      labelAdoptButton?.classList.toggle("hidden", !labelAdoptSelectEl?.value);
      if (!labelAdoptSelectEl?.value) {
        labelExportStatusNoteEl.textContent += " All discovered targets are currently bound to other label graphs.";
      }
    } else {
      labelAdoptSelectFieldEl?.classList.add("hidden");
      labelAdoptButton?.classList.add("hidden");
    }
    labelClearExportBindingButton?.classList.remove("hidden");
    return;
  }

  labelClearExportBindingButton?.classList.add("hidden");

  if (allTargets.length) {
    labelExportStatusNoteEl.textContent = matches.length
      ? `Found ${matches.length} matching "${safeLabel}" label target(s). You can adopt any existing project label below to export this graph into an original script file with automatic backup and managed markers.`
      : `No same-name "${safeLabel}" label was found, but you can still bind this graph to another existing project label below.`;
    populateLabelAdoptOptions(allTargets, graph);
    labelAdoptSelectFieldEl?.classList.remove("hidden");
    labelAdoptButton.textContent = "Adopt Selected Label";
    labelAdoptButton?.classList.toggle("hidden", !labelAdoptSelectEl?.value);
    if (!labelAdoptSelectEl?.value) {
      labelExportStatusNoteEl.textContent += " All discovered targets are currently bound to other label graphs.";
    }
    return;
  }

  labelExportStatusNoteEl.textContent = `No existing project labels were found. This graph will keep exporting to game/generated_visual_editor.rpy until you add a target script label later.`;
  labelAdoptSelectFieldEl?.classList.add("hidden");
  labelAdoptButton?.classList.add("hidden");
}

async function adoptExistingLabelForGraph() {
  const graph = getGraphById(labelCodePreviewGraphId);

  if (!graph || !hasBridge || !labelAdoptSelectEl?.value) {
    return;
  }

  let selected = null;

  try {
    selected = JSON.parse(labelAdoptSelectEl.value);
  } catch (error) {
    console.error(error);
    setStatus("Adopt failed: could not read the selected label target.");
    return;
  }

  const existingBindingOwner = findGraphUsingManagedTarget(selected.path, selected.name, graph.id);

  if (existingBindingOwner) {
    setStatus(`Adopt failed: ${selected.name} in ${selected.path} is already bound to "${existingBindingOwner.label}".`);
    return;
  }

  const markerId = getDefaultGraphMarkerId(graph);

  try {
    const response = await callBridge("adopt_label", {
      path: selected.path,
      label: selected.name,
      markerId,
    });

    state.exportMap.labels[graph.id] = normalizeLabelExportBinding({
      mode: "managed_label_body",
      path: response.path,
      label: selected.name,
      markerId: response.markerId,
    }, graph.id);
    saveState(response.alreadyManaged
      ? `Reused existing managed label ${selected.name} in ${response.path}.`
      : `Adopted ${selected.name} in ${response.path}. Backup saved to ${response.backupPath}.`);
    await refreshBridgeSymbols({ force: true });
    renderLabelExportSettings();
    syncLabelCodePreview();
  } catch (error) {
    console.error(error);
    setStatus(`Adopt failed: ${error.message}`);
  }
}

function clearGraphExportBinding(graphId) {
  if (!state.exportMap?.labels?.[graphId]) {
    return;
  }

  delete state.exportMap.labels[graphId];
  saveState("This label will export back to game/generated_visual_editor.rpy.");
  renderLabelExportSettings();
}

function formatGeneratedVisualEditorCode() {
  state = normalizeState(state);

  const projectSettingsCode = buildProjectSettingsExportCode();
  const definitionCode = buildDefinitionsExportCode();
  const labelCode = state.graphs.map(formatLabelGraphCode).filter(Boolean).join("\n\n");
  const guiCode = formatGuiGeneratedCode(state.gui);
  const sections = [
    buildGeneratedSection("Project Settings", projectSettingsCode),
    buildGeneratedSection("Definitions", definitionCode),
    buildGeneratedSection("GUI", guiCode),
    buildGeneratedSection("Labels", labelCode),
  ].filter(Boolean);

  return [
    "# This file was generated by Ren'Py Visual Editor.",
    "# Do not edit this file by hand unless you also update visual_editor/project.json.",
    "",
    ...sections,
    "",
  ].join("\n");
}

function formatReplayActionForGraph(graph) {
  if (!graph?.replay?.enabled) {
    return "# Replay is disabled for this label.";
  }

  const args = [formatRenpyQuotedString(getSafeLabelName(graph.label))];
  const replayScope = `${graph.replay.scope || ""}`.trim();

  if (replayScope) {
    args.push(`scope=${replayScope}`);
  }

  if (graph.replay.lockedMode === "locked") {
    args.push("locked=True");
  } else if (graph.replay.lockedMode === "unlocked") {
    args.push("locked=False");
  }

  return `Replay(${args.join(", ")})`;
}

function syncLabelReplaySettings() {
  const graph = getGraphById(labelCodePreviewGraphId);

  if (!labelReplaySettingsFormEl) {
    return;
  }

  labelReplaySettingsFormEl.classList.toggle("hidden", !graph);

  if (!graph) {
    labelReplayEnabledInput.checked = false;
    labelReplayTitleInput.value = "";
    labelReplayLockedModeInput.value = "auto";
    labelReplayScopeInput.value = "";
    labelReplayAutoEndInput.checked = false;
    labelReplayActionPreviewEl.textContent = "";
    return;
  }

  const replay = normalizeGraphReplay(graph.replay, graph.label);
  graph.replay = replay;
  labelReplayEnabledInput.checked = replay.enabled;
  labelReplayTitleInput.value = replay.title;
  labelReplayLockedModeInput.value = replay.lockedMode;
  labelReplayScopeInput.value = replay.scope;
  labelReplayAutoEndInput.checked = replay.autoEnd;
  labelReplayActionPreviewEl.textContent = formatReplayActionForGraph(graph);
}

function syncLabelCodePreview() {
  const graph = getGraphById(labelCodePreviewGraphId);

  if (!graph) {
    labelCodePreviewTitleEl.textContent = "";
    syncLabelReplaySettings();
    labelCodePreviewEl.textContent = "";
    return;
  }

  labelCodePreviewTitleEl.textContent = graph.label;
  syncLabelReplaySettings();
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

function updateLabelReplaySettings(patch) {
  const graph = getGraphById(labelCodePreviewGraphId);

  if (!graph) {
    return;
  }

  const previousTitle = `${graph.replay?.title || ""}`.trim();
  graph.replay = normalizeGraphReplay({
    ...graph.replay,
    ...patch,
    title: Object.prototype.hasOwnProperty.call(patch, "title")
      ? patch.title
      : previousTitle,
  }, graph.label);
  syncLabelCodePreview();
  renderLabelGraphList();
  renderVisualProjectStats();
  saveState();
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
    const previousLabel = graph.label;
    const normalizedLabel = nextLabel.trim() || graph.label;

    if (normalizedLabel !== graph.label) {
      state.graphs.forEach((currentGraph) => {
        currentGraph.nodes = currentGraph.nodes.map((node) => {
          if (!isFlowNode(node) || node.flowTargetGraphId !== graphId) {
            return node;
          }

          return {
            ...node,
            flowTargetLabel: normalizedLabel,
            content: normalizedLabel,
          };
        });
      });

      graph.label = normalizedLabel;
      if ((graph.replay?.title || "").trim() === previousLabel.trim()) {
        graph.replay = normalizeGraphReplay({
          ...graph.replay,
          title: normalizedLabel,
        }, normalizedLabel);
      }
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
    const replayMeta = graph.replay?.enabled ? " · replay" : "";
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
      meta.textContent = `${graph.nodes.length} blocks${replayMeta}`;

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
        <span>${graph.nodes.length} blocks${escapeHtml(replayMeta)}</span>
      `;

      item.addEventListener("click", () => {
        state.activeGraphId = graph.id;
        setContextMenuState(false);
        setLabelContextMenuState(false);
        setImageContextMenuState(false);
        setAudioContextMenuState(false);
        setCharacterContextMenuState(false);
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
          setImageContextMenuState(false);
          setAudioContextMenuState(false);
          setCharacterContextMenuState(false);
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
        setImageContextMenuState(false);
        setAudioContextMenuState(false);
        setCharacterContextMenuState(false);
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
  render();
  saveState(`Deleted image "${image.name}".`);
}

function formatDisplayableConstructorExpression(constructorName, parts = []) {
  if (!parts.length) {
    return `${constructorName}()`;
  }

  return `${constructorName}(\n    ${parts.join(",\n    ")}\n)`;
}

function formatImageDefinitionDisplayableExpression(image) {
  if (!image) {
    return "";
  }

  const definitionType = getImageDefinitionType(image);

  if (definitionType === "movie") {
    const moviePlay = `${image.moviePlay || ""}`.trim() || "movies/example.webm";
    const args = [
      `play="${escapeRenpyString(moviePlay)}"`,
    ];
    const movieSize = `${image.movieSize || ""}`.trim();
    const movieChannel = `${image.movieChannel || ""}`.trim() || "movie";
    const movieMask = `${image.movieMask || ""}`.trim();
    const movieMaskChannel = `${image.movieMaskChannel || ""}`.trim();
    const movieStartImage = formatMovieDisplayableValue(image.movieStartImage);
    const movieFallbackImage = formatMovieDisplayableValue(image.movieFallbackImage);
    const movieGroup = `${image.movieGroup || ""}`.trim();
    const movieLoop = getImageDefinitionMovieLoop(image);

    if (movieSize) {
      args.push(`size=${movieSize}`);
    }

    if (movieChannel && movieChannel !== "movie") {
      args.push(`channel="${escapeRenpyString(movieChannel)}"`);
    }

    if (image.movieSideMask) {
      args.push("side_mask=True");
    }

    if (movieMask) {
      args.push(`mask="${escapeRenpyString(movieMask)}"`);
    }

    if (movieMaskChannel) {
      args.push(`mask_channel="${escapeRenpyString(movieMaskChannel)}"`);
    }

    if (movieStartImage) {
      args.push(`start_image=${movieStartImage}`);
    }

    if (movieFallbackImage) {
      args.push(`image=${movieFallbackImage}`);
    }

    if (!movieLoop) {
      args.push("loop=False");
    }

    if (movieGroup) {
      args.push(`group="${escapeRenpyString(movieGroup)}"`);
    }

    if (image.movieKeepLastFrame) {
      args.push("keep_last_frame=True");
    }

    return formatDisplayableConstructorExpression("Movie", args);
  }

  if (definitionType === "solid") {
    const solidColor = `${image.solidColor || ""}`.trim() || imageDefinitionFieldDefaults.solidColor;
    return formatDisplayableConstructorExpression("Solid", [
      formatRenpyQuotedString(solidColor),
    ]);
  }

  if (definitionType === "composite") {
    const compositeSize = `${image.compositeSize || ""}`.trim() || "(1920, 1080)";
    const layers = normalizeCompositeLayers(image.compositeLayers);
    const parts = [compositeSize];

    if (!layers.length) {
      parts.push("(0, 0)", "Null()");
    } else {
      layers.forEach((layer) => {
        parts.push(
          `${layer.position || ""}`.trim() || "(0, 0)",
          formatMovieDisplayableValue(layer.displayable) || "Null()",
        );
      });
    }

    return formatDisplayableConstructorExpression("Composite", parts);
  }

  if (definitionType === "placeholder") {
    const args = [];
    const placeholderBase = `${image.placeholderBase || ""}`.trim() || imageDefinitionFieldDefaults.placeholderBase;
    const placeholderText = `${image.placeholderText || ""}`.trim();

    if (placeholderBase !== "auto") {
      args.push(formatRenpyQuotedString(placeholderBase));
    }

    if (image.placeholderFull) {
      args.push("full=True");
    }

    if (image.placeholderFlip) {
      args.push("flip=True");
    }

    if (placeholderText) {
      args.push(`text=${formatRenpyQuotedString(placeholderText)}`);
    }

    return formatDisplayableConstructorExpression("Placeholder", args);
  }

  const sourcePath = image.sourcePath.trim() || "images/example.png";
  return formatRenpyQuotedString(sourcePath);
}

function formatAtlExpression(prefix, expression) {
  const lines = `${expression || ""}`.trim().split("\n");
  const firstLine = lines[0] || "Null()";

  return [
    `    ${prefix} ${firstLine}`,
    ...lines.slice(1).map((line) => `    ${line}`),
  ];
}

function formatImageDefinitionTransformLines(image) {
  const lines = [];

  imageDefinitionCodePropertyOrder.forEach((field) => {
    const value = image[field];

    if (imageDefinitionBooleanFields.has(field)) {
      if (value) {
        lines.push(`    ${field} True`);
      }
      return;
    }

    const normalizedValue = `${value ?? ""}`.trim();

    if (normalizedValue) {
      lines.push(`    ${field} ${normalizedValue}`);
    }
  });

  return lines;
}

function formatLayeredDisplayableValue(value) {
  const normalizedValue = `${value || ""}`.trim();

  if (!normalizedValue) {
    return "Null()";
  }

  const isQuotedString = (
    (normalizedValue.startsWith("\"") && normalizedValue.endsWith("\""))
    || (normalizedValue.startsWith("'") && normalizedValue.endsWith("'"))
  );

  if (
    isQuotedString
    || normalizedValue.includes("(")
    || normalizedValue.startsWith("[")
    || normalizedValue.startsWith("{")
  ) {
    return normalizedValue;
  }

  return formatRenpyQuotedString(normalizedValue);
}

function formatLayeredDisplayableBlock(indent, displayable, whenExpression, atValue) {
  const lines = [];

  if (`${displayable || ""}`.trim()) {
    lines.push(`${indent}${formatLayeredDisplayableValue(displayable)}`);
  }

  if (`${whenExpression || ""}`.trim()) {
    lines.push(`${indent}when ${whenExpression.trim()}`);
  }

  if (`${atValue || ""}`.trim()) {
    lines.push(`${indent}at ${atValue.trim()}`);
  }

  if (!lines.length) {
    lines.push(`${indent}Null()`);
  }

  return lines;
}

function formatLayeredAttributeLines(attribute, indent = "        ") {
  const headerParts = ["attribute", attribute.name.trim() || "attribute_name"];

  if (attribute.displayMode === "null") {
    headerParts.push("null");
  }

  if (attribute.isDefault) {
    headerParts.push("default");
  }

  const hasBlock = (
    attribute.displayMode === "explicit"
    || `${attribute.when || ""}`.trim()
    || `${attribute.at || ""}`.trim()
  );

  if (!hasBlock) {
    return [`${indent}${headerParts.join(" ")}`];
  }

  return [
    `${indent}${headerParts.join(" ")}:`,
    ...formatLayeredDisplayableBlock(
      `${indent}    `,
      attribute.displayMode === "explicit" ? attribute.displayable : "",
      attribute.when,
      attribute.at,
    ),
  ];
}

function formatLayeredImageDefinitionCode(image) {
  const safeName = image.name.trim() || "layered_image";
  const lines = [`layeredimage ${safeName}:`];
  const layeredAlwaysLayers = normalizeLayeredAlwaysLayers(image.layeredAlwaysLayers);
  const layeredGroups = normalizeLayeredGroups(image.layeredGroups);

  if (`${image.layeredImageFormat || ""}`.trim()) {
    lines.push(`    image_format ${formatRenpyQuotedString(image.layeredImageFormat)}`);
  }

  if (image.layeredOfferScreen === "true") {
    lines.push("    offer_screen True");
  } else if (image.layeredOfferScreen === "false") {
    lines.push("    offer_screen False");
  }

  if (`${image.layeredAt || ""}`.trim()) {
    lines.push(`    at ${image.layeredAt.trim()}`);
  }

  if (!layeredAlwaysLayers.length && !layeredGroups.length) {
    lines.push("    always:");
    lines.push("        Null()");
    return lines.join("\n");
  }

  layeredAlwaysLayers.forEach((layer) => {
    lines.push("");
    lines.push("    always:");
    lines.push(...formatLayeredDisplayableBlock("        ", layer.displayable, layer.when, layer.at));
  });

  layeredGroups.forEach((group) => {
    lines.push("");

    const groupHead = [
      "group",
      group.mode === "multiple" ? "multiple" : (group.name.trim() || "group_name"),
    ];

    if (group.mode !== "multiple") {
      if (group.auto) {
        groupHead.push("auto");
      }

      if (group.variant.trim()) {
        groupHead.push("variant", group.variant.trim());
      }

      if (group.prefix.trim()) {
        groupHead.push("prefix", group.prefix.trim());
      }
    }

    lines.push(`    ${groupHead.join(" ")}:`);

    normalizeLayeredAttributes(group.attributes, {
      allowDefaults: group.mode !== "multiple",
    }).forEach((attribute) => {
      lines.push(...formatLayeredAttributeLines(attribute));
    });
  });

  return lines.join("\n");
}

function formatImageAtlStepLines(image) {
  if (!image?.atlEnabled) {
    return [];
  }

  return normalizeImageAtlSteps(image.atlSteps).flatMap((step) => {
    if (step.type === "pause") {
      return [`    pause ${step.duration || "1.0"}`];
    }

    if (step.type === "repeat") {
      return ["    repeat"];
    }

    if (step.type === "contains") {
      return formatAtlExpression("contains", step.expression || "\"images/example.png\"");
    }

    if (step.type === "set") {
      const properties = `${step.properties || "xalign 0.5"}`.trim();
      return properties.split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => `    ${line}`);
    }

    const warper = imageAtlWarperOptions.includes(step.warper) ? step.warper : "linear";
    const duration = `${step.duration || ""}`.trim() || "1.0";
    const properties = `${step.properties || "xalign 1.0"}`.trim();
    const propertyLines = properties.split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    if (propertyLines.length <= 1) {
      return [`    ${warper} ${duration} ${propertyLines[0] || "xalign 1.0"}`];
    }

    return [
      `    ${warper} ${duration}`,
      ...propertyLines.map((line) => `        ${line}`),
    ];
  });
}

function getImageDefinitionStatementPrefix(image) {
  return image?.isSideImage ? "image side" : "image";
}

function formatImageDefinitionCode(image) {
  if (!image) {
    return "";
  }

  const safeName = image.name.trim() || "image_name";
  const definitionType = getImageDefinitionType(image);
  const statementPrefix = getImageDefinitionStatementPrefix(image);

  if (definitionType === "layered") {
    return formatLayeredImageDefinitionCode(image);
  }

  if (!image.atlEnabled && definitionType !== "static") {
    return `${statementPrefix} ${safeName} = ${formatImageDefinitionDisplayableExpression(image)}`;
  }

  const displayableExpression = formatImageDefinitionDisplayableExpression(image);
  const lines = [`${statementPrefix} ${safeName}:`];

  if (definitionType === "static") {
    lines.push(`    ${displayableExpression}`);
  } else {
    lines.push(...formatAtlExpression("contains", displayableExpression));
  }

  lines.push(
    ...formatImageDefinitionTransformLines(image),
    ...formatImageAtlStepLines(image),
  );

  return lines.join("\n");
}

function setImageDefinitionTypeFieldVisibility(definitionType) {
  imageDefinitionStaticFieldsEl.classList.toggle("hidden", definitionType !== "static");
  imageDefinitionLayeredFieldsEl.classList.toggle("hidden", definitionType !== "layered");
  imageDefinitionMovieFieldsEl.classList.toggle("hidden", definitionType !== "movie");
  imageDefinitionSolidFieldsEl.classList.toggle("hidden", definitionType !== "solid");
  imageDefinitionCompositeFieldsEl.classList.toggle("hidden", definitionType !== "composite");
  imageDefinitionPlaceholderFieldsEl.classList.toggle("hidden", definitionType !== "placeholder");
  imageDefinitionAnimationFieldsEl.classList.toggle("hidden", definitionType === "layered");
}

function syncImageDefinitionSideImageHelp(image) {
  if (!imageDefinitionSideImageHelpEl || !imageDefinitionIsSideImageInput) {
    return;
  }

  const definitionType = image ? getImageDefinitionType(image) : "static";
  const isLayered = definitionType === "layered";
  const isSideImage = Boolean(image?.isSideImage) && !isLayered;
  let message = "";

  if (isLayered) {
    imageDefinitionIsSideImageInput.setAttribute("disabled", "disabled");
    message = "Layered images themselves are not emitted as `image side ...`. Create a separate side image definition when you want a cropped or proxy portrait.";
  } else {
    imageDefinitionIsSideImageInput.removeAttribute("disabled");

    if (isSideImage) {
      message = "Use the Image Name field for the linked tag plus optional attributes, for example `eileen happy`. The generated code will start with `image side ...`.";
    }
  }

  imageDefinitionSideImageHelpEl.textContent = message;
  imageDefinitionSideImageHelpEl.classList.toggle("hidden", !message);
}

function renderCompositeLayerList(image) {
  if (!imageDefinitionCompositeLayerListEl || !imageDefinitionCompositeDisplayableOptionsEl) {
    return;
  }

  if (!image || getImageDefinitionType(image) !== "composite") {
    imageDefinitionCompositeLayerListEl.innerHTML = "";
    imageDefinitionCompositeDisplayableOptionsEl.innerHTML = "";
    return;
  }

  const layers = normalizeCompositeLayers(image.compositeLayers);
  image.compositeLayers = layers;

  imageDefinitionCompositeDisplayableOptionsEl.innerHTML = state.images
    .filter((candidate) => candidate.id !== image.id)
    .map((candidate) => `<option value="${escapeHtml(candidate.name)}"></option>`)
    .join("");

  if (!layers.length) {
    imageDefinitionCompositeLayerListEl.innerHTML = `
      <p class="image-definition-empty">No layers yet. Add one to stack displayables into a single image definition.</p>
    `;
    return;
  }

  imageDefinitionCompositeLayerListEl.innerHTML = layers.map((layer, index) => `
    <div class="menu-choice-item">
      <div class="menu-choice-item-header">
        <span>Layer ${index + 1}</span>
        <button
          class="danger-button menu-choice-remove-button"
          type="button"
          data-remove-composite-layer-id="${escapeHtml(layer.id)}"
        >
          Remove
        </button>
      </div>

      <label>
        Position
        <input
          type="text"
          value="${escapeHtml(layer.position || "")}"
          placeholder="e.g. (0, 0)"
          data-image-composite-layer-id="${escapeHtml(layer.id)}"
          data-image-composite-layer-field="position"
        />
      </label>

      <label>
        Displayable
        <input
          type="text"
          value="${escapeHtml(layer.displayable || "")}"
          placeholder='e.g. "body.png" or character_body'
          list="imageDefinitionCompositeDisplayableOptions"
          data-image-composite-layer-id="${escapeHtml(layer.id)}"
          data-image-composite-layer-field="displayable"
        />
      </label>
    </div>
  `).join("");
}

function renderLayeredDisplayableOptions(image) {
  if (!imageDefinitionLayeredDisplayableOptionsEl) {
    return;
  }

  imageDefinitionLayeredDisplayableOptionsEl.innerHTML = state.images
    .filter((candidate) => candidate.id !== image?.id)
    .map((candidate) => `<option value="${escapeHtml(candidate.name)}"></option>`)
    .join("");
}

function renderLayeredAlwaysLayerList(image) {
  if (!imageDefinitionLayeredAlwaysListEl || !imageDefinitionLayeredDisplayableOptionsEl) {
    return;
  }

  if (!image || getImageDefinitionType(image) !== "layered") {
    imageDefinitionLayeredAlwaysListEl.innerHTML = "";
    imageDefinitionLayeredDisplayableOptionsEl.innerHTML = "";
    return;
  }

  const layeredAlwaysLayers = normalizeLayeredAlwaysLayers(image.layeredAlwaysLayers);
  image.layeredAlwaysLayers = layeredAlwaysLayers;
  renderLayeredDisplayableOptions(image);

  if (!layeredAlwaysLayers.length) {
    imageDefinitionLayeredAlwaysListEl.innerHTML = `
      <p class="image-definition-empty">No always layers yet. Add a base layer here so the layered image has a body or other persistent parts.</p>
    `;
    return;
  }

  imageDefinitionLayeredAlwaysListEl.innerHTML = layeredAlwaysLayers.map((layer, index) => `
    <div class="menu-choice-item">
      <div class="menu-choice-item-header">
        <span>Always ${index + 1}</span>
        <button
          class="danger-button menu-choice-remove-button"
          type="button"
          data-remove-layered-always-id="${escapeHtml(layer.id)}"
        >
          Remove
        </button>
      </div>

      <label>
        Displayable
        <input
          type="text"
          value="${escapeHtml(layer.displayable || "")}"
          placeholder='e.g. eileen_base or "eileen_base"'
          list="imageDefinitionLayeredDisplayableOptions"
          data-layered-always-id="${escapeHtml(layer.id)}"
          data-layered-always-field="displayable"
        />
      </label>

      <label>
        when
        <input
          type="text"
          value="${escapeHtml(layer.when || "")}"
          placeholder="e.g. ribbon and not hat"
          data-layered-always-id="${escapeHtml(layer.id)}"
          data-layered-always-field="when"
        />
      </label>

      <label>
        at
        <input
          type="text"
          value="${escapeHtml(layer.at || "")}"
          placeholder="e.g. character_outline_transform"
          data-layered-always-id="${escapeHtml(layer.id)}"
          data-layered-always-field="at"
        />
      </label>
    </div>
  `).join("");
}

function renderLayeredGroupList(image) {
  if (!imageDefinitionLayeredGroupListEl || !imageDefinitionLayeredDisplayableOptionsEl) {
    return;
  }

  if (!image || getImageDefinitionType(image) !== "layered") {
    imageDefinitionLayeredGroupListEl.innerHTML = "";
    imageDefinitionLayeredDisplayableOptionsEl.innerHTML = "";
    return;
  }

  const layeredGroups = normalizeLayeredGroups(image.layeredGroups);
  image.layeredGroups = layeredGroups;
  renderLayeredDisplayableOptions(image);

  if (!layeredGroups.length) {
    imageDefinitionLayeredGroupListEl.innerHTML = `
      <p class="image-definition-empty">No groups yet. Add one for face, outfit, accessories, or any other attribute set.</p>
    `;
    return;
  }

  imageDefinitionLayeredGroupListEl.innerHTML = layeredGroups.map((group, groupIndex) => `
    <details
      class="menu-choice-item layered-group-item layered-collapsible"
      data-layered-group-details-id="${escapeHtml(group.id)}"
      ${isLayeredGroupExpanded(group.id) ? "open" : ""}
    >
      <summary class="layered-collapsible-summary">
        <div class="layered-collapsible-summary-copy">
          <strong class="layered-collapsible-title">${escapeHtml(group.name || `Group ${groupIndex + 1}`)}</strong>
          <span class="layered-collapsible-meta">
            ${escapeHtml(group.mode === "multiple" ? "Multiple" : "Single")}
            ·
            ${escapeHtml(`${normalizeLayeredAttributes(group.attributes, { allowDefaults: group.mode !== "multiple" }).length} attributes`)}
          </span>
        </div>
      </summary>

      <div class="layered-collapsible-body">
        <div class="menu-choice-item-header layered-collapsible-toolbar">
          <span>Group ${groupIndex + 1}</span>
          <button
            class="danger-button menu-choice-remove-button"
            type="button"
            data-remove-layered-group-id="${escapeHtml(group.id)}"
          >
            Remove
          </button>
        </div>

        <div class="layered-inline-grid">
          <label>
            Group Mode
            <select
              data-layered-group-id="${escapeHtml(group.id)}"
              data-layered-group-field="mode"
            >
              <option value="single" ${group.mode === "single" ? "selected" : ""}>Single / Exclusive</option>
              <option value="multiple" ${group.mode === "multiple" ? "selected" : ""}>Multiple / Non-exclusive</option>
            </select>
          </label>

          <label class="${group.mode === "multiple" ? "hidden" : ""}">
            Group Name
            <input
              type="text"
              value="${escapeHtml(group.name || "")}"
              placeholder="e.g. face"
              data-layered-group-id="${escapeHtml(group.id)}"
              data-layered-group-field="name"
            />
          </label>

          <label class="${group.mode === "multiple" ? "hidden" : ""}">
            Variant
            <input
              type="text"
              value="${escapeHtml(group.variant || "")}"
              placeholder="e.g. blue"
              data-layered-group-id="${escapeHtml(group.id)}"
              data-layered-group-field="variant"
            />
          </label>

          <label class="${group.mode === "multiple" ? "hidden" : ""}">
            Prefix
            <input
              type="text"
              value="${escapeHtml(group.prefix || "")}"
              placeholder="e.g. ribbon"
              data-layered-group-id="${escapeHtml(group.id)}"
              data-layered-group-field="prefix"
            />
          </label>
        </div>

        <label class="character-checkbox ${group.mode === "multiple" ? "hidden" : ""}">
          <input
            type="checkbox"
            ${group.auto ? "checked" : ""}
            data-layered-group-id="${escapeHtml(group.id)}"
            data-layered-group-field="auto"
          />
          <span>auto group</span>
        </label>

        <div class="menu-choice-group">
          <div class="menu-choice-group-header">
            <strong>Attributes</strong>
            <button
              class="secondary menu-choice-add-button"
              type="button"
              data-add-layered-attribute-group-id="${escapeHtml(group.id)}"
            >
              Add Attribute
            </button>
          </div>

          <div class="menu-choice-list layered-attribute-list">
            ${normalizeLayeredAttributes(group.attributes, { allowDefaults: group.mode !== "multiple" }).map((attribute, attributeIndex) => `
              <details
                class="menu-choice-item layered-attribute-item layered-collapsible layered-collapsible-subtle"
                data-layered-attribute-group-id="${escapeHtml(group.id)}"
                data-layered-attribute-details-id="${escapeHtml(attribute.id)}"
                ${isLayeredAttributeExpanded(group.id, attribute.id) ? "open" : ""}
              >
                <summary class="layered-collapsible-summary">
                  <div class="layered-collapsible-summary-copy">
                    <strong class="layered-collapsible-title">${escapeHtml(attribute.name || `Attribute ${attributeIndex + 1}`)}</strong>
                    <span class="layered-collapsible-meta">
                      ${escapeHtml(getLayeredAttributeDisplayModeLabel(attribute.displayMode))}
                      ${attribute.isDefault ? " · Default" : ""}
                    </span>
                  </div>
                </summary>

                <div class="layered-collapsible-body">
                  <div class="menu-choice-item-header layered-collapsible-toolbar">
                    <span>Attribute ${attributeIndex + 1}</span>
                    <button
                      class="danger-button menu-choice-remove-button"
                      type="button"
                      data-remove-layered-attribute-id="${escapeHtml(attribute.id)}"
                      data-remove-layered-attribute-group-id="${escapeHtml(group.id)}"
                    >
                      Remove
                    </button>
                  </div>

                  <div class="layered-inline-grid">
                    <label>
                      Name
                      <input
                        type="text"
                        value="${escapeHtml(attribute.name || "")}"
                        placeholder="e.g. happy"
                        data-layered-group-id="${escapeHtml(group.id)}"
                        data-layered-attribute-id="${escapeHtml(attribute.id)}"
                        data-layered-attribute-field="name"
                      />
                    </label>

                    <label>
                      Display Mode
                      <select
                        data-layered-group-id="${escapeHtml(group.id)}"
                        data-layered-attribute-id="${escapeHtml(attribute.id)}"
                        data-layered-attribute-field="displayMode"
                      >
                        <option value="auto" ${attribute.displayMode === "auto" ? "selected" : ""}>Auto Pattern</option>
                        <option value="explicit" ${attribute.displayMode === "explicit" ? "selected" : ""}>Explicit Displayable</option>
                        <option value="null" ${attribute.displayMode === "null" ? "selected" : ""}>Null</option>
                      </select>
                    </label>
                  </div>

                  <label class="${attribute.displayMode === "explicit" ? "" : "hidden"}">
                    Displayable
                    <input
                      type="text"
                      value="${escapeHtml(attribute.displayable || "")}"
                      placeholder='e.g. eileen_face_happy or "eileen_face_happy"'
                      list="imageDefinitionLayeredDisplayableOptions"
                      data-layered-group-id="${escapeHtml(group.id)}"
                      data-layered-attribute-id="${escapeHtml(attribute.id)}"
                      data-layered-attribute-field="displayable"
                    />
                  </label>

                  <div class="layered-inline-grid">
                    <label>
                      when
                      <input
                        type="text"
                        value="${escapeHtml(attribute.when || "")}"
                        placeholder="e.g. dress and not hat"
                        data-layered-group-id="${escapeHtml(group.id)}"
                        data-layered-attribute-id="${escapeHtml(attribute.id)}"
                        data-layered-attribute-field="when"
                      />
                    </label>

                    <label>
                      at
                      <input
                        type="text"
                        value="${escapeHtml(attribute.at || "")}"
                        placeholder="e.g. blink_transform"
                        data-layered-group-id="${escapeHtml(group.id)}"
                        data-layered-attribute-id="${escapeHtml(attribute.id)}"
                        data-layered-attribute-field="at"
                      />
                    </label>
                  </div>

                  <label class="character-checkbox ${group.mode === "multiple" ? "hidden" : ""}">
                    <input
                      type="checkbox"
                      ${attribute.isDefault ? "checked" : ""}
                      data-layered-group-id="${escapeHtml(group.id)}"
                      data-layered-attribute-id="${escapeHtml(attribute.id)}"
                      data-layered-attribute-field="isDefault"
                    />
                    <span>default</span>
                  </label>
                </div>
              </details>
            `).join("")}
          </div>
        </div>
      </div>
    </details>
  `).join("");
}

function renderImageAtlStepTypeOptions(currentType) {
  return Object.entries(imageAtlStepTypeMeta)
    .map(([value, meta]) => `
      <option value="${escapeHtml(value)}" ${currentType === value ? "selected" : ""}>${escapeHtml(meta.label)}</option>
    `)
    .join("");
}

function renderImageAtlStepWarperOptions(currentWarper) {
  return imageAtlWarperOptions
    .map((value) => `
      <option value="${escapeHtml(value)}" ${currentWarper === value ? "selected" : ""}>${escapeHtml(value)}</option>
    `)
    .join("");
}

function renderImageAtlStepFields(step) {
  if (step.type === "pause") {
    return `
      <div class="atl-step-fields">
        <label>
          Duration
          <input
            type="text"
            value="${escapeHtml(step.duration || "")}"
            placeholder="e.g. 1.0"
            data-image-atl-step-id="${escapeHtml(step.id)}"
            data-image-atl-step-field="duration"
          />
        </label>
      </div>
    `;
  }

  if (step.type === "contains") {
    return `
      <div class="atl-step-fields">
        <label>
          Displayable Expression
          <textarea
            rows="2"
            placeholder='e.g. "images/pose.png" or Composite((300, 600), (0, 0), "body.png")'
            data-image-atl-step-id="${escapeHtml(step.id)}"
            data-image-atl-step-field="expression"
          >${escapeHtml(step.expression || "")}</textarea>
        </label>
      </div>
    `;
  }

  if (step.type === "repeat") {
    return `
      <p class="image-definition-help">Repeat loops the current ATL sequence from this point.</p>
    `;
  }

  if (step.type === "set") {
    return `
      <div class="atl-step-fields">
        <label>
          Properties
          <textarea
            rows="2"
            placeholder="e.g. xalign 0.5"
            data-image-atl-step-id="${escapeHtml(step.id)}"
            data-image-atl-step-field="properties"
          >${escapeHtml(step.properties || "")}</textarea>
        </label>
      </div>
    `;
  }

  return `
    <div class="atl-step-fields">
      <label>
        Warper
        <select
          data-image-atl-step-id="${escapeHtml(step.id)}"
          data-image-atl-step-field="warper"
        >
          ${renderImageAtlStepWarperOptions(step.warper)}
        </select>
      </label>

      <label>
        Duration
        <input
          type="text"
          value="${escapeHtml(step.duration || "")}"
          placeholder="e.g. 1.0"
          data-image-atl-step-id="${escapeHtml(step.id)}"
          data-image-atl-step-field="duration"
        />
      </label>

      <label>
        Properties
        <textarea
          rows="2"
          placeholder="e.g. xalign 1.0"
          data-image-atl-step-id="${escapeHtml(step.id)}"
          data-image-atl-step-field="properties"
        >${escapeHtml(step.properties || "")}</textarea>
      </label>
    </div>
  `;
}

function renderImageAtlStepList(image) {
  if (!imageDefinitionAtlEditorEl || !imageDefinitionAtlStepListEl) {
    return;
  }

  if (!image || !image.atlEnabled) {
    imageDefinitionAtlEditorEl.classList.add("hidden");
    imageDefinitionAtlStepListEl.innerHTML = "";
    return;
  }

  imageDefinitionAtlEditorEl.classList.remove("hidden");

  const steps = normalizeImageAtlSteps(image.atlSteps);
  image.atlSteps = steps;

  if (!steps.length) {
    imageDefinitionAtlStepListEl.innerHTML = `
      <p class="image-definition-empty">No ATL steps yet. Add one to start building animation timing.</p>
    `;
    return;
  }

  imageDefinitionAtlStepListEl.innerHTML = steps.map((step, index) => `
    <div class="menu-choice-item image-atl-step">
      <div class="menu-choice-item-header">
        <span>Step ${index + 1}</span>
        <button
          class="danger-button menu-choice-remove-button"
          type="button"
          data-remove-atl-step-id="${escapeHtml(step.id)}"
        >
          Remove
        </button>
      </div>

      <label>
        Step Type
        <select
          data-image-atl-step-id="${escapeHtml(step.id)}"
          data-image-atl-step-field="type"
        >
          ${renderImageAtlStepTypeOptions(step.type)}
        </select>
      </label>

      ${renderImageAtlStepFields(step)}
    </div>
  `).join("");
}

function setMatrixColorBuilderModeVisibility(mode) {
  Object.entries(matrixColorBuilderFieldMeta).forEach(([fieldMode, fieldEls]) => {
    fieldEls.forEach((fieldEl) => {
      fieldEl.classList.toggle("hidden", fieldMode !== mode);
    });
  });
}

function buildMatrixColorExpressionFromBuilder() {
  const mode = imageDefinitionMatrixColorModeInput.value;

  if (mode === "none") {
    return "";
  }

  if (mode === "identity") {
    return "IdentityMatrix()";
  }

  if (mode === "tint") {
    const tintColor = imageDefinitionMatrixColorTintInput.value.trim() || matrixColorBuilderDefaults.tintColor;
    return `TintMatrix(${formatRenpyQuotedString(tintColor)})`;
  }

  if (mode === "saturation") {
    const saturationValue = imageDefinitionMatrixColorSaturationInput.value.trim() || matrixColorBuilderDefaults.saturationValue;
    return `SaturationMatrix(${saturationValue})`;
  }

  if (mode === "sepia") {
    const sepiaTint = imageDefinitionMatrixColorSepiaInput.value.trim() || matrixColorBuilderDefaults.sepiaTint;
    return `SepiaMatrix(${formatRenpyQuotedString(sepiaTint)})`;
  }

  if (mode === "invert") {
    const invertValue = imageDefinitionMatrixColorInvertInput.value.trim() || matrixColorBuilderDefaults.invertValue;
    return `InvertMatrix(${invertValue})`;
  }

  if (mode === "brightness") {
    const brightnessValue = imageDefinitionMatrixColorBrightnessInput.value.trim() || matrixColorBuilderDefaults.brightnessValue;
    return `BrightnessMatrix(${brightnessValue})`;
  }

  if (mode === "hue") {
    const hueValue = imageDefinitionMatrixColorHueInput.value.trim() || matrixColorBuilderDefaults.hueValue;
    return `HueMatrix(${hueValue})`;
  }

  if (mode === "opacity") {
    const opacityValue = imageDefinitionMatrixColorOpacityInput.value.trim() || matrixColorBuilderDefaults.opacityValue;
    return `OpacityMatrix(${opacityValue})`;
  }

  if (mode === "colorize") {
    const colorizeBlack = imageDefinitionMatrixColorizeBlackInput.value.trim() || matrixColorBuilderDefaults.colorizeBlack;
    const colorizeWhite = imageDefinitionMatrixColorizeWhiteInput.value.trim() || matrixColorBuilderDefaults.colorizeWhite;
    return `ColorizeMatrix(${formatRenpyQuotedString(colorizeBlack)}, ${formatRenpyQuotedString(colorizeWhite)})`;
  }

  return imageDefinitionMatrixColorInput.value.trim();
}

function syncMatrixColorBuilder(expression) {
  const builderState = {
    ...matrixColorBuilderDefaults,
    ...parseSimpleMatrixColorExpression(expression),
  };

  imageDefinitionMatrixColorModeInput.value = builderState.mode;
  imageDefinitionMatrixColorTintInput.value = builderState.tintColor;
  imageDefinitionMatrixColorSaturationInput.value = builderState.saturationValue;
  imageDefinitionMatrixColorSepiaInput.value = builderState.sepiaTint;
  imageDefinitionMatrixColorInvertInput.value = builderState.invertValue;
  imageDefinitionMatrixColorBrightnessInput.value = builderState.brightnessValue;
  imageDefinitionMatrixColorHueInput.value = builderState.hueValue;
  imageDefinitionMatrixColorOpacityInput.value = builderState.opacityValue;
  imageDefinitionMatrixColorizeBlackInput.value = builderState.colorizeBlack;
  imageDefinitionMatrixColorizeWhiteInput.value = builderState.colorizeWhite;
  setMatrixColorBuilderModeVisibility(builderState.mode);
}

function syncImageDefinitionDetailFields() {
  const image = getActiveImageDefinition();

  if (!image) {
    imageDefinitionFieldEls.forEach((fieldEl) => {
      const field = fieldEl.dataset.imageField;
      const defaultValue = imageDefinitionFieldDefaults[field];

      if (imageDefinitionBooleanFields.has(field)) {
        fieldEl.checked = Boolean(defaultValue);
        return;
      }

      fieldEl.value = `${defaultValue ?? ""}`;
    });
    setImageDefinitionTypeFieldVisibility("static");
    renderLayeredAlwaysLayerList(null);
    renderLayeredGroupList(null);
    renderCompositeLayerList(null);
    renderImageAtlStepList(null);
    syncMatrixColorBuilder("");
    syncImageDefinitionSideImageHelp(null);
    imageDefinitionMovieLoopInput.disabled = false;
    imageDefinitionCodePreviewEl.textContent = "";
    return;
  }

  imageDefinitionFieldEls.forEach((fieldEl) => {
    const field = fieldEl.dataset.imageField;

    if (imageDefinitionBooleanFields.has(field)) {
      fieldEl.checked = Boolean(image[field]);
      return;
    }

    fieldEl.value = `${image[field] ?? ""}`;
  });
  setImageDefinitionTypeFieldVisibility(getImageDefinitionType(image));
  renderLayeredAlwaysLayerList(image);
  renderLayeredGroupList(image);
  renderCompositeLayerList(image);
  renderImageAtlStepList(image);
  syncMatrixColorBuilder(image.matrixcolor);
  syncImageDefinitionSideImageHelp(image);
  imageDefinitionMovieLoopInput.disabled = (
    getImageDefinitionType(image) === "movie"
    && Boolean(image.movieKeepLastFrame)
  );
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
        <span class="image-category-toggle-label">${escapeHtml(tt(categoryInfo.label))}</span>
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
      emptyEl.textContent = tt(categoryInfo.empty);
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
        <span>${escapeHtml(getImageDefinitionSummary(image))}</span>
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
        setAudioContextMenuState(false);
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

function openLive2DDefinitionDetail(definitionId) {
  activeLive2DDefinitionId = definitionId;
  live2dDefinitionDetailOpen = true;
  renderLive2DPanel();
  const definition = getActiveLive2DDefinition();

  if (definition) {
    setStatus(`Opened Live2D "${definition.name}".`);
  }
}

function closeLive2DDefinitionDetail() {
  live2dDefinitionDetailOpen = false;
  renderLive2DPanel();
}

function deleteLive2DDefinition(definitionId) {
  const definition = state.live2d.find((currentDefinition) => currentDefinition.id === definitionId);

  if (!definition) {
    return;
  }

  state.live2d = state.live2d.filter((currentDefinition) => currentDefinition.id !== definitionId);

  if (activeLive2DDefinitionId === definitionId) {
    activeLive2DDefinitionId = state.live2d[0]?.id ?? null;
  }

  if (live2dDefinitionDetailOpen && !getActiveLive2DDefinition()) {
    live2dDefinitionDetailOpen = false;
  }

  render();
  saveState(`Deleted Live2D "${definition.name}".`);
}

function syncLive2DDefinitionDetailFields() {
  const definition = getActiveLive2DDefinition();

  if (!definition) {
    live2dDefinitionFieldEls.forEach((fieldEl) => {
      const field = fieldEl.dataset.live2dField;
      const defaultValue = live2dDefinitionFieldDefaults[field];

      if (field === "loop") {
        fieldEl.checked = Boolean(defaultValue);
        return;
      }

      fieldEl.value = `${defaultValue ?? ""}`;
    });
    live2dDefinitionCodePreviewEl.textContent = "";
    return;
  }

  live2dDefinitionFieldEls.forEach((fieldEl) => {
    const field = fieldEl.dataset.live2dField;

    if (field === "loop") {
      fieldEl.checked = Boolean(definition[field]);
      return;
    }

    fieldEl.value = `${definition[field] ?? ""}`;
  });

  live2dDefinitionCodePreviewEl.textContent = formatLive2DDefinitionCode(definition);
}

function renderLive2DPanel() {
  const hasDefinitions = state.live2d.length > 0;

  if (!hasDefinitions) {
    activeLive2DDefinitionId = null;
    live2dDefinitionDetailOpen = false;
  } else if (!getActiveLive2DDefinition()) {
    activeLive2DDefinitionId = state.live2d[0].id;
  }

  if (live2dDefinitionDetailOpen && !getActiveLive2DDefinition()) {
    live2dDefinitionDetailOpen = false;
  }

  live2dDefinitionEmptyEl.classList.toggle("hidden", hasDefinitions);
  live2dDefinitionListEl.innerHTML = "";

  state.live2d.forEach((definition) => {
    const item = document.createElement("div");
    item.className = "character-card";
    item.setAttribute("role", "button");
    item.tabIndex = 0;

    if (definition.id === activeLive2DDefinitionId) {
      item.classList.add("is-active");
    }

    item.innerHTML = `
      <strong>${escapeHtml(definition.name)}</strong>
      <span>${escapeHtml(getLive2DDefinitionSummary(definition))}</span>
    `;

    item.addEventListener("click", () => {
      activeLive2DDefinitionId = definition.id;
      renderLive2DPanel();
    });
    item.addEventListener("dblclick", (event) => {
      event.preventDefault();
      event.stopPropagation();
      openLive2DDefinitionDetail(definition.id);
    });
    item.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openLive2DDefinitionDetail(definition.id);
      }
    });

    live2dDefinitionListEl.appendChild(item);
  });

  live2dListViewEl.classList.toggle("hidden", live2dDefinitionDetailOpen);
  live2dDefinitionDetailViewEl.classList.toggle("hidden", !live2dDefinitionDetailOpen);
  syncLive2DDefinitionDetailFields();
}

function openAudioDefinitionDetail(audioId) {
  activeAudioDefinitionId = audioId;
  audioDefinitionDetailOpen = true;
  setAudioContextMenuState(false);
  renderAudioPanel();
  const audioDefinition = getActiveAudioDefinition();

  if (audioDefinition) {
    setStatus(`Opened audio "${audioDefinition.name}".`);
  }
}

function closeAudioDefinitionDetail() {
  audioDefinitionDetailOpen = false;
  setAudioContextMenuState(false);
  renderAudioPanel();
}

function deleteAudioDefinition(audioId) {
  const audioDefinition = state.audio.find((currentAudio) => currentAudio.id === audioId);

  if (!audioDefinition) {
    return;
  }

  state.audio = state.audio.filter((currentAudio) => currentAudio.id !== audioId);

  if (activeAudioDefinitionId === audioId) {
    activeAudioDefinitionId = state.audio[0]?.id ?? null;
  }

  if (audioDefinitionDetailOpen && !getActiveAudioDefinition()) {
    audioDefinitionDetailOpen = false;
  }

  setAudioContextMenuState(false);
  render();
  saveState(`Deleted audio "${audioDefinition.name}".`);
}

function formatAudioDefinitionCode(audioDefinition) {
  if (!audioDefinition) {
    return "";
  }

  const safeName = `${audioDefinition.name || ""}`.trim() || "audio_name";
  const sourcePath = `${audioDefinition.sourcePath || ""}`.trim() || "audio/example.ogg";
  return `define audio.${safeName} = "${escapeRenpyString(sourcePath)}"`;
}

function syncAudioDefinitionDetailFields() {
  const audioDefinition = getActiveAudioDefinition();

  if (!audioDefinition) {
    audioDefinitionFieldEls.forEach((fieldEl) => {
      const field = fieldEl.dataset.audioField;
      fieldEl.value = `${audioDefinitionFieldDefaults[field] ?? ""}`;
    });
    syncAudioDefinitionVoiceOwnerField(null);
    audioDefinitionCodePreviewEl.textContent = "";
    return;
  }

  audioDefinitionFieldEls.forEach((fieldEl) => {
    const field = fieldEl.dataset.audioField;
    fieldEl.value = `${audioDefinition[field] ?? ""}`;
  });
  syncAudioDefinitionVoiceOwnerField(audioDefinition);
  audioDefinitionCodePreviewEl.textContent = formatAudioDefinitionCode(audioDefinition);
}

function renderAudioPanel() {
  const hasAudioDefinitions = state.audio.length > 0;

  if (!hasAudioDefinitions) {
    activeAudioDefinitionId = null;
    audioDefinitionDetailOpen = false;
  } else if (!getActiveAudioDefinition()) {
    activeAudioDefinitionId = state.audio[0].id;
  }

  if (audioDefinitionDetailOpen && !getActiveAudioDefinition()) {
    audioDefinitionDetailOpen = false;
  }

  audioDefinitionEmptyEl.classList.add("hidden");
  audioDefinitionListEl.innerHTML = "";

  Object.entries(audioChannelMeta).forEach(([channelKey, channelInfo]) => {
    const channelGroup = document.createElement("section");
    const isExpanded = audioChannelSectionState[channelKey] !== false;
    const channelAudioDefinitions = state.audio.filter((audioDefinition) => audioDefinition.channel === channelKey);
    channelGroup.className = "image-category-group";
    channelGroup.classList.toggle("is-collapsed", !isExpanded);

    const toggleButton = document.createElement("button");
    toggleButton.type = "button";
    toggleButton.className = "image-category-toggle";
    toggleButton.setAttribute("aria-expanded", String(isExpanded));
    toggleButton.innerHTML = `
      <span class="image-category-toggle-main">
        <svg class="image-category-toggle-caret" viewBox="0 0 16 16" aria-hidden="true">
          <path d="M3 6.5 8 11l5-4.5"></path>
        </svg>
        <span class="image-category-toggle-label">${escapeHtml(tt(channelInfo.label))}</span>
      </span>
      <span class="image-category-toggle-count">${channelAudioDefinitions.length}</span>
    `;

    toggleButton.addEventListener("click", () => {
      audioChannelSectionState[channelKey] = !isExpanded;
      renderAudioPanel();
    });

    const itemsEl = document.createElement("div");
    itemsEl.className = "image-category-items";

    if (!channelAudioDefinitions.length) {
      const emptyEl = document.createElement("p");
      emptyEl.className = "image-category-empty";
      emptyEl.textContent = tt(channelInfo.empty);
      itemsEl.appendChild(emptyEl);
    }

    channelAudioDefinitions.forEach((audioDefinition) => {
      const item = document.createElement("div");
      item.className = "character-card";
      item.setAttribute("role", "button");
      item.tabIndex = 0;

      if (audioDefinition.id === activeAudioDefinitionId) {
        item.classList.add("is-active");
      }

      item.innerHTML = `
        <strong>${escapeHtml(audioDefinition.name)}</strong>
        <span>${escapeHtml(getAudioDefinitionSubtitle(audioDefinition))}</span>
      `;

      item.addEventListener("click", () => {
        activeAudioDefinitionId = audioDefinition.id;
        setAudioContextMenuState(false);
        renderAudioPanel();
      });
      item.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        activeAudioDefinitionId = audioDefinition.id;
        renderAudioPanel();
        setContextMenuState(false);
        setLabelContextMenuState(false);
        setImageContextMenuState(false);
        setCharacterContextMenuState(false);
        setAudioContextMenuState(true, {
          audioId: audioDefinition.id,
          x: event.clientX,
          y: event.clientY,
        });
      });
      item.addEventListener("dblclick", (event) => {
        event.preventDefault();
        event.stopPropagation();
        openAudioDefinitionDetail(audioDefinition.id);
      });
      item.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openAudioDefinitionDetail(audioDefinition.id);
        }
      });

      itemsEl.appendChild(item);
    });

    channelGroup.appendChild(toggleButton);
    channelGroup.appendChild(itemsEl);
    audioDefinitionListEl.appendChild(channelGroup);
  });

  audioListViewEl.classList.toggle("hidden", audioDefinitionDetailOpen);
  audioDefinitionDetailViewEl.classList.toggle("hidden", !audioDefinitionDetailOpen);
  syncAudioDefinitionDetailFields();
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
  render();
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
  return value
    .replace(/\r\n?/g, "\n")
    .replaceAll("\\", "\\\\")
    .replaceAll("\n", "\\n")
    .replaceAll('"', '\\"');
}

function isRenpySimpleExpression(value) {
  const trimmed = `${value || ""}`.trim();

  if (!trimmed) {
    return false;
  }

  if (["True", "False", "None"].includes(trimmed)) {
    return true;
  }

  if (/^-?\d+(?:\.\d+)?$/.test(trimmed)) {
    return true;
  }

  if (
    trimmed.startsWith("\"")
    || trimmed.startsWith("'")
    || trimmed.includes("(")
    || trimmed.startsWith("[")
    || trimmed.startsWith("{")
  ) {
    return true;
  }

  return /^[A-Za-z_][A-Za-z0-9_\.]*(?:\[[^\]]+\])*$/.test(trimmed);
}

function formatRenpyArgumentValue(value) {
  const trimmed = `${value ?? ""}`.trim();

  if (!trimmed) {
    return "";
  }

  if (isRenpySimpleExpression(trimmed)) {
    return trimmed;
  }

  return `"${escapeRenpyString(trimmed)}"`;
}

function formatRenpyStringLikeArgument(value) {
  const trimmed = `${value ?? ""}`.trim();

  if (!trimmed) {
    return "";
  }

  if (
    (trimmed.startsWith("\"") && trimmed.endsWith("\""))
    || (trimmed.startsWith("'") && trimmed.endsWith("'"))
    || trimmed.includes("(")
    || /^[A-Za-z_][A-Za-z0-9_\.]*(?:\[[^\]]+\])*$/.test(trimmed)
  ) {
    return trimmed;
  }

  return `"${escapeRenpyString(trimmed)}"`;
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
      setAudioContextMenuState(false);
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

function getVariableTarget(variable) {
  const storePath = `${variable?.store || ""}`.trim();
  const variableName = `${variable?.name || ""}`.trim() || "flag";

  return storePath ? `${storePath}.${variableName}` : variableName;
}

function getAchievementRegisterName(achievement) {
  return `${achievement?.name || ""}`.trim() || "achievement_name";
}

function getAchievementDisplayLabel(achievement) {
  return `${achievement?.title || ""}`.trim() || getAchievementRegisterName(achievement);
}

function buildAchievementSelectionOptions(selection = {}, { emptyLabel = "Select an achievement..." } = {}) {
  const currentAchievement = getAchievementById(selection.achievementId || "");
  const fallbackName = `${selection.achievementName || ""}`.trim();
  const hasMissingAchievement = Boolean(selection.achievementId) && !currentAchievement && fallbackName;
  const missingValue = hasMissingAchievement ? `__missing__:${fallbackName}` : "";
  const options = [`<option value="">${escapeHtml(emptyLabel)}</option>`];

  if (hasMissingAchievement) {
    options.push(`<option value="${escapeHtml(missingValue)}">Legacy / Missing: ${escapeHtml(fallbackName)}</option>`);
  }

  state.achievements.forEach((achievement) => {
    const registerName = getAchievementRegisterName(achievement);
    const title = getAchievementDisplayLabel(achievement);
    const progressMeta = achievement.progressEnabled && achievement.statMax
      ? ` · progress ${achievement.statMax}`
      : "";

    options.push(
      `<option value="${escapeHtml(achievement.id)}">${escapeHtml(`${title} · ${registerName}${progressMeta}`)}</option>`,
    );
  });

  return {
    options: options.join(""),
    value: currentAchievement ? currentAchievement.id : missingValue,
  };
}

function formatAchievementCode(achievement) {
  if (!achievement) {
    return "";
  }

  const registerName = getAchievementRegisterName(achievement);
  const args = [formatRenpyQuotedString(registerName)];
  const commentLines = [];

  if (`${achievement.title || ""}`.trim()) {
    commentLines.push(`# ${achievement.title.trim()}`);
  }

  `${achievement.description || ""}`
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .forEach((line) => {
      commentLines.push(`# ${line}`);
    });

  `${achievement.notes || ""}`
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .forEach((line) => {
      commentLines.push(`# Note: ${line}`);
    });

  const steamName = `${achievement.steamName || ""}`.trim();
  const statMax = `${achievement.statMax || ""}`.trim();
  const statModulo = `${achievement.statModulo || ""}`.trim();

  if (steamName && steamName !== registerName) {
    args.push(`steam=${formatRenpyQuotedString(steamName)}`);
  }

  if (achievement.progressEnabled && statMax) {
    args.push(`stat_max=${statMax}`);
  }

  if (achievement.progressEnabled && statModulo) {
    args.push(`stat_modulo=${statModulo}`);
  }

  const lines = [...commentLines];

  if (achievement.progressEnabled && !statMax) {
    lines.push("# Warning: progress achievements should define stat_max.");
  }

  lines.push("init python:");
  lines.push(`    achievement.register(${args.join(", ")})`);
  return lines.join("\n");
}

function formatAchievementUsagePreview(achievement) {
  if (!achievement) {
    return "";
  }

  const registerName = getAchievementRegisterName(achievement);
  const quotedName = formatRenpyQuotedString(registerName);
  const progressValue = `${achievement.statMax || ""}`.trim() || "1";

  return [
    `$ achievement.grant(${quotedName})`,
    achievement.progressEnabled
      ? `$ achievement.progress(${quotedName}, ${progressValue})`
      : `$ achievement.clear(${quotedName})`,
    `if achievement.has(${quotedName}):`,
    "    pass",
    "",
    "# Screen action example",
    "textbutton _(\"Sync Achievements\") action achievement.Sync()",
  ].join("\n");
}

function syncAchievementDetailFields() {
  const achievement = getActiveAchievement();

  if (!achievement) {
    achievementNameInput.value = "";
    achievementTitleInput.value = "";
    achievementDescriptionInput.value = "";
    achievementNotesInput.value = "";
    achievementSteamNameInput.value = "";
    achievementProgressEnabledInput.checked = false;
    achievementProgressFieldsEl.classList.add("hidden");
    achievementStatMaxInput.value = "";
    achievementStatModuloInput.value = "";
    achievementCodePreviewEl.textContent = "";
    achievementUsagePreviewEl.textContent = "";
    return;
  }

  achievementNameInput.value = achievement.name;
  achievementTitleInput.value = achievement.title;
  achievementDescriptionInput.value = achievement.description;
  achievementNotesInput.value = achievement.notes;
  achievementSteamNameInput.value = achievement.steamName;
  achievementProgressEnabledInput.checked = achievement.progressEnabled;
  achievementProgressFieldsEl.classList.toggle("hidden", !achievement.progressEnabled);
  achievementStatMaxInput.value = achievement.statMax;
  achievementStatModuloInput.value = achievement.statModulo;
  achievementCodePreviewEl.textContent = formatAchievementCode(achievement);
  achievementUsagePreviewEl.textContent = formatAchievementUsagePreview(achievement);
}

function renderAchievementsPanel() {
  const hasAchievements = state.achievements.length > 0;

  if (!hasAchievements) {
    activeAchievementId = null;
    achievementDetailOpen = false;
  } else if (!getActiveAchievement()) {
    activeAchievementId = state.achievements[0].id;
  }

  if (achievementDetailOpen && !getActiveAchievement()) {
    achievementDetailOpen = false;
  }

  achievementListEmptyEl.classList.toggle("hidden", hasAchievements);
  achievementListEl.innerHTML = "";

  state.achievements.forEach((achievement) => {
    const item = document.createElement("div");
    item.className = "character-card";
    item.setAttribute("role", "button");
    item.tabIndex = 0;

    if (achievement.id === activeAchievementId) {
      item.classList.add("is-active");
    }

    const summaryParts = [getAchievementRegisterName(achievement)];

    if (achievement.progressEnabled && achievement.statMax) {
      summaryParts.push(`progress ${achievement.statMax}`);
    }

    item.innerHTML = `
      <strong>${escapeHtml(getAchievementDisplayLabel(achievement))}</strong>
      <span>${escapeHtml(summaryParts.join(" · "))}</span>
    `;

    item.addEventListener("click", () => {
      activeAchievementId = achievement.id;
      renderAchievementsPanel();
    });
    item.addEventListener("dblclick", (event) => {
      event.preventDefault();
      event.stopPropagation();
      activeAchievementId = achievement.id;
      achievementDetailOpen = true;
      renderAchievementsPanel();
      setStatus(`Opened achievement "${getAchievementRegisterName(achievement)}".`);
    });
    item.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        activeAchievementId = achievement.id;
        achievementDetailOpen = true;
        renderAchievementsPanel();
        setStatus(`Opened achievement "${getAchievementRegisterName(achievement)}".`);
      }
    });

    achievementListEl.appendChild(item);
  });

  achievementsListViewEl.classList.toggle("hidden", achievementDetailOpen);
  achievementDetailViewEl.classList.toggle("hidden", !achievementDetailOpen);
  syncAchievementDetailFields();
}

function formatIndentedCodeBlock(code, indentLevel = 1) {
  const normalizedCode = `${code || ""}`.replace(/\r\n?/g, "\n").trim();

  if (!normalizedCode) {
    return `${"    ".repeat(indentLevel)}pass`;
  }

  return normalizedCode
    .split("\n")
    .map((line) => `${"    ".repeat(indentLevel)}${line}`)
    .join("\n");
}

function formatVariableCode(variable) {
  if (!variable) {
    return "";
  }

  const target = getVariableTarget(variable);
  const value = `${variable.value || ""}`.trim() || "0";
  return `default ${target} = ${value}`;
}

function syncVariableDetailFields() {
  const variable = getActiveVariable();

  variableTypeInput.value = "default";

  if (!variable) {
    variableStoreInput.value = "";
    variableNameInput.value = "";
    variableValueInput.value = "";
    variableCodePreviewEl.textContent = "";
    return;
  }

  variableStoreInput.value = variable.store;
  variableNameInput.value = variable.name;
  variableValueInput.value = variable.value;
  variableCodePreviewEl.textContent = formatVariableCode(variable);
}

function renderVariablesPanel() {
  const hasVariables = state.variables.length > 0;

  if (!hasVariables) {
    activeVariableId = null;
    variableDetailOpen = false;
  } else if (!getActiveVariable()) {
    activeVariableId = state.variables[0].id;
  }

  if (variableDetailOpen && !getActiveVariable()) {
    variableDetailOpen = false;
  }

  variableListEmptyEl.classList.toggle("hidden", hasVariables);
  variableListEl.innerHTML = "";

  state.variables.forEach((variable) => {
    const item = document.createElement("div");
    item.className = "character-card";
    item.setAttribute("role", "button");
    item.tabIndex = 0;

    if (variable.id === activeVariableId) {
      item.classList.add("is-active");
    }

    item.innerHTML = `
      <strong>${escapeHtml(getVariableTarget(variable))}</strong>
      <span>${escapeHtml(`${variable.value || "0"}`.trim() || "0")}</span>
    `;

    item.addEventListener("click", () => {
      activeVariableId = variable.id;
      renderVariablesPanel();
    });
    item.addEventListener("dblclick", (event) => {
      event.preventDefault();
      event.stopPropagation();
      activeVariableId = variable.id;
      variableDetailOpen = true;
      renderVariablesPanel();
      setStatus(`Opened variable "${getVariableTarget(variable)}".`);
    });
    item.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        activeVariableId = variable.id;
        variableDetailOpen = true;
        renderVariablesPanel();
        setStatus(`Opened variable "${getVariableTarget(variable)}".`);
      }
    });

    variableListEl.appendChild(item);
  });

  variablesListViewEl.classList.toggle("hidden", variableDetailOpen);
  variableDetailViewEl.classList.toggle("hidden", !variableDetailOpen);
  syncVariableDetailFields();
}

function formatDefinitionCode(definition) {
  if (!definition) {
    return "";
  }

  if (definition.mode === "init_python") {
    const priorityText = `${definition.initPriority || ""}`.trim();
    const hideText = definition.initHide ? " hide" : "";
    const storeText = `${definition.initStore || ""}`.trim() ? ` in ${definition.initStore.trim()}` : "";
    const prioritySegment = priorityText ? ` ${priorityText}` : "";

    return `init${prioritySegment} python${hideText}${storeText}:\n${formatIndentedCodeBlock(definition.code, 1)}`;
  }

  const priorityText = `${definition.priority || ""}`.trim();
  const operator = definition.operator || "=";
  const target = `${definition.target || ""}`.trim() || "value";
  const value = `${definition.value || ""}`.trim() || "None";
  const prioritySegment = priorityText ? ` ${priorityText}` : "";

  return `define${prioritySegment} ${target} ${operator} ${value}`;
}

function syncDefinitionDetailFields() {
  const definition = getActiveDefinition();

  if (!definition) {
    definitionModeInput.value = "define";
    definitionTargetInput.value = "";
    definitionOperatorInput.value = "=";
    definitionPriorityInput.value = "";
    definitionValueInput.value = "";
    definitionInitPriorityInput.value = "";
    definitionInitHideInput.checked = false;
    definitionInitStoreInput.value = "";
    definitionCodeInput.value = "";
    definitionDefineFieldsEl.classList.remove("hidden");
    definitionInitPythonFieldsEl.classList.add("hidden");
    definitionCodePreviewEl.textContent = "";
    return;
  }

  definitionModeInput.value = definition.mode;
  definitionTargetInput.value = definition.target;
  definitionOperatorInput.value = definition.operator;
  definitionPriorityInput.value = definition.priority;
  definitionValueInput.value = definition.value;
  definitionInitPriorityInput.value = definition.initPriority;
  definitionInitHideInput.checked = definition.initHide;
  definitionInitStoreInput.value = definition.initStore;
  definitionCodeInput.value = definition.code;
  definitionDefineFieldsEl.classList.toggle("hidden", definition.mode !== "define");
  definitionInitPythonFieldsEl.classList.toggle("hidden", definition.mode !== "init_python");
  definitionCodePreviewEl.textContent = formatDefinitionCode(definition);
}

function getDefinitionLabel(definition) {
  if (definition.mode === "init_python") {
    const store = `${definition.initStore || ""}`.trim();
    return store ? `init python in ${store}` : "init python";
  }

  return `${definition.target || ""}`.trim() || "define";
}

function renderDefinitionsPanel() {
  const hasDefinitions = state.definitions.length > 0;

  if (!hasDefinitions) {
    activeDefinitionId = null;
    definitionDetailOpen = false;
  } else if (!getActiveDefinition()) {
    activeDefinitionId = state.definitions[0].id;
  }

  if (definitionDetailOpen && !getActiveDefinition()) {
    definitionDetailOpen = false;
  }

  definitionListEmptyEl.classList.toggle("hidden", hasDefinitions);
  definitionListEl.innerHTML = "";

  state.definitions.forEach((definition) => {
    const item = document.createElement("div");
    item.className = "character-card";
    item.setAttribute("role", "button");
    item.tabIndex = 0;

    if (definition.id === activeDefinitionId) {
      item.classList.add("is-active");
    }

    item.innerHTML = `
      <strong>${escapeHtml(getDefinitionLabel(definition))}</strong>
      <span>${escapeHtml(definition.mode === "define" ? "define" : "init python")}</span>
    `;

    item.addEventListener("click", () => {
      activeDefinitionId = definition.id;
      renderDefinitionsPanel();
    });
    item.addEventListener("dblclick", (event) => {
      event.preventDefault();
      event.stopPropagation();
      activeDefinitionId = definition.id;
      definitionDetailOpen = true;
      renderDefinitionsPanel();
      setStatus(`Opened definition "${getDefinitionLabel(definition)}".`);
    });
    item.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        activeDefinitionId = definition.id;
        definitionDetailOpen = true;
        renderDefinitionsPanel();
        setStatus(`Opened definition "${getDefinitionLabel(definition)}".`);
      }
    });

    definitionListEl.appendChild(item);
  });

  definitionsListViewEl.classList.toggle("hidden", definitionDetailOpen);
  definitionDetailViewEl.classList.toggle("hidden", !definitionDetailOpen);
  syncDefinitionDetailFields();
}

function deleteActiveVariable() {
  const variable = getActiveVariable();

  if (!variable) {
    return;
  }

  state.variables = state.variables.filter((currentVariable) => currentVariable.id !== variable.id);
  activeVariableId = state.variables[0]?.id ?? null;

  if (!state.variables.length) {
    variableDetailOpen = false;
  }

  render();
  syncLabelCodePreview();
  saveState(`Deleted variable "${getVariableTarget(variable)}".`);
}

function deleteActiveAchievement() {
  const achievement = getActiveAchievement();

  if (!achievement) {
    return;
  }

  state.achievements = state.achievements.filter((currentAchievement) => currentAchievement.id !== achievement.id);
  activeAchievementId = state.achievements[0]?.id ?? null;

  if (!state.achievements.length) {
    achievementDetailOpen = false;
  }

  render();
  saveState(`Deleted achievement "${getAchievementRegisterName(achievement)}".`);
}

function deleteActiveDefinition() {
  const definition = getActiveDefinition();

  if (!definition) {
    return;
  }

  state.definitions = state.definitions.filter((currentDefinition) => currentDefinition.id !== definition.id);
  activeDefinitionId = state.definitions[0]?.id ?? null;

  if (!state.definitions.length) {
    definitionDetailOpen = false;
  }

  render();
  saveState(`Deleted definition "${getDefinitionLabel(definition)}".`);
}

function renderProjectVoiceSettings() {
  projectVoiceModeInput.value = getProjectVoiceMode();
  projectAutoVoiceTemplateInput.value = getProjectAutoVoiceTemplate();
  projectVoiceMultilingualInput.checked = state.meta.multilingualVoices !== false;
  projectDefaultDialogueVoiceInput.checked = getProjectDefaultDialogueVoiceEnabled();
  projectAutoVoiceTemplateFieldEl.classList.toggle("hidden", getProjectVoiceMode() !== "auto");
  projectVoiceCodePreviewEl.textContent = formatProjectVoiceCode();
}

function renderProjectSideImageSettings() {
  if (!projectSideImageSettingsFormEl) {
    return;
  }

  projectSideImageTagInput.value = getProjectSideImageTag();
  projectSideImageOnlyNotShowingInput.checked = getProjectSideImageOnlyNotShowing();
  projectSideImagePrefixTagInput.value = getProjectSideImagePrefixTag();
  projectSideImageNullInput.value = getProjectSideImageNullExpression();
  projectSideImageSameTransformInput.value = getProjectSideImageSameTransform();
  projectSideImageChangeTransformInput.value = getProjectSideImageChangeTransform();
  projectSideImageCodePreviewEl.textContent = formatProjectSideImageCode();
}

function renderProjectSaveLoadSettings() {
  if (!projectSaveLoadSettingsFormEl) {
    return;
  }

  projectHasAutosaveInput.checked = getProjectHasAutosave();
  projectAutosaveFrequencyInput.value = getProjectAutosaveFrequency();
  projectHasQuicksaveInput.checked = getProjectHasQuicksave();
  projectRollbackEnabledInput.checked = getProjectRollbackEnabled();
  projectRollbackLengthInput.value = getProjectRollbackLength();
  projectHardRollbackLimitInput.value = getProjectHardRollbackLimit();
  projectFixRollbackWithoutChoiceInput.checked = getProjectFixRollbackWithoutChoice();
  projectSaveLoadCodePreviewEl.textContent = formatProjectSaveLoadCode();
}

function renderProjectKeymapSettings() {
  if (!projectKeymapSettingsFormEl || !projectKeymapCategoryListEl || !projectKeymapCodePreviewEl) {
    return;
  }

  const categories = getRenderableProjectKeymapCategories();

  projectKeymapCategoryListEl.innerHTML = categories.map((category) => `
    <details class="project-keymap-category" data-keymap-category="${escapeHtml(category.id)}" ${projectKeymapCategoryState[category.id] !== false ? "open" : ""}>
      <summary class="project-keymap-category-summary">
        <span>
          <strong>${escapeHtml(getProjectKeymapCategoryLabel(category))}</strong>
          <small>${escapeHtml(t("project-keymap-events-count", { count: category.eventIds.length }))}</small>
        </span>
        <span>${escapeHtml(getProjectKeymapCategoryDescription(category))}</span>
      </summary>

      <div class="project-keymap-card-list">
        ${category.eventIds.map((eventId) => {
    const meta = getProjectKeymapEventMeta(eventId);
    const entry = getProjectKeymapOverrideEntry(eventId);
    const effectiveBindings = getProjectKeymapEffectiveBindings(eventId);
    const statusLabel = getProjectKeymapStatusLabel(entry);

    return `
          <article class="project-keymap-card" data-keymap-event-id="${escapeHtml(eventId)}">
            <div class="project-keymap-card-header">
              <div class="project-keymap-card-copy">
                <strong>${escapeHtml(getProjectKeymapEventLabel(meta))}</strong>
                <code>${escapeHtml(eventId)}</code>
              </div>
              <button
                class="secondary project-keymap-reset-button"
                type="button"
                data-keymap-reset-event="${escapeHtml(eventId)}"
                ${entry.rawExpression || entry.useCustomList ? "" : "disabled"}
              >
                ${escapeHtml(t("project-keymap-reset"))}
              </button>
            </div>

            <p class="project-settings-note">${escapeHtml(getProjectKeymapEventDescription(meta))}</p>
            <p class="project-keymap-status">${escapeHtml(statusLabel)}</p>

            <p class="project-settings-note">
              ${meta.defaultBindings.length
      ? `${escapeHtml(t("project-keymap-default-prefix"))} ${meta.defaultBindings.map((binding) => `<code>${escapeHtml(binding)}</code>`).join(", ")}`
      : escapeHtml(t("project-keymap-no-default-bindings"))
    }
            </p>

            <div class="project-keymap-binding-list">
              ${effectiveBindings.length
      ? effectiveBindings.map((binding) => `
                    <button
                      class="secondary project-keymap-binding-chip"
                      type="button"
                      data-keymap-remove-event="${escapeHtml(eventId)}"
                      data-keymap-binding="${escapeHtml(binding)}"
                      title="${escapeHtml(t("project-keymap-remove-binding-title", { binding }))}"
                    >
                      <code>${escapeHtml(binding)}</code>
                      <span aria-hidden="true">×</span>
                    </button>
                  `).join("")
      : `<span class="project-keymap-empty">${escapeHtml(t("project-keymap-no-bindings"))}</span>`
    }
            </div>

            <div class="project-keymap-add-row">
              <input
                data-keymap-add-input="${escapeHtml(eventId)}"
                type="text"
                placeholder="${escapeHtml(t("placeholder.project-keymap-binding"))}"
              />
              <button class="secondary" type="button" data-keymap-add-event="${escapeHtml(eventId)}">${escapeHtml(t("project-keymap-add-binding"))}</button>
            </div>

            <label>
              <span>${escapeHtml(t("project-keymap-raw-override-expression"))}</span>
              <textarea
                data-keymap-raw-input="${escapeHtml(eventId)}"
                rows="3"
                placeholder="${escapeHtml(t("placeholder.project-keymap-raw-override"))}"
              >${escapeHtml(entry.rawExpression)}</textarea>
            </label>

            <p class="project-settings-note">
              ${escapeHtml(t("project-keymap-raw-note"))}
            </p>
          </article>
        `;
  }).join("")}
      </div>
    </details>
  `).join("");

  projectKeymapCodePreviewEl.textContent = formatProjectKeymapCode();
}

function renderImageTagSuggestions() {
  if (!imageTagSuggestionListEl) {
    return;
  }

  imageTagSuggestionListEl.innerHTML = getAvailableImageTags()
    .map((tag) => `<option value="${escapeHtml(tag)}"></option>`)
    .join("");
}

function renderVisualProjectStats() {
  const graph = getActiveGraph();
  const voicedDialogueCount = state.graphs.reduce(
    (count, currentGraph) => count + currentGraph.nodes.filter((node) => (
      node.type === "dialogue" && getDialogueVoiceEnabled(node)
    )).length,
    0,
  );
  const stats = [
    {
      title: t("Current Label"),
      value: graph?.label || "None",
    },
    {
      title: t("Total Label Graphs"),
      value: String(state.graphs.length),
    },
    {
      title: t("Replay Labels"),
      value: String(state.graphs.filter((currentGraph) => currentGraph.replay?.enabled).length),
    },
    {
      title: t("Blocks In Current Graph"),
      value: String(graph?.nodes.length || 0),
    },
    {
      title: t("Audio Definitions"),
      value: String(state.audio.length),
    },
    {
      title: t("Side Image Definitions"),
      value: String(state.images.filter((image) => image.isSideImage).length),
    },
    {
      title: t("Live2D Definitions"),
      value: String(state.live2d.length),
    },
    {
      title: t("Default Variables"),
      value: String(state.variables.length),
    },
    {
      title: t("Achievements"),
      value: String(state.achievements.length),
    },
    {
      title: t("Definitions"),
      value: String(state.definitions.length),
    },
    {
      title: t("Voice Strategy"),
      value: getProjectVoiceMode() === "auto" ? "Auto Voice" : "Manual Voice",
    },
    {
      title: t("Save Features"),
      value: `${getProjectHasAutosave() ? "Auto" : "No Auto"} · ${getProjectHasQuicksave() ? "Quick" : "No Quick"}`,
    },
    {
      title: t("Rollback"),
      value: getProjectRollbackEnabled() ? `On · ${getProjectRollbackLength()} steps` : "Disabled",
    },
    {
      title: t("Linked Image Tags"),
      value: String(state.characters.filter((character) => `${character.image || ""}`.trim()).length),
    },
    {
      title: t("Voiced Dialogues"),
      value: String(voicedDialogueCount),
    },
    {
      title: t("Canvas Zoom"),
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

function renderGuiEditorPanel() {
  if (!guiEditorProjectSummaryEl) {
    return;
  }

  const guiState = normalizeGuiState(state.gui);
  const replayLabelCount = state.graphs.filter((graph) => graph?.replay?.enabled).length;
  const rememberedGuiSectionId = launchGuiSectionId || getStoredGuiSectionId();
  const stats = [
    {
      title: t("gui.nav.styles"),
      value: String(guiState.styles.length),
    },
    {
      title: t("gui.nav.screens"),
      value: String(guiState.screens.length),
    },
    {
      title: "Config / GUI Vars / GUI Prefs / Prefs / Store",
      value: `${guiState.config.length} / ${guiState.guiVariables.length} / ${guiState.guiPreferences.length} / ${guiState.preferences.length} / ${guiState.store.length}`,
    },
    {
      title: "Python UI / Cursors / Shaders",
      value: `${guiState.pythonUiHelpers.length} / ${guiState.cursors.length} / ${guiState.textShaders.length}`,
    },
    {
      title: "Replay / Music / Gallery",
      value: `${replayLabelCount} / ${guiState.musicRooms.length} / ${guiState.galleries.length}`,
    },
    {
      title: t("health.gui.last_section"),
      value: getGuiSectionLabel(rememberedGuiSectionId || "stylesSection"),
    },
  ];

  guiEditorProjectSummaryEl.innerHTML = stats.map((stat) => `
    <div class="visual-stat-card">
      <strong>${escapeHtml(stat.title)}</strong>
      <span>${escapeHtml(stat.value)}</span>
    </div>
  `).join("");

  if (guiEditorStatusNoteEl) {
    const confirmMode = projectHealthState.data?.confirmScreen?.mode || (hasLocalConfirmScreen() ? "project" : "fallback");
    guiEditorStatusNoteEl.textContent = hasBridge
      ? t("health.gui.note.connected", {
        section: getGuiSectionLabel(rememberedGuiSectionId || "stylesSection"),
        mode: confirmMode === "project" ? t("health.confirm.mode.project") : t("health.confirm.mode.fallback"),
      })
      : t("health.gui.note.disconnected");
  }
}

function renderGraph() {
  graphNodesEl.innerHTML = "";
  const graph = getActiveGraph();

  if (!graph) {
    return;
  }

  graph.nodes.forEach((node) => {
    const hasInputPort = nodeAllowsIncomingConnections(node);
    const hasOutputPort = nodeAllowsOutgoingConnections(node);
    const display = getNodeDisplay(node);
    const isMenuNode = node.type === "menu";
    const isConditionNode = node.type === "condition";
    const menuChoicesMarkup = isMenuNode
      ? getMenuChoices(node).map((choice) => `
          <div class="menu-node-choice">
            <span class="menu-node-choice-text">${escapeHtml(choice.text)}</span>
            <span
              class="node-port node-port-output node-port-output-choice"
              data-node-id="${escapeHtml(node.id)}"
              data-port="output"
              data-port-id="${escapeHtml(getMenuChoicePortId(choice.id))}"
            ></span>
          </div>
        `).join("")
      : "";
    const conditionClausesMarkup = isConditionNode
      ? getConditionClauses(node).map((clause) => `
          <div class="condition-node-clause">
            <span class="condition-node-clause-kind">${escapeHtml(clause.kind)}</span>
            <span class="condition-node-clause-text">${escapeHtml(
              clause.kind === "else"
                ? "Fallback"
                : (getConditionalExpression(clause) || (clause.kind === "if" ? "True" : "False")),
            )}</span>
            <span
              class="node-port node-port-output node-port-output-choice"
              data-node-id="${escapeHtml(node.id)}"
              data-port="output"
              data-port-id="${escapeHtml(getConditionClausePortId(clause.id))}"
            ></span>
          </div>
        `).join("")
      : "";
    const el = document.createElement("button");
    el.type = "button";
    el.className = "graph-node";
    el.dataset.nodeId = node.id;

    if (isMenuNode) {
      el.classList.add("graph-node-menu");
    }

    if (isConditionNode) {
      el.classList.add("graph-node-condition");
    }

    if (node.id === graph.selectedNodeId) {
      el.classList.add("is-selected");
    }

    el.style.left = `${node.x}px`;
    el.style.top = `${node.y}px`;

    el.innerHTML = isMenuNode
      ? `
        <div class="menu-node-choice-list">
          ${menuChoicesMarkup}
        </div>
        ${hasInputPort ? `<span class="node-port node-port-input" data-node-id="${escapeHtml(node.id)}" data-port="input" data-port-id="input"></span>` : ""}
      `
      : isConditionNode
        ? `
          <div class="condition-node-clause-list">
            ${conditionClausesMarkup}
          </div>
          ${hasInputPort ? `<span class="node-port node-port-input" data-node-id="${escapeHtml(node.id)}" data-port="input" data-port-id="input"></span>` : ""}
        `
      : `
        <p class="node-type">${escapeHtml(display.typeLabel)}</p>
        <h3 class="node-title">${escapeHtml(display.title || "Untitled Node")}</h3>
        ${display.content ? `<p class="node-content">${escapeHtml(display.content)}</p>` : ""}
        ${hasInputPort ? `<span class="node-port node-port-input" data-node-id="${escapeHtml(node.id)}" data-port="input" data-port-id="input"></span>` : ""}
        ${hasOutputPort
          ? `<span class="node-port node-port-output" data-node-id="${escapeHtml(node.id)}" data-port="output" data-port-id="output"></span>`
          : ""}
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

      if (!hasInputPort) {
        setContextMenuState(false);
        return;
      }

      setContextMenuState(true, {
        nodeId: node.id,
        x: event.clientX,
        y: event.clientY,
      });
    });

    const outputPorts = Array.from(el.querySelectorAll(".node-port-output"));
    outputPorts.forEach((outputPort) => {
      outputPort.addEventListener("pointerdown", (event) => {
        const fromPortId = outputPort.dataset.portId || getDefaultOutputPortId(node);
        const outgoingEdges = getOutgoingEdges(graph, node.id, { fromPortId });

        if (outgoingEdges.length) {
          removeEdges(graph, outgoingEdges);
        }

        beginConnectionDrag(event, node.id, {
          fromPortId,
          detachedEdges: outgoingEdges,
        });
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
        fromPortId: existingEdge.fromPortId || "output",
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
    audioInspectorFormEl.classList.add("hidden");
    dialogueInspectorFormEl.classList.add("hidden");
    inputInspectorFormEl.classList.add("hidden");
    achievementInspectorFormEl.classList.add("hidden");
    menuInspectorFormEl.classList.add("hidden");
    conditionInspectorFormEl.classList.add("hidden");
    flowInspectorFormEl.classList.add("hidden");
    screenInspectorFormEl.classList.add("hidden");
    pythonInspectorFormEl.classList.add("hidden");
    inspectorFormEl.classList.add("hidden");
    return;
  }

  const selectedIsStart = selectedNode.type === "start";
  const selectedIsImage = selectedNode.type === "image";
  const selectedIsAnimation = selectedNode.type === "animation";
  const selectedIsAudio = selectedNode.type === "audio";
  const selectedIsDialogue = selectedNode.type === "dialogue";
  const selectedIsInput = selectedNode.type === "input";
  const selectedIsAchievement = selectedNode.type === "achievement";
  const selectedIsMenu = selectedNode.type === "menu";
  const selectedIsCondition = selectedNode.type === "condition";
  const selectedIsFlow = isFlowNode(selectedNode);
  const selectedIsScreen = selectedNode.type === "screen";
  const selectedIsPython = selectedNode.type === "python";

  inspectorEmptyEl.classList.add("hidden");
  startInspectorFormEl.classList.toggle("hidden", !selectedIsStart);
  imageInspectorFormEl.classList.toggle("hidden", !selectedIsImage);
  animationInspectorFormEl.classList.toggle("hidden", !selectedIsAnimation);
  audioInspectorFormEl.classList.toggle("hidden", !selectedIsAudio);
  dialogueInspectorFormEl.classList.toggle("hidden", !selectedIsDialogue);
  inputInspectorFormEl.classList.toggle("hidden", !selectedIsInput);
  achievementInspectorFormEl.classList.toggle("hidden", !selectedIsAchievement);
  menuInspectorFormEl.classList.toggle("hidden", !selectedIsMenu);
  conditionInspectorFormEl.classList.toggle("hidden", !selectedIsCondition);
  flowInspectorFormEl.classList.toggle("hidden", !selectedIsFlow);
  screenInspectorFormEl.classList.toggle("hidden", !selectedIsScreen);
  pythonInspectorFormEl.classList.toggle("hidden", !selectedIsPython);
  inspectorFormEl.classList.toggle("hidden", selectedIsStart || selectedIsImage || selectedIsAnimation || selectedIsAudio || selectedIsDialogue || selectedIsInput || selectedIsAchievement || selectedIsMenu || selectedIsCondition || selectedIsFlow || selectedIsScreen || selectedIsPython);

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
    buildImageNodeResourceOptions(imageNodeNameInput, selectedNode, { mode: imageMode });
    renderImageNodeAtOptions();
    imageNodeLayerInput.value = selectedNode.imageLayer || "";
    imageNodeAtInput.value = selectedNode.imageAt || "";
    imageNodeAliasInput.value = selectedNode.imageAlias || "";
    imageNodeBehindInput.value = selectedNode.imageBehind || "";
    imageNodeZorderInput.value = selectedNode.imageZorder || "";

    imageNodeNameLabelEl.textContent = imageMode === "hide"
      ? "Target Tag"
      : imageMode === "scene"
        ? "Visual Asset (Optional)"
        : "Visual Asset";

    imageNameFieldEl.classList.remove("hidden");
    imageAtFieldEl.classList.toggle("hidden", imageMode === "hide");
    imageAliasFieldEl.classList.toggle("hidden", imageMode !== "show");
    imageBehindFieldEl.classList.toggle("hidden", imageMode !== "show");
    imageZorderFieldEl.classList.toggle("hidden", imageMode !== "show");
    renderImageNodeLive2DInspector(selectedNode);
    renderImageNodeLayeredInspector(selectedNode);
    return;
  }

  if (selectedIsAnimation) {
    animationNodeTypeInput.value = "Animation";
    animationNodeTransitionInput.value = getAnimationNodeTransition(selectedNode);
    return;
  }

  if (selectedIsAudio) {
    const audioAction = getAudioNodeAction(selectedNode);
    const usesResource = audioAction !== "stop";

    audioNodeTypeInput.value = "Audio";
    audioNodeActionInput.value = audioAction;
    buildAudioNodeResourceOptions(audioNodeResourceInput, selectedNode);
    audioNodeChannelInput.value = getAudioNodeChannel(selectedNode);
    audioNodeLoopInput.checked = Boolean(selectedNode.audioLoop);
    audioNodeFadeInInput.value = selectedNode.audioFadeIn || "";
    audioNodeFadeOutInput.value = selectedNode.audioFadeOut || "";
    audioNodeVolumeInput.value = selectedNode.audioVolume || "";
    audioNodeIfChangedInput.checked = Boolean(selectedNode.audioIfChanged);

    audioNodeResourceFieldEl.classList.toggle("hidden", !usesResource);
    audioNodeLoopFieldEl.classList.toggle("hidden", !usesResource);
    audioNodeFadeInFieldEl.classList.toggle("hidden", !usesResource);
    audioNodeFadeOutFieldEl.classList.toggle("hidden", usesResource);
    audioNodeVolumeFieldEl.classList.toggle("hidden", !usesResource);
    audioNodeIfChangedFieldEl.classList.toggle("hidden", audioAction !== "play");
    return;
  }

  if (selectedIsDialogue) {
    const dialogueHasVoice = getDialogueVoiceEnabled(selectedNode);

    dialogueNodeTypeInput.value = "Dialogue";
    buildDialogueCharacterOptions(dialogueCharacterInput, selectedNode);
    dialogueVoiceEnabledInput.checked = dialogueHasVoice;
    syncDialogueInspectorVoiceMode(dialogueHasVoice);

    if (dialogueHasVoice) {
      renderDialogueVoiceLineList(selectedNode);
    }

    dialogueNodeContentInput.value = selectedNode.content || "";
    return;
  }

  if (selectedIsInput) {
    inputNodeTypeInput.value = "Input";
    inputNodeVariableInput.value = selectedNode.inputVariable || "player_name";
    inputNodePromptInput.value = selectedNode.inputPrompt || selectedNode.content || "";
    inputNodeDefaultInput.value = selectedNode.inputDefault || "";
    inputNodeAllowInput.value = selectedNode.inputAllow || "";
    inputNodeExcludeInput.value = selectedNode.inputExclude || "";
    inputNodeLengthInput.value = selectedNode.inputLength || "";
    inputNodePixelWidthInput.value = selectedNode.inputPixelWidth || "";
    inputNodeScreenInput.value = selectedNode.inputScreen || "input";
    inputNodeMaskInput.value = selectedNode.inputMask || "";
    inputNodeFallbackInput.value = selectedNode.inputFallback || "";
    inputNodeTrimInput.checked = selectedNode.inputTrim !== false;
    inputNodeCopyPasteInput.checked = selectedNode.inputCopyPaste !== false;
    return;
  }

  if (selectedIsAchievement) {
    const achievementAction = getAchievementNodeAction(selectedNode);

    achievementNodeTypeInput.value = "Achievement";
    achievementNodeActionInput.value = achievementAction;
    buildAchievementNodeOptions(achievementNodeNameInput, selectedNode);
    achievementNodeProgressModeInput.value = selectedNode.achievementProgressMode === "add" ? "add" : "set";
    achievementNodeProgressValueInput.value = `${selectedNode.achievementProgressValue || ""}`.trim() || "1";
    achievementNodeNameFieldEl.classList.toggle("hidden", achievementAction === "sync");
    achievementNodeProgressFieldsEl.classList.toggle("hidden", achievementAction !== "progress");
    achievementNodeSyncHelpEl.classList.toggle("hidden", achievementAction !== "sync");
    return;
  }

  if (selectedIsMenu) {
    menuNodeTypeInput.value = "Choice";
    menuNodePromptInput.value = selectedNode.menuPrompt || "";
    renderMenuChoiceList(selectedNode);
    return;
  }

  if (selectedIsCondition) {
    conditionNodeTypeInput.value = "Condition";
    renderConditionClauseList(selectedNode);
    return;
  }

  if (selectedIsFlow) {
    const flowMode = getFlowNodeMode(selectedNode);

    flowNodeTypeInput.value = "Flow Control";
    flowNodeModeInput.value = flowMode;
    buildFlowTargetOptions(flowNodeTargetInput, selectedNode);
    flowNodeTargetFieldEl.classList.toggle("hidden", flowMode === "return");
    return;
  }

  if (selectedIsScreen) {
    const screenMode = getScreenNodeMode(selectedNode);
    const screenName = getScreenNodeName(selectedNode);
    const matchedScreen = getGuiScreenByName(screenName);
    const isSpecialScreen = isSpecialGuiScreenName(screenName);

    screenNodeTypeInput.value = "Screen";
    screenNodeModeInput.value = screenMode;
    screenNodeNameInput.value = screenName;
    buildScreenNodeSuggestionOptions(screenNodeNameSuggestionsEl, screenName);
    screenNodeArgumentsInput.value = selectedNode.screenArguments || "";
    screenNodeResultVariableInput.value = selectedNode.screenResultVariable || "";
    screenNodeArgumentsFieldEl.classList.toggle("hidden", screenMode === "hide");
    screenNodeResultVariableFieldEl.classList.toggle("hidden", screenMode !== "call");
    screenNodeSpecialInfoEl.classList.toggle("hidden", !isSpecialScreen);
    screenNodeMissingInfoEl.classList.toggle("hidden", !screenName || isSpecialScreen || Boolean(matchedScreen));

    if (isSpecialScreen) {
      screenNodeSpecialInfoEl.textContent = `"${screenName}" is a special Ren'Py screen. It is usually called automatically by the engine, so you often do not need a Screen Block for it.`;
    }

    if (screenName && !isSpecialScreen && !matchedScreen) {
      screenNodeMissingInfoEl.textContent = `"${screenName}" is not defined in the GUI Editor right now. That's okay if it comes from another .rpy file or a built-in screen.`;
    }

    return;
  }

  if (selectedIsPython) {
    const pythonMode = selectedNode.pythonMode === "block" ? "block" : "line";

    pythonNodeTypeInput.value = "Python";
    pythonNodeModeInput.value = pythonMode;
    pythonNodeStoreFieldEl.classList.toggle("hidden", pythonMode !== "block");
    pythonNodeHideFieldEl.classList.toggle("hidden", pythonMode !== "block");
    pythonNodeStoreInput.value = selectedNode.pythonStore || "";
    pythonNodeHideInput.checked = Boolean(selectedNode.pythonHide);
    pythonNodeCodeInput.value = selectedNode.pythonCode || "";
    pythonNodeCodeInput.placeholder = pythonMode === "block"
      ? "e.g. import random\npoints += 1"
      : "e.g. points += 1";
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
  renderGuiEditorPanel();
  renderImageTagSuggestions();
  renderLabelGraphList();
  renderLabelPanel();
  renderImagesPanel();
  renderLive2DPanel();
  renderAudioPanel();
  renderCharactersPanel();
  renderVariablesPanel();
  renderAchievementsPanel();
  renderDefinitionsPanel();
  renderProjectVoiceSettings();
  renderProjectSideImageSettings();
  renderProjectSaveLoadSettings();
  renderProjectKeymapSettings();
  renderVisualProjectStats();
  renderGraph();
  renderInspector();
  renderViewport();
  applyCurrentLocale();
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

function updateSelectedFlowNode(patch, { pruneOutput = false } = {}) {
  const graph = getActiveGraph();

  if (!graph || !graph.selectedNodeId) {
    return;
  }

  const selectedNode = graph.nodes.find((node) => node.id === graph.selectedNodeId);

  if (!selectedNode || !isFlowNode(selectedNode)) {
    return;
  }

  const nextNode = {
    ...selectedNode,
    ...patch,
    type: "flow",
  };

  graph.nodes = graph.nodes.map((node) => (
    node.id === graph.selectedNodeId ? nextNode : node
  ));

  if (pruneOutput && !nodeAllowsOutgoingConnections(nextNode)) {
    const outgoingEdges = getOutgoingEdges(graph, nextNode.id);

    if (outgoingEdges.length) {
      removeEdges(graph, outgoingEdges);
    }
  }

  render();
}

function updateSelectedMenuNode(updater) {
  const graph = getActiveGraph();

  if (!graph || !graph.selectedNodeId) {
    return;
  }

  const selectedNode = graph.nodes.find((node) => node.id === graph.selectedNodeId);

  if (!selectedNode || selectedNode.type !== "menu") {
    return;
  }

  const nextNode = typeof updater === "function"
    ? updater(selectedNode)
    : { ...selectedNode, ...updater };

  graph.nodes = graph.nodes.map((node) => (
    node.id === graph.selectedNodeId ? nextNode : node
  ));

  graph.edges = graph.edges.filter((edge) => {
    if (edge.fromNodeId !== nextNode.id) {
      return true;
    }

    return normalizeOutputPortId(nextNode, edge.fromPortId) === (edge.fromPortId || "output");
  });

  render();
}

function updateSelectedDialogueNode(updater) {
  const graph = getActiveGraph();

  if (!graph || !graph.selectedNodeId) {
    return;
  }

  const selectedNode = graph.nodes.find((node) => node.id === graph.selectedNodeId);

  if (!selectedNode || selectedNode.type !== "dialogue") {
    return;
  }

  const nextNode = typeof updater === "function"
    ? updater(selectedNode)
    : { ...selectedNode, ...updater };

  if (Array.isArray(nextNode.dialogueLines)) {
    nextNode.dialogueLines = nextNode.dialogueLines.map((line, index) => normalizeDialogueVoiceLine(line, index + 1));
  }

  graph.nodes = graph.nodes.map((node) => (
    node.id === graph.selectedNodeId ? nextNode : node
  ));

  render();
}

function updateSelectedConditionNode(updater) {
  const graph = getActiveGraph();

  if (!graph || !graph.selectedNodeId) {
    return;
  }

  const selectedNode = graph.nodes.find((node) => node.id === graph.selectedNodeId);

  if (!selectedNode || selectedNode.type !== "condition") {
    return;
  }

  const nextNode = typeof updater === "function"
    ? updater(selectedNode)
    : { ...selectedNode, ...updater };

  nextNode.conditionClauses = normalizeConditionClauses(nextNode.conditionClauses);

  graph.nodes = graph.nodes.map((node) => (
    node.id === graph.selectedNodeId ? nextNode : node
  ));

  graph.edges = graph.edges.filter((edge) => {
    if (edge.fromNodeId !== nextNode.id) {
      return true;
    }

    return normalizeOutputPortId(nextNode, edge.fromPortId) === (edge.fromPortId || "output");
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
  renderGraph();
  renderInspector();
  saveState();
}

function updateActiveImageDefinition(patch) {
  const image = getActiveImageDefinition();

  if (!image) {
    return;
  }

  Object.assign(image, patch);
  syncImageDefinitionDetailFields();
  render();
  saveState();
}

function updateActiveLive2DDefinition(patch) {
  const definition = getActiveLive2DDefinition();

  if (!definition) {
    return;
  }

  Object.assign(definition, patch);
  syncLive2DDefinitionDetailFields();
  render();
  saveState();
}

function updateActiveAudioDefinition(patch) {
  const audioDefinition = getActiveAudioDefinition();

  if (!audioDefinition) {
    return;
  }

  Object.assign(audioDefinition, patch);
  syncAudioDefinitionDetailFields();
  render();
  saveState();
}

function updateActiveVariable(patch) {
  const variable = getActiveVariable();

  if (!variable) {
    return;
  }

  Object.assign(variable, patch);
  syncVariableDetailFields();
  syncLabelCodePreview();
  renderInspector();
  renderVisualProjectStats();
  saveState();
}

function updateActiveAchievement(patch) {
  const achievement = getActiveAchievement();

  if (!achievement) {
    return;
  }

  Object.assign(achievement, patch);
  renderAchievementsPanel();
  renderGraph();
  renderInspector();
  renderVisualProjectStats();
  saveState();
}

function updateActiveDefinition(patch) {
  const definition = getActiveDefinition();

  if (!definition) {
    return;
  }

  Object.assign(definition, patch);
  syncDefinitionDetailFields();
  renderVisualProjectStats();
  saveState();
}

function updateProjectMeta(patch) {
  Object.assign(state.meta, patch);
  render();
  saveState();
}

function handleImageDefinitionFieldChange(event) {
  const field = event.target.dataset.imageField;
  const activeImage = getActiveImageDefinition();

  if (!field || !activeImage) {
    return;
  }

  const nextValue = imageDefinitionBooleanFields.has(field)
    ? event.target.checked
    : event.target.value;

  if (field === "category") {
    imageCategorySectionState[nextValue] = true;
  }

  if (field === "definitionType") {
    const patch = {
      definitionType: nextValue,
    };

    if (nextValue === "layered") {
      patch.isSideImage = false;

      if (!normalizeLayeredAlwaysLayers(activeImage.layeredAlwaysLayers).length) {
        patch.layeredAlwaysLayers = [createLayeredAlwaysLayer(1)];
      }

      if (!normalizeLayeredGroups(activeImage.layeredGroups).length) {
        patch.layeredGroups = [createLayeredGroup(1)];
      }
    }

    if (nextValue === "composite" && !normalizeCompositeLayers(activeImage.compositeLayers).length) {
      patch.compositeLayers = [createCompositeLayer(1)];
    }

    if (nextValue === "solid" && !`${activeImage.solidColor || ""}`.trim()) {
      patch.solidColor = imageDefinitionFieldDefaults.solidColor;
    }

    if (nextValue === "placeholder" && !`${activeImage.placeholderBase || ""}`.trim()) {
      patch.placeholderBase = imageDefinitionFieldDefaults.placeholderBase;
    }

    updateActiveImageDefinition(patch);
    return;
  }

  if (field === "isSideImage" && getImageDefinitionType(activeImage) === "layered") {
    updateActiveImageDefinition({ isSideImage: false });
    setStatus("Layered image definitions stay regular layered images. Create a separate side image definition for portraits.");
    return;
  }

  if (field === "atlEnabled") {
    const currentSteps = normalizeImageAtlSteps(activeImage.atlSteps);

    updateActiveImageDefinition({
      atlEnabled: nextValue,
      ...(nextValue && !currentSteps.length ? { atlSteps: [createImageAtlStep(1)] } : {}),
    });
    return;
  }

  if (field === "movieKeepLastFrame") {
    updateActiveImageDefinition({
      movieKeepLastFrame: nextValue,
      ...(nextValue ? { movieLoop: false } : {}),
    });
    return;
  }

  if (field === "movieLoop" && nextValue && activeImage.movieKeepLastFrame) {
    updateActiveImageDefinition({
      movieLoop: true,
      movieKeepLastFrame: false,
    });
    return;
  }

  updateActiveImageDefinition({ [field]: nextValue });
}

function updateActiveImageAtlStep(stepId, patch) {
  const image = getActiveImageDefinition();

  if (!stepId || !image) {
    return;
  }

  const nextSteps = normalizeImageAtlSteps(image.atlSteps).map((step, index) => {
    if (step.id !== stepId) {
      return step;
    }

    if (patch.type) {
      return createImageAtlStep(index + 1, {
        ...step,
        type: patch.type,
        id: step.id,
      });
    }

    return {
      ...step,
      ...patch,
    };
  });

  updateActiveImageDefinition({ atlSteps: nextSteps });
}

function updateActiveLayeredAlwaysLayer(layerId, patch) {
  const image = getActiveImageDefinition();

  if (!layerId || !image) {
    return;
  }

  updateActiveImageDefinition({
    layeredAlwaysLayers: normalizeLayeredAlwaysLayers(image.layeredAlwaysLayers).map((layer) => (
      layer.id === layerId
        ? {
          ...layer,
          ...patch,
        }
        : layer
    )),
  });
}

function updateActiveLayeredGroup(groupId, patch) {
  const image = getActiveImageDefinition();

  if (!groupId || !image) {
    return;
  }

  updateActiveImageDefinition({
    layeredGroups: normalizeLayeredGroups(image.layeredGroups).map((group, index) => {
      if (group.id !== groupId) {
        return group;
      }

      const nextGroup = patch.mode
        ? createLayeredGroup(index + 1, {
          ...group,
          ...patch,
          id: group.id,
        })
        : {
          ...group,
          ...patch,
        };

      if (patch.mode === "multiple") {
        nextGroup.attributes = normalizeLayeredAttributes(nextGroup.attributes, { allowDefaults: false });
      }

      return nextGroup;
    }),
  });
}

function updateActiveLayeredAttribute(groupId, attributeId, patch) {
  const image = getActiveImageDefinition();

  if (!groupId || !attributeId || !image) {
    return;
  }

  updateActiveImageDefinition({
    layeredGroups: normalizeLayeredGroups(image.layeredGroups).map((group) => {
      if (group.id !== groupId) {
        return group;
      }

      return {
        ...group,
        attributes: normalizeLayeredAttributes(group.attributes, {
          allowDefaults: group.mode !== "multiple",
        }).map((attribute, index) => {
          if (group.mode !== "multiple" && patch.isDefault === true && attribute.id !== attributeId) {
            return {
              ...attribute,
              isDefault: false,
            };
          }

          if (attribute.id !== attributeId) {
            return attribute;
          }

          return patch.displayMode
            ? createLayeredAttribute(index + 1, {
              ...attribute,
              ...patch,
              id: attribute.id,
              isDefault: group.mode === "multiple" ? false : (patch.isDefault ?? attribute.isDefault),
            })
            : {
              ...attribute,
              ...patch,
            };
        }),
      };
    }),
  });
}

function handleMatrixColorBuilderChange() {
  if (!getActiveImageDefinition()) {
    return;
  }

  const mode = imageDefinitionMatrixColorModeInput.value;

  setMatrixColorBuilderModeVisibility(mode);

  if (mode === "custom") {
    return;
  }

  updateActiveImageDefinition({
    matrixcolor: buildMatrixColorExpressionFromBuilder(),
  });
}

function handleAudioDefinitionFieldChange(event) {
  const field = event.target.dataset.audioField;

  if (!field) {
    return;
  }

  if (field === "channel") {
    audioChannelSectionState[event.target.value] = true;
    updateActiveAudioDefinition({ channel: event.target.value });
    return;
  }

  if (field === "voiceCharacterId") {
    const selectedValue = event.target.value;

    if (!selectedValue) {
      updateActiveAudioDefinition({
        voiceCharacterId: "",
        voiceSpeaker: "Narrator",
      });
      return;
    }

    if (selectedValue.startsWith("__missing__:")) {
      updateActiveAudioDefinition({
        voiceCharacterId: selectedValue.slice("__missing__:".length),
      });
      return;
    }

    const selectedCharacter = getCharacterById(selectedValue);

    if (!selectedCharacter) {
      updateActiveAudioDefinition({
        voiceCharacterId: "",
        voiceSpeaker: "Narrator",
      });
      return;
    }

    updateActiveAudioDefinition({
      voiceCharacterId: selectedCharacter.id,
      voiceSpeaker: selectedCharacter.name,
    });
    return;
  }

  updateActiveAudioDefinition({ [field]: event.target.value });
}

function handleLive2DDefinitionFieldChange(event) {
  const field = event.target.dataset.live2dField;

  if (!field) {
    return;
  }

  updateActiveLive2DDefinition({
    [field]: event.target.type === "checkbox"
      ? event.target.checked
      : event.target.value,
  });
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
  setImageContextMenuState(false);
  setAudioContextMenuState(false);
  setCharacterContextMenuState(false);
  setInspectorState(Boolean(graph.selectedNodeId));
  setAddBlockState(false);
  saveState(`Reset label graph "${graph.label}".`);
  render();
}

function formatDeletedPathSummary(paths) {
  if (!Array.isArray(paths)) {
    return "";
  }

  return paths
    .map((path) => `${path ?? ""}`.trim())
    .filter(Boolean)
    .join(", ");
}

function getLegacyScriptTakeoverMeta() {
  const takeoverMeta = state?.meta?.legacyScriptTakeover;
  return takeoverMeta && typeof takeoverMeta === "object" ? takeoverMeta : null;
}

async function syncLegacyScriptTakeover() {
  if (!hasBridge) {
    return {
      canceled: false,
      deletedPaths: [],
      alreadyClean: true,
    };
  }

  const takeoverMeta = getLegacyScriptTakeoverMeta();

  if (!takeoverMeta?.confirmed) {
    const confirmed = window.confirm(
      t("status.script_takeover_confirm"),
    );

    if (!confirmed) {
      return {
        canceled: true,
        deletedPaths: [],
        alreadyClean: false,
      };
    }
  }

  const response = await callBridge("cleanup_legacy_script_files", { state });
  state = normalizeState(response.state || state);
  window.localStorage.setItem(storageKey, JSON.stringify(state, null, 2));
  setProjectJsonSyncMeta("good", t("sync.project_json.script_cleanup"));
  queueProjectHealthRefresh({ immediate: true });
  render();

  return {
    canceled: false,
    deletedPaths: Array.isArray(response.deletedPaths) ? response.deletedPaths.filter(Boolean) : [],
    alreadyClean: response.alreadyClean === true,
  };
}

async function saveDraftToBridge() {
  window.clearTimeout(bridgeSaveTimer);
  state = normalizeState(state);
  window.localStorage.setItem(storageKey, JSON.stringify(state, null, 2));

  if (!hasBridge) {
    setProjectJsonSyncMeta("warn", t("sync.project_json.local_only"));
    setStatus(t("status.saved_local_draft"));
    return;
  }

  try {
    const scriptCleanup = await syncLegacyScriptTakeover();

    if (scriptCleanup.canceled) {
      await callBridge("state", { state });
      setProjectJsonSyncMeta("good", t("sync.project_json.kept_scripts"));
      queueProjectHealthRefresh({ immediate: true });
      setStatus(t("status.synced_kept_scripts"));
      return;
    }

    const deletedSummary = formatDeletedPathSummary(scriptCleanup.deletedPaths);
    setProjectJsonSyncMeta("good", t("sync.project_json.good"));
    queueProjectHealthRefresh({ immediate: true });
    setStatus(
      deletedSummary
        ? t("status.synced_removed", { paths: deletedSummary })
        : t("status.synced_simple"),
    );
  } catch (error) {
    console.error(error);
    setProjectJsonSyncMeta("bad", t("sync.project_json.failed", { message: error.message }));
    setStatus(t("sync.project_json.failed", { message: error.message }));
  }
}

async function exportGraph() {
  window.clearTimeout(bridgeSaveTimer);
  state = normalizeState(state);
  window.localStorage.setItem(storageKey, JSON.stringify(state, null, 2));
  const code = formatGeneratedVisualEditorCode();

  if (!hasBridge) {
    console.info(code);
    setExportSyncMeta("warn", t("sync.export.local_only"));
    setStatus(t("status.export_bridge_required"));
    return;
  }

  try {
    const scriptCleanup = await syncLegacyScriptTakeover();

    if (scriptCleanup.canceled) {
      setExportSyncMeta("warn", t("sync.export.canceled"));
      setStatus(t("status.export_canceled_kept_scripts"));
      return;
    }

    await callBridge("export", { state, code });
    const deletedSummary = formatDeletedPathSummary(scriptCleanup.deletedPaths);
    setProjectJsonSyncMeta("good", t("sync.project_json.good"));
    setExportSyncMeta("good", t("sync.export.good"));
    queueProjectHealthRefresh({ immediate: true });
    setStatus(
      deletedSummary
        ? t("status.export_success_removed", { paths: deletedSummary })
        : t("status.export_success_simple"),
    );
  } catch (error) {
    console.error(error);
    setExportSyncMeta("bad", t("sync.export.failed", { message: error.message }));
    setStatus(t("sync.export.failed", { message: error.message }));
  }
}

async function takeoverLegacyFiles() {
  window.clearTimeout(bridgeSaveTimer);
  state = normalizeState(state);
  window.localStorage.setItem(storageKey, JSON.stringify(state, null, 2));
  const code = formatGeneratedVisualEditorCode();

  if (!hasBridge) {
    setStatus(t("status.takeover_bridge_required"));
    return;
  }

  const confirmed = window.confirm(
    t("status.takeover_confirm"),
  );

  if (!confirmed) {
    setStatus(t("status.takeover_kept_existing"));
    return;
  }

  try {
    const response = await callBridge("takeover_legacy_files", { state, code });
    state = normalizeState(response.state || state);
    window.localStorage.setItem(storageKey, JSON.stringify(state, null, 2));
    setProjectJsonSyncMeta("good", t("sync.project_json.gui_takeover"));
    setExportSyncMeta("good", t("sync.export.gui_takeover"));
    queueProjectHealthRefresh({ immediate: true });
    render();

    if (response.alreadyTakenOver) {
      setStatus(t("status.takeover_already_active"));
      return;
    }

    const deletedPaths = Array.isArray(response.deletedPaths) ? response.deletedPaths.filter(Boolean) : [];
    const deletedSummary = deletedPaths.length
      ? deletedPaths.join(", ")
      : t("status.takeover_deleted_none");
    const backupRoot = `${response.backupRoot || ""}`.trim();
    setStatus(
      backupRoot
        ? t("status.takeover_success_with_backup", { paths: deletedSummary, backupRoot })
        : t("status.takeover_success", { paths: deletedSummary }),
    );
  } catch (error) {
    console.error(error);
    setExportSyncMeta("bad", t("status.takeover_failed", { message: error.message }));
    setStatus(t("status.takeover_failed", { message: error.message }));
  }
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
  setImageContextMenuState(false);
  setAudioContextMenuState(false);
  setCharacterContextMenuState(false);
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
  setLabelContextMenuState(false);
  setImageContextMenuState(false);
  setAudioContextMenuState(false);
  setCharacterContextMenuState(false);

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
imageNodeNameInput.addEventListener("change", (event) => {
  const selectedValue = event.target.value;

  if (!selectedValue) {
    updateSelectedNode({
      imageDefinitionId: "",
      imageName: "",
      imageLayeredSelections: {},
      imageLive2DMotion: "",
      imageLive2DExpression: "",
      imageLive2DNonexclusive: [],
      imageLive2DRemovals: [],
      imageLive2DStill: false,
      imageLive2DAdditionalAttributes: "",
    });
    return;
  }

  if (selectedValue.startsWith("__legacy__:")) {
    updateSelectedNode({
      imageDefinitionId: "",
      imageName: selectedValue.slice("__legacy__:".length),
      imageLayeredSelections: {},
      imageLive2DMotion: "",
      imageLive2DExpression: "",
      imageLive2DNonexclusive: [],
      imageLive2DRemovals: [],
      imageLive2DStill: false,
      imageLive2DAdditionalAttributes: "",
    });
    return;
  }

  const selectedImage = getVisualResourceById(selectedValue);

  if (!selectedImage) {
    updateSelectedNode({
      imageDefinitionId: "",
      imageName: "",
      imageLayeredSelections: {},
      imageLive2DMotion: "",
      imageLive2DExpression: "",
      imageLive2DNonexclusive: [],
      imageLive2DRemovals: [],
      imageLive2DStill: false,
      imageLive2DAdditionalAttributes: "",
    });
    return;
  }

  updateSelectedNode({
    imageDefinitionId: selectedImage.id,
    imageName: selectedImage.name,
    imageLayeredSelections: {},
    imageLive2DMotion: "",
    imageLive2DExpression: "",
    imageLive2DNonexclusive: [],
    imageLive2DRemovals: [],
    imageLive2DStill: false,
    imageLive2DAdditionalAttributes: "",
  });
});
imageNodeLayerInput.addEventListener("input", (event) => {
  updateSelectedNode({ imageLayer: event.target.value });
});
imageNodeAtInput.addEventListener("input", (event) => {
  updateSelectedNode({ imageAt: event.target.value });
});
imageNodeAtPresetChipsEl.addEventListener("click", (event) => {
  const presetButton = event.target.closest("[data-image-at-preset]");
  const graph = getActiveGraph();
  const selectedNode = graph?.nodes.find((node) => node.id === graph.selectedNodeId);

  if (!presetButton || !selectedNode || selectedNode.type !== "image") {
    return;
  }

  const selectedPreset = presetButton.dataset.imageAtPreset;
  const currentCustomTransforms = `${selectedNode.imageAt || ""}`
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item && !builtInTransformPresets.includes(item));
  const nextTransforms = [selectedPreset, ...currentCustomTransforms];

  updateSelectedNode({ imageAt: nextTransforms.join(", ") });
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
imageNodeLayeredGroupListEl.addEventListener("change", (event) => {
  const groupId = event.target.dataset.imageLayeredGroupId;

  if (!groupId) {
    return;
  }

  const graph = getActiveGraph();
  const selectedNode = graph?.nodes.find((node) => node.id === graph.selectedNodeId);

  if (!selectedNode || selectedNode.type !== "image") {
    return;
  }

  const selectedImage = getImageDefinitionById(selectedNode.imageDefinitionId);

  if (!selectedImage || getImageDefinitionType(selectedImage) !== "layered") {
    return;
  }

  const group = normalizeLayeredGroups(selectedImage.layeredGroups).find((currentGroup) => currentGroup.id === groupId);

  if (!group) {
    return;
  }

  const nextSelections = {
    ...getImageNodeLayeredSelectionMap(selectedNode, selectedImage),
  };

  if (group.mode === "multiple") {
    const attributeId = event.target.dataset.imageLayeredAttributeId;

    if (!attributeId) {
      return;
    }

    const currentSelection = nextSelections[group.id] || [];
    const updatedSelection = event.target.checked
      ? [...currentSelection, attributeId].filter((value, index, source) => source.indexOf(value) === index)
      : currentSelection.filter((value) => value !== attributeId);

    if (updatedSelection.length) {
      nextSelections[group.id] = updatedSelection;
    } else {
      delete nextSelections[group.id];
    }
  } else {
    const attributeId = `${event.target.value || ""}`.trim();

    if (attributeId) {
      nextSelections[group.id] = [attributeId];
    } else {
      delete nextSelections[group.id];
    }
  }

  updateSelectedNode({
    imageLayeredSelections: getImageNodeLayeredSelectionMap({
      imageLayeredSelections: nextSelections,
      imageDefinitionId: selectedImage.id,
    }, selectedImage),
  });
});
imageNodeLive2DMotionInput.addEventListener("change", (event) => {
  updateSelectedNode({ imageLive2DMotion: `${event.target.value || ""}`.trim() });
});
imageNodeLive2DExpressionInput.addEventListener("change", (event) => {
  updateSelectedNode({ imageLive2DExpression: `${event.target.value || ""}`.trim() });
});
imageNodeLive2DStillInput.addEventListener("change", (event) => {
  updateSelectedNode({ imageLive2DStill: event.target.checked });
});
imageNodeLive2DAdditionalInput.addEventListener("input", (event) => {
  updateSelectedNode({ imageLive2DAdditionalAttributes: event.target.value });
});
const handleImageNodeLive2DAttributeToggle = (event) => {
  const role = event.target.dataset.imageLive2dRole;
  const attribute = `${event.target.dataset.imageLive2dAttribute || ""}`.trim();

  if (!role || !attribute) {
    return;
  }

  const graph = getActiveGraph();
  const selectedNode = graph?.nodes.find((node) => node.id === graph.selectedNodeId);
  const selectedDefinition = getLive2DDefinitionById(selectedNode?.imageDefinitionId || "");

  if (!selectedNode || selectedNode.type !== "image" || !selectedDefinition) {
    return;
  }

  const live2dState = getImageNodeLive2DState(selectedNode);
  const nextNonexclusive = [...live2dState.nonexclusive];
  const nextRemovals = [...live2dState.removals];

  if (role === "nonexclusive") {
    const updatedNonexclusive = event.target.checked
      ? [...nextNonexclusive, attribute].filter((value, index, source) => source.indexOf(value) === index)
      : nextNonexclusive.filter((value) => value !== attribute);

    updateSelectedNode({
      imageLive2DNonexclusive: updatedNonexclusive,
      imageLive2DRemovals: nextRemovals.filter((value) => value !== attribute),
    });
    return;
  }

  if (role === "removal") {
    const updatedRemovals = event.target.checked
      ? [...nextRemovals, attribute].filter((value, index, source) => source.indexOf(value) === index)
      : nextRemovals.filter((value) => value !== attribute);

    updateSelectedNode({
      imageLive2DRemovals: updatedRemovals,
      imageLive2DNonexclusive: nextNonexclusive.filter((value) => value !== attribute),
    });
  }
};
imageNodeLive2DNonexclusiveListEl.addEventListener("change", handleImageNodeLive2DAttributeToggle);
imageNodeLive2DRemovalListEl.addEventListener("change", handleImageNodeLive2DAttributeToggle);
animationNodeTransitionInput.addEventListener("change", (event) => {
  updateSelectedNode({ animationTransition: event.target.value });
});
audioNodeActionInput.addEventListener("change", (event) => {
  updateSelectedNode({
    audioAction: event.target.value,
    title: `Audio ${capitalize(event.target.value)}`,
  });
});
audioNodeResourceInput.addEventListener("change", (event) => {
  const selectedValue = event.target.value;

  if (!selectedValue) {
    updateSelectedNode({ audioDefinitionId: "", audioName: "" });
    return;
  }

  if (selectedValue.startsWith("__missing__:")) {
    updateSelectedNode({
      audioDefinitionId: "",
      audioName: selectedValue.slice("__missing__:".length),
    });
    return;
  }

  const selectedAudio = getAudioDefinitionById(selectedValue);

  if (!selectedAudio) {
    updateSelectedNode({ audioDefinitionId: "", audioName: "" });
    return;
  }

  updateSelectedNode({
    audioDefinitionId: selectedAudio.id,
    audioName: selectedAudio.name,
    audioChannel: selectedAudio.channel,
  });
});
audioNodeChannelInput.addEventListener("change", (event) => {
  updateSelectedNode({ audioChannel: event.target.value });
});
audioNodeLoopInput.addEventListener("change", (event) => {
  updateSelectedNode({ audioLoop: event.target.checked });
});
audioNodeFadeInInput.addEventListener("input", (event) => {
  updateSelectedNode({ audioFadeIn: event.target.value });
});
audioNodeFadeOutInput.addEventListener("input", (event) => {
  updateSelectedNode({ audioFadeOut: event.target.value });
});
audioNodeVolumeInput.addEventListener("input", (event) => {
  updateSelectedNode({ audioVolume: event.target.value });
});
audioNodeIfChangedInput.addEventListener("change", (event) => {
  updateSelectedNode({ audioIfChanged: event.target.checked });
});
dialogueInspectorFormEl.addEventListener("focusin", (event) => {
  if (isDialogueTextField(event.target)) {
    updateDialogueTextTarget(event.target);
  }
});
dialogueTextToolsEl.addEventListener("click", (event) => {
  const toolButton = event.target.closest("[data-dialogue-tool]");

  if (!toolButton) {
    return;
  }

  insertDialogueTextTool(toolButton.dataset.dialogueTool);
});
dialogueCharacterInput.addEventListener("change", (event) => {
  const selectedValue = event.target.value;

  if (!selectedValue) {
    updateSelectedDialogueNode((node) => ({
      ...node,
      dialogueCharacterId: "",
      dialogueSpeaker: "Narrator",
      dialogueLines: sanitizeDialogueVoiceLinesForSpeaker(getDialogueVoiceLines(node), {
        kind: "narrator",
        id: null,
        name: "Narrator",
      }),
    }));
    return;
  }

  if (selectedValue.startsWith("__missing__:")) {
    const missingId = selectedValue.slice("__missing__:".length);
    const graph = getActiveGraph();
    const selectedNode = graph?.nodes.find((node) => node.id === graph.selectedNodeId);
    const currentSpeaker = getDialogueSpeaker(selectedNode || {});

    updateSelectedNode({
      dialogueCharacterId: missingId,
      dialogueSpeaker: currentSpeaker.name,
    });
    return;
  }

  const selectedCharacter = getCharacterById(selectedValue);

  if (!selectedCharacter) {
    updateSelectedDialogueNode((node) => ({
      ...node,
      dialogueCharacterId: "",
      dialogueSpeaker: "Narrator",
      dialogueLines: sanitizeDialogueVoiceLinesForSpeaker(getDialogueVoiceLines(node), {
        kind: "narrator",
        id: null,
        name: "Narrator",
      }),
    }));
    return;
  }

  updateSelectedDialogueNode((node) => ({
    ...node,
    dialogueCharacterId: selectedCharacter.id,
    dialogueSpeaker: selectedCharacter.name,
    dialogueLines: sanitizeDialogueVoiceLinesForSpeaker(getDialogueVoiceLines(node), {
      kind: "character",
      id: selectedCharacter.id,
      name: selectedCharacter.name,
    }),
  }));
});
dialogueVoiceEnabledInput.addEventListener("change", (event) => {
  const nextEnabled = event.target.checked;
  syncDialogueInspectorVoiceMode(nextEnabled);

  updateSelectedDialogueNode((node) => ({
    ...node,
    dialogueVoiceEnabled: nextEnabled,
    content: nextEnabled
      ? node.content
      : getDialogueVoiceLines(node)
        .map((line) => `${line.text || ""}`.trim())
        .filter(Boolean)
        .join("\n\n"),
    dialogueLines: nextEnabled && !getDialogueVoiceLines(node).length
      ? (() => {
        const nextLines = normalizeDialogueVoiceLines(node.dialogueLines, {
          fallbackTextSource: node.content,
        });

        return nextLines.length ? nextLines : [createDialogueVoiceLine(1)];
      })()
      : getDialogueVoiceLines(node),
  }));
});
dialogueAddVoiceLineButton.addEventListener("click", () => {
  updateSelectedDialogueNode((node) => ({
    ...node,
    dialogueLines: [
      ...getDialogueVoiceLines(node),
      createDialogueVoiceLine(getDialogueVoiceLines(node).length + 1),
    ],
  }));
});
dialogueVoiceLineListEl.addEventListener("input", (event) => {
  const lineId = event.target.dataset.dialogueLineId;
  const field = event.target.dataset.dialogueLineField;

  if (!lineId || field !== "text") {
    return;
  }

  updateSelectedDialogueNode((node) => ({
    ...node,
    dialogueLines: getDialogueVoiceLines(node).map((line) => (
      line.id === lineId
        ? { ...line, [field]: event.target.value }
        : line
    )),
  }));
});
dialogueVoiceLineListEl.addEventListener("change", (event) => {
  const lineId = event.target.dataset.dialogueLineId;
  const field = event.target.dataset.dialogueLineField;

  if (!lineId || field !== "voiceAudioId") {
    return;
  }

  const selectedValue = event.target.value;

  updateSelectedDialogueNode((node) => ({
    ...node,
    dialogueLines: getDialogueVoiceLines(node).map((line) => {
      if (line.id !== lineId) {
        return line;
      }

      if (!selectedValue) {
        return {
          ...line,
          voiceAudioId: "",
          voiceAudioName: "",
        };
      }

      if (selectedValue.startsWith("__missing__:")) {
        return {
          ...line,
          voiceAudioId: "",
          voiceAudioName: selectedValue.slice("__missing__:".length),
        };
      }

      const selectedAudio = getAudioDefinitionById(selectedValue);

      if (!selectedAudio) {
        return {
          ...line,
          voiceAudioId: "",
          voiceAudioName: "",
        };
      }

      return {
        ...line,
        voiceAudioId: selectedAudio.id,
        voiceAudioName: selectedAudio.name,
      };
    }),
  }));
});
dialogueVoiceLineListEl.addEventListener("click", (event) => {
  const removeLineId = event.target.dataset.removeDialogueLineId;

  if (!removeLineId) {
    return;
  }

  updateSelectedDialogueNode((node) => ({
    ...node,
    dialogueLines: getDialogueVoiceLines(node).filter((line) => line.id !== removeLineId),
  }));
});
dialogueNodeContentInput.addEventListener("input", (event) => {
  updateSelectedNode({ content: event.target.value });
});
inputNodeVariableInput.addEventListener("input", (event) => {
  updateSelectedNode({ inputVariable: event.target.value.trim() || "player_name" });
});
inputNodePromptInput.addEventListener("input", (event) => {
  updateSelectedNode({
    inputPrompt: event.target.value,
    content: event.target.value,
  });
});
inputNodeDefaultInput.addEventListener("input", (event) => {
  updateSelectedNode({ inputDefault: event.target.value });
});
inputNodeAllowInput.addEventListener("input", (event) => {
  updateSelectedNode({ inputAllow: event.target.value });
});
inputNodeExcludeInput.addEventListener("input", (event) => {
  updateSelectedNode({ inputExclude: event.target.value });
});
inputNodeLengthInput.addEventListener("input", (event) => {
  updateSelectedNode({ inputLength: event.target.value.trim() });
});
inputNodePixelWidthInput.addEventListener("input", (event) => {
  updateSelectedNode({ inputPixelWidth: event.target.value.trim() });
});
inputNodeScreenInput.addEventListener("input", (event) => {
  updateSelectedNode({ inputScreen: event.target.value.trim() || "input" });
});
inputNodeMaskInput.addEventListener("input", (event) => {
  updateSelectedNode({ inputMask: event.target.value });
});
inputNodeFallbackInput.addEventListener("input", (event) => {
  updateSelectedNode({ inputFallback: event.target.value });
});
inputNodeTrimInput.addEventListener("change", (event) => {
  updateSelectedNode({ inputTrim: event.target.checked });
});
inputNodeCopyPasteInput.addEventListener("change", (event) => {
  updateSelectedNode({ inputCopyPaste: event.target.checked });
});
achievementNodeActionInput.addEventListener("change", (event) => {
  updateSelectedNode({
    achievementAction: event.target.value,
    title: `Achievement ${capitalize(event.target.value)}`,
  });
});
achievementNodeNameInput.addEventListener("change", (event) => {
  const selectedValue = event.target.value;

  if (!selectedValue) {
    updateSelectedNode({
      achievementId: "",
      achievementName: "",
    });
    return;
  }

  if (selectedValue.startsWith("__missing__:")) {
    updateSelectedNode({
      achievementId: "",
      achievementName: selectedValue.slice("__missing__:".length),
    });
    return;
  }

  const achievement = getAchievementById(selectedValue);

  updateSelectedNode({
    achievementId: achievement?.id || "",
    achievementName: achievement ? getAchievementRegisterName(achievement) : "",
  });
});
achievementNodeProgressModeInput.addEventListener("change", (event) => {
  updateSelectedNode({ achievementProgressMode: event.target.value === "add" ? "add" : "set" });
});
achievementNodeProgressValueInput.addEventListener("input", (event) => {
  updateSelectedNode({ achievementProgressValue: event.target.value });
});
menuNodePromptInput.addEventListener("input", (event) => {
  updateSelectedMenuNode({ menuPrompt: event.target.value });
});
menuAddChoiceButton.addEventListener("click", () => {
  updateSelectedMenuNode((node) => {
    const currentChoices = getMenuChoices(node);
    const nextChoices = [...currentChoices, createMenuChoice(currentChoices.length + 1)];

    return {
      ...node,
      menuChoices: nextChoices,
    };
  });
});
menuChoiceListEl.addEventListener("input", (event) => {
  const choiceId = event.target.dataset.menuChoiceId;
  const choiceField = event.target.dataset.menuChoiceField;

  if (!choiceId || !choiceField || !["text", "condition", "conditionValue"].includes(choiceField)) {
    return;
  }

  const graph = getActiveGraph();
  const selectedNode = graph?.nodes.find((node) => node.id === graph.selectedNodeId);

  if (!graph || !selectedNode || selectedNode.type !== "menu") {
    return;
  }

  selectedNode.menuChoices = getMenuChoices(selectedNode).map((choice) => (
    choice.id === choiceId
      ? {
        ...choice,
        [choiceField]: event.target.value,
      }
      : choice
  ));

  renderGraph();
  syncLabelCodePreview();
});
menuChoiceListEl.addEventListener("change", (event) => {
  const choiceId = event.target.dataset.menuChoiceId;
  const choiceField = event.target.dataset.menuChoiceField;

  if (!choiceId || !choiceField) {
    return;
  }

  const graph = getActiveGraph();
  const selectedNode = graph?.nodes.find((node) => node.id === graph.selectedNodeId);

  if (!graph || !selectedNode || selectedNode.type !== "menu") {
    return;
  }

  selectedNode.menuChoices = getMenuChoices(selectedNode).map((choice) => {
    if (choice.id !== choiceId) {
      return choice;
    }

    if (choiceField === "conditionMode") {
      const nextMode = event.target.value;

      return {
        ...choice,
        conditionMode: nextMode,
        condition: nextMode === "expression" ? choice.condition : "",
      };
    }

    if (choiceField === "conditionVariableId") {
      const selectedValue = event.target.value;

      if (!selectedValue) {
        return {
          ...choice,
          conditionVariableId: "",
          conditionVariableTarget: "",
        };
      }

      if (selectedValue.startsWith("__missing__:")) {
        return {
          ...choice,
          conditionVariableId: "",
          conditionVariableTarget: selectedValue.slice("__missing__:".length),
        };
      }

      const variable = getVariableById(selectedValue);

      return {
        ...choice,
        conditionVariableId: variable?.id || "",
        conditionVariableTarget: variable ? getVariableTarget(variable) : "",
      };
    }

    if (choiceField === "conditionOperator") {
      return {
        ...choice,
        conditionOperator: event.target.value,
      };
    }

    if (choiceField === "conditionAchievementId") {
      const selectedValue = event.target.value;

      if (!selectedValue) {
        return {
          ...choice,
          conditionAchievementId: "",
          conditionAchievementName: "",
        };
      }

      if (selectedValue.startsWith("__missing__:")) {
        return {
          ...choice,
          conditionAchievementId: "",
          conditionAchievementName: selectedValue.slice("__missing__:".length),
        };
      }

      const achievement = getAchievementById(selectedValue);

      return {
        ...choice,
        conditionAchievementId: achievement?.id || "",
        conditionAchievementName: achievement ? getAchievementRegisterName(achievement) : "",
      };
    }

    if (choiceField === "conditionAchievementState") {
      return {
        ...choice,
        conditionAchievementState: event.target.value === "not_has" ? "not_has" : "has",
      };
    }

    return {
      ...choice,
      [choiceField]: event.target.value,
    };
  });

  renderMenuChoiceList(selectedNode);
  renderGraph();
  syncLabelCodePreview();
});
menuChoiceListEl.addEventListener("click", (event) => {
  const removeChoiceId = event.target.dataset.removeMenuChoiceId;

  if (!removeChoiceId) {
    return;
  }

  updateSelectedMenuNode((node) => {
    const currentChoices = getMenuChoices(node);

    if (currentChoices.length <= 1) {
      setStatus("Each menu needs at least one choice.");
      return node;
    }

    return {
      ...node,
      menuChoices: currentChoices.filter((choice) => choice.id !== removeChoiceId),
    };
  });
});
conditionAddClauseButton.addEventListener("click", () => {
  updateSelectedConditionNode((node) => {
    const currentClauses = getConditionClauses(node);
    const elseClause = currentClauses.find((clause) => clause.kind === "else") || null;
    const conditionalClauses = currentClauses.filter((clause) => clause.kind !== "else");
    const nextClauses = [
      ...conditionalClauses,
      createConditionClause("elif", conditionalClauses.length + 1),
    ];

    if (elseClause) {
      nextClauses.push(elseClause);
    }

    return {
      ...node,
      conditionClauses: nextClauses,
    };
  });
});
conditionToggleElseButton.addEventListener("click", () => {
  updateSelectedConditionNode((node) => {
    const currentClauses = getConditionClauses(node);
    const hasElseClause = currentClauses.some((clause) => clause.kind === "else");

    return {
      ...node,
      conditionClauses: hasElseClause
        ? currentClauses.filter((clause) => clause.kind !== "else")
        : [...currentClauses, createConditionClause("else", currentClauses.length + 1)],
    };
  });
});
conditionClauseListEl.addEventListener("input", (event) => {
  const clauseId = event.target.dataset.conditionClauseId;
  const clauseField = event.target.dataset.conditionClauseField;

  if (!clauseId || !clauseField || !["condition", "conditionValue"].includes(clauseField)) {
    return;
  }

  const graph = getActiveGraph();
  const selectedNode = graph?.nodes.find((node) => node.id === graph.selectedNodeId);

  if (!graph || !selectedNode || selectedNode.type !== "condition") {
    return;
  }

  selectedNode.conditionClauses = getConditionClauses(selectedNode).map((clause) => (
    clause.id === clauseId
      ? {
        ...clause,
        [clauseField]: event.target.value,
      }
      : clause
  ));

  renderGraph();
  syncLabelCodePreview();
});
conditionClauseListEl.addEventListener("change", (event) => {
  const clauseId = event.target.dataset.conditionClauseId;
  const clauseField = event.target.dataset.conditionClauseField;

  if (!clauseId || !clauseField) {
    return;
  }

  const graph = getActiveGraph();
  const selectedNode = graph?.nodes.find((node) => node.id === graph.selectedNodeId);

  if (!graph || !selectedNode || selectedNode.type !== "condition") {
    return;
  }

  selectedNode.conditionClauses = getConditionClauses(selectedNode).map((clause) => {
    if (clause.id !== clauseId) {
      return clause;
    }

    if (clauseField === "conditionMode") {
      return {
        ...clause,
        conditionMode: event.target.value,
        condition: event.target.value === "expression" ? clause.condition : "",
      };
    }

    if (clauseField === "conditionVariableId") {
      const selectedValue = event.target.value;

      if (!selectedValue) {
        return {
          ...clause,
          conditionVariableId: "",
          conditionVariableTarget: "",
        };
      }

      if (selectedValue.startsWith("__missing__:")) {
        return {
          ...clause,
          conditionVariableId: "",
          conditionVariableTarget: selectedValue.slice("__missing__:".length),
        };
      }

      const variable = getVariableById(selectedValue);

      return {
        ...clause,
        conditionVariableId: variable?.id || "",
        conditionVariableTarget: variable ? getVariableTarget(variable) : "",
      };
    }

    if (clauseField === "conditionOperator") {
      return {
        ...clause,
        conditionOperator: event.target.value,
      };
    }

    if (clauseField === "conditionAchievementId") {
      const selectedValue = event.target.value;

      if (!selectedValue) {
        return {
          ...clause,
          conditionAchievementId: "",
          conditionAchievementName: "",
        };
      }

      if (selectedValue.startsWith("__missing__:")) {
        return {
          ...clause,
          conditionAchievementId: "",
          conditionAchievementName: selectedValue.slice("__missing__:".length),
        };
      }

      const achievement = getAchievementById(selectedValue);

      return {
        ...clause,
        conditionAchievementId: achievement?.id || "",
        conditionAchievementName: achievement ? getAchievementRegisterName(achievement) : "",
      };
    }

    if (clauseField === "conditionAchievementState") {
      return {
        ...clause,
        conditionAchievementState: event.target.value === "not_has" ? "not_has" : "has",
      };
    }

    return {
      ...clause,
      [clauseField]: event.target.value,
    };
  });

  renderConditionClauseList(selectedNode);
  renderGraph();
  syncLabelCodePreview();
});
conditionClauseListEl.addEventListener("click", (event) => {
  const removeClauseId = event.target.dataset.removeConditionClauseId;

  if (!removeClauseId) {
    return;
  }

  updateSelectedConditionNode((node) => ({
    ...node,
    conditionClauses: getConditionClauses(node).filter((clause) => clause.id !== removeClauseId),
  }));
});
flowNodeModeInput.addEventListener("change", (event) => {
  const nextMode = event.target.value;
  const nextTitle = capitalize(nextMode);

  updateSelectedFlowNode({
    flowMode: nextMode,
    title: nextTitle,
  }, {
    pruneOutput: true,
  });
});
flowNodeTargetInput.addEventListener("change", (event) => {
  const selectedValue = event.target.value;

  if (!selectedValue) {
    updateSelectedFlowNode({
      flowTargetGraphId: "",
      flowTargetLabel: "",
      content: "",
    });
    return;
  }

  if (selectedValue.startsWith("__missing__:")) {
    const missingLabel = selectedValue.slice("__missing__:".length);

    updateSelectedFlowNode({
      flowTargetGraphId: "",
      flowTargetLabel: missingLabel,
      content: missingLabel,
    });
    return;
  }

  const targetGraph = getGraphById(selectedValue);

  if (!targetGraph) {
    updateSelectedFlowNode({
      flowTargetGraphId: "",
      flowTargetLabel: "",
      content: "",
    });
    return;
  }

  updateSelectedFlowNode({
    flowTargetGraphId: targetGraph.id,
    flowTargetLabel: targetGraph.label,
    content: targetGraph.label,
  });
});
screenNodeModeInput.addEventListener("change", (event) => {
  const nextMode = event.target.value;

  updateSelectedNode({
    screenMode: nextMode,
    title: `${capitalize(nextMode)} Screen`,
  });
});
screenNodeNameInput.addEventListener("input", (event) => {
  updateSelectedNode({
    screenName: event.target.value,
    content: event.target.value,
  });
});
screenNodeArgumentsInput.addEventListener("input", (event) => {
  updateSelectedNode({ screenArguments: event.target.value });
});
screenNodeResultVariableInput.addEventListener("input", (event) => {
  updateSelectedNode({ screenResultVariable: event.target.value });
});
pythonNodeModeInput.addEventListener("change", (event) => {
  updateSelectedNode({ pythonMode: event.target.value });
});
pythonNodeStoreInput.addEventListener("input", (event) => {
  updateSelectedNode({ pythonStore: event.target.value });
});
pythonNodeHideInput.addEventListener("change", (event) => {
  updateSelectedNode({ pythonHide: event.target.checked });
});
pythonNodeCodeInput.addEventListener("input", (event) => {
  updateSelectedNode({
    pythonCode: event.target.value,
    content: event.target.value,
  });
});

saveDraftButton.addEventListener("click", saveDraftToBridge);

exportButton.addEventListener("click", exportGraph);
takeoverLegacyFilesButton?.addEventListener("click", takeoverLegacyFiles);
addBlockToggleButton.addEventListener("click", () => {
  setContextMenuState(false);
  setLabelContextMenuState(false);
  setImageContextMenuState(false);
  setAudioContextMenuState(false);
  setCharacterContextMenuState(false);
  setAddBlockState(!addBlockOpen);
});
newLabelButton.addEventListener("click", () => {
  const nextIndex = state.graphs.length + 1;
  const nextGraph = createBlankGraph(`label_${nextIndex}`);

  state.graphs.push(nextGraph);
  state.activeGraphId = nextGraph.id;
  setContextMenuState(false);
  setLabelContextMenuState(false);
  setImageContextMenuState(false);
  setAudioContextMenuState(false);
  setCharacterContextMenuState(false);
  setInspectorState(true);
  setAddBlockState(false);
  render();
  saveState(`Created label graph "${nextGraph.label}".`);
});
labelPreviewBackButton.addEventListener("click", () => {
  closeLabelCodePreview();
});
labelReplayEnabledInput?.addEventListener("change", (event) => {
  updateLabelReplaySettings({ enabled: event.target.checked });
});
labelReplayTitleInput?.addEventListener("input", (event) => {
  updateLabelReplaySettings({ title: event.target.value });
});
labelReplayLockedModeInput?.addEventListener("change", (event) => {
  updateLabelReplaySettings({ lockedMode: event.target.value });
});
labelReplayScopeInput?.addEventListener("input", (event) => {
  updateLabelReplaySettings({ scope: event.target.value });
});
labelReplayAutoEndInput?.addEventListener("change", (event) => {
  updateLabelReplaySettings({ autoEnd: event.target.checked });
});
labelAdoptButton?.addEventListener("click", () => {
  adoptExistingLabelForGraph();
});
labelClearExportBindingButton?.addEventListener("click", () => {
  if (!labelCodePreviewGraphId) {
    return;
  }

  clearGraphExportBinding(labelCodePreviewGraphId);
  syncLabelCodePreview();
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
contextDeleteAudioButton.addEventListener("click", () => {
  if (!contextMenuAudioDefinitionId) {
    return;
  }

  deleteAudioDefinition(contextMenuAudioDefinitionId);
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
  render();
  saveState(`Created image definition "${newImage.name}".`);
});
imageDefinitionBackButton.addEventListener("click", () => {
  closeImageDefinitionDetail();
  setStatus("Returned to image list.");
});
imageDefinitionDetailFormEl.addEventListener("input", handleImageDefinitionFieldChange);
imageDefinitionDetailFormEl.addEventListener("change", handleImageDefinitionFieldChange);
[
  imageDefinitionMatrixColorModeInput,
  imageDefinitionMatrixColorTintInput,
  imageDefinitionMatrixColorSaturationInput,
  imageDefinitionMatrixColorSepiaInput,
  imageDefinitionMatrixColorInvertInput,
  imageDefinitionMatrixColorBrightnessInput,
  imageDefinitionMatrixColorHueInput,
  imageDefinitionMatrixColorOpacityInput,
  imageDefinitionMatrixColorizeBlackInput,
  imageDefinitionMatrixColorizeWhiteInput,
].forEach((fieldEl) => {
  fieldEl.addEventListener("input", handleMatrixColorBuilderChange);
  fieldEl.addEventListener("change", handleMatrixColorBuilderChange);
});
imageDefinitionBrowseButton.addEventListener("click", () => {
  if (!getActiveImageDefinition()) {
    setStatus(t("asset.prompt.image_select_first"));
    return;
  }

  imageDefinitionFileInput.value = "";
  imageDefinitionFileInput.click();
});
imageDefinitionFileInput.addEventListener("change", async (event) => {
  const image = getActiveImageDefinition();
  const file = event.target.files?.[0];

  if (!image || !file) {
    return;
  }

  try {
    const suggestedPath = buildImageSourcePathFromSelection(
      file.name,
      image.category,
      image.sourcePath,
    );
    const result = await importSelectedAssetFile(file, suggestedPath, image.sourcePath);
    const statusMessage = formatImportedAssetStatus(t("asset.resource.image"), file.name, result);
    setAssetImportMeta(getAssetImportLevel(result), statusMessage);

    if (result?.canceled) {
      setStatus(statusMessage);
      return;
    }

    updateActiveImageDefinition({ sourcePath: result.path || suggestedPath });
    queueProjectHealthRefresh({ immediate: true });
    setStatus(statusMessage);
  } catch (error) {
    console.error(error);
    setAssetImportMeta("bad", t("asset.error.image", { message: error.message }));
    setStatus(t("asset.error.image", { message: error.message }));
  }
});
imageDefinitionMovieBrowseButton.addEventListener("click", () => {
  if (!getActiveImageDefinition()) {
    setStatus(t("asset.prompt.movie_select_first"));
    return;
  }

  imageDefinitionMovieFileInput.value = "";
  imageDefinitionMovieFileInput.click();
});
imageDefinitionMovieFileInput.addEventListener("change", async (event) => {
  const image = getActiveImageDefinition();
  const file = event.target.files?.[0];

  if (!image || !file) {
    return;
  }

  try {
    const suggestedPath = buildMovieSourcePathFromSelection(
      file.name,
      image.moviePlay,
    );
    const result = await importSelectedAssetFile(file, suggestedPath, image.moviePlay);
    const statusMessage = formatImportedAssetStatus(t("asset.resource.movie"), file.name, result);
    setAssetImportMeta(getAssetImportLevel(result), statusMessage);

    if (result?.canceled) {
      setStatus(statusMessage);
      return;
    }

    updateActiveImageDefinition({ moviePlay: result.path || suggestedPath });
    queueProjectHealthRefresh({ immediate: true });
    setStatus(statusMessage);
  } catch (error) {
    console.error(error);
    setAssetImportMeta("bad", t("asset.error.movie", { message: error.message }));
    setStatus(t("asset.error.movie", { message: error.message }));
  }
});
newLive2DDefinitionButton.addEventListener("click", () => {
  const newDefinition = createBlankLive2DDefinition();

  state.live2d.push(newDefinition);
  activeLive2DDefinitionId = newDefinition.id;
  live2dDefinitionDetailOpen = false;
  render();
  saveState(`Created Live2D "${newDefinition.name}".`);
});
live2dDefinitionBackButton.addEventListener("click", () => {
  closeLive2DDefinitionDetail();
  setStatus("Returned to Live2D list.");
});
live2dDefinitionDetailFormEl.addEventListener("input", handleLive2DDefinitionFieldChange);
live2dDefinitionDetailFormEl.addEventListener("change", handleLive2DDefinitionFieldChange);
live2dDefinitionBrowseButton.addEventListener("click", () => {
  if (!getActiveLive2DDefinition()) {
    setStatus(t("asset.prompt.live2d_select_first"));
    return;
  }

  live2dDefinitionFileInput.value = "";
  live2dDefinitionFileInput.click();
});
live2dDefinitionFileInput.addEventListener("change", async (event) => {
  const definition = getActiveLive2DDefinition();
  const file = event.target.files?.[0];

  if (!definition || !file) {
    return;
  }

  try {
    const suggestedPath = buildLive2DModelPathFromSelection(
      file.name,
      definition.modelPath,
    );
    const result = await importSelectedAssetFile(file, suggestedPath, definition.modelPath);
    const statusMessage = formatImportedAssetStatus(t("asset.resource.live2d"), file.name, result);
    setAssetImportMeta(getAssetImportLevel(result), statusMessage);

    if (result?.canceled) {
      setStatus(statusMessage);
      return;
    }

    updateActiveLive2DDefinition({ modelPath: result.path || suggestedPath });
    queueProjectHealthRefresh({ immediate: true });
    setStatus(statusMessage);
  } catch (error) {
    console.error(error);
    setAssetImportMeta("bad", t("asset.error.live2d", { message: error.message }));
    setStatus(t("asset.error.live2d", { message: error.message }));
  }
});
live2dDefinitionDeleteButton.addEventListener("click", () => {
  const definition = getActiveLive2DDefinition();

  if (!definition) {
    return;
  }

  const confirmed = window.confirm(`Delete Live2D "${definition.name}"? This cannot be undone.`);

  if (!confirmed) {
    setStatus(`Kept Live2D "${definition.name}".`);
    return;
  }

  deleteLive2DDefinition(definition.id);
});
imageDefinitionAddCompositeLayerButton.addEventListener("click", () => {
  const image = getActiveImageDefinition();

  if (!image) {
    return;
  }

  const currentLayers = normalizeCompositeLayers(image.compositeLayers);

  updateActiveImageDefinition({
    compositeLayers: [...currentLayers, createCompositeLayer(currentLayers.length + 1)],
  });
});
imageDefinitionCompositeLayerListEl.addEventListener("input", (event) => {
  const layerId = event.target.dataset.imageCompositeLayerId;
  const field = event.target.dataset.imageCompositeLayerField;
  const image = getActiveImageDefinition();

  if (!layerId || !field || !image) {
    return;
  }

  updateActiveImageDefinition({
    compositeLayers: normalizeCompositeLayers(image.compositeLayers).map((layer) => (
      layer.id === layerId
        ? {
          ...layer,
          [field]: event.target.value,
        }
        : layer
    )),
  });
});
imageDefinitionCompositeLayerListEl.addEventListener("click", (event) => {
  const removeButton = event.target.closest("[data-remove-composite-layer-id]");
  const image = getActiveImageDefinition();

  if (!removeButton || !image) {
    return;
  }

  const removeLayerId = removeButton.dataset.removeCompositeLayerId;

  updateActiveImageDefinition({
    compositeLayers: normalizeCompositeLayers(image.compositeLayers)
      .filter((layer) => layer.id !== removeLayerId),
  });
});
imageDefinitionAddLayeredAlwaysButton.addEventListener("click", () => {
  const image = getActiveImageDefinition();

  if (!image) {
    return;
  }

  const layeredAlwaysLayers = normalizeLayeredAlwaysLayers(image.layeredAlwaysLayers);

  updateActiveImageDefinition({
    definitionType: "layered",
    layeredAlwaysLayers: [...layeredAlwaysLayers, createLayeredAlwaysLayer(layeredAlwaysLayers.length + 1)],
  });
});
imageDefinitionLayeredAlwaysListEl.addEventListener("input", (event) => {
  const layerId = event.target.dataset.layeredAlwaysId;
  const field = event.target.dataset.layeredAlwaysField;

  if (!layerId || !field) {
    return;
  }

  updateActiveLayeredAlwaysLayer(layerId, { [field]: event.target.value });
});
imageDefinitionLayeredAlwaysListEl.addEventListener("click", (event) => {
  const removeButton = event.target.closest("[data-remove-layered-always-id]");
  const image = getActiveImageDefinition();

  if (!removeButton || !image) {
    return;
  }

  const removeLayerId = removeButton.dataset.removeLayeredAlwaysId;

  updateActiveImageDefinition({
    layeredAlwaysLayers: normalizeLayeredAlwaysLayers(image.layeredAlwaysLayers)
      .filter((layer) => layer.id !== removeLayerId),
  });
});
imageDefinitionAddLayeredGroupButton.addEventListener("click", () => {
  const image = getActiveImageDefinition();

  if (!image) {
    return;
  }

  const layeredGroups = normalizeLayeredGroups(image.layeredGroups);
  const nextGroup = createLayeredGroup(layeredGroups.length + 1);

  layeredGroupSectionState[nextGroup.id] = true;

  updateActiveImageDefinition({
    definitionType: "layered",
    layeredGroups: [...layeredGroups, nextGroup],
  });
});
const handleLayeredGroupListInput = (event) => {
  const groupId = event.target.dataset.layeredGroupId;
  const groupField = event.target.dataset.layeredGroupField;
  const attributeId = event.target.dataset.layeredAttributeId;
  const attributeField = event.target.dataset.layeredAttributeField;

  if (groupId && groupField) {
    const nextValue = event.target.type === "checkbox" ? event.target.checked : event.target.value;
    updateActiveLayeredGroup(groupId, { [groupField]: nextValue });
    return;
  }

  if (groupId && attributeId && attributeField) {
    const nextValue = event.target.type === "checkbox" ? event.target.checked : event.target.value;
    updateActiveLayeredAttribute(groupId, attributeId, { [attributeField]: nextValue });
  }
};
imageDefinitionLayeredGroupListEl.addEventListener("input", handleLayeredGroupListInput);
imageDefinitionLayeredGroupListEl.addEventListener("change", handleLayeredGroupListInput);
imageDefinitionLayeredGroupListEl.addEventListener("toggle", (event) => {
  const detailsEl = event.target;

  if (!(detailsEl instanceof HTMLDetailsElement)) {
    return;
  }

  if (detailsEl.dataset.layeredGroupDetailsId) {
    layeredGroupSectionState[detailsEl.dataset.layeredGroupDetailsId] = detailsEl.open;
    return;
  }

  if (detailsEl.dataset.layeredAttributeDetailsId && detailsEl.dataset.layeredAttributeGroupId) {
    layeredAttributeSectionState[
      getLayeredAttributeStateKey(
        detailsEl.dataset.layeredAttributeGroupId,
        detailsEl.dataset.layeredAttributeDetailsId,
      )
    ] = detailsEl.open;
  }
}, true);
imageDefinitionLayeredGroupListEl.addEventListener("click", (event) => {
  const addAttributeButton = event.target.closest("[data-add-layered-attribute-group-id]");
  const removeGroupButton = event.target.closest("[data-remove-layered-group-id]");
  const removeAttributeButton = event.target.closest("[data-remove-layered-attribute-id]");
  const image = getActiveImageDefinition();

  if (!image) {
    return;
  }

  if (addAttributeButton) {
    const groupId = addAttributeButton.dataset.addLayeredAttributeGroupId;
    const targetGroup = normalizeLayeredGroups(image.layeredGroups).find((group) => group.id === groupId);
    const nextAttribute = createLayeredAttribute(
      normalizeLayeredAttributes(targetGroup?.attributes, { allowDefaults: targetGroup?.mode !== "multiple" }).length + 1,
    );

    layeredGroupSectionState[groupId] = true;
    layeredAttributeSectionState[getLayeredAttributeStateKey(groupId, nextAttribute.id)] = true;

    updateActiveImageDefinition({
      layeredGroups: normalizeLayeredGroups(image.layeredGroups).map((group) => (
        group.id === groupId
          ? {
            ...group,
            attributes: [
              ...normalizeLayeredAttributes(group.attributes, { allowDefaults: group.mode !== "multiple" }),
              nextAttribute,
            ],
          }
          : group
      )),
    });
    return;
  }

  if (removeGroupButton) {
    const removeGroupId = removeGroupButton.dataset.removeLayeredGroupId;

    delete layeredGroupSectionState[removeGroupId];
    Object.keys(layeredAttributeSectionState).forEach((stateKey) => {
      if (stateKey.startsWith(`${removeGroupId}:`)) {
        delete layeredAttributeSectionState[stateKey];
      }
    });

    updateActiveImageDefinition({
      layeredGroups: normalizeLayeredGroups(image.layeredGroups)
        .filter((group) => group.id !== removeGroupId),
    });
    return;
  }

  if (removeAttributeButton) {
    const removeGroupId = removeAttributeButton.dataset.removeLayeredAttributeGroupId;
    const removeAttributeId = removeAttributeButton.dataset.removeLayeredAttributeId;

    delete layeredAttributeSectionState[getLayeredAttributeStateKey(removeGroupId, removeAttributeId)];

    updateActiveImageDefinition({
      layeredGroups: normalizeLayeredGroups(image.layeredGroups).map((group) => (
        group.id === removeGroupId
          ? {
            ...group,
            attributes: normalizeLayeredAttributes(group.attributes, { allowDefaults: group.mode !== "multiple" })
              .filter((attribute) => attribute.id !== removeAttributeId),
          }
          : group
      )),
    });
  }
});
imageDefinitionAddAtlStepButton.addEventListener("click", () => {
  const image = getActiveImageDefinition();

  if (!image) {
    return;
  }

  const currentSteps = normalizeImageAtlSteps(image.atlSteps);

  updateActiveImageDefinition({
    atlEnabled: true,
    atlSteps: [...currentSteps, createImageAtlStep(currentSteps.length + 1)],
  });
});
imageDefinitionAtlStepListEl.addEventListener("input", (event) => {
  const stepId = event.target.dataset.imageAtlStepId;
  const field = event.target.dataset.imageAtlStepField;

  if (!stepId || !field) {
    return;
  }

  updateActiveImageAtlStep(stepId, { [field]: event.target.value });
});
imageDefinitionAtlStepListEl.addEventListener("change", (event) => {
  const stepId = event.target.dataset.imageAtlStepId;
  const field = event.target.dataset.imageAtlStepField;

  if (!stepId || !field) {
    return;
  }

  updateActiveImageAtlStep(stepId, { [field]: event.target.value });
});
imageDefinitionAtlStepListEl.addEventListener("click", (event) => {
  const removeButton = event.target.closest("[data-remove-atl-step-id]");
  const image = getActiveImageDefinition();

  if (!removeButton || !image) {
    return;
  }

  const removeStepId = removeButton.dataset.removeAtlStepId;

  updateActiveImageDefinition({
    atlSteps: normalizeImageAtlSteps(image.atlSteps)
      .filter((step) => step.id !== removeStepId),
  });
});
newAudioDefinitionButton.addEventListener("click", () => {
  const newAudioDefinition = createBlankAudioDefinition();

  state.audio.push(newAudioDefinition);
  activeAudioDefinitionId = newAudioDefinition.id;
  audioChannelSectionState[newAudioDefinition.channel] = true;
  audioDefinitionDetailOpen = false;
  setAudioContextMenuState(false);
  render();
  saveState(`Created audio "${newAudioDefinition.name}".`);
});
audioDefinitionBackButton.addEventListener("click", () => {
  closeAudioDefinitionDetail();
  setStatus("Returned to audio list.");
});
audioDefinitionDetailFormEl.addEventListener("input", handleAudioDefinitionFieldChange);
audioDefinitionDetailFormEl.addEventListener("change", handleAudioDefinitionFieldChange);
audioDefinitionBrowseButton.addEventListener("click", () => {
  if (!getActiveAudioDefinition()) {
    setStatus(t("asset.prompt.audio_select_first"));
    return;
  }

  audioDefinitionFileInput.value = "";
  audioDefinitionFileInput.click();
});
audioDefinitionFileInput.addEventListener("change", async (event) => {
  const audioDefinition = getActiveAudioDefinition();
  const file = event.target.files?.[0];

  if (!audioDefinition || !file) {
    return;
  }

  try {
    const suggestedPath = buildAudioSourcePathFromSelection(
      file.name,
      audioDefinition.channel,
      audioDefinition.sourcePath,
    );
    const result = await importSelectedAssetFile(file, suggestedPath, audioDefinition.sourcePath);
    const statusMessage = formatImportedAssetStatus(t("asset.resource.audio"), file.name, result);
    setAssetImportMeta(getAssetImportLevel(result), statusMessage);

    if (result?.canceled) {
      setStatus(statusMessage);
      return;
    }

    updateActiveAudioDefinition({ sourcePath: result.path || suggestedPath });
    queueProjectHealthRefresh({ immediate: true });
    setStatus(statusMessage);
  } catch (error) {
    console.error(error);
    setAssetImportMeta("bad", t("asset.error.audio", { message: error.message }));
    setStatus(t("asset.error.audio", { message: error.message }));
  }
});
newCharacterButton.addEventListener("click", () => {
  const newCharacter = createBlankCharacter();

  state.characters.push(newCharacter);
  activeCharacterId = newCharacter.id;
  characterDetailOpen = false;
  setCharacterContextMenuState(false);
  render();
  saveState(`Created character "${newCharacter.name}".`);
});
characterBackButton.addEventListener("click", () => {
  closeCharacterDetail();
  setStatus("Returned to character list.");
});
newVariableButton.addEventListener("click", () => {
  const newVariable = createBlankVariable();

  state.variables.push(newVariable);
  activeVariableId = newVariable.id;
  variableDetailOpen = true;
  render();
  saveState(`Created variable "${getVariableTarget(newVariable)}".`);
});
variableBackButton.addEventListener("click", () => {
  variableDetailOpen = false;
  renderVariablesPanel();
  setStatus("Returned to variable list.");
});
variableStoreInput.addEventListener("input", (event) => {
  updateActiveVariable({ store: event.target.value });
});
variableNameInput.addEventListener("input", (event) => {
  updateActiveVariable({ name: event.target.value });
});
variableValueInput.addEventListener("input", (event) => {
  updateActiveVariable({ value: event.target.value });
});
variableDeleteButton.addEventListener("click", () => {
  deleteActiveVariable();
});
newAchievementButton.addEventListener("click", () => {
  const newAchievement = createBlankAchievement();

  state.achievements.push(newAchievement);
  activeAchievementId = newAchievement.id;
  achievementDetailOpen = true;
  render();
  saveState(`Created achievement "${getAchievementRegisterName(newAchievement)}".`);
});
achievementBackButton.addEventListener("click", () => {
  achievementDetailOpen = false;
  renderAchievementsPanel();
  setStatus("Returned to achievement list.");
});
achievementNameInput.addEventListener("input", (event) => {
  updateActiveAchievement({ name: event.target.value });
});
achievementTitleInput.addEventListener("input", (event) => {
  updateActiveAchievement({ title: event.target.value });
});
achievementDescriptionInput.addEventListener("input", (event) => {
  updateActiveAchievement({ description: event.target.value });
});
achievementNotesInput.addEventListener("input", (event) => {
  updateActiveAchievement({ notes: event.target.value });
});
achievementSteamNameInput.addEventListener("input", (event) => {
  updateActiveAchievement({ steamName: event.target.value });
});
achievementProgressEnabledInput.addEventListener("change", (event) => {
  updateActiveAchievement({ progressEnabled: event.target.checked });
});
achievementStatMaxInput.addEventListener("input", (event) => {
  updateActiveAchievement({ statMax: event.target.value });
});
achievementStatModuloInput.addEventListener("input", (event) => {
  updateActiveAchievement({ statModulo: event.target.value });
});
achievementDeleteButton.addEventListener("click", () => {
  deleteActiveAchievement();
});
newDefinitionButton.addEventListener("click", () => {
  const newDefinition = createBlankDefinition();

  state.definitions.push(newDefinition);
  activeDefinitionId = newDefinition.id;
  definitionDetailOpen = true;
  render();
  saveState(`Created definition "${getDefinitionLabel(newDefinition)}".`);
});
definitionBackButton.addEventListener("click", () => {
  definitionDetailOpen = false;
  renderDefinitionsPanel();
  setStatus("Returned to definition list.");
});
definitionModeInput.addEventListener("change", (event) => {
  updateActiveDefinition({ mode: event.target.value });
});
definitionTargetInput.addEventListener("input", (event) => {
  updateActiveDefinition({ target: event.target.value });
});
definitionOperatorInput.addEventListener("change", (event) => {
  updateActiveDefinition({ operator: event.target.value });
});
definitionPriorityInput.addEventListener("input", (event) => {
  updateActiveDefinition({ priority: event.target.value });
});
definitionValueInput.addEventListener("input", (event) => {
  updateActiveDefinition({ value: event.target.value });
});
definitionInitPriorityInput.addEventListener("input", (event) => {
  updateActiveDefinition({ initPriority: event.target.value });
});
definitionInitHideInput.addEventListener("change", (event) => {
  updateActiveDefinition({ initHide: event.target.checked });
});
definitionInitStoreInput.addEventListener("input", (event) => {
  updateActiveDefinition({ initStore: event.target.value });
});
definitionCodeInput.addEventListener("input", (event) => {
  updateActiveDefinition({ code: event.target.value });
});
definitionDeleteButton.addEventListener("click", () => {
  deleteActiveDefinition();
});
projectVoiceModeInput.addEventListener("change", (event) => {
  updateProjectMeta({ voiceMode: event.target.value });
});
projectAutoVoiceTemplateInput.addEventListener("input", (event) => {
  updateProjectMeta({ autoVoiceTemplate: event.target.value });
});
projectVoiceMultilingualInput.addEventListener("change", (event) => {
  updateProjectMeta({ multilingualVoices: event.target.checked });
});
projectDefaultDialogueVoiceInput.addEventListener("change", (event) => {
  updateProjectMeta({ defaultDialogueVoiceEnabled: event.target.checked });
});
projectSideImageTagInput?.addEventListener("input", (event) => {
  updateProjectMeta({ sideImageTag: event.target.value });
});
projectSideImageOnlyNotShowingInput?.addEventListener("change", (event) => {
  updateProjectMeta({ sideImageOnlyNotShowing: event.target.checked });
});
projectSideImagePrefixTagInput?.addEventListener("input", (event) => {
  updateProjectMeta({ sideImagePrefixTag: event.target.value });
});
projectSideImageNullInput?.addEventListener("input", (event) => {
  updateProjectMeta({ sideImageNull: event.target.value });
});
projectSideImageSameTransformInput?.addEventListener("input", (event) => {
  updateProjectMeta({ sideImageSameTransform: event.target.value });
});
projectSideImageChangeTransformInput?.addEventListener("input", (event) => {
  updateProjectMeta({ sideImageChangeTransform: event.target.value });
});
projectHasAutosaveInput?.addEventListener("change", (event) => {
  updateProjectMeta({ hasAutosave: event.target.checked });
});
projectAutosaveFrequencyInput?.addEventListener("input", (event) => {
  updateProjectMeta({ autosaveFrequency: event.target.value });
});
projectHasQuicksaveInput?.addEventListener("change", (event) => {
  updateProjectMeta({ hasQuicksave: event.target.checked });
});
projectRollbackEnabledInput?.addEventListener("change", (event) => {
  updateProjectMeta({ rollbackEnabled: event.target.checked });
});
projectRollbackLengthInput?.addEventListener("input", (event) => {
  updateProjectMeta({ rollbackLength: event.target.value });
});
projectHardRollbackLimitInput?.addEventListener("input", (event) => {
  updateProjectMeta({ hardRollbackLimit: event.target.value });
});
projectFixRollbackWithoutChoiceInput?.addEventListener("change", (event) => {
  updateProjectMeta({ fixRollbackWithoutChoice: event.target.checked });
});
projectKeymapAddCustomEventButton?.addEventListener("click", () => {
  const nextEventId = `${projectKeymapCustomEventNameInput?.value || ""}`.trim();

  if (!nextEventId) {
    setStatus(t("project-keymap-status-enter-event-name"));
    return;
  }

  projectKeymapCategoryState.custom = true;

  if (ensureProjectKeymapCustomEvent(nextEventId)) {
    projectKeymapCustomEventNameInput.value = "";
    setStatus(t("project-keymap-status-added-custom-event", { event: nextEventId }));
    return;
  }

  projectKeymapCustomEventNameInput.value = "";
  setStatus(t("project-keymap-status-event-exists", { event: nextEventId }));
});
projectKeymapCustomEventNameInput?.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") {
    return;
  }

  event.preventDefault();
  projectKeymapAddCustomEventButton?.click();
});
projectKeymapCategoryListEl?.addEventListener("toggle", (event) => {
  const categoryEl = event.target.closest("[data-keymap-category]");

  if (!categoryEl) {
    return;
  }

  projectKeymapCategoryState[categoryEl.dataset.keymapCategory] = categoryEl.open;
});
projectKeymapCategoryListEl?.addEventListener("click", (event) => {
  const addButton = event.target.closest("[data-keymap-add-event]");

  if (addButton) {
    const eventId = addButton.dataset.keymapAddEvent;
    const inputEl = projectKeymapCategoryListEl.querySelector(`[data-keymap-add-input="${CSS.escape(eventId)}"]`);

    if (!inputEl) {
      return;
    }

    if (addProjectKeymapBinding(eventId, inputEl.value)) {
      setStatus(t("project-keymap-status-added-binding", { binding: inputEl.value.trim(), event: eventId }));
      return;
    }

    setStatus(t("project-keymap-status-duplicate-or-empty", { event: eventId }));
    return;
  }

  const removeButton = event.target.closest("[data-keymap-remove-event]");

  if (removeButton) {
    const eventId = removeButton.dataset.keymapRemoveEvent;
    const binding = removeButton.dataset.keymapBinding;

    if (removeProjectKeymapBinding(eventId, binding)) {
      setStatus(t("project-keymap-status-removed-binding", { binding, event: eventId }));
    }

    return;
  }

  const resetButton = event.target.closest("[data-keymap-reset-event]");

  if (resetButton && !resetButton.disabled) {
    const eventId = resetButton.dataset.keymapResetEvent;

    resetProjectKeymapEvent(eventId);
    setStatus(t("project-keymap-status-reset-event", { event: eventId }));
  }
});
projectKeymapCategoryListEl?.addEventListener("keydown", (event) => {
  const inputEl = event.target.closest("[data-keymap-add-input]");

  if (!inputEl || event.key !== "Enter") {
    return;
  }

  event.preventDefault();

  if (addProjectKeymapBinding(inputEl.dataset.keymapAddInput, inputEl.value)) {
    setStatus(t("project-keymap-status-added-binding", {
      binding: inputEl.value.trim(),
      event: inputEl.dataset.keymapAddInput,
    }));
    return;
  }

  setStatus(t("project-keymap-status-duplicate-or-empty", { event: inputEl.dataset.keymapAddInput }));
});
projectKeymapCategoryListEl?.addEventListener("change", (event) => {
  const rawInput = event.target.closest("[data-keymap-raw-input]");

  if (!rawInput) {
    return;
  }

  setProjectKeymapRawExpression(rawInput.dataset.keymapRawInput, rawInput.value);
  setStatus(
    rawInput.value.trim()
      ? t("project-keymap-status-raw-applied", { event: rawInput.dataset.keymapRawInput })
      : t("project-keymap-status-raw-cleared", { event: rawInput.dataset.keymapRawInput }),
  );
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
audioDeleteNodeButton.addEventListener("click", () => {
  const graph = getActiveGraph();

  if (!graph?.selectedNodeId) {
    return;
  }

  deleteNode(graph.selectedNodeId);
});
dialogueDeleteNodeButton.addEventListener("click", () => {
  const graph = getActiveGraph();

  if (!graph?.selectedNodeId) {
    return;
  }

  deleteNode(graph.selectedNodeId);
});
inputDeleteNodeButton.addEventListener("click", () => {
  const graph = getActiveGraph();

  if (!graph?.selectedNodeId) {
    return;
  }

  deleteNode(graph.selectedNodeId);
});
achievementDeleteNodeButton.addEventListener("click", () => {
  const graph = getActiveGraph();

  if (!graph?.selectedNodeId) {
    return;
  }

  deleteNode(graph.selectedNodeId);
});
menuDeleteNodeButton.addEventListener("click", () => {
  const graph = getActiveGraph();

  if (!graph?.selectedNodeId) {
    return;
  }

  deleteNode(graph.selectedNodeId);
});
conditionDeleteNodeButton.addEventListener("click", () => {
  const graph = getActiveGraph();

  if (!graph?.selectedNodeId) {
    return;
  }

  deleteNode(graph.selectedNodeId);
});
flowDeleteNodeButton.addEventListener("click", () => {
  const graph = getActiveGraph();

  if (!graph?.selectedNodeId) {
    return;
  }

  deleteNode(graph.selectedNodeId);
});
screenDeleteNodeButton.addEventListener("click", () => {
  const graph = getActiveGraph();

  if (!graph?.selectedNodeId) {
    return;
  }

  deleteNode(graph.selectedNodeId);
});
pythonDeleteNodeButton.addEventListener("click", () => {
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
openGuiEditorButton?.addEventListener("click", () => {
  const nextParams = new URLSearchParams();
  const rememberedGuiSectionId = launchGuiSectionId || getStoredGuiSectionId() || "stylesSection";

  if (projectPath) {
    nextParams.set("project", projectPath);
  }

  if (bridgeUrl && bridgeToken) {
    nextParams.set("bridge", bridgeUrl);
    nextParams.set("token", bridgeToken);
  }

  nextParams.set("section", activeSidebarSectionId);
  nextParams.set("guiSection", rememberedGuiSectionId);

  const query = nextParams.toString() ? `?${nextParams.toString()}` : "";
  window.location.href = `./gui_editor.html${query}`;
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

  if (audioContextMenuEl.contains(event.target)) {
    return;
  }

  if (characterContextMenuEl.contains(event.target)) {
    return;
  }

  setContextMenuState(false);
  setLabelContextMenuState(false);
  setImageContextMenuState(false);
  setAudioContextMenuState(false);
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
    const nodeAction = button.dataset.nodeAction || "";

    if (!graph) {
      return;
    }

    if (nodeType === "start") {
      setStatus("Each label graph already has one fixed Start block.");
      return;
    }

    const newNode = createNodeForType(nodeType, graph, { action: nodeAction });

    graph.nodes.push(newNode);
    graph.selectedNodeId = newNode.id;
    render();
    setInspectorState(true);
    setAddBlockState(false);
    setStatus(`Added ${getNodeDisplay(newNode).title} to "${graph.label}".`);
  });
});

function createNodeForType(nodeType, graph, options = {}) {
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
      imageDefinitionId: "",
      imageName: "",
      imageLayer: "",
      imageAt: "",
      imageAlias: "",
      imageBehind: "",
      imageZorder: "",
      imageLive2DMotion: "",
      imageLive2DExpression: "",
      imageLive2DNonexclusive: [],
      imageLive2DRemovals: [],
      imageLive2DStill: false,
      imageLive2DAdditionalAttributes: "",
      imageLayeredSelections: {},
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

  if (nodeType === "audio") {
    const action = ["play", "queue", "stop"].includes(options.action)
      ? options.action
      : "play";
    const defaultChannel = action === "stop" ? "music" : "music";

    return {
      ...baseNode,
      title: `Audio ${capitalize(action)}`,
      content: "",
      audioAction: action,
      audioDefinitionId: "",
      audioName: "",
      audioChannel: defaultChannel,
      audioLoop: false,
      audioFadeIn: "",
      audioFadeOut: "",
      audioVolume: "",
      audioIfChanged: false,
    };
  }

  if (nodeType === "dialogue") {
    const defaultDialogueText = "New dialogue line.";
    const defaultDialogueVoiceEnabled = getProjectDefaultDialogueVoiceEnabled();

    return {
      ...baseNode,
      title: "Dialogue",
      content: defaultDialogueText,
      dialogueCharacterId: "",
      dialogueSpeaker: "Narrator",
      dialogueVoiceEnabled: defaultDialogueVoiceEnabled,
      dialogueLines: defaultDialogueVoiceEnabled
        ? [
          {
            ...createDialogueVoiceLine(1),
            text: defaultDialogueText,
          },
        ]
        : [],
    };
  }

  if (nodeType === "input") {
    return {
      ...baseNode,
      title: "Input",
      content: "Enter a value.",
      inputVariable: "player_name",
      inputPrompt: "Enter a value.",
      inputDefault: "",
      inputAllow: "",
      inputExclude: "",
      inputLength: "32",
      inputPixelWidth: "",
      inputScreen: "input",
      inputMask: "",
      inputFallback: "",
      inputTrim: true,
      inputCopyPaste: true,
    };
  }

  if (nodeType === "achievement") {
    return {
      ...baseNode,
      title: "Achievement Grant",
      content: "",
      achievementAction: "grant",
      achievementId: "",
      achievementName: "",
      achievementProgressMode: "set",
      achievementProgressValue: "1",
    };
  }

  if (nodeType === "menu") {
    return {
      ...baseNode,
      title: "Choice",
      content: "",
      menuPrompt: "",
      menuChoices: [createMenuChoice(1)],
    };
  }

  if (nodeType === "condition") {
    return {
      ...baseNode,
      title: "Condition",
      content: "",
      conditionClauses: [createConditionClause("if", 1)],
    };
  }

  if (nodeType === "flow") {
    return {
      ...baseNode,
      title: "Jump",
      content: "",
      flowMode: "jump",
      flowTargetGraphId: "",
      flowTargetLabel: "",
    };
  }

  if (nodeType === "screen") {
    return {
      ...baseNode,
      title: "Show Screen",
      content: "",
      screenMode: "show",
      screenName: "",
      screenArguments: "",
      screenResultVariable: "",
    };
  }

  if (nodeType === "python") {
    return {
      ...baseNode,
      title: "Python",
      content: "",
      pythonMode: "line",
      pythonCode: "",
      pythonStore: "",
      pythonHide: false,
    };
  }

  return baseNode;
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

if (launchSidebarSectionId) {
  activeSidebarSectionId = launchSidebarSectionId;
}

if (launchGuiSectionId) {
  storeGuiSectionId(launchGuiSectionId);
}

if (returnedFromGuiEditor) {
  const lastGuiSectionId = launchGuiSectionId || getStoredGuiSectionId() || "stylesSection";
  pendingLaunchStatusText = t("status.returned_from_gui", {
    section: getGuiSectionLabel(lastGuiSectionId),
  });
}

if (localeSelect) {
  syncLocaleControl();
  localeSelect.addEventListener("change", (event) => {
    i18n.setLocale(event.target.value);
  });
}

window.addEventListener("visual-editor-locale-changed", () => {
  render();
  setSidebarToggleLabel();
});

applyCurrentLocale();
render();
setSidebarSection(activeSidebarSectionId);
setSidebarState(true);
setInspectorState(Boolean(getActiveGraph()?.selectedNodeId));
setAddBlockState(false);
renderProjectHealth();
setStatus(pendingLaunchStatusText || t("status.visual_editor_ready"));
hydrateStateFromBridge();
