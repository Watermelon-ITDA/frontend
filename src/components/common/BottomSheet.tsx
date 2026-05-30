import type { ReactNode } from 'react';

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  height?: string;
}

export default function BottomSheet({
  open,
  onClose,
  children,
  height = '50vh',
}: BottomSheetProps) {
  return (
    <>
      <div
        onClick={onClose}
        className={`
          fixed inset-0 z-40 bg-black/30
          transition-opacity duration-300 ease-out
          ${
            open
              ? 'opacity-100 pointer-events-auto'
              : 'opacity-0 pointer-events-none'
          }
        `}
      />

      <div
        className={`
          fixed left-1/2 bottom-0 z-50
          w-[393px]
          -translate-x-1/2
          rounded-t-3xl
          bg-white
          shadow-2xl
          will-change-transform
          transition-transform duration-300 ease-out
          ${open ? 'translate-y-0' : 'translate-y-full'}
        `}
        style={{
          height,
        }}
      >
        <div
          className="flex cursor-pointer justify-center py-3"
          onClick={onClose}
        >
          <div className="h-1.5 w-12 rounded-full bg-lightgray" />
        </div>

        <div className="h-[calc(100%-36px)] overflow-y-auto px-4 pb-footer">
          {children}
        </div>
      </div>
    </>
  );
}
