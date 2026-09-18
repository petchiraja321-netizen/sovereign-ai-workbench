import type {
  Task,
  TaskStats,
} from "../types/task";

export const mockTasks: Task[] = [
  {
    id: "TASK-00482",
    title: "Operational Risk Assessment",
    type: "analysis",
    typeLabel: "Analysis",
    status: "running",
    model: "Qwen 3 8B",
    createdAt: "2 min ago",
    updatedAt: "Just now",
    duration: "02:14",
    inputCount: 3,
    files: [
      {
        id: "file-1",
        name: "refinery_safety.pdf",
        size: "4.2 MB",
      },
      {
        id: "file-2",
        name: "process_manual.pdf",
        size: "2.8 MB",
      },
      {
        id: "file-3",
        name: "emergency_plan.pdf",
        size: "1.6 MB",
      },
    ],
    progress: [
      {
        id: "security",
        label: "Security",
        status: "completed",
      },
      {
        id: "classification",
        label: "Classification",
        status: "completed",
      },
      {
        id: "retrieval",
        label: "Retrieval",
        status: "completed",
      },
      {
        id: "reasoning",
        label: "Reasoning",
        status: "running",
      },
      {
        id: "verification",
        label: "Verification",
        status: "pending",
      },
      {
        id: "deliverable",
        label: "Deliverable",
        status: "pending",
      },
    ],
    evidenceCount: 8,
    deliverables: 0,
    approvalRequired: false,
    executionBoundary: "local",
    externalApiCalls: 0,
    description:
      "Assessment of operational risks across supplied refinery safety documents.",
  },

  {
    id: "TASK-00481",
    title: "Safety Compliance Analysis",
    type: "analysis",
    typeLabel: "Analysis",
    status: "completed",
    model: "Qwen 3 8B",
    createdAt: "18 min ago",
    updatedAt: "16 min ago",
    duration: "06:42",
    inputCount: 4,
    files: [
      {
        id: "file-4",
        name: "safety_policy.pdf",
        size: "5.1 MB",
      },
      {
        id: "file-5",
        name: "compliance_manual.pdf",
        size: "3.4 MB",
      },
    ],
    progress: [
      {
        id: "security",
        label: "Security",
        status: "completed",
      },
      {
        id: "classification",
        label: "Classification",
        status: "completed",
      },
      {
        id: "retrieval",
        label: "Retrieval",
        status: "completed",
      },
      {
        id: "reasoning",
        label: "Reasoning",
        status: "completed",
      },
      {
        id: "verification",
        label: "Verification",
        status: "completed",
      },
      {
        id: "deliverable",
        label: "Deliverable",
        status: "completed",
      },
    ],
    evidenceCount: 14,
    deliverables: 1,
    approvalRequired: false,
    executionBoundary: "local",
    externalApiCalls: 0,
    description:
      "Completed compliance analysis using approved local knowledge sources.",
  },

  {
    id: "TASK-00480",
    title: "Executive Safety Report",
    type: "report",
    typeLabel: "Report Generation",
    status: "approval",
    model: "Qwen 3 8B",
    createdAt: "32 min ago",
    updatedAt: "28 min ago",
    duration: "08:31",
    inputCount: 6,
    files: [
      {
        id: "file-6",
        name: "safety_findings.pdf",
        size: "2.3 MB",
      },
      {
        id: "file-7",
        name: "risk_register.xlsx",
        size: "1.1 MB",
      },
    ],
    progress: [
      {
        id: "security",
        label: "Security",
        status: "completed",
      },
      {
        id: "classification",
        label: "Classification",
        status: "completed",
      },
      {
        id: "retrieval",
        label: "Retrieval",
        status: "completed",
      },
      {
        id: "reasoning",
        label: "Reasoning",
        status: "completed",
      },
      {
        id: "verification",
        label: "Verification",
        status: "completed",
      },
      {
        id: "deliverable",
        label: "Approval Required",
        status: "running",
      },
    ],
    evidenceCount: 21,
    deliverables: 1,
    approvalRequired: true,
    executionBoundary: "local",
    externalApiCalls: 0,
    description:
      "Executive report awaiting human approval before final release.",
  },

  {
    id: "TASK-00479",
    title: "Document Extraction",
    type: "extraction",
    typeLabel: "Extraction",
    status: "completed",
    model: "Qwen 3 8B",
    createdAt: "1 hr ago",
    updatedAt: "48 min ago",
    duration: "04:18",
    inputCount: 5,
    files: [
      {
        id: "file-8",
        name: "technical_manual.pdf",
        size: "8.2 MB",
      },
    ],
    progress: [
      {
        id: "security",
        label: "Security",
        status: "completed",
      },
      {
        id: "classification",
        label: "Classification",
        status: "completed",
      },
      {
        id: "retrieval",
        label: "Retrieval",
        status: "completed",
      },
      {
        id: "reasoning",
        label: "Reasoning",
        status: "completed",
      },
      {
        id: "verification",
        label: "Verification",
        status: "completed",
      },
      {
        id: "deliverable",
        label: "Deliverable",
        status: "completed",
      },
    ],
    evidenceCount: 9,
    deliverables: 1,
    approvalRequired: false,
    executionBoundary: "local",
    externalApiCalls: 0,
    description:
      "Structured extraction from enterprise technical documentation.",
  },

  {
    id: "TASK-00478",
    title: "Regulatory Research",
    type: "research",
    typeLabel: "Research",
    status: "queued",
    model: "Qwen 3 8B",
    createdAt: "2 hr ago",
    updatedAt: "2 hr ago",
    duration: "--",
    inputCount: 3,
    files: [
      {
        id: "file-9",
        name: "regulatory_guidelines.pdf",
        size: "3.7 MB",
      },
    ],
    progress: [
      {
        id: "security",
        label: "Security",
        status: "pending",
      },
      {
        id: "classification",
        label: "Classification",
        status: "pending",
      },
      {
        id: "retrieval",
        label: "Retrieval",
        status: "pending",
      },
      {
        id: "reasoning",
        label: "Reasoning",
        status: "pending",
      },
      {
        id: "verification",
        label: "Verification",
        status: "pending",
      },
      {
        id: "deliverable",
        label: "Deliverable",
        status: "pending",
      },
    ],
    evidenceCount: 0,
    deliverables: 0,
    approvalRequired: false,
    executionBoundary: "local",
    externalApiCalls: 0,
    description:
      "Queued research task for regulatory guidance review.",
  },

  {
    id: "TASK-00477",
    title: "Incident Classification",
    type: "document",
    typeLabel: "Document",
    status: "failed",
    model: "Qwen 3 8B",
    createdAt: "3 hr ago",
    updatedAt: "2 hr ago",
    duration: "01:52",
    inputCount: 2,
    files: [
      {
        id: "file-10",
        name: "incident_report.pdf",
        size: "1.9 MB",
      },
    ],
    progress: [
      {
        id: "security",
        label: "Security",
        status: "completed",
      },
      {
        id: "classification",
        label: "Classification",
        status: "running",
      },
      {
        id: "retrieval",
        label: "Retrieval",
        status: "pending",
      },
      {
        id: "reasoning",
        label: "Reasoning",
        status: "pending",
      },
      {
        id: "verification",
        label: "Verification",
        status: "pending",
      },
      {
        id: "deliverable",
        label: "Deliverable",
        status: "pending",
      },
    ],
    evidenceCount: 2,
    deliverables: 0,
    approvalRequired: false,
    executionBoundary: "local",
    externalApiCalls: 0,
    description:
      "Document classification task stopped after processing failure.",
  },
];

export function getTaskStats(
  tasks: Task[] = mockTasks,
): TaskStats {
  return {
    total: 129,
    running: tasks.filter(
      (task) => task.status === "running",
    ).length,
    completed: 124,
    pendingApproval: tasks.filter(
      (task) => task.status === "approval",
    ).length,
    failed: tasks.filter(
      (task) => task.status === "failed",
    ).length,
  };
}

export async function getTasks(): Promise<Task[]> {
  return Promise.resolve(mockTasks);
}

export async function getTaskById(
  taskId: string,
): Promise<Task | undefined> {
  return Promise.resolve(
    mockTasks.find(
      (task) => task.id === taskId,
    ),
  );
}