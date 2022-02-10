import { combineReducers } from "redux"; 
import Settings from "./Settings";

const rootReducer = combineReducers({
  Configurations: Settings,
});
export default rootReducer;
