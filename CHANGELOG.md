# Changelog

本文件记录这个 Ren'Py 可视化编辑分支的重要更新。

## [0.4.14] - 2026-05-02

### Added

- 新增 `visual_editor/i18n.js` 国际化层，开始将主编辑器与 GUI 编辑器的界面文案、状态提示和诊断信息集中管理，支持后续稳定汉化。
- 新增 `renpy_test_runtime/` 测试运行环境镜像，用于在 Windows 上直接验证 launcher 集成、前端加载、保存和导出链路。
- 为 launcher bridge 新增静态编辑器托管能力，`Visual Editor` 现在通过 `http://127.0.0.1:<port>/editor/index.html` 打开，不再依赖浏览器直接读取 `file://` 页面。
- 为 bridge 新增项目脚本扫描、健康检查、资源导入、旧 GUI 文件接管和旧脚本清理接口，覆盖 `symbols`、`health`、`import_asset_file`、`takeover_legacy_files`、`cleanup_legacy_script_files` 等工作流。
- 新增从已有 `game/options.rpy`、`game/gui.rpy`、`game/screens.rpy` 导入可识别设置的能力，首次创建 `visual_editor/project.json` 时可以带入部分旧项目配置。
- 新增 `scripts/sync_visual_editor_runtime.py`，用于将根目录源码同步到 `renpy_test_runtime`，避免测试运行环境和源码真身继续分叉。

### Changed

- launcher 项目页回到单一 `Visual Editor` 入口，`project.json` 保存改为编辑器内自动同步，`.rpy` 导出仍由编辑器内手动触发。
- `visual_editor/README.md` 更新为新的本地 HTTP bridge 启动方式，并补充旧 GUI 文件接管、自动导入和生成文件职责说明。
- 主编辑器增加项目健康状态提示，用于提醒 bridge 连接、`project.json` 同步、旧脚本残留和旧 GUI 文件残留等风险。
- GUI 接管流程会备份并移除 `options.rpy`、`gui.rpy`、`screens.rpy` 及匹配的 `.rpyc` 文件，然后刷新 `generated_visual_editor.rpy`，降低新旧 GUI 定义互相覆盖的概率。
- GUI Editor 左侧导航栏改为可滚动且计数徽标固定宽度，避免汉化后长文本与数量徽标互相重合。
- 合并 `visual_editor/app.js` 与 `renpy_test_runtime/visual_editor/app.js` 的分叉，明确以后以根目录源码为唯一维护入口。
- 修复主编辑器左侧栏收起后，图像等快捷入口的标题和辅助标签被英文硬编码覆盖的问题。
- 修复图像与音频列表折叠/局部刷新后，分类标题和资源摘要回退为英文的问题。
- 修复主编辑器表单下拉框同时显示原生箭头和自定义箭头的问题。
- 修复图像位置字段汉化标记写法错误导致页面结构异常的问题。
- 修复图片、Live2D、音频、角色、变量、成就和定义列表过长时，新建按钮会跟随侧边栏滚动的问题。
- 优化 `data-i18n-placeholder` 处理逻辑，使 placeholder、title 和 aria-label 统一通过可扩展的属性翻译配置表更新。
- 将 GUI Editor 左侧说明改为可关闭的首次提示，关闭后会按项目记录到本地存储并保持隐藏。
- 开始按功能区块推进 GUI Editor 完整汉化；公共区域的顶部同步状态、语言切换、左侧导航和首次提示现在会稳定跟随当前语言刷新。
- 完成 GUI Editor `Styles` 区块汉化，覆盖样式列表、详情表单、状态前缀、属性帮助、placeholder、样式操作状态和删除确认。
- 完成 GUI Editor `Screens` 区块汉化，覆盖 screen 列表、模板选择、节点树、节点详情、action/value/input 表单、预览占位、诊断提示和 screen/node 操作状态。
- 完成 GUI Editor `Extras` 区块汉化，覆盖 Replay、Music Rooms、Galleries 的表单、列表摘要、嵌套条目、placeholder、删除确认、保存状态和相关诊断提示。
- 完成 GUI Editor `Config & Defaults` 区块汉化，覆盖配置列表、五类 scope 的动态表单标签和 placeholder、输出说明、创建/更新/删除状态、删除确认和配置诊断提示。
- 完成 GUI Editor `Python UI` 区块汉化，覆盖 helper 模板列表、动态类型表单、Action/BarValue/InputValue/Displayable/Statement/restart/define_screen 面板、使用提示、placeholder、操作状态、删除确认和诊断提示。
- 完成 GUI Editor `Cursors` 区块汉化，覆盖硬件鼠标光标、可视组件鼠标光标、使用片段表单、引用列表、placeholder、操作状态、删除确认和鼠标光标相关诊断提示。
- 完成 GUI Editor `Shaders` 区块汉化，覆盖默认文本着色器、样式着色器、callback 映射、自定义注册表单、使用提示、placeholder、操作状态、删除确认和文本着色器诊断提示。
- 完成 GUI Editor `Diagnostics / Suggested Output` 收尾汉化，覆盖诊断说明、统计徽标、空状态、建议输出占位，以及 style/screen 节点相关诊断提示。
- 补全主编辑器 `Keymap Settings` 动态卡片汉化，覆盖分类卡片、事件名称与说明、事件计数、展开后的绑定列表、raw override 表单、操作按钮和状态提示。
- 修复 GUI Editor `Config & Defaults` 区块在内容较长或窄屏布局下无法正常上下滚动的问题，新增入口改为单行下拉按钮，列表和输出预览现在会在各自区域内滚动。
- 将 GUI Editor `Python UI` 的新增 helper 入口同步改为单行下拉按钮，避免模板按钮过多挤占左侧列表空间。
- 将 GUI Editor `Cursors` 的新增鼠标光标入口同步改为单行下拉按钮，保持左侧资源列表的可用空间。

