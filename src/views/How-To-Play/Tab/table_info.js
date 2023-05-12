import React, { useState, useRef, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useFormik } from "formik";
import { how_to_play_table } from "../../../schemas";
import { add_how_to_play_table_route } from "../../../utils/APIRoutes";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const AddHowToPlaySteps = () => {
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

  const initialValues = {
    order: "",
    title: "",
    description: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: how_to_play_table,
    onSubmit: async (values, action) => {
      const { playerType, Min, Max, type, subType } = values;
      const formData = new FormData();
      const data = { playerType: playerType, Min: Min, Max: Max };
      // formData.append("data", JSON.stringify(data));
      await axios
        .post(
          `${add_how_to_play_table_route}?type=${type}&subType=${subType}`,
          {data},
          { headers: { token: Cookies.get("token") } }
        )
        .then((response) => {
          if (response) {
            navigate("/home", { state: { active_table: "3" } });
            toast.success(response.data.message, toastOptions);
          }
        })
        .catch(function (error) {
          if (error) {
            console.log(error);
          }
        });
      action.resetForm();
    },
  });

  return (
    <>
      <Form onSubmit={formik.handleSubmit} encType="multipart/form-data">
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Select
            size="lg"
            name="type"
            value={formik.values.type}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={!!formik.errors.type}
            isValid={formik.touched.type && !formik.errors.type}
          >
            <option>Select How-To-Play Type</option>
            <option value="cricket">Cricket</option>
            <option value="football">FootBall</option>
            <option value="kabaddi">Kabaddi</option>
          </Form.Select>
          <br />
          {formik.errors.type && formik.touched.type ? (
            <p
              className="form-error"
              style={{ color: "red", width: "100%", display: "block" }}
            >
              {formik.errors.type}
            </p>
          ) : null}

          <Form.Select
            size="lg"
            name="subType"
            value={formik.values.subType}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={!!formik.errors.subType}
            isValid={formik.touched.subType && !formik.errors.subType}
          >
            <option>Select How-To-Play SubType</option>
            <option value="fullinning">Full Inning</option>
            <option value="secondInnings">Second Innings</option>
            <option value="livefantasy">Live Fantasy</option>
            <option value="spotfantasy">Spot Fantasy</option>
            <option value="n/a">N/A</option>
          </Form.Select>
          <br />
          {formik.errors.subType && formik.touched.subType ? (
            <p
              className="form-error"
              style={{ color: "red", width: "100%", display: "block" }}
            >
              {formik.errors.subType}
            </p>
          ) : null}
          <Form.Label>Player Type</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Player Type"
            name="playerType"
            size="lg"
            value={formik.values.playerType}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={!!formik.errors.playerType}
            isValid={formik.touched.playerType && !formik.errors.playerType}
          />
          {formik.errors.playerType && formik.touched.playerType ? (
            <p
              className="form-error"
              style={{ color: "red", width: "100%", display: "block" }}
            >
              {formik.errors.playerType}
            </p>
          ) : null}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Min</Form.Label>
          <Form.Control
            type="Number"
            placeholder="Enter Min Points"
            name="Min"
            size="lg"
            value={formik.values.Min}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={!!formik.errors.Min}
            isValid={formik.touched.Min && !formik.errors.Min}
          />
          {formik.errors.Min && formik.touched.Min ? (
            <p
              className="form-error"
              style={{ color: "red", width: "100%", display: "block" }}
            >
              {formik.errors.Min}
            </p>
          ) : null}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Max</Form.Label>
          <Form.Control
            type="Number"
            placeholder="Enter Max Points"
            name="Max"
            size="lg"
            value={formik.values.Max}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={!!formik.errors.Max}
            isValid={formik.touched.Max && !formik.errors.Max}
          />
          {formik.errors.Max && formik.touched.Max ? (
            <p
              className="form-error"
              style={{ color: "red", width: "100%", display: "block" }}
            >
              {formik.errors.Min}
            </p>
          ) : null}
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default AddHowToPlaySteps;
