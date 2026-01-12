import { gql } from '../../utils/gql';

// Create Order Mutation
export const CREATE_ORDER_MUTATION = gql`
  mutation CreateOrder($userId: String!, $sum: Float!) {
    createOrder(userId: $userId, sum: $sum) {
      id
      userId
      sum
      dateOrder
      createdAt
      updatedAt
    }
  }
`;

// Update Order Mutation
export const UPDATE_ORDER_MUTATION = gql`
  mutation UpdateOrder($id: String!, $sum: Float!) {
    updateOrder(id: $id, sum: $sum) {
      id
      userId
      sum
      dateOrder
      createdAt
      updatedAt
    }
  }
`;

// Delete Order Mutation
export const DELETE_ORDER_MUTATION = gql`
  mutation DeleteOrder($id: String!) {
    deleteOrder(id: $id)
  }
`;

