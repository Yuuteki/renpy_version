# Windows Patch Installer

这一套文件用于给“已经安装 Ren'Py 的用户”构建覆盖式补丁安装器。

补丁只包含当前分支真正改过的运行时文件：

- `visual_editor/**`
- `launcher/game/project.rpy`
- `launcher/game/front_page.rpy`

## 目录说明

- `visual_editor_patch.iss`
  - Inno Setup 安装器脚本。
- `../../scripts/build_visual_editor_patch.py`
  - 生成补丁 payload、补丁 zip，并可选调用 Inno Setup 编译安装器。

## 推荐流程

1. 先生成补丁 staging 目录：

```powershell
python scripts\build_visual_editor_patch.py --version 0.5-beta
```

2. 如果已经安装了 Inno Setup 6，再直接编译安装器：

```powershell
python scripts\build_visual_editor_patch.py --version 0.5-beta --compile-installer
```

当前建议的发布标识：

- `v0.5 Alpha`：完整便携版
- `v0.5 Beta`：现有 Ren'Py 用户用的覆盖安装器

## 输出位置

默认输出到：

```text
build/visual_editor_patch/<version>/
```

其中会包含：

- `patch_payload/`
- `renpy-visual-editor-patch-<version>-payload.zip`
- `installer/renpy-visual-editor-patch-<version>-setup.exe`（如果编译成功）

## 安装器行为

安装器会：

1. 让用户选择现有的 Ren'Py 根目录。
2. 校验该目录是否包含：
   - `renpy.exe`
   - `launcher/game/project.rpy`
   - `launcher/game/front_page.rpy`
3. 在覆盖前备份现有文件到：

```text
<RenPyRoot>/_visual_editor_backup/<version>-<timestamp>/
```

4. 覆盖 `visual_editor/` 和两个 launcher 文件。
5. 写入：

```text
<RenPyRoot>/_visual_editor_patch/last_install.txt
```

## 备注

- 这是补丁安装器，不是完整 Ren'Py 安装器。
- 它假设用户已经有一份可运行的 Ren'Py。
- 如果你要发“解压即用”的完整版本，建议单独使用 `renpy_test_runtime` 做便携包。
