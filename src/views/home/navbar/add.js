import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFormik } from 'formik';
import axios from 'axios';
import Cookies from 'js-cookie';
import { home_navbar_route } from "../../../utils/APIRoutes";
import { home_navbar } from "../../../schemas";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const AddNavbar = () => {

  const navigate = useNavigate();
  useEffect(() => {
    myFunction();
  }, []);
  const myFunction = async () => {
    const token = Cookies.get("token");
    if (!token) {
      navigate("/");
    }
  };

  const toastOptions = {
    position: "top-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
    const initialValues = {
        order: "",
        name: "",
        title: "",
        design: ""
      };
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: home_navbar,
        onSubmit: async (values, action) => {
          const { order, name, title, design } = values;
          await axios.post(home_navbar_route, { order, name, title, design }, {headers:{token:Cookies.get("token")}})
          .then((response)=>{
            navigate("/home", { state: { active_table: "1" } });
            toast.success(response.data.message, toastOptions);
          }).catch((error)=> {
            if (error.response.data.token.isExpired == true) {
              setTimeout(() => {
                Cookies.remove("token", "user");
                navigate("/");
              }, 3000);
              toast.error(error.response.data.token.message, toastOptions);
            }
          })
          action.resetForm();
        }
      });
  return (
    <>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Order</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter List Order"
            name="order"
            value={formik.values.order}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={!!formik.errors.order}
            isValid={formik.touched.order && !formik.errors.order}
          />
          {formik.errors.order && formik.touched.order ? (
            <p
              className="form-error"
              style={{ color: "red", width: "100%", display: "block" }}
            >
              {formik.errors.order}
            </p>
          ) : null}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter List Name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={!!formik.errors.name}
            isValid={formik.touched.name && !formik.errors.name}
          />
          {formik.errors.name && formik.touched.name ? (
            <p
              className="form-error"
              style={{ color: "red", width: "100%", display: "block" }}
            >
              {formik.errors.name}
            </p>
          ) : null}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter List Title"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={!!formik.errors.title}
            isValid={formik.touched.title && !formik.errors.title}
          />
          {formik.errors.title && formik.touched.title ? (
            <p
              className="form-error"
              style={{ color: "red", width: "100%", display: "block" }}
            >
              {formik.errors.title}
            </p>
          ) : null}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Class</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter List Class(Optional)"
            name="design"
            value={formik.values.design}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default AddNavbar;
