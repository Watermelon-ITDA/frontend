import { BottomNav } from '@/components/layout/BottomNav';
import { HelpTagBadge } from '@/components/ui/HelpTagBadge';
import { useAuthStore } from '@/stores/authStore';

export default function MyPage() {
  const user = useAuthStore((s) => s.user);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white px-4 pt-12 pb-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">마이페이지</h1>
          <button className="text-gray-400 text-xl">⚙️</button>
        </div>
      </div>

      {/* 프로필 카드 */}
      <div className="mx-4 mt-4 rounded-2xl bg-white p-5 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FFF0EE] text-3xl">
            {user?.profileImageUrl
              ? <img src={user.profileImageUrl} className="h-16 w-16 rounded-full object-cover" alt="프로필" />
              : '👤'
            }
          </div>
          <div>
            <p className="text-lg font-bold text-gray-900">{user?.nickname ?? '여행자'}</p>
            <p className="text-sm text-gray-500">
              {user?.role === 'LOCAL' ? '🏠 동행자' : '✈️ 여행자'} · 포인트{' '}
              <span className="font-semibold text-[#E05A47]">{user?.points ?? 0}p</span>
            </p>
          </div>
          <button className="ml-auto text-xs text-gray-400 border border-gray-200 rounded-full px-3 py-1.5">
            프로필 수정
          </button>
        </div>

        <div className="mt-4 grid grid-cols-3 divide-x divide-gray-100 rounded-xl bg-gray-50 py-3">
          {[
            { label: '요청 횟수', value: '12' },
            { label: '평균 별점', value: '4.9' },
            { label: '방문 도시', value: '3' },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-0.5">
              <p className="text-xl font-bold text-gray-900">{s.value}</p>
              <p className="text-xs text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 동행자 레벨 */}
      {user?.role === 'LOCAL' && (
        <div className="mx-4 mt-3 rounded-2xl bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-gray-700">🏆 로컬히어로 레벨 {user.level}</p>
            <p className="text-xs text-gray-400">22 / 60 도움</p>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
            <div className="h-full rounded-full bg-[#E05A47] transition-all" style={{ width: '37%' }} />
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <HelpTagBadge tag="direction" size="sm" />
            <HelpTagBadge tag="food" size="sm" />
            <HelpTagBadge tag="photo" size="sm" />
          </div>
        </div>
      )}

      {/* 최근 도움 내역 */}
      <div className="mx-4 mt-3 rounded-2xl bg-white p-5 shadow-sm">
        <p className="mb-3 text-sm font-semibold text-gray-700">최근 도움 내역</p>
        {[
          { tag: '사진 촬영', place: '부산 해운대', partner: '이민준', rating: 5, when: '3일 전', emoji: '📸' },
          { tag: '맛집 추천', place: '경주 황리단길', partner: '박서연', rating: 5, when: '1주 전', emoji: '🍜' },
          { tag: '길 안내', place: '서울 홍대', partner: '김지현', rating: 4, when: '2주 전', emoji: '🗺' },
        ].map((h, i) => (
          <div key={i} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-[#FFF0EE] flex items-center justify-center text-lg">
                {h.emoji}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{h.tag} · {h.place}</p>
                <p className="text-xs text-gray-400">{h.partner} · {h.when}</p>
              </div>
            </div>
            <span className="text-yellow-400 text-sm">{'★'.repeat(h.rating)}</span>
          </div>
        ))}
      </div>

      {/* 설정 메뉴 */}
      <div className="mx-4 mt-3 rounded-2xl bg-white shadow-sm overflow-hidden">
        {[
          { icon: '🔔', label: '알림 설정' },
          { icon: '🌐', label: '언어 설정' },
          { icon: '🔒', label: '개인정보 처리방침' },
          { icon: '📞', label: '고객센터' },
          { icon: '🚪', label: '로그아웃', danger: true },
        ].map((item, i) => (
          <button key={i} className={`flex w-full items-center justify-between px-5 py-4 border-b border-gray-50 last:border-0 ${item.danger ? 'text-red-400' : 'text-gray-700'}`}>
            <div className="flex items-center gap-3">
              <span>{item.icon}</span>
              <span className="text-sm font-medium">{item.label}</span>
            </div>
            {!item.danger && <span className="text-gray-300">›</span>}
          </button>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
