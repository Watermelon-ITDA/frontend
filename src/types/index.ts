export type Role = 'traveler' | 'local';

export type HelpTag = 'direction' | 'photo' | 'food' | 'comm' | 'emergency';

export type MatchStatus = 'accepted' | 'in_progress' | 'help_done' | 'completed' | 'cancelled';

export interface User {
  id: string;
  nickname: string;
  email: string;
  role: Role;
  language: string;
  profileImageUrl?: string;
  latitude?: number;
  longitude?: number;
  level: number;
  points: number;
}

export interface HelpRequest {
  id: string;
  userId: string;
  helpTag: HelpTag;
  description: string;
  latitude: number;
  longitude: number;
  status: 'pending' | 'matched' | 'done';
  createdAt: string;
}

export interface Match {
  id: string;
  requestId: string;
  travelerId: string;
  localId: string;
  status: MatchStatus;
  matchedAt: string;
  helpDoneAt?: string;
  completedAt?: string;
  isReviewed: boolean;
}

export interface ChatMessage {
  id: string;
  matchId: string;
  senderId: string;
  content: string;
  translatedContent?: string;
  sentAt: string;
}

export interface ChatRoom {
  matchId: string;
  partner: User;
  lastMessage: string;
  lastMessageAt: string;
  unread: number;
}

export interface MapPin {
  id: string;
  user: User;
  latitude: number;
  longitude: number;
  helpTag?: HelpTag;
  description?: string;
}
