import type {
  PrivacySettings as PrivacySettingsType,
} from "../../../types/settings";

interface PrivacySettingsProps {
  settings: PrivacySettingsType;
  onChange: (settings: PrivacySettingsType) => void;
}

export function PrivacySettings({
  settings,
  onChange,
}: PrivacySettingsProps) {
  const update = (
    patch: Partial<PrivacySettingsType>,
  ) => {
    onChange({
      ...settings,
      ...patch,
    });
  };

  return (
    <section className="settings-section">
      <div className="settings-section__heading">
        <div>
          <span className="settings-section__eyebrow">
            DATA &amp; PRIVACY
          </span>

          <h2>Privacy Settings</h2>

          <p>
            Configure data retention, telemetry,
            local processing and external data transfer
            preferences.
          </p>
        </div>

        <span className="settings-status-badge">
          Policy Controlled
        </span>
      </div>

      <div className="settings-card">
        <div className="settings-card__header">
          <h3>Data Handling</h3>

          <p>
            Define how workspace information and
            operational data should be handled.
          </p>
        </div>

        <div className="settings-form-grid">
          <label className="settings-field">
            <span>Data Retention</span>

            <select
              value={settings.dataRetention}
              onChange={(event) =>
                update({
                  dataRetention: event.target.value,
                })
              }
            >
              <option>Workspace Policy</option>
              <option>7 days</option>
              <option>30 days</option>
              <option>90 days</option>
              <option>1 year</option>
            </select>
          </label>

          <label className="settings-field">
            <span>Telemetry</span>

            <select
              value={settings.telemetry}
              onChange={(event) =>
                update({
                  telemetry: event.target.value,
                })
              }
            >
              <option>Workspace Policy</option>
              <option>Disabled</option>
              <option>Limited</option>
              <option>Enabled</option>
            </select>
          </label>

          <label className="settings-field">
            <span>Local Processing</span>

            <select
              value={settings.localProcessing}
              onChange={(event) =>
                update({
                  localProcessing: event.target.value,
                })
              }
            >
              <option>Preferred</option>
              <option>Required</option>
              <option>Allowed</option>
            </select>
          </label>

          <label className="settings-field">
            <span>External Data Transfer</span>

            <select
              value={settings.externalDataTransfer}
              onChange={(event) =>
                update({
                  externalDataTransfer:
                    event.target.value,
                })
              }
            >
              <option>Controlled by Security Policy</option>
              <option>Blocked</option>
              <option>Allowed with Approval</option>
              <option>Allowed</option>
            </select>
          </label>
        </div>
      </div>

      <div className="settings-card settings-card--spaced">
        <div className="settings-card__header">
          <h3>Privacy Posture</h3>

          <p>
            Current frontend configuration emphasizes
            controlled data handling.
          </p>
        </div>

        <div className="settings-privacy-summary">
          <div className="settings-privacy-item">
            <span>Local Processing</span>
            <strong>{settings.localProcessing}</strong>
          </div>

          <div className="settings-privacy-item">
            <span>External Transfer</span>
            <strong>
              {settings.externalDataTransfer}
            </strong>
          </div>

          <div className="settings-privacy-item">
            <span>Telemetry</span>
            <strong>{settings.telemetry}</strong>
          </div>

          <div className="settings-privacy-item">
            <span>Retention</span>
            <strong>{settings.dataRetention}</strong>
          </div>
        </div>
      </div>

      <div className="settings-info-panel">
        <div className="settings-info-panel__icon">
          i
        </div>

        <div>
          <strong>
            Privacy enforcement is backend controlled
          </strong>

          <p>
            These settings represent the frontend
            configuration surface. Actual retention,
            telemetry and data-transfer enforcement
            will be handled by backend policy services.
          </p>
        </div>
      </div>
    </section>
  );
}