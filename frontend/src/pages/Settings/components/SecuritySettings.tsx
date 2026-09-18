import type {
  SecuritySettings as SecuritySettingsType,
} from "../../../types/settings";

interface SecuritySettingsProps {
  settings: SecuritySettingsType;
  onChange: (settings: SecuritySettingsType) => void;
}

interface ToggleRowProps {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

function ToggleRow({
  label,
  description,
  checked,
  onChange,
}: ToggleRowProps) {
  return (
    <label className="settings-toggle-row">
      <span className="settings-toggle-row__content">
        <span className="settings-toggle-row__label">
          {label}
        </span>

        <span className="settings-toggle-row__description">
          {description}
        </span>
      </span>

      <span className="settings-toggle">
        <input
          type="checkbox"
          checked={checked}
          onChange={(event) =>
            onChange(event.target.checked)
          }
        />

        <span className="settings-toggle__track">
          <span className="settings-toggle__thumb" />
        </span>
      </span>
    </label>
  );
}

export function SecuritySettings({
  settings,
  onChange,
}: SecuritySettingsProps) {
  const update = (
    patch: Partial<SecuritySettingsType>,
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
            SECURITY
          </span>

          <h2>Security Settings</h2>

          <p>
            Configure file protection, network monitoring,
            audit controls and sensitive-operation policies.
          </p>
        </div>

        <span className="settings-status-badge">
          Protected
        </span>
      </div>

      <div className="settings-card">
        <div className="settings-card__header">
          <h3>Protection Controls</h3>

          <p>
            Control the security checks applied across
            workbench operations.
          </p>
        </div>

        <div className="settings-toggle-list">
          <ToggleRow
            label="File Validation"
            description="Validate uploaded and generated files before they are processed."
            checked={settings.fileValidation}
            onChange={(checked) =>
              update({
                fileValidation: checked,
              })
            }
          />

          <ToggleRow
            label="Network Monitoring"
            description="Monitor network activity initiated by supported workbench operations."
            checked={settings.networkMonitoring}
            onChange={(checked) =>
              update({
                networkMonitoring: checked,
              })
            }
          />

          <ToggleRow
            label="Audit Logging"
            description="Record security-relevant operations for audit and traceability."
            checked={settings.auditLogging}
            onChange={(checked) =>
              update({
                auditLogging: checked,
              })
            }
          />
        </div>
      </div>

      <div className="settings-card settings-card--spaced">
        <div className="settings-card__header">
          <h3>Network &amp; Session Policy</h3>

          <p>
            Define how external requests and user sessions
            are handled.
          </p>
        </div>

        <div className="settings-form-grid">
          <label className="settings-field">
            <span>External Requests</span>

            <select
              value={settings.externalRequests}
              onChange={(event) =>
                update({
                  externalRequests: event.target.value,
                })
              }
            >
              <option>Blocked</option>
              <option>Monitored</option>
              <option>Allowed</option>
            </select>
          </label>

          <label className="settings-field">
            <span>Session Timeout</span>

            <select
              value={settings.sessionTimeout}
              onChange={(event) =>
                update({
                  sessionTimeout: event.target.value,
                })
              }
            >
              <option>15 minutes</option>
              <option>30 minutes</option>
              <option>60 minutes</option>
              <option>4 hours</option>
              <option>Never</option>
            </select>
          </label>

          <label className="settings-field settings-field--full">
            <span>Approval Requirement</span>

            <select
              value={settings.requireApproval}
              onChange={(event) =>
                update({
                  requireApproval: event.target.value,
                })
              }
            >
              <option>None</option>
              <option>Sensitive Operations</option>
              <option>All External Operations</option>
              <option>All Controlled Operations</option>
            </select>
          </label>
        </div>
      </div>

      <div className="settings-info-panel">
        <div className="settings-info-panel__icon">
          !
        </div>

        <div>
          <strong>
            Security policies are currently frontend-configured
          </strong>

          <p>
            These controls update the Settings UI state only.
            Enforcement and persistence will be handled by
            the backend security layer.
          </p>
        </div>
      </div>
    </section>
  );
}