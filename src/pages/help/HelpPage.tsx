import Button from '@/components/common/Button';
import { usePlaceSearch } from '@/hooks/usePlaceSearch';
import { useState } from 'react';
import SearchBar from './components/SearchBar';
import KakaoMap from './components/KakaoMap';
import BottomSheet from '@/components/common/BottomSheet';
import defaultImg from '@/assets/icons/default-profile.png';
import FloatingButton from '@/components/common/FloatingButton';
import Modal from '@/components/common/Modal';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { useCurrentPosition } from '@/hooks/useCurrentPosition';
import PlaceMarkers from './components/PlaceMarker';
import HelpMarkers from './components/HelpMarker';

const HelpPage = () => {
  const navigate = useNavigate();

  const [floatingBtnClicked, setFloatingBtnClicked] = useState(false);

  const [showBottomSheet, setShowBottomSheet] = useState(false);

  const { currentPosition, setCurrentPosition, isLoading } =
    useCurrentPosition();

  const [keyword, setKeyword] = useState('');

  const [selectedBtn, setSelectedBtn] = useState(0);

  const { places, searchPlaces } = usePlaceSearch();

  const typeClicked = (type: number) => {
    if (type === 0) {
      navigate(ROUTES.HELP_REGIST);
    } else if (type === 1) {
    }
  };

  const mock = [
    {
      id: 0,
      role: '여행자',
      profile: '',
      name: '박길동',
      lat: 35.8779,
      lng: 128.6286,
      location: '대구 동구 동대구로 550, 3층',
      content: '동대구역 출구를 못 찾겠어요',
      score: null,
    },
    {
      id: 1,
      role: '여행자',
      profile: '',
      name: '홍길동',
      lat: 35.8785,
      lng: 128.631,
      location: '대구 동구 동대구로 530',
      content: '카드가 안 찍혀서 개찰구를 빠져나올 수가 없어요',
      score: null,
    },
    {
      id: 2,
      role: '동행자',
      profile: '',
      name: '최길동',
      lat: 35.8782,
      lng: 128.6302,
      location: '대구 동구 동대구로 530',
      content: null,
      score: 4.3,
    },
  ];

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

      {!isLoading && (
        <KakaoMap center={currentPosition} height="100vh">
          <PlaceMarkers places={places} />
          <HelpMarkers pinInfo={mock} filter={selectedBtn} />
        </KakaoMap>
      )}

      <Button
        variant="outline"
        className="absolute z-50 bottom-footer left-1/2 -translate-x-1/2 rounded-full shadow-lg"
        onClick={() => setShowBottomSheet(true)}
      >
        목록 보기
      </Button>

      <BottomSheet
        open={showBottomSheet}
        onClose={() => setShowBottomSheet(false)}
      >
        <ul className="grid gap-3">
          {mock.map((item) => (
            <li key={item.id} className="p-4 flex items-center gap-3">
              <img
                className="w-[32px] h-[32px]"
                src={item.profile || defaultImg}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = defaultImg;
                }}
              />

              <div>
                <div className="flex items-end gap-2">
                  <h3>{item.name}</h3>
                  <small className="text-mediumgray">{item.location}</small>
                </div>
                <small className="text-darkgray">{item.content}</small>
              </div>
            </li>
          ))}
        </ul>
      </BottomSheet>

      <FloatingButton
        icon={<span>+</span>}
        onClick={() => setFloatingBtnClicked(true)}
      />

      {floatingBtnClicked && (
        <Modal
          open={floatingBtnClicked}
          onClose={() => setFloatingBtnClicked(false)}
        >
          <div className="grid gap-2 text-center">
            어떤 유형으로 등록하시겠어요?
            <Button className="w-full" onClick={() => typeClicked(0)}>
              도움이 필요한 여행자
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => typeClicked(1)}
            >
              도움을 주는 동행자
            </Button>
          </div>
        </Modal>
      )}
    </main>
  );
};

export default HelpPage;
