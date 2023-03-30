import React, { useEffect, useState } from "react";
import "../../assets/libs/simple-datatables/style.css";
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import DataTable from "react-data-table-component";
import axios from "axios";
import { get_faq_route, change_faq_status_route } from "../../utils/APIRoutes";
import "../../assets/css/banner-toggle-btn.css";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const AllFaq = () => {

  const navigate = useNavigate();
  useEffect(() => { myFunction() }, []);
  const myFunction = async () => {
    const token = Cookies.get('token');
    if (!token) {
      navigate("/");
    };
  };

  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [modalInfo, setModalInfo] = useState("");
  const [modalShow, setModalShow] = useState(false);

  const getData = async () => {
    try {
      let response = await axios.get(get_faq_route, { headers: { token: Cookies.get("token") } });
      if (response.data.success == false) {
        Cookies.remove("token", "user");
      };
      setData(response.data.data);
      setFilteredData(response.data.data);
    } catch (err) {
      console.log(err);
    };
  };


  const handleChange = (id, active) => async (e) => {
    active = !active;
    let response = await axios.post(`${change_faq_status_route}?id=${id}&isActive=${active}`);
    console.log(response);
    getData();
  };

  const columns = [
    {
      name: "S.No.",
      selector: (row, index) => index + 1,
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
      selector: row => <div><Button variant="primary" onClick={() => { setModalInfo(row.answer); setModalShow(!modalShow) }}>Show</Button>
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
  }, []);

  useEffect(() => {
    let result = data.filter(elem => {
      let filterVal = elem.type.toLowerCase();
      let searchVal = search.toLocaleLowerCase();
      return filterVal.match(searchVal);
    });
    setFilteredData(result);
  }, [search]);

  return (
    <div className="container">
      <DataTable
        title="All FAQ's"
        columns={columns}
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
        actions={<Link to="/add-faq"><button data-toggle="modal" data-target="#myModal" className="btn btn-sm btn-success">ADD+</button></Link>}
        subHeaderAlign="right"
      />
      {
        modalShow ? <Modal show={modalShow} aria-labelledby="contained-modal-title-vcenter" centered>
          <Modal.Header><Modal.Title id="contained-modal-title-vcenter">Answer</Modal.Title><Button onClick={() => setModalShow(!modalShow)}>Close</Button></Modal.Header>
          <Modal.Body><div>{modalInfo}</div></Modal.Body>
        </Modal> : ""}
    </div>
  )
}

export default AllFaq;