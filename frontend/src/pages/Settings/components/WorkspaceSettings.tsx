import type {
  WorkspaceSettings as WorkspaceSettingsType,
} from "../../../types/settings";

interface WorkspaceSettingsProps {
  settings: WorkspaceSettingsType;
  onChange: (settings: WorkspaceSettingsType) => void;
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

export function WorkspaceSettings({
  settings,
  onChange,
}: WorkspaceSettingsProps) {
  const update = (
    patch: Partial<WorkspaceSettingsType>,
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
            WORKSPACE
          </span>

          <h2>Workspace Settings</h2>

          <p>
            Configure the default views and refresh
            behavior used across the workbench.
          </p>
        </div>

        <span className="settings-status-badge">
          Configurable
        </span>
      </div>

      <div className="settings-card">
        <div className="settings-card__header">
          <h3>Default Views</h3>

          <p>
            Choose which workspace screens and layouts
            open by default.
          </p>
        </div>

        <div className="settings-form-grid">
          <label className="settings-field">
            <span>Default Landing Page</span>

            <select
              value={settings.defaultLandingPage}
              onChange={(event) =>
                update({
                  defaultLandingPage:
                    event.target.value,
                })
              }
            >
              <option>Dashboard</option>
              <option>AI Studio</option>
              <option>Knowledge</option>
              <option>Tasks</option>
              <option>Security</option>
              <option>Audit</option>
              <option>Deliverables</option>
            </select>
          </label>

          <label className="settings-field">
            <span>Default Task View</span>

            <select
              value={settings.defaultTaskView}
              onChange={(event) =>
                update({
                  defaultTaskView:
                    event.target.value,
                })
              }
            >
              <option>Mission Control</option>
              <option>Table</option>
              <option>Board</option>
              <option>Timeline</option>
            </select>
          </label>

          <label className="settings-field settings-field--full">
            <span>Default Deliverable View</span>

            <select
              value={settings.defaultDeliverableView}
              onChange={(event) =>
                update({
                  defaultDeliverableView:
                    event.target.value,
                })
              }
            >
              <option>Table</option>
              <option>Grid</option>
            </select>
          </label>
        </div>
      </div>

      <div className="settings-card settings-card--spaced">
        <div className="settings-card__header">
          <h3>Workspace Refresh</h3>

          <p>
            Control automatic refresh behavior for live
            workspace information.
          </p>
        </div>

        <div className="settings-toggle-list">
          <ToggleRow
            label="Automatic Refresh"
            description="Automatically refresh supported workspace data."
            checked={settings.autoRefresh}
            onChange={(checked) =>
              update({
                autoRefresh: checked,
              })
            }
          />
        </div>

        <div className="settings-form-grid">
          <label className="settings-field">
            <span>Refresh Interval</span>

            <select
              value={settings.refreshInterval}
              onChange={(event) =>
                update({
                  refreshInterval:
                    event.target.value,
                })
              }
              disabled={!settings.autoRefresh}
            >
              <option>5 seconds</option>
              <option>10 seconds</option>
              <option>30 seconds</option>
              <option>60 seconds</option>
              <option>5 minutes</option>
            </select>
          </label>
        </div>
      </div>

      <div className="settings-info-panel">
        <div className="settings-info-panel__icon">
          i
        </div>

        <div>
          <strong>
            Workspace preferences are currently local
          </strong>

          <p>
            These settings update frontend state and are
            prepared for persistence through the workspace
            configuration API.
          </p>
        </div>
      </div>
    </section>
  );
}