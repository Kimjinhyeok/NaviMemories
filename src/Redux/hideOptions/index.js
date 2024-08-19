import createReducer from "../createReducer"
import { ACT_HIDE_TOGGLE } from "./action"

const initState = {
  cv : false,
  cn : false,
}
const setHideOptions = (state, action) => {
  const payload = action.payload;
  state.cn = payload.cn;
  state.cv = payload.cv;
}

const HideOptionsReducer = createReducer(initState, {
  [ACT_HIDE_TOGGLE] : setHideOptions
})

export default HideOptionsReducer;