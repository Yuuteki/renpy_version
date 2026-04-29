# Visual Editor

This directory contains the browser-based Ren'Py visual editor frontend that is
opened from the Ren'Py launcher.

Current responsibilities:

- `index.html`: main visual script editor, resource panels, graph canvas, and export controls
- `gui_editor.html`: GUI-focused editor for styles, screens, config, Python UI helpers, cursors, shaders, and extras
- `styles.css`: shared dark UI styling for the visual editor
- `app.js`: main project state, block graph editing, code generation, launcher bridge sync, and `.rpy` export
- `gui_editor.js`: GUI editor state management, previews, diagnostics, and shared project-state persistence

Current behavior:

- opens from the launcher through the local bridge server at `http://127.0.0.1:<port>/editor/index.html?project=<path>&bridge=<url>&token=<token>`
- displays the selected Ren'Py project path
- keeps a browser `localStorage` draft as a fallback
- when opened from the launcher, loads and saves the canonical state at `<project>/visual_editor/project.json`
- exports generated Ren'Py code to `<project>/game/generated_visual_editor.rpy` and split generated support files in `<project>/game/visual_editor_generated/`
- uses a single `Visual Editor` launcher entry; project JSON sync happens automatically while `.rpy` export stays manual
- scans existing project scripts for labels, screens, and defines before export, and blocks conflicting label exports until they are adopted or renamed

Project history and milestone releases:

- `../CHANGELOG.md` - versioned development log for the visual editor fork

Persistence model:

- `localStorage` is only the emergency browser draft.
- `visual_editor/project.json` is the source of truth once the editor is opened from the launcher.
- `game/generated_visual_editor.rpy` and `game/visual_editor_generated/*.rpy` are generated output and should not be hand-edited unless the JSON state is updated too.
