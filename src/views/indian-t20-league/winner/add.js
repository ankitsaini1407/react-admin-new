import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { add_home_testimonoal_schema } from "../../../schemas";
import { add_testimonial_route } from "../../../utils/APIRoutes";
import Cookies from "js-cookie";
import axios from "axios";

const AddIndianT20LeagueTestimonial = () => {
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
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const initialValues = {
    image: "",
    amount: "",
    quote: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: add_home_testimonoal_schema,
    onSubmit: async (values, action) => {
      const { image, amount, quote } = values;
      const formData = new FormData();

      const data1 = { amount: amount, quote: quote };
      formData.append("data", JSON.stringify(data1));
      formData.append("image", image);
      const { data } = await axios.post(
        `${add_testimonial_route}?type=indian-t20-league`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (data.success === false) {
        toast.error(data.message, toastOptions);
      } else if (data.success === true) {
        setTimeout(() => {
          navigate("/indian-t20-league");
        }, 3000);
        toast.success(data.message, toastOptions);
      }
      action.resetForm();
    },
  });
  return (
    <>
      <Form noValidate onSubmit={formik.handleSubmit}>
        <Form.Group className="position-relative mb-3">
          <Form.Label>File</Form.Label>
          <Form.Control
            type="file"
            required
            name="image"
            accept="image/*"
            onChange={(e) => formik.setFieldValue("image", e.target.files[0])}
            isInvalid={!!formik.errors.image}
            isValid={formik.touched.image && !formik.errors.image}
          />
          {formik.errors.image && formik.touched.image ? (
            <p
              className="form-error"
              style={{ color: "red", width: "100%", display: "block" }}
            >
              {formik.errors.image}
            </p>
          ) : null}
        </Form.Group>
        <Form.Group className="position-relative mb-3">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter amount"
            required
            name="amount"
            value={formik.values.amount}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            isInvalid={!!formik.errors.amount}
            isValid={formik.touched.amount && !formik.errors.amount}
          />
          {formik.errors.amount && formik.touched.amount ? (
            <p
              className="form-error"
              style={{ color: "red", width: "100%", display: "block" }}
            >
              {formik.errors.amount}
            </p>
          ) : null}
        </Form.Group>
        <Form.Group className="position-relative mb-3">
          <Form.Label>Quote</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter quote"
            required
            name="quote"
            value={formik.values.quote}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            isInvalid={!!formik.errors.quote}
            isValid={formik.touched.quote && !formik.errors.quote}
          />
          {formik.errors.quote && formik.touched.quote ? (
            <p
              className="form-error"
              style={{ color: "red", width: "100%", display: "block" }}
            >
              {formik.errors.quote}
            </p>
          ) : null}
        </Form.Group>
        <Button type="submit">Submit</Button>
      </Form>
      <ToastContainer />
    </>
  );
};

export default AddIndianT20LeagueTestimonial;
