import { useEffect } from "react";
import {
  BrainCircuit,
  CheckCircle2,
  Clock3,
  Cpu,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { AgentStage } from "./AgentStage";
import { useAgentExecution } from "../../hooks/useAgentExecution";

export interface AgentExecutionPanelProps {
  taskType: string;
  task: string;
  filesCount: number;
  onComplete?: () => void;
}

function formatElapsedTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds,
  ).padStart(2, "0")}`;
}

export function AgentExecutionPanel({
  taskType,
  task,
  filesCount,
  onComplete,
}: AgentExecutionPanelProps) {
  const {
    status,
    stages,
    progress,
    elapsedSeconds,
    retrievedDocuments,
    evidenceCount,
    activity,
    startExecution,
  } = useAgentExecution();

  useEffect(() => {
    startExecution();
  }, [startExecution]);

  const completedStages = stages.filter(
    (stage) =>
      stage.status === "completed" ||
      stage.status === "skipped",
  ).length;

  const currentStageNumber =
    status === "completed"
      ? stages.length
      : Math.min(
          completedStages + 1,
          stages.length,
        );

  return (
    <div className="agent-execution">
      {/* HEADER */}
      <div className="agent-execution__header">
        <div>
          <div className="agent-execution__eyebrow">
            <Sparkles size={13} />
            SOVEREIGN AGENT
          </div>

          <h2 className="agent-execution__title">
            Agent Execution
          </h2>

          <p className="agent-execution__description">
            {status === "completed"
              ? "Your task has completed the sovereign AI execution pipeline."
              : "Your task is being processed through the sovereign AI execution pipeline."}
          </p>
        </div>

        <div
          className={`agent-execution__status agent-execution__status--${status}`}
        >
          <span className="agent-execution__status-dot" />

          {status === "completed"
            ? "COMPLETED"
            : "PROCESSING"}
        </div>
      </div>

      {/* OVERALL PROGRESS */}
      <div className="agent-execution__progress">
        <div className="agent-execution__progress-header">
          <span>EXECUTION PROGRESS</span>
          <strong>{progress}%</strong>
        </div>

        <div className="agent-execution__progress-track">
          <div
            className="agent-execution__progress-bar"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </div>

      {/* SUMMARY */}
      <div className="agent-execution__summary">
        <div className="agent-execution__summary-item">
          <BrainCircuit size={15} />

          <div>
            <span>Task</span>
            <strong>{taskType}</strong>
          </div>
        </div>

        <div className="agent-execution__summary-item">
          <Cpu size={15} />

          <div>
            <span>Execution</span>
            <strong>Local AI</strong>
          </div>
        </div>

        <div className="agent-execution__summary-item">
          <Clock3 size={15} />

          <div>
            <span>Elapsed</span>

            <strong>
              {formatElapsedTime(elapsedSeconds)}
            </strong>
          </div>
        </div>

        <div className="agent-execution__summary-item">
          <ShieldCheck size={15} />

          <div>
            <span>Files</span>
            <strong>{filesCount}</strong>
          </div>
        </div>
      </div>

      {/* EXECUTION METRICS */}
<div className="agent-execution__metrics">
  <div>
    <span>RETRIEVED</span>
    <strong>{retrievedDocuments}</strong>
  </div>

  <div>
    <span>EVIDENCE</span>
    <strong>{evidenceCount}</strong>
  </div>

  <div>
    <span>MODEL</span>
    <strong>Qwen 3 8B</strong>
  </div>

  <div>
    <span>STATUS</span>
    <strong>
      {status === "completed"
        ? "COMPLETE"
        : "ACTIVE"}
    </strong>
  </div>
</div>

      {/* OBJECTIVE */}
      <div className="agent-execution__task">
        <span className="agent-execution__task-label">
          OBJECTIVE
        </span>

        <p>
          {task.trim() ||
            "Processing the supplied knowledge files and generating a verified result."}
        </p>
      </div>

      {/* LIVE ACTIVITY */}
      <div className="agent-execution__activity">
        <div className="agent-execution__activity-icon">
          {status === "completed" ? (
            <CheckCircle2 size={16} />
          ) : (
            <Sparkles size={16} />
          )}
        </div>

        <div>
          <span className="agent-execution__activity-label">
            LIVE AGENT ACTIVITY
          </span>

          <p>{activity}</p>
        </div>
      </div>

      {/* EXECUTION PIPELINE */}
      <div className="agent-execution__pipeline">
        {/* PIPELINE PROGRESS */}
        <div className="agent-execution__progress">
          <div className="agent-execution__progress-track">
            <div
              className="agent-execution__progress-fill"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>

          <div className="agent-execution__progress-meta">
            <span>{activity}</span>

            <strong>{progress}%</strong>
          </div>
        </div>

        {/* PIPELINE HEADER */}
        <div className="agent-execution__pipeline-header">
          <span>EXECUTION PIPELINE</span>

          <span>
            {currentStageNumber} / {stages.length}
          </span>
        </div>

        {/* STAGES */}
        <div className="agent-execution__stages">
          {stages.map((stage, index) => (
            <AgentStage
              key={stage.title}
              title={stage.title}
              description={stage.description}
              status={stage.status}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div className="agent-execution__footer">
        <div>
          <span className="agent-execution__footer-dot" />

          {status === "completed"
            ? "Sovereign execution completed"
            : "Local processing boundary active"}
        </div>

        {status === "completed" && (
  <button
    type="button"
    onClick={onComplete}
    className="agent-execution__demo-button"
  >
    Return to AI Studio
  </button>
)}
      </div>
    </div>
  );
}