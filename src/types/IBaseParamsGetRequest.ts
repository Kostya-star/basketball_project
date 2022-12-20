import { ISelectOption } from "./ISelectOption";

export interface ITeamsParamsGetRequest extends IGetTeamsParams {}
export interface IPlayersParamsGetRequest extends IGetTeamsParams {}

export interface IGetTeamsParams {
  Page?: number
  PageSize?: number
  Name?: string
  TeamIds?: string | string[]
}

export interface ITeamsPlayersParams {
  page?: number;
  itemsPerPage?: number;
  search?: string;
  multiSelectVal?: ISelectOption[]
}
