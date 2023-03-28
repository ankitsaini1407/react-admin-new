import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useFormik } from 'formik';
import { add_banner_schema } from "../../schemas";
import { add_banner_route } from '../../utils/APIRoutes';
import { toast } from 'react-toastify';

const AddBanners = () => {
  const [file, setFile] = useState();
  console.log("file", file);
  const navigate = useNavigate();

  useEffect(() => { myFunction() }, []);
  const myFunction = async () => {
    const token = Cookies.get('token');
    if (!token) {
      navigate("/");
    };
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
    type: ""
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: add_banner_schema,
    onSubmit: async (values, action) => {
      const formData = new FormData();
      formData.append("image", file);
      console.log("formData", formData);
      const { data } = await axios.post(`${add_banner_route}?type=${values.type}`, formData);
      if (data.success === false) {
        toast.error(data.message, toastOptions);
      } else if (data.success === true) {
        setTimeout(() => {
          navigate("/banners");
        }, 3000)
        toast.success(data.message, toastOptions);
        navigate("/banners");
      };
      console.log(values);
      action.resetForm();
    }
  });
  return (
    <>
      <Form onSubmit={handleSubmit} encType="multipart/form-data">
        <Form.Group controlId="formFileLg" className="mb-3">
          <Form.Label>Select a banner</Form.Label>
          <Form.Control
            type="file"
            name="image"
            size="lg"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          {errors.image && touched.image ? <p className="form-error" style={{ color: "red", width: "100%", display: "block" }}>{errors.image}</p> : null}
        </Form.Group><br />
        <Form.Select
          size="lg"
          name="type"
          value={values.type}
          onChange={handleChange}
          onBlur={handleBlur}>
          <option>Select banner type</option>
          <option value="home">Home</option>
          <option value="about">About Us</option>
        </Form.Select><br />
        {errors.type && touched.type ? <p className="form-error" style={{ color: "red", width: "100%", display: "block" }}>{errors.type}</p> : null}
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default AddBanners;

