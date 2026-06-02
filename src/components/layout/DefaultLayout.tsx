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
import LanguageSelectPage from '@/pages/auth/LanguageSelectPage';

const DefaultLayout = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === ROUTES.LOGIN;
  const isCallbackPage = location.pathname.startsWith(ROUTES.OAUTH_CALLBACK);
  const isLanguageSelectPage = location.pathname === ROUTES.LANGUAGE;
  const isHelpPage = location.pathname === ROUTES.HELP;

  const hideHeader =
    isLoginPage || isCallbackPage || isLanguageSelectPage || isHelpPage;
  const hideFooter = isLoginPage || isCallbackPage || isLanguageSelectPage;

  return (
    <>
      {!hideHeader && <Header />}
      <Routes>
        <Route path={ROUTES.OAUTH_CALLBACK} element={<OAuthCallbackPage />} />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.LANGUAGE} element={<LanguageSelectPage />} />
        <Route
          path={ROUTES.HOME}
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path={ROUTES.HELP}
          element={
            <PrivateRoute>
              <HelpPage />
            </PrivateRoute>
          }
        />
        <Route
          path={ROUTES.CHAT}
          element={
            <PrivateRoute>
              <ChatListPage />
            </PrivateRoute>
          }
        />
        <Route
          path={ROUTES.CHATROOM_PATH}
          element={
            <PrivateRoute>
              <ChatRoomPage />
            </PrivateRoute>
          }
        />
        <Route
          path={ROUTES.MYPAGE}
          element={
            <PrivateRoute>
              <MyPage />
            </PrivateRoute>
          }
        />
      </Routes>
      {!hideFooter && <Footer />}
    </>
  );
};

export default DefaultLayout;
