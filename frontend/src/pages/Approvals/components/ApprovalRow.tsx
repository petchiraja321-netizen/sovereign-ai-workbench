import type { ApprovalRequest } from "../../../types/approval";
import { ApprovalStatus } from "./ApprovalStatus";

interface ApprovalRowProps {
  approval: ApprovalRequest;
  onSelect: (approval: ApprovalRequest) => void;
}

function formatRisk(risk: ApprovalRequest["risk"]) {
  return risk.charAt(0) + risk.slice(1).toLowerCase();
}

export function ApprovalRow({
  approval,
  onSelect,
}: ApprovalRowProps) {
  return (
    <tr
      className="approval-row"
      onClick={() => onSelect(approval)}
    >
      <td>
        <div className="approval-request-id">
          {approval.id}
        </div>

        <div className="approval-task-id">
          {approval.taskId}
        </div>
      </td>

      <td>
        <div className="approval-action">
          {approval.action}
        </div>

        <div className="approval-action-type">
          {approval.actionType}
        </div>
      </td>

      <td>
        <span
          className={`approval-risk approval-risk--${approval.risk.toLowerCase()}`}
        >
          {formatRisk(approval.risk)}
        </span>
      </td>

      <td>
        <span className="approval-age">
          {approval.requestedAt}
        </span>
      </td>

      <td>
        <ApprovalStatus status={approval.status} />
      </td>

      <td>
        <button
          type="button"
          className="approval-view-button"
          onClick={(event) => {
            event.stopPropagation();
            onSelect(approval);
          }}
        >
          Review
        </button>
      </td>
    </tr>
  );
}