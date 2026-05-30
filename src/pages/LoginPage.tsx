const LoginPage = () => {
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  };

  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-white px-8'>
      <div className='mb-12 flex flex-col items-center gap-3'>
        <h1 className='text-5xl font-bold text-[#E05A47]'>잇다</h1>
        <p className='text-center text-lg font-medium text-gray-800'>
          여행중 막막한 순간
        </p>
        <p className='text-center text-sm text-gray-500 leading-relaxed'>
          <span className='font-semibold text-[#E05A47]'>잇다</span> 동행자에게 도움을 요청하고
          <br />
          현지인과 즉시 연결되어 보세요!
        </p>
      </div>

      <div className='w-full max-w-xs space-y-3'>
        <button
          onClick={handleGoogleLogin}
          className='flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 active:scale-95'
        >
          <svg width='18' height='18' viewBox='0 0 18 18'>
            <path fill='#4285F4' d='M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 002.38-5.88c0-.57-.05-.66-.15-1.18z'/>
            <path fill='#34A853' d='M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 01-7.18-2.54H1.83v2.07A8 8 0 008.98 17z'/>
            <path fill='#FBBC05' d='M4.5 10.52a4.8 4.8 0 010-3.04V5.41H1.83a8 8 0 000 7.18l2.67-2.07z'/>
            <path fill='#EA4335' d='M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 001.83 5.4L4.5 7.49a4.77 4.77 0 014.48-3.31z'/>
          </svg>
          Google로 계속하기
        </button>

        <p className='text-center text-xs text-gray-400'>
          이미 계정이 있나요?{' '}
          <button onClick={handleGoogleLogin} className='text-[#E05A47] underline'>
            로그인
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;