import React, { useEffect, useRef, useState, useMemo } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  Navigation,
  Compass,
  Phone,
  MessageCircle,
  Truck,
  MapPin,
  Play,
  Pause,
  RotateCcw,
  Maximize2,
  Clock,
  ShieldCheck,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Button } from '../common/Button';
import { formatKGS } from '../../utils/formatters';

// Preset coordinates for cities in Kyrgyzstan
const CITY_COORDINATES = {
  'Бишкек': { user: [42.8746, 74.5698], courier: [42.8850, 74.5950] },
  'Ош': { user: [40.5140, 72.8161], courier: [40.5350, 72.8350] },
  'Жалал-Абад': { user: [40.9333, 72.9833], courier: [40.9450, 73.0050] },
  'Каракол': { user: [42.4907, 78.3936], courier: [42.5050, 78.4100] },
  'Нарын': { user: [41.4287, 75.9911], courier: [41.4400, 76.0100] },
  'Талас': { user: [42.5228, 72.2428], courier: [42.5350, 72.2600] },
  'Баткен': { user: [40.0553, 70.8194], courier: [40.0650, 70.8350] },
};

export const CourierDeliveryMap = ({
  city = 'Бишкек',
  currentAddress = '',
  onAddressSelect,
  orderId = null,
  isLiveTracking = true,
}) => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const userMarkerRef = useRef(null);
  const courierMarkerRef = useRef(null);
  const routePolylineRef = useRef(null);
  const animationTimerRef = useRef(null);

  const cityDefaults = CITY_COORDINATES[city] || CITY_COORDINATES['Бишкек'];

  const [userLocation, setUserLocation] = useState(cityDefaults.user);
  const [courierLocation, setCourierLocation] = useState(cityDefaults.courier);
  const [isSimulating, setIsSimulating] = useState(false);
  const [etaMinutes, setEtaMinutes] = useState(24);
  const [distanceKm, setDistanceKm] = useState(2.8);
  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsError, setGpsError] = useState('');
  const [statusText, setStatusText] = useState('Курьер получил заказ и выехал со склада');

  // Generate intermediate route waypoints between courier & user
  const waypoints = useMemo(() => {
    const [cLat, cLng] = courierLocation;
    const [uLat, uLng] = userLocation;
    const steps = 20;
    const points = [];
    for (let i = 0; i <= steps; i++) {
      const ratio = i / steps;
      // Add slight zigzag to simulate city streets
      const jitterLat = Math.sin(ratio * Math.PI * 3) * 0.0018;
      const jitterLng = Math.cos(ratio * Math.PI * 3) * 0.0015;
      points.push([
        cLat + (uLat - cLat) * ratio + jitterLat,
        cLng + (uLng - cLng) * ratio + jitterLng,
      ]);
    }
    return points;
  }, [courierLocation, userLocation]);

  // Update center when city prop changes
  useEffect(() => {
    const coords = CITY_COORDINATES[city] || CITY_COORDINATES['Бишкек'];
    setUserLocation(coords.user);
    setCourierLocation(coords.courier);

    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(coords.user, 14, { duration: 1.2 });
    }
  }, [city]);

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return; // already initialized

    // Create Leaflet map instance
    const map = L.map(mapContainerRef.current, {
      center: userLocation,
      zoom: 14,
      zoomControl: false,
    });

    // Add zoom control top-right
    L.control.zoom({ position: 'topright' }).addTo(map);

    // OpenStreetMap free tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    // Custom User Marker DivIcon
    const userDivIcon = L.divIcon({
      className: 'user-pin-marker',
      html: `
        <div style="position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center;">
          <span style="position: absolute; width: 36px; height: 36px; border-radius: 50%; background: #3b82f6; opacity: 0.4; animation: ping 1.5s cubic-bezier(0,0,0.2,1) infinite;"></span>
          <div style="width: 32px; height: 32px; border-radius: 50%; background: #2563eb; border: 3px solid #ffffff; box-shadow: 0 4px 10px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; color: white; font-size: 14px; font-weight: bold;">
            📍
          </div>
          <div style="margin-top: 4px; background: #1e3a8a; color: #ffffff; font-size: 10px; font-weight: 800; padding: 2px 8px; border-radius: 9999px; box-shadow: 0 2px 6px rgba(0,0,0,0.3); white-space: nowrap;">
            Сиздин дарегиңиз (Вы здесь)
          </div>
        </div>
      `,
      iconSize: [36, 56],
      iconAnchor: [18, 28],
    });

    // Custom Courier Marker DivIcon
    const courierDivIcon = L.divIcon({
      className: 'courier-pin-marker',
      html: `
        <div style="position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center;">
          <span style="position: absolute; width: 44px; height: 44px; border-radius: 50%; background: #10b981; opacity: 0.5; animation: ping 1.2s cubic-bezier(0,0,0.2,1) infinite;"></span>
          <div style="width: 38px; height: 38px; border-radius: 50%; background: #059669; border: 3px solid #ffffff; box-shadow: 0 4px 14px rgba(16,185,129,0.5); display: flex; align-items: center; justify-content: center; color: white; font-size: 18px;">
            🛵
          </div>
          <div style="margin-top: 4px; background: #064e3b; color: #a7f3d0; font-size: 10px; font-weight: 800; padding: 2px 8px; border-radius: 9999px; box-shadow: 0 2px 6px rgba(0,0,0,0.3); white-space: nowrap;">
            Курьер: Азамат (~25 км/ч)
          </div>
        </div>
      `,
      iconSize: [44, 62],
      iconAnchor: [22, 31],
    });

    const userMarker = L.marker(userLocation, {
      icon: userDivIcon,
      draggable: true,
    }).addTo(map);

    const courierMarker = L.marker(courierLocation, {
      icon: courierDivIcon,
    }).addTo(map);

    const routePolyline = L.polyline(waypoints, {
      color: '#10b981',
      weight: 5,
      opacity: 0.85,
      dashArray: '8, 8',
    }).addTo(map);

    // Click on map to reposition delivery point
    map.on('click', (e) => {
      const newPos = [e.latlng.lat, e.latlng.lng];
      userMarker.setLatLng(newPos);
      setUserLocation(newPos);
      if (onAddressSelect) {
        onAddressSelect({
          lat: e.latlng.lat,
          lng: e.latlng.lng,
          estimatedText: `${city}, ориентир по карте (${e.latlng.lat.toFixed(4)}, ${e.latlng.lng.toFixed(4)})`,
        });
      }
    });

    // Drag marker listener
    userMarker.on('dragend', () => {
      const pos = userMarker.getLatLng();
      const newPos = [pos.lat, pos.lng];
      setUserLocation(newPos);
      if (onAddressSelect) {
        onAddressSelect({
          lat: pos.lat,
          lng: pos.lng,
          estimatedText: `${city}, указано на карте`,
        });
      }
    });

    mapInstanceRef.current = map;
    userMarkerRef.current = userMarker;
    courierMarkerRef.current = courierMarker;
    routePolylineRef.current = routePolyline;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update route and markers when locations change
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    if (userMarkerRef.current) {
      userMarkerRef.current.setLatLng(userLocation);
    }
    if (courierMarkerRef.current) {
      courierMarkerRef.current.setLatLng(courierLocation);
    }
    if (routePolylineRef.current) {
      routePolylineRef.current.setLatLngs(waypoints);
    }
  }, [userLocation, courierLocation, waypoints]);

  // Live Courier Movement Simulation
  useEffect(() => {
    if (!isSimulating) {
      if (animationTimerRef.current) clearInterval(animationTimerRef.current);
      return;
    }

    let stepIndex = 0;
    setStatusText('Курьер движется по маршруту к вашему адресу');

    animationTimerRef.current = setInterval(() => {
      stepIndex++;
      if (stepIndex >= waypoints.length) {
        setIsSimulating(false);
        setEtaMinutes(1);
        setDistanceKm(0.1);
        setStatusText('Курьер прибыл к вашему дому! Ожидайте звонка.');
        clearInterval(animationTimerRef.current);
        return;
      }

      const nextPos = waypoints[stepIndex];
      if (courierMarkerRef.current) {
        courierMarkerRef.current.setLatLng(nextPos);
      }

      // Update remaining distance and ETA proportionally
      const progress = stepIndex / waypoints.length;
      const remainingDistance = Math.max(0.1, +(2.8 * (1 - progress)).toFixed(1));
      const remainingEta = Math.max(1, Math.round(24 * (1 - progress)));

      setDistanceKm(remainingDistance);
      setEtaMinutes(remainingEta);
    }, 1200);

    return () => {
      if (animationTimerRef.current) clearInterval(animationTimerRef.current);
    };
  }, [isSimulating, waypoints]);

  // Center on user
  const handleCenterUser = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(userLocation, 16, { duration: 1 });
    }
  };

  // Center on courier
  const handleCenterCourier = () => {
    if (mapInstanceRef.current) {
      const pos = courierMarkerRef.current ? courierMarkerRef.current.getLatLng() : courierLocation;
      mapInstanceRef.current.flyTo(pos, 16, { duration: 1 });
    }
  };

  // Fit bounds to show both
  const handleFitBounds = () => {
    if (mapInstanceRef.current) {
      const bounds = L.latLngBounds([userLocation, courierLocation]);
      mapInstanceRef.current.fitBounds(bounds, { padding: [50, 50] });
    }
  };

  // Reset simulation
  const handleResetSimulation = () => {
    setIsSimulating(false);
    const coords = CITY_COORDINATES[city] || CITY_COORDINATES['Бишкек'];
    setCourierLocation(coords.courier);
    if (courierMarkerRef.current) {
      courierMarkerRef.current.setLatLng(coords.courier);
    }
    setDistanceKm(2.8);
    setEtaMinutes(24);
    setStatusText('Курьер получил заказ и выехал со склада');
    handleFitBounds();
  };

  // Detect GPS Location via Browser
  const handleDetectGPS = () => {
    if (!navigator.geolocation) {
      setGpsError('Геолокация не поддерживается вашим браузером');
      return;
    }

    setGpsLoading(true);
    setGpsError('');

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGpsLoading(false);
        const newCoords = [pos.coords.latitude, pos.coords.longitude];
        setUserLocation(newCoords);

        if (userMarkerRef.current) {
          userMarkerRef.current.setLatLng(newCoords);
        }
        if (mapInstanceRef.current) {
          mapInstanceRef.current.flyTo(newCoords, 16, { duration: 1.2 });
        }

        if (onAddressSelect) {
          onAddressSelect({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            estimatedText: `${city}, точные GPS координаты (${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)})`,
          });
        }
      },
      (err) => {
        setGpsLoading(false);
        setGpsError('Не удалось получить координаты. Выберите точку на карте кликом.');
        console.warn('Geolocation error:', err.message);
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  return (
    <div className="bg-white dark:bg-darkCard rounded-3xl border border-gray-100 dark:border-darkBorder overflow-hidden shadow-lg space-y-4">
      {/* Header Info Banner */}
      <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-600 via-teal-600 to-brand-700 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
            <Truck className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-base sm:text-lg">
                Жандуу курьер картасы • Трекинг доставки
              </h3>
              <span className="bg-emerald-400 text-emerald-950 font-black text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
                Live GPS
              </span>
            </div>
            <p className="text-xs text-emerald-100 font-medium">
              {city} • {statusText}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            type="button"
            onClick={() => setIsSimulating(!isSimulating)}
            className={`px-3.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer ${
              isSimulating
                ? 'bg-amber-400 text-amber-950 hover:bg-amber-300'
                : 'bg-white text-emerald-800 hover:bg-emerald-50'
            }`}
          >
            {isSimulating ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>Пауза</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                <span>Жандуу трекинг</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleResetSimulation}
            className="p-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white transition-colors cursor-pointer"
            title="Сбросить симуляцию"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Map Container */}
      <div className="px-4 sm:px-5">
        <div className="relative w-full h-[360px] sm:h-[420px] rounded-2xl overflow-hidden border border-gray-200 dark:border-darkBorder shadow-inner">
          <div ref={mapContainerRef} className="w-full h-full z-10" />

          {/* Quick Map Controls Overlay */}
          <div className="absolute top-3 left-3 z-20 flex flex-col gap-2">
            <button
              type="button"
              onClick={handleDetectGPS}
              disabled={gpsLoading}
              className="bg-white/95 dark:bg-darkCard/95 hover:bg-white text-gray-800 dark:text-gray-100 text-xs font-bold px-3 py-2 rounded-xl shadow-md border border-gray-100 dark:border-darkBorder flex items-center gap-1.5 cursor-pointer transition-all"
            >
              <Navigation className={`w-3.5 h-3.5 text-blue-600 ${gpsLoading ? 'animate-spin' : ''}`} />
              <span>{gpsLoading ? 'GPS табылууда...' : '📍 Менин жайгашкан жерим'}</span>
            </button>

            <button
              type="button"
              onClick={handleCenterCourier}
              className="bg-white/95 dark:bg-darkCard/95 hover:bg-white text-gray-800 dark:text-gray-100 text-xs font-bold px-3 py-2 rounded-xl shadow-md border border-gray-100 dark:border-darkBorder flex items-center gap-1.5 cursor-pointer transition-all"
            >
              <span>🛵</span>
              <span>Курьер кайда?</span>
            </button>

            <button
              type="button"
              onClick={handleFitBounds}
              className="bg-white/95 dark:bg-darkCard/95 hover:bg-white text-gray-800 dark:text-gray-100 text-xs font-bold px-3 py-2 rounded-xl shadow-md border border-gray-100 dark:border-darkBorder flex items-center gap-1.5 cursor-pointer transition-all"
            >
              <Maximize2 className="w-3.5 h-3.5 text-gray-500" />
              <span>Маршрутту толук көрүү</span>
            </button>
          </div>

          {/* Bottom Map Floating Banner */}
          <div className="absolute bottom-3 left-3 right-3 z-20 bg-white/95 dark:bg-darkCard/95 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-gray-100 dark:border-darkBorder flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-extrabold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                  <span>Жеткирүү убактысы: ~{etaMinutes} мүнөт</span>
                  <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                    ({distanceKm} км аралык)
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">
                  {currentAddress || 'Даректи тактоо үчүн картадан үйүңүздү басыңыз'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <a
                href="tel:+996700889900"
                className="flex-1 sm:flex-none px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Чалуу</span>
              </a>

              <a
                href="https://wa.me/996700889900"
                target="_blank"
                rel="noreferrer"
                className="flex-1 sm:flex-none px-3 py-1.5 rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {gpsError && (
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300 text-xs mt-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{gpsError}</span>
          </div>
        )}
      </div>

      {/* Courier Profile Card */}
      <div className="px-4 sm:px-5 pb-4">
        <div className="p-4 rounded-2xl bg-gray-50 dark:bg-darkBorder/40 border border-gray-100 dark:border-darkBorder flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white font-extrabold text-base flex items-center justify-center shadow-md">
                АЖ
              </div>
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-white dark:border-darkCard"></span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-sm text-gray-900 dark:text-gray-100">
                  Азамат Жумабеков
                </h4>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 flex items-center gap-1">
                  ⭐ 4.98 (184 жеткирүү)
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Транспорт: Электроскутер Yadea (Ак түстө) • Тел: +996 700 889 900
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-brand-700 dark:text-brand-300">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Коопсуз жеткирүү жана китептердин бүтүндүгү кепилденет</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourierDeliveryMap;
