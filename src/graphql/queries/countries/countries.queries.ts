import { gql } from '../../utils/gql';

// Get Countries Query
export const GET_COUNTRIES_QUERY = gql`
  query Countries(
    $filter: FilterRequest
    $sorts: [Sort!]
    $pagination: PaginationInput
    $searchQuery: String
  ) {
    countries(
      filter: $filter
      sorts: $sorts
      pagination: $pagination
      searchQuery: $searchQuery
    ) {
      items {
        id
        name
        code
        flag
      }
      totalCount
    }
  }
`;

// Get Country by ID Query
export const GET_COUNTRY_BY_ID = gql`
  query Country {
    country(id: null) {
      id
      code
      name
      flag
    }
  }
`;
