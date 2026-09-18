import {
  quickActionsMock,
  recentSearchesMock,
  searchResultsMock,
} from "../data/searchMock";

import type {
  QuickAction,
  RecentSearch,
  SearchFilters,
  SearchResult,
} from "../types/search";

export async function searchWorkbench(
  query: string,
  filters?: SearchFilters,
): Promise<SearchResult[]> {
  const normalizedQuery = query
    .trim()
    .toLowerCase();

  const activeFilters: SearchFilters = filters ?? {
    type: "ALL",
    status: "ALL",
  };

  if (!normalizedQuery) {
    return [];
  }

  const results = searchResultsMock.filter(
    (result) => {
      const matchesQuery =
        result.id
          .toLowerCase()
          .includes(normalizedQuery) ||
        result.title
          .toLowerCase()
          .includes(normalizedQuery) ||
        result.description
          ?.toLowerCase()
          .includes(normalizedQuery) ||
        result.resourceId
          ?.toLowerCase()
          .includes(normalizedQuery) ||
        result.status
          ?.toLowerCase()
          .includes(normalizedQuery);

      const matchesType =
        activeFilters.type === "ALL" ||
        result.type === activeFilters.type;

      const matchesStatus =
        activeFilters.status === "ALL" ||
        result.status === activeFilters.status;

      return (
        Boolean(matchesQuery) &&
        matchesType &&
        matchesStatus
      );
    },
  );

  return Promise.resolve(
    structuredClone(results),
  );
}

export async function getRecentSearches(): Promise<
  RecentSearch[]
> {
  return Promise.resolve(
    structuredClone(recentSearchesMock),
  );
}

export async function getQuickActions(): Promise<
  QuickAction[]
> {
  return Promise.resolve(
    structuredClone(quickActionsMock),
  );
}