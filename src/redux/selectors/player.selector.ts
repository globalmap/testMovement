import { RootState } from "../store";

export const getLoadPlayer = (state: RootState) => state.player.loadSuccess;

export const getModels = (state: RootState) => state.player.model;

// export const getPoints = (state: RootState) => state.player.