import React from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked } from '@coreui/icons';
import {useFormik} from 'formik';
import { useNavigate, useLocation } from 'react-router-dom';
import {reset_password_schema} from "../../../schemas/index";
import { reset_password_route } from '../../../utils/APIRoutes';
import axios from 'axios';

const Login = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const initialValues = {
    otp: "",
    password: ""
  };

  const {values, errors, touched, handleBlur, handleChange, handleSubmit } =  useFormik({
    initialValues: initialValues,
    validationSchema: reset_password_schema,
    onSubmit: async (values, action) => {
      const { otp, password } = values;
      console.log(">>>>",location.state.email);
      const { data } = await axios.post(reset_password_route, { email:location.state.email, otp, password });
      console.log("reset",data);
      if(data.success === false) {
        connsole.log(data.message);
    }else if(data.success === true) {
        navigate("/");
        console.log(data.message);
    };
      action.resetForm();
    }
  });

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={ handleSubmit }>
                    <h1>Reset Password</h1>
                    <p className="text-medium-emphasis">Enter correct otp and reset password</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>@</CInputGroupText>
                      <CFormInput 
                     type='text' 
                     placeholder="Otp" 
                     name="otp" 
                     value={values.otp}
                     onChange={handleChange}
                     onBlur={handleBlur}
                    /><br />
                    {errors.otp && touched.otp?<p className="form-error" style={{color: "red",width:"100%",display:"block"}}>{errors.otp}</p>:null}
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.password && touched.password?<p className="form-error" style={{color: "red",width:"100%",display:"block"}}>{errors.password}</p>:null}
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" type="submit" className="px-4">
                          Reset Password
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
