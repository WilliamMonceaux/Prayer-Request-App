"use client";

import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createHashRouter, RouterProvider } from 'react-router';
import DashboardLayout from '@/components/DashboardLayout';
import AccountSettings from '@/components/AccountSettings';
import MyPrayerRequests from '@/components/MyPrayerRequests';
import NotificationsProvider from '@/hooks/useNotifications/NotificationsProvider';
import DialogsProvider from '@/hooks/useDialogs/DialogsProvider';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/lib/index';

export default function DashboardClient() {
  const router = React.useMemo(() => {
    return createHashRouter([
      {
        Component: DashboardLayout,
        children: [
          { path: '/', Component: AccountSettings },
          { path: '/settings', Component: AccountSettings },
          { path: '/my-requests', Component: MyPrayerRequests },
          { path: '*', Component: AccountSettings },
        ],
      },
    ]);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme /> 
      <NotificationsProvider>
        <DialogsProvider>
          <RouterProvider router={router} />
        </DialogsProvider>
      </NotificationsProvider>
    </ThemeProvider>
  );
}