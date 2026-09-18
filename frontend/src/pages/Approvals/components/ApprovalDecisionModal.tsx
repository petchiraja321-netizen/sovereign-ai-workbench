import { useState } from "react";

type DecisionAction = "APPROVE" | "REJECT";

interface ApprovalDecisionModalProps {
  decision: DecisionAction;
  taskId: string;
  action: string;
  onCancel: () => void;
  onConfirm: (comment: string) => void;
}

export function ApprovalDecisionModal({
  decision,
  taskId,
  action,
  onCancel,
  onConfirm,
}: ApprovalDecisionModalProps) {
  const [comment, setComment] =
    useState("");

  const isReject =
    decision === "REJECT";

  const handleSubmit = () => {
    if (
      isReject &&
      !comment.trim()
    ) {
      return;
    }

    onConfirm(comment.trim());
  };

  return (
    <div className="approval-modal-backdrop">
      <div
        className="approval-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="approval-modal-title"
      >
        <div className="approval-modal__header">
          <div>
            <span className="approval-modal__eyebrow">
              {isReject
                ? "REJECT REQUEST"
                : "CONFIRM APPROVAL"}
            </span>

            <h2 id="approval-modal-title">
              {isReject
                ? "Reject this AI action?"
                : "Approve this AI action?"}
            </h2>
          </div>

          <button
            type="button"
            className="approval-modal__close"
            onClick={onCancel}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="approval-modal__content">
          <div className="approval-modal__context">
            <div>
              <span>Task</span>
              <strong>{taskId}</strong>
            </div>

            <div>
              <span>Action</span>
              <strong>{action}</strong>
            </div>
          </div>

          <label className="approval-modal__field">
            <span>
              {isReject
                ? "Reason for rejection"
                : "Optional comment"}
            </span>

            <textarea
              value={comment}
              onChange={(event) =>
                setComment(event.target.value)
              }
              placeholder={
                isReject
                  ? "Explain why this request is being rejected..."
                  : "Add an optional approval comment..."
              }
              rows={4}
            />
          </label>

          {isReject &&
            !comment.trim() && (
              <p className="approval-modal__validation">
                A rejection reason is required.
              </p>
            )}
        </div>

        <footer className="approval-modal__actions">
          <button
            type="button"
            className="approval-modal-button approval-modal-button--secondary"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            type="button"
            className={`approval-modal-button ${
              isReject
                ? "approval-modal-button--reject"
                : "approval-modal-button--approve"
            }`}
            disabled={
              isReject &&
              !comment.trim()
            }
            onClick={handleSubmit}
          >
            {isReject
              ? "Reject Request"
              : "Confirm Approval"}
          </button>
        </footer>
      </div>
    </div>
  );
}