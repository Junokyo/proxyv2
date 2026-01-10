/**
 * Countries GraphQL Types
 *
 * TypeScript interfaces for Countries module GraphQL operations
 */

import { Response } from '../interfaces/base/response.interface';
import { DeleteResponse } from './common.types';

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

// CRUD Operations
export interface CreateCountryInput {
  name: string;
  code: string;
}

export interface UpdateCountryInput {
  id: string; // ID bắt buộc trong input cho mutation
  name?: string;
  code?: string;
}

// Input type cho hook (không có id, vì id được truyền riêng)
export interface UpdateCountryInputWithoutId {
  name?: string;
  code?: string;
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
