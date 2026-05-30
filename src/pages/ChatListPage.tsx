import { useNavigate } from 'react-router-dom';
import { BottomNav } from '@/components/layout/BottomNav';

const MOCK_ROOMS = [
  {
    id: 'room-1',
    partner: '김지현',
    tag: '길안내',
    lastMessage: '네 알겠어요! 왼쪽 골목으로 쭉 가시면 나와요 😊',
    time: '오전 10:08',
    unread: 2,
    isOnline: true,
    avatar: '🧑‍🦰',
  },
  {
    id: 'room-2',
    partner: '박서연',
    tag: '맛집추천',
    lastMessage: '거기 웨이팅 없을 시간대가 오후 2시~4시 사이예요!',
    time: '어제',
    unread: 0,
    isOnline: true,
    avatar: '👩',
  },
  {
    id: 'room-3',
    partner: '이민준',
    tag: '사진촬영',
    lastMessage: '사진 잘 나왔나요? ㅎㅎ',
    time: '2026-05-28',
    unread: 0,
    isOnline: false,
    avatar: '🧑',
  },
];

export default function ChatListPage() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col bg-white pb-16">
      <div className="px-4 pt-12 pb-2">
        <h1 className="text-2xl font-bold text-gray-900">채팅</h1>
      </div>

      <div className="flex gap-2 px-4 pb-4 pt-2">
        <button className="rounded-full bg-[#E05A47] px-4 py-1.5 text-xs font-semibold text-white">
          전체
        </button>
        <button className="rounded-full bg-gray-100 px-4 py-1.5 text-xs font-semibold text-gray-600">
          안읽음
        </button>
      </div>

      <div className="divide-y divide-gray-50">
        {MOCK_ROOMS.map((room) => (
          <button
            key={room.id}
            onClick={() => navigate(`/chat/${room.id}`)}
            className="flex w-full items-center gap-3 px-4 py-4 text-left transition hover:bg-gray-50 active:bg-gray-100"
          >
            <div className="relative flex-shrink-0">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-2xl">
                {room.avatar}
              </div>
              {room.isOnline && (
                <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-400" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-gray-900">{room.partner}</p>
                  <span className="rounded-full bg-[#FFF0EE] px-2 py-0.5 text-[10px] font-medium text-[#E05A47]">
                    {room.tag}
                  </span>
                </div>
                <p className="text-xs text-gray-400 flex-shrink-0">{room.time}</p>
              </div>
              <p className="truncate text-sm text-gray-500">{room.lastMessage}</p>
            </div>

            {room.unread > 0 && (
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#E05A47] text-[10px] font-bold text-white flex-shrink-0">
                {room.unread}
              </div>
            )}
          </button>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
