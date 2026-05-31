import PrivateRoute from '@/components/common/PrivateRoute';
import LoginPage from '@/pages/auth/LoginPage';
import OAuthCallbackPage from '@/pages/auth/OAuthCallbackPage';
import ChatListPage from '@/pages/chat/ChatListPage';
import ChatRoomPage from '@/pages/chat/ChatRoomPage';
import { Route, Routes, useLocation } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import HelpPage from '../../pages/help/HelpPage';
import HomePage from '../../pages/home/HomePage';
import MyPage from '../../pages/mypage/MyPage';
import Footer from './Footer';
import Header from './Header';

const DefaultLayout = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === ROUTES.LOGIN;
  const isCallbackPage = location.pathname.startsWith(ROUTES.OAUTH_CALLBACK);

  return (
    <>
      {!isLoginPage && !isCallbackPage && <Header />}
      <Routes>
        <Route path={ROUTES.OAUTH_CALLBACK} element={<OAuthCallbackPage />} />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.HOME} element={<PrivateRoute><HomePage /></PrivateRoute>} />
        <Route path={ROUTES.HELP} element={<PrivateRoute><HelpPage /></PrivateRoute>} />
        <Route path={ROUTES.CHAT} element={<PrivateRoute><ChatListPage /></PrivateRoute>} />
        <Route path={ROUTES.CHATROOM_PATH} element={<PrivateRoute><ChatRoomPage /></PrivateRoute>} />
        <Route path={ROUTES.MYPAGE} element={<PrivateRoute><MyPage /></PrivateRoute>} />
      </Routes>
      {!isLoginPage && !isCallbackPage && <Footer />}
    </>
  );
};

export default DefaultLayout;