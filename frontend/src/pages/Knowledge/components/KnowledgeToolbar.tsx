import {
  Grid2X2,
  List,
  Search,
  SlidersHorizontal,
  ArrowDownAZ,
} from "lucide-react";

interface KnowledgeToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  viewMode: "list" | "grid";
  onViewModeChange: (mode: "list" | "grid") => void;
  onFilterClick?: () => void;
  onSortClick?: () => void;
  resultCount: number;
}

export function KnowledgeToolbar({
  search,
  onSearchChange,
  viewMode,
  onViewModeChange,
  onFilterClick,
  onSortClick,
  resultCount,
}: KnowledgeToolbarProps) {
  return (
    <section className="knowledge-toolbar">
      <div className="knowledge-toolbar__left">
        {/* SEARCH */}
        <div className="knowledge-toolbar__search">
          <Search size={14} />

          <input
            type="search"
            value={search}
            onChange={(event) =>
              onSearchChange(event.target.value)
            }
            placeholder="Search documents..."
            aria-label="Search documents"
          />
        </div>

        {/* RESULT COUNT */}
        <span className="knowledge-toolbar__count">
          {resultCount.toLocaleString()} documents
        </span>
      </div>

      <div className="knowledge-toolbar__right">
        {/* FILTER */}
        <button
          type="button"
          className="knowledge-toolbar__button"
          onClick={onFilterClick}
        >
          <SlidersHorizontal size={13} />
          Filter
        </button>

        {/* SORT */}
        <button
          type="button"
          className="knowledge-toolbar__button"
          onClick={onSortClick}
        >
          <ArrowDownAZ size={13} />
          Sort
        </button>

        {/* VIEW SWITCHER */}
        <div
          className="knowledge-toolbar__view-switcher"
          aria-label="Document view mode"
        >
          <button
            type="button"
            className={`knowledge-toolbar__view-button ${
              viewMode === "list"
                ? "knowledge-toolbar__view-button--active"
                : ""
            }`}
            onClick={() => onViewModeChange("list")}
            aria-label="List view"
            title="List view"
          >
            <List size={14} />
          </button>

          <button
            type="button"
            className={`knowledge-toolbar__view-button ${
              viewMode === "grid"
                ? "knowledge-toolbar__view-button--active"
                : ""
            }`}
            onClick={() => onViewModeChange("grid")}
            aria-label="Grid view"
            title="Grid view"
          >
            <Grid2X2 size={13} />
          </button>
        </div>
      </div>
    </section>
  );
}