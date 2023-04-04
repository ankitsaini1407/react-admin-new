import React from 'react';
import CIcon from '@coreui/icons-react';
import {
  cilSpeedometer,
  cilWallpaper,
  cilCommentSquare,
  cilSpeech,
  cilPencil
} from '@coreui/icons';
import { CNavItem } from '@coreui/react';

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />
  },
  {
    component: CNavItem,
    name: 'Banners',
    to: '/banners',
    icon: <CIcon icon={cilWallpaper} customClassName="nav-icon" />
  },
  {
    component: CNavItem,
    name: "FAQ's",
    to: '/faq',
    icon: <CIcon icon={cilCommentSquare} customClassName="nav-icon" />
  },

  {
    component: CNavItem,
    name: "Testimonial",
    to: '/testimonial',
    icon: <CIcon icon={cilSpeech} customClassName="nav-icon" />
  },
  
  {
    component: CNavItem,
    name: "CMS",
    to: '/cms',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />
  },
];

export default _nav;
