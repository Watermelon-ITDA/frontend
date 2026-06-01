export const ROUTES = {
  LOGIN: '/login',
  OAUTH_CALLBACK: '/oauth2/callback',
  HOME: '/',
  HELP: '/help',
  CHAT: '/chat',
  CHATROOM_PATH: '/chat/:roomId',
  CHATROOM: (roomId: string) => `/chat/${roomId}`,
  MYPAGE: '/mypage',
};
