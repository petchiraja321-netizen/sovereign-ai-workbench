import {
  CheckCircle2,
  FileText,
  MapPin,
  ShieldCheck,
  X,
} from "lucide-react";

import type { ResultEvidence } from "../../types/result";

interface EvidenceViewerProps {
  evidence: ResultEvidence;
  onClose: () => void;
}

export function EvidenceViewer({
  evidence,
  onClose,
}: EvidenceViewerProps) {
  return (
    <div className="evidence-viewer-overlay">
      <div className="evidence-viewer">
        {/* HEADER */}
        <div className="evidence-viewer__header">
          <div className="evidence-viewer__header-content">
            <div className="evidence-viewer__eyebrow">
              <ShieldCheck size={13} />
              EVIDENCE VIEWER
            </div>

            <h2 className="evidence-viewer__title">
              Source Evidence
            </h2>

            <p className="evidence-viewer__description">
              Inspect the source context used to support this
              AI-generated finding.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="evidence-viewer__close"
            aria-label="Close evidence viewer"
          >
            <X size={17} />
          </button>
        </div>

        {/* SOURCE */}
        <div className="evidence-viewer__source">
          <div className="evidence-viewer__source-icon">
            <FileText size={20} />
          </div>

          <div className="evidence-viewer__source-info">
            <span>SOURCE DOCUMENT</span>

            <strong>{evidence.source}</strong>

            <div className="evidence-viewer__source-location">
              <MapPin size={11} />
              {evidence.section}
            </div>
          </div>

          <div className="evidence-viewer__verified">
            <CheckCircle2 size={12} />
            VERIFIED
          </div>
        </div>

        {/* EVIDENCE CONTENT */}
        <div className="evidence-viewer__content">
          <div className="evidence-viewer__content-label">
            EVIDENCE CONTEXT
          </div>

          <div className="evidence-viewer__quote">
            <span className="evidence-viewer__quote-mark">
              “
            </span>

            <p>{evidence.description}</p>
          </div>
        </div>

        {/* TRACEABILITY */}
        <div className="evidence-viewer__trace">
          <div>
            <span>SOURCE</span>
            <strong>{evidence.source}</strong>
          </div>

          <div>
            <span>SECTION</span>
            <strong>{evidence.section}</strong>
          </div>

          <div>
            <span>VERIFICATION</span>
            <strong>
              {evidence.verified
                ? "VERIFIED"
                : "UNVERIFIED"}
            </strong>
          </div>
        </div>

        {/* FOOTER */}
        <div className="evidence-viewer__footer">
          <span>
            Evidence is linked to the generated AI analysis.
          </span>

          <button
            type="button"
            onClick={onClose}
            className="evidence-viewer__close-button"
          >
            Close Evidence
          </button>
        </div>
      </div>
    </div>
  );
}