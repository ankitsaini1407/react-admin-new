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
import {locale} from "./lib/en";

const _nav = [
  {
    component: CNavItem,
    name: locale.DASHBOARD_LABLE,
    label: 'Dashboard',
    value:'dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />
    
  },
  {
    component: CNavItem,
    name: 'Home',
    label: 'Home',
    value:"home",
    to: '/home',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />
  },
  {
    component: CNavItem,
    name: 'About-Us',
    label: 'About-Us',
    value: 'about-us',
    to: '/about-us',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />
  },
  {
    component: CNavItem,
    name: 'Indian-T20-League',
    label: 'Indian-T20-League',
    value: 'indian-t20-league',
    to: '/indian-t20-league',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />
  },
  {
    component: CNavItem,
    name: 'Download',
    label: 'Download',
    value: 'download',
    to: '/download',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />
  },
  {
    component: CNavItem,
    name: 'Privacy Policy',
    label: 'Privacy Policy',
    value: 'privacy-policy',
    to: '/privacy-policy',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />
  },
  {
    component: CNavItem,
    name: "FAQ's",
    label: "FAQ's",
    value: "faq's",
    to: '/faqs',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />
  },
  {
    component: CNavItem,
    name: "Terms & Conditions",
    label: "Terms & Conditions",
    value: "terms-conditions",
    to: '/t&c',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />
  },
  {
    component: CNavItem,
    name: "How To Play",
    label: "How To Play",
    value: "how-to-play",
    to: '/how-to-play',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />
  },
  {
    component: CNavItem,
    name: "Fantasy Cricket",
    label: "Fantasy Cricket",
    value: "fantasy-cricket",
    to: '/fantasy-cricket',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />
  },
  {
    component: CNavGroup,
    name: 'Fantasy Point System',
    label: 'Fantasy Point System',
    value: 'fantasy-point-system',
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
    label: "Press Release",
    value: "press-release",
    to: '/press-release',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />
  },
  {
    component: CNavItem,
    name: "Footer",
    label: "Footer",
    value: "footer",
    to: '/footer',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />
  },
  {
    component: CNavItem,
    name: "Settings",
    label: "Settings",
    value: "settings",
    to: '/setting',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />
  },
  {
    component: CNavItem,
    name: "Sub-Admin",
    to: '/sub-admin',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />
  },
];

export default _nav;