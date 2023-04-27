import React, { useEffect, useState, useRef } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { add_faq_schema } from "../../schemas/index";
import { add_faqs } from '../../utils/APIRoutes';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import JoditEditor from 'jodit-react';

const config = {
  buttons: ['source', '|',
      'bold',
      'strikethrough',
      'underline',
      'italic', '|',
      'ul',
      'ol', '|',
      'outdent', 'indent', '|',
      'font',
      'fontsize',
      'brush',
      'paragraph', '|',
      'image',
      'video',
      'table',
      'link', '|',
      'align', 'undo', 'redo', '|',
      'hr',
      'eraser',
      'copyformat', '|',
      'symbol',
      'fullsize',
      'print',
      'about'],
};

const AddFaq = () => {
  const navigate = useNavigate();

  useEffect(() => { myFunction() }, []);
  const myFunction = async () => {
    const token = Cookies.get('token');
    if (!token) {
      navigate("/");
    };
  };

  const [value, setValue] = useState();
    const getValue = (val) => {
        setValue(val);
    };
    const editor = useRef(null);

  const initialValues = {
    ques: "",
    type: "",
    subType: ""
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
    validationSchema: add_faq_schema,
    onSubmit: async (values, action) => {
      const { ques, type, subType, answer } = values;
      const { data } = await axios.post(add_faqs, { ques, type, subType, answer:value });
      if (data.success === false) {
        toast.error(data.message, toastOptions);
      } else if (data.success === true) {
        setTimeout(() => {
          navigate("/faqs");
        }, 3000)
        toast.success(data.message, toastOptions);
      };
      action.resetForm();
    }
  });

  return (
    <>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="text"
            name="ques"
            placeholder="Enter faq"
            value={formik.values.faq}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={!!formik.errors.ques}
            isValid={formik.touched.ques && !formik.errors.ques}

          />
          {formik.errors.ques && formik.touched.ques ? <p className="form-error" style={{ color: "red", width: "100%", display: "block" }}>{formik.errors.ques}</p> : null}
        </Form.Group>
        <Form.Select
          size="lg"
          name="type"
          value={formik.values.type}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={!!formik.errors.type}
          isValid={formik.touched.type && !formik.errors.type}>
          <option>Select faq type</option>
          <option value="general">General</option>
          <option value="cricket">Cricket</option>
          <option value="football">Football</option>
          <option value="kabaddi">Kabaddi</option>
          <option value="games">Games</option>
        </Form.Select><br />
        {formik.errors.type && formik.touched.type ? <p className="form-error" style={{ color: "red", width: "100%", display: "block" }}>{formik.errors.type}</p> : null}

        <Form.Select
          size="lg"
          name="subType"
          value={formik.values.subType}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={!!formik.errors.subType}
          isValid={formik.touched.subType && !formik.errors.subType}>
          <option>Select faq subType</option>
          <option value="spotFantasy">Spot Fantasy</option>
          <option value="liveFantasy">Live Fantasy</option>
          <option value="secondInnings">Second Innings</option>
          <option value="carrom">Carrom</option>
          <option value="solitaire">Solitaire</option>
          <option value="bubble-shooter">Bubble Shooter</option>
          <option value="n/a">N/A</option>
        </Form.Select><br />
        {formik.errors.subType && formik.touched.subType ? <p className="form-error" style={{ color: "red", width: "100%", display: "block" }}>{formik.errors.subType}</p> : null}
        
        <JoditEditor
          ref={editor}
          config={config}
          initialValue=""
          getValue={getValue}
          tabIndex={1}
          onChange={(newContent) => getValue(newContent)}
        /><br />
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <ToastContainer />
    </>
  );
};

export default AddFaq;