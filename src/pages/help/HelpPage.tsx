import { loadKakaoScript } from '@/utils/loadMap';
import { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

const HelpPage = () => {
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const [currentPosition, setCurrentPosition] = useState({
    lat: 37.5665,
    lng: 126.978,
  });

  useEffect(() => {
    const initMap = async () => {
      await loadKakaoScript();

      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });

          setIsMapLoaded(true);
        },
        () => {
          // 위치 권한 거부 시 기본 위치
          setIsMapLoaded(true);
        },
      );
    };

    initMap();
  }, []);

  return (
    <main className="pt-header">
      {isMapLoaded && (
        <Map
          center={currentPosition}
          style={{
            width: '100%',
            height: '100vh',
          }}
          level={3}
        >
          <MapMarker position={currentPosition} />
        </Map>
      )}
    </main>
  );
};

export default HelpPage;
