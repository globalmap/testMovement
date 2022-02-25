import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";
import thunk from "redux-thunk";
import { middleware } from "./middleware";

const middleWareList = [
	thunk,
	middleware
];

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleWareList)));

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch