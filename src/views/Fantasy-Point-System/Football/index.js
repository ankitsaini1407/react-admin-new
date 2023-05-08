import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Accordion from "react-bootstrap/Accordion";
import { useLocation } from "react-router-dom";

import FootballAttackPoints from "./FootballAttackPoints";
import FootballDeffencePoints from "./FootballDeffencePoints";
import FootballOthersPoints from "./OthersPoints";
import FootballCardsPoints from "./FootballCardsPoints";

const FootballFantasyPoints = () => {
  return (
    <Accordion defaultActiveKey={["0"]} alwaysOpen>
      <Accordion.Item eventKey="0">
        <Accordion.Header>ATTACK</Accordion.Header>
        <Accordion.Body>
          <FootballAttackPoints />
        </Accordion.Body>
      </Accordion.Item>
      <br />
      <Accordion.Item eventKey="1">
        <Accordion.Header>DEFENSE</Accordion.Header>
        <Accordion.Body>
        <FootballDeffencePoints />
        </Accordion.Body>
      </Accordion.Item>
      <br />
      <Accordion.Item eventKey="2">
        <Accordion.Header>OTHER POINTS</Accordion.Header>
        <Accordion.Body>
        <FootballOthersPoints />
        </Accordion.Body>
      </Accordion.Item>
      <br />
      <Accordion.Item eventKey="3">
        <Accordion.Header>CARDS & TEAM POINTS</Accordion.Header>
        <Accordion.Body>
        <FootballCardsPoints />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default FootballFantasyPoints;
