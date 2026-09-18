import type {
  QuickAction,
  RecentSearch,
  SearchFilters,
  SearchResult,
} from "../../types/search";

import { SearchInput } from "./SearchInput";
import { SearchFilters as SearchFiltersComponent } from "./SearchFilters";
import { SearchResults } from "./SearchResults";
import { RecentSearches } from "./RecentSearches";
import { QuickActions } from "./QuickActions";

interface CommandPaletteProps {
  query: string;
  filters: SearchFilters;
  results: SearchResult[];
  recentSearches: RecentSearch[];
  quickActions: QuickAction[];
  activeIndex: number;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onQueryChange: (value: string) => void;
  onFiltersChange: (
    filters: SearchFilters,
  ) => void;
  onSelectResult: (
    result: SearchResult,
  ) => void;
  onSelectRecent: (
    query: string,
  ) => void;
  onSelectAction: (
    action: QuickAction,
  ) => void;
  onClose: () => void;
}

export function CommandPalette({
  query,
  filters,
  results,
  recentSearches,
  quickActions,
  activeIndex,
  inputRef,
  onQueryChange,
  onFiltersChange,
  onSelectResult,
  onSelectRecent,
  onSelectAction,
  onClose,
}: CommandPaletteProps) {
  return (
    <div
      className="global-search-backdrop"
      onMouseDown={(event) => {
        if (
          event.target === event.currentTarget
        ) {
          onClose();
        }
      }}
    >
      <div
        className="global-search-palette"
        role="dialog"
        aria-modal="true"
        aria-label="Global Search"
      >
        <SearchInput
          value={query}
          onChange={onQueryChange}
          inputRef={inputRef}
        />

        <SearchFiltersComponent
          filters={filters}
          onChange={onFiltersChange}
        />

        <div className="global-search-body">
          {query.trim() ? (
            <SearchResults
              results={results}
              activeIndex={activeIndex}
              onSelect={onSelectResult}
            />
          ) : (
            <>
              <RecentSearches
                searches={recentSearches}
                onSelect={onSelectRecent}
              />

              <QuickActions
                actions={quickActions}
                onSelect={onSelectAction}
              />
            </>
          )}
        </div>

        <footer className="global-search-footer">
          <span>
            <kbd>↑</kbd>
            <kbd>↓</kbd>
            Navigate
          </span>

          <span>
            <kbd>↵</kbd>
            Open
          </span>

          <span>
            <kbd>ESC</kbd>
            Close
          </span>
        </footer>
      </div>
    </div>
  );
}