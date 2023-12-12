import _ from "lodash";

export class QuartlerySeasonPlayerData {
    id: number;
    playerId: number;
    seasonId: number;
    name: string;
    entries: number;
    points: number;
    place: number;
    qseasonId: number;

    constructor(id: number, playerId: number, seasonId: number, name: string,
                entries: number, points: number, place: number, qseasonId: number) {
        this.id = id;
        this.playerId = playerId;
        this.seasonId = seasonId;
        this.name = name;
        this.entries = entries;
        this.points = points;
        this.place = place;
        this.qseasonId = qseasonId;
    }
}