export interface Bank {
  id: string;
  code: string;
  name: string;
  fullName: string;
  shortName: string;
  logo?: string;
  bin?: string;
  color: string;
  active: boolean;
}

export interface BankAccount {
  bankCode: string;
  accountNumber: string;
  accountName: string;
  branch: string;
}

export interface BankAccountsMap {
  [key: string]: BankAccount;
}

