import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilUser } from '@coreui/icons';
import {useFormik} from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import {register_schema} from "../../../schemas/index"

const Register = () => {

  const navigate = useNavigate();

  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirm_password: ""
  };

  const {values, errors, touched, handleBlur, handleChange, handleSubmit } =  useFormik({
    initialValues: initialValues,
    validationSchema: register_schema,
    onSubmit: async (values, action) => {
      console.log(values);
      const { username, email, password } = values;
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
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={ handleSubmit }>
                  <h1>Register</h1>
                  <p className="text-medium-emphasis">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput 
                     type='text' 
                     placeholder="Username" 
                     name="username" 
                     value={values.username}
                     onChange={handleChange}
                     onBlur={handleBlur}
                    />
                    {errors.username && touched.username?<p className="form-error" style={{color: "red"}}>{errors.username}</p>:null}
                  </CInputGroup>
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
                  <CInputGroup className="mb-3">
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
                    {errors.password && touched.password?<p className="form-error" style={{color: "red"}}>{errors.password}</p>:null}
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Repeat password"
                      name="confirm_password"
                      value={values.confirm_password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.confirm_password && touched.confirm_password?<p className="form-error" style={{color: "red"}}>{errors.confirm_password}</p>:null}
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton color="success">Create Account</CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
