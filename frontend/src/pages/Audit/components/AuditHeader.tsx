import {
  Download,
  FileClock,
} from "lucide-react";

export default function AuditHeader() {
  function handleExport() {
    window.alert("Audit export is currently a UI-only action.");
  }

  return (
    <header className="audit-header">
      <div className="audit-header__brand">
        <div className="audit-header__icon">
          <FileClock size={20} />
        </div>

        <div>
          <span className="audit-header__eyebrow">
            AUDIT TRAIL
          </span>

          <h1>Complete Activity History</h1>

          <p>
            Trace who did what, when, on which resource, and what happened.
          </p>
        </div>
      </div>

      <button
        className="audit-header__export"
        type="button"
        onClick={handleExport}
      >
        <Download size={15} />
        Export Audit Log
      </button>
    </header>
  );
}