import {
  AlertTriangle,
  Check,
  Circle,
  LoaderCircle,
  X,
} from "lucide-react";

import type { TaskStatus as TaskStatusType } from "../../../types/task";

interface TaskStatusProps {
  status: TaskStatusType;
}

const statusConfig: Record<
  TaskStatusType,
  {
    label: string;
    className: string;
  }
> = {
  created: {
    label: "CREATED",
    className: "task-status--created",
  },
  queued: {
    label: "QUEUED",
    className: "task-status--queued",
  },
  running: {
    label: "RUNNING",
    className: "task-status--running",
  },
  verifying: {
    label: "VERIFYING",
    className: "task-status--verifying",
  },
  completed: {
    label: "COMPLETED",
    className: "task-status--completed",
  },
  failed: {
    label: "FAILED",
    className: "task-status--failed",
  },
  approval: {
    label: "APPROVAL REQUIRED",
    className: "task-status--approval",
  },
  approved: {
    label: "APPROVED",
    className: "task-status--approved",
  },
};

export function TaskStatus({
  status,
}: TaskStatusProps) {
  const config = statusConfig[status];

  const icon =
    status === "running" ? (
      <LoaderCircle size={13} />
    ) : status === "completed" ||
      status === "approved" ? (
      <Check size={13} />
    ) : status === "failed" ? (
      <X size={13} />
    ) : status === "approval" ? (
      <AlertTriangle size={13} />
    ) : status === "queued" ? (
      <Circle size={10} />
    ) : (
      <Circle size={10} />
    );

  return (
    <span
      className={`task-status ${config.className}`}
    >
      {icon}
      <span>{config.label}</span>
    </span>
  );
}