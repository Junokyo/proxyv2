'use client';

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
import { CategoryDeleteDialogProps } from './types';

export function CategoryDeleteDialog({
  open,
  onOpenChange,
  onConfirm,
  title = 'Xóa mục',
  description,
  itemName,
}: CategoryDeleteDialogProps) {
  const handleConfirm = async () => {
    try {
      await onConfirm();
      onOpenChange(false);
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const defaultDescription =
    description ||
    (itemName
      ? `Bạn có chắc chắn muốn xóa "${itemName}"? Hành động này không thể hoàn tác.`
      : 'Bạn có chắc chắn muốn xóa mục này? Hành động này không thể hoàn tác.');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {/* <DialogDescription>{defaultDescription}</DialogDescription> */}
        </DialogHeader>
        <DialogBody>
          <div className="text-sm text-muted-foreground">
            {defaultDescription}
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="destructive" onClick={handleConfirm}>
            Xóa
          </Button>
          <DialogClose asChild>
            <Button variant="outline">Hủy</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
