import React from "react";
import Accordion from "react-bootstrap/Accordion";
import { useLocation } from "react-router-dom";
import AboutUsBanners from "./banner/table";
import AboutUsCenterLogoTable from "./centerLogo/table";
import AboutUsCms from "./content/table";
import AboutUsBottomImagesTable from "./bottomImages/table";
const AboutUs = () => {
  const location = useLocation();
  
  return (
    <Accordion defaultActiveKey={["0"]} alwaysOpen>
      <Accordion.Item eventKey="0">
        <Accordion.Header>BANNER</Accordion.Header>
        <Accordion.Body>
          <AboutUsBanners />
        </Accordion.Body>
      </Accordion.Item>
      <br />
      <Accordion.Item eventKey="1">
        <Accordion.Header>CENTER LOGO</Accordion.Header>
        <Accordion.Body>
          <AboutUsCenterLogoTable />
        </Accordion.Body>
      </Accordion.Item>
      <br />
      <Accordion.Item eventKey="2">
        <Accordion.Header>CONTENT</Accordion.Header>
        <Accordion.Body>
          <AboutUsCms />
        </Accordion.Body>
      </Accordion.Item>
      <br />
      <Accordion.Item eventKey="3">
        <Accordion.Header>BOTTOM IMAGES</Accordion.Header>
        <Accordion.Body>
        <AboutUsBottomImagesTable />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default AboutUs;
