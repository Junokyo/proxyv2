import { gql } from '../../utils/gql';

// Create User Mutation
export const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      providerId
      username
      email
      balance
      roles
      lastLogin
      createdAt
      updatedAt
      phone
      avatarUrl
      loyalLevelId
      active
    }
  }
`;

// Update User Mutation
export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      id
      providerId
      username
      email
      balance
      roles
      lastLogin
      createdAt
      updatedAt
      phone
      avatarUrl
      loyalLevelId
      active
    }
  }
`;

// Delete User Mutation
export const DELETE_USER_MUTATION = gql`
  mutation DeleteUser($id: String!) {
    deleteUser(id: $id)
  }
`;

