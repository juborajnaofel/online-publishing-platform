import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './pages/loginpage/LoginPage';
import NotfoundPage from './pages/notfoundpage/NotfoundPage';
import ProfilePage from './pages/profilepage/ProfilePage';
import RegisterPage from './pages/registerpage/RegisterPage';
import { useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";


function App() {
    useEffect(()=>{},[]);

    return (
      <>
        {false?
        (<BrowserRouter>
            <Routes>
              <Route path='/' element={<ProfilePage />} />
              <Route path='*' element={<NotfoundPage/>} />
            </Routes>
          </BrowserRouter>):
          (<BrowserRouter>
            <Routes>
              <Route path='/' element={<LoginPage />} />
              <Route path='/register' element={<RegisterPage />} />
              <Route path='*' element={<NotfoundPage/>} />
            </Routes>
          </BrowserRouter>)
        }
      </>
    );
}

export default App;
