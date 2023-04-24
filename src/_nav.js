import React from 'react';
import CIcon from '@coreui/icons-react';
import {
  cilSpeedometer,
  cilWallpaper,
  cilCommentSquare,
  cilSpeech,
  cilPencil,
  cilNotes,
  cilHome
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
    name: 'home',
    to: '/home',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />
  },
  {
    component: CNavItem,
    name: 'About-Us',
    to: '/about-us',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />
  },
  {
    component: CNavItem,
    name: 'Indian-T20-League',
    to: '/indian-t20-league',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />
  },
];

export default _nav;
