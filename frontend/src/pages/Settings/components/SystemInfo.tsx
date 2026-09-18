import type {
  SystemInfo as SystemInfoType,
} from "../../../types/settings";

interface SystemInfoProps {
  settings: SystemInfoType;
}

export function SystemInfo({
  settings,
}: SystemInfoProps) {
  return (
    <section className="settings-section">
      <div className="settings-section__heading">
        <div>
          <span className="settings-section__eyebrow">
            SYSTEM INFORMATION
          </span>

          <h2>System Information</h2>

          <p>
            View the configured platform, runtime and
            infrastructure information for this workbench.
          </p>
        </div>

        <span className="settings-status-badge">
          {settings.environment}
        </span>
      </div>

      <div className="settings-card">
        <div className="settings-card__header">
          <h3>Platform</h3>

          <p>
            Current frontend and backend platform
            configuration.
          </p>
        </div>

        <div className="settings-form-grid">
          <div className="settings-field">
            <span>Workbench Version</span>

            <div className="settings-readonly">
              {settings.workbenchVersion}
            </div>
          </div>

          <div className="settings-field">
            <span>Environment</span>

            <div className="settings-readonly">
              {settings.environment}
            </div>
          </div>

          <div className="settings-field">
            <span>Frontend</span>

            <div className="settings-readonly">
              {settings.frontend}
            </div>
          </div>

          <div className="settings-field">
            <span>Backend</span>

            <div className="settings-readonly">
              {settings.backend}
            </div>
          </div>
        </div>
      </div>

      <div className="settings-card settings-card--spaced">
        <div className="settings-card__header">
          <h3>AI &amp; Data Infrastructure</h3>

          <p>
            Configured runtime components used by the
            workbench architecture.
          </p>
        </div>

        <div className="settings-form-grid">
          <div className="settings-field">
            <span>AI Runtime</span>

            <div className="settings-readonly">
              {settings.aiRuntime}
            </div>
          </div>

          <div className="settings-field">
            <span>RAG Pipeline</span>

            <div className="settings-readonly">
              {settings.rag}
            </div>
          </div>

          <div className="settings-field settings-field--full">
            <span>Vector Store</span>

            <div className="settings-readonly">
              {settings.vectorStore}
            </div>
          </div>
        </div>
      </div>

      <div className="settings-info-panel">
        <div className="settings-info-panel__icon">
          i
        </div>

        <div>
          <strong>
            System information is read-only
          </strong>

          <p>
            These values are currently provided by frontend
            mock configuration. Runtime health and service
            metadata can be connected to backend APIs later.
          </p>
        </div>
      </div>
    </section>
  );
}