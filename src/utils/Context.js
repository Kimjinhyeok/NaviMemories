import { createContext, useReducer } from "react";
import cookies from "../Data/cookies";

const BibleVersionInCookie = cookies.get("bibleVersion");
const InitialContext = {
  version : BibleVersionInCookie,
}
const UserConfigAction = "userAction"

const Context = createContext({});

const Reducer = (state = InitialContext, action) => {
  switch(action.type) {
    case UserConfigAction :
      return {
        ...state,
        version : action.payload
      }
    default :
      return state
  }
}

const Provider = ({children}) => {
  const [state, dispatch] = useReducer(Reducer, InitialContext);
  const value = { state, dispatch };
  return <Context.Provider value={value}>{children}</Context.Provider>
};

export {Context, Provider, UserConfigAction}