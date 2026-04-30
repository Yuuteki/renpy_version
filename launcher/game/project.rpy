# Copyright 2004-2026 Tom Rothamel <pytom@bishoujo.us>
#
# Permission is hereby granted, free of charge, to any person
# obtaining a copy of this software and associated documentation files
# (the "Software"), to deal in the Software without restriction,
# including without limitation the rights to use, copy, modify, merge,
# publish, distribute, sublicense, and/or sell copies of the Software,
# and to permit persons to whom the Software is furnished to do so,
# subject to the following conditions:
#
# The above copyright notice and this permission notice shall be
# included in all copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
# EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
# MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
# NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
# LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
# OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
# WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

# Code that manages projects.

init python:
    import os

init python in project:
    from store import persistent, config, Action, renpy, _preferences, MultiPersistent
    import store.util as util
    import store.interface as interface

    import ast
    import base64
    import sys
    import os.path
    import json
    import mimetypes
    import shutil
    import subprocess
    import re
    import tempfile
    import threading
    import urllib.parse
    import urllib.request
    import uuid

    from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

    multipersistent = MultiPersistent("launcher.renpy.org")

    if persistent.blurb is None:
        persistent.blurb = 0

    # Added this persistent variable to retain any
    # previous folder that was collapsed or shown
    if persistent.collapsed_folders is None:
        persistent.collapsed_folders = { }

    persistent.collapsed_folders.setdefault("Tutorials", False)

    project_filter = [ i.strip() for i in os.environ.get("RENPY_PROJECT_FILTER", "").split(":") if i.strip() ]

    LAUNCH_BLURBS = [
        _("After making changes to the script, press shift+R to reload your game."),
        _("Press shift+O (the letter) to access the console."),
        _("Press shift+D to access the developer menu."),
        _("Have you backed up your projects recently?"),
        _("Lint checks your game for potential mistakes, and gives you statistics."),
    ]

    class Project(object):

        def __init__(self, path, name=None, parent_path=None):

            while path.endswith("/"):
                path = path[:-1]

            if name is None:
                name = os.path.basename(path)

            if not os.path.exists(path):
                raise Exception("{} does not exist.".format(path))

            self.name = name

            # The path to the project. In the case of a mac app, this is to the base directory
            # buried inside the app.
            self.path = path

            # The path to the project's parent directory. This is logical - in the case of a mac app,
            # this is the directory outside the app.
            if parent_path is not None:
                self.parent_path = parent_path
            else:
                self.parent_path = os.path.dirname(path)

            # The path to the game directory.
            gamedir = os.path.join(path, "game")
            if os.path.isdir(gamedir):
                self.gamedir = gamedir
            else:
                self.gamedir = path

            # Load the data.
            self.load_data()

            # A name to display the project.
            self.display_name = self.data.get("display_name", self.name)

            # The project's temporary directory.
            self.tmp = None

            # This contains the result of dumping information about the game
            # to disk.
            self.dump = { }

            # The mtime of the last dump file loaded.
            self.dump_mtime = 0

            # A processed version of data['renpy_launcher'] with missing files
            # and directories removed.
            self.renpy_launcher = None

            # Caches the todo list.
            self.todos = None

        def get_dump_filename(self):

            if os.path.exists(os.path.join(self.gamedir, "saves")):
                return os.path.join(self.gamedir, "saves", "navigation.json")

            self.make_tmp()
            return os.path.join(self.tmp, "navigation.json")

        def load_data(self):
            try:
                with open(os.path.join(self.path, "project.json"), "r") as f:
                    self.data = json.load(f)
            except Exception:
                self.data = { }

            self.update_data()

        def save_data(self):
            """
            Saves the project data.
            """

            try:
                with open(os.path.join(self.path, "project.json"), "w") as f:
                    json.dump(self.data, f, indent=2)
            except Exception:
                self.load_data()

        def update_data(self):
            data = self.data

            data.setdefault("build_update", False)
            data.setdefault("packages", [ "pc", "mac" ])
            data.setdefault("add_from", True)
            data.setdefault("force_recompile", True)
            data.setdefault("android_build", "Release")
            data.setdefault("tutorial", False)

            if "renamed_all" not in data:
                dp = data["packages"]

                if "all" in dp:
                    dp.remove("all")

                    if "pc" not in dp:
                        dp.append("pc")

                    if "mac" not in dp:
                        dp.append("mac")

                data["renamed_all"] = True

            if "renamed_steam" not in data:
                dp = data["packages"]

                if "steam" in dp:
                    dp.remove("steam")

                    if "market" not in dp:
                        dp.append("market")

                data["renamed_steam"] = True


        def get_renpy_launcher(self):

            if self.renpy_launcher is not None:
                return self.renpy_launcher

            rv = { }

            default_values = {
                "open_directory":
                {
                    "game": "game",
                    "base": ".",
                    "images": "game/images",
                    "audio": "game/audio",
                    "gui": "game/gui",
                    "libs": "game/libs",
                    "mods": "game/mods",
                },
                "edit_file":
                {
                    "script.rpy": "game/script.rpy",
                    "options.rpy": "game/options.rpy",
                    "gui.rpy": "game/gui.rpy",
                    "screens.rpy": "game/screens.rpy"
                }
            }

            for k, default_d in default_values.items():
                d = self.data.get("renpy_launcher", {}).get(k, default_d)
                rv[k] = { name : path for name, path in d.items() if os.path.exists(os.path.join(self.path, path)) }

            self.renpy_launcher = rv

            return rv



        def make_tmp(self):
            """
            Makes the project's temporary directory, if it doesn't exist
            yet.
            """

            if self.tmp and os.path.isdir(self.tmp):
                return

            tmp = os.path.join(config.renpy_base, "tmp", self.name)

            try:
                os.makedirs(tmp)
            except Exception:
                pass

            if os.path.isdir(tmp):
                try:

                    fn = os.path.join(tmp, "write_test.txt")

                    if os.path.exists(fn):
                        os.unlink(fn)

                    with open(fn, "w") as f:
                        f.write("Test")

                    os.unlink(fn)

                    self.tmp = tmp
                    return

                except Exception:
                    pass

            self.tmp = tempfile.mkdtemp()

        def temp_filename(self, filename):
            """
            Returns a filename in the temporary directory.
            """

            self.make_tmp()
            return os.path.join(self.tmp, filename)

        def launch(self, args=[], wait=False, env={}):
            """
            Launches the project.

            `args`
                Additional arguments to give to the project.

            `wait`
                If true, waits for the launched project to terminate before
                continuing.

            `env`
                Additional variables to include in the environment.
            """

            self.make_tmp()

            # Find the python executable to run.
            executable_path = os.path.dirname(renpy.fsdecode(sys.executable))

            if renpy.renpy.windows:
                extension = ".exe"
            else:
                extension = ""

            if persistent.use_console:
                executables = [ "python" + extension ]
            else:
                executables = [ "pythonw" + extension ]

            executables.append(sys.executable)

            for i in executables:
                executable = os.path.join(executable_path, i)
                if os.path.exists(executable):
                    break
            else:
                raise Exception("Python interpreter not found: %r", executables)

            # Put together the basic command line.
            cmd = [ executable, sys.argv[0] ]

            cmd.append(self.path)
            cmd.extend(args)

            # Add flags to dump game info.
            cmd.append("--json-dump")
            cmd.append(self.get_dump_filename())

            if persistent.navigate_private:
                cmd.append("--json-dump-private")

            if persistent.navigate_library:
                cmd.append("--json-dump-common")

            cmd.append("--errors-in-editor")

            environ = dict(os.environ)
            environ["RENPY_LAUNCHER_LANGUAGE"] = _preferences.language or "english"

            if persistent.skip_splashscreen:
                environ["RENPY_SKIP_SPLASHSCREEN"] = "1"

            environ.update(env)

            # Filter out system PYTHON* environment variables.
            if hasattr(sys, "renpy_executable"):
                environ = { k : v for k, v in environ.items() if not k.startswith("PYTHON") }

            encoded_environ = { }

            for k, v in environ.items():
                if v is None:
                    continue

                encoded_environ[renpy.fsencode(k)] = renpy.fsencode(v)

            # Launch the project.
            cmd = [ renpy.fsencode(i) for i in cmd ]

            if persistent.use_console and renpy.macintosh:
                cmd = self.generate_mac_launch_string(cmd)

            p = subprocess.Popen(cmd, env=encoded_environ)

            if wait:
                if p.wait():

                    print(f"Launch failed (returned {p.returncode}).")

                    command = " ".join(repr(i) for i in cmd)
                    print(f"Command: {command}")

                    if args and not self.is_writeable():
                        interface.error(_("Launching the project failed."), _("This may be because the project is not writeable."))
                    else:
                        interface.error(_("Launching the project failed."), _("Please ensure that your project launches normally before running this command."))

            renpy.not_infinite_loop(30)

        def launch_console_command(self, args=[]):
            """
            This launcher the project, displaying console output in a new terminal emulator window. The window will
            remain open until the user actively closes it, making it possible to display output to the user.

            `args`
                Additional arguments to give to the project.
            """

            self.make_tmp()

            # Find the python executable to run.
            executable_path = os.path.dirname(renpy.fsdecode(sys.executable))

            if renpy.renpy.windows:
                extension = ".exe"
            else:
                extension = ""

            executables = [ "python" + extension ]

            executables.append(sys.executable)

            for i in executables:
                executable = os.path.join(executable_path, i)
                if os.path.exists(executable):
                    break
            else:
                raise Exception("Python interpreter not found: %r", executables)

            # Put together the basic command line.
            cmd = [ executable, sys.argv[0] ]

            cmd.append(self.path)
            cmd.extend(args)

            from store import ConsoleCommand

            console = ConsoleCommand()
            console.add(*cmd)
            console.run()

        def generate_mac_launch_string(self, cmd):
            """
            replaces the existing launch arguments,
            with the correct ones to open up a console window on MacOS based systems
            """
            python_launch_string = ""

            for argument in cmd:
                python_launch_string += argument
                # adding spacing between arguments
                python_launch_string += " "

            return ["osascript", "-e", 'tell app "Terminal" to do script "'+python_launch_string+' && exit"']

        def update_dump(self, force=False, gui=True, compile=False, only_existing=False):
            """
            If the dumpfile does not exist, runs Ren'Py to create it. Otherwise,
            loads it in iff it's newer than the one that's already loaded.
            """

            dump_filename = self.get_dump_filename()

            if force or not os.path.exists(dump_filename):

                if only_existing and not os.path.exists(dump_filename):
                    return

                if gui:
                    interface.processing(_("Ren'Py is scanning the project..."))

                if compile:
                    self.launch(["compile", "--keep-orphan-rpyc" ], wait=True)
                else:
                    self.launch(["quit"], wait=True)

            if not os.path.exists(dump_filename):
                self.dump["error"] = True
                return

            file_mtime = os.path.getmtime(dump_filename)
            if file_mtime == self.dump_mtime:
                return

            self.dump_mtime = file_mtime

            try:
                with open(dump_filename, "r") as f:
                    self.dump = json.load(f)
                    self.todos = None

            except Exception:
                self.dump["error"] = True

        def update_todos(self):
            """
            Scans the scriptfiles for lines TODO comments and add them to
            the dump data.
            """

            if self.todos is not None:
                self.dump.setdefault("location", {})["todo"] = self.todos
                return

            todos = self.dump.setdefault("location", {})["todo"] = {}

            files = self.script_files()

            for f in files:

                data = open(self.unelide_filename(f), encoding="utf-8")

                for l, line in enumerate(data):
                    l += 1

                    line = line[:1024]

                    m = re.search(r"#\s*TODO(\s*:\s*|\s+)(.*)", line, re.I)

                    if m is None:
                        continue

                    raw_todo_text = m.group(2).strip()
                    todo_text = raw_todo_text

                    index = 0

                    while not todo_text or todo_text in todos:
                        index += 1
                        todo_text = u"{0} ({1})".format(raw_todo_text, index)

                    todos[todo_text] = [f, l]

            self.todos = todos

        def unelide_filename(self, fn):
            """
            Unelides the filename relative to the project base.
            """

            fn = os.path.normpath(fn)

            fn1 = os.path.join(self.path, fn)
            if os.path.exists(fn1):
                return fn1

            fn2 = os.path.join(config.renpy_base, fn)
            if os.path.exists(fn2):
                return fn2

            return fn

        def script_files(self):
            """
            Return a list of the script files that make up the project. These
            are elided, and so need to be passed to unelide_filename before they
            can be included in the project.
            """

            def is_script(fn):
                fn = fn.lower()

                for i in [ ".rpy", ".rpym", "_ren.py" ]:
                    if fn.endswith(i):
                        return True

                return False

            rv = [ ]
            rv.extend(i for i, isdir in util.walk(self.path)
                if (not isdir) and is_script(i) and (not i.startswith("tmp/")) )

            return rv

        def exists(self, fn):
            """
            Returns true if the file exists in the game.
            """

            return os.path.exists(os.path.join(self.path, fn))

        def is_writeable(self):
            """
            Returns true if it's possible to write a file in the projects
            directory.
            """

            return os.access(self.path, os.W_OK)

    class ProjectFolder(object):
        """
        This handles the folder name and the projects within
        this folder.
        """

        def __init__(self, name):
            # The folder name.
            self.name = name

            # Normal projects, in alphabetical order by lowercase name.
            self.projects = [ ]

            # Controls wether the folder is collapsed or shown.
            self.hidden = True

        # NOTE
        # Vague function name but context is self explanatory
        def add(self, p):
            self.projects.append(p)

    class ProjectManager(object):
        """
        This maintains a list of the various types of projects that
        we know about.
        """

        def __init__(self):

            # The projects directory.
            self.projects_directory = ""

            # NOTE: Folder of projects, in alphabetical order by lowercase name.
            self.folders = [ ]

            # Normal projects, in alphabetical order by lowercase name.
            self.projects = [ ]

            # Template projects.
            self.templates = [ ]

            # All projects - normal, template, and hidden.
            self.all_projects = [ ]

            # Directories that have been scanned.
            self.scanned = set()

            # The tutorial game, and the language it's for.
            self.tutorial = None
            self.tutorial_language = "the meowing of a cat"

            self.scan()

        def scan(self):
            """
            Scans for projects.
            """

            global current

            if persistent.projects_directory is None:
                if multipersistent.projects_directory is not None:
                    persistent.projects_directory = multipersistent.projects_directory

            if (persistent.projects_directory is not None) and not os.path.isdir(persistent.projects_directory):
                persistent.projects_directory = None

            if persistent.projects_directory is not None:
                if multipersistent.projects_directory is None:
                    multipersistent.projects_directory = persistent.projects_directory
                    multipersistent.save()

            self.projects_directory = persistent.projects_directory

            self.folders = [ ]
            self.projects = [ ]
            self.templates = [ ]
            self.all_projects = [ ]
            self.scanned = set()

            if self.projects_directory is not None:
                self.scan_directory(self.projects_directory)

            self.scan_directory(config.renpy_base)

            # NOTE: Added `self.folders` that holds the ProjectFolder objects
            self.folders.sort(key=lambda p : p.name.lower())
            self.projects.sort(key=lambda p : p.name.lower())
            self.templates.sort(key=lambda p : p.name.lower())

            # Select the default project.
            if persistent.active_project is not None:
                p = self.get(persistent.active_project)

                if (p is not None) and (p.name not in [ "tutorial", "tutorial_7" ]):
                    current = p
                    return

            current = self.get_tutorial()

        # NOTE
        # Turned this `has_game` function part of the class as static
        # Because it was used in a few places due the changes.
        @staticmethod
        def has_game(dn):
            return os.path.isdir(os.path.join(dn, "game"))

        # NOTE
        # This function remove any folder that was saved
        # that doesn't exist anymore in `self.projects_directory`
        def clear_collapsed_folders(self):
            prefix = os.path.normpath(self.projects_directory)

            for name in [*persistent.collapsed_folders.keys()]:
                dpath = os.path.join(prefix, name)

                if not os.path.isdir(dpath) and not "Tutorials":
                    persistent.collapsed_folders.pop(name)


        def find_folder_projects(self, d):
            """
            Finds projects that exist in folders, rather than in
            the base directory.
            """

            nd = os.path.normpath(d)
            prefix = os.path.normpath(self.projects_directory)

            if nd.startswith(prefix):
                fpath, fname = os.path.split(nd)
                full_path = os.path.join(fpath, fname)

                pf = ProjectFolder(fname)

                # If the key was found in `persistent.collapsed_folders`
                # uses the value stored there
                try:
                    pf.hidden = persistent.collapsed_folders[fname]

                except KeyError:
                    pf.hidden = (fname != "master")

                for pdir in util.listdir(full_path):
                    ppath = os.path.join(full_path, pdir)

                    if not os.path.isdir(ppath):
                        continue

                    p_path = self.find_basedir(ppath)

                    if not p_path or p_path in self.scanned:
                        continue

                    self.scanned.add(p_path)

                    # Get the name of the project
                    name = os.path.split(ppath)[1]

                    # We have a project directory, so create a Project.
                    p = Project(p_path, name, parent_path=full_path)

                    # Adds the project to the ProjectFolder
                    pf.add(p)

                    self.all_projects.append(p)

                    project_type = p.data.get("type", "normal")
                    if project_type == "template":
                        self.templates.append(p)

                if not pf.hidden and not pf.projects:
                    pf.hidden = True

                # Return None if the project folder is emtpy.
                if not pf.projects:
                    return None

                # Return the project folder object.
                return pf

            return None

        def find_basedir(self, d):
            """
            Try to find a project basedir in d.
            """

            if self.has_game(d):
                return d

            if d.endswith(".app"):
                dn = os.path.join(d, "Contents", "Resources", "autorun")

                if self.has_game(dn):
                    return dn

            return None

        def scan_directory(self, d):
            """
            Scans for projects in directories directly underneath `d`.
            """

            global current

            d = os.path.abspath(d)

            if not os.path.isdir(d):
                return

            for pdir in util.listdir(d):

                ppath = os.path.join(d, pdir)
                self.scan_directory_direct(ppath, pdir)

            # If a file called "projects.txt" exists, include any projects listed in it.
            extra_projects_fn = os.path.join(d, "projects.txt")

            if os.path.exists(extra_projects_fn):

                with open(extra_projects_fn, "r") as f:

                    for path in f:
                        path = path.strip()

                        if path.startswith("#"):
                            continue

                        if len(path) > 0:
                            self.scan_directory_direct(path)


        def scan_directory_direct(self, ppath, name=None):
            """
            Checks if there is a project in `ppath` and creates a project
            object with the name `name` if so.
            """

            # A project must be a directory.
            if not os.path.isdir(ppath):
                return

            try:
                if p_path := self.find_basedir(ppath):

                    if p_path in self.scanned:
                        return

                    self.scanned.add(p_path)

                    # We have a project directory, so create a Project.
                    p = Project(p_path, name, parent_path=os.path.dirname(ppath))

                    if project_filter and (p.name not in project_filter):
                        return

                    project_type = p.data.get("type", "normal")

                    if project_type == "hidden":
                        pass

                    elif project_type == "template":
                        self.projects.append(p)
                        self.templates.append(p)

                    else:
                        self.projects.append(p)

                    self.all_projects.append(p)

                else:
                    self.clear_collapsed_folders()

                    pf = self.find_folder_projects(ppath)

                    if pf is None:
                        return

                    self.folders.append(pf)

            except Exception:
                return

        def get(self, name):
            """
            Gets the project with the given name.

            Returns None if the project doesn't exist.
            """

            for p in self.all_projects:
                if p.name == name:
                    return p

            return None

        def get_tutorial(self):

            language = _preferences.language
            if persistent.force_new_tutorial:
                language = None

            if language == self.tutorial_language:
                return self.tutorial

            rv = self.get("oldtutorial")
            p = self.get("tutorial")

            if p is not None:

                if language is None:
                    rv = p

                elif rv is None:
                    rv = p

                elif os.path.exists(os.path.join(p.path, "game", "tl", _preferences.language)):
                    rv = p

                elif not os.path.exists(os.path.join(rv.path, "game", "tl", _preferences.language)):
                    rv = p

            self.tutorial_language = language
            self.tutorial = rv

            return rv

    manager = ProjectManager()

    # The current project.
    current = None

    # Actions
    class Select(Action):
        """
        An action that causes p to become the selected project when it was
        clicked. If label is not None, jumps to the given label.
        """

        def __init__(self, p, label=None):
            """
            `p`
                Either a project object, or a string giving the name of a
                project.

            `label`
                The label to jump to when clicked.
            """

            if isinstance(p, str):
                p = manager.get(p)

            self.project = p
            self.label = label

        def get_selected(self):
            if self.project is None:
                return False

            if current is None:
                return False

            return current.path == self.project.path

        def get_sensitive(self):
            return self.project is not None

        def __call__(self):
            global current

            current = self.project
            persistent.active_project = self.project.name

            try:
                current.update_dump(only_existing=True)
            except Exception:
                pass

            renpy.restart_interaction()

            if self.label is not None:
                renpy.jump(self.label)

    class SelectTutorial(Action):
        """
        Selects the tutorial.
        """

        def __init__(self, if_tutorial=False):
            """
            Only selects if we're already in a tutorial.
            """

            self.if_tutorial = if_tutorial

        def __call__(self):

            p = manager.get_tutorial()

            if p is None:
                return

            global current

            if self.if_tutorial:
                if (current is not None) and current.name not in [ "tutorial", "oldtutorial" ]:
                    return None

            current = p
            persistent.active_project = p.name

            try:
                current.update_dump(only_existing=True)
            except Exception:
                pass

            renpy.restart_interaction()

        def get_sensitive(self):
            if self.if_tutorial:
                return True

            return (manager.get_tutorial() is not None)

        def get_selected(self):
            if self.if_tutorial:
                return False

            p = manager.get_tutorial()

            if p is None:
                return False

            if current is None:
                return False

            return current.path == p.path

    class Launch(Action):
        """
        An action that launches the supplied project, or the current
        project if no project is supplied.
        """

        def __init__(self, p=None):
            if p is None:
                self.project = current
            elif isinstance(p, str):
                self.project = manager.get(p)
            else:
                self.project = p

        def get_sensitive(self):
            return self.project is not None

        def post_launch(self):
            blurb = LAUNCH_BLURBS[persistent.blurb % len(LAUNCH_BLURBS)]
            persistent.blurb += 1

            if persistent.skip_splashscreen:
                submessage = _("Splashscreen skipped in launcher preferences.")
            else:
                submessage = None

            interface.interaction(_("Launching"), blurb, submessage=submessage, pause=2.5)


        def __call__(self):
            self.project.launch()
            renpy.invoke_in_new_context(self.post_launch)

    visual_editor_bridge = None

    def get_visual_editor_state_path(p):
        return os.path.join(p.path, "visual_editor", "project.json")

    def get_visual_editor_export_path(p):
        return os.path.join(p.gamedir, "generated_visual_editor.rpy")

    def get_visual_editor_script_path(p):
        return os.path.join(p.gamedir, "script.rpy")

    def get_visual_editor_options_path(p):
        return os.path.join(p.gamedir, "options.rpy")

    def get_visual_editor_gui_path(p):
        return os.path.join(p.gamedir, "gui.rpy")

    def get_visual_editor_screens_path(p):
        return os.path.join(p.gamedir, "screens.rpy")

    def get_visual_editor_generated_dir(p):
        return os.path.join(p.gamedir, "visual_editor_generated")

    def get_visual_editor_backup_dir(p):
        return os.path.join(p.path, "visual_editor", "backups")

    def ensure_visual_editor_parent_dirs(p):
        visual_editor_dir = os.path.dirname(get_visual_editor_state_path(p))

        if not os.path.isdir(visual_editor_dir):
            os.makedirs(visual_editor_dir)

        if not os.path.isdir(p.gamedir):
            os.makedirs(p.gamedir)

    def get_visual_editor_imported_expression_info(expression):
        expression = (expression or "").strip()

        try:
            parsed = ast.parse(expression, mode="eval").body
        except SyntaxError:
            return {
                "kind": "raw",
                "value": expression,
            }

        if isinstance(parsed, ast.Constant):
            value = parsed.value

            if isinstance(value, bool):
                return { "kind": "bool", "value": value }

            if value is None:
                return { "kind": "none", "value": None }

            if isinstance(value, (int, float)):
                return { "kind": "number", "value": value }

            if isinstance(value, str):
                return { "kind": "string", "value": value }

        if isinstance(parsed, ast.UnaryOp) and isinstance(parsed.op, ast.USub) and isinstance(parsed.operand, ast.Constant):
            value = parsed.operand.value

            if isinstance(value, (int, float)):
                return { "kind": "number", "value": -value }

        if isinstance(parsed, ast.Call) and isinstance(parsed.func, ast.Name) and parsed.func.id == "_" and len(parsed.args) == 1 and not parsed.keywords:
            if isinstance(parsed.args[0], ast.Constant) and isinstance(parsed.args[0].value, str):
                return { "kind": "string", "value": parsed.args[0].value }

        return {
            "kind": "raw",
            "value": expression,
        }

    def is_visual_editor_import_expression_incomplete(error):
        message = "{}".format(error)

        incomplete_markers = [
            "unexpected EOF while parsing",
            "EOF while scanning",
            "unterminated string literal",
            "unterminated triple-quoted string literal",
            "was never closed",
        ]

        return any(marker in message for marker in incomplete_markers)

    def collect_visual_editor_import_expression(lines, start_index, initial_expression):
        expression_lines = [ (initial_expression or "").rstrip("\r\n") ]
        index = start_index

        while True:
            expression = "\n".join(expression_lines).strip()

            try:
                ast.parse(expression or "None", mode="eval")
                return expression, index
            except SyntaxError as e:
                if (index + 1 >= len(lines)) or (not is_visual_editor_import_expression_incomplete(e)):
                    return expression, index

            index += 1
            expression_lines.append(lines[index].rstrip("\r\n"))

    def append_visual_editor_import_config(gui_state, scope, name, value, store_path="", description=""):
        gui_state.setdefault(scope, [ ]).append({
            "name": name,
            "storePath": store_path,
            "value": (value or "").strip(),
            "description": (description or "").strip(),
        })

    def append_visual_editor_import_definition(definitions, target, value, operator="=", priority=""):
        definitions.append({
            "mode": "define",
            "target": target,
            "operator": operator,
            "priority": priority,
            "value": (value or "").strip(),
        })

    def append_visual_editor_import_python_block(definitions, code, priority="", hide=False, store=""):
        definitions.append({
            "mode": "init_python",
            "initPriority": priority,
            "initHide": hide,
            "initStore": store,
            "code": (code or "").strip(),
        })

    def append_visual_editor_import_style(gui_state, name, parent="", variant="", properties_expression="", properties=None):
        properties = properties or [ ]
        category_hints = {
            "button": set([ "child", "hover_sound", "activate_sound", "focus_mask", "keyboard_focus", "mouse" ]),
            "window": set([ "background", "foreground", "padding", "size_group" ]),
            "bar": set([ "bar_vertical", "bar_invert", "left_gutter", "right_gutter", "base_bar", "thumb", "thumb_offset" ]),
            "box": set([ "spacing", "first_spacing", "box_wrap", "box_wrap_spacing", "box_reverse", "box_align", "box_justify" ]),
            "grid": set([ "xspacing", "yspacing" ]),
            "margin": set([ "margin", "xmargin", "ymargin", "left_margin", "right_margin", "top_margin", "bottom_margin" ]),
            "text": set([ "color", "font", "size", "outlines", "line_spacing", "layout", "slow_cps", "textshader" ]),
            "position": set([ "xpos", "ypos", "xalign", "yalign", "xfill", "yfill", "xminimum", "yminimum" ]),
        }
        style_name = (name or "").strip() or "gui_style"
        lowered_name = style_name.lower()
        property_keys = set([ prop.get("key", "") for prop in properties if prop.get("key") ])
        category = "text"

        if "button" in lowered_name:
            category = "button"
        elif any(key in category_hints["button"] for key in property_keys):
            category = "button"
        elif ("window" in lowered_name) or ("frame" in lowered_name):
            category = "window"
        elif any(key in category_hints["window"] for key in property_keys):
            category = "window"
        elif ("bar" in lowered_name) or ("slider" in lowered_name) or ("scrollbar" in lowered_name):
            category = "bar"
        elif any(key in category_hints["bar"] for key in property_keys):
            category = "bar"
        elif ("vbox" in lowered_name) or ("hbox" in lowered_name) or ("box" in lowered_name):
            category = "box"
        elif any(key in category_hints["box"] for key in property_keys):
            category = "box"
        elif "grid" in lowered_name:
            category = "grid"
        elif any(key in category_hints["grid"] for key in property_keys):
            category = "grid"
        elif any(key in category_hints["margin"] for key in property_keys):
            category = "margin"
        elif any(key in category_hints["text"] for key in property_keys):
            category = "text"

        gui_state.setdefault("styles", [ ]).append({
            "name": style_name,
            "parent": (parent or "").strip(),
            "variant": (variant or "").strip(),
            "category": category,
            "propertiesExpression": (properties_expression or "").strip(),
            "properties": properties,
        })

    def get_visual_editor_gui_style_prefix(token):
        prefixes = [
            ("selected_insensitive_", "selected_insensitive"),
            ("selected_hover_", "selected_hover"),
            ("selected_idle_", "selected_idle"),
            ("insensitive_", "insensitive"),
            ("selected_", "selected"),
            ("hover_", "hover"),
            ("idle_", "idle"),
        ]

        for code_prefix, prefix_id in prefixes:
            if token.startswith(code_prefix):
                return prefix_id, token[len(code_prefix):]

        return "base", token

    def infer_visual_editor_gui_style_property_type(key, value):
        type_hints = {
            "xpos": "position",
            "ypos": "position",
            "xalign": "float",
            "yalign": "float",
            "xfill": "bool",
            "yfill": "bool",
            "xminimum": "int",
            "yminimum": "int",
            "color": "color",
            "font": "string",
            "size": "int",
            "outlines": "tuple",
            "line_spacing": "int",
            "layout": "string",
            "slow_cps": "int",
            "textshader": "string",
            "background": "displayable",
            "foreground": "displayable",
            "padding": "tuple",
            "size_group": "string",
            "child": "displayable",
            "hover_sound": "string",
            "activate_sound": "string",
            "focus_mask": "displayable",
            "keyboard_focus": "bool",
            "mouse": "string",
            "bar_vertical": "bool",
            "bar_invert": "bool",
            "left_gutter": "int",
            "right_gutter": "int",
            "base_bar": "displayable",
            "thumb": "displayable",
            "thumb_offset": "tuple",
            "spacing": "int",
            "first_spacing": "int",
            "box_wrap": "bool",
            "box_wrap_spacing": "int",
            "box_reverse": "bool",
            "box_align": "float",
            "box_justify": "string",
            "xspacing": "int",
            "yspacing": "int",
            "margin": "tuple",
            "xmargin": "int",
            "ymargin": "int",
            "left_margin": "int",
            "right_margin": "int",
            "top_margin": "int",
            "bottom_margin": "int",
        }

        if key in type_hints:
            return type_hints[key]

        info = get_visual_editor_imported_expression_info(value)

        if info["kind"] == "bool":
            return "bool"

        if info["kind"] == "number":
            if isinstance(info["value"], int):
                return "int"

            return "float"

        if info["kind"] == "string":
            stripped_value = (value or "").strip()

            if re.match(r"""^['"]#(?:[0-9a-fA-F]{3,8})['"]$""", stripped_value):
                return "color"

            return "string"

        return "string"

    def get_visual_editor_import_line_indent(line):
        indent_match = re.match(r"^([ \t]*)", line or "")
        return len(indent_match.group(1).expandtabs(4))

    def trim_visual_editor_import_indent(line, indent_width):
        text = "{}".format(line or "")
        remaining = max(0, int(indent_width or 0))

        while remaining and text:
            if text[0] == " ":
                text = text[1:]
                remaining -= 1
            elif text[0] == "\t":
                text = text[1:]
                remaining = max(0, remaining - 4)
            else:
                break

        return text

    def collect_visual_editor_import_indented_block_lines(lines, start_index, parent_indent):
        block_lines = [ ]
        next_index = start_index

        while next_index < len(lines):
            block_line = lines[next_index].rstrip("\r\n")

            if block_line.strip() and (get_visual_editor_import_line_indent(block_line) <= parent_indent):
                break

            block_lines.append(block_line)
            next_index += 1

        return block_lines, next_index

    def strip_visual_editor_import_block_lines(block_lines, base_indent=None):
        source_lines = [ "{}".format(line or "").rstrip("\r\n") for line in (block_lines or [ ]) ]

        if base_indent is None:
            indent_candidates = [
                get_visual_editor_import_line_indent(line)
                for line in source_lines
                if line.strip()
            ]
            base_indent = min(indent_candidates) if indent_candidates else 0

        normalized_lines = [ ]

        for line in source_lines:
            if line.strip():
                normalized_lines.append(trim_visual_editor_import_indent(line, base_indent))
            else:
                normalized_lines.append("")

        return "\n".join(normalized_lines).strip("\n")

    def strip_visual_editor_import_string_expression(expression):
        info = get_visual_editor_imported_expression_info(expression)

        if info["kind"] == "string":
            return info["value"]

        return (expression or "").strip()

    def split_visual_editor_import_screen_expression(source):
        text = "{}".format(source or "").strip()

        if not text:
            return "", ""

        depth = 0
        quote = None
        escaped = False

        for index, char in enumerate(text):
            if quote:
                if escaped:
                    escaped = False
                    continue

                if char == "\\":
                    escaped = True
                    continue

                if char == quote:
                    quote = None

                continue

            if char in [ "'", '"' ]:
                quote = char
                continue

            if char in [ "(", "[", "{" ]:
                depth += 1
                continue

            if char in [ ")", "]", "}" ]:
                depth = max(0, depth - 1)
                continue

            if (depth == 0) and char.isspace():
                return text[:index].strip(), text[index:].strip()

        return text, ""

    def is_visual_editor_import_screen_statement_start(text):
        stripped = "{}".format(text or "").strip()

        if not stripped:
            return False

        return bool(re.match(
            r"""^(?:textbutton|imagebutton|viewport|transclude|transform|showif|default|window|button|frame|vbox|hbox|fixed|vpgrid|grid|null|input|side|text|label|timer|bar|vbar|for\b|if\b|on\b|key\b|use\b|add\b|elif\b|else\b|python\b|pass\b|has\b|\$)""",
            stripped,
        ))

    def try_import_visual_editor_project_meta(meta, target, expression):
        info = get_visual_editor_imported_expression_info(expression)

        if target == "config.auto_voice":
            if info["kind"] == "string":
                meta["voiceMode"] = "auto"
                meta["autoVoiceTemplate"] = info["value"]
                return True

            if info["kind"] in [ "bool", "none" ] and (not info["value"]):
                meta["voiceMode"] = "manual"
                return True

            return False

        if target == "config.side_image_tag":
            if info["kind"] == "string":
                meta["sideImageTag"] = info["value"]
                return True

            return False

        if target == "config.side_image_only_not_showing":
            if info["kind"] == "bool":
                meta["sideImageOnlyNotShowing"] = info["value"]
                return True

            return False

        if target == "config.side_image_prefix_tag":
            if info["kind"] == "string":
                meta["sideImagePrefixTag"] = info["value"]
                return True

            return False

        if target == "config.side_image_null":
            meta["sideImageNull"] = (expression or "").strip()
            return True

        if target == "config.side_image_same_transform":
            meta["sideImageSameTransform"] = (expression or "").strip()
            return True

        if target == "config.side_image_change_transform":
            meta["sideImageChangeTransform"] = (expression or "").strip()
            return True

        if target == "config.has_autosave":
            if info["kind"] == "bool":
                meta["hasAutosave"] = info["value"]
                return True

            return False

        if target == "config.autosave_frequency":
            meta["autosaveFrequency"] = "{}".format(info["value"]).strip() if info["kind"] == "number" else (expression or "").strip()
            return True

        if target == "config.has_quicksave":
            if info["kind"] == "bool":
                meta["hasQuicksave"] = info["value"]
                return True

            return False

        if target == "config.rollback_enabled":
            if info["kind"] == "bool":
                meta["rollbackEnabled"] = info["value"]
                return True

            return False

        if target == "config.rollback_length":
            meta["rollbackLength"] = "{}".format(info["value"]).strip() if info["kind"] == "number" else (expression or "").strip()
            return True

        if target == "config.hard_rollback_limit":
            meta["hardRollbackLimit"] = "{}".format(info["value"]).strip() if info["kind"] == "number" else (expression or "").strip()
            return True

        if target == "config.fix_rollback_without_choice":
            if info["kind"] == "bool":
                meta["fixRollbackWithoutChoice"] = info["value"]
                return True

            return False

        return False

    def seed_visual_editor_import_meta(meta, target, expression):
        if target != "config.name":
            return

        info = get_visual_editor_imported_expression_info(expression)

        if info["kind"] == "string":
            meta["name"] = info["value"]

    def build_visual_editor_import_state_from_options(p):
        options_path = get_visual_editor_options_path(p)

        if not os.path.isfile(options_path):
            return None

        with open(options_path, "r", encoding="utf-8") as f:
            lines = f.readlines()

        imported_state = {
            "meta": { },
            "gui": {
                "config": [ ],
                "guiPreferences": [ ],
                "preferences": [ ],
                "store": [ ],
            },
            "definitions": [ ],
        }

        define_re = re.compile(r"^define(?:\s+(-?\d+))?\s+([A-Za-z_][\w\.]*)\s*(=|\+=|\|=)\s*(.+)$")
        default_re = re.compile(r"^default\s+([A-Za-z_][\w\.]*(?:\.[A-Za-z_][\w\.]*)*)\s*=\s*(.+)$")
        init_python_re = re.compile(r"^init(?:\s+(-?\d+))?\s+python(\s+hide)?(?:\s+in\s+([A-Za-z_][\w\.]*))?\s*:\s*$")

        index = 0

        while index < len(lines):
            raw_line = lines[index].rstrip("\r\n")
            stripped = raw_line.strip()

            if (not stripped) or stripped.startswith("#"):
                index += 1
                continue

            if get_visual_editor_import_line_indent(raw_line) > 0:
                index += 1
                continue

            init_python_match = init_python_re.match(stripped)

            if init_python_match:
                block_lines = [ ]
                next_index = index + 1

                while next_index < len(lines):
                    block_line = lines[next_index].rstrip("\r\n")

                    if block_line.strip() and (block_line[:1] not in [ " ", "\t" ]):
                        break

                    block_lines.append(block_line)
                    next_index += 1

                if block_lines:
                    minimum_indent = None

                    for block_line in block_lines:
                        if not block_line.strip():
                            continue

                        indent_match = re.match(r"^([ \t]+)", block_line)
                        indent_width = len(indent_match.group(1)) if indent_match else 0

                        if minimum_indent is None:
                            minimum_indent = indent_width
                        else:
                            minimum_indent = min(minimum_indent, indent_width)

                    if minimum_indent is None:
                        minimum_indent = 0

                    code_lines = [ ]

                    for block_line in block_lines:
                        if minimum_indent:
                            code_lines.append(block_line[minimum_indent:])
                        else:
                            code_lines.append(block_line)

                    code = "\n".join(code_lines).strip("\n")

                    if code.strip():
                        append_visual_editor_import_python_block(
                            imported_state["definitions"],
                            code,
                            priority=init_python_match.group(1) or "",
                            hide=bool(init_python_match.group(2)),
                            store=init_python_match.group(3) or "",
                        )

                index = next_index
                continue

            define_match = define_re.match(stripped)

            if define_match:
                priority = define_match.group(1) or ""
                target = define_match.group(2)
                operator = define_match.group(3)
                expression, next_index = collect_visual_editor_import_expression(lines, index, define_match.group(4))

                seed_visual_editor_import_meta(imported_state["meta"], target, expression)

                if target.startswith("config.") and (operator == "=") and try_import_visual_editor_project_meta(imported_state["meta"], target, expression):
                    index = next_index + 1
                    continue

                if target.startswith("config."):
                    append_visual_editor_import_config(
                        imported_state["gui"],
                        "config",
                        target.split(".", 1)[1],
                        expression,
                    )
                    index = next_index + 1
                    continue

                append_visual_editor_import_definition(
                    imported_state["definitions"],
                    target,
                    expression,
                    operator=operator,
                    priority=priority,
                )
                index = next_index + 1
                continue

            default_match = default_re.match(stripped)

            if default_match:
                target = default_match.group(1)
                expression, next_index = collect_visual_editor_import_expression(lines, index, default_match.group(2))

                if target.startswith("preferences."):
                    append_visual_editor_import_config(
                        imported_state["gui"],
                        "preferences",
                        target.split(".", 1)[1],
                        expression,
                    )
                    index = next_index + 1
                    continue

                if "." in target:
                    store_path, name = target.rsplit(".", 1)
                else:
                    store_path = ""
                    name = target

                append_visual_editor_import_config(
                    imported_state["gui"],
                    "store",
                    name,
                    expression,
                    store_path=store_path,
                )
                index = next_index + 1
                continue

            index += 1

        imported_summary = {
            "sourcePath": get_visual_editor_relative_path(p, options_path),
            "configCount": len(imported_state["gui"]["config"]),
            "guiPreferenceCount": len(imported_state["gui"]["guiPreferences"]),
            "preferenceCount": len(imported_state["gui"]["preferences"]),
            "storeCount": len(imported_state["gui"]["store"]),
            "definitionCount": len(imported_state["definitions"]),
        }

        has_content = any([
            bool(imported_state["meta"]),
            imported_summary["configCount"],
            imported_summary["guiPreferenceCount"],
            imported_summary["preferenceCount"],
            imported_summary["storeCount"],
            imported_summary["definitionCount"],
        ])

        if not has_content:
            return None

        imported_state["meta"]["optionsImportSource"] = imported_summary["sourcePath"]

        return {
            "state": imported_state,
            "summary": imported_summary,
        }

    def build_visual_editor_import_state_from_gui(p):
        gui_path = get_visual_editor_gui_path(p)

        if not os.path.isfile(gui_path):
            return None

        with open(gui_path, "r", encoding="utf-8") as f:
            lines = f.readlines()

        imported_state = {
            "meta": { },
            "gui": {
                "styles": [ ],
                "screens": [ ],
                "config": [ ],
                "guiVariables": [ ],
                "guiPreferences": [ ],
                "preferences": [ ],
                "store": [ ],
            },
            "definitions": [ ],
        }

        define_re = re.compile(r"^define(?:\s+(-?\d+))?\s+([A-Za-z_][\w\.]*)\s*(=|\+=|\|=)\s*(.+)$")
        default_re = re.compile(r"^default\s+([A-Za-z_][\w\.]*(?:\.[A-Za-z_][\w\.]*)*)\s*=\s*(.+)$")
        init_python_re = re.compile(r"^init(?:\s+(-?\d+))?\s+python(\s+hide)?(?:\s+in\s+([A-Za-z_][\w\.]*))?\s*:\s*$")
        style_re = re.compile(r"^style\s+([A-Za-z_][\w\.]*)\s*(?:is\s+([A-Za-z_][\w\.]*))?\s*:?\s*$")
        style_variant_re = re.compile(r"^variant\s+(.+)$")
        style_properties_re = re.compile(r"^properties\s+(.+)$")
        style_property_re = re.compile(r"^([A-Za-z_][\w]*)\s+(.+)$")

        index = 0

        while index < len(lines):
            raw_line = lines[index].rstrip("\r\n")
            stripped = raw_line.strip()

            if (not stripped) or stripped.startswith("#"):
                index += 1
                continue

            if get_visual_editor_import_line_indent(raw_line) > 0:
                index += 1
                continue

            init_python_match = init_python_re.match(stripped)

            if init_python_match:
                block_lines = [ ]
                next_index = index + 1

                while next_index < len(lines):
                    block_line = lines[next_index].rstrip("\r\n")

                    if block_line.strip() and (block_line[:1] not in [ " ", "\t" ]):
                        break

                    block_lines.append(block_line)
                    next_index += 1

                if block_lines:
                    minimum_indent = None

                    for block_line in block_lines:
                        if not block_line.strip():
                            continue

                        indent_match = re.match(r"^([ \t]+)", block_line)
                        indent_width = len(indent_match.group(1)) if indent_match else 0

                        if minimum_indent is None:
                            minimum_indent = indent_width
                        else:
                            minimum_indent = min(minimum_indent, indent_width)

                    if minimum_indent is None:
                        minimum_indent = 0

                    code_lines = [ ]

                    for block_line in block_lines:
                        if minimum_indent:
                            code_lines.append(block_line[minimum_indent:])
                        else:
                            code_lines.append(block_line)

                    code = "\n".join(code_lines).strip("\n")

                    if code.strip():
                        append_visual_editor_import_python_block(
                            imported_state["definitions"],
                            code,
                            priority=init_python_match.group(1) or "",
                            hide=bool(init_python_match.group(2)),
                            store=init_python_match.group(3) or "",
                        )

                index = next_index
                continue

            style_match = style_re.match(stripped)

            if style_match:
                style_name = style_match.group(1)
                style_parent = style_match.group(2) or ""
                style_variant = ""
                style_properties_expression = ""
                style_properties = [ ]
                next_index = index + 1

                if stripped.endswith(":"):
                    block_lines = [ ]

                    while next_index < len(lines):
                        block_line = lines[next_index].rstrip("\r\n")

                        if block_line.strip() and (block_line[:1] not in [ " ", "\t" ]):
                            break

                        block_lines.append(block_line)
                        next_index += 1

                    for block_line in block_lines:
                        block_text = block_line.strip()

                        if (not block_text) or block_text.startswith("#"):
                            continue

                        variant_match = style_variant_re.match(block_text)

                        if variant_match:
                            style_variant = variant_match.group(1).strip()
                            continue

                        properties_match = style_properties_re.match(block_text)

                        if properties_match:
                            style_properties_expression = properties_match.group(1).strip()
                            continue

                        property_match = style_property_re.match(block_text)

                        if not property_match:
                            continue

                        prefix_id, property_key = get_visual_editor_gui_style_prefix(property_match.group(1))

                        style_properties.append({
                            "prefix": prefix_id,
                            "key": property_key,
                            "type": infer_visual_editor_gui_style_property_type(property_key, property_match.group(2)),
                            "value": property_match.group(2).strip(),
                        })

                append_visual_editor_import_style(
                    imported_state["gui"],
                    style_name,
                    parent=style_parent,
                    variant=style_variant,
                    properties_expression=style_properties_expression,
                    properties=style_properties,
                )
                index = next_index
                continue

            define_match = define_re.match(stripped)

            if define_match:
                priority = define_match.group(1) or ""
                target = define_match.group(2)
                operator = define_match.group(3)
                expression, next_index = collect_visual_editor_import_expression(lines, index, define_match.group(4))

                if target.startswith("gui.") and (operator == "="):
                    append_visual_editor_import_config(
                        imported_state["gui"],
                        "guiVariables",
                        target.split(".", 1)[1],
                        expression,
                    )
                    index = next_index + 1
                    continue

                if target.startswith("config.") and (operator == "="):
                    append_visual_editor_import_config(
                        imported_state["gui"],
                        "config",
                        target.split(".", 1)[1],
                        expression,
                    )
                    index = next_index + 1
                    continue

                append_visual_editor_import_definition(
                    imported_state["definitions"],
                    target,
                    expression,
                    operator=operator,
                    priority=priority,
                )
                index = next_index + 1
                continue

            default_match = default_re.match(stripped)

            if default_match:
                target = default_match.group(1)
                expression, next_index = collect_visual_editor_import_expression(lines, index, default_match.group(2))

                if target.startswith("preferences."):
                    append_visual_editor_import_config(
                        imported_state["gui"],
                        "preferences",
                        target.split(".", 1)[1],
                        expression,
                    )
                    index = next_index + 1
                    continue

                if "." in target:
                    store_path, name = target.rsplit(".", 1)
                else:
                    store_path = ""
                    name = target

                append_visual_editor_import_config(
                    imported_state["gui"],
                    "store",
                    name,
                    expression,
                    store_path=store_path,
                )
                index = next_index + 1
                continue

            index += 1

        imported_summary = {
            "sourcePath": get_visual_editor_relative_path(p, gui_path),
            "styleCount": len(imported_state["gui"]["styles"]),
            "configCount": len(imported_state["gui"]["config"]),
            "guiVariableCount": len(imported_state["gui"]["guiVariables"]),
            "guiPreferenceCount": len(imported_state["gui"]["guiPreferences"]),
            "preferenceCount": len(imported_state["gui"]["preferences"]),
            "storeCount": len(imported_state["gui"]["store"]),
            "definitionCount": len(imported_state["definitions"]),
        }

        has_content = any([
            imported_summary["styleCount"],
            imported_summary["configCount"],
            imported_summary["guiVariableCount"],
            imported_summary["guiPreferenceCount"],
            imported_summary["preferenceCount"],
            imported_summary["storeCount"],
            imported_summary["definitionCount"],
        ])

        if not has_content:
            return None

        imported_state["meta"]["guiImportSource"] = imported_summary["sourcePath"]

        return {
            "state": imported_state,
            "summary": imported_summary,
        }

    def build_visual_editor_import_state_from_screens(p):
        screens_path = get_visual_editor_screens_path(p)

        if not os.path.isfile(screens_path):
            return None

        with open(screens_path, "r", encoding="utf-8") as f:
            lines = f.readlines()

        imported_state = {
            "meta": { },
            "gui": {
                "styles": [ ],
                "screens": [ ],
                "config": [ ],
                "guiVariables": [ ],
                "guiPreferences": [ ],
                "preferences": [ ],
                "store": [ ],
            },
            "definitions": [ ],
        }

        define_re = re.compile(r"^define(?:\s+(-?\d+))?\s+([A-Za-z_][\w\.]*)\s*(=|\+=|\|=)\s*(.+)$")
        default_re = re.compile(r"^default\s+([A-Za-z_][\w\.]*(?:\.[A-Za-z_][\w\.]*)*)\s*=\s*(.+)$")
        init_python_re = re.compile(r"^init(?:\s+(-?\d+))?\s+python(\s+hide)?(?:\s+in\s+([A-Za-z_][\w\.]*))?\s*:\s*$")
        style_re = re.compile(r"^style\s+([A-Za-z_][\w\.]*)\s*(?:is\s+([A-Za-z_][\w\.]*))?\s*:?\s*$")
        style_variant_re = re.compile(r"^variant\s+(.+)$")
        style_properties_re = re.compile(r"^properties\s+(.+)$")
        style_property_re = re.compile(r"^([A-Za-z_][\w]*)\s+(.+)$")
        screen_re = re.compile(r"^screen\s+([A-Za-z_][\w\.]*)\s*(?:\((.*)\))?\s*:\s*$")

        def make_screen_node(node_type, title="", children=None, **fields):
            node = {
                "type": node_type,
                "title": (title or node_type).strip() or node_type,
                "children": children or [ ],
            }

            for key, value in fields.items():
                if value is None:
                    continue

                if isinstance(value, str):
                    if value.strip():
                        node[key] = value.strip()
                    continue

                if isinstance(value, list):
                    if value:
                        node[key] = value
                    continue

                node[key] = value

            return node

        def shorten_screen_detail(detail, fallback):
            text = "{}".format(detail or "").strip().replace("\n", " ")

            if not text:
                return fallback

            if len(text) > 32:
                text = text[:29] + "..."

            return text

        def append_node_properties(node, text):
            normalized = "{}".format(text or "").strip("\n")

            if not normalized.strip():
                return

            existing = "{}".format(node.get("propertiesExpression") or "").strip("\n")
            node["propertiesExpression"] = ("\n".join([ existing, normalized ]) if existing else normalized).strip("\n")

        def parse_inline_primary(rest):
            return split_visual_editor_import_screen_expression(rest)

        def parse_inline_pair(rest):
            first, remainder = split_visual_editor_import_screen_expression(rest)

            if not remainder:
                return first, "", ""

            second, trailing = split_visual_editor_import_screen_expression(remainder)
            return first, second, trailing

        def parse_screen_node_body(block_lines):
            if not block_lines:
                return "", [ ]

            indent_candidates = [
                get_visual_editor_import_line_indent(line)
                for line in block_lines
                if line.strip()
            ]

            if not indent_candidates:
                return "", [ ]

            base_indent = min(indent_candidates)
            parent_property_groups = [ ]
            children = [ ]
            implicit_container = None
            index = 0

            while index < len(block_lines):
                raw_line = block_lines[index]
                stripped = raw_line.strip()

                if (not stripped) or stripped.startswith("#"):
                    index += 1
                    continue

                indent = get_visual_editor_import_line_indent(raw_line)

                if indent < base_indent:
                    index += 1
                    continue

                if (indent == base_indent) and stripped.startswith("has "):
                    has_statement = stripped[4:].strip()
                    nested_lines, next_index = collect_visual_editor_import_indented_block_lines(block_lines, index + 1, indent)
                    container_node = parse_screen_statement(has_statement, nested_lines)

                    if container_node is None:
                        container_node = make_screen_node(
                            "raw",
                            "Raw",
                            text=stripped,
                        )

                    target_children = implicit_container.setdefault("children", [ ]) if implicit_container is not None else children
                    target_children.append(container_node)
                    implicit_container = container_node
                    index = next_index
                    continue

                if (indent == base_indent) and is_visual_editor_import_screen_statement_start(stripped):
                    nested_lines, next_index = collect_visual_editor_import_indented_block_lines(block_lines, index + 1, indent)
                    child_node = parse_screen_statement(stripped, nested_lines)

                    if child_node is not None:
                        target_children = implicit_container.setdefault("children", [ ]) if implicit_container is not None else children
                        target_children.append(child_node)

                    index = next_index
                    continue

                property_group_lines = [ raw_line ]
                index += 1

                while index < len(block_lines):
                    next_line = block_lines[index]
                    next_text = next_line.strip()
                    next_indent = get_visual_editor_import_line_indent(next_line)

                    if next_text and (next_indent == base_indent) and (next_text.startswith("has ") or is_visual_editor_import_screen_statement_start(next_text)):
                        break

                    property_group_lines.append(next_line)
                    index += 1

                property_text = strip_visual_editor_import_block_lines(property_group_lines, base_indent)

                if not property_text:
                    continue

                if implicit_container is not None:
                    append_node_properties(implicit_container, property_text)
                else:
                    parent_property_groups.append(property_text)

            return "\n".join(parent_property_groups).strip(), children

        def parse_screen_statement(raw_statement, block_lines):
            stripped = "{}".format(raw_statement or "").strip()

            if not stripped:
                return None

            statement = stripped[:-1].rstrip() if stripped.endswith(":") else stripped
            node = None

            if statement.startswith("textbutton "):
                primary, remainder = parse_inline_primary(statement[len("textbutton "):].strip())
                node = make_screen_node("textbutton", shorten_screen_detail(primary, "TextButton"), text=primary)
                append_node_properties(node, remainder)
            elif statement.startswith("imagebutton "):
                image_rest = statement[len("imagebutton "):].strip()
                idle_expression = ""
                hover_expression = ""
                remainder = image_rest

                if image_rest.startswith("idle "):
                    idle_expression, remainder = parse_inline_primary(image_rest[len("idle "):].strip())

                    if remainder.startswith("hover "):
                        hover_expression, remainder = parse_inline_primary(remainder[len("hover "):].strip())

                node = make_screen_node(
                    "imagebutton",
                    shorten_screen_detail(idle_expression or hover_expression, "ImageButton"),
                    displayable=idle_expression,
                    hoverDisplayable=hover_expression,
                )
                append_node_properties(node, remainder)
            elif statement.startswith("text "):
                primary, remainder = parse_inline_primary(statement[len("text "):].strip())
                node = make_screen_node("text", shorten_screen_detail(primary, "Text"), text=primary)
                append_node_properties(node, remainder)
            elif statement.startswith("label "):
                primary, remainder = parse_inline_primary(statement[len("label "):].strip())
                node = make_screen_node("label", shorten_screen_detail(primary, "Label"), text=primary)
                append_node_properties(node, remainder)
            elif statement == "button":
                node = make_screen_node("button", "Button")
            elif statement.startswith("button "):
                node = make_screen_node("button", "Button")
                append_node_properties(node, statement[len("button "):].strip())
            elif statement in [ "frame", "window", "vbox", "hbox", "fixed", "viewport" ]:
                node = make_screen_node(statement, statement.title())
            elif statement.startswith("grid "):
                columns, rows, remainder = parse_inline_pair(statement[len("grid "):].strip())
                node = make_screen_node("grid", "Grid", gridColumns=columns, gridRows=rows)
                append_node_properties(node, remainder)
            elif statement == "grid":
                node = make_screen_node("grid", "Grid")
            elif statement.startswith("vpgrid "):
                columns, rows, remainder = parse_inline_pair(statement[len("vpgrid "):].strip())
                node = make_screen_node("vpgrid", "VPGrid", gridColumns=columns, gridRows=rows)
                append_node_properties(node, remainder)
            elif statement == "vpgrid":
                node = make_screen_node("vpgrid", "VPGrid")
            elif statement.startswith("side "):
                primary, remainder = parse_inline_primary(statement[len("side "):].strip())
                node = make_screen_node("side", "Side", sidePositions=strip_visual_editor_import_string_expression(primary))
                append_node_properties(node, remainder)
            elif statement == "null":
                node = make_screen_node("null", "Null")
            elif statement.startswith("null "):
                node = make_screen_node("null", "Null")
                append_node_properties(node, statement[len("null "):].strip())
            elif statement in [ "bar", "vbar", "input" ]:
                node = make_screen_node(statement, statement.upper() if statement == "vbar" else statement.title())
            elif statement.startswith("bar "):
                node = make_screen_node("bar", "Bar")
                append_node_properties(node, statement[len("bar "):].strip())
            elif statement.startswith("vbar "):
                node = make_screen_node("vbar", "VBar")
                append_node_properties(node, statement[len("vbar "):].strip())
            elif statement.startswith("input "):
                node = make_screen_node("input", "Input")
                append_node_properties(node, statement[len("input "):].strip())
            elif statement.startswith("add "):
                primary, remainder = parse_inline_primary(statement[len("add "):].strip())
                node = make_screen_node("add", shorten_screen_detail(primary, "Add"), displayable=primary)
                append_node_properties(node, remainder)
            elif statement.startswith("if "):
                node = make_screen_node("if", shorten_screen_detail(statement[len("if "):].strip(), "If"), condition=statement[len("if "):].strip())
            elif statement.startswith("showif "):
                node = make_screen_node("showif", shorten_screen_detail(statement[len("showif "):].strip(), "ShowIf"), condition=statement[len("showif "):].strip())
            elif statement.startswith("for "):
                loop_text = statement[len("for "):].strip()
                loop_match = re.match(r"^(.+?)\s+in\s+(.+)$", loop_text)

                if loop_match:
                    node = make_screen_node(
                        "for",
                        shorten_screen_detail(loop_text, "For"),
                        variableName=loop_match.group(1).strip(),
                        iterableExpression=loop_match.group(2).strip(),
                    )
                else:
                    node = make_screen_node("raw", "Raw", text=stripped)
            elif statement.startswith("use "):
                use_target = statement[len("use "):].strip()
                use_match = re.match(r"^([A-Za-z_][\w\.]*)\s*\((.*)\)$", use_target)

                if use_match:
                    node = make_screen_node(
                        "use",
                        shorten_screen_detail(use_target, "Use"),
                        targetScreen=use_match.group(1).strip(),
                        targetArguments=use_match.group(2).strip(),
                    )
                else:
                    node = make_screen_node("use", shorten_screen_detail(use_target, "Use"), targetScreen=use_target)
            elif statement.startswith("default "):
                default_match = re.match(r"^default\s+([A-Za-z_][\w]*)\s*=\s*(.+)$", statement)

                if default_match:
                    node = make_screen_node(
                        "default",
                        shorten_screen_detail(default_match.group(1), "Default"),
                        defaultName=default_match.group(1).strip(),
                        defaultValue=default_match.group(2).strip(),
                    )
                else:
                    node = make_screen_node("raw", "Raw", text=stripped)
            elif statement.startswith("on "):
                node = make_screen_node("on", shorten_screen_detail(statement[len("on "):].strip(), "On"), eventName=strip_visual_editor_import_string_expression(statement[len("on "):].strip()))
            elif statement.startswith("timer "):
                primary, remainder = parse_inline_primary(statement[len("timer "):].strip())
                node = make_screen_node("timer", shorten_screen_detail(primary, "Timer"), delay=primary)
                append_node_properties(node, remainder)
            elif statement.startswith("key "):
                primary, remainder = parse_inline_primary(statement[len("key "):].strip())
                node = make_screen_node("key", shorten_screen_detail(primary, "Key"), keyName=strip_visual_editor_import_string_expression(primary))
                append_node_properties(node, remainder)
            elif statement == "transform":
                node = make_screen_node("transform", "Transform")
            elif statement == "transclude":
                node = make_screen_node("transclude", "Transclude")
            elif statement.startswith("elif ") or (statement == "else") or statement.startswith("$") or statement.startswith("python") or (statement == "pass"):
                node = make_screen_node("raw", shorten_screen_detail(statement, "Raw"), text=stripped)
            else:
                node = make_screen_node("raw", shorten_screen_detail(statement, "Raw"), text=stripped)

            if block_lines:
                if statement.startswith("python"):
                    append_node_properties(node, strip_visual_editor_import_block_lines(block_lines))
                else:
                    property_text, child_nodes = parse_screen_node_body(block_lines)
                    append_node_properties(node, property_text)

                    if child_nodes:
                        node["children"] = child_nodes

            return node

        def parse_screen_body(block_lines):
            screen_data = {
                "tag": "",
                "modal": False,
                "zorder": "",
                "variant": "",
                "headStatements": "",
                "nodes": [ ],
            }

            if not block_lines:
                return screen_data

            indent_candidates = [
                get_visual_editor_import_line_indent(line)
                for line in block_lines
                if line.strip()
            ]

            if not indent_candidates:
                return screen_data

            base_indent = min(indent_candidates)
            head_statement_groups = [ ]
            implicit_container = None
            saw_nodes = False
            index = 0

            while index < len(block_lines):
                raw_line = block_lines[index]
                stripped = raw_line.strip()

                if (not stripped) or stripped.startswith("#"):
                    index += 1
                    continue

                indent = get_visual_editor_import_line_indent(raw_line)

                if indent != base_indent:
                    index += 1
                    continue

                if stripped.startswith("tag "):
                    screen_data["tag"] = strip_visual_editor_import_string_expression(stripped[len("tag "):].strip())
                    index += 1
                    continue

                if stripped.startswith("modal "):
                    screen_data["modal"] = stripped[len("modal "):].strip() == "True"
                    index += 1
                    continue

                if stripped.startswith("zorder "):
                    screen_data["zorder"] = stripped[len("zorder "):].strip()
                    index += 1
                    continue

                if stripped.startswith("variant "):
                    screen_data["variant"] = stripped[len("variant "):].strip()
                    index += 1
                    continue

                if (not saw_nodes) and (not stripped.startswith("has ")) and (not is_visual_editor_import_screen_statement_start(stripped)):
                    head_group_lines = [ raw_line ]
                    index += 1

                    while index < len(block_lines):
                        next_line = block_lines[index]
                        next_text = next_line.strip()
                        next_indent = get_visual_editor_import_line_indent(next_line)

                        if next_text and (next_indent == base_indent) and (next_text.startswith("tag ") or next_text.startswith("modal ") or next_text.startswith("zorder ") or next_text.startswith("variant ") or next_text.startswith("has ") or is_visual_editor_import_screen_statement_start(next_text)):
                            break

                        head_group_lines.append(next_line)
                        index += 1

                    head_text = strip_visual_editor_import_block_lines(head_group_lines, base_indent)

                    if head_text:
                        head_statement_groups.append(head_text)

                    continue

                nested_lines, next_index = collect_visual_editor_import_indented_block_lines(block_lines, index + 1, indent)

                if stripped.startswith("has "):
                    container_node = parse_screen_statement(stripped[4:].strip(), nested_lines)

                    if container_node is not None:
                        screen_data["nodes"].append(container_node)
                        implicit_container = container_node
                        saw_nodes = True

                    index = next_index
                    continue

                node = parse_screen_statement(stripped, nested_lines)

                if node is not None:
                    target_nodes = implicit_container.setdefault("children", [ ]) if implicit_container is not None else screen_data["nodes"]
                    target_nodes.append(node)
                    saw_nodes = True

                index = next_index

            screen_data["headStatements"] = "\n".join(head_statement_groups).strip()
            return screen_data

        index = 0

        while index < len(lines):
            raw_line = lines[index].rstrip("\r\n")
            stripped = raw_line.strip()

            if (not stripped) or stripped.startswith("#"):
                index += 1
                continue

            if get_visual_editor_import_line_indent(raw_line) > 0:
                index += 1
                continue

            init_python_match = init_python_re.match(stripped)

            if init_python_match:
                block_lines, next_index = collect_visual_editor_import_indented_block_lines(lines, index + 1, 0)
                code = strip_visual_editor_import_block_lines(block_lines)

                if code.strip():
                    append_visual_editor_import_python_block(
                        imported_state["definitions"],
                        code,
                        priority=init_python_match.group(1) or "",
                        hide=bool(init_python_match.group(2)),
                        store=init_python_match.group(3) or "",
                    )

                index = next_index
                continue

            style_match = style_re.match(stripped)

            if style_match:
                style_name = style_match.group(1)
                style_parent = style_match.group(2) or ""
                style_variant = ""
                style_properties_expression = ""
                style_properties = [ ]
                next_index = index + 1

                if stripped.endswith(":"):
                    block_lines, next_index = collect_visual_editor_import_indented_block_lines(lines, index + 1, 0)

                    for block_line in block_lines:
                        block_text = block_line.strip()

                        if (not block_text) or block_text.startswith("#"):
                            continue

                        variant_match = style_variant_re.match(block_text)

                        if variant_match:
                            style_variant = variant_match.group(1).strip()
                            continue

                        properties_match = style_properties_re.match(block_text)

                        if properties_match:
                            style_properties_expression = properties_match.group(1).strip()
                            continue

                        property_match = style_property_re.match(block_text)

                        if not property_match:
                            continue

                        prefix_id, property_key = get_visual_editor_gui_style_prefix(property_match.group(1))
                        style_properties.append({
                            "prefix": prefix_id,
                            "key": property_key,
                            "type": infer_visual_editor_gui_style_property_type(property_key, property_match.group(2)),
                            "value": property_match.group(2).strip(),
                        })

                append_visual_editor_import_style(
                    imported_state["gui"],
                    style_name,
                    parent=style_parent,
                    variant=style_variant,
                    properties_expression=style_properties_expression,
                    properties=style_properties,
                )
                index = next_index
                continue

            screen_match = screen_re.match(stripped)

            if screen_match:
                screen_name = screen_match.group(1)
                screen_parameters = (screen_match.group(2) or "").strip()
                block_lines, next_index = collect_visual_editor_import_indented_block_lines(lines, index + 1, 0)
                screen_data = parse_screen_body(block_lines)
                imported_state["gui"]["screens"].append({
                    "name": screen_name,
                    "parameters": screen_parameters,
                    "tag": screen_data["tag"],
                    "modal": screen_data["modal"],
                    "zorder": screen_data["zorder"],
                    "variant": screen_data["variant"],
                    "headStatements": screen_data["headStatements"],
                    "nodes": screen_data["nodes"],
                })
                index = next_index
                continue

            define_match = define_re.match(stripped)

            if define_match:
                priority = define_match.group(1) or ""
                target = define_match.group(2)
                operator = define_match.group(3)
                expression, next_index = collect_visual_editor_import_expression(lines, index, define_match.group(4))

                if target.startswith("gui.") and (operator == "="):
                    append_visual_editor_import_config(
                        imported_state["gui"],
                        "guiVariables",
                        target.split(".", 1)[1],
                        expression,
                    )
                    index = next_index + 1
                    continue

                if target.startswith("config.") and (operator == "="):
                    append_visual_editor_import_config(
                        imported_state["gui"],
                        "config",
                        target.split(".", 1)[1],
                        expression,
                    )
                    index = next_index + 1
                    continue

                append_visual_editor_import_definition(
                    imported_state["definitions"],
                    target,
                    expression,
                    operator=operator,
                    priority=priority,
                )
                index = next_index + 1
                continue

            default_match = default_re.match(stripped)

            if default_match:
                target = default_match.group(1)
                expression, next_index = collect_visual_editor_import_expression(lines, index, default_match.group(2))

                if target.startswith("preferences."):
                    append_visual_editor_import_config(
                        imported_state["gui"],
                        "preferences",
                        target.split(".", 1)[1],
                        expression,
                    )
                    index = next_index + 1
                    continue

                if "." in target:
                    store_path, name = target.rsplit(".", 1)
                else:
                    store_path = ""
                    name = target

                append_visual_editor_import_config(
                    imported_state["gui"],
                    "store",
                    name,
                    expression,
                    store_path=store_path,
                )
                index = next_index + 1
                continue

            index += 1

        imported_summary = {
            "sourcePath": get_visual_editor_relative_path(p, screens_path),
            "styleCount": len(imported_state["gui"]["styles"]),
            "screenCount": len(imported_state["gui"]["screens"]),
            "configCount": len(imported_state["gui"]["config"]),
            "guiVariableCount": len(imported_state["gui"]["guiVariables"]),
            "guiPreferenceCount": len(imported_state["gui"]["guiPreferences"]),
            "preferenceCount": len(imported_state["gui"]["preferences"]),
            "storeCount": len(imported_state["gui"]["store"]),
            "definitionCount": len(imported_state["definitions"]),
        }

        has_content = any([
            imported_summary["styleCount"],
            imported_summary["screenCount"],
            imported_summary["configCount"],
            imported_summary["guiVariableCount"],
            imported_summary["guiPreferenceCount"],
            imported_summary["preferenceCount"],
            imported_summary["storeCount"],
            imported_summary["definitionCount"],
        ])

        if not has_content:
            return None

        imported_state["meta"]["screensImportSource"] = imported_summary["sourcePath"]

        return {
            "state": imported_state,
            "summary": imported_summary,
        }

    def build_visual_editor_import_state(p):
        results = [
            build_visual_editor_import_state_from_options(p),
            build_visual_editor_import_state_from_gui(p),
            build_visual_editor_import_state_from_screens(p),
        ]
        results = [ result for result in results if result is not None ]

        if not results:
            return None

        imported_state = {
            "meta": { },
            "gui": {
                "styles": [ ],
                "config": [ ],
                "guiVariables": [ ],
                "guiPreferences": [ ],
                "preferences": [ ],
                "store": [ ],
            },
            "definitions": [ ],
        }
        imported_summary = {
            "sourcePath": "",
            "sourcePaths": [ ],
            "styleCount": 0,
            "screenCount": 0,
            "configCount": 0,
            "guiVariableCount": 0,
            "guiPreferenceCount": 0,
            "preferenceCount": 0,
            "storeCount": 0,
            "definitionCount": 0,
        }

        for result in results:
            imported_state["meta"].update(result["state"].get("meta", { }))
            gui_state = result["state"].get("gui", { })

            for gui_key in imported_state["gui"].keys():
                imported_state["gui"][gui_key].extend(gui_state.get(gui_key, [ ]))

            imported_state["definitions"].extend(result["state"].get("definitions", [ ]))

            source_path = result["summary"].get("sourcePath", "")

            if source_path and (source_path not in imported_summary["sourcePaths"]):
                imported_summary["sourcePaths"].append(source_path)

            for summary_key in [ "styleCount", "screenCount", "configCount", "guiVariableCount", "guiPreferenceCount", "preferenceCount", "storeCount", "definitionCount" ]:
                imported_summary[summary_key] += int(result["summary"].get(summary_key, 0) or 0)

        imported_summary["sourcePath"] = " + ".join(imported_summary["sourcePaths"])

        return {
            "state": imported_state,
            "summary": imported_summary,
        }

    def normalize_visual_editor_relpath(path):
        return os.path.normpath((path or "").replace("/", os.sep).replace("\\", os.sep))

    def get_visual_editor_relative_path(p, path):
        return os.path.relpath(path, p.path).replace("\\", "/")

    def get_visual_editor_game_relative_path(p, path):
        return os.path.relpath(path, p.gamedir).replace("\\", "/")

    def resolve_visual_editor_project_path(p, path):
        if not path:
            raise Exception("Visual editor artifact is missing a target path.")

        normalized = normalize_visual_editor_relpath(path)

        if os.path.isabs(normalized):
            resolved = os.path.normpath(normalized)
        else:
            resolved = os.path.normpath(os.path.join(p.path, normalized))

        project_root = os.path.normpath(p.path)

        try:
            if os.path.commonpath([project_root, resolved]) != project_root:
                raise Exception()
        except Exception:
            raise Exception("Visual editor artifact paths must stay inside the project.")

        return resolved

    def resolve_visual_editor_game_path(p, path):
        if not path:
            raise Exception("Visual editor asset path is missing.")

        normalized = normalize_visual_editor_relpath(path)

        if os.path.isabs(normalized):
            resolved = os.path.normpath(normalized)
        else:
            resolved = os.path.normpath(os.path.join(p.gamedir, normalized))

        game_root = os.path.normpath(p.gamedir)

        try:
            if os.path.commonpath([game_root, resolved]) != game_root:
                raise Exception()
        except Exception:
            raise Exception("Visual editor asset paths must stay inside the game directory.")

        return resolved

    def is_visual_editor_generated_script_path(p, path):
        normalized_path = os.path.normcase(os.path.normpath(path))
        export_path = os.path.normcase(os.path.normpath(get_visual_editor_export_path(p)))
        generated_dir = os.path.normcase(os.path.normpath(get_visual_editor_generated_dir(p)))

        if normalized_path == export_path:
            return True

        try:
            return os.path.commonpath([generated_dir, normalized_path]) == generated_dir
        except Exception:
            return False

    def scan_visual_editor_script_symbols(p):
        label_pattern = re.compile(r"^\s*label\s+([A-Za-z_][\w.]*)\s*(?:\([^)]*\))?\s*:")
        screen_pattern = re.compile(r"^\s*screen\s+([A-Za-z_][\w.]*)\s*(?:\([^)]*\))?\s*:")
        define_pattern = re.compile(r"^\s*define\s+([A-Za-z_][\w.]*)\s*=")

        rv = {
            "labels": [],
            "screens": [],
            "defines": [],
        }

        if not os.path.isdir(p.gamedir):
            return rv

        for root, _dirs, files in os.walk(p.gamedir):
            for fn in sorted(files):
                if not fn.lower().endswith(".rpy"):
                    continue

                full_path = os.path.join(root, fn)

                if is_visual_editor_generated_script_path(p, full_path):
                    continue

                rel_path = get_visual_editor_relative_path(p, full_path)

                with open(full_path, "r", encoding="utf-8") as f:
                    for line_number, line in enumerate(f, start=1):
                        if line.lstrip().startswith("#"):
                            continue

                        label_match = label_pattern.match(line)
                        if label_match:
                            rv["labels"].append({
                                "name": label_match.group(1),
                                "path": rel_path,
                                "line": line_number,
                            })
                            continue

                        screen_match = screen_pattern.match(line)
                        if screen_match:
                            rv["screens"].append({
                                "name": screen_match.group(1),
                                "path": rel_path,
                                "line": line_number,
                            })
                            continue

                        define_match = define_pattern.match(line)
                        if define_match:
                            rv["defines"].append({
                                "name": define_match.group(1),
                                "path": rel_path,
                                "line": line_number,
                            })

        return rv

    def find_visual_editor_existing_asset_paths(p, file_name):
        basename = os.path.basename(file_name or "").strip()

        if not basename or (not os.path.isdir(p.gamedir)):
            return [ ]

        matches = [ ]
        basename_lower = basename.lower()
        skipped_dirnames = { "cache", "saves" }

        for root, dirnames, files in os.walk(p.gamedir):
            dirnames[:] = [ dirname for dirname in dirnames if dirname.lower() not in skipped_dirnames ]

            for fn in files:
                if fn.lower() != basename_lower:
                    continue

                full_path = os.path.join(root, fn)

                if full_path == get_visual_editor_export_path(p):
                    continue

                if full_path.startswith(get_visual_editor_generated_dir(p) + os.sep):
                    continue

                matches.append(get_visual_editor_game_relative_path(p, full_path))

        return matches

    def normalize_visual_editor_asset_reference_path(path):
        raw = "{}".format(path or "").strip().replace("\\", "/")

        if not raw:
            return None

        if (raw[0] in ("'", '"')) and (raw[-1:] == raw[0]):
            raw = raw[1:-1].strip()

        if (not raw) or any(token in raw for token in [ "(", ")", "{", "}", "[", "]", " " ]):
            return None

        if "." not in os.path.basename(raw):
            return None

        return raw

    def resolve_visual_editor_asset_reference_path(p, path):
        normalized = normalize_visual_editor_asset_reference_path(path)

        if not normalized:
            return None

        if normalized.startswith("game/"):
            resolved = os.path.normpath(os.path.join(p.path, normalize_visual_editor_relpath(normalized)))
        else:
            resolved = os.path.normpath(os.path.join(p.gamedir, normalize_visual_editor_relpath(normalized)))

        project_root = os.path.normpath(p.path)

        try:
            if os.path.commonpath([project_root, resolved]) != project_root:
                return None
        except Exception:
            return None

        return resolved

    def iter_visual_editor_asset_references(state):
        for image in state.get("images", [ ]):
            source_path = "{}".format(image.get("sourcePath", "")).strip()

            if source_path:
                yield {
                    "kind": "image",
                    "name": "{}".format(image.get("name", "")).strip() or "Unnamed Image",
                    "path": source_path,
                }

            movie_path = "{}".format(image.get("moviePlay", "")).strip()

            if movie_path:
                yield {
                    "kind": "movie",
                    "name": "{}".format(image.get("name", "")).strip() or "Unnamed Movie",
                    "path": movie_path,
                }

        for definition in state.get("live2d", [ ]):
            model_path = "{}".format(definition.get("modelPath", "")).strip()

            if model_path:
                yield {
                    "kind": "live2d",
                    "name": "{}".format(definition.get("name", "")).strip() or "Unnamed Live2D",
                    "path": model_path,
                }

        for audio in state.get("audio", [ ]):
            source_path = "{}".format(audio.get("sourcePath", "")).strip()

            if source_path:
                yield {
                    "kind": "audio",
                    "name": "{}".format(audio.get("name", "")).strip() or "Unnamed Audio",
                    "path": source_path,
                }

    def build_visual_editor_health_snapshot(p, state):
        state_meta = state.get("meta", { }) if isinstance(state, dict) else { }
        state_path = get_visual_editor_state_path(p)
        export_path = get_visual_editor_export_path(p)
        legacy_gui_targets = get_visual_editor_legacy_takeover_targets(p)
        legacy_script_targets = get_visual_editor_legacy_script_targets(p)
        gui_state = state.get("gui", { }) if isinstance(state, dict) else { }
        screen_names = set()

        if isinstance(gui_state, dict):
            for screen in gui_state.get("screens", [ ]):
                if not isinstance(screen, dict):
                    continue

                screen_name = "{}".format(screen.get("name", "")).strip()

                if screen_name:
                    screen_names.add(screen_name)

        missing_assets = [ ]

        for reference in iter_visual_editor_asset_references(state if isinstance(state, dict) else { }):
            resolved_path = resolve_visual_editor_asset_reference_path(p, reference["path"])

            if (resolved_path is None) or (not os.path.isfile(resolved_path)):
                missing_assets.append(reference)

        return {
            "stateFile": {
                "path": get_visual_editor_relative_path(p, state_path),
                "exists": os.path.isfile(state_path),
                "modifiedAt": int(os.path.getmtime(state_path) * 1000) if os.path.isfile(state_path) else None,
            },
            "exportFile": {
                "path": get_visual_editor_relative_path(p, export_path),
                "exists": os.path.isfile(export_path),
                "modifiedAt": int(os.path.getmtime(export_path) * 1000) if os.path.isfile(export_path) else None,
            },
            "legacyGuiFiles": legacy_gui_targets,
            "legacyScriptFiles": legacy_script_targets,
            "takeover": {
                "guiTakenOver": bool(isinstance(state_meta.get("legacyGuiTakeover"), dict) and state_meta.get("legacyGuiTakeover", { }).get("takenOver")),
                "scriptTakenOver": bool(isinstance(state_meta.get("legacyScriptTakeover"), dict) and state_meta.get("legacyScriptTakeover", { }).get("takenOver")),
            },
            "confirmScreen": {
                "mode": "project" if ("confirm" in screen_names or "yesno_prompt" in screen_names) else "fallback",
                "hasProjectScreen": ("confirm" in screen_names) or ("yesno_prompt" in screen_names),
            },
            "missingAssets": missing_assets,
        }

    def import_visual_editor_asset_file(p, relative_path, file_name, content_b64, match_existing=False, allow_overwrite=False):
        basename = os.path.basename(file_name or "").strip()

        if not basename:
            raise Exception("Imported asset is missing a file name.")

        if match_existing:
            existing_paths = find_visual_editor_existing_asset_paths(p, basename)

            if len(existing_paths) == 1:
                return {
                    "path": existing_paths[0],
                    "imported": False,
                    "matchedExisting": True,
                    "overwrote": False,
                }

            if len(existing_paths) > 1:
                raise ValueError(json.dumps({
                    "error": "Multiple project files already use this resource name.",
                    "conflictType": "ambiguous_existing_asset",
                    "matches": existing_paths,
                }))

        if not content_b64:
            raise Exception("Imported asset is missing file content.")

        try:
            decoded = base64.b64decode(content_b64)
        except Exception:
            raise Exception("Imported asset content is not valid base64.")

        target_path = resolve_visual_editor_game_path(p, relative_path)
        target_dir = os.path.dirname(target_path)

        if target_dir and (not os.path.isdir(target_dir)):
            os.makedirs(target_dir)

        overwrote = os.path.isfile(target_path)

        if overwrote and (not allow_overwrite):
            raise ValueError(json.dumps({
                "error": "The destination asset path already exists.",
                "conflictType": "overwrite_asset",
                "path": get_visual_editor_game_relative_path(p, target_path),
            }))

        with open(target_path, "wb") as f:
            f.write(decoded)

        return {
            "path": get_visual_editor_game_relative_path(p, target_path),
            "imported": True,
            "matchedExisting": False,
            "overwrote": overwrote,
        }

    def get_visual_editor_artifact_symbols(artifact):
        rv = [ ]

        for symbol in artifact.get("symbols", [ ]):
            symbol_type = symbol.get("type", "").strip()
            symbol_name = symbol.get("name", "").strip()

            if symbol_type and symbol_name:
                rv.append({
                    "type": symbol_type,
                    "name": symbol_name,
                })

        if rv:
            return rv

        if artifact.get("type") == "managed_label_body":
            label_name = artifact.get("label", "").strip()

            if label_name:
                rv.append({
                    "type": "label",
                    "name": label_name,
                })

        return rv

    def get_visual_editor_symbol_index(entries):
        rv = { }

        for entry in entries:
            rv.setdefault(entry["name"], [ ]).append(entry)

        return rv

    def summarize_visual_editor_conflicts(conflicts):
        first = conflicts[0]
        message = first.get("message", "Visual editor export conflict detected.")

        if len(conflicts) > 1:
            message += " {} additional conflict(s) found.".format(len(conflicts) - 1)

        return message

    def validate_visual_editor_export_artifacts(p, artifacts):
        symbols = scan_visual_editor_script_symbols(p)
        label_index = get_visual_editor_symbol_index(symbols["labels"])
        conflicts = [ ]
        seen = set()
        managed_targets = { }

        for artifact in artifacts:
            artifact_type = artifact.get("type", "managed_file")
            artifact_path = normalize_visual_editor_relpath(artifact.get("path", "")).replace("\\", "/")

            for symbol in get_visual_editor_artifact_symbols(artifact):
                if symbol["type"] != "label":
                    continue

                existing = label_index.get(symbol["name"], [ ])

                if artifact_type == "managed_label_body":
                    managed_target_key = "{}::{}".format(artifact_path, symbol["name"])
                    previous_target = managed_targets.get(managed_target_key)

                    if previous_target is not None:
                        conflicts.append({
                            "type": "label",
                            "name": symbol["name"],
                            "path": artifact_path,
                            "line": 0,
                            "artifactPath": artifact_path,
                            "reason": "managed_label_duplicate_target",
                            "message": "Label \"{}\" in {} is already managed by another visual editor graph. Please adopt or rename before exporting.".format(
                                symbol["name"],
                                artifact_path,
                            ),
                        })
                        continue

                    managed_targets[managed_target_key] = artifact
                    had_conflict = False
                    matching = [ entry for entry in existing if normalize_visual_editor_relpath(entry["path"]).replace("\\", "/") == artifact_path ]
                    conflicting = [ entry for entry in existing if normalize_visual_editor_relpath(entry["path"]).replace("\\", "/") != artifact_path ]

                    if len(matching) != 1 or conflicting:
                        reference = (conflicting or matching or existing or [ { "path": artifact_path or "(unknown)", "line": 0 } ])[0]
                        key = ("managed_label_body", symbol["name"], reference["path"], reference.get("line", 0))

                        if key in seen:
                            continue

                        seen.add(key)
                        conflicts.append({
                            "type": "label",
                            "name": symbol["name"],
                            "path": reference["path"],
                            "line": reference.get("line", 0),
                            "artifactPath": artifact_path,
                            "reason": "managed_label_target_mismatch",
                            "message": "Label \"{}\" already exists in {}:{}; please adopt or rename before exporting.".format(
                                symbol["name"],
                                reference["path"],
                                reference.get("line", 0),
                            ),
                        })
                        had_conflict = True

                    if had_conflict:
                        continue

                    try:
                        target_path = resolve_visual_editor_project_path(p, artifact.get("path", ""))
                    except Exception as e:
                        conflicts.append({
                            "type": "label",
                            "name": symbol["name"],
                            "path": artifact_path or "(unknown)",
                            "line": 0,
                            "artifactPath": artifact_path,
                            "reason": "managed_label_path_invalid",
                            "message": str(e),
                        })
                        continue

                    if not os.path.isfile(target_path):
                        conflicts.append({
                            "type": "label",
                            "name": symbol["name"],
                            "path": artifact_path,
                            "line": 0,
                            "artifactPath": artifact_path,
                            "reason": "managed_label_target_missing",
                            "message": "Managed label target {} was not found. Please adopt or rename before exporting.".format(artifact_path),
                        })
                        continue

                    with open(target_path, "r", encoding="utf-8") as f:
                        target_text = f.read()

                    marker_id = artifact.get("markerId", "").strip()

                    if marker_id and (not has_visual_editor_managed_block(target_text, marker_id)):
                        conflicts.append({
                            "type": "label",
                            "name": symbol["name"],
                            "path": artifact_path,
                            "line": 0,
                            "artifactPath": artifact_path,
                            "reason": "managed_label_marker_missing",
                            "message": "Managed block markers for {} were not found in {}. Please adopt or rename before exporting.".format(
                                marker_id,
                                artifact_path,
                            ),
                        })
                    continue

                if not existing:
                    continue

                reference = existing[0]
                key = ("managed_file", symbol["name"], reference["path"], reference.get("line", 0))

                if key in seen:
                    continue

                seen.add(key)
                conflicts.append({
                    "type": "label",
                    "name": symbol["name"],
                    "path": reference["path"],
                    "line": reference.get("line", 0),
                    "artifactPath": artifact_path,
                    "reason": "label_exists",
                    "message": "Label \"{}\" already exists in {}:{}; please adopt or rename before exporting.".format(
                        symbol["name"],
                        reference["path"],
                        reference.get("line", 0),
                    ),
                })

        return symbols, conflicts

    def get_visual_editor_managed_markers(marker_id):
        return (
            "# >>> {} begin".format(marker_id),
            "# <<< {} end".format(marker_id),
        )

    def has_visual_editor_managed_block(text, marker_id):
        begin_marker, end_marker = get_visual_editor_managed_markers(marker_id)
        saw_begin = False

        for line in text.splitlines():
            stripped = line.strip()

            if stripped == begin_marker:
                saw_begin = True
                continue

            if saw_begin and stripped == end_marker:
                return True

        return False

    def write_visual_editor_state_file(p, state):
        state_path = get_visual_editor_state_path(p)

        with open(state_path, "w", encoding="utf-8") as f:
            json.dump(state, f, ensure_ascii=False, indent=2)
            f.write("\n")

        return state_path

    def write_visual_editor_export_file(p, code):
        if not code:
            raise Exception("Missing generated Ren'Py code.")

        export_path = get_visual_editor_export_path(p)
        generated_dir = get_visual_editor_generated_dir(p)

        if os.path.isdir(generated_dir):
            shutil.rmtree(generated_dir)

        with open(export_path, "w", encoding="utf-8") as f:
            f.write(code.rstrip())
            f.write("\n")

        return export_path

    def backup_visual_editor_project_file(p, target_path):
        rel_path = get_visual_editor_relative_path(p, target_path)
        backup_root = os.path.join(get_visual_editor_backup_dir(p), uuid.uuid4().hex)
        backup_path = os.path.join(backup_root, normalize_visual_editor_relpath(rel_path))
        backup_dir = os.path.dirname(backup_path)

        if backup_dir and (not os.path.isdir(backup_dir)):
            os.makedirs(backup_dir)

        shutil.copy2(target_path, backup_path)

        return backup_path

    def backup_visual_editor_project_files(p, target_paths, backup_prefix="takeover"):
        existing_paths = [ path for path in target_paths if os.path.isfile(path) ]

        if not existing_paths:
            return None, [ ]

        backup_root = os.path.join(get_visual_editor_backup_dir(p), "{}_{}".format(backup_prefix, uuid.uuid4().hex))
        backed_up = [ ]

        for target_path in existing_paths:
            rel_path = get_visual_editor_relative_path(p, target_path)
            backup_path = os.path.join(backup_root, normalize_visual_editor_relpath(rel_path))
            backup_dir = os.path.dirname(backup_path)

            if backup_dir and (not os.path.isdir(backup_dir)):
                os.makedirs(backup_dir)

            shutil.copy2(target_path, backup_path)
            backed_up.append({
                "path": rel_path,
                "backupPath": get_visual_editor_relative_path(p, backup_path),
            })

        return backup_root, backed_up

    def get_visual_editor_legacy_takeover_targets(p):
        targets = [ ]

        for role, source_path in [
            ("options", get_visual_editor_options_path(p)),
            ("gui", get_visual_editor_gui_path(p)),
            ("screens", get_visual_editor_screens_path(p)),
        ]:
            compiled_path = "{}c".format(source_path)
            targets.append({
                "role": role,
                "kind": "source",
                "path": source_path,
                "relativePath": get_visual_editor_relative_path(p, source_path),
                "exists": os.path.isfile(source_path),
            })
            targets.append({
                "role": role,
                "kind": "compiled",
                "path": compiled_path,
                "relativePath": get_visual_editor_relative_path(p, compiled_path),
                "exists": os.path.isfile(compiled_path),
            })

        return targets

    def get_visual_editor_legacy_script_targets(p):
        script_path = get_visual_editor_script_path(p)
        compiled_path = "{}c".format(script_path)

        return [
            {
                "kind": "source",
                "path": script_path,
                "relativePath": get_visual_editor_relative_path(p, script_path),
                "exists": os.path.isfile(script_path),
            },
            {
                "kind": "compiled",
                "path": compiled_path,
                "relativePath": get_visual_editor_relative_path(p, compiled_path),
                "exists": os.path.isfile(compiled_path),
            },
        ]

    def sync_visual_editor_legacy_script_takeover(p, state):
        script_targets = get_visual_editor_legacy_script_targets(p)
        existing_targets = [ target for target in script_targets if target["exists"] ]
        deleted_paths = [ ]

        for target in existing_targets:
            os.remove(target["path"])
            deleted_paths.append(target["relativePath"])

        meta = state.setdefault("meta", { })
        previous_takeover = meta.get("legacyScriptTakeover", { })

        if not isinstance(previous_takeover, dict):
            previous_takeover = { }

        takeover_meta = {
            "confirmed": True,
            "takenOver": True,
            "targetPaths": [ target["relativePath"] for target in script_targets ],
            "deletedPaths": deleted_paths or previous_takeover.get("deletedPaths", [ ]),
        }

        meta["legacyScriptTakeover"] = takeover_meta
        state_path = write_visual_editor_state_file(p, state)

        return {
            "state": state,
            "statePath": state_path,
            "deletedPaths": deleted_paths,
            "alreadyClean": (not existing_targets),
        }

    def take_over_visual_editor_legacy_files(p, state, code):
        takeover_targets = get_visual_editor_legacy_takeover_targets(p)
        existing_targets = [ target for target in takeover_targets if target["exists"] ]
        existing_paths = [ target["path"] for target in existing_targets ]
        backup_root, backup_entries = backup_visual_editor_project_files(p, existing_paths)
        export_path = write_visual_editor_export_file(p, code)

        deleted_paths = [ ]

        for target in existing_targets:
            os.remove(target["path"])
            deleted_paths.append(target["relativePath"])

        meta = state.setdefault("meta", { })
        previous_takeover = meta.get("legacyGuiTakeover", { })

        if not isinstance(previous_takeover, dict):
            previous_takeover = { }

        takeover_meta = {
            "takenOver": True,
            "targetPaths": [ target["relativePath"] for target in takeover_targets if target["kind"] == "source" ],
            "compiledTargetPaths": [ target["relativePath"] for target in takeover_targets if target["kind"] == "compiled" ],
            "deletedPaths": deleted_paths,
            "backupRoot": get_visual_editor_relative_path(p, backup_root) if backup_root else previous_takeover.get("backupRoot", ""),
            "backupFiles": backup_entries or previous_takeover.get("backupFiles", [ ]),
        }

        meta["legacyGuiTakeover"] = takeover_meta
        state_path = write_visual_editor_state_file(p, state)

        return {
            "state": state,
            "statePath": state_path,
            "exportPath": export_path,
            "alreadyTakenOver": (not existing_targets) and bool(previous_takeover.get("takenOver")),
            "deletedPaths": deleted_paths,
            "backupRoot": takeover_meta["backupRoot"],
            "backupFiles": takeover_meta["backupFiles"],
        }

    def adopt_visual_editor_label(p, path, label_name, marker_id):
        if not label_name:
            raise Exception("Adopt label request is missing a label name.")

        if not marker_id:
            raise Exception("Adopt label request is missing a markerId.")

        target_path = resolve_visual_editor_project_path(p, path)

        if not os.path.isfile(target_path):
            raise Exception("Adopt label target {} was not found.".format(get_visual_editor_relative_path(p, target_path)))

        with open(target_path, "r", encoding="utf-8") as f:
            existing_text = f.read()

        if has_visual_editor_managed_block(existing_text, marker_id):
            return {
                "path": get_visual_editor_relative_path(p, target_path),
                "backupPath": None,
                "markerId": marker_id,
                "alreadyManaged": True,
            }

        lines = existing_text.splitlines(True)
        label_pattern = re.compile(r"^label\s+{}\s*(?:\([^)]*\))?\s*:".format(re.escape(label_name)))
        label_index = None

        for index, line in enumerate(lines):
            if label_pattern.match(line.strip()):
                label_index = index
                break

        if label_index is None:
            raise Exception("Label {} was not found in {}.".format(label_name, get_visual_editor_relative_path(p, target_path)))

        body_start = label_index + 1
        body_end = len(lines)

        for index in range(body_start, len(lines)):
            line = lines[index]
            stripped = line.strip()

            if not stripped:
                continue

            if line[:1] in (" ", "\t"):
                continue

            body_end = index
            break

        indent = "    "

        for line in lines[body_start:body_end]:
            stripped = line.strip()

            if not stripped:
                continue

            match = re.match(r"^([ \t]+)", line)

            if match:
                indent = match.group(1)
            break

        begin_marker, end_marker = get_visual_editor_managed_markers(marker_id)
        marker_lines = [
            "{}{}\n".format(indent, begin_marker),
            *lines[body_start:body_end],
            "{}{}\n".format(indent, end_marker),
        ]

        backup_path = backup_visual_editor_project_file(p, target_path)
        updated_lines = lines[:body_start] + marker_lines + lines[body_end:]

        with open(target_path, "w", encoding="utf-8") as f:
            f.write("".join(updated_lines).rstrip())
            f.write("\n")

        return {
            "path": get_visual_editor_relative_path(p, target_path),
            "backupPath": get_visual_editor_relative_path(p, backup_path),
            "markerId": marker_id,
            "alreadyManaged": False,
        }

    def replace_visual_editor_managed_block(text, marker_id, replacement):
        begin_marker, end_marker = get_visual_editor_managed_markers(marker_id)
        lines = text.splitlines(True)
        begin_index = None
        end_index = None

        for index, line in enumerate(lines):
            if line.strip() == begin_marker:
                begin_index = index
                continue

            if (begin_index is not None) and (line.strip() == end_marker):
                end_index = index
                break

        if (begin_index is None) or (end_index is None) or (end_index <= begin_index):
            raise Exception("Managed block markers for {} were not found. Please adopt or rename before exporting.".format(marker_id))

        body = (replacement or "").rstrip()
        body_text = "{}\n".format(body) if body else ""

        return "".join(lines[:begin_index + 1]) + body_text + "".join(lines[end_index:])

    def write_visual_editor_artifact(p, artifact):
        artifact_type = artifact.get("type", "managed_file")
        target_path = resolve_visual_editor_project_path(p, artifact.get("path", ""))
        target_dir = os.path.dirname(target_path)

        if target_dir and (not os.path.isdir(target_dir)):
            os.makedirs(target_dir)

        if artifact_type == "managed_label_body":
            marker_id = artifact.get("markerId", "").strip()

            if not marker_id:
                raise Exception("Managed label exports require a markerId.")

            with open(target_path, "r", encoding="utf-8") as f:
                existing_text = f.read()

            updated_text = replace_visual_editor_managed_block(existing_text, marker_id, artifact.get("code", ""))

            with open(target_path, "w", encoding="utf-8") as f:
                f.write(updated_text.rstrip())
                f.write("\n")

            return target_path

        with open(target_path, "w", encoding="utf-8") as f:
            f.write((artifact.get("code", "") or "").rstrip())
            f.write("\n")

        return target_path

    class VisualEditorBridgeHandler(BaseHTTPRequestHandler):
        server_version = "RenPyVisualEditorBridge/1.0"

        def log_message(self, format, *args):
            return

        def send_cors_headers(self):
            self.send_header("Access-Control-Allow-Origin", "*")
            self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
            self.send_header("Access-Control-Allow-Headers", "Content-Type, X-Visual-Editor-Token")

        def send_json(self, status, payload):
            encoded = json.dumps(payload, ensure_ascii=False, indent=2).encode("utf-8")
            self.send_response(status)
            self.send_cors_headers()
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Cache-Control", "no-store")
            self.send_header("Content-Length", str(len(encoded)))
            self.end_headers()
            self.wfile.write(encoded)

        def send_bytes(self, status, data, content_type):
            self.send_response(status)
            self.send_header("Content-Type", content_type)
            self.send_header("Cache-Control", "no-store")
            self.send_header("Content-Length", str(len(data)))
            self.end_headers()
            self.wfile.write(data)

        def get_request_token(self):
            parsed = urllib.parse.urlparse(self.path)
            query = urllib.parse.parse_qs(parsed.query)
            return (query.get("token") or [self.headers.get("X-Visual-Editor-Token", "")])[0]

        def is_authorized(self):
            return self.get_request_token() == self.server.visual_editor_token

        def get_route(self):
            parsed = urllib.parse.urlparse(self.path)
            return parsed.path.strip("/")

        def get_editor_file_path(self, route):
            editor_root = os.path.normpath(os.path.join(config.renpy_base, "visual_editor"))
            relative_path = route[len("editor"):].lstrip("/")

            if not relative_path:
                relative_path = "index.html"

            candidate = os.path.normpath(os.path.join(editor_root, relative_path))

            try:
                if os.path.commonpath([editor_root, candidate]) != editor_root:
                    return None
            except Exception:
                return None

            if os.path.isdir(candidate):
                candidate = os.path.join(candidate, "index.html")

            return candidate

        def read_payload(self):
            length = int(self.headers.get("Content-Length", "0") or 0)
            if length <= 0:
                return {}

            raw = self.rfile.read(length).decode("utf-8")
            return json.loads(raw)

        def do_OPTIONS(self):
            self.send_response(204)
            self.send_cors_headers()
            self.send_header("Content-Length", "0")
            self.end_headers()

        def do_GET(self):
            route = self.get_route()

            if route == "state":
                if not self.is_authorized():
                    self.send_json(403, { "ok": False, "error": "Invalid visual editor bridge token." })
                    return

                p = self.server.visual_editor_project
                state_path = get_visual_editor_state_path(p)

                if not os.path.exists(state_path):
                    imported = build_visual_editor_import_state(p)

                    self.send_json(200, {
                        "ok": True,
                        "exists": False,
                        "importedState": imported["state"] if imported else None,
                        "importSummary": imported["summary"] if imported else None,
                        "statePath": state_path,
                        "exportPath": get_visual_editor_export_path(p),
                    })
                    return

                with open(state_path, "r", encoding="utf-8") as f:
                    state = json.load(f)

                self.send_json(200, {
                    "ok": True,
                    "exists": True,
                    "state": state,
                    "statePath": state_path,
                    "exportPath": get_visual_editor_export_path(p),
                })
                return

            if route == "symbols":
                if not self.is_authorized():
                    self.send_json(403, { "ok": False, "error": "Invalid visual editor bridge token." })
                    return

                self.send_json(200, {
                    "ok": True,
                    "symbols": scan_visual_editor_script_symbols(self.server.visual_editor_project),
                })
                return

            if route == "editor" or route.startswith("editor/"):
                file_path = self.get_editor_file_path(route)

                if (file_path is None) or (not os.path.isfile(file_path)):
                    self.send_json(404, { "ok": False, "error": "Unknown visual editor asset." })
                    return

                with open(file_path, "rb") as f:
                    data = f.read()

                content_type = mimetypes.guess_type(file_path)[0] or "application/octet-stream"
                self.send_bytes(200, data, content_type)
                return

            self.send_json(404, { "ok": False, "error": "Unknown visual editor bridge route." })

        def do_POST(self):
            if not self.is_authorized():
                self.send_json(403, { "ok": False, "error": "Invalid visual editor bridge token." })
                return

            p = self.server.visual_editor_project
            route = self.get_route()

            try:
                payload = self.read_payload()
                ensure_visual_editor_parent_dirs(p)

                if route == "state":
                    state = payload.get("state", payload)
                    state_path = write_visual_editor_state_file(p, state)

                    self.send_json(200, {
                        "ok": True,
                        "statePath": state_path,
                    })
                    return

                if route == "adopt_label":
                    result = adopt_visual_editor_label(
                        p,
                        payload.get("path", ""),
                        payload.get("label", "").strip(),
                        payload.get("markerId", "").strip(),
                    )

                    self.send_json(200, {
                        "ok": True,
                        "path": result["path"],
                        "backupPath": result["backupPath"],
                        "markerId": result["markerId"],
                        "alreadyManaged": result["alreadyManaged"],
                    })
                    return

                if route == "takeover_legacy_files":
                    state = payload.get("state", {})
                    code = payload.get("code", "")

                    if not code:
                        self.send_json(400, { "ok": False, "error": "Missing generated Ren'Py code for takeover export." })
                        return

                    result = take_over_visual_editor_legacy_files(p, state, code)

                    self.send_json(200, {
                        "ok": True,
                        "state": result["state"],
                        "statePath": result["statePath"],
                        "exportPath": result["exportPath"],
                        "alreadyTakenOver": result["alreadyTakenOver"],
                        "deletedPaths": result["deletedPaths"],
                        "backupRoot": result["backupRoot"],
                        "backupFiles": result["backupFiles"],
                    })
                    return

                if route == "cleanup_legacy_script_files":
                    state = payload.get("state", {})
                    result = sync_visual_editor_legacy_script_takeover(p, state)

                    self.send_json(200, {
                        "ok": True,
                        "state": result["state"],
                        "statePath": result["statePath"],
                        "deletedPaths": result["deletedPaths"],
                        "alreadyClean": result["alreadyClean"],
                    })
                    return

                if route == "health":
                    state = payload.get("state", {})
                    health = build_visual_editor_health_snapshot(p, state)

                    self.send_json(200, {
                        "ok": True,
                        "health": health,
                    })
                    return

                if route == "import_asset_file":
                    result = import_visual_editor_asset_file(
                        p,
                        payload.get("path", "").strip(),
                        payload.get("fileName", "").strip(),
                        payload.get("contentBase64", ""),
                        payload.get("matchExisting", False),
                        payload.get("allowOverwrite", False),
                    )

                    self.send_json(200, {
                        "ok": True,
                        "path": result["path"],
                        "imported": result["imported"],
                        "matchedExisting": result["matchedExisting"],
                        "overwrote": result["overwrote"],
                    })
                    return

                if route == "export":
                    state = payload.get("state", {})
                    code = payload.get("code", "")

                    if not code:
                        self.send_json(400, { "ok": False, "error": "Missing generated Ren'Py code." })
                        return

                    state_path = write_visual_editor_state_file(p, state)
                    export_path = write_visual_editor_export_file(p, code)

                    self.send_json(200, {
                        "ok": True,
                        "statePath": state_path,
                        "exportPath": export_path,
                    })
                    return

                self.send_json(404, { "ok": False, "error": "Unknown visual editor bridge route." })
            except ValueError as e:
                try:
                    payload = json.loads(str(e))
                except Exception:
                    payload = { "error": str(e) }

                payload["ok"] = False
                self.send_json(409, payload)
            except Exception as e:
                self.send_json(500, { "ok": False, "error": str(e) })

    class VisualEditorBridge(object):
        def __init__(self, p):
            self.project = p
            self.token = uuid.uuid4().hex
            self.httpd = ThreadingHTTPServer(("127.0.0.1", 0), VisualEditorBridgeHandler)
            self.httpd.visual_editor_project = p
            self.httpd.visual_editor_token = self.token
            self.httpd.daemon_threads = True
            self.host, self.port = self.httpd.server_address
            self.thread = threading.Thread(target=self.httpd.serve_forever)
            self.thread.daemon = True
            self.thread.start()

        @property
        def url(self):
            return "http://{}:{}/".format(self.host, self.port)

        def stop(self):
            try:
                self.httpd.shutdown()
                self.httpd.server_close()
            except Exception:
                pass

    def ensure_visual_editor_bridge(p):
        global visual_editor_bridge

        if visual_editor_bridge is not None:
            if visual_editor_bridge.project.path == p.path:
                return visual_editor_bridge

            visual_editor_bridge.stop()

        visual_editor_bridge = VisualEditorBridge(p)
        return visual_editor_bridge

    class OpenVisualEditor(Action):
        """
        Opens the visual editor for the supplied project, or for the current
        project if no project is supplied.
        """

        def __init__(self, p=None):
            if p is None:
                self.project = current
            elif isinstance(p, str):
                self.project = manager.get(p)
            else:
                self.project = p

        def get_sensitive(self):
            return self.project is not None

        def __call__(self):
            if self.project is None:
                return

            editor_index = os.path.join(config.renpy_base, "visual_editor", "index.html")

            if os.path.exists(editor_index):
                bridge = ensure_visual_editor_bridge(self.project)
                url = urllib.parse.urljoin(bridge.url, "editor/index.html")
                params = {
                    "project": self.project.path,
                    "bridge": bridge.url,
                    "token": bridge.token,
                }

                url += "?" + urllib.parse.urlencode(params)
                renpy.open_url(url)
                return

            renpy.invoke_in_new_context(
                interface.info,
                _("Visual editor integration is not available yet."),
                _("The launcher entry has been added, but no visual editor frontend was found.\n\nExpected file: [editor_index!q]\nProject: [project_path!q]"),
                editor_index=editor_index,
                project_path=self.project.path,
            )

    class Rescan(Action):
        def __call__(self):
            """
            Rescans the projects directory.
            """

            manager.scan()
            renpy.restart_interaction()

            if current is not None:
                try:
                    current.update_dump(gui=False, only_existing=True)
                except Exception:
                    pass

    # NOTE: Action class for ProjectFolder
    class CollapseFolder(Action):
        def __init__(self, pf):
            self.pf = pf

        def __call__(self):
            self.pf.hidden = not self.pf.hidden
            persistent.collapsed_folders[self.pf.name] = self.pf.hidden
            renpy.restart_interaction()

        def get_selected(self):
            return (not self.pf.hidden)

    manager.scan()

    if isinstance(persistent.projects_directory, str):
        persistent.projects_directory = renpy.fsdecode(persistent.projects_directory)

