import { Database, Upload } from "lucide-react";

interface KnowledgeHeaderProps {
  onUpload?: () => void;
}

export function KnowledgeHeader({
  onUpload,
}: KnowledgeHeaderProps) {
  return (
    <header className="knowledge-header">
      <div className="knowledge-header__content">
        <div className="knowledge-header__eyebrow">
          <Database size={13} />
          SOVEREIGN KNOWLEDGE LAYER
        </div>

        <h1 className="knowledge-header__title">
          Knowledge Base
        </h1>

        <p className="knowledge-header__description">
          Enterprise knowledge and trusted source management.
        </p>

        <div className="knowledge-header__pipeline">
          <span>DOCUMENTS</span>
          <span className="knowledge-header__pipeline-arrow">
            →
          </span>

          <span>PROCESSING</span>
          <span className="knowledge-header__pipeline-arrow">
            →
          </span>

          <span>EXTRACTION</span>
          <span className="knowledge-header__pipeline-arrow">
            →
          </span>

          <span>EMBEDDING</span>
          <span className="knowledge-header__pipeline-arrow">
            →
          </span>

          <span>VECTOR INDEX</span>
          <span className="knowledge-header__pipeline-arrow">
            →
          </span>

          <span>RAG</span>
        </div>
      </div>

      <button
        type="button"
        className="knowledge-header__upload-button"
        onClick={onUpload}
      >
        <Upload size={14} />
        Upload Documents
      </button>
    </header>
  );
}