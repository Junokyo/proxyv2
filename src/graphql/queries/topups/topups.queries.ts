import { gql } from '../../utils/gql';

// Get Topups Query
export const GET_TOPUPS_QUERY = gql`
  query Topups(
    $filter: FilterRequest
    $sorts: [Sort!]
    $pagination: PaginationInput
    $searchQuery: String
  ) {
    topups(
      filter: $filter
      sorts: $sorts
      pagination: $pagination
      searchQuery: $searchQuery
    ) {
      items {
        id
        name
        max
        percent
      }
      totalCount
    }
  }
`;

