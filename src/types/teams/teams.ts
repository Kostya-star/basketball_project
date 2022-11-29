export interface INewTeamValues {
  name: string;
  division: string;
  conference: string;
  foundationYear: number;
  imageUrl: string;
}

export interface ITeamData extends INewTeamValues{
  id: number;
}

export interface ITeamState {
  data: ITeamData[];
  count: number;
  page: number;
  size: number;
}
