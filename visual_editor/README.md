# Visual Editor Scaffold

This directory contains the initial scaffold for the Ren'Py visual editor.

Current responsibilities:

- `index.html`: layout shell for the prototype editor
- `styles.css`: local visual styling for the editor UI
- `app.js`: minimal state management, project-path parsing, placeholder graph rendering

Current behavior:

- opens from the launcher through `visual_editor/index.html?project=<path>`
- displays the selected Ren'Py project path
- renders a lightweight placeholder graph
- stores draft state in browser `localStorage`

Planned next steps:

- move state into a project-local JSON file
- replace placeholder graph rendering with draggable nodes and edges
- add export into generated `.rpy`
- introduce a launcher-side bridge for save/export commands
