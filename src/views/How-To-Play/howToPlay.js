import React from "react";
import Accordion from "react-bootstrap/Accordion";
import { useLocation } from "react-router-dom";
import HowToPlay from "./BannerCarousel/table";
import Tab from './Tab/table'

const Home = () => {
  const location = useLocation();
  
  return (
    <Accordion defaultActiveKey={["0"]} alwaysOpen>
      <Accordion.Item eventKey="0">
        <Accordion.Header>BANNER CAROUSEL</Accordion.Header>
        <Accordion.Body>
         <HowToPlay/>
        </Accordion.Body>
      </Accordion.Item>
      <br />
      <Accordion.Item eventKey="1">
        <Accordion.Header>Middle Section</Accordion.Header>
        <Accordion.Body>
       <Tab/>
        </Accordion.Body>
      </Accordion.Item>
      <br />
    </Accordion>
  );
};

export default Home;
