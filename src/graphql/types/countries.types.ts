/**
 * Countries GraphQL Types
 *
 * TypeScript interfaces for Countries module GraphQL operations
 */

import { Response } from '../interfaces/base/response.interface';

// Common GraphQL input/output types
export interface FilterRequest {
  logicalOperator?: 'AND' | 'OR';
  filters?: FilterCondition[];
}

export interface FilterCondition {
  field: string;
  operator:
    | 'CONTAINS'
    | 'EQUALS'
    | 'STARTS_WITH'
    | 'ENDS_WITH'
    | 'GREATER_THAN'
    | 'LESS_THAN';
  value: any;
}

export interface Sort {
  field: string;
  order: 'ASC' | 'DESC';
}

export interface PaginationInput {
  page?: number;
  limit?: number;
}

export interface PaginationMeta {
  filteredCount?: number;
  requestId?: string;
  pagination?: {
    nextPageToken?: string;
    prevPageToken?: string;
  };
}

// Countries specific types
export interface CountryItem {
  id: string;
  name: string;
  code: string;
  flag: string;
}

export interface CountriesResponse {
  countries: Response<CountryItem>;
}

export interface GetCountriesVariables {
  filter?: FilterRequest;
  sorts?: Sort[];
  pagination?: PaginationInput;
  searchQuery?: string;
}

// CRUD Operations
export interface CreateCountryInput {
  name: string;
  code: string;
  continent: string;
  region?: string;
  status?: boolean;
}

export interface UpdateCountryInput {
  id: string; // ID bắt buộc trong input cho mutation
  name?: string;
  code?: string;
  continent?: string;
  region?: string;
  status?: boolean;
}

// Input type cho hook (không có id, vì id được truyền riêng)
export interface UpdateCountryInputWithoutId {
  name?: string;
  code?: string;
  continent?: string;
  region?: string;
  status?: boolean;
}

export interface CreateCountryVariables {
  input: CreateCountryInput;
}

export interface UpdateCountryVariables {
  input: UpdateCountryInput;
}

export interface DeleteCountryVariables {
  id: string;
}

export interface BulkDeleteCountriesVariables {
  ids: string[];
}

export interface CountryMutationResponse {
  id: string;
  name: string;
  code: string;
  continent: string;
  region?: string;
  status: boolean;
  createdAt: string;
  proxyCount?: number;
  ipCount?: number;
}

export interface DeleteResponse {
  success: boolean;
  message: string;
}

export interface BulkDeleteResponse extends DeleteResponse {
  deletedCount: number;
}

// Statistics
export interface CountriesStatisticsResponse {
  countriesStatistics: {
    totalCountries: number;
    totalActiveCountries: number;
    totalProxies: number;
    totalIPs: number;
  };
}
// Lazy query types
export interface GetCountryByIdVariables {
  id: string;
}

export interface GetCountryByIdResponse {
  country: CountryMutationResponse;
}
