import { gql } from '../../utils/gql';

// Create Wallet Mutation
export const CREATE_WALLET_MUTATION = gql`
  mutation CreateWallet($input: CreateWalletInput!) {
    createWallet(input: $input) {
      id
      userId
      coin
      promotion
      createdAt
      updatedAt
      active
    }
  }
`;

// Update Wallet Balance Mutation
export const UPDATE_WALLET_BALANCE_MUTATION = gql`
  mutation UpdateWalletBalance($input: UpdateWalletBalanceInput!) {
    updateWalletBalance(input: $input) {
      id
      userId
      coin
      promotion
      createdAt
      updatedAt
      active
    }
  }
`;
