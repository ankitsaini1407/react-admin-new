import React, { Suspense } from 'react';
import Page404 from "../views/pages/page404/Page404";
import { Navigate, Route, Routes, useParams, useNavigate,Redirect,ReactDOM } from 'react-router-dom';
import { CContainer, CSpinner } from '@coreui/react';
import Cookies from 'js-cookie';


// routes config
import routes from '../routes'

const AppContent = () => {
  const navigate = useNavigate();
  const para = useParams();

  let user = Cookies.get("user");
  user = JSON.parse(user);
  let route = [];
  let subAdminRoutes = []
  let check = []
  if(user.roles === "subAdmin" ){
  user.accessRoutes.map((elem)=>{
    route.push(elem.split("/")[1]);
  })

  routes.map((elem)=>{
route.map((item)=>{
    if(elem.path.split("/")[1].includes(item)){
      subAdminRoutes.push(elem);
      check.push(elem.path.split("/")[1])
    }
  })
  })
}

if(check.length>0){
  check=[...new Set(check)]
};
  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {user.roles !== "subAdmin" ? routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<route.element />}
                />
              )
            )
          }):subAdminRoutes.map((route, idx) => {
            
            let currentRoute = para["*"];
            if(check.includes(currentRoute)){
              console.log("yes");
            }else{
              setTimeout(()=>{
                navigate("/page-404")
              }, 0)
             
            }
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<route.element />}
                />
              )
            )
          })}
          <Route path="/" element={<Navigate to="dashboard" replace />} />
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
