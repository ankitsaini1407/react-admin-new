import React, { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import DataTable from "react-data-table-component";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import {
  get_sub_admin,
  delete_sub_admin,
  change_status_sub_admin,
} from "../../utils/APIRoutes";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Button from "react-bootstrap/Button";
import { BsEyeFill, BsPencilSquare, BsFillTrashFill, BsX } from "react-icons/bs";
import Swal from "sweetalert2";
import AddLogo from "./add";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";

import "../../assets/css/banner-toggle-btn.css";

const SubAdmin = () => {
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

  const [modalInfo, setModalInfo] = useState("");
  const [modalShow, setModalShow] = useState(false);

  const toastOptions = {
    position: "top-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [subAdmin, setSubAdmin] = useState([]);

  const getSubAdmin = async () => {
    await axios
      .get(get_sub_admin, {
        headers: { token: Cookies.get("token") },
      })
      .then((response) => {
        console.log("->>", response);
        setSubAdmin(response.data.data.rows);
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
    getSubAdmin();
  }, []);

  const handleDelete = (id) => async (e) => {
    const del = async () => {
      await axios
        .delete(`${delete_sub_admin}?id=${id}`, {
          headers: { token: Cookies.get("token") },
        })
        .then((response) => {
          getSubAdmin();
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
      `${change_status_sub_admin}?id=${id}&isActive=${active}`,
      {},
      { headers: { token: Cookies.get("token") } }
    );
    getSubAdmin();
  };

  const logoColumns = [
    {
      name: "S.No.",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.username,
      sortable: true,
    },
    {
      name: "E-mail",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Access-Module",
      selector: row => row.accessModule,
      sortable: true
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
        data={subAdmin}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="450px"
        selectableRowsHighlight
        highlightOnHover
        subHeader
        actions={
          <Link to="/sub-admin/add">
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
            <img src={modalInfo} height={150} width={200} style={{backgroundColor:"grey"}} />
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}
    </div>
  );
};

export default SubAdmin;
