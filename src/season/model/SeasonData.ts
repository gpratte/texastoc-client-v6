import {SeasonPlayerData} from "./SeasonPlayerData";
import _ from "lodash";

type SeasonPayout = {
    "id": number;
    "seasonId": number;
    "place": number;
    "amount": number;
    "guaranteed": boolean;
    "estimated": boolean;
    "cash": boolean;
}
export class SeasonData {
    id: number;
    start: string;
    ended: string;
    buyInCollected: number;
    totalCombinedAnnualTocCalculated: number;
    kittyCalculated: number;
    prizePotCalculated: number;
    numGames: number;
    numGamesPlayed: number;
    finalized: boolean;

    players?: Array<SeasonPlayerData>;
    payouts?: Array<SeasonPayout>;

    constructor(id: number, start: string, ended: string, buyInCollected: number,
                totalCombinedAnnualTocCalculated: number, kittyCalculated: number,
                prizePotCalculated: number, numGames: number, numGamesPlayed: number,
                finalized: boolean) {
        this.id = id;
        this.start = start;
        this.ended = ended;
        this.buyInCollected = buyInCollected;
        this.totalCombinedAnnualTocCalculated = totalCombinedAnnualTocCalculated;
        this.kittyCalculated = kittyCalculated;
        this.prizePotCalculated = prizePotCalculated;
        this.numGames = numGames;
        this.numGamesPlayed = numGamesPlayed;
        this.finalized = finalized;
    }

    public static fromObj(obj: Object): SeasonData {
        const id: number = _.get(obj, 'id', 0);
        const start: string = _.get(obj, 'date', '');
        const ended: string = _.get(obj, 'date', '');
        const buyInCollected = _.get(obj, 'seasonId', 0);
        const totalCombinedAnnualTocCalculated = _.get(obj, 'seasonId', 0);
        const kittyCalculated = _.get(obj, 'seasonId', 0);
        const prizePotCalculated = _.get(obj, 'seasonId', 0);
        const numGames = _.get(obj, 'seasonId', 0);
        const numGamesPlayed = _.get(obj, 'seasonId', 0);
        const finalized = _.get(obj, 'seasonId', false);

        const seasonData: SeasonData = new SeasonData(id, start, ended,
          buyInCollected, totalCombinedAnnualTocCalculated, kittyCalculated,
          prizePotCalculated, numGames, numGamesPlayed, finalized);
        seasonData.players = SeasonPlayerData.getSeasonPlayers(_.get(obj, 'players', []))
        seasonData.payouts = SeasonData.getPayouts(obj);
        return seasonData;
    }

    private static getPayouts(obj: Object): Array<SeasonPayout> {
        const payouts: Array<SeasonPayout> = [];
        _.get(obj, 'payouts', []).forEach(p => {
            const payout: SeasonPayout = {} as SeasonPayout;
            payout.id = _.get(p, 'id', 0);
            payout.seasonId = _.get(p, 'seasonId', 0);
            payout.place = _.get(p, 'place', 0);
            payout.amount = _.get(p, 'amount', 0);
            payout.guaranteed = _.get(p, 'guaranteed');
            payout.estimated = _.get(p, 'estimated');
            payout.cash = _.get(p, 'cash');
        })
        return payouts;
    }

}