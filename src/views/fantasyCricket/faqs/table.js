import React, { useEffect, useState } from "react";
import "../../../assets/libs/simple-datatables/style.css";
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import DataTable from "react-data-table-component";
import axios from "axios";
import { get_faq_route, change_faq_status_route } from "../../../utils/APIRoutes";
import "../../../assets/css/banner-toggle-btn.css";
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';
import Modal from 'react-bootstrap/Modal';
import { BsEyeFill, BsX } from 'react-icons/bs';

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

  const getData = async () => {
    try {
      await axios.get(`${get_faq_route}?page=${pageNumber-1}&size=${perPage}&type=fantasyCricketLeague`, { headers: { token: Cookies.get("token") } })
      .then(response => {
        if (response) {
          setData(response.data.data.result);
            setTotalImage(response.data.data.totalItems);
            setFilteredData(response.data.data.result);
        }

      }).catch(function (error) {
        if (error) {
          console.log(error);
        }
      });
    } catch (err) {
      console.log(err);
    };
  };


  const handleChange = (id, active) => async (e) => {
    active = !active;
    let response = await axios.post(`${change_faq_status_route}?id=${id}&isActive=${active}`);
    getData();
  };

  const columns = [
    {
      name: "S.No.",
      selector: (row, index) => ((pageNumber-1)*perPage)+index+1,
      sortable: true
    },
    {
      name: "FAQ",
      selector: row => <div className="text-wrap">{row.ques}</div>,
      sortable: true,
      maxWidth: "200px",
    },
    {
      name: "Type",
      selector: row => row.type,
      sortable: true,
      maxWidth: "200px",
    },
    {
      name: "Sub Type",
      selector: row => row.subType ? row.subType : "N/A",
      sortable: true,
      maxWidth: "200px",
    },
    {
      name: "Answer",
      selector: row => <div><Button variant="primary" style={{ backgroundColor: "transparent", border: "none" }} onClick={() => { setModalInfo(row.answer); setModalShow(!modalShow) }}><BsEyeFill style={{ color: "blue" }} /></Button>
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
        title="Fantasy Crikcet League FAQ'S"
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
        actions={<Link to="/fantasy-cricket/faqs"><button data-toggle="modal" data-target="#myModal" className="btn btn-sm btn-success">ADD+</button></Link>}
        subHeaderAlign="right"
      />
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