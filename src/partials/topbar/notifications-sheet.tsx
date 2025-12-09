import React, { ReactNode } from 'react';
import { Calendar, Settings, Settings2, Shield, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNotification } from '@/providers/notification-provider';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Sheet,
  SheetBody,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TopUpItem } from './notifications/topup-item';

export function NotificationsSheet({ trigger }: { trigger: ReactNode }) {
  const { notifications, markAllAsRead, unreadCount } = useNotification();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="relative inline-block">
          {trigger}
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              size="xs"
              shape="circle"
              className="absolute -top-1 -end-1 min-w-[18px] h-[18px] flex items-center justify-center p-0 text-[10px] font-semibold"
            >
              {unreadCount > 99 ? '99+' : unreadCount}
            </Badge>
          )}
        </div>
      </SheetTrigger>
      <SheetContent className="p-0 gap-0 sm:w-[500px] sm:max-w-none inset-5 start-auto h-auto rounded-lg p-0 sm:max-w-none [&_[data-slot=sheet-close]]:top-4.5 [&_[data-slot=sheet-close]]:end-5">
        <SheetHeader className="mb-0">
          <SheetTitle className="p-3">Notifications</SheetTitle>
        </SheetHeader>
        <SheetBody className="grow p-0">
          <ScrollArea className="h-[calc(100vh-10.5rem)]">
            <Tabs defaultValue="all" className="w-full relative">
              <TabsList variant="line" className="w-full px-5 mb-5">
                <TabsTrigger value="all" className="relative">
                  All
                  {unreadCount > 0 && (
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 absolute top-1 -end-1" />
                  )}
                </TabsTrigger>
                <TabsTrigger value="inbox" className="relative">
                  Inbox
                  {unreadCount > 0 && (
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 absolute top-1 -end-1" />
                  )}
                </TabsTrigger>
                <TabsTrigger value="team">Team</TabsTrigger>
                <TabsTrigger value="following">Following</TabsTrigger>
                <div className="grow flex items-center justify-end">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        mode="icon"
                        className="mb-1"
                      >
                        <Settings className="size-4.5!" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-44"
                      side="bottom"
                      align="end"
                    >
                      <DropdownMenuItem asChild>
                        <Link to="/account/members/teams">
                          <Users /> Invite Users
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                          <Settings2 />
                          <span>Team Settings</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                          <DropdownMenuSubContent className="w-44">
                            <DropdownMenuItem asChild>
                              <Link to="/account/members/import-members">
                                <Shield />
                                Find Members
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link to="/account/members/import-members">
                                <Calendar /> Meetings
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link to="/account/members/import-members">
                                <Shield /> Group Settings
                              </Link>
                            </DropdownMenuItem>
                          </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                      </DropdownMenuSub>
                      <DropdownMenuItem asChild>
                        <Link to="/account/security/privacy-settings">
                          <Shield /> Group Settings
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TabsList>

              {/* All Tab */}
              <TabsContent value="all" className="mt-0">
                <div className="flex flex-col gap-5 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 px-5 text-center">
                      <p className="text-sm text-muted-foreground">
                        No notifications yet
                      </p>
                    </div>
                  ) : (
                    notifications.map((notification, index) => (
                      <React.Fragment key={notification.id}>
                        {notification.type === 'topup' ? (
                          <TopUpItem notification={notification} />
                        ) : (
                          <div className="flex grow gap-2.5 px-5">
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
                                <span className="flex items-center text-xs font-medium text-muted-foreground mt-1">
                                  {notification.time}
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                        {index < notifications.length - 1 && (
                          <div className="border-b border-b-border"></div>
                        )}
                      </React.Fragment>
                    ))
                  )}
                </div>
              </TabsContent>

              {/* Inbox Tab */}
              <TabsContent value="inbox" className="mt-0">
                <div className="flex flex-col gap-5">
                  {notifications.filter((n) => !n.read).length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 px-5 text-center">
                      <p className="text-sm text-muted-foreground">
                        No unread notifications
                      </p>
                    </div>
                  ) : (
                    notifications
                      .filter((n) => !n.read)
                      .map((notification, index, array) => (
                        <React.Fragment key={notification.id}>
                          {notification.type === 'topup' ? (
                            <TopUpItem notification={notification} />
                          ) : (
                            <div className="flex grow gap-2.5 px-5">
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
                                  <span className="flex items-center text-xs font-medium text-muted-foreground mt-1">
                                    {notification.time}
                                  </span>
                                </div>
                              </div>
                            </div>
                          )}
                          {index < array.length - 1 && (
                            <div className="border-b border-b-border"></div>
                          )}
                        </React.Fragment>
                      ))
                  )}
                </div>
              </TabsContent>

              {/* Team Tab */}
              <TabsContent value="team" className="mt-0">
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col items-center justify-center py-12 px-5 text-center">
                    <p className="text-sm text-muted-foreground">
                      No team notifications
                    </p>
                  </div>
                </div>
              </TabsContent>

              {/* Following Tab */}
              <TabsContent value="following" className="mt-0">
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col items-center justify-center py-12 px-5 text-center">
                    <p className="text-sm text-muted-foreground">
                      No following notifications
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </ScrollArea>
        </SheetBody>
        <SheetFooter className="border-t border-border p-5 grid grid-cols-2 gap-2.5">
          <Button variant="outline">Archive all</Button>
          <Button variant="outline" onClick={markAllAsRead}>
            Mark all as read
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
