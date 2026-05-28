import Button from '@/components/common/Button';
import { usePlaceSearch } from '@/hooks/usePlaceSearch';
import { loadKakaoScript } from '@/utils/loadMap';
import { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
import KakaoMap from './components/KakaoMap';

const DEFAULT_POSITION = {
  lat: 37.5665,
  lng: 126.978,
};

const HelpPage = () => {
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
        <KakaoMap currentPosition={currentPosition} places={places} />
      )}
    </main>
  );
};

export default HelpPage;
