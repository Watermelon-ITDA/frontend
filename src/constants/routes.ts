export const ROUTES = {
  LOGIN: '/login',
  HOME: '/',
  HELP: '/help',
  CHAT: '/chat',
  CHATROOM_PATH: '/chat/:roomId',
  CHATROOM: (roomId: string) => `/chat/${roomId}`,
  MYPAGE: '/mypage',
};