init 10 python:
    if persistent.projects_directory is not None:
        if not directory_is_writable(persistent.projects_directory):
            persistent.projects_directory = None

    if project.current is not None:
        try:
            project.current.update_dump(only_existing=True)
        except Exception:
            pass

###############################################################################
# Code to choose the projects directory.

label choose_projects_directory:

    python hide:

        interface.interaction(_("PROJECTS DIRECTORY"), _("Please choose the projects directory using the directory chooser.\n{b}The directory chooser may have opened behind this window.{/b}"), _("This launcher will scan for projects in this directory, will create new projects in this directory, and will place built projects into this directory."),)

        path, is_default = choose_directory(persistent.projects_directory)

        if is_default:
            interface.info(_("Ren'Py has set the projects directory to:"), "[path!q]", path=path)

        persistent.projects_directory = path
        project.multipersistent.projects_directory = path
        project.multipersistent.save()

        project.manager.scan()

    return

init python:

    def set_projects_directory_command():
        ap = renpy.arguments.ArgumentParser()
        ap.add_argument("projects", help="The path to the projects directory.")

        args = ap.parse_args()

        persistent.projects_directory = renpy.fsdecode(args.projects)
        project.multipersistent.projects_directory = persistent.projects_directory
        project.multipersistent.save()
        renpy.save_persistent()

        return False

    renpy.arguments.register_command("set_projects_directory", set_projects_directory_command)

    def get_projects_directory_command():
        ap = renpy.arguments.ArgumentParser()
        args = ap.parse_args()

        if persistent.projects_directory is not None:
            print(persistent.projects_directory)

        return False

    renpy.arguments.register_command("get_projects_directory", get_projects_directory_command)

    def set_project_command():
        ap = renpy.arguments.ArgumentParser()
        ap.add_argument("project", help="The full path to the project to select.")

        args = ap.parse_args()

        projects = os.path.dirname(os.path.abspath(args.project))
        name = os.path.basename(args.project)

        persistent.projects_directory = renpy.fsdecode(projects)
        project.multipersistent.projects_directory = persistent.projects_directory

        persistent.active_project = name

        project.multipersistent.save()
        renpy.save_persistent()

        return False

    renpy.arguments.register_command("set_project", set_project_command)
