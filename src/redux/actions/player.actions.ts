import { TYPE_REDUCERS } from './../../utils/constants';

export const PlayerLoadSuccess = () => ({
	type: TYPE_REDUCERS.LOADED_PLAYER_SUCCESS
})

export const addActivePoint = (id: string) => ({
	type: TYPE_REDUCERS.ADD_ACTIVE_POINT,
	payload: id
})

export const addActiveModel = (id: string) => ({
	type: TYPE_REDUCERS.ADD_ACTIVE_MODEL,
	payload: id
})

export const deleteActivePoint = () => ({
	type: TYPE_REDUCERS.DELETE_ACTIVE_POINT
})

export const deleteActiveModel = () => ({
	type: TYPE_REDUCERS.DELETE_MODEL
})