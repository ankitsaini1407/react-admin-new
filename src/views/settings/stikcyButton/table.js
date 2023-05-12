import React, { useEffect, useState } from "react";
import "../../../assets/libs/simple-datatables/style.css";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import DataTable from "react-data-table-component";
import axios from "axios";
import {
  get_play_responsible,
  update_status_indianT20League_cms_route,
  delete_indianT20League_cms_route,
} from "../../../utils/APIRoutes";
import "../../../assets/css/banner-toggle-btn.css";
import Button from "react-bootstrap/Button";
import { ToastContainer, toast } from "react-toastify";
import { BsEyeFill, BsPencilSquare, BsFillTrashFill } from "react-icons/bs";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const StikcyButton = () => {
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
  const [totalImage, setTotalImage] = useState();
  const [perPage, setPerPage] = useState(10);

  const getData = async () => {
    await axios
      .get(
        `${get_play_responsible}?type=play-reponsible&page=${
          pageNumber - 1
        }&size=${perPage}`,
        { headers: { token: Cookies.get("token") } }
      )
      .then((response) => {
        if (response) {
          setData(response.data.data.result);
          setTotalImage(response.data.data.totalItems);
          setFilteredData(response.data.data.result);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleChange = (id, active) => async (e) => {
    active = !active;
    await axios.post(
      `${update_status_indianT20League_cms_route}?id=${id}&isActive=${active}`
    );
    getData();
  };

  const handleSlug = (slug, description) => async () => {
    navigate(`/setting/cms/${slug}`, { state: { description: description } });
  };

  const handleDelete = (id) => async (e) => {
    await axios
      .delete(`${delete_indianT20League_cms_route}?id=${id}`)
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

  const handleEdit = (id, title, description) => async () => {
    navigate(`/setting/cms/edit/${id}`, {
      state: { id: id, title: title, description: description },
    });
  };

  const columns = [
    {
      name: "S.No.",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
        name: "Image",
        selector: (row) => (
          <img
            src={row.socialMeidaIcons}
            style={{ backgroundColor: "#1c1c1c" }}
            width={40}
            alt="steps"
            onClick={() => {
              setModalShow1(!modalShow1);
              setModalInfo1(row.socialMeidaIcons);
            }}
          />
        ),
        sortable: true,
      },
    {
      name: "url",
      selector: (row) => (
        <div>
          <Button
            variant="primary"
            style={{ backgroundColor: "transparent", border: "none" }}
            onClick={() => {
              setModalInfo(row.disclaimer);
              setModalShow(!modalShow);
            }}
          >
            <BsEyeFill style={{ color: "blue" }} />
          </Button>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Type",
      selector: (row) => row.type,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => (row.isActive ? "Activate" : "In-Activate"),
      sortable: true,
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
  }, [pageNumber, perPage]);

  useEffect(() => {
    let result = data.filter((elem) => {
      let filterVal = elem.type.toLowerCase();
      let searchVal = search.toLocaleLowerCase();
      return filterVal.match(searchVal);
    });
    setFilteredData(result);
  }, [search]);

  const handlePageChange = async (newPerPage, page) => {
    setPerPage(newPerPage);
  };

  return (
    <div className="container">
      <DataTable
        title="Sticky Images"
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
          <Link to="/setting/stickybutton-add">
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
      <ToastContainer />
    </div>
  );
};

export default StikcyButton;
