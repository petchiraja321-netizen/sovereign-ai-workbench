import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import {
  getQuickActions,
  getRecentSearches,
  searchWorkbench,
} from "../../api/search";

import type {
  QuickAction,
  RecentSearch,
  SearchFilters,
  SearchResult,
} from "../../types/search";

import { CommandPalette } from "./CommandPalette";

import "./global-search.css";

interface GlobalSearchProps {
  open: boolean;
  onClose: () => void;
}

const initialFilters: SearchFilters = {
  type: "ALL",
  status: "ALL",
};

export function GlobalSearch({
  open,
  onClose,
}: GlobalSearchProps) {
  const navigate = useNavigate();

  const inputRef =
    useRef<HTMLInputElement | null>(null);

  const [query, setQuery] =
    useState("");

  const [filters, setFilters] =
    useState<SearchFilters>(
      initialFilters,
    );

  const [results, setResults] =
    useState<SearchResult[]>([]);

  const [recentSearches, setRecentSearches] =
    useState<RecentSearch[]>([]);

  const [quickActions, setQuickActions] =
    useState<QuickAction[]>([]);

  const [activeIndex, setActiveIndex] =
    useState(0);

  useEffect(() => {
    if (!open) {
      return;
    }

    void Promise.all([
      getRecentSearches(),
      getQuickActions(),
    ]).then(
      ([
        recentData,
        actionData,
      ]) => {
        setRecentSearches(
          recentData,
        );
        setQuickActions(
          actionData,
        );
      },
    );

    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  }, [open]);

  useEffect(() => {
    if (!open || !query.trim()) {
      setResults([]);
      setActiveIndex(0);
      return;
    }

    let cancelled = false;

    void searchWorkbench(
      query,
      filters,
    ).then((data) => {
      if (cancelled) {
        return;
      }

      setResults(data);
      setActiveIndex(0);
    });

    return () => {
      cancelled = true;
    };
  }, [open, query, filters]);

  const flatResultCount = results.length;

  const handleOpenResult = useCallback(
    (result: SearchResult) => {
      if (!result.route) {
        return;
      }

      const existingSearch =
        recentSearches.find(
          (item) =>
            item.query.toLowerCase() ===
            query.trim().toLowerCase(),
        );

      if (
        query.trim() &&
        !existingSearch
      ) {
        setRecentSearches(
          (current) => [
            {
              id: `recent-${Date.now()}`,
              query: query.trim(),
            },
            ...current,
          ].slice(0, 5),
        );
      }

      onClose();
      navigate(result.route);
    },
    [
      navigate,
      onClose,
      query,
      recentSearches,
    ],
  );

  const handleRecentSearch = (
    recentQuery: string,
  ) => {
    setQuery(recentQuery);
    setFilters(initialFilters);
  };

  const handleQuickAction = (
    action: QuickAction,
  ) => {
    onClose();
    navigate(action.route);
  };

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (
      event: KeyboardEvent,
    ) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (
        event.key === "ArrowDown"
      ) {
        event.preventDefault();

        if (flatResultCount > 0) {
          setActiveIndex(
            (current) =>
              (current + 1) %
              flatResultCount,
          );
        }

        return;
      }

      if (
        event.key === "ArrowUp"
      ) {
        event.preventDefault();

        if (flatResultCount > 0) {
          setActiveIndex(
            (current) =>
              (current - 1 +
                flatResultCount) %
              flatResultCount,
          );
        }

        return;
      }

      if (
        event.key === "Enter" &&
        flatResultCount > 0
      ) {
        event.preventDefault();

        const result =
          results[activeIndex];

        if (result) {
          handleOpenResult(
            result,
          );
        }
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [
    activeIndex,
    flatResultCount,
    handleOpenResult,
    onClose,
    open,
    results,
  ]);

  useEffect(() => {
    if (!open) {
      setQuery("");
      setFilters(initialFilters);
      setResults([]);
      setActiveIndex(0);
    }
  }, [open]);

  const visibleActions =
    useMemo(() => {
      if (!query.trim()) {
        return quickActions;
      }

      const normalized =
        query.trim().toLowerCase();

      return quickActions.filter(
        (action) =>
          action.title
            .toLowerCase()
            .includes(normalized) ||
          action.description
            .toLowerCase()
            .includes(normalized),
      );
    }, [query, quickActions]);

  if (!open) {
    return null;
  }

  return (
    <CommandPalette
      query={query}
      filters={filters}
      results={
        query.trim()
          ? results
          : []
      }
      recentSearches={
        query.trim()
          ? []
          : recentSearches
      }
      quickActions={
        query.trim()
          ? visibleActions
          : quickActions
      }
      activeIndex={activeIndex}
      inputRef={inputRef}
      onQueryChange={setQuery}
      onFiltersChange={
        setFilters
      }
      onSelectResult={
        handleOpenResult
      }
      onSelectRecent={
        handleRecentSearch
      }
      onSelectAction={
        handleQuickAction
      }
      onClose={onClose}
    />
  );
}