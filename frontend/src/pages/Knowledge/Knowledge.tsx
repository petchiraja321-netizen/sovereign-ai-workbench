import { useMemo, useState } from "react";

import "./Knowledge.css";

import { KnowledgeHeader } from "./components/KnowledgeHeader";
import { KnowledgeStats } from "./components/KnowledgeStats";
import { KnowledgeToolbar } from "./components/KnowledgeToolbar";
import { KnowledgeFilters } from "./components/KnowledgeFilters";
import { KnowledgeUpload } from "./components/KnowledgeUpload";
import { KnowledgeTable } from "./components/KnowledgeTable";
import { KnowledgeDetails } from "./components/KnowledgeDetails";

import {
  knowledgeStats,
  mockKnowledgeDocuments,
} from "../../data/mockData";

import type {
  KnowledgeDocument,
  KnowledgeDocumentStatus,
  KnowledgeFileType,
  KnowledgeFilterState,
} from "../../types/knowledge";

export function Knowledge() {
  const [filters, setFilters] =
    useState<KnowledgeFilterState>({
      search: "",
      status: "all",
      fileType: "all",
      sortBy: "updatedAt",
      sortOrder: "desc",
    });

  const [viewMode, setViewMode] =
    useState<"list" | "grid">("list");

  const [filtersOpen, setFiltersOpen] =
    useState(false);

  const [uploadOpen, setUploadOpen] =
    useState(false);

  const [selectedDocument, setSelectedDocument] =
    useState<KnowledgeDocument | null>(null);

  const filteredDocuments = useMemo(() => {
    const normalizedSearch =
      filters.search.trim().toLowerCase();

    const result =
      mockKnowledgeDocuments.filter(
        (document) => {
          const matchesSearch =
            normalizedSearch.length === 0 ||
            document.name
              .toLowerCase()
              .includes(normalizedSearch) ||
            document.description
              .toLowerCase()
              .includes(normalizedSearch);

          const matchesFileType =
            filters.fileType === "all" ||
            document.type ===
              filters.fileType;

          const matchesStatus =
            filters.status === "all" ||
            document.status ===
              filters.status;

          return (
            matchesSearch &&
            matchesFileType &&
            matchesStatus
          );
        },
      );

    result.sort((a, b) => {
      let comparison = 0;

      switch (filters.sortBy) {
        case "name":
          comparison =
            a.name.localeCompare(b.name);
          break;

        case "updatedAt":
          comparison =
            a.updatedAt.localeCompare(
              b.updatedAt,
            );
          break;

        case "size":
          comparison =
            parseFileSize(a.size) -
            parseFileSize(b.size);
          break;

        case "chunks":
          comparison =
            (a.chunks ?? 0) -
            (b.chunks ?? 0);
          break;

        default:
          comparison = 0;
      }

      return filters.sortOrder === "asc"
        ? comparison
        : -comparison;
    });

    return result;
  }, [filters]);

  const handleSearchChange = (
    value: string,
  ) => {
    setFilters((current) => ({
      ...current,
      search: value,
    }));
  };

  const handleFileTypeChange = (
    fileType:
      | KnowledgeFileType
      | "all",
  ) => {
    setFilters((current) => ({
      ...current,
      fileType,
    }));
  };

  const handleStatusChange = (
    status:
      | KnowledgeDocumentStatus
      | "all",
  ) => {
    setFilters((current) => ({
      ...current,
      status,
    }));
  };

  const handleSort = () => {
    setFilters((current) => {
      if (current.sortBy !== "name") {
        return {
          ...current,
          sortBy: "name",
          sortOrder: "asc",
        };
      }

      return {
        ...current,
        sortBy: "updatedAt",
        sortOrder: "desc",
      };
    });
  };

  const handleUpload = () => {
    setUploadOpen(true);
  };

  const handleCloseUpload = () => {
    setUploadOpen(false);
  };

  const handleViewDocument = (
    document: KnowledgeDocument,
  ) => {
    setSelectedDocument(document);
  };

  const handleCloseDetails = () => {
    setSelectedDocument(null);
  };

  const handleProcessDocument = (
    document: KnowledgeDocument,
  ) => {
    setSelectedDocument(document);
  };

  const handleReindexDocument = (
    document: KnowledgeDocument,
  ) => {
    setSelectedDocument(document);
  };

  const handleDownloadDocument = (
    document: KnowledgeDocument,
  ) => {
    console.info(
      "Download requested:",
      document.name,
    );
  };

  const handleRemoveDocument = (
    document: KnowledgeDocument,
  ) => {
    const confirmed =
      window.confirm(
        `Remove "${document.name}" from the knowledge base?`,
      );

    if (!confirmed) {
      return;
    }

    console.info(
      "Remove requested:",
      document.name,
    );
  };

  return (
    <main className="knowledge-page">
      <div className="knowledge-page__container">
        <KnowledgeHeader
          onUpload={handleUpload}
        />

        <KnowledgeUpload
          open={uploadOpen}
          onClose={handleCloseUpload}
        />

        <KnowledgeStats
          stats={knowledgeStats}
        />

        <KnowledgeToolbar
          search={filters.search}
          onSearchChange={
            handleSearchChange
          }
          viewMode={viewMode}
          onViewModeChange={
            setViewMode
          }
          onFilterClick={() =>
            setFiltersOpen(
              (current) => !current,
            )
          }
          onSortClick={handleSort}
          resultCount={
            filteredDocuments.length
          }
        />

        <KnowledgeFilters
          open={filtersOpen}
          onClose={() =>
            setFiltersOpen(false)
          }
          fileType={filters.fileType}
          status={filters.status}
          onFileTypeChange={
            handleFileTypeChange
          }
          onStatusChange={
            handleStatusChange
          }
        />

        <KnowledgeTable
          documents={filteredDocuments}
          onDocumentClick={
            handleViewDocument
          }
          onView={
            handleViewDocument
          }
          onProcess={
            handleProcessDocument
          }
          onReindex={
            handleReindexDocument
          }
          onDownload={
            handleDownloadDocument
          }
          onRemove={
            handleRemoveDocument
          }
        />
      </div>

      <KnowledgeDetails
        document={selectedDocument}
        onClose={handleCloseDetails}
      />
    </main>
  );
}

function parseFileSize(
  value: string,
): number {
  const match = value
    .trim()
    .match(
      /^([\d.]+)\s*(KB|MB|GB|TB)$/i,
    );

  if (!match) {
    return 0;
  }

  const amount = Number(match[1]);

  const unit =
    match[2].toUpperCase();

  switch (unit) {
    case "KB":
      return amount / 1024;

    case "GB":
      return amount * 1024;

    case "TB":
      return amount * 1024 * 1024;

    case "MB":
    default:
      return amount;
  }
}