import { AppRouting } from '@/routing/app-routing';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { LoadingBarContainer } from 'react-top-loading-bar';
import { Toaster } from '@/components/ui/sonner';
import { NotificationsSubscription } from '@/components/notifications/notifications-subscription';
import KeycloakProvider from './auth/providers/keycloak.provider';
import { AuthProvider } from './auth/providers/supabase-provider';
import { GraphQLProvider } from './providers/graphql-provider';
import { I18nProvider } from './providers/i18n-provider';
import { ModulesProvider } from './providers/modules-provider';
import { NotificationProvider } from './providers/notification-provider';
import { QueryProvider } from './providers/query-provider';
import { SettingsProvider } from './providers/settings-provider';
import { ThemeProvider } from './providers/theme-provider';
import { TooltipsProvider } from './providers/tooltips-provider';

const { BASE_URL } = import.meta.env;

export function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <KeycloakProvider>
        <AuthProvider>
          <SettingsProvider>
            <ThemeProvider>
              <I18nProvider>
                <HelmetProvider>
                  <TooltipsProvider>
                    <QueryProvider>
                      <NotificationProvider>
                        <LoadingBarContainer>
                          <BrowserRouter basename={BASE_URL}>
                            <Toaster />
                            <GraphQLProvider>
                              <NotificationsSubscription />
                              <ModulesProvider>
                                <AppRouting />
                              </ModulesProvider>
                            </GraphQLProvider>
                          </BrowserRouter>
                        </LoadingBarContainer>
                      </NotificationProvider>
                    </QueryProvider>
                  </TooltipsProvider>
                </HelmetProvider>
              </I18nProvider>
            </ThemeProvider>
          </SettingsProvider>
        </AuthProvider>
      </KeycloakProvider>
    </QueryClientProvider>
  );
}
