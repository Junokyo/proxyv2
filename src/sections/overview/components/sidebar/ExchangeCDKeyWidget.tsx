'use client';

import { useState } from 'react';
import { ArrowLeftRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ExchangeCDKeyWidgetProps {
  className?: string;
  onExchange?: (cdkey: string) => void;
}

export function ExchangeCDKeyWidget({ className, onExchange }: ExchangeCDKeyWidgetProps) {
  const [cdkey, setCdkey] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleExchange = async () => {
    if (!cdkey.trim()) return;

    setIsLoading(true);
    try {
      await onExchange?.(cdkey);
      setCdkey('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className={cn('border-0 shadow-[0_1px_3px_rgba(0,0,0,0.08)]', className)}>
      <CardHeader className="pb-3 pt-5 px-5">
        <CardTitle className="flex items-center gap-2 text-[15px] font-semibold">
          <ArrowLeftRight className="h-4 w-4 text-primary" />
          Exchange CDKey
        </CardTitle>
      </CardHeader>
      <CardContent className="px-5 pb-5">
        <div className="flex gap-2">
          <Input
            placeholder="CDKey"
            value={cdkey}
            onChange={(e) => setCdkey(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleExchange()}
            className="flex-1 h-9 text-sm"
          />
          <Button
            onClick={handleExchange}
            disabled={!cdkey.trim() || isLoading}
            size="sm"
            className="shrink-0 px-4 h-9"
          >
            Exchange
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
