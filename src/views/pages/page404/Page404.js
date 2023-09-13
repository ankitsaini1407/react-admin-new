import React from 'react';
import {
  CButton,
  CCol,
  CContainer,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilMagnifyingGlass } from '@coreui/icons';
import page404 from "../../../assets/images/404-image.png"

const Page404 = () => {
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <img src={page404} alt="page 404" style={{width:"100%"}} />
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Page404
