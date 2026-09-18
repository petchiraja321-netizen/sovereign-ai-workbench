import type { ApprovalRequest } from "../../../types/approval";
import { ApprovalRow } from "./ApprovalRow";

interface ApprovalTableProps {
  approvals: ApprovalRequest[];
  onSelect: (approval: ApprovalRequest) => void;
}

export function ApprovalTable({
  approvals,
  onSelect,
}: ApprovalTableProps) {
  return (
    <section className="approval-table-card">
      <div className="approval-table-card__header">
        <div>
          <h2>Approval Requests</h2>

          <p>
            Review AI actions that require human
            authorization.
          </p>
        </div>

        <span className="approval-table-count">
          {approvals.length} request
          {approvals.length === 1 ? "" : "s"}
        </span>
      </div>

      {approvals.length === 0 ? (
        <div className="approval-empty">
          <div className="approval-empty__icon">
            ✓
          </div>

          <h3>No approval requests found</h3>

          <p>
            Try changing the search or filter criteria.
          </p>
        </div>
      ) : (
        <div className="approval-table-wrapper">
          <table className="approval-table">
            <thead>
              <tr>
                <th>Request</th>
                <th>Action</th>
                <th>Risk</th>
                <th>Requested</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>

            <tbody>
              {approvals.map((approval) => (
                <ApprovalRow
                  key={approval.id}
                  approval={approval}
                  onSelect={onSelect}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}