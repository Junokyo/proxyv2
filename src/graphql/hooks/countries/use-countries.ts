/**
 * Countries Module Hooks
 *
 * Custom hooks for countries operations
 */

import { BaseFilterOptions } from '@/graphql/interfaces/base/filter-option.interface';
import {
  CREATE_COUNTRY_MUTATION,
  DELETE_COUNTRY_MUTATION,
  UPDATE_COUNTRY_MUTATION,
} from '../../mutations/countries';
import {
  GET_COUNTRIES_QUERY,
  GET_COUNTRY_BY_ID,
} from '../../queries/countries';
import type {
  CountriesResponse,
  CreateCountryInput,
  CreateCountryVariables,
  DeleteCountryVariables,
  GetCountryByIdResponse,
  GetCountryByIdVariables,
  UpdateCountryInputWithoutId,
  UpdateCountryVariables,
} from '../../types/countries.types';
import { useGraphQLMutation, useGraphQLQuery } from '../index';

/**
 * Hook to fetch countries list
 *
 * @example
 * ```tsx
 * const { data, loading, error, refetch } = useCountries({
 *   pagination: { page: 1, limit: 10 },
 *   searchQuery: 'Vietnam'
 * });
 * ```
 */
export function useCountries(options?: BaseFilterOptions, skip?: boolean) {
  return useGraphQLQuery<CountriesResponse, BaseFilterOptions>({
    query: GET_COUNTRIES_QUERY,
    variables: {
      ...options,
    },
    skip: skip || false,
  });
}

/**
 * Hook to fetch a single country by ID
 *
 * @example
 * ```tsx
 * const { data, loading, error } = useCountry('country-id-123');
 * ```
 */
export function useCountry(id: string, skip?: boolean) {
  return useGraphQLQuery<GetCountryByIdResponse, GetCountryByIdVariables>({
    query: GET_COUNTRY_BY_ID,
    variables: { id },
    skip: skip || !id,
  });
}

/**
 * Hook to create a new country
 *
 * @example
 * ```tsx
 * const [createCountry, { loading, error }] = useCreateCountry({
 *   onSuccess: () => {
 *     toast.success('Country created successfully');
 *     refetch();
 *   }
 * });
 *
 * createCountry({
 *   variables: {
 *     input: {
 *       name: 'Vietnam',
 *       code: 'VN',
 *       continent: 'Asia'
 *     }
 *   }
 * });
 * ```
 */
export function useCreateCountry(options?: {
  onSuccess?: () => void;
  onError?: (message: string, code?: string) => void;
}) {
  const [mutate, result] = useGraphQLMutation<
    { createCountry: { id: string; name: string; code: string } },
    CreateCountryVariables
  >({
    mutation: CREATE_COUNTRY_MUTATION,
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });

  const createCountry = (input: CreateCountryInput) => {
    return mutate({
      variables: { input },
    });
  };

  return [createCountry, result] as const;
}

/**
 * Hook to update a country
 *
 * @example
 * ```tsx
 * const [updateCountry, { loading, error }] = useUpdateCountry({
 *   onSuccess: () => {
 *     toast.success('Country updated successfully');
 *     refetch();
 *   }
 * });
 *
 * updateCountry({
 *   id: 'country-id-123',
 *   input: {
 *     name: 'Vietnam Updated'
 *   }
 * });
 * ```
 */
export function useUpdateCountry(options?: {
  onSuccess?: () => void;
  onError?: (message: string, code?: string) => void;
}) {
  const [mutate, result] = useGraphQLMutation<
    { updateCountry: { id: string; name: string; code: string } },
    UpdateCountryVariables
  >({
    mutation: UPDATE_COUNTRY_MUTATION,
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });

  const updateCountry = (id: string, input: UpdateCountryInputWithoutId) => {
    return mutate({
      variables: {
        input: {
          ...input,
          id, // ID được thêm vào input cho mutation
        },
      },
    });
  };

  return [updateCountry, result] as const;
}

/**
 * Hook to delete a country
 *
 * @example
 * ```tsx
 * const [deleteCountry, { loading, error }] = useDeleteCountry({
 *   onSuccess: () => {
 *     toast.success('Country deleted successfully');
 *     refetch();
 *   }
 * });
 *
 * deleteCountry('country-id-123');
 * ```
 */
export function useDeleteCountry(options?: {
  onSuccess?: () => void;
  onError?: (message: string, code?: string) => void;
}) {
  const [mutate, result] = useGraphQLMutation<
    { deleteCountry: boolean },
    DeleteCountryVariables
  >({
    mutation: DELETE_COUNTRY_MUTATION,
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });

  const deleteCountry = (id: string) => {
    return mutate({
      variables: { id },
    });
  };

  return [deleteCountry, result] as const;
}
