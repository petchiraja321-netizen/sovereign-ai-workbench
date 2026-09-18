import type {
  ApprovalActionType,
  ApprovalFilters,
  ApprovalRisk,
  ApprovalStatus,
} from "../../../types/approval";

interface ApprovalToolbarProps {
  filters: ApprovalFilters;
  onChange: (filters: ApprovalFilters) => void;
}

export function ApprovalToolbar({
  filters,
  onChange,
}: ApprovalToolbarProps) {
  const update = (
    patch: Partial<ApprovalFilters>,
  ) => {
    onChange({
      ...filters,
      ...patch,
    });
  };

  return (
    <section className="approval-toolbar">
      <div className="approval-search">
        <span className="approval-search__icon">
          ⌕
        </span>

        <input
          type="search"
          placeholder="Search task / request..."
          value={filters.search}
          onChange={(event) =>
            update({
              search: event.target.value,
            })
          }
        />
      </div>

      <label className="approval-filter">
        <span>Status</span>

        <select
          value={filters.status}
          onChange={(event) =>
            update({
              status: event.target.value as
                | ApprovalStatus
                | "ALL",
            })
          }
        >
          <option value="ALL">All</option>
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
        </select>
      </label>

      <label className="approval-filter">
        <span>Risk</span>

        <select
          value={filters.risk}
          onChange={(event) =>
            update({
              risk: event.target.value as
                | ApprovalRisk
                | "ALL",
            })
          }
        >
          <option value="ALL">All</option>
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>
      </label>

      <label className="approval-filter approval-filter--wide">
        <span>Action Type</span>

        <select
          value={filters.actionType}
          onChange={(event) =>
            update({
              actionType: event.target.value as
                | ApprovalActionType
                | "ALL",
            })
          }
        >
          <option value="ALL">All</option>
          <option value="Deliverable Generation">
            Deliverable Generation
          </option>
          <option value="External Request">
            External Request
          </option>
          <option value="Data Export">
            Data Export
          </option>
          <option value="Tool Execution">
            Tool Execution
          </option>
          <option value="Sensitive Operation">
            Sensitive Operation
          </option>
        </select>
      </label>
    </section>
  );
}