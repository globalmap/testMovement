import { TYPE_REDUCERS } from "../../utils/constants";
import { setConfiguration, addNodeModel, getMetadata, getNameModel } from "../../utils/threekit/threekitFunc";
import { addModelSuccess } from "../actions/player.action";
import { Store } from "../store";

export const playerMiddleware: any = (store: Store) => (next: any) => (action: any) => {
  if(action.type === TYPE_REDUCERS.ADDED_MODEL) {
    const { assetId, translation, rotation } = action.payload;

    setConfiguration("Models", [{
      assetId
    }])

    const id = addNodeModel(assetId, translation, rotation);

    setTimeout(() => {
      const name = getNameModel(assetId);
      const metadata = getMetadata(assetId);
      const positions = metadata.find((e: any) => e.name === "Positions");
      const type = metadata.find((e: any) => e.name === "Type");

      next({
        type: TYPE_REDUCERS.ADD_MODEL_SUCCESS,
        payload: {...action.payload, transform: { 
            translation,
            rotation
          },
          type: type.defaultValue,
          positions: JSON.parse(positions.defaultValue)
        }
      })
    }, 500)
  }

  return next(action);
}
