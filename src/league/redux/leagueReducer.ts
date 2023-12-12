import {combineReducers} from "redux";
import game from "../../game/redux/gameReducer";
import season from "../../season/redux/seasonReducer";

const leagueReducer = combineReducers({
  game,
  season
})

export default leagueReducer;