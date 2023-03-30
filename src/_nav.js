import React from 'react';
import CIcon from '@coreui/icons-react';
import {
  cilSpeedometer,
  cilWallpaper,
  cilCommentSquare,
  cilSpeech,
  cilPencil

} from '@coreui/icons';
import { CNavGroup, CNavItem } from '@coreui/react';
import { BsChatLeftQuote } from "react-icons/bs";

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavGroup,
    name: 'Banners',
    icon: <CIcon icon={cilWallpaper} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add Banners',
        to: '/add-banners',
      },
      {
        component: CNavItem,
        name: 'All Banners',
        to: '/banners',
      }
    ],
  },
  {
    component: CNavGroup,
    name: "FAQ's",
    icon: <CIcon icon={cilCommentSquare} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add FAQ',
        to: '/add-faq',
      },
      {
        component: CNavItem,
        name: "All FAQ's",
        to: '/faq',
      }
    ],
  },
  {
    component: CNavGroup,
    name: "Testimonial",
    icon: <CIcon icon={cilSpeech} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add Testimonial',
        to: '/add-testimonial',
      },
      {
        component: CNavItem,
        name: "All Testimonial",
        to: '/testimonial',
      }
    ],
  },

  {
    component: CNavGroup,
    name: "CMS",
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add Cms',
        to: '/add-cms',
      },
      {
        component: CNavItem,
        name: "All Cms",
        to: '/cms',
      }
    ],
  },
]

export default _nav
