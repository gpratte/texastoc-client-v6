import '../../common/style/common.css'
import _ from "lodash";
import React, {useState} from "react";
import { connect } from "react-redux";
import {Accordion} from "react-bootstrap";
import Loading from "../../common/components/Loading";
import {GameData} from "../model/GameDataTypes";
import useGame from "../hooks/useGame";
import {gameOver} from "../gameUtils";
import Details from "./Details";
import GamePlayers from "./GamePlayers";
import ClockPolling from "./ClockPolling";
import Finalize from "./Finalize";

// @ts-ignore
function Game(props) {
  const seasonId : number = props.seasonId;
  const game: GameData = props.game;
  const isGameOver = gameOver(game.players);

  const {
    isLoading,
  } = useGame(seasonId || 0, game.id || 0);

  const [detailsAccordionOpen, setDetailsAccordionOpen] = useState(false)

  if (_.isEmpty(game)) {
    return <h1>No Game</h1>
  }

  return (
    <>
      <Loading isLoading={isLoading}/>
      <div>
        <Accordion flush>
          <Accordion.Item eventKey="0">
            <Accordion.Button onClick={() => setDetailsAccordionOpen(!detailsAccordionOpen)}>
              Details {detailsAccordionOpen && <i className="fa-solid fa-chevron-up"></i>}{!detailsAccordionOpen &&
              <i className="fa-solid fa-chevron-down"></i>}
            </Accordion.Button>
            <Accordion.Body>
              <Details game={game}/>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        {
          !isGameOver &&
          <ClockPolling game={game}/>
        }
        <GamePlayers game={game}/>
        <Finalize game={game}/>
      </div>
    </>
  )
}

// @ts-ignore
function mapStateToProps(state) {
  return {
    game: state.game
  };
}

export default connect(mapStateToProps)(Game);
