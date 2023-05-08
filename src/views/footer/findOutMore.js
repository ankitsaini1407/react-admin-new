import React, { useEffect } from "react";
import { useFormik } from 'formik';
import Cookies from 'js-cookie';
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';
import { find_out_more } from "../../schemas";
import Button from 'react-bootstrap/Button';
import { add_footer_find_out_more } from "../../utils/APIRoutes";
import axios from "axios";

const findOutMore = () => {

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => { myFunction() }, []);
    const myFunction = async () => {
        const token = Cookies.get('token');
        if (!token) {
            navigate("/");
        };
    };

    const toastOptions = {
        position: "top-right",
        autoClose: 2000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    const initialValues = {
        path: "",
        heading: ""
    };

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: find_out_more,
        onSubmit: async (values, action) => {
            const { path, heading } = values;
            await axios.post(`${add_footer_find_out_more}`, { path, heading }, { headers: { token: Cookies.get("token") } })
                .then(response => {
                    if (response) {
                        setTimeout(() => {
                            navigate("/footer");
                        }, 3000);
                        return toast.success(response.data.message, toastOptions);
                    }
                }).catch(function (error) {
                    console.log("..--..", error);
                });
            action.resetForm();
        }
    });

    return (
        <>
            <Form noValidate onSubmit={formik.handleSubmit}>
                <Form.Group className="position-relative mb-3">
                    <Form.Label>Headings</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Heading"
                        required
                        name="heading"
                        value={formik.values.heading}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        isInvalid={!!formik.errors.heading}
                        isValid={formik.touched.heading && !formik.errors.heading}
                    />
                    {formik.errors.heading && formik.touched.heading ? <p className="form-error" style={{ color: "red", width: "100%", display: "block" }}>{formik.errors.heading}</p> : null}
                </Form.Group>
                <Form.Group className="position-relative mb-3">
                    <Form.Label>Path</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Heading Path"
                        required
                        name="path"
                        value={formik.values.path}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        isInvalid={!!formik.errors.path}
                        isValid={formik.touched.path && !formik.errors.path}
                    />
                    {formik.errors.path && formik.touched.path ? <p className="form-error" style={{ color: "red", width: "100%", display: "block" }}>{formik.errors.path}</p> : null}
                </Form.Group>
                <Button type="submit">Submit</Button>
            </Form>
            <ToastContainer />
        </>
    );
};

export default findOutMore;