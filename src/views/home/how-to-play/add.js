import React, { useState, useRef, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useFormik } from "formik";
import { how_to_play } from "../../../schemas";
import { add_how_to_play_route } from "../../../utils/APIRoutes";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const AddHowToPlay = () => {
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
    order: "",
    title: "",
    description: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: how_to_play,
    onSubmit: async (values, action) => {
      if (imageError == "") {
        const { image, order, title, description } = values;
        const formData = new FormData();
        const data = { order: order, title: title, description: description };
        formData.append("data", JSON.stringify(data));
        formData.append("image", image);
        await axios
          .post(`${add_how_to_play_route}?type=home&subType=carousel`, formData)
          .then((response) => {
            if (response) {
              navigate("/home", { state: { active_table: "3" } });
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
            };
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
    e.target.naturalWidth == 647 && e.target.naturalHeight == 198
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

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Order</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Order"
            name="order"
            size="lg"
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
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Title"
            name="title"
            size="lg"
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
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Description"
            name="description"
            size="lg"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={!!formik.errors.description}
            isValid={formik.touched.description && !formik.errors.description}
          />
          {formik.errors.description && formik.touched.description ? (
            <p
              className="form-error"
              style={{ color: "red", width: "100%", display: "block" }}
            >
              {formik.errors.description}
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

export default AddHowToPlay;
