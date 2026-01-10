# Wallet Category - Transaction Management System

## 📋 Tổng quan

Hệ thống quản lý giao dịch ví được thiết kế với kiến trúc responsive, bao gồm:
- Dialog hiển thị thống kê tổng quan và danh sách giao dịch
- Sheet hiển thị chi tiết từng giao dịch
- Tích hợp GraphQL queries và custom hooks

## 🏗️ Cấu trúc thư mục

```
src/sections/category/wallet/
├── WalletCategoryView.tsx          # Main view với table và row click handler
├── components/
│   ├── TransactionStatsSummary.tsx # Component hiển thị thống kê tổng quan
│   ├── TransactionDetailSheet.tsx  # Sheet hiển thị chi tiết giao dịch
│   ├── WalletTransactionsDialog.tsx # Dialog chính với table giao dịch
│   └── index.ts                    # Export components
└── README.md                       # Documentation

src/graphql/
├── queries/wallet-transactions/
│   ├── wallet-transactions.queries.ts # GraphQL queries
│   └── index.ts
├── types/
│   └── wallet-transactions.types.ts   # TypeScript interfaces
└── hooks/wallet-transactions/
    ├── use-wallet-transactions.ts     # Custom hooks
    └── index.ts
```

## 🔌 GraphQL Queries

### 1. WalletTransactionStats
Lấy thống kê tổng quan giao dịch của ví

```graphql
query WalletTransactionStats($walletId: ID!) {
  walletTransactionStats(walletId: $walletId) {
    walletId
    totalDeposited      # Tổng nạp tiền
    totalWithdrawn      # Tổng rút tiền
    totalPromotions     # Tổng khuyến mãi
    transactionCount    # Số lượng giao dịch
  }
}
```

### 2. WalletTransactions
Lấy danh sách giao dịch với phân trang

```graphql
query WalletTransactions(
  $walletId: ID
  $filter: FilterRequest
  $sorts: [Sort!]
  $pagination: PaginationInput
  $searchQuery: String
) {
  walletTransactions(...) {
    totalCount
    items {
      id
      walletId
      coin              # Số tiền (+ cộng, - trừ)
      type              # 1=DEPOSIT, 2=WITHDRAW, 3=PROMOTION, 4=PURCHASE, 5=REFUND, 6=ADJUSTMENT
      description       # Mô tả giao dịch
      balanceAfter      # Số dư sau giao dịch
      reference         # Mã tham chiếu
      dateInput         # Thời gian giao dịch
    }
  }
}
```

### 3. WalletTransaction
Lấy chi tiết một giao dịch

```graphql
query WalletTransaction($id: ID!) {
  walletTransaction(id: $id) {
    id
    walletId
    coin
    type
    description
    balanceAfter
    reference
    dateInput
  }
}
```

## 🎨 Components

### 1. TransactionStatsSummary
Hiển thị 4 thẻ thống kê với icon và màu sắc phân biệt:
- **Tổng nạp tiền** (Xanh lá - TrendingUp icon)
- **Tổng rút tiền** (Đỏ - TrendingDown icon)
- **Tổng khuyến mãi** (Tím - Gift icon)
- **Số giao dịch** (Xanh dương - Activity icon)

**Props:**
- `stats: WalletTransactionStats` - Dữ liệu thống kê
- `loading?: boolean` - Trạng thái loading

### 2. WalletTransactionsDialog
Dialog chính hiển thị thống kê và bảng giao dịch

**Features:**
- Responsive design (mobile bottom sheet, desktop center dialog)
- Phân trang với pagination controls
- Table view cho desktop, card list cho mobile
- Click vào row để xem chi tiết

**Props:**
- `open: boolean` - Trạng thái mở/đóng
- `onOpenChange: (open: boolean) => void` - Callback thay đổi trạng thái
- `walletId: string` - ID của ví
- `userId?: string` - ID user (hiển thị trong header)

### 3. TransactionDetailSheet
Sheet slide từ bên phải hiển thị chi tiết giao dịch

**Features:**
- Hiển thị đầy đủ thông tin giao dịch
- Badge màu sắc theo loại giao dịch
- Format số tiền và ngày tháng theo chuẩn VN
- Thông tin bổ sung với highlight

