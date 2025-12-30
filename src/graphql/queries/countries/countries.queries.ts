import { gql } from '../../utils/gql';

// Country Fields Fragment
export const COUNTRY_FIELDS_FRAGMENT = gql`
  fragment CountryFields on Country {
    id
    name
    code
    continent
    region
    status
    createdAt
    proxyCount
    ipCount
  }
`;

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
      }
      totalCount
      # meta{
      #   filteredCount
      #   requestId
      #   pagination {
      #     nextPageToken
      #     prevPageToken
      #   }
      # }
    }
  }
`;

// Get Country by ID Query
export const GET_COUNTRY_BY_ID_QUERY = gql`
  ${COUNTRY_FIELDS_FRAGMENT}
  query GetCountryById($id: ID!) {
    country(id: $id) {
      ...CountryFields
    }
  }
`;

// Get Countries Statistics Query
export const GET_COUNTRIES_STATISTICS_QUERY = gql`
  query GetCountriesStatistics {
    countriesStatistics {
      totalCountries
      totalActiveCountries
      totalProxies
      totalIPs
    }
  }
`;

