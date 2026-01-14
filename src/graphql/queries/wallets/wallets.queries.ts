import { gql } from '../../utils/gql';

// Get Wallets Query
export const GET_WALLETS_QUERY = gql`
  query Wallets(
    $filter: FilterRequest
    $sorts: [Sort!]
    $pagination: PaginationInput
    $searchQuery: String
  ) {
    wallets(
      filter: $filter
      sorts: $sorts
      pagination: $pagination
      searchQuery: $searchQuery
    ) {
      items {
        id
        userId
        coin
        promotion
        createdAt
        updatedAt
        active
      }
      totalCount
    }
  }
`;

// Get Wallet by ID Query
export const GET_WALLET_BY_ID = gql`
  query Wallet($id: ID!) {
    wallet(id: $id) {
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

// Get Wallet Stats Query
export const GET_WALLET_STATS_QUERY = gql`
  query WalletStats($userId: String!) {
    walletStats(userId: $userId) {
      userId
      currentBalance
      totalDeposited
      totalSpent
      totalPromotion
    }
  }
`;