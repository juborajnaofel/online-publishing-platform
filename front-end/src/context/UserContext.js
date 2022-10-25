import { createContext, useState } from "react";


export const UserContext = createContext({
    login_trigger: false,
    setlogin_trigger: ()=> {},
});


export default function UserContextProvider({children}){
    const [login, setlogin] = useState(false);

    function setlogin_trigger(){
        setlogin(!login);
    }

    const value = {
        login_trigger: login,
        setlogin_trigger: setlogin_trigger,
    }

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>

}