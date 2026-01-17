# Proxy Client Project - Progress Notes

## Project Overview
- **Tech Stack**: React 18.3 + TypeScript 5.9 + Vite 7.1 + Tailwind CSS
- **UI Library**: Radix UI (radix-ui v1.4.3) + shadcn/ui components + @reui theme
- **Date Library**: date-fns + react-day-picker v9.13.0
- **Authentication**: Keycloak
- **Data Fetching**: GraphQL với custom hooks
- **Icons**: @iconify/react (mdi icon set), Lucide React
- **Repository**: https://github.com/Junokyo/proxyv2

---

## Completed Features (Jan 2025)

### 1. Account Page (`/account`)
**File**: `src/sections/account/General/GeneralSection.tsx`

Cải thiện giao diện Account với các section:
- **Profile Section**: Avatar, thông tin user, nút edit
- **Proxy Packages Section**: Hiển thị các gói proxy đang sử dụng với card layout
- **Billing Section**: Thông tin thanh toán với thiết kế card hiện đại
- **Summary Cards**: Thống kê tổng quan (Active Proxies, Total Traffic, etc.)

### 2. Order History Page (`/order-history`)
**File**: `src/sections/order-history/order-history-view.tsx`

- **Stats Cards**: 4 cards thống kê (Tổng đơn hàng, Thành công, Đang xử lý, Thất bại)
- **Tabs**: Giao dịch, Đơn hàng, Nạp tiền
- **Date Filter**: Chọn ngày để lọc dữ liệu

**Sub-components**:
- `TransactionHistory.tsx`: Lịch sử giao dịch với search, filter, modal chi tiết
- `OrderHistory.tsx`: Lịch sử đơn hàng với pagination, modal chi tiết
- `DepositHistory.tsx`: Lịch sử nạp tiền

### 3. Membership Page (`/member-ship`)
**File**: `src/sections/member-ship/MemberShipView.tsx`

- **Stats Cards**: Current Level, Gift Ratio, Total Spent, Next Level
- **Membership Header**: Progress bar đến level tiếp theo
- **Order History**: Lịch sử đơn hàng membership
- **Gift Info**: Thông tin quà tặng theo cấp bậc
- **Fix**: Thêm padding `px-4 md:px-6 lg:px-8` để tránh nội dung dính sát menu

### 4. Support Page (`/support`)
**File**: `src/sections/support/support-view.tsx`

**Contact Channels Section** (Kênh liên hệ):
- Redesign với 4 cards: Zalo, Telegram, Hotline, Email
- Mỗi card hiển thị: icon, tên, số liên hệ, thời gian phản hồi
- Tips section: Mẹo để được hỗ trợ nhanh

**Stats Cards**:
- Tổng ticket, Đang xử lý, Đã giải quyết, Hỗ trợ online 24/7

**Other Sections**:
- FAQ với search và categories
- System Status
- Report Issue dialog

### 5. Header - Wallet Balance Display
**File**: `src/layouts/demo1/components/header.tsx`

Thêm hiển thị số dư ví trên header (visible từ mọi trang):

**Desktop** (cạnh avatar):
```tsx
{authenticated && (
  <Link to="/topup" className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 transition-colors border border-emerald-200">
    <Wallet className="size-4 text-emerald-600" />
    <span className="text-sm font-semibold text-emerald-700">
      {formatVND(userBalance)}₫
    </span>
  </Link>
)}
```

**Mobile** (trong sidebar sheet):
```tsx
{authenticated && (
  <Link to="/topup" className="flex items-center justify-between w-full px-3 py-2.5 rounded-lg bg-emerald-50...">
    <div className="flex items-center gap-2">
      <Wallet className="size-5 text-emerald-600" />
      <span className="text-sm text-emerald-600">Số dư</span>
    </div>
    <span className="text-sm font-bold text-emerald-700">
      {formatVND(userBalance)}₫
    </span>
  </Link>
)}
```

**Features**:
- Chỉ hiển thị khi user đã đăng nhập (`authenticated === true`)
- Fetch balance từ GraphQL hook `useUser`
- Loading state với skeleton animation
- Click để chuyển đến trang nạp tiền `/topup`
- Format tiền Việt Nam với `Intl.NumberFormat('vi-VN')`

---

## Project Structure

```
src/
├── auth/                 # Authentication (Keycloak)
│   ├── providers/        # keycloak.provider.tsx
│   └── store/            # auth.store.ts
├── components/           # Reusable UI components
│   ├── ui/               # Button, Card, Dialog, Sheet, etc.
│   └── common/           # Container, etc.
├── config/               # Menu config, types
├── graphql/              # GraphQL queries, hooks
│   ├── hooks/            # useUser, useGraphQLQuery
│   └── queries/          # orders.ts, etc.
├── hooks/                # Custom React hooks
│   ├── use-mobile.ts
│   └── use-scroll-position.ts
├── layouts/              # Layout components
│   └── demo1/
│       ├── layout.tsx
│       └── components/   # header.tsx, sidebar-menu.tsx, toolbar.tsx
├── lib/                  # Utilities
│   ├── utils.ts          # cn() function
│   └── helpers.ts        # toAbsoluteUrl()
├── pages/                # Page components (route endpoints)
├── partials/             # Partial components
│   └── topbar/           # user-dropdown-menu.tsx, notifications-sheet.tsx
├── routing/              # App routing setup
│   └── app-routing-setup.tsx
└── sections/             # Feature sections (main UI)
    ├── account/
    ├── order-history/
    ├── member-ship/
    ├── support/
    ├── residential-proxies/
    └── overview/
```

---

## Key Hooks & APIs

### `useUser` - Fetch user data including balance
```typescript
import { useUser } from '@/graphql/hooks/users/use-users';

const { data: userData, loading } = useUser(userId, skip);
const userBalance = userData?.user?.balance ?? 0;
```

### `useKC` - Keycloak authentication
```typescript
import { useKC } from '@/auth/providers/keycloak.provider';

const { authenticated, ready, login, logout, user: kcUser } = useKC();
```

### `useGraphQLQuery` - Generic GraphQL query hook
```typescript
import { useGraphQLQuery } from '@/graphql/hooks/use-graphql-query';

const { data, loading, refetch } = useGraphQLQuery(QUERY, { variables, skip });
```

### `formatVND` - Format currency
```typescript
const formatVND = (amount: number): string => {
  return new Intl.NumberFormat('vi-VN').format(amount);
};
// Output: 1,234,567
```

---

## Admin Pages (Category Management)

Các trang quản trị cho admin:
| Path | Description |
|------|-------------|
| `/user-category` | Quản lý users |
| `/proxy-package-category` | Quản lý gói proxy |
| `/order-category` | Quản lý đơn hàng |
| `/topup-category` | Quản lý nạp tiền |
| `/wallet-category` | Quản lý ví |
| `/promotion-category` | Quản lý khuyến mãi |
| `/bank-account-category` | Quản lý tài khoản ngân hàng |
| `/setting-category` | Cài đặt hệ thống |
| `/log-category` | Xem logs |
| `/country-category` | Quản lý quốc gia |
| `/proxy-provider-category` | Quản lý nhà cung cấp proxy |
| `/proxy-type-category` | Quản lý loại proxy |
| `/loyal-category` | Quản lý loyalty |
| `/loyal-history-category` | Lịch sử loyalty |
| `/billing-history-category` | Lịch sử billing |
| `/ip-list-category` | Quản lý IP list |

---

## Styling Conventions

### Colors
- **Primary**: blue (buttons, links, highlights)
- **Success/Money**: emerald (wallet, success states)
- **Warning**: amber (pending states)
- **Info**: indigo (informational)
- **Neutral**: slate (text, borders)

### Card Styling
```tsx
<div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
  {/* content */}
</div>
```

### Icon Background Pattern
```tsx
<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
  <Icon icon="mdi:icon-name" className="h-5 w-5 text-blue-600" />
</div>
```

### Responsive Grid
```tsx
<div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
  {/* cards */}
</div>
```

### Responsive Padding
```tsx
<div className="px-4 md:px-6 lg:px-8">
  {/* content */}
</div>
```

---

## Known Issues

### DatePicker Issue (Previous)
- Click vào DatePicker button không mở được calendar popup
- Files affected: `popover.tsx`, `usage-record-view.tsx`
- Test page: `/test-datepicker`

---

## Commands

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Dev server URL
http://localhost:8080
```

---

## Git Commands

```bash
# Check status
git status

# Add all changes
git add .

# Commit
git commit -m "feat: description"

# Push to remote
git push origin dev
```

---

## Notes for Future Development

1. **Wallet Balance**: Chỉ hiển thị khi `authenticated === true`. User cần đăng nhập để xem số dư.

2. **Layout**: Tất cả pages sử dụng `Demo1Layout` từ `src/layouts/demo1/layout.tsx`

3. **Authentication**: Keycloak integration. Env variable `VITE_REQUIRE_AUTH` để bật/tắt require auth.

4. **GraphQL**: Sử dụng custom hooks, queries định nghĩa trong `src/graphql/queries/`

5. **Icons**:
   - Dùng `@iconify/react` với prefix `mdi:` cho Material Design Icons
   - Dùng `lucide-react` cho một số icons trong header
