import { useEffect, useRef, useState } from 'react';
import arrorDownIcon from '@/assets/icons/common/arrow-down-sign-to-navigate.png';
import Button from './Button';

export interface DropdownOption {
  value: string;
  label: string;
  flag?: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value?: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

const Dropdown = ({
  options,
  value,
  placeholder = '선택해주세요',
  onChange,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((option) => option.value === value);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      <Button
        type="button"
        variant="outline"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full justify-between px-4 py-3"
      >
        {selectedOption ? (
          <div className="flex items-center gap-3">
            <span>{selectedOption.flag}</span>
            <span>{selectedOption.label}</span>
          </div>
        ) : (
          <span className="text-mediumgray">{placeholder}</span>
        )}

        <div className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          <img
            className="w-[20px] h-[20px] object-contain"
            src={arrorDownIcon}
          />
        </div>
      </Button>

      {isOpen && (
        <div className="absolute z-10 mt-2 max-h-64 w-full overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-lg">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-lightgray/20"
            >
              <span>{option.flag}</span>
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
