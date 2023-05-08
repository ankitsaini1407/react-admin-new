import React, { useEffect, useState } from 'react'
import {
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilCreditCard,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilUser,
} from '@coreui/icons';

import Cookies from 'js-cookie';
import { useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import CIcon from '@coreui/icons-react';

const AppHeaderDropdown = () => {

  const navigate = useNavigate();

  const toastOptions = {
    position: "top-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  let data = Cookies.get('user');
  if (!data) {
    setTimeout(() => {
      return navigate("/");
    }, 4000);
    return toast.error("Unauthorized Access", toastOptions);
  } else {
    data = JSON.parse(data);
  };
  const handleClick = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    setTimeout(() => {
      navigate("/");
    }, 3000);
    toast.success("LogOut successfully", toastOptions);
  };
  return (
    <>
      <CDropdown variant="nav-item">
        <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
          <CIcon icon={cilUser} className="me-2" />
          {data?.username ? data.username : null}
        </CDropdownToggle>
        <CDropdownMenu className="pt-0" placement="bottom-end">
          <CDropdownHeader className="bg-light fw-semibold py-2">Settings</CDropdownHeader>
          <CDropdownItem href="#">
            <CIcon icon={cilUser} className="me-2" />
            Profile
          </CDropdownItem>
          <CDropdownItem href="#">
            <CIcon icon={cilSettings} className="me-2" />
            Settings
          </CDropdownItem>
          <CDropdownItem href="#">
            <CIcon icon={cilCreditCard} className="me-2" />
            Payments
            <CBadge color="secondary" className="ms-2">
              42
            </CBadge>
          </CDropdownItem>
          <CDropdownItem href="#">
            <CIcon icon={cilFile} className="me-2" />
            Projects
            <CBadge color="primary" className="ms-2">
              42
            </CBadge>
          </CDropdownItem>
          <CDropdownDivider />
          <CDropdownItem onClick={handleClick}>
            <CIcon icon={cilLockLocked} className="me-2" />
            Log Out
          </CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
      <ToastContainer />
    </>
  )
}

export default AppHeaderDropdown
