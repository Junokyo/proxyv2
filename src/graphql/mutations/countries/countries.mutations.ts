import { gql } from '../../utils/gql';

// Create Country Mutation
export const CREATE_COUNTRY_MUTATION = gql`
  mutation CreateCountry($input: CreateCountryInput!) {
    createCountry(input: $input) {
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
  }
`;

// Update Country Mutation
export const UPDATE_COUNTRY_MUTATION = gql`
  mutation UpdateCountry($id: ID!, $input: UpdateCountryInput!) {
    updateCountry(id: $id, input: $input) {
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
  }
`;

// Delete Country Mutation
export const DELETE_COUNTRY_MUTATION = gql`
  mutation DeleteCountry($id: ID!) {
    deleteCountry(id: $id) {
      success
      message
    }
  }
`;

// Bulk Delete Countries Mutation
export const BULK_DELETE_COUNTRIES_MUTATION = gql`
  mutation BulkDeleteCountries($ids: [ID!]!) {
    bulkDeleteCountries(ids: $ids) {
      success
      message
      deletedCount
    }
  }
`;

