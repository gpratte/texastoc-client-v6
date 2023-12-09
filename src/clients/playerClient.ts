import {delay, getRandomInt} from "../utils/util";
import leaguePlayersData from "./league-players-data";
import {PlayerData} from "../player/model/PlayerData";

const playerClient = {
  getPlayers: async (id = 0): Promise<Array<PlayerData>> => {
    // delay 1 to 3 seconds
    await delay(getRandomInt(1000, 3000));
    // One in four will error
    if (getRandomInt(0, 4) === 1) {
      throw new Error('uh oh could not get players' + Date.now());
    }

    const players: Array<PlayerData> = [];
    leaguePlayersData.forEach(player => {
      const pd: PlayerData | undefined = PlayerData.fromObj(player);
      if (pd) {
        players.push(pd);
      }
    });
    return players;
  }
}

export default playerClient;
