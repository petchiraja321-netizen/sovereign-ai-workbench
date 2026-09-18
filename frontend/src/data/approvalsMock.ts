import type {
  ApprovalRequest,
  ApprovalStats,
} from "../types/approval";

export const approvalsMock: ApprovalRequest[] = [
  {
    id: "APR-00042",
    taskId: "TASK-00482",
    taskTitle: "Operational Risk Assessment",
    action: "Generate final risk assessment report",
    actionType: "Deliverable Generation",
    reason:
      "The requested operation requires human authorization before final deliverable generation.",
    risk: "HIGH",
    status: "PENDING",
    requestedAt: "17 Sep 2026 • 10:44",
    requestedBy: "AI Agent",
    model: "Qwen",
    evidenceCount: 12,
    evidence: [
      {
        id: "EVD-001",
        sourceName: "safety_manual.pdf",
        section: "Section 4.2",
        confidence: 94,
        verified: true,
      },
      {
        id: "EVD-002",
        sourceName: "risk_policy.pdf",
        section: "Section 7.1",
        confidence: 91,
        verified: true,
      },
      {
        id: "EVD-003",
        sourceName: "operations_guide.pdf",
        section: "Section 3.4",
        confidence: 89,
        verified: true,
      },
    ],
  },

  {
    id: "APR-00041",
    taskId: "TASK-00479",
    taskTitle: "External Data Enrichment",
    action: "Execute controlled external API request",
    actionType: "External Request",
    reason:
      "The workflow requires a monitored external request before the task can continue.",
    risk: "MEDIUM",
    status: "PENDING",
    requestedAt: "17 Sep 2026 • 10:38",
    requestedBy: "AI Agent",
    model: "Configured Local Model",
    evidenceCount: 6,
    evidence: [
      {
        id: "EVD-004",
        sourceName: "api_policy.pdf",
        section: "Section 2.1",
        confidence: 96,
        verified: true,
      },
      {
        id: "EVD-005",
        sourceName: "data_handling.pdf",
        section: "Section 5.3",
        confidence: 92,
        verified: true,
      },
    ],
  },

  {
    id: "APR-00040",
    taskId: "TASK-00471",
    taskTitle: "Compliance Dataset Export",
    action: "Export verified compliance dataset",
    actionType: "Data Export",
    reason:
      "The dataset contains controlled workspace information and requires authorization before export.",
    risk: "LOW",
    status: "APPROVED",
    requestedAt: "17 Sep 2026 • 10:34",
    requestedBy: "AI Agent",
    model: "Configured Local Model",
    evidenceCount: 8,
    approvedAt: "17 Sep 2026 • 10:36",
    decisionBy: "Workbench User",
    decisionComment: "Approved after evidence review.",
    evidence: [
      {
        id: "EVD-006",
        sourceName: "compliance_register.pdf",
        section: "Section 8.2",
        confidence: 95,
        verified: true,
      },
      {
        id: "EVD-007",
        sourceName: "export_policy.pdf",
        section: "Section 4.1",
        confidence: 93,
        verified: true,
      },
    ],
  },

  {
    id: "APR-00039",
    taskId: "TASK-00465",
    taskTitle: "Knowledge Base Update",
    action: "Execute indexed knowledge tool operation",
    actionType: "Tool Execution",
    reason:
      "The requested tool operation changes indexed workspace information.",
    risk: "MEDIUM",
    status: "APPROVED",
    requestedAt: "17 Sep 2026 • 10:21",
    requestedBy: "AI Agent",
    model: "Qwen",
    evidenceCount: 5,
    approvedAt: "17 Sep 2026 • 10:24",
    decisionBy: "Workbench User",
    decisionComment: "Approved.",
    evidence: [
      {
        id: "EVD-008",
        sourceName: "knowledge_policy.pdf",
        section: "Section 3.2",
        confidence: 90,
        verified: true,
      },
    ],
  },

  {
    id: "APR-00038",
    taskId: "TASK-00461",
    taskTitle: "Sensitive Workspace Operation",
    action: "Modify protected workspace configuration",
    actionType: "Sensitive Operation",
    reason:
      "The operation modifies protected workspace configuration and requires explicit authorization.",
    risk: "HIGH",
    status: "REJECTED",
    requestedAt: "17 Sep 2026 • 09:58",
    requestedBy: "AI Agent",
    model: "Configured Local Model",
    evidenceCount: 9,
    rejectedAt: "17 Sep 2026 • 10:03",
    decisionBy: "Workbench User",
    decisionComment:
      "Configuration change requires additional review.",
    evidence: [
      {
        id: "EVD-009",
        sourceName: "security_policy.pdf",
        section: "Section 6.4",
        confidence: 97,
        verified: true,
      },
      {
        id: "EVD-010",
        sourceName: "workspace_controls.pdf",
        section: "Section 2.8",
        confidence: 94,
        verified: true,
      },
    ],
  },
];

export const approvalStatsMock: ApprovalStats = {
  pending: 4,
  approved: 18,
  rejected: 2,
  today: 7,
};