export type DepositStatus = 'pending' | 'success' | 'failed' | 'processing';

export interface DepositRecord {
  id: string;
  transactionCode: string;
  amount: number;
  bankCode: string;
  bankName: string;
  status: DepositStatus;
  denialReason?: string;
  createdAt: string;
  completedAt?: string;
  updatedAt?: string;
  accountNumber?: string;
  accountName?: string;
  note?: string;
}

export interface DepositFilter {
  status?: DepositStatus | 'all';
  search?: string;
  fromDate?: string;
  toDate?: string;
}

