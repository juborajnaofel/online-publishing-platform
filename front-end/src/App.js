import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';


import LoggedRoutes from './routes/LoggedRoutes';
import GuestRoutes from './routes/GuestRoutes';


function App() {
    useEffect(()=>{},[]);

    return (
      <>
        {true? <LoggedRoutes/>: <GuestRoutes/>}
      </>
    );
}

export default App;
