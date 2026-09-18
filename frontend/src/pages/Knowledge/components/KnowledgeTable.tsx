import {
  ChevronRight,
  FileArchive,
  FileSpreadsheet,
  FileText,
  FileType2,
} from "lucide-react";

import type { KnowledgeDocument } from "../../../types/knowledge";
import { KnowledgeRowActions } from "./KnowledgeRowActions";

interface KnowledgeTableProps {
  documents: KnowledgeDocument[];

  onDocumentClick?: (
    document: KnowledgeDocument,
  ) => void;

  onView?: (
    document: KnowledgeDocument,
  ) => void;

  onProcess?: (
    document: KnowledgeDocument,
  ) => void;

  onReindex?: (
    document: KnowledgeDocument,
  ) => void;

  onDownload?: (
    document: KnowledgeDocument,
  ) => void;

  onRemove?: (
    document: KnowledgeDocument,
  ) => void;
}

export function KnowledgeTable({
  documents,
  onDocumentClick,
  onView,
  onProcess,
  onReindex,
  onDownload,
  onRemove,
}: KnowledgeTableProps) {
  /*
   * ============================================
   * EMPTY STATE
   * ============================================
   */

  if (documents.length === 0) {
    return (
      <section
        className="knowledge-table"
        aria-label="Knowledge documents"
      >
        <div className="knowledge-table__empty">
          <div className="knowledge-table__empty-icon">
            <FileText size={20} />
          </div>

          <strong>
            No documents found
          </strong>

          <span>
            Try changing your search or
            filter criteria.
          </span>
        </div>
      </section>
    );
  }

  /*
   * ============================================
   * TABLE
   * ============================================
   */

  return (
    <section
      className="knowledge-table"
      aria-label="Knowledge documents"
    >
      {/* TABLE HEADER */}

      <div className="knowledge-table__header">
        <div className="knowledge-table__header-cell knowledge-table__header-cell--name">
          NAME
        </div>

        <div className="knowledge-table__header-cell">
          TYPE
        </div>

        <div className="knowledge-table__header-cell">
          STATUS
        </div>

        <div className="knowledge-table__header-cell">
          CHUNKS
        </div>

        <div className="knowledge-table__header-cell">
          UPDATED
        </div>

        <div className="knowledge-table__header-cell knowledge-table__header-cell--actions">
          ACTIONS
        </div>
      </div>

      {/* TABLE BODY */}

      <div className="knowledge-table__body">
        {documents.map((document) => (
          <KnowledgeTableRow
            key={document.id}
            document={document}
            onClick={
              onDocumentClick
                ? () =>
                    onDocumentClick(
                      document,
                    )
                : undefined
            }
            onView={onView}
            onProcess={onProcess}
            onReindex={onReindex}
            onDownload={onDownload}
            onRemove={onRemove}
          />
        ))}
      </div>
    </section>
  );
}

/* ============================================
   TABLE ROW
   ============================================ */

interface KnowledgeTableRowProps {
  document: KnowledgeDocument;

  onClick?: () => void;

  onView?: (
    document: KnowledgeDocument,
  ) => void;

  onProcess?: (
    document: KnowledgeDocument,
  ) => void;

  onReindex?: (
    document: KnowledgeDocument,
  ) => void;

  onDownload?: (
    document: KnowledgeDocument,
  ) => void;

  onRemove?: (
    document: KnowledgeDocument,
  ) => void;
}

