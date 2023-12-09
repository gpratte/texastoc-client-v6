import _ from "lodash";

export class GamePlayerData {
  id: number;
  playerId: number;
  name: string;
  boughtIn: boolean;
  rebought: boolean;
  annualTocParticipant: boolean;
  quarterlyTocParticipant: boolean;
  roundUpdates: boolean;
  chop?: number;
  tocPoints?: number;
  tocChopPoints?: number;
  qtocPoints?: number;
  qtocChopPoints?: number;
  place?: number;

  constructor(id: number, playerId: number, name: string,
              boughtIn: boolean, rebought: boolean,
              annualTocParticipant: boolean, quarterlyTocParticipant: boolean,
              roundUpdates: boolean) {
    this.id = id;
    this.playerId = playerId;
    this.name = name;
    this.boughtIn = boughtIn;
    this.rebought = rebought;
    this.annualTocParticipant = annualTocParticipant;
    this.quarterlyTocParticipant = quarterlyTocParticipant;
    this.roundUpdates = roundUpdates;
  }

  public static getGamePlayers(players: Array<Object>): Array<GamePlayerData> {
    if (!players) {
      return [];
    }

    const gamePlayers: Array<GamePlayerData> = [];
    players.forEach(p => {
      gamePlayers.push(GamePlayerData.fromObj(p));
    })
    return gamePlayers;
  }

  public static fromObj(obj: Object): GamePlayerData {
    const id: number = _.get(obj, 'id', 0);
    const playerId: number = _.get(obj, 'playerId', 0);
    const name: string = _.get(obj, 'name', '');
    const boughtIn: boolean = _.get(obj, 'boughtIn', false);
    const rebought: boolean = _.get(obj, 'rebought', false);
    const annualTocParticipant: boolean = _.get(obj, 'annualTocParticipant', false);
    const quarterlyTocParticipant: boolean = _.get(obj, 'quarterlyTocParticipant', false);
    const roundUpdates: boolean = _.get(obj, 'roundUpdates', false);
    const chop: number | undefined = _.get(obj, 'chop');
    const tocPoints: number | undefined = _.get(obj, 'tocPoints');
    const tocChopPoints: number | undefined = _.get(obj, 'tocChopPoints');
    const qtocPoints: number | undefined = _.get(obj, 'qtocPoints');
    const qtocChopPoints: number | undefined = _.get(obj, 'qtocChopPoints');
    const place: number | undefined = _.get(obj, 'place');

    const gamePlayer: GamePlayerData = new GamePlayerData(id, playerId, name, boughtIn,
      rebought, annualTocParticipant, quarterlyTocParticipant, roundUpdates);
    gamePlayer.chop = chop;
    gamePlayer.tocPoints = tocPoints;
    gamePlayer.tocChopPoints = tocChopPoints;
    gamePlayer.qtocPoints = qtocPoints;
    gamePlayer.qtocChopPoints = qtocChopPoints;
    gamePlayer.place = place;

    return gamePlayer;
  }
}