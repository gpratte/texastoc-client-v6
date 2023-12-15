export type GamePlayerData = {
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
}
export type GamePayout = {
  id: number;
  gameId: number;
  place: number;
  amount: number;
  chopAmount?: number;
}
export type GameData = {
  id: number;
  seasonId: number;
  hostName: string;
  date: Array<number>;
  numPaidPlayers: number;
  seasonGameNum: number;
  quarterlyGameNum: number;
  buyInCollected: number;
  rebuyAddOnCollected: number;
  annualTocCollected: number;
  quarterlyTocCollected: number;
  totalCollected: number;
  totalCombinedTocCalculated: number;
  annualTocFromRebuyAddOnCalculated: number;
  kittyCalculated: number;
  prizePotCalculated: number;
  numPlayers: number;
  finalized: boolean;
  players: Array<GamePlayerData>;
  payouts: Array<GamePayout>;
}