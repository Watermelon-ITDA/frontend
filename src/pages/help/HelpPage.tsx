import Button from '@/components/common/Button';
import { usePlaceSearch } from '@/hooks/usePlaceSearch';
import { loadKakaoScript } from '@/utils/loadMap';
import { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
import KakaoMap from './components/KakaoMap';
import BottomSheet from '@/components/common/BottomSheet';
import defaultImg from '@/assets/icons/default-profile.png';

const DEFAULT_POSITION = {
  lat: 35.8779,
  lng: 128.6286,
};

const HelpPage = () => {
  const [showBottomSheet, setShowBottomSheet] = useState(false);

  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const [currentPosition, setCurrentPosition] = useState(DEFAULT_POSITION);

  const [keyword, setKeyword] = useState('');

  const [selectedBtn, setSelectedBtn] = useState(0);

  const { places, searchPlaces } = usePlaceSearch();

  useEffect(() => {
    const initMap = async () => {
      await loadKakaoScript();

      // 브라우저 GPS 지원 여부 확인
      if (!navigator.geolocation) {
        setIsMapLoaded(true);
        return;
      }

      // 위치 권한 요청
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });

          setIsMapLoaded(true);
        },

        // 위치 권한 거부 or 실패
        () => {
          setCurrentPosition(DEFAULT_POSITION);
          setIsMapLoaded(true);
        },

        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        },
      );
    };

    initMap();
  }, []);

  const mock = [
    {
      id: 0,
      role: '여행자',
      profile: '',
      name: '박길동',
      lat: 35.8779,
      lng: 128.6286,
      location: '대구 동구 동대구로 550, 3층',
      content: '동대구역 출구를 못 찾겠어요',
      score: null,
    },
    {
      id: 1,
      role: '여행자',
      profile: '',
      name: '홍길동',
      lat: 35.8785,
      lng: 128.631,
      location: '대구 동구 동대구로 530',
      content: '카드가 안 찍혀서 개찰구를 빠져나올 수가 없어요',
      score: null,
    },
    {
      id: 2,
      role: '동행자',
      profile: '',
      name: '최길동',
      lat: 35.8782,
      lng: 128.6302,
      location: '대구 동구 동대구로 530',
      content: null,
      score: 4.3,
    },
  ];

  return (
    <main className="relative h-screen w-full">
      <div className="absolute top-4 left-1/2 z-10 w-[90%] -translate-x-1/2 flex flex-col gap-2">
        <SearchBar
          keyword={keyword}
          setKeyword={setKeyword}
          onSearch={() => searchPlaces(keyword, setCurrentPosition)}
        />
        <div className="flex gap-1">
          <Button
            variant={selectedBtn === 0 ? 'primary' : 'outline'}
            onClick={() => setSelectedBtn(0)}
            className="rounded-full"
          >
            여행자
          </Button>

          <Button
            variant={selectedBtn === 1 ? 'primary' : 'outline'}
            onClick={() => setSelectedBtn(1)}
            className="rounded-full"
          >
            동행자
          </Button>
        </div>
      </div>

      {isMapLoaded && (
        <KakaoMap
          filter={selectedBtn}
          currentPosition={currentPosition}
          places={places}
          pinInfo={mock}
        />
      )}

      <Button
        variant="outline"
        className="absolute z-50 bottom-footer left-1/2 -translate-x-1/2 rounded-full shadow-lg"
        onClick={() => setShowBottomSheet(true)}
      >
        목록 보기
      </Button>

      <BottomSheet
        open={showBottomSheet}
        onClose={() => setShowBottomSheet(false)}
      >
        <ul className="grid gap-3">
          {mock.map((item) => (
            <li key={item.id} className="p-4 flex items-center gap-3">
              <img
                className="w-[32px] h-[32px]"
                src={item.profile || defaultImg}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = defaultImg;
                }}
              />

              <div>
                <div className="flex items-end gap-2">
                  <h3>{item.name}</h3>
                  <small className="text-mediumgray">{item.location}</small>
                </div>
                <small className="text-darkgray">{item.content}</small>
              </div>
            </li>
          ))}
        </ul>
      </BottomSheet>
    </main>
  );
};

export default HelpPage;
