import { produce } from "immer";

export default function createReducer(initState, handleMap) {
  return function(state = initState, action) {
    return produce(state, draft => {
      const handler = handleMap[action.type];
      if(handler) {
        handler(draft, action);
      }
    })
  }
}