# GraphQL Usage Examples

## 📚 Ví dụ sử dụng GraphQL trong project

### 1. Component với Query đơn giản

```typescript
// src/sections/overview/proxies/proxies-list.tsx
import { useProxies } from '@/graphql/hooks/overview';
import { Loader } from '@/components/common/screen-loader';
import { Alert } from '@/components/ui/alert';

export function ProxiesList() {
  const { data, loading, error, refetch } = useProxies({
    pagination: { page: 1, pageSize: 20 }
  });

  if (loading) return <Loader />;
  if (error) return <Alert variant="destructive">{error.message}</Alert>;

  return (
    <div>
      <h2>Proxies List</h2>
      {data?.proxies.map(proxy => (
        <div key={proxy.id}>
          <h3>{proxy.title}</h3>
          <p>{proxy.price} {proxy.unit}</p>
        </div>
      ))}
      <button onClick={() => refetch()}>Refresh</button>
    </div>
  );
}
```

### 2. Component với Mutation

```typescript
// src/sections/overview/proxies/create-proxy-form.tsx
import { useState } from 'react';
import { useCreateProxy } from '@/graphql/hooks/overview';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function CreateProxyForm({ onSuccess }: { onSuccess?: () => void }) {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [unit, setUnit] = useState('/GB');

  const [createProxy, { loading }] = useCreateProxy({
    onSuccess: () => {
      toast.success('Proxy created successfully!');
      setTitle('');
      setPrice('');
      onSuccess?.(); // Callback để refetch list
    },
    onError: (message) => {
      toast.error(`Failed to create proxy: ${message}`);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    createProxy({
      variables: {
        input: {
          title,
          price,
          unit
        }
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Proxy title"
        required
      />
      <Input
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
        type="number"
        required
      />
      <Input
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
        placeholder="Unit"
        required
      />
      <Button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create Proxy'}
      </Button>
    </form>
  );
}
```

### 3. Component với CRUD đầy đủ

```typescript
// src/sections/overview/proxies/proxies-management.tsx
import { useState } from 'react';
import { useProxies, useUpdateProxy, useDeleteProxy } from '@/graphql/hooks/overview';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

export function ProxiesManagement() {
  const [editingProxy, setEditingProxy] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ title: '', price: '', unit: '' });

  const { data, loading, refetch } = useProxies();
  const [updateProxy, { loading: updating }] = useUpdateProxy({
    onSuccess: () => {
      toast.success('Proxy updated!');
      setEditingProxy(null);
      refetch();
    }
  });
  const [deleteProxy, { loading: deleting }] = useDeleteProxy({
    onSuccess: () => {
      toast.success('Proxy deleted!');
      refetch();
    }
  });

  const handleEdit = (proxy: { id: string; title: string; price: string; unit: string }) => {
    setEditingProxy(proxy.id);
    setEditForm({ title: proxy.title, price: proxy.price, unit: proxy.unit });
  };

  const handleUpdate = () => {
    if (!editingProxy) return;

    updateProxy({
      variables: {
        id: editingProxy,
        input: editForm
      }
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm('Are you sure you want to delete this proxy?')) return;

    deleteProxy({
      variables: { id }
    });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Manage Proxies</h2>
      
      {data?.proxies.map(proxy => (
        <div key={proxy.id} className="flex items-center justify-between p-4 border">
          <div>
            <h3>{proxy.title}</h3>
            <p>{proxy.price} {proxy.unit}</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => handleEdit(proxy)}>Edit</Button>
            <Button 
              variant="destructive" 
              onClick={() => handleDelete(proxy.id)}
              disabled={deleting}
            >
              Delete
            </Button>
          </div>
        </div>
      ))}

      <Dialog open={!!editingProxy} onOpenChange={() => setEditingProxy(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Proxy</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              value={editForm.title}
              onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
              placeholder="Title"
            />
            <Input
              value={editForm.price}
              onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
              placeholder="Price"
            />
            <Input
              value={editForm.unit}
              onChange={(e) => setEditForm({ ...editForm, unit: e.target.value })}
              placeholder="Unit"
            />
            <Button onClick={handleUpdate} disabled={updating}>
              {updating ? 'Updating...' : 'Update'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
```

### 4. Sử dụng Lazy Query

```typescript
// src/components/proxy-details-modal.tsx
import { useGraphQLLazyQuery } from '@/graphql';
import { GET_PROXY_BY_ID_QUERY } from '@/graphql/queries/overview';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';

export function ProxyDetailsModal({ proxyId }: { proxyId: string }) {
  const [loadProxy, { data, loading, called }] = useGraphQLLazyQuery({
    query: GET_PROXY_BY_ID_QUERY
  });

  const handleOpen = () => {
    loadProxy({ variables: { id: proxyId } });
  };

  return (
    <>
      <Button onClick={handleOpen}>View Details</Button>
      
      <Dialog open={called && !loading}>
        <DialogContent>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div>
              <h2>{data?.proxy.title}</h2>
              <p>{data?.proxy.price} {data?.proxy.unit}</p>
              <p>{data?.proxy.description}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
```

### 5. Custom Error Handling

```typescript
// src/sections/overview/proxies/proxies-with-custom-error.tsx
import { useProxies } from '@/graphql/hooks/overview';
import { useRouter } from 'react-router-dom';
import { toast } from 'sonner';

export function ProxiesWithCustomError() {
  const router = useRouter();

  const { data, error } = useProxies({
    skipErrorToast: true, // Tắt toast tự động
    onError: (message, code) => {
      // Custom error handling
      if (code === 'UNAUTHORIZED') {
        toast.error('Please login to continue');
        router.push('/auth/signin');
      } else if (code === 'FORBIDDEN') {
        toast.error('You do not have permission to view this');
      } else {
        toast.error(`Error: ${message}`);
      }
    }
  });

  // ... rest of component
}
```

### 6. Pagination Example

```typescript
// src/sections/overview/proxies/proxies-pagination.tsx
import { useState } from 'react';
import { useProxies } from '@/graphql/hooks/overview';
import { Button } from '@/components/ui/button';

export function ProxiesPagination() {
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const { data, loading } = useProxies({
    pagination: { page, pageSize }
  });

  const pagination = data?.pagination;

  return (
    <div>
      <div>
        {data?.proxies.map(proxy => (
          <div key={proxy.id}>{proxy.title}</div>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <Button
          onClick={() => setPage(p => p - 1)}
          disabled={!pagination?.hasPreviousPage || loading}
        >
          Previous
        </Button>
        
        <span>
          Page {pagination?.page} of {pagination?.totalPages}
        </span>
        
        <Button
          onClick={() => setPage(p => p + 1)}
          disabled={!pagination?.hasNextPage || loading}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
```

### 7. Optimistic Updates

```typescript
// src/sections/overview/proxies/proxies-optimistic.tsx
import { useUpdateProxy } from '@/graphql/hooks/overview';
import { apolloClient } from '@/graphql/client';
import { GET_PROXIES_QUERY } from '@/graphql/queries/overview';

export function ProxiesOptimistic() {
  const [updateProxy] = useUpdateProxy({
    onSuccess: () => {
      // Cache sẽ tự động update
    }
  });

  const handleUpdate = (id: string, newTitle: string) => {
    // Optimistic update
    apolloClient.cache.updateQuery(
      { query: GET_PROXIES_QUERY },
      (data) => {
        if (!data) return data;
        
        return {
          ...data,
          proxies: data.proxies.map((proxy: { id: string; title: string }) =>
            proxy.id === id ? { ...proxy, title: newTitle } : proxy
          )
        };
      }
    );

    // Then perform actual mutation
    updateProxy({
      variables: {
        id,
        input: { title: newTitle }
      }
    });
  };

  // ... rest of component
}
```

### 8. Bulk Operations

```typescript
// src/sections/overview/proxies/proxies-bulk-actions.tsx
import { useState } from 'react';
import { useBulkDeleteProxies } from '@/graphql/hooks/overview';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

export function ProxiesBulkActions() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const [bulkDelete, { loading }] = useBulkDeleteProxies({
    onSuccess: (data) => {
      toast.success(`Deleted ${data?.bulkDeleteProxies?.deletedCount} proxies`);
      setSelectedIds([]);
    }
  });

  const handleBulkDelete = () => {
    if (selectedIds.length === 0) return;
    if (!confirm(`Delete ${selectedIds.length} proxies?`)) return;

    bulkDelete({
      variables: { ids: selectedIds }
    });
  };

  return (
    <div>
      <div className="flex items-center gap-2">
        <span>{selectedIds.length} selected</span>
        <Button
          onClick={handleBulkDelete}
          disabled={selectedIds.length === 0 || loading}
          variant="destructive"
        >
          Delete Selected
        </Button>
      </div>
      {/* ... proxy list with checkboxes */}
    </div>
  );
}
```

