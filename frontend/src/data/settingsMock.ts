import type { SettingsData } from "../types/settings";

export const settingsMock: SettingsData = {
  account: {
    displayName: "Workbench User",
    role: "Administrator",
    workspace: "Sovereign AI Workbench",
    sessionStatus: "Active",
  },

  ai: {
    defaultModel: "Configured Local Model",
    reasoningMode: "Balanced",
    responseDetail: "Standard",
    evidenceRequired: true,
    humanApprovalRequired: true,
    autoRetry: true,
    streamingResponse: true,
    localModelPreferred: true,
    externalModelFallback: false,
    toolExecution: true,
  },

  security: {
    fileValidation: true,
    networkMonitoring: true,
    externalRequests: "Monitored",
    auditLogging: true,
    sessionTimeout: "30 minutes",
    requireApproval: "Sensitive Operations",
  },

  notifications: {
    taskCompleted: true,
    taskFailed: true,
    approvalRequired: true,
    securityAlert: true,
    deliverableReady: true,
    systemEvents: false,
  },

  workspace: {
    defaultLandingPage: "Dashboard",
    defaultTaskView: "Mission Control",
    defaultDeliverableView: "Table",
    autoRefresh: true,
    refreshInterval: "10 seconds",
  },

  privacy: {
    dataRetention: "Workspace Policy",
    telemetry: "Workspace Policy",
    localProcessing: "Preferred",
    externalDataTransfer: "Controlled by Security Policy",
  },

  system: {
    workbenchVersion: "v1.0.0",
    frontend: "React + TypeScript",
    backend: "Spring Boot",
    aiRuntime: "Configured Agent Runtime",
    rag: "Configured Knowledge Pipeline",
    vectorStore: "Configured Backend Service",
    environment: "Development",
  },
};