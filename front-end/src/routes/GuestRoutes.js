import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from '../pages/loginpage/LoginPage';
import NotfoundPage from '../pages/notfoundpage/NotfoundPage';
import RegisterPage from '../pages/registerpage/RegisterPage';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

export default function GuestRoutes(){
    return (<BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='*' element={<NotfoundPage/>} />
        </Routes>
      </BrowserRouter>);
}