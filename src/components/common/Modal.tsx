import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  footer?: ReactNode;
  children: ReactNode;
  className?: string;
}

const Modal = ({
  open,
  onClose,
  title,
  footer,
  children,
  className,
}: ModalProps) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className={cn(
          'w-[320px] rounded-md bg-white shadow-lg py-2',
          className,
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="px-4 py-3">
            <h2 className="text-md font-semibold">{title}</h2>
          </div>
        )}

        <div className="p-4">{children}</div>

        {footer && <div className="px-4 py-3">{footer}</div>}
      </div>
    </div>
  );
};

export default Modal;
