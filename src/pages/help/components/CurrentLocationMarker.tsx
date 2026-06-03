import { MapMarker } from 'react-kakao-maps-sdk';

interface Props {
  lat: number;
  lng: number;
}

const CurrentLocationMarker = ({ lat, lng }: Props) => {
  return (
    <MapMarker
      position={{
        lat,
        lng,
      }}
    />
  );
};

export default CurrentLocationMarker;
