import { gql } from '../../utils/gql';

// Get Users Query
export const GET_USERS_QUERY = gql`
  query Users(
    $filter: FilterRequest
    $sorts: [Sort!]
    $pagination: PaginationInput
    $searchQuery: String
  ) {
    users(
      filter: $filter
      sorts: $sorts
      pagination: $pagination
      searchQuery: $searchQuery
    ) {
      items {
        id
        providerId
        username
        email
        roles
        lastLogin
        createdAt
        updatedAt
        phone
        avatarUrl
        loyalLevelId
        active
      }
      totalCount
    }
  }
`;

// Get User by ID Query
export const GET_USER_BY_ID = gql`
  query User($id: String!) {
    user(id: $id) {
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

// Get Profile Query
export const GET_PROFILE_QUERY = gql`
  query Profile {
    profile {
      id
      providerId
      username
      email
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