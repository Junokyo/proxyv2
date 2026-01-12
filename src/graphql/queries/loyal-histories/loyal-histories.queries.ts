import { gql } from '../../utils/gql';

// Get Loyal Histories Query
export const GET_LOYAL_HISTORIES_QUERY = gql`
  query LoyalHistories(
    $userId: String
    $filter: FilterRequest
    $sorts: [Sort!]
    $pagination: PaginationInput
    $searchQuery: String
  ) {
    loyalHistories(
      userId: $userId
      filter: $filter
      sorts: $sorts
      pagination: $pagination
      searchQuery: $searchQuery
    ) {
      items {
        id
        userId
        loyalLevelId
        coin
        dateInput
      }
      totalCount
    }
  }
`;
