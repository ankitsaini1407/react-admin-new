import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));

// Base

// Buttons

// Icons

// Notifications

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  
]

export default routes
