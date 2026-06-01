import Button from '@/components/common/Button';
import { useState } from 'react';
import Modal from '@/components/common/Modal';

const LoginPage = () => {
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  };

  return (
    <>
      <main className="relative h-full px-7">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-3 text-center">
          <h1 className="text-4xl font-bold text-primary font-['CookieRun']">
            잇다
          </h1>
          <h2 className="text-2xl">여행중 막막한 순간</h2>
          <h2>
            <span className="text-primary font-['CookieRun']">잇다</span>{' '}
            동행자에게 도움을 요청하고 ~~해보세요
          </h2>
        </div>

        <div className="absolute bottom-40 left-7 right-7 grid text-center gap-4">
          <Button
            variant="outline"
            className="w-full py-3 px-5 text-sm flex justify-start gap-3 rounded-xl"
            onClick={() => handleGoogleLogin()}
          >
            <svg width="20" height="20" viewBox="0 0 18 18">
              <path
                fill="#4285F4"
                d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 002.38-5.88c0-.57-.05-.66-.15-1.18z"
              />
              <path
                fill="#34A853"
                d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 01-7.18-2.54H1.83v2.07A8 8 0 008.98 17z"
              />
              <path
                fill="#FBBC05"
                d="M4.5 10.52a4.8 4.8 0 010-3.04V5.41H1.83a8 8 0 000 7.18l2.67-2.07z"
              />
              <path
                fill="#EA4335"
                d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 001.83 5.4L4.5 7.49a4.77 4.77 0 014.48-3.31z"
              />
            </svg>
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
