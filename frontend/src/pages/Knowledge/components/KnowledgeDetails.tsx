import {
  Check,
  Clipboard,
  Database,
  FileArchive,
  FileSpreadsheet,
  FileText,
  FileType2,
  Layers3,
  ScanText,
  Sparkles,
  X,
} from "lucide-react";

import type {
  KnowledgeDocument,
} from "../../../types/knowledge";

interface KnowledgeDetailsProps {
  document: KnowledgeDocument | null;
  onClose: () => void;
}

export function KnowledgeDetails({
  document,
  onClose,
}: KnowledgeDetailsProps) {
  if (!document) {
    return null;
  }

  const isIndexed =
    document.status === "indexed";

  return (
    <div
      className="knowledge-details-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="knowledge-details-title"
      onClick={onClose}
    >
      <aside
        className="knowledge-details"
        onClick={(event) =>
          event.stopPropagation()
        }
      >
        {/* HEADER */}
        <header className="knowledge-details__header">
          <div className="knowledge-details__header-main">
            <div className="knowledge-details__file-icon">
              {getFileIcon(document.type)}
            </div>

            <div className="knowledge-details__title-block">
              <span className="knowledge-details__eyebrow">
                KNOWLEDGE SOURCE
              </span>

              <h2 id="knowledge-details-title">
                {document.name}
              </h2>

              <span className="knowledge-details__file-meta">
                {document.type} · {document.size}
              </span>
            </div>
          </div>

          <button
            type="button"
            className="knowledge-details__close"
            onClick={onClose}
            aria-label="Close document details"
            title="Close"
          >
            <X size={16} />
          </button>
        </header>

        {/* STATUS */}
        <section className="knowledge-details__status">
          <div>
            <span className="knowledge-details__section-label">
              CURRENT STATUS
            </span>

            <div className="knowledge-details__status-main">
              <span
                className={`knowledge-details__status-dot knowledge-details__status-dot--${document.status}`}
              />

              <strong>
                {getStatusLabel(
                  document.status,
                )}
              </strong>
            </div>
          </div>

          <div className="knowledge-details__progress-value">
            <strong>
              {document.processingProgress}%
            </strong>

            <span>PIPELINE</span>
          </div>
        </section>

        {/* DOCUMENT METADATA */}
        <section className="knowledge-details__section">
          <div className="knowledge-details__section-heading">
            <div>
              <span className="knowledge-details__section-label">
                DOCUMENT METADATA
              </span>

              <h3>Source Information</h3>
            </div>

            <FileText size={16} />
          </div>

          <div className="knowledge-details__metadata-grid">
            <MetadataItem
              label="FILE TYPE"
              value={document.type}
            />

            <MetadataItem
              label="FILE SIZE"
              value={document.size}
            />

            <MetadataItem
              label="CHUNKS"
              value={
                document.chunks !== null
                  ? document.chunks.toLocaleString()
                  : "—"
              }
            />

            <MetadataItem
              label="INDEX STATUS"
              value={getIndexStatusLabel(
                document.indexStatus,
              )}
            />

            <MetadataItem
              label="UPLOADED"
              value={document.uploadedAt}
            />

            <MetadataItem
              label="UPDATED"
              value={document.updatedAt}
            />
          </div>
        </section>

        {/* PROCESSING PIPELINE */}
        <section className="knowledge-details__section">
          <div className="knowledge-details__section-heading">
            <div>
              <span className="knowledge-details__section-label">
                INGESTION PIPELINE
              </span>

              <h3>
                Knowledge Processing
              </h3>
            </div>

            <Database size={16} />
          </div>

          <div className="knowledge-details__pipeline">
            <PipelineStep
              icon={<FileText size={14} />}
              label="Document Received"
              completed={true}
            />

            <PipelineConnector
              completed={true}
            />

            <PipelineStep
              icon={<ScanText size={14} />}
              label="Content Extraction"
              completed={
                document.extractedText
              }
            />

            <PipelineConnector
              completed={
                document.extractedText
              }
            />

            <PipelineStep
              icon={<Layers3 size={14} />}
              label="Chunking"
              completed={
                document.chunks !== null
              }
            />

            <PipelineConnector
              completed={
                document.chunks !== null
              }
            />

            <PipelineStep
              icon={<Sparkles size={14} />}
              label="Embeddings"
              completed={
                document.embedded
              }
            />

            <PipelineConnector
              completed={
                document.embedded
              }
            />

            <PipelineStep
              icon={<Database size={14} />}
              label="Vector Index"
              completed={
                document.vectorIndexed
              }
            />
          </div>
        </section>

        {/* RAG READINESS */}
        <section className="knowledge-details__section">
          <div className="knowledge-details__section-heading">
            <div>
              <span className="knowledge-details__section-label">
                RAG READINESS
              </span>

              <h3>
                Retrieval Availability
              </h3>
            </div>

            <Sparkles size={16} />
          </div>

          <div className="knowledge-details__readiness">
            <ReadinessItem
              label="Extracted Text"
              ready={
                document.extractedText
              }
            />

            <ReadinessItem
              label="Knowledge Chunks"
              ready={
                document.chunks !== null
              }
            />

            <ReadinessItem
              label="Vector Embeddings"
              ready={
                document.embedded
              }
            />

            <ReadinessItem
              label="Vector Index"
              ready={
                document.vectorIndexed
              }
            />
          </div>
        </section>

        {/* DESCRIPTION */}
        <section className="knowledge-details__section">
          <div className="knowledge-details__section-heading">
            <div>
              <span className="knowledge-details__section-label">
                DESCRIPTION
              </span>

              <h3>Source Context</h3>
            </div>
          </div>

          <p className="knowledge-details__description">
            {document.description}
          </p>
        </section>

        {/* STORAGE PATH */}
        <section className="knowledge-details__storage">
          <div>
            <span>
              STORAGE PATH
            </span>

            <strong>
              {document.storagePath}
            </strong>
          </div>

          <button
            type="button"
            onClick={() =>
              copyStoragePath(
                document.storagePath,
              )
            }
            aria-label="Copy storage path"
            title="Copy storage path"
          >
            <Clipboard size={13} />
          </button>
        </section>

        {/* FOOTER */}
        <footer className="knowledge-details__footer">
          <div>
            <span>RAG ACCESS</span>

            <strong
              className={
                isIndexed
                  ? "knowledge-details__rag-ready"
                  : ""
              }
            >
              {isIndexed
                ? "AVAILABLE"
                : "NOT AVAILABLE"}
            </strong>
          </div>

          <button
            type="button"
            className="knowledge-details__footer-close"
            onClick={onClose}
          >
            Close
          </button>
        </footer>
      </aside>
    </div>
  );
}

function MetadataItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="knowledge-details__metadata-item">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function PipelineStep({
  icon,
  label,
  completed,
}: {
  icon: React.ReactNode;
  label: string;
  completed: boolean;
}) {
  return (
    <div
      className={`knowledge-details__pipeline-step ${
        completed
          ? "knowledge-details__pipeline-step--completed"
          : ""
      }`}
    >
      <div className="knowledge-details__pipeline-icon">
        {completed ? (
          <Check size={13} />
        ) : (
          icon
        )}
      </div>

      <span>{label}</span>
    </div>
  );
}

function PipelineConnector({
  completed,
}: {
  completed: boolean;
}) {
  return (
    <div
      className={`knowledge-details__pipeline-connector ${
        completed
          ? "knowledge-details__pipeline-connector--completed"
          : ""
      }`}
    />
  );
}

function ReadinessItem({
  label,
  ready,
}: {
  label: string;
  ready: boolean;
}) {
  return (
    <div className="knowledge-details__readiness-item">
      <span>{label}</span>

      <strong
        className={
          ready
            ? "knowledge-details__ready"
            : "knowledge-details__pending"
        }
      >
        {ready ? "READY" : "PENDING"}
      </strong>
    </div>
  );
}

function getFileIcon(
  type: KnowledgeDocument["type"],
) {
  switch (type) {
    case "PDF":
      return <FileArchive size={19} />;

    case "DOCX":
      return <FileText size={19} />;

    case "XLSX":
    case "CSV":
      return (
        <FileSpreadsheet size={19} />
      );

    case "PPTX":
      return <FileType2 size={19} />;

    case "TXT":
    default:
      return <FileText size={19} />;
  }
}

function getStatusLabel(
  status: KnowledgeDocument["status"],
) {
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

    case "failed":
      return "FAILED";

    case "pending":
      return "PENDING";

    default:
      return "PROCESSING";
  }
}

function getIndexStatusLabel(
  status: KnowledgeDocument["indexStatus"],
) {
  switch (status) {
    case "indexed":
      return "Indexed";

    case "indexing":
      return "Indexing";

    case "not-indexed":
      return "Not Indexed";

    case "failed":
      return "Failed";

    default:
      return "Unknown";
  }
}

async function copyStoragePath(
  value: string,
) {
  try {
    await navigator.clipboard.writeText(
      value,
    );
  } catch {
    // Clipboard access may be unavailable
    // in some browser contexts.
  }
}