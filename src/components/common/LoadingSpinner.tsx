import { LoaderCircle } from 'lucide-react';
import { cn } from '@/utils/cn';

interface LoadingSpinnerProps {
  overlay?: boolean;
  text?: string;
}

const LoadingSpinner = ({ overlay = false, text }: LoadingSpinnerProps) => {
  const content = (
    <div className="flex flex-col items-center gap-3">
      <LoaderCircle className="animate-spin text-primary" size={32} />
      {text && <span className="text-sm text-darkgray">{text}</span>}
    </div>
  );

  if (overlay) {
    return (
      <div
        className={cn(
          'fixed inset-0 z-999 flex items-center justify-center',
          'bg-lightgray/40 backdrop-blur-[1px]',
        )}
      >
        {content}
      </div>
    );
  }

  return <div className="flex items-center justify-center py-8">{content}</div>;
};

export default LoadingSpinner;
