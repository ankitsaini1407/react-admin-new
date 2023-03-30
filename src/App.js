
import { Routes, Route } from "react-router-dom";
import Login from "./views/pages/login/Login";
import Register from "./views/pages/register/Register";
import ForgotPassword from "./views/pages/forgot-password/ForgotPassword";
import ResetPassword from "./views/pages/reset-password/ResetPassword";
import Page404 from "./views/pages/page404/Page404";
import Page500 from "./views/pages/page500/Page500";
import "./scss/style.scss";
import DefaultLayout from "./layout/DefaultLayout";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Login/> } />
        <Route path="/register" element={ <Register/> } />
        <Route path="/forgot-password" element={ <ForgotPassword/> } />
        <Route path="/reset-password" element={ <ResetPassword/> } />
        <Route path="/page-404" element={ <Page404/> } />
        <Route path="/page-500" element={ <Page500/> } />
        <Route path="*" name="Home" element={<DefaultLayout />} />
        {/* <Route path="/dashboard" element={ <Dashboard/> } /> */}
      </Routes>
    </div>
  )
}

export default App;
