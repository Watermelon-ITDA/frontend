import type { ButtonHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

type Variant = 'primary' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  loading?: boolean;
}

const baseStyle =
  'inline-flex items-center justify-center px-4 py-2 rounded-md text-sm transition-all duration-200 hover:cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed select-none';

const variantStyle = {
  primary: 'bg-primary text-white shadow-sm',
  ghost: 'bg-transparent text-primary ',
};

const Button = ({
  variant = 'primary',
  loading = false,
  className,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(baseStyle, variantStyle[variant], className)}
      disabled={props.disabled || loading}
      {...props}
    >
      {loading ? '로딩중...' : children}
    </button>
  );
};

export default Button;
