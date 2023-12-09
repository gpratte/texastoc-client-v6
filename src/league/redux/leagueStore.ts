import {createStore, applyMiddleware} from "redux";
// @ts-ignore
import reduxImmutableStateInvariant from  "redux-immutable-state-invariant";
import leagueReducer from "./leagueReducer";

const leagueStore = createStore(leagueReducer,
  {},
  applyMiddleware(reduxImmutableStateInvariant()));

export default leagueStore;
