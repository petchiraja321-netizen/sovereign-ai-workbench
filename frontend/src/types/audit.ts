export type AuditActorType = "USER" | "SYSTEM" | "AGENT";

export type AuditStatus =
  | "SUCCESS"
  | "WARNING"
  | "FAILED"
  | "PENDING";

export type AuditEventType =
  | "Task"
  | "File"
  | "Security"
  | "Agent"
  | "Model"
  | "RAG"
  | "Evidence"
  | "Approval"
  | "Deliverable"
  | "System";

export interface AuditEvent {
  id: string;
  timestamp: string;
  eventType: AuditEventType;
  action: string;
  actor: string;
  actorType: AuditActorType;
  resourceType: string;
  resourceId: string;
  taskId?: string;
  status: AuditStatus;
  description: string;
  metadata?: Record<string, string>;
}

export interface AuditStats {
  totalEvents: number;
  todayEvents: number;
  securityEvents: number;
  taskEvents: number;
  approvalEvents: number;
}