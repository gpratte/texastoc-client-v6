import {LeaguePlayerData} from "../model/LeaguePlayerDataTypes";
import {RefreshLeaguePlayersAction} from "./refreshLeaguePlayersAction";
import {LeaguePlayersActionTypes} from "./leaguePlayersActionTypes"

export default function leaguePlayersReducer(state: Array<LeaguePlayerData> | [] = [], action: RefreshLeaguePlayersAction): Array<LeaguePlayerData> | [] {
  // TODO don't need a switch stmt yet
  switch (action.type) {
    case LeaguePlayersActionTypes.REFRESH_LEAGUE_PLAYERS:
      return action.leaguePlayers;
    default:
      return state;
  }
}