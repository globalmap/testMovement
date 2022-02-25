import { combineReducers } from "redux"; 
import Player from "./player.reducer";

const rootReducer = combineReducers({
  Player: Player,
});

export default rootReducer;
