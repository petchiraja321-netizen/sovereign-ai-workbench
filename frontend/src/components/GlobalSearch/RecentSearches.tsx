import type { RecentSearch } from "../../types/search";

interface RecentSearchesProps {
  searches: RecentSearch[];
  onSelect: (query: string) => void;
}

export function RecentSearches({
  searches,
  onSelect,
}: RecentSearchesProps) {
  if (searches.length === 0) {
    return null;
  }

  return (
    <section className="global-search-recent">
      <div className="global-search-section-label">
        Recent Searches
      </div>

      <div className="global-search-recent-list">
        {searches.map((search) => (
          <button
            type="button"
            key={search.id}
            onClick={() =>
              onSelect(search.query)
            }
          >
            <span>◷</span>
            <span>{search.query}</span>
          </button>
        ))}
      </div>
    </section>
  );
}