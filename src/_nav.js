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
import { CNavItem, CNavGroup } from '@coreui/react';

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
  {
    component: CNavItem,
    name: 'Download',
    to: '/download',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />
  },
  {
    component: CNavItem,
    name: 'Privacy Policy',
    to: '/privacy-policy',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />
  },
  {
    component: CNavItem,
    name: "FAQ's",
    to: '/faqs',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />
  },
  {
    component: CNavItem,
    name: "Terms & Conditions",
    to: '/t&c',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />
  },
  {
    component: CNavItem,
    name: "How To Play",
    to: '/how-to-play',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />
  },
  {
    component: CNavItem,
    name: "Fantasy Cricket",
    to: '/fantasy-cricket',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />
  },
  {
    component: CNavGroup,
    name: 'Fantasy Point System',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Cricket',
        to: '/fantasy-point-system/cricket',
      },
      {
        component: CNavItem,
        name: 'Football',
        to: '/fantasy-point-system/football',
      },
      {
        component: CNavItem,
        name: 'Kabaddi',
        to: '/fantasy-point-system/kabaddi',
      },
      {
        component: CNavItem,
        name: 'Spot Fantasy',
        to: '/fantasy-point-system/spot-fantasy',
      },
    ],
  },
  {
    component: CNavItem,
    name: "Press Release",
    to: '/press-release',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />
  },
  {
    component: CNavItem,
    name: "Footer",
    to: '/footer',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />
  },
  {
    component: CNavItem,
    name: "Settings",
    to: '/setting',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />
  },
];

export default _nav;