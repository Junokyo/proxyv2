import { useGraphQLMutation, useGraphQLQuery } from '../use-graphql-mutation';
import { useGraphQLLazyQuery } from '../use-graphql-lazy-query';
import {
  GET_COUNTRIES_QUERY,
  GET_COUNTRY_BY_ID_QUERY,
  GET_COUNTRIES_STATISTICS_QUERY,
} from '../../queries/countries';
import {
  CREATE_COUNTRY_MUTATION,
  UPDATE_COUNTRY_MUTATION,
  DELETE_COUNTRY_MUTATION,
  BULK_DELETE_COUNTRIES_MUTATION,
} from '../../mutations/countries';
import {
  GetCountriesVariables,
  GetCountriesResponse,
  GetCountryByIdVariables,
  GetCountryByIdResponse,
  GetCountriesStatisticsResponse,
  CreateCountryVariables,
  UpdateCountryVariables,
  DeleteCountryVariables,
  BulkDeleteCountriesVariables,
  CountryMutationResponse,
  DeleteResponse,
  BulkDeleteResponse,
} from '../../types/countries';

// Re-export types for backward compatibility
export type {
  GetCountriesVariables,
  GetCountriesResponse,
  GetCountryByIdVariables,
  GetCountryByIdResponse,
  GetCountriesStatisticsResponse,
  CreateCountryVariables,
  UpdateCountryVariables,
  DeleteCountryVariables,
  BulkDeleteCountriesVariables,
  CountryMutationResponse,
  DeleteResponse,
  BulkDeleteResponse,
} from '../../types/countries';

export interface GetCountryByIdVariables {
  id: string;
}

export interface GetCountryByIdResponse {
  country: Country;
}

export interface GetCountriesStatisticsResponse {
  countriesStatistics: {
    totalCountries: number;
    totalActiveCountries: number;
    totalProxies: number;
    totalIPs: number;
  };
}

export interface CreateCountryVariables {
  input: {
    name: string;
    code: string;
    continent: string;
    region?: string;
    status?: boolean;
  };
}

export interface UpdateCountryVariables {
  id: string;
  input: {
    name?: string;
    code?: string;
    continent?: string;
    region?: string;
    status?: boolean;
  };
}

export interface DeleteCountryVariables {
  id: string;
}

export interface BulkDeleteCountriesVariables {
  ids: string[];
}

/**
 * Hook to fetch countries list
 * @param variables - Query variables for filtering and pagination
 * @returns GraphQL query result
 *
 * @example
 * ```tsx
 * const { data, loading, error, refetch } = useCountries({
 *   pagination: { page: 1, pageSize: 10 },
 *   filter: { search: 'Vietnam', continent: 'Asia' }
 * });
 * ```
 */
export function useCountries(variables?: GetCountriesVariables) {
  return useGraphQLQuery<GetCountriesResponse, GetCountriesVariables>({
    query: GET_COUNTRIES_QUERY,
    variables,
  });
}

/**
 * Hook to fetch a single country by ID
 * @param variables - Query variables containing the country ID
 * @returns GraphQL query result
 *
 * @example
 * ```tsx
 * const { data, loading, error } = useCountryById({
 *   id: 'country-id'
 * });
 * ```
 */
export function useCountryById(variables?: GetCountryByIdVariables) {
  return useGraphQLQuery<GetCountryByIdResponse, GetCountryByIdVariables>({
    query: GET_COUNTRY_BY_ID_QUERY,
    variables,
  });
}

/**
 * Hook to fetch countries statistics
 * @returns GraphQL query result
 *
 * @example
 * ```tsx
 * const { data, loading, error } = useCountriesStatistics();
 * ```
 */
export function useCountriesStatistics() {
  return useGraphQLQuery<GetCountriesStatisticsResponse>({
    query: GET_COUNTRIES_STATISTICS_QUERY,
  });
}

/**
 * Lazy hook to fetch a single country by ID (only when needed)
 * @returns GraphQL lazy query result
 *
 * @example
 * ```tsx
 * const [loadCountry, { data, loading, error }] = useCountryByIdLazy();
 *
 * const handleLoad = (id: string) => {
 *   loadCountry({ variables: { id } });
 * };
 * ```
 */
export function useCountryByIdLazy() {
  return useGraphQLLazyQuery<GetCountryByIdResponse, GetCountryByIdVariables>({
    query: GET_COUNTRY_BY_ID_QUERY,
  });
}

/**
 * Hook to create a new country
 * @returns GraphQL mutation result
 *
 * @example
 * ```tsx
 * const [createCountry, { loading }] = useCreateCountry({
 *   onSuccess: (data) => {
 *     console.log('Country created:', data);
 *     refetch(); // Refetch the list
 *   }
 * });
 *
 * const handleCreate = () => {
 *   createCountry({
 *     variables: {
 *       input: {
 *         name: 'Vietnam',
 *         code: 'VN',
 *         continent: 'Asia',
 *         region: 'Southeast Asia',
 *         status: true
 *       }
 *     }
 *   });
 * };
 * ```
 */
export function useCreateCountry() {
  return useGraphQLMutation<{ createCountry: CountryMutationResponse }, CreateCountryVariables>({
    mutation: CREATE_COUNTRY_MUTATION,
  });
}

/**
 * Hook to update an existing country
 * @returns GraphQL mutation result
 *
 * @example
 * ```tsx
 * const [updateCountry, { loading }] = useUpdateCountry({
 *   onSuccess: (data) => {
 *     console.log('Country updated:', data);
 *     refetch(); // Refetch the list
 *   }
 * });
 *
 * const handleUpdate = (id: string) => {
 *   updateCountry({
 *     variables: {
 *       id,
 *       input: {
 *         name: 'Updated Country Name',
 *         status: false
 *       }
 *     }
 *   });
 * };
 * ```
 */
export function useUpdateCountry() {
  return useGraphQLMutation<{ updateCountry: CountryMutationResponse }, UpdateCountryVariables>({
    mutation: UPDATE_COUNTRY_MUTATION,
  });
}

/**
 * Hook to delete a country
 * @returns GraphQL mutation result
 *
 * @example
 * ```tsx
 * const [deleteCountry, { loading }] = useDeleteCountry({
 *   onSuccess: (data) => {
 *     console.log('Country deleted:', data);
 *     refetch(); // Refetch the list
 *   }
 * });
 *
 * const handleDelete = (id: string) => {
 *   deleteCountry({
 *     variables: { id }
 *   });
 * };
 * ```
 */
export function useDeleteCountry() {
  return useGraphQLMutation<
    { deleteCountry: DeleteResponse },
    DeleteCountryVariables
  >({
    mutation: DELETE_COUNTRY_MUTATION,
  });
}

/**
 * Hook to bulk delete countries
 * @returns GraphQL mutation result
 *
 * @example
 * ```tsx
 * const [bulkDeleteCountries, { loading }] = useBulkDeleteCountries({
 *   onSuccess: (data) => {
 *     console.log('Countries deleted:', data);
 *     refetch(); // Refetch the list
 *   }
 * });
 *
 * const handleBulkDelete = (ids: string[]) => {
 *   bulkDeleteCountries({
 *     variables: { ids }
 *   });
 * };
 * ```
 */
export function useBulkDeleteCountries() {
  return useGraphQLMutation<
    {
      bulkDeleteCountries: BulkDeleteResponse;
    },
    BulkDeleteCountriesVariables
  >({
    mutation: BULK_DELETE_COUNTRIES_MUTATION,
  });
}

