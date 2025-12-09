import { Wallet } from 'lucide-react';
import { Notification } from '@/providers/notification-provider';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface TopUpItemProps {
  notification: Notification;
}

export function TopUpItem({ notification }: TopUpItemProps) {
  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes} ${minutes === 1 ? 'min' : 'mins'} ago`;
    if (hours < 24) return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  };

  return (
    <div className="flex grow gap-2.5 px-5">
      <Avatar>
        <AvatarImage src="/media/avatars/300-1.png" alt="avatar" />
        <AvatarFallback>
          <Wallet className="size-4" />
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-col gap-3.5">
        <div className="flex flex-col gap-1">
          <div className="text-sm font-medium mb-px">
            <span className="text-secondary-foreground">
              {notification.title}
            </span>
          </div>
          <div className="text-sm text-secondary-foreground">
            {notification.description}
          </div>
          {notification.amount && (
            <div className="mt-1">
              <Badge size="sm" variant="success" appearance="light">
                ${notification.amount.toFixed(2)}
              </Badge>
              {notification.paymentMethod && (
                <Badge
                  size="sm"
                  variant="info"
                  appearance="light"
                  className="ml-2"
                >
                  {notification.paymentMethod}
                </Badge>
              )}
            </div>
          )}
          <span className="flex items-center text-xs font-medium text-muted-foreground mt-1">
            {formatTime(notification.createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
}
