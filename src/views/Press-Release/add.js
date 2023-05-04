import React, { useState, useRef, useEffect } from "react";
import JoditEditor from "jodit-react";
import Form from "react-bootstrap/Form";
import { press_relese } from "../../schemas";
import { useFormik } from "formik";
import Button from "react-bootstrap/Button";
import { add_press_release_route } from "../../utils/APIRoutes";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";

const config = {
  buttons: [
    "source",
    "|",
    "bold",
    "strikethrough",
    "underline",
    "italic",
    "|",
    "ul",
    "ol",
    "|",
    "outdent",
    "indent",
    "|",
    "font",
    "fontsize",
    "brush",
    "paragraph",
    "|",
    "image",
    "video",
    "table",
    "link",
    "|",
    "align",
    "undo",
    "redo",
    "|",
    "hr",
    "eraser",
    "copyformat",
    "|",
    "symbol",
    "fullsize",
    "print",
    "about",
  ],
};

const AddCms = () => {
  const navigate = useNavigate();
  const [state, setState] = useState("");
  const [imageError, setImageError] = useState("");

  useEffect(() => {
    myFunction();
  }, []);
  const myFunction = async () => {
    const token = Cookies.get("token");
    if (!token) {
      navigate("/");
    }
  };

  const [value, setValue] = useState();
  const getValue = (val) => {
    setValue(val);
  };
  const editor = useRef(null);
  const toastOptions = {
    position: "top-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };
  const initialValues = {
    title: "",
    url: "",
    image: "",
    description: ""
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: press_relese,
    onSubmit: async (values, action) => {
      const { title, url, image , description } = values;
      const formData = new FormData();
      console.log("-->", title, url, image , description);
      const data = { url:url ,title: title, description: description,value:value };
      formData.append("data", JSON.stringify(data));
      formData.append("image", image);

      console.log(".......", formData);
      await axios
        .post(
          `${add_press_release_route}`,
         formData,
          { headers: { token: Cookies.get("token") } }
        )
        .then((res) => {
          if (res) {
            if (res.data.success === false) {
              toast.error(res.data.message, toastOptions);
            } else if (res.data.success === true) {
              setTimeout(() => {
                navigate("/press-release");
              }, 3000);
              toast.success(res.data.message, toastOptions);
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });

      action.resetForm();
    },
  });
  var loadFile = (event) => {
    event.preventDefault();
    if (event.target.files) {
      setState(URL.createObjectURL(event.target.files[0]));
    }
  };
  return (
    <div>
      <div>
        <Form onSubmit={formik.handleSubmit} encType="multipart/form-data">
          <Form.Control
            type="text"
            name="title"
            placeholder="Enter title..."
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
          <br />

          <Form.Control
            type="text"
            name="url"
            placeholder="Enter Press Url... "
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
          <br />
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
            //   onLoad={(event) => checkImage(event)}
            />
          )}
          <Form.Control
            type="text"
            name="description"
            placeholder="Enter Description..."
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
          <br />

          <JoditEditor
            ref={editor}
            config={config}
            initialValue=""
            getValue={getValue}
            tabIndex={1}
            onChange={(newContent) => getValue(newContent)}
          />

          <br />
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <ToastContainer />
      </div>
    </div>
  );
};
export default AddCms;
