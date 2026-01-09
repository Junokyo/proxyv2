/**
 * Loyal Histories GraphQL Types
 *
 * TypeScript interfaces for Loyal Histories module GraphQL operations
 */

import { BaseFilterOptions } from '../interfaces/base/filter-option.interface';
import { Response } from '../interfaces/base/response.interface';

// Loyal Histories specific types
export interface LoyalHistoryItem {
  id: string;
  userId: string;
  loyalLevelId: string;
  coin: number;
  dateInput: string;
}

export interface LoyalHistoriesResponse {
  loyalHistories: Response<LoyalHistoryItem>;
}

// CRUD Operations
export interface CreateLoyalHistoryInput {
  userId: string;
  loyalLevelId: string;
  coin: number;
}

export interface UpdateLoyalHistoryInput {
  id: string; // ID bắt buộc trong input cho mutation
  loyalLevelId?: string;
  coin?: number;
}

// Input type cho hook (không có id, vì id được truyền riêng)
export interface UpdateLoyalHistoryInputWithoutId {
  loyalLevelId?: string;
  coin?: number;
}

export interface CreateLoyalHistoryVariables {
  userId: string;
  loyalLevelId: string;
  coin: number;
}

export interface UpdateLoyalHistoryVariables {
  id: string;
  loyalLevelId?: string;
  coin?: number;
}

export interface DeleteLoyalHistoryVariables {
  id: string;
}

export interface LoyalHistoryMutationResponse {
  id: string;
  userId: string;
  loyalLevelId: string;
  coin: number;
  dateInput: string;
}

// Filter options for loyal histories query (extends BaseFilterOptions with userId)
export interface LoyalHistoriesFilterOptions extends BaseFilterOptions {
  userId?: string;
}

