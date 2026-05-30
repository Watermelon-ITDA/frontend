import Button from '@/components/common/Button';
import Input from '@/components/common/Input';

interface SearchBarProps {
  keyword: string;
  setKeyword: (keyword: string) => void;
  onSearch: () => void;
}

const SearchBar = ({ keyword, setKeyword, onSearch }: SearchBarProps) => {
  return (
    <>
      <div className="relative">
        <Input
          placeholder="검색어를 입력해 주세요."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onSearch();
          }}
        />

        <Button
          variant="ghost"
          className="absolute right-1 top-1/2 -translate-y-1/2"
          onClick={() => onSearch()}
        >
          검색
        </Button>
      </div>
    </>
  );
};
export default SearchBar;
