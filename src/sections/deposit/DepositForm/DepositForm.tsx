import React, { useEffect, useMemo, useState } from 'react';
import { useAuth } from '@/auth/store/auth.store';
import { FilterOperator } from '@/constant';
import { useGraphQLQuery } from '@/graphql/hooks/use-graphql-query';
import {
  GET_BANK_ACCOUNTS_QUERY,
  GET_BANK_ACCOUNT_BY_CODE_QUERY,
} from '@/graphql/queries/bank-accounts';
import { GET_WALLET_STATS_QUERY } from '@/graphql/queries/wallets';
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
import { AmountInput } from './AmountInput';
import { BankSelection } from './BankSelection';
import { TransferInfo } from './TransferInfo';
import { TopupPackages } from './TopupPackages';
import { GET_TOPUPS_QUERY } from '@/graphql/queries/topups';

const DepositForm: React.FC = () => {
  const [selectedBankCode, setSelectedBankCode] = useState<string>('');
  const [amount, setAmount] = useState(100000);
  const [selectedTopupId, setSelectedTopupId] = useState<string | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const { addNotification } = useNotification();
  const { user } = useAuth();

  // Fetch wallet stats
  const { data: walletStatsData, loading: walletStatsLoading } =
    useGraphQLQuery<{
      walletStats: {
        userId: string;
        currentBalance: number;
        totalDeposited: number;
        totalSpent: number;
        totalPromotion: number;
      };
    }>({
      query: GET_WALLET_STATS_QUERY,
      variables: {
        userId: user?.id || '',
      },
      skip: !user?.id,
    });

  // Fetch bank accounts - only active ones
  const { data: bankAccountsData, loading: bankAccountsLoading } =
    useGraphQLQuery<{
      bankAccounts: {
        totalCount: number;
        items: Array<{
          id: string;
          bankCode: string;
          bankName: string;
          bankLogoUrl: string | null;
          apiType: string;
          accountNumber: string;
          accountName: string;
          branch: string | null;
          active: boolean;
          isDefault: boolean;
          note: string | null;
          sortOrder: number;
          createdAt: string;
          updatedAt: string;
        }>;
      };
    }>({
      query: GET_BANK_ACCOUNTS_QUERY,
      variables: {
        filter: {
          filters: [
            {
              field: 'active',
              operator: FilterOperator.EQ,
              value: 'true',
            },
          ],
        },
      },
    });

  const bankAccounts = useMemo(
    () => bankAccountsData?.bankAccounts?.items || [],
    [bankAccountsData],
  );

  // Fetch selected bank account by code
  const { data: bankAccountByCodeData, loading: bankAccountByCodeLoading } =
    useGraphQLQuery<{
      bankAccountByCode: {
        id: string;
        bankCode: string;
        bankName: string;
        bankLogoUrl: string | null;
        apiType: string;
        accountNumber: string;
        accountName: string;
        branch: string | null;
        active: boolean;
        isDefault: boolean;
        note: string | null;
        sortOrder: number;
        createdAt: string;
        updatedAt: string;
      };
    }>({
      query: GET_BANK_ACCOUNT_BY_CODE_QUERY,
      variables: {
        bankCode: selectedBankCode,
      },
      skip: !selectedBankCode,
    });

  const selectedBankAccount = bankAccountByCodeData?.bankAccountByCode || null;

  // Fetch topup packages
  const { data: topupsData, loading: topupsLoading } = useGraphQLQuery<{
    topups: {
      totalCount: number;
      items: Array<{
        id: string;
        name: string;
        max: number;
        percent: number;
      }>;
    };
  }>({
    query: GET_TOPUPS_QUERY,
    variables: {},
  });

  const topupPackages = useMemo(
    () => topupsData?.topups?.items || [],
    [topupsData],
  );

  // Handle topup package selection
  const handleSelectTopupPackage = (pkg: {
    id: string;
    name: string;
    max: number;
    percent: number;
  }) => {
    setSelectedTopupId(pkg.id);
    setAmount(pkg.max);
  };

  // Calculate bonus amount if topup package is selected
  const selectedTopup = useMemo(
    () => topupPackages.find((pkg) => pkg.id === selectedTopupId) || null,
    [topupPackages, selectedTopupId],
  );
  // Bonus chỉ áp dụng khi amount = max của gói đã chọn (hoặc có thể tính theo amount thực tế nếu muốn linh hoạt)
  // Ở đây tôi tính bonus dựa trên amount thực tế, nhưng chỉ khi có selectedTopup
  const bonusAmount =
    selectedTopup && amount <= selectedTopup.max
      ? (amount * selectedTopup.percent) / 100
      : 0;
  const totalAmountWithBonus = amount + bonusAmount;

  // Auto-select default bank account when data loads
  useEffect(() => {
    if (!bankAccountsLoading && bankAccounts.length > 0 && !selectedBankCode) {
      const defaultBank = bankAccounts.find((bank) => bank.isDefault);
      if (defaultBank) {
        setSelectedBankCode(defaultBank.bankCode);
      } else {
        // If no default, select the first one (already sorted by sortOrder)
        setSelectedBankCode(bankAccounts[0].bankCode);
      }
    }
  }, [bankAccountsLoading, bankAccounts, selectedBankCode]);

  const formatVND = (value: number): string => {
    return new Intl.NumberFormat('vi-VN').format(value);
  };

  const currentBalance = walletStatsData?.walletStats?.currentBalance || 0;

  const canSubmit = selectedBankCode && amount >= 100000;

  const handleConfirmDeposit = () => {
    if (!canSubmit) return;
    setShowConfirmDialog(true);
  };

  const handleSubmitDeposit = () => {
    // Tạo mã giao dịch
    const transactionCode = `NP${Date.now().toString().slice(-8)}`;

    // Add notification
    addNotification({
      type: 'topup',
      title: 'Yêu cầu nạp tiền đã được ghi nhận',
      description: `Đơn nạp ${formatVND(amount)} VNĐ qua ${selectedBankAccount?.bankName || selectedBankAccount?.bankCode} đang được xử lý. Mã GD: ${transactionCode}`,
      time: 'Vừa xong',
      amount: amount,
      paymentMethod:
        selectedBankAccount?.bankName || selectedBankAccount?.bankCode || '',
    });

    setShowConfirmDialog(false);

    // Reset form
    // setSelectedBank('');
    // setAmount(100000);

    // Show success message
    alert(
      `✅ Đã ghi nhận yêu cầu nạp tiền!\n\nMã giao dịch: ${transactionCode}\nSố tiền: ${formatVND(amount)} VNĐ\nNgân hàng: ${selectedBankAccount?.bankName || selectedBankAccount?.bankCode}\n\nVui lòng chuyển khoản theo thông tin bên dưới.\nGiao dịch sẽ được xử lý tự động trong 5-10 phút.`,
    );
  };

  return (
    <div className="space-y-4">
      {/* Current Balance Card - Full Width */}
      <div className="rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 p-5 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs opacity-90">Số dư tài khoản</p>
            <p className="text-2xl font-bold mt-1">
              {walletStatsLoading
                ? 'Đang tải...'
                : `${formatVND(currentBalance)} VNĐ`}
            </p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
            <Icon icon="mdi:wallet" className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left Column - Input Section */}
        <div className="space-y-4">
          {/* Topup Packages */}
          <div className="rounded-xl bg-white border border-slate-200 p-5 shadow-sm">
            <TopupPackages
              packages={topupPackages}
              loading={topupsLoading}
              selectedPackageId={selectedTopupId}
              onSelectPackage={handleSelectTopupPackage}
            />
          </div>

          {/* Bank Selection */}
          <div className="rounded-xl bg-white border border-slate-200 p-5 shadow-sm">
            <BankSelection
              bankAccounts={bankAccounts}
              loading={bankAccountsLoading}
              selectedBankCode={selectedBankCode}
              onSelectBank={setSelectedBankCode}
            />
          </div>

          {/* Amount Input */}
          <div className="rounded-xl bg-white border border-slate-200 p-5 shadow-sm">
            <AmountInput amount={amount} onChangeAmount={setAmount} />
            {selectedTopup && bonusAmount > 0 && (
              <div className="mt-3 rounded-lg bg-green-50 border border-green-200 p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon icon="mdi:gift" className="h-4 w-4 text-green-600" />
                    <span className="text-xs font-medium text-green-700">
                      Khuyến mãi {selectedTopup.percent}%
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-green-600">
                    +{formatVND(bonusAmount)} VNĐ
                  </span>
                </div>
                <div className="mt-2 pt-2 border-t border-green-200 flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">
                    Tổng nhận được:
                  </span>
                  <span className="text-base font-bold text-green-600">
                    {formatVND(totalAmountWithBonus)} VNĐ
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Transfer Info */}
        <div className="lg:sticky lg:top-4 lg:self-start">
          {selectedBankAccount ? (
            <div className="rounded-xl bg-white border border-slate-200 p-5 shadow-sm">
              <TransferInfo bankAccount={selectedBankAccount} amount={amount} />
            </div>
          ) : (
            <div className="rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center h-full flex items-center justify-center">
              <div>
                <Icon
                  icon="mdi:arrow-left-circle-outline"
                  className="mx-auto h-12 w-12 text-slate-300 mb-3"
                />
                <p className="text-sm font-medium text-slate-500">
                  Chọn ngân hàng để xem thông tin
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Thông tin chuyển khoản sẽ hiển thị ở đây
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="sticky bottom-4 rounded-xl bg-white border-2 border-slate-200 p-3 shadow-lg z-10">
        <button
          onClick={handleConfirmDeposit}
          disabled={!canSubmit}
          className={`
            w-full flex items-center justify-center gap-2 rounded-lg py-3 text-sm font-semibold transition-all
            ${
              canSubmit
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }
          `}
        >
          <Icon icon="mdi:check-circle" className="h-5 w-5" />
          Xác nhận đã chuyển khoản
        </button>

        {!canSubmit && (
          <p className="text-center text-xs text-slate-500 mt-1.5">
            {!selectedBankCode
              ? 'Vui lòng chọn ngân hàng'
              : 'Số tiền tối thiểu 100,000 VNĐ'}
          </p>
        )}
      </div>

      {/* Confirmation Dialog */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <Icon
                icon="mdi:check-decagram"
                className="h-6 w-6 text-blue-500"
              />
              Xác nhận yêu cầu nạp tiền
            </AlertDialogTitle>
            <AlertDialogDescription>
              <div className="space-y-4 mt-4">
                <p className="text-slate-700">
                  Bạn đã chuyển khoản với thông tin sau:
                </p>

                <div className="bg-slate-50 rounded-lg p-4 space-y-3 border border-slate-200">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 text-sm">Ngân hàng:</span>
                    <span className="font-semibold text-slate-900">
                      {selectedBankAccount?.bankName ||
                        selectedBankAccount?.bankCode}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 text-sm">Số tiền:</span>
                    <span className="font-bold text-green-600 text-lg">
                      {formatVND(amount)} VNĐ
                    </span>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                  <div className="flex gap-2">
                    <Icon
                      icon="mdi:alert"
                      className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5"
                    />
                    <div className="text-xs text-amber-700">
                      <p className="font-semibold mb-1">Lưu ý:</p>
                      <ul className="space-y-1 list-disc list-inside">
                        <li>Chỉ xác nhận khi bạn đã chuyển khoản thành công</li>
                        <li>Giao dịch sẽ được xử lý trong 5-10 phút</li>
                        <li>
                          Nếu chưa chuyển, vui lòng chuyển khoản trước khi xác
                          nhận
                        </li>
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
              onClick={handleSubmitDeposit}
              className="bg-blue-500 hover:bg-blue-600"
            >
              Xác nhận đã chuyển khoản
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DepositForm;