## [0.4.13] - 2026-04-26

### Added

- 新增 launcher 侧 Visual Editor 本地桥接服务，打开编辑器时会传入 `bridge` 与一次性 `token`，前端可安全写回当前项目。
- 新增真实项目状态保存：主编辑器与 GUI 编辑器会在保留 `localStorage` 草稿的同时，同步写入 `<project>/visual_editor/project.json`。
- 新增真实导出：主编辑器 `Export` 会生成并写入 `<project>/game/generated_visual_editor.rpy`，覆盖项目设置、定义、资源、GUI 与 label 图。
- 在 launcher 项目页新增 `Sync Visual Editor` 入口，可打开编辑器并自动执行一次状态同步与 `.rpy` 导出。

### Changed

- `visual_editor/README.md` 更新为当前持久化模型说明，明确 `localStorage` 只是兜底草稿，`visual_editor/project.json` 才是 launcher 打开后的项目状态源。
- 主编辑器与 GUI 编辑器互相跳转时会保留 launcher bridge 参数，避免进入 GUI 页后丢失真保存能力。

## [0.4.12] - 2026-04-26

### Added

- 为 `GUI Editor` 新增独立的 `Python UI` 分栏，可集中管理 `Action`、`BarValue`、`InputValue`、`restart_interaction()` helper 和 `renpy.define_screen()` helper 模板。
- 为 `Python UI` 新增 `Displayable Class` 和 `Custom Statement` 两类模板，可生成 `renpy.Displayable` 子类与 `python early: renpy.register_statement(...)` 骨架代码。
- 为上述 Python UI 模板新增代码生成与使用提示，方便直接接到现有 `Screens` 节点的 Raw Action / Raw Value 工作流里。
- 为 `Python UI` 模块新增基础诊断，能检查缺失的 `get_adjustment()`、`get_text()/set_text()`、`define_screen` 名称冲突和缺失的刷新目标。

### Changed

- 主编辑器对 GUI 状态的兼容保留范围继续扩大，新增的 `pythonUiHelpers` 不会在回到主页面后丢失。
- 主编辑器的 GUI 概览统计现在会显示 `Python UI` 模板数量，方便确认高级界面脚本资产是否已经建好。
- `Python UI` 详情页说明更新为覆盖 `Displayable` 与 creator-defined statement，两类模板会根据字段动态切换到对应的方法面板。

## [0.4.11] - 2026-04-25

### Added

- 为 `GUI Editor > Config & Defaults` 新增 `GUI Preference` 条目类型，可生成 `define gui.* = gui.preference(...)` 绑定。
- 为 `GUI Editor > Screens` 的 action 列表新增 `gui.SetPreference(...)`、`gui.TogglePreference(...)` 和 `Function(gui.rebuild)`。
- 为 `preferences` 特殊 screen 模板补充高级 GUI 示例，直接展示字体切换和字号切换用法。

### Changed

