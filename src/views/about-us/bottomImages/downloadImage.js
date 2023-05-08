import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useFormik } from "formik";
import { about_us_bottom } from "../../../schemas";
import { add_about_us_bottom_image } from "../../../utils/APIRoutes";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const AboutUsDownloadImage = () => {
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

  const [state, setState] = useState("");
  const [imageError, setImageError] = useState("");

  const initialValues = {
    image: "",
    subType: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: about_us_bottom,
    onSubmit: async (values, action) => {
      if (imageError == "") {
        const { image, subType } = values;
        const formData = new FormData();
        const data = { subType: subType };
        formData.append("data", JSON.stringify(data));
        formData.append("image", image);
        await axios
          .post(`${add_about_us_bottom_image}?type=aboutUsDownloadImage`, formData)
          .then((response) => {
            if(response){
            navigate("/about-us", { state: { active_table: "0" } });
            toast.success(response.data.message, toastOptions);
            };
          })
          .catch(function (error) {
            if (error.response.data.token.isExpired == true) {
              setTimeout(() => {
                Cookies.remove("token", "user");
                navigate("/");
              }, 3000);
              toast.error(error.response.data.token.message, toastOptions);
            }
          });
        action.resetForm();
      }
    },
  });
  var loadFile = (event) => {
    event.preventDefault();
    if (event.target.files) {
      setState(URL.createObjectURL(event.target.files[0]));
    }
  };
  const checkImage = (e) => {
    console.log(e.target.naturalWidth, e.target.naturalHeight);
    e.target.naturalWidth == 244 && e.target.naturalHeight == 82
      ? ""
      : setImageError("This image size is invalid");
  };
  return (
    <>
      <Form onSubmit={formik.handleSubmit} encType="multipart/form-data">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Add Image</Form.Label>
          <Form.Control
            type="file"
            placeholder="Select a logo"
            name="image"
            size="lg"
            accept="image/*"
            onChange={(e) => {
              formik.setFieldValue("image", e.target.files[0]);
              setImageError("");
              loadFile(e);
            }}
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
          {imageError ? (
            <p
              className="form-error"
              style={{ color: "red", width: "100%", display: "block" }}
            >
              {imageError}
            </p>
          ) : (
            <img
              src={state}
              id="output"
              width="200"
              onLoad={(event) => checkImage(event)}
            />
          )}
        </Form.Group>

        <Form.Select className="mt-3"
          size="lg"
          name="subType"
          value={formik.values.subType}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={!!formik.errors.subType}
          isValid={formik.touched.subType && !formik.errors.subType}>
          <option defaultValue hidden>Select image subType</option>
          <option value="android">Android</option>
          <option value="ios">Ios</option>
        </Form.Select><br />
        {formik.errors.subType && formik.touched.subType ? <p className="form-error" style={{ color: "red", width: "100%", display: "block" }}>{formik.errors.subType}</p> : null}

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default AboutUsDownloadImage;
