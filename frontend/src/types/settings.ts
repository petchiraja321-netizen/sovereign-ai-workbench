export type SettingsSection =
  | "account"
  | "ai"
  | "security"
  | "notifications"
  | "workspace"
  | "privacy"
  | "system";

export interface AccountSettings {
  displayName: string;
  role: string;
  workspace: string;
  sessionStatus: "Active" | "Inactive";
}

export interface AISettings {
  defaultModel: string;
  reasoningMode: string;
  responseDetail: string;
  evidenceRequired: boolean;
  humanApprovalRequired: boolean;
  autoRetry: boolean;
  streamingResponse: boolean;
  localModelPreferred: boolean;
  externalModelFallback: boolean;
  toolExecution: boolean;
}

export interface SecuritySettings {
  fileValidation: boolean;
  networkMonitoring: boolean;
  externalRequests: string;
  auditLogging: boolean;
  sessionTimeout: string;
  requireApproval: string;
}

export interface NotificationSettings {
  taskCompleted: boolean;
  taskFailed: boolean;
  approvalRequired: boolean;
  securityAlert: boolean;
  deliverableReady: boolean;
  systemEvents: boolean;
}

export interface WorkspaceSettings {
  defaultLandingPage: string;
  defaultTaskView: string;
  defaultDeliverableView: string;
  autoRefresh: boolean;
  refreshInterval: string;
}

export interface PrivacySettings {
  dataRetention: string;
  telemetry: string;
  localProcessing: string;
  externalDataTransfer: string;
}

export interface SystemInfo {
  workbenchVersion: string;
  frontend: string;
  backend: string;
  aiRuntime: string;
  rag: string;
  vectorStore: string;
  environment: string;
}

export interface SettingsData {
  account: AccountSettings;
  ai: AISettings;
  security: SecuritySettings;
  notifications: NotificationSettings;
  workspace: WorkspaceSettings;
  privacy: PrivacySettings;
  system: SystemInfo;
}