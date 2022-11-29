export interface IPlayersState {
  data: IPlayerData[];
  count: number;
  page: number;
  size: number;
}

export interface IPlayerData {
  name: string;
  number: number;
  position: string;
  team: number;
  birthday: string;
  height: number;
  weight: number;
  avatarUrl: string;
  id: number;
}
