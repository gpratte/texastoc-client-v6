import {Round} from "../model/LeagueDataTypes";
import {LeagueActionTypes} from "./leagueActionTypes"
import {RefreshRoundsAction} from "./refreshRoundsAction";

export default function leagueRoundsReducer(state: Array<Round> | [] = [], action: RefreshRoundsAction): Array<Round> | [] {
  // TODO don't need a switch stmt yet
  switch (action.type) {
    case LeagueActionTypes.REFRESH_ROUNDS:
      return action.rounds;
    default:
      return state;
  }
}