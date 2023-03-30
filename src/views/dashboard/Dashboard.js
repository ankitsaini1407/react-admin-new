import React, {useEffect} from 'react'

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons';

import avatar1 from '../../assets/images/avatars/1.jpg';
import avatar2 from '../../assets/images/avatars/2.jpg';
import avatar3 from '../../assets/images/avatars/3.jpg';
import avatar4 from '../../assets/images/avatars/4.jpg';
import avatar5 from '../../assets/images/avatars/5.jpg';
import avatar6 from '../../assets/images/avatars/6.jpg';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import log from "../../assets/images/ab-devilliers-gif.gif"



const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(()=>{myFunction()},[]);
  const myFunction = async () => {
    const token = Cookies.get('token');
    if(!token){
        navigate("/");
    }else{
      navigate("/dashboard");
    }
    };

  return (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <h1>Welcome to real 11 admin panel!</h1>
          <img src={log} />
        </CCardBody>
      </CCard>
    </>
  )
}

export default Dashboard
