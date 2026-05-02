=============================
Ren'Py Visual Editor Fork
=============================

本仓库是基于 `Ren'Py <https://www.renpy.org>`_ 源码的实验性分支，
目标是在 Ren'Py launcher 内集成一个面向视觉小说开发的可视化编辑器。

它不是官方 Ren'Py 仓库，也不是已经稳定发布的 SDK。当前项目更准确的定位是：
一个正在进入内测阶段的 Ren'Py 可视化编辑工具原型。它已经具备 launcher 集成、
项目状态保存、Ren'Py 脚本导出、GUI 编辑和旧项目接管等核心链路，但仍需要在真实
项目中持续验证生成代码、导入兼容性和边界情况。


当前状态
========

当前里程碑：``0.4.14``，详见 [CHANGELOG.md](CHANGELOG.md)。

已经完成的主链路：

* 在 Ren'Py launcher 的项目页中打开 ``Visual Editor``。
* 通过 launcher 本地 bridge 服务托管编辑器页面，而不是直接依赖 ``file://``。
* 将编辑器状态保存到项目内的 ``visual_editor/project.json``。
* 将生成脚本导出到项目内的 ``game/generated_visual_editor.rpy``。
* 在首次打开时尝试从已有 ``game/options.rpy``、``game/gui.rpy``、
  ``game/screens.rpy`` 导入可识别设置。
* 支持备份并接管旧 GUI 文件，减少旧 ``options/gui/screens`` 与新生成文件互相覆盖。
* 已在 Windows 测试运行环境中跑通 launcher 与编辑器的基本集成。

仍需继续验证的部分：

* 复杂真实项目中的导入完整性。
* 生成的 ``.rpy`` 在更多 Ren'Py 项目中的 lint / run 结果。
* 各类 block 的边界参数、空值、冲突命名和旧工程迁移行为。
* GUI Editor 的大规模 screen / style 编辑体验。


核心功能
========

Visual Editor
-------------

``visual_editor/index.html`` 是主编辑器页面，负责剧情图、资源面板和导出工作流。

当前覆盖的主要能力包括：

* 每个 label 使用独立 graph 管理。
* 画布支持拖动、缩放、节点拖拽和 block 接线。
* 支持 start、dialogue、image、animation、audio、menu、condition、flow、
  python、screen、input、achievement 等 block 类型。
* 支持角色、图像、Live2D、音频、变量、成就、定义和项目设置等资源栏。
* 支持按连接顺序生成 label 代码，未连接 block 不会进入 label 输出。
* 支持从左侧资源中选择角色、图片、音频等，减少手写引用。

GUI Editor
----------

``visual_editor/gui_editor.html`` 是 GUI 专用编辑器页面。

当前覆盖的主要能力包括：

* ``style`` 定义和常见 style property 编辑。
* ``screen`` 结构编辑，包括 screen language 节点、action、value 和 input value。
* GUI config / default / preference / store 条目管理。
* Python UI helper 模板，包括 ``Action``、``BarValue``、``InputValue``、
  ``renpy.Displayable``、creator-defined statement、``restart_interaction`` helper
  和 ``renpy.define_screen`` helper。
* 鼠标光标、文本 shader、回想菜单、音乐室和图库相关配置。
* GUI 诊断与预览，用于提示常见缺失项和潜在冲突。

Launcher Bridge
---------------

launcher 中的 ``launcher/game/project.rpy`` 提供本地 bridge 服务。编辑器从 launcher
打开时，会通过类似下面的地址加载：

::

    http://127.0.0.1:<port>/editor/index.html?project=<path>&bridge=<url>&token=<token>

bridge 当前负责：

* 托管 ``visual_editor`` 前端文件。
* 读写 ``visual_editor/project.json``。
* 写入 ``game/generated_visual_editor.rpy``。
* 扫描项目内已有 label / screen / define 等符号。
* 导入资源文件。
* 生成项目健康检查信息。
* 接管或清理旧 GUI / 脚本文件。


保存与导出模型
==============

编辑器采用三层模型：

* 浏览器 ``localStorage``：兜底草稿，仅用于 bridge 不可用时避免立即丢数据。
* ``<project>/visual_editor/project.json``：打开 launcher bridge 后的项目状态源。
* ``<project>/game/generated_visual_editor.rpy``：生成输出文件，不建议手写修改。

推荐工作流：

1. 从 Ren'Py launcher 打开目标项目。
2. 点击项目页中的 ``Visual Editor``。
3. 在编辑器中修改角色、资源、label graph 或 GUI。
4. 确认状态自动同步到 ``visual_editor/project.json``。
5. 点击导出，刷新 ``game/generated_visual_editor.rpy``。
6. 回到 Ren'Py launcher 运行项目或执行 lint。

