#!/usr/bin/env python3
"""
Build a Windows patch payload for existing Ren'Py users.

The payload only contains the Visual Editor tree plus the two launcher files
that were changed by this fork:

- visual_editor/**
- launcher/game/project.rpy
- launcher/game/front_page.rpy

The script can also invoke Inno Setup to compile a patch installer, if
ISCC.exe is available on the machine.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import os
import re
import shutil
import subprocess
import sys
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Iterable


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_OUTPUT_ROOT = ROOT / "build" / "visual_editor_patch"
INNO_SCRIPT = ROOT / "packaging" / "windows" / "visual_editor_patch.iss"
CHANGELOG = ROOT / "CHANGELOG.md"
VC_VERSION = ROOT / "renpy" / "vc_version.py"


@dataclass(frozen=True)
class PatchSource:
    source: Path
    destination: Path


PATCH_SOURCES = [
    PatchSource(ROOT / "visual_editor", Path("visual_editor")),
    PatchSource(ROOT / "launcher" / "game" / "project.rpy", Path("launcher") / "game" / "project.rpy"),
    PatchSource(ROOT / "launcher" / "game" / "front_page.rpy", Path("launcher") / "game" / "front_page.rpy"),
]


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def sha256_file(path: Path) -> str:
    digest = hashlib.sha256()

    with path.open("rb") as fh:
        for chunk in iter(lambda: fh.read(1024 * 1024), b""):
            digest.update(chunk)

    return digest.hexdigest()


def detect_latest_changelog_version() -> str:
    match = re.search(r"^## \[([^\]]+)\] - ", read_text(CHANGELOG), flags=re.MULTILINE)

    if not match:
        raise RuntimeError(f"Could not detect a version from {CHANGELOG}.")

    return match.group(1).strip()


def extract_changelog_section(version: str) -> str:
    content = read_text(CHANGELOG)
    pattern = re.compile(
        rf"^## \[{re.escape(version)}\] - .*?(?=^## \[|\Z)",
        flags=re.MULTILINE | re.DOTALL,
    )
    match = pattern.search(content)
    return match.group(0).strip() if match else ""


def detect_base_renpy_version() -> str:
    match = re.search(r"^version = '([^']+)'", read_text(VC_VERSION), flags=re.MULTILINE)

    if not match:
        raise RuntimeError(f"Could not detect the base Ren'Py version from {VC_VERSION}.")

    return match.group(1).strip()


def iter_payload_files(root: Path) -> Iterable[Path]:
    for path in sorted(root.rglob("*")):
        if path.is_file():
            yield path


def copy_patch_sources(payload_root: Path) -> list[dict[str, object]]:
    copied: list[dict[str, object]] = []

    for entry in PATCH_SOURCES:
        if not entry.source.exists():
            raise RuntimeError(f"Missing patch source: {entry.source}")

        destination = payload_root / entry.destination

        if entry.source.is_dir():
            shutil.copytree(entry.source, destination, dirs_exist_ok=True)
            for path in iter_payload_files(destination):
                copied.append({
                    "path": path.relative_to(payload_root).as_posix(),
                    "size": path.stat().st_size,
                    "sha256": sha256_file(path),
                })
        else:
            destination.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(entry.source, destination)
            copied.append({
                "path": destination.relative_to(payload_root).as_posix(),
                "size": destination.stat().st_size,
                "sha256": sha256_file(destination),
            })

    copied.sort(key=lambda item: item["path"])
    return copied


def build_patch_readme(version: str, base_version: str, manifest_relpath: str) -> str:
    return f"""Ren'Py Visual Editor Patch
Version: {version}
Base Ren'Py version: {base_version}

This patch is intended for users who already have Ren'Py installed.

Patched locations:
- visual_editor/**
- launcher/game/project.rpy
- launcher/game/front_page.rpy

Manual overlay usage:
1. Back up your Ren'Py installation directory.
2. Extract this payload directly into the Ren'Py root directory.
3. Allow the files above to overwrite the existing copies.
4. Launch renpy.exe and verify that the Visual Editor button appears.

Installer usage:
- If you also built the Inno Setup installer, prefer the installer EXE.
- The installer validates the selected Ren'Py directory and creates a backup
  before it overwrites files.

Manifest:
- {manifest_relpath}
"""


def build_file_record(payload_root: Path, path: Path) -> dict[str, object]:
    return {
        "path": path.relative_to(payload_root).as_posix(),
        "size": path.stat().st_size,
        "sha256": sha256_file(path),
    }


def write_manifest(payload_root: Path, version: str, base_version: str, files: list[dict[str, object]]) -> Path:
    manifest = {
        "patchVersion": version,
        "baseRenpyVersion": base_version,
        "builtAtUtc": datetime.now(timezone.utc).replace(microsecond=0).isoformat(),
        "payloadRoot": payload_root.name,
        "files": files,
        "sources": [
            "visual_editor/**",
            "launcher/game/project.rpy",
            "launcher/game/front_page.rpy",
        ],
    }

    manifest_path = payload_root / "_visual_editor_patch" / "patch_manifest.json"
    manifest_path.parent.mkdir(parents=True, exist_ok=True)
    manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
    return manifest_path


def write_stage_notes(stage_root: Path, payload_root: Path, version: str, base_version: str) -> None:
    manifest_path = payload_root / "_visual_editor_patch" / "patch_manifest.json"
    readme_text = build_patch_readme(
        version=version,
        base_version=base_version,
        manifest_relpath=manifest_path.relative_to(payload_root).as_posix(),
    )

    (payload_root / "_visual_editor_patch").mkdir(parents=True, exist_ok=True)
    (payload_root / "_visual_editor_patch" / "README_PATCH.txt").write_text(readme_text, encoding="utf-8")
    (stage_root / "README_PATCH.txt").write_text(readme_text, encoding="utf-8")

    changelog_section = extract_changelog_section(version)
    if changelog_section:
        (stage_root / "CHANGELOG_SNIPPET.md").write_text(changelog_section + "\n", encoding="utf-8")


def make_payload_zip(stage_root: Path, payload_root: Path, version: str) -> Path:
    archive_base = stage_root / f"renpy-visual-editor-patch-{version}-payload"
    archive_path = shutil.make_archive(
        str(archive_base),
        "zip",
        root_dir=payload_root,
    )
    return Path(archive_path)


def find_iscc(explicit_path: str | None = None) -> Path | None:
    candidates: list[Path] = []

    if explicit_path:
        candidates.append(Path(explicit_path))

    path_hit = shutil.which("ISCC.exe") or shutil.which("ISCC")
    if path_hit:
        candidates.append(Path(path_hit))

    for env_name in ("ProgramFiles(x86)", "ProgramFiles"):
        base = os.environ.get(env_name)
        if not base:
            continue
        candidates.append(Path(base) / "Inno Setup 6" / "ISCC.exe")

    for candidate in candidates:
        if candidate.exists():
            return candidate.resolve()

    return None


def compile_installer(version: str, stage_root: Path, iscc_path: Path) -> Path:
    output_dir = stage_root / "installer"
    output_dir.mkdir(parents=True, exist_ok=True)

    command = [
        str(iscc_path),
        f"/DPatchVersion={version}",
        f"/DStageDir={stage_root}",
        f"/DOutputDir={output_dir}",
        str(INNO_SCRIPT),
    ]

    subprocess.run(command, check=True)

    setup_name = f"renpy-visual-editor-patch-{version}-setup.exe"
    built_installer = output_dir / setup_name

    if not built_installer.exists():
        raise RuntimeError(f"Inno Setup finished without producing {built_installer}.")

    return built_installer


def build_stage(version: str, output_root: Path, keep_existing: bool) -> Path:
    stage_root = output_root / version
    payload_root = stage_root / "patch_payload"

    if stage_root.exists() and not keep_existing:
        shutil.rmtree(stage_root)

    payload_root.mkdir(parents=True, exist_ok=True)

    base_version = detect_base_renpy_version()
    copied_files = copy_patch_sources(payload_root)
    write_stage_notes(stage_root, payload_root, version, base_version)
    payload_readme = payload_root / "_visual_editor_patch" / "README_PATCH.txt"
    if payload_readme.exists():
        copied_files.append(build_file_record(payload_root, payload_readme))
    copied_files.sort(key=lambda item: item["path"])
    write_manifest(payload_root, version, base_version, copied_files)
    make_payload_zip(stage_root, payload_root, version)

    return stage_root


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--version",
        help="Patch version label. Defaults to the latest version from CHANGELOG.md.",
    )
    parser.add_argument(
        "--output-root",
        default=str(DEFAULT_OUTPUT_ROOT),
        help="Directory that receives the staged patch output. Default: build/visual_editor_patch",
    )
    parser.add_argument(
        "--keep-existing",
        action="store_true",
        help="Do not remove an existing stage directory before rebuilding it.",
    )
    parser.add_argument(
        "--compile-installer",
        action="store_true",
        help="Invoke Inno Setup after staging the patch payload.",
    )
    parser.add_argument(
        "--iscc",
        help="Optional path to ISCC.exe. If omitted, the script searches PATH and common install locations.",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    version = args.version or detect_latest_changelog_version()
    output_root = Path(args.output_root).resolve()
    stage_root = build_stage(version=version, output_root=output_root, keep_existing=args.keep_existing)

    print(f"Staged patch payload: {stage_root}")
    print(f"Payload ZIP: {stage_root / f'renpy-visual-editor-patch-{version}-payload.zip'}")

    if args.compile_installer:
        iscc = find_iscc(args.iscc)
        if iscc is None:
            print(
                "Inno Setup compiler not found. Install Inno Setup 6 or pass --iscc <path>.",
                file=sys.stderr,
            )
            return 2

        installer_path = compile_installer(version=version, stage_root=stage_root, iscc_path=iscc)
        print(f"Installer EXE: {installer_path}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
