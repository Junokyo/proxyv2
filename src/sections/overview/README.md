# Overview Page - LunaProxy Style

## Tổng quan

Trang Overview được thiết kế theo style của LunaProxy với bố cục responsive, bao gồm:
- Main content area với tabs và proxy cards
- Sidebar với các widgets tiện ích
- Animation mượt mà với Framer Motion

## Cấu trúc thư mục

```
src/sections/overview/
├── overview-view.tsx                    # Main view component
├── components/
│   ├── ProxyTypeTabs.tsx               # Tabs: Proxies | Scraping API
│   ├── ProxyTypeCards.tsx              # 5 proxy type cards
│   ├── ProductInfoCard.tsx             # Product info + price panel
│   ├── TrafficLineChart.tsx            # Traffic chart (Recharts)
│   ├── sidebar/
│   │   ├── ExchangeCDKeyWidget.tsx     # CDKey exchange widget
│   │   ├── AffiliateWidget.tsx         # Affiliate program widget
│   │   ├── ContactWidget.tsx           # Contact/help widget
│   │   └── index.ts
│   └── index.ts
├── data/
│   └── mock-data.ts                    # Mock data cho proxies
├── universal-api/                      # Scraping API view (existing)
└── README.md
```

## Components

### 1. ProxyTypeTabs
Tabs chính với 2 tab: Proxies và Universal Scraping API

**Props:**
- `tabs: TabItem[]` - Danh sách tabs
- `activeTab: string` - Tab đang active
- `onTabChange: (value: string) => void` - Callback khi đổi tab

### 2. ProxyTypeCards
5 cards hiển thị các loại proxy với hover effects

**Props:**
- `proxyTypes: ProxyType[]` - Danh sách proxy types
- `activeType: string` - Type đang được chọn
- `onTypeChange: (value: string) => void` - Callback khi chọn type

### 3. ProductInfoCard
Card chi tiết sản phẩm với 2 phần:
- **Left**: Icon, title, description, stats, action links
- **Right**: Gradient price panel với features list và Buy button

**Props:**
- `proxy: ProxyType` - Proxy data
- `className?: string`

### 4. TrafficLineChart
Line chart hiển thị traffic data với Recharts

**Props:**
- `data: TrafficDataPoint[]` - Chart data
- `title?: string` - Tiêu đề
- `subtitle?: string` - Phụ đề
- `className?: string`

### 5. Sidebar Widgets

#### ExchangeCDKeyWidget
Input để nhập và đổi CDKey

#### AffiliateWidget
Hiển thị thông tin affiliate:
- Commission rate
- Withdrawable amount
- Invitation code & link (với copy button)

#### ContactWidget
Social links và chat button

## Layout

```
┌─────────────────────────────────────────────┬──────────────────┐
│              MAIN CONTENT (flex-1)          │  SIDEBAR (320px) │
├─────────────────────────────────────────────┼──────────────────┤
│ [Tabs: Proxies | Scraping API]              │ Exchange CDKey   │
├─────────────────────────────────────────────┼──────────────────┤
│ [5 Proxy Type Cards - grid responsive]      │ Affiliate        │
├─────────────────────────────────────────────┼──────────────────┤
│ [Product Info Card with gradient panel]     │ Contact          │
├─────────────────────────────────────────────┤                  │
│ [Traffic Line Chart]                        │                  │
└─────────────────────────────────────────────┴──────────────────┘
```

## Responsive Breakpoints

- **Mobile** (< 640px): Single column, cards stack
- **Tablet** (640px - 1024px): 2-3 columns for cards
- **Desktop** (1024px - 1280px): Main + Sidebar stacked
- **Large Desktop** (> 1280px): Main + Sidebar side by side

## Animation

Sử dụng Framer Motion cho:
- Tab transitions (fade + slide)
- Card hover effects
- Staggered card animations

## Mock Data

Data được định nghĩa trong `data/mock-data.ts`:
- `PROXY_TYPES` - 5 loại proxy với price, features, stats
- `TRAFFIC_CHART_DATA` - Data cho chart 30 ngày
- `AFFILIATE_DATA` - Thông tin affiliate
- `MAIN_TABS` - Cấu hình tabs

## Tích hợp API

Để tích hợp với API thật, thay thế mock data bằng GraphQL queries:

```typescript
// Example
import { useProxyTypes } from '@/graphql/hooks/proxy-types';

const { data: proxyTypes, loading } = useProxyTypes();
```

## Tech Stack

- **Layout**: CSS Grid + Flexbox
- **UI Components**: Card, Tabs, Badge, Button từ @/components/ui
- **Charts**: Recharts
- **Animation**: Framer Motion (motion/react)
- **Icons**: Lucide React + Iconify

## Next Steps

- [ ] Tích hợp GraphQL queries cho proxy types
- [ ] Tích hợp GraphQL queries cho traffic data
- [ ] Implement CDKey exchange API
- [ ] Implement affiliate withdrawal
- [ ] Add real-time traffic updates
