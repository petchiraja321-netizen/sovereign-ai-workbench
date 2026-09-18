import {
  Download,
  Eye,
  FileCog,
  MoreHorizontal,
  Play,
  RefreshCw,
  Trash2,
  XCircle,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import type { KnowledgeDocument } from "../../../types/knowledge";

interface KnowledgeRowActionsProps {
  document: KnowledgeDocument;
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

export function KnowledgeRowActions({
  document,
  onView,
  onProcess,
  onReindex,
  onDownload,
  onRemove,
}: KnowledgeRowActionsProps) {
  const [open, setOpen] = useState(false);

  const menuRef =
    useRef<HTMLDivElement | null>(null);

  /*
   * Close the action menu when the user
   * clicks outside the menu.
   */
  useEffect(() => {
    if (!open) {
      return;
    }

    const handleOutsideClick = (
      event: MouseEvent,
    ) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(
          event.target as Node,
        )
      ) {
        setOpen(false);
      }
    };

    globalThis.document.addEventListener(
      "mousedown",
      handleOutsideClick,
    );

    return () => {
      globalThis.document.removeEventListener(
        "mousedown",
        handleOutsideClick,
      );
    };
  }, [open]);

  const closeMenu = () => {
    setOpen(false);
  };

  const handleView = () => {
    closeMenu();
    onView?.(document);
  };

  const handleProcess = () => {
    closeMenu();
    onProcess?.(document);
  };

  const handleReindex = () => {
    closeMenu();
    onReindex?.(document);
  };

  const handleDownload = () => {
    closeMenu();
    onDownload?.(document);
  };

  const handleRemove = () => {
    closeMenu();
    onRemove?.(document);
  };

  const isIndexed =
    document.status === "indexed";

  const isProcessing =
    document.status === "processing" ||
    document.status === "extracting" ||
    document.status === "chunking" ||
    document.status === "embedding";

  const isFailed =
    document.status === "failed";

  const isPending =
    document.status === "pending";

  return (
    <div
      ref={menuRef}
      className="knowledge-row-actions"
    >
      {/* ======================================
          ACTION TRIGGER
          ====================================== */}

      <button
        type="button"
        className="knowledge-row-actions__trigger"
        onClick={(event) => {
          event.stopPropagation();
          setOpen((current) => !current);
        }}
        aria-label={`Actions for ${document.name}`}
        aria-expanded={open}
        title="Document actions"
      >
        <MoreHorizontal size={16} />
      </button>

      {/* ======================================
          ACTION MENU
          ====================================== */}

      {open && (
        <div
          className="knowledge-row-actions__menu"
          role="menu"
          onClick={(event) =>
            event.stopPropagation()
          }
        >
          {/* VIEW DETAILS */}

          <button
            type="button"
            className="knowledge-row-actions__item"
            onClick={handleView}
            role="menuitem"
          >
            <Eye size={14} />
            <span>View Details</span>
          </button>

          {/* START / RETRY PROCESSING */}

          {(isPending || isFailed) && (
            <button
              type="button"
              className="knowledge-row-actions__item"
              onClick={handleProcess}
              role="menuitem"
            >
              {isFailed ? (
                <RefreshCw size={14} />
              ) : (
                <Play size={14} />
              )}

              <span>
                {isFailed
                  ? "Retry Processing"
                  : "Start Processing"}
              </span>
            </button>
          )}

          {/* PROCESSING VIEW */}

          {isProcessing && (
            <button
              type="button"
              className="knowledge-row-actions__item"
              onClick={handleProcess}
              role="menuitem"
            >
              <FileCog size={14} />

              <span>
                View Processing
              </span>
            </button>
          )}

          {/* RE-INDEX */}

          {isIndexed && (
            <button
              type="button"
              className="knowledge-row-actions__item"
              onClick={handleReindex}
              role="menuitem"
            >
              <RefreshCw size={14} />

              <span>
                Re-index Document
              </span>
            </button>
          )}

          {/* CANCEL PROCESSING */}

          {isProcessing && (
            <button
              type="button"
              className="knowledge-row-actions__item"
              onClick={handleProcess}
              role="menuitem"
            >
              <XCircle size={14} />

              <span>
                Cancel Processing
              </span>
            </button>
          )}

          <div className="knowledge-row-actions__divider" />

          {/* DOWNLOAD */}

          <button
            type="button"
            className="knowledge-row-actions__item"
            onClick={handleDownload}
            role="menuitem"
          >
            <Download size={14} />

            <span>Download</span>
          </button>

          {/* REMOVE */}

          <button
            type="button"
            className="knowledge-row-actions__item knowledge-row-actions__item--danger"
            onClick={handleRemove}
            role="menuitem"
          >
            <Trash2 size={14} />

            <span>
              Remove Document
            </span>
          </button>
        </div>
      )}
    </div>
  );
}