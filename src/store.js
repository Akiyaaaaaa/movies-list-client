import { createStore, applyMiddleware } from "redux";
import { composeWitDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducers from "./reducers";

const middleware = [thunk];

const store = createStore(
  rootReducers,
  composeWitDevTools(applyMiddleware(...middleware))
);

export default store;
