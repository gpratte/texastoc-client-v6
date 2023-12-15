import {LeaguePlayerData} from "../model/LeaguePlayerDataTypes"
import {LeaguePlayersActionTypes} from "./leaguePlayersActionTypes"

export type RefreshLeaguePlayersAction = {
  "type": string;
  "leaguePlayers": Array<LeaguePlayerData>;
}
export default function refreshLeaguePlayersAction(leaguePlayers: Array<LeaguePlayerData>): RefreshLeaguePlayersAction {
  return { type: LeaguePlayersActionTypes.REFRESH_LEAGUE_PLAYERS, leaguePlayers}
}