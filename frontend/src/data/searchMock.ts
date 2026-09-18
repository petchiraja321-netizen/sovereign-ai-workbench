import type {
  QuickAction,
  RecentSearch,
  SearchResult,
} from "../types/search";

export const searchResultsMock: SearchResult[] = [
  {
    id: "TASK-00482",
    title: "Operational Risk Assessment",
    description:
      "AI task currently in execution and awaiting human review.",
    type: "TASK",
    status: "RUNNING",
    resourceId: "TASK-00482",
    route: "/tasks",
  },
  {
    id: "TASK-00479",
    title: "Supplier Compliance Analysis",
    description:
      "Completed supplier compliance analysis task.",
    type: "TASK",
    status: "COMPLETED",
    resourceId: "TASK-00479",
    route: "/tasks",
  },
  {
    id: "FILE-00121",
    title: "Operational_Risk_Source_Document.pdf",
    description:
      "Source document used for operational risk analysis.",
    type: "FILE",
    status: "AVAILABLE",
    resourceId: "FILE-00121",
    route: "/knowledge",
  },
  {
    id: "FILE-00122",
    title: "Risk_Assessment_Report.pdf",
    description:
      "Generated risk assessment source file.",
    type: "FILE",
    status: "AVAILABLE",
    resourceId: "FILE-00122",
    route: "/deliverables",
  },
  {
    id: "EVD-00421",
    title: "Safety Manual — Section 4.2",
    description:
      "Evidence supporting operational safety requirements.",
    type: "EVIDENCE",
    status: "VERIFIED",
    resourceId: "EVD-00421",
    route: "/knowledge",
  },
  {
    id: "EVD-00418",
    title: "Supplier Compliance Policy",
    description:
      "Verified evidence from the supplier policy repository.",
    type: "EVIDENCE",
    status: "VERIFIED",
    resourceId: "EVD-00418",
    route: "/knowledge",
  },
  {
    id: "DLV-00128",
    title: "Risk Assessment Report",
    description:
      "Generated deliverable ready for review and download.",
    type: "DELIVERABLE",
    status: "READY",
    resourceId: "DLV-00128",
    route: "/deliverables",
  },
  {
    id: "DLV-00124",
    title: "Supplier Compliance Summary",
    description:
      "Completed supplier compliance deliverable.",
    type: "DELIVERABLE",
    status: "READY",
    resourceId: "DLV-00124",
    route: "/deliverables",
  },
  {
    id: "APR-00042",
    title: "Human Approval Request",
    description:
      "Approval required before the requested AI action can continue.",
    type: "APPROVAL",
    status: "PENDING",
    resourceId: "APR-00042",
    route: "/approvals",
  },
  {
    id: "APR-00039",
    title: "External Request Authorization",
    description:
      "Previously reviewed external request authorization.",
    type: "APPROVAL",
    status: "APPROVED",
    resourceId: "APR-00039",
    route: "/approvals",
  },
  {
    id: "SEC-00942",
    title: "File Validation Event",
    description:
      "Security validation event for an uploaded workspace file.",
    type: "SECURITY",
    status: "PASSED",
    resourceId: "SEC-00942",
    route: "/security",
  },
  {
    id: "SEC-00938",
    title: "External Request Policy Review",
    description:
      "External request requires policy inspection.",
    type: "SECURITY",
    status: "WARNING",
    resourceId: "SEC-00938",
    route: "/security",
  },
  {
    id: "AUD-00782",
    title: "Deliverable Generation Recorded",
    description:
      "Audit record for deliverable generation activity.",
    type: "AUDIT",
    status: "RECORDED",
    resourceId: "AUD-00782",
    route: "/audit",
  },
  {
    id: "AUD-00776",
    title: "Security Policy Check",
    description:
      "Audit event for a workspace security policy check.",
    type: "AUDIT",
    status: "RECORDED",
    resourceId: "AUD-00776",
    route: "/audit",
  },
  {
    id: "NTF-00241",
    title: "Approval Required",
    description:
      "TASK-00482 requires human authorization.",
    type: "NOTIFICATION",
    status: "UNREAD",
    resourceId: "NTF-00241",
    route: "/notifications",
  },
  {
    id: "NTF-00240",
    title: "Deliverable Ready",
    description:
      "Risk Assessment Report is ready for review.",
    type: "NOTIFICATION",
    status: "UNREAD",
    resourceId: "NTF-00240",
    route: "/notifications",
  },
  {
    id: "SETTING-AI",
    title: "AI Preferences",
    description:
      "Configure model, reasoning and execution preferences.",
    type: "SETTING",
    status: "AVAILABLE",
    resourceId: "SETTINGS",
    route: "/settings",
  },
  {
    id: "SETTING-SECURITY",
    title: "Security Settings",
    description:
      "Configure validation, monitoring and approval policies.",
    type: "SETTING",
    status: "AVAILABLE",
    resourceId: "SETTINGS",
    route: "/settings",
  },
];

export const recentSearchesMock: RecentSearch[] = [
  {
    id: "recent-1",
    query: "TASK-00482",
  },
  {
    id: "recent-2",
    query: "Risk Assessment",
  },
  {
    id: "recent-3",
    query: "security event",
  },
];

export const quickActionsMock: QuickAction[] = [
  {
    id: "new-task",
    title: "New Task",
    description: "Start a new AI task",
    icon: "+",
    route: "/ai-studio",
  },
  {
    id: "knowledge",
    title: "Knowledge Base",
    description: "Browse knowledge and evidence",
    icon: "▣",
    route: "/knowledge",
  },
  {
    id: "tasks",
    title: "Tasks",
    description: "Open Mission Control",
    icon: "◈",
    route: "/tasks",
  },
  {
    id: "security",
    title: "Security Center",
    description: "Inspect security activity",
    icon: "🛡",
    route: "/security",
  },
  {
    id: "approvals",
    title: "Approvals",
    description: "Review pending AI actions",
    icon: "✓",
    route: "/approvals",
  },
  {
    id: "deliverables",
    title: "Deliverables",
    description: "Review generated outputs",
    icon: "□",
    route: "/deliverables",
  },
  {
    id: "audit",
    title: "Audit Trail",
    description: "Inspect historical records",
    icon: "≡",
    route: "/audit",
  },
  {
    id: "settings",
    title: "Settings",
    description: "Configure the workbench",
    icon: "⚙",
    route: "/settings",
  },
];