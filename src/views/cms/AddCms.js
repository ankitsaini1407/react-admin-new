import React, { useState, useRef, useEffect } from "react";
import JoditEditor from "jodit-react";
import Form from "react-bootstrap/Form";
import { cms_schema } from "../../schemas";
import { useFormik } from "formik";
import Button from "react-bootstrap/Button";
import { add_cms_route } from "../../utils/APIRoutes";
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
  const formik = useFormik({
    initialValues: { type: "", subType: "", title: "" },
    validationSchema: cms_schema,
    onSubmit: async (values, action) => {
      const { type, subType, title } = values;
      const { data } = await axios.post(add_cms_route, {
        type,
        subType,
        title,
        value,
      });
      if (data.success === false) {
        toast.error(data.message, toastOptions);
      } else if (data.success === true) {
        setTimeout(() => {
          navigate("/cms");
        }, 3000);
        toast.success(data.message, toastOptions);
      }
      action.resetForm();
    },
  });
  return (
    <div>
      <div>
        <Form onSubmit={formik.handleSubmit} encType="multipart/form-data">
          <Form.Select
            size="lg"
            name="subType"
            value={formik.values.subType}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={!!formik.errors.subType}
            isValid={formik.touched.subType && !formik.errors.subType}
          >
            <option>Select cms sub type</option>
            <option value="n/a">N/A</option>
            <option value="full-innings-tc">Full Innings T&C</option>
            <option value="2nd-innings-tc">2nd Innings T&C</option>
            <option value="spot-fantasy-tc">Spot Fantasy T&C</option>
            <option value="live-fantasy-tc">Live Fantasy T&C</option>
          </Form.Select>
          <br />
          {formik.errors.subType && formik.touched.subType ? (
            <p
              className="form-error"
              style={{ color: "red", width: "100%", display: "block" }}
            >
              {formik.errors.subType}
            </p>
          ) : null}

          <Form.Select
            size="lg"
            name="type"
            value={formik.values.type}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={!!formik.errors.type}
            isValid={formik.touched.type && !formik.errors.type}
          >
            <option>Select cms type</option>
            <option value="home">Home</option>
            <option value="about">About Us</option>
            <option value="india-t20-league">India T20 League</option>
            <option value="general-tc">General T&C</option>
            <option value="offer-tc">Offer T&C</option>
            <option value="fair-play-tc">Fair Play T&C</option>
            <option value="cricket-tc">Cricket T&C</option>
            <option value="football-tc">Football T&C</option>
            <option value="refer-earn-tc">Refer & Earn T&C</option>
            <option value="ludo-tc">Ludo T&C</option>
            <option value="more-tc">More T&C</option>
          </Form.Select>
          <br />
          {formik.errors.type && formik.touched.type ? (
            <p
              className="form-error"
              style={{ color: "red", width: "100%", display: "block" }}
            >
              {formik.errors.type}
            </p>
          ) : null}

          <Form.Control
            type="text"
            name="title"
            placeholder="Enter title"
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
