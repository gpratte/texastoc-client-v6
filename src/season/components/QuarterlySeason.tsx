import React from "react";
import Table from "react-bootstrap/Table";
import QuarterlySeasonStandings from "./QuarterlySeasonStandings";
import Payouts from "./Payouts";
import {QuarterlySeasonData} from "../model/QuarterlySeasonDataTypes";
import {convertDateToMoment} from "../seasonUtils";

// @ts-ignore
function QuarterlySeason(props) {

  const quarter : QuarterlySeasonData = props.quarter;
  const {start, ended, numGamesPlayed, qtocCollected, players, payouts} = quarter;

  const startDate = convertDateToMoment(start);
  const endedDate = convertDateToMoment(ended);

  return (
    <>
      <Table borderless={true} size="sm">
        <tbody>
        <tr>
          <td>Start date</td>
          <td>{startDate}</td>
        </tr>
        <tr>
          <td>End date</td>
          <td>{endedDate}</td>
        </tr>
        <tr>
          <td>Games</td>
          <td>{numGamesPlayed}</td>
        </tr>
        <tr>
          <td>Quarterly TOC</td>
          <td>${qtocCollected}</td>
        </tr>
        </tbody>
      </Table>

      <QuarterlySeasonStandings players={ players }/>

      <Payouts payouts={payouts}/>
    </>
  )
}

export default QuarterlySeason;