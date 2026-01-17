/**
 * Bank Accounts GraphQL Types
 *
 * TypeScript interfaces for Bank Accounts module GraphQL operations
 */

import { Response } from '../interfaces/base/response.interface';
import { BaseFilterOptions } from '../interfaces/base/filter-option.interface';

// Bank Account specific types
export interface BankAccountItem {
  id: string;
  bankCode: string;
  bankName: string;
  bankLogoUrl: string | null;
  apiType: string;
  accountNumber: string;
  accountName: string;
  branch: string | null;
  active: boolean;
  isDefault: boolean;
  note: string | null;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface BankAccountsResponse {
  bankAccounts: Response<BankAccountItem>;
}

// Filter options for bank accounts query (extends BaseFilterOptions with bankCode and activeOnly)
export interface BankAccountsFilterOptions extends BaseFilterOptions {
  bankCode?: string;
  activeOnly?: boolean;
}

// CRUD Operations
export interface CreateBankAccountInput {
  bankCode: string;
  bankName: string;
  bankLogoUrl?: string | null;
  apiType?: string | null;
  accountNumber: string;
  accountName: string;
  branch?: string | null;
  isDefault?: boolean | null;
  note?: string | null;
  sortOrder?: number | null;
}

export interface UpdateBankAccountInput {
  id: string; // ID bắt buộc trong input cho mutation
  bankCode?: string | null;
  bankName?: string | null;
  bankLogoUrl?: string | null;
  apiType?: string | null;
  accountNumber?: string | null;
  accountName?: string | null;
  branch?: string | null;
  active?: boolean | null;
  isDefault?: boolean | null;
  note?: string | null;
  sortOrder?: number | null;
}

// Input type cho hook (không có id, vì id được truyền riêng)
export interface UpdateBankAccountInputWithoutId {
  bankCode?: string | null;
  bankName?: string | null;
  bankLogoUrl?: string | null;
  apiType?: string | null;
  accountNumber?: string | null;
  accountName?: string | null;
  branch?: string | null;
  active?: boolean | null;
  isDefault?: boolean | null;
  note?: string | null;
  sortOrder?: number | null;
}

export interface CreateBankAccountVariables {
  input: CreateBankAccountInput;
}

export interface UpdateBankAccountVariables {
  input: UpdateBankAccountInput;
}

export interface DeleteBankAccountVariables {
  id: string;
}

export interface BankAccountMutationResponse {
  id: string;
  bankCode: string;
  bankName: string;
  bankLogoUrl: string | null;
  apiType: string;
  accountNumber: string;
  accountName: string;
  branch: string | null;
  active: boolean;
  isDefault: boolean;
  note: string | null;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

