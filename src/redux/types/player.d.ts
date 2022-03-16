import { TYPE_REDUCERS } from "../../utils/constants"

//-------------------STORE----------------//
export type xyzType = {
  x: number,
  y: number,
  z: number
}

export type modelType = {
  id: string,
  assetId: string,
  positions: string[],
  type: string,
  transform: {
    translation: xyzType,
    rotation: xyzType
  }
}

export type pointType = {
  id: string,
  modelId: string,
  posiition: string,
}

export type playerState = {
  model: modelType[],
  points: pointType[],
  loadSuccess: boolean
}

//-------------------ACTIONS----------------//
export type addedModelPayload = { 
  assetId: string,
  translation: xyzType,
  rotation: xyzType
}

export type addModelSuccessPayload = modelType;

// interface addedModelAction {
//   type: typeof TYPE_REDUCERS.ADDED_MODEL,
//   payload: addedModelPayload
// }

// interface addModelSuccessAction {
//   type: typeof TYPE_REDUCERS.ADD_MODEL_SUCCESS,
//   payload: addModelSuccessPayload
// }

// export type playerAction = addedModelAction | addModelSuccessAction;