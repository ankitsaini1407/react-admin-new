import React, { useEffect, useState } from "react";
import "../../../assets/libs/simple-datatables/style.css";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import DataTable from "react-data-table-component";
import axios from "axios";
import {
  get_how_to_play_content_route,
  delete_how_to_play_content_route,
  update_how_to_play_content_status_route,
  get_how_to_play_table_route,
  update_how_to_play_table_status_route,
  delete_how_to_play_table_route,
  get_how_to_play_steps_route,
  get_how_to_play_Trophy_route,
  update_how_to_play_steps_route,
  delete_how_to_play_setsps_route
} from "../../../utils/APIRoutes";
import "../../../assets/css/banner-toggle-btn.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import {
  BsEyeFill,
  BsPencilSquare,
  BsX,
  BsFillTrashFill,
} from "react-icons/bs";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
// import { BsEyeFill, BsPencilSquare, BsFillTrashFill } from "react-icons/bs";

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
  
  const [pageNumber1, setPageNumber1] = useState(1);
  const [pageNumber2, setPageNumber2] = useState(1);
  const [pageNumber3, setPageNumber3] = useState(1);
  const [totalImage, setTotalImage] = useState();
  const [perPage, setPerPage] = useState(10);
  const [modalInfo, setModalInfo] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [modalInfo1, setModalInfo1] = useState("");
  const [modalShow1, setModalShow1] = useState(false);
  const [modalInfo2, setModalInfo2] = useState("");
  const [modalShow2, setModalShow2] = useState(false);
  const [modalInfo3, setModalInfo3] = useState("");
  const [modalShow3, setModalShow3] = useState(false);

  const getData = async () => {
    try {
      await axios
        .get(`${get_how_to_play_content_route}`, {
          headers: { token: Cookies.get("token") },
        })
        .then((response) => {
          if (response) {
            console.log(response.data.data.rows);
            setData(response.data.data.rows);
            setFilteredData(response.data.data.rows);
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

  const handleChange = (id, active) => async () => {
    active = !active;
    await axios.post(
      `${update_how_to_play_content_status_route}?id=${id}&isActive=${active}`,
      {},
      { headers: { token: Cookies.get("token") } }
    );
    getData();
  };
  const handleSlug = (slug, description) => async () => {
    navigate(`/how-to-play/cms/${slug}`, {
      state: { description: description },
    });
  };

  const handleEdit = (id, type, subType, title, description) => async () => {
    console.log(id, type, title, description);
    navigate(`/how-to-play/cms/edit/${id}`, {
      state: {
        id: id,
        type: type,
        subType: subType,
        title: title,
        description: description,
      },
    });
  };

  const handleDelete = (id) => async (e) => {
    await axios
      .delete(`${delete_how_to_play_content_route}?id=${id}`, {
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
      selector: (row, index) => (pageNumber1 - 1) * perPage + index + 1,
      sortable: true,
    },
    {
      name: "Type",
      selector: (row) => row.type,
      sortable: true,
    },
    {
      name: "Sub-Type",
      selector: (row) => row.subType,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => (
        <div>
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip id="button-tooltip-2">View</Tooltip>}
          >
            <Button style={{ backgroundColor: "transparent", border: "none" }}>
              <BsEyeFill
                style={{ color: "blue" }}
                onClick={handleSlug(row.slug, row.description)}
              />
            </Button>
          </OverlayTrigger>
        </div>
      ),
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
    {
      name: "Action",
      cell: (row) => (
        <div>
          {/* edit_how_to_play_content_route */}
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip id="button-tooltip-2">Edit</Tooltip>}
          >
            <Button
              style={{ backgroundColor: "transparent", border: "none" }}
              onClick={handleEdit(
                row.id,
                row.type,
                row.subType,
                row.title,
                row.description
              )}
            >
              <BsPencilSquare
                style={{ fontSize: "20px", margin: "5px", color: "blue" }}
              />
            </Button>
          </OverlayTrigger>

          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip id="button-tooltip-2">Delete</Tooltip>}
          >
            <Button
              style={{ backgroundColor: "transparent", border: "none" }}
              onClick={handleDelete(row.id)}
            >
              <BsFillTrashFill style={{ fontSize: "20px", color: "blue" }} />
            </Button>
          </OverlayTrigger>
        </div>
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

  const tableColumns = [
    {
      name: "S.No.",
      selector: (row, index) => index + 1 + (pageNumber2 - 1) * 10,
      sortable: true,
    },
    {
      name: "Player type",
      selector: (row) => row.playerType,
      sortable: true,
    },
    {
      name: "Min",
      selector: (row) => row.min,
      sortable: true,
    },
    {
      name: "Max",
      selector: (row) => row.max,
      sortable: true,
    },
    {
      name: "Type",
      selector: (row) => row.type,
      sortable: true,
    },
    {
      name: "Sub Type",
      selector: (row) => row.subType,
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
            onChange={handleStatusChange(row.id, row.isActive)}
            checked={row.isActive}
          />
          <span className="slider"></span>
        </label>
      ),
    },
    {
      name: "Action",
      cell: (row) => (
        <div>
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip id="button-tooltip-2">Delete</Tooltip>}
          >
            <Button
              style={{ backgroundColor: "transparent", border: "none" }}
              onClick={handleTableDelete(row.id)}
            >
              <BsFillTrashFill style={{ fontSize: "20px", color: "blue" }} />
            </Button>
          </OverlayTrigger>
        </div>
      ),
    },
  ];
  const stepsColumns = [
    {
      name: "S.No.",
      selector: (row, index) => index + 1 + (pageNumber3 - 1) * 10,
      sortable: true,
    },
    {
      name: "Image",
      selector: (row) => <img src={row.image} width={40} alt="steps"  onClick={() => {
        setModalShow(!modalShow);
        setModalInfo(row.image)

      }} />,
      sortable: true,
    },
    {
      name: "vrline",
      selector: (row) => (
        <img src={row.vrline} width={10} height={30} alt="player logo"  onClick={() => {
          setModalShow1(!modalShow1);
          setModalInfo1(row.vrline)
  
        }}/>
      ),
      sortable: true,
    },
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => (
        <div>
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip id="button-tooltip-2">View</Tooltip>}
          >
            <Button style={{ backgroundColor: "transparent", border: "none" }}>
              <BsEyeFill
                style={{ color: "blue" }}
                onClick={handleSlug(row.slug, row.description)}
              />
            </Button>
          </OverlayTrigger>
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
      name: "Sub Type",
      selector: (row) => row.subType,
      sortable: true,
    },
    {
      name: "Is-Active",
      cell: (row) => (
        <label className="switch">
          <input
            type="checkbox"
            onChange={handleStepsStatus(row.id, row.isActive)}
            checked={row.isActive}
          />
          <span className="slider"></span>
        </label>
      ),
    },
    {
      name: "Action",
      cell: (row) => (
        <div>
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip id="button-tooltip-2">Delete</Tooltip>}
          >
            <Button
              style={{ backgroundColor: "transparent", border: "none" }}
              onClick={handleStepsDelete(row.id)}
            >
              <BsFillTrashFill style={{ fontSize: "20px", color: "blue" }} />
            </Button>
          </OverlayTrigger>
        </div>
      ),
    },
  ];

  const trophyColumns = [
    {
      name: "S.No.",
      selector: (row, index) => index + 1 + (pageNumber3 - 1) * 10,
      sortable: true,
    },
    {
      name: "Trophy",
      selector: (row) => <img src={row.winTrophy} width={40} alt="steps"  onClick={() => {
        setModalShow2(!modalShow2);
        setModalInfo2(row.winTrophy)

      }} />,
      sortable: true,
    },
    {
      name: "Transfer Money ",
      selector: (row) => (
        <img src={row.transfermoney} width={50} height={50} alt="player logo"  onClick={() => {
          setModalShow3(!modalShow3);
          setModalInfo3(row.transfermoney)
  
        }}/>
      ),
      sortable: true,
    },
    {
      name: "verify",
      selector: (row) => row.verify,
      sortable: true,
    },
    {
      name: "Title",
      selector: (row) => (
        <div>
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip id="button-tooltip-2">View</Tooltip>}
          >
            <Button style={{ backgroundColor: "transparent", border: "none" }}>
              <BsEyeFill
                style={{ color: "blue" }}
                onClick={handleSlug(row.slug, row.title)}
              />
            </Button>
          </OverlayTrigger>
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
      name: "Sub Type",
      selector: (row) => row.subType,
      sortable: true,
    },
    {
      name: "Is-Active",
      cell: (row) => (
        <label className="switch">
          <input
            type="checkbox"
            onChange={handleStatusChange(row.id, row.isActive)}
            checked={row.isActive}
          />
          <span className="slider"></span>
        </label>
      ),
    },
    {
      name: "Action",
      cell: (row) => (
        <div>
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip id="button-tooltip-2">Delete</Tooltip>}
          >
            <Button
              style={{ backgroundColor: "transparent", border: "none" }}
              onClick={handleTableDelete(row.id)}
            >
              <BsFillTrashFill style={{ fontSize: "20px", color: "blue" }} />
            </Button>
          </OverlayTrigger>
        </div>
      ),
    },
  ];

  const [tables, setTables] = useState([]);
  const [steps, setSteps] = useState([]);
  const [trophy,setTrophy]=useState([])

  const getTables = async () => {
    try {
      await axios
        .get(`${get_how_to_play_table_route}`, {
          headers: { token: Cookies.get("token") },
        })
        .then((response) => {
          if (response) {
            console.log("tables", response.data.data.rows);
            setTables(response.data.data.rows);
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
  const getSteps = async () => {
    try {
      await axios
        .get(
          `${get_how_to_play_steps_route}?page=${
            pageNumber3 - 1
          }&size=${perPage}`,
          {
            headers: { token: Cookies.get("token") },
          }
        )
        .then((response) => {
          if (response) {
            // console.log("steps",response.data.data.rows)
            setSteps(response.data.data.rows);
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
  const getTrophy = async () => {
    try {
      await axios
        .get(
          `${get_how_to_play_Trophy_route}`,
          {
            headers: { token: Cookies.get("token") },
          }
        )
        .then((response) => {
          if (response) {
            // console.log("steps",response.data.data.rows)
            setTrophy(response.data.data.rows);
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
    getTables();
    getSteps();
    getTrophy();
  }, []);

  const handleStatusChange = (id, active) => async () => {
    active = !active;
    await axios.post(
      `${update_how_to_play_table_status_route}?id=${id}&isActive=${active}`,
      {},
      {
        headers: { token: Cookies.get("token") },
      }
    );
    getTables();
  };

  const handleStepsStatus = (id, active) => async () => {
    active = !active;
    await axios.post(
      `${update_how_to_play_steps_route}?id=${id}&isActive=${active}`,
      {},
      {
        headers: { token: Cookies.get("token") },
      }
    );
    getSteps();
  };



  const handleTableDelete = (id) => async (e) => {
    await axios
      .delete(`${delete_how_to_play_table_route}?id=${id}`, {
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

  const handleStepsDelete = (id) => async (e) => {
    await axios
      .delete(`${delete_how_to_play_setsps_route}?id=${id}`, {
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

  return (
    <div className="container">
      <DataTable
        title="How To Play Content"
        columns={columns}
        data={filteredData}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="450px"
        selectableRowsHighlight
        highlightOnHover
        onChangePage={(value) => setPageNumber1(value)}
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
          <>
            <Link to="/how-to-play/cms">
              <button
                data-toggle="modal"
                data-target="#myModal"
                className="btn btn-sm btn-success"
              >
                ADD+
              </button>
            </Link>
          </>
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

      <DataTable
        title="Table Info."
        columns={tableColumns}
        data={tables}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="450px"
        selectableRowsHighlight
        highlightOnHover
        onChangePage={(value) => setPageNumber2(value)}
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
          <>
            <Link to="/how-to-play/table">
              <button
                data-toggle="modal"
                data-target="#myModal"
                className="btn btn-sm btn-success"
              >
                ADD Steps+
              </button>
            </Link>
          </>
        }
        subHeaderAlign="right"
      />
      <DataTable
        title="How To Play Steps"
        columns={stepsColumns}
        data={steps}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="450px"
        selectableRowsHighlight
        highlightOnHover
        onChangePage={(value) => setPageNumber3(value)}
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
          <>
            <Link to="/how-to-play/steps">
              <button
                data-toggle="modal"
                data-target="#myModal"
                className="btn btn-sm btn-success"
              >
                ADD Steps+
              </button>
            </Link>
          </>
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
              Image
            </Modal.Title>
            <Button
              style={{ backgroundColor: "transparent", border: "none" }}
              onClick={() => setModalShow(!modalShow)}
            >
              <BsX style={{ fontSize: "35px", color: "black" }} />
            </Button>
          </Modal.Header>
          <Modal.Body style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
            <img src={modalInfo} height={500} width={400} />
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}
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
            <img src={modalInfo1} height={300} width={10} />
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}

<DataTable
        title="Winner Trophy Section"
        columns={trophyColumns}
        data={trophy}
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
          <>
            <Link to="/how-to-play/trophy">
              <button
                data-toggle="modal"
                data-target="#myModal"
                className="btn btn-sm btn-success"
              >
                ADD Steps+
              </button>
            </Link>
          </>
        }
        subHeaderAlign="right"
      />
        {modalShow2 ? (
        <Modal
          show={modalShow2}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
              Image
            </Modal.Title>
            <Button
              style={{ backgroundColor: "transparent", border: "none" }}
              onClick={() => setModalShow2(!modalShow2)}
            >
              <BsX style={{ fontSize: "35px", color: "black" }} />
            </Button>
          </Modal.Header>
          <Modal.Body style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
            <img src={modalInfo2} height={500} width={400} />
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}
       {modalShow3 ? (
        <Modal
          show={modalShow3}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
              Image
            </Modal.Title>
            <Button
              style={{ backgroundColor: "transparent", border: "none" }}
              onClick={() => setModalShow3(!modalShow3)}
            >
              <BsX style={{ fontSize: "35px", color: "black" }} />
            </Button>
          </Modal.Header>
          <Modal.Body style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
            <img src={modalInfo3} height={200} width={300} />
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
