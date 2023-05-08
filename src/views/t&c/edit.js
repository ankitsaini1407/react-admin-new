import React, { useState, useRef, useEffect } from "react";
import JoditEditor from "jodit-react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { edit_term_condition } from "../../utils/APIRoutes";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";

const config = {
  buttons: [
    "source",
    "|",
    "bold",
    "strikethrough",
    "underline",
    "italic",
    "|",
    "ul",
    "ol",
    "|",
    "outdent",
    "indent",
    "|",
    "font",
    "fontsize",
    "brush",
    "paragraph",
    "|",
    "image",
    "video",
    "table",
    "link",
    "|",
    "align",
    "undo",
    "redo",
    "|",
    "hr",
    "eraser",
    "copyformat",
    "|",
    "symbol",
    "fullsize",
    "print",
    "about",
  ],
};

const EditTc = () => {
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
  console.log("log")

  const [value, setValue] = useState();
  const getValue = (val) => {
    setValue(val);
  };
  const editor = useRef(null);
  const toastOptions = {
    position: "top-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };
  const handleSubmit = async () => {
    const data = await axios.post(
      `${edit_term_condition}?id=${location.state.id}`,
      { description: value }, { headers: { token: Cookies.get("token") } }
    );
    if (data.data.success === true) {
      navigate("/t&c");
      toast.success(data.data.message, toastOptions);
    }
  };
  return (
    <>
      <Form>
      <Form.Label>Type</Form.Label>
      <Form.Select
          size="lg"
          name="type"
          disabled
          value={location.state.type}>
          <option selected>{location.state.type}</option>
        </Form.Select><br />

        <Form.Label>Sub Type</Form.Label>
        <Form.Select
          size="lg"
          name="subType"
          disabled
          value={location.state.subType}>
            <option selected>{location.state.subType}</option>
        </Form.Select><br />

        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          disabled
          placeholder="Enter title"
          value={location.state.title}
        />
        <br />

        <JoditEditor
          ref={editor}
          config={config}
          initialValue=""
          value={location.state.description}
          getValue={getValue}
          tabIndex={1}
          onChange={(newContent) => getValue(newContent)}
        />
        <br />
        <Button variant="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
      <ToastContainer />
    </>
  );
};
export default EditTc;
