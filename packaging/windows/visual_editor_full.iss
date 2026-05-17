#ifndef AlphaVersion
  #define AlphaVersion "0.5"
#endif

#ifndef StageDir
  #define StageDir "..\..\build\visual_editor_full\" + AlphaVersion
#endif

#ifndef OutputDir
  #define OutputDir StageDir + "\installer"
#endif

[Setup]
AppId=RenPyVisualEditorAlpha
AppName=Ren'Py Visual Editor
AppVersion={#AlphaVersion} Alpha
AppPublisher=Ren'Py Visual Editor Fork
DefaultDirName={autopf}\RenPy Visual Editor\v{#AlphaVersion}-alpha
DefaultGroupName=Ren'Py Visual Editor
UsePreviousAppDir=no
PrivilegesRequired=admin
WizardStyle=modern
Compression=lzma2/max
SolidCompression=yes
OutputDir={#OutputDir}
OutputBaseFilename=renpy-visual-editor-v{#AlphaVersion}-alpha-setup
ArchitecturesInstallIn64BitMode=x64compatible
DisableWelcomePage=no
UninstallDisplayIcon={app}\renpy.exe

[Languages]
Name: "english"; MessagesFile: "compiler:Default.isl"

[Tasks]
Name: "desktopicon"; Description: "Create a desktop shortcut"; GroupDescription: "Additional icons:"; Flags: unchecked

[Files]
Source: "{#StageDir}\bundle\*"; DestDir: "{app}"; Flags: ignoreversion recursesubdirs createallsubdirs

[Icons]
Name: "{group}\Ren'Py Visual Editor"; Filename: "{app}\renpy.exe"
Name: "{group}\Uninstall Ren'Py Visual Editor"; Filename: "{uninstallexe}"
Name: "{autodesktop}\Ren'Py Visual Editor"; Filename: "{app}\renpy.exe"; Tasks: desktopicon

[Run]
Filename: "{app}\renpy.exe"; Description: "Launch Ren'Py Visual Editor"; Flags: nowait postinstall skipifsilent

[Code]
function IsExistingInstallDir(const Dir: string): Boolean;
begin
  Result := FileExists(AddBackslash(Dir) + 'renpy.exe');
end;

function NextButtonClick(CurPageID: Integer): Boolean;
begin
  Result := True;

  if CurPageID = wpSelectDir then
  begin
    if IsExistingInstallDir(WizardDirValue) then
    begin
      Result :=
        MsgBox(
          'The selected folder already contains a Ren''Py-style runtime.' + #13#10 + #13#10 +
          'For Alpha builds, it is safer to install into a fresh directory.' + #13#10 +
          'Continue anyway and overwrite files in this directory?',
          mbConfirmation,
          MB_YESNO
        ) = IDYES;
    end;
  end;
end;
