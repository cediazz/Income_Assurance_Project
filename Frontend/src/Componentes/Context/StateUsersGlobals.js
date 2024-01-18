import React, {useState} from "react";

export const EstadoUsersGlobal = React.createContext('default')

export  function ContextUser({children}){
   
    const [data,setData] = useState('default')

    return(
        <EstadoUsersGlobal.Provider value={{data,setData}}>
            {children}
        </EstadoUsersGlobal.Provider>
    )
}