- `Config & Defaults` 详情表单现在会根据 scope 动态切换字段标签、占位提示和说明，不再把 GUI preference 误混到普通 `preferences` / `store` 条目里。
- `Diagnostics` 现在会检查 screen 里的 GUI preference action 是否引用了已定义的 GUI preference，并对 `gui.rebuild` 给出性能提示。
- 主编辑器对 GUI 数据的兼容保留范围扩大，新增的 `guiPreferences` 不会在回到主页面后被清掉。

## [0.4.10] - 2026-04-25

### Added

- 为主编辑器 `Settings` 面板新增 `Save / Rollback Settings`，可配置 `config.has_autosave`、`config.autosave_frequency`、`config.has_quicksave`、`config.rollback_enabled`、`config.rollback_length`、`config.hard_rollback_limit` 和 `config.fix_rollback_without_choice`。
- 为上述存档与回滚配置新增实时代码预览，方便直接对照生成的 `define config.*` 语句。
- 为 `GUI Editor > Screens` 的节点 action 列表补充 `FileSave`、`FileLoad`、`FileDelete`、`FilePage`、`FilePageNext`、`FilePagePrevious`、`QuickSave` 和 `QuickLoad`。

### Changed

- `save` / `load` 特殊 screen 模板现在升级为更接近 Ren'Py 默认文件页的可用骨架，包含页签切换、自动存档/快速存档入口、页名输入、槽位循环、缩略图和存档名展示。
- 主编辑器统计面板现在会显示当前项目的存档特性与回滚状态，方便快速确认项目级设置。

## [0.4.9] - 2026-04-25

### Added

- 为主编辑器新增独立的 `Achievements` 资源栏，可定义成就名称、标题、说明、Steam 名映射以及进度型 `stat_max / stat_modulo`。
- 为主剧情画布新增 `Achievement Block`，支持 `grant / progress / clear / sync` 四种运行时动作。
- 为 `Condition` 和 `Choice` 的条件系统新增 `achievement.has(...)` 可视化模式，支持“已获得 / 未获得”两种判断。
- 为成就详情新增注册代码预览与常用运行时/GUI 用法预览，方便直接对照 Ren'Py 成就 API。
- 为 `GUI Editor > Screens` 的 action 选择新增 `achievement.Sync()`，可直接做成就同步按钮。

### Changed

- 主编辑器统计面板现在会显示项目内成就数量。
- 条件表达式生成逻辑现在可以同时覆盖变量判断和成就判断，减少手写表达式的需要。

## [0.4.8] - 2026-04-24

### Added

- 为主编辑器 `Settings` 面板新增 `Keymap Settings`，可直接配置常用 `config.keymap` 事件。
- 新增常用按键事件预设，包括对话推进、回滚、菜单、跳过、焦点移动、输入框编辑、viewport 和 bar 控件。
- 新增自定义 keymap 事件入口，允许项目额外添加不在预设列表中的事件名。
- 为每个 keymap 事件新增 `Raw Override Expression` 兜底输入，可直接写表达式覆盖可视化列表输出。

### Changed

- 项目设置代码预览现在会额外生成 `config.keymap[...]` 覆盖代码，并且只输出被项目实际修改过的事件。
- `Settings` 面板的项目级配置范围进一步扩展，不再只覆盖语音和 side image。

## [0.4.7] - 2026-04-24

### Added

- 为主剧情画布新增 `Screen Block`，支持 `show screen / call screen / hide screen` 三种调用方式。
- 为 `Screen Block` 新增 GUI screen 建议列表、参数输入、`call screen` 返回值保存和代码生成。
- 为 `GUI Editor > Screens` 新增特殊 screen 的自动接管提示，明确哪些 screen 通常由 Ren'Py 自动调用。

### Changed

- 主编辑器的 `Screen Block` inspector 现在会区分特殊 screen 与普通自定义 screen，并在缺失定义时给出更明确的提示。
- `GUI Editor` 的 screen 列表现在会标记 `say / choice / input / preferences` 等自动管理的特殊 screen，降低误以为必须手动调用的概率。

## [0.4.6] - 2026-04-24

### Added

- 为主编辑器的 label 代码预览页新增 `Replay` 配置表单，可直接启用回放、设置按钮文本、锁定模式、scope 和自动 `renpy.end_replay()`。
- 为 `GUI Editor` 新增 `Extras` 工作区内的 `Replay / Music Rooms / Galleries` 三块实际可用的编辑流。
- 为 `MusicRoom()` 新增曲目列表编辑、导入音频引用、手动文件路径回退和代码预览。
- 为 `Gallery()` 新增按钮列表编辑、条件行、图片行、缩略图与 `make_button()` 代码预览。

