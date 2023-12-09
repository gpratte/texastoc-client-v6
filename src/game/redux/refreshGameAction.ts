import {GameData} from "../model/GameData";
import {GameActionTypes} from "./gameActionTypes"

export type RefreshGameAction = {
  "type": string;
  "game": GameData;
}
export default function refreshGameAction(game: GameData): RefreshGameAction {
  return { type: GameActionTypes.REFRESH_GAME, game}
}

