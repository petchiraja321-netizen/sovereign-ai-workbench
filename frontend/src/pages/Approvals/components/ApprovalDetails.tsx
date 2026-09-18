import type { ApprovalRequest } from "../../../types/approval";

import { ApprovalEvidence } from "./ApprovalEvidence";
import { ApprovalStatus } from "./ApprovalStatus";

interface ApprovalDetailsProps {
  approval: ApprovalRequest;
  onClose: () => void;
  onApprove: (approval: ApprovalRequest) => void;
  onReject: (approval: ApprovalRequest) => void;
}

export function ApprovalDetails({
  approval,
  onClose,
  onApprove,
  onReject,
}: ApprovalDetailsProps) {
  const isPending =
    approval.status === "PENDING";

  return (
    <div className="approval-drawer-backdrop">
      <aside
        className="approval-drawer"
        aria-label="Approval request details"
      >
        <header className="approval-drawer__header">
          <div>
            <span className="approval-drawer__eyebrow">
              APPROVAL REQUEST
            </span>

            <h2>{approval.id}</h2>

            <span className="approval-drawer__task">
              {approval.taskId}
            </span>
          </div>

          <button
            type="button"
            className="approval-drawer__close"
            onClick={onClose}
            aria-label="Close approval details"
          >
            ×
          </button>
        </header>

        <div className="approval-drawer__content">
          <div className="approval-detail-task">
            <span>Task</span>
            <strong>{approval.taskTitle}</strong>
          </div>

          <div className="approval-detail-grid">
            <div>
              <span>Status</span>
              <ApprovalStatus
                status={approval.status}
              />
            </div>

            <div>
              <span>Risk</span>
              <strong
                className={`approval-risk approval-risk--${approval.risk.toLowerCase()}`}
              >
                {approval.risk}
              </strong>
            </div>

            <div>
              <span>Requested By</span>
              <strong>{approval.requestedBy}</strong>
            </div>

            <div>
              <span>Model</span>
              <strong>
                {approval.model ?? "Not specified"}
              </strong>
            </div>
          </div>

          <section className="approval-details-block">
            <span>Requested Action</span>

            <p>{approval.action}</p>
          </section>

          <section className="approval-details-block">
            <span>Why Approval Is Required</span>

            <p>{approval.reason}</p>
          </section>

          <section className="approval-details-block">
            <span>Requested</span>

            <p>{approval.requestedAt}</p>
          </section>

          <ApprovalEvidence
            evidence={approval.evidence}
            evidenceCount={approval.evidenceCount}
          />

          {approval.decisionComment && (
            <section className="approval-details-block">
              <span>Decision Comment</span>

              <p>{approval.decisionComment}</p>
            </section>
          )}

          {!isPending && (
            <div className="approval-decision-summary">
              <strong>
                {approval.status === "APPROVED"
                  ? "Request approved"
                  : "Request rejected"}
              </strong>

              <span>
                Decision by{" "}
                {approval.decisionBy ??
                  "Workbench User"}
              </span>
            </div>
          )}
        </div>

        {isPending && (
          <footer className="approval-drawer__actions">
            <button
              type="button"
              className="approval-decision-button approval-decision-button--reject"
              onClick={() => onReject(approval)}
            >
              Reject
            </button>

            <button
              type="button"
              className="approval-decision-button approval-decision-button--approve"
              onClick={() => onApprove(approval)}
            >
              Approve
            </button>
          </footer>
        )}
      </aside>
    </div>
  );
}