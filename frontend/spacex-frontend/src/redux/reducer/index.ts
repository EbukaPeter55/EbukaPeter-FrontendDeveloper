import { combineReducers } from "@reduxjs/toolkit";
import capsuleReducer from "../capsule";

const rootReducer = combineReducers({
  capsule: capsuleReducer,
});

export default rootReducer;
