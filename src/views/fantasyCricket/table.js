import React, { useEffect, useState } from "react";
import "../../assets/libs/simple-datatables/style.css";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import DataTable from "react-data-table-component";
import axios from "axios";
import {
  get_Fantasy_Cricket_route,
  update_Fantasy_Cricket_status_route,
  delete_Fantasy_Cricket_route
} from "../../utils/APIRoutes";
import "../../assets/css/banner-toggle-btn.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import {
  BsEyeFill,
  BsPencilSquare,
  BsX,
  BsFillTrashFill,
} from "react-icons/bs";

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
  const [perPage, setPerPage] = useState(10);

  const getData = async () => {
    try {
      await axios
        .get(`${get_Fantasy_Cricket_route}`, {
          headers: { token: Cookies.get("token") },
        })
        .then((response) => {
          if (response) {
            console.log("response",response.data.data.rows)
            setData(response.data.data.rows);
            setFilteredData(response.data.data.rows);
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
      `${update_Fantasy_Cricket_status_route}?id=${id}&isActive=${active}`,{},{
        headers: { token: Cookies.get("token") },
      }
    );
    getData();
  };

  

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

  const handleSlug = (slug, description) => async () => {
    navigate(`/fantasy-cricket/cms/${slug}`, {
      state: { description: description },
    });
  };

  const handleEdit = (id,description) => async () => {
console.log("table",description)
    navigate(`/fantasy-cricket/cms/edit/${id}`, { state: { id: id,  description: description } })
  };

  const handleDelete = (id) => async (e) => {
    await axios
      .delete(`${delete_Fantasy_Cricket_route}?id=${id}`, {
        headers: { token: Cookies.get("token") },
      })
      .then((response) => {
        getData();
        if (response) {
          toast.success(response.data.message, toastOptions);
        }
      })
      .catch(function (error) {
        if (error) {
          if (error.response.data.success == false) {
            toast.error(error.response.data.message, toastOptions);
          }
        }
      });
  };

  const columns = [
    {
      name: "S.No.",
      selector: (row, index) => ((pageNumber - 1) * perPage) + index + 1,
      sortable: true
    },
    {
      name: "Type",
      selector: row => row.type,
      sortable: true
    },
    {
      name: "Description",
      selector: row => <div>
        <OverlayTrigger placement="bottom" overlay={<Tooltip id="button-tooltip-2">View</Tooltip>}>
        <Button style={{ backgroundColor: "transparent", border: "none" }}>
          <BsEyeFill style={{ color: "blue" }} onClick={handleSlug(row.slug, row.description)} />
        </Button>
        </OverlayTrigger>
      </div>,
      sortable: true
    },
    {
      name: "Status",
      selector: row => row.isActive ? "Activate" : "In-Activate",
      sortable: true,
      maxWidth: "200px",
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
        <OverlayTrigger placement="bottom" overlay={<Tooltip id="button-tooltip-2">Edit</Tooltip>}>
          <Button style={{ backgroundColor: "transparent", border: "none" }} onClick={handleEdit(row.id,  row.description)}>
            <BsPencilSquare style={{ fontSize: "20px", margin: "5px", color: "blue" }} />
          </Button>
        </OverlayTrigger>

        <OverlayTrigger placement="bottom" overlay={<Tooltip id="button-tooltip-2">Delete</Tooltip>}>
        <Button style={{ backgroundColor: "transparent", border: "none" }} onClick={handleDelete(row.id)}>
          <BsFillTrashFill style={{ fontSize: "20px", color: "blue" }} />
        </Button>
        </OverlayTrigger>
      </div>
    }
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
        title="Fantasy Sports Content"
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
            <Link to="/fantasy-cricket/add">
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
