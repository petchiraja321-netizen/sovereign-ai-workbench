import { useState } from "react";

import {
  CheckCircle2,
  Download,
  ExternalLink,
  FileText,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import type {
  AIResult,
  ResultEvidence,
} from "../../types/result";

import { EvidenceCard } from "./EvidenceCard";
import { EvidenceViewer } from "./EvidenceViewer";

interface AIResultPanelProps {
  result: AIResult;
  onBack?: () => void;
}

export function AIResultPanel({
  result,
  onBack,
}: AIResultPanelProps) {
  const [selectedEvidence, setSelectedEvidence] =
    useState<ResultEvidence | null>(null);

  const verifiedEvidenceCount = result.evidence.filter(
    (evidence) => evidence.verified,
  ).length;

  const unverifiedEvidenceCount =
    result.evidence.length - verifiedEvidenceCount;

  const evidenceCoverage =
    result.evidence.length > 0
      ? Math.round(
          (verifiedEvidenceCount / result.evidence.length) * 100,
        )
      : 0;

  const handleViewSource = (fileName: string) => {
    const sourceEvidence = result.evidence.find(
      (evidence) => evidence.source === fileName,
    );

    if (sourceEvidence) {
      setSelectedEvidence(sourceEvidence);
    }
  };

  return (
    <div className="ai-result">
      {/* HEADER */}
      <div className="ai-result__header">
        <div className="ai-result__header-content">
          <div className="ai-result__eyebrow">
            <CheckCircle2 size={14} />
            ANALYSIS COMPLETE
          </div>

          <h2 className="ai-result__title">
            AI Analysis Result
          </h2>

          <p className="ai-result__description">
            The task has completed the sovereign AI
            execution pipeline with verified evidence.
          </p>
        </div>

        <div className="ai-result__status">
          <span className="ai-result__status-dot" />
          VERIFIED
        </div>
      </div>

      {/* EXECUTIVE SUMMARY */}
      <section className="ai-result__section">
        <div className="ai-result__section-header">
          <div>
            <span className="ai-result__section-label">
              EXECUTIVE SUMMARY
            </span>

            <h3>Analysis Overview</h3>
          </div>

          <Sparkles size={18} />
        </div>

        <div className="ai-result__summary">
          {result.summary}
        </div>
      </section>

      {/* CONFIDENCE */}
      <section className="ai-result__confidence">
        <div>
          <span>ANALYSIS CONFIDENCE</span>
          <strong>{result.confidence}%</strong>
        </div>

        <div className="ai-result__confidence-track">
          <div
            className="ai-result__confidence-fill"
            style={{
              width: `${result.confidence}%`,
            }}
          />
        </div>
      </section>

      {/* KEY FINDINGS */}
      <section className="ai-result__section">
        <div className="ai-result__section-header">
          <div>
            <span className="ai-result__section-label">
              KEY FINDINGS
            </span>

            <h3>
              {result.findings.length} identified findings
            </h3>
          </div>

          <ShieldCheck size={18} />
        </div>

        <div className="ai-result__findings">
          {result.findings.map((finding, index) => (
            <div
              key={finding.id}
              className="ai-result__finding"
            >
              <div className="ai-result__finding-number">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="ai-result__finding-content">
                <div className="ai-result__finding-top">
                  <h4>{finding.title}</h4>

                  <span
                    className={`ai-result__severity ai-result__severity--${finding.severity}`}
                  >
                    {finding.severity}
                  </span>
                </div>

                <p>{finding.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EVIDENCE */}
      <section className="ai-result__section">
        <div className="ai-result__section-header">
          <div>
            <span className="ai-result__section-label">
              EVIDENCE
            </span>

            <h3>
              {result.evidence.length} evidence items
            </h3>
          </div>

          <ShieldCheck size={18} />
        </div>

        {/* EVIDENCE SUMMARY */}
        <div className="ai-result__evidence-summary">
          <div className="ai-result__evidence-stat">
            <span>VERIFIED</span>

            <strong>
              {verifiedEvidenceCount
                .toString()
                .padStart(2, "0")}
            </strong>
          </div>

          <div className="ai-result__evidence-stat">
            <span>UNVERIFIED</span>

            <strong>
              {unverifiedEvidenceCount
                .toString()
                .padStart(2, "0")}
            </strong>
          </div>

          <div className="ai-result__evidence-stat">
            <span>COVERAGE</span>

            <strong>{evidenceCoverage}%</strong>
          </div>

          <div className="ai-result__evidence-coverage">
            <div className="ai-result__evidence-coverage-header">
              <span>Evidence Coverage</span>

              <strong>{evidenceCoverage}%</strong>
            </div>

            <div className="ai-result__evidence-coverage-track">
              <div
                className="ai-result__evidence-coverage-fill"
                style={{
                  width: `${evidenceCoverage}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* EVIDENCE CARDS */}
        <div className="ai-result__evidence">
          {result.evidence.map((evidence) => (
            <EvidenceCard
              key={evidence.id}
              evidence={evidence}
            />
          ))}
        </div>
      </section>

      {/* SOURCE DOCUMENTS */}
      <section className="ai-result__section">
        <div className="ai-result__section-header">
          <div>
            <span className="ai-result__section-label">
              SOURCE DOCUMENTS
            </span>

            <h3>
              {result.sources.length} evidence sources
            </h3>
          </div>

          <FileText size={18} />
        </div>

        <div className="ai-result__sources">
          {result.sources.map((source) => {
            const isVerified =
              source.status === "verified";

            const isPartiallyVerified =
              source.status === "partially-verified";

            const sourceEvidenceCount =
              result.evidence.filter(
                (evidence) =>
                  evidence.source === source.fileName,
              ).length;

            return (
              <article
                key={source.id}
                className={`ai-result__source-card ${
                  isVerified
                    ? "ai-result__source-card--verified"
                    : isPartiallyVerified
                      ? "ai-result__source-card--partial"
                      : "ai-result__source-card--unverified"
                }`}
              >
                {/* SOURCE HEADER */}
                <div className="ai-result__source-card-header">
                  <div className="ai-result__source-file">
                    <div className="ai-result__source-file-icon">
                      <FileText size={18} />
                    </div>

                    <div className="ai-result__source-file-info">
                      <span>SOURCE DOCUMENT</span>

                      <strong>{source.fileName}</strong>

                      <small>
                        {source.fileType} · {source.fileSize}
                      </small>
                    </div>
                  </div>

                  <div
                    className={`ai-result__source-status ${
                      isVerified
                        ? "ai-result__source-status--verified"
                        : isPartiallyVerified
                          ? "ai-result__source-status--partial"
                          : "ai-result__source-status--unverified"
                    }`}
                  >
                    {isVerified ? (
                      <ShieldCheck size={11} />
                    ) : (
                      <ShieldAlert size={11} />
                    )}

                    {isVerified
                      ? "VERIFIED"
                      : isPartiallyVerified
                        ? "PARTIALLY VERIFIED"
                        : "UNVERIFIED"}
                  </div>
                </div>

                {/* SOURCE METADATA */}
                <div className="ai-result__source-meta">
                  <div>
                    <span>EVIDENCE REFERENCES</span>

                    <strong>
                      {sourceEvidenceCount
                        .toString()
                        .padStart(2, "0")}
                    </strong>
                  </div>

                  <div>
                    <span>DOCUMENT STATUS</span>

                    <strong>
                      {isVerified
                        ? "TRUSTED"
                        : isPartiallyVerified
                          ? "REVIEW"
                          : "PENDING"}
                    </strong>
                  </div>
                </div>

                {/* SOURCE ACTION */}
                <div className="ai-result__source-action">
                  <button
                    type="button"
                    className="ai-result__source-view-button"
                    onClick={() =>
                      handleViewSource(source.fileName)
                    }
                  >
                    <ExternalLink size={13} />
                    View Source
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* FOOTER ACTIONS */}
      <div className="ai-result__footer">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="ai-result__back-button"
          >
            Return to AI Studio
          </button>
        )}

        <button
          type="button"
          className="ai-result__export-button"
        >
          <Download size={15} />
          Export Result
        </button>
      </div>

      {/* EVIDENCE VIEWER */}
      {selectedEvidence && (
        <EvidenceViewer
          evidence={selectedEvidence}
          onClose={() => setSelectedEvidence(null)}
        />
      )}
    </div>
  );
}