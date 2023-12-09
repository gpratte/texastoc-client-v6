import {delay, getRandomInt} from "../utils/util";
import seasonData from "./season-data";
import {SeasonData} from "../season/model/SeasonData";

const seasonClient = {
  getSeason: async (id = 0): Promise<SeasonData> => {
    // delay 1 to 3 seconds
    await delay(getRandomInt(1000, 3000));
    // One in four will error
    if (getRandomInt(0, 4) === 1) {
      throw new Error('uh oh could not get season' + Date.now());
    }
    return SeasonData.fromObj(seasonData);
  }
}

export default seasonClient;
