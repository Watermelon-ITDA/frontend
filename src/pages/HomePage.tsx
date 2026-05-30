import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from '@/components/layout/BottomNav';
import { useAuthStore } from '@/stores/authStore';
import type { HelpTag } from '@/types';

const MOCK_PINS = [
  { id: '1', role: 'local' as const, top: '28%', left: '32%', nickname: '김지현', tag: 'direction' as HelpTag, distance: '도보 3분', rating: 4.9 },
  { id: '2', role: 'local' as const, top: '45%', left: '55%', nickname: '박서연', tag: 'food' as HelpTag, distance: '도보 7분', rating: 4.7 },
  { id: '3', role: 'local' as const, top: '62%', left: '25%', nickname: '이민준', tag: 'photo' as HelpTag, distance: '도보 5분', rating: 5.0 },
  { id: '4', role: 'traveler' as const, top: '35%', left: '68%', nickname: '山田太郎', tag: 'comm' as HelpTag, distance: '도보 2분', rating: 0 },
];

const TAG_EMOJI: Record<HelpTag, string> = {
  direction: '🗺',
  photo: '📸',
  food: '🍜',
  comm: '💬',
  emergency: '🆘',
};

const TAG_LABEL: Record<HelpTag, string> = {
  direction: '길안내',
  photo: '사진촬영',
  food: '맛집추천',
  comm: '소통지원',
  emergency: '긴급상황',
};

interface PopupPin {
  id: string;
  nickname: string;
  tag: HelpTag;
  role: 'local' | 'traveler';
  distance: string;
  rating: number;
}

export default function HomePage() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const [activeFilter, setActiveFilter] = useState<'traveler' | 'local' | null>(null);
  const [popup, setPopup] = useState<PopupPin | null>(null);

  const filtered = MOCK_PINS.filter((p) =>
    activeFilter ? p.role === activeFilter : true
  );

  return (
    <div className="relative flex h-screen flex-col overflow-hidden bg-gray-100">
      <div className="relative flex-1 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #f0ede8 25%, #e8e4dd 25%, #e8e4dd 50%, #f0ede8 50%, #f0ede8 75%, #e8e4dd 75%)',
            backgroundSize: '40px 40px',
          }}
        />
        <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
          <line x1="20%" y1="0" x2="35%" y2="100%" stroke="#ccc" strokeWidth="8"/>
          <line x1="0" y1="40%" x2="100%" y2="55%" stroke="#ccc" strokeWidth="6"/>
          <line x1="60%" y1="0" x2="70%" y2="100%" stroke="#ccc" strokeWidth="5"/>
          <line x1="0" y1="70%" x2="100%" y2="75%" stroke="#ccc" strokeWidth="4"/>
          <rect x="38%" y="20%" width="18%" height="12%" fill="#d4cfc8" rx="2"/>
          <rect x="55%" y="45%" width="14%" height="10%" fill="#d4cfc8" rx="2"/>
        </svg>

        {/* 검색바 */}
        <div className="absolute left-4 right-4 top-4 z-10">
          <div className="flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-md">
            <span className="text-gray-400">🔍</span>
            <span className="text-sm text-gray-400">위치 검색</span>
          </div>
        </div>

        {/* 필터 */}
        <div className="absolute left-4 top-20 z-10 flex gap-2">
          <button
            onClick={() => setActiveFilter(activeFilter === 'traveler' ? null : 'traveler')}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold shadow transition ${
              activeFilter === 'traveler' ? 'bg-[#E05A47] text-white' : 'bg-white text-gray-700'
            }`}
          >
            ✈️ 여행자
          </button>
          <button
            onClick={() => setActiveFilter(activeFilter === 'local' ? null : 'local')}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold shadow transition ${
              activeFilter === 'local' ? 'bg-[#E05A47] text-white' : 'bg-white text-gray-700'
            }`}
          >
            📍 동행자
          </button>
        </div>

        {/* 핀 */}
        {filtered.map((pin) => (
          <button
            key={pin.id}
            onClick={() => setPopup(popup?.id === pin.id ? null : pin)}
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
            style={{ top: pin.top, left: pin.left }}
          >
            <div className={`flex h-10 w-10 items-center justify-center rounded-full border-2 border-white shadow-lg transition-transform active:scale-90 ${
              pin.role === 'local' ? 'bg-[#E05A47]' : 'bg-gray-500'
            }`}>
              <span className="text-base">{TAG_EMOJI[pin.tag]}</span>
            </div>
          </button>
        ))}

        {/* 팝업 */}
        {popup && (
          <div className="absolute z-20 w-60 rounded-2xl bg-white p-4 shadow-xl" style={{ top: '35%', left: '50%', transform: 'translateX(-50%)' }}>
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FFF0EE] text-xl">
                {popup.role === 'local' ? '🧑' : '✈️'}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{popup.nickname}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="rounded-full bg-[#FFF0EE] px-2 py-0.5 text-[10px] font-medium text-[#E05A47]">
                    {TAG_EMOJI[popup.tag]} {TAG_LABEL[popup.tag]}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between mb-3 text-xs text-gray-500">
              <span>📍 {popup.distance}</span>
              {popup.rating > 0 && <span>⭐ {popup.rating}</span>}
            </div>
            <div className="flex gap-2">
              <button onClick={() => setPopup(null)} className="flex-1 rounded-xl border border-gray-200 py-2 text-xs font-medium text-gray-600">
                닫기
              </button>
              <button onClick={() => navigate('/request')} className="flex-1 rounded-xl bg-[#E05A47] py-2 text-xs font-medium text-white">
                도움 요청
              </button>
            </div>
          </div>
        )}

        <button className="absolute bottom-24 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg">
          <span className="text-lg">📍</span>
        </button>
        <button className="absolute bottom-24 left-1/2 z-10 -translate-x-1/2 flex items-center gap-2 rounded-full bg-white px-5 py-2.5 shadow-lg">
          <span className="text-sm">☰</span>
          <span className="text-sm font-medium text-gray-700">목록 보기</span>
        </button>
        <button onClick={() => navigate('/request')} className="absolute bottom-36 right-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-[#E05A47] shadow-lg text-white text-2xl">
          +
        </button>
      </div>

      {/* 현재 위치 카드 */}
      {!popup && (
        <div className="absolute bottom-16 left-4 right-4 z-10">
          <div className="rounded-2xl bg-[#E05A47] p-4 shadow-xl">
            <p className="text-xs font-medium text-red-100 mb-1">📍 현재 위치</p>
            <p className="text-lg font-bold text-white">경주시 황남동 일대</p>
            <p className="text-xs text-red-100 mt-0.5 mb-3">주변에 동행자 {filtered.filter(p => p.role === 'local').length}명이 있어요!</p>
            <button onClick={() => navigate('/request')} className="flex w-full items-center justify-between rounded-xl bg-white/20 px-4 py-2.5 text-sm font-semibold text-white">
              도움 요청하기 →
            </button>
          </div>
        </div>
      )}

      {user && (
        <div className="absolute top-4 right-4 z-20">
          <div className="h-8 w-8 rounded-full bg-[#E05A47] flex items-center justify-center text-white text-xs font-bold shadow">
            {user.nickname[0]}
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
