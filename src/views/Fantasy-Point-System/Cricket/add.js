import React, { useEffect, useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { add_faq_schema } from "../../../schemas/index";
import { add_faq_route } from "../../../utils/APIRoutes";
import axios from "axios";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import JoditEditor from "jodit-react";

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

const AddFaq = () => {
  const navigate = useNavigate();

//
  const [data, setData] = useState([{ action: "", points: "" }]);

  const handleClick = () => {
    setData([...data, { action: "", points: "" }]);
  };
  const handleChange = (e, i) => {
    const { name, value } = e.target;
    const onchangeVal = [...data];
    onchangeVal[i][name] = value;
    setData(onchangeVal);
  };
  const handleDelete = (i) => {
    const deleteVal = [...data];
    deleteVal.splice(i, 1);
    setData(deleteVal);
  };
//

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

  const initialValues = {
    ques: "",
    ques1: "",
    ques2:""
    // type: "",
    // subType: "N/A"
  };

  const toastOptions = {
    position: "top-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: "",
    onSubmit: async (values, action) => {
      console.log("1")
    //   const { gameType,gameActions } = values;
    //   console.log(gameType,gameActions, data,value )
    //   const { data } = await axios.post(add_faq_route, {
    //     ques,
    //     type,
    //     subType,
    //     answer: value,
    //   });
    //   if (data.success === false) {
    //     toast.error(data.message, toastOptions);
    //   } else if (data.success === true) {
    //     setTimeout(() => {
    //       navigate("/fantasy-cricket");
    //     }, 3000);
    //     toast.success(data.message, toastOptions);
    //   }
    //   action.resetForm();
     },
  });
  

  const handleShow = (e) => {
    console.log(data);
  };

  return (
    <>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control
            type="text"
            name="ques"
            placeholder="Enter faq"
            value={formik.values.ques}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <br />
          {/* {formik.errors.type && formik.touched.type ? (
            <p
              className="form-error"
              style={{ color: "red", width: "100%", display: "block" }}
            >
              {formik.errors.type}
            </p>
          ) : null} */}
          <Form.Control
            type="text"
            name="ques1"
            placeholder="Enter faqq"
            value={formik.values.ques1}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {/* {formik.errors.ques && formik.touched.ques ? (
            <p
              className="form-error"
              style={{ color: "red", width: "100%", display: "block" }}
            >
              {formik.errors.ques}
            </p>
          ) : null} */}
          <br />
          <Form.Control
            type="text"
            name="ques2"
            placeholder="Enter faqq"
            value={formik.values.ques2}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {/* {formik.errors.ques && formik.touched.ques ? (
            <p
              className="form-error"
              style={{ color: "red", width: "100%", display: "block" }}
            >
              {formik.errors.ques}
            </p>
          ) : null} */}
        </Form.Group>

        {data.map((val, i) => (
          <div>
            <Form.Control
              type="text"
              name="action"
              required
              placeholder="Enter Action Type"
              value={val.action}
              onChange={(e) => handleChange(e, i)}
              onBlur={formik.handleBlur}
              // isInvalid={!!formik.errors.ques}
              // isValid={formik.touched.ques && !formik.errors.ques}
            />
            <br />
            <Form.Control
              type="text"
              name="points"
              required
              placeholder="Enter Points"
              value={val.points}
              onChange={(e) => handleChange(e, i)}
              onBlur={formik.handleBlur}
              // isInvalid={!!formik.errors.ques}
              // isValid={formik.touched.ques && !formik.errors.ques}
            />
            <br />
            
            {/* <input name="action" value={val.action}  onChange={(e)=>handleChange(e,i)} /> <br/><br/>
                    <input name="points" value={val.points} placeholder="Enter Points" onChange={(e)=>handleChange(e,i)} /> */}
            {/* <button onClick={()=>handleDelete(i)}>Delete</button> */}
          </div>
        ))}
        <button onClick={handleClick}>ADD More</button>
        {/* <br/> */}
        <button style={{ marginLeft: "10px" }} onClick={handleShow}>
          Show
        </button>
        <br />
        <br />
        {/* <p>{JSON.stringify(data)}</p> */}
        <JoditEditor
          ref={editor}
          config={config}
          initialValue=""
          getValue={getValue}
          tabIndex={1}
          onChange={(newContent) => getValue(newContent)}
        />
        <br />
        <Button variant="primary" >
          Submit
        </Button>
      </Form>
      <ToastContainer />
    </>
  );
};

export default AddFaq;
