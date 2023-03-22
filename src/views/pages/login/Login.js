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
import { cilLockLocked, cilUser } from '@coreui/icons';
import {useFormik} from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import {login_schema} from "../../../schemas/index"

const Login = () => {

  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: ""
  };

  const {values, errors, touched, handleBlur, handleChange, handleSubmit } =  useFormik({
    initialValues: initialValues,
    validationSchema: login_schema,
    onSubmit: async (values, action) => {
      console.log(values);
      const { email, password } = values;
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
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
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
                        <CButton color="primary" className="px-4">
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                      <Link to="/forgot-password">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                        </Link>
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