### Changed

- 主编辑器的 `gui` 状态模型现在会保留 `replayMenu / musicRooms / galleries`，避免在两个编辑器之间来回切换时丢失 Extras 数据。
- `GUI Editor` 左侧导航统计现在会把 `Extras` 计入数量，并在设置面板中显示 `Replay / Music / Gallery` 概览。
- `Music Room` 表单中的动作字段更明确对应 `stop_action`，生成代码时与 Ren'Py 文档保持一致。

## [0.4.5] - 2026-04-24

### Added

- 为主编辑器的 `Settings` 面板新增 `Side Image Settings`，覆盖常用的 `config.side_image_*` 配置项与代码预览。
- 为图片定义新增 `Define As Side Image` 工作流，可直接生成 `image side ...` 形式的代码。
- 为 `GUI Editor` 的 `say` 模板接入 `SideImage()` 节点与近似头像预览。

### Changed

- 将角色资源字段中的 `Image Tag` 明确改为 `Linked Image Tag`，更贴近 `Character(image=...)` 的真实含义。
- 为 `GUI Editor` 的 `say` 诊断补充 `SideImage()` 缺失提示，方便排查头像为什么不显示。
- 为主编辑器补充可复用的图像标签建议列表，同时服务角色 linked image tag 和 side image 配置。

## [0.4.4] - 2026-04-24

### Added

- 为 `GUI Editor` 的 `input` 节点补充 `InputValue` 工作流，区分普通 `Value` 和 `InputValue` 绑定。
- 为 `GUI Editor` 的 `input` 节点补充输入专用属性，包括初始文本、字符限制、长度、像素宽度、掩码和复制粘贴开关。
- 在主剧情画布中新增 `Input Block`，用于可视化生成 `renpy.input()` 逻辑。

### Changed

- 将 `GUI Editor` 的特殊 `input` 模板改为更贴近官方文档的结构：`screen input(prompt)` 与 `input id "input"`。
- 为 `GUI Editor` 的 `Screens` 诊断系统补充 `input` 特殊界面检查和 `InputValue` 缺失提示。
- 为主剧情画布的 `Input Block` 增加空值回退、自动 `strip()` 和常见输入参数生成。

## [0.4.3] - 2026-04-24

### Changed

- 修正 `GUI Editor` 中 `Screens` 左侧底部操作区的横向溢出问题。
- 为模板选择框和底部按钮补充宽度约束与自动换行规则，避免长文本把整个侧栏撑出范围。

## [0.4.2] - 2026-04-24

### Changed

- 调整 `GUI Editor` 中 `Screens` 模块的详情区排版，拆分为 `Screen Detail / Node Tree / Node Inspector` 三段式结构。
- 修正 `Screens` 详情容器缺少通用表单栈布局的问题，统一与其他 GUI 面板的间距和卡片层次。
- 优化节点树区域的滚动与删除按钮位置，减少信息挤压和视觉混乱。

## [0.4.1] - 2026-04-24

### Added

- 新增 `GUI Editor` 的 `Screens` 模块，支持 screen 基本信息编辑、节点树编辑和节点增删改。
- 新增常用 screen 语言节点支持，包括文本、按钮、图片按钮、布局容器、条件、循环、use、default、timer、key、transform 等。
- 新增特殊界面模板库，可从模板创建 `say`、`choice`、`input`、`nvl`、`notify`、`skip_indicator`、`ctc`、`main_menu`、`navigation`、`save`、`load`、`preferences`、`confirm`。
- 新增 `Action / Value` 表单编辑，支持常用行为和值构造器，并保留原始表达式兜底。
- 新增 GUI 近似实时预览区，用于快速检查 screen 结构和布局意图。
- 新增 `Config / Preferences / Store` 编辑模块与统一代码输出。
- 新增 `Cursors` 编辑模块，覆盖硬件鼠标光标、可视组件光标和使用片段。
- 新增 `Text Shaders` 编辑模块，覆盖默认文本着色器、样式文本着色器、回调映射和自定义注册。
- 新增 `Diagnostics` 面板，对 screen 结构、缺失 action/value、未定义光标、样式目标缺失等问题给出静态检查结果。

### Changed

- `GUI Editor` 左侧导航从单一样式入口扩展为完整的多模块工作区。
- 代码生成从单纯的 style 语句扩展为 screen、config、cursor、shader 多模块输出。

## [0.4.0] - 2026-04-24

### Added

- 新增独立的 `GUI Editor` 页面骨架与主编辑器入口。
- 建立 `gui.styles`、`gui.screens`、`gui.config`、`gui.preferences`、`gui.store`、`gui.cursors`、`gui.textShaders` 数据模型。
- 新增 `Style` 编辑器 MVP，支持样式列表、详情表单和代码预览。
- 新增类型化样式属性编辑，覆盖 `color / bool / int / float / position / tuple / displayable / string`。
- 新增状态前缀编辑系统，支持 `base / idle / hover / selected / insensitive / selected_idle / selected_hover / selected_insensitive`。
- 新增高频样式分类面板，覆盖 `Text / Window / Button / Bar / Box / Grid / Margin`。

### Changed

- `GUI Editor` 的代码输出更适合直接生成 Ren'Py `style` 语句。
- 样式输入对表达式和字符串做了更谨慎的区分，减少误加引号的问题。

## [0.3.0] - 2026-04-10

### Added

- 新增 `Live2D` 独立资源栏，并接入主编辑器资源体系。
- 新增 `Live2D` 资源在 `image block` 中的专用 inspector 字段，包括动作、表情和附加属性。
- 新增 `Layered Image` 定义编辑器，支持 `always / group / attribute / default / null / auto / multiple / when / at`。
- 新增 `Layered Image` 在 `image block` 中的属性选择区，允许 block 使用时单独指定 group/attribute。
- 新增 `matrixcolor` 预设构建器与自定义表达式兜底。
- 新增 image 定义中的 transform/ATL 编辑补充。

### Changed

- 图片定义体系从单纯静态图扩展为更接近 Ren'Py 实际资源系统的复合定义结构。
- 右侧 inspector 会根据选中的资源类型切换不同的专用表单。

## [0.2.0] - 2026-04-01

### Added

- 新增角色、图像、音频、变量、定义等资源侧栏与详情页。
- 新增角色定义、图像资源分类、音频资源分类、语音归属和旁白语音支持。
- 新增右键删除、重命名、确认删除等资源管理行为。
- 新增 voice 相关工作流，包括角色语音归属、对话块语音勾选和按角色过滤语音选择。

### Changed

- 左侧侧栏信息架构进行了多轮重组，分离项目、label、资源和详情内容。
- Inspector 和资源面板的交互方式从原型状态逐步统一为“列表 + 详情”的工作流。

## [0.1.3] - 2026-03-16

### Added

- 新增画布平移、缩放、节点拖拽、Inspector 收展和新建 block 悬浮入口。
- 新增 block 连接系统，支持从一个 block 的输出拖到另一个 block 的输入形成逻辑顺序。
- 新增 `start` 节点的逻辑约束，使每个 label 默认只有一个起始节点。
- 新增更多 block 类型与逻辑结构支持，包括对话、菜单、跳转/调用/返回、条件、Python、图像、动画、音频等。
- 新增基于连接顺序的 label 代码生成，而不是简单按创建顺序输出。
- 新增连接替换和连接取消行为，贴近图形化编辑习惯。

### Changed

- block 的表单逻辑逐步拆开，不再强行共用同一套字段。
- 节点编辑与代码生成越来越以 Ren'Py 逻辑约束为核心，而不是只做视觉原型。

## [0.1.2] - 2026-03-15

### Added

- 新增 label 列表管理、排序、重命名、代码预览和双击进入逻辑。
- 新增左侧栏多区切换、收起展开、图标入口和固定竖栏交互。
- 新增 Inspector 迁移和右侧详情布局，减少对画布可视区域的挤压。

### Changed

- 左侧栏经过多次布局调整，逐步形成“固定竖栏 + 可切换内容区”的结构。
- 拖拽排序动画和标签位置反馈经过修正，更接近预期体验。

## [0.1.1] - 2026-03-13

### Added

- 新增深色、低色彩偏向的原型界面方向。
- 新增画布铺满页面、侧栏隐藏和右下角新建入口等原型级交互尝试。
- 新增更贴近节点编辑器的界面布局探索。

### Changed

- 视觉方向从初始原型逐步调整为更克制、偏护眼的中性深色界面。
- 页面空间分配开始围绕“把有效编辑区域最大化”这个目标优化。

## [0.1.0] - 2026-03-12

### Added

- 新增 `visual_editor/` 初始原型脚手架。
- 支持从 Ren'Py launcher 打开可视化编辑器页面。
- 新增项目路径解析、基础页面布局、占位画布和本地草稿存储。

### Notes

- 这是当前分支里可追溯的最早可视化编辑原型阶段。
