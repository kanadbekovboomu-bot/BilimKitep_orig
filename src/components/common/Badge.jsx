import React from 'react';

export const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  icon: Icon,
}) => {
  const base = 'inline-flex items-center font-medium rounded-full';

  const variants = {
    default: 'bg-gray-100 dark:bg-darkBorder text-gray-700 dark:text-gray-300',
    primary: 'bg-emerald-50 dark:bg-emerald-950/60 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800/40',
    rent: 'bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/40',
    buy: 'bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/40',
    success: 'bg-green-50 dark:bg-green-950/50 text-green-700 dark:text-green-300',
    danger: 'bg-red-50 dark:bg-red-950/50 text-red-700 dark:text-red-300',
  };

  const sizes = {
    sm: 'text-[11px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-sm px-3 py-1.5 gap-1.5 font-semibold',
  };

  return (
    <span className={`${base} ${variants[variant] || variants.default} ${sizes[size] || sizes.md} ${className}`}>
      {Icon && <Icon className="w-3 h-3 shrink-0" />}
      {children}
    </span>
  );
};

export default Badge;
