import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

/**
 * CustomDropdown
 * A sleek, modern accessible dropdown component designed for BilimKitep.
 * Replaces native OS <select> dropdowns with a beautifully styled EdTech/FinTech popover.
 *
 * @param {string|number} value - Active selected value
 * @param {Function} onChange - Callback invoked with the selected value (or synthetic event)
 * @param {Array<{value: string|number, label: string, icon?: React.ComponentType, badge?: string, description?: string}>} options
 * @param {string} [placeholder] - Optional placeholder when value is empty
 * @param {string} [label] - Optional header label outside or inside
 * @param {string} [className] - Additional classes for the container
 * @param {string} [buttonClassName] - Additional classes for the trigger button
 * @param {string} [menuClassName] - Additional classes for the popup menu
 * @param {'left'|'right'} [align='right'] - Alignment of the popup menu relative to the trigger
 * @param {boolean} [disabled=false] - Whether dropdown is disabled
 * @param {string} [ariaLabel] - ARIA label for accessibility
 */
export const CustomDropdown = ({
  value,
  onChange,
  options = [],
  placeholder = 'Выберите...',
  label,
  className = '',
  buttonClassName = '',
  menuClassName = '',
  align = 'right',
  disabled = false,
  ariaLabel,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Find currently active option
  const activeOption = options.find((opt) => opt.value === value) || options[0];

  // Close on outside click
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

  const handleSelect = (optionValue) => {
    if (disabled) return;
    if (onChange) {
      // Support both direct value and synthetic event signature
      onChange(optionValue);
    }
    setIsOpen(false);
  };

  return (
    <div
      ref={containerRef}
      className={`relative inline-block text-left ${className}`}
    >
      {label && (
        <span className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
          {label}
        </span>
      )}

      {/* Trigger Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={
          ariaLabel ||
          (label
            ? `${label}: ${activeOption?.label || placeholder}`
            : activeOption?.label || placeholder)
        }
        className={`group inline-flex items-center justify-between gap-2 px-3.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors duration-150 select-none cursor-pointer border ${
          isOpen
            ? 'bg-white dark:bg-slate-900 border-emerald-600 ring-1 ring-emerald-600/30 text-emerald-700 dark:text-emerald-400 shadow-xs'
            : 'bg-white dark:bg-darkCard hover:bg-gray-50 dark:hover:bg-slate-800/80 border-gray-200 dark:border-darkBorder text-gray-800 dark:text-gray-200 hover:border-slate-300 dark:hover:border-slate-600 shadow-xs'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${buttonClassName}`}
      >
        <span className="truncate">
          {activeOption ? activeOption.label : placeholder}
        </span>

        <ChevronDown
          className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
            isOpen
              ? 'rotate-180 text-emerald-500'
              : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300'
          }`}
        />
      </button>

      {/* Styled Popover Dropdown Menu */}
      {isOpen && (
        <div
          role="listbox"
          tabIndex={-1}
          className={`absolute ${
            align === 'right' ? 'right-0' : 'left-0'
          } top-full mt-2 w-56 sm:w-64 z-50 p-1.5 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-gray-200/90 dark:border-slate-700/80 shadow-2xl shadow-slate-900/15 dark:shadow-black/70 animate-in fade-in-0 zoom-in-95 duration-150 focus:outline-none ${menuClassName}`}
        >
          {/* Header indicator within dropdown */}
          <div className="px-3 py-1.5 text-[10px] uppercase tracking-wider font-extrabold text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-slate-800/80 mb-1 flex items-center justify-between">
            <span>{label || 'Сортировка'}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          </div>

          <div className="space-y-0.5 max-h-72 overflow-y-auto no-scrollbar">
            {options.map((opt) => {
              const isSelected = opt.value === value;

              return (
                <button
                  key={String(opt.value)}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(opt.value)}
                  className={`w-full flex items-center justify-between gap-3 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all text-left cursor-pointer group ${
                    isSelected
                      ? 'bg-emerald-50 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-bold border border-emerald-200/70 dark:border-emerald-500/30 shadow-xs'
                      : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100/80 dark:hover:bg-slate-800/80 hover:text-gray-900 dark:hover:text-white border border-transparent'
                  }`}
                >
                  <span className="truncate">{opt.label}</span>

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
    </div>
  );
};

export default CustomDropdown;
