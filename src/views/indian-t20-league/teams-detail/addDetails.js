import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useFormik } from "formik";
import { add_team_details_schema } from "../../../schemas";
import { ToastContainer, toast } from "react-toastify";
import { add_teamDetails_route } from "../../../utils/APIRoutes";
import ColorPicker, {useColorPicker} from 'react-best-gradient-color-picker'

const AddTeamDetails = () => {
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

  const [state, setState] = useState("");
  const [imageError, setImageError] = useState("");
  const [teamLogoState, setTeamLogoState] = useState("");
  const [teamLogoError, setTeamLogoError] = useState("");
  const [color, setColor] = useState('rgba(255,255,255,1)');
  const { valueToHSL, valueToHSV, valueToHex, valueToCmyk, rgbaArr, hslArr } = useColorPicker(color, setColor);

  const hslString = valueToHSL();
  const hsvString = valueToHSV();
  const hexString = valueToHex();
  const cmykString = valueToCmyk();
  const rgbaArray = rgbaArr;
  const hslArray = hslArr;
  console.log("color", hexString);

  const toastOptions = {
    position: "top-right",
    autoClose: 4000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const initialValues = {
    player_logo: "",
    team_logo: "",
    new_players: "",
    captain_name: "",
    team_name: "",
    coach_name: "",
    winning_titles: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: add_team_details_schema,
    onSubmit: async (values, action) => {
      if (imageError === "" && teamLogoError === "") {
        const {
          player_logo,
          team_logo,
          new_players,
          captain_name,
          team_name,
          coach_name,
          winning_titles,
        } = values;
        const formData = new FormData();
        const data = {
          new_players: new_players,
          captain_name: captain_name,
          team_name: team_name,
          coach_name: coach_name,
          winning_titles: winning_titles,
        };
        formData.append("data", JSON.stringify(data));
        formData.append("image", player_logo);
        formData.append("image", team_logo);
        const date = new Date();
        const fullYear = date.getFullYear();
        await axios
          .post(
            `${add_teamDetails_route}?type=indian-t20-League&year=${fullYear}`,
            formData
          )
          .then((response) => {
            console.log("team-res", response);
            if (response) {
              navigate("/indian-t20-league", { state: { active_table: "3" } });
              toast.success(response.data.message, toastOptions);
            }
          })
          .catch(function (error) {
            console.log("team-err", error);
            if (error.response.data.token.isExpired == true) {
              setTimeout(() => {
                Cookies.remove("token", "user");
                navigate("/");
              }, 3000);
              toast.error(error.response.data.token.message, toastOptions);
            }
          });
        action.resetForm();
      }
    },
  });

  var loadFile = (event) => {
    event.preventDefault();
    if (event.target.files) {
      setState(URL.createObjectURL(event.target.files[0]));
    }
  };
  const checkImage = (e) => {
    e.target.naturalWidth == 122 && e.target.naturalHeight == 250
      ? ""
      : setImageError("Image size is not valid");
  };

  var loadTeamLogoFile = (event) => {
    event.preventDefault();
    if (event.target.files) {
      setTeamLogoState(URL.createObjectURL(event.target.files[0]));
    }
  };
  const checkTeamLogoImage = (e) => {
    e.target.naturalWidth == 108 && e.target.naturalHeight == 108
      ? ""
      : setTeamLogoError("Image size is not valid");
  };
  return (
    <>
    <ColorPicker value={color} onChange={setColor} />
      <Form noValidate onSubmit={formik.handleSubmit}>
        <Form.Group controlId="formFileLg" className="mb-3">
          <Form.Label>Select Player Logo</Form.Label>
          <Form.Control
            type="file"
            name="player_logo"
            size="lg"
            accept="image/*"
            onChange={(e) => {
              formik.setFieldValue("player_logo", e.target.files[0]);
              setImageError("");
              loadFile(e);
            }}
            isInvalid={!!formik.errors.player_logo}
            isValid={formik.touched.player_logo && !formik.errors.player_logo}
          />
          {formik.errors.player_logo && formik.touched.player_logo ? (
            <p
              className="form-error"
              style={{ color: "red", width: "100%", display: "block" }}
            >
              {formik.errors.player_logo}
            </p>
          ) : null}
          {imageError ? (
            <p
              className="form-error"
              style={{ color: "red", width: "100%", display: "block" }}
            >
              {imageError}
            </p>
          ) : (
            <img
              src={state}
              id="output"
              width="200"
              onLoad={(event) => checkImage(event)}
            />
          )}
        </Form.Group>
        <Form.Group controlId="formFileLg" className="mb-3">
          <Form.Label>Select Team Logo</Form.Label>
          <Form.Control
            type="file"
            name="team_logo"
            size="lg"
            accept="image/*"
            onChange={(e) => {
              formik.setFieldValue("team_logo", e.target.files[0]);
              setTeamLogoError("");
              loadTeamLogoFile(e);
            }}
            isInvalid={!!formik.errors.team_logo}
            isValid={formik.touched.team_logo && !formik.errors.team_logo}
          />
          {formik.errors.team_logo && formik.touched.team_logo ? (
            <p
              className="form-error"
              style={{ color: "red", width: "100%", display: "block" }}
            >
              {formik.errors.team_logo}
            </p>
          ) : null}
          {teamLogoError ? (
            <p
              className="form-error"
              style={{ color: "red", width: "100%", display: "block" }}
            >
              {teamLogoError}
            </p>
          ) : (
            <img
              src={teamLogoState}
              id="output"
              width="200"
              onLoad={(event) => checkTeamLogoImage(event)}
            />
          )}
        </Form.Group>
        <Form.Group className="position-relative mb-3">
          <Form.Label>New Players</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter New Players Name"
            required
            name="new_players"
            value={formik.values.new_players}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            isInvalid={!!formik.errors.new_players}
            isValid={formik.touched.new_players && !formik.errors.new_players}
          />
          {formik.errors.new_players && formik.touched.new_players ? (
            <p
              className="form-error"
              style={{ color: "red", width: "100%", display: "block" }}
            >
              {formik.errors.new_players}
            </p>
          ) : null}
        </Form.Group>
        <Form.Group className="position-relative mb-3">
          <Form.Label>Captain Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Captain Name"
            required
            name="captain_name"
            value={formik.values.captain_name}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            isInvalid={!!formik.errors.captain_name}
            isValid={formik.touched.captain_name && !formik.errors.captain_name}
          />
          {formik.errors.captain_name && formik.touched.captain_name ? (
            <p
              className="form-error"
              style={{ color: "red", width: "100%", display: "block" }}
            >
              {formik.errors.captain_name}
            </p>
          ) : null}
        </Form.Group>
        <Form.Group className="position-relative mb-3">
          <Form.Label>Team Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Team Name"
            required
            name="team_name"
            value={formik.values.team_name}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            isInvalid={!!formik.errors.team_name}
            isValid={formik.touched.team_name && !formik.errors.team_name}
          />
          {formik.errors.team_name && formik.touched.team_name ? (
            <p
              className="form-error"
              style={{ color: "red", width: "100%", display: "block" }}
            >
              {formik.errors.team_name}
            </p>
          ) : null}
        </Form.Group>
        <Form.Group className="position-relative mb-3">
          <Form.Label>Coach Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Coach Name"
            required
            name="coach_name"
            value={formik.values.coach_name}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            isInvalid={!!formik.errors.coach_name}
            isValid={formik.touched.coach_name && !formik.errors.coach_name}
          />
          {formik.errors.coach_name && formik.touched.coach_name ? (
            <p
              className="form-error"
              style={{ color: "red", width: "100%", display: "block" }}
            >
              {formik.errors.coach_name}
            </p>
          ) : null}
        </Form.Group>
        <Form.Group className="position-relative mb-3">
          <Form.Label>Winning Titles</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Winning Titles"
            required
            name="winning_titles"
            value={formik.values.winning_titles}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            isInvalid={!!formik.errors.winning_titles}
            isValid={
              formik.touched.winning_titles && !formik.errors.winning_titles
            }
          />
          {formik.errors.winning_titles && formik.touched.winning_titles ? (
            <p
              className="form-error"
              style={{ color: "red", width: "100%", display: "block" }}
            >
              {formik.errors.winning_titles}
            </p>
          ) : null}
        </Form.Group>
        <Button variant="outline-primary">Color 1</Button>
      <Button variant="outline-secondary">Color 2</Button>
      <Button variant="outline-success">Color 3</Button><br /><br />
        <Button type="submit">Submit</Button>
      </Form>
      <ToastContainer />
    </>
  );
};

export default AddTeamDetails;
