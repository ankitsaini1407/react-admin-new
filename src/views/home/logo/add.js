import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useFormik } from "formik";
import { home_logo } from "../../../schemas";
import { home_logo_route } from "../../../utils/APIRoutes";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const AddLogo = () => {
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
    logo: "",
    url: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: home_logo,
    onSubmit: async (values, action) => {
      if (imageError == "") {
        const { logo, url } = values;
        const formData = new FormData();
        const data = { url: url };
        formData.append("data", JSON.stringify(data));
        formData.append("image", logo);
        await axios
          .post(home_logo_route, formData)
          .then((response) => {
            if(response){
            navigate("/home", { state: { active_table: "0" } });
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
    e.target.naturalWidth == 279 && e.target.naturalHeight == 88
      ? ""
      : setImageError("This image size is invalid");
  };
  return (
    <>
      <Form onSubmit={formik.handleSubmit} encType="multipart/form-data">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Logo</Form.Label>
          <Form.Control
            type="file"
            placeholder="Select a logo"
            name="logo"
            size="lg"
            accept="image/*"
            onChange={(e) => {
              formik.setFieldValue("logo", e.target.files[0]);
              setImageError("");
              loadFile(e);
            }}
            isInvalid={!!formik.errors.logo}
            isValid={formik.touched.logo && !formik.errors.logo}
          />
          {formik.errors.logo && formik.touched.logo ? (
            <p
              className="form-error"
              style={{ color: "red", width: "100%", display: "block" }}
            >
              {formik.errors.logo}
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

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Url</Form.Label>
          <Form.Control
            type="text"
            placeholder="Url"
            name="url"
            size="lg"
            value={formik.values.url}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={!!formik.errors.url}
            isValid={formik.touched.url && !formik.errors.url}
          />
          {formik.errors.url && formik.touched.url ? (
            <p
              className="form-error"
              style={{ color: "red", width: "100%", display: "block" }}
            >
              {formik.errors.url}
            </p>
          ) : null}
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default AddLogo;
