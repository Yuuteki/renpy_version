#!/usr/bin/env python3
"""
Build a full Windows Alpha installer based on renpy_test_runtime.

This is the "portable/full" counterpart to the existing patch installer:
- it stages a cleaned copy of renpy_test_runtime
- emits a ZIP archive
- can optionally compile an Inno Setup installer EXE
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
from datetime import datetime, timezone
from pathlib import Path
from typing import Iterable


ROOT = Path(__file__).resolve().parents[1]
RUNTIME = ROOT / "renpy_test_runtime"
DEFAULT_OUTPUT_ROOT = ROOT / "build" / "visual_editor_full"
INNO_SCRIPT = ROOT / "packaging" / "windows" / "visual_editor_full.iss"
CHANGELOG = ROOT / "CHANGELOG.md"
VC_VERSION = ROOT / "renpy" / "vc_version.py"

EXCLUDE_FILE_NAMES = {
    "log.txt",
    "errors.txt",
    "traceback.txt",
    "lint.txt",
    ".DS_Store",
    "Thumbs.db",
}

EXCLUDE_DIR_NAMES = {
    "tmp",
    "saves",
    "cache",
    "__pycache__",
}


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


def should_skip_dir(path: Path) -> bool:
    return path.name in EXCLUDE_DIR_NAMES


def should_skip_file(path: Path) -> bool:
    return path.name in EXCLUDE_FILE_NAMES


def iter_runtime_files(root: Path) -> Iterable[Path]:
    for path in sorted(root.rglob("*")):
        if path.is_dir():
            continue

        if should_skip_file(path):
            continue

        if any(part in EXCLUDE_DIR_NAMES for part in path.relative_to(root).parts):
            continue

        yield path


def copy_runtime(stage_runtime_root: Path) -> list[dict[str, object]]:
    copied: list[dict[str, object]] = []

    for source in iter_runtime_files(RUNTIME):
        relative = source.relative_to(RUNTIME)
        target = stage_runtime_root / relative
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(source, target)
        copied.append({
            "path": relative.as_posix(),
            "size": target.stat().st_size,
            "sha256": sha256_file(target),
        })

    copied.sort(key=lambda item: item["path"])
    return copied


def build_bundle_readme(version: str, base_version: str, manifest_relpath: str) -> str:
    return f"""Ren'Py Visual Editor Full Bundle
Version: {version}
Channel: Alpha
Base Ren'Py version: {base_version}

This package is a full standalone Windows bundle based on renpy_test_runtime.
It is intended for testers who want a self-contained install instead of a patch.

Included highlights:
- Visual Editor integration in the launcher
- GUI Editor
- Launcher bridge and export pipeline
- Example projects and built-in docs from the runtime

Excluded from this bundle:
- tmp/
- log.txt and other transient logs

Installer behavior:
- installs into its own directory
- does not overwrite an existing Ren'Py installation by default

Manifest:
- {manifest_relpath}
"""


def build_file_record(bundle_root: Path, path: Path) -> dict[str, object]:
    return {
        "path": path.relative_to(bundle_root).as_posix(),
        "size": path.stat().st_size,
        "sha256": sha256_file(path),
    }


def write_manifest(bundle_root: Path, version: str, base_version: str, files: list[dict[str, object]]) -> Path:
    manifest = {
        "bundleVersion": version,
        "channel": "alpha",
        "baseRenpyVersion": base_version,
        "builtAtUtc": datetime.now(timezone.utc).replace(microsecond=0).isoformat(),
        "bundleRoot": bundle_root.name,
        "excludedDirectories": sorted(EXCLUDE_DIR_NAMES),
        "excludedFiles": sorted(EXCLUDE_FILE_NAMES),
        "files": files,
        "sourceRuntime": "renpy_test_runtime",
    }

    manifest_path = bundle_root / "_visual_editor_bundle" / "bundle_manifest.json"
    manifest_path.parent.mkdir(parents=True, exist_ok=True)
    manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
    return manifest_path


def write_stage_notes(stage_root: Path, bundle_root: Path, version: str, base_version: str) -> None:
    manifest_path = bundle_root / "_visual_editor_bundle" / "bundle_manifest.json"
    readme_text = build_bundle_readme(
        version=version,
        base_version=base_version,
        manifest_relpath=manifest_path.relative_to(bundle_root).as_posix(),
    )

    (bundle_root / "_visual_editor_bundle").mkdir(parents=True, exist_ok=True)
    (bundle_root / "_visual_editor_bundle" / "README_BUNDLE.txt").write_text(readme_text, encoding="utf-8")
    (stage_root / "README_BUNDLE.txt").write_text(readme_text, encoding="utf-8")

    changelog_section = extract_changelog_section("0.5")
    if changelog_section:
        (stage_root / "CHANGELOG_SNIPPET.md").write_text(changelog_section + "\n", encoding="utf-8")


def make_bundle_zip(stage_root: Path, bundle_root: Path, version: str) -> Path:
    archive_base = stage_root / f"renpy-visual-editor-v{version}-alpha"
    archive_path = shutil.make_archive(
        str(archive_base),
        "zip",
        root_dir=bundle_root,
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
        f"/DAlphaVersion={version}",
        f"/DStageDir={stage_root}",
        f"/DOutputDir={output_dir}",
        str(INNO_SCRIPT),
    ]

    subprocess.run(command, check=True)

    setup_name = f"renpy-visual-editor-v{version}-alpha-setup.exe"
    built_installer = output_dir / setup_name

    if not built_installer.exists():
        raise RuntimeError(f"Inno Setup finished without producing {built_installer}.")

    return built_installer


def build_stage(version: str, output_root: Path, keep_existing: bool) -> Path:
    stage_root = output_root / version
    bundle_root = stage_root / "bundle"

    if stage_root.exists() and not keep_existing:
        shutil.rmtree(stage_root)

    bundle_root.mkdir(parents=True, exist_ok=True)

    base_version = detect_base_renpy_version()
    copied_files = copy_runtime(bundle_root)
    write_stage_notes(stage_root, bundle_root, version, base_version)

    bundle_readme = bundle_root / "_visual_editor_bundle" / "README_BUNDLE.txt"
    if bundle_readme.exists():
        copied_files.append(build_file_record(bundle_root, bundle_readme))

    copied_files.sort(key=lambda item: item["path"])
    write_manifest(bundle_root, version, base_version, copied_files)
    make_bundle_zip(stage_root, bundle_root, version)

    return stage_root


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--version",
        default="0.5",
        help="Bundle version label. Default: 0.5",
    )
    parser.add_argument(
        "--output-root",
        default=str(DEFAULT_OUTPUT_ROOT),
        help="Directory that receives the staged full bundle output. Default: build/visual_editor_full",
    )
    parser.add_argument(
        "--keep-existing",
        action="store_true",
        help="Do not remove an existing stage directory before rebuilding it.",
    )
    parser.add_argument(
        "--compile-installer",
        action="store_true",
        help="Invoke Inno Setup after staging the full bundle.",
    )
    parser.add_argument(
        "--iscc",
        help="Optional path to ISCC.exe. If omitted, the script searches PATH and common install locations.",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    version = args.version
    output_root = Path(args.output_root).resolve()
    stage_root = build_stage(version=version, output_root=output_root, keep_existing=args.keep_existing)

    print(f"Staged full bundle: {stage_root}")
    print(f"Bundle ZIP: {stage_root / f'renpy-visual-editor-v{version}-alpha.zip'}")

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
