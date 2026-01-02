/**
 * Loyals GraphQL Types
 *
 * TypeScript interfaces for Loyals module GraphQL operations
 */

import { Response } from '../interfaces/base/response.interface';

// Re-export common types (same as countries)

// Loyals specific types
export interface LoyalItem {
  id: string;
  name: string;
  value: string;
}

export interface LoyalsResponse {
  loyals: Response<LoyalItem>;
}

// CRUD Operations
export interface CreateLoyalInput {
  name: string;
  value: string;
}

export interface UpdateLoyalInput {
  id: string; // ID bắt buộc trong input cho mutation
  name?: string;
  value?: string;
}

// Input type cho hook (không có id, vì id được truyền riêng)
export interface UpdateLoyalInputWithoutId {
  name?: string;
  value?: string;
}

export interface CreateLoyalVariables {
  input: CreateLoyalInput;
}

export interface UpdateLoyalVariables {
  input: UpdateLoyalInput;
}

export interface DeleteLoyalVariables {
  id: string;
}

export interface LoyalMutationResponse {
  id: string;
  name: string;
  value: string;
}
