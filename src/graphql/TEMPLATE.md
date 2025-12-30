# Template: Tạo GraphQL Module Mới

## 📋 Hướng dẫn tạo module GraphQL mới

Khi cần tạo module GraphQL mới (ví dụ: `account`, `wallet`, `store-client`), làm theo các bước sau:

### 1. Tạo Queries

**File**: `src/graphql/queries/{module}/{module}.queries.ts`

```typescript
/**
 * {Module Name} Module Queries
 * 
 * GraphQL queries for the {module} module
 */

import { gql } from '../../utils/gql';

/**
 * Get {resource} list query
 */
export const GET_{RESOURCE}S_QUERY = gql`
  query Get{Resource}s($pagination: PaginationInput, $filter: {Resource}FilterInput) {
    {resources}(pagination: $pagination, filter: $filter) {
      id
      # Add fields here
      createdAt
      updatedAt
    }
  }
`;

/**
 * Get {resource} by ID query
 */
export const GET_{RESOURCE}_BY_ID_QUERY = gql`
  query Get{Resource}ById($id: ID!) {
    {resource}(id: $id) {
      id
      # Add fields here
    }
  }
`;
```

**File**: `src/graphql/queries/{module}/index.ts`

```typescript
/**
 * {Module Name} Queries Export
 */

export * from './{module}.queries';
```

**Update**: `src/graphql/queries/index.ts`

```typescript
export * from './overview';
export * from './{module}'; // Add this line
```

### 2. Tạo Mutations

**File**: `src/graphql/mutations/{module}/{module}.mutations.ts`

```typescript
/**
 * {Module Name} Module Mutations
 * 
 * GraphQL mutations for the {module} module
 */

import { gql } from '../../utils/gql';

/**
 * Create {resource} mutation
 */
export const CREATE_{RESOURCE}_MUTATION = gql`
  mutation Create{Resource}($input: Create{Resource}Input!) {
    create{Resource}(input: $input) {
      id
      # Add fields here
      createdAt
    }
  }
`;

/**
 * Update {resource} mutation
 */
export const UPDATE_{RESOURCE}_MUTATION = gql`
  mutation Update{Resource}($id: ID!, $input: Update{Resource}Input!) {
    update{Resource}(id: $id, input: $input) {
      id
      # Add fields here
      updatedAt
    }
  }
`;

/**
 * Delete {resource} mutation
 */
export const DELETE_{RESOURCE}_MUTATION = gql`
  mutation Delete{Resource}($id: ID!) {
    delete{Resource}(id: $id) {
      success
      message
    }
  }
`;
```

**File**: `src/graphql/mutations/{module}/index.ts`

```typescript
/**
 * {Module Name} Mutations Export
 */

export * from './{module}.mutations';
```

**Update**: `src/graphql/mutations/index.ts`

```typescript
export * from './overview';
export * from './{module}'; // Add this line
```

### 3. Tạo Custom Hooks

**File**: `src/graphql/hooks/{module}/use-{resource}.ts`

```typescript
/**
 * {Module Name} Module Hooks
 * 
 * Custom hooks for {module} operations
 */

import { useGraphQLQuery, useGraphQLMutation } from '../index';
import {
  GET_{RESOURCE}S_QUERY,
  GET_{RESOURCE}_BY_ID_QUERY,
} from '../../queries/{module}';
import {
  CREATE_{RESOURCE}_MUTATION,
  UPDATE_{RESOURCE}_MUTATION,
  DELETE_{RESOURCE}_MUTATION,
} from '../../mutations/{module}';
import { PaginationInput } from '../../types';

/**
 * Hook to fetch {resource} list
 */
export function use{Resource}s(options?: {
  pagination?: PaginationInput;
  filter?: Record<string, unknown>;
  skip?: boolean;
}) {
  return useGraphQLQuery({
    query: GET_{RESOURCE}S_QUERY,
    variables: {
      pagination: options?.pagination,
      filter: options?.filter,
    },
    skip: options?.skip,
  });
}

/**
 * Hook to fetch a single {resource} by ID
 */
export function use{Resource}(id: string, skip?: boolean) {
  return useGraphQLQuery({
    query: GET_{RESOURCE}_BY_ID_QUERY,
    variables: { id },
    skip: skip || !id,
  });
}

/**
 * Hook to create a new {resource}
 */
export function useCreate{Resource}(options?: {
  onSuccess?: (data: unknown) => void;
  onError?: (message: string, code?: string) => void;
}) {
  return useGraphQLMutation({
    mutation: CREATE_{RESOURCE}_MUTATION,
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
}

/**
 * Hook to update a {resource}
 */
export function useUpdate{Resource}(options?: {
  onSuccess?: (data: unknown) => void;
  onError?: (message: string, code?: string) => void;
}) {
  return useGraphQLMutation({
    mutation: UPDATE_{RESOURCE}_MUTATION,
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
}

/**
 * Hook to delete a {resource}
 */
export function useDelete{Resource}(options?: {
  onSuccess?: (data: unknown) => void;
  onError?: (message: string, code?: string) => void;
}) {
  return useGraphQLMutation({
    mutation: DELETE_{RESOURCE}_MUTATION,
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
}
```

**File**: `src/graphql/hooks/{module}/index.ts`

```typescript
/**
 * {Module Name} Hooks Export
 */

export * from './use-{resource}';
```

### 4. Tạo Types (Optional nhưng recommended)

**File**: `src/graphql/types/{module}.types.ts`

```typescript
/**
 * {Module Name} Types
 */

export interface {Resource} {
  id: string;
  // Add fields here
  createdAt: string;
  updatedAt: string;
}

export interface {Resource}FilterInput {
  // Add filter fields
}

export interface Create{Resource}Input {
  // Add input fields
}

export interface Update{Resource}Input {
  // Add input fields
}

export interface Get{Resource}sVariables {
  pagination?: PaginationInput;
  filter?: {Resource}FilterInput;
}

export interface Get{Resource}sResponse {
  {resources}: {Resource}[];
  pagination?: PaginationInfo;
}
```

**Update**: `src/graphql/types/index.ts`

```typescript
export * from './common.types';
export * from './{module}.types'; // Add this line
```

### 5. Ví dụ sử dụng trong Component

```typescript
import { use{Resource}s, useCreate{Resource} } from '@/graphql/hooks/{module}';
import { toast } from 'sonner';

export function {Resource}List() {
  const { data, loading, error, refetch } = use{Resource}s({
    pagination: { page: 1, pageSize: 10 }
  });

  const [create{Resource}, { loading: creating }] = useCreate{Resource}({
    onSuccess: () => {
      toast.success('{Resource} created!');
      refetch();
    }
  });

  // ... rest of component
}
```

## 📝 Checklist

- [ ] Tạo queries trong `queries/{module}/`
- [ ] Tạo mutations trong `mutations/{module}/`
- [ ] Tạo hooks trong `hooks/{module}/`
- [ ] Tạo types trong `types/{module}.types.ts` (optional)
- [ ] Export từ các file `index.ts`
- [ ] Test hooks trong component
- [ ] Update documentation nếu cần

## 🎯 Naming Conventions

- **Queries**: `GET_{RESOURCE}_QUERY`, `GET_{RESOURCE}_BY_ID_QUERY`
- **Mutations**: `CREATE_{RESOURCE}_MUTATION`, `UPDATE_{RESOURCE}_MUTATION`, `DELETE_{RESOURCE}_MUTATION`
- **Hooks**: `use{Resource}`, `useCreate{Resource}`, `useUpdate{Resource}`, `useDelete{Resource}`
- **Types**: `{Resource}`, `{Resource}FilterInput`, `Create{Resource}Input`, `Update{Resource}Input`

## 💡 Tips

1. Luôn sử dụng fragments cho các fields được dùng lại nhiều lần
2. Đặt tên rõ ràng, dễ hiểu
3. Thêm JSDoc comments cho các hooks và queries
4. Sử dụng TypeScript types để có type safety tốt hơn
5. Test error handling trong các hooks

