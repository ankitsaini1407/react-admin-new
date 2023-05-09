import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useFormik } from 'formik';
import { add_banner_schema } from "../../../schemas";
import { add_banner_route } from '../../../utils/APIRoutes';
import { ToastContainer, toast } from 'react-toastify';

const AddHomeBanners = () => {
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
  const [bannerSubType, setBannerSubType] = useState("");

  const toastOptions = {
    position: "top-right",
    autoClose: 4000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const initialValues = {
    image: ""
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: add_banner_schema,
    onSubmit: async (values, action) => {
      if (imageError === "") {
        const formData = new FormData();
        formData.append("image", values.image);
        const { data } = await axios.post(`${add_banner_route}?type=home&subType=${bannerSubType}`, formData);
        if (data.success === false) {
          toast.error(data.message, toastOptions);
        } else if (data.success === true) {
          setTimeout(() => {
            navigate("/home");
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
    
    (e.target.naturalWidth === 1920 && e.target.naturalHeight === 504) || 
    (e.target.naturalWidth === 952 && e.target.naturalHeight === 1064)? "" :
      setImageError("Image size is not valid");
      if(e.target.naturalWidth === 1920){
        setBannerSubType("desktop");
      }else if(e.target.naturalWidth === 952){
        setBannerSubType("mobile")
      };
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
      
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <ToastContainer />
    </>
  );
};

export default AddHomeBanners;