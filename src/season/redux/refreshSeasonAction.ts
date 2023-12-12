import {SeasonData} from "../model/SeasonData";
import {SeasonActionTypes} from "./seasonActionTypes"

export type RefreshSeasonAction = {
  "type": string;
  "season": SeasonData;
}
export default function refreshSeasonAction(season: SeasonData): RefreshSeasonAction {
  return { type: SeasonActionTypes.REFRESH_SEASON, season}
}
