#!/usr/bin/env python3
"""
Synchronize the Visual Editor source tree into renpy_test_runtime.

The repository root is the source of truth. The runtime directory is only a
launchable test copy, so this script copies editor and launcher integration
files from the root tree into renpy_test_runtime.
"""

from __future__ import annotations

import argparse
import filecmp
import shutil
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
RUNTIME = ROOT / "renpy_test_runtime"

VISUAL_EDITOR_DIR = ROOT / "visual_editor"
RUNTIME_VISUAL_EDITOR_DIR = RUNTIME / "visual_editor"

LAUNCHER_FILES = [
    ROOT / "launcher" / "game" / "project.rpy",
    ROOT / "launcher" / "game" / "front_page.rpy",
]


def iter_source_files() -> list[tuple[Path, Path]]:
    pairs: list[tuple[Path, Path]] = []

    for source in sorted(VISUAL_EDITOR_DIR.rglob("*")):
        if source.is_file():
            relative = source.relative_to(VISUAL_EDITOR_DIR)
            pairs.append((source, RUNTIME_VISUAL_EDITOR_DIR / relative))

    for source in LAUNCHER_FILES:
        relative = source.relative_to(ROOT)
        pairs.append((source, RUNTIME / relative))

    return pairs


def check_runtime() -> int:
    mismatches: list[str] = []
    missing: list[str] = []

    for source, target in iter_source_files():
        if not target.exists():
            missing.append(str(target.relative_to(ROOT)))
            continue

        if not filecmp.cmp(source, target, shallow=False):
            mismatches.append(str(target.relative_to(ROOT)))

    if not missing and not mismatches:
        print("renpy_test_runtime is in sync with the source tree.")
        return 0

    if missing:
        print("Missing runtime files:")
        for path in missing:
            print(f"  - {path}")

    if mismatches:
        print("Runtime files differ from source:")
        for path in mismatches:
            print(f"  - {path}")

    return 1


def sync_runtime() -> int:
    for source, target in iter_source_files():
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(source, target)

    print("Copied Visual Editor source files into renpy_test_runtime.")
    return 0


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--check",
        action="store_true",
        help="Only report whether renpy_test_runtime differs from the source tree.",
    )
    args = parser.parse_args()

    if not RUNTIME.exists():
        print(f"Runtime directory not found: {RUNTIME}", file=sys.stderr)
        return 2

    if args.check:
        return check_runtime()

    return sync_runtime()


if __name__ == "__main__":
    raise SystemExit(main())
