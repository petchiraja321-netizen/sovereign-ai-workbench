interface ApprovalHeaderProps {
  pendingCount: number;
}

export function ApprovalHeader({
  pendingCount,
}: ApprovalHeaderProps) {
  return (
    <header className="approval-header">
      <div>
        <div className="approval-eyebrow">
          HUMAN APPROVAL
        </div>

        <h1>Approval Workflow</h1>

        <p>
          Review AI actions requiring human authorization
          before execution can continue.
        </p>
      </div>

      <div className="approval-header__status">
        <span className="approval-status-dot" />

        <div>
          <strong>Human Control Gate</strong>
          <span>
            {pendingCount} request
            {pendingCount === 1 ? "" : "s"} awaiting review
          </span>
        </div>
      </div>
    </header>
  );
}