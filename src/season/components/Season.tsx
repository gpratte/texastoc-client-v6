import React from "react";
import './season.css';
import {connect} from "react-redux";
import _ from "lodash";
import {Link} from "react-router-dom";
import {Accordion, Button, Tab, Tabs} from "react-bootstrap";
import {SeasonData} from "../model/SeasonDataTypes";
import SeasonDetails from "./SeasonDetails";
import SeasonStandings from "./SeasonStandings";
import Quarters from "./quarters/Quarters";
import useSeason from "../hooks/useSeason";
import Games from "./games/Games";
import {convertDateToMoment} from "../../utils/util";

// @ts-ignore
function Season(props) {
  const season: SeasonData | undefined = props.season;

  const {
    isLoading
  } = useSeason(season?.id || 0);

  if (_.isEmpty(season)) {
    return (
      <>
        <h1>No Season</h1>
        <p>
          <Link to="/season/new">
            <Button variant="outline-secondary"> Create a new season </Button>
          </Link>
        </p>
      </>
    )
  }

  const startDate = convertDateToMoment(season.start);
  const endedDate = convertDateToMoment(season.ended);

  return (
    <>
      <h3>{'' + startDate + ' - '  + endedDate}</h3>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Details</Accordion.Header>
          <Accordion.Body>
            <SeasonDetails season={season}/>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <SeasonStandings players={ season.players }/>

      <Tabs className="style1" defaultActiveKey="profile" id="uncontrolled-tab-example">
        <Tab className="style2" eventKey="quarters" title="&nbsp;&nbsp;&nbsp;Quarters&nbsp;&nbsp;&nbsp;">
          <Quarters seasonId={season.id}/>
        </Tab>
        <Tab className="style2" eventKey="games" title="&nbsp;&nbsp;&nbsp;Games&nbsp;&nbsp;&nbsp;">
          <Games seasonId={season.id}/>
        </Tab>
      </Tabs>
      {/*<Finalize seasonId={season.id} finalized={season.finalized}/>*/}
    </>
  )
}

// @ts-ignore
function mapStateToProps(state) {
  return {
    season: state.season,
  };
}

export default connect(mapStateToProps)(Season);
