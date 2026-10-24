import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, ChevronDown, Check, Search, Sparkles } from 'lucide-react';
import { KYRGYZ_CITIES } from '../../utils/citiesData';

export const CitySelector = ({
  value,
  onChange,
  onCitySelected,
  label = 'Город / Населенный пункт',
  error,
}) => {
  const { i18n } = useTranslation();
  const lang = i18n.language || 'ru';

  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef(null);

  const getCityName = (c) => lang === 'kg' ? c.nameKg : (lang === 'en' ? c.nameEn : c.nameRu);
  const getCityRegion = (c) => lang === 'kg' ? c.regionKg : (lang === 'en' ? c.regionEn : c.regionRu);
  const getCityBadge = (c) => lang === 'kg' ? c.badgeKg : (lang === 'en' ? c.badgeEn : c.badgeRu);

  // Match active city object
  const selectedCity = KYRGYZ_CITIES.find(
    (c) => c.value === value || c.nameRu === value || c.nameKg === value || c.id === value
  ) || KYRGYZ_CITIES[0];

  // Outside click listener
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectCity = (city) => {
    if (onChange) onChange(city.value);
    if (onCitySelected) onCitySelected(city);
    setIsOpen(false);
    setSearch('');
  };

  const filteredCities = KYRGYZ_CITIES.filter((c) => {
    const q = search.toLowerCase().trim();
    if (!q) return true;
    return (
      c.nameRu.toLowerCase().includes(q) ||
      c.nameKg.toLowerCase().includes(q) ||
      c.nameEn.toLowerCase().includes(q) ||
      c.regionRu.toLowerCase().includes(q) ||
      c.regionKg.toLowerCase().includes(q)
    );
  });

  return (
    <div className="w-full space-y-2" ref={containerRef}>
      {/* Label and Quick selection indicator */}
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-gray-700 dark:text-gray-200">
          {label}
        </label>
        <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          {getCityBadge(selectedCity)}
        </span>
      </div>

      {/* Quick Select Chips */}
      <div className="flex flex-wrap gap-1.5 pb-1">
        {KYRGYZ_CITIES.filter((c) => c.isPopular).map((c) => {
          const isCurrent = c.value === selectedCity.value;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => handleSelectCity(c)}
              className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                isCurrent
                  ? 'bg-brand-600 text-white shadow-xs font-semibold'
                  : 'bg-gray-100 dark:bg-darkBorder hover:bg-gray-200 dark:hover:bg-darkBorder/80 text-gray-700 dark:text-gray-300'
              }`}
            >
              {getCityName(c)}
            </button>
          );
        })}
      </div>

      {/* Custom Stylized Trigger Button */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl bg-white dark:bg-darkCard border text-left transition-all duration-200 cursor-pointer shadow-xs ${
            isOpen
              ? 'border-brand-500 ring-4 ring-brand-500/10 dark:ring-brand-500/20 shadow-md'
              : error
              ? 'border-red-400 dark:border-red-500'
              : 'border-gray-200 dark:border-darkBorder hover:border-gray-300 dark:hover:border-gray-700'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-sm text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <span>{getCityName(selectedCity)}</span>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${selectedCity.badgeColor}`}>
                  {getCityBadge(selectedCity)}
                </span>
              </div>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">
                {getCityRegion(selectedCity)}
              </p>
            </div>
          </div>

          <ChevronDown
            className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
              isOpen ? 'rotate-180 text-brand-600' : ''
            }`}
          />
        </button>

        {/* Dropdown Card */}
        {isOpen && (
          <div className="absolute z-50 left-0 right-0 mt-2 bg-white dark:bg-darkCard border border-gray-100 dark:border-darkBorder rounded-2xl shadow-2xl p-2 space-y-2 animate-in fade-in zoom-in-95 duration-150">
            {/* Search Input inside Dropdown */}
            <div className="relative px-2 pt-1">
              <Search className="w-3.5 h-3.5 absolute left-5 top-3.5 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={lang === 'kg' ? 'Шаарды издөө...' : (lang === 'en' ? 'Search city...' : 'Поиск города...')}
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-gray-50 dark:bg-darkBorder/60 border border-gray-200 dark:border-darkBorder text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
                autoFocus
              />
            </div>

            {/* City Options List */}
            <div className="max-h-60 overflow-y-auto space-y-1 pr-1 divide-y divide-gray-50 dark:divide-darkBorder/40">
              {filteredCities.map((city) => {
                const isSelected = city.value === selectedCity.value;
                return (
                  <button
                    key={city.id}
                    type="button"
                    onClick={() => handleSelectCity(city)}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-brand-50/80 dark:bg-emerald-950/40 text-brand-900 dark:text-brand-200'
                        : 'hover:bg-gray-50 dark:hover:bg-darkBorder/40 text-gray-800 dark:text-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                          isSelected
                            ? 'bg-brand-600 text-white'
                            : 'bg-gray-100 dark:bg-darkBorder text-gray-500'
                        }`}
                      >
                        <MapPin className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold flex items-center gap-1.5">
                          <span>{getCityName(city)}</span>
                          <span className={`text-[10px] font-semibold px-1.5 py-0.2 rounded ${city.badgeColor}`}>
                            {getCityBadge(city)}
                          </span>
                        </div>
                        <span className="text-[10px] text-gray-400 block">
                          {getCityRegion(city)}
                        </span>
                      </div>
                    </div>

                    {isSelected && (
                      <Check className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0" />
                    )}
                  </button>
                );
              })}

              {filteredCities.length === 0 && (
                <div className="p-4 text-center text-xs text-gray-400">
                  {lang === 'kg' ? 'Шаар табылган жок' : (lang === 'en' ? 'No city found' : 'Город не найден')}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default CitySelector;
