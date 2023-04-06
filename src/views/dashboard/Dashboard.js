import React, {useEffect} from 'react';

import { CCard, CCardBody } from '@coreui/react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import log from "../../assets/images/ipl9.jpeg"

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(()=>{myFunction()},[]);
  const myFunction = () => {
    const token = Cookies.get('token');
    if(!token){
        navigate("/");
    };
    };

  return (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <h1>Welcome to real 11 admin panel!</h1>
          <img src={log} style={{width:"100%", height:"500px"}} />
        </CCardBody>
      </CCard>
    </>
  )
}

export default Dashboard
