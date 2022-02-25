import { RootState } from './../store';

export const getPlayerState = (state: RootState): boolean => {
	const player = state.Player;
	return player.loaded
}

export const getActivePoint = (state: RootState): string => {
	const player = state.Player;
	const activePoint = player.activePoint;
	
	if(activePoint) {
		return activePoint
	}

	return ""
}

export const getActiveModel = (state: RootState): string => {
	const player = state.Player;
	const activeModel = player.activeModel;

	if(activeModel) {
		return activeModel
	}

	return "";
}