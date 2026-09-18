import type {
  NotificationSettings as NotificationSettingsType,
} from "../../../types/settings";

interface NotificationSettingsProps {
  settings: NotificationSettingsType;
  onChange: (settings: NotificationSettingsType) => void;
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

export function NotificationSettings({
  settings,
  onChange,
}: NotificationSettingsProps) {
  const update = (
    patch: Partial<NotificationSettingsType>,
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
            NOTIFICATIONS
          </span>

          <h2>Notification Settings</h2>

          <p>
            Control which operational events generate
            notifications across the workbench.
          </p>
        </div>

        <span className="settings-status-badge">
          Configurable
        </span>
      </div>

      <div className="settings-card">
        <div className="settings-card__header">
          <h3>Task Notifications</h3>

          <p>
            Choose which task lifecycle events should
            appear as notifications.
          </p>
        </div>

        <div className="settings-toggle-list">
          <ToggleRow
            label="Task Completed"
            description="Notify when a task finishes successfully."
            checked={settings.taskCompleted}
            onChange={(checked) =>
              update({
                taskCompleted: checked,
              })
            }
          />

          <ToggleRow
            label="Task Failed"
            description="Notify when a task execution fails or requires intervention."
            checked={settings.taskFailed}
            onChange={(checked) =>
              update({
                taskFailed: checked,
              })
            }
          />

          <ToggleRow
            label="Approval Required"
            description="Notify when a task or controlled operation requires human approval."
            checked={settings.approvalRequired}
            onChange={(checked) =>
              update({
                approvalRequired: checked,
              })
            }
          />

          <ToggleRow
            label="Deliverable Ready"
            description="Notify when a requested deliverable becomes available."
            checked={settings.deliverableReady}
            onChange={(checked) =>
              update({
                deliverableReady: checked,
              })
            }
          />
        </div>
      </div>

      <div className="settings-card settings-card--spaced">
        <div className="settings-card__header">
          <h3>System Notifications</h3>

          <p>
            Manage security and general system event
            notifications.
          </p>
        </div>

        <div className="settings-toggle-list">
          <ToggleRow
            label="Security Alerts"
            description="Notify when a security event requires attention."
            checked={settings.securityAlert}
            onChange={(checked) =>
              update({
                securityAlert: checked,
              })
            }
          />

          <ToggleRow
            label="System Events"
            description="Notify about important workbench system events and state changes."
            checked={settings.systemEvents}
            onChange={(checked) =>
              update({
                systemEvents: checked,
              })
            }
          />
        </div>
      </div>

      <div className="settings-info-panel">
        <div className="settings-info-panel__icon">
          i
        </div>

        <div>
          <strong>
            Notification delivery is currently mocked
          </strong>

          <p>
            These switches control frontend settings state.
            Actual delivery channels and notification
            persistence will be connected to the backend
            notification service later.
          </p>
        </div>
      </div>
    </section>
  );
}