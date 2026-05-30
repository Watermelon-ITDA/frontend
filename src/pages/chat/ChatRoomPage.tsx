import { Client } from '@stomp/stompjs';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SockJS from 'sockjs-client';

interface Message {
  id: string;
  senderId: string;
  content: string;
  sentAt: string;
  translatedContent?: string;
}

export default function ChatRoomPage() {
  const navigate = useNavigate();
  const { roomId } = useParams<{ roomId: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [connected, setConnected] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const clientRef = useRef<Client | null>(null);

  const myId = localStorage.getItem('userId') ?? '';
  const token = localStorage.getItem('token') ?? '';

  // 이전 채팅 내역 불러오기
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/api/chat/${roomId}/messages`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        const data = await res.json();
        setMessages(
          data.map((m: Message & { sentAt: string }) => ({
            ...m,
            sentAt: new Date(m.sentAt).toLocaleTimeString('ko-KR', {
              hour: '2-digit',
              minute: '2-digit',
            }),
          })),
        );
      } catch (e) {
        console.error('채팅 내역 불러오기 실패', e);
      }
    };
    fetchMessages();
  }, [roomId, token]);

  // WebSocket 연결
  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      onConnect: () => {
        setConnected(true);
        // 채팅방 구독
        client.subscribe(`/topic/chat/${roomId}`, (msg) => {
          const received = JSON.parse(msg.body);
          setMessages((prev) => [
            ...prev,
            {
              ...received,
              sentAt: new Date(received.sentAt).toLocaleTimeString('ko-KR', {
                hour: '2-digit',
                minute: '2-digit',
              }),
            },
          ]);
        });
      },
      onDisconnect: () => setConnected(false),
    });

    client.activate();
    clientRef.current = client;

    return () => {
      client.deactivate();
    };
  }, [roomId, token]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = () => {
    if (!input.trim() || !clientRef.current?.connected) return;

    clientRef.current.publish({
      destination: '/app/chat.send',
      body: JSON.stringify({
        matchId: roomId,
        content: input,
      }),
    });
    setInput('');
  };

  return (
    <div className="flex h-screen flex-col bg-white">
      {/* 헤더 */}
      <div className="flex items-center gap-3 border-b border-gray-100 px-4 pt-12 pb-3">
        <button onClick={() => navigate(-1)} className="text-xl text-gray-600">
          ←
        </button>
        <div className="flex items-center gap-2 flex-1">
          <div className="relative">
            <div className="h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center text-lg">
              🧑‍🦰
            </div>
            <div
              className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white ${connected ? 'bg-green-400' : 'bg-gray-300'}`}
            />
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-sm">김지현</p>
            <p
              className={`text-[10px] ${connected ? 'text-green-500' : 'text-gray-400'}`}
            >
              {connected ? '온라인' : '연결 중...'}
            </p>
          </div>
        </div>
        <span className="rounded-full bg-[#FFF0EE] px-2 py-1 text-[10px] font-medium text-primary]">
          🗺 길안내
        </span>
      </div>

      {/* 메시지 목록 */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gray-50">
        {messages.map((msg) => {
          const isMe = msg.senderId === myId;
          return (
            <div
              key={msg.id}
              className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
            >
              {!isMe && (
                <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-base mr-2 flex-shrink-0 self-end mb-1">
                  🧑‍🦰
                </div>
              )}
              <div
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} max-w-[72%]`}
              >
                <div
                  className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    isMe
                      ? 'rounded-tr-sm bg-primary text-white'
                      : 'rounded-tl-sm bg-white text-gray-800 shadow-sm'
                  }`}
                >
                  {msg.content}
                </div>
                {msg.translatedContent && (
                  <p className="text-[10px] text-gray-400 mt-0.5 px-1">
                    → {msg.translatedContent}
                  </p>
                )}
                <span className="text-[10px] text-gray-400 mt-1">
                  {msg.sentAt}
                </span>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* 입력창 */}
      <div className="flex items-center gap-2 border-t border-gray-100 bg-white px-4 py-3">
        <button className="text-xl text-gray-400">+</button>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
          placeholder="메시지 입력..."
          className="flex-1 rounded-full bg-gray-100 px-4 py-2.5 text-sm text-gray-700 outline-none"
        />
        <button
          onClick={send}
          className={`flex h-9 w-9 items-center justify-center rounded-full transition ${
            input.trim() && connected
              ? 'bg-[#E05A47] text-white'
              : 'bg-gray-200 text-gray-400'
          }`}
        >
          ➤
        </button>
      </div>
    </div>
  );
}
