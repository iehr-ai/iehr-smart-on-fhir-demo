import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { Notifications } from '@mantine/notifications';
import { IEHRClient } from '@iehr/core';
import { IEHRProvider } from '@iehr/react';
import '@iehr/react/styles.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { App } from './App';

const iehr = new IEHRClient({
  onUnauthenticated: () => (window.location.href = '/'),
});

const container = document.getElementById('root') as HTMLDivElement;
const root = createRoot(container);
const router = createBrowserRouter([{ path: '*', element: <App /> }]);

root.render(
  <StrictMode>
    <IEHRProvider iehr={iehr} navigate={router.navigate}>
      <MantineProvider>
        <Notifications position="bottom-right" />
        <RouterProvider router={router} />
      </MantineProvider>
    </IEHRProvider>
  </StrictMode>
);
