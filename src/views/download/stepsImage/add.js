import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import {
  add_download_banner,
} from "../../../utils/APIRoutes";
import Button from "react-bootstrap/Button";
import { ToastContainer, toast } from "react-toastify";
import Form from "react-bootstrap/Form";
import { useFormik } from "formik";
import { app_features_center_image } from "../../../schemas";

const DownloadStepsImage = () => {
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

  const [state, setState] = useState("");
  const [imageError, setImageError] = useState("");

  const toastOptions = {
    position: "top-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const formik = useFormik({
    initialValues: { image: "" },
    validationSchema: app_features_center_image,
    onSubmit: async (values, action) => {
      if (imageError == "") {
        const { image } = values;
        const formData = new FormData();
        formData.append("image", image);
        await axios
          .post(`${add_download_banner}?subType=download-steps`, formData, {
            headers: { token: Cookies.get("token") },
          })
          .then((response) => {
            if (response) {
              navigate("/download", { state: { active_table: "3" } });
              toast.success(response.data.message, toastOptions);
            }
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
    e.target.naturalWidth === 260 && e.target.naturalHeight === 318
      ? ""
      : setImageError("This image size is invalid");
  };

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Steps Image</Form.Label>
        <Form.Control
          type="file"
          placeholder="Select a image"
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
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default DownloadStepsImage;
