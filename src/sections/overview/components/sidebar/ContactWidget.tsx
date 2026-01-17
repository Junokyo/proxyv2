'use client';

import { Icon } from '@iconify/react';
import { MessageCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ContactWidgetProps {
  className?: string;
}

const SOCIAL_LINKS = [
  {
    name: 'Twitter',
    icon: 'ri:twitter-x-fill',
    href: '#',
    hoverBg: 'hover:bg-gray-100 dark:hover:bg-gray-800',
    textColor: 'text-gray-700 dark:text-gray-300',
  },
  {
    name: 'Facebook',
    icon: 'mdi:facebook',
    href: '#',
    hoverBg: 'hover:bg-[#1877F2]/10',
    textColor: 'text-[#1877F2]',
  },
  {
    name: 'WhatsApp',
    icon: 'mdi:whatsapp',
    href: '#',
    hoverBg: 'hover:bg-[#25D366]/10',
    textColor: 'text-[#25D366]',
  },
];

export function ContactWidget({ className }: ContactWidgetProps) {
  return (
    <Card className={cn('border-0 shadow-[0_1px_3px_rgba(0,0,0,0.08)]', className)}>
      <CardContent className="p-5 space-y-4">
        {/* Question text - no header */}
        <p className="text-[13px] text-muted-foreground leading-relaxed">
          Have any questions about our products or need a customized package?
        </p>

        {/* Social links */}
        <div className="flex items-center gap-2">
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.name}
              href={social.href}
              className={cn(
                'flex h-10 w-10 items-center justify-center rounded-lg border border-border transition-colors',
                social.hoverBg,
                social.textColor
              )}
              title={social.name}
            >
              <Icon icon={social.icon} className="text-xl" />
            </a>
          ))}
        </div>

        {/* Chat button */}
        <Button variant="outline" className="w-full gap-2 h-10 text-[13px] font-medium">
          <MessageCircle className="h-4 w-4" />
          Let's talk
        </Button>
      </CardContent>
    </Card>
  );
}
