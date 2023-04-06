import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { BsX } from 'react-icons/bs';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Cookies from 'js-cookie';

const Footer = () => {
    const navigate = useNavigate();

    useEffect(() => { myFunction() }, []);
    const myFunction = async () => {
        const token = Cookies.get('token');
        if (!token) {
            navigate("/");
        };
    };
    const [modalShow, setModalShow] = useState(false);

    const handleChange = (e) => {
        e.preventDefault();
        if(e.target.value === "support"){
            navigate("/footer/contact-us", {state:{type:e.target.value}});
        }else{
            console.log("not match");
        }
    };

    return (
        <div>
            <Button variant="primary" onClick={() => { setModalShow(!modalShow) }}>
                Add+
            </Button>
            {
                modalShow ? <Modal show={modalShow} aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Add Footer Content
                        </Modal.Title>
                        <Button style={{ backgroundColor: "transparent", border: "none" }}
                            onClick={() => setModalShow(!modalShow)}>
                            <BsX style={{ fontSize: "35px", color: "black" }} />
                        </Button>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Select
                                size="lg"
                                name="footer_type"
                                onChange={handleChange}>
                                <option>Select Footer Type</option>
                                <option value="disclaimer">Disclaimer</option>
                                <option value="find_out_more">Find-Out-More</option>
                                <option value="about_us">About Us</option>
                                <option value="support">Support</option>
                                <option value="payment_partners">Payment Partners</option>
                            </Form.Select>
                        </Form>
                    </Modal.Body>
                </Modal> : ""}
        </div>
    );
};

export default Footer;