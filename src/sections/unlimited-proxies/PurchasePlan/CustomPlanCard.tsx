'use client';

import { useState } from 'react';
import { ContactDialog } from '@/components/contact/ContactDialog';
import { Button } from '@/components/ui/button';
import Iconify from '@/components/iconify';

export const CustomPlanCard: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <div className="flex h-full min-h-[230px] flex-col rounded-xl border border-border bg-card px-4 pb-4 pt-5">
        <div className="text-sm font-medium text-foreground">Custom</div>
        <div className="mt-2 text-xl font-bold text-foreground">Get a quote</div>

        <ul className="mt-4 space-y-2 text-xs text-muted-foreground">
          <li className="flex items-center gap-1.5">
            <span className="text-primary">•</span>
            Higher concurrency
          </li>
          <li className="flex items-center gap-1.5">
            <span className="text-primary">•</span>
            Greater bandwidth
          </li>
          <li className="flex items-center gap-1.5">
            <span className="text-primary">•</span>
            Better prices
          </li>
        </ul>

        <div className="mt-auto pt-4">
          <Button
            variant="outline"
            onClick={() => setIsDialogOpen(true)}
            className="h-9 w-full gap-2 text-xs"
          >
            <Iconify icon="mdi:email-outline" width={14} />
            Contact Us
          </Button>
        </div>
      </div>
      <ContactDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </>
  );
};
