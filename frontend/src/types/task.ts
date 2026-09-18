export type TaskStatus =
  | "created"
  | "queued"
  | "running"
  | "verifying"
  | "completed"
  | "failed"
  | "approval"
  | "approved";

export type TaskType =
  | "analysis"
  | "research"
  | "document"
  | "extraction"
  | "report";

export type TaskSort =
  | "newest"
  | "oldest"
  | "updated"
  | "status";

export interface TaskInputFile {
  id: string;
  name: string;
  size?: string;
}

export interface TaskProgressStep {
  id: string;
  label: string;
  status: "completed" | "running" | "pending";
}

export interface Task {
  id: string;
  title: string;
  type: TaskType;
  typeLabel: string;
  status: TaskStatus;
  model: string;
  createdAt: string;
  updatedAt: string;
  duration: string;
  inputCount: number;
  files: TaskInputFile[];
  progress: TaskProgressStep[];
  evidenceCount: number;
  deliverables: number;
  approvalRequired: boolean;
  executionBoundary: "local" | "external";
  externalApiCalls: number;
  description: string;
}

export interface TaskStats {
  total: number;
  running: number;
  completed: number;
  pendingApproval: number;
  failed: number;
}

export interface TaskFilterState {
  search: string;
  status: TaskStatus | "all";
  type: TaskType | "all";
  model: string;
  sortBy: TaskSort;
}