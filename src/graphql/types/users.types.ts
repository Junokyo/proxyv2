/**
 * Users GraphQL Types
 *
 * TypeScript interfaces for Users module GraphQL operations
 */

import { Response } from '../interfaces/base/response.interface';

// Users specific types
export interface UserItem {
  id: string;
  providerId: string;
  username: string;
  email: string;
  balance: number;
  roles: string[];
  lastLogin: string | null;
  createdAt: string;
  updatedAt: string;
  phone: string | null;
  avatarUrl: string | null;
  loyalLevelId: string | null;
  active: boolean;
}

export interface UsersResponse {
  users: Response<UserItem>;
}

// CRUD Operations
export interface CreateUserInput {
  providerId: string;
  username: string;
  email: string;
  balance?: number;
  roles?: string[];
  phone?: string;
  avatarUrl?: string;
  loyalLevelId?: string;
  active?: boolean;
}

export interface UpdateUserInput {
  id: string; // ID bắt buộc trong input cho mutation
  username?: string;
  email?: string;
  phone?: string;
  avatarUrl?: string;
  loyalLevelId?: string;
  active?: boolean;
}

// Input type cho hook (không có id, vì id được truyền riêng)
export interface UpdateUserInputWithoutId {
  username?: string;
  email?: string;
  phone?: string;
  avatarUrl?: string;
  loyalLevelId?: string;
  active?: boolean;
}

export interface CreateUserVariables {
  input: CreateUserInput;
}

export interface UpdateUserVariables {
  input: UpdateUserInput;
}

export interface DeleteUserVariables {
  id: string;
}

export interface UserMutationResponse {
  id: string;
  providerId: string;
  username: string;
  email: string;
  balance: number;
  roles: string[];
  lastLogin: string | null;
  createdAt: string;
  updatedAt: string;
  phone: string | null;
  avatarUrl: string | null;
  loyalLevelId: string | null;
  active: boolean;
}

// Lazy query types
export interface GetUserByIdVariables {
  id: string;
}

export interface GetUserByIdResponse {
  user: UserMutationResponse;
}

// Balance operations types
export interface AddBalanceInput {
  userId: string;
  amount: number;
  description?: string;
  reference?: string;
}

export interface DeductBalanceInput {
  userId: string;
  amount: number;
  description?: string;
  reference?: string;
}

export interface BalanceOperationResponse {
  userId: string;
  previousBalance: number;
  amount: number;
  newBalance: number;
  transactionType: string;
}

export interface AddBalanceVariables {
  input: AddBalanceInput;
}

export interface DeductBalanceVariables {
  input: DeductBalanceInput;
}