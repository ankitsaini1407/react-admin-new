import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useFormik } from 'formik';
import { add_banner_schema } from "../../schemas";
import { add_banner_route } from '../../utils/APIRoutes';
import { ToastContainer, toast } from 'react-toastify';

const AddBanners = () => {
  const navigate = useNavigate();

  useEffect(() => { myFunction() }, []);
  const myFunction = async () => {
    const token = Cookies.get('token');
    if (!token) {
      navigate("/");
    };
  };

  const [state, setState] = useState("");
  const [imageError, setImageError] = useState("");

  const toastOptions = {
    position: "top-right",
    autoClose: 4000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const initialValues = {
    image: "",
    type: "",
    subType: ""
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: add_banner_schema,
    onSubmit: async (values, action) => {
      if (imageError == "") {
        const formData = new FormData();
        formData.append("subType", values.subType);
        formData.append("image", values.image);
        const { data } = await axios.post(`${add_banner_route}?type=${values.type}`, formData);
        if (data.success === false) {
          toast.error(data.message, toastOptions);
        } else if (data.success === true) {
          setTimeout(() => {
            navigate("/banners");
          }, 3000)
          toast.success(data.message, toastOptions);
        };
        action.resetForm();
      }
    }
  });
  var loadFile = (event) => {
    event.preventDefault();
    if (event.target.files) {
      setState(URL.createObjectURL(event.target.files[0]));
    };
  };
  const checkImage = (e) => {
    console.log(e.target.naturalWidth, e.target.naturalHeight);
    (e.target.naturalWidth == 1920 && e.target.naturalHeight == 504) || 
    (e.target.naturalWidth == 952 && e.target.naturalHeight == 1064) ||
    (e.target.naturalWidth == 1920 && e.target.naturalHeight == 1144)||
    (e.target.naturalWidth == 6400 && e.target.naturalHeight == 2978)||
    (e.target.naturalWidth == 300 && e.target.naturalHeight == 115)  ||
    (e.target.naturalWidth == 492 && e.target.naturalHeight == 1120) ||
    (e.target.naturalWidth == 640 && e.target.naturalHeight == 326)? "" :
      setImageError("Image should be under or equal to 10 x 12");
  };

  return (
    <>
      <Form onSubmit={formik.handleSubmit} encType="multipart/form-data">
        <Form.Group controlId="formFileLg" className="mb-3">
          <Form.Label>Select a banner</Form.Label>
          <Form.Control
            type="file"
            name="image"
            size="lg"
            accept="image/*"
            onChange={(e) => { formik.setFieldValue("image", e.target.files[0]); setImageError(""); loadFile(e) }}
            isInvalid={!!formik.errors.image}
            isValid={formik.touched.image && !formik.errors.image}
          />
          {formik.errors.image && formik.touched.image ?
            <p className="form-error" style={{ color: "red", width: "100%", display: "block" }}>
              {formik.errors.image}
            </p> : null}
        </Form.Group>
        {imageError ?
          <p className="form-error" style={{ color: "red", width: "100%", display: "block" }}>{imageError}
          </p> : <img
            src={state}
            id="output"
            width="200"
            onLoad={event => checkImage(event)}
          />}
        <Form.Select className="mt-3"
          size="lg"
          name="type"
          value={formik.values.type}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={!!formik.errors.type}
          isValid={formik.touched.type && !formik.errors.type}>
          <option defaultValue hidden>Select banner type</option>
          <option value="home">Home</option>
          <option value="about">About Us</option>
          <option value="india-t20-league">India T20 League</option>
          <option value="download">Download</option>
        </Form.Select><br />
        {formik.errors.type && formik.touched.type ? <p className="form-error" style={{ color: "red", width: "100%", display: "block" }}>{formik.errors.type}</p> : null}
        
        <Form.Select className="mt-3"
          size="lg"
          name="subType"
          value={formik.values.subType}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={!!formik.errors.subType}
          isValid={formik.touched.subType && !formik.errors.subType}>
          <option defaultValue hidden>Select banner subType</option>
          <option value="desktop">Desktop</option>
          <option value="mobile">mobile</option>
          <option value="download-page-rating-desktop">Download Page Rating Desktop</option>
          <option value="download-page-carosel1-desktop">Download Page Carosel1 Desktop</option>
          <option value="download-page-carosel2-desktop">Download Page Carosel2 Desktop</option>
        </Form.Select><br />
        {formik.errors.subType && formik.touched.subType ? <p className="form-error" style={{ color: "red", width: "100%", display: "block" }}>{formik.errors.subType}</p> : null}
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <ToastContainer />
    </>
  );
};

export default AddBanners;