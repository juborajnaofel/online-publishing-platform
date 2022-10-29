import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NotfoundPage from '../pages/notfoundpage/NotfoundPage';
import FeedPage from '../pages/feedpage/FeedPage';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import ProfilePage from '../pages/profilepage/ProfilePage';
import PostManagerPage from '../pages/postmanagerpage/PostManagerPage';
import SettingsPage from '../pages/settingspage/SettingsPage';
import CreateNewPostPage from '../pages/createnewpostpage/CreateNewPostPage';
import ChangeMembershipPage from '../pages/changemembershippage/ChangeMembershipPage';
import ViewPostPage from '../pages/viewpostpage/ViewPostPage';
import EditPostPage from '../pages/editpostpage/EditPostPage';

export default function LoggedRoutes(){
    return (<BrowserRouter>
        <Routes>
          <Route path='/' element={<FeedPage />} />
          <Route path='/profile' element={<ProfilePage/>} />
          <Route path='/create-new-post' element={<CreateNewPostPage/>} />
          <Route path='/posts-manager/:tab' element={<PostManagerPage/>} />
          <Route path='/settings' element={<SettingsPage/>} />
          <Route path='/change-membership' element={<ChangeMembershipPage/>} />
          <Route path='/edit/:id' element={<EditPostPage/>} />
          <Route path='/view/:id' element={<ViewPostPage/>} />
          <Route path='*' element={<NotfoundPage/>} />
        </Routes>
      </BrowserRouter>);
}