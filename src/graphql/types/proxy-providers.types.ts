/**
 * Proxy Providers GraphQL Types
 *
 * TypeScript interfaces for Proxy Providers module GraphQL operations
 */

import { Response } from '../interfaces/base/response.interface';

// Proxy Providers specific types
export interface ProxyProviderItem {
  id: string;
  name: string;
  server: string;
  apiKey: string;
  userName: string;
  password: string;
  apiType: number;
}

export interface ProxyProvidersResponse {
  proxyProviders: Response<ProxyProviderItem>;
}

// CRUD Operations
export interface CreateProxyProviderInput {
  name: string;
  server: string;
  apiKey: string;
  userName: string;
  password: string;
  apiType: number;
}

export interface UpdateProxyProviderInput {
  id: string; // ID bắt buộc trong input cho mutation
  name?: string;
  server?: string;
  apiKey?: string;
  userName?: string;
  password?: string;
  apiType?: number;
}

// Input type cho hook (không có id, vì id được truyền riêng)
export interface UpdateProxyProviderInputWithoutId {
  name?: string;
  server?: string;
  apiKey?: string;
  userName?: string;
  password?: string;
  apiType?: number;
}

export interface CreateProxyProviderVariables {
  input: CreateProxyProviderInput;
}

export interface UpdateProxyProviderVariables {
  input: UpdateProxyProviderInput;
}

export interface DeleteProxyProviderVariables {
  id: string;
}

export interface ProxyProviderMutationResponse {
  id: string;
  name: string;
  server: string;
  apiKey: string;
  userName: string;
  password: string;
  apiType: number;
}

