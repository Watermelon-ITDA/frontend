import type { ReactNode } from 'react';
import Button from './Button';

interface FloatingButtonProps {
  icon: ReactNode;
  onClick: () => void;
  bottom?: number;
  right?: number;
  size?: number;
}

export default function FloatingButton({
  icon,
  onClick,
  bottom = 80,
  right = 10,
  size = 48,
}: FloatingButtonProps) {
  return (
    <div className="relative mx-auto w-[393px]">
      <Button
        onClick={onClick}
        aria-label="floating-button"
        style={{
          position: 'absolute',
          bottom,
          right,
          width: size,
          height: size,
        }}
        className="
        rounded-full
        shadow-lg
        flex
        items-center
        justify-center
        transition-all
        duration-200
        hover:scale-110
        hover:shadow-xl
        active:scale-95
        z-100
        cursor-pointer
      "
      >
        {icon}
      </Button>
    </div>
  );
}
