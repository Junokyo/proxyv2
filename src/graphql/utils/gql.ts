/**
 * GraphQL Utilities
 * 
 * Helper functions for working with GraphQL queries and mutations
 */

import { DocumentNode, gql as apolloGql } from '@apollo/client';

/**
 * Typed gql helper that ensures proper TypeScript support
 * Use this instead of importing gql directly from @apollo/client
 */
export const gql = apolloGql;

/**
 * Helper to combine multiple GraphQL documents
 */
export function combineDocuments(...documents: DocumentNode[]): DocumentNode {
  return gql`
    ${documents.map((doc) => doc.loc?.source.body).join('\n')}
  `;
}

/**
 * Extract operation name from a GraphQL document
 */
export function getOperationName(document: DocumentNode): string | null {
  if (!document.definitions || document.definitions.length === 0) {
    return null;
  }

  const definition = document.definitions[0];
  if ('name' in definition && definition.name) {
    return definition.name.value;
  }

  return null;
}

