import React, { useEffect, useState } from "react";
import "../../../assets/libs/simple-datatables/style.css";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import DataTable from "react-data-table-component";
import axios from "axios";
import {
    get_how_to_play_carousel_route,
    edit_how_to_play_route,
} from "../../../utils/APIRoutes";
import "../../../assets/css/banner-toggle-btn.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import { BsEyeFill, BsX } from "react-icons/bs";

const HowToPlay = () => {
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

  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [modalInfo, setModalInfo] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [modalInfo1, setModalInfo1] = useState("");
  const [modalShow1, setModalShow1] = useState(false);

  const getData = async () => {
    try {
      await axios
        .get(`${get_how_to_play_carousel_route}?subType=carousel`, {
          headers: { token: Cookies.get("token") },
        })
        .then((response) => {
          if (response) {
            setData(response.data.data);
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

  const handleChange = (id, active) => async () => {
    active = !active;
    await axios.post(
      `${edit_how_to_play_route}?id=${id}&isActive=${active}`
    );
    getData();
  };

  const columns = [
    {
      name: "S.No.",
      selector: (row, index) => index + 1 + (pageNumber - 1) * 10,
      sortable: true,
    },
    {
      name: "Image",
      selector: (row) => <img src={row.image} width={40} alt="Banner" onClick={() => {
        setModalShow1(!modalShow1);
        setModalInfo1(row.image)
      }} />,
      sortable: true,
    },
    {
      name: "Order",
      selector: (row) => row.order,
      sortable: true,
    },
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "description",
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => (row.isActive ? "Activate" : "In-Activate"),
      sortable: true,
      maxWidth: "200px",
    },
    {
      name: "Is-Active",
      cell: (row) => (
        <label className="switch">
          <input
            type="checkbox"
            onChange={handleChange(row.id, row.isActive)}
            checked={row.isActive}
          />
          <span className="slider"></span>
        </label>
      ),
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    let result = data.filter((elem) => {
      let filterVal = elem.type.toLowerCase();
      let searchVal = search.toLocaleLowerCase();
      return filterVal.match(searchVal);
    });
    setFilteredData(result);
  }, [search]);



  const stepsColumns = [
    {
      name: "S.No.",
      selector: (row, index) => index + 1 + (pageNumber - 1) * 10,
      sortable: true,
    },
    {
      name: "Order",
      selector: (row) => row.order,
      sortable: true,
    },
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "description",
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => (row.isActive ? "Activate" : "In-Activate"),
      sortable: true,
      maxWidth: "200px",
    },
    {
      name: "Is-Active",
      cell: (row) => (
        <label className="switch">
          <input
            type="checkbox"
            onChange={handleStepsChange(row.id, row.isActive)}
            checked={row.isActive}
          />
          <span className="slider"></span>
        </label>
      ),
    },
  ];

  

  const [steps, setSteps] = useState([]);

  const getSteps = async () => {
    try {
      await axios
        .get(`${get_how_to_play_route}?subType=steps`, {
          headers: { token: Cookies.get("token") },
        })
        .then((response) => {
          if (response) {
            setSteps(response.data.data);
          }
        })
        .catch(function (error) {
          if (error) {
            console.log(error);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSteps();
  }, []);

  const handleStepsChange = (id, active) => async () => {
    active = !active;
    await axios.post(
      `${edit_how_to_play_route}?id=${id}&isActive=${active}`
    );
    getSteps();
  };

  return (
    <div className="container">
      <DataTable
        title="How To Play"
        columns={columns}
        data={filteredData}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="450px"
        selectableRowsHighlight
        highlightOnHover
        onChangePage={(value) => setPageNumber(value)}
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
          ((
            <>
            <Link to="/how-to-play/AddBanner">
              <button
                data-toggle="modal"
                data-target="#myModal"
                className="btn btn-sm btn-success"
              >
                ADD+
              </button>
            </Link>
          </>
          ))
        }
        
        subHeaderAlign="right"
      />
      {modalShow1 ? (
        <Modal
          show={modalShow1}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
              Image
            </Modal.Title>
            <Button
              style={{ backgroundColor: "transparent", border: "none" }}
              onClick={() => setModalShow1(!modalShow1)}
            >
              <BsX style={{ fontSize: "35px", color: "black" }} />
            </Button>
          </Modal.Header>
          <Modal.Body style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
            <img src={modalInfo1} height={300} width={500} />
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}
      {modalShow ? (
        <Modal
          show={modalShow}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">Quote</Modal.Title>
            <Button
              style={{ backgroundColor: "transparent", border: "none" }}
              onClick={() => setModalShow(!modalShow)}
            >
              <BsX style={{ fontSize: "35px", color: "black" }} />
            </Button>
          </Modal.Header>
          <Modal.Body>
            <div>{modalInfo}</div>
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}
      <ToastContainer />
    </div>
  );
};

export default HowToPlay;
