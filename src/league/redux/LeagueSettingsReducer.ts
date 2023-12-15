import {Settings} from "../model/LeagueDataTypes";
import {LeagueActionTypes} from "./leagueActionTypes"
import {RefreshSettingsAction} from "./refreshSettingsAction";

export default function leagueSettingsReducer(state: Settings | {} = {}, action: RefreshSettingsAction): Settings | {} {
  // TODO don't need a switch stmt yet
  switch (action.type) {
    case LeagueActionTypes.REFRESH_SETTINGS:
      return action.settings;
    default:
      return state;
  }
}