import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Cookies from "js-cookie";

import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react';
import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav';

import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import logo from "../assets/images/logo.png";
import {sygnet} from "../assets/brand/sygnet";
import Page404 from "../views/pages/page404/Page404";

// sidebar nav config
import navigation from '../_nav'
import SubAdmin from "../views/sub-admin/table";

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow);

  const [module, setModule] = useState([])

  useEffect(() => {
    myFunction();
  }, []);
  const myFunction = async () => {
    const token = Cookies.get("token");
    if (!token) {
      navigate("/");
    }
  };

  let user = Cookies.get("user");
  user = JSON.parse(user);
  useEffect(()=>{
    newFeature()
  },[]);
  const newFeature= () => {
    let navs = []
    if(user.roles === "subAdmin"){
      user.accessModule.map((item)=>{
        navigation.map((elem)=>{
          if(elem.name === item){
            const data = module.find(data => data.name === elem);
            navs.push(elem);
          }
        })
      })}
      setModule(navs)
      navs = []
  }
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
          <AppSidebarNav items={module.length?module:navigation} />
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
