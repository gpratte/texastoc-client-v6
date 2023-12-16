import React from "react";
import {connect} from "react-redux";
import {GameData} from "../../../game/model/GameDataTypes";
import useGames from "../../hooks/useGames";
import _ from "lodash";
import {Accordion, Button} from "react-bootstrap";
import {convertDateToString} from "../../../utils/util";
import Game from "./Game";

// @ts-ignore
function Games(props) {

  const seasonId: number = props.seasonId;
  const games : Array<GameData> = props.games;

  const {
    isLoading
  } = useGames(seasonId);

  const unlock = (id : number) => {
    // TODO
    //unfinalize(id);
  }

  if (_.isEmpty(games)) {
    return (
      <>
        <h1>No Games</h1>
      </>
    )
  }

  const renderGames = (games: Array<GameData>) => {
    return games.map((game : GameData) => {
      return (
        <Accordion>
          <Accordion.Item eventKey={game.id.toString()}>
            <Accordion.Header>
              {convertDateToString(game.date)}
              {
                game.finalized &&
                <Button variant="link" onClick={() => unlock(game.id)}>
                  <i className="fas fa-lock"/>
                </Button>
              }
              {
                !game.finalized &&
                <Button variant="link" onClick={() => unlock(game.id)}>
                  <i className="fas fa-lock-open"/>
                </Button>
              }
            </Accordion.Header>
            <Accordion.Body>
              <Game game={game}/>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      )
    })
  }

  return (
    <>
      {renderGames(games)}
    </>
  )
}

// @ts-ignore
function mapStateToProps(state) {
  return {
    games: state.games
  };
}

export default connect(mapStateToProps)(Games);
