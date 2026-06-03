import type { ReactNode } from 'react';
import { Map } from 'react-kakao-maps-sdk';

interface Props {
  center: {
    lat: number;
    lng: number;
  };
  children?: ReactNode;
  onMapClick?: (lat: number, lng: number) => void;
  height?: string;
}

const KakaoMap = ({
  center,
  children,
  onMapClick,
  height = '280px',
}: Props) => {
  return (
    <Map
      center={center}
      level={3}
      isPanto
      style={{
        width: '100%',
        height,
      }}
      onClick={(_, mouseEvent) => {
        if (!onMapClick) return;

        onMapClick(mouseEvent.latLng.getLat(), mouseEvent.latLng.getLng());
      }}
    >
      {children}
    </Map>
  );
};

export default KakaoMap;
