/**
 * Countries GraphQL Types
 *
 * TypeScript interfaces for Countries module GraphQL operations
 */

// Common GraphQL input/output types
export interface FilterRequest {
  logicalOperator?: 'AND' | 'OR';
  filters?: FilterCondition[];
}

export interface FilterCondition {
  field: string;
  operator: 'CONTAINS' | 'EQUALS' | 'STARTS_WITH' | 'ENDS_WITH' | 'GREATER_THAN' | 'LESS_THAN';
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
}

export interface CountriesResponse {
  countries: {
    items: CountryItem[];
    totalCount: number;
    meta?: PaginationMeta;
  };
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
  id: string;
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
