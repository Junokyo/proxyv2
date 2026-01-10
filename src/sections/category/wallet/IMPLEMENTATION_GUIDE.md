# 🎯 Implementation Guide - Wallet Transaction Management

## 📦 Files Created

### GraphQL Layer
```
✅ src/graphql/queries/wallet-transactions/
   ├── wallet-transactions.queries.ts    # 3 queries: Stats, Transactions, Transaction
   └── index.ts

✅ src/graphql/types/
   └── wallet-transactions.types.ts      # Interfaces, Enums, Type definitions

✅ src/graphql/hooks/wallet-transactions/
   ├── use-wallet-transactions.ts        # 3 custom hooks
   └── index.ts
```

### UI Components
```
✅ src/sections/category/wallet/components/
   ├── TransactionStatsSummary.tsx       # 4 stat cards với icons
   ├── TransactionDetailSheet.tsx        # Sheet chi tiết giao dịch
   ├── WalletTransactionsDialog.tsx      # Dialog chính
   └── index.ts

✅ src/sections/category/wallet/
   ├── WalletCategoryView.tsx            # Updated với row click handler
   ├── README.md                         # Full documentation
   └── IMPLEMENTATION_GUIDE.md           # This file
```

### Updated Files
```
✅ src/graphql/types/index.ts            # Added wallet-transactions export
✅ src/graphql/queries/index.ts          # Added wallet-transactions export
✅ src/graphql/hooks/index.ts            # Added wallet-transactions export
```

## 🔄 User Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    Wallet Category Page                      │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  User ID  │  Coin  │  Promotion  │  Active  │  Date  │  │
│  ├───────────────────────────────────────────────────────┤  │
│  │  user-1   │  1000  │    500      │   Yes    │  ...   │◄─┼─ Click!
│  │  user-2   │  2000  │    300      │   Yes    │  ...   │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│           Wallet Transactions Dialog (Responsive)            │
├─────────────────────────────────────────────────────────────┤
│  User: user-1 • Wallet ID: wallet-123                       │
├─────────────────────────────────────────────────────────────┤
│  📊 Tổng quan giao dịch                                     │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐      │
│  │ 📈 Nạp   │ │ 📉 Rút   │ │ 🎁 KM    │ │ 📊 Số GD │      │
│  │ 5,000,000│ │ 2,000,000│ │ 500,000  │ │    25    │      │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘      │
├─────────────────────────────────────────────────────────────┤
│  📋 Lịch sử giao dịch                                       │
│  ┌───────────────────────────────────────────────────────┐ │
│  │ Time      │ Type    │ Amount    │ Balance │ Ref      │ │
│  ├───────────────────────────────────────────────────────┤ │
│  │ 10:30 AM  │ Nạp tiền│ +500,000  │ 1,500,000│ PAY123 │◄┼─ Click!
│  │ 09:15 AM  │ Mua hàng│ -100,000  │ 1,000,000│ ORD456 │ │
│  └───────────────────────────────────────────────────────┘ │
│                                          [◄] Page 1/5 [►]   │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│         Transaction Detail Sheet (Slide from right)         │
├─────────────────────────────────────────────────────────────┤
│  Chi tiết giao dịch                                    [✕]  │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Loại giao dịch:        [Nạp tiền]                  │   │
│  │                                                       │   │
│  │           Số tiền giao dịch                          │   │
│  │              +500,000 VND                            │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Mã giao dịch:      txn-123456                      │   │
│  │  Mã ví:             wallet-123                      │   │
│  │  Số dư sau GD:      1,500,000 VND                   │   │
│  │  Mô tả:             Nạp tiền qua VNPay              │   │
│  │  Mã tham chiếu:     PAY123                          │   │
│  │  Thời gian:         10/01/2026 10:30:45             │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 📝 Thông tin bổ sung                                │   │
│  │ • Giao dịch này cộng thêm 500,000 VND vào ví        │   │
│  │ • Số dư ví sau khi thực hiện: 1,500,000 VND         │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## 🎨 Component Hierarchy

```
WalletCategoryView
└── WalletTransactionsDialog
    ├── TransactionStatsSummary
    │   └── StatCard (×4)
    │       ├── Icon (TrendingUp/Down, Gift, Activity)
    │       └── Value (formatted currency/number)
    │
    ├── TransactionsTable
    │   ├── Desktop: Table with TableRow
    │   └── Mobile: Card List
    │
    └── TransactionDetailSheet
        ├── Header (Type badge, Amount)
        ├── Details (ID, Wallet, Balance, etc.)
        └── Summary (Additional info)
```

## 🔌 API Integration

