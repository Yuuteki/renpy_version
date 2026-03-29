=====================================
Ren'Py Source Fork for Visual Editing
=====================================

This repository is a development fork of the `Ren'Py <https://www.renpy.org>`_
visual novel engine.

It is intended to serve as a local baseline for custom development, with a
focus on exploring visual editing and visual scripting workflows on top of
Ren'Py.


Status
======

This repository currently contains a source import of Ren'Py and should be
treated as a custom fork rather than the official upstream project.

Unless explicitly noted otherwise:

* this repository is not the canonical Ren'Py source repository,
* upstream branch policies do not automatically apply here,
* local changes may diverge from upstream in structure, behavior, or release
  process.


Upstream Reference
==================

Official Ren'Py resources:

* Website: https://www.renpy.org
* Source repository: https://github.com/renpy/renpy
* Cross-compilation and runtime build system: https://github.com/renpy/renpy-build

If this fork is kept in sync with upstream, it is recommended to preserve an
``upstream`` git remote that points to the official Ren'Py repository.


Intended Direction
==================

The current intended direction of this fork is to investigate a more visual
editing experience for Ren'Py-based development.

The working assumption for this repository is:

* prefer additive tooling before invasive engine changes,
* keep the source tree buildable while experimentation is ongoing,
* document any intentional divergence from upstream behavior,
* keep licensing and attribution information intact.

In practice, that usually means trying launcher/editor/export-pipeline changes
before modifying the parser, AST, or runtime.


Repository Layout
=================

The most relevant top-level directories are:

* ``renpy/`` - core engine modules.
* ``renpy/common/`` - built-in Ren'Py script library loaded into projects.
* ``launcher/`` - the Ren'Py launcher project and related tooling.
* ``src/`` - C, Cython, and native extension sources.
* ``scripts/`` - build, release, translation, and maintenance scripts.
* ``gui/`` - default GUI template project.
* ``tutorial/`` - tutorial project and examples.
* ``the_question/`` - sample project.
* ``testcases/`` and ``unittests/`` - automated and semi-automated tests.
* ``sphinx/`` - documentation source and generation helpers.


Development Setup
=================

Ren'Py depends on a number of Python modules written in Cython and C. If you
only change pure Python modules, working against an existing build may be
enough. Changes to compiled modules require a local build.

The development scripts assume a POSIX-like environment. Linux and macOS are
the primary targets. Windows development is generally done through an MSYS-like
environment.


Option 1: Use an Existing Nightly Build
---------------------------------------

Nightly builds are available from:

   https://nightly.renpy.org

After unpacking a nightly build, run::

    ./after_checkout.sh <path-to-nightly>

This links the local source tree against the runtime components from the
nightly build.


Option 2: Build Locally
-----------------------

We recommend using a virtual environment and dependency manager. This repository
already includes configuration suitable for `uv <https://docs.astral.sh/uv/>`_.

Create the environment and install dependencies with::

    uv sync

Then build and run the project with::

    ./run.sh

If you only want to build the compiled modules without starting Ren'Py, run::

    ./run.sh --build


System Dependencies
-------------------

On Ubuntu or Debian, the required development packages can be installed with::

    sudo apt install python3-dev libassimp-dev libavcodec-dev libavformat-dev \
        libswresample-dev libswscale-dev libharfbuzz-dev libfreetype6-dev libfribidi-dev libsdl2-dev \
        libsdl2-image-dev libsdl2-gfx-dev libsdl2-mixer-dev libsdl2-ttf-dev libjpeg-dev pkg-config

Ren'Py requires SDL_image 2.6 or newer. If your distribution does not provide a
new enough version, you may need to build SDL_image separately.


Build Notes
===========

Where supported, Ren'Py will discover include directories and library paths via
``pkg-config``. If that is not available, include and library paths can be
provided through environment variables such as ``CFLAGS`` and ``LDFLAGS``.

If ``RENPY_CFLAGS`` is present and ``CFLAGS`` is not, ``setup.py`` will use
``RENPY_CFLAGS``. The same pattern applies to ``RENPY_LDFLAGS``, ``RENPY_CC``,
``RENPY_CXX``, and ``RENPY_LD``.

This repository's ``setup.py`` does not support cross-compilation. Use
``renpy-build`` for cross-platform packaging workflows.


Documentation
=============

Building the documentation requires a working Ren'Py environment plus Sphinx.

Install the documentation dependencies with::

    pip install -U sphinx sphinx_rtd_theme sphinx_rtd_dark_mode

Then build the docs from the ``sphinx`` directory::

    ./build.sh

The documentation source is primarily stored in ``sphinx/source`` together with
generated material derived from code docstrings.


Change Management
=================

If this fork is used as the basis for a larger project, a conservative workflow
is recommended:

* keep one branch that mirrors the imported upstream baseline,
* do feature work in dedicated branches,
* record any behavioral divergence from upstream in commit messages or release
  notes,
* avoid removing upstream copyright and license notices from source files.


License and Attribution
=======================

Most of Ren'Py is distributed under the MIT license, but the complete licensing
picture is broader because the engine and distributed binaries can include
third-party components under additional licenses, including LGPL-covered
dependencies.

Before redistributing binaries, packaged SDKs, or downstream products based on
this fork, review the full licensing information in:

* ``sphinx/source/license.rst``
* the copyright and license headers in the individual source files
* any third-party license files included in the source tree

If you publish this repository or a derivative of it, it is recommended to:

* state clearly that it is a modified fork based on Ren'Py,
* preserve upstream copyright notices,
* include or reference the full license information when redistributing.
