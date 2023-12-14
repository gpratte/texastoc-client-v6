import {combineReducers} from "redux";
import game from "../../game/redux/gameReducer";
import season from "../../season/redux/seasonReducer";
import quarterlies from "../../season/redux/quarterlySeasonReducer";

const leagueReducer = combineReducers({
  game,
  season,
  quarterlies
})

export default leagueReducer;