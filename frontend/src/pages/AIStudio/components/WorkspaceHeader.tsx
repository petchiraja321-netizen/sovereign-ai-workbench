import {
  LockKeyhole,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export function WorkspaceHeader() {
  return (
    <div className="ai-workspace-header">
      <div>
        <div className="ai-workspace-header__eyebrow">
          <Sparkles size={13} />
          SOVEREIGN INTELLIGENCE
        </div>

        <h1 className="ai-workspace-header__title">
          AI Studio
        </h1>

        <p className="ai-workspace-header__description">
          Execute secure AI tasks using locally controlled
          models, enterprise knowledge and verified evidence.
        </p>
      </div>

      <div className="ai-workspace-header__security">
        <div className="ai-workspace-header__security-icon">
          <LockKeyhole size={16} />
        </div>

        <div>
          <p className="ai-workspace-header__security-title">
            Sovereign Execution
          </p>

          <p className="ai-workspace-header__security-text">
            <ShieldCheck size={11} />
            Local processing boundary active
          </p>
        </div>
      </div>
    </div>
  );
}