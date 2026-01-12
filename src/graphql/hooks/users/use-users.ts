/**
 * Users Module Hooks
 *
 * Custom hooks for users operations
 */

import { BaseFilterOptions } from '@/graphql/interfaces/base/filter-option.interface';
import {
  CREATE_USER_MUTATION,
  DELETE_USER_MUTATION,
  UPDATE_USER_MUTATION,
} from '../../mutations/users';
import {
  GET_USERS_QUERY,
  GET_USER_BY_ID,
} from '../../queries/users';
import type {
  UserMutationResponse,
  UsersResponse,
  CreateUserInput,
  CreateUserVariables,
  DeleteUserVariables,
  GetUserByIdResponse,
  GetUserByIdVariables,
  UpdateUserInputWithoutId,
  UpdateUserVariables,
} from '../../types/users.types';
import { useGraphQLMutation, useGraphQLQuery } from '../index';

/**
 * Hook to fetch users list
 *
 * @example
 * ```tsx
 * const { data, loading, error, refetch } = useUsers({
 *   pagination: { page: 1, limit: 10 },
 *   searchQuery: 'john'
 * });
 * ```
 */
export function useUsers(options?: BaseFilterOptions, skip?: boolean) {
  return useGraphQLQuery<UsersResponse, BaseFilterOptions>({
    query: GET_USERS_QUERY,
    variables: {
      ...options,
    },
    skip: skip || false,
  });
}

/**
 * Hook to fetch a single user by ID
 *
 * @example
 * ```tsx
 * const { data, loading, error } = useUser('user-id-123');
 * ```
 */
export function useUser(id: string, skip?: boolean) {
  return useGraphQLQuery<GetUserByIdResponse, GetUserByIdVariables>({
    query: GET_USER_BY_ID,
    variables: { id },
    skip: skip || !id,
  });
}

/**
 * Hook to create a new user
 *
 * @example
 * ```tsx
 * const [createUser, { loading, error }] = useCreateUser({
 *   onSuccess: () => {
 *     toast.success('User created successfully');
 *     refetch();
 *   }
 * });
 *
 * createUser({
 *   providerId: 'provider-123',
 *   username: 'john_doe',
 *   email: 'john@example.com',
 *   balance: 100.0,
 *   roles: ['user'],
 *   active: true
 * });
 * ```
 */
export function useCreateUser(options?: {
  onSuccess?: () => void;
  onError?: (message: string, code?: string) => void;
}) {
  const [mutate, result] = useGraphQLMutation<
    { createUser: UserMutationResponse },
    CreateUserVariables
  >({
    mutation: CREATE_USER_MUTATION,
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });

  const createUser = (input: CreateUserInput) => {
    return mutate({
      variables: { input },
    });
  };

  return [createUser, result] as const;
}

/**
 * Hook to update a user
 *
 * @example
 * ```tsx
 * const [updateUser, { loading, error }] = useUpdateUser({
 *   onSuccess: () => {
 *     toast.success('User updated successfully');
 *     refetch();
 *   }
 * });
 *
 * updateUser('user-id-123', {
 *   username: 'john_doe_updated',
 *   email: 'john.updated@example.com'
 * });
 * ```
 */
export function useUpdateUser(options?: {
  onSuccess?: () => void;
  onError?: (message: string, code?: string) => void;
}) {
  const [mutate, result] = useGraphQLMutation<
    { updateUser: UserMutationResponse },
    UpdateUserVariables
  >({
    mutation: UPDATE_USER_MUTATION,
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });

  const updateUser = (id: string, input: UpdateUserInputWithoutId) => {
    return mutate({
      variables: {
        input: {
          ...input,
          id, // ID được thêm vào input cho mutation
        },
      },
    });
  };

  return [updateUser, result] as const;
}

/**
 * Hook to delete a user
 *
 * @example
 * ```tsx
 * const [deleteUser, { loading, error }] = useDeleteUser({
 *   onSuccess: () => {
 *     toast.success('User deleted successfully');
 *     refetch();
 *   }
 * });
 *
 * deleteUser('user-id-123');
 * ```
 */
export function useDeleteUser(options?: {
  onSuccess?: () => void;
  onError?: (message: string, code?: string) => void;
}) {
  const [mutate, result] = useGraphQLMutation<
    { deleteUser: boolean },
    DeleteUserVariables
  >({
    mutation: DELETE_USER_MUTATION,
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });

  const deleteUser = (id: string) => {
    return mutate({
      variables: { id },
    });
  };

  return [deleteUser, result] as const;
}

