import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  approveApproval,
  getApprovalStats,
  getApprovals,
  rejectApproval,
} from "../../api/approvals";

import type {
  ApprovalFilters,
  ApprovalRequest,
  ApprovalStats as ApprovalStatsType,
} from "../../types/approval";

import { ApprovalHeader } from "./components/ApprovalHeader";
import { ApprovalStats } from "./components/ApprovalStats";
import { ApprovalToolbar } from "./components/ApprovalToolbar";
import { ApprovalTable } from "./components/ApprovalTable";
import { ApprovalDetails } from "./components/ApprovalDetails";
import { ApprovalDecisionModal } from "./components/ApprovalDecisionModal";

import "./approvals.css";

type DecisionAction =
  | "APPROVE"
  | "REJECT";

const initialFilters: ApprovalFilters = {
  search: "",
  status: "ALL",
  risk: "ALL",
  actionType: "ALL",
};

const initialStats: ApprovalStatsType = {
  pending: 0,
  approved: 0,
  rejected: 0,
  today: 0,
};

export default function Approvals() {
  const [approvals, setApprovals] =
    useState<ApprovalRequest[]>([]);

  const [stats, setStats] =
    useState<ApprovalStatsType>(
      initialStats,
    );

  const [filters, setFilters] =
    useState<ApprovalFilters>(
      initialFilters,
    );

  const [selectedApproval, setSelectedApproval] =
    useState<ApprovalRequest | null>(
      null,
    );

  const [decision, setDecision] =
    useState<DecisionAction | null>(
      null,
    );

  const [loading, setLoading] =
    useState(true);

  const [decisionLoading, setDecisionLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadApprovals() {
      setLoading(true);
      setError(null);

      try {
        const [
          approvalData,
          statsData,
        ] = await Promise.all([
          getApprovals(),
          getApprovalStats(),
        ]);

        if (!mounted) {
          return;
        }

        setApprovals(approvalData);
        setStats(statsData);
      } catch {
        if (mounted) {
          setError(
            "Unable to load approval requests.",
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadApprovals();

    return () => {
      mounted = false;
    };
  }, []);

  const filteredApprovals = useMemo(() => {
    const query = filters.search
      .trim()
      .toLowerCase();

    return approvals.filter((approval) => {
      const matchesSearch =
        !query ||
        approval.id
          .toLowerCase()
          .includes(query) ||
        approval.taskId
          .toLowerCase()
          .includes(query) ||
        approval.taskTitle
          .toLowerCase()
          .includes(query) ||
        approval.action
          .toLowerCase()
          .includes(query);

      const matchesStatus =
        filters.status === "ALL" ||
        approval.status ===
          filters.status;

      const matchesRisk =
        filters.risk === "ALL" ||
        approval.risk ===
          filters.risk;

      const matchesActionType =
        filters.actionType === "ALL" ||
        approval.actionType ===
          filters.actionType;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesRisk &&
        matchesActionType
      );
    });
  }, [approvals, filters]);

  const handleSelectApproval = (
    approval: ApprovalRequest,
  ) => {
    setSelectedApproval(approval);
    setError(null);
  };

  const handleApprove = (
    approval: ApprovalRequest,
  ) => {
    if (
      approval.status !== "PENDING"
    ) {
      return;
    }

    setSelectedApproval(approval);
    setDecision("APPROVE");
    setError(null);
  };

  const handleReject = (
    approval: ApprovalRequest,
  ) => {
    if (
      approval.status !== "PENDING"
    ) {
      return;
    }

    setSelectedApproval(approval);
    setDecision("REJECT");
    setError(null);
  };

  const handleCancelDecision = () => {
    if (decisionLoading) {
      return;
    }

    setDecision(null);
  };

  const handleConfirmDecision = async (
    comment: string,
  ) => {
    if (
      !selectedApproval ||
      !decision ||
      decisionLoading
    ) {
      return;
    }

    if (
      decision === "REJECT" &&
      !comment.trim()
    ) {
      return;
    }

    setDecisionLoading(true);
    setError(null);

    try {
      const decisionPayload = {
        comment:
          comment.trim() || undefined,
      };

      const updatedApproval =
        decision === "APPROVE"
          ? await approveApproval(
              selectedApproval.id,
              decisionPayload,
            )
          : await rejectApproval(
              selectedApproval.id,
              decisionPayload,
            );

      if (!updatedApproval) {
        setError(
          "Approval request could not be updated.",
        );
        return;
      }

      setApprovals((current) =>
        current.map((approval) =>
          approval.id ===
          updatedApproval.id
            ? updatedApproval
            : approval,
        ),
      );

      setSelectedApproval(
        updatedApproval,
      );

      setDecision(null);

      const wasPending =
        selectedApproval.status ===
        "PENDING";

      setStats((current) => ({
        ...current,

        pending: wasPending
          ? Math.max(
              0,
              current.pending - 1,
            )
          : current.pending,

        approved:
          updatedApproval.status ===
          "APPROVED"
            ? current.approved +
              (wasPending ? 1 : 0)
            : current.approved,

        rejected:
          updatedApproval.status ===
          "REJECTED"
            ? current.rejected +
              (wasPending ? 1 : 0)
            : current.rejected,

        today: current.today,
      }));
    } catch {
      setError(
        "Unable to process the approval decision.",
      );
    } finally {
      setDecisionLoading(false);
    }
  };

  return (
    <div className="approval-page">
      <ApprovalHeader
        pendingCount={stats.pending}
      />

      <ApprovalStats
        stats={stats}
      />

      <ApprovalToolbar
        filters={filters}
        onChange={setFilters}
      />

      {error && (
        <div
          className="approval-error"
          role="alert"
        >
          {error}
        </div>
      )}

      {loading ? (
        <div className="approval-loading">
          Loading approval requests...
        </div>
      ) : (
        <ApprovalTable
          approvals={
            filteredApprovals
          }
          onSelect={
            handleSelectApproval
          }
        />
      )}

      {selectedApproval && (
        <ApprovalDetails
          approval={
            selectedApproval
          }
          onClose={() => {
            if (!decisionLoading) {
              setSelectedApproval(
                null,
              );
            }
          }}
          onApprove={
            handleApprove
          }
          onReject={
            handleReject
          }
        />
      )}

      {selectedApproval &&
        decision && (
          <ApprovalDecisionModal
            decision={decision}
            taskId={
              selectedApproval.taskId
            }
            action={
              selectedApproval.action
            }
            onCancel={
              handleCancelDecision
            }
            onConfirm={
              handleConfirmDecision
            }
          />
        )}
    </div>
  );
}