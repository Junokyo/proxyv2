'use client';

import { useState } from 'react';
import { Gift, Copy, Check, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AffiliateWidgetProps {
  invitationCode: string;
  invitationLink: string;
  commission: number;
  withdrawable: number;
  className?: string;
}

export function AffiliateWidget({
  invitationCode,
  invitationLink,
  commission,
  withdrawable,
  className,
}: AffiliateWidgetProps) {
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopy = async (text: string, type: 'code' | 'link') => {
    await navigator.clipboard.writeText(text);
    if (type === 'code') {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } else {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <Card className={cn('border-0 shadow-[0_1px_3px_rgba(0,0,0,0.08)]', className)}>
      <CardHeader className="pb-3 pt-5 px-5">
        <CardTitle className="flex items-center gap-2 text-[15px] font-semibold">
          <Gift className="h-4 w-4 text-amber-500" />
          Affiliate program
        </CardTitle>
      </CardHeader>
      <CardContent className="px-5 pb-5 space-y-4">
        {/* Commission info */}
        <p className="text-[13px] text-muted-foreground">
          Invite friends and get{' '}
          <span className="font-semibold text-red-500">{commission}%</span> commission
        </p>

        {/* Withdrawable */}
        <div className="flex items-center justify-between">
          <span className="text-[13px] text-muted-foreground">Withdrawable</span>
          <div className="flex items-center gap-1">
            <span className="text-lg font-bold">${withdrawable}</span>
            <button className="inline-flex items-center text-[13px] text-primary hover:text-primary/80 font-medium">
              Extract
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Invitation code */}
        <div className="space-y-1.5">
          <div className="text-xs text-muted-foreground">Invitation code:</div>
          <div className="flex items-center gap-1.5">
            <Input
              readOnly
              value={invitationCode}
              className="flex-1 h-9 text-[13px] font-mono bg-muted/30 border-muted"
            />
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 shrink-0 text-muted-foreground hover:text-foreground"
              onClick={() => handleCopy(invitationCode, 'code')}
            >
              {copiedCode ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Invitation link */}
        <div className="space-y-1.5">
          <div className="text-xs text-muted-foreground">Invitation link:</div>
          <div className="flex items-center gap-1.5">
            <Input
              readOnly
              value={invitationLink}
              className="flex-1 h-9 text-[13px] font-mono bg-muted/30 border-muted truncate"
            />
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 shrink-0 text-muted-foreground hover:text-foreground"
              onClick={() => handleCopy(invitationLink + invitationCode, 'link')}
            >
              {copiedLink ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
