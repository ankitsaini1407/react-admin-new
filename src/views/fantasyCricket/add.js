import React, { useState, useRef, useEffect } from "react";
import JoditEditor from "jodit-react";
import Form from "react-bootstrap/Form";
import { fantasy_cricket_add_schema } from "../../schemas";
import { useFormik } from "formik";
import Button from "react-bootstrap/Button";
import { add_Fantasy_Crikcet_route } from "../../utils/APIRoutes";
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
    initialValues: { type: "" },
    validationSchema: fantasy_cricket_add_schema,
    onSubmit: async (values, action) => {
      const { type } = values;
      let description = value;
      console.log(type, "type");
      await axios
        .post(
          `${add_Fantasy_Crikcet_route}?type=${type}`,
          {
            description,
          },
          { headers: { token: Cookies.get("token") } }
        )
        .then((res) => {
          if (res) {
            if (res.data.success === false) {
              toast.error(res.data.message, toastOptions);
            } else if (res.data.success === true) {
              setTimeout(() => {
                navigate("/fantasy-cricket");
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
  return (
    <div>
      <div>
        <Form onSubmit={formik.handleSubmit} encType="multipart/form-data">
          <Form.Select
            size="lg"
            name="type"
            required
            value={formik.values.type}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={!!formik.errors.type}
            isValid={formik.touched.type && !formik.errors.type}
          >
            <option>Select Fanatsy Game Type</option>
            <option value="fantasycricket">Fantasy Cricket</option>
            <option value="fantasyfootball">Fantasy FootBall</option>
            <option value="fantasykabaddi">Fantasy Kabaddi</option>
            <option value="playLudo">Play Ludo</option>
            <option value="fantasycricketapp">Fantasy Cricket App</option>
            <option value="fantasycricketleague">
              Fantasy Cricket Leaague
            </option>
          </Form.Select>
          {formik.errors.type && formik.touched.type ? (
            <p
              className="form-error"
              style={{ color: "red", width: "100%", display: "block" }}
            >
              {formik.errors.type}
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
