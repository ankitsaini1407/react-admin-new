import React, { useState, useRef, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import Form from 'react-bootstrap/Form';
import { cms_schema } from '../../schemas';
import { useFormik } from 'formik';
import Button from 'react-bootstrap/Button';
import { add_cms_route } from '../../utils/APIRoutes';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';

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

const AddCms = () => {
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
    const toastOptions = {
        position: "top-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      };
    const formik = useFormik({
        initialValues: { type: "" },
        validationSchema: cms_schema,
        onSubmit: async (values, action) => {
            const { type } = values;
            const { data } = await axios.post(add_cms_route, { type, value });
            console.log("data", data);
            if (data.success === false) {
                toast.error(data.message, toastOptions);
            } else if (data.success === true) {
                setTimeout(() => {
                    navigate("/cms");
                }, 3000)
                toast.success(data.message, toastOptions);
            };
            action.resetForm();
        }
    });
    return (
        <div>
            <div>
                <Form onSubmit={formik.handleSubmit} encType="multipart/form-data">
                    <Form.Select
                        size="lg"
                        name="type"
                        value={formik.values.type}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={!!formik.errors.type}
                        isValid={formik.touched.type && !formik.errors.type}>
                        <option>Select cms type</option>
                        <option value="home">Home</option>
                        <option value="about">About Us</option>
                    </Form.Select><br />
                    {formik.errors.type && formik.touched.type ? <p className="form-error" style={{ color: "red", width: "100%", display: "block" }}>{formik.errors.type}</p> : null}

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

            </div>
            <div>{value}</div>
        </div>
    );
};
export default AddCms;