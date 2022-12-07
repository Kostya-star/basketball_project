export interface ITeamsParamsGetRequest extends IGetTeamsParams {}
export interface IPlayersParamsGetRequest extends IGetTeamsParams {}

export interface IGetTeamsParams {
  Name?: string
  Page?: number | string 
  PageSize?: number | string 
}