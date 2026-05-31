import Button from '@/components/common/Button';
import { ROUTES } from '@/constants/routes';
import { useNavigate } from 'react-router-dom';

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
    <div className="flex min-h-screen flex-col bg-white pt-header">
      <div className="flex gap-2 px-4 pb-4 pt-2">
        <Button className="rounded-full px-4 py-1.5 text-xs">전체</Button>
        <Button className="rounded-full bg-lightgray/30 text-xs text-darkgray">
          안읽음
        </Button>
      </div>

      <ul>
        {MOCK_ROOMS.map((room) => (
          <li
            key={room.id}
            className="flex w-full items-center gap-3 px-4 py-4 hover:bg-lightgray/20 active:bg-lightgray/30"
            onClick={() => navigate(ROUTES.CHATROOM(room.id))}
          >
            {/* 프로필 */}
            <div className="relative flex-shrink-0">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-2xl">
                {room.avatar}
              </div>
              {room.isOnline && (
                <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-400" />
              )}
            </div>

            <div className="flex flex-1 items-center justify-between min-w-0">
              {/* 이름, 메시지 내용 */}
              <div className="min-w-0 flex-1 grid gap-1">
                <div className="flex gap-1">
                  <strong>{room.partner}</strong>

                  <div className="flex items-center justify-center rounded-full bg-primary/10 px-2 text-primary">
                    <small className="text-xs">{room.tag}</small>
                  </div>
                </div>

                <small className="block truncate text-darkgray">
                  {room.lastMessage}
                </small>
              </div>

              {/* 시간, 안 읽은 메시지 수 */}
              <div className="ml-3 flex flex-col items-end flex-shrink-0">
                <small className="whitespace-nowrap text-mediumgray text-xs">
                  {room.time}
                </small>

                {room.unread > 0 && (
                  <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                    {room.unread}
                  </div>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
