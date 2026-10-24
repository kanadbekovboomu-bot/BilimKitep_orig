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
  const baseStyles = 'inline-flex items-center justify-center font-bold rounded-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100 cursor-pointer';

  const variants = {
    primary: 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-400 text-white font-bold shadow-md shadow-emerald-500/20 hover:brightness-125 hover:shadow-[0_0_24px_rgba(16,185,129,0.55)] hover:scale-[1.03] focus:ring-emerald-500',
    secondary: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/40 hover:bg-emerald-100/80 dark:hover:bg-emerald-900/60 hover:brightness-115 hover:shadow-[0_0_18px_rgba(16,185,129,0.3)] hover:scale-[1.02] focus:ring-emerald-400',
    outline: 'border border-gray-200 dark:border-slate-700/80 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-gray-700 dark:text-gray-200 hover:border-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/40 hover:shadow-[0_0_20px_rgba(16,185,129,0.35)] hover:scale-[1.02] focus:ring-emerald-500',
    ghost: 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-darkCard hover:brightness-110 hover:scale-[1.02] focus:ring-gray-400',
    danger: 'bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-md shadow-red-500/20 hover:brightness-125 hover:shadow-[0_0_24px_rgba(239,68,68,0.55)] hover:scale-[1.03] focus:ring-red-400',
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
