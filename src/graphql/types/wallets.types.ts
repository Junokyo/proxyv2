/**
 * Wallets GraphQL Types
 *
 * TypeScript interfaces for Wallets module GraphQL operations
 */

import { Response } from '../interfaces/base/response.interface';

// Wallets specific types
export interface WalletItem {
  id: string;
  userId: string;
  coin: number;
  promotion: number;
  createdAt: string;
  updatedAt: string;
  active: boolean;
}

export interface WalletsResponse {
  wallets: Response<WalletItem>;
}

// CRUD Operations
export interface CreateWalletInput {
  userId: string;
  coin?: number;
  promotion?: number;
  active?: boolean;
}

export interface UpdateWalletBalanceInput {
  walletId: string;
  amount: number;
  balanceType: string;
}

export interface UpdateWalletInput {
  id: string; // ID bắt buộc trong input cho mutation
  userId?: string;
  coin?: number;
  promotion?: number;
  active?: boolean;
}

// Input type cho hook (không có id, vì id được truyền riêng)
export interface UpdateWalletInputWithoutId {
  userId?: string;
  coin?: number;
  promotion?: number;
  active?: boolean;
}

export interface CreateWalletVariables {
  input: CreateWalletInput;
}

export interface UpdateWalletBalanceVariables {
  input: UpdateWalletBalanceInput;
}

export interface UpdateWalletVariables {
  input: UpdateWalletInput;
}

export interface DeleteWalletVariables {
  id: string;
}

export interface WalletMutationResponse {
  id: string;
  userId: string;
  coin: number;
  promotion: number;
  createdAt: string;
  updatedAt: string;
  active: boolean;
}

// Statistics
export interface WalletsStatisticsResponse {
  walletsStatistics: {
    totalWallets: number;
    totalActiveWallets: number;
    totalCoins: number;
    totalPromotions: number;
  };
}

// Lazy query types
export interface GetWalletByIdVariables {
  id: string;
}

export interface GetWalletByIdResponse {
  wallet: WalletMutationResponse;
}
