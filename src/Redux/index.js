import { combineReducers } from "redux";
import HideOptionsReducer from "./hideOptions";
import { KEY_HIDE_OPTIONS } from "./hideOptions/action";

const rootReducer = combineReducers({
  [KEY_HIDE_OPTIONS] : HideOptionsReducer,
})

export default rootReducer;