import React, { useEffect, useState } from "react";
import "../../../assets/libs/simple-datatables/style.css";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import DataTable from "react-data-table-component";
import axios from "axios";
import {
  get_fantasy_cricket_points,
  edit_fantasy_cricket_points,
} from "../../../utils/APIRoutes";
import { ToastContainer, toast } from "react-toastify";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';

const FootballAttackPoints = () => {
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
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [data, setData] = useState([]);
  const [points, setPoints] = useState();
  const [point1, setPoint1] = useState([]);
  const [id, setId] = useState("");

  const getData = async () => {
    try {
      await axios
        .get(`${get_fantasy_cricket_points}?type=football&action_name=attack`, {
          headers: { token: Cookies.get("token") },
        })
        .then((response) => {
          if (response) {
            response.data.data.map((elem) => {
              return setId(elem.id);
            });
            response.data.data.map((elem) => {
              setData(elem.actionPoints);
            });
            // setTotalImage(response.data.data.totalItems);
          }
        })
        .catch(function (error) {
          if (error) {
            if (error) {
              if (error.response.data.token.isExpired == true) {
                setTimeout(() => {
                  Cookies.remove("token", "user");
                  navigate("/");
                }, 3000);
                toast.error(error.response.data.token.message, toastOptions);
              }
            }
          }
        });
    } catch (err) {
      console.log(err);
    }
  };
  const handleChange1 = (e, actions, i) => {
    var numberRegex = /^[+-]*\d{1,2}\.?\d*[x]*$/;

    const { value } = e.target;
    if(numberRegex.test(value) === true){
    const onchangeVal = [...data];
    data.map((elem) => {
      if (elem.action === actions) {
        return (elem.points = value);
      }
    });
    setPoint1(onchangeVal);
  }else {
    toast.error("Please Enter Only Numbers")
  }
  };

  const columns = [
    
    {
      selector: (row) => row.action,
      sortable: true,
    },
    {
      selector: (row, index) => (
        <Form.Control
        style={{width:"60px", height:"30px"}}
          type="text"
          value={row.points}
          onChange={(e) => handleChange1(e, row.action, index)}
        />
      ),
      sortable: true,
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  const updatePoints = async () => {
    axios.post(
      `${edit_fantasy_cricket_points}?id=${id}`,
      { point1 },
      {
        headers: { token: Cookies.get("token") },
      }
    ).then((res)=>{
      if(res){
        toast.success(res.data.message, toastOptions);
      }
    }).catch((err)=>{
      console.log(err);
    })
  };
  return (
    <div className="container">
      <DataTable
        columns={columns}
        data={data}
        fixedHeader
        fixedHeaderScrollHeight="450px"
        selectableRowsHighlight
        highlightOnHover
        subHeader
        subHeaderAlign="right"
      /><br />
      <button
              data-toggle="modal"
              data-target="#myModal"
              className="btn btn-sm btn-success"
              onClick={updatePoints}
            >
              Update
            </button>
      <ToastContainer />
    </div>
  );
};

export default FootballAttackPoints;
