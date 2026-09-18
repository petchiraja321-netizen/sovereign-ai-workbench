import type { AISettings as AISettingsType } from "../../../types/settings";

interface AISettingsProps {
  settings: AISettingsType;
  onChange: (settings: AISettingsType) => void;
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
        <span className="settings-toggle-row__label">{label}</span>
        <span className="settings-toggle-row__description">
          {description}
        </span>
      </span>

      <span className="settings-toggle">
        <input
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
        />
        <span className="settings-toggle__track">
          <span className="settings-toggle__thumb" />
        </span>
      </span>
    </label>
  );
}

export function AISettings({
  settings,
  onChange,
}: AISettingsProps) {
  const update = (patch: Partial<AISettingsType>) => {
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
            AI CONFIGURATION
          </span>

          <h2>AI Configuration</h2>

          <p>
            Configure model preferences, response behavior and AI
            execution controls for the workbench.
          </p>
        </div>

        <span className="settings-status-badge">
          Frontend Policy
        </span>
      </div>

      <div className="settings-card">
        <div className="settings-card__header">
          <h3>Model Preferences</h3>
          <p>
            Select the default runtime behavior used by AI Studio
            and task execution.
          </p>
        </div>

        <div className="settings-form-grid">
          <label className="settings-field">
            <span>Default Model</span>

            <select
              value={settings.defaultModel}
              onChange={(event) =>
                update({
                  defaultModel: event.target.value,
                })
              }
            >
              <option>Configured Local Model</option>
              <option>Local Reasoning Model</option>
              <option>Local General Model</option>
              <option>Configured External Model</option>
            </select>
          </label>

          <label className="settings-field">
            <span>Reasoning Mode</span>

            <select
              value={settings.reasoningMode}
              onChange={(event) =>
                update({
                  reasoningMode: event.target.value,
                })
              }
            >
              <option>Fast</option>
              <option>Balanced</option>
              <option>Deep</option>
            </select>
          </label>

          <label className="settings-field">
            <span>Response Detail</span>

            <select
              value={settings.responseDetail}
              onChange={(event) =>
                update({
                  responseDetail: event.target.value,
                })
              }
            >
              <option>Concise</option>
              <option>Standard</option>
              <option>Detailed</option>
            </select>
          </label>
        </div>
      </div>

      <div className="settings-card settings-card--spaced">
        <div className="settings-card__header">
          <h3>Execution Policy</h3>
          <p>
            Control how AI responses, evidence and tools are handled.
          </p>
        </div>

        <div className="settings-toggle-list">
          <ToggleRow
            label="Evidence Required"
            description="Require supporting evidence for AI-generated outputs."
            checked={settings.evidenceRequired}
            onChange={(checked) =>
              update({ evidenceRequired: checked })
            }
          />

          <ToggleRow
            label="Human Approval Required"
            description="Require approval before controlled operations continue."
            checked={settings.humanApprovalRequired}
            onChange={(checked) =>
              update({ humanApprovalRequired: checked })
            }
          />

          <ToggleRow
            label="Automatic Retry"
            description="Retry recoverable AI execution failures automatically."
            checked={settings.autoRetry}
            onChange={(checked) =>
              update({ autoRetry: checked })
            }
          />

          <ToggleRow
            label="Streaming Responses"
            description="Display generated responses progressively when supported."
            checked={settings.streamingResponse}
            onChange={(checked) =>
              update({ streamingResponse: checked })
            }
          />

          <ToggleRow
            label="Local Model Preferred"
            description="Prefer locally configured models for AI execution."
            checked={settings.localModelPreferred}
            onChange={(checked) =>
              update({ localModelPreferred: checked })
            }
          />

          <ToggleRow
            label="External Model Fallback"
            description="Allow configured external models when local execution is unavailable."
            checked={settings.externalModelFallback}
            onChange={(checked) =>
              update({ externalModelFallback: checked })
            }
          />

          <ToggleRow
            label="Tool Execution"
            description="Allow AI workflows to invoke configured workbench tools."
            checked={settings.toolExecution}
            onChange={(checked) =>
              update({ toolExecution: checked })
            }
          />
        </div>
      </div>

      <div className="settings-info-panel">
        <div className="settings-info-panel__icon">i</div>

        <div>
          <strong>AI policy is currently frontend-configured</strong>

          <p>
            These controls update local UI state and are prepared for
            backend persistence. They do not execute models or tools
            directly.
          </p>
        </div>
      </div>
    </section>
  );
}