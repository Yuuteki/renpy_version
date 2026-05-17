# Ren'Py Visual Editor Fork

这是一个基于 Ren'Py 的实验性分支。  
我在做的事情很简单：把一个真正能用的可视化编辑器，接进 Ren'Py Launcher 里。

它现在还不是官方 SDK，也还不是“已经稳定可商用”的正式版本。更准确地说，它是一个已经跑通主链路、正在进入预发布测试阶段的工具分支。

如果你一直觉得 Ren'Py 很强，但写剧情、搭 GUI、接资源、反复导出脚本这套流程还不够顺手，那这个分支就是朝这个方向在努力。

## 现在到什么阶段了？

当前预发布版本：`v0.5`

这版已经把最重要的一些事情接起来了：

- 可以直接从 Launcher 打开 `Visual Editor`
- 可以把编辑状态同步到 `<project>/visual_editor/project.json`
- 可以手动导出到 `<project>/game/generated_visual_editor.rpy`
- 有独立的 `GUI Editor`
- 能导入旧项目里的 `options.rpy`、`gui.rpy`、`screens.rpy`
- 能在接管旧 GUI / 脚本文件前自动备份
- 有资源导入、路径处理和项目健康检查
- 编辑器支持中文和英文界面切换

一句话说：  
**它已经不只是概念验证了，而是一个可以真正拿来测试工作流的版本。**

## 我应该下载哪个版本？

发布文件会放在 GitHub Releases 里，目前分成两类：

### Alpha

完整独立版，适合大多数人。

如果你只是想：

- 尽快装上试试
- 不想动你现有的 Ren'Py 安装目录
- 想把测试环境和正式环境分开

那就优先下载 `Alpha`。

### Beta

覆盖补丁版，适合已经安装了 Ren'Py 的用户。

如果你：

- 已经有现成的 Ren'Py
- 想把 Visual Editor 功能补进现有安装
- 能接受“先备份、再覆盖、再测试”的流程

那就可以使用 `Beta`。

如果你不确定选哪个，默认选 `Alpha` 就对了。

## 这个仓库里最重要的内容

如果你只是想快速看懂这个仓库，先看这些：

- [visual_editor](visual_editor)  
  Visual Editor 前端源码

- [visual_editor/README.md](visual_editor/README.md)  
  编辑器本体、导入、导出、GUI 编辑等更细的说明

- [launcher/game/project.rpy](launcher/game/project.rpy)  
  Launcher bridge、项目读写、资源导入和接管逻辑

- [launcher/game/front_page.rpy](launcher/game/front_page.rpy)  
  Launcher 项目页入口

- [scripts/sync_visual_editor_runtime.py](scripts/sync_visual_editor_runtime.py)  
  把源码同步到 Windows 测试运行时

- [scripts/build_visual_editor_full.py](scripts/build_visual_editor_full.py)  
  构建 `Alpha` 完整安装包

- [scripts/build_visual_editor_patch.py](scripts/build_visual_editor_patch.py)  
  构建 `Beta` 覆盖安装包

- [packaging/windows](packaging/windows)  
  Windows 安装器脚本和打包说明

- [CHANGELOG.md](CHANGELOG.md)  
  更新日志

## 如果你想直接开始测试

当前最稳的测试路径还是 Windows。

默认维护方式是：

- 根目录里的 [visual_editor](visual_editor) 和 [launcher/game](launcher/game) 是源码真身
- [renpy_test_runtime](renpy_test_runtime) 是可运行的 Windows 测试副本

如果你改了编辑器或 Launcher 集成代码，先同步运行时再测：

```powershell
python scripts/sync_visual_editor_runtime.py
```

如果你只想检查源码和运行时是不是已经分叉：

```powershell
python scripts/sync_visual_editor_runtime.py --check
```

## 这条分支更在意什么

这个项目现阶段关注的不是“把所有东西一次做满”，而是先把下面几件事做稳：

- Launcher 打开编辑器这条链路
- 项目状态保存
- `.rpy` 导出
- GUI 编辑
- 旧项目导入与接管
- 真正能在测试项目里反复使用

换句话说，我更关心它是不是**真的能帮人做项目**，而不只是“看起来像个编辑器”。

## 文档入口

- 功能更新： [CHANGELOG.md](CHANGELOG.md)
- 编辑器说明： [visual_editor/README.md](visual_editor/README.md)
- Windows 完整安装包： [packaging/windows/FULL_INSTALLER.md](packaging/windows/FULL_INSTALLER.md)
- Windows 覆盖安装包： [packaging/windows/PATCH_INSTALLER.md](packaging/windows/PATCH_INSTALLER.md)

## 许可证

- 本分支中由 `Yuteki` 新增的 fork 专属内容，按 [MIT License](LICENSE) 发布
- 上游 Ren'Py 代码、运行时文件和仓库内第三方组件保留各自原始许可证
- 更详细的说明见 [NOTICE.md](NOTICE.md)

如果你分发本仓库、完整运行时或补丁安装包，请同时保留上游许可证和第三方许可证说明。
