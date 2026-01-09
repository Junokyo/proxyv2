/**
 * Orders GraphQL Types
 *
 * TypeScript interfaces for Orders module GraphQL operations
 */

import { Response } from '../interfaces/base/response.interface';

// Orders specific types
export interface OrderItem {
  id: string;
  userId: string;
  sum: number;
  dateOrder: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrdersResponse {
  orders: Response<OrderItem>;
}

// CRUD Operations
export interface CreateOrderInput {
  userId: string;
  sum: number;
}

export interface UpdateOrderInput {
  id: string;
  sum: number;
}

export interface CreateOrderVariables {
  userId: string;
  sum: number;
}

export interface UpdateOrderVariables {
  id: string;
  sum: number;
}

export interface DeleteOrderVariables {
  id: string;
}

export interface OrderMutationResponse {
  id: string;
  userId: string;
  sum: number;
  dateOrder: string;
  createdAt: string;
  updatedAt: string;
}

// Lazy query types
export interface GetOrderByIdVariables {
  id: string;
}

export interface GetOrderByIdResponse {
  order: OrderMutationResponse;
}

