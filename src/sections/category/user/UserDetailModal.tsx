import { useState } from 'react';
import { Icon } from '@iconify/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Account } from './UserCategoryView';

export function UserDetailModal({
  open,
  onClose,
  user,
}: {
  open: boolean;
  onClose: () => void;
  user: Account | null;
}) {
  const [activeTab, setActiveTab] = useState('purchase-history');
  const [purchaseTab, setPurchaseTab] = useState(0);
  const [balanceDialogOpen, setBalanceDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [balanceAmount, setBalanceAmount] = useState('');
  const [balanceType, setBalanceType] = useState<'increase' | 'decrease'>(
    'increase',
  );
  const [pendingAmount, setPendingAmount] = useState(0);
  const [pendingType, setPendingType] = useState<'increase' | 'decrease'>(
    'increase',
  );
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [statusConfirmDialogOpen, setStatusConfirmDialogOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<boolean>(true);
  const [statusReason, setStatusReason] = useState('');
  const [pendingStatus, setPendingStatus] = useState<boolean>(true);
  const [pendingStatusReason, setPendingStatusReason] = useState('');

  if (!open || !user) return null;

  const currentBalance = user.walletBalance ?? 0;

  const handleBalanceCardClick = () => {
    setBalanceAmount('');
    setBalanceType('increase');
    setBalanceDialogOpen(true);
  };

  const handleBalanceSubmit = () => {
    const amount = parseFloat(balanceAmount);
    if (isNaN(amount) || amount <= 0) {
      return;
    }
    setPendingAmount(amount);
    setPendingType(balanceType);
    setBalanceDialogOpen(false);
    setConfirmDialogOpen(true);
  };

  const handleConfirmBalance = () => {
    // TODO: Call API to update balance
    const newBalance =
      pendingType === 'increase'
        ? currentBalance + pendingAmount
        : currentBalance - pendingAmount;

    // Update user balance (in real app, this would be done via API)
    if (user) {
      user.walletBalance = newBalance;
    }

    setConfirmDialogOpen(false);
    setPendingAmount(0);
    // TODO: Refresh user data from API
  };

  const handleStatusCardClick = () => {
    setNewStatus(user.status ?? true);
    setStatusReason('');
    setStatusDialogOpen(true);
  };

  const handleStatusSubmit = () => {
    setPendingStatus(newStatus);
    setPendingStatusReason(statusReason);
    setStatusDialogOpen(false);
    setStatusConfirmDialogOpen(true);
  };

  const handleConfirmStatus = () => {
    // TODO: Call API to update status
    if (user) {
      user.status = pendingStatus;
    }

    setStatusConfirmDialogOpen(false);
    setStatusReason('');
    // TODO: Refresh user data from API
  };

  // Mock data - sẽ được thay thế bằng API thực tế
  const loginHistory = [
    {
      id: '1',
      ip: '192.168.1.100',
      location: 'Hà Nội, Việt Nam',
      time: '2024-01-15 10:30:00',
      status: 'success',
    },
    {
      id: '2',
      ip: '192.168.1.101',
      location: 'TP.HCM, Việt Nam',
      time: '2024-01-14 15:20:00',
      status: 'success',
    },
    {
      id: '3',
      ip: '192.168.1.102',
      location: 'Đà Nẵng, Việt Nam',
      time: '2024-01-13 09:15:00',
      status: 'failed',
    },
  ];

  const deviceHistory = [
    {
      id: '1',
      device: 'Windows 10 - Chrome',
      ip: '192.168.1.100',
      loginTime: '2024-01-15 10:30:00',
      logoutTime: '2024-01-15 18:45:00',
      status: 'active',
    },
    {
      id: '2',
      device: 'MacOS - Safari',
      ip: '192.168.1.101',
      loginTime: '2024-01-14 15:20:00',
      logoutTime: '2024-01-14 20:30:00',
      status: 'inactive',
    },
    {
      id: '3',
      device: 'Android - Chrome Mobile',
      ip: '192.168.1.102',
      loginTime: '2024-01-13 09:15:00',
      logoutTime: null,
      status: 'active',
    },
  ];

  // Mock data - sẽ được thay thế bằng API thực tế
  const balanceHistory = [
    {
      id: '1',
      time: '2024-01-15 14:30:00',
      type: 'increase' as const,
      amount: 500000,
      balanceBefore: 1000000,
      balanceAfter: 1500000,
      note: 'Nạp tiền vào ví',
      actionBy: 'system_recharge' as const,
      actionByDetail: 'Hệ thống',
    },
    {
      id: '2',
      time: '2024-01-14 10:20:00',
      type: 'decrease' as const,
      amount: 200000,
      balanceBefore: 1200000,
      balanceAfter: 1000000,
      note: 'Thanh toán gói proxy',
      actionBy: 'system_recharge' as const,
      actionByDetail: 'Hệ thống',
    },
    {
      id: '3',
      time: '2024-01-13 09:15:00',
      type: 'increase' as const,
      amount: 300000,
      balanceBefore: 900000,
      balanceAfter: 1200000,
      note: 'Hoàn tiền',
      actionBy: 'admin_adjustment' as const,
      actionByDetail: 'Admin: Nguyễn Văn A',
    },
    {
      id: '4',
      time: '2024-01-12 16:45:00',
      type: 'increase' as const,
      amount: 1000000,
      balanceBefore: 0,
      balanceAfter: 1000000,
      note: 'Chuyển tiền từ user khác',
      actionBy: 'user_transfer' as const,
      actionByDetail: 'user@example.com',
    },
  ];

  const purchaseHistoryTabs = [
    'Residential Proxies',
    'Unlimited Proxies',
    'ISP Proxies',
    'Datacenter Proxies',
    'Rotating ISP Proxies',
    'YouTube Downloader',
    'Universal Scraping API',
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const purchaseRows: any[] = []; // Mock data - sẽ được thay thế bằng API

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden
      />
      <div className="relative z-10 w-full max-w-6xl max-h-[90vh] rounded-lg bg-white shadow-lg flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-semibold">Chi tiết tài khoản</h2>
            <p className="text-sm text-slate-500 mt-1">{user.email}</p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <Icon icon="mdi:close" className="h-5 w-5" />
          </Button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* User Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {/* Wallet Balance */}
            <Card
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={handleBalanceCardClick}
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-slate-600">
                  Số dư ví
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-blue-600">
                    {currentBalance.toLocaleString('vi-VN')} VNĐ
                  </div>
                  <Icon
                    icon="mdi:pencil"
                    className="h-5 w-5 text-slate-400 hover:text-blue-600"
                  />
                </div>
              </CardContent>
            </Card>

            {/* User Status */}
            <Card
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={handleStatusCardClick}
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-slate-600">
                  Trạng thái
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-3 w-3 rounded-full ${
                        user.status ? 'bg-green-500' : 'bg-red-500'
                      }`}
                    />
                    <span className="text-lg font-semibold">
                      {user.status ? 'Active' : 'Suspended'}
                    </span>
                  </div>
                  <Icon
                    icon="mdi:pencil"
                    className="h-5 w-5 text-slate-400 hover:text-blue-600"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Total Proxies Purchased */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-slate-600">
                  Tổng proxy đã mua
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">
                  {user.totalProxiesPurchased ?? user.proxiesRemaining ?? '0'}
                </div>
              </CardContent>
            </Card>

            {/* Total Bandwidth Used */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-slate-600">
                  Tổng băng thông đã dùng
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">
                  {user.totalBandwidthUsed ?? user.usedAmount ?? '0'} GB
                </div>
              </CardContent>
            </Card>

            {/* Total Requests */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-slate-600">
                  Tổng Request
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">
                  {user.totalRequests?.toLocaleString('vi-VN') ?? '0'}
                </div>
              </CardContent>
            </Card>

            {/* Total Traffic */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-slate-600">
                  Tổng Traffic
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">
                  {user.totalTraffic ?? '0'} GB
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Last Login IP Card */}
          {user.lastLoginIP && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-base font-semibold">
                  IP Login gần nhất
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-lg font-semibold text-slate-900">
                      {user.lastLoginIP}
                    </div>
                    {user.lastLoginTime && (
                      <div className="text-sm text-slate-500 mt-1">
                        {user.lastLoginTime}
                      </div>
                    )}
                  </div>
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <Icon
                      icon="mdi:ip-network"
                      className="h-6 w-6 text-blue-600"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Tabs Section */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="purchase-history">
                Lịch sử mua hàng
              </TabsTrigger>
              <TabsTrigger value="login-history">Lịch sử đăng nhập</TabsTrigger>
              <TabsTrigger value="device-login">Thiết bị đăng nhập</TabsTrigger>
              <TabsTrigger value="balance-history">Lịch sử số dư</TabsTrigger>
            </TabsList>

            {/* Purchase History Tab */}
            <TabsContent value="purchase-history" className="mt-6">
              <div className="w-full rounded-2xl bg-white border border-slate-100">
                {/* Purchase History Tabs */}
                <div className="mb-4 overflow-x-auto border-b border-slate-100">
                  <div className="inline-flex min-w-full gap-1">
                    {purchaseHistoryTabs.map((label, idx) => {
                      const active = idx === purchaseTab;
                      return (
                        <button
                          key={label}
                          type="button"
                          onClick={() => setPurchaseTab(idx)}
                          className={`whitespace-nowrap rounded-t-lg px-4 py-2 text-xs sm:text-sm font-medium
                            ${
                              active
                                ? 'bg-white text-blue-600 shadow-[0_-1px_0_0_#ffffff] border border-b-transparent border-slate-200'
                                : 'bg-slate-100 text-slate-600 border border-transparent hover:bg-slate-200'
                            }`}
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Purchase History Table */}
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left text-xs sm:text-sm">
                    <thead className="bg-slate-50 text-[11px] font-medium text-slate-500 sm:text-xs">
                      <tr>
                        <th className="px-4 py-3">Order Number</th>
                        <th className="px-4 py-3">Name</th>
                        <th className="px-4 py-3">Traffic</th>
                        <th className="px-4 py-3">Period</th>
                        <th className="px-4 py-3">Order Amount</th>
                        <th className="px-4 py-3">Payment Method</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Denial Reason</th>
                        <th className="px-4 py-3">Payment time</th>
                        <th className="px-4 py-3">Invoice</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-700">
                      {purchaseRows.length === 0 ? (
                        <tr>
                          <td
                            colSpan={10}
                            className="py-16 text-center text-xs text-slate-500 sm:text-sm"
                          >
                            <div className="flex flex-col items-center gap-3">
                              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-50">
                                <Icon
                                  icon="mdi:robot-confused-outline"
                                  className="h-10 w-10 text-slate-300"
                                />
                              </div>
                              <span>No order yet</span>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        purchaseRows.map((_row, idx) => (
                          <tr
                            key={idx}
                            className={idx % 2 === 1 ? 'bg-slate-50/50' : ''}
                          >
                            {/* Data cells will be filled when API is connected */}
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            {/* Login History Tab */}
            <TabsContent value="login-history" className="mt-6">
              <div className="rounded-2xl border border-slate-100 bg-white overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left text-xs sm:text-sm">
                    <thead className="bg-slate-50 text-[11px] font-medium text-slate-500 sm:text-xs">
                      <tr>
                        <th className="px-4 py-3">Thời gian</th>
                        <th className="px-4 py-3">IP Address</th>
                        <th className="px-4 py-3">Vị trí</th>
                        <th className="px-4 py-3">Trạng thái</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-700">
                      {loginHistory.length === 0 ? (
                        <tr>
                          <td
                            colSpan={4}
                            className="py-16 text-center text-xs text-slate-500 sm:text-sm"
                          >
                            <div className="flex flex-col items-center gap-3">
                              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-50">
                                <Icon
                                  icon="mdi:history"
                                  className="h-10 w-10 text-slate-300"
                                />
                              </div>
                              <span>Chưa có lịch sử đăng nhập</span>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        loginHistory.map((item) => (
                          <tr
                            key={item.id}
                            className="border-b border-slate-100"
                          >
                            <td className="px-4 py-3">{item.time}</td>
                            <td className="px-4 py-3 font-mono">{item.ip}</td>
                            <td className="px-4 py-3">{item.location}</td>
                            <td className="px-4 py-3">
                              <span
                                className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                                  item.status === 'success'
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-red-100 text-red-700'
                                }`}
                              >
                                {item.status === 'success' ? (
                                  <>
                                    <Icon
                                      icon="mdi:check-circle"
                                      className="h-3 w-3"
                                    />
                                    Thành công
                                  </>
                                ) : (
                                  <>
                                    <Icon
                                      icon="mdi:close-circle"
                                      className="h-3 w-3"
                                    />
                                    Thất bại
                                  </>
                                )}
                              </span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            {/* Device Login Tab */}
            <TabsContent value="device-login" className="mt-6">
              <div className="rounded-2xl border border-slate-100 bg-white overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left text-xs sm:text-sm">
                    <thead className="bg-slate-50 text-[11px] font-medium text-slate-500 sm:text-xs">
                      <tr>
                        <th className="px-4 py-3">Thiết bị</th>
                        <th className="px-4 py-3">IP Address</th>
                        <th className="px-4 py-3">Thời gian đăng nhập</th>
                        <th className="px-4 py-3">Thời gian đăng xuất</th>
                        <th className="px-4 py-3">Trạng thái</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-700">
                      {deviceHistory.length === 0 ? (
                        <tr>
                          <td
                            colSpan={5}
                            className="py-16 text-center text-xs text-slate-500 sm:text-sm"
                          >
                            <div className="flex flex-col items-center gap-3">
                              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-50">
                                <Icon
                                  icon="mdi:devices"
                                  className="h-10 w-10 text-slate-300"
                                />
                              </div>
                              <span>Chưa có thiết bị đăng nhập</span>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        deviceHistory.map((item) => (
                          <tr
                            key={item.id}
                            className="border-b border-slate-100"
                          >
                            <td className="px-4 py-3">{item.device}</td>
                            <td className="px-4 py-3 font-mono">{item.ip}</td>
                            <td className="px-4 py-3">{item.loginTime}</td>
                            <td className="px-4 py-3">
                              {item.logoutTime ?? '—'}
                            </td>
                            <td className="px-4 py-3">
                              <span
                                className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                                  item.status === 'active'
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-slate-100 text-slate-700'
                                }`}
                              >
                                {item.status === 'active' ? (
                                  <>
                                    <Icon
                                      icon="mdi:circle"
                                      className="h-2 w-2"
                                    />
                                    Đang hoạt động
                                  </>
                                ) : (
                                  <>
                                    <Icon
                                      icon="mdi:circle-outline"
                                      className="h-2 w-2"
                                    />
                                    Đã đăng xuất
                                  </>
                                )}
                              </span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            {/* Balance History Tab */}
            <TabsContent value="balance-history" className="mt-6">
              <div className="rounded-2xl border border-slate-100 bg-white overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left text-xs sm:text-sm">
                    <thead className="bg-slate-50 text-[11px] font-medium text-slate-500 sm:text-xs">
                      <tr>
                        <th className="px-4 py-3">Thời gian</th>
                        <th className="px-4 py-3">Loại giao dịch</th>
                        <th className="px-4 py-3">Số tiền</th>
                        <th className="px-4 py-3">Số dư trước</th>
                        <th className="px-4 py-3">Số dư sau</th>
                        <th className="px-4 py-3">Thao tác bởi</th>
                        <th className="px-4 py-3">Ghi chú</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-700">
                      {balanceHistory.length === 0 ? (
                        <tr>
                          <td
                            colSpan={7}
                            className="py-16 text-center text-xs text-slate-500 sm:text-sm"
                          >
                            <div className="flex flex-col items-center gap-3">
                              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-50">
                                <Icon
                                  icon="mdi:wallet-outline"
                                  className="h-10 w-10 text-slate-300"
                                />
                              </div>
                              <span>Chưa có lịch sử số dư</span>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        balanceHistory.map((item) => (
                          <tr
                            key={item.id}
                            className="border-b border-slate-100"
                          >
                            <td className="px-4 py-3">{item.time}</td>
                            <td className="px-4 py-3">
                              <span
                                className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                                  item.type === 'increase'
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-red-100 text-red-700'
                                }`}
                              >
                                {item.type === 'increase' ? (
                                  <>
                                    <Icon
                                      icon="mdi:arrow-up"
                                      className="h-3 w-3"
                                    />
                                    Tăng
                                  </>
                                ) : (
                                  <>
                                    <Icon
                                      icon="mdi:arrow-down"
                                      className="h-3 w-3"
                                    />
                                    Giảm
                                  </>
                                )}
                              </span>
                            </td>
                            <td
                              className={`px-4 py-3 font-semibold ${
                                item.type === 'increase'
                                  ? 'text-green-600'
                                  : 'text-red-600'
                              }`}
                            >
                              {item.type === 'increase' ? '+' : '-'}
                              {item.amount.toLocaleString('vi-VN')} VNĐ
                            </td>
                            <td className="px-4 py-3">
                              {item.balanceBefore.toLocaleString('vi-VN')} VNĐ
                            </td>
                            <td className="px-4 py-3 font-semibold">
                              {item.balanceAfter.toLocaleString('vi-VN')} VNĐ
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                {item.actionBy === 'admin_adjustment' && (
                                  <Icon
                                    icon="mdi:account-cog"
                                    className="h-4 w-4 text-blue-600"
                                  />
                                )}
                                {item.actionBy === 'user_transfer' && (
                                  <Icon
                                    icon="mdi:account-arrow-right"
                                    className="h-4 w-4 text-purple-600"
                                  />
                                )}
                                {item.actionBy === 'system_recharge' && (
                                  <Icon
                                    icon="mdi:server"
                                    className="h-4 w-4 text-slate-600"
                                  />
                                )}
                                <span className="text-xs sm:text-sm">
                                  {item.actionBy === 'admin_adjustment' && (
                                    <span className="text-blue-600 font-medium">
                                      {item.actionByDetail}
                                    </span>
                                  )}
                                  {item.actionBy === 'user_transfer' && (
                                    <span className="text-purple-600 font-medium">
                                      {item.actionByDetail}
                                    </span>
                                  )}
                                  {item.actionBy === 'system_recharge' && (
                                    <span className="text-slate-600">
                                      {item.actionByDetail}
                                    </span>
                                  )}
                                </span>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-slate-500">
                              {item.note ?? '—'}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t">
          <Button onClick={onClose}>Đóng</Button>
        </div>
      </div>

      {/* Balance Adjustment Dialog */}
      <Dialog open={balanceDialogOpen} onOpenChange={setBalanceDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Điều chỉnh số dư ví</DialogTitle>
            <DialogDescription>
              Nhập số tiền cần tăng hoặc giảm cho tài khoản {user.email}
            </DialogDescription>
          </DialogHeader>
          <DialogBody>
            <div className="space-y-4">
              {/* Balance Type Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Loại giao dịch
                </label>
                <Select
                  value={balanceType}
                  onValueChange={(value: 'increase' | 'decrease') =>
                    setBalanceType(value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="increase">Tăng số dư</SelectItem>
                    <SelectItem value="decrease">Giảm số dư</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Amount Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Số tiền (VNĐ)
                </label>
                <Input
                  type="number"
                  placeholder="Nhập số tiền"
                  value={balanceAmount}
                  onChange={(e) => setBalanceAmount(e.target.value)}
                  min="0"
                  step="1000"
                />
              </div>

              {/* Current Balance Display */}
              <div className="rounded-lg bg-slate-50 p-3">
                <div className="text-xs text-slate-500 mb-1">
                  Số dư hiện tại
                </div>
                <div className="text-lg font-semibold text-slate-900">
                  {currentBalance.toLocaleString('vi-VN')} VNĐ
                </div>
              </div>

              {/* Preview New Balance */}
              {balanceAmount && !isNaN(parseFloat(balanceAmount)) && (
                <div className="rounded-lg bg-blue-50 p-3">
                  <div className="text-xs text-blue-600 mb-1">
                    Số dư sau điều chỉnh
                  </div>
                  <div className="text-lg font-semibold text-blue-700">
                    {(balanceType === 'increase'
                      ? currentBalance + parseFloat(balanceAmount)
                      : currentBalance - parseFloat(balanceAmount)
                    ).toLocaleString('vi-VN')}{' '}
                    VNĐ
                  </div>
                </div>
              )}
            </div>
          </DialogBody>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Hủy
              </Button>
            </DialogClose>
            <Button
              type="button"
              onClick={handleBalanceSubmit}
              disabled={
                !balanceAmount ||
                isNaN(parseFloat(balanceAmount)) ||
                parseFloat(balanceAmount) <= 0 ||
                (balanceType === 'decrease' &&
                  parseFloat(balanceAmount) > currentBalance)
              }
            >
              Xác nhận
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Xác nhận điều chỉnh số dư</DialogTitle>
            <DialogDescription>
              Vui lòng xác nhận thông tin điều chỉnh số dư
            </DialogDescription>
          </DialogHeader>
          <DialogBody>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="text-sm text-slate-500">Người dùng</div>
                <div className="text-base font-medium">{user.email}</div>
              </div>

              <div className="space-y-2">
                <div className="text-sm text-slate-500">Loại giao dịch</div>
                <div className="text-base font-medium">
                  {pendingType === 'increase' ? 'Tăng số dư' : 'Giảm số dư'}
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm text-slate-500">
                  Số tiền {pendingType === 'increase' ? 'thêm' : 'trừ'}
                </div>
                <div
                  className={`text-xl font-bold ${
                    pendingType === 'increase'
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  {pendingType === 'increase' ? '+' : '-'}
                  {pendingAmount.toLocaleString('vi-VN')} VNĐ
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm text-slate-500">Số dư hiện tại</div>
                <div className="text-lg font-semibold text-slate-900">
                  {currentBalance.toLocaleString('vi-VN')} VNĐ
                </div>
              </div>

              <div className="rounded-lg bg-blue-50 p-4 border-2 border-blue-200">
                <div className="text-sm text-blue-600 mb-1">
                  Số dư sau điều chỉnh
                </div>
                <div className="text-2xl font-bold text-blue-700">
                  {(pendingType === 'increase'
                    ? currentBalance + pendingAmount
                    : currentBalance - pendingAmount
                  ).toLocaleString('vi-VN')}{' '}
                  VNĐ
                </div>
              </div>
            </div>
          </DialogBody>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Hủy
              </Button>
            </DialogClose>
            <Button type="button" onClick={handleConfirmBalance}>
              Xác nhận
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Status Change Dialog */}
      <Dialog open={statusDialogOpen} onOpenChange={setStatusDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Thay đổi trạng thái tài khoản</DialogTitle>
            <DialogDescription>
              Chọn trạng thái mới và nhập lý do thay đổi cho tài khoản{' '}
              {user.email}
            </DialogDescription>
          </DialogHeader>
          <DialogBody>
            <div className="space-y-4">
              {/* Current Status Display */}
              <div className="rounded-lg bg-slate-50 p-3">
                <div className="text-xs text-slate-500 mb-1">
                  Trạng thái hiện tại
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className={`h-3 w-3 rounded-full ${
                      user.status ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  />
                  <span className="text-base font-semibold">
                    {user.status ? 'Active' : 'Suspended'}
                  </span>
                </div>
              </div>

              {/* New Status Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Trạng thái mới
                </label>
                <Select
                  value={newStatus ? 'active' : 'suspended'}
                  onValueChange={(value) => setNewStatus(value === 'active')}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Status Change Preview */}
              {newStatus !== user.status && (
                <div className="rounded-lg bg-blue-50 p-3">
                  <div className="text-xs text-blue-600 mb-1">
                    Trạng thái sau thay đổi
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-3 w-3 rounded-full ${
                        newStatus ? 'bg-green-500' : 'bg-red-500'
                      }`}
                    />
                    <span className="text-base font-semibold text-blue-700">
                      {newStatus ? 'Active' : 'Suspended'}
                    </span>
                  </div>
                </div>
              )}

              {/* Reason Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Lý do thay đổi
                </label>
                <Textarea
                  placeholder="Nhập lý do thay đổi trạng thái (tùy chọn)..."
                  value={statusReason}
                  onChange={(e) => setStatusReason(e.target.value)}
                  rows={4}
                />
              </div>
            </div>
          </DialogBody>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Hủy
              </Button>
            </DialogClose>
            <Button
              type="button"
              onClick={handleStatusSubmit}
              disabled={newStatus === user.status}
            >
              Xác nhận
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Status Confirmation Dialog */}
      <Dialog
        open={statusConfirmDialogOpen}
        onOpenChange={setStatusConfirmDialogOpen}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Xác nhận thay đổi trạng thái</DialogTitle>
            <DialogDescription>
              Vui lòng xác nhận thông tin thay đổi trạng thái
            </DialogDescription>
          </DialogHeader>
          <DialogBody>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="text-sm text-slate-500">Người dùng</div>
                <div className="text-base font-medium">{user.email}</div>
              </div>

              <div className="space-y-2">
                <div className="text-sm text-slate-500">
                  Trạng thái hiện tại
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className={`h-3 w-3 rounded-full ${
                      user.status ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  />
                  <span className="text-base font-medium">
                    {user.status ? 'Active' : 'Suspended'}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm text-slate-500">Trạng thái mới</div>
                <div className="flex items-center gap-2">
                  <div
                    className={`h-3 w-3 rounded-full ${
                      pendingStatus ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  />
                  <span
                    className={`text-base font-semibold ${
                      pendingStatus ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {pendingStatus ? 'Active' : 'Suspended'}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm text-slate-500">Lý do thay đổi</div>
                <div className="rounded-lg bg-slate-50 p-3 text-sm">
                  {pendingStatusReason}
                </div>
              </div>
            </div>
          </DialogBody>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Hủy
              </Button>
            </DialogClose>
            <Button type="button" onClick={handleConfirmStatus}>
              Xác nhận
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
