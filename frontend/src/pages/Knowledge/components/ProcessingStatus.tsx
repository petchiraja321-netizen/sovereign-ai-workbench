import {
  Check,
  CircleAlert,
  CircleDot,
  Clock3,
  Database,
  FileSearch,
  FileText,
  Layers3,
  LoaderCircle,
  ScanText,
  Sparkles,
} from "lucide-react";

import type {
  KnowledgeDocument,
  KnowledgeProcessingStage,
} from "../../../types/knowledge";

interface ProcessingStatusProps {
  document: KnowledgeDocument;
  compact?: boolean;
}

export function ProcessingStatus({
  document,
  compact = false,
}: ProcessingStatusProps) {
  const stages = getProcessingStages(document);
  const currentStage = getCurrentStage(stages);

  if (compact) {
    return (
      <div
        className={`processing-status processing-status--compact processing-status--${document.status}`}
      >
        <div className="processing-status__compact-icon">
          {getStatusIcon(document.status)}
        </div>

        <div className="processing-status__compact-content">
          <div className="processing-status__compact-top">
            <span>{getStatusLabel(document.status)}</span>

            {document.status !== "indexed" &&
              document.status !== "failed" && (
                <strong>
                  {document.processingProgress}%
                </strong>
              )}
          </div>

          {document.status !== "indexed" &&
            document.status !== "failed" && (
              <div className="processing-status__progress">
                <div
                  className="processing-status__progress-bar"
                  style={{
                    width: `${document.processingProgress}%`,
                  }}
                />
              </div>
            )}
        </div>
      </div>
    );
  }

  return (
    <section
      className={`processing-status processing-status--${document.status}`}
      aria-label={`Processing status for ${document.name}`}
    >
      {/* HEADER */}
      <div className="processing-status__header">
        <div className="processing-status__header-main">
          <div className="processing-status__icon">
            {getStatusIcon(document.status)}
          </div>

          <div>
            <span className="processing-status__eyebrow">
              KNOWLEDGE PIPELINE
            </span>

            <h3>{getStatusLabel(document.status)}</h3>

            <p>{getStatusDescription(document.status)}</p>
          </div>
        </div>

        <div className="processing-status__percentage">
          <strong>{document.processingProgress}%</strong>
          <span>COMPLETE</span>
        </div>
      </div>

      {/* OVERALL PROGRESS */}
      <div className="processing-status__overall">
        <div className="processing-status__overall-track">
          <div
            className="processing-status__overall-fill"
            style={{
              width: `${document.processingProgress}%`,
            }}
          />
        </div>

        <div className="processing-status__overall-meta">
          <span>
            {currentStage
              ? currentStage.label
              : "Pipeline complete"}
          </span>

          <span>{document.processingProgress}%</span>
        </div>
      </div>

      {/* PIPELINE */}
      <div className="processing-status__pipeline">
        {stages.map((stage, index) => (
          <div
            key={stage.id}
            className="processing-status__stage-wrapper"
          >
            <div
              className={`processing-status__stage processing-status__stage--${stage.status}`}
            >
              <div className="processing-status__stage-icon">
                {getStageIcon(stage.id, stage.status)}
              </div>

              <div className="processing-status__stage-content">
                <span className="processing-status__stage-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <strong>{stage.label}</strong>

                {stage.status === "running" && (
                  <small>{stage.progress}%</small>
                )}

                {stage.status === "completed" && (
                  <small>Complete</small>
                )}

                {stage.status === "pending" && (
                  <small>Waiting</small>
                )}

                {stage.status === "failed" && (
                  <small>Failed</small>
                )}
              </div>
            </div>

            {index < stages.length - 1 && (
              <div
                className={`processing-status__connector processing-status__connector--${stage.status}`}
              />
            )}
          </div>
        ))}
      </div>

      {/* METADATA */}
      <div className="processing-status__metadata">
        <div>
          <span>EXTRACTION</span>
          <strong>
            {document.extractedText ? "READY" : "PENDING"}
          </strong>
        </div>

        <div>
          <span>EMBEDDINGS</span>
          <strong>
            {document.embedded ? "READY" : "PENDING"}
          </strong>
        </div>

        <div>
          <span>VECTOR INDEX</span>
          <strong>
            {document.vectorIndexed ? "READY" : "PENDING"}
          </strong>
        </div>

        <div>
          <span>CHUNKS</span>
          <strong>{document.chunks ?? "—"}</strong>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   PROCESSING STAGES
   ============================================ */

function getProcessingStages(
  document: KnowledgeDocument,
): KnowledgeProcessingStage[] {
  const progress = document.processingProgress;

  if (document.status === "failed") {
    return [
      {
        id: "upload",
        label: "Document Received",
        status: "completed",
        progress: 100,
      },
      {
        id: "processing",
        label: "Processing",
        status: "failed",
        progress,
      },
      {
        id: "extraction",
        label: "Extraction",
        status: "pending",
        progress: 0,
      },
      {
        id: "chunking",
        label: "Chunking",
        status: "pending",
        progress: 0,
      },
      {
        id: "embedding",
        label: "Embedding",
        status: "pending",
        progress: 0,
      },
      {
        id: "vector-index",
        label: "Vector Index",
        status: "pending",
        progress: 0,
      },
    ];
  }

  if (document.status === "indexed") {
    return [
      {
        id: "upload",
        label: "Document Received",
        status: "completed",
        progress: 100,
      },
      {
        id: "processing",
        label: "Processing",
        status: "completed",
        progress: 100,
      },
      {
        id: "extraction",
        label: "Extraction",
        status: "completed",
        progress: 100,
      },
      {
        id: "chunking",
        label: "Chunking",
        status: "completed",
        progress: 100,
      },
      {
        id: "embedding",
        label: "Embedding",
        status: "completed",
        progress: 100,
      },
      {
        id: "vector-index",
        label: "Vector Index",
        status: "completed",
        progress: 100,
      },
    ];
  }

  if (document.status === "embedding") {
    return [
      {
        id: "upload",
        label: "Document Received",
        status: "completed",
        progress: 100,
      },
      {
        id: "processing",
        label: "Processing",
        status: "completed",
        progress: 100,
      },
      {
        id: "extraction",
        label: "Extraction",
        status: "completed",
        progress: 100,
      },
      {
        id: "chunking",
        label: "Chunking",
        status: "completed",
        progress: 100,
      },
      {
        id: "embedding",
        label: "Embedding",
        status: "running",
        progress,
      },
      {
        id: "vector-index",
        label: "Vector Index",
        status: "pending",
        progress: 0,
      },
    ];
  }

  if (document.status === "chunking") {
    return [
      {
        id: "upload",
        label: "Document Received",
        status: "completed",
        progress: 100,
      },
      {
        id: "processing",
        label: "Processing",
        status: "completed",
        progress: 100,
      },
      {
        id: "extraction",
        label: "Extraction",
        status: "completed",
        progress: 100,
      },
      {
        id: "chunking",
        label: "Chunking",
        status: "running",
        progress,
      },
      {
        id: "embedding",
        label: "Embedding",
        status: "pending",
        progress: 0,
      },
      {
        id: "vector-index",
        label: "Vector Index",
        status: "pending",
        progress: 0,
      },
    ];
  }

  if (document.status === "extracting") {
    return [
      {
        id: "upload",
        label: "Document Received",
        status: "completed",
        progress: 100,
      },
      {
        id: "processing",
        label: "Processing",
        status: "completed",
        progress: 100,
      },
      {
        id: "extraction",
        label: "Extraction",
        status: "running",
        progress,
      },
      {
        id: "chunking",
        label: "Chunking",
        status: "pending",
        progress: 0,
      },
      {
        id: "embedding",
        label: "Embedding",
        status: "pending",
        progress: 0,
      },
      {
        id: "vector-index",
        label: "Vector Index",
        status: "pending",
        progress: 0,
      },
    ];
  }

  if (document.status === "processing") {
    return [
      {
        id: "upload",
        label: "Document Received",
        status: "completed",
        progress: 100,
      },
      {
        id: "processing",
        label: "Processing",
        status: "running",
        progress,
      },
      {
        id: "extraction",
        label: "Extraction",
        status: "pending",
        progress: 0,
      },
      {
        id: "chunking",
        label: "Chunking",
        status: "pending",
        progress: 0,
      },
      {
        id: "embedding",
        label: "Embedding",
        status: "pending",
        progress: 0,
      },
      {
        id: "vector-index",
        label: "Vector Index",
        status: "pending",
        progress: 0,
      },
    ];
  }

  return [
    {
      id: "upload",
      label: "Document Received",
      status: "running",
      progress,
    },
    {
      id: "processing",
      label: "Processing",
      status: "pending",
      progress: 0,
    },
    {
      id: "extraction",
      label: "Extraction",
      status: "pending",
      progress: 0,
    },
    {
      id: "chunking",
      label: "Chunking",
      status: "pending",
      progress: 0,
    },
    {
      id: "embedding",
      label: "Embedding",
      status: "pending",
      progress: 0,
    },
    {
      id: "vector-index",
      label: "Vector Index",
      status: "pending",
      progress: 0,
    },
  ];
}

/* ============================================
   CURRENT STAGE
   ============================================ */

function getCurrentStage(
  stages: KnowledgeProcessingStage[],
) {
  return stages.find(
    (stage) => stage.status === "running",
  );
}

/* ============================================
   STATUS LABEL
   ============================================ */

function getStatusLabel(
  status: KnowledgeDocument["status"],
) {
  switch (status) {
    case "indexed":
      return "Knowledge Ready";

    case "processing":
      return "Processing Document";

    case "extracting":
      return "Extracting Content";

    case "chunking":
      return "Creating Chunks";

    case "embedding":
      return "Generating Embeddings";

    case "failed":
      return "Processing Failed";

    case "pending":
      return "Queued for Processing";

    default:
      return "Processing";
  }
}

/* ============================================
   STATUS DESCRIPTION
   ============================================ */

function getStatusDescription(
  status: KnowledgeDocument["status"],
) {
  switch (status) {
    case "indexed":
      return "Document is indexed and available for RAG retrieval.";

    case "processing":
      return "Preparing the document for knowledge extraction.";

    case "extracting":
      return "Extracting structured and searchable content.";

    case "chunking":
      return "Splitting extracted content into retrieval-ready chunks.";

    case "embedding":
      return "Converting knowledge chunks into vector representations.";

    case "failed":
      return "The ingestion pipeline encountered an error.";

    case "pending":
      return "Document is waiting for the ingestion pipeline.";

    default:
      return "Document is being prepared for knowledge retrieval.";
  }
}

/* ============================================
   STATUS ICON
   ============================================ */

function getStatusIcon(
  status: KnowledgeDocument["status"],
) {
  switch (status) {
    case "indexed":
      return <Check size={18} />;

    case "failed":
      return <CircleAlert size={18} />;

    case "pending":
      return <Clock3 size={18} />;

    default:
      return (
        <LoaderCircle
          size={18}
          className="processing-status__spin"
        />
      );
  }
}

/* ============================================
   STAGE ICON
   ============================================ */

function getStageIcon(
  id: string,
  status: KnowledgeProcessingStage["status"],
) {
  if (status === "completed") {
    return <Check size={13} />;
  }

  if (status === "failed") {
    return <CircleAlert size={13} />;
  }

  if (status === "running") {
    return (
      <LoaderCircle
        size={13}
        className="processing-status__spin"
      />
    );
  }

  switch (id) {
    case "upload":
      return <FileSearch size={13} />;

    case "processing":
      return <ScanText size={13} />;

    case "extraction":
      return <FileText size={13} />;

    case "chunking":
      return <Layers3 size={13} />;

    case "embedding":
      return <Sparkles size={13} />;

    case "vector-index":
      return <Database size={13} />;

    default:
      return <CircleDot size={13} />;
  }
}