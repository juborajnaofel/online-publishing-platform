import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserContextProvider from './context/UserContext';

import Auth from './Auth';
function App() {
    return (
        <UserContextProvider><Auth/></UserContextProvider>
    );
}

export default App;
