import React,{useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import {useFormik} from 'formik';
import { add_banner_schema } from "../../schemas";

const AddBanners = () => {
  const navigate = useNavigate();

    useEffect(()=>{myFunction()},[]);
  const myFunction = async () => {
    const token = Cookies.get('token');
    if(!token){
        navigate("/");
    };
    };

    const initialValues = {
        banner: "",
        banner_type: ""
      };
    
      const {values, errors, touched, handleBlur, handleChange, handleSubmit } =  useFormik({
        initialValues: initialValues,
        validationSchema: add_banner_schema,
        onSubmit: async (values, action) => {
          console.log(values);
        //   const { banner, banner_type } = values;
        //   const { data } = await axios.post(loginRoute, { banner, banner_type });
        //   if(data.success === false) {
        //     connsole.log(data.message);
        // }else if(data.success === true) {
        //   Cookies.set('token', data.token);
        // let user = JSON.stringify(data.user);
        //   Cookies.set('user', user);
        //     navigate("/dashboard");
        // };
        console.log(values);
          action.resetForm();
        }
      });
    return(
        <>
        <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formFileLg" className="mb-3">
        <Form.Label>Select a banner</Form.Label>
        <Form.Control name="banner" type="file" size="lg" accept="image/png, image/jpg" />
        {errors.banner && touched.banner?<p className="form-error" style={{color: "red",width:"100%",display:"block"}}>{errors.banner}</p>:null}
      </Form.Group><br />
      <Form.Select size="lg" name="banner_type">
      <option>Select banner type</option>
      <option value="1">Home</option>
      <option value="2">About Us</option>
      </Form.Select><br />
      {errors.banner_type && touched.banner_type?<p className="form-error" style={{color: "red",width:"100%",display:"block"}}>{errors.banner_type}</p>:null}
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
        </>
    );
};

export default AddBanners;

