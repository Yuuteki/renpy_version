(function () {
  const STORAGE_KEY = "renpy-visual-editor:locale";
  const SUPPORTED_LOCALES = ["en", "zh-CN"];

  const dictionaries = {
    en: {
      "html.index.title": "Ren'Py Visual Editor",
      "html.gui.title": "Ren'Py GUI Editor",
      "ui.language.label": "Language",
      "ui.language.english": "English",
      "ui.language.zhCN": "Simplified Chinese",
      "common.not_written_yet": "Not written yet",
      "health.paths.more": " +{count} more",

      "index.visual_project.heading": "Visual Project",
      "index.visual_project.desc": "Snapshot of the current visual workspace.",
      "index.project_path.label": "Project Path",
      "index.project_path.missing": "No project path provided.",
      "index.project_path.launcher_missing": "No project path was provided by the launcher.",
      "index.expected_files.label": "Expected Files",
      "index.project_files.expected": "Expected files: <project>/visual_editor/project.json | <project>/game/generated_visual_editor.rpy",
      "index.button.save_draft": "Save Draft",
      "index.button.export": "Export to .rpy",
      "index.button.takeover": "Take Over Legacy GUI Files",
      "index.takeover.default_html": "This will back up and remove <code>game/options.rpy</code>, <code>game/gui.rpy</code>, <code>game/screens.rpy</code>, and matching <code>.rpyc</code> files, then refresh <code>generated_visual_editor.rpy</code>.",
      "index.takeover.note.open_from_launcher": "Open this editor from the Ren'Py launcher before taking over legacy GUI files.",
      "index.takeover.note.bridge_required": "Open this editor from the Ren'Py launcher to back up and remove legacy GUI files.",
      "index.takeover.note.active_with_backup_html": "Legacy GUI takeover is active. Original <code>options/gui/screens</code> files were backed up under <code>{backupRoot}</code>.",
      "index.takeover.note.active_default_html": "Legacy GUI takeover is active. Original <code>options/gui/screens</code> files now belong to <code>visual_editor/project.json</code> and <code>generated_visual_editor.rpy</code>.",
      "index.health.label": "Project Health",
      "index.health.summary_default": "Checking editor sync, legacy file cleanup, and core asset coverage.",
      "index.health.waiting": "Waiting for project scan",
      "index.settings.heading": "Settings",
      "index.settings.desc": "Project-level settings, GUI editing entry, and current editor status.",
      "index.gui_editor.label": "GUI Editor",
      "index.gui_editor.note": "Open the GUI Editor to continue styles, screens, config, cursor, shader, and diagnostics work with the same project state.",
      "index.gui_editor.open": "Open GUI Editor",

      "gui.eyebrow": "Ren'Py Visual Editor",
      "gui.heading": "GUI Editor",
      "gui.project_path.missing": "No project path provided.",
      "gui.status.ready": "GUI editor ready.",
      "gui.button.back": "Back to Visual Editor",
      "gui.button.save": "Save GUI Draft",
      "gui.nav.styles": "Styles",
      "gui.nav.screens": "Screens",
      "gui.nav.extras": "Extras",
      "gui.nav.config": "Config",
      "gui.nav.python": "Python UI",
      "gui.nav.cursors": "Cursors",
      "gui.nav.shaders": "Shaders",
      "gui.nav.diagnostics": "Diagnostics",
      "gui.nav.note": "This editor now covers styles, screen structure, screen actions and values, GUI config, cursor systems, text shaders, Python UI helper templates, replay menus, music rooms, galleries, preview, and diagnostics.",
      "gui.diagnostics.heading": "Diagnostics",
      "gui.output.heading": "Suggested Output",
      "gui.output.desc": "Collected snippets that may need attention based on the current diagnostics.",

      "section.main.project": "Project",
      "section.main.label_graphs": "Label Graphs",
      "section.main.images": "Images",
      "section.main.live2d": "Live2D",
      "section.main.audio": "Audio",
      "section.main.characters": "Characters",
      "section.main.variables": "Variables",
      "section.main.achievements": "Achievements",
      "section.main.definitions": "Definitions",
      "section.main.settings": "Settings",
      "sidebar.shortcuts": "Sidebar shortcuts",
      "sidebar.collapse": "Collapse sidebar",
      "sidebar.expand": "Expand sidebar",
      "sidebar.open_project": "Open project overview",
      "sidebar.open_label_graphs": "Open label graphs",
      "sidebar.open_images": "Open image definitions",
      "sidebar.open_live2d": "Open Live2D definitions",
      "sidebar.open_audio": "Open audio definitions",
      "sidebar.open_characters": "Open character definitions",
      "sidebar.open_variables": "Open variables",
      "sidebar.open_achievements": "Open achievements",
      "sidebar.open_definitions": "Open definitions",
      "sidebar.open_settings": "Open settings",

      "health.bridge.connected": "Bridge Connected",
      "health.bridge.offline": "Bridge Offline",
      "health.pill.project_json": "Project JSON: {text}",
      "health.pill.export": "Export: {text}",
      "health.pill.assets": "Assets: {text}",
      "health.summary.ready": "Editor status is stable and ready for save / export.",
      "health.summary.scan_running": "Running the first launcher-backed health scan for this project.",
      "health.summary.scan_waiting": "Waiting for the first launcher-backed health scan.",
      "health.summary.bridge_offline": "Open from the Ren'Py launcher to verify on-disk files and project cleanup status.",
      "health.summary.assets_missing": "Fix {count} missing asset reference(s) before your next build.",
      "health.summary.legacy_remaining": "A few legacy files are still present, so export behavior may still be shared.",
      "health.summary.error": "Health scan needs attention: {message}",
      "health.timestamp.waiting": "Waiting for project scan",
      "health.timestamp.refreshing": "Refreshing...",
      "health.timestamp.updated": "Updated {time}",
      "health.item.legacy_script.title": "Legacy Script Files",
      "health.item.legacy_script.ok": "game/script.rpy and game/script.rpyc are already out of the way.",
      "health.item.legacy_script.remaining": "Still present: {paths}",
      "health.item.legacy_gui.title": "Legacy GUI Files",
      "health.item.legacy_gui.ok": "options/gui/screens legacy files are no longer shadowing generated GUI output.",
      "health.item.legacy_gui.remaining": "Still present: {paths}",
      "health.item.confirm.title": "Confirm Flow",
      "health.item.confirm.project": "A project-managed confirm / yesno_prompt screen is available.",
      "health.item.confirm.fallback": "The generated fallback confirm screen will be injected during export.",
      "health.item.assets.title": "Core Asset Paths",
      "health.item.assets.ok": "Tracked image, movie, Live2D, and audio file paths all resolve inside the project.",
      "health.item.assets.missing": "{count} missing asset reference(s): {paths}",
      "health.gui.last_section": "Last GUI Section",
      "health.gui.note.connected": "Return path is linked. Next GUI launch will reopen {section}. Confirm flow is currently using the {mode}.",
      "health.gui.note.disconnected": "Open from the Ren'Py launcher to share health checks, bridge sync, and section memory with the GUI Editor.",
      "health.confirm.mode.project": "project screen set",
      "health.confirm.mode.fallback": "generated fallback confirm screen",

      "sync.project_json.initial_wait": "Waiting for the first project.json sync.",
      "sync.project_json.initial_wait_gui": "Waiting for the first GUI sync.",
      "sync.bridge.disconnected": "Launcher bridge is disconnected.",
      "sync.export.initial_wait": "No .rpy export has been written in this session yet.",
      "sync.assets.initial_wait": "Asset imports will report matches, overwrites, and project write results here.",
      "sync.project_json.queued": "Queued a project.json sync.",
      "sync.project_json.good": "project.json is synced.",
      "sync.project_json.failed": "Project JSON sync failed: {message}",
      "sync.project_json.loaded": "Loaded visual_editor/project.json.",
      "sync.project_json.imported": "Imported legacy files and wrote project.json.",
      "sync.project_json.created": "Created visual_editor/project.json.",
      "sync.project_json.local_only": "Saved locally without the launcher bridge.",
      "sync.project_json.kept_scripts": "project.json is synced, but legacy script files were kept.",
      "sync.project_json.script_cleanup": "project.json and script cleanup are synced.",
      "sync.project_json.gui_takeover": "project.json is synced after GUI takeover.",
      "sync.export.local_only": "Generated locally without writing project files.",
      "sync.export.canceled": "Export was canceled before writing generated_visual_editor.rpy.",
      "sync.export.good": "generated_visual_editor.rpy is up to date.",
      "sync.export.gui_takeover": "generated_visual_editor.rpy was refreshed during GUI takeover.",
      "sync.export.failed": "Export failed: {message}",
      "sync.gui.manual_save": "Queued a manual GUI save.",
      "sync.gui.good": "GUI project.json is synced.",

      "asset.status.match": "Matched existing project {resource} \"{path}\" for \"{file}\".",
      "asset.status.imported": "Imported \"{file}\" to project {resource} \"{path}\".",
      "asset.status.updated": "Updated project {resource} \"{path}\" from \"{file}\".",
      "asset.status.local_only": "Selected \"{file}\" for {resource}. Open from the Ren'Py launcher to import the file into the project automatically.",
      "asset.status.set": "Set {resource} to \"{path}\".",
      "asset.status.selected": "Selected \"{file}\" for {resource}.",
      "asset.status.keep_existing": "Kept the existing project {resource} \"{path}\".",
      "asset.status.keep_current": "Kept the current {resource}.",
      "asset.status.keep_multiple": "Kept the existing {resource} because \"{file}\" matched multiple project files.",
      "asset.resource.image": "image source",
      "asset.resource.movie": "movie playback",
      "asset.resource.live2d": "Live2D model path",
      "asset.resource.audio": "audio source",
      "asset.conflict.multiple": "Multiple existing project files already use \"{file}\".\n\n{matches}\n\nPress OK to import the newly selected file into \"{path}\" instead.\nPress Cancel to keep the current resource path unchanged.",
      "asset.conflict.overwrite": "\"{path}\" already exists inside the project.\n\nPress OK to overwrite it with the newly selected file.\nPress Cancel to keep the existing project file.",
      "asset.prompt.image_select_first": "Create or select an image definition before browsing for a file.",
      "asset.prompt.movie_select_first": "Create or select an image definition before browsing for a movie file.",
      "asset.prompt.live2d_select_first": "Create or select a Live2D definition before browsing for a model file.",
      "asset.prompt.audio_select_first": "Create or select an audio definition before browsing for a file.",
      "asset.error.image": "Image import failed: {message}",
      "asset.error.movie": "Movie import failed: {message}",
      "asset.error.live2d": "Live2D import failed: {message}",
      "asset.error.audio": "Audio import failed: {message}",

      "status.visual_editor_ready": "Visual editor scaffold ready. Drag empty space to move the canvas, and use the mouse wheel to zoom.",
      "status.returned_from_gui": "Returned from GUI Editor. {section} was the last active GUI section.",
      "status.loaded_project_state": "Loaded project state from visual_editor/project.json.",
      "status.imported_project_state": "Imported {sources} into visual_editor/project.json{suffix}",
      "status.created_project_state": "Created visual_editor/project.json from the current editor state.",
      "status.bridge_unavailable": "Launcher bridge unavailable: {message}",
      "status.script_takeover_confirm": "Visual Editor is ready to take over game/script.rpy and game/script.rpyc for this project.\n\nThe first save or export will remove those files to avoid duplicate label conflicts with generated_visual_editor.rpy.\n\nYou only need to confirm this once per project.",
      "status.saved_local_draft": "Saved graph draft to local browser storage.",
      "status.synced_kept_scripts": "Synced visual_editor/project.json. Kept game/script.rpy and game/script.rpyc.",
      "status.synced_removed": "Synced visual_editor/project.json and removed {paths}.",
      "status.synced_simple": "Synced visual_editor/project.json.",
      "status.export_bridge_required": "Generated .rpy text, but launcher bridge is not connected. Open from Ren'Py Launcher to write project files.",
      "status.export_canceled_kept_scripts": "Export canceled. Kept game/script.rpy and game/script.rpyc.",
      "status.export_success_removed": "Removed {paths}, synced visual_editor/project.json, and exported generated_visual_editor.rpy.",
      "status.export_success_simple": "Synced visual_editor/project.json and exported generated_visual_editor.rpy.",
      "status.takeover_bridge_required": "Legacy takeover requires the launcher bridge. Open this editor from the Ren'Py Launcher.",
      "status.takeover_confirm": "Take over game/options.rpy, game/gui.rpy, and game/screens.rpy?\n\nThis will back up and remove those .rpy files plus matching .rpyc files, then refresh generated_visual_editor.rpy from the current editor state.",
      "status.takeover_kept_existing": "Kept the existing legacy GUI files.",
      "status.takeover_already_active": "Legacy GUI takeover was already active. Refreshed project.json and generated_visual_editor.rpy.",
      "status.takeover_deleted_none": "No legacy GUI files were present to remove.",
      "status.takeover_success_with_backup": "Backed up and removed {paths}. Backup root: {backupRoot}.",
      "status.takeover_success": "Backed up and removed {paths}.",
      "status.takeover_failed": "Legacy takeover failed: {message}",

      "gui.topbar.confirm.project": "Project confirm screen",
      "gui.topbar.confirm.fallback": "Fallback confirm screen",
      "gui.topbar.assets.ok": "Core asset paths resolved",
      "gui.topbar.assets.missing": "{count} missing asset path(s)",
      "gui.topbar.return_target": "Return target: {section}",
      "gui.topbar.refreshing": "Refreshing health...",
      "gui.topbar.checked": "Health checked {time}",
      "gui.topbar.waiting": "Waiting for health scan",
      "gui.topbar.warning": "Health warning: {message}",
      "gui.status.loaded": "Loaded GUI state from visual_editor/project.json.",
      "gui.status.imported": "Imported {sources} into visual_editor/project.json{suffix}",
      "gui.status.created": "Created visual_editor/project.json from the current GUI state.",
      "gui.status.bridge_unavailable": "Launcher bridge unavailable: {message}",
      "gui.status.section_opened": "Opened {section} section.",
      "gui.status.saved": "Saved GUI draft and queued project.json sync.",
      "gui.status.saved_local": "Saved GUI draft.",

      "Current Label": "Current Label",
      "Total Label Graphs": "Total Label Graphs",
      "Replay Labels": "Replay Labels",
      "Blocks In Current Graph": "Blocks In Current Graph",
      "Audio Definitions": "Audio Definitions",
      "Side Image Definitions": "Side Image Definitions",
      "Live2D Definitions": "Live2D Definitions",
      "Default Variables": "Default Variables",
      "Achievements": "Achievements",
      "Definitions": "Definitions",
      "Voice Strategy": "Voice Strategy",
      "Save Features": "Save Features",
      "Rollback": "Rollback",
      "Linked Image Tags": "Linked Image Tags",
      "Voiced Dialogues": "Voiced Dialogues",
      "Canvas Zoom": "Canvas Zoom",
      "image-pos": "Position",
      "image-anchor": "Anchor",
      "image-align": "Align",
      "image-alignaround": "Align Around",
    },
    "zh-CN": {
      "html.index.title": "Ren'Py 可视化编辑器",
      "html.gui.title": "Ren'Py GUI 编辑器",
      "ui.language.label": "语言",
      "ui.language.english": "English",
      "ui.language.zhCN": "简体中文",
      "common.not_written_yet": "尚未写入",
      "health.paths.more": "，另有 {count} 项",

      "index.visual_project.heading": "可视化项目",
      "index.visual_project.desc": "当前可视化工作区的概览。",
      "index.project_path.label": "项目路径",
      "index.project_path.missing": "未提供项目路径。",
      "index.project_path.launcher_missing": "Launcher 没有提供项目路径。",
      "index.expected_files.label": "预期文件",
      "index.project_files.expected": "预期文件：<project>/visual_editor/project.json | <project>/game/generated_visual_editor.rpy",
      "index.button.save_draft": "保存草稿",
      "index.button.export": "导出为 .rpy",
      "index.button.takeover": "接管旧版 GUI 文件",
      "index.takeover.default_html": "这会先备份并删除 <code>game/options.rpy</code>、<code>game/gui.rpy</code>、<code>game/screens.rpy</code> 以及对应的 <code>.rpyc</code> 文件，然后刷新 <code>generated_visual_editor.rpy</code>。",
      "index.takeover.note.open_from_launcher": "请先从 Ren'Py Launcher 打开此编辑器，再执行旧版 GUI 文件接管。",
      "index.takeover.note.bridge_required": "请从 Ren'Py Launcher 打开此编辑器，才能备份并删除旧版 GUI 文件。",
      "index.takeover.note.active_with_backup_html": "旧版 GUI 接管已启用。原始的 <code>options/gui/screens</code> 文件已备份到 <code>{backupRoot}</code>。",
      "index.takeover.note.active_default_html": "旧版 GUI 接管已启用。原始 <code>options/gui/screens</code> 文件现在由 <code>visual_editor/project.json</code> 和 <code>generated_visual_editor.rpy</code> 接管。",
      "index.health.label": "项目健康状态",
      "index.health.summary_default": "正在检查编辑器同步、旧文件清理情况和核心资源覆盖。",
      "index.health.waiting": "等待项目扫描",
      "index.settings.heading": "设置",
      "index.settings.desc": "项目级设置、GUI 编辑入口，以及当前编辑器状态。",
      "index.gui_editor.label": "GUI 编辑器",
      "index.gui_editor.note": "打开 GUI 编辑器后，可以继续处理样式、screens、config、鼠标、shader 和诊断，并共享同一份项目状态。",
      "index.gui_editor.open": "打开 GUI 编辑器",

      "gui.eyebrow": "Ren'Py 可视化编辑器",
      "gui.heading": "GUI 编辑器",
      "gui.project_path.missing": "未提供项目路径。",
      "gui.status.ready": "GUI 编辑器已就绪。",
      "gui.button.back": "返回可视化编辑器",
      "gui.button.save": "保存 GUI 草稿",
      "gui.nav.styles": "样式",
      "gui.nav.screens": "Screens",
      "gui.nav.extras": "扩展",
      "gui.nav.config": "配置",
      "gui.nav.python": "Python UI",
      "gui.nav.cursors": "鼠标",
      "gui.nav.shaders": "着色器",
      "gui.nav.diagnostics": "诊断",
      "gui.nav.note": "这个编辑器现在覆盖样式、screen 结构、screen action/value、GUI config、鼠标系统、文字着色器、Python UI helper 模板、回想菜单、音乐室、图库、预览和诊断。",
      "gui.diagnostics.heading": "诊断",
      "gui.output.heading": "建议输出",
      "gui.output.desc": "根据当前诊断收集出的、可能需要关注的代码片段。",

      "section.main.project": "项目",
      "section.main.label_graphs": "标签图",
      "section.main.images": "图片",
      "section.main.live2d": "Live2D",
      "section.main.audio": "音频",
      "section.main.characters": "角色",
      "section.main.variables": "变量",
      "section.main.achievements": "成就",
      "section.main.definitions": "定义",
      "section.main.settings": "设置",
      "sidebar.shortcuts": "侧边栏快捷入口",
      "sidebar.collapse": "收起侧边栏",
      "sidebar.expand": "展开侧边栏",
      "sidebar.open_project": "打开项目概览",
      "sidebar.open_label_graphs": "打开标签图",
      "sidebar.open_images": "打开图片定义",
      "sidebar.open_live2d": "打开 Live2D 定义",
      "sidebar.open_audio": "打开音频定义",
      "sidebar.open_characters": "打开角色定义",
      "sidebar.open_variables": "打开变量",
      "sidebar.open_achievements": "打开成就",
      "sidebar.open_definitions": "打开定义",
      "sidebar.open_settings": "打开设置",

      "health.bridge.connected": "Bridge 已连接",
      "health.bridge.offline": "Bridge 未连接",
      "health.pill.project_json": "Project JSON：{text}",
      "health.pill.export": "导出：{text}",
      "health.pill.assets": "资源：{text}",
      "health.summary.ready": "编辑器状态稳定，可以继续保存或导出。",
      "health.summary.scan_running": "正在为当前项目执行第一次 launcher 健康扫描。",
      "health.summary.scan_waiting": "等待 launcher 的第一次健康扫描。",
      "health.summary.bridge_offline": "请从 Ren'Py Launcher 打开，以检查磁盘文件和旧文件清理状态。",
      "health.summary.assets_missing": "请在下次构建前修复 {count} 个缺失的资源引用。",
      "health.summary.legacy_remaining": "仍有一些旧文件存在，所以当前导出行为可能仍然是混合状态。",
      "health.summary.error": "健康扫描需要关注：{message}",
      "health.timestamp.waiting": "等待项目扫描",
      "health.timestamp.refreshing": "正在刷新...",
      "health.timestamp.updated": "更新于 {time}",
      "health.item.legacy_script.title": "旧版脚本文件",
      "health.item.legacy_script.ok": "game/script.rpy 和 game/script.rpyc 已经不再阻挡当前导出链路。",
      "health.item.legacy_script.remaining": "仍然存在：{paths}",
      "health.item.legacy_gui.title": "旧版 GUI 文件",
      "health.item.legacy_gui.ok": "options/gui/screens 旧文件已经不会再遮挡生成的 GUI 输出。",
      "health.item.legacy_gui.remaining": "仍然存在：{paths}",
      "health.item.confirm.title": "确认弹窗链路",
      "health.item.confirm.project": "项目内已经有可用的 confirm / yesno_prompt screen。",
      "health.item.confirm.fallback": "导出时会自动注入兜底的 confirm screen。",
      "health.item.assets.title": "核心资源路径",
      "health.item.assets.ok": "图片、视频、Live2D 和音频路径都能在项目内正确解析。",
      "health.item.assets.missing": "共有 {count} 个缺失资源引用：{paths}",
      "health.gui.last_section": "上次 GUI 分区",
      "health.gui.note.connected": "返回路径已接通。下次打开 GUI 编辑器会回到 {section}。当前确认流程使用的是 {mode}。",
      "health.gui.note.disconnected": "请从 Ren'Py Launcher 打开，这样健康检查、bridge 同步和分区记忆才能与 GUI 编辑器共享。",
      "health.confirm.mode.project": "项目内 confirm screen",
      "health.confirm.mode.fallback": "导出兜底 confirm screen",

      "sync.project_json.initial_wait": "等待第一次 project.json 同步。",
      "sync.project_json.initial_wait_gui": "等待第一次 GUI 同步。",
      "sync.bridge.disconnected": "Launcher bridge 未连接。",
      "sync.export.initial_wait": "本次会话还没有写出任何 .rpy 导出文件。",
      "sync.assets.initial_wait": "资源导入的匹配、覆盖和项目写入结果会显示在这里。",
      "sync.project_json.queued": "已加入 project.json 同步队列。",
      "sync.project_json.good": "project.json 已同步。",
      "sync.project_json.failed": "Project JSON 同步失败：{message}",
      "sync.project_json.loaded": "已加载 visual_editor/project.json。",
      "sync.project_json.imported": "已导入旧文件并写入 project.json。",
      "sync.project_json.created": "已创建 visual_editor/project.json。",
      "sync.project_json.local_only": "已在本地保存，但未连接 launcher bridge。",
      "sync.project_json.kept_scripts": "project.json 已同步，但保留了旧版 script 文件。",
      "sync.project_json.script_cleanup": "project.json 与 script 清理状态已同步。",
      "sync.project_json.gui_takeover": "GUI 接管后的 project.json 已同步。",
      "sync.export.local_only": "已在本地生成，但没有写入项目文件。",
      "sync.export.canceled": "导出已取消，未写入 generated_visual_editor.rpy。",
      "sync.export.good": "generated_visual_editor.rpy 已是最新。",
      "sync.export.gui_takeover": "GUI 接管时已刷新 generated_visual_editor.rpy。",
      "sync.export.failed": "导出失败：{message}",
      "sync.gui.manual_save": "已加入一次手动 GUI 保存。",
      "sync.gui.good": "GUI project.json 已同步。",

      "asset.status.match": "已匹配项目内现有的 {resource}“{path}”，对应文件“{file}”。",
      "asset.status.imported": "已把“{file}”导入到项目中的 {resource}“{path}”。",
      "asset.status.updated": "已用“{file}”更新项目中的 {resource}“{path}”。",
      "asset.status.local_only": "已为 {resource} 选择“{file}”。如果要自动导入项目，请从 Ren'Py Launcher 打开编辑器。",
      "asset.status.set": "已将 {resource} 设置为“{path}”。",
      "asset.status.selected": "已为 {resource} 选择“{file}”。",
      "asset.status.keep_existing": "保留了项目中现有的 {resource}“{path}”。",
      "asset.status.keep_current": "保留了当前 {resource}。",
      "asset.status.keep_multiple": "因为“{file}”在项目里命中了多个同名文件，所以保留了现有的 {resource}。",
      "asset.resource.image": "图片源路径",
      "asset.resource.movie": "视频播放路径",
      "asset.resource.live2d": "Live2D 模型路径",
      "asset.resource.audio": "音频源路径",
      "asset.conflict.multiple": "项目里已经有多个同名资源使用“{file}”。\n\n{matches}\n\n点击“确定”会把这次选中的文件导入到“{path}”。\n点击“取消”会保留当前资源路径不变。",
      "asset.conflict.overwrite": "项目内的“{path}”已经存在。\n\n点击“确定”会用这次选中的文件覆盖它。\n点击“取消”会保留现有项目文件。",
      "asset.prompt.image_select_first": "请先创建或选择一个图片定义，再浏览文件。",
      "asset.prompt.movie_select_first": "请先创建或选择一个图片定义，再浏览视频文件。",
      "asset.prompt.live2d_select_first": "请先创建或选择一个 Live2D 定义，再浏览模型文件。",
      "asset.prompt.audio_select_first": "请先创建或选择一个音频定义，再浏览文件。",
      "asset.error.image": "图片导入失败：{message}",
      "asset.error.movie": "视频导入失败：{message}",
      "asset.error.live2d": "Live2D 导入失败：{message}",
      "asset.error.audio": "音频导入失败：{message}",

      "status.visual_editor_ready": "可视化编辑器已就绪。拖动画布空白区域可平移，滚轮可缩放。",
      "status.returned_from_gui": "已从 GUI 编辑器返回。上次使用的 GUI 分区是：{section}。",
      "status.loaded_project_state": "已从 visual_editor/project.json 加载项目状态。",
      "status.imported_project_state": "已将 {sources} 导入到 visual_editor/project.json{suffix}",
      "status.created_project_state": "已根据当前编辑器状态创建 visual_editor/project.json。",
      "status.bridge_unavailable": "Launcher bridge 不可用：{message}",
      "status.script_takeover_confirm": "Visual Editor 已准备接管这个项目的 game/script.rpy 和 game/script.rpyc。\n\n第一次保存或导出时会删除这两个文件，避免与 generated_visual_editor.rpy 发生重复 label 冲突。\n\n每个项目只需要确认一次。",
      "status.saved_local_draft": "已将图形草稿保存到浏览器本地存储。",
      "status.synced_kept_scripts": "已同步 visual_editor/project.json，并保留了 game/script.rpy 和 game/script.rpyc。",
      "status.synced_removed": "已同步 visual_editor/project.json，并删除了 {paths}。",
      "status.synced_simple": "已同步 visual_editor/project.json。",
      "status.export_bridge_required": "已经生成 .rpy 文本，但 launcher bridge 未连接。请从 Ren'Py Launcher 打开以写入项目文件。",
      "status.export_canceled_kept_scripts": "导出已取消，保留了 game/script.rpy 和 game/script.rpyc。",
      "status.export_success_removed": "已删除 {paths}，同步了 visual_editor/project.json，并导出了 generated_visual_editor.rpy。",
      "status.export_success_simple": "已同步 visual_editor/project.json，并导出了 generated_visual_editor.rpy。",
      "status.takeover_bridge_required": "旧版文件接管需要 launcher bridge。请从 Ren'Py Launcher 打开此编辑器。",
      "status.takeover_confirm": "要接管 game/options.rpy、game/gui.rpy 和 game/screens.rpy 吗？\n\n这会先备份并删除这些 .rpy 文件以及对应的 .rpyc，然后根据当前编辑器状态刷新 generated_visual_editor.rpy。",
      "status.takeover_kept_existing": "保留了现有的旧版 GUI 文件。",
      "status.takeover_already_active": "旧版 GUI 接管已经启用，已刷新 project.json 和 generated_visual_editor.rpy。",
      "status.takeover_deleted_none": "没有发现需要删除的旧版 GUI 文件。",
      "status.takeover_success_with_backup": "已备份并删除 {paths}。备份目录：{backupRoot}。",
      "status.takeover_success": "已备份并删除 {paths}。",
      "status.takeover_failed": "旧版接管失败：{message}",

      "gui.topbar.confirm.project": "使用项目内 confirm screen",
      "gui.topbar.confirm.fallback": "使用兜底 confirm screen",
      "gui.topbar.assets.ok": "核心资源路径正常",
      "gui.topbar.assets.missing": "缺少 {count} 个资源路径",
      "gui.topbar.return_target": "返回目标：{section}",
      "gui.topbar.refreshing": "正在刷新健康状态...",
      "gui.topbar.checked": "健康状态检查于 {time}",
      "gui.topbar.waiting": "等待健康扫描",
      "gui.topbar.warning": "健康状态警告：{message}",
      "gui.status.loaded": "已从 visual_editor/project.json 加载 GUI 状态。",
      "gui.status.imported": "已将 {sources} 导入到 visual_editor/project.json{suffix}",
      "gui.status.created": "已根据当前 GUI 状态创建 visual_editor/project.json。",
      "gui.status.bridge_unavailable": "Launcher bridge 不可用：{message}",
      "gui.status.section_opened": "已打开 {section} 分区。",
      "gui.status.saved": "已保存 GUI 草稿，并加入 project.json 同步队列。",
      "gui.status.saved_local": "已保存 GUI 草稿。",

      "Current Label": "当前标签",
      "Total Label Graphs": "标签图总数",
      "Replay Labels": "回想标签",
      "Blocks In Current Graph": "当前图中的块",
      "Audio Definitions": "音频定义",
      "Side Image Definitions": "立绘定义",
      "Live2D Definitions": "Live2D 定义",
      "Default Variables": "默认变量",
      "Achievements": "成就",
      "Definitions": "定义",
      "Voice Strategy": "语音策略",
      "Save Features": "存档功能",
      "Rollback": "回滚",
      "Linked Image Tags": "链接的图像标签",
      "Voiced Dialogues": "有声对话",
      "Canvas Zoom": "画布缩放",
      "image-pos": "位置",
      "image-anchor": "锚点",
      "image-align": "对齐",
      "image-alignaround": "环绕对齐",
      "image-xalign": "水平对齐",
      "image-yalign": "垂直对齐",
      "image-offset": "偏移",
      "image-xoffset": "水平偏移",
      "image-yoffset": "垂直偏移",
      "image-xycenter": "中心点",
      "image-xcenter": "水平中心点",
      "image-ycenter": "垂直中心点",
      "image-polar": "极坐标",
      "image-around": "环绕",
      "image-angle": "角度",
      "image-radius": "半径",
      "image-anchoraround": "环绕锚点",
      "image-anchorangle": "锚点角度",
      "image-anchorradius": "锚点半径",
      "image-scale-size": "缩放和大小",
      "image-zoom": "缩放",
      "image-xzoom": "水平缩放",
      "image-yzoom": "垂直缩放",
      "image-size": "大小",
      "image-xsize": "水平大小",
      "image-ysize": "垂直大小",
      "image-xysize": "水平和垂直大小",
      "image-maxsize": "最大大小",
      "image-fit": "适应",
      "image-xtile": "水平平铺",
      "image-ytile": "垂直平铺",
      "image-rotate-depth": "旋转深度",
      "image-rotate": "旋转",
      "image-rotate_pad": "旋转填充",
      "image-transform_anchor": "变换锚点",
      "image-orientation": "三维朝向",
      "image-xrotate": "绕 X 轴旋转",
      "image-yrotate": "绕 Y 轴旋转",
      "image-zrotate": "绕 Z 轴旋转",
      "image-zpos": "Z 轴位置",
      "image-zzoom": "Z 轴缩放",
      "image-appearance": "外观",
      "image-alpha": "透明度",
      "image-additive": "叠加",
      "image-blur": "模糊",
      "image-nearest": "最近邻",
      "image-subpixel": "亚像素抗锯齿",
      "image-blend": "混合模式",
      "image-matrixcolor": "颜色矩阵",
      "image-matrixcolor-none": "无",
      "image-matrixcolor-identity_reset": "恒等 / 重置",
      "image-matrixcolor-tint": "色调叠加",
      "image-matrixcolor-saturation": "饱和度",
      "image-matrixcolor-sepia": "怀旧",
      "image-matrixcolor-invert": "反转",
      "image-matrixcolor-brightness": "亮度",
      "image-matrixcolor-hue": "色相",
      "image-matrixcolor-opacity": "不透明度",
      "image-matrixcolor-colorize": "映射着色",
      "image-matrixcolor-custom": "自定义表达式",
      "image-matrixcolor-help": "选择内置预设后，会自动生成到下方的表达式字段。若要使用矩阵相乘或手写 <code>Matrix([...])</code>，请选择“自定义”。",
      "image-matrixcolor-tint": "色调颜色",
      "image-matrixcolor-saturation": "饱和度值",
      "image-matrixcolor-sepia": "怀旧强度",
      "image-matrixcolor-invert": "反转强度",
      "image-matrixcolor-brightness": "亮度值",
      "image-matrixcolor-hue": "色相角度",
      "image-matrixcolor-opacity": "不透明度值",
      "image-matrixcolor-colorize": "映射颜色",
      "image-matrixcolor-black-maps-to": "黑色映射到",
      "image-matrixcolor-white-maps-to": "白色映射到",
      "image-matrixcolor-matrix-color-expression": "颜色矩阵表达式",
      "image-matrixtransform": "矩阵变换",
      "image-matrixanchor": "矩阵锚点",
      "image-crop-and-shader": "裁剪和着色器",
      "image-crop": "裁剪",
      "image-crop-relative": "相对裁剪",
      "image-corner1": "左上",
      "image-corner2": "右上",
      "image-shader": "着色器",
      "image-mesh": "网格",
      "image-mesh-pad": "网格填充",
      "image-perspective": "透视",
      "image-motion-and-advanced": "运动和高级",
      "image-xpan": "水平平移",
      "image-ypan": "垂直平移",
      "image-fps": "帧率",
      "image-point-to": "指向",
      "image-delay": "延迟",
      "image-events": "事件",
      "image-show-cancels-hide": "显示会取消隐藏",
      "image-movie": "视频",
      "image-play-path": "播放路径",
      "image-browse": "浏览",
      "image-size": "大小",
      "image-channel": "通道",
      "image-side-mask": "立绘遮罩",
      "image-mask": "遮罩",
      "image-mask-channel": "遮罩通道",
      "image-start-image": "起始图片",
      "image-animation-atl": "动画 / ALT",
      "image-atl-enabled": "启用 ATL",
      "image-generated-code": "生成的代码",
      "image-timeline": "时间轴",
      "image-atl-help": "第一版支持直接属性行、pause 语句、插值、contains 语句和 repeat 语句。",
      "image-replay-auto-end": "在生成的代码末尾追加 <code>renpy.end_replay()</code>",
      "project-settings-replay-note-1": "在场景式标签中使用回放。",
      "project-settings-replay-note-2": "如果你的标签会通过",
      "project-settings-replay-note-3": "或",
      "project-settings-replay-note-4": "提前退出，你可能仍然需要在脚本中手动添加结束回放的步骤。",
      "live2d-empty": "还没有 Live2D 模型。创建一个来定义可重用的 Live2D 资源。",
      "live2d-definition-new": "新建 Live2D",
      "back": "返回",
      "live2d-definition-basic": "基础",
      "live2d-definition-name": "Live2D 模型名称",
      "live2d-definition-model-path": "模型路径",
      "live2d-definition-browse": "浏览",
      "project-settings-live2d-note-1": "Live2D 需要",
      "project-settings-live2d-note-2": "和原生 Cubism SDK。Ren'Py Web 构建不支持 Live2D 播放。",
      "live2d-definition-display": "显示",
      "live2d-definition-zoom": "缩放",
      "live2d-definition-top": "顶部",
      "live2d-definition-base": "底部",
      "live2d-definition-height": "高度",
      "live2d-definition-playback": "播放设置",
      "live2d-definition-loop": "循环最后一个动作",
      "live2d-definition-fade": "淡入淡出",
      "live2d-definition-fade-default": "使用项目默认设置",
      "live2d-definition-fade-true": "启用淡入淡出",
      "live2d-definition-fade-false": "禁用淡入淡出",
      "live2d-definition-seamless": "无缝循环",
      "live2d-definition-default-fade": "项目默认淡入淡出设置",
      "live2d-definition-catalog": "动作目录",
      "live2d-definition-motions": "动作列表",
      "live2d-definition-expressions": "表情列表",
      "live2d-definition-nonexclusive": "非独占动作",
      "live2d-definition-aliases": "动作别名",
      "live2d-definition-catalog-note": "动作、表情和别名会存储在这里，以便编辑器之后能够识别并处理该模型。Ren'Py 仍然会从 Live2D 文件中读取真正的动画数据。",
      "live2d-definition-delete": "删除 Live2D 定义",
      "live2d-definition-generated-code": "生成的代码",
      "new-audio": "新建音频",
      "audio-definition-name": "音频名称",
      "audio-definition-channel": "种类",
      "audio-definition-channel-music": "音乐",
      "audio-definition-channel-sound": "声音",
      "audio-definition-channel-voice": "语音",
      "audio-definition-voice-owner": "语音所属角色",
      "audio-definition-voice-owner-narrator": "旁白",
      "audio-definition-source-path": "音频源路径",
      "audio-definition-browse": "浏览",
      "audio-definition-generated-code": "生成的代码",
      "characters-empty": "还没有角色定义。创建一个来定义可重用的角色资源。",
      "new-character": "新建角色",
      "character-variable-name": "角色变量名",
      "character-display-name": "角色显示名称",
      
    },
  };

  const staticTextTranslations = {
    "zh-CN": {
      "Simplified Chinese": "\u7b80\u4f53\u4e2d\u6587",
      "New Label Graph": "\u65b0\u5efa\u6807\u7b7e\u56fe",
      "Back": "\u8fd4\u56de",
      "Replay": "\u56de\u60f3",
      "Enable Replay For This Label": "\u4e3a\u8fd9\u4e2a\u6807\u7b7e\u542f\u7528\u56de\u60f3",
      "Replay Button Text": "\u56de\u60f3\u6309\u94ae\u6587\u672c",
      "Locked Mode": "\u9501\u5b9a\u6a21\u5f0f",
      "Auto Unlock By Progress": "\u6309\u8fdb\u5ea6\u81ea\u52a8\u89e3\u9501",
      "Always Unlocked": "\u59cb\u7ec8\u89e3\u9501",
      "Always Locked": "\u59cb\u7ec8\u9501\u5b9a",
      "Replay Scope": "\u56de\u60f3\u4f5c\u7528\u57df",
      "Replay Action Preview": "\u56de\u60f3\u52a8\u4f5c\u9884\u89c8",
      "No images yet. Create one to define an image resource.": "\u8fd8\u6ca1\u6709\u56fe\u50cf\u3002\u521b\u5efa\u4e00\u4e2a\u6765\u5b9a\u4e49\u56fe\u50cf\u8d44\u6e90\u3002",
      "New Image": "\u65b0\u5efa\u56fe\u50cf",
      "Basic": "\u57fa\u7840",
      "Image Name": "\u56fe\u50cf\u540d\u79f0",
      "Images": "\u56fe\u7247",
      "Open image definitions": "\u6253\u5f00\u56fe\u7247\u5b9a\u4e49",
      "Create image definition": "\u65b0\u5efa\u56fe\u7247\u5b9a\u4e49",
      "Category": "\u5206\u7c7b",
      "Background": "\u80cc\u666f",
      "Character": "\u89d2\u8272",
      "Others": "\u5176\u4ed6",
      "No background images yet.": "\u8fd8\u6ca1\u6709\u80cc\u666f\u56fe\u7247\u3002",
      "No character images yet.": "\u8fd8\u6ca1\u6709\u89d2\u8272\u56fe\u7247\u3002",
      "No other images yet.": "\u8fd8\u6ca1\u6709\u5176\u4ed6\u56fe\u7247\u3002",
      "Definition Type": "\u5b9a\u4e49\u7c7b\u578b",
      "Static Image": "\u9759\u6001\u56fe\u50cf",
      "Layered Image": "\u5206\u5c42\u56fe\u50cf",
      "Movie": "\u89c6\u9891",
      "Solid": "\u7eaf\u8272",
      "Composite": "\u7ec4\u5408",
      "Placeholder": "\u5360\u4f4d",
      "Side Image": "\u4fa7\u8fb9\u56fe",
      "Layered": "\u5206\u5c42",
      "Static": "\u9759\u6001",
      "group": "\u7ec4",
      "groups": "\u7ec4",
      "always": "\u5e38\u9a7b\u5c42",
      "layer": "\u5c42",
      "layers": "\u5c42",
      "No play path yet": "\u5c1a\u672a\u8bbe\u7f6e\u64ad\u653e\u8def\u5f84",
      "No source path yet": "\u5c1a\u672a\u8bbe\u7f6e\u8d44\u6e90\u8def\u5f84",
      "Auto": "\u81ea\u52a8",
      "Boy": "\u7537\u5b69",
      "Girl": "\u5973\u5b69",
      "Define As Side Image": "\u5b9a\u4e49\u4e3a\u4fa7\u8fb9\u56fe",
      "Source Path": "\u8d44\u6e90\u8def\u5f84",
      "Browse": "\u6d4f\u89c8",
      "Position": "\u4f4d\u7f6e",
      "No Live2D models yet. Create one to define a reusable Live2D resource.": "\u8fd8\u6ca1\u6709 Live2D \u6a21\u578b\u3002\u521b\u5efa\u4e00\u4e2a\u6765\u5b9a\u4e49\u53ef\u590d\u7528\u7684 Live2D \u8d44\u6e90\u3002",
      "Delete Live2D": "\u5220\u9664 Live2D",
      "No audio yet. Create one to define a reusable sound resource.": "\u8fd8\u6ca1\u6709\u97f3\u9891\u3002\u521b\u5efa\u4e00\u4e2a\u6765\u5b9a\u4e49\u53ef\u590d\u7528\u7684\u58f0\u97f3\u8d44\u6e90\u3002",
      "Music": "\u97f3\u4e50",
      "Sound": "\u97f3\u6548",
      "Voice": "\u8bed\u97f3",
      "No music audio yet.": "\u8fd8\u6ca1\u6709\u97f3\u4e50\u97f3\u9891\u3002",
      "No sound effects yet.": "\u8fd8\u6ca1\u6709\u97f3\u6548\u3002",
      "No voice audio yet.": "\u8fd8\u6ca1\u6709\u8bed\u97f3\u97f3\u9891\u3002",
      "No characters yet. Create one to get started.": "\u8fd8\u6ca1\u6709\u89d2\u8272\u3002\u521b\u5efa\u4e00\u4e2a\u5f00\u59cb\u5427\u3002",
      "Window Background": "\u7a97\u53e3\u80cc\u666f",
      "CTC Position": "CTC \u4f4d\u7f6e",
      "No default variables yet. Create one to define game state.": "\u8fd8\u6ca1\u6709\u9ed8\u8ba4\u53d8\u91cf\u3002\u521b\u5efa\u4e00\u4e2a\u6765\u5b9a\u4e49\u6e38\u620f\u72b6\u6001\u3002",
      "Delete Variable": "\u5220\u9664\u53d8\u91cf",
      "No achievements yet. Create one to register a Ren'Py achievement.": "\u8fd8\u6ca1\u6709\u6210\u5c31\u3002\u521b\u5efa\u4e00\u4e2a\u6765\u6ce8\u518c Ren'Py \u6210\u5c31\u3002",
      "Delete Achievement": "\u5220\u9664\u6210\u5c31",
      "No definitions yet. Create one for define or init python setup.": "\u8fd8\u6ca1\u6709\u5b9a\u4e49\u3002\u521b\u5efa\u4e00\u4e2a\u7528\u4e8e define \u6216 init python \u914d\u7f6e\u3002",
      "Delete Definition": "\u5220\u9664\u5b9a\u4e49",
      "Voice Settings": "\u8bed\u97f3\u8bbe\u7f6e",
      "Side Image Settings": "\u4fa7\u8fb9\u56fe\u8bbe\u7f6e",
      "Save / Rollback Settings": "\u4fdd\u5b58 / \u56de\u6eda\u8bbe\u7f6e",
      "Keymap Settings": "\u6309\u952e\u6620\u5c04\u8bbe\u7f6e",
      "Select a node to inspect its properties.": "\u9009\u62e9\u4e00\u4e2a\u8282\u70b9\u4ee5\u67e5\u770b\u5b83\u7684\u5c5e\u6027\u3002",
      "Delete Block": "\u5220\u9664\u5757",
      "Delete Label": "\u5220\u9664\u6807\u7b7e",
      "Delete Image": "\u5220\u9664\u56fe\u50cf",
      "Delete Audio": "\u5220\u9664\u97f3\u9891",
      "Delete Character": "\u5220\u9664\u89d2\u8272",
      "Select a label...": "\u9009\u62e9\u4e00\u4e2a\u6807\u7b7e...",

      "Styles": "\u6837\u5f0f",
      "Reusable style definitions for GUI components.": "GUI \u7ec4\u4ef6\u53ef\u590d\u7528\u7684 style \u5b9a\u4e49\u3002",
      "No styles yet. Create one to start building GUI appearance rules.": "\u8fd8\u6ca1\u6709\u6837\u5f0f\u3002\u521b\u5efa\u4e00\u4e2a\u5f00\u59cb\u642d\u5efa GUI \u5916\u89c2\u89c4\u5219\u3002",
      "New Style": "\u65b0\u5efa\u6837\u5f0f",
      "Select a style from the list or create a new one to start editing.": "\u4ece\u5217\u8868\u4e2d\u9009\u62e9\u4e00\u4e2a\u6837\u5f0f\uff0c\u6216\u521b\u5efa\u65b0\u6837\u5f0f\u5f00\u59cb\u7f16\u8f91\u3002",
      "Style Detail": "\u6837\u5f0f\u8be6\u60c5",
      "Define the style statement and its property overrides.": "\u5b9a\u4e49 style \u8bed\u53e5\u4ee5\u53ca\u5b83\u7684\u5c5e\u6027\u8986\u5199\u3002",
      "Style Name": "\u6837\u5f0f\u540d\u79f0",
      "Parent Style": "\u7236\u6837\u5f0f",
      "Variant Expression": "\u53d8\u4f53\u8868\u8fbe\u5f0f",
      "Primary Category": "\u4e3b\u7c7b\u522b",
      "Text": "\u6587\u672c",
      "Window": "\u7a97\u53e3",
      "Button": "\u6309\u94ae",
      "Bar": "\u6761",
      "Box": "\u76d2",
      "Grid": "\u7f51\u683c",
      "Margin": "\u5916\u8fb9\u8ddd",
      "properties Expression": "properties \u8868\u8fbe\u5f0f",
      "State Prefix": "\u72b6\u6001\u524d\u7f00",
      "Position & Layout": "\u4f4d\u7f6e\u4e0e\u5e03\u5c40",
      "Typed editors for common position-related properties.": "\u4e3a\u5e38\u89c1\u4f4d\u7f6e\u76f8\u5173\u5c5e\u6027\u63d0\u4f9b\u7c7b\u578b\u5316\u7f16\u8f91\u3002",
      "Font, color, outlines, text speed, and line handling.": "\u5b57\u4f53\u3001\u989c\u8272\u3001\u63cf\u8fb9\u3001\u6587\u672c\u901f\u5ea6\u548c\u884c\u5904\u7406\u3002",
      "Backgrounds, padding, fill behavior, and grouping.": "\u80cc\u666f\u3001\u5185\u8fb9\u8ddd\u3001\u586b\u5145\u884c\u4e3a\u548c\u5206\u7ec4\u3002",
      "State-aware button visuals, sounds, focus, and cursors.": "\u652f\u6301\u72b6\u6001\u611f\u77e5\u7684\u6309\u94ae\u5916\u89c2\u3001\u97f3\u6548\u3001\u7126\u70b9\u548c\u5149\u6807\u3002",
      "Thumbs, gutters, orientation, and bar displayables.": "\u6ed1\u5757\u3001\u6c9f\u69fd\u3001\u65b9\u5411\u548c bar \u663e\u793a\u7ec4\u4ef6\u3002",
      "Spacing, wrapping, reversing, and justification behavior.": "\u95f4\u8ddd\u3001\u6362\u884c\u3001\u53cd\u5411\u548c\u5bf9\u9f50\u884c\u4e3a\u3002",
      "Horizontal and vertical spacing controls for grid layouts.": "\u63a7\u5236\u7f51\u683c\u5e03\u5c40\u7684\u6c34\u5e73\u4e0e\u5782\u76f4\u95f4\u8ddd\u3002",
      "Outer spacing around windows, frames, buttons, and layout containers.": "\u7a97\u53e3\u3001\u8fb9\u6846\u3001\u6309\u94ae\u548c\u5e03\u5c40\u5bb9\u5668\u5916\u4fa7\u7684\u95f4\u8ddd\u3002",
      "Delete Style": "\u5220\u9664\u6837\u5f0f",
      "Style Output": "\u6837\u5f0f\u8f93\u51fa",
      "Current code preview and active property summary.": "\u5f53\u524d\u4ee3\u7801\u9884\u89c8\u548c\u5df2\u542f\u7528\u5c5e\u6027\u6982\u8981\u3002",
      "No screens yet. Create one or start from a special-screen template.": "\u8fd8\u6ca1\u6709 screens\u3002\u521b\u5efa\u4e00\u4e2a\uff0c\u6216\u4ece\u7279\u6b8a screen \u6a21\u677f\u5f00\u59cb\u3002",
      "Select a screen to edit its structure, then choose nodes in the tree to configure them.": "\u9009\u62e9\u4e00\u4e2a screen \u6765\u7f16\u8f91\u5b83\u7684\u7ed3\u6784\uff0c\u7136\u540e\u5728\u6811\u4e2d\u9009\u62e9\u8282\u70b9\u8fdb\u884c\u914d\u7f6e\u3002",
      "Delete Screen": "\u5220\u9664 Screen",
      "Select a node from the tree to edit its fields.": "\u4ece\u6811\u4e2d\u9009\u62e9\u4e00\u4e2a\u8282\u70b9\u6765\u7f16\u8f91\u5b83\u7684\u5b57\u6bb5\u3002",
      "Delete Node": "\u5220\u9664\u8282\u70b9",
      "Enabled Replay Labels": "\u5df2\u542f\u7528\u7684\u56de\u60f3\u6807\u7b7e",
      "No music rooms yet. Create one to start mapping tracks and controls.": "\u8fd8\u6ca1\u6709\u97f3\u4e50\u5ba4\u3002\u521b\u5efa\u4e00\u4e2a\u5f00\u59cb\u914d\u7f6e\u66f2\u76ee\u548c\u63a7\u4ef6\u3002",
      "Select a music room to configure its track list and generated screen.": "\u9009\u62e9\u4e00\u4e2a\u97f3\u4e50\u5ba4\u6765\u914d\u7f6e\u5b83\u7684\u66f2\u76ee\u5217\u8868\u548c\u751f\u6210\u7684 screen\u3002",
      "Delete Music Room": "\u5220\u9664\u97f3\u4e50\u5ba4",
      "No galleries yet. Create one to wire thumbnails to unlockable CG images.": "\u8fd8\u6ca1\u6709\u56fe\u5e93\u3002\u521b\u5efa\u4e00\u4e2a\u6765\u5c06\u7f29\u7565\u56fe\u8fde\u63a5\u5230\u53ef\u89e3\u9501\u7684 CG \u56fe\u50cf\u3002",
      "Select a gallery to configure its object fields, thumbnail buttons, and generated screen.": "\u9009\u62e9\u4e00\u4e2a\u56fe\u5e93\u6765\u914d\u7f6e\u5b83\u7684\u5bf9\u8c61\u5b57\u6bb5\u3001\u7f29\u7565\u56fe\u6309\u94ae\u548c\u751f\u6210\u7684 screen\u3002",
      "No config entries yet. Add one of the common scopes below.": "\u8fd8\u6ca1\u6709 config \u6761\u76ee\u3002\u4ece\u4e0b\u9762\u5e38\u7528\u4f5c\u7528\u57df\u4e2d\u6dfb\u52a0\u4e00\u4e2a\u3002",
      "Select an entry to edit its scope and emitted Ren'Py statement.": "\u9009\u62e9\u4e00\u4e2a\u6761\u76ee\u6765\u7f16\u8f91\u5b83\u7684\u4f5c\u7528\u57df\u548c\u8f93\u51fa\u7684 Ren'Py \u8bed\u53e5\u3002",
      "Delete Entry": "\u5220\u9664\u6761\u76ee",
      "No Python UI helpers yet. Add one of the common templates below.": "\u8fd8\u6ca1\u6709 Python UI helper\u3002\u4ece\u4e0b\u9762\u5e38\u7528\u6a21\u677f\u4e2d\u6dfb\u52a0\u4e00\u4e2a\u3002",
      "Select a helper to edit its template and generated Python code.": "\u9009\u62e9\u4e00\u4e2a helper \u6765\u7f16\u8f91\u5b83\u7684\u6a21\u677f\u548c\u751f\u6210\u7684 Python \u4ee3\u7801\u3002",
      "Delete Helper": "\u5220\u9664 Helper",
      "No cursor entries yet. Start with a hardware or displayable cursor.": "\u8fd8\u6ca1\u6709\u5149\u6807\u6761\u76ee\u3002\u53ef\u4ee5\u4ece\u786c\u4ef6\u5149\u6807\u6216 displayable \u5149\u6807\u5f00\u59cb\u3002",
      "Select a cursor entry to edit it.": "\u9009\u62e9\u4e00\u4e2a\u5149\u6807\u6761\u76ee\u6765\u7f16\u8f91\u3002",
      "Delete Cursor Entry": "\u5220\u9664\u5149\u6807\u6761\u76ee",
      "No shader entries yet. Add a built-in or custom text shader setup.": "\u8fd8\u6ca1\u6709 shader \u6761\u76ee\u3002\u6dfb\u52a0\u4e00\u4e2a\u5185\u7f6e\u6216\u81ea\u5b9a\u4e49\u6587\u672c shader \u914d\u7f6e\u3002",
      "Select a shader entry to edit it.": "\u9009\u62e9\u4e00\u4e2a shader \u6761\u76ee\u6765\u7f16\u8f91\u3002",
      "Delete Shader Entry": "\u5220\u9664 Shader \u6761\u76ee",
      "Screens": "Screens",
      "Config": "\u914d\u7f6e",
      "Python UI": "Python UI",
      "Cursors": "\u9f20\u6807",
      "Shaders": "\u7740\u8272\u5668",
      "Diagnostics": "\u8bca\u65ad",
      "Suggested Output": "\u5efa\u8bae\u8f93\u51fa"
    },
  };

  const textTranslationRules = {
    "zh-CN": [
      {
        pattern: /^Returned to (image|Live2D|audio|character|variable|achievement|definition) list\.$/,
        replace: (_match, section) => {
          const labels = {
            image: "\u56fe\u50cf",
            Live2D: "Live2D",
            audio: "\u97f3\u9891",
            character: "\u89d2\u8272",
            variable: "\u53d8\u91cf",
            achievement: "\u6210\u5c31",
            definition: "\u5b9a\u4e49",
          };
          return `\u5df2\u8fd4\u56de${labels[section] || section}\u5217\u8868\u3002`;
        },
      },
      {
        pattern: /^Opened (style|screen|node|image definition|Live2D|audio|character|achievement|variable|definition) "(.*)"\.$/,
        replace: (_match, kind, name) => {
          const labels = {
            style: "\u6837\u5f0f",
            screen: "screen",
            node: "\u8282\u70b9",
            "image definition": "\u56fe\u50cf\u5b9a\u4e49",
            Live2D: "Live2D",
            audio: "\u97f3\u9891",
            character: "\u89d2\u8272",
            achievement: "\u6210\u5c31",
            variable: "\u53d8\u91cf",
            definition: "\u5b9a\u4e49",
          };
          return `\u5df2\u6253\u5f00${labels[kind] || kind}\u201c${name}\u201d\u3002`;
        },
      },
      {
        pattern: /^Kept (style|screen|node|Live2D|gallery button|gallery) "(.*)"\.$/,
        replace: (_match, kind, name) => {
          const labels = {
            style: "\u6837\u5f0f",
            screen: "screen",
            node: "\u8282\u70b9",
            Live2D: "Live2D",
            "gallery button": "\u56fe\u5e93\u6309\u94ae",
            gallery: "\u56fe\u5e93",
          };
          return `\u4fdd\u7559\u4e86${labels[kind] || kind}\u201c${name}\u201d\u3002`;
        },
      },
      {
        pattern: /^Created (style|Live2D|audio|character) "(.*)"\.$/,
        replace: (_match, kind, name) => {
          const labels = {
            style: "\u6837\u5f0f",
            Live2D: "Live2D",
            audio: "\u97f3\u9891",
            character: "\u89d2\u8272",
          };
          return `\u5df2\u521b\u5efa${labels[kind] || kind}\u201c${name}\u201d\u3002`;
        },
      },
      {
        pattern: /^Delete (style|gallery button|gallery|Live2D) "(.*)"\?( This cannot be undone\.)?$/,
        replace: (_match, kind, name) => {
          const labels = {
            style: "\u6837\u5f0f",
            "gallery button": "\u56fe\u5e93\u6309\u94ae",
            gallery: "\u56fe\u5e93",
            Live2D: "Live2D",
          };
          return `\u8981\u5220\u9664${labels[kind] || kind}\u201c${name}\u201d\u5417\uff1f`;
        },
      },
    ],
  };

  const originalTextByNode = new WeakMap();
  const originalAttributesByElement = new WeakMap();

  function interpolate(template, vars) {
    return `${template}`.replace(/\{(\w+)\}/g, (_match, key) => (
      Object.prototype.hasOwnProperty.call(vars, key) ? `${vars[key]}` : `{${key}}`
    ));
  }

  function normalizeLocale(locale) {
    const raw = `${locale || ""}`.trim();
    if (!raw) {
      return "en";
    }

    if (raw.toLowerCase().startsWith("zh")) {
      return "zh-CN";
    }

    return SUPPORTED_LOCALES.includes(raw) ? raw : "en";
  }

  function getLaunchParams() {
    try {
      if (window.location.search) {
        return new URLSearchParams(window.location.search);
      }

      if (window.location.hash) {
        const hash = window.location.hash.startsWith("#?")
          ? window.location.hash.slice(2)
          : window.location.hash.slice(1);

        return new URLSearchParams(hash);
      }
    } catch (error) {
      return new URLSearchParams();
    }

    return new URLSearchParams();
  }

  function resolveInitialLocale() {
    const params = getLaunchParams();
    const queryLocale = normalizeLocale(params.get("lang"));

    if (params.get("lang")) {
      return queryLocale;
    }

    const storedRaw = window.localStorage.getItem(STORAGE_KEY);
    if (storedRaw) {
      return normalizeLocale(storedRaw);
    }

    return "en";
  }

  let activeLocale = resolveInitialLocale();

  function t(key, vars = {}) {
    const activeTable = dictionaries[activeLocale] || dictionaries.en;
    const fallbackTable = dictionaries.en;
    const template = activeTable[key] ?? fallbackTable[key] ?? key;
    return interpolate(template, vars);
  }

  function preserveWhitespace(source, replacement) {
    const match = `${source ?? ""}`.match(/^(\s*)(.*?)(\s*)$/s);
    if (!match) {
      return replacement;
    }

    return `${match[1]}${replacement}${match[3]}`;
  }

  function translateText(value) {
    const source = `${value ?? ""}`;
    if (!source || activeLocale === "en") {
      return source;
    }

    const trimmed = source.trim();
    if (!trimmed) {
      return source;
    }

    const staticTable = staticTextTranslations[activeLocale] || {};
    if (Object.prototype.hasOwnProperty.call(staticTable, trimmed)) {
      return preserveWhitespace(source, staticTable[trimmed]);
    }

    const rules = textTranslationRules[activeLocale] || [];
    for (const rule of rules) {
      const match = trimmed.match(rule.pattern);
      if (!match) {
        continue;
      }

      const translated = typeof rule.replace === "function"
        ? rule.replace(...match)
        : trimmed.replace(rule.pattern, rule.replace);
      return preserveWhitespace(source, translated);
    }

    return source;
  }

  function shouldSkipTextNode(node) {
    const parentTag = node?.parentElement?.tagName;
    return parentTag === "SCRIPT"
      || parentTag === "STYLE"
      || parentTag === "PRE"
      || parentTag === "CODE"
      || parentTag === "TEXTAREA";
  }

  function applyStaticTranslations(root = document) {
    const scope = root?.nodeType === Node.DOCUMENT_NODE ? root.documentElement : root;
    if (!scope) {
      return;
    }

    const walker = document.createTreeWalker(scope, NodeFilter.SHOW_TEXT);
    let textNode = walker.nextNode();
    while (textNode) {
      if (!shouldSkipTextNode(textNode)) {
        if (!originalTextByNode.has(textNode)) {
          originalTextByNode.set(textNode, textNode.nodeValue);
        }

        const original = originalTextByNode.get(textNode);
        textNode.nodeValue = translateText(original);
      }

      textNode = walker.nextNode();
    }

    const managedAttributeKeys = {
      placeholder: "i18nPlaceholder",
      title: "i18nTitle",
      "aria-label": "i18nAriaLabel",
    };
    const elements = [scope, ...scope.querySelectorAll?.("*") || []];
    elements.forEach((el) => {
      ["placeholder", "title", "aria-label"].forEach((attr) => {
        if (!el.hasAttribute?.(attr)) {
          return;
        }

        if (el.dataset?.[managedAttributeKeys[attr]]) {
          return;
        }

        if (!originalAttributesByElement.has(el)) {
          originalAttributesByElement.set(el, {});
        }

        const originalAttrs = originalAttributesByElement.get(el);
        if (!Object.prototype.hasOwnProperty.call(originalAttrs, attr)) {
          originalAttrs[attr] = el.getAttribute(attr);
        }

        el.setAttribute(attr, translateText(originalAttrs[attr]));
      });
    });
  }

  function applyTranslations(root = document) {
    if (!root || !root.querySelectorAll) {
      return;
    }

    root.querySelectorAll("[data-i18n]").forEach((el) => {
      el.textContent = t(el.dataset.i18n);
    });

    root.querySelectorAll("[data-i18n-html]").forEach((el) => {
      el.innerHTML = t(el.dataset.i18nHtml);
    });

    root.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      el.setAttribute("placeholder", t(el.dataset.i18nPlaceholder));
    });

    root.querySelectorAll("[data-i18n-title]").forEach((el) => {
      el.setAttribute("title", t(el.dataset.i18nTitle));
    });

    root.querySelectorAll("[data-i18n-aria-label]").forEach((el) => {
      el.setAttribute("aria-label", t(el.dataset.i18nAriaLabel));
    });

    if (document?.documentElement) {
      document.documentElement.lang = activeLocale;
      const titleKey = document.documentElement.dataset.i18nTitle;
      if (titleKey) {
        document.title = t(titleKey);
      }
    }

    applyStaticTranslations(root);
  }

  function setLocale(locale) {
    activeLocale = normalizeLocale(locale);
    window.localStorage.setItem(STORAGE_KEY, activeLocale);
    applyTranslations(document);
    window.dispatchEvent(new CustomEvent("visual-editor-locale-changed", {
      detail: { locale: activeLocale },
    }));
  }

  window.visualEditorI18n = {
    t,
    translateText,
    getLocale() {
      return activeLocale;
    },
    setLocale,
    applyTranslations,
    supportedLocales: SUPPORTED_LOCALES.slice(),
  };
})();
