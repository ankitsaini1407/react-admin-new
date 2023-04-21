import React from "react";
import Accordion from "react-bootstrap/Accordion";
import { useLocation } from "react-router-dom";
import IndianT20LeagueBanner from "./banner/table";
import IndianT20LeagueCms from "./content/table";
const IndianT20League = () => {
  const location = useLocation();
  
  return (
    <Accordion defaultActiveKey={["0"]} alwaysOpen>
      <Accordion.Item eventKey="0">
        <Accordion.Header>BANNER</Accordion.Header>
        <Accordion.Body>
         <IndianT20LeagueBanner />
        </Accordion.Body>
      </Accordion.Item>
      <br />
      <Accordion.Item eventKey="1">
        <Accordion.Header>CONTENT</Accordion.Header>
        <Accordion.Body>
         <IndianT20LeagueCms />
        </Accordion.Body>
      </Accordion.Item>
      <br />
      <Accordion.Item eventKey="2">
        <Accordion.Header>SQUARE BOX</Accordion.Header>
        <Accordion.Body>
         SQUARE BOX
        </Accordion.Body>
      </Accordion.Item>
      <br />
      <Accordion.Item eventKey="3">
        <Accordion.Header>TEAMS DETAIL</Accordion.Header>
        <Accordion.Body>
        TEAMS DETAIL
        </Accordion.Body>
      </Accordion.Item>
      <br />
      <Accordion.Item eventKey="4">
        <Accordion.Header>WINNERS</Accordion.Header>
        <Accordion.Body>
        WINNERS
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default IndianT20League;
