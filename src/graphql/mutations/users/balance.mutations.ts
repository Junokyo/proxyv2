import { gql } from '../../utils/gql';

// Add Balance Mutation
export const ADD_BALANCE_MUTATION = gql`
  mutation AddBalance($input: AddBalanceInput!) {
    addBalance(input: $input) {
      userId
      previousBalance
      amount
      newBalance
      transactionType
    }
  }
`;

// Deduct Balance Mutation
export const DEDUCT_BALANCE_MUTATION = gql`
  mutation DeductBalance($input: DeductBalanceInput!) {
    deductBalance(input: $input) {
      userId
      previousBalance
      amount
      newBalance
      transactionType
    }
  }
`;

