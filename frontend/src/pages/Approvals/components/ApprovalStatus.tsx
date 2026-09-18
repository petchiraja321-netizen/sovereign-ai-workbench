import type { ApprovalStatus as ApprovalStatusType } from "../../../types/approval";

interface ApprovalStatusProps {
  status: ApprovalStatusType;
}

export function ApprovalStatus({
  status,
}: ApprovalStatusProps) {
  return (
    <span
      className={`approval-status approval-status--${status.toLowerCase()}`}
    >
      <span className="approval-status__dot" />
      {status}
    </span>
  );
}