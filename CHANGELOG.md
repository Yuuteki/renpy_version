# Changelog

本文件记录这个 Ren'Py 可视化编辑分支的重要更新。

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
