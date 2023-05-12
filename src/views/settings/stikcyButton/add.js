import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useFormik } from 'formik';
import { sticky_buttons } from "../../../schemas";
import { add_sticky_button } from '../../../utils/APIRoutes';
import { ToastContainer, toast } from 'react-toastify';

const FooterPaymentPartners = () => {
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
        link: ""
    };

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: sticky_buttons,
        onSubmit: async (values, action) => {
            const { image, link } = values;
            const formData = new FormData();
            const data1 = {  "link": link };
            formData.append("data", JSON.stringify(data1));
            formData.append("image", image);
            console.log(data1)
            await axios.post(`${add_sticky_button}?type=sticky_button`, formData, { headers: { token: Cookies.get("token") } })
                .then(response => {
                    if (response) {
                        setTimeout(() => {
                            navigate("/footer");
                        }, 3000);
                        return toast.success(response.data.message, toastOptions);
                    }
                }).catch(function (error) {
                    if (error) {
                        console.log(">>>", error);
                    }
                });
            // if (data.success === false) {
            //     toast.error(data.message, toastOptions);
            // } else if (data.success === true) {
            //     setTimeout(() => {
            //         navigate("/footer");
            //     }, 3000)
            //     toast.success(data.message, toastOptions);
            // };
            action.resetForm();
        }
    });
    return (
        <>
            <Form onSubmit={formik.handleSubmit} encType="multipart/form-data">
                <Form.Group controlId="formFileLg" className="mb-3">
                    <Form.Label><strong>Select Image</strong></Form.Label>
                    <Form.Control
                        type="file"
                        name="image"
                        size="lg"
                        accept="image/*"
                        onChange={(e) => formik.setFieldValue("image", e.target.files[0])}
                        isInvalid={!!formik.errors.image}
                        isValid={formik.touched.image && !formik.errors.image}
                    />
                    {formik.errors.image && formik.touched.image ? <p className="form-error" style={{ color: "red", width: "100%", display: "block" }}>{formik.errors.image}</p> : null}
                </Form.Group>
                <Form.Group className="position-relative mb-3">
                    <Form.Label><strong>Url</strong>    </Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter hyper link"
                        required
                        name="link"
                        value={formik.values.link}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        isInvalid={!!formik.errors.link}
                        isValid={formik.touched.link && !formik.errors.link}
                    />
                    {formik.errors.link && formik.touched.link ? <p className="form-error" style={{ color: "red", width: "100%", display: "block" }}>{formik.errors.link}</p> : null}
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            <ToastContainer />
        </>
    );
};

export default FooterPaymentPartners;

