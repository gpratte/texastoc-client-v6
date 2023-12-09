import {delay, getRandomInt} from "../utils/util";
import gameData from "./game-data";
import {GameData} from "../game/model/GameData";
import {PlayerData} from "../player/model/PlayerData";
import {GamePlayerData} from "../game/model/GamePlayerData";

const gameClient = {
  getGame: async (id = 0): Promise<GameData> => {
    // delay 1 to 3 seconds
    await delay(getRandomInt(1000, 3000));
    // One in 10 will error
    if (getRandomInt(0, 10) === 1) {
      throw new Error('uh oh could not get game' + Date.now());
    }
    return GameData.fromObj(gameData);
  },

  addPlayer: async (gameId: number, player: PlayerData): Promise<PlayerData> => {
    // delay 1 to 3 seconds
    await delay(getRandomInt(1000, 3000));
    // One in four will error
    if (getRandomInt(0, 4) === 1) {
      throw new Error('uh oh could not add player');
    }
    return {...player};
  },

  updatePlayer: async (gamePlayer: GamePlayerData): Promise<GamePlayerData> => {
    // delay 1 to 3 seconds
    await delay(getRandomInt(1000, 3000));
    // One in four will error
    if (getRandomInt(0, 4) === 1) {
      throw {
        id: Math.random(),
        type: 'Error',
        message: 'uh oh could not add player' + Date.now()
      };
    }
    return {...gamePlayer};
  },

  deletePlayer: async (gameId: number, gamePlayerId: number) => {
    // delay 1 to 2 seconds
    await delay(getRandomInt(1000, 2000));
    // One in four will error
    if (getRandomInt(0, 4) === 1) {
      throw {
        id: Math.random(),
        type: 'Error',
        message: 'uh oh could not delete player' + Date.now()
      };
    }
  }
}

export default gameClient;