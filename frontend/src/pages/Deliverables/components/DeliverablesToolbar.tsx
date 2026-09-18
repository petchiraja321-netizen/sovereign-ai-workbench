import {
  Grid2X2,
  List,
  Search,
} from "lucide-react";

type Props = {
  search: string;
  typeFilter: string;
  statusFilter: string;
  view: "table" | "grid";
  resultCount: number;
  onSearchChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onViewChange: (value: "table" | "grid") => void;
};

export default function DeliverablesToolbar({
  search,
  typeFilter,
  statusFilter,
  view,
  resultCount,
  onSearchChange,
  onTypeChange,
  onStatusChange,
  onViewChange,
}: Props) {
  return (
    <section className="deliverables-toolbar">
      <div className="deliverables-toolbar__top">
        <div>
          <span>OUTPUT LIBRARY</span>
          <h2>Search and manage deliverables</h2>
        </div>

        <strong>{resultCount} results</strong>
      </div>

      <div className="deliverables-toolbar__controls">
        <div className="deliverables-search">
          <Search size={15} />

          <input
            value={search}
            onChange={(event) =>
              onSearchChange(event.target.value)
            }
            placeholder="Search deliverable, task or ID..."
          />
        </div>

        <select
          value={typeFilter}
          onChange={(event) =>
            onTypeChange(event.target.value)
          }
        >
          <option value="All">All Types</option>
          <option value="PDF">PDF</option>
          <option value="DOCX">DOCX</option>
          <option value="XLSX">XLSX</option>
          <option value="PPTX">PPTX</option>
          <option value="JSON">JSON</option>
        </select>

        <select
          value={statusFilter}
          onChange={(event) =>
            onStatusChange(event.target.value)
          }
        >
          <option value="All">All Status</option>
          <option value="READY">Ready</option>
          <option value="PROCESSING">Processing</option>
          <option value="FAILED">Failed</option>
          <option value="ARCHIVED">Archived</option>
        </select>

        <div className="deliverables-view-toggle">
          <button
            type="button"
            className={view === "table" ? "active" : ""}
            onClick={() => onViewChange("table")}
            aria-label="Table view"
          >
            <List size={15} />
          </button>

          <button
            type="button"
            className={view === "grid" ? "active" : ""}
            onClick={() => onViewChange("grid")}
            aria-label="Grid view"
          >
            <Grid2X2 size={15} />
          </button>
        </div>
      </div>
    </section>
  );
}