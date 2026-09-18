import type { SearchResult } from "../../types/search";

import { SearchResultItem } from "./SearchResultItem";

interface SearchResultsProps {
  results: SearchResult[];
  activeIndex: number;
  onSelect: (
    result: SearchResult,
  ) => void;
}

const groupOrder: SearchResult["type"][] = [
  "TASK",
  "FILE",
  "EVIDENCE",
  "DELIVERABLE",
  "APPROVAL",
  "SECURITY",
  "AUDIT",
  "NOTIFICATION",
  "SETTING",
];

const groupLabels: Record<
  SearchResult["type"],
  string
> = {
  TASK: "Tasks",
  FILE: "Files",
  EVIDENCE: "Evidence",
  DELIVERABLE: "Deliverables",
  APPROVAL: "Approvals",
  SECURITY: "Security",
  AUDIT: "Audit Events",
  NOTIFICATION: "Notifications",
  SETTING: "Settings",
};

export function SearchResults({
  results,
  activeIndex,
  onSelect,
}: SearchResultsProps) {
  if (results.length === 0) {
    return (
      <div className="global-search-no-results">
        <div className="global-search-no-results__icon">
          ?
        </div>

        <h3>No results found</h3>

        <p>
          Try a different task, file, resource
          or keyword.
        </p>
      </div>
    );
  }

  let renderedIndex = -1;

  return (
    <div className="global-search-results">
      {groupOrder.map((type) => {
        const groupResults = results.filter(
          (result) =>
            result.type === type,
        );

        if (groupResults.length === 0) {
          return null;
        }

        return (
          <section
            key={type}
            className="global-search-group"
          >
            <div className="global-search-group__header">
              {groupLabels[type]}
              <span>
                {groupResults.length}
              </span>
            </div>

            {groupResults.map((result) => {
              renderedIndex += 1;

              return (
                <SearchResultItem
                  key={result.id}
                  result={result}
                  active={
                    renderedIndex ===
                    activeIndex
                  }
                  onSelect={onSelect}
                />
              );
            })}
          </section>
        );
      })}
    </div>
  );
}