import { TYPE_REDUCER } from "../../utils/constants";
import { stateInterf,  } from "../interface";



const initialState: stateInterf = {
exampleValue:2
  
};

const Settings = (state = initialState, action: any) => {
  switch (action.type) {
    case TYPE_REDUCER.EXAMMPLE_ACTION:
      {
        return {
          ...state,
          exampleValue: 3,  
        };
      }
    default:
      return state;
  }
};

export default Settings;
