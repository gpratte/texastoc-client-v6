import {SeasonData} from "../model/SeasonDataTypes";
import {RefreshSeasonAction} from "./refreshSeasonAction";
import {SeasonActionTypes} from "./seasonActionTypes"

export default function seasonReducer(state: SeasonData | {} = {}, action: RefreshSeasonAction): SeasonData | {} {
  // TODO don't need a switch stmt yet
  switch (action.type) {
    case SeasonActionTypes.REFRESH_SEASON:
      return action.season;
    default:
      return state;
  }
}