import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Accordion from "react-bootstrap/Accordion";
import { useLocation } from "react-router-dom";
// t20 ----
import CricketT20BattingPoints from "./T20/BattingPointsTable";
import CricketT20BowlingPoints from "./T20/BowlingPointsTable";
import CricketT20FieldingPoints from "./T20/FieldingPointsTable";
import CricketT20OthersPoints from "./T20/OthersPointsTable";
import CricketT20EconomyPoints from "./T20/EconomyRatePoints";
import CricketT20StrikePoints from "./T20/StrikeRatePoints";

//odi ----

import CricketOdiBattingPoints from "./ODI/BattingPointsTable";
import CricketOdiBowlingPoints from "./ODI/BowlingPointsTable";
import CricketOdiEconomyPoints from "./ODI/EconomyRatePoints";
import CricketOdiFieldingPoints from "./ODI/FieldingPointsTable";
import CricketOdiOthersPoints from "./ODI/OthersPointsTable";
import CricketOdiStrikePoints from "./ODI/StrikeRatePoints";

//tests ----

import CricketTestsBattingPoints from "./Tests/BattingPointsTable";
import CricketTestsBowlingPoints from "./Tests/BowlingPointsTable";
import CricketTestsFieldingPoints from "./Tests/FieldingPointsTable";
import CricketTestsOthersPoints from "./Tests/OthersPointsTable";

//t10 ----

import CricketT10BattingPoints from "./T10/BattingPointsTable";
import CricketT10BowlingPoints from "./T10/BowlingPointsTable";
import CricketT10EconomyPoints from "./T10/EconomyRatePoints";
import CricketT10FieldingPoints from "./T10/FieldingPointsTable";
import CricketT10OthersPoints from "./T10/OthersPointsTable";
import CricketT10StrikePoints from "./T10/StrikeRatePoints";

// the hundred ----

import CricketT100BattingPoints from "./The-hundred/BattingPointsTable";
import CricketT100BowlingPoints from "./The-hundred/BowlingPointsTable";
import CricketT100FieldingPoints from "./The-hundred/FieldingPointsTable";
import CricketT100OthersPoints from "./The-hundred/OthersPointsTable";

const CricketFantasyPoints = () => {
  return (
    <Tabs defaultActiveKey="t20" id="uncontrolled-tab-example" className="mb-3">
      <Tab eventKey="t20" title="T20">
        <Accordion defaultActiveKey={["0"]} alwaysOpen>
          <Accordion.Item eventKey="0">
            <Accordion.Header>BATTING</Accordion.Header>
            <Accordion.Body><CricketT20BattingPoints /></Accordion.Body>
          </Accordion.Item>
          <br />
          <Accordion.Item eventKey="1">
            <Accordion.Header>BOWLING</Accordion.Header>
            <Accordion.Body><CricketT20BowlingPoints /></Accordion.Body>
          </Accordion.Item>
          <br />
          <Accordion.Item eventKey="2">
            <Accordion.Header>FIELDING</Accordion.Header>
            <Accordion.Body><CricketT20FieldingPoints /></Accordion.Body>
          </Accordion.Item>
          <br />
          <Accordion.Item eventKey="3">
            <Accordion.Header>OTHERS</Accordion.Header>
            <Accordion.Body><CricketT20OthersPoints /></Accordion.Body>
          </Accordion.Item>
          <br />
          <Accordion.Item eventKey="4">
            <Accordion.Header>
              ECONOMY RATE (MIN 2 OVERS TO BE BOWLED)
            </Accordion.Header>
            <Accordion.Body><CricketT20EconomyPoints /></Accordion.Body>
          </Accordion.Item>
          <br />
          <Accordion.Item eventKey="5">
            <Accordion.Header>
            STRIKE RATE (EXCEPT BOWLER) (Min 10 Balls to be played)
            </Accordion.Header>
            <Accordion.Body>
              <CricketT20StrikePoints />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Tab>
      <Tab eventKey="odi" title="ODI">
      <Accordion defaultActiveKey={["0"]} alwaysOpen>
          <Accordion.Item eventKey="0">
            <Accordion.Header>BATTING</Accordion.Header>
            <Accordion.Body><CricketOdiBattingPoints /></Accordion.Body>
          </Accordion.Item>
          <br />
          <Accordion.Item eventKey="1">
            <Accordion.Header>BOWLING</Accordion.Header>
            <Accordion.Body><CricketOdiBowlingPoints /></Accordion.Body>
          </Accordion.Item>
          <br />
          <Accordion.Item eventKey="2">
            <Accordion.Header>FIELDING</Accordion.Header>
            <Accordion.Body><CricketOdiFieldingPoints /></Accordion.Body>
          </Accordion.Item>
          <br />
          <Accordion.Item eventKey="3">
            <Accordion.Header>OTHERS</Accordion.Header>
            <Accordion.Body><CricketOdiOthersPoints /></Accordion.Body>
          </Accordion.Item>
          <br />
          <Accordion.Item eventKey="4">
            <Accordion.Header>
              ECONOMY RATE (MIN 2 OVERS TO BE BOWLED)
            </Accordion.Header>
            <Accordion.Body><CricketOdiEconomyPoints /></Accordion.Body>
          </Accordion.Item>
          <br />
          <Accordion.Item eventKey="5">
            <Accordion.Header>
            STRIKE RATE (EXCEPT BOWLER) (Min 10 Balls to be played)
            </Accordion.Header>
            <Accordion.Body>
              <CricketOdiStrikePoints />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Tab>
      <Tab eventKey="tests" title="TESTS">
      <Accordion defaultActiveKey={["0"]} alwaysOpen>
          <Accordion.Item eventKey="0">
            <Accordion.Header>BATTING</Accordion.Header>
            <Accordion.Body><CricketTestsBattingPoints /></Accordion.Body>
          </Accordion.Item>
          <br />
          <Accordion.Item eventKey="1">
            <Accordion.Header>BOWLING</Accordion.Header>
            <Accordion.Body><CricketTestsBowlingPoints /></Accordion.Body>
          </Accordion.Item>
          <br />
          <Accordion.Item eventKey="2">
            <Accordion.Header>FIELDING</Accordion.Header>
            <Accordion.Body><CricketTestsFieldingPoints /></Accordion.Body>
          </Accordion.Item>
          <br />
          <Accordion.Item eventKey="3">
            <Accordion.Header>OTHERS</Accordion.Header>
            <Accordion.Body><CricketTestsOthersPoints /></Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Tab>
      <Tab eventKey="t10" title="T10">
      <Accordion defaultActiveKey={["0"]} alwaysOpen>
          <Accordion.Item eventKey="0">
            <Accordion.Header>BATTING</Accordion.Header>
            <Accordion.Body><CricketT10BattingPoints /></Accordion.Body>
          </Accordion.Item>
          <br />
          <Accordion.Item eventKey="1">
            <Accordion.Header>BOWLING</Accordion.Header>
            <Accordion.Body><CricketT10BowlingPoints /></Accordion.Body>
          </Accordion.Item>
          <br />
          <Accordion.Item eventKey="2">
            <Accordion.Header>FIELDING</Accordion.Header>
            <Accordion.Body><CricketT10FieldingPoints /></Accordion.Body>
          </Accordion.Item>
          <br />
          <Accordion.Item eventKey="3">
            <Accordion.Header>OTHERS</Accordion.Header>
            <Accordion.Body><CricketT10OthersPoints /></Accordion.Body>
          </Accordion.Item>
          <br />
          <Accordion.Item eventKey="4">
            <Accordion.Header>
              ECONOMY RATE (MIN 2 OVERS TO BE BOWLED)
            </Accordion.Header>
            <Accordion.Body><CricketT10EconomyPoints /></Accordion.Body>
          </Accordion.Item>
          <br />
          <Accordion.Item eventKey="5">
            <Accordion.Header>
            STRIKE RATE (EXCEPT BOWLER) (Min 10 Balls to be played)
            </Accordion.Header>
            <Accordion.Body>
              <CricketT10StrikePoints />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Tab>
      <Tab eventKey="the_hundred" title="THE HUNDRED">
      <Accordion defaultActiveKey={["0"]} alwaysOpen>
          <Accordion.Item eventKey="0">
            <Accordion.Header>BATTING</Accordion.Header>
            <Accordion.Body><CricketT100BattingPoints /></Accordion.Body>
          </Accordion.Item>
          <br />
          <Accordion.Item eventKey="1">
            <Accordion.Header>BOWLING</Accordion.Header>
            <Accordion.Body><CricketT100BowlingPoints /></Accordion.Body>
          </Accordion.Item>
          <br />
          <Accordion.Item eventKey="2">
            <Accordion.Header>FIELDING</Accordion.Header>
            <Accordion.Body><CricketT100FieldingPoints /></Accordion.Body>
          </Accordion.Item>
          <br />
          <Accordion.Item eventKey="3">
            <Accordion.Header>OTHERS</Accordion.Header>
            <Accordion.Body><CricketT100OthersPoints /></Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Tab>
    </Tabs>
  );
}

export default CricketFantasyPoints;
