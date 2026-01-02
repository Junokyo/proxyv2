'use client';

import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { CategoryFormDialogProps } from './types';

export function CategoryFormDialog({
  open,
  onOpenChange,
  mode,
  initialValues = {},
  onSubmit,
  formSchema,
  formFields,
  title,
  description,
  submitLabel,
}: CategoryFormDialogProps) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
    mode: 'onChange',
  });

  // Reset form when dialog opens/closes or initialValues change
  useEffect(() => {
    if (open) {
      const defaultValues: Record<string, any> = {};
      formFields.forEach((field) => {
        defaultValues[field.name] = initialValues[field.name] ?? '';
      });
      form.reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, JSON.stringify(initialValues)]);

  const handleSubmit = async (data: any) => {
    try {
      await onSubmit(data);
      onOpenChange(false);
      form.reset();
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  const renderField = (field: CategoryFormDialogProps['formFields'][0]) => {
    return (
      <FormField
        key={field.name}
        control={form.control}
        name={field.name}
        render={({ field: formField }) => (
          <FormItem>
            <FormLabel>
              {field.label}
              {field.required && (
                <span className="text-destructive ml-1">*</span>
              )}
            </FormLabel>
            <FormControl>
              {field.type === 'textarea' ? (
                <Textarea
                  {...formField}
                  placeholder={field.placeholder}
                  rows={field.rows || 4}
                  className={field.className}
                />
              ) : field.type === 'select' ? (
                <Select
                  value={formField.value?.toString()}
                  onValueChange={formField.onChange}
                >
                  <SelectTrigger className={field.className}>
                    <SelectValue
                      placeholder={field.placeholder || 'Select...'}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options?.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value.toString()}
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : field.type === 'checkbox' ? (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={formField.value}
                    onCheckedChange={formField.onChange}
                  />
                </div>
              ) : (
                <Input
                  {...formField}
                  type={field.type}
                  placeholder={field.placeholder}
                  className={field.className}
                  disabled={field.name === 'id' && mode === 'edit'}
                />
              )}
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };

  const dialogTitle = title || (mode === 'add' ? 'Thêm mới' : 'Chỉnh sửa');
  const dialogDescription =
    description ||
    (mode === 'add' ? 'Điền thông tin để thêm mới' : 'Cập nhật thông tin');
  const submitButtonLabel =
    submitLabel || (mode === 'add' ? 'Thêm' : 'Cập nhật');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          {description && (
            <DialogDescription>{dialogDescription}</DialogDescription>
          )}
        </DialogHeader>
        <DialogBody>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-5"
            >
              <div className="space-y-4">
                {formFields.map((field) => {
                    // Full width fields (textarea, etc.)
                    if (
                      field.type === 'textarea' ||
                      field.className?.includes('col-span-2')
                    ) {
                      return (
                        <div key={field.name} className="md:col-span-2">
                          {renderField(field)}
                        </div>
                      );
                    }
                    // Single column layout for minimalist design
                    return (
                      <div key={field.name}>
                        {renderField(field)}
                      </div>
                    );
                  })}
              </div>
              <DialogFooter className="gap-2">
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Hủy
                  </Button>
                </DialogClose>
                <Button type="submit" variant="primary">
                  {submitButtonLabel}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}
