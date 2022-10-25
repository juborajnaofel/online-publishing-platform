import LoggedRoutes from './routes/LoggedRoutes';
import GuestRoutes from './routes/GuestRoutes';

import { UserContext } from './context/UserContext';
import { useContext, useState, useEffect } from 'react';
export default function Auth() {
    const userCtx = useContext(UserContext);
    const [login, setlogin] = useState(false);
    useEffect(()=>{
      if(localStorage.getItem("islogged")==="true"){
         setlogin(true)
      }else{
        setlogin(false)
      }
    },[userCtx.login_trigger]);

    return (
      <>
        {login? 
        <LoggedRoutes/>: 
        <GuestRoutes/>}
      </>
    );
}