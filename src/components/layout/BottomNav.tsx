import { useLocation, useNavigate } from 'react-router-dom';

const TABS = [
  { path: '/home', label: '홈', icon: '🏠' },
  { path: '/request', label: '도움 요청', icon: '🔔' },
  { path: '/chat', label: '채팅', icon: '💬' },
  { path: '/mypage', label: '마이페이지', icon: '👤' },
];

export function BottomNav() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center border-t border-gray-100 bg-white">
      {TABS.map((tab) => {
        const active = pathname.startsWith(tab.path);
        return (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            className="flex flex-1 flex-col items-center justify-center gap-0.5"
          >
            <span className="text-xl">{tab.icon}</span>
            <span
              className={`text-[10px] font-medium ${
                active ? 'text-[#E05A47]' : 'text-gray-400'
              }`}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
