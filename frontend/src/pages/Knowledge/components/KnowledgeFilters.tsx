import {
  Check,
  FileArchive,
  FileSpreadsheet,
  FileText,
  FileType2,
  RotateCcw,
  X,
} from "lucide-react";

import type {
  KnowledgeDocumentStatus,
  KnowledgeFileType,
} from "../../../types/knowledge";

interface KnowledgeFiltersProps {
  open: boolean;
  onClose: () => void;

  fileType:
    | KnowledgeFileType
    | "all";

  status:
    | KnowledgeDocumentStatus
    | "all";

  onFileTypeChange: (
    fileType:
      | KnowledgeFileType
      | "all",
  ) => void;

  onStatusChange: (
    status:
      | KnowledgeDocumentStatus
      | "all",
  ) => void;
}

const fileTypes: Array<{
  value: KnowledgeFileType | "all";
  label: string;
  icon: typeof FileText;
}> = [
  {
    value: "all",
    label: "All Types",
    icon: FileText,
  },
  {
    value: "PDF",
    label: "PDF",
    icon: FileArchive,
  },
  {
    value: "DOCX",
    label: "DOCX",
    icon: FileText,
  },
  {
    value: "XLSX",
    label: "XLSX",
    icon: FileSpreadsheet,
  },
  {
    value: "TXT",
    label: "TXT",
    icon: FileText,
  },
  {
    value: "CSV",
    label: "CSV",
    icon: FileSpreadsheet,
  },
  {
    value: "PPTX",
    label: "PPTX",
    icon: FileType2,
  },
];

const statuses: Array<{
  value:
    | KnowledgeDocumentStatus
    | "all";
  label: string;
}> = [
  {
    value: "all",
    label: "All Status",
  },
  {
    value: "indexed",
    label: "Indexed",
  },
  {
    value: "processing",
    label: "Processing",
  },
  {
    value: "extracting",
    label: "Extracting",
  },
  {
    value: "chunking",
    label: "Chunking",
  },
  {
    value: "embedding",
    label: "Embedding",
  },
  {
    value: "pending",
    label: "Pending",
  },
  {
    value: "failed",
    label: "Failed",
  },
];

export function KnowledgeFilters({
  open,
  onClose,
  fileType,
  status,
  onFileTypeChange,
  onStatusChange,
}: KnowledgeFiltersProps) {
  if (!open) {
    return null;
  }

  const activeFilterCount =
    Number(fileType !== "all") +
    Number(status !== "all");

  const resetFilters = () => {
    onFileTypeChange("all");
    onStatusChange("all");
  };

  return (
    <div
      className="knowledge-filters"
      role="region"
      aria-label="Knowledge document filters"
    >
      <div className="knowledge-filters__header">
        <div>
          <span className="knowledge-filters__eyebrow">
            DOCUMENT CONTROL
          </span>

          <h3>
            Filter Documents
          </h3>

          <p>
            Narrow the knowledge sources
            shown in the workspace.
          </p>
        </div>

        <div className="knowledge-filters__header-actions">
          {activeFilterCount > 0 && (
            <span className="knowledge-filters__active-count">
              {activeFilterCount} active
            </span>
          )}

          <button
            type="button"
            className="knowledge-filters__close"
            onClick={onClose}
            aria-label="Close filters"
            title="Close filters"
          >
            <X size={15} />
          </button>
        </div>
      </div>

      <div className="knowledge-filters__content">
        <section className="knowledge-filters__section">
          <div className="knowledge-filters__section-header">
            <div>
              <span className="knowledge-filters__section-label">
                SOURCE TYPE
              </span>

              <strong>
                File Type
              </strong>
            </div>

            <span>
              {fileType === "all"
                ? "ALL"
                : fileType}
            </span>
          </div>

          <div className="knowledge-filters__type-grid">
            {fileTypes.map((item) => {
              const Icon = item.icon;
              const isActive =
                fileType === item.value;

              return (
                <button
                  key={item.value}
                  type="button"
                  className={`knowledge-filters__type-option ${
                    isActive
                      ? "knowledge-filters__type-option--active"
                      : ""
                  }`}
                  onClick={() =>
                    onFileTypeChange(
                      item.value,
                    )
                  }
                  aria-pressed={isActive}
                >
                  <span className="knowledge-filters__type-icon">
                    <Icon size={14} />
                  </span>

                  <span>
                    {item.label}
                  </span>

                  {isActive && (
                    <Check
                      size={13}
                      className="knowledge-filters__check"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </section>

        <section className="knowledge-filters__section">
          <div className="knowledge-filters__section-header">
            <div>
              <span className="knowledge-filters__section-label">
                INGESTION PIPELINE
              </span>

              <strong>
                Processing Status
              </strong>
            </div>

            <span>
              {status === "all"
                ? "ALL"
                : getStatusLabel(status)}
            </span>
          </div>

          <div className="knowledge-filters__status-list">
            {statuses.map((item) => {
              const isActive =
                status === item.value;

              return (
                <button
                  key={item.value}
                  type="button"
                  className={`knowledge-filters__status-option ${
                    isActive
                      ? "knowledge-filters__status-option--active"
                      : ""
                  }`}
                  onClick={() =>
                    onStatusChange(
                      item.value,
                    )
                  }
                  aria-pressed={isActive}
                >
                  <span
                    className={`knowledge-filters__status-dot knowledge-filters__status-dot--${item.value}`}
                  />

                  <span>
                    {item.label}
                  </span>

                  {isActive && (
                    <Check
                      size={13}
                      className="knowledge-filters__check"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </section>
      </div>

      <footer className="knowledge-filters__footer">
        <button
          type="button"
          className="knowledge-filters__reset"
          onClick={resetFilters}
          disabled={
            activeFilterCount === 0
          }
        >
          <RotateCcw size={13} />
          Reset Filters
        </button>

        <button
          type="button"
          className="knowledge-filters__apply"
          onClick={onClose}
        >
          <Check size={13} />
          Apply Filters
        </button>
      </footer>
    </div>
  );
}

function getStatusLabel(
  status:
    | KnowledgeDocumentStatus
    | "all",
): string {
  switch (status) {
    case "indexed":
      return "INDEXED";

    case "processing":
      return "PROCESSING";

    case "extracting":
      return "EXTRACTING";

    case "chunking":
      return "CHUNKING";

    case "embedding":
      return "EMBEDDING";

    case "pending":
      return "PENDING";

    case "failed":
      return "FAILED";

    case "all":
    default:
      return "ALL";
  }
}