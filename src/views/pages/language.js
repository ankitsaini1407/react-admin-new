import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { add_download_banner } from "../../utils/APIRoutes";
import Button from "react-bootstrap/Button";
import { ToastContainer, toast } from "react-toastify";
import Form from "react-bootstrap/Form";
import { useFormik } from "formik";
import { language_schema } from "../../schemas";
import {locale} from "../../lib/en"

const Language = () => {
  const navigate = useNavigate();

  useEffect( () => {
    myFunction()
  }, []);
  const myFunction = async () => {
    const token = Cookies.get("token");
    if (!token) {
      navigate("/");
    }
  };
  const [inputText, setInputText] = useState([]);
  const [resultText, setResultText] = useState("");
  const [selectedLanguageKey, setLanguageKey] = useState("");
  const [languagesList, setLanguagesList] = useState([]);
  const [detectLanguageKey, setdetectedLanguageKey] = useState("");

  useEffect(()=>{
        for(let x in locale){
            console.log("=>", locale[x]);
            setInputText(preValue => [...preValue, locale[x]]);
        }
  },[]);

  const getLanguageSource = (input) => {
    axios
      .post(`https://libretranslate.de/detect`, {
        q: input,
      })
      .then((response) => {
        setdetectedLanguageKey(response.data[0].language);
      });
  };

  const translateText = () => {
    for (const iterator of inputText) {

    }
    setResultText(inputText);

    getLanguageSource();
    for (const iterator of inputText) {
        let data = {
          q: iterator,
          source: detectLanguageKey,
          target: selectedLanguageKey,
        };
        axios.post(`https://libretranslate.de/translate`, data).then((response) => {
            console.log(">>response", response);
          setResultText(response.data.translatedText);
        });
    }
  };

  const languageKey = (selectedLanguage) => {
    setLanguageKey(selectedLanguage.target.value);
  };

  useEffect(() => {
    axios.get(`https://libretranslate.de/languages`).then((response) => {
      setLanguagesList(response.data);
    });
    getLanguageSource();
  }, [inputText]);

  const toastOptions = {
    position: "top-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  console.log("selectedLanguageKey", resultText);

  return (
    <Form>
      <Form.Select
        size="lg"
        name="language"
        required
        value={selectedLanguageKey}
        onChange={languageKey}
      >
        <option defaultValue hidden>Select Language</option>
        {
        languagesList.filter((elem)=>
        elem.name=="English" || elem.name =="Hindi"
        ).map((language) => {
          return <option value={language.code}>{language.name}</option>
        })}
      </Form.Select>
      <br />
      <Button variant="primary" onClick={translateText}>
        Submit
      </Button>
    </Form>
  );
};

export default Language;
