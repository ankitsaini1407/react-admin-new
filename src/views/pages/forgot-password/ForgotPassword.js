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
import {forgot_password_schema} from "../../../schemas/index"

const Login = () => {

  const navigate = useNavigate();

  const initialValues = {
    email: "",
  };

  const {values, errors, touched, handleBlur, handleChange, handleSubmit } =  useFormik({
    initialValues: initialValues,
    validationSchema: forgot_password_schema,
    onSubmit: async (values, action) => {
      console.log(values);
      const { email } = values;
    //   const { data } = await axios.post(registerRoute, { username, email, password });
    //   if(data.success === false) {
    //     connsole.log(data.message);
    // }else if(data.success === true) {
    //     navigate("/");
    //     console.log(data.message);
    // };
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
                    {errors.email && touched.email?<p className="form-error" style={{color: "red"}}>{errors.email}</p>:null}
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4">
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
  )
}

export default Login