**Props:**
- `open: boolean` - Trạng thái mở/đóng
- `onOpenChange: (open: boolean) => void` - Callback thay đổi trạng thái
- `transactionId: string` - ID giao dịch cần xem

## 🎯 Cách sử dụng

### 1. Trong WalletCategoryView

```tsx
import { WalletTransactionsDialog } from './components/WalletTransactionsDialog';

export function WalletCategoryView() {
  const [selectedWalletId, setSelectedWalletId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleRowClick = (wallet: Wallet) => {
    setSelectedWalletId(wallet.id);
    setIsDialogOpen(true);
  };

  return (
    <>
      <CategoryPage onRowClick={handleRowClick} {...props} />
      
      {selectedWalletId && (
        <WalletTransactionsDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          walletId={selectedWalletId}
        />
      )}
    </>
  );
}
```

### 2. Sử dụng Custom Hooks

```tsx
import {
  useWalletTransactionStats,
  useWalletTransactions,
  useWalletTransaction,
} from '@/graphql/hooks/wallet-transactions';

// Lấy thống kê
const { data, loading } = useWalletTransactionStats('wallet-id');

// Lấy danh sách giao dịch
const { data, loading, refetch } = useWalletTransactions({
  walletId: 'wallet-id',
  pagination: { page: 0, limit: 10 },
});

// Lấy chi tiết giao dịch
const { data, loading } = useWalletTransaction('transaction-id');
```

## 🎨 Transaction Types & Colors

| Type | Value | Label | Color |
|------|-------|-------|-------|
| DEPOSIT | 1 | Nạp tiền | Green |
| WITHDRAW | 2 | Rút tiền | Red |
| PROMOTION | 3 | Khuyến mãi | Purple |
| PURCHASE | 4 | Mua hàng | Blue |
| REFUND | 5 | Hoàn tiền | Orange |
| ADJUSTMENT | 6 | Điều chỉnh | Gray |

## 📱 Responsive Design

### Mobile (< 768px)
- Dialog hiển thị dạng bottom sheet
- Drag handle ở trên cùng
- Card list thay vì table
- Touch-friendly với active states

### Desktop (≥ 768px)
- Dialog center với max-width
- Table view đầy đủ
- Hover effects
- Pagination controls

## 🔄 Data Flow

```
1. User clicks wallet row
   ↓
2. WalletCategoryView sets selectedWalletId
   ↓
3. WalletTransactionsDialog opens
   ↓
4. Fetch stats & transactions via hooks
   ↓
5. Display TransactionStatsSummary + Table
   ↓
6. User clicks transaction row
   ↓
7. TransactionDetailSheet opens
   ↓
8. Fetch transaction detail
   ↓
9. Display full transaction info
```

## 🛠️ Customization

### Thay đổi số items per page

```tsx
const [rowsPerPage] = useState(20); // Thay đổi từ 10 sang 20
```

### Thay đổi sort order

```tsx
sorts: [{ field: 'dateInput', order: 'ASC' }] // Thay đổi từ DESC sang ASC
```

### Thêm filter

```tsx
const { data } = useWalletTransactions({
  walletId,
  filter: { type: TransactionType.DEPOSIT }, // Chỉ lấy giao dịch nạp tiền
  pagination: { page: 0, limit: 10 },
});
```

## ✅ Features Checklist

- ✅ Responsive dialog cho trang danh mục ví
- ✅ Click vào row để lấy wallet ID
- ✅ Query WalletTransactionStats với interface đầy đủ
- ✅ Component summary hiển thị thống kê
- ✅ Gắn summary vào dialog
- ✅ Bảng hiển thị chi tiết giao dịch
- ✅ Query WalletTransactions với pagination
- ✅ Click vào row giao dịch mở sheet detail
- ✅ Query WalletTransaction cho chi tiết
- ✅ Format tiền tệ VND
- ✅ Format ngày giờ tiếng Việt
- ✅ Badge màu sắc theo loại giao dịch
- ✅ Mobile responsive design
- ✅ Loading states
- ✅ Error handling

## 🚀 Next Steps

Để mở rộng tính năng, có thể thêm:
- Export giao dịch ra Excel/CSV
- Filter theo loại giao dịch
- Date range picker
- Search trong giao dịch
- Real-time updates với subscriptions
- Charts/graphs cho thống kê

