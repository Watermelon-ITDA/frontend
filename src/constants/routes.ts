export const ROUTES = {
  LOGIN: '/login',
  OAUTH_CALLBACK: '/oauth2/callback',
  LANGUAGE: '/language',
  HOME: '/',
  HELP: '/help',
  HELP_REGIST: '/help/regist',
  CHAT: '/chat',
  CHATROOM_PATH: '/chat/:roomId',
  CHATROOM: (roomId: string) => `/chat/${roomId}`,
  MYPAGE: '/mypage',
};
