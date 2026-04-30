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
- on the first launcher open without a project JSON, imports recognized `game/options.rpy`, `game/gui.rpy`, and `game/screens.rpy` settings into the editor state before creating `<project>/visual_editor/project.json`
- from the main Visual Editor, `Take Over Legacy GUI Files` backs up and removes `game/options.rpy`, `game/gui.rpy`, `game/screens.rpy`, and matching `.rpyc` files before refreshing `game/generated_visual_editor.rpy`
- exports generated Ren'Py code to `<project>/game/generated_visual_editor.rpy`
- uses a single `Visual Editor` launcher entry; project JSON sync happens automatically while `.rpy` export stays manual

Project history and milestone releases:

- `../CHANGELOG.md` - versioned development log for the visual editor fork

Persistence model:

- `localStorage` is only the emergency browser draft.
- `visual_editor/project.json` is the source of truth once the editor is opened from the launcher.
- `game/generated_visual_editor.rpy` is generated output and should not be hand-edited unless the JSON state is updated too.
