import React, { useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useFormik} from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import {add_faq_schema} from "../../schemas/index";
import { add_faq_route } from '../../utils/APIRoutes';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddFaq = () => {
  const navigate = useNavigate();

  useEffect(() => { myFunction() }, []);
  const myFunction = async () => {
    const token = Cookies.get('token');
    if (!token) {
      navigate("/");
    };
  };

    const initialValues = {
        ques: "",
        type: "",
        subType: "",
        answer: "",
      };
    
      const toastOptions = {
        position: "top-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };
    
      const {values, errors, touched, handleBlur, handleChange, handleSubmit } =  useFormik({
        initialValues: initialValues,
        validationSchema: add_faq_schema,
        onSubmit: async (values, action) => {
          console.log(values);
          const { ques, type, subType, answer } = values;
          const { data } = await axios.post(add_faq_route, { ques, type, subType, answer });
          if(data.success === false) {
            toast.error(data.message, toastOptions);
        }else if(data.success === true) {
          Cookies.set('token', data.token);
        let user = JSON.stringify(data.user);
          Cookies.set('user', user);
          setTimeout(()=>{
            navigate("/faq");
          }, 3000)
            toast.success(data.message, toastOptions);
        };
          action.resetForm();
        }
      });

    return(
        <>
          <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control 
          type="text" 
          name="ques" 
          placeholder="Enter faq" 
          value={values.faq}
          onChange={handleChange}
          onBlur={handleBlur} />
          {errors.ques && touched.ques?<p className="form-error" style={{color: "red",width:"100%",display:"block"}}>{errors.ques}</p>:null}
      </Form.Group>
      <Form.Select
          size="lg"
          name="type"
          value={values.type}
          onChange={handleChange}
          onBlur={handleBlur}>
          <option>Select faq type</option>
          <option value="home">Home</option>
          <option value="general">General</option>
          <option value="cricket">Cricket</option>
          <option value="football">Football</option>
          <option value="ludo">Ludo</option>
        </Form.Select><br />
        {errors.type && touched.type ? <p className="form-error" style={{ color: "red", width: "100%", display: "block" }}>{errors.type}</p> : null}

        <Form.Select
          size="lg"
          name="subType"
          value={values.subType}
          onChange={handleChange}
          onBlur={handleBlur}>
          <option>Select faq subType</option>
          <option value="spotFantasy">Spot Fantasy</option>
          <option value="liveFantasy">Live Fantasy</option>
          <option value="secondInnings">Second Innings</option>
          <option value="n/a">N/A</option>
        </Form.Select><br />
        {errors.subType && touched.subType ? <p className="form-error" style={{ color: "red", width: "100%", display: "block" }}>{errors.subType}</p> : null}
      <Form.Group className="mb-3" controlId="formBasicPassword">
      <textarea 
         className="form-control" 
         name="answer" 
         rows="12" 
         placeholder="Enter answer" 
         value={values.faq_ans}
         onChange={handleChange}
         onBlur={handleBlur} />
         {errors.answer && touched.answer?<p className="form-error" style={{color: "red",width:"100%",display:"block"}}>{errors.answer}</p>:null}
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
        </>
    );
};

export default AddFaq;