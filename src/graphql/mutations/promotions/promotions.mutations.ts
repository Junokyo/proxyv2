import { gql } from '../../utils/gql';

// Create Promotion Mutation
export const CREATE_PROMOTION_MUTATION = gql`
  mutation CreatePromotion($input: CreatePromotionInput!) {
    createPromotion(input: $input) {
      id
      name
      type
      max
      percent
      fromDate
      toDate
    }
  }
`;

// Update Promotion Mutation
export const UPDATE_PROMOTION_MUTATION = gql`
  mutation UpdatePromotion($input: UpdatePromotionInput!) {
    updatePromotion(input: $input) {
      id
      name
      type
      max
      percent
      fromDate
      toDate
    }
  }
`;

// Delete Promotion Mutation
export const DELETE_PROMOTION_MUTATION = gql`
  mutation DeletePromotion($id: String!) {
    deletePromotion(id: $id)
  }
`;

