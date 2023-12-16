import React, {createContext, useState} from "react";
import { connect } from "react-redux";
import Details from "./Details";
import useGame from "../hooks/useGame";
import '../../common/style/common.css'
import {Accordion} from "react-bootstrap";
import GamePlayers from "./GamePlayers";
import Loading from "../../common/components/Loading";
import {GameData} from "../model/GameDataTypes";
import _ from "lodash";

export interface GameContextType {
  game: GameData;
  refreshGame : (n : number) => void;
  showAddPlayer: boolean;
  setShowAddPlayer: React.Dispatch<React.SetStateAction<boolean>>
}

export const GameContext = createContext<GameContextType | null>(null);

// @ts-ignore
function Game(props) {
  const seasonId : number = props.seasonId;
  const game: GameData = props.game;

  const {
    refreshGame,
    isLoading,
    showAddPlayer,
    setShowAddPlayer
  } = useGame(seasonId, game.id || 0);

  const [detailsAccordionOpen, setDetailsAccordionOpen] = useState(true)

  if (_.isEmpty(game)) {
    return <h1>No Game</h1>
  }

  return (
    <GameContext.Provider value={{game, refreshGame, showAddPlayer, setShowAddPlayer}}>
      <Loading isLoading={isLoading}/>
      <div>
        <Accordion defaultActiveKey="0" flush>
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
        <GamePlayers />
      </div>
    </GameContext.Provider>
  )
}

// @ts-ignore
function mapStateToProps(state) {
  return {
    game: state.game
  };
}

export default connect(mapStateToProps)(Game);
