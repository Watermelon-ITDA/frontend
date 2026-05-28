import { Map, MapMarker } from 'react-kakao-maps-sdk';

interface KakaoMapProps {
  currentPosition: { lat: number; lng: number };
  places: kakao.maps.services.PlacesSearchResult;
}

const KakaoMap = ({ currentPosition, places }: KakaoMapProps) => {
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
      </Map>
    </>
  );
};

export default KakaoMap;
