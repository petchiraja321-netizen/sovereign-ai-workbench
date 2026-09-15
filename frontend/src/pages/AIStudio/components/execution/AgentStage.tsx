import {
  Check,
  Circle,
  LoaderCircle,
  Minus,
  ShieldCheck,
} from "lucide-react";

export type AgentStageStatus =
  | "pending"
  | "running"
  | "completed"
  | "skipped";

interface AgentStageProps {
  title: string;
  description: string;
  status: AgentStageStatus;
  index: number;
}

export function AgentStage({
  title,
  description,
  status,
  index,
}: AgentStageProps) {
  return (
    <div
      className={`agent-stage agent-stage--${status}`}
    >
      <div className="agent-stage__timeline">
        <div className="agent-stage__icon">
          {status === "completed" && (
            <Check size={13} />
          )}

          {status === "running" && (
            <LoaderCircle
              size={14}
              className="agent-stage__spinner"
            />
          )}

          {status === "pending" && (
            <Circle size={9} />
          )}

          {status === "skipped" && (
            <Minus size={13} />
          )}
        </div>

        {index < 7 && (
          <div className="agent-stage__line" />
        )}
      </div>

      <div className="agent-stage__content">
        <div className="agent-stage__top">
          <div>
            <p className="agent-stage__title">
              {title}
            </p>

            <p className="agent-stage__description">
              {description}
            </p>
          </div>

          <span className="agent-stage__status">
            {status === "completed" && "COMPLETED"}
            {status === "running" && "RUNNING"}
            {status === "pending" && "QUEUED"}
            {status === "skipped" && "SKIPPED"}
          </span>
        </div>

        {status === "running" && (
          <div className="agent-stage__activity">
            <ShieldCheck size={11} />
            Sovereign execution boundary active
          </div>
        )}
      </div>
    </div>
  );
}