
export type QuartlerySeasonPlayerData = {
    id: number;
    playerId: number;
    seasonId: number;
    name: string;
    entries: number;
    points: number;
    place: number;
    qseasonId: number;
}

export type QuarterlySeasonPayout = {
    id: number;
    seasonId: number;
    place: number;
    amount: number;
}
export type QuarterlySeasonData = {
    id: number;
    seasonId: number;
    start: string;
    ended: string;
    quarter: string;
    numPayouts: number;
    numGames: number;
    numGamesPlayed: number;
    finalized: boolean;
    players: Array<QuartlerySeasonPlayerData>;
    payouts: Array<QuarterlySeasonPayout>;

    // constructor(id: number, seasonId: number, start: string, ended: string,
    //             quarter: string, numPayouts: number, numGames: number,
    //             numGamesPlayed: number, finalized: boolean,
    //             players: Array<QuartlerySeasonPlayerData>,
    //             payouts: Array<QuarterlySeasonPayout>) {
    //     this.id = id;
    //     this.seasonId = seasonId;
    //     this.start = start;
    //     this.ended = ended;
    //     this.quarter = quarter;
    //     this.numPayouts = numPayouts;
    //     this.numGames = numGames;
    //     this.numGamesPlayed = numGamesPlayed;
    //     this.finalized = finalized;
    //     this.players = players;
    //     this.payouts = payouts;
    // }
}