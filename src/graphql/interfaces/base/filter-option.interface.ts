export interface BaseFilterOptions {
  filter?: FilterRequest;
  sorts?: Sort[];
  pagination?: PaginationInput;
  searchQuery?: string;
}

export interface FilterRequest {
  filters: Filter[];
  logicalOperator?: 'AND' | 'OR';
}

export interface Filter {
  field: string;
  operator?:
    | 'EQ'
    | 'NEQ'
    | 'GT'
    | 'GTE'
    | 'LT'
    | 'LTE'
    | 'IN'
    | 'NOT_IN'
    | 'LIKE'
    | 'NOT_LIKE'
    | 'CONTAINS'
    | 'STARTS_WITH'
    | 'ENDS_WITH';
  value?: string;
  values?: string[];
}

export interface Sort {
  field: string;
  order: 'ASC' | 'DESC';
}

export interface PaginationInput {
  page?: number;
  limit?: number;
}
