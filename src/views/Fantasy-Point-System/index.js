import React from "react";
import Accordion from "react-bootstrap/Accordion";

import { useLocation } from "react-router-dom";
import HomeCms from './Cricket/table'
// import Faqs from "./faqs/table";
const Home = () => {
  const location = useLocation();
  
  return (
    <Accordion defaultActiveKey={["0"]} alwaysOpen>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Fantasy Crikcet Points System</Accordion.Header>
        <Accordion.Body>
         <HomeCms/>
        </Accordion.Body>
      </Accordion.Item>
      <br />
      {/* <Accordion.Item eventKey="1">
        <Accordion.Header>Fantsy Cricket League FAQ'S</Accordion.Header>
        <Accordion.Body>
         <Faqs/>
        </Accordion.Body>
      </Accordion.Item> */}
    </Accordion>
  );
};

export default Home;
