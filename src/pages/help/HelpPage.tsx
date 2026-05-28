import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { usePlaceSearch } from '@/hooks/usePlaceSearch';
import { loadKakaoScript } from '@/utils/loadMap';
import { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

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
        {/* 검색 input */}
        <div className="relative">
          <Input
            placeholder="검색어를 입력해 주세요."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') searchPlaces(keyword, setCurrentPosition);
            }}
          />

          <Button
            variant="ghost"
            className="absolute right-1 top-1/2 -translate-y-1/2"
            onClick={() => searchPlaces(keyword, setCurrentPosition)}
          >
            검색
          </Button>
        </div>

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
        <Map
          center={currentPosition}
          isPanto={true}
          style={{
            width: '100%',
            height: '100%',
          }}
          level={3}
        >
          {places.length === 0 ? (
            <MapMarker position={currentPosition} />
          ) : (
            places.map((place) => (
              <MapMarker
                key={place.id}
                position={{
                  lat: Number(place.y),
                  lng: Number(place.x),
                }}
              />
            ))
          )}
        </Map>
      )}
    </main>
  );
};

export default HelpPage;
