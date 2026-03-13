"use client";

import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createHashRouter, RouterProvider } from 'react-router';
import DashboardLayout from '@/components/DashboardLayout';
import AccountSettings from '@/components/AccountSettings';
import MyPrayerRequests from '@/components/MyPrayerRequests';
import NotificationsProvider from '@/hooks/useNotifications/NotificationsProvider';
import DialogsProvider from '@/hooks/useDialogs/DialogsProvider';
import AppTheme from '@/theme/customizations/AppTheme';

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
    <AppTheme>
      <CssBaseline enableColorScheme /> 
      <NotificationsProvider>
        <DialogsProvider>
          <RouterProvider router={router} />
        </DialogsProvider>
      </NotificationsProvider>
    </AppTheme>
  );
}