import { gql } from '../../utils/gql';

// Get Wallet Transaction Stats Query
export const GET_WALLET_TRANSACTION_STATS = gql`
  query WalletTransactionStats($walletId: String!) {
    walletTransactionStats(walletId: $walletId) {
      walletId
      totalDeposited
      totalWithdrawn
      totalPromotions
      transactionCount
    }
  }
`;

// Get Wallet Transactions Query
export const GET_WALLET_TRANSACTIONS = gql`
  query WalletTransactions(
    $walletId: String
    $filter: FilterRequest
    $sorts: [Sort!]
    $pagination: PaginationInput
    $searchQuery: String
  ) {
    walletTransactions(
      walletId: $walletId
      filter: $filter
      sorts: $sorts
      pagination: $pagination
      searchQuery: $searchQuery
    ) {
      totalCount
      items {
        id
        walletId
        type
        description
        balanceAfter
        reference
        dateInput
      }
    }
  }
`;

// Get Single Wallet Transaction Query
export const GET_WALLET_TRANSACTION = gql`
  query WalletTransaction($id: String!) {
    walletTransaction(id: $id) {
      id
      walletId
      type
      description
      balanceAfter
      reference
      dateInput
    }
  }
`;
