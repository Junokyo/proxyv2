'use client';

import { Minus, MoreVertical, Plus } from 'lucide-react';
import usePopover from '@/hooks/use-popover';
import { Button } from '@/components/ui/button';
import { CustomPopover } from '@/components/ui/custom-popover';

interface BalanceActionsPopoverProps {
  onAddBalance: () => void;
  onDeductBalance: () => void;
}

export function BalanceActionsPopover({
  onAddBalance,
  onDeductBalance,
}: BalanceActionsPopoverProps) {
  const popover = usePopover();

  const handleToggle = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (popover.open) {
      popover.onClose();
    } else {
      popover.onOpen(e);
    }
  };

  const handleAddBalance = () => {
    onAddBalance();
    popover.onClose();
  };

  const handleDeductBalance = () => {
    onDeductBalance();
    popover.onClose();
  };

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0 hover:bg-accent"
        aria-label="Thao tác số dư"
        onClick={handleToggle}
      >
        <MoreVertical className="h-4 w-4 text-muted-foreground hover:text-foreground" />
      </Button>

      <CustomPopover open={popover.open} onClose={popover.onClose} align="end">
        <div className="flex flex-col gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="justify-start h-auto py-2 px-3 font-normal hover:bg-accent gap-2"
            onClick={handleAddBalance}
          >
            <Plus className="h-4 w-4 text-green-600" />
            <span className="text-sm">Nạp tiền</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="justify-start h-auto py-2 px-3 font-normal hover:bg-accent gap-2"
            onClick={handleDeductBalance}
          >
            <Minus className="h-4 w-4 text-red-600" />
            <span className="text-sm">Trừ tiền</span>
          </Button>
        </div>
      </CustomPopover>
    </>
  );
}
