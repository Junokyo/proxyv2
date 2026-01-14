import { gql } from '../../utils/gql';

// Get Bank Accounts Query
export const GET_BANK_ACCOUNTS_QUERY = gql`
  query BankAccounts($filter: FilterRequest) {
    bankAccounts(filter: $filter) {
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
