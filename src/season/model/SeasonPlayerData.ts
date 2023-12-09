import _, {entries} from "lodash";

export class SeasonPlayerData {
    id: number;
    playerId: number;
    seasonId: number;
    name: string;
    entries: number;
    points: number;
    place: number;
    forfeit: boolean;

    constructor(id: number, playerId: number, seasonId: number, name: string,
                entries: number, points: number, place: number, forfeit: boolean) {
        this.id = id;
        this.playerId = playerId;
        this.seasonId = seasonId;
        this.name = name;
        this.entries = entries;
        this.points = points;
        this.place = place;
        this.forfeit = forfeit;
    }

    public static getSeasonPlayers(players: Array<Object>): Array<SeasonPlayerData> {
        if (!players) {
            return [];
        }
        const seasonPlayers: Array<SeasonPlayerData> = [];
        players.forEach(p => {
            seasonPlayers.push(SeasonPlayerData.fromObj(p));
        })
        return seasonPlayers;
    }

    public static fromObj(obj: Object): SeasonPlayerData {
        const id: number = _.get(obj, 'id', 0);
        const playerId: number = _.get(obj, 'playerId', 0);
        const seasonId: number = _.get(obj, 'seasonId', 0);
        const name: string = _.get(obj, 'name', '');
        const entries: number = _.get(obj, 'entries', 0);
        const points: number = _.get(obj, 'points', 0);
        const forfeit: boolean = _.get(obj, 'forfeit', false);
        const place: number | undefined = _.get(obj, 'place', 0);
        return new SeasonPlayerData(id, playerId, seasonId, name,
            entries, points, place, forfeit);
    }
}