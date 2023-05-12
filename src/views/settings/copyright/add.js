import React, { useState, useRef, useEffect } from "react";
import JoditEditor from "jodit-react";
import Form from "react-bootstrap/Form";
import { home_cms_schema } from "../../../schemas";
import { useFormik } from "formik";
import Button from "react-bootstrap/Button";
import { add_play_responsible } from "../../../utils/APIRoutes";
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

const PlayResponsibleContent = () => {
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
    initialValues: "",
    validationSchema: "",
    onSubmit: async (values, action) => {
      await axios.post(`${add_play_responsible}?type=copyright`, {
        title:"copyright",
        value,
      }, { headers: { token: Cookies.get("token") } }).then((res)=>{
        if(res){
          if (res.data.success === false) {
            toast.error(res.data.message, toastOptions);
          } else if (res.data.success === true) {
            setTimeout(() => {
              navigate("/setting");
            }, 3000);
            toast.success(res.data.message, toastOptions);
          }
        }
      }).catch((err)=>{
        console.log(err);
      })
      
      action.resetForm();
    },
  });
  return (
    <div>
      <div>
        <Form onSubmit={formik.handleSubmit} encType="multipart/form-data">
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
export default PlayResponsibleContent;
