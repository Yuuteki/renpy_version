# Windows Full Alpha Installer

这一套文件用于构建 `v0.5 Alpha` 的完整安装器。

它不是覆盖已有 Ren'Py 的补丁，而是一份基于 `renpy_test_runtime/` 的完整可安装运行环境。

## 构建入口

- `../../scripts/build_visual_editor_full.py`
  - 生成完整 bundle、zip，并可选调用 Inno Setup 编译安装器。
- `visual_editor_full.iss`
  - Inno Setup 完整安装器脚本。

## 推荐流程

先生成 staging 目录：

```powershell
python scripts\build_visual_editor_full.py --version 0.5
```

如果已经安装了 Inno Setup 6，再直接编译安装器：

```powershell
python scripts\build_visual_editor_full.py --version 0.5 --compile-installer
```

## 输出位置

默认输出到：

```text
build/visual_editor_full/<version>/
```

其中会包含：

- `bundle/`
- `renpy-visual-editor-v<version>-alpha.zip`
- `installer/renpy-visual-editor-v<version>-alpha-setup.exe`

## 打包来源

完整 Alpha 包基于：

- `renpy_test_runtime/`

但会自动排除以下运行残留：

- `tmp/`
- `saves/`
- `cache/`
- `log.txt`
- `errors.txt`
- `traceback.txt`
- `lint.txt`

## 安装器行为

安装器会：

1. 把完整运行环境安装到独立目录。
2. 默认目录形如：

```text
C:\Program Files\RenPy Visual Editor\<version>\
```

实际默认目录会带上 Alpha 渠道标识，例如：

```text
C:\Program Files\RenPy Visual Editor\v0.5-alpha\
```

3. 可选创建桌面快捷方式。
4. 安装完成后可直接启动 `renpy.exe`。

## 发布定位

- `v0.5 Alpha`：完整独立安装版
- `v0.5 Beta`：现有 Ren'Py 用户用的覆盖安装器
