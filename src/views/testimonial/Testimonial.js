import React, { useEffect, useState } from "react";
import "../../assets/libs/simple-datatables/style.css";
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import DataTable from "react-data-table-component";
import axios from "axios";
import { get_testimonial_route, change_testimonial_status_route } from "../../utils/APIRoutes";
import "../../assets/css/banner-toggle-btn.css";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
const Banners = () => {

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
      let response = await axios.get(get_testimonial_route, { headers: { token: Cookies.get("token") } });
      if (response.data.data.success == false) {
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
    let response = await axios.post(`${change_testimonial_status_route}?id=${id}&isActive=${active}`);
    console.log(response);
    getData();
  };

  const columns = [
    {
      name: "S.No.",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Image",
      selector: row => <img src={row.image} width={40} alt='Banner' />,
      sortable: true,
    },
    {
      name: "Amount",
      selector: row => row.amount,
      sortable: true
    },
    {
      name: "Type",
      selector: row => row.type,
      sortable: true
    },
    {
      name: "Quote",
      selector: row => <div><Button variant="primary" onClick={() => { setModalInfo(row.quote); setModalShow(!modalShow) }}>Show</Button>
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
        title="Testimonial List"
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
        actions={<Link to="/add-testimonial"><button data-toggle="modal" data-target="#myModal" className="btn btn-sm btn-success">ADD+</button></Link>}
        subHeaderAlign="right"
      />
      {
        modalShow ? <Modal show={modalShow} aria-labelledby="contained-modal-title-vcenter" centered>
          <Modal.Header><Modal.Title id="contained-modal-title-vcenter">Quote</Modal.Title><Button onClick={() => setModalShow(!modalShow)}>Close</Button></Modal.Header>
          <Modal.Body><div>{modalInfo}</div></Modal.Body>
        </Modal> : ""}
    </div>
  )
}

export default Banners;