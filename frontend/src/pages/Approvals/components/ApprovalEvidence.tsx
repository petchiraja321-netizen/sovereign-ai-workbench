import type { ApprovalEvidence as ApprovalEvidenceType } from "../../../types/approval";

interface ApprovalEvidenceProps {
  evidence: ApprovalEvidenceType[];
  evidenceCount: number;
}

export function ApprovalEvidence({
  evidence,
  evidenceCount,
}: ApprovalEvidenceProps) {
  return (
    <section className="approval-evidence">
      <div className="approval-details-section__heading">
        <div>
          <h3>Evidence Support</h3>
          <p>
            {evidenceCount} verified sources support this
            approval request.
          </p>
        </div>
      </div>

      <div className="approval-evidence-list">
        {evidence.map((item) => (
          <article
            key={item.id}
            className="approval-evidence-item"
          >
            <div className="approval-evidence-item__main">
              <strong>{item.sourceName}</strong>

              <span>{item.section}</span>
            </div>

            <div className="approval-evidence-item__meta">
              <span>
                Confidence: {item.confidence}%
              </span>

              {item.verified && (
                <span className="approval-evidence-verified">
                  ✓ Verified
                </span>
              )}
            </div>

            <button
              type="button"
              className="approval-evidence-view"
              onClick={() =>
                console.log(
                  "Evidence viewer requested:",
                  item.id,
                )
              }
            >
              View
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}