import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
import AddBanners from './views/banners/AddBanners';
import Banners from './views/banners/Banners';

// Base

// Buttons

// Icons

// Notifications

const routes = [
  { path: '/dashboard', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/add-banners', name: 'Banners / Add-Banners', element: AddBanners },
  { path: '/banners', name: 'Banners / All-Banners', element: Banners },
  
]

export default routes
