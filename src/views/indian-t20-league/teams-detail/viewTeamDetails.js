import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useFormik } from "formik";
import { add_team_details_schema } from "../../../schemas";
import { ToastContainer, toast } from "react-toastify";
import { add_teamDetails_route } from "../../../utils/APIRoutes";

const ViewTeamDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    myFunction();
  }, []);
  const myFunction = async () => {
    const token = Cookies.get("token");
    if (!token) {
      navigate("/");
    }
  };

 
  return (
    <>
      <Form>
        <Form.Group controlId="formFileLg" className="mb-3">
          <Form.Label>Player Logo</Form.Label>
            <img
              src={location.state.playerlogo}
              id="output"
              width="200"
            />
        </Form.Group>
        <Form.Group controlId="formFileLg" className="mb-3">
          <Form.Label>Team Logo</Form.Label>
            <img
              src={location.state.teamlogo}
              id="output"
              width="200"
            />
            </Form.Group>
        <Form.Group className="position-relative mb-3">
          <Form.Label>New Players</Form.Label>
          <Form.Control
            type="text"
            disabled
            placeholder="Enter New Players Name"
            required
            name="new_players"
            value={location.state.majorSignings}
          />
        </Form.Group>
        <Form.Group className="position-relative mb-3">
          <Form.Label>Captain Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Captain Name"
            required
            disabled
            name="captain_name"
            value={location.state.captain}
          />
        </Form.Group>
        <Form.Group className="position-relative mb-3">
          <Form.Label>Team Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Team Name"
            required
            name="team_name"
            disabled
            value={location.state.team}
          />
        </Form.Group>
        <Form.Group className="position-relative mb-3">
          <Form.Label>Coach Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Coach Name"
            required
            name="coach_name"
            disabled
            value={location.state.coach}
          />
        </Form.Group>
        <Form.Group className="position-relative mb-3">
          <Form.Label>Winning Titles</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Winning Titles"
            required
            name="winning_titles"
            value={location.state.titles}
            disabled
          />
        </Form.Group>
        <Form.Group className="position-relative mb-3">
          <Form.Label>Color 1</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Color 1"
            required
            name="color_1"
            value={location.state.color1}
            disabled
          />
        </Form.Group>
        <Form.Group className="position-relative mb-3">
          <Form.Label>Color 2</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Color 2"
            required
            name="color_2"
            value={location.state.color2}
            disabled
          />
        </Form.Group>
        <Form.Group className="position-relative mb-3">
          <Form.Label>Color 3</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Color 3"
            required
            name="color_3"
            value={location.state.color3}
            disabled
          />
        </Form.Group>
        <Link to="/indian-t20-league">
        <Button>Back</Button>
        </Link>
      </Form>
      <ToastContainer />
    </>
  );
};

export default ViewTeamDetails;
