export type SearchResultType =
  | "TASK"
  | "FILE"
  | "EVIDENCE"
  | "DELIVERABLE"
  | "APPROVAL"
  | "SECURITY"
  | "AUDIT"
  | "NOTIFICATION"
  | "SETTING";

export interface SearchResult {
  id: string;
  title: string;
  description?: string;
  type: SearchResultType;
  status?: string;
  resourceId?: string;
  route?: string;
}

export interface SearchFilters {
  type: SearchResultType | "ALL";
  status: string;
}

export interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: string;
  route: string;
}

export interface RecentSearch {
  id: string;
  query: string;
}