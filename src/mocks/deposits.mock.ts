import { DepositRecord } from '@/types/deposit.types';

/**
 * Mock data cho lịch sử nạp tiền
 * Trong production, thay thế bằng API call thực
 */
export const DEPOSIT_HISTORY: DepositRecord[] = [
  {
    id: '1',
    transactionCode: 'NP12345678',
    amount: 5000000,
    bankCode: 'VCB',
    bankName: 'Vietcombank',
    status: 'success',
    accountNumber: '1234567890',
    accountName: 'CONG TY TNHH PROXY SERVICE',
    createdAt: '2024-01-15T10:30:00',
    completedAt: '2024-01-15T10:35:00',
    updatedAt: '2024-01-15T10:35:00',
    note: 'Giao dịch thành công',
  },
  {
    id: '2',
    transactionCode: 'NP87654321',
    amount: 2000000,
    bankCode: 'TCB',
    bankName: 'Techcombank',
    status: 'processing',
    accountNumber: '19038299999',
    accountName: 'CONG TY TNHH PROXY SERVICE',
    createdAt: '2024-01-14T14:20:00',
    updatedAt: '2024-01-14T14:25:00',
    note: 'Đang xử lý giao dịch',
  },
  {
    id: '3',
    transactionCode: 'NP11223344',
    amount: 10000000,
    bankCode: 'BIDV',
    bankName: 'BIDV',
    status: 'failed',
    accountNumber: '2234567890',
    accountName: 'CONG TY TNHH PROXY SERVICE',
    denialReason: 'Sai nội dung chuyển khoản',
    createdAt: '2024-01-13T09:15:00',
    updatedAt: '2024-01-13T09:45:00',
    note: 'Vui lòng kiểm tra lại nội dung chuyển khoản',
  },
  {
    id: '4',
    transactionCode: 'NP55667788',
    amount: 3000000,
    bankCode: 'VTB',
    bankName: 'Vietinbank',
    status: 'success',
    accountNumber: '1023456789',
    accountName: 'CONG TY TNHH PROXY SERVICE',
    createdAt: '2024-01-12T16:45:00',
    completedAt: '2024-01-12T16:52:00',
    updatedAt: '2024-01-12T16:52:00',
  },
  {
    id: '5',
    transactionCode: 'NP99887766',
    amount: 1000000,
    bankCode: 'ACB',
    bankName: 'ACB',
    status: 'pending',
    accountNumber: '3334567890',
    accountName: 'CONG TY TNHH PROXY SERVICE',
    createdAt: '2024-01-11T11:20:00',
    updatedAt: '2024-01-11T11:20:00',
    note: 'Chờ xác nhận từ ngân hàng',
  },
  {
    id: '6',
    transactionCode: 'NP44332211',
    amount: 7500000,
    bankCode: 'MB',
    bankName: 'MB Bank',
    status: 'success',
    accountNumber: '4434567890',
    accountName: 'CONG TY TNHH PROXY SERVICE',
    createdAt: '2024-01-10T08:30:00',
    completedAt: '2024-01-10T08:38:00',
    updatedAt: '2024-01-10T08:38:00',
  },
  {
    id: '7',
    transactionCode: 'NP13579246',
    amount: 500000,
    bankCode: 'VCB',
    bankName: 'Vietcombank',
    status: 'failed',
    accountNumber: '1234567890',
    accountName: 'CONG TY TNHH PROXY SERVICE',
    denialReason: 'Số tiền không khớp',
    createdAt: '2024-01-09T15:10:00',
    updatedAt: '2024-01-09T15:20:00',
  },
  {
    id: '8',
    transactionCode: 'NP24681357',
    amount: 15000000,
    bankCode: 'TCB',
    bankName: 'Techcombank',
    status: 'success',
    accountNumber: '19038299999',
    accountName: 'CONG TY TNHH PROXY SERVICE',
    createdAt: '2024-01-08T13:25:00',
    completedAt: '2024-01-08T13:33:00',
    updatedAt: '2024-01-08T13:33:00',
  },
];

/**
 * Giả lập API để lấy lịch sử nạp tiền
 */
export const getDepositHistory = async (): Promise<DepositRecord[]> => {
  // Giả lập delay API
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  // Sắp xếp theo thời gian tạo (mới nhất trước)
  return [...DEPOSIT_HISTORY].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
};

/**
 * Lấy chi tiết một giao dịch
 */
export const getDepositById = async (id: string): Promise<DepositRecord | null> => {
  // Giả lập delay API
  await new Promise((resolve) => setTimeout(resolve, 300));
  
  return DEPOSIT_HISTORY.find((record) => record.id === id) || null;
};

/**
 * Tạo giao dịch nạp tiền mới
 */
export const createDeposit = async (data: Omit<DepositRecord, 'id' | 'createdAt' | 'updatedAt'>): Promise<DepositRecord> => {
  // Giả lập delay API
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  const newDeposit: DepositRecord = {
    ...data,
    id: `NP${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  DEPOSIT_HISTORY.unshift(newDeposit);
  
  return newDeposit;
};

