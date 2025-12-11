import { useState } from 'react';
import { Icon } from '@iconify/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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

  if (!open || !user) return null;

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

  const purchaseHistoryTabs = [
    'Residential Proxies',
    'Unlimited Proxies',
    'ISP Proxies',
    'Datacenter Proxies',
    'Rotating ISP Proxies',
    'YouTube Downloader',
    'Universal Scraping API',
  ];

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
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-slate-600">
                  Số dư ví
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {user.walletBalance?.toLocaleString('vi-VN') ?? '0'} VNĐ
                </div>
              </CardContent>
            </Card>

            {/* User Status */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-slate-600">
                  Trạng thái
                </CardTitle>
              </CardHeader>
              <CardContent>
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
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="purchase-history">
                Lịch sử mua hàng
              </TabsTrigger>
              <TabsTrigger value="login-history">Lịch sử đăng nhập</TabsTrigger>
              <TabsTrigger value="device-login">Thiết bị đăng nhập</TabsTrigger>
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
                        purchaseRows.map((row, idx) => (
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
          </Tabs>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t">
          <Button onClick={onClose}>Đóng</Button>
        </div>
      </div>
    </div>
  );
}
