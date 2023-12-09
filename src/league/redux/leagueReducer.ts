import {combineReducers} from "redux";
import game from "../../game/redux/gameReducer";

const leagueReducer = combineReducers({
  game
})

export default leagueReducer;