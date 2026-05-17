#ifndef PatchVersion
  #define PatchVersion "0.0.0-dev"
#endif

#ifndef StageDir
  #define StageDir "..\..\build\visual_editor_patch\" + PatchVersion
#endif

#ifndef OutputDir
  #define OutputDir StageDir + "\installer"
#endif

[Setup]
AppId=RenPyVisualEditorPatch
AppName=Ren'Py Visual Editor Patch
AppVersion={#PatchVersion}
AppPublisher=Ren'Py Visual Editor Fork
DefaultDirName={autopf}\renpy
AppendDefaultDirName=no
DisableProgramGroupPage=yes
UsePreviousAppDir=no
PrivilegesRequired=admin
WizardStyle=modern
Compression=lzma2/max
SolidCompression=yes
OutputDir={#OutputDir}
OutputBaseFilename=renpy-visual-editor-patch-{#PatchVersion}-setup
Uninstallable=no
CreateUninstallRegKey=no
AllowNoIcons=yes

[Languages]
Name: "english"; MessagesFile: "compiler:Default.isl"

[Files]
Source: "{#StageDir}\patch_payload\visual_editor\*"; DestDir: "{app}\visual_editor"; Flags: ignoreversion recursesubdirs createallsubdirs
Source: "{#StageDir}\patch_payload\launcher\game\project.rpy"; DestDir: "{app}\launcher\game"; Flags: ignoreversion
Source: "{#StageDir}\patch_payload\launcher\game\front_page.rpy"; DestDir: "{app}\launcher\game"; Flags: ignoreversion
Source: "{#StageDir}\patch_payload\_visual_editor_patch\*"; DestDir: "{app}\_visual_editor_patch"; Flags: ignoreversion recursesubdirs createallsubdirs

[Code]
const
  DirectoryAttribute = $10;

var
  SelectedRenPyDir: string;
  BackupRoot: string;

function LooksLikeRenPyDir(const Dir: string): Boolean;
begin
  Result :=
    FileExists(AddBackslash(Dir) + 'renpy.exe') and
    FileExists(AddBackslash(Dir) + 'launcher\game\project.rpy') and
    FileExists(AddBackslash(Dir) + 'launcher\game\front_page.rpy');
end;

function CopyDirectoryRecursive(const SourceDir, DestDir: string): Boolean;
var
  FindRec: TFindRec;
  SourcePath: string;
  DestPath: string;
begin
  Result := True;

  if not DirExists(SourceDir) then
    Exit;

  if not ForceDirectories(DestDir) then
  begin
    Result := False;
    Exit;
  end;

  if FindFirst(AddBackslash(SourceDir) + '*', FindRec) then
  begin
    try
      repeat
        if (FindRec.Name <> '.') and (FindRec.Name <> '..') then
        begin
          SourcePath := AddBackslash(SourceDir) + FindRec.Name;
          DestPath := AddBackslash(DestDir) + FindRec.Name;

          if (FindRec.Attributes and DirectoryAttribute) <> 0 then
          begin
            if not CopyDirectoryRecursive(SourcePath, DestPath) then
            begin
              Result := False;
              Exit;
            end;
          end
          else
          begin
            if not ForceDirectories(ExtractFileDir(DestPath)) then
            begin
              Result := False;
              Exit;
            end;

            if not CopyFile(SourcePath, DestPath, False) then
            begin
              Result := False;
              Exit;
            end;
          end;
        end;
      until not FindNext(FindRec);
    finally
      FindClose(FindRec);
    end;
  end;
end;

function BackupFileIfExists(const SourceFile, BackupFile: string): Boolean;
begin
  Result := True;

  if not FileExists(SourceFile) then
    Exit;

  if not ForceDirectories(ExtractFileDir(BackupFile)) then
  begin
    Result := False;
    Exit;
  end;

  Result := CopyFile(SourceFile, BackupFile, False);
end;

function BuildBackupRoot(const RenPyDir: string): string;
begin
  Result :=
    AddBackslash(RenPyDir) +
    '_visual_editor_backup\' +
    '{#PatchVersion}-' +
    GetDateTimeString('yyyy-mm-dd_hh-nn-ss', #0, #0);
end;

function BackupPatchTargets(const RenPyDir: string): Boolean;
begin
  Result := True;

  if not ForceDirectories(BackupRoot) then
  begin
    Result := False;
    Exit;
  end;

  if DirExists(AddBackslash(RenPyDir) + 'visual_editor') then
  begin
    if not CopyDirectoryRecursive(
      AddBackslash(RenPyDir) + 'visual_editor',
      AddBackslash(BackupRoot) + 'visual_editor'
    ) then
    begin
      Result := False;
      Exit;
    end;
  end;

  if not BackupFileIfExists(
    AddBackslash(RenPyDir) + 'launcher\game\project.rpy',
    AddBackslash(BackupRoot) + 'launcher\game\project.rpy'
  ) then
  begin
    Result := False;
    Exit;
  end;

  if not BackupFileIfExists(
    AddBackslash(RenPyDir) + 'launcher\game\front_page.rpy',
    AddBackslash(BackupRoot) + 'launcher\game\front_page.rpy'
  ) then
  begin
    Result := False;
    Exit;
  end;
end;

procedure WriteInstallReceipt();
var
  ReceiptPath: string;
  ReceiptText: string;
begin
  ReceiptPath := AddBackslash(SelectedRenPyDir) + '_visual_editor_patch\last_install.txt';
  ForceDirectories(ExtractFileDir(ReceiptPath));

  ReceiptText :=
    'patch_version={#PatchVersion}' + #13#10 +
    'installed_at=' + GetDateTimeString('yyyy-mm-dd hh:nn:ss', #0, #0) + #13#10 +
    'install_dir=' + SelectedRenPyDir + #13#10 +
    'backup_dir=' + BackupRoot + #13#10;

  SaveStringToFile(ReceiptPath, ReceiptText, False);
end;

function NextButtonClick(CurPageID: Integer): Boolean;
begin
  Result := True;

  if CurPageID = wpSelectDir then
  begin
    if not LooksLikeRenPyDir(WizardDirValue) then
    begin
      MsgBox(
        'Please select the root folder of an existing Ren''Py installation.' + #13#10 + #13#10 +
        'Expected files:' + #13#10 +
        '- renpy.exe' + #13#10 +
        '- launcher\game\project.rpy' + #13#10 +
        '- launcher\game\front_page.rpy',
        mbError,
        MB_OK
      );
      Result := False;
    end;
  end;
end;

function PrepareToInstall(var NeedsRestart: Boolean): String;
begin
  Result := '';
  SelectedRenPyDir := WizardDirValue;

  if not LooksLikeRenPyDir(SelectedRenPyDir) then
  begin
    Result := 'The selected folder is not a supported Ren''Py installation root.';
    Exit;
  end;

  BackupRoot := BuildBackupRoot(SelectedRenPyDir);

  if not BackupPatchTargets(SelectedRenPyDir) then
  begin
    Result :=
      'The installer could not create a backup before patching.' + #13#10 +
      'Expected backup folder:' + #13#10 +
      BackupRoot;
    Exit;
  end;
end;

procedure CurStepChanged(CurStep: TSetupStep);
begin
  if CurStep = ssPostInstall then
  begin
    WriteInstallReceipt();
    SuppressibleMsgBox(
      'Ren''Py Visual Editor patch installed successfully.' + #13#10 + #13#10 +
      'Backup created at:' + #13#10 +
      BackupRoot,
      mbInformation,
      MB_OK,
      IDOK
    );
  end;
end;
