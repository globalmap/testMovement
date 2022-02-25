import { TYPE_REDUCERS } from "../../utils/constants";
import { actionsTypes } from "../types/actions";
import { playerTypes } from "../types/reducers";

const initialState: playerTypes = {
	loaded: false,
	activePoint: null,
	activeModel: null
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action: actionsTypes): playerTypes => {
	switch(action.type) {
		case TYPE_REDUCERS.LOADED_PLAYER_SUCCESS: {
			return {
				...state,
				loaded: true
			}
		}

		case TYPE_REDUCERS.ADD_ACTIVE_POINT: {
			return {
				...state,
				activePoint: action.payload
			}
		}

		case TYPE_REDUCERS.ADD_ACTIVE_MODEL: {
			return {
				...state,
				activeModel: action.payload
			}
		}

		case TYPE_REDUCERS.DELETE_ACTIVE_POINT: {
			return {
				...state,
				activePoint: null
			}
		}

		case TYPE_REDUCERS.DELETE_MODEL: {
			return {
				...state,
				activeModel: null
			}
		}
		default:
			return state
	}
}