import type { SearchResult } from "../../types/search";

interface SearchResultItemProps {
  result: SearchResult;
  active: boolean;
  onSelect: (
    result: SearchResult,
  ) => void;
}

const typeIcons: Record<
  SearchResult["type"],
  string
> = {
  TASK: "◈",
  FILE: "□",
  EVIDENCE: "◇",
  DELIVERABLE: "▤",
  APPROVAL: "✓",
  SECURITY: "🛡",
  AUDIT: "≡",
  NOTIFICATION: "●",
  SETTING: "⚙",
};

const typeLabels: Record<
  SearchResult["type"],
  string
> = {
  TASK: "Task",
  FILE: "File",
  EVIDENCE: "Evidence",
  DELIVERABLE: "Deliverable",
  APPROVAL: "Approval",
  SECURITY: "Security",
  AUDIT: "Audit",
  NOTIFICATION: "Notification",
  SETTING: "Setting",
};

export function SearchResultItem({
  result,
  active,
  onSelect,
}: SearchResultItemProps) {
  return (
    <button
      type="button"
      className={`global-search-result ${
        active
          ? "global-search-result--active"
          : ""
      }`}
      onClick={() => onSelect(result)}
    >
      <span
        className={`global-search-result__icon global-search-result__icon--${result.type.toLowerCase()}`}
      >
        {typeIcons[result.type]}
      </span>

      <span className="global-search-result__body">
        <span className="global-search-result__top">
          <strong>{result.title}</strong>

          <span className="global-search-result__type">
            {typeLabels[result.type]}
          </span>
        </span>

        {result.description && (
          <span className="global-search-result__description">
            {result.description}
          </span>
        )}

        <span className="global-search-result__meta">
          {result.resourceId ?? result.id}

          {result.status && (
            <span>
              {result.status}
            </span>
          )}
        </span>
      </span>

      <span className="global-search-result__enter">
        ↵
      </span>
    </button>
  );
}