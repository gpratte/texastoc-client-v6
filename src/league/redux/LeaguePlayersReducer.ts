import {LeaguePlayerData} from "../model/LeagueDataTypes";
import {RefreshLeaguePlayersAction} from "./refreshLeaguePlayersAction";
import {LeagueActionTypes} from "./leagueActionTypes"

export default function leaguePlayersReducer(state: Array<LeaguePlayerData> | [] = [], action: RefreshLeaguePlayersAction): Array<LeaguePlayerData> | [] {
  // TODO don't need a switch stmt yet
  switch (action.type) {
    case LeagueActionTypes.REFRESH_LEAGUE_PLAYERS:
      return action.leaguePlayers;
    default:
      return state;
  }
}