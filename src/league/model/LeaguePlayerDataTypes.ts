export type Role = {
  id: number;
  type: string;
}

export type LeaguePlayerData = {
  id : number;
  firstName? : string;
  lastName? : string;
  phone? : string;
  email? : string;
  roles: Array<Role>;
  name : string;
}
