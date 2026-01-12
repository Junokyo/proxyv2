'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  useWalletTransactionStats,
  useWalletTransactions,
} from '@/graphql/hooks/wallet-transactions';
import { TransactionStatsSummary } from './TransactionStatsSummary';
import { TransactionDetailSheet } from './TransactionDetailSheet';
import {
  TransactionType,
  TRANSACTION_TYPE_LABELS,
  WalletTransactionItem,
} from '@/graphql/types';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

interface WalletTransactionsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  walletId: string;
  userId?: string;
}

/**
 * Format currency to VND
 */
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
};

/**
 * Format date to Vietnamese format
 */
const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleString('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Get transaction type badge variant
 */
const getTransactionTypeBadge = (type: TransactionType) => {
  const variants: Record<
    TransactionType,
    { variant: 'default'; className: string }
  > = {
    [TransactionType.DEPOSIT]: {
      variant: 'default',
      className: 'bg-green-100 text-green-700 hover:bg-green-200',
    },
    [TransactionType.WITHDRAW]: {
      variant: 'default',
      className: 'bg-red-100 text-red-700 hover:bg-red-200',
    },
    [TransactionType.PROMOTION]: {
      variant: 'default',
      className: 'bg-purple-100 text-purple-700 hover:bg-purple-200',
    },
    [TransactionType.PURCHASE]: {
      variant: 'default',
      className: 'bg-blue-100 text-blue-700 hover:bg-blue-200',
    },
    [TransactionType.REFUND]: {
      variant: 'default',
      className: 'bg-orange-100 text-orange-700 hover:bg-orange-200',
    },
    [TransactionType.ADJUSTMENT]: {
      variant: 'default',
      className: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
    },
  };
  return variants[type] || variants[TransactionType.ADJUSTMENT];
};

/**
 * Wallet Transactions Dialog Component
 * Main dialog showing transaction stats and detailed transaction list
 */
export function WalletTransactionsDialog({
  open,
  onOpenChange,
  walletId,
  userId,
}: WalletTransactionsDialogProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage] = useState(10);
  const [selectedTransactionId, setSelectedTransactionId] = useState<
    string | null
  >(null);
  const [isDetailSheetOpen, setIsDetailSheetOpen] = useState(false);

  // Fetch transaction stats
  const {
    data: statsData,
    loading: statsLoading,
    refetch: refetchStats,
  } = useWalletTransactionStats(walletId, !walletId || !open);

  // Fetch transactions
  const {
    data: transactionsData,
    loading: transactionsLoading,
    refetch: refetchTransactions,
  } = useWalletTransactions(
    {
      walletId,
      pagination: {
        page: currentPage,
        limit: rowsPerPage,
      },
      sorts: [{ field: 'dateInput', order: 'DESC' }],
    },
    !walletId || !open,
  );

  // Refetch data when dialog opens or walletId changes
  useEffect(() => {
    if (open && walletId) {
      refetchStats();
      refetchTransactions();
    }
  }, [open, walletId, refetchStats, refetchTransactions]);

  // Reset page when dialog opens
  useEffect(() => {
    if (open) {
      setCurrentPage(0);
    }
  }, [open]);

  const stats = statsData?.walletTransactionStats;
  const transactions = useMemo(
    () => transactionsData?.walletTransactions?.items || [],
    [transactionsData],
  );
  const totalCount = transactionsData?.walletTransactions?.totalCount || 0;
  const totalPages = Math.ceil(totalCount / rowsPerPage);

  const handleRowClick = (transaction: WalletTransactionItem) => {
    setSelectedTransactionId(transaction.id);
    setIsDetailSheetOpen(true);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          className="max-w-[95vw] sm:max-w-[90vw] lg:max-w-6xl max-h-[95vh] overflow-y-auto
                     bottom-0 left-0 right-0 top-auto translate-x-0 translate-y-0
                     sm:left-[50%] sm:top-[50%] 
                     sm:translate-x-[-50%] sm:translate-y-[-50%]
                     sm:bottom-auto sm:right-auto
                     rounded-t-2xl sm:rounded-xl
                     p-0 border-0 sm:border shadow-xl"
        >
          {/* Mobile drag handle */}
          <div className="sm:hidden flex justify-center pt-3 pb-2">
            <div className="w-12 h-1 bg-slate-300 rounded-full" />
          </div>

          <DialogHeader className="px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 lg:pt-8 pb-4 sm:pb-6 border-b border-slate-200">
            <DialogTitle className="text-lg sm:text-xl lg:text-2xl font-semibold">
              Thông tin giao dịch ví
            </DialogTitle>
            <DialogDescription className="text-xs sm:text-sm">
              {userId && <span className="font-medium">User: {userId} • </span>}
              Mã ví: {walletId}
            </DialogDescription>
          </DialogHeader>

          <DialogBody className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 space-y-6">
            {/* Transaction Stats Summary */}
            {stats && (
              <div>
                <h3 className="text-base sm:text-lg font-semibold mb-4">
                  Tổng quan giao dịch
                </h3>
                <TransactionStatsSummary stats={stats} loading={statsLoading} />
              </div>
            )}

            {/* Transactions Table */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base sm:text-lg font-semibold">
                  Lịch sử giao dịch
                </h3>
                <div className="text-xs sm:text-sm text-muted-foreground">
                  Tổng: {totalCount.toLocaleString('vi-VN')} giao dịch
                </div>
              </div>

              <Card className="overflow-hidden">
                {transactionsLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
                  </div>
                ) : transactions.length > 0 ? (
                  <>
                    {/* Desktop Table */}
                    <div className="hidden md:block overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[140px]">Thời gian</TableHead>
                            <TableHead>Loại GD</TableHead>
                            <TableHead>Mô tả</TableHead>
                            <TableHead className="text-right">Số tiền</TableHead>
                            <TableHead className="text-right">
                              Số dư sau GD
                            </TableHead>
                            <TableHead>Tham chiếu</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {transactions.map((transaction) => (
                            <TableRow
                              key={transaction.id}
                              className="cursor-pointer hover:bg-muted/50"
                              onClick={() => handleRowClick(transaction)}
                            >
                              <TableCell className="text-xs whitespace-nowrap">
                                {formatDate(transaction.dateInput)}
                              </TableCell>
                              <TableCell>
                                <Badge
                                  size="sm"
                                  className={
                                    getTransactionTypeBadge(transaction.type)
                                      .className
                                  }
                                >
                                  {TRANSACTION_TYPE_LABELS[transaction.type]}
                                </Badge>
                              </TableCell>
                              <TableCell className="max-w-[200px] truncate">
                                {transaction.description || '-'}
                              </TableCell>
                              <TableCell
                                className={`text-right font-semibold ${
                                  transaction.coin >= 0
                                    ? 'text-green-600'
                                    : 'text-red-600'
                                }`}
                              >
                                {transaction.coin >= 0 ? '+' : ''}
                                {formatCurrency(transaction.coin)}
                              </TableCell>
                              <TableCell className="text-right font-medium">
                                {formatCurrency(transaction.balanceAfter)}
                              </TableCell>
                              <TableCell className="text-xs text-muted-foreground truncate max-w-[100px]">
                                {transaction.reference || '-'}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>

                    {/* Mobile Card List */}
                    <div className="md:hidden divide-y divide-border">
                      {transactions.map((transaction) => (
                        <div
                          key={transaction.id}
                          className="p-4 cursor-pointer hover:bg-muted/50 active:bg-muted"
                          onClick={() => handleRowClick(transaction)}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <Badge
                              size="sm"
                              className={
                                getTransactionTypeBadge(transaction.type)
                                  .className
                              }
                            >
                              {TRANSACTION_TYPE_LABELS[transaction.type]}
                            </Badge>
                            <div
                              className={`text-base font-bold ${
                                transaction.coin >= 0
                                  ? 'text-green-600'
                                  : 'text-red-600'
                              }`}
                            >
                              {transaction.coin >= 0 ? '+' : ''}
                              {formatCurrency(transaction.coin)}
                            </div>
                          </div>
                          {transaction.description && (
                            <p className="text-sm mb-2 line-clamp-2">
                              {transaction.description}
                            </p>
                          )}
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>{formatDate(transaction.dateInput)}</span>
                            <span>
                              Số dư: {formatCurrency(transaction.balanceAfter)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="flex items-center justify-between border-t border-border px-4 py-3">
                        <div className="text-xs sm:text-sm text-muted-foreground">
                          Trang {currentPage + 1} / {totalPages}
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 0}
                          >
                            <ChevronLeft className="w-4 h-4" />
                            <span className="hidden sm:inline ml-1">Trước</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage >= totalPages - 1}
                          >
                            <span className="hidden sm:inline mr-1">Sau</span>
                            <ChevronRight className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                    <p className="text-sm sm:text-base">
                      Không có giao dịch nào
                    </p>
                  </div>
                )}
              </Card>
            </div>
          </DialogBody>
        </DialogContent>
      </Dialog>

      {/* Transaction Detail Sheet */}
      {selectedTransactionId && (
        <TransactionDetailSheet
          open={isDetailSheetOpen}
          onOpenChange={setIsDetailSheetOpen}
          transactionId={selectedTransactionId}
        />
      )}
    </>
  );
}