### Query 1: Transaction Stats
```typescript
// Hook
const { data, loading } = useWalletTransactionStats(walletId);

// Response
data.walletTransactionStats = {
  walletId: "wallet-123",
  totalDeposited: 5000000,
  totalWithdrawn: 2000000,
  totalPromotions: 500000,
  transactionCount: 25
}
```

### Query 2: Transactions List
```typescript
// Hook
const { data, loading, refetch } = useWalletTransactions({
  walletId: "wallet-123",
  pagination: { page: 0, limit: 10 },
  sorts: [{ field: 'dateInput', order: 'DESC' }]
});

// Response
data.walletTransactions = {
  totalCount: 25,
  items: [
    {
      id: "txn-1",
      walletId: "wallet-123",
      coin: 500000,
      type: 1, // DEPOSIT
      description: "Nạp tiền qua VNPay",
      balanceAfter: 1500000,
      reference: "PAY123",
      dateInput: "2026-01-10T10:30:00Z"
    },
    // ... more items
  ]
}
```

### Query 3: Transaction Detail
```typescript
// Hook
const { data, loading } = useWalletTransaction(transactionId);

// Response
data.walletTransaction = {
  id: "txn-1",
  walletId: "wallet-123",
  coin: 500000,
  type: 1,
  description: "Nạp tiền qua VNPay",
  balanceAfter: 1500000,
  reference: "PAY123",
  dateInput: "2026-01-10T10:30:00Z"
}
```

## 🎯 Transaction Types

```typescript
enum TransactionType {
  DEPOSIT = 1,      // 🟢 Nạp tiền (Green)
  WITHDRAW = 2,     // 🔴 Rút tiền (Red)
  PROMOTION = 3,    // 🟣 Khuyến mãi (Purple)
  PURCHASE = 4,     // 🔵 Mua hàng (Blue)
  REFUND = 5,       // 🟠 Hoàn tiền (Orange)
  ADJUSTMENT = 6    // ⚫ Điều chỉnh (Gray)
}
```

## 📱 Responsive Breakpoints

```css
/* Mobile First */
< 640px  (sm)  : Stack layout, card list, bottom sheet
640px - 768px  : 2 columns for stats
768px - 1024px : Table view, 2 columns for stats
> 1024px (lg)  : Full table, 4 columns for stats, center dialog
```

## ✨ Key Features

### 1. **Smart Loading States**
- Skeleton loaders for stats cards
- Spinner for transactions table
- Conditional rendering based on data availability

### 2. **Responsive Design**
- Mobile: Bottom sheet dialog, card list, touch-friendly
- Desktop: Center dialog, full table, hover effects

### 3. **Data Formatting**
- Currency: `1.000.000 ₫` (Vietnamese format)
- Date: `10/01/2026 10:30:45` (Vietnamese format)
- Numbers: `1.234` (Vietnamese thousand separator)

### 4. **Color Coding**
- Positive amounts: Green (+500.000 ₫)
- Negative amounts: Red (-100.000 ₫)
- Transaction types: Colored badges

### 5. **Pagination**
- Server-side pagination
- Page controls with prev/next buttons
- Current page indicator

### 6. **Interactive Elements**
- Click wallet row → Open dialog
- Click transaction row → Open detail sheet
- Smooth transitions and animations

## 🧪 Testing Checklist

- [ ] Click wallet row opens dialog
- [ ] Stats display correctly
- [ ] Transactions table loads with pagination
- [ ] Click transaction row opens detail sheet
- [ ] Detail sheet shows all information
- [ ] Mobile responsive (< 768px)
- [ ] Desktop responsive (≥ 768px)
- [ ] Loading states work
- [ ] Empty states work
- [ ] Currency formatting is correct
- [ ] Date formatting is correct
- [ ] Badge colors match transaction types
- [ ] Pagination works
- [ ] Close buttons work

## 🚀 Deployment Notes

### Environment Requirements
- React 18+
- TypeScript 4.5+
- TanStack Table v8
- Apollo Client
- Radix UI
- Tailwind CSS

### GraphQL Schema Requirements
Ensure your backend has these queries:
- `walletTransactionStats(walletId: ID!)`
- `walletTransactions(walletId: ID, pagination: PaginationInput, ...)`
- `walletTransaction(id: ID!)`

### Performance Considerations
- Pagination limit: 10 items (adjustable)
- Lazy loading for detail sheet
- Skip queries when dialogs are closed
- Refetch on dialog open

## 📚 Additional Resources

- [Main Documentation](./README.md)
- [GraphQL Queries](../../graphql/queries/wallet-transactions/)
- [TypeScript Types](../../graphql/types/wallet-transactions.types.ts)
- [Custom Hooks](../../graphql/hooks/wallet-transactions/)

---

**Status:** ✅ Complete and Ready for Use

**Last Updated:** 2026-01-10

