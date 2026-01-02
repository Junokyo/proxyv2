import { gql } from '../../utils/gql';

// Get Loyals Query
export const GET_LOYALS_QUERY = gql`
  query Loyals(
    $filter: FilterRequest
    $sorts: [Sort!]
    $pagination: PaginationInput
    $searchQuery: String
  ) {
    loyals(
      filter: $filter
      sorts: $sorts
      pagination: $pagination
      searchQuery: $searchQuery
    ) {
      items {
        id
        name
        value
      }
      totalCount
    }
  }
`;