function KnowledgeTableRow({
  document,
  onClick,
  onView,
  onProcess,
  onReindex,
  onDownload,
  onRemove,
}: KnowledgeTableRowProps) {
  return (
    <article
      className="knowledge-table__row"
      onClick={onClick}
      tabIndex={
        onClick ? 0 : undefined
      }
      role={
        onClick ? "button" : undefined
      }
      onKeyDown={(event) => {
        if (
          onClick &&
          (event.key === "Enter" ||
            event.key === " ")
        ) {
          event.preventDefault();
          onClick();
        }
      }}
    >
      {/* NAME */}

      <div className="knowledge-table__cell knowledge-table__cell--name">
        <div className="knowledge-table__file-icon">
          {getFileIcon(document.type)}
        </div>

        <div className="knowledge-table__file-info">
          <strong
            title={document.name}
          >
            {document.name}
          </strong>

          <span>
            {document.size}
          </span>
        </div>
      </div>

      {/* TYPE */}

      <div className="knowledge-table__cell">
        <span className="knowledge-table__type">
          {document.type}
        </span>
      </div>

      {/* STATUS */}

      <div className="knowledge-table__cell">
        <KnowledgeTableStatus
          document={document}
        />
      </div>

      {/* CHUNKS */}

      <div className="knowledge-table__cell">
        <span className="knowledge-table__chunks">
          {document.chunks ?? "—"}
        </span>
      </div>

      {/* UPDATED */}

      <div className="knowledge-table__cell">
        <span className="knowledge-table__updated">
          {document.updatedAt}
        </span>
      </div>

      {/* ACTIONS */}

      <div className="knowledge-table__cell knowledge-table__cell--actions">
        <KnowledgeRowActions
          document={document}
          onView={onView}
          onProcess={onProcess}
          onReindex={onReindex}
          onDownload={onDownload}
          onRemove={onRemove}
        />

        <button
          type="button"
          className="knowledge-table__row-open"
          onClick={(event) => {
            event.stopPropagation();

            if (onClick) {
              onClick();
            }
          }}
          aria-label={`Open ${document.name}`}
          title="Open document"
        >
          <ChevronRight size={14} />
        </button>
      </div>
    </article>
  );
}

/* ============================================
   TABLE STATUS
   ============================================ */

function KnowledgeTableStatus({
  document,
}: {
  document: KnowledgeDocument;
}) {
  const isProcessing =
    document.status !== "indexed" &&
    document.status !== "failed" &&
    document.status !== "pending";

  /*
   * INDEXED
   */

  if (
    document.status === "indexed"
  ) {
    return (
      <span className="knowledge-table__status knowledge-table__status--indexed">
        <span className="knowledge-table__status-dot" />
        Indexed
      </span>
    );
  }

  /*
   * FAILED
   */

  if (
    document.status === "failed"
  ) {
    return (
      <span className="knowledge-table__status knowledge-table__status--failed">
        <span className="knowledge-table__status-dot" />
        Failed
      </span>
    );
  }

  /*
   * PENDING
   */

  if (
    document.status === "pending"
  ) {
    return (
      <span className="knowledge-table__status knowledge-table__status--pending">
        <span className="knowledge-table__status-dot" />
        Pending
      </span>
    );
  }

  /*
   * PROCESSING
   */

  return (
    <div className="knowledge-table__processing">
      <div className="knowledge-table__processing-top">
        <span className="knowledge-table__status knowledge-table__status--processing">
          <span className="knowledge-table__status-dot" />

          {getProcessingLabel(
            document.status,
          )}
        </span>

        {isProcessing && (
          <span className="knowledge-table__processing-percent">
            {
              document.processingProgress
            }
            %
          </span>
        )}
      </div>

      <div className="knowledge-table__progress">
        <div
          className="knowledge-table__progress-fill"
          style={{
            width: `${document.processingProgress}%`,
          }}
        />
      </div>
    </div>
  );
}

/* ============================================
   PROCESSING LABEL
   ============================================ */

function getProcessingLabel(
  status: KnowledgeDocument["status"],
): string {
  switch (status) {
    case "processing":
      return "Processing";

    case "extracting":
      return "Extracting";

    case "chunking":
      return "Chunking";

    case "embedding":
      return "Embedding";

    default:
      return "Processing";
  }
}

/* ============================================
   FILE ICON
   ============================================ */

function getFileIcon(
  type: KnowledgeDocument["type"],
) {
  switch (type) {
    case "XLSX":
    case "CSV":
      return (
        <FileSpreadsheet size={18} />
      );

    case "PPTX":
      return (
        <FileType2 size={18} />
      );

    case "DOCX":
      return (
        <FileText size={18} />
      );

    case "PDF":
      return (
        <FileArchive size={18} />
      );

    case "TXT":
    default:
      return (
        <FileText size={18} />
      );
  }
}