# Changelog

本文件记录这个 Ren'Py 可视化编辑分支的重要更新。

版本规则：

- 在 `v1.0.0` 发布前，所有版本都使用 `0.x.y`。
- `0.x.0` 表示一个明显的功能阶段或里程碑更新。
- `0.x.y` 表示该阶段内的修正、补强或小范围迭代。
- `v1.0.0` 保留给首个可对外发布的稳定版本。

维护规则：

- 新版本永远追加在最上方。
- 每次更新至少写清楚日期、版本号、核心功能变更。
- 优先记录“用户可感知”的变化，而不是纯内部重构。
- 如果某次更新横跨多个模块，按功能大项拆分成 `Added / Changed / Fixed / Planned`。

历史说明：

- 下面的早期版本条目是根据当前代码状态和开发记录回补整理的里程碑摘要。
- 因为早期缺少严格维护的发布日志，所以这些历史阶段统一使用本次整理日期 `2026-04-24` 归档。
- 从这份文件建立之后，后续版本应使用真实更新日期继续追加。

## [Unreleased]

### Planned

- 将 GUI 编辑器和主可视化编辑器进一步打通，补更多真实导出和联调验证。
- 从浏览器 `localStorage` 逐步过渡到项目级持久化文件。
- 补充更多 Ren'Py 特有 GUI 细节、样式属性和 screen 语言细节验证。
- 为 `v0.9.x` 到 `v1.0.0` 的发布整理测试清单、导出清单和兼容性检查。

## [0.8.0] - 2026-04-24

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

## [0.7.0] - 2026-04-24

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

## [0.6.0] - 2026-04-24

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

## [0.5.0] - 2026-04-24

### Added

- 新增角色、图像、音频、变量、定义等资源侧栏与详情页。
- 新增角色定义、图像资源分类、音频资源分类、语音归属和旁白语音支持。
- 新增右键删除、重命名、确认删除等资源管理行为。
- 新增 voice 相关工作流，包括角色语音归属、对话块语音勾选和按角色过滤语音选择。

### Changed

- 左侧侧栏信息架构进行了多轮重组，分离项目、label、资源和详情内容。
- Inspector 和资源面板的交互方式从原型状态逐步统一为“列表 + 详情”的工作流。

## [0.4.0] - 2026-04-24

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

## [0.3.0] - 2026-04-24

### Added

- 新增 label 列表管理、排序、重命名、代码预览和双击进入逻辑。
- 新增左侧栏多区切换、收起展开、图标入口和固定竖栏交互。
- 新增 Inspector 迁移和右侧详情布局，减少对画布可视区域的挤压。

### Changed

- 左侧栏经过多次布局调整，逐步形成“固定竖栏 + 可切换内容区”的结构。
- 拖拽排序动画和标签位置反馈经过修正，更接近预期体验。

## [0.2.0] - 2026-04-24

### Added

- 新增深色、低色彩偏向的原型界面方向。
- 新增画布铺满页面、侧栏隐藏和右下角新建入口等原型级交互尝试。
- 新增更贴近节点编辑器的界面布局探索。

### Changed

- 视觉方向从初始原型逐步调整为更克制、偏护眼的中性深色界面。
- 页面空间分配开始围绕“把有效编辑区域最大化”这个目标优化。

## [0.1.0] - 2026-04-24

### Added

- 新增 `visual_editor/` 初始原型脚手架。
- 支持从 Ren'Py launcher 打开可视化编辑器页面。
- 新增项目路径解析、基础页面布局、占位画布和本地草稿存储。

### Notes

- 这是当前分支里可追溯的最早可视化编辑原型阶段。

## Release Roadmap

### [0.9.0] - Planned

- 进入发布前稳定化阶段。
- 补全项目级保存、导出链路、launcher 联调、错误处理和真实使用流程验证。
- 针对 GUI 编辑器、资源编辑器和 block 编辑器做一轮集中打磨与缺陷修复。

### [1.0.0] - Planned

- 首个可对外说明和演示的稳定版本。
- 目标是具备完整的基础可视化工作流：资源定义、脚本图编辑、GUI 编辑、代码生成、基础诊断与发布前整理。
