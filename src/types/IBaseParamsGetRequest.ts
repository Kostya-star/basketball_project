export interface ITeamsParamsGetRequest extends IGetTeamsParams {}
export interface IPlayersParamsGetRequest extends IGetTeamsParams {}

export interface IGetTeamsParams {
  Page?: number
  PageSize?: number
  Name?: string
  TeamIds?: string
}

export interface ITeamsPlayersParams {
  page?: number;
  pageSize?: number;
  search?: string;
  multiSelectVal?: string
}
