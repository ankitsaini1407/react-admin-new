import React, { useEffect } from 'react';
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
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { login_schema } from "../../../schemas/index";
import { loginRoute } from '../../../utils/APIRoutes';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

  const toastOptions = {
    position: "top-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const navigate = useNavigate();

  useEffect(() => { myFunction() }, []);
  const myFunction = async () => {
    const token = Cookies.get('token');
    if (token) {
      navigate("/dashboard");
    };
  };

  const initialValues = {
    email: "",
    password: ""
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: login_schema,
    onSubmit: async (values, action) => {
      const { email, password } = values;
      await axios.post(loginRoute, { email, password })
        .then(response => {
          if (response.data.success === true) {
            Cookies.set('token', response.data.token);
            let user = JSON.stringify(response.data.user);
            Cookies.set('user', user);
            setTimeout(() => {
              navigate("/dashboard");
            }, 3000)
            toast.success(response.data.message, toastOptions);
          }

        })
        .catch(function (error) {
          if (error) {
            toast.error(error.response.data.message, toastOptions);
          }
        });
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
                    <CForm onSubmit={handleSubmit}>
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
                        {errors.email && touched.email ? <p className="form-error" style={{ color: "red", width: "100%", display: "block" }}>{errors.email}</p> : null}
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
                        {errors.password && touched.password ? <p className="form-error" style={{ color: "red", width: "100%", display: "block" }}>{errors.password}</p> : null}
                      </CInputGroup>
                      <CRow>
                        <CCol xs={6}>
                          <CButton color="primary" type="submit" className="px-4">
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
      <ToastContainer />
    </>
  );
};

export default Login;