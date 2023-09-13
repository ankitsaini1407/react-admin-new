import React, {useEffect} from 'react';

import { CCard, CCardBody } from '@coreui/react';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import log from "../../assets/images/ipl9.jpeg"

const Dashboard = () => {
  const navigate = useNavigate();
  const para = useParams();
  let currentRoute = para["*"];
useEffect(()=>{
  let user = Cookies.get("user");
  user = JSON.parse(user);
  let route = user.accessRoutes;
  let arr = [];
  // route.map((elem)=>{
  //   arr.push(elem.split("/")[1])
  //   console.log("qrr", arr);
  //   !currentRoute.includes(arr)?navigate("/home"):"";
  // })
})
  
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
