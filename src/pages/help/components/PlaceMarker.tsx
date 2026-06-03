import { MapMarker } from 'react-kakao-maps-sdk';

interface Props {
  places: kakao.maps.services.PlacesSearchResult;
}

const PlaceMarkers = ({ places }: Props) => {
  return (
    <>
      {places.map((place) => (
        <MapMarker
          key={place.id}
          position={{
            lat: Number(place.y),
            lng: Number(place.x),
          }}
        />
      ))}
    </>
  );
};

export default PlaceMarkers;
