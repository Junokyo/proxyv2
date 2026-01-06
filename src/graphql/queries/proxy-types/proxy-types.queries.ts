import { gql } from '../../utils/gql';

// Get Proxy Types Query
export const GET_PROXY_TYPES_QUERY = gql`
  query ProxyTypes(
    $filter: FilterRequest
    $sorts: [Sort!]
    $pagination: PaginationInput
    $searchQuery: String
  ) {
    proxyTypes(
      filter: $filter
      sorts: $sorts
      pagination: $pagination
      searchQuery: $searchQuery
    ) {
      items {
        id
        name
        type
      }
      totalCount
    }
  }
`;

