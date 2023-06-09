import React, { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import DataTable from "react-data-table-component";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import {
  get_home_logo_route,
  delete_home_logo_route,
  change_logo_status_route,
} from "../../../utils/APIRoutes";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Button from "react-bootstrap/Button";
import { BsEyeFill, BsPencilSquare, BsFillTrashFill } from "react-icons/bs";
import Swal from "sweetalert2";
import AddLogo from "./add";
import "../../../assets/css/banner-toggle-btn.css";

const HomeLogo = () => {
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
  const [logo, setLogo] = useState([]);

  const getLogo = async () => {
    await axios
      .get(get_home_logo_route, {
        headers: { token: Cookies.get("token") },
      })
      .then((response) => {
        setLogo(response.data.data);
      })
      .catch(function (error) {
        if (error.response.data.token.isExpired == true) {
          setTimeout(() => {
            Cookies.remove("token", "user");
            navigate("/");
          }, 3000);
          toast.error(error.response.data.token.message, toastOptions);
        }
      });
  };

  useEffect(() => {
    getLogo();
  }, []);

  const handleDelete = (id) => async (e) => {
    const del = async () => {
      await axios
        .delete(`${delete_home_logo_route}?id=${id}`, {
          headers: { token: Cookies.get("token") },
        })
        .then((response) => {
          getLogo();
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
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "delete!",
        cancelButtonText: "cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          del();
          swalWithBootstrapButtons.fire(
            "Deleted!",
            "Your file has been deleted.",
            "success"
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your imaginary file is safe :)",
            "error"
          );
        }
      });
  };

  const handleChange = (id, active) => async (e) => {
    active = !active;
    let response = await axios.post(
      `${change_logo_status_route}?id=${id}&isActive=${active}`,
      {},
      { headers: { token: Cookies.get("token") } }
    );
    getLogo();
  };

  const logoColumns = [
    {
      name: "S.No.",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Logo",
      selector: (row) => <img src={row.logo} />,
      sortable: true,
    },
    {
      name: "Url",
      selector: (row) => row.url,
      sortable: true,
    },
    {
      name: "Status",
      selector: row => row.isActive ? "Activate" : "In-Activate",
      sortable: true
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

  return (
    <div className="container">
      <DataTable
        title="Logo"
        columns={logoColumns}
        data={logo}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="450px"
        selectableRowsHighlight
        highlightOnHover
        subHeader
        actions={
          <Link to="/home/add-logo">
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
    </div>
  );
};

export default HomeLogo;
