import { Response } from '../interfaces/base/response.interface';

/**
 * Transaction Types Enum
 */
export enum TransactionType {
  DEPOSIT = 1,
  WITHDRAW = 2,
  PROMOTION = 3,
  PURCHASE = 4,
  REFUND = 5,
  ADJUSTMENT = 6,
}

/**
 * Transaction Type Labels
 */
export const TRANSACTION_TYPE_LABELS: Record<TransactionType, string> = {
  [TransactionType.DEPOSIT]: 'Nạp tiền',
  [TransactionType.WITHDRAW]: 'Rút tiền',
  [TransactionType.PROMOTION]: 'Khuyến mãi',
  [TransactionType.PURCHASE]: 'Mua hàng',
  [TransactionType.REFUND]: 'Hoàn tiền',
  [TransactionType.ADJUSTMENT]: 'Điều chỉnh',
};

/**
 * Wallet Transaction Item
 */
export interface WalletTransactionItem {
  id: string;
  walletId: string;
  coin: number;
  type: TransactionType;
  description?: string;
  balanceAfter: number;
  reference?: string;
  dateInput: string;
}

/**
 * Wallet Transaction Stats
 */
export interface WalletTransactionStats {
  walletId: string;
  totalDeposited: number;
  totalWithdrawn: number;
  totalPromotions: number;
  transactionCount: number;
}

/**
 * Wallet Transaction Stats Response
 */
export interface WalletTransactionStatsResponse {
  walletTransactionStats: WalletTransactionStats;
}

/**
 * Wallet Transaction Stats Variables
 */
export interface WalletTransactionStatsVariables {
  walletId: string;
}

/**
 * Wallet Transactions Response
 */
export interface WalletTransactionsResponse {
  walletTransactions: Response<WalletTransactionItem>;
}

/**
 * Wallet Transactions Variables
 */
export interface WalletTransactionsVariables {
  walletId?: string;
  filter?: Record<string, unknown>;
  sorts?: Array<{ field: string; order: string }>;
  pagination?: {
    page: number;
    limit: number;
  };
  searchQuery?: string;
}

/**
 * Single Wallet Transaction Response
 */
export interface WalletTransactionResponse {
  walletTransaction: WalletTransactionItem;
}

/**
 * Single Wallet Transaction Variables
 */
export interface WalletTransactionVariables {
  id: string;
}

