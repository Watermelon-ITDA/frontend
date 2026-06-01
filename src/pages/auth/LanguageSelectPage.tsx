import { useState } from 'react';
import Dropdown from '@/components/common/Dropdown';
import Button from '@/components/common/Button';

const LANGUAGE_OPTIONS = [
  {
    value: 'ko',
    label: '한국어',
    flag: '🇰🇷',
  },
  {
    value: 'en',
    label: 'English',
    flag: '🇺🇸',
  },
  {
    value: 'ja',
    label: '日本語',
    flag: '🇯🇵',
  },
  {
    value: 'zh',
    label: '中文',
    flag: '🇨🇳',
  },
  {
    value: 'es',
    label: 'Español',
    flag: '🇪🇸',
  },
  {
    value: 'fr',
    label: 'Français',
    flag: '🇫🇷',
  },
];

const LanguageSelectPage = () => {
  const [language, setLanguage] = useState('');

  return (
    <main className="px-5 py-8 flex flex-col justify-between h-full items-between">
      <div>
        <h1 className="mb-2 text-2xl font-bold">언어 설정</h1>
        <p className="mb-6 text-sm text-gray-500">
          선택한 언어로 채팅이 자동 번역됩니다.
        </p>
        <Dropdown
          options={LANGUAGE_OPTIONS}
          value={language}
          placeholder="언어를 선택해주세요"
          onChange={setLanguage}
        />
      </div>

      <Button className=" w-full">완료</Button>
    </main>
  );
};

export default LanguageSelectPage;
