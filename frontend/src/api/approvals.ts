import {
  approvalsMock,
  approvalStatsMock,
} from "../data/approvalsMock";

import type {
  ApprovalDecision,
  ApprovalRequest,
  ApprovalStats,
} from "../types/approval";

export async function getApprovals(): Promise<
  ApprovalRequest[]
> {
  return structuredClone(approvalsMock);
}

export async function getApprovalStats(): Promise<
  ApprovalStats
> {
  return structuredClone(approvalStatsMock);
}

export async function getApprovalById(
  id: string,
): Promise<ApprovalRequest | undefined> {
  const approval = approvalsMock.find(
    (item) => item.id === id,
  );

  return approval
    ? structuredClone(approval)
    : undefined;
}

export async function approveApproval(
  id: string,
  decision: ApprovalDecision,
): Promise<ApprovalRequest | undefined> {
  const approval = approvalsMock.find(
    (item) => item.id === id,
  );

  if (!approval) {
    return undefined;
  }

  return {
    ...structuredClone(approval),
    status: "APPROVED",
    approvedAt: new Date().toLocaleString(),
    decisionBy: "Workbench User",
    decisionComment: decision.comment,
  };
}

export async function rejectApproval(
  id: string,
  decision: ApprovalDecision,
): Promise<ApprovalRequest | undefined> {
  const approval = approvalsMock.find(
    (item) => item.id === id,
  );

  if (!approval) {
    return undefined;
  }

  return {
    ...structuredClone(approval),
    status: "REJECTED",
    rejectedAt: new Date().toLocaleString(),
    decisionBy: "Workbench User",
    decisionComment: decision.comment,
  };
}