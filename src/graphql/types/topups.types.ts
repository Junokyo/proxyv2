/**
 * Topups GraphQL Types
 *
 * TypeScript interfaces for Topups module GraphQL operations
 */

import { Response } from '../interfaces/base/response.interface';

// Topups specific types
export interface TopupItem {
  id: string;
  name: string;
  max: number;
  percent: number;
}

export interface TopupsResponse {
  topups: Response<TopupItem>;
}

// CRUD Operations
export interface CreateTopupInput {
  name: string;
  max: number;
  percent: number;
}

export interface UpdateTopupInput {
  id: string;
  name?: string;
  max?: number;
  percent?: number;
}

// Input type cho hook (không có id, vì id được truyền riêng)
export interface UpdateTopupInputWithoutId {
  name?: string;
  max?: number;
  percent?: number;
}

export interface CreateTopupVariables {
  name: string;
  max: number;
  percent: number;
}

export interface UpdateTopupVariables {
  id: string;
  name?: string;
  max?: number;
  percent?: number;
}

export interface DeleteTopupVariables {
  id: string;
}

export interface TopupMutationResponse {
  id: string;
  name: string;
  max: number;
  percent: number;
}

