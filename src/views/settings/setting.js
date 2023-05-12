import React from "react";
import Accordion from "react-bootstrap/Accordion";
import { useLocation } from "react-router-dom";
import SettingsContent from './playResponsible/table'
import SettingsGuidlines from './guidlines/table';
import SettingsCopyright from './copyright/table';
import StikcyButton from './stikcyButton/table';


const Setting = () => {
  const location = useLocation();

  return (
    <Accordion defaultActiveKey={["0"]} alwaysOpen>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Play Responsible</Accordion.Header>
        <Accordion.Body>
        <SettingsContent/>
        </Accordion.Body>
      </Accordion.Item>
      <br />
      <Accordion.Item eventKey="1">
        <Accordion.Header>Guidelines</Accordion.Header>
        <Accordion.Body>
      <SettingsGuidlines/>
        </Accordion.Body>
      </Accordion.Item>
      <br />
      <Accordion.Item eventKey="2">
        <Accordion.Header>Copyright</Accordion.Header>
        <Accordion.Body>
      <SettingsCopyright/>
        </Accordion.Body>
      </Accordion.Item>
      <br/>
      <Accordion.Item eventKey="3">
        <Accordion.Header>Sticky Button</Accordion.Header>
        <Accordion.Body>
      <StikcyButton/>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default Setting;
