import {
  ArrowUp,
  Check,
  ChevronDown,
  FileCheck2,
  Paperclip,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useRef, useState } from "react";
import type { ChangeEvent, DragEvent } from "react";
import { FileDropzone } from "./FileDropzone";

type TaskType =
  | "Analyse"
  | "Summarise"
  | "Extract"
  | "Generate";

interface TaskComposerProps {
  onExecute: (
    taskType: string,
    task: string,
    filesCount: number,
  ) => void;
}

const taskTypes: TaskType[] = [
  "Analyse",
  "Summarise",
  "Extract",
  "Generate",
];

export function TaskComposer({
  onExecute,
}: TaskComposerProps) {
  const [task, setTask] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [taskType, setTaskType] =
    useState<TaskType>("Analyse");

  const [showTaskTypes, setShowTaskTypes] =
    useState(false);

  const [evidenceRequired, setEvidenceRequired] =
    useState(true);

  const fileInputRef =
    useRef<HTMLInputElement>(null);

  const handleFiles = (newFiles: File[]) => {
    const existingKeys = new Set(
      files.map(
        (file) =>
          `${file.name}-${file.size}-${file.lastModified}`,
      ),
    );

    const uniqueFiles = newFiles.filter((file) => {
      const key = `${file.name}-${file.size}-${file.lastModified}`;

      return !existingKeys.has(key);
    });

    setFiles((current) => [
      ...current,
      ...uniqueFiles,
    ]);
  };

  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    handleFiles(
      Array.from(event.target.files ?? []),
    );

    event.target.value = "";
  };

  const handleDrop = (
    event: DragEvent<HTMLDivElement>,
  ) => {
    event.preventDefault();

    if (event.dataTransfer.files.length > 0) {
      handleFiles(
        Array.from(event.dataTransfer.files),
      );
    }
  };

  const handleSubmit = () => {
    if (!task.trim() && files.length === 0) {
      return;
    }

    onExecute(
      taskType,
      task,
      files.length,
    );
  };

  const canSubmit =
    task.trim().length > 0 ||
    files.length > 0;

  return (
    <div className="task-composer">
      <div className="task-composer__header">
        <div>
          <div className="task-composer__title">
            <Sparkles size={15} />
            New AI Task
          </div>

          <p className="task-composer__subtitle">
            Define an objective and provide the knowledge
            Sovereign AI should work with.
          </p>
        </div>

        <div className="task-composer__mode">
          <span className="task-composer__mode-dot" />
          LOCAL AI
        </div>
      </div>

      <div className="task-composer__body">
        <div className="task-composer__task-type-row">
          <span className="task-composer__label">
            Task type
          </span>

          <div className="task-type-selector">
            <button
              type="button"
              className="task-type-selector__button"
              onClick={() =>
                setShowTaskTypes(
                  (value) => !value,
                )
              }
            >
              <span>{taskType}</span>
              <ChevronDown size={14} />
            </button>

            {showTaskTypes && (
              <div className="task-type-selector__menu">
                {taskTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    className={`task-type-selector__item ${
                      type === taskType
                        ? "task-type-selector__item--active"
                        : ""
                    }`}
                    onClick={() => {
                      setTaskType(type);
                      setShowTaskTypes(false);
                    }}
                  >
                    <span>{type}</span>

                    {type === taskType && (
                      <Check size={14} />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="task-composer__input-wrapper">
          <textarea
            value={task}
            onChange={(event) =>
              setTask(event.target.value)
            }
            className="task-composer__textarea"
            placeholder="Describe what you want Sovereign AI to do..."
            rows={7}
            maxLength={4000}
          />

          <div className="task-composer__textarea-meta">
            <span>
              {task.length.toLocaleString()} / 4,000
            </span>

            <span>
              Be specific about the expected outcome.
            </span>
          </div>
        </div>

        <div
          className="task-composer__upload-zone"
          onDragOver={(event) =>
            event.preventDefault()
          }
          onDrop={handleDrop}
        >
          <div className="task-composer__upload-content">
            <div className="task-composer__upload-icon">
              <Paperclip size={18} />
            </div>

            <div>
              <p className="task-composer__upload-title">
                Add knowledge files
              </p>

              <p className="task-composer__upload-description">
                Drag and drop files here, or browse from
                your device
              </p>

              <p className="task-composer__upload-formats">
                PDF · DOCX · XLSX · CSV · PNG · JPG
              </p>
            </div>
          </div>

          <button
            type="button"
            className="task-composer__browse"
            onClick={() =>
              fileInputRef.current?.click()
            }
          >
            Browse files
          </button>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.png,.jpg,.jpeg"
            onChange={handleFileChange}
            hidden
          />
        </div>

        {files.length > 0 && (
          <div className="task-composer__attached">
            <div className="task-composer__attached-header">
              <div>
                <span className="task-composer__attached-title">
                  Attached files
                </span>

                <span className="task-composer__attached-count">
                  {files.length}
                </span>
              </div>

              <button
                type="button"
                className="task-composer__clear"
                onClick={() => setFiles([])}
              >
                Clear all
              </button>
            </div>

            <FileDropzone
              files={files}
              onFilesChange={setFiles}
            />
          </div>
        )}

        <div className="task-composer__options">
          <button
            type="button"
            className={`task-option ${
              evidenceRequired
                ? "task-option--active"
                : ""
            }`}
            onClick={() =>
              setEvidenceRequired(
                (value) => !value,
              )
            }
          >
            <div className="task-option__icon">
              <FileCheck2 size={14} />
            </div>

            <div className="task-option__content">
              <span className="task-option__title">
                Evidence verification
              </span>

              <span className="task-option__description">
                Require supporting sources for the response
              </span>
            </div>

            <span className="task-option__check">
              {evidenceRequired && (
                <Check size={12} />
              )}
            </span>
          </button>

          <div className="task-option task-option--readonly">
            <div className="task-option__icon">
              <ShieldCheck size={14} />
            </div>

            <div className="task-option__content">
              <span className="task-option__title">
                Sovereign execution
              </span>

              <span className="task-option__description">
                Processing stays within the local boundary
              </span>
            </div>

            <span className="task-option__status">
              Active
            </span>
          </div>
        </div>
      </div>

      <div className="task-composer__footer">
        <div className="task-composer__footer-info">
          <span className="task-composer__secure-dot" />
          Ready for secure execution
        </div>

        <button
          type="button"
          className="task-composer__submit"
          onClick={handleSubmit}
          disabled={!canSubmit}
        >
          Run Sovereign AI
          <ArrowUp size={15} />
        </button>
      </div>
    </div>
  );
}