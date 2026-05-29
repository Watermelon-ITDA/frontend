import Button from '@/components/common/Button';
import googleLogo from '@/assets/icons/auth/google-color.svg';
import { useGoogleLogin } from '@react-oauth/google';
import { useState } from 'react';
import Modal from '@/components/common/Modal';

const LoginPage = () => {
  const [showErrorModal, setShowErrorModal] = useState(false);

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
    //   console.log(tokenResponse);
    },

    onError: () => {
      setShowErrorModal(true);
    },
  });
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

        <div className="absolute bottom-40 left-7 right-7 grid text-center gap-4">
          <Button
            className="w-full py-3 text-md flex justify-start gap-3"
            onClick={() => login()}
          >
            <img
              src={googleLogo}
              className="w-[20px] h-[20px] object-contain"
            />
            Google로 계속하기
          </Button>
        </div>

        {showErrorModal && (
          <Modal
            open={showErrorModal}
            onClose={() => setShowErrorModal(false)}
            title="로그인 실패"
            footer={
              <Button
                className="w-full"
                onClick={() => setShowErrorModal(false)}
              >
                확인
              </Button>
            }
          >
            잠시후에 다시 시도해 주세요.
          </Modal>
        )}
      </main>
    </>
  );
};

export default LoginPage;