如果需要接管旧 GUI 文件，编辑器会先备份再移除原 ``options.rpy``、``gui.rpy``、
``screens.rpy`` 及匹配的 ``.rpyc`` 文件，然后刷新生成文件。执行前应确保项目已经
纳入版本管理或另有备份。


如何运行
========

推荐方式：Windows 测试运行环境
------------------------------

当前实际跑通的方式是在 Windows 上使用完整 Ren'Py nightly / SDK 或仓库内同步的
``renpy_test_runtime`` 测试环境。

推荐步骤：

1. 打开可运行的 Ren'Py launcher。
2. 选择一个测试项目，避免直接使用唯一的正式项目。
3. 在项目页点击 ``Visual Editor``。
4. 修改少量内容并导出。
5. 运行项目或执行 lint，确认生成脚本可用。

源码方式：macOS / Linux
----------------------

本仓库本身是 Ren'Py 源码树，不是完整预编译 SDK。直接运行源码需要先准备虚拟环境和
运行时依赖。

可参考 Ren'Py 源码流程：

::

    uv sync
    ./run.sh launcher

如果本地没有完整运行时组件，可以先下载 nightly build，然后执行：

::

    ./after_checkout.sh <path-to-nightly>

再尝试运行：

::

    ./run.sh launcher

在 macOS 上如果看到：

::

    Please create a virtual environment first (see the README).

说明还没有完成源码开发环境初始化。


目录结构
========

本项目中最重要的目录和文件：

* ``visual_editor/`` - 可视化编辑器前端。
* ``visual_editor/index.html`` - 主 Visual Editor 页面。
* ``visual_editor/gui_editor.html`` - GUI Editor 页面。
* ``visual_editor/app.js`` - 主编辑器状态、交互和导出逻辑。
* ``visual_editor/gui_editor.js`` - GUI 编辑器状态、预览、诊断和代码生成逻辑。
* ``visual_editor/i18n.js`` - 前端国际化和汉化文案层。
* ``launcher/game/project.rpy`` - launcher 项目逻辑与 Visual Editor bridge。
* ``launcher/game/front_page.rpy`` - launcher 项目页入口按钮。
* ``renpy_test_runtime/`` - Windows 测试运行环境镜像。
* ``Request_HTML/`` - 开发过程中参考的 Ren'Py 文档整理材料。
* ``CHANGELOG.md`` - 本分支的功能更新日志。

Ren'Py 原始源码相关目录：

* ``renpy/`` - Ren'Py 引擎 Python 模块。
* ``renpy/common/`` - Ren'Py 内置脚本库。
* ``launcher/`` - Ren'Py launcher 项目。
* ``src/`` - C / Cython / native 扩展源码。
* ``gui/`` - 默认 GUI 模板项目。
* ``tutorial/``、``the_question/`` - 示例项目。
* ``sphinx/`` - 官方文档源码。


开发原则
========

当前分支优先遵循以下原则：

* 优先做 launcher / editor / export pipeline 的增量工具，不轻易侵入 Ren'Py parser
  和 runtime。
* 项目状态以 ``visual_editor/project.json`` 为核心，生成文件可重复导出。
* 对旧项目文件进行接管或删除前必须备份。
* 保留上游 Ren'Py 的版权、许可证和归属说明。
* 每次功能大更新写入 ``CHANGELOG.md``，为未来 ``v1.0`` 发布积累记录。


路线图
======

短期目标：

* 完成真实项目的端到端内测。
* 修复生成 ``.rpy`` 的语法和语义问题。
* 补全常见 block 的空值校验和冲突提示。
* 继续整理 GUI Editor 的布局和汉化体验。

中期目标：

* 将导出质量提升到可用于小型真实项目。
* 为旧项目迁移提供更清晰的预览、确认和回滚说明。
* 建立一组示例项目和验收用例。
* 整理 v1.0 发布清单。

暂不优先处理：

* 深度修改 Ren'Py parser / AST。
* 直接替换官方 Ren'Py launcher 的完整发布流程。
* 过早打包为独立桌面软件。


上游与许可证
============

本仓库基于 Ren'Py。官方资源如下：

* Ren'Py 官网：https://www.renpy.org
* 官方源码仓库：https://github.com/renpy/renpy
* 构建系统：https://github.com/renpy/renpy-build

Ren'Py 大部分代码使用 MIT 许可证，但完整分发可能包含其他第三方组件和许可证要求。
发布二进制、SDK 或衍生项目之前，应检查：

* ``sphinx/source/license.rst``
* 源码文件中的版权和许可证头
* 仓库内第三方组件的许可证文件

如果发布本仓库或其衍生版本，应明确说明它是基于 Ren'Py 的修改分支，并保留上游版权
和许可证信息。
