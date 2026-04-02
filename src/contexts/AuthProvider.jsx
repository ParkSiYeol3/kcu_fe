import { useEffect, createContext, useState } from "react";
import { onAuthStateChange } from "../services/auth";

export const AuthContext = createContext();

export default function AuthProvider({children}) {
    const [user, setUser] = useState(null);
    
    useEffect(()=>{
        const unsubscribe = onAuthStateChange((loginUser)=>{
          console.log("onAuthStateChange 실행")
          console.log(loginUser)
          setUser(loginUser);
        })
        return ()=>unsubscribe()
      }, [])
    return (
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}