import type {
  SearchFilters as SearchFiltersType,
  SearchResultType,
} from "../../types/search";

interface SearchFiltersProps {
  filters: SearchFiltersType;
  onChange: (
    filters: SearchFiltersType,
  ) => void;
}

const filterItems: Array<{
  label: string;
  value: SearchResultType | "ALL";
}> = [
  { label: "All", value: "ALL" },
  { label: "Tasks", value: "TASK" },
  { label: "Files", value: "FILE" },
  { label: "Evidence", value: "EVIDENCE" },
  {
    label: "Deliverables",
    value: "DELIVERABLE",
  },
  {
    label: "Approvals",
    value: "APPROVAL",
  },
  {
    label: "Security",
    value: "SECURITY",
  },
  {
    label: "Audit",
    value: "AUDIT",
  },
];

export function SearchFilters({
  filters,
  onChange,
}: SearchFiltersProps) {
  return (
    <div className="global-search-filters">
      <div className="global-search-filter-tabs">
        {filterItems.map((item) => (
          <button
            key={item.value}
            type="button"
            className={
              filters.type === item.value
                ? "global-search-filter--active"
                : ""
            }
            onClick={() =>
              onChange({
                ...filters,
                type: item.value,
              })
            }
          >
            {item.label}
          </button>
        ))}
      </div>

      <select
        value={filters.status}
        onChange={(event) =>
          onChange({
            ...filters,
            status: event.target.value,
          })
        }
        aria-label="Search status"
      >
        <option value="ALL">
          Any Status
        </option>
        <option value="RUNNING">
          Running
        </option>
        <option value="COMPLETED">
          Completed
        </option>
        <option value="READY">
          Ready
        </option>
        <option value="PENDING">
          Pending
        </option>
        <option value="APPROVED">
          Approved
        </option>
        <option value="WARNING">
          Warning
        </option>
        <option value="PASSED">
          Passed
        </option>
        <option value="VERIFIED">
          Verified
        </option>
        <option value="RECORDED">
          Recorded
        </option>
        <option value="UNREAD">
          Unread
        </option>
        <option value="AVAILABLE">
          Available
        </option>
      </select>
    </div>
  );
}