import React, { forwardRef } from 'react';
import { CustomDropdown } from './CustomDropdown';

export { CustomDropdown };

export const Select = forwardRef(({
  label,
  options = [],
  error,
  helperText,
  className = '',
  id,
  ...props
}, ref) => {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label htmlFor={selectId} className="block text-xs font-semibold text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <select
        ref={ref}
        id={selectId}
        className={`block w-full rounded-xl border transition-colors duration-150 text-sm py-2.5 px-3.5 bg-white dark:bg-darkCard text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 ${
          error
            ? 'border-red-400 dark:border-red-500/70 focus:ring-red-400'
            : 'border-gray-200 dark:border-darkBorder'
        } ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-white dark:bg-darkCard text-gray-900 dark:text-gray-100">
            {opt.label}
          </option>
        ))}
      </select>
      {error ? (
        <p className="text-xs text-red-500">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-gray-500">{helperText}</p>
      ) : null}
    </div>
  );
});

Select.displayName = 'Select';
export default Select;
