/**
 * Overview Module Queries
 * 
 * GraphQL queries for the overview/proxies module
 */

import { gql } from '../../utils/gql';

/**
 * Example: Get proxies list query
 * 
 * Replace with your actual schema
 */
export const GET_PROXIES_QUERY = gql`
  query GetProxies($pagination: PaginationInput, $filter: ProxyFilterInput) {
    proxies(pagination: $pagination, filter: $filter) {
      id
      title
      price
      unit
      type
      status
      createdAt
      updatedAt
    }
  }
`;

/**
 * Example: Get proxy by ID query
 */
export const GET_PROXY_BY_ID_QUERY = gql`
  query GetProxyById($id: ID!) {
    proxy(id: $id) {
      id
      title
      price
      unit
      type
      status
      description
      createdAt
      updatedAt
    }
  }
`;

/**
 * Example: Get proxies statistics query
 */
export const GET_PROXIES_STATS_QUERY = gql`
  query GetProxiesStats {
    proxiesStats {
      total
      active
      inactive
      byType {
        type
        count
      }
    }
  }
`;

