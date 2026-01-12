import { gql } from '../../utils/gql';

// Create Loyal History Mutation
export const CREATE_LOYAL_HISTORY_MUTATION = gql`
  mutation CreateLoyalHistory($userId: String!, $loyalLevelId: String!, $coin: Float!) {
    createLoyalHistory(userId: $userId, loyalLevelId: $loyalLevelId, coin: $coin) {
      id
      userId
      loyalLevelId
      coin
      dateInput
    }
  }
`;

// Update Loyal History Mutation
export const UPDATE_LOYAL_HISTORY_MUTATION = gql`
  mutation UpdateLoyalHistory($id: String!, $loyalLevelId: String, $coin: Float) {
    updateLoyalHistory(id: $id, loyalLevelId: $loyalLevelId, coin: $coin) {
      id
      userId
      loyalLevelId
      coin
      dateInput
    }
  }
`;

// Delete Loyal History Mutation
export const DELETE_LOYAL_HISTORY_MUTATION = gql`
  mutation DeleteLoyalHistory($id: String!) {
    deleteLoyalHistory(id: $id)
  }
`;

