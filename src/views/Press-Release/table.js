import React, { useEffect, useState } from "react";
import "../../assets/libs/simple-datatables/style.css";
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import DataTable from "react-data-table-component";
import axios from "axios";
import { get_press_release_route,update_press_release_route,delete_press_release_route } from "../../utils/APIRoutes";
import "../../assets/css/banner-toggle-btn.css";
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';
import Modal from 'react-bootstrap/Modal';
import { BsEyeFill, BsX, BsFillTrashFill } from 'react-icons/bs';
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const HomeFaq = () => {

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

  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [modalInfo, setModalInfo] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalImage,setTotalImage]=useState();
  const [perPage,setPerPage]=useState(10);
  const [modalInfo1, setModalInfo1] = useState("");
  const [modalShow1, setModalShow1] = useState(false);

  const getData = async () => {
    try {
      await axios.get(`${get_press_release_route}?page=${pageNumber-1}&size=${perPage}`, { headers: { token: Cookies.get("token") } })
      .then(response => {
        if (response) {
          console.log("datat",response.data.data.rows);
          setData(response.data.data.rows);
            setTotalImage(response.data.data.totalItems);
            setFilteredData(response.data.data.rows);
        }

      }).catch(function (error) {
        if (error) {
          if(error.response.data.token.isExpired == true){
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


  const handleChange = (id, active) => async (e) => {
    active = !active;
    let response = await axios.post(`${update_press_release_route}?id=${id}&isActive=${active}`,{},{ headers: { token: Cookies.get("token") } });
    getData();
  };

  const handleDelete = (id) => async (e) => {
    await axios
      .delete(`${delete_press_release_route}?id=${id}`, {
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
      selector: (row, index) => ((pageNumber-1)*perPage)+index+1,
      sortable: true
    },
    {
      name: "Image",
      selector: row => <img src={row.image} width={40} alt="Banner" onClick={() => {
        setModalShow1(!modalShow1);
        setModalInfo1(row.image)
      }} />,
      sortable: true,
      maxWidth: "200px",
    },
    {
      name: "Title",
      selector: row => <div><Button variant="primary" style={{ backgroundColor: "transparent", border: "none" }} onClick={() => { setModalInfo(row.title); setModalShow(!modalShow) }}><BsEyeFill style={{ color: "blue" }} /></Button>
      </div>
    },
    {
      name: "Description",
      selector: row => <div><Button variant="primary" style={{ backgroundColor: "transparent", border: "none" }} onClick={() => { setModalInfo(row.description); setModalShow(!modalShow) }}><BsEyeFill style={{ color: "blue" }} /></Button>
      </div>
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
    },{
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

  useEffect(() => {
    getData();
  }, [pageNumber,perPage]);

  useEffect(() => {
    let result = data.filter(elem => {
      let filterVal = elem.type.toLowerCase();
      let searchVal = search.toLocaleLowerCase();
      return filterVal.match(searchVal);
    });
    setFilteredData(result);
  }, [search]);

  const handlePageChange=async(newPerPage,page)=>{
    setPerPage(newPerPage);
  };

  return (
    <div className="container">
      <DataTable
        title="Press Release"
        columns={columns}
        data={filteredData}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="450px"
        selectableRowsHighlight
        highlightOnHover
        paginationServer
        paginationTotalRows={totalImage}
        paginationPerPage={perPage}
        onChangeRowsPerPage={handlePageChange}
        onChangePage={(value) => {setPageNumber(value)}}
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
        actions={<Link to="/press-release/Add"><button data-toggle="modal" data-target="#myModal" className="btn btn-sm btn-success">ADD+</button></Link>}
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
            <img src={modalInfo1} height={400} width={400} />
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}
      {
        modalShow ? <Modal show={modalShow} aria-labelledby="contained-modal-title-vcenter" centered>
          <Modal.Header><Modal.Title id="contained-modal-title-vcenter">Answer</Modal.Title><Button style={{ backgroundColor: "transparent", border: "none" }} onClick={() => setModalShow(!modalShow)}><BsX style={{fontSize:"35px", color:'black'}} /></Button></Modal.Header>
          <Modal.Body><div className="content-only" dangerouslySetInnerHTML={{ __html: modalInfo }} /></Modal.Body>
        </Modal> : ""}
        <ToastContainer />
    </div>
  )
}

export default HomeFaq;