import React, { forwardRef, useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { CustomDropdown } from './CustomDropdown';

export { CustomDropdown };

export const Select = forwardRef(({
  label,
  options = [],
  value,
  onChange,
  error,
  helperText,
  className = '',
  id,
  disabled = false,
  placeholder = 'Выберите...',
  icon: FieldIcon,
  ...props
}, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const selectId = id || (label ? String(label).toLowerCase().replace(/\s+/g, '-') : undefined);

  // Find active option
  const activeOption = options.find((opt) => String(opt.value) === String(value)) || options[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (opt) => {
    if (disabled) return;
    setIsOpen(false);
    if (onChange) {
      const syntheticEvent = {
        target: { value: opt.value, name: props.name || selectId },
        currentTarget: { value: opt.value, name: props.name || selectId },
      };
      onChange(syntheticEvent);
    }
  };

  const ActiveIcon = activeOption?.icon || FieldIcon;

  return (
    <div ref={containerRef} className={`w-full space-y-1.5 relative select-none ${className}`}>
      {label && (
        <label
          id={`${selectId}-label`}
          className="block text-xs font-semibold text-gray-700 dark:text-gray-300"
        >
          {label}
        </label>
      )}

      {/* Hidden native select for form compatibility / ref forwarding */}
      <select
        ref={ref}
        id={selectId}
        value={value}
        onChange={onChange}
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* Custom Decorated Trigger Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby={`${selectId}-label`}
        className={`w-full rounded-2xl border transition-all duration-200 text-xs sm:text-sm py-2.5 px-3.5 bg-white dark:bg-darkCard text-left flex items-center justify-between gap-2.5 cursor-pointer shadow-xs ${
          isOpen
            ? 'border-emerald-500 ring-2 ring-emerald-500/20 text-gray-900 dark:text-gray-100 shadow-md shadow-emerald-500/10'
            : error
            ? 'border-red-400 dark:border-red-500/70 text-gray-900 dark:text-gray-100'
            : 'border-gray-200 dark:border-darkBorder hover:border-emerald-500/50 text-gray-900 dark:text-gray-100 hover:bg-gray-50/70 dark:hover:bg-slate-800/50'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <span className="flex items-center gap-2 truncate">
          {ActiveIcon && (
            <span className="shrink-0 w-4 h-4 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <ActiveIcon className="w-4 h-4" />
            </span>
          )}
          <span className="truncate font-semibold">
            {activeOption ? activeOption.label : placeholder}
          </span>
        </span>

        <ChevronDown
          className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
            isOpen
              ? 'rotate-180 text-emerald-500'
              : 'text-gray-400 dark:text-gray-500'
          }`}
        />
      </button>

      {/* Popover Dropdown Menu with Site Decor */}
      {isOpen && (
        <div
          role="listbox"
          tabIndex={-1}
          className="absolute left-0 right-0 top-full mt-1.5 z-[9999] rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-gray-200/90 dark:border-slate-700/80 shadow-2xl shadow-slate-900/15 dark:shadow-black/70 overflow-hidden animate-in fade-in-0 zoom-in-95 duration-150 focus:outline-none"
        >
          {/* Subtle National Accent Ribbon on top */}
          <div className="w-full h-1 bg-gradient-to-r from-red-600 via-amber-500 to-emerald-600" />

          <div className="p-1.5 max-h-60 overflow-y-auto space-y-0.5 custom-scrollbar">
            {options.map((opt) => {
              const isSelected = String(opt.value) === String(value);
              const OptIcon = opt.icon;

              return (
                <button
                  key={String(opt.value)}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(opt)}
                  className={`w-full flex items-center justify-between gap-2.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all text-left cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-50 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-bold border border-emerald-200/70 dark:border-emerald-500/30 shadow-xs'
                      : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100/80 dark:hover:bg-slate-800/80 hover:text-gray-900 dark:hover:text-white border border-transparent'
                  }`}
                >
                  <span className="flex items-center gap-2.5 truncate">
                    {OptIcon && (
                      <span
                        className={`p-1 rounded-lg shrink-0 transition-colors ${
                          isSelected
                            ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                            : 'bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-gray-400'
                        }`}
                      >
                        <OptIcon className="w-3.5 h-3.5" />
                      </span>
                    )}
                    <span className="truncate">{opt.label}</span>
                  </span>

                  {isSelected && (
                    <span className="shrink-0 p-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

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
