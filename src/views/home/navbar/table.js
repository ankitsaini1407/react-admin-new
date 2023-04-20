import React, { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import DataTable from "react-data-table-component";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { get_home_navbar_route, delete_home_navbar_route  } from "../../../utils/APIRoutes";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Button from "react-bootstrap/Button";
import { BsEyeFill, BsPencilSquare, BsFillTrashFill } from "react-icons/bs";
import Swal from "sweetalert2";
import AddLogo from "./add";
import "../../../assets/css/banner-toggle-btn.css";

const Navbar = () => {
  const [navbar, setNavbar] = useState([]);

  const getLogo = async () => {
    await axios
      .get(get_home_navbar_route, {
        headers: { token: Cookies.get("token") },
      })
      .then((response) => {
        setNavbar(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getLogo();
  }, []);

  const handleDelete = (id) => async (e) => {
    const del = async () => {
      await axios
        .delete(`${delete_home_navbar_route }?id=${id}`, {
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
    let response =  await axios
    .post(`${change_logo_status_route}?id=${id}&isActive=${active}`,{},{headers:{token:Cookies.get("token")}});
    getLogo();
  };

  const navbarColumns = [
    {
      name: "S.No.",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.listname,
      sortable: true,
    },
    {
      name: "Order",
      selector: (row) => row.order,
      sortable: true,
    },
    {
      name: "Title",
      selector: (row) => row.url,
      sortable: true,
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
        title="Navbar"
        columns={navbarColumns}
        data={navbar}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="450px"
        selectableRowsHighlight
        highlightOnHover
        subHeader
        actions={
          <Link to="/home/add-navbar">
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

export default Navbar;
