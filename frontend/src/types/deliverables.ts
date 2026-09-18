export type DeliverableType =
  | "PDF"
  | "DOCX"
  | "XLSX"
  | "PPTX"
  | "JSON";

export type DeliverableStatus =
  | "READY"
  | "PROCESSING"
  | "FAILED"
  | "ARCHIVED";

export interface Deliverable {
  id: string;
  name: string;
  type: DeliverableType;
  status: DeliverableStatus;
  createdAt: string;
  updatedAt: string;
  size: string;
  taskId: string;
  taskName: string;
  evidenceCount: number;
  auditId: string;
  description: string;
  generatedBy: string;
  version: string;
}

export interface DeliverableStats {
  total: number;
  ready: number;
  processing: number;
  failed: number;
  archived: number;
}