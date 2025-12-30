# GraphQL Architecture Documentation

## 📋 Tổng quan

Cấu trúc GraphQL được thiết kế để:

- ✅ **Gọn gàng**: Code dễ đọc, dễ maintain
- ✅ **Đúng chuẩn**: Tuân thủ best practices của Apollo Client và GraphQL
- ✅ **Dễ scale**: Tổ chức theo module/feature, dễ mở rộng
- ✅ **Type-safe**: Hỗ trợ TypeScript đầy đủ
- ✅ **Error handling**: Xử lý lỗi tự động và tập trung

## 📁 Cấu trúc thư mục

```
src/graphql/
├── client.ts                 # Apollo Client configuration
├── index.ts                  # Main export point
├── queries/                  # GraphQL queries
│   ├── overview/
│   │   ├── overview.queries.ts
│   │   └── index.ts
│   └── index.ts
├── mutations/                # GraphQL mutations
│   ├── overview/
│   │   ├── overview.mutations.ts
│   │   └── index.ts
│   └── index.ts
├── hooks/                    # Custom React hooks
│   ├── overview/
│   │   ├── use-proxies.ts
│   │   └── index.ts
│   ├── use-graphql-query.ts
│   ├── use-graphql-mutation.ts
│   ├── use-graphql-lazy-query.ts
│   └── index.ts
├── fragments/                # Reusable GraphQL fragments
│   ├── common.fragments.ts
│   └── index.ts
├── types/                    # TypeScript types
│   ├── common.types.ts
│   └── index.ts
└── utils/                    # Utilities
    ├── gql.ts
    ├── error-handler.ts
    └── index.ts
```

## 🚀 Cách sử dụng

### 1. Tạo Query mới

**Bước 1**: Tạo file query trong module tương ứng

```typescript
// src/graphql/queries/account/account.queries.ts
import { gql } from '../../utils/gql';

export const GET_USER_PROFILE_QUERY = gql`
  query GetUserProfile($id: ID!) {
    user(id: $id) {
      id
      name
      email
      avatar
    }
  }
`;
```

**Bước 2**: Export từ index.ts

```typescript
// src/graphql/queries/account/index.ts
export * from './account.queries';
```

**Bước 3**: Export từ queries/index.ts

```typescript
// src/graphql/queries/index.ts
export * from './account';
```

### 2. Tạo Mutation mới

Tương tự như query:

```typescript
// src/graphql/mutations/account/account.mutations.ts
import { gql } from '../../utils/gql';

export const UPDATE_USER_PROFILE_MUTATION = gql`
  mutation UpdateUserProfile($id: ID!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      name
      email
    }
  }
`;
```

### 3. Sử dụng trong Component

#### Option 1: Sử dụng custom hooks (Recommended)

```typescript
import { useProxies, useCreateProxy } from '@/graphql/hooks/overview';

function ProxiesList() {
  const { data, loading, error, refetch } = useProxies({
    pagination: { page: 1, pageSize: 10 }
  });

  const [createProxy, { loading: creating }] = useCreateProxy({
    onSuccess: () => {
      toast.success('Proxy created!');
      refetch(); // Refetch list after creation
    }
  });

  const handleCreate = () => {
    createProxy({
      variables: {
        input: {
          title: 'New Proxy',
          price: '10.00',
          unit: '/GB'
        }
      }
    });
  };

  if (loading) return <Loader />;
  if (error) return <Error message={error.message} />;

  return (
    <div>
      {data?.proxies.map(proxy => (
        <div key={proxy.id}>{proxy.title}</div>
      ))}
      <button onClick={handleCreate} disabled={creating}>
        Create Proxy
      </button>
    </div>
  );
}
```

#### Option 2: Sử dụng hooks trực tiếp

```typescript
import { useGraphQLMutation, useGraphQLQuery } from '@/graphql';
import { CREATE_PROXY_MUTATION } from '@/graphql/mutations/overview';
import { GET_PROXIES_QUERY } from '@/graphql/queries/overview';

function ProxiesList() {
  const { data, loading, error } = useGraphQLQuery({
    query: GET_PROXIES_QUERY,
    variables: { pagination: { page: 1, pageSize: 10 } },
  });

  const [createProxy] = useGraphQLMutation({
    mutation: CREATE_PROXY_MUTATION,
    onSuccess: (data) => {
      console.log('Created:', data);
    },
  });

  // ... rest of component
}
```

### 4. Error Handling

Error handling được tự động xử lý thông qua hooks. Bạn có thể customize:

```typescript
const { data, error } = useGraphQLQuery({
  query: GET_PROXIES_QUERY,
  skipErrorToast: true, // Tắt toast tự động
  onError: (message, code) => {
    // Custom error handling
    if (code === 'UNAUTHORIZED') {
      redirectToLogin();
    } else {
      showCustomError(message);
    }
  },
});
```

### 5. Lazy Queries

Sử dụng khi muốn fetch data theo action của user:

```typescript
import { useGraphQLLazyQuery } from '@/graphql';
import { GET_PROXY_BY_ID_QUERY } from '@/graphql/queries/overview';

function ProxyDetails() {
  const [loadProxy, { data, loading }] = useGraphQLLazyQuery({
    query: GET_PROXY_BY_ID_QUERY
  });

  const handleLoad = (id: string) => {
    loadProxy({ variables: { id } });
  };

  return (
    <button onClick={() => handleLoad('proxy-id')}>
      Load Proxy Details
    </button>
  );
}
```

## 🎯 Best Practices

### 1. Tổ chức theo Module/Feature

Mỗi module (overview, account, wallet, etc.) có thư mục riêng:

- `queries/{module}/`
- `mutations/{module}/`
- `hooks/{module}/`

### 2. Đặt tên rõ ràng

- Queries: `GET_{RESOURCE}_QUERY`, `GET_{RESOURCE}_BY_ID_QUERY`
- Mutations: `CREATE_{RESOURCE}_MUTATION`, `UPDATE_{RESOURCE}_MUTATION`, `DELETE_{RESOURCE}_MUTATION`
- Hooks: `use{Resource}`, `useCreate{Resource}`, `useUpdate{Resource}`

### 3. Sử dụng Fragments

Tái sử dụng fields thông qua fragments:

```typescript
// queries/account.queries.ts
import { USER_FIELDS_FRAGMENT } from '../../fragments/user.fragments';

// fragments/user.fragments.ts
export const USER_FIELDS_FRAGMENT = gql`
  fragment UserFields on User {
    id
    name
    email
    avatar
  }
`;

export const GET_USER_QUERY = gql`
  ${USER_FIELDS_FRAGMENT}
  query GetUser($id: ID!) {
    user(id: $id) {
      ...UserFields
    }
  }
`;
```

### 4. TypeScript Types

Định nghĩa types cho variables và response:

```typescript
// types/proxy.types.ts
export interface Proxy {
  id: string;
  title: string;
  price: string;
  unit: string;
  type: string;
  status: string;
}

export interface GetProxiesVariables {
  pagination?: PaginationInput;
  filter?: ProxyFilterInput;
}

export interface GetProxiesResponse {
  proxies: Proxy[];
}
```

Sử dụng trong hooks:

```typescript
export function useProxies(variables?: GetProxiesVariables) {
  return useGraphQLQuery<GetProxiesResponse, GetProxiesVariables>({
    query: GET_PROXIES_QUERY,
    variables,
  });
}
```

### 5. Cache Management

Apollo Client tự động cache queries. Để refetch sau mutation:

```typescript
const [createProxy] = useCreateProxy({
  onSuccess: () => {
    // Option 1: Refetch specific query
    refetch();

    // Option 2: Update cache manually
    apolloClient.cache.updateQuery({ query: GET_PROXIES_QUERY }, (data) => {
      // Update cache logic
      return data;
    });
  },
});
```

## 🔧 Configuration

### Environment Variables

```env
# .env.local
VITE_GRAPHQL_ENDPOINT=https://api.example.com/graphql
```

### Cache Configuration

Cache được cấu hình trong `src/graphql/client.ts`. Bạn có thể customize:

```typescript
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        proxies: {
          keyArgs: ['filter'], // Cache theo filter
          merge(existing = [], incoming) {
            return incoming; // Hoặc merge logic
          },
        },
      },
    },
  },
});
```

## 📝 Migration Guide

### Từ cấu trúc cũ sang mới

1. **Import từ path mới**:

   ```typescript
   // Cũ

   // Mới
   import { apolloClient } from '@/graphql/client';
   import { apolloClient } from '@/lib/graphql-client';
   ```

2. **Sử dụng hooks mới**:

   ```typescript
   // Cũ

   // Mới
   import { useGraphQLQuery } from '@/graphql';
   import { useQuery } from '@apollo/client';
   ```

3. **Tổ chức queries/mutations theo module**:
   - Di chuyển queries vào `src/graphql/queries/{module}/`
   - Di chuyển mutations vào `src/graphql/mutations/{module}/`

## 🐛 Troubleshooting

### Lỗi "Cannot find module '@/graphql'"

Đảm bảo path alias `@` được cấu hình trong `tsconfig.json` và `vite.config.ts`.

### Lỗi TypeScript với gql template

Sử dụng `gql` từ `@/graphql/utils/gql` thay vì từ `@apollo/client`.

### Cache không update sau mutation

Sử dụng `refetch()` hoặc update cache manually trong `onSuccess` callback.

## 📚 Tài liệu tham khảo

- [Apollo Client Documentation](https://www.apollographql.com/docs/react/)
- [GraphQL Best Practices](https://graphql.org/learn/best-practices/)
- [TypeScript với GraphQL](https://www.apollographql.com/docs/react/development-testing/static-typing/)
