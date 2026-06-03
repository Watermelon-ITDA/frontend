import type { InputHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = ({ label, error, className, ...props }: InputProps) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && <label className="text-sm text-darkgray">{label}</label>}

      <input
        className={cn(
          'w-full rounded-md border px-3 py-3 text-sm outline-none transition',
          'border-lightgray focus:border-primary bg-white',
          error && 'border-red-400',
          className,
        )}
        {...props}
      />

      {error && <span className="text-xs text-red-400">{error}</span>}
    </div>
  );
};

export default Input;
