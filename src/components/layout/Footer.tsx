import homeIcon from '@/assets/icons/footer/home-button.png';
import homeActiveIcon from '@/assets/icons/footer/home-button-active.png';
import sirenIcon from '@/assets/icons/footer/siren.png';
import sirenActiveIcon from '@/assets/icons/footer/siren-active.png';
import chatIcon from '@/assets/icons/footer/chat-bubble.png';
import chatActiveIcon from '@/assets/icons/footer/chat-bubble-active.png';
import myIcon from '@/assets/icons/footer/person.png';
import myActiveIcon from '@/assets/icons/footer/person-active.png';
import { ROUTES } from '../../constants/routes';
import { useLocation, useNavigate } from 'react-router-dom';

const navItems = [
  {
    id: 0,
    label: '홈',
    icon: homeIcon,
    iconActive: homeActiveIcon,
    path: ROUTES.HOME,
  },
  {
    id: 1,
    label: '도움요청',
    icon: sirenIcon,
    iconActive: sirenActiveIcon,
    path: ROUTES.HELP,
  },
  {
    id: 2,
    label: '채팅',
    icon: chatIcon,
    iconActive: chatActiveIcon,
    path: ROUTES.CHAT,
  },
  {
    id: 3,
    label: '내정보',
    icon: myIcon,
    iconActive: myActiveIcon,
    path: ROUTES.MYPAGE,
  },
];

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 z-50 w-[393px] bg-white px-1 py-2 border-t border-lightgray">
      <ul className="grid grid-cols-4 gap-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <li
              key={item.id}
              onClick={() => navigate(item.path)}
              className="flex cursor-pointer flex-col items-center justify-center gap-1"
            >
              <img
                src={isActive ? item.iconActive : item.icon}
                className="h-[28px] w-[28px] object-contain"
              />

              <small
                className={`text-xs ${
                  isActive ? 'text-primary' : 'text-darkgray'
                }`}
              >
                {item.label}
              </small>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Footer;
