import {
  ArrowDownUp,
  Filter,
  Grid2X2,
  List,
  Search,
} from "lucide-react";

import type { TaskSort } from "../../../types/task";

interface TaskToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  onFilterClick: () => void;
  onSortChange: () => void;
  sortBy: TaskSort;
  resultCount: number;
  viewMode: "list" | "grid";
  onViewModeChange: (
    mode: "list" | "grid",
  ) => void;
}

export function TaskToolbar({
  search,
  onSearchChange,
  onFilterClick,
  onSortChange,
  sortBy,
  resultCount,
  viewMode,
  onViewModeChange,
}: TaskToolbarProps) {
  return (
    <section className="task-toolbar">
      <div className="task-toolbar__search">
        <Search size={15} />

        <input
          value={search}
          onChange={(event) =>
            onSearchChange(
              event.target.value,
            )
          }
          placeholder="Search tasks..."
          aria-label="Search tasks"
        />
      </div>

      <div className="task-toolbar__actions">
        <span className="task-toolbar__count">
          {resultCount} RESULTS
        </span>

        <button
          type="button"
          className="task-toolbar__button"
          onClick={onFilterClick}
        >
          <Filter size={14} />
          <span>Filter</span>
        </button>

        <button
          type="button"
          className="task-toolbar__button"
          onClick={onSortChange}
        >
          <ArrowDownUp size={14} />
          <span>
            {sortBy === "newest"
              ? "Newest"
              : sortBy === "oldest"
                ? "Oldest"
                : sortBy === "updated"
                  ? "Updated"
                  : "Status"}
          </span>
        </button>

        <div className="task-toolbar__view">
          <button
            type="button"
            className={
              viewMode === "list"
                ? "is-active"
                : ""
            }
            onClick={() =>
              onViewModeChange("list")
            }
            aria-label="List view"
          >
            <List size={15} />
          </button>

          <button
            type="button"
            className={
              viewMode === "grid"
                ? "is-active"
                : ""
            }
            onClick={() =>
              onViewModeChange("grid")
            }
            aria-label="Grid view"
          >
            <Grid2X2 size={14} />
          </button>
        </div>
      </div>
    </section>
  );
}