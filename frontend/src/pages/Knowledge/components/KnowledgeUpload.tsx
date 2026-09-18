import {
  CheckCircle2,
  FileArchive,
  FileSpreadsheet,
  FileText,
  FileType2,
  Trash2,
  UploadCloud,
  X,
} from "lucide-react";
import { useRef, useState } from "react";

interface UploadItem {
  id: string;
  file: File;
  progress: number;
  status:
    | "queued"
    | "uploading"
    | "uploaded"
    | "error";
}

interface KnowledgeUploadProps {
  open: boolean;
  onClose: () => void;
}

const MAX_FILE_SIZE = 50 * 1024 * 1024;

const ACCEPTED_EXTENSIONS = [
  ".pdf",
  ".docx",
  ".xlsx",
  ".txt",
  ".csv",
  ".pptx",
];

export function KnowledgeUpload({
  open,
  onClose,
}: KnowledgeUploadProps) {
  const inputRef =
    useRef<HTMLInputElement | null>(null);

  const [uploadItems, setUploadItems] =
    useState<UploadItem[]>([]);

  const [isDragging, setIsDragging] =
    useState(false);

  if (!open) {
    return null;
  }

  const addFiles = (
    files: FileList | File[],
  ) => {
    const incomingFiles = Array.from(files);

    const validFiles =
      incomingFiles.filter((file) => {
        const extension =
          `.${file.name
            .split(".")
            .pop()}`
            .toLowerCase();

        return (
          ACCEPTED_EXTENSIONS.includes(
            extension,
          ) &&
          file.size <= MAX_FILE_SIZE
        );
      });

    const newItems: UploadItem[] =
      validFiles.map((file) => ({
        id: `${file.name}-${file.lastModified}-${Math.random()}`,
        file,
        progress: 0,
        status: "queued",
      }));

    setUploadItems((current) => [
      ...current,
      ...newItems,
    ]);
  };

  const handleFileInput = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files) {
      addFiles(event.target.files);
    }

    event.target.value = "";
  };

  const handleDrop = (
    event: React.DragEvent<HTMLDivElement>,
  ) => {
    event.preventDefault();

    setIsDragging(false);

    if (
      event.dataTransfer.files.length > 0
    ) {
      addFiles(
        event.dataTransfer.files,
      );
    }
  };

  const removeFile = (id: string) => {
    setUploadItems((current) =>
      current.filter(
        (item) => item.id !== id,
      ),
    );
  };

  const clearQueue = () => {
    setUploadItems([]);
  };

  const simulateUpload = () => {
    setUploadItems((current) =>
      current.map((item) => ({
        ...item,
        status: "uploading",
        progress: 5,
      })),
    );

    let progress = 5;

    const interval =
      window.setInterval(() => {
        progress += 19;

        setUploadItems((current) =>
          current.map((item) => ({
            ...item,
            progress: Math.min(
              progress,
              100,
            ),
            status:
              progress >= 100
                ? "uploaded"
                : "uploading",
          })),
        );

        if (progress >= 100) {
          window.clearInterval(
            interval,
          );
        }
      }, 350);
  };

  return (
    <div
      className="knowledge-upload-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="knowledge-upload-title"
    >
      <div className="knowledge-upload">
        {/* HEADER */}

        <div className="knowledge-upload__header">
          <div>
            <span className="knowledge-upload__eyebrow">
              KNOWLEDGE INGESTION
            </span>

            <h2 id="knowledge-upload-title">
              Upload Documents
            </h2>

            <p>
              Add trusted enterprise
              sources to the sovereign
              knowledge layer.
            </p>
          </div>

          <button
            type="button"
            className="knowledge-upload__close"
            onClick={onClose}
            aria-label="Close upload dialog"
          >
            <X size={16} />
          </button>
        </div>

        {/* DROP ZONE */}

        <div
          className={`knowledge-upload__dropzone ${
            isDragging
              ? "knowledge-upload__dropzone--dragging"
              : ""
          }`}
          onDragOver={(event) => {
            event.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() =>
            setIsDragging(false)
          }
          onDrop={handleDrop}
        >
          <div className="knowledge-upload__drop-icon">
            <UploadCloud size={22} />
          </div>

          <strong>
            Drag & drop documents here
          </strong>

          <span>
            or browse files from your
            device
          </span>

          <button
            type="button"
            className="knowledge-upload__browse"
            onClick={() =>
              inputRef.current?.click()
            }
          >
            Browse Documents
          </button>

          <small>
            PDF, DOCX, XLSX, TXT, CSV,
            PPTX · Maximum 50 MB per file
          </small>

          <input
            ref={inputRef}
            type="file"
            hidden
            multiple
            accept={ACCEPTED_EXTENSIONS.join(
              ",",
            )}
            onChange={handleFileInput}
          />
        </div>

        {/* UPLOAD QUEUE */}

        {uploadItems.length > 0 && (
          <section className="knowledge-upload__queue">
            <div className="knowledge-upload__queue-header">
              <div>
                <span>
                  UPLOAD QUEUE
                </span>

                <strong>
                  {uploadItems.length}{" "}
                  {uploadItems.length ===
                  1
                    ? "document"
                    : "documents"}
                </strong>
              </div>

              <button
                type="button"
                onClick={clearQueue}
              >
                Clear all
              </button>
            </div>

            <div className="knowledge-upload__items">
              {uploadItems.map(
                (item) => (
                  <div
                    key={item.id}
                    className="knowledge-upload__item"
                  >
                    <div className="knowledge-upload__file-icon">
                      {getFileIcon(
                        item.file.name,
                      )}
                    </div>

                    <div className="knowledge-upload__file-info">
                      <strong>
                        {item.file.name}
                      </strong>

                      <span>
                        {formatFileSize(
                          item.file.size,
                        )}
                      </span>

                      {item.status !==
                        "queued" && (
                        <div className="knowledge-upload__progress">
                          <div
                            className="knowledge-upload__progress-bar"
                            style={{
                              width: `${item.progress}%`,
                            }}
                          />
                        </div>
                      )}
                    </div>

                    <div className="knowledge-upload__item-status">
                      {item.status ===
                      "uploaded" ? (
                        <CheckCircle2
                          size={15}
                        />
                      ) : (
                        <span>
                          {item.progress}%
                        </span>
                      )}
                    </div>

                    {item.status !==
                      "uploaded" && (
                      <button
                        type="button"
                        className="knowledge-upload__remove"
                        onClick={() =>
                          removeFile(
                            item.id,
                          )
                        }
                        aria-label={`Remove ${item.file.name}`}
                      >
                        <Trash2
                          size={13}
                        />
                      </button>
                    )}
                  </div>
                ),
              )}
            </div>
          </section>
        )}

        {/* FOOTER */}

        <div className="knowledge-upload__footer">
          <button
            type="button"
            className="knowledge-upload__cancel"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            type="button"
            className="knowledge-upload__submit"
            disabled={
              uploadItems.length ===
                0 ||
              uploadItems.every(
                (item) =>
                  item.status ===
                  "uploaded",
              )
            }
            onClick={simulateUpload}
          >
            <UploadCloud size={14} />
            Upload & Process
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================================
   FILE ICON
   ============================================ */

function getFileIcon(
  fileName: string,
) {
  const extension =
    fileName
      .split(".")
      .pop()
      ?.toLowerCase();

  switch (extension) {
    case "xlsx":
    case "csv":
      return (
        <FileSpreadsheet size={18} />
      );

    case "pptx":
      return (
        <FileType2 size={18} />
      );

    case "docx":
      return (
        <FileText size={18} />
      );

    case "pdf":
      return (
        <FileArchive size={18} />
      );

    default:
      return (
        <FileText size={18} />
      );
  }
}

/* ============================================
   FILE SIZE FORMATTER
   ============================================ */

function formatFileSize(
  bytes: number,
): string {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (
    bytes <
    1024 * 1024
  ) {
    return `${(
      bytes / 1024
    ).toFixed(1)} KB`;
  }

  if (
    bytes <
    1024 *
      1024 *
      1024
  ) {
    return `${(
      bytes /
      (1024 * 1024)
    ).toFixed(1)} MB`;
  }

  return `${(
    bytes /
    (1024 *
      1024 *
      1024)
  ).toFixed(1)} GB`;
}