import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useFormik } from 'formik';
import { footer_sm_schema } from "../../schemas";
import { add_footer_contact } from '../../utils/APIRoutes';
import { ToastContainer, toast } from 'react-toastify';

const FooterSocialMedia = () => {
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
        hyper_link: ""
    };

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: footer_sm_schema,
        onSubmit: async (values, action) => {
            const { image, name, hyper_link } = values;
            const formData = new FormData();
            const data1 = { "name": name, "hyper_link": hyper_link };
            formData.append("data", JSON.stringify(data1));
            formData.append("image", image);
            console.log(data1)
            await axios.post(`${add_footer_contact}?type=social_media`, formData, { headers: { token: Cookies.get("token") } })
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
                    <Form.Label>Select a icon</Form.Label>
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
                    <Form.Label>Hyper link</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter hyper link"
                        required
                        name="hyper_link"
                        value={formik.values.hyper_link}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        isInvalid={!!formik.errors.hyper_link}
                        isValid={formik.touched.hyper_link && !formik.errors.hyper_link}
                    />
                    {formik.errors.hyper_link && formik.touched.hyper_link ? <p className="form-error" style={{ color: "red", width: "100%", display: "block" }}>{formik.errors.hyper_link}</p> : null}
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            <ToastContainer />
        </>
    );
};

export default FooterSocialMedia;

