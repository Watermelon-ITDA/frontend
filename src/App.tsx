import ChatListPage from '@/pages/ChatListPage';
import ChatRoomPage from '@/pages/ChatRoomPage';
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import MyPage from '@/pages/MyPage';
import OAuthCallbackPage from '@/pages/OAuthCallbackPage';
import RequestPage from '@/pages/RequestPage';
import RoleSelectPage from '@/pages/RoleSelectPage';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/login' replace />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/role-select' element={<RoleSelectPage />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/request' element={<RequestPage />} />
        <Route path='/chat' element={<ChatListPage />} />
        <Route path='/chat/:roomId' element={<ChatRoomPage />} />
        <Route path='/mypage' element={<MyPage />} />
        <Route path='/oauth2/callback' element={<OAuthCallbackPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;