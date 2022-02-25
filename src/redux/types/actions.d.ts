import { TYPE_REDUCERS } from './../../utils/constants';

export type PlayerLoadSuccess = {
	type: TYPE_REDUCERS.LOADED_PLAYER_SUCCESS,
	payload?: any
}

export type addActivePoint = {
	type: TYPE_REDUCERS.ADD_ACTIVE_POINT,
	payload: string
}

export type deleteActivePoint = {
	type: TYPE_REDUCERS.DELETE_ACTIVE_POINT
	payload?: any
}

export type addActiveModel = {
	type: TYPE_REDUCERS.ADD_ACTIVE_MODEL,
	payload: string 
}

export type deleteModel = {
	type: TYPE_REDUCERS.DELETE_MODEL,
	payload?: any
}

export type actionsTypes = PlayerLoadSuccess | addActivePoint | deleteActivePoint | addActiveModel | deleteModel;