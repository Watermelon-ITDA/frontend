import type { PinInfo } from '@/types/help';
import { CustomOverlayMap, Map, MapMarker } from 'react-kakao-maps-sdk';
import defaultProfile from '@/assets/icons/default-profile.png';

interface KakaoMapProps {
  filter: number;
  currentPosition: { lat: number; lng: number };
  places: kakao.maps.services.PlacesSearchResult;
  pinInfo: PinInfo[];
}

const KakaoMap = ({
  filter,
  currentPosition,
  places,
  pinInfo,
}: KakaoMapProps) => {
  const filteredPins = pinInfo.filter((pin) => {
    if (filter === 0) {
      return pin.role === '여행자';
    }

    return pin.role === '동행자';
  });

  return (
    <>
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

        {filteredPins.map((pin) => (
          <CustomOverlayMap
            key={pin.id}
            position={{
              lat: pin.lat,
              lng: pin.lng,
            }}
          >
            <div
              className="w-[45px] h-[45px] rounded-full bg-primary flex justify-center items-center shadow-lg hover:cursor-pointer"
              onClick={() => console.log('clikced')}
            >
              <img
                src={pin.profile === '' ? defaultProfile : pin.profile}
                className="w-[35px] h-[35px]"
              />
            </div>
          </CustomOverlayMap>
        ))}
      </Map>
    </>
  );
};

export default KakaoMap;
