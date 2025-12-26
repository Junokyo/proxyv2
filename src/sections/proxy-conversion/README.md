# Page Qui Đổi Proxy

## Tổng quan
Page qui đổi proxy hoàn chỉnh với responsive design, toàn bộ sử dụng tiếng Việt.

## Cấu trúc

### 1. Qui Đổi Gói (`/proxy-conversion`)
Trang chính với 3 tab:

#### Tab 1: Qui Đổi Gói
- **Chọn hệ gói**: 4 loại proxy
  - Residential Proxies ($0.77/GB)
  - Rotating ISP Proxies ($0.4/GB)
  - ISP Proxies ($0.17/IP/Ngày)
  - Datacenter Proxies ($0.11/IP/Ngày)

- **Hiển thị số dư**: 
  - Số dư hiện tại trong ví
  - Nút nạp tiền (chuyển về trang `/deposit`)

- **Chọn dung lượng**:
  - Các gói preset: 5GB, 10GB, 45GB, 120GB, 280GB, 1000GB, 2000GB, 3000GB, 5000GB
  - Tùy chỉnh: Nhập số lượng tự do
  - Tự động tính tiền theo giá qui ước của từng gói

- **Nút hành động**:
  - "Qui Đổi Ngay": Thực hiện qui đổi
  - "Mua Gói [Tên Gói]": Chuyển sang trang proxy tương ứng

- **Exchange Details**:
  - Bảng chi tiết giao dịch
  - Filter theo loại gói đã chọn
  - Filter theo thời gian
  - Tìm kiếm theo mã giao dịch, lý do
  - Hiển thị: Mã GD, Loại gói, Dung lượng, Trừ số dư, Số dư trước/sau, Lý do, Thời gian, Trạng thái
  - Chọn nhiều dòng để xuất file

#### Tab 2: Gia Hạn Tự Động
- **Toggle bật/tắt**: Gia hạn tự động
- **Chọn loại gói**: 5 loại
  - Residential Proxies
  - Unlimited Proxies
  - Rotating ISP Proxies
  - ISP Proxies
  - Datacenter Proxies

- **Chọn thời hạn**: 30, 60, 90, 180, 365 ngày

- **Bảng chọn dung lượng**:
  - Tùy chỉnh hoặc các gói preset
  - Hiển thị đơn giá và tổng tiền

- **Cài đặt bổ sung**:
  - Tự động gia hạn khi còn X GB
  - Tự động gia hạn trước X ngày

#### Tab 3: Lịch Sử Nạp Tiền
- **Filter**:
  - Thời gian
  - Phương thức thanh toán
  - Trạng thái (Tất cả, Thành công, Đang xử lý, Thất bại)
  - Tìm kiếm theo mã đơn hàng

- **Bảng dữ liệu**:
  - Mã đơn hàng
  - Số tiền nạp
  - Phương thức
  - Trạng thái
  - Lý do từ chối (nếu có)
  - Thời gian
  - Số dư tài khoản
  - Hóa đơn (tải xuống PDF)

- **Thống kê**:
  - Số đơn thành công
  - Số đơn đang xử lý
  - Số đơn thất bại
  - Tổng tiền nạp

## Components

### ConversionPanel
- Chọn gói proxy
- Hiển thị số dư
- Input dung lượng
- Tính toán chi phí
- Nút qui đổi và mua gói

### ExchangeDetailsTable
- Bảng chi tiết giao dịch
- Filter và search
- Pagination
- Export dữ liệu

### AutomaticRenewalSection
- Cài đặt gia hạn tự động
- Chọn gói và thời hạn
- Cài đặt điều kiện gia hạn

### RechargeRecordSection
- Lịch sử nạp tiền
- Filter và search
- Thống kê tổng quan

## Responsive Design

### Mobile (< 640px)
- Layout 1 cột
- Tabs cuộn ngang
- Bảng cuộn ngang
- Buttons full width

### Tablet (640px - 1024px)
- Layout 2 cột cho cards
- Tabs responsive
- Bảng tối ưu

### Desktop (> 1024px)
- Layout 4 cột cho cards
- Full features
- Bảng đầy đủ

## Icons
Sử dụng component `<Iconify />` có sẵn với các icon từ Material Design Icons (mdi):
- `mdi:wallet-outline`
- `mdi:swap-horizontal`
- `mdi:home-city-outline`
- `mdi:cached`
- `mdi:server-network`
- `mdi:database`
- `mdi:autorenew`
- `mdi:history`
- `mdi:file-document-outline`
- `mdi:download`
- `mdi:magnify`
- `mdi:calendar-blank-outline`
- `mdi:check-circle`
- `mdi:clock-outline`
- `mdi:close-circle`
- `mdi:plus-circle-outline`
- `mdi:shopping-outline`
- `mdi:information-outline`
- `mdi:pencil-outline`

## Routing
- URL: `/proxy-conversion`
- Đã thêm vào menu sidebar với icon `RefreshCcw`
- Yêu cầu authentication

## Mock Data
Hiện tại sử dụng mock data để demo. Trong production, cần:
1. Kết nối API để lấy số dư thực
2. Kết nối API để lấy lịch sử giao dịch
3. Kết nối API để thực hiện qui đổi
4. Kết nối API để cài đặt gia hạn tự động
5. Kết nối API để lấy lịch sử nạp tiền

## Tính năng cần implement
1. API integration
2. Form validation
3. Error handling
4. Loading states
5. Success/Error notifications
6. Date range picker
7. Export to Excel/PDF
8. Real-time balance update
9. Transaction confirmation modal
10. Payment gateway integration

