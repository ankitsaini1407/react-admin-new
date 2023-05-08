import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useFormik } from 'formik';
import { footer_payment_schema } from "../../schemas";
import { add_footer_contact } from '../../utils/APIRoutes';
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
        name: "",
        link: ""
    };

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: footer_payment_schema,
        onSubmit: async (values, action) => {
            const { image, name, link } = values;
            const formData = new FormData();
            const data1 = { "name": name, "link": link };
            formData.append("data", JSON.stringify(data1));
            formData.append("image", image);
            console.log(data1)
            await axios.post(`${add_footer_contact}?type=payment_partners`, formData, { headers: { token: Cookies.get("token") } })
                .then(response => {
                    if (response) {
                        console.log("response", response);
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
                    <Form.Label>Select a image</Form.Label>
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
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter name"
                        required
                        name="name"
                        value={formik.values.name}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        isInvalid={!!formik.errors.name}
                        isValid={formik.touched.name && !formik.errors.name}
                    />
                    {formik.errors.name && formik.touched.name ? <p className="form-error" style={{ color: "red", width: "100%", display: "block" }}>{formik.errors.name}</p> : null}
                </Form.Group>
                <Form.Group className="position-relative mb-3">
                    <Form.Label>link</Form.Label>
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

