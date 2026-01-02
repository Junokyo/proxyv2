export interface Response<T> {
  items: T[];
  totalCount: number;
  meta?: Meta;
}

export interface Meta {
  pagination?: Pagination;
  filteredCount?: number;
  responseTimeMs?: number;
  requestId?: string;
}
export interface Pagination {
  totalItems: number;
  currentPage: number;
  totalPages: number;
  nextPageToken?: string;
  prevPageToken?: string;
}
