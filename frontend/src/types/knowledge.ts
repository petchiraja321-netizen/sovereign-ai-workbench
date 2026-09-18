export type KnowledgeFileType =
  | "PDF"
  | "DOCX"
  | "XLSX"
  | "TXT"
  | "CSV"
  | "PPTX";

export type KnowledgeDocumentStatus =
  | "indexed"
  | "processing"
  | "extracting"
  | "chunking"
  | "embedding"
  | "failed"
  | "pending";

export type KnowledgeIndexStatus =
  | "indexed"
  | "indexing"
  | "not-indexed"
  | "failed";

export interface KnowledgeDocument {
  id: string;
  name: string;
  type: KnowledgeFileType;
  size: string;
  status: KnowledgeDocumentStatus;
  indexStatus: KnowledgeIndexStatus;
  chunks: number | null;
  updatedAt: string;
  uploadedAt: string;
  storagePath: string;
  description: string;
  processingProgress: number;
  extractedText: boolean;
  embedded: boolean;
  vectorIndexed: boolean;
}

export interface KnowledgeStats {
  documents: number;
  indexed: number;
  processing: number;
  storage: string;
}

export interface KnowledgeFilterState {
  search: string;
  status: KnowledgeDocumentStatus | "all";
  fileType: KnowledgeFileType | "all";
  sortBy: "name" | "updatedAt" | "size" | "chunks";
  sortOrder: "asc" | "desc";
}

export interface KnowledgeProcessingStage {
  id: string;
  label: string;
  status:
    | "completed"
    | "running"
    | "pending"
    | "failed";
  progress: number;
}