import React, { useEffect, useState } from "react";
import Accordion from 'react-bootstrap/Accordion';
import DataTable from "react-data-table-component";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import Cookies from 'js-cookie';
import { get_footer_contact } from "../../utils/APIRoutes";
import { ToastContainer, toast } from 'react-toastify';

const Footer = () => {

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

    // contact us 

    const [footerContactData, setFooterContactData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [search, setSearch] = useState("");

    const getFooterContactData = async () => {
        try {
            await axios.get(`${get_footer_contact}?type=support`, { headers: { token: Cookies.get("token") } })
                .then(response => {
                    if (response) {
                        console.log("contact", response);
                        setFooterContactData(response.data.data);
                        setFilteredData(response.data.data);
                    }
                }).catch(function (error) {
                    if (error) {
                        if (error.response.data.token.isExpired == true) {
                            setTimeout(() => {
                                Cookies.remove("token", "user")
                                navigate("/");
                            }, 3000)
                            toast.error(error.response.data.token.message, toastOptions);
                        }
                    }
                });
        } catch (err) {
            console.log(err);
        };
    };

    useEffect(() => {getFooterContactData()}, []);

    useEffect(() => {
        let result = footerContactData.filter(elem => {
            let filterVal = elem.type.toLowerCase();
            let searchVal = search.toLocaleLowerCase();
            return filterVal.match(searchVal);
        });
        setFilteredData(result);
    }, [search]);

    const contactUsColumns = [
        {
            name: "S.No.",
            selector: (row, index) => index + 1,
            sortable: true,
        },
        {
            name: "Address",
            selector: (row) => row.address,
            sortable: true,
        },
        {
            name: "Email",
            selector: (row) => row.email,
            sortable: true,
        },
        {
            name: "Phone",
            selector: (row) => row.concatNo,
            sortable: true,
        },
        {
            name: "Type",
            selector: (row) => row.type,
            sortable: true,
        },
    ];

    // social media

    const [footerSMData, setFooterSMData] = useState([]);
    const [filteredSMData, setFilteredSMData] = useState([]);
    const [searchSM, setSearchSM] = useState("");

    const getFooterSMData = async () => {
        try {
            await axios.get(`${get_footer_contact}?type=social_media`, { headers: { token: Cookies.get("token") } })
                .then(response => {
                    if (response) {
                        console.log("sm", response);
                        setFooterSMData(response.data.data);
                        setFilteredSMData(response.data.data);
                    }
                }).catch(function (error) {
                    if (error) {
                        console.log("--><--", error);
                    }
                });
        } catch (err) {
            console.log(err);
        };
    };

    const socialMediaColumns = [
        {
            name: "S.No.",
            selector: (row, index) => index + 1,
            sortable: true,
        },
        {
            name: "Icon",
            selector: (row) => <img src={row.socialMeidaIcons} width={40} alt='icon' />,
            sortable: true,
        },
        {
            name: "Name",
            selector: (row) => row.social_media_name,
            sortable: true,
        },
        {
            name: "Hyper-Link",
            selector: (row) => row.socialMeidaHyperLinks,
            sortable: true,
        },
        {
            name: "Type",
            selector: (row) => row.type,
            sortable: true,
        },
    ];

    useEffect(() => {
        let result = footerSMData.filter(elem => {
            let filterVal = elem.social_media_name.toLowerCase();
            let searchVal = search.toLocaleLowerCase();
            return filterVal.match(searchVal);
        });
        setFilteredSMData(result);
    }, [searchSM]);

    //Payment Partners

    const [footerPPData, setFooterPPData] = useState([]);
    const [filteredPPData, setFilteredPPData] = useState([]);
    const [searchPP, setSearchPP] = useState("");

    const getFooterPPData = async () => {
        try {
            await axios.get(`${get_footer_contact}?type=payment_partners`, { headers: { token: Cookies.get("token") } })
                .then(response => {
                    if (response) {
                        console.log("pp", response);
                        setFooterPPData(response.data.data);
                        setFilteredPPData(response.data.data);
                    }
                }).catch(function (error) {
                    if (error) {
                        console.log("--><--", error);
                    }
                });
        } catch (err) {
            console.log(err);
        };
    };

    const PaymentPartnersColumns = [
        {
            name: "S.No.",
            selector: (row, index) => index + 1,
            sortable: true,
        },
        {
            name: "Image",
            selector: (row) => <img src={row.paymentPartnerLogo} width={40} alt='icon' />,
            sortable: true,
        },
        {
            name: "Name",
            selector: (row) => row.partnerName,
            sortable: true,
        },
        {
            name: "Link",
            selector: (row) => row.paymentPartnerHyperLinks,
            sortable: true,
        },
        {
            name: "Type",
            selector: (row) => row.type,
            sortable: true,
        },
    ];

    useEffect(() => {
        let result = footerPPData.filter(elem => {
            let filterVal = elem.partnerName.toLowerCase();
            let searchVal = search.toLocaleLowerCase();
            return filterVal.match(searchVal);
        });
        setFilteredPPData(result);
    }, [searchPP]);
    return (
        <>
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Support Section</Accordion.Header>
                    <Accordion.Body>
                        <DataTable
                            title="Support Content"
                            columns={contactUsColumns}
                            data={filteredData}
                            pagination
                            fixedHeader
                            fixedHeaderScrollHeight="450px"
                            selectableRowsHighlight
                            highlightOnHover
                            subHeader
                            subHeaderComponent={
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="w-25 form-control"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            }
                            actions={<Link to="/footer/contact-us"><button data-toggle="modal" data-target="#myModal" className="btn btn-sm btn-success">ADD+</button></Link>}
                            subHeaderAlign="right"
                        />
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1" onClick={getFooterSMData}>
                    <Accordion.Header>Social Media Links</Accordion.Header>
                    <Accordion.Body>
                        <DataTable
                            title="Social media links"
                            columns={socialMediaColumns}
                            data={filteredSMData}
                            pagination
                            fixedHeader
                            fixedHeaderScrollHeight="450px"
                            selectableRowsHighlight
                            highlightOnHover
                            subHeader
                            subHeaderComponent={
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="w-25 form-control"
                                    value={search}
                                    onChange={(e) => setSearchSM(e.target.value)}
                                />
                            }
                            actions={<Link to="/footer/social-media-link"><button data-toggle="modal" data-target="#myModal" className="btn btn-sm btn-success">ADD+</button></Link>}
                            subHeaderAlign="right"
                        />
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2" onClick={getFooterPPData}>
                    <Accordion.Header>Payment Partners</Accordion.Header>
                    <Accordion.Body>
                        <DataTable
                            title="Payment Partners"
                            columns={PaymentPartnersColumns}
                            data={filteredPPData}
                            pagination
                            fixedHeader
                            fixedHeaderScrollHeight="450px"
                            selectableRowsHighlight
                            highlightOnHover
                            subHeader
                            subHeaderComponent={
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="w-25 form-control"
                                    value={search}
                                    onChange={(e) => setSearchPP(e.target.value)}
                                />
                            }
                            actions={<Link to="/footer/payment-partners"><button data-toggle="modal" data-target="#myModal" className="btn btn-sm btn-success">ADD+</button></Link>}
                            subHeaderAlign="right"
                        />
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <ToastContainer />
        </>
    );
}

export default Footer;