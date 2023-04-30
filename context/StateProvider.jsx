import { createContext } from "react";


export const StateContext = createContext();


const StateProvider = ({children}) => {
   return (
      <StateContext.Provider>
         {children}
      </StateContext.Provider>
   )
}

export default StateProvider