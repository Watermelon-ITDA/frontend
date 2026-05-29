import Button from '@/components/common/Button';
import googleLogo from '@/assets/icons/auth/google-color.svg';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <>
      <main className="relative h-full px-7">
        {/* 가운데 고정 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-3 text-center">
          <h1 className="text-4xl font-bold text-primary">잇다</h1>
          <h2 className="text-2xl">여행중 막막한 순간</h2>
          <h2>
            <span className="text-primary">잇다</span> 동행자에게 도움을
            요청하고 ~~해보세요
          </h2>
        </div>

        <div className="absolute bottom-30 left-7 right-7 grid text-center gap-4">
          <Button className="w-full py-3 text-md flex justify-start gap-3">
            <img
              src={googleLogo}
              className="w-[20px] h-[20px] object-contain"
            />
            Google로 계속하기
          </Button>

          <small className="text-darkgray">
            이미 계정이 있나요? <Link to="">로그인</Link>
          </small>
        </div>
      </main>
    </>
  );
};

export default LoginPage;
