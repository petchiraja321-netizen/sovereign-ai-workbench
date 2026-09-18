import type { AIResult } from "../pages/AIStudio/types/result";

function getExportTimestamp(): string {
  return new Date().toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function getStatusLabel(
  status: "verified" | "partially-verified" | "unverified",
): string {
  switch (status) {
    case "verified":
      return "VERIFIED";

    case "partially-verified":
      return "PARTIALLY VERIFIED";

    case "unverified":
      return "UNVERIFIED";

    default:
      return "UNKNOWN";
  }
}

function getSeverityLabel(
  severity: "low" | "medium" | "high" | "critical",
): string {
  return severity.toUpperCase();
}

export function generateResultReport(
  result: AIResult,
): string {
  const verifiedEvidenceCount = result.evidence.filter(
    (evidence) => evidence.verified,
  ).length;

  const unverifiedEvidenceCount =
    result.evidence.length - verifiedEvidenceCount;

  const evidenceCoverage =
    result.evidence.length > 0
      ? Math.round(
          (verifiedEvidenceCount /
            result.evidence.length) *
            100,
        )
      : 0;

  const lines: string[] = [];

  lines.push("==================================================");
  lines.push("        SOVEREIGN AI WORKBENCH");
  lines.push("             AI ANALYSIS REPORT");
  lines.push("==================================================");
  lines.push("");

  lines.push(`Generated: ${getExportTimestamp()}`);
  lines.push(`Task Type: ${result.taskType}`);
  lines.push(`Status: ${result.status.toUpperCase()}`);
  lines.push(`Confidence: ${result.confidence}%`);
  lines.push("");

  lines.push("--------------------------------------------------");
  lines.push("EXECUTIVE SUMMARY");
  lines.push("--------------------------------------------------");
  lines.push("");
  lines.push(result.summary);
  lines.push("");

  lines.push("--------------------------------------------------");
  lines.push("KEY FINDINGS");
  lines.push("--------------------------------------------------");
  lines.push("");

  if (result.findings.length === 0) {
    lines.push("No findings identified.");
  } else {
    result.findings.forEach((finding, index) => {
      lines.push(
        `${String(index + 1).padStart(2, "0")}. ${finding.title}`,
      );

      lines.push(
        `    Severity: ${getSeverityLabel(
          finding.severity,
        )}`,
      );

      lines.push(
        `    ${finding.description}`,
      );

      lines.push("");
    });
  }

  lines.push("--------------------------------------------------");
  lines.push("EVIDENCE SUMMARY");
  lines.push("--------------------------------------------------");
  lines.push("");

  lines.push(
    `Verified Evidence: ${verifiedEvidenceCount}`,
  );

  lines.push(
    `Unverified Evidence: ${unverifiedEvidenceCount}`,
  );

  lines.push(
    `Evidence Coverage: ${evidenceCoverage}%`,
  );

  lines.push("");

  lines.push("--------------------------------------------------");
  lines.push("EVIDENCE DETAILS");
  lines.push("--------------------------------------------------");
  lines.push("");

  if (result.evidence.length === 0) {
    lines.push("No evidence available.");
  } else {
    result.evidence.forEach((evidence, index) => {
      lines.push(
        `${String(index + 1).padStart(2, "0")}. ${evidence.title}`,
      );

      lines.push(
        `    Status: ${
          evidence.verified
            ? "VERIFIED"
            : "UNVERIFIED"
        }`,
      );

      lines.push(
        `    Description: ${evidence.description}`,
      );

      lines.push(
        `    Source: ${evidence.source}`,
      );

      lines.push(
        `    Section: ${evidence.section}`,
      );

      lines.push("");
    });
  }

  lines.push("--------------------------------------------------");
  lines.push("SOURCE DOCUMENTS");
  lines.push("--------------------------------------------------");
  lines.push("");

  if (result.sources.length === 0) {
    lines.push("No source documents available.");
  } else {
    result.sources.forEach((source, index) => {
      const sourceEvidenceCount =
        result.evidence.filter(
          (evidence) =>
            evidence.source === source.fileName,
        ).length;

      lines.push(
        `${String(index + 1).padStart(2, "0")}. ${source.fileName}`,
      );

      lines.push(
        `    Type: ${source.fileType}`,
      );

      lines.push(
        `    Size: ${source.fileSize}`,
      );

      lines.push(
        `    Status: ${getStatusLabel(source.status)}`,
      );

      lines.push(
        `    Evidence References: ${sourceEvidenceCount}`,
      );

      lines.push("");
    });
  }

  lines.push("--------------------------------------------------");
  lines.push("VERIFICATION NOTICE");
  lines.push("--------------------------------------------------");
  lines.push("");

  lines.push(
    "This report contains AI-generated analysis and",
  );

  lines.push(
    "evidence references produced by the Sovereign AI",
  );

  lines.push(
    "Workbench execution pipeline.",
  );

  lines.push("");

  lines.push(
    "Evidence verification status is based on the",
  );

  lines.push(
    "analysis result available at the time of export.",
  );

  lines.push("");

  lines.push("==================================================");
  lines.push("              END OF AI REPORT");
  lines.push("==================================================");

  return lines.join("\n");
}

export function downloadResultReport(
  result: AIResult,
): void {
  const report = generateResultReport(result);

  const blob = new Blob([report], {
    type: "text/plain;charset=utf-8",
  });

  const url = URL.createObjectURL(blob);

  const anchor = document.createElement("a");

  anchor.href = url;

  anchor.download = `sovereign-ai-result-${Date.now()}.txt`;

  document.body.appendChild(anchor);

  anchor.click();

  document.body.removeChild(anchor);

  URL.revokeObjectURL(url);
}