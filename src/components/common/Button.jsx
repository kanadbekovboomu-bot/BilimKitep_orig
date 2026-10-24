import React from 'react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  loading = false,
  icon: Icon,
  type = 'button',
  onClick,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100 cursor-pointer';

  const variants = {
    primary: 'bg-brand-500 hover:bg-brand-600 text-white shadow-sm shadow-brand-500/20 focus:ring-brand-500',
    secondary: 'bg-emerald-50 dark:bg-emerald-950/40 text-brand-700 dark:text-brand-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 focus:ring-brand-400',
    outline: 'border border-gray-300 dark:border-darkBorder text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-darkCard focus:ring-brand-500',
    ghost: 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-darkCard focus:ring-gray-400',
    danger: 'bg-red-500 hover:bg-red-600 text-white shadow-sm focus:ring-red-400',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2.5 gap-2',
    lg: 'text-base px-5 py-3 gap-2.5 font-semibold',
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : Icon ? (
        <Icon className="w-4 h-4 shrink-0" />
      ) : null}
      {children}
    </button>
  );
};

export default Button;
