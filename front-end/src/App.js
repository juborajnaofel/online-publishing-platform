import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './pages/loginpage/LoginPage';
import NotfoundPage from './pages/notfoundpage/NotfoundPage';
import FeedPage from './pages/feedpage/FeedPage';
import RegisterPage from './pages/registerpage/RegisterPage';
import { useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import ProfilePage from './pages/profilepage/ProfilePage';
import PostManagerPage from './pages/postmanagerpage/PostManagerPage';


function App() {
    useEffect(()=>{},[]);

    return (
      <>
        {true?
        (<BrowserRouter>
            <Routes>
              <Route path='/' element={<FeedPage />} />
              <Route path='/profile' element={<ProfilePage/>} />
              <Route path='/posts-manager' element={<PostManagerPage/>} />
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
