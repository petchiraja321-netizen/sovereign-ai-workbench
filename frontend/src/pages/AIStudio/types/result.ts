export interface ResultFinding {
  id: string;
  title: string;
  description: string;
  severity:
    | "low"
    | "medium"
    | "high"
    | "critical";
}

export interface ResultEvidence {
  id: string;
  title: string;
  description: string;
  source: string;
  section: string;
  verified: boolean;
}

export interface ResultSource {
  id: string;
  fileName: string;
  fileType: string;
  fileSize: string;
  status:
    | "verified"
    | "partially-verified"
    | "unverified";
}

export interface AIResult {
  status: "completed";
  taskType: string;
  summary: string;
  confidence: number;
  findings: ResultFinding[];
  evidence: ResultEvidence[];
  sources: ResultSource[];
}