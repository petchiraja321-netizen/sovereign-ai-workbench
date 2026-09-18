import type {
  Notification,
  NotificationStats,
  SystemEvent,
} from "../types/notification";

export const notificationsMock: Notification[] = [
  {
    id: "NTF-00241",
    type: "APPROVAL",
    title: "Approval Required",
    message:
      "TASK-00482 requires human authorization before deliverable generation.",
    timestamp: "2 min ago",
    read: false,
    severity: "WARNING",
    resourceType: "TASK",
    resourceId: "TASK-00482",
    actionLabel: "Review",
  },
  {
    id: "NTF-00240",
    type: "DELIVERABLE",
    title: "Deliverable Ready",
    message:
      "Risk Assessment Report is ready for review and download.",
    timestamp: "5 min ago",
    read: false,
    severity: "SUCCESS",
    resourceType: "DELIVERABLE",
    resourceId: "DLV-00128",
    actionLabel: "View File",
  },
  {
    id: "NTF-00239",
    type: "TASK",
    title: "Task Completed",
    message:
      "TASK-00479 completed successfully.",
    timestamp: "8 min ago",
    read: true,
    severity: "SUCCESS",
    resourceType: "TASK",
    resourceId: "TASK-00479",
    actionLabel: "View Task",
  },
  {
    id: "NTF-00238",
    type: "SECURITY",
    title: "Security Warning",
    message:
      "External request requires policy review before execution.",
    timestamp: "12 min ago",
    read: false,
    severity: "WARNING",
    resourceType: "SECURITY",
    resourceId: "SEC-00821",
    actionLabel: "Inspect",
  },
  {
    id: "NTF-00237",
    type: "AGENT",
    title: "Agent Execution Update",
    message:
      "Research agent completed evidence retrieval for TASK-00482.",
    timestamp: "15 min ago",
    read: true,
    severity: "INFO",
    resourceType: "TASK",
    resourceId: "TASK-00482",
    actionLabel: "View Task",
  },
  {
    id: "NTF-00236",
    type: "TASK",
    title: "Task Running",
    message:
      "TASK-00481 is currently being processed by the agent runtime.",
    timestamp: "18 min ago",
    read: true,
    severity: "INFO",
    resourceType: "TASK",
    resourceId: "TASK-00481",
    actionLabel: "View Task",
  },
  {
    id: "NTF-00235",
    type: "SYSTEM",
    title: "System Configuration Updated",
    message:
      "Workbench notification preferences were updated.",
    timestamp: "24 min ago",
    read: true,
    severity: "INFO",
    resourceType: "SETTINGS",
    resourceId: "SETTINGS",
  },
  {
    id: "NTF-00234",
    type: "SECURITY",
    title: "Security Check Passed",
    message:
      "Workspace policy validation completed successfully.",
    timestamp: "31 min ago",
    read: true,
    severity: "SUCCESS",
    resourceType: "SECURITY",
    resourceId: "SEC-00820",
    actionLabel: "Inspect",
  },
];

export const systemEventsMock: SystemEvent[] = [
  {
    id: "SYS-00891",
    timestamp: "10:44:12",
    source: "Agent Worker",
    message: "Task resumed",
    severity: "SUCCESS",
    resourceType: "TASK",
    resourceId: "TASK-00482",
  },
  {
    id: "SYS-00890",
    timestamp: "10:43:58",
    source: "Security",
    message: "Policy check passed",
    severity: "SUCCESS",
    resourceType: "SECURITY",
    resourceId: "SEC-00821",
  },
  {
    id: "SYS-00889",
    timestamp: "10:43:40",
    source: "RAG",
    message: "Retrieval completed",
    severity: "INFO",
    resourceType: "TASK",
    resourceId: "TASK-00482",
  },
  {
    id: "SYS-00888",
    timestamp: "10:43:22",
    source: "Model Runtime",
    message: "Inference started",
    severity: "INFO",
  },
  {
    id: "SYS-00887",
    timestamp: "10:43:10",
    source: "Task Engine",
    message: "Task queued",
    severity: "INFO",
    resourceType: "TASK",
    resourceId: "TASK-00482",
  },
];

export const notificationStatsMock: NotificationStats = {
  total: 24,
  unread: 6,
  alerts: 3,
  systemEvents: 8,
};