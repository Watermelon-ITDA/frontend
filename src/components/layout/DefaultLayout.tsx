import { Route, Routes } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import HomePage from '../../pages/home/HomePage';
import HelpPage from '../../pages/help/HelpPage';
import ChatPage from '../../pages/chat/ChatPage';
import MyPage from '../../pages/mypage/MyPage';
import LoginPage from '@/pages/auth/LoginPage';
import Footer from './Footer';
import Header from './Header';

const DefaultLayout = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.HELP} element={<HelpPage />} />
        <Route path={ROUTES.CHAT} element={<ChatPage />} />
        <Route path={ROUTES.MYPAGE} element={<MyPage />} />
      </Routes>
      <Footer />
    </>
  );
};

export default DefaultLayout;
