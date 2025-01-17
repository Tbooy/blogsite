import {  createContext, useReducer, useEffect } from "react";

export const AppContext = createContext();

 const AppProvider =({children})=>{
    const initialState ={
        user: null,
        blog: null
    }
  const appReducer = (state,action)=>{
    switch(action.type){
        case "LOGIN":
            return{
                ...state,
                user:action.payload
            }

        case "LOGOUT":
            return{
                ...state,
                user: null
            } 
            default:
                return state   
    }
  }

  useEffect(()=>{
    const user =JSON.parse(localStorage.getItem("pantone"))
    console.log(user)
    if(user){
        dispatch({type: "LOGIN", payload:user})
    }
  }, [])

   const [state, dispatch] = useReducer(appReducer, {num:0})

    return(
        <AppContext.Provider value={{state, dispatch}}>
            {children}
        </AppContext.Provider>
    )
}


export default AppProvider
 