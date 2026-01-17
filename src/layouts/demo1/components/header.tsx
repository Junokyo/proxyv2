import { useEffect, useState } from 'react';
import { useKC } from '@/auth/providers/keycloak.provider';
import { useUser } from '@/graphql/hooks/users/use-users';
import { StoreClientTopbar } from '@/pages/store-client/components/common/topbar';
import { SearchDialog } from '@/partials/dialogs/search/search-dialog';
import { AppsDropdownMenu } from '@/partials/topbar/apps-dropdown-menu';
import { ChatSheet } from '@/partials/topbar/chat-sheet';
import { NotificationsSheet } from '@/partials/topbar/notifications-sheet';
import { UserDropdownMenu } from '@/partials/topbar/user-dropdown-menu';
import {
  Bell,
  LayoutGrid,
  Menu,
  MessageCircleMore,
  Search,
  SquareChevronRight,
  Wallet,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { toAbsoluteUrl } from '@/lib/helpers';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useScrollPosition } from '@/hooks/use-scroll-position';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetBody,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Container } from '@/components/common/container';
import { Breadcrumb } from './breadcrumb';
import { MegaMenu } from './mega-menu';
import { MegaMenuMobile } from './mega-menu-mobile';
import { SidebarMenu } from './sidebar-menu';

// Format VND
const formatVND = (amount: number): string => {
  return new Intl.NumberFormat('vi-VN').format(amount);
};

export function Header() {
  const [isSidebarSheetOpen, setIsSidebarSheetOpen] = useState(false);
  const [isMegaMenuSheetOpen, setIsMegaMenuSheetOpen] = useState(false);

  const { pathname } = useLocation();
  const mobileMode = useIsMobile();
  const { authenticated, ready, login, user: kcUser } = useKC();

  // Fetch user balance
  const { data: userData, loading: balanceLoading } = useUser(kcUser?.id ?? '', !kcUser?.id || !authenticated);
  const userBalance = userData?.user?.balance ?? 0;

  const scrollPosition = useScrollPosition();
  const headerSticky: boolean = scrollPosition > 0;

  // Close sheet when route changes
  useEffect(() => {
    setIsSidebarSheetOpen(false);
    setIsMegaMenuSheetOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        'header fixed top-0 z-10 start-0 flex items-stretch shrink-0 border-b border-transparent bg-background end-0 pe-[var(--removed-body-scroll-bar-size,0px)]',
        headerSticky && 'border-b border-border',
      )}
    >
      <Container className="flex justify-between items-stretch lg:gap-4">
        {/* HeaderLogo */}
        <div className="flex gap-1 lg:hidden items-center gap-2.5">
          <Link to="/" className="shrink-0">
            <img
              src={toAbsoluteUrl('/media/app/mini-logo.svg')}
              className="h-[25px] w-full"
              alt="mini-logo"
            />
          </Link>
          <div className="flex items-center">
            {mobileMode && (
              <Sheet
                open={isSidebarSheetOpen}
                onOpenChange={setIsSidebarSheetOpen}
              >
                <SheetTrigger asChild>
                  <Button variant="ghost" mode="icon">
                    <Menu className="text-muted-foreground/70" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  className="p-0 gap-0 w-[275px] flex flex-col"
                  side="left"
                  close={false}
                >
                  <SheetHeader className="p-0 space-y-0" />
                  <SheetBody className="p-0 overflow-y-auto flex-1">
                    <SidebarMenu />
                  </SheetBody>
                  <div className="p-4 border-t border-border space-y-3">
                    {/* Mobile Wallet Balance */}
                    {authenticated && (
                      <Link
                        to="/topup"
                        className="flex items-center justify-between w-full px-3 py-2.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 transition-colors border border-emerald-200"
                      >
                        <div className="flex items-center gap-2">
                          <Wallet className="size-5 text-emerald-600" />
                          <span className="text-sm text-emerald-600">Số dư</span>
                        </div>
                        {balanceLoading ? (
                          <span className="h-5 w-20 bg-emerald-100 rounded animate-pulse" />
                        ) : (
                          <span className="text-sm font-bold text-emerald-700">
                            {formatVND(userBalance)}₫
                          </span>
                        )}
                      </Link>
                    )}
                    {!ready ? (
                      <div className="size-9 rounded-full bg-gray-200 animate-pulse shrink-0" />
                    ) : !authenticated ? (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => login()}
                        className="w-full shrink-0 font-medium"
                      >
                        Login
                      </Button>
                    ) : (
                      <UserDropdownMenu
                        trigger={
                          <div className="flex items-center gap-3 cursor-pointer">
                            <img
                              className="size-9 rounded-full border-2 border-green-500 shrink-0"
                              src={toAbsoluteUrl('/media/avatars/300-2.png')}
                              alt="User Avatar"
                            />
                            <span className="text-sm font-medium">Account</span>
                          </div>
                        }
                      />
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            )}
            {mobileMode && (
              <Sheet
                open={isMegaMenuSheetOpen}
                onOpenChange={setIsMegaMenuSheetOpen}
              >
                <SheetTrigger asChild>
                  <Button variant="ghost" mode="icon">
                    <SquareChevronRight className="text-muted-foreground/70" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  className="p-0 gap-0 w-[275px]"
                  side="left"
                  close={false}
                >
                  <SheetHeader className="p-0 space-y-0" />
                  <SheetBody className="p-0 overflow-y-auto">
                    <MegaMenuMobile />
                  </SheetBody>
                </SheetContent>
              </Sheet>
            )}
          </div>
        </div>

        {/* Main Content (MegaMenu or Breadcrumbs) */}
        {/* {pathname.startsWith('/account') ? (
          <Breadcrumb />
        ) : (
          !mobileMode && <MegaMenu />
        )} */}

        {/* HeaderTopbar */}
        <div className="flex w-full items-center justify-end gap-3">
          {pathname.startsWith('/store-client') ? (
            <StoreClientTopbar />
          ) : (
            <>
              {!mobileMode && (
                <SearchDialog
                  trigger={
                    <Button
                      variant="ghost"
                      mode="icon"
                      shape="circle"
                      className="size-9 hover:bg-primary/10 hover:[&_svg]:text-primary"
                    >
                      <Search className="size-4.5!" />
                    </Button>
                  }
                />
              )}
              <NotificationsSheet
                trigger={
                  <Button
                    variant="ghost"
                    mode="icon"
                    shape="circle"
                    className="size-9 hover:bg-primary/10 hover:[&_svg]:text-primary"
                  >
                    <Bell className="size-4.5!" />
                  </Button>
                }
              />
              <ChatSheet
                trigger={
                  <Button
                    variant="ghost"
                    mode="icon"
                    shape="circle"
                    className="size-9 hover:bg-primary/10 hover:[&_svg]:text-primary"
                  >
                    <MessageCircleMore className="size-4.5!" />
                  </Button>
                }
              />
              <AppsDropdownMenu
                trigger={
                  <Button
                    variant="ghost"
                    mode="icon"
                    shape="circle"
                    className="size-9 hover:bg-primary/10 hover:[&_svg]:text-primary"
                  >
                    <LayoutGrid className="size-4.5!" />
                  </Button>
                }
              />
              {/* Wallet Balance */}
              {authenticated && (
                <Link
                  to="/topup"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 transition-colors border border-emerald-200"
                >
                  <Wallet className="size-4 text-emerald-600" />
                  <div className="flex flex-col">
                    {balanceLoading ? (
                      <span className="h-4 w-16 bg-emerald-100 rounded animate-pulse" />
                    ) : (
                      <span className="text-sm font-semibold text-emerald-700">
                        {formatVND(userBalance)}₫
                      </span>
                    )}
                  </div>
                </Link>
              )}
              {!ready ? (
                <div className="size-9 rounded-full bg-gray-200 animate-pulse shrink-0" />
              ) : !authenticated ? (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => login()}
                  className="shrink-0 min-w-[70px] font-medium"
                >
                  Login
                </Button>
              ) : (
                <UserDropdownMenu
                  trigger={
                    <img
                      className="size-9 rounded-full border-2 border-green-500 shrink-0 cursor-pointer"
                      src={toAbsoluteUrl('/media/avatars/300-2.png')}
                      alt="User Avatar"
                    />
                  }
                />
              )}
            </>
          )}
        </div>
      </Container>
    </header>
  );
}
