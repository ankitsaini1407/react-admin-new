import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { add_testimonoal_schema } from "../../schemas";
import { add_testimonial_route } from "../../utils/APIRoutes";
import Cookies from 'js-cookie';
import axios from "axios";

const AddTestimonial = () => {
    const [file, setFile] = useState("");
    const navigate = useNavigate();
    useEffect(() => { myFunction() }, []);
    const myFunction = async () => {
        const token = Cookies.get('token');
        if (!token) {
            navigate("/");
        };
    };

    const toastOptions = {
        position: "top-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    const initialValues = {
        image: "",
        amount: "",
        quote: "",
        type: ""
    };

    const { values, errors, isValid, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: add_testimonoal_schema,
        onSubmit: async (values, action) => {
            const { amount, quote, type } = values;
            const formData = new FormData();
            
            const data1={"amount":amount,"quote":quote,"type":type}
           formData.append("data",JSON.stringify(data1));
           formData.append("image", file);
            const { data } = await axios.post(add_testimonial_route, formData,{headers:{'Content-Type':'multipart/form-data'}} );
            console.log("data", data);
            if (data.success === false) {
                toast.error(data.message, toastOptions);
            } else if (data.success === true) {
                setTimeout(() => {
                    navigate("/testimonial");
                }, 3000)
                toast.success(data.message, toastOptions);
            };
            action.resetForm();
        }
    });
    return (
        <>
            <Form noValidate onSubmit={handleSubmit}>
                <Form.Group className="position-relative mb-3">
                    <Form.Label>File</Form.Label>
                    <Form.Control
                        type="file"
                        required
                        name="image"
                        onChange={(e) => setFile(e.target.files[0])}
                        isInvalid={!!errors.image}
                        isValid={touched.image && !errors.image}
                    />
                </Form.Group>
                <Form.Group className="position-relative mb-3">
                    <Form.Label>Amount</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter amount"
                        required
                        name="amount"
                        value={values.amount}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        isInvalid={!!errors.amount}
                        isValid={touched.amount && !errors.amount}
                    />
                </Form.Group>
                <Form.Group className="position-relative mb-3">
                    <Form.Label>Quote</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter quote"
                        required
                        name="quote"
                        value={values.quote}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        isInvalid={!!errors.quote}
                        isValid={touched.quote && !errors.quote}
                    />
                </Form.Group>
                <Form.Group className="position-relative mb-3">
                    <Form.Label>Type</Form.Label>
                    <Form.Select
                        type="text"
                        placeholder="Please select a type"
                        required
                        name="type"
                        value={values.type}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        isInvalid={!!errors.type}
                        isValid={touched.type && !errors.type}
                    >
                        <option>Select testimonial type</option>
                        <option value="home">Home</option>
                        <option value="about">About Us</option>
                    </Form.Select>
                </Form.Group>
                <Button type="submit">Submit</Button>
            </Form>
            <ToastContainer />
        </>
    );
};

export default AddTestimonial;