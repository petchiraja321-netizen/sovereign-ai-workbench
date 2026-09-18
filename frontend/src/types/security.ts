export type SecurityEventStatus =
  | "allowed"
  | "blocked"
  | "monitored"
  | "warning";

export type SecuritySeverity =
  | "low"
  | "medium"
  | "high"
  | "critical";

export type SecuritySource =
  | "Knowledge Base"
  | "AI Agent"
  | "Tool Runtime"
  | "Network"
  | "System";

export type SecurityEvent = {
  id: string;
  title: string;
  description: string;
  source: SecuritySource;
  status: SecurityEventStatus;
  severity: SecuritySeverity;
  timestamp: string;
  details: string[];
};

export type SecurityOverview = {
  systemStatus: "secure" | "warning" | "critical";
  policyStatus: "active" | "inactive";
  fileValidation: boolean;
  networkMonitoring: boolean;
  auditLogging: boolean;
  securityScore: number;
};

export type NetworkActivityItem = {
  id: string;
  name: string;
  category: "local" | "external";
  status: "active" | "monitored" | "blocked";
  description: string;
};

export type FileSecurityItem = {
  id: string;
  name: string;
  type: string;
  size: string;
  hash: string;
  validation: "passed" | "failed" | "pending";
  trust: "internal" | "external" | "unknown";
  status: SecurityEventStatus;
};