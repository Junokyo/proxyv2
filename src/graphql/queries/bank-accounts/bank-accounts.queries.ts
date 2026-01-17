import { gql } from '../../utils/gql';

// Get Bank Account by Code Query
export const GET_BANK_ACCOUNT_BY_CODE_QUERY = gql`
  query BankAccountByCode($bankCode: String!) {
    bankAccountByCode(bankCode: $bankCode) {
      id
      bankCode
      bankName
      bankLogoUrl
      apiType
      accountNumber
      accountName
      branch
      active
      isDefault
      note
      sortOrder
      createdAt
      updatedAt
    }
  }
`;

// Get Bank Accounts Query
export const GET_BANK_ACCOUNTS_QUERY = gql`
  query BankAccounts(
    $filter: FilterRequest
    $sorts: [Sort!]
    $pagination: PaginationInput
    $searchQuery: String
    $bankCode: String
    $activeOnly: Boolean
  ) {
    bankAccounts(
      filter: $filter
      sorts: $sorts
      pagination: $pagination
      searchQuery: $searchQuery
      bankCode: $bankCode
      activeOnly: $activeOnly
    ) {
      totalCount
      items {
        id
        bankCode
        bankName
        bankLogoUrl
        apiType
        accountNumber
        accountName
        branch
        active
        isDefault
        note
        sortOrder
        createdAt
        updatedAt
      }
    }
  }
`;
