import {
  CheckCircle2,
  FileText,
  MapPin,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";

import type { ResultEvidence } from "../../types/result";

interface EvidenceCardProps {
  evidence: ResultEvidence;
}

export function EvidenceCard({
  evidence,
}: EvidenceCardProps) {
  const statusLabel = evidence.verified
    ? "VERIFIED"
    : "UNVERIFIED";

  return (
    <article
      className={`evidence-card ${
        evidence.verified
          ? "evidence-card--verified"
          : "evidence-card--unverified"
      }`}
    >
      {/* STATUS ICON */}
      <div className="evidence-card__icon">
        {evidence.verified ? (
          <CheckCircle2 size={16} />
        ) : (
          <ShieldAlert size={16} />
        )}
      </div>

      {/* CONTENT */}
      <div className="evidence-card__content">
        {/* HEADER */}
        <div className="evidence-card__header">
          <div className="evidence-card__title-group">
            <span className="evidence-card__eyebrow">
              EVIDENCE
            </span>

            <h4>{evidence.title}</h4>
          </div>

          <span
            className={`evidence-card__status ${
              evidence.verified
                ? "evidence-card__status--verified"
                : "evidence-card__status--unverified"
            }`}
          >
            {evidence.verified ? (
              <ShieldCheck size={11} />
            ) : (
              <ShieldAlert size={11} />
            )}

            {statusLabel}
          </span>
        </div>

        {/* DESCRIPTION */}
        <p className="evidence-card__description">
          {evidence.description}
        </p>

        {/* SOURCE TRACEABILITY */}
        <div className="evidence-card__source">
          <FileText size={13} />

          <div className="evidence-card__source-main">
            <span className="evidence-card__source-label">
              SOURCE DOCUMENT
            </span>

            <strong>{evidence.source}</strong>
          </div>

          <div className="evidence-card__source-divider" />

          <div className="evidence-card__section">
            <MapPin size={12} />

            <div>
              <span className="evidence-card__source-label">
                SECTION
              </span>

              <strong>{evidence.section}</strong>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}