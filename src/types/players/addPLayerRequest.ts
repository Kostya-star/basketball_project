import { IPlayerData } from "./players";

export type IAddPLayerRequest = Omit<IPlayerData, 'id'>;
