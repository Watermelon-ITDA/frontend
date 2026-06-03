import defaultProfile from '@/assets/icons/default-profile.png';
import type { PinInfo } from '@/types/help';
import { CustomOverlayMap } from 'react-kakao-maps-sdk';

interface Props {
  pinInfo: PinInfo[];
  filter: number;
}

const HelpMarkers = ({ pinInfo, filter }: Props) => {
  const filteredPins = pinInfo.filter((pin) => {
    if (filter === 0) {
      return pin.role === '여행자';
    }

    return pin.role === '동행자';
  });

  return (
    <>
      {filteredPins.map((pin) => (
        <CustomOverlayMap
          key={pin.id}
          position={{
            lat: pin.lat,
            lng: pin.lng,
          }}
        >
          <div className="w-[45px] h-[45px] rounded-full bg-primary flex justify-center items-center shadow-lg cursor-pointer">
            <img
              src={pin.profile || defaultProfile}
              className="w-[35px] h-[35px]"
            />
          </div>
        </CustomOverlayMap>
      ))}
    </>
  );
};

export default HelpMarkers;
