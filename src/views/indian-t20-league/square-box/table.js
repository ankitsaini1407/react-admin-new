import React, { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import DataTable from "react-data-table-component";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import {
  get_ndianT20League_square_boxes_route,
  change_ndianT20League_square_boxes_status,
} from "../../../utils/APIRoutes";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Button from "react-bootstrap/Button";
import { BsEyeFill, BsPencilSquare, BsFillTrashFill } from "react-icons/bs";
import Swal from "sweetalert2";
import AddLogo from "./add";
import "../../../assets/css/banner-toggle-btn.css";

const IndianT20LeagueSquareBoxes = () => {

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
  const [squareBox, setSquareBox] = useState([]);

  const getLogo = async () => {
    await axios
      .get(`${get_ndianT20League_square_boxes_route}?type=indian-t20-league`, {
        headers: { token: Cookies.get("token") },
      })
      .then((response) => {
        setSquareBox(response.data.data);
      })
      .catch(function (error) {
        if(error){
          console.log(error);
        }
      });
  };

  useEffect(() => {
    getLogo();
  }, []);

  const handleChange = (id, active) => async (e) => {
    active = !active;
    let response = await axios.post(
      `${change_ndianT20League_square_boxes_status}?id=${id}&isActive=${active}`,
      {},
      { headers: { token: Cookies.get("token") } }
    );
    getLogo();
  };

  const handleEdit = (id, image, title, description) => async (e) => {
    navigate("/indian-t20-league/squareBox/edit", {
      state: { id: id, image: image, title: title, description: description },
    });
  };

  const squareBoxColumns = [
    {
      name: "S.No.",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Image",
      selector: (row) => <img src={row.image} />,
      sortable: true,
    },
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
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
            overlay={<Tooltip id="button-tooltip-2">Edit</Tooltip>}
          >
            <Button
              style={{ backgroundColor: "transparent", border: "none" }}
              onClick={handleEdit(
                row.id,
                row.image,
                row.title,
                row.description
              )}
            >
              <BsPencilSquare style={{ fontSize: "20px", color: "blue" }} />
            </Button>
          </OverlayTrigger>
        </div>
      ),
    },
  ];

  return (
    <div className="container">
      <DataTable
        title="Square Boxes"
        columns={squareBoxColumns}
        data={squareBox}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="450px"
        selectableRowsHighlight
        highlightOnHover
        subHeader
        actions={
          <Link to="/indian-t20-league/squareBox/add">
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

export default IndianT20LeagueSquareBoxes;
