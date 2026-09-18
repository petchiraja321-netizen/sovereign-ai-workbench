export type NotificationType =
  | "TASK"
  | "APPROVAL"
  | "SECURITY"
  | "DELIVERABLE"
  | "AGENT"
  | "SYSTEM";

export type NotificationSeverity =
  | "INFO"
  | "SUCCESS"
  | "WARNING"
  | "ERROR";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  severity: NotificationSeverity;
  resourceType?: string;
  resourceId?: string;
  actionLabel?: string;
}

export interface SystemEvent {
  id: string;
  timestamp: string;
  source: string;
  message: string;
  severity: NotificationSeverity;
  resourceType?: string;
  resourceId?: string;
}

export interface NotificationStats {
  total: number;
  unread: number;
  alerts: number;
  systemEvents: number;
}

export interface NotificationFilters {
  search: string;
  type: NotificationType | "ALL";
  severity: NotificationSeverity | "ALL";
  status: "ALL" | "READ" | "UNREAD";
}

export interface NotificationDecision {
  read: boolean;
}