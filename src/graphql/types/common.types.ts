/**
 * Common GraphQL Types
 * 
 * Shared TypeScript types for GraphQL operations
 */

/**
 * Pagination input
 */
export interface PaginationInput {
  page?: number;
  pageSize?: number;
}

/**
 * Pagination info
 */
export interface PaginationInfo {
  page: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

/**
 * Sort order
 */
export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

/**
 * Sort input
 */
export interface SortInput<T extends string = string> {
  field: T;
  order: SortOrder;
}

/**
 * GraphQL error
 */
export interface GraphQLErrorType {
  message: string;
  code?: string;
  field?: string;
  extensions?: Record<string, unknown>;
}

/**
 * Base response with pagination
 */
export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationInfo;
}

/**
 * Base response with errors
 */
export interface ResponseWithErrors<T> {
  data?: T;
  errors?: GraphQLErrorType[];
}

