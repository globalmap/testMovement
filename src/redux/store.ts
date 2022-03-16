import { applyMiddleware, createStore } from "redux";
import rootReducer from "./reducers";
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from "redux-thunk";
import { playerMiddleware } from "./middleware/player.middleware";

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk, playerMiddleware)));

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export type Store = typeof store;

export default store;