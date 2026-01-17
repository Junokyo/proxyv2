import React, { useEffect, useMemo, useState } from 'react';
import { useAuth } from '@/auth/store/auth.store';
import { FilterOperator } from '@/constant';
import { useGraphQLQuery } from '@/graphql/hooks/use-graphql-query';
import {
  GET_BANK_ACCOUNTS_QUERY,
  GET_BANK_ACCOUNT_BY_CODE_QUERY,
} from '@/graphql/queries/bank-accounts';
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
import { GET_TOPUPS_QUERY } from '@/graphql/queries/topups';
import { cn } from '@/lib/utils';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';

// Mock data for demo
const MOCK_BANK_ACCOUNTS = [
  {
    id: '1',
    bankCode: 'VCB',
    bankName: 'Vietcombank',
    bankLogoUrl: 'https://api.vietqr.io/img/VCB.png',
    apiType: 'manual',
    accountNumber: '1234567890123',
    accountName: 'CONG TY TNHH PROXY VN',
    branch: null,
    active: true,
    isDefault: true,
    note: null,
    sortOrder: 1,
  },
  {
    id: '2',
    bankCode: 'TCB',
    bankName: 'Techcombank',
    bankLogoUrl: 'https://api.vietqr.io/img/TCB.png',
    apiType: 'manual',
    accountNumber: '9876543210987',
    accountName: 'CONG TY TNHH PROXY VN',
    branch: null,
    active: true,
    isDefault: false,
    note: null,
    sortOrder: 2,
  },
  {
    id: '3',
    bankCode: 'MB',
    bankName: 'MB Bank',
    bankLogoUrl: 'https://api.vietqr.io/img/MB.png',
    apiType: 'manual',
    accountNumber: '5555666677778888',
    accountName: 'CONG TY TNHH PROXY VN',
    branch: null,
    active: true,
    isDefault: false,
    note: null,
    sortOrder: 3,
  },
  {
    id: '4',
    bankCode: 'VPB',
    bankName: 'VPBank',
    bankLogoUrl: 'https://api.vietqr.io/img/VPB.png',
    apiType: 'manual',
    accountNumber: '1111222233334444',
    accountName: 'CONG TY TNHH PROXY VN',
    branch: null,
    active: true,
    isDefault: false,
    note: null,
    sortOrder: 4,
  },
  {
    id: '5',
    bankCode: 'ACB',
    bankName: 'ACB',
    bankLogoUrl: 'https://api.vietqr.io/img/ACB.png',
    apiType: 'manual',
    accountNumber: '9999888877776666',
    accountName: 'CONG TY TNHH PROXY VN',
    branch: null,
    active: true,
    isDefault: false,
    note: null,
    sortOrder: 5,
  },
  {
    id: '6',
    bankCode: 'BIDV',
    bankName: 'BIDV',
    bankLogoUrl: 'https://api.vietqr.io/img/BIDV.png',
    apiType: 'manual',
    accountNumber: '4444333322221111',
    accountName: 'CONG TY TNHH PROXY VN',
    branch: null,
    active: true,
    isDefault: false,
    note: null,
    sortOrder: 6,
  },
];

const DepositForm: React.FC = () => {
  const [selectedBankCode, setSelectedBankCode] = useState<string>('');
  const [amount, setAmount] = useState(100000);
  const [selectedTopupId, setSelectedTopupId] = useState<string | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const { addNotification } = useNotification();
  const { user } = useAuth();
  const { copyToClipboard } = useCopyToClipboard();

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
    () => {
      const apiData = bankAccountsData?.bankAccounts?.items || [];
      // Use mock data for demo if no API data
      return apiData.length > 0 ? apiData : MOCK_BANK_ACCOUNTS;
    },
    [bankAccountsData],
  );

  // Fetch selected bank account by code
  const { data: bankAccountByCodeData } = useGraphQLQuery<{
    bankAccountByCode: {
      id: string;
      bankCode: string;
      bankName: string;
      bankLogoUrl: string | null;
      accountNumber: string;
      accountName: string;
    };
  }>({
    query: GET_BANK_ACCOUNT_BY_CODE_QUERY,
    variables: { bankCode: selectedBankCode },
    skip: !selectedBankCode,
  });

  const selectedBankAccount = useMemo(() => {
    // First check API data
    if (bankAccountByCodeData?.bankAccountByCode) {
      return bankAccountByCodeData.bankAccountByCode;
    }
    // Fallback to mock data
    return bankAccounts.find(bank => bank.bankCode === selectedBankCode) || null;
  }, [bankAccountByCodeData, bankAccounts, selectedBankCode]);

  // Fetch topup packages
  const { data: topupsData } = useGraphQLQuery<{
    topups: {
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
    () => [...(topupsData?.topups?.items || [])].sort((a, b) => a.max - b.max),
    [topupsData],
  );

  // Calculate bonus
  const selectedTopup = useMemo(
    () => topupPackages.find((pkg) => pkg.id === selectedTopupId) || null,
    [topupPackages, selectedTopupId],
  );

  const bonusPercent = selectedTopup?.percent || 0;

  // Auto-select default bank
  useEffect(() => {
    if (!bankAccountsLoading && bankAccounts.length > 0 && !selectedBankCode) {
      const defaultBank = bankAccounts.find((bank) => bank.isDefault);
      setSelectedBankCode(defaultBank?.bankCode || bankAccounts[0].bankCode);
    }
  }, [bankAccountsLoading, bankAccounts, selectedBankCode]);

  const formatVND = (value: number): string => {
    return new Intl.NumberFormat('vi-VN').format(value);
  };

  const canSubmit = selectedBankCode && amount >= 50000;
  const transactionCode = `NP${Date.now().toString().slice(-8)}`;

  const handleCopy = (text: string, field: string) => {
    copyToClipboard(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleConfirmDeposit = () => {
    if (!canSubmit) return;
    setShowConfirmDialog(true);
  };

  const handleSubmitDeposit = () => {
    const txCode = `NP${Date.now().toString().slice(-8)}`;
    addNotification({
      type: 'topup',
      title: 'Yêu cầu nạp tiền đã được ghi nhận',
      description: `Đơn nạp ${formatVND(amount)} VNĐ đang được xử lý. Mã GD: ${txCode}`,
      time: 'Vừa xong',
      amount: amount,
      paymentMethod: selectedBankAccount?.bankName || '',
    });
    setShowConfirmDialog(false);
    alert(`✅ Đã ghi nhận yêu cầu nạp tiền!\n\nMã giao dịch: ${txCode}\nSố tiền: ${formatVND(amount)} VNĐ`);
  };

  const QUICK_AMOUNTS = [50000, 100000, 200000, 500000, 1000000, 2000000, 5000000, 10000000];

  return (
    <div className="grid lg:grid-cols-[1fr_400px] gap-6 items-stretch">
      {/* Left Column - Form Steps */}
      <div className="space-y-6 flex flex-col">
        {/* Step 1: Bank Selection */}
        <div className="rounded-xl border border-border bg-card">
          <div className="flex items-center gap-3 p-4 border-b border-border">
            <div className="flex items-center gap-2">
              <Icon icon="mdi:bank-outline" className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Chọn ngân hàng</span>
            </div>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
              1
            </span>
          </div>
          <div className="p-4">
            {bankAccountsLoading ? (
              <div className="flex items-center justify-center py-8">
                <Icon icon="mdi:loading" className="h-6 w-6 text-primary animate-spin" />
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {bankAccounts.map((bank) => (
                  <button
                    key={bank.id}
                    type="button"
                    onClick={() => setSelectedBankCode(bank.bankCode)}
                    className={cn(
                      'flex items-center gap-3 rounded-xl border-2 p-4 transition-all',
                      selectedBankCode === bank.bankCode
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/30'
                    )}
                  >
                    <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                      {bank.bankLogoUrl ? (
                        <img src={bank.bankLogoUrl} alt={bank.bankName} className="h-6 w-6 object-contain" />
                      ) : (
                        <Icon icon="mdi:bank" className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                    <span className="text-sm font-medium text-foreground text-left flex-1">{bank.bankName}</span>
                    <div className={cn(
                      'h-5 w-5 rounded-full border-2 flex items-center justify-center',
                      selectedBankCode === bank.bankCode ? 'border-primary bg-primary' : 'border-muted-foreground/30'
                    )}>
                      {selectedBankCode === bank.bankCode && (
                        <div className="h-2 w-2 rounded-full bg-white" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Step 2: Amount Input */}
        <div className="rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Icon icon="mdi:cash-multiple" className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">Nhập số tiền</span>
              </div>
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                2
              </span>
            </div>
            {bonusPercent > 0 && (
              <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
                <Icon icon="mdi:gift" className="h-4 w-4" />
                +{bonusPercent}%
              </span>
            )}
          </div>
          <div className="p-4 space-y-4">
            <div>
              <label className="text-xs text-muted-foreground mb-2 block">Số tiền cần nạp (VND)</label>
              <input
                type="text"
                value={amount > 0 ? formatVND(amount) : ''}
                onChange={(e) => {
                  const val = e.target.value.replace(/[^0-9]/g, '');
                  setAmount(Number(val) || 0);
                }}
                placeholder="Nhập số tiền..."
                className="w-full h-12 px-4 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            <div>
              <p className="text-xs text-muted-foreground mb-2">Chọn nhanh:</p>
              <div className="grid grid-cols-4 gap-2">
                {QUICK_AMOUNTS.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => setAmount(q)}
                    className={cn(
                      'py-2.5 rounded-lg text-sm font-medium border transition-all',
                      amount === q
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border hover:border-primary/50 text-foreground'
                    )}
                  >
                    {formatVND(q)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Transfer Info */}
      <div className="flex flex-col">
        <div className="rounded-xl border border-border bg-card flex-1 flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Icon icon="mdi:bank-transfer" className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">Thông tin chuyển khoản</span>
              </div>
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                3
              </span>
            </div>
          </div>

          <div className="p-4 flex-1 flex flex-col">
            {selectedBankAccount ? (
              <div className="flex-1 flex flex-col justify-between">
                {/* QR Code */}
                <div className="flex justify-center py-4">
                  <div className="p-3 bg-white rounded-xl shadow-sm border">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(
                        `${selectedBankAccount.bankName}|${selectedBankAccount.accountNumber}|${selectedBankAccount.accountName}|${amount}|${transactionCode}`
                      )}`}
                      alt="QR Code"
                      className="w-40 h-40"
                    />
                  </div>
                </div>

                {/* Transfer Details */}
                <div className="space-y-3 pt-2 border-t border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Số TK:</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-foreground">{selectedBankAccount.accountNumber}</span>
                      <button
                        onClick={() => handleCopy(selectedBankAccount.accountNumber, 'stk')}
                        className="text-primary hover:text-primary/80"
                      >
                        <Icon icon={copiedField === 'stk' ? 'mdi:check' : 'mdi:content-copy'} className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Tên TK:</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-foreground">{selectedBankAccount.accountName}</span>
                      <button
                        onClick={() => handleCopy(selectedBankAccount.accountName, 'name')}
                        className="text-primary hover:text-primary/80"
                      >
                        <Icon icon={copiedField === 'name' ? 'mdi:check' : 'mdi:content-copy'} className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Số tiền:</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-emerald-600">{formatVND(amount)} ₫</span>
                      <button
                        onClick={() => handleCopy(amount.toString(), 'amount')}
                        className="text-primary hover:text-primary/80"
                      >
                        <Icon icon={copiedField === 'amount' ? 'mdi:check' : 'mdi:content-copy'} className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Nội dung:</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-amber-600 font-mono">{transactionCode}</span>
                      <button
                        onClick={() => handleCopy(transactionCode, 'content')}
                        className="text-primary hover:text-primary/80"
                      >
                        <Icon icon={copiedField === 'content' ? 'mdi:check' : 'mdi:content-copy'} className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleConfirmDeposit}
                  disabled={!canSubmit}
                  className={cn(
                    'w-full py-3 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 mt-4',
                    canSubmit
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'bg-muted text-muted-foreground cursor-not-allowed'
                  )}
                >
                  <Icon icon="mdi:check-circle" className="h-5 w-5" />
                  Hoàn tất
                </button>
              </div>
            ) : (
              <div className="py-12 text-center">
                <Icon icon="mdi:qrcode" className="h-16 w-16 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">Vui lòng chọn ngân hàng</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận nạp tiền</AlertDialogTitle>
            <AlertDialogDescription>
              <div className="space-y-3 mt-4">
                <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Ngân hàng</span>
                    <span className="font-medium text-foreground">{selectedBankAccount?.bankName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Số tiền</span>
                    <span className="font-bold text-emerald-600">{formatVND(amount)} ₫</span>
                  </div>
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={handleSubmitDeposit}>Xác nhận</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DepositForm;
