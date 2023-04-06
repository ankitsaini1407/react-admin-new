import React, { useEffect } from "react";
import { useFormik } from 'formik';
import Cookies from 'js-cookie';
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';
import { add_footer_contact_schema } from "../../schemas";
import Button from 'react-bootstrap/Button';
import { add_footer_contact } from "../../utils/APIRoutes";
import axios from "axios";

const ContactUs = () => {

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
        sub_type: "",
        address: "",
        email: "",
        phone: ""
    };

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: add_footer_contact_schema,
        onSubmit: async (values, action) => {
            const { sub_type, address, email, phone } = values;
            await axios.post(`${add_footer_contact}?type=${location.state.type}`, {sub_type, address, email, phone}, { headers: { token: Cookies.get("token") } })
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
                <Form.Select
                    className="mb-3"
                    size="lg"
                    name="sub_type"
                    value={formik.values.sub_type}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.sub_type}
                    isValid={formik.touched.sub_type && !formik.errors.sub_type}
                >
                    <option>Select Sub Type</option>
                    <option value="contact_us">Contact Us</option>
                    <option value="social_media_link">Social Media Link</option>
                </Form.Select>
                {formik.errors.sub_type && formik.touched.sub_type ? <p className="form-error" style={{ color: "red", width: "100%", display: "block" }}>{formik.errors.sub_type}</p> : null}
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Enter Address</Form.Label>
                    <Form.Control
                        as="textarea"
                        placeholder="Enter Customer Support Address"
                        rows={3}
                        name="address"
                        value={formik.values.address}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        isInvalid={!!formik.errors.address}
                        isValid={formik.touched.address && !formik.errors.address}
                    />
                    {formik.errors.address && formik.touched.address ? <p className="form-error" style={{ color: "red", width: "100%", display: "block" }}>{formik.errors.address}</p> : null}

                </Form.Group>
                <Form.Group className="position-relative mb-3">
                    <Form.Label>Customer Support Email</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Customer Support Email"
                        required
                        name="email"
                        value={formik.values.email}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        isInvalid={!!formik.errors.email}
                        isValid={formik.touched.email && !formik.errors.email}
                    />
                    {formik.errors.email && formik.touched.email ? <p className="form-error" style={{ color: "red", width: "100%", display: "block" }}>{formik.errors.email}</p> : null}
                </Form.Group>
                <Form.Group className="position-relative mb-3">
                    <Form.Label>Customer Support Phone</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Customer Support Number"
                        required
                        name="phone"
                        value={formik.values.phone}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        isInvalid={!!formik.errors.phone}
                        isValid={formik.touched.phone && !formik.errors.phone}
                    />
                    {formik.errors.phone && formik.touched.phone ? <p className="form-error" style={{ color: "red", width: "100%", display: "block" }}>{formik.errors.phone}</p> : null}
                </Form.Group>
                <Button type="submit">Submit</Button>
            </Form>
            <ToastContainer />
        </>
    );
};

export default ContactUs;