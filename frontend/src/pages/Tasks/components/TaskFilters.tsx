import type {
  TaskFilterState,
  TaskStatus,
  TaskType,
} from "../../../types/task";

interface TaskFiltersProps {
  open: boolean;
  filters: TaskFilterState;
  onStatusChange: (
    status: TaskStatus | "all",
  ) => void;
  onTypeChange: (
    type: TaskType | "all",
  ) => void;
  onModelChange: (model: string) => void;
  onClear: () => void;
}

export function TaskFilters({
  open,
  filters,
  onStatusChange,
  onTypeChange,
  onModelChange,
  onClear,
}: TaskFiltersProps) {
  if (!open) {
    return null;
  }

  return (
    <section className="task-filters">
      <div className="task-filter-group">
        <label>Status</label>

        <select
          value={filters.status}
          onChange={(event) =>
            onStatusChange(
              event.target
                .value as TaskStatus | "all",
            )
          }
        >
          <option value="all">All</option>
          <option value="running">Running</option>
          <option value="completed">
            Completed
          </option>
          <option value="failed">Failed</option>
          <option value="approval">
            Approval Required
          </option>
          <option value="queued">Queued</option>
        </select>
      </div>

      <div className="task-filter-group">
        <label>Task Type</label>

        <select
          value={filters.type}
          onChange={(event) =>
            onTypeChange(
              event.target
                .value as TaskType | "all",
            )
          }
        >
          <option value="all">All</option>
          <option value="analysis">
            Analysis
          </option>
          <option value="research">
            Research
          </option>
          <option value="document">
            Document
          </option>
          <option value="extraction">
            Extraction
          </option>
          <option value="report">
            Report Generation
          </option>
        </select>
      </div>

      <div className="task-filter-group">
        <label>Model</label>

        <select
          value={filters.model}
          onChange={(event) =>
            onModelChange(
              event.target.value,
            )
          }
        >
          <option value="all">All Models</option>
          <option value="Qwen 3 8B">
            Qwen 3 8B
          </option>
          <option value="Vision Model">
            Vision Model
          </option>
          <option value="Other Local Models">
            Other Local Models
          </option>
        </select>
      </div>

      <button
        type="button"
        className="task-filters__clear"
        onClick={onClear}
      >
        Clear Filters
      </button>
    </section>
  );
}