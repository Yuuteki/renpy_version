# Ren'Py Visual Editor Fork

一个基于 Ren'Py 的实验性分支，目标是在 Ren'Py Launcher 内集成适合视觉小说开发的可视化编辑器。

本仓库不是官方 Ren'Py SDK，也不是已经稳定发布的正式版本。当前更准确的定位是：一个进入预发布阶段的 Visual Editor 分支，重点验证 Launcher 集成、项目导入、GUI 编辑、资源处理和 `.rpy` 导出链路。

## 当前状态

- 当前预发布版本：`v0.5`
- `Alpha`：完整独立版，适合直接下载安装测试
- `Beta`：覆盖补丁版，适合已经安装 Ren'Py 的用户
- 当前主要验证平台：Windows

## 当前能力

- 从 Launcher 直接打开 `Visual Editor`
- 自动同步 `<project>/visual_editor/project.json`
- 手动导出 `<project>/game/generated_visual_editor.rpy`
- 集成 `GUI Editor`
- 首次导入旧项目中的 `options.rpy`、`gui.rpy`、`screens.rpy`
- 备份并接管旧 GUI / 脚本文件
- 项目健康检查、资源导入、路径匹配与运行前排查
- 主编辑器与 GUI 编辑器的中英文界面切换

## 下载建议

发布文件会放在 GitHub Releases 中。

- `Alpha`：适合想直接解压或安装后立刻体验的人
- `Beta`：适合已经有 Ren'Py 安装目录，想覆盖加入 Visual Editor 功能的人

## 仓库导航

最常用的目录和文件：

- [visual_editor](visual_editor) - Visual Editor 前端源码
- [visual_editor/README.md](visual_editor/README.md) - 编辑器与导出逻辑说明
- [launcher/game/project.rpy](launcher/game/project.rpy) - Launcher bridge 与项目侧逻辑
- [launcher/game/front_page.rpy](launcher/game/front_page.rpy) - Launcher 项目页入口
- [scripts/sync_visual_editor_runtime.py](scripts/sync_visual_editor_runtime.py) - 同步测试运行时
- [scripts/build_visual_editor_full.py](scripts/build_visual_editor_full.py) - 构建 `Alpha` 完整安装包
- [scripts/build_visual_editor_patch.py](scripts/build_visual_editor_patch.py) - 构建 `Beta` 覆盖安装包
- [packaging/windows](packaging/windows) - Windows 安装器脚本与说明
- [CHANGELOG.md](CHANGELOG.md) - 分支更新日志
- [NOTICE.md](NOTICE.md) - 上游与第三方许可证说明

与上游 Ren'Py 关系更强的目录：

- [renpy](renpy) - 引擎 Python 模块
- [launcher](launcher) - Launcher 项目
- [src](src) - 原生扩展源码
- [gui](gui) - 默认 GUI 模板
- [tutorial](tutorial) / [the_question](the_question) - 示例项目

## 开发与测试

当前默认维护方式：

- 根目录中的 [visual_editor](visual_editor) 和 [launcher/game](launcher/game) 是源码真身
- [renpy_test_runtime](renpy_test_runtime) 是 Windows 下的可运行测试副本
- 修改编辑器或 Launcher 集成后，先同步再测试

同步测试运行时：

```powershell
python scripts/sync_visual_editor_runtime.py
```

只检查是否分叉：

```powershell
python scripts/sync_visual_editor_runtime.py --check
```

## 文档入口

- 功能更新： [CHANGELOG.md](CHANGELOG.md)
- 编辑器说明： [visual_editor/README.md](visual_editor/README.md)
- Windows 完整安装包： [packaging/windows/FULL_INSTALLER.md](packaging/windows/FULL_INSTALLER.md)
- Windows 覆盖安装包： [packaging/windows/PATCH_INSTALLER.md](packaging/windows/PATCH_INSTALLER.md)

## 许可证

- 本分支中由 `Yuteki` 新增的 fork 专属内容，按 [MIT License](LICENSE) 发布
- 上游 Ren'Py 代码、运行时文件和仓库内第三方组件保留各自原始许可证
- 详细说明见 [NOTICE.md](NOTICE.md)

如果你分发本仓库、完整运行时或补丁安装包，请同时保留上游许可证和第三方许可证说明。
