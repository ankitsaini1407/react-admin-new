import React, { useEffect, useState } from "react";
import "../../../assets/libs/simple-datatables/style.css";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import DataTable from "react-data-table-component";
import axios from "axios";
import {
  get_app_features_route,
  update_app_features_status,
  delete_app_features_status,
  add_app_features_image,
} from "../../../utils/APIRoutes";
import "../../../assets/css/banner-toggle-btn.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import { app_features_center_image } from "../../../schemas";
import {
  BsEyeFill,
  BsX,
  BsFillTrashFill,
  BsPencilSquare,
} from "react-icons/bs";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Swal from "sweetalert2";
import Form from "react-bootstrap/Form";
import { useFormik } from "formik";
import AppFeatureCenterImage from "./centerImageTable";

const AppFeatures = () => {
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
  const [pageNumber, setPageNumber] = useState(1);
  const [state, setState] = useState("");
  const [imageError, setImageError] = useState("");

  const getData = async () => {
    try {
      await axios
        .get(get_app_features_route, {
          headers: { token: Cookies.get("token") },
        })
        .then((response) => {
          if (response) {
            setData(response.data.data.rows);
            setFilteredData(response.data.data.rows);
          }
        })
        .catch(function (error) {
          if (error) {
            if (error.response.data.token.isExpired == true) {
              setTimeout(() => {
                Cookies.remove("token", "user");
                navigate("/");
              }, 3000);
              toast.error(error.response.data.token.message, toastOptions);
            }
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (id, active) => async () => {
    active = !active;
    await axios.post(
      `${update_app_features_status}?id=${id}&isActive=${active}`
    );
    getData();
  };

  const handleDelete = (id) => async (e) => {
    const del = async () => {
      await axios
        .delete(`${delete_app_features_status}?id=${id}`)
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

  const appFeaturesColumns = [
    {
      name: "S.No.",
      selector: (row, index) => index + 1 + (pageNumber - 1) * 10,
      sortable: true,
    },
    {
      name: "Image",
      selector: (row) => <img src={row.logo} width={40} alt="Banner" />,
      sortable: true,
    },
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "description",
      selector: (row) => row.description,
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

  return (
    <div className="container">
      <DataTable
        title="App Features"
        columns={appFeaturesColumns}
        data={filteredData}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="450px"
        selectableRowsHighlight
        highlightOnHover
        onChangePage={(value) => setPageNumber(value)}
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
            <Link to="/home/app-features/add">
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
      <AppFeatureCenterImage />

      <ToastContainer />
    </div>
  );
};

export default AppFeatures;
