/**
 * Overview Module Mutations
 * 
 * GraphQL mutations for the overview/proxies module
 */

import { gql } from '../../utils/gql';

/**
 * Example: Create proxy mutation
 * 
 * Replace with your actual schema
 */
export const CREATE_PROXY_MUTATION = gql`
  mutation CreateProxy($input: CreateProxyInput!) {
    createProxy(input: $input) {
      id
      title
      price
      unit
      type
      status
      createdAt
    }
  }
`;

/**
 * Example: Update proxy mutation
 */
export const UPDATE_PROXY_MUTATION = gql`
  mutation UpdateProxy($id: ID!, $input: UpdateProxyInput!) {
    updateProxy(id: $id, input: $input) {
      id
      title
      price
      unit
      type
      status
      updatedAt
    }
  }
`;

/**
 * Example: Delete proxy mutation
 */
export const DELETE_PROXY_MUTATION = gql`
  mutation DeleteProxy($id: ID!) {
    deleteProxy(id: $id) {
      success
      message
    }
  }
`;

/**
 * Example: Bulk delete proxies mutation
 */
export const BULK_DELETE_PROXIES_MUTATION = gql`
  mutation BulkDeleteProxies($ids: [ID!]!) {
    bulkDeleteProxies(ids: $ids) {
      success
      message
      deletedCount
    }
  }
`;

