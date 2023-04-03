import React, { useEffect, useState } from "react";
import "../../assets/libs/simple-datatables/style.css";
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import DataTable from "react-data-table-component";
import axios from "axios";
import { get_banner_route, change_banner_status_route } from "../../utils/APIRoutes";
import "../../assets/css/banner-toggle-btn.css";
import { ToastContainer, toast } from 'react-toastify';
import { BsFillTrashFill, BsPencilSquare } from 'react-icons/bs';

const Banners = () => {
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

  const getData = async () => {
    try {
      await axios.get(get_banner_route, { headers: { token: Cookies.get("token") } })
        .then(response => {
          if (response) {
            setData(response.data.data);
            setFilteredData(response.data.data);
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
    let response = await axios.post(`${change_banner_status_route}?id=${id}&isActive=${active}`);
    console.log(response);
    getData();
  }

  const columns = [
    {
      name: "S.No.",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Banner",
      selector: row => <img src={row.image} width={40} alt='Banner' />,
      sortable: true,
    },
    {
      name: "Type",
      selector: row => row.type,
      sortable: true
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
        <BsPencilSquare style={{fontSize: "20px", margin:"5px"}} />
        <BsFillTrashFill style={{fontSize: "20px"}} />
      </div>
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
        actions={<Link to="/add-banners"><button data-toggle="modal" data-target="#myModal" className="btn btn-sm btn-success">ADD+</button></Link>}
      />
      <ToastContainer />
    </div>
  )
}

export default Banners;