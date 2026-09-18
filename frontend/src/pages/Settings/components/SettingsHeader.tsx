interface SettingsHeaderProps {
  hasUnsavedChanges: boolean;
  saving: boolean;
  onSave: () => void;
  onReset: () => void;
}

export function SettingsHeader({
  hasUnsavedChanges,
  saving,
  onSave,
  onReset,
}: SettingsHeaderProps) {
  return (
    <header className="settings-header">
      <div>
        <div className="settings-eyebrow">SYSTEM CONFIGURATION</div>
        <h1>Settings</h1>
        <p>
          Configure workspace, AI, security and account preferences.
        </p>
      </div>

      <div className="settings-header__actions">
        {hasUnsavedChanges && (
          <span className="settings-unsaved">Unsaved changes</span>
        )}

        <button
          type="button"
          className="settings-button settings-button--secondary"
          onClick={onReset}
          disabled={!hasUnsavedChanges || saving}
        >
          Reset
        </button>

        <button
          type="button"
          className="settings-button settings-button--primary"
          onClick={onSave}
          disabled={!hasUnsavedChanges || saving}
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </header>
  );
}