import { gql } from '../../utils/gql';

// Create Bank Account Mutation
export const CREATE_BANK_ACCOUNT_MUTATION = gql`
  mutation CreateBankAccount($input: CreateBankAccountInput!) {
    createBankAccount(input: $input) {
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

// Update Bank Account Mutation
export const UPDATE_BANK_ACCOUNT_MUTATION = gql`
  mutation UpdateBankAccount($input: UpdateBankAccountInput!) {
    updateBankAccount(input: $input) {
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

// Delete Bank Account Mutation
export const DELETE_BANK_ACCOUNT_MUTATION = gql`
  mutation DeleteBankAccount($id: String!) {
    deleteBankAccount(id: $id)
  }
`;

