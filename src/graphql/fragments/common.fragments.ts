/**
 * Common GraphQL Fragments
 * 
 * Reusable fragments that can be shared across queries
 */

import { gql } from '../utils/gql';

/**
 * Common fields for pagination info
 */
export const PAGINATION_INFO_FRAGMENT = gql`
  fragment PaginationInfo on PaginationInfo {
    page
    pageSize
    totalPages
    totalItems
    hasNextPage
    hasPreviousPage
  }
`;

/**
 * Common fields for error response
 */
export const ERROR_FRAGMENT = gql`
  fragment ErrorInfo on Error {
    message
    code
    field
  }
`;

