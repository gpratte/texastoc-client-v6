import {combineReducers} from "redux";
import game from "../../game/redux/gameReducer";
import games from "../../season/redux/gamesReducer";
import season from "../../season/redux/seasonReducer";
import quarterlies from "../../season/redux/quarterlySeasonReducer";
import leaguePlayers from "../redux/LeaguePlayersReducer";
import rounds from "../redux/LeagueRoundsReducer";
import settings from "../redux/LeagueSettingsReducer";

const leagueReducer = combineReducers({
  game,
  games,
  season,
  quarterlies,
  leaguePlayers,
  rounds,
  settings
})

export default leagueReducer;