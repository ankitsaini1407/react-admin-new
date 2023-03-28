import React, { useEffect, useState } from "react";
import "../../assets/libs/simple-datatables/style.css";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import DataTable from "react-data-table-component";
import axios from "axios";
import { get_testimonial_route } from "../../utils/APIRoutes";
import "../../assets/css/banner-toggle-btn.css";
const Banners = () => {

  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const getData = async () => {
    try {
      let response = await axios.get(get_testimonial_route);
      console.log(response);
      setData(response.data.data);
      setFilteredData(response.data.data);
    } catch (err) {
      console.log(err);
    };
  };
  const navigate = useNavigate();

  useEffect(() => { myFunction() }, []);
  const myFunction = async () => {
    const token = Cookies.get('token');
    if (!token) {
      navigate("/");
    };
  };

  const columns = [
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
      selector: row => row.quote,
      sortable: true
    },
    {
      name: "Is-Active",
      cell: row => row.isActive === false? <label className="switch">
        <input type="checkbox" />
        <span className="slider"></span>
      </label>:<label className="switch">
        <input type="checkbox" checked />
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
        title="Banners List"
        columns={columns}
        data={filteredData}
        pagination
        selectableRows
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
        subHeaderAlign="right"
        actions={<button data-toggle="modal" data-target="#myModal" className="btn btn-sm btn-success">ADD+</button>}
      />
    </div>
  )
}

export default Banners;