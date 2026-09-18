import type { KnowledgeDocument } from "../types/knowledge";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "/api";

export interface KnowledgeUploadResponse {
  documents: KnowledgeDocument[];
  message: string;
}

export interface KnowledgeApiResponse<T> {
  data: T;
  message?: string;
}

async function apiRequest<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(
    `${API_BASE_URL}${endpoint}`,
    {
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers || {}),
      },
      ...options,
    },
  );

  if (!response.ok) {
    throw new Error(
      `Knowledge API request failed: ${response.status}`,
    );
  }

  return response.json();
}

/**
 * Fetch all knowledge documents.
 *
 * Backend:
 * GET /api/knowledge/documents
 */
export async function getKnowledgeDocuments(): Promise<
  KnowledgeDocument[]
> {
  return apiRequest<KnowledgeDocument[]>(
    "/knowledge/documents",
  );
}

/**
 * Fetch one knowledge document.
 *
 * Backend:
 * GET /api/knowledge/documents/:id
 */
export async function getKnowledgeDocument(
  documentId: string,
): Promise<KnowledgeDocument> {
  return apiRequest<KnowledgeDocument>(
    `/knowledge/documents/${documentId}`,
  );
}

/**
 * Upload knowledge documents.
 *
 * Backend:
 * POST /api/knowledge/documents
 *
 * NOTE:
 * The real multipart implementation will be connected
 * when the Spring Boot upload endpoint is available.
 */
export async function uploadKnowledgeDocuments(
  files: File[],
): Promise<KnowledgeUploadResponse> {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("files", file);
  });

  const response = await fetch(
    `${API_BASE_URL}/knowledge/documents`,
    {
      method: "POST",
      body: formData,
    },
  );

  if (!response.ok) {
    throw new Error(
      `Knowledge upload failed: ${response.status}`,
    );
  }

  return response.json();
}

/**
 * Start document processing.
 *
 * Backend:
 * POST /api/knowledge/documents/:id/process
 */
export async function processKnowledgeDocument(
  documentId: string,
): Promise<KnowledgeDocument> {
  return apiRequest<KnowledgeDocument>(
    `/knowledge/documents/${documentId}/process`,
    {
      method: "POST",
    },
  );
}

/**
 * Re-index a knowledge document.
 *
 * Backend:
 * POST /api/knowledge/documents/:id/reindex
 */
export async function reindexKnowledgeDocument(
  documentId: string,
): Promise<KnowledgeDocument> {
  return apiRequest<KnowledgeDocument>(
    `/knowledge/documents/${documentId}/reindex`,
    {
      method: "POST",
    },
  );
}

/**
 * Delete a knowledge document.
 *
 * Backend:
 * DELETE /api/knowledge/documents/:id
 */
export async function deleteKnowledgeDocument(
  documentId: string,
): Promise<void> {
  await apiRequest<void>(
    `/knowledge/documents/${documentId}`,
    {
      method: "DELETE",
    },
  );
}