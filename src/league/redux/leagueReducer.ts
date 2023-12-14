import {combineReducers} from "redux";
import game from "../../game/redux/gameReducer";
import games from "../../season/redux/gamesReducer";
import season from "../../season/redux/seasonReducer";
import quarterlies from "../../season/redux/quarterlySeasonReducer";

const leagueReducer = combineReducers({
  game,
  games,
  season,
  quarterlies
})

export default leagueReducer;