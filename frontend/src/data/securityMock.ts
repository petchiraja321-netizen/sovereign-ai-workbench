import type {
  FileSecurityItem,
  NetworkActivityItem,
  SecurityEvent,
  SecurityOverview,
} from "../types/security";

export const securityOverview: SecurityOverview = {
  systemStatus: "secure",
  policyStatus: "active",
  fileValidation: true,
  networkMonitoring: true,
  auditLogging: true,
  securityScore: 98,
};

export const securityEvents: SecurityEvent[] = [
  {
    id: "SEC-00942",
    title: "PDF validation completed",
    description:
      "File validation completed successfully.",
    source: "Knowledge Base",
    status: "allowed",
    severity: "low",
    timestamp: "10:42:18",
    details: [
      "File type validated",
      "Security policy evaluated",
      "No policy violation detected",
    ],
  },
  {
    id: "SEC-00941",
    title: "Agent API request",
    description:
      "Agent request passed security policy checks.",
    source: "AI Agent",
    status: "allowed",
    severity: "low",
    timestamp: "10:40:52",
    details: [
      "Agent permission validated",
      "Request scope verified",
      "Execution policy allowed request",
    ],
  },
  {
    id: "SEC-00940",
    title: "External service communication",
    description:
      "External communication was monitored.",
    source: "Network",
    status: "monitored",
    severity: "medium",
    timestamp: "10:38:21",
    details: [
      "External endpoint detected",
      "Network policy evaluated",
      "Communication monitored",
    ],
  },
  {
    id: "SEC-00939",
    title: "Invalid file detected",
    description:
      "Uploaded file failed validation.",
    source: "Knowledge Base",
    status: "blocked",
    severity: "high",
    timestamp: "10:31:07",
    details: [
      "File validation failed",
      "Security policy rejected the file",
      "Upload operation blocked",
    ],
  },
  {
    id: "SEC-00938",
    title: "Tool execution warning",
    description:
      "Tool execution requires additional monitoring.",
    source: "Tool Runtime",
    status: "warning",
    severity: "medium",
    timestamp: "10:27:44",
    details: [
      "Tool execution detected",
      "Additional policy monitoring enabled",
      "Execution remains under observation",
    ],
  },
];

export const networkActivity: NetworkActivityItem[] = [
  {
    id: "NET-001",
    name: "Local AI Runtime",
    category: "local",
    status: "active",
    description:
      "Local model execution environment",
  },
  {
    id: "NET-002",
    name: "RAG Pipeline",
    category: "local",
    status: "active",
    description:
      "Internal retrieval and knowledge processing",
  },
  {
    id: "NET-003",
    name: "Vector Store",
    category: "local",
    status: "active",
    description:
      "Internal vector index service",
  },
  {
    id: "NET-004",
    name: "Tool Runtime",
    category: "local",
    status: "active",
    description:
      "Controlled local tool execution",
  },
  {
    id: "NET-005",
    name: "External API",
    category: "external",
    status: "monitored",
    description:
      "External API communication boundary",
  },
  {
    id: "NET-006",
    name: "External Service",
    category: "external",
    status: "monitored",
    description:
      "Monitored external service connection",
  },
];

export const fileSecurityItems: FileSecurityItem[] = [
  {
    id: "FILE-001",
    name: "Enterprise_Policy.pdf",
    type: "PDF",
    size: "2.4 MB",
    hash: "a81f...92c4",
    validation: "passed",
    trust: "internal",
    status: "allowed",
  },
  {
    id: "FILE-002",
    name: "Security_Architecture.pdf",
    type: "PDF",
    size: "4.8 MB",
    hash: "7c21...81af",
    validation: "passed",
    trust: "internal",
    status: "allowed",
  },
  {
    id: "FILE-003",
    name: "External_Document.pdf",
    type: "PDF",
    size: "1.2 MB",
    hash: "19af...442d",
    validation: "passed",
    trust: "external",
    status: "monitored",
  },
];