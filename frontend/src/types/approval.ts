export type ApprovalRisk =
  "LOW" | "MEDIUM" | "HIGH";

export type ApprovalStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED";

export type ApprovalActionType =
  | "Deliverable Generation"
  | "External Request"
  | "Data Export"
  | "Tool Execution"
  | "Sensitive Operation";

export interface ApprovalEvidence {
  id: string;
  sourceName: string;
  section: string;
  confidence: number;
  verified: boolean;
}

export interface ApprovalRequest {
  id: string;
  taskId: string;
  taskTitle: string;
  action: string;
  actionType: ApprovalActionType;
  reason: string;
  risk: ApprovalRisk;
  status: ApprovalStatus;
  requestedAt: string;
  requestedBy: string;
  model?: string;
  evidenceCount: number;
  evidence: ApprovalEvidence[];
  approvedAt?: string;
  rejectedAt?: string;
  decisionBy?: string;
  decisionComment?: string;
  auditEventId?: string;
  decisionAt?: string;
}

export interface ApprovalStats {
  pending: number;
  approved: number;
  rejected: number;
  today: number;
}

export interface ApprovalFilters {
  search: string;
  status: ApprovalStatus | "ALL";
  risk: ApprovalRisk | "ALL";
  actionType: ApprovalActionType | "ALL";
}

export interface ApprovalDecision {
  comment?: string;
}