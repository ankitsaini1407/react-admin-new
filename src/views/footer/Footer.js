import React, { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import DataTable from "react-data-table-component";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import {
  get_footer_contact,
  get_footer_disclaimer,
  update_footer_disclaimer,
  delete_footer_disclaimer,
  get_footer_find_out_more,
  update_footer_find_out_more,
  delete_footer_find_out_more
} from "../../utils/APIRoutes";
import { ToastContainer, toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { BsEyeFill, BsX,BsFillTrashFill } from "react-icons/bs";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';


const Footer = () => {
  const navigate = useNavigate();

  useEffect(() => {
    myFunction();
  }, []);
  const myFunction = async () => {
    const token = Cookies.get("token");
    if (!token) {
      navigate("/");
    }
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
      await axios
        .get(`${get_footer_contact}?type=support`, {
          headers: { token: Cookies.get("token") },
        })
        .then((response) => {
          if (response) {
            console.log("contact", response);
            setFooterContactData(response.data.data);
            setFilteredData(response.data.data);
          }
        })
        .catch(function (error) {
          if (error) {
            if (error.response.data.token.isExpired == true) {
              setTimeout(() => {
                Cookies.remove("token", "user");
                navigate("/");
              }, 3000);
              toast.error(error.response.data.token.message, toastOptions);
            }
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFooterContactData();
  }, []);

  useEffect(() => {
    let result = footerContactData.filter((elem) => {
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
      await axios
        .get(`${get_footer_contact}?type=social_media`, {
          headers: { token: Cookies.get("token") },
        })
        .then((response) => {
          if (response) {
            console.log("sm", response);
            setFooterSMData(response.data.data);
            setFilteredSMData(response.data.data);
          }
        })
        .catch(function (error) {
          if (error) {
            console.log("--><--", error);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  const socialMediaColumns = [
    {
      name: "S.No.",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Icon",
      selector: (row) => (
        <img src={row.socialMeidaIcons} width={40} alt="icon" />
      ),
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
    let result = footerSMData.filter((elem) => {
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
      await axios
        .get(`${get_footer_contact}?type=payment_partners`, {
          headers: { token: Cookies.get("token") },
        })
        .then((response) => {
          if (response) {
            console.log("pp", response);
            setFooterPPData(response.data.data);
            setFilteredPPData(response.data.data);
          }
        })
        .catch(function (error) {
          if (error) {
            console.log("--><--", error);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  const PaymentPartnersColumns = [
    {
      name: "S.No.",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Image",
      selector: (row) => (
        <img src={row.paymentPartnerLogo} width={40} alt="icon" />
      ),
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
    let result = footerPPData.filter((elem) => {
      let filterVal = elem.partnerName.toLowerCase();
      let searchVal = search.toLocaleLowerCase();
      return filterVal.match(searchVal);
    });
    setFilteredPPData(result);
  }, [searchPP]);

  const [footerDisclaimer, setFooterDiscliamer] = useState([]);
  const [filteredDisclaimer, setFilteredDisclaimer] = useState([]);
  const [searchDisclaimer, setSearchDisclaimer] = useState("");
  const [modalInfo, setModalInfo] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);

  const getFooterDisclaimerData = async () => {
    try {
      await axios
        .get(`${get_footer_disclaimer}`, {
          headers: { token: Cookies.get("token") },
        })
        .then((response) => {
          if (response) {
            console.log("disclaimer", response.data.data);
            setFooterDiscliamer(response.data.data);
            setFilteredDisclaimer(response.data.data);
          }
        })
        .catch(function (error) {
          if (error) {
            console.log("--><--", error);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };
  const handleChange = (id, active) => async () => {
    active = !active;
    await axios.post(`${update_footer_disclaimer}?id=${id}&isActive=${active}`,{},{
      headers: { token: Cookies.get("token") },
    });
    getFooterDisclaimerData();
  };

  const handleDelete = (id) => async (e) => {
    await axios.delete(`${delete_footer_disclaimer}?id=${id}`,{
      headers: { token: Cookies.get("token") },
    }).then(response => {
      getFooterDisclaimerData();
      if (response) {
        toast.success(response.data.message, toastOptions);
      }
    }).catch(function (error) {
      if (error) {
        if (error.response.data.success == false) {
          toast.error(error.response.data.message, toastOptions);
        }
      }
    });
  };

  const DisclaimerData = [
    {
      name: "S.No.",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Content",
      selector: (row) => (
        <div>
          <Button
            variant="primary"
            style={{ backgroundColor: "transparent", border: "none" }}
            onClick={() => {
              setModalInfo(row.disclaimer);
              setModalShow(!modalShow);
            }}
          >
            <BsEyeFill style={{ color: "blue" }} />
          </Button>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Type",
      selector: (row) => row.type,
      sortable: true,
    },
    {
      name: "Status",
      selector: row => row.isActive ? "Activate" : "In-Activate",
      sortable: true
    },
    {
      name: "Is-Active",
      cell: row => <label className="switch">
        <input type="checkbox" onChange={handleChange(row.id, row.isActive)} checked={row.isActive} />
        <span className="slider"></span>
      </label>
    },
    {
      name: "Action",
      cell: row => <div>
        <OverlayTrigger placement="bottom" overlay={<Tooltip id="button-tooltip-2">Delete</Tooltip>}>
        <Button style={{ backgroundColor: "transparent", border: "none" }} onClick={handleDelete(row.id)}>
          <BsFillTrashFill style={{ fontSize: "20px", color: "blue" }} />
        </Button>
        </OverlayTrigger>
      </div>
    }
  ];



  const [findOutMore, setFindOutMore] = useState([]);
  const [filteredFindOutMore, setFilteredFindOutMore] = useState([]);
  const [searchFindOutMore, setSearchFindOutMore] = useState("");

  const getFindOutMore = async () => {
    try {
      await axios
        .get(`${get_footer_find_out_more}`, {
          headers: { token: Cookies.get("token") },
        })
        .then((response) => {
          if (response) {
            console.log("findoutmore", response.data.data);
            setFindOutMore(response.data.data);
            setFilteredFindOutMore(response.data.data);
          }
        })
        .catch(function (error) {
          if (error) {
            console.log("--><--", error);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleFindOutMore = (id, active) => async () => {
    active = !active;
    await axios.post(`${update_footer_find_out_more}?id=${id}&isActive=${active}`,{},{
      headers: { token: Cookies.get("token") },
    });
    getFooterDisclaimerData();
  };

  const handleDeleteFindOutMore = (id) => async (e) => {
    await axios.delete(`${delete_footer_find_out_more}?id=${id}`,{
      headers: { token: Cookies.get("token") },
    }).then(response => {
      getFooterDisclaimerData();
      if (response) {
        toast.success(response.data.message, toastOptions);
      }
    }).catch(function (error) {
      if (error) {
        if (error.response.data.success == false) {
          toast.error(error.response.data.message, toastOptions);
        }
      }
    });
  };


  const findOutMoreData = [
    {
      name: "S.No.",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "title",
      selector: (row) => row.title,
      sortable: true,
    },   {
      name: "path",
      selector: (row) => row.path,
      sortable: true,
    },
    {
      name: "Status",
      selector: row => row.isActive ? "Activate" : "In-Activate",
      sortable: true
    },
    {
      name: "Is-Active",
      cell: row => <label className="switch">
        <input type="checkbox" onChange={handleFindOutMore(row.id, row.isActive)} checked={row.isActive} />
        <span className="slider"></span>
      </label>
    },
    {
      name: "Action",
      cell: row => <div>
        <OverlayTrigger placement="bottom" overlay={<Tooltip id="button-tooltip-2">Delete</Tooltip>}>
        <Button style={{ backgroundColor: "transparent", border: "none" }} onClick={handleDeleteFindOutMore(row.id)}>
          <BsFillTrashFill style={{ fontSize: "20px", color: "blue" }} />
        </Button>
        </OverlayTrigger>
      </div>
    }
  ];

  useEffect(() => {
    let result = findOutMore.filter((elem) => {
      // let filterVal = elem.social_media_name.toLowerCase();
      let searchVal = search.toLocaleLowerCase();
      return filterVal.match(searchVal);
    });
    setFilteredFindOutMore(result);
  }, [searchFindOutMore]);

  useEffect(() => {
    let result = footerDisclaimer.filter((elem) => {
      let filterVal = elem.partnerName.toLowerCase();
      let searchVal = search.toLocaleLowerCase();
      return filterVal.match(searchVal);
    });
    setFilteredDisclaimer(result);
  }, [searchDisclaimer]);
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
              actions={
                <Link to="/footer/contact-us">
                  <button
                    data-toggle="modal"
                    data-target="#myModal"
                    className="btn btn-sm btn-success"
                  >
                    ADD+
                  </button>
                </Link>
              }
              subHeaderAlign="right"
            />
          </Accordion.Body>
        </Accordion.Item>
        <br/>
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
              actions={
                <Link to="/footer/social-media-link">
                  <button
                    data-toggle="modal"
                    data-target="#myModal"
                    className="btn btn-sm btn-success"
                  >
                    ADD+
                  </button>
                </Link>
              }
              subHeaderAlign="right"
            />
          </Accordion.Body>
        </Accordion.Item>
        <br/>
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
              actions={
                <Link to="/footer/payment-partners">
                  <button
                    data-toggle="modal"
                    data-target="#myModal"
                    className="btn btn-sm btn-success"
                  >
                    ADD+
                  </button>
                </Link>
              }
              subHeaderAlign="right"
            />
          </Accordion.Body>
        </Accordion.Item>
        <br/>
        <Accordion.Item eventKey="3" onClick={getFooterDisclaimerData}>
          <Accordion.Header>Disclaimer</Accordion.Header>
          <Accordion.Body>
            <DataTable
              title="Disclaimer"
              columns={DisclaimerData}
              data={filteredDisclaimer}
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
              actions={
                <Link to="/Footer/Disclaimer">
                  <button
                    data-toggle="modal"
                    data-target="#myModal"
                    className="btn btn-sm btn-success"
                  >
                    ADD+
                  </button>
                </Link>
              }
              subHeaderAlign="right"
            />
            {modalShow ? (
              <Modal
                show={modalShow}
                aria-labelledby="contained-modal-title-vcenter"
                centered
              >
                <Modal.Header>
                  <Modal.Title id="contained-modal-title-vcenter">
                    Quote
                  </Modal.Title>
                  <Button
                    style={{ backgroundColor: "transparent", border: "none" }}
                    onClick={() => setModalShow(!modalShow)}
                  >
                    <BsX style={{ fontSize: "35px", color: "black" }} />
                  </Button>
                </Modal.Header>
                <Modal.Body>
                  <div dangerouslySetInnerHTML={{ __html: modalInfo }} />
                </Modal.Body>
              </Modal>
            ) : (
              ""
            )}
          </Accordion.Body>
        </Accordion.Item>
        <br/>
        <Accordion.Item eventKey="4" onClick={getFindOutMore}>
          <Accordion.Header>Find Out More</Accordion.Header>
          <Accordion.Body>
            <DataTable
              title="Find Out More"
              columns={findOutMoreData}
              data={filteredFindOutMore}
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
              actions={
                <Link to="/footer/find-out-more">
                  <button
                    data-toggle="modal"
                    data-target="#myModal"
                    className="btn btn-sm btn-success"
                  >
                    ADD+
                  </button>
                </Link>
              }
              subHeaderAlign="right"
            />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <ToastContainer />
    </>
  );
};

export default Footer;
