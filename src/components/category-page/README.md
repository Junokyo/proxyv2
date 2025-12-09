# CategoryPage Component

Component trang danh mục dùng chung với đầy đủ tính năng CRUD, phân trang, tìm kiếm.

## Tính năng

- ✅ Bảng dữ liệu với phân trang
- ✅ Dialog thêm mới
- ✅ Dialog chỉnh sửa
- ✅ Dialog xóa với xác nhận
- ✅ Tìm kiếm trên bảng
- ✅ Sắp xếp cột
- ✅ Ẩn/hiện cột
- ✅ Responsive

## Cài đặt

Component đã được tạo sẵn trong `src/components/category-page/`. Import và sử dụng:

```tsx
import { CategoryPage, FormFieldConfig } from '@/components/category-page';
```

## Cách sử dụng

### 1. Định nghĩa Schema (Zod)

```tsx
import { z } from 'zod';

const accountSchema = z.object({
  name: z.string().min(1, 'Tên là bắt buộc'),
  email: z.string().email('Email không hợp lệ'),
  role: z.string().min(1, 'Vai trò là bắt buộc'),
});
```

### 2. Định nghĩa kiểu dữ liệu

```tsx
interface Account {
  id: string;
  name: string;
  email: string;
  role: string;
}
```

### 3. Định nghĩa Form Fields

```tsx
const formFields: FormFieldConfig[] = [
  {
    name: 'name',
    label: 'Tên',
    type: 'text',
    placeholder: 'Nhập tên',
    required: true,
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'Nhập email',
    required: true,
  },
  {
    name: 'role',
    label: 'Vai trò',
    type: 'select',
    required: true,
    options: [
      { label: 'Admin', value: 'admin' },
      { label: 'User', value: 'user' },
    ],
  },
];
```

### 4. Định nghĩa Columns

```tsx
import { ColumnDef } from '@tanstack/react-table';
import { DataGridColumnHeader } from '@/components/ui/data-grid-column-header';

const columns: ColumnDef<Account>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataGridColumnHeader title="Tên" column={column} />
    ),
    cell: ({ row }) => <div>{row.original.name}</div>,
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataGridColumnHeader title="Email" column={column} />
    ),
    cell: ({ row }) => <div>{row.original.email}</div>,
  },
];
```

### 5. Sử dụng Component

```tsx
export function AccountPage() {
  const [data, setData] = useState<Account[]>([]);

  const handleAdd = async (values: any) => {
    // Gọi API thêm mới
    const newItem = await api.addAccount(values);
    setData([...data, newItem]);
  };

  const handleEdit = async (id: string, values: any) => {
    // Gọi API cập nhật
    await api.updateAccount(id, values);
    setData(
      data.map((item) => (item.id === id ? { ...item, ...values } : item)),
    );
  };

  const handleDelete = async (id: string) => {
    // Gọi API xóa
    await api.deleteAccount(id);
    setData(data.filter((item) => item.id !== id));
  };

  return (
    <CategoryPage<Account>
      data={data}
      columns={columns}
      title="Danh mục tài khoản"
      description="Quản lý danh sách tài khoản"
      formSchema={accountSchema}
      formFields={formFields}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
      searchKeys={['name', 'email', 'role']}
      searchPlaceholder="Tìm kiếm tài khoản..."
    />
  );
}
```

## Props

### CategoryPageProps

| Prop                | Type                                                           | Required | Description                                           |
| ------------------- | -------------------------------------------------------------- | -------- | ----------------------------------------------------- |
| `data`              | `TData[]`                                                      | ✅       | Dữ liệu hiển thị trong bảng                           |
| `columns`           | `ColumnDef<TData>[]`                                           | ✅       | Định nghĩa các cột của bảng                           |
| `title`             | `string`                                                       | ✅       | Tiêu đề trang                                         |
| `description`       | `string`                                                       | ❌       | Mô tả trang                                           |
| `formSchema`        | `z.ZodSchema`                                                  | ✅       | Schema validation cho form                            |
| `formFields`        | `FormFieldConfig[]`                                            | ✅       | Cấu hình các trường form                              |
| `defaultFormValues` | `Record<string, any>`                                          | ❌       | Giá trị mặc định cho form                             |
| `onAdd`             | `(values: any) => Promise<void> \| void`                       | ✅       | Callback khi thêm mới                                 |
| `onEdit`            | `(id: string \| number, values: any) => Promise<void> \| void` | ✅       | Callback khi chỉnh sửa                                |
| `onDelete`          | `(id: string \| number) => Promise<void> \| void`              | ✅       | Callback khi xóa                                      |
| `searchKeys`        | `string[]`                                                     | ❌       | Các key để tìm kiếm                                   |
| `searchPlaceholder` | `string`                                                       | ❌       | Placeholder cho ô tìm kiếm                            |
| `defaultPageSize`   | `number`                                                       | ❌       | Số dòng mặc định (mặc định: 10)                       |
| `pageSizes`         | `number[]`                                                     | ❌       | Các tùy chọn số dòng (mặc định: [5, 10, 25, 50, 100]) |
| `isLoading`         | `boolean`                                                      | ❌       | Trạng thái loading                                    |
| `toolbarActions`    | `ReactNode`                                                    | ❌       | Các action bổ sung trên toolbar                       |

### FormFieldConfig

| Prop          | Type                                                                                            | Required | Description                      |
| ------------- | ----------------------------------------------------------------------------------------------- | -------- | -------------------------------- |
| `name`        | `string`                                                                                        | ✅       | Tên field (phải khớp với schema) |
| `label`       | `string`                                                                                        | ✅       | Nhãn hiển thị                    |
| `type`        | `'text' \| 'email' \| 'number' \| 'password' \| 'textarea' \| 'select' \| 'date' \| 'checkbox'` | ✅       | Loại input                       |
| `placeholder` | `string`                                                                                        | ❌       | Placeholder                      |
| `required`    | `boolean`                                                                                       | ❌       | Bắt buộc hay không               |
| `options`     | `{ label: string; value: string \| number }[]`                                                  | ❌       | Options cho select               |
| `rows`        | `number`                                                                                        | ❌       | Số dòng cho textarea             |
| `className`   | `string`                                                                                        | ❌       | CSS class bổ sung                |

## Ví dụ cho các màn hình

### 1. Danh mục tài khoản

```tsx
const accountSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  role: z.string(),
});

const formFields: FormFieldConfig[] = [
  { name: 'name', label: 'Tên', type: 'text', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'role', label: 'Vai trò', type: 'select', options: [...] },
];
```

### 2. Gói proxy

```tsx
const proxyPackageSchema = z.object({
  name: z.string().min(1),
  price: z.number().min(0),
  duration: z.number().min(1),
  features: z.string(),
});

const formFields: FormFieldConfig[] = [
  { name: 'name', label: 'Tên gói', type: 'text', required: true },
  { name: 'price', label: 'Giá', type: 'number', required: true },
  {
    name: 'duration',
    label: 'Thời hạn (tháng)',
    type: 'number',
    required: true,
  },
  { name: 'features', label: 'Tính năng', type: 'textarea', rows: 4 },
];
```

### 3. IP / Proxy List

```tsx
const proxySchema = z.object({
  ip: z.string().min(1),
  port: z.number().min(1).max(65535),
  type: z.string(),
  country: z.string(),
});

const formFields: FormFieldConfig[] = [
  { name: 'ip', label: 'IP', type: 'text', required: true },
  { name: 'port', label: 'Port', type: 'number', required: true },
  { name: 'type', label: 'Loại', type: 'select', options: [...] },
  { name: 'country', label: 'Quốc gia', type: 'text' },
];
```

### 4. Logs / Activity

```tsx
const logSchema = z.object({
  action: z.string().min(1),
  description: z.string(),
  timestamp: z.string(),
});

const formFields: FormFieldConfig[] = [
  { name: 'action', label: 'Hành động', type: 'text', required: true },
  { name: 'description', label: 'Mô tả', type: 'textarea', rows: 3 },
  { name: 'timestamp', label: 'Thời gian', type: 'date', required: true },
];
```

### 5. History billing / Payment

```tsx
const paymentSchema = z.object({
  amount: z.number().min(0),
  paymentMethod: z.string(),
  date: z.string(),
  description: z.string().optional(),
});

const formFields: FormFieldConfig[] = [
  { name: 'amount', label: 'Số tiền', type: 'number', required: true },
  { name: 'paymentMethod', label: 'Phương thức', type: 'select', options: [...] },
  { name: 'date', label: 'Ngày', type: 'date', required: true },
  { name: 'description', label: 'Ghi chú', type: 'textarea' },
];
```

### 6. Cấu hình / Settings

```tsx
const settingSchema = z.object({
  key: z.string().min(1),
  value: z.string(),
  type: z.string(),
  description: z.string().optional(),
});

const formFields: FormFieldConfig[] = [
  { name: 'key', label: 'Khóa', type: 'text', required: true },
  { name: 'value', label: 'Giá trị', type: 'text', required: true },
  { name: 'type', label: 'Loại', type: 'select', options: [...] },
  { name: 'description', label: 'Mô tả', type: 'textarea' },
];
```

## Lưu ý

1. **ID bắt buộc**: Tất cả items trong `data` phải có thuộc tính `id` (string hoặc number)
2. **Schema validation**: Sử dụng Zod schema để validate form
3. **Search keys**: Chỉ định các key để tìm kiếm trong `searchKeys` prop
4. **Responsive**: Component tự động responsive trên mobile và desktop
5. **Type safety**: Sử dụng TypeScript generics để đảm bảo type safety

## Tùy chỉnh

Bạn có thể tùy chỉnh thêm bằng cách:

- Thêm `toolbarActions` để thêm các button/action khác
- Override các dialog title/description
- Thêm custom columns với các cell renderer phức tạp hơn
