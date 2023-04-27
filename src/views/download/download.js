import React from "react";
import Accordion from "react-bootstrap/Accordion";
import { useLocation } from "react-router-dom";
import DownloadTopImageTable from "./topImage/table";
import DownloadBanner2Table from "./banner2/table";
import DownloadBanner3Table from "./banner3/table";
import DownloadRatingImageTable from "./ratingImage/table";
import DownloadStepsImageTable from "./stepsImage/table";
const Download = () => {
  const location = useLocation();
  
  return (
    <Accordion defaultActiveKey={["0"]} alwaysOpen>
      <Accordion.Item eventKey="0">
        <Accordion.Header>TOP IMAGE</Accordion.Header>
        <Accordion.Body>
        <DownloadTopImageTable />
        </Accordion.Body>
      </Accordion.Item>
      <br />
      <Accordion.Item eventKey="0">
        <Accordion.Header>RATING IMAGE</Accordion.Header>
        <Accordion.Body>
        <DownloadRatingImageTable />
        </Accordion.Body>
      </Accordion.Item>
      <br />
      <Accordion.Item eventKey="0">
        <Accordion.Header>STEPS IMAGE</Accordion.Header>
        <Accordion.Body>
        <DownloadStepsImageTable />
        </Accordion.Body>
      </Accordion.Item>
      <br />
      <Accordion.Item eventKey="0">
        <Accordion.Header>BANNER 2</Accordion.Header>
        <Accordion.Body>
        <DownloadBanner2Table />
        </Accordion.Body>
      </Accordion.Item>
      <br />
      <Accordion.Item eventKey="0">
        <Accordion.Header>BANNER 3</Accordion.Header>
        <Accordion.Body>
        <DownloadBanner3Table />
        </Accordion.Body>
      </Accordion.Item>
      <br />
      
    </Accordion>
  );
};

export default Download;
