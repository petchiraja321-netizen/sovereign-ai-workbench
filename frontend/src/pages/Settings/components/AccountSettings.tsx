import type { AccountSettings as AccountSettingsType } from "../../../types/settings";

interface AccountSettingsProps {
  settings: AccountSettingsType;
  onChange: (settings: AccountSettingsType) => void;
}

export function AccountSettings({
  settings,
  onChange,
}: AccountSettingsProps) {
  return (
    <section className="settings-section">
      <div className="settings-section__heading">
        <div>
          <span className="settings-section__eyebrow">ACCOUNT</span>

          <h2>Account Settings</h2>

          <p>
            Manage the identity and workspace context used by this
            workbench session.
          </p>
        </div>

        <span className="settings-status-badge">
          {settings.sessionStatus}
        </span>
      </div>

      <div className="settings-card">
        <div className="settings-card__header">
          <div>
            <h3>User Profile</h3>
            <p>Mock account information for the frontend.</p>
          </div>
        </div>

        <div className="settings-form-grid">
          <label className="settings-field">
            <span>Display Name</span>

            <input
              type="text"
              value={settings.displayName}
              onChange={(event) =>
                onChange({
                  ...settings,
                  displayName: event.target.value,
                })
              }
            />
          </label>

          <label className="settings-field">
            <span>Role</span>

            <input
              type="text"
              value={settings.role}
              onChange={(event) =>
                onChange({
                  ...settings,
                  role: event.target.value,
                })
              }
            />
          </label>

          <label className="settings-field settings-field--full">
            <span>Workspace</span>

            <input
              type="text"
              value={settings.workspace}
              onChange={(event) =>
                onChange({
                  ...settings,
                  workspace: event.target.value,
                })
              }
            />
          </label>

          <div className="settings-field">
            <span>Session</span>

            <div className="settings-readonly">
              <span className="settings-status-dot" />
              {settings.sessionStatus}
            </div>
          </div>
        </div>
      </div>

      <div className="settings-info-panel">
        <div className="settings-info-panel__icon">i</div>

        <div>
          <strong>Account data is currently mocked</strong>

          <p>
            Real identity, roles and workspace information will be
            supplied by the backend when authentication integration is
            available.
          </p>
        </div>
      </div>
    </section>
  );
}