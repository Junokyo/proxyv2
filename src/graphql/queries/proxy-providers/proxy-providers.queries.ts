import { gql } from '../../utils/gql';

// Get Proxy Providers Query
export const GET_PROXY_PROVIDERS_QUERY = gql`
  query ProxyProviders(
    $filter: FilterRequest
    $sorts: [Sort!]
    $pagination: PaginationInput
    $searchQuery: String
  ) {
    proxyProviders(
      filter: $filter
      sorts: $sorts
      pagination: $pagination
      searchQuery: $searchQuery
    ) {
      items {
        id
        name
        server
        apiKey
        userName
        password
        apiType
      }
      totalCount
    }
  }
`;

