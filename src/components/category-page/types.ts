import { ReactNode } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { z } from 'zod';
import { TableProps } from '@/types/useTableTypes';

export interface CategoryPageProps<TData extends { id: string | number }> {
  // Data
  data: TData[];
  columns: ColumnDef<TData>[];
  
  // Table instance (optional - will create internal if not provided)
  table?: TableProps;

  // Page configuration
  title: string;
  description?: string;

  // Form configuration
  formSchema: z.AnyZodObject;
  formFields: FormFieldConfig[];
  defaultFormValues?: Record<string, any>;

  // CRUD operations
  onAdd: (values: any) => Promise<void> | void;
  onEdit: (id: string | number, values: any) => Promise<void> | void;
  onDelete: (id: string | number) => Promise<void> | void;

  // Dialog labels
  addDialogTitle?: string;
  addDialogDescription?: string;
  editDialogTitle?: string;
  editDialogDescription?: string;
  deleteDialogTitle?: string;
  deleteDialogDescription?: string;
  deleteConfirmText?: string;

  // Search configuration
  searchPlaceholder?: string;
  searchKeys?: string[]; // Keys to search in (for client-side filtering, deprecated - use onSearchChange for GraphQL)
  onSearchChange?: (searchQuery: string) => void; // Callback when search query changes (for GraphQL)

  // Pagination
  defaultPageSize?: number;
  pageSizes?: number[];
  totalCount?: number; // Total count from server (for server-side pagination)

  // Additional toolbar actions
  toolbarActions?: ReactNode;

  // Loading state
  isLoading?: boolean;

  // Row click handler
  onRowClick?: (row: TData) => void;

  // Transform initial values for form (e.g., convert arrays to strings)
  transformInitialValues?: (item: TData) => Record<string, any>;
}

export interface FormFieldConfig {
  name: string;
  label: string;
  type:
    | 'text'
    | 'email'
    | 'number'
    | 'password'
    | 'textarea'
    | 'select'
    | 'date'
    | 'checkbox';
  placeholder?: string;
  required?: boolean;
  options?: { label: string; value: string | number }[]; // For select type
  rows?: number; // For textarea
  className?: string;
}

export interface CategoryFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: 'add' | 'edit';
  initialValues?: Record<string, any>;
  onSubmit: (values: any) => Promise<void> | void;
  formSchema: z.AnyZodObject;
  formFields: FormFieldConfig[];
  title?: string;
  description?: string;
  submitLabel?: string;
}

export interface CategoryDeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => Promise<void> | void;
  title?: string;
  description?: string;
  itemName?: string;
}
