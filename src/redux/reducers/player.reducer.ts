import { TYPE_REDUCERS } from "../../utils/constants";
import { addNodeModel, setConfiguration } from "../../utils/threekit/threekitFunc";
import { playerState } from "../types/player"

const initialState: playerState = {
  model: [],
  points: [],
  loadSuccess: false
}

export default (state = initialState, action: any): playerState => {
  switch (action.type) {
    case TYPE_REDUCERS.PLAYER_LOAD_SUCCESS: {
      return {
        ...state,
        loadSuccess: true
      }
    }
    case TYPE_REDUCERS.ADD_MODEL_SUCCESS: {
      return {
        ...state,
        model: [
          ...state.model,
          action.payload
        ]
      }
      
    }
    default:
      return state;
  }
} 