import { gql } from '../../utils/gql';

// Get Orders Query
export const GET_ORDERS_QUERY = gql`
  query Orders(
    $filter: FilterRequest
    $sorts: [Sort!]
    $pagination: PaginationInput
    $searchQuery: String
  ) {
    orders(
      filter: $filter
      sorts: $sorts
      pagination: $pagination
      searchQuery: $searchQuery
    ) {
      items {
        id
        userId
        sum
        dateOrder
        createdAt
        updatedAt
      }
      totalCount
    }
  }
`;

// Get Order by ID Query
export const GET_ORDER_BY_ID = gql`
  query Order($id: ID!) {
    order(id: $id) {
      id
      userId
      sum
      dateOrder
      createdAt
      updatedAt
    }
  }
`;

// Get Order Details Query
export const GET_ORDER_DETAILS_QUERY = gql`
  query OrderDetails(
    $filter: FilterRequest
    $sorts: [Sort!]
    $pagination: PaginationInput
    $searchQuery: String
  ) {
    orderDetails(
      filter: $filter
      sorts: $sorts
      pagination: $pagination
      searchQuery: $searchQuery
    ) {
      items {
        id
        orderId
        providerId
        proxyTypeId
        countryId
        code
        price
        quantity
        tranCode
        detail
        status
        expiredDate
      }
      totalCount
    }
  }
`;

