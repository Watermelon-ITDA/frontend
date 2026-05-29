import { Route, Routes, useLocation } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import HomePage from '../../pages/home/HomePage';
import HelpPage from '../../pages/help/HelpPage';
import ChatPage from '../../pages/chat/ChatPage';
import MyPage from '../../pages/mypage/MyPage';
import LoginPage from '@/pages/auth/LoginPage';
import Footer from './Footer';
import Header from './Header';

const DefaultLayout = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === ROUTES.LOGIN;

  return (
    <>
      {!isLoginPage && <Header />}
      <Routes>
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.HELP} element={<HelpPage />} />
        <Route path={ROUTES.CHAT} element={<ChatPage />} />
        <Route path={ROUTES.MYPAGE} element={<MyPage />} />
      </Routes>
      {!isLoginPage && <Footer />}
    </>
  );
};

export default DefaultLayout;
