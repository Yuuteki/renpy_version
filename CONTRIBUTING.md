# Contributing

如果你愿意一起把这个项目做得更好，先谢谢你。

这不是一个已经完全稳定、边界非常清晰的大型正式项目，而是一个正在快速迭代中的 Ren'Py Visual Editor 分支。也正因为这样，好的反馈、明确的问题报告、谨慎的小步改进，都会非常有价值。

## 先了解这个项目目前的状态

当前这条分支最在意的是把下面这些链路做稳：

- 从 Launcher 打开 `Visual Editor`
- 项目状态保存到 `visual_editor/project.json`
- 导出 `game/generated_visual_editor.rpy`
- GUI 编辑与 GUI 接管流程
- 旧项目导入、资源处理和基础健康检查

这意味着：

- 欢迎帮助修 bug、补体验、补文档、补提示
- 欢迎改善 Windows 下的真实工作流
- 欢迎改进导入、导出、GUI 编辑、汉化和项目健康检查
- 对于会大幅改变导出架构、深改 Ren'Py parser / runtime 的改动，最好先开 issue 或先讨论

## 最适合贡献的方向

如果你想找一个比较容易开始、也比较容易产生价值的切入点，可以优先看这些：

- Visual Editor / GUI Editor 的 bug 修复
- Windows 下 Launcher 打开、同步、导出相关问题
- GUI 接管、旧项目导入、资源路径处理问题
- 中文 / 英文界面文案和国际化改进
- 表单可用性、状态提示、错误提示、健康检查体验
- 文档、发布说明和测试说明

## 开始之前建议先看这些文件

- [README.md](README.md)
- [CHANGELOG.md](CHANGELOG.md)
- [visual_editor/README.md](visual_editor/README.md)
- [launcher/game/project.rpy](launcher/game/project.rpy)
- [launcher/game/front_page.rpy](launcher/game/front_page.rpy)
- [visual_editor/app.js](visual_editor/app.js)
- [visual_editor/gui_editor.js](visual_editor/gui_editor.js)

如果你想看 Windows 打包流程，也可以再看：

- [scripts/build_visual_editor_full.py](scripts/build_visual_editor_full.py)
- [scripts/build_visual_editor_patch.py](scripts/build_visual_editor_patch.py)
- [packaging/windows/FULL_INSTALLER.md](packaging/windows/FULL_INSTALLER.md)
- [packaging/windows/PATCH_INSTALLER.md](packaging/windows/PATCH_INSTALLER.md)

## 本地测试建议

当前最稳的测试环境还是 Windows。

默认维护方式是：

- 根目录中的 [visual_editor](visual_editor) 和 [launcher/game](launcher/game) 是源码真身
- [renpy_test_runtime](renpy_test_runtime) 是可运行的测试副本

如果你修改了编辑器或 Launcher 集成相关代码，通常建议先同步运行时：

```powershell
python scripts/sync_visual_editor_runtime.py
```

如果你只是想检查源码和运行时是否分叉：

```powershell
python scripts/sync_visual_editor_runtime.py --check
```

## 提交 PR 前，至少帮忙确认这些事

如果改动碰到了主链路，最好至少手动确认：

- 能从 Launcher 正常打开 `Visual Editor`
- `project.json` 能正常保存
- `.rpy` 能正常导出
- 如果碰到 GUI 相关代码，GUI Editor 基本流程没有被带坏
- 如果碰到资源相关代码，导入后的路径仍然能被 Ren'Py 识别

如果你改的是文案、README 或非运行路径的脚本，说明你验证了什么就很好。

## 提 Issue 的方式

如果你不是马上写代码，而是先报问题，欢迎尽量带上这些信息：

- 使用的是 `Alpha` 还是 `Beta`
- 操作系统
- Ren'Py 基础版本
- 复现步骤
- 预期行为
- 实际行为
- 报错截图、控制台输出或生成的 `.rpy` 片段

对这类项目来说，“能稳定复现”通常比“描述得很着急”更有帮助。

## 关于风格和改动范围

这条分支现在更适合：

- 小步提交
- 明确目标
- 尽量避免把无关改动混在一起

如果一个 PR 同时改了：

- 编辑器 UI
- 导出逻辑
- 运行时 bridge
- 打包脚本

那后面回归和排查都会比较痛苦。能拆开的时候，尽量拆开。

## 许可证提醒

本分支中由 `Yuteki` 新增的 fork 专属内容按 [MIT License](LICENSE) 发布。  
上游 Ren'Py 代码和仓库内第三方组件仍保留原始许可证。更详细说明见 [NOTICE.md](NOTICE.md)。

如果你提交贡献，默认表示你同意你的改动在这个项目中按相同许可方式分发。
