import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { helpType } from '@/constants/helpType';
import { useCurrentPosition } from '@/hooks/useCurrentPosition';
import { usePlaceSearch } from '@/hooks/usePlaceSearch';
import { useEffect, useState } from 'react';
import KakaoMap from './components/KakaoMap';
import CurrentLocationMarker from './components/CurrentLocationMarker';
import { LocateFixed } from 'lucide-react';
import Modal from '@/components/common/Modal';

const TravlerRegistPage = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const [selectedHelpType, setSelectedHelpType] = useState<number | null>(null);

  const [address, setAddress] = useState('');

  const { currentPosition, setCurrentPosition, getCurrentLocation, isLoading } =
    useCurrentPosition();

  const { searchPlaces } = usePlaceSearch();

  useEffect(() => {
    if (!window.kakao) return;

    const geocoder = new kakao.maps.services.Geocoder();

    geocoder.coord2Address(
      currentPosition.lng,
      currentPosition.lat,
      (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          setAddress(result[0].address.address_name);
        }
      },
    );
  }, [currentPosition]);

  const handleSearch = () => {
    if (!address.trim()) return;

    searchPlaces(address, setCurrentPosition);
  };

  const handleButton = () => {
    if (selectedHelpType == null) {
      setModalOpen(true);
    }
  };

  return (
    <main className="pt-header px-3 grid gap-4">
      <section className="grid gap-2">
        <h2 className="font-bold text-lg">어떤 도움이 필요하신가요?</h2>

        <ul className="grid grid-cols-5 gap-2">
          {helpType.map((item) => (
            <li key={item.id}>
              <Button
                variant="outline"
                className={`w-full flex-col gap-1 rounded-xl px-2 py-3 ${
                  item.id === selectedHelpType
                    ? 'border-primary'
                    : 'border-lightgray'
                }`}
                onClick={() => {
                  if (selectedHelpType === item.id) {
                    setSelectedHelpType(null);
                  } else {
                    setSelectedHelpType(item.id);
                  }
                }}
              >
                <span className="text-2xl">{item.icon}</span>
                <small>{item.name}</small>
              </Button>
            </li>
          ))}
        </ul>
      </section>

      <section className="grid gap-2">
        <h2 className="font-bold text-lg">내 위치 찾기</h2>

        <div className="flex gap-2">
          <Input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
            className="w-full"
            placeholder="주소를 입력하세요"
          />

          <Button className="w-20" onClick={handleSearch}>
            검색
          </Button>
        </div>

        {!isLoading && (
          <div className="relative">
            <KakaoMap
              center={currentPosition}
              height="240px"
              onMapClick={(lat, lng) => {
                setCurrentPosition({
                  lat,
                  lng,
                });
              }}
            >
              <CurrentLocationMarker
                lat={currentPosition.lat}
                lng={currentPosition.lng}
              />
            </KakaoMap>
            <Button
              variant="outline"
              onClick={getCurrentLocation}
              className="absolute z-51 bottom-3 right-3 rounded-full p-3"
            >
              <LocateFixed size={22} />
            </Button>
          </div>
        )}
      </section>

      <Button className="w-full" onClick={handleButton}>
        등록하기
      </Button>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        footer={
          <Button className="w-full p-2" onClick={() => setModalOpen(false)}>
            확인
          </Button>
        }
      >
        <p className="text-center">⚠️ 도움 유형을 선택해 주세요</p>
      </Modal>
    </main>
  );
};

export default TravlerRegistPage;
