import arrowIcon from '@/assets/icons/common/arrow-left.png';
import { useNavigate } from 'react-router-dom';

const BackHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 z-50 w-[393px] bg-white/60 backdrop-blur-md px-2 py-3">
      <img
        src={arrowIcon}
        className="w-[32px] h-[32px] object-contain hover:cursor-pointer"
        onClick={() => navigate(-1)}
      />
    </header>
  );
};

export default BackHeader;
