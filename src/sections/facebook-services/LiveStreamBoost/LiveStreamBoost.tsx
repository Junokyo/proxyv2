import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { useNotification } from '@/providers/notification-provider';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface Server {
  id: string;
  name: string;
  price: number;
  speed: string;
  support: string;
  minOrder: number;
  maxOrder: number;
}

const SERVERS: Server[] = [
  {
    id: 'sv1',
    name: 'Server 1 - Tốc độ cao',
    price: 50,
    speed: '100-200 view/phút',
    support: 'Hỗ trợ 24/7',
    minOrder: 100,
    maxOrder: 10000,
  },
  {
    id: 'sv2',
    name: 'Server 2 - Ổn định',
    price: 40,
    speed: '50-100 view/phút',
    support: 'Hỗ trợ 24/7',
    minOrder: 100,
    maxOrder: 5000,
  },
  {
    id: 'sv3',
    name: 'Server 3 - Giá rẻ',
    price: 30,
    speed: '30-50 view/phút',
    support: 'Hỗ trợ giờ hành chính',
    minOrder: 100,
    maxOrder: 3000,
  },
];

const WARRANTY_OPTIONS = [
  { value: 'none', label: 'Không bảo hành', multiplier: 1 },
  { value: '7days', label: 'Bảo hành 7 ngày', multiplier: 1.2 },
  { value: '30days', label: 'Bảo hành 30 ngày', multiplier: 1.5 },
];

const LiveStreamBoost: React.FC = () => {
  const [liveUrl, setLiveUrl] = useState('');
  const [selectedServer, setSelectedServer] = useState<Server | null>(null);
  const [quantity, setQuantity] = useState(100);
  const [duration, setDuration] = useState(30); // minutes
  const [warranty, setWarranty] = useState('none');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const { addNotification } = useNotification();

  const formatVND = (value: number): string => {
    return new Intl.NumberFormat('vi-VN').format(value);
  };

  const selectedWarranty = WARRANTY_OPTIONS.find((w) => w.value === warranty);
  const basePrice = selectedServer ? selectedServer.price * quantity : 0;
  const warrantyPrice = selectedWarranty ? basePrice * (selectedWarranty.multiplier - 1) : 0;
  const discount = 0;
  const totalPrice = basePrice + warrantyPrice - discount;

  const canSubmit =
    liveUrl &&
    selectedServer &&
    quantity >= (selectedServer.minOrder || 0) &&
    quantity <= (selectedServer.maxOrder || 0) &&
    duration >= 10;

  const handleConfirmOrder = () => {
    if (!canSubmit) return;
    setShowConfirmDialog(true);
  };

  const handleSubmitOrder = () => {
    // TODO: Call API to create order
    setShowConfirmDialog(false);
    addNotification({
      type: 'success',
      title: 'Đặt hàng thành công',
      message: 'Đơn hàng của bạn đang được xử lý',
    });
    
    // Reset form
    setLiveUrl('');
    setSelectedServer(null);
    setQuantity(100);
    setDuration(30);
    setWarranty('none');
  };

  return (
    <div className="space-y-4">
      {/* Service Description */}
      <div className="rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 p-5 text-white shadow-lg">
        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 flex-shrink-0">
            <Icon icon="mdi:eye" className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Tăng mắt live stream</h3>
            <p className="text-sm opacity-90">
              Dịch vụ tăng người xem trực tiếp cho livestream Facebook của bạn. Giúp tạo độ hot,
              thu hút nhiều người xem thật hơn. View ổn định, không giảm trong quá trình live.
            </p>
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left Column - Input Section */}
        <div className="space-y-4">
          {/* Live URL Input */}
          <div className="rounded-xl bg-white border border-slate-200 p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-900 mb-3">
              Địa chỉ livestream
            </h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-600 mb-1.5 block">
                  Link livestream Facebook
                </label>
                <input
                  type="text"
                  value={liveUrl}
                  onChange={(e) => setLiveUrl(e.target.value)}
                  placeholder="https://www.facebook.com/..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex gap-2">
                  <Icon
                    icon="mdi:information"
                    className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5"
                  />
                  <p className="text-xs text-blue-700">
                    Vui lòng cung cấp link livestream khi đang live hoặc sắp live
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Server Selection */}
          <div className="rounded-xl bg-white border border-slate-200 p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-900 mb-3">Chọn server</h3>
            <div className="space-y-2">
              {SERVERS.map((server) => (
                <div
                  key={server.id}
                  onClick={() => setSelectedServer(server)}
                  className={
                    'p-3 border rounded-lg cursor-pointer transition ' +
                    (selectedServer?.id === server.id
                      ? 'border-indigo-600 bg-indigo-50'
                      : 'border-slate-200 hover:border-indigo-300')
                  }
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="font-medium text-sm">{server.name}</div>
                    <div className="text-indigo-600 font-semibold text-sm">
                      {formatVND(server.price)}đ/view
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                    <div className="flex items-center gap-1">
                      <Icon icon="mdi:speedometer" className="h-3.5 w-3.5" />
                      {server.speed}
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon icon="mdi:lifebuoy" className="h-3.5 w-3.5" />
                      {server.support}
                    </div>
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    Min: {server.minOrder} - Max: {formatVND(server.maxOrder)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quantity and Duration */}
          <div className="rounded-xl bg-white border border-slate-200 p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-900 mb-3">Cài đặt đơn hàng</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-slate-600 mb-1.5 block">
                  Số lượng view
                </label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  min={selectedServer?.minOrder || 100}
                  max={selectedServer?.maxOrder || 10000}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {selectedServer && (
                  <p className="text-xs text-slate-500 mt-1">
                    Min: {selectedServer.minOrder} - Max: {formatVND(selectedServer.maxOrder)}
                  </p>
                )}
              </div>

              <div>
                <label className="text-xs text-slate-600 mb-1.5 block">
                  Thời gian (phút)
                </label>
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  min={10}
                  max={180}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <p className="text-xs text-slate-500 mt-1">
                  View sẽ được tăng đều trong thời gian này (Min: 10 phút - Max: 180 phút)
                </p>
              </div>
            </div>
          </div>

          {/* Warranty Selection */}
          <div className="rounded-xl bg-white border border-slate-200 p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-900 mb-3">Gói bảo hành</h3>
            <div className="space-y-2">
              {WARRANTY_OPTIONS.map((option) => (
                <div
                  key={option.value}
                  onClick={() => setWarranty(option.value)}
                  className={
                    'p-3 border rounded-lg cursor-pointer transition flex items-center justify-between ' +
                    (warranty === option.value
                      ? 'border-indigo-600 bg-indigo-50'
                      : 'border-slate-200 hover:border-indigo-300')
                  }
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={
                        'w-4 h-4 rounded-full border-2 flex items-center justify-center ' +
                        (warranty === option.value
                          ? 'border-indigo-600'
                          : 'border-slate-300')
                      }
                    >
                      {warranty === option.value && (
                        <div className="w-2 h-2 rounded-full bg-indigo-600" />
                      )}
                    </div>
                    <span className="text-sm">{option.label}</span>
                  </div>
                  {option.multiplier > 1 && (
                    <span className="text-xs text-slate-500">
                      +{((option.multiplier - 1) * 100).toFixed(0)}%
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Payment Info */}
        <div className="lg:sticky lg:top-4 lg:self-start">
          <div className="rounded-xl bg-white border border-slate-200 p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">
              Thông tin thanh toán
            </h3>

            {!selectedServer ? (
              <div className="text-center py-8 text-slate-400">
                <Icon icon="mdi:information-outline" className="h-12 w-12 mx-auto mb-2" />
                <p className="text-sm">Vui lòng chọn server để xem thông tin thanh toán</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Server:</span>
                    <span className="font-medium">{selectedServer.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Giá/view:</span>
                    <span className="font-medium">{formatVND(selectedServer.price)}đ</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Số lượng:</span>
                    <span className="font-medium">{formatVND(quantity)} view</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Thời gian:</span>
                    <span className="font-medium">{duration} phút</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Bảo hành:</span>
                    <span className="font-medium">
                      {WARRANTY_OPTIONS.find((w) => w.value === warranty)?.label}
                    </span>
                  </div>

                  <div className="border-t border-slate-200 pt-3">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-600">Giá dịch vụ:</span>
                      <span className="font-medium">{formatVND(basePrice)}đ</span>
                    </div>
                    {warrantyPrice > 0 && (
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-600">Phí bảo hành:</span>
                        <span className="font-medium">{formatVND(warrantyPrice)}đ</span>
                      </div>
                    )}
                    {discount > 0 && (
                      <div className="flex justify-between text-sm mb-2 text-green-600">
                        <span>Chiết khấu:</span>
                        <span className="font-medium">-{formatVND(discount)}đ</span>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-slate-200 pt-3">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Tổng thanh toán:</span>
                      <span className="text-lg font-bold text-indigo-600">
                        {formatVND(totalPrice)}đ
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleConfirmOrder}
                  disabled={!canSubmit}
                  className={
                    'w-full py-3 rounded-lg font-medium transition flex items-center justify-center gap-2 ' +
                    (canSubmit
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed')
                  }
                >
                  <Icon icon="mdi:cart" className="h-5 w-5" />
                  Đặt hàng ngay
                </button>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                  <div className="flex gap-2">
                    <Icon
                      icon="mdi:alert"
                      className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5"
                    />
                    <div className="text-xs text-amber-700">
                      <p className="font-semibold mb-1">Lưu ý:</p>
                      <ul className="space-y-0.5 list-disc list-inside">
                        <li>Bạn cần bắt đầu live trước khi đặt hàng</li>
                        <li>View sẽ bắt đầu tăng sau 1-5 phút</li>
                        <li>Không tắt live trong thời gian dịch vụ chạy</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Confirm Dialog */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận đơn hàng</AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="space-y-4">
                <div className="bg-slate-50 rounded-lg p-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Dịch vụ:</span>
                    <span className="font-medium">Tăng mắt live stream</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Server:</span>
                    <span className="font-medium">{selectedServer?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Số lượng:</span>
                    <span className="font-medium">{formatVND(quantity)} view</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Thời gian:</span>
                    <span className="font-medium">{duration} phút</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Bảo hành:</span>
                    <span className="font-medium">
                      {WARRANTY_OPTIONS.find((w) => w.value === warranty)?.label}
                    </span>
                  </div>
                  <div className="border-t border-slate-200 pt-2 mt-2">
                    <div className="flex justify-between">
                      <span className="font-semibold">Tổng tiền:</span>
                      <span className="font-bold text-indigo-600">
                        {formatVND(totalPrice)}đ
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                  <div className="flex gap-2">
                    <Icon
                      icon="mdi:alert"
                      className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5"
                    />
                    <div className="text-xs text-amber-700">
                      <p className="font-semibold mb-1">Xác nhận:</p>
                      <ul className="space-y-1 list-disc list-inside">
                        <li>Bạn đã bắt đầu livestream</li>
                        <li>Link livestream chính xác</li>
                        <li>Số dư của bạn: {formatVND(totalPrice)}đ</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleSubmitOrder}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              Xác nhận đặt hàng
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default LiveStreamBoost;

