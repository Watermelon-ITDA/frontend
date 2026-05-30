import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import type { Role } from '@/types';

export default function RoleSelectPage() {
  const [selected, setSelected] = useState<Role>('traveler');
  const navigate = useNavigate();
  const setRole = useAuthStore((s) => s.setRole);

  const handleComplete = () => {
    setRole(selected);
    navigate('/home');
  };

  return (
    <div className="flex min-h-screen flex-col bg-white px-6 pt-20">
      <h2 className="mb-8 text-xl font-bold text-gray-900">
        어떤 역할로 시작할까요?
      </h2>

      <div className="space-y-3">
        {/* 여행자 */}
        <button
          onClick={() => setSelected('traveler')}
          className={`flex w-full items-center gap-4 rounded-2xl border-2 p-4 transition ${
            selected === 'traveler'
              ? 'border-[#E05A47] bg-[#FFF5F3]'
              : 'border-gray-200 bg-white'
          }`}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FFF0EE] text-2xl">
            ✈️
          </div>
          <div className="text-left">
            <p className="font-semibold text-gray-900">여행자</p>
            <p className="text-sm text-gray-500">현지인에게 도움 요청</p>
          </div>
          {selected === 'traveler' && (
            <span className="ml-auto text-[#E05A47] text-xl">✓</span>
          )}
        </button>

        {/* 동행자 */}
        <button
          onClick={() => setSelected('local')}
          className={`flex w-full items-center gap-4 rounded-2xl border-2 p-4 transition ${
            selected === 'local'
              ? 'border-[#E05A47] bg-[#FFF5F3]'
              : 'border-gray-200 bg-white'
          }`}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FFF0EE] text-2xl">
            📍
          </div>
          <div className="text-left">
            <p className="font-semibold text-gray-900">동행자</p>
            <p className="text-sm text-gray-500">여행자에게 도움 제공</p>
          </div>
          {selected === 'local' && (
            <span className="ml-auto text-[#E05A47] text-xl">✓</span>
          )}
        </button>
      </div>

      <p className="mt-4 text-center text-xs text-gray-400">
        나중에 앱 내에서 변경 가능
      </p>

      <button
        onClick={handleComplete}
        className="mt-auto mb-10 w-full rounded-2xl bg-[#E05A47] py-4 text-base font-semibold text-white transition active:scale-95"
      >
        완료
      </button>
    </div>
  );
}
