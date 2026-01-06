/**
 * Proxy Types GraphQL Types
 *
 * TypeScript interfaces for Proxy Types module GraphQL operations
 */

import { Response } from '../interfaces/base/response.interface';

// Proxy Types specific types
export interface ProxyTypeItem {
  id: string;
  name: string;
  type: string;
}

export interface ProxyTypesResponse {
  proxyTypes: Response<ProxyTypeItem>;
}

// CRUD Operations
export interface CreateProxyTypeInput {
  name: string;
  type: string;
}

export interface UpdateProxyTypeInput {
  id: string;
  name: string;
  type: string;
}

// Input type cho hook (không có id, vì id được truyền riêng)
export interface UpdateProxyTypeInputWithoutId {
  name: string;
  type: string;
}

export interface CreateProxyTypeVariables {
  name: string;
  type: string;
}

export interface UpdateProxyTypeVariables {
  id: string;
  name: string;
  type: string;
}

export interface DeleteProxyTypeVariables {
  id: string;
}

export interface ProxyTypeMutationResponse {
  id: string;
  name: string;
  type: string;
}

