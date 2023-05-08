import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useFormik } from "formik";
import { home_edit_square_boxes } from "../../../schemas";
import { edit_home_square_boxes_route } from "../../../utils/APIRoutes";
import Cookies from "js-cookie";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const EditHomeSquareBoxes = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [title, setTitle] = useState(location.state.title);
  const [description, setDescription] = useState(location.state.description);
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
    title: location.state.title,
    description: location.state.description,
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: home_edit_square_boxes,
    onSubmit: async (values, action) => {
        const { title, description } = values;
        await axios
          .post(
            `${edit_home_square_boxes_route}?id=${location.state.id}`,
            {
              title,
              description,
            },
            {
              headers: { token: Cookies.get("token") },
            }
          )
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
            }
          });
    },
  });
  var loadFile = (event) => {
    event.preventDefault();
    if (event.target.files) {
      setState(URL.createObjectURL(event.target.files[0]));
    }
  };

  const checkImage = (e) => {
    e.target.naturalWidth == 143 && e.target.naturalHeight == 147
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
            disabled
            name="image"
            size="lg"
            accept="image/*"
            onChange={(e) => {
              formik.setFieldValue("image", e.target.files[0]);
              setImageError("");
              loadFile(e);
            }}
          />
          {
            <img
              src={location.state.image}
              id="output"
              width="200"
              onLoad={(event) => checkImage(event)}
            />
          }
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

export default EditHomeSquareBoxes;
