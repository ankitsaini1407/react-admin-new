import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react';
import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav';

import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import logo from "../assets/images/logo.png";
import {sygnet} from "../assets/brand/sygnet";

// sidebar nav config
import navigation from '../_nav'

const AppSidebar = () => {
  console.log("navigation", navigation);
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        <img src={logo} className="sidebar-brand-full" height={50} />
        <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} />
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
      />
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
