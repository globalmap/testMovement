import { TYPE_REDUCERS } from "../../utils/constants";
import { addedModelPayload, addModelSuccessPayload } from "../types/player";

export const addedModel = (payload: addedModelPayload) => ({
  type: TYPE_REDUCERS.ADDED_MODEL,
  payload
})

export const addModelSuccess = (payload: addModelSuccessPayload) => ({
  type: TYPE_REDUCERS.ADD_MODEL_SUCCESS,
  payload
})

export const loadPlayerSuccess = () => ({
  type: TYPE_REDUCERS.PLAYER_LOAD_SUCCESS,
})