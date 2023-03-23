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
import {useFormik} from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import {forgot_password_schema} from "../../../schemas/index";
import { forgot_password_route } from '../../../utils/APIRoutes';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

  const navigate = useNavigate();

  const initialValues = {
    email: "",
  };

  const toastOptions = {
    position: "top-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
};

  const {values, errors, touched, handleBlur, handleChange, handleSubmit } =  useFormik({
    initialValues: initialValues,
    validationSchema: forgot_password_schema,
    onSubmit: async (values, action) => {
      const { email } = values;
      const { data } = await axios.post(forgot_password_route, { email });
      if(data.success === false) {
        toast.error(data.message, toastOptions);
    }else if(data.success === true) {
      setTimeout(()=>{
        navigate("/reset-password", {state: {email:email}});
      }, 3000);
        toast.success(data.message, toastOptions);
    };
      action.resetForm();
    }
  });

  return (
    <>
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={ handleSubmit }>
                    <h1>Forgot Password</h1>
                    <p className="text-medium-emphasis">Enter your email to get otp </p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>@</CInputGroupText>
                      <CFormInput 
                     type='text' 
                     placeholder="Email" 
                     name="email" 
                     value={values.email}
                     onChange={handleChange}
                     onBlur={handleBlur}
                    />
                    {errors.email && touched.email?<p className="form-error" style={{color: "red",width:"100%",display:"block"}}>{errors.email}</p>:null}
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" type="submit" className="px-4">
                          Get Otp
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
    <ToastContainer />
    </>
  )
}

export default Login
