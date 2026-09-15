import { useCallback, useEffect, useState } from "react";

export type ExecutionStatus =
  | "idle"
  | "running"
  | "completed";

export interface ExecutionStage {
  title: string;
  description: string;
  status:
    | "pending"
    | "running"
    | "completed"
    | "skipped";
}

const createInitialStages = (): ExecutionStage[] => [
  {
    title: "Security Check",
    description:
      "Validating task boundary, files and execution policy.",
    status: "pending",
  },
  {
    title: "Task Classification",
    description:
      "Determining intent, complexity and required capabilities.",
    status: "pending",
  },
  {
    title: "Model Selection",
    description:
      "Selecting the appropriate local AI model for the task.",
    status: "pending",
  },
  {
    title: "Document Retrieval",
    description:
      "Searching approved enterprise knowledge sources.",
    status: "pending",
  },
  {
    title: "Reasoning",
    description:
      "Processing the task using the selected local model.",
    status: "pending",
  },
  {
    title: "Evidence Verification",
    description:
      "Checking generated claims against available evidence.",
    status: "pending",
  },
  {
    title: "Human Approval",
    description:
      "Checking whether the requested action requires approval.",
    status: "pending",
  },
  {
    title: "Deliverable Generation",
    description:
      "Preparing the final structured output.",
    status: "pending",
  },
];

const stageDurations = [
  1400,
  1600,
  1800,
  2200,
  3000,
  2400,
  1200,
  2200,
];

const activities = [
  "Validating local security policy...",
  "Classifying task intent and complexity...",
  "Evaluating available local models...",
  "Retrieving relevant enterprise knowledge...",
  "Running local model reasoning...",
  "Cross-checking generated evidence...",
  "Evaluating human approval requirements...",
  "Generating structured deliverables...",
];

export function useAgentExecution() {
  const [status, setStatus] =
    useState<ExecutionStatus>("idle");

  const [stages, setStages] = useState<
    ExecutionStage[]
  >(createInitialStages);

  const [currentStage, setCurrentStage] =
    useState(-1);

  const [progress, setProgress] =
    useState(0);

  const [elapsedSeconds, setElapsedSeconds] =
    useState(0);

  const [retrievedDocuments, setRetrievedDocuments] =
    useState(0);

  const [evidenceCount, setEvidenceCount] =
    useState(0);

  const [activity, setActivity] = useState(
    "Waiting for execution...",
  );

  const startExecution = useCallback(() => {
    setStatus("running");
    setCurrentStage(0);
    setProgress(0);
    setElapsedSeconds(0);
    setRetrievedDocuments(0);
    setEvidenceCount(0);

    setActivity(
      "Initializing sovereign execution boundary...",
    );

    setStages(createInitialStages());
  }, []);

  useEffect(() => {
    if (status !== "running") {
      return;
    }

    const timer = window.setInterval(() => {
      setElapsedSeconds((seconds) => seconds + 1);
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, [status]);

  useEffect(() => {
    if (
      status !== "running" ||
      currentStage < 0
    ) {
      return;
    }

    const stage = stages[currentStage];

    if (!stage) {
      setStatus("completed");
      setProgress(100);
      setActivity(
        "Execution completed successfully.",
      );
      return;
    }

    setActivity(activities[currentStage]);

    setStages((current) =>
      current.map((item, index) => ({
        ...item,
        status:
          index < currentStage
            ? "completed"
            : index === currentStage
              ? "running"
              : "pending",
      })),
    );

    const timer = window.setTimeout(() => {
      if (currentStage === 3) {
        setRetrievedDocuments(12);
      }

      if (currentStage === 5) {
        setEvidenceCount(8);
      }

      const nextStage = currentStage + 1;

      if (nextStage >= stages.length) {
        setStages((current) =>
          current.map((item, index) => ({
            ...item,
            status:
              index === 6
                ? "skipped"
                : "completed",
          })),
        );

        setProgress(100);
        setStatus("completed");
        setActivity(
          "All execution stages completed successfully.",
        );

        return;
      }

      if (nextStage === 6) {
        setStages((current) =>
          current.map((item, index) =>
            index === 6
              ? {
                  ...item,
                  status: "skipped",
                }
              : item,
          ),
        );
      }

      setProgress(
        Math.round(
          (nextStage / stages.length) * 100,
        ),
      );

      setCurrentStage(nextStage);
    }, stageDurations[currentStage]);

    return () => {
      window.clearTimeout(timer);
    };
  }, [
    status,
    currentStage,
    stages,
  ]);

  return {
    status,
    stages,
    currentStage,
    progress,
    elapsedSeconds,
    retrievedDocuments,
    evidenceCount,
    activity,
    startExecution,
  };
}