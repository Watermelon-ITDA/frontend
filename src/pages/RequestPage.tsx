import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from '@/components/layout/BottomNav';
import { HELP_TAG_META } from '@/lib/helpTags';
import type { HelpTag } from '@/types';

const TAGS: HelpTag[] = ['direction', 'photo', 'food', 'comm', 'emergency'];

export default function RequestPage() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<HelpTag | null>(null);
  const [description, setDescription] = useState('');
  const [showDesc, setShowDesc] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-white pb-20">
      <div className="flex items-center gap-3 px-4 pt-12 pb-4 border-b border-gray-100">
        <button onClick={() => navigate(-1)} className="text-xl text-gray-600">←</button>
        <h1 className="text-lg font-bold text-gray-900">도움 요청</h1>
      </div>

      <div className="px-4 space-y-6 pt-4">
        {/* 도움 유형 */}
        <div>
          <p className="mb-3 text-sm font-semibold text-gray-700">어떤 도움이 필요하세요?</p>
          <div className="grid grid-cols-3 gap-2">
            {TAGS.map((tag) => {
              const meta = HELP_TAG_META[tag];
              const isSelected = selected === tag;
              return (
                <button
                  key={tag}
                  onClick={() => setSelected(tag)}
                  className={`flex flex-col items-center gap-2 rounded-2xl border-2 px-3 py-4 text-center transition ${
                    isSelected ? 'border-[#E05A47] bg-[#FFF5F3]' : 'border-gray-100 bg-gray-50'
                  } ${tag === 'emergency' ? 'col-span-3' : ''}`}
                >
                  <span className="text-2xl">{meta.emoji}</span>
                  <span className={`text-xs font-medium ${isSelected ? 'text-[#E05A47]' : 'text-gray-700'}`}>
                    {meta.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 현재 위치 */}
        <div>
          <p className="mb-2 text-sm font-semibold text-gray-700">현재 위치</p>
          <div
            className="relative h-36 w-full overflow-hidden rounded-2xl border border-gray-100"
            style={{
              background: 'linear-gradient(135deg, #f0ede8 25%, #e8e4dd 25%, #e8e4dd 50%, #f0ede8 50%, #f0ede8 75%, #e8e4dd 75%)',
              backgroundSize: '30px 30px',
            }}
          >
            <svg className="absolute inset-0 w-full h-full opacity-30">
              <line x1="30%" y1="0" x2="40%" y2="100%" stroke="#ccc" strokeWidth="6"/>
              <line x1="0" y1="50%" x2="100%" y2="60%" stroke="#ccc" strokeWidth="5"/>
              <rect x="42%" y="20%" width="20%" height="30%" fill="#d4cfc8" rx="2"/>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E05A47] shadow-lg">
                <span className="text-white text-lg">📍</span>
              </div>
            </div>
          </div>
          <div className="mt-2 flex items-center gap-2 rounded-xl bg-gray-50 px-4 py-3 border border-gray-100">
            <span className="text-[#E05A47]">📍</span>
            <span className="text-sm text-gray-700 font-medium">경주시 황남동 일대</span>
            <span className="ml-auto text-xs text-[#E05A47]">현재 위치</span>
          </div>
        </div>

        {/* 상세 설명 */}
        {!showDesc ? (
          <button
            onClick={() => setShowDesc(true)}
            className="w-full rounded-2xl border-2 border-dashed border-gray-200 py-4 text-sm text-gray-400 font-medium"
          >
            + 상황 설명 추가 (선택사항)
          </button>
        ) : (
          <div>
            <p className="mb-2 text-sm font-semibold text-gray-700">상황 설명</p>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="예) 첨성대 근처인데 황리단길 가는 길을 모르겠어요..."
              className="w-full rounded-2xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700 outline-none focus:border-[#E05A47] resize-none h-24"
            />
          </div>
        )}

        {/* 주변 동행자 */}
        {selected && (
          <div>
            <p className="mb-2 text-sm font-semibold text-gray-700">주변 동행자 3명</p>
            <div className="space-y-2">
              {[
                { name: '김지현', distance: '도보 3분', rating: 4.9, count: 47, emoji: '🧑‍🦰' },
                { name: '박서연', distance: '도보 7분', rating: 4.7, count: 23, emoji: '👩' },
                { name: '이민준', distance: '도보 10분', rating: 5.0, count: 12, emoji: '🧑' },
              ].map((local, i) => (
                <div key={i} className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
                  <div className="text-2xl">{local.emoji}</div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">{local.name}</p>
                    <p className="text-xs text-gray-500">⭐ {local.rating} · 도움 {local.count}회 · {local.distance}</p>
                  </div>
                  <button className="rounded-full bg-[#E05A47] px-3 py-1.5 text-xs font-medium text-white">
                    요청
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="fixed bottom-16 left-4 right-4 z-10">
        <button
          onClick={() => selected && navigate('/home')}
          className={`w-full rounded-2xl py-4 text-base font-semibold text-white transition active:scale-95 ${
            selected ? 'bg-[#E05A47]' : 'bg-gray-200 text-gray-400'
          }`}
        >
          {selected ? '근처 동행자 찾기 →' : '도움 유형을 선택해주세요'}
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
