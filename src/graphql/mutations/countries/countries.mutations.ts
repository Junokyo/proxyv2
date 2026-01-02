import { gql } from '../../utils/gql';

// Create Country Mutation
export const CREATE_COUNTRY_MUTATION = gql`
  mutation CreateCountry($input: CreateCountryInput!) {
    createCountry(input: $input) {
      id
      code
      name
      flag
    }
  }
`;

// Update Country Mutation
export const UPDATE_COUNTRY_MUTATION = gql`
  mutation UpdateCountry($input: UpdateCountryInput!) {
    updateCountry(input: $input) {
      id
      code
      name
      flag
    }
  }
`;

// Delete Country Mutation
export const DELETE_COUNTRY_MUTATION = gql`
  mutation DeleteCountry($id: ID!) {
    deleteCountry(id: $id)
  }
`;
