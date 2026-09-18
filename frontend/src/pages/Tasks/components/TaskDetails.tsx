import {
  Check,
  Clock3,
  ExternalLink,
  FileText,
  X,
} from "lucide-react";

import type { Task } from "../../../types/task";
import { TaskStatus } from "./TaskStatus";

interface TaskDetailsProps {
  task: Task | null;
  onClose: () => void;
}

export function TaskDetails({
  task,
  onClose,
}: TaskDetailsProps) {
  if (!task) {
    return null;
  }

  return (
    <div className="task-details">
      <button
        type="button"
        className="task-details__backdrop"
        onClick={onClose}
        aria-label="Close task details"
      />

      <aside className="task-details__drawer">
        <header className="task-details__header">
          <div>
            <span className="task-details__eyebrow">
              TASK DETAILS
            </span>

            <h2>{task.title}</h2>

            <p>{task.id}</p>
          </div>

          <button
            type="button"
            className="task-details__close"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </header>

        <div className="task-details__content">
          <section className="task-details__status-card">
            <div>
              <span>STATUS</span>
              <TaskStatus
                status={task.status}
              />
            </div>

            <div>
              <span>MODEL</span>
              <strong>{task.model}</strong>
            </div>

            <div>
              <span>DURATION</span>
              <strong>{task.duration}</strong>
            </div>
          </section>

          <section className="task-details__section">
            <div className="task-details__section-title">
              <span>INPUTS</span>
              <FileText size={14} />
            </div>

            <div className="task-details__files">
              {task.files.map((file) => (
                <div
                  key={file.id}
                  className="task-details__file"
                >
                  <FileText size={14} />

                  <div>
                    <strong>
                      {file.name}
                    </strong>

                    {file.size && (
                      <span>
                        {file.size}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="task-details__section">
            <div className="task-details__section-title">
              <span>AGENT PROGRESS</span>
              <Clock3 size={14} />
            </div>

            <div className="task-details__progress">
              {task.progress.map((step) => (
                <div
                  key={step.id}
                  className={`task-progress-step task-progress-step--${step.status}`}
                >
                  <span className="task-progress-step__indicator">
                    {step.status ===
                    "completed" ? (
                      <Check size={11} />
                    ) : (
                      <span />
                    )}
                  </span>

                  <strong>
                    {step.label}
                  </strong>
                </div>
              ))}
            </div>
          </section>

          <section className="task-details__section">
            <div className="task-details__section-title">
              <span>EVIDENCE</span>
            </div>

            <div className="task-details__evidence">
              <strong>
                {task.evidenceCount}
              </strong>

              <span>
                verified sources
              </span>
            </div>
          </section>

          <section className="task-details__section">
            <div className="task-details__section-title">
              <span>EXECUTION BOUNDARY</span>
            </div>

            <div className="task-details__boundary">
              <span className="task-details__boundary-dot" />

              <strong>
                {task.executionBoundary.toUpperCase()}
              </strong>

              <span>
                {task.externalApiCalls} external
                API calls
              </span>
            </div>
          </section>

          <section className="task-details__actions">
            <button type="button">
              View Result
              <ExternalLink size={14} />
            </button>

            <button type="button">
              Deliverables
              <ExternalLink size={14} />
            </button>
          </section>
        </div>
      </aside>
    </div>
  );
}