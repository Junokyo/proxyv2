/**
 * Promotions GraphQL Types
 *
 * TypeScript interfaces for Promotions module GraphQL operations
 */

import { Response } from '../interfaces/base/response.interface';

// Promotions specific types
export interface PromotionItem {
  id: string;
  name: string;
  type: number;
  max: number;
  percent: number;
  fromDate: string;
  toDate: string;
}

export interface PromotionsResponse {
  promotions: Response<PromotionItem>;
}

// CRUD Operations
export interface CreatePromotionInput {
  name: string;
  type: number;
  max: number;
  percent: number;
  fromDate: string;
  toDate: string;
}

export interface UpdatePromotionInput {
  id: string; // ID bắt buộc trong input cho mutation
  name?: string;
  type?: number;
  max?: number;
  percent?: number;
  fromDate?: string;
  toDate?: string;
}

// Input type cho hook (không có id, vì id được truyền riêng)
export interface UpdatePromotionInputWithoutId {
  name?: string;
  type?: number;
  max?: number;
  percent?: number;
  fromDate?: string;
  toDate?: string;
}

export interface CreatePromotionVariables {
  input: CreatePromotionInput;
}

export interface UpdatePromotionVariables {
  input: UpdatePromotionInput;
}

export interface DeletePromotionVariables {
  id: string;
}

export interface PromotionMutationResponse {
  id: string;
  name: string;
  type: number;
  max: number;
  percent: number;
  fromDate: string;
  toDate: string;
}
