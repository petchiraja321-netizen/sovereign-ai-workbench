import {
  Archive,
  Download,
} from "lucide-react";

export default function DeliverablesHeader() {
  function handleExport() {
    window.alert(
      "Deliverables export is currently a UI-only action.",
    );
  }

  return (
    <header className="deliverables-header">
      <div className="deliverables-header__brand">
        <div className="deliverables-header__icon">
          <Archive size={20} />
        </div>

        <div>
          <span className="deliverables-header__eyebrow">
            DELIVERABLES
          </span>

          <h1>Generated Results</h1>

          <p>
            Manage approved outputs, evidence packages and task results.
          </p>
        </div>
      </div>

      <button
        type="button"
        className="deliverables-header__export"
        onClick={handleExport}
      >
        <Download size={15} />
        Export Deliverables
      </button>
    </header>
  );
}