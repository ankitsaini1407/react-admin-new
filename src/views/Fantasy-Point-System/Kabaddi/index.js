import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Accordion from "react-bootstrap/Accordion";
import { useLocation } from "react-router-dom";

import KabaddiRaidPoints from "./KabaddiRaid";
import KabaddiDefendPoints from "./KabaddiDefend";
import KabaddiOthersPoints from "./OthersPoints"
import KabaddiCardsPoints from "./FootballCardsPoints";

const KabaddiFantasyPoints = () => {
  return (
    <Accordion defaultActiveKey={["0"]} alwaysOpen>
      <Accordion.Item eventKey="0">
        <Accordion.Header>RAIDING</Accordion.Header>
        <Accordion.Body>
          <KabaddiRaidPoints />
        </Accordion.Body>
      </Accordion.Item>
      <br />
      <Accordion.Item eventKey="1">
        <Accordion.Header>DEFENDING</Accordion.Header>
        <Accordion.Body>
        <KabaddiDefendPoints />
        </Accordion.Body>
      </Accordion.Item>
      <br />
      <Accordion.Item eventKey="2">
        <Accordion.Header>OTHER POINTS TIME</Accordion.Header>
        <Accordion.Body>
        <KabaddiOthersPoints />
        </Accordion.Body>
      </Accordion.Item>
      <br />
      <Accordion.Item eventKey="3">
        <Accordion.Header>CARDS & OTHER PENALTIES</Accordion.Header>
        <Accordion.Body>
        <KabaddiCardsPoints />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default KabaddiFantasyPoints;
