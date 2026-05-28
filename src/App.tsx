import { useLocation } from 'react-router-dom';
import DefaultLayout from './components/layout/DefaultLayout';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import { ROUTES } from './constants/routes';

function App() {
  const location = useLocation();
  const isHelpPage = location.pathname === ROUTES.HELP;

  return (
    <div className="min-h-screen bg-[#e5e7eb] flex justify-center">
      <div className="min-h-screen w-[393px] overflow-hidden bg-white">
        {!isHelpPage && <Header />}
        <DefaultLayout />
        <Footer />
      </div>
    </div>
  );
}

export default App;
