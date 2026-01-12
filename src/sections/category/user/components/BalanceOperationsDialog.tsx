'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
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
import { Textarea } from '@/components/ui/textarea';
import { useAddBalance, useDeductBalance } from '@/graphql/hooks/users';
import { toast } from 'sonner';

const balanceOperationSchema = z.object({
  amount: z
    .number({ required_error: 'Số tiền là bắt buộc' })
    .positive('Số tiền phải lớn hơn 0'),
  description: z.string().optional(),
  reference: z.string().optional(),
});

type BalanceOperationFormValues = z.infer<typeof balanceOperationSchema>;

interface BalanceOperationsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string | null;
  username: string | null;
  operationType: 'add' | 'deduct' | null;
  onSuccess?: () => void;
}

export function BalanceOperationsDialog({
  open,
  onOpenChange,
  userId,
  username,
  operationType,
  onSuccess,
}: BalanceOperationsDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<BalanceOperationFormValues>({
    resolver: zodResolver(balanceOperationSchema),
    defaultValues: {
      amount: 0,
      description: '',
      reference: '',
    },
  });

  const [addBalance] = useAddBalance({
    onSuccess: (data) => {
      toast.success(
        `Đã nạp ${data.addBalance.amount.toLocaleString('vi-VN')} VND. Số dư mới: ${data.addBalance.newBalance.toLocaleString('vi-VN')} VND`
      );
      onSuccess?.();
      onOpenChange(false);
      form.reset();
    },
    onError: (message) => {
      toast.error(`Lỗi: ${message}`);
    },
  });

  const [deductBalance] = useDeductBalance({
    onSuccess: (data) => {
      toast.success(
        `Đã trừ ${data.deductBalance.amount.toLocaleString('vi-VN')} VND. Số dư mới: ${data.deductBalance.newBalance.toLocaleString('vi-VN')} VND`
      );
      onSuccess?.();
      onOpenChange(false);
      form.reset();
    },
    onError: (message) => {
      toast.error(`Lỗi: ${message}`);
    },
  });

  // Reset form when dialog opens/closes
  useEffect(() => {
    if (open) {
      form.reset({
        amount: 0,
        description: '',
        reference: '',
      });
    }
  }, [open, form]);

  const handleSubmit = async (data: BalanceOperationFormValues) => {
    if (!userId || !operationType) return;

    setIsSubmitting(true);
    try {
      if (operationType === 'add') {
        await addBalance({
          userId,
          amount: data.amount,
          description: data.description,
          reference: data.reference,
        });
      } else {
        await deductBalance({
          userId,
          amount: data.amount,
          description: data.description,
          reference: data.reference,
        });
      }
    } catch (error) {
      console.error('Balance operation error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const title = operationType === 'add' ? 'Nạp tiền' : 'Trừ tiền';
  const description =
    operationType === 'add'
      ? `Nạp tiền cho người dùng: ${username || ''}`
      : `Trừ tiền từ người dùng: ${username || ''}`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogBody>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-5"
            >
              <div className="space-y-4">
                {/* Amount Field */}
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Số tiền (VND) <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Nhập số tiền"
                          {...field}
                          onChange={(e) => {
                            const value = e.target.value;
                            field.onChange(value === '' ? 0 : Number(value));
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Description Field */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mô tả</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Nhập mô tả (tùy chọn)"
                          rows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Reference Field */}
                <FormField
                  control={form.control}
                  name="reference"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mã tham chiếu</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Nhập mã tham chiếu (tùy chọn)"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter className="gap-2">
                <DialogClose asChild>
                  <Button type="button" variant="outline" disabled={isSubmitting}>
                    Hủy
                  </Button>
                </DialogClose>
                <Button type="submit" variant="primary" disabled={isSubmitting}>
                  {isSubmitting ? 'Đang xử lý...' : 'Xác nhận'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}

