import _ from "lodash";
import {GamePlayerData} from "./GamePlayerData";

export type GamePayout = {
  id: number;
  gameId: number;
  place: number;
  amount: number;
  chopAmount?: number;
}

export class GameData {
  id: number;
  seasonId: number;
  hostName: string;
  date: string;
  numPaidPlayers: number;
  seasonGameNum: number;
  quarterlyGameNum: number;
  buyInCollected: number;
  rebuyAddOnCollected: number;
  annualTocCollected: number;
  quarterlyTocCollected: number;
  totalCollected: number;
  totalCombinedTocCalculated: number;
  kittyCalculated: number;
  prizePotCalculated: number;
  numPlayers: number;
  finalized: boolean;
  players: Array<GamePlayerData>;
  payouts?: Array<GamePayout>;

  constructor(id: number, seasonId: number, hostName: string, date: string,
              seasonGameNum: number, quarterlyGameNum: number,
              buyInCollected: number, rebuyAddOnCollected: number,
              annualTocCollected: number, quarterlyTocCollected: number,
              totalCollected: number, totalCombinedTocCalculated: number,
              kittyCalculated: number, prizePotCalculated: number,
              numPlayers: number, numPaidPlayers: number, finalized: boolean,
              players: Array<GamePlayerData>) {
    this.id = id;
    this.seasonId = seasonId;
    this.hostName = hostName;
    this.date = date;
    this.seasonGameNum = seasonGameNum;
    this.quarterlyGameNum = quarterlyGameNum;
    this.buyInCollected = buyInCollected;
    this.rebuyAddOnCollected = rebuyAddOnCollected;
    this.annualTocCollected = annualTocCollected;
    this.quarterlyTocCollected = quarterlyTocCollected;
    this.totalCollected = totalCollected;
    this.totalCombinedTocCalculated = totalCombinedTocCalculated;
    this.kittyCalculated = kittyCalculated;
    this.prizePotCalculated = prizePotCalculated;
    this.numPlayers = numPlayers;
    this.numPaidPlayers = numPaidPlayers;
    this.finalized = finalized;
    this.players = players;
  }

  static fromObj(obj: Object): GameData {
    const id: number = _.get(obj, 'id', 0);
    const seasonId: number = _.get(obj, 'seasonId', 0);
    const hostName: string = _.get(obj, 'hostName', '');
    const date: string = _.get(obj, 'date', '');
    const seasonGameNum = _.get(obj, 'seasonId', 0);
    const quarterlyGameNum = _.get(obj, 'seasonId', 0);
    const buyInCollected = _.get(obj, 'seasonId', 0);
    const rebuyAddOnCollected = _.get(obj, 'seasonId', 0);
    const annualTocCollected = _.get(obj, 'seasonId', 0);
    const quarterlyTocCollected = _.get(obj, 'seasonId', 0);
    const totalCollected = _.get(obj, 'seasonId', 0);
    const totalCombinedTocCalculated = _.get(obj, 'seasonId', 0);
    const kittyCalculated = _.get(obj, 'seasonId', 0);
    const prizePotCalculated = _.get(obj, 'seasonId', 0);
    const numPlayers = _.get(obj, 'seasonId', 0);
    const numPaidPlayers = _.get(obj, 'seasonId', 0);
    const finalized = _.get(obj, 'seasonId', false);
    const gamePlayers: Array<GamePlayerData> = GamePlayerData.getGamePlayers(_.get(obj, 'players', []))

    const gameData: GameData = new GameData(id, seasonId, hostName, date, seasonGameNum, quarterlyGameNum, buyInCollected, rebuyAddOnCollected, annualTocCollected, quarterlyTocCollected, totalCollected, totalCombinedTocCalculated, kittyCalculated, prizePotCalculated, numPlayers, numPaidPlayers, finalized, gamePlayers);

    gameData.payouts = GameData.getPayouts(obj);
    return gameData;
  }

  private static getPayouts(obj: Object): Array<GamePayout> {
    const payouts: Array<GamePayout> = [];
    _.get(obj, 'payouts', []).forEach(p => {
      const payout: GamePayout = {} as GamePayout;
      payout.id = _.get(p, 'id', 0);

      payout.gameId = _.get(p, 'gameId', 0);
      payout.place = _.get(p, 'place', 0);
      payout.amount = _.get(p, 'amount', 0);
      payout.chopAmount = _.get(p, 'chopAmount');
    })
    return payouts;
  }
}