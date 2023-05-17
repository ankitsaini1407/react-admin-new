import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import navigation from "../../_nav";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { sub_admin_schema } from "../../schemas";

const AddSubAdmin = () => {
  const animatedComponents = makeAnimated();
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

  const initialValues = {
    name: "",
    email: "",
    password: ""
  };

  const toastOptions = {
    position: "top-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: sub_admin_schema,
    onSubmit: async (values, action) => {
      const { name, email, password } = values;
      console.log("sub-admin", value);
      // const { data } = await axios.post(add_faq_route, {
      //   name, email, password, module
      // });
      // if (data.success === false) {
      //   toast.error(data.message, toastOptions);
      // } else if (data.success === true) {
      //   setTimeout(() => {
      //     navigate("/sub-admin");
      //   }, 3000);
      //   toast.success(data.message, toastOptions);
      // }
      action.resetForm();
    },
  });
  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Full Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Full Name"
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

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={!!formik.errors.email}
          isValid={formik.touched.email && !formik.errors.email}
        />
        {formik.errors.email && formik.touched.email ? (
          <p
            classemail="form-error"
            style={{ color: "red", width: "100%", display: "block" }}
          >
            {formik.errors.email}
          </p>
        ) : null}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={!!formik.errors.password}
          isValid={formik.touched.password && !formik.errors.password}
        />
        {formik.errors.password && formik.touched.password ? (
          <p
            classpassword="form-error"
            style={{ color: "red", width: "100%", display: "block" }}
          >
            {formik.errors.password}
          </p>
        ) : null}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Select Any Module </Form.Label>
        <Select
          closeMenuOnSelect={false}
          components={animatedComponents}
          isMulti
          options={navigation}
          onChange={(e)=>console.log("vvvv", e)}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default AddSubAdmin;
