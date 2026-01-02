import { gql } from '../../utils/gql';

// Get Promotions Query
export const GET_PROMOTIONS_QUERY = gql`
  query Promotions(
    $filter: FilterRequest
    $sorts: [Sort!]
    $pagination: PaginationInput
    $searchQuery: String
  ) {
    promotions(
      filter: $filter
      sorts: $sorts
      pagination: $pagination
      searchQuery: $searchQuery
    ) {
      items {
        id
        name
        type
        max
        percent
        fromDate
        toDate
      }
      totalCount
    }
  }
`;

