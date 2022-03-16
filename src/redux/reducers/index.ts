import { combineReducers } from "redux"
import playerReducer from "./player.reducer"


const rootReducer = combineReducers({
  player: playerReducer
})

export default rootReducer;