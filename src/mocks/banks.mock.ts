import { Bank, BankAccountsMap } from '@/types/bank.types';

/**
 * Danh sách các ngân hàng Việt Nam
 * Dữ liệu mẫu để phát triển - có thể dễ dàng mở rộng
 */
export const VIETNAM_BANKS: Bank[] = [
  {
    id: '1',
    code: 'VCB',
    name: 'Vietcombank',
    fullName: 'Ngân hàng TMCP Ngoại thương Việt Nam',
    shortName: 'Vietcombank',
    bin: '970436',
    color: 'bg-green-50 border-green-200',
    active: true,
  },
  {
    id: '2',
    code: 'TCB',
    name: 'Techcombank',
    fullName: 'Ngân hàng TMCP Kỹ thương Việt Nam',
    shortName: 'Techcombank',
    bin: '970407',
    color: 'bg-blue-50 border-blue-200',
    active: true,
  },
  {
    id: '3',
    code: 'VTB',
    name: 'Vietinbank',
    fullName: 'Ngân hàng TMCP Công thương Việt Nam',
    shortName: 'Vietinbank',
    bin: '970415',
    color: 'bg-blue-50 border-blue-200',
    active: true,
  },
  {
    id: '4',
    code: 'BIDV',
    name: 'BIDV',
    fullName: 'Ngân hàng TMCP Đầu tư và Phát triển Việt Nam',
    shortName: 'BIDV',
    bin: '970418',
    color: 'bg-blue-50 border-blue-200',
    active: true,
  },
  {
    id: '5',
    code: 'ACB',
    name: 'ACB',
    fullName: 'Ngân hàng TMCP Á Châu',
    shortName: 'ACB',
    bin: '970416',
    color: 'bg-emerald-50 border-emerald-200',
    active: true,
  },
  {
    id: '6',
    code: 'MB',
    name: 'MB Bank',
    fullName: 'Ngân hàng TMCP Quân đội',
    shortName: 'MB Bank',
    bin: '970422',
    color: 'bg-blue-50 border-blue-200',
    active: true,
  },
];

/**
 * Thông tin tài khoản nhận của từng ngân hàng
 * Key: Bank code
 * Value: Account info
 */
export const BANK_ACCOUNTS: BankAccountsMap = {
  VCB: {
    bankCode: 'VCB',
    accountNumber: '1234567890',
    accountName: 'CONG TY TNHH PROXY SERVICE',
    branch: 'Chi nhánh Hà Nội',
  },
  TCB: {
    bankCode: 'TCB',
    accountNumber: '19038299999',
    accountName: 'CONG TY TNHH PROXY SERVICE',
    branch: 'Chi nhánh TP.HCM',
  },
  VTB: {
    bankCode: 'VTB',
    accountNumber: '1023456789',
    accountName: 'CONG TY TNHH PROXY SERVICE',
    branch: 'Chi nhánh Đống Đa',
  },
  BIDV: {
    bankCode: 'BIDV',
    accountNumber: '2234567890',
    accountName: 'CONG TY TNHH PROXY SERVICE',
    branch: 'Chi nhánh Cầu Giấy',
  },
  ACB: {
    bankCode: 'ACB',
    accountNumber: '3334567890',
    accountName: 'CONG TY TNHH PROXY SERVICE',
    branch: 'Chi nhánh Hai Bà Trưng',
  },
  MB: {
    bankCode: 'MB',
    accountNumber: '4434567890',
    accountName: 'CONG TY TNHH PROXY SERVICE',
    branch: 'Chi nhánh Ba Đình',
  },
};

/**
 * Giả lập API để lấy danh sách ngân hàng
 * Trong production, thay thế bằng API call thực
 */
export const getBanks = async (): Promise<Bank[]> => {
  // Giả lập delay API
  await new Promise((resolve) => setTimeout(resolve, 300));
  
  // Chỉ trả về các bank đang active
  return VIETNAM_BANKS.filter((bank) => bank.active);
};

/**
 * Lấy thông tin bank theo code
 */
export const getBankByCode = (code: string): Bank | undefined => {
  return VIETNAM_BANKS.find((bank) => bank.code === code);
};

/**
 * Lấy thông tin tài khoản theo bank code
 */
export const getBankAccount = (bankCode: string) => {
  return BANK_ACCOUNTS[bankCode];
};

