import { useState } from 'react';

export const usePlaceSearch = () => {
  const [places, setPlaces] = useState<kakao.maps.services.PlacesSearchResult>(
    [],
  );

  const searchPlaces = (keyword: string, onMove: (pos: any) => void) => {
    if (!keyword.trim()) return;

    const ps = new window.kakao.maps.services.Places();

    ps.keywordSearch(
      keyword,
      (
        data: kakao.maps.services.PlacesSearchResult,
        status: kakao.maps.services.Status,
      ) => {
        if (status === window.kakao.maps.services.Status.OK) {
          setPlaces(data);

          // 첫 검색 결과로 지도 이동
          onMove({
            lat: Number(data[0].y),
            lng: Number(data[0].x),
          });
        }
      },
    );
  };

  return {
    places,
    searchPlaces,
  };
};
