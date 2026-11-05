import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
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
  AlertCircle,
  Layers,
  Sparkles
} from 'lucide-react';
import { formatKGS } from '../../utils/formatters';

// Preset real coordinates for main cities in Kyrgyzstan (Courier warehouse & default user center)
const CITY_COORDINATES = {
  'Бишкек': {
    user: [42.8746, 74.5698], // Chuy / Manas
    courier: [42.8850, 74.6050], // Chuy / Sovetskaya
  },
  'Ош': {
    user: [40.5140, 72.8161], // Lenin / Kurmanjan Datka
    courier: [40.5280, 72.8020],
  },
  'Жалал-Абад': {
    user: [40.9333, 72.9833], // Toktogul / Lenin
    courier: [40.9420, 73.0020],
  },
  'Каракол': {
    user: [42.4907, 78.3936], // Gebze / Toktogul
    courier: [42.5020, 78.4110],
  },
  'Нарын': {
    user: [41.4287, 75.9911], // Lenin / Razzakov
    courier: [41.4380, 76.0120],
  },
  'Талас': {
    user: [42.5228, 72.2428], // Chyngyz Aitmatov / Berdike Baatyr
    courier: [42.5320, 72.2610],
  },
  'Баткен': {
    user: [40.0553, 70.8194],
    courier: [40.0650, 70.8350],
  },
};

// Tile Layer URLs
const TILE_STREET = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const TILE_SATELLITE = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';

export const CourierDeliveryMap = ({
  city = 'Бишкек',
  currentAddress = '',
  onAddressSelect,
  orderId = null,
  isLiveTracking = true,
}) => {
  const { t, i18n } = useTranslation(['checkout', 'common']);
  const cityDefaults = CITY_COORDINATES[city] || CITY_COORDINATES['Бишкек'];

  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const userMarkerRef = useRef(null);
  const courierMarkerRef = useRef(null);
  const routePolylineRef = useRef(null);
  const accuracyCircleRef = useRef(null);
  const trafficLightMarkersRef = useRef([]);
  const tileLayerRef = useRef(null);
  const animationTimerRef = useRef(null);

  // Map state
  const [userLocation, setUserLocation] = useState(cityDefaults.user);
  const [courierLocation, setCourierLocation] = useState(cityDefaults.courier);
  const [routeCoords, setRouteCoords] = useState([]);
  const [trafficLights, setTrafficLights] = useState([]); // [{ pos: [lat, lng], state: 'RED'|'YELLOW'|'GREEN' }]
  const [mapLayer, setMapLayer] = useState('street'); // 'street' | 'satellite'

  // Tracking & simulation state
  const [isSimulating, setIsSimulating] = useState(false);
  const [etaMinutes, setEtaMinutes] = useState(24);
  const [distanceKm, setDistanceKm] = useState(2.8);
  const [currentSpeed, setCurrentSpeed] = useState(26);
  const [statusKey, setStatusKey] = useState('statusWarehouse');

  // GPS geolocation state
  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsAccuracy, setGpsAccuracy] = useState(null);
  const [gpsError, setGpsError] = useState('');

  // 1. Fetch Legal Road Routing from Open Source Routing Machine (OSRM)
  const fetchRoadRoute = useCallback(async (start, end) => {
    try {
      const [startLat, startLng] = start;
      const [endLat, endLng] = end;
      const url = `https://router.project-osrm.org/route/v1/driving/${startLng},${startLat};${endLng},${endLat}?overview=full&geometries=geojson`;

      const res = await fetch(url);
      const data = await res.json();

      if (data.code === 'Ok' && data.routes && data.routes.length > 0) {
        const route = data.routes[0];
        // OSRM coordinates are [lng, lat], convert to Leaflet [lat, lng]
        const leafCoords = route.geometry.coordinates.map(([lng, lat]) => [lat, lng]);
        setRouteCoords(leafCoords);

        // Update real road distance & ETA
        const km = +(route.distance / 1000).toFixed(1);
        const mins = Math.max(3, Math.round(route.duration / 60));
        setDistanceKm(km);
        setEtaMinutes(mins);

        // Generate traffic light intersections along the route (around 30% and 70%)
        if (leafCoords.length > 6) {
          const tl1Index = Math.floor(leafCoords.length * 0.35);
          const tl2Index = Math.floor(leafCoords.length * 0.72);
          setTrafficLights([
            { id: 'tl_1', pos: leafCoords[tl1Index], state: 'GREEN', index: tl1Index },
            { id: 'tl_2', pos: leafCoords[tl2Index], state: 'RED', index: tl2Index },
          ]);
        }
        return leafCoords;
      }
    } catch (err) {
      console.warn('OSRM route fetch fallback to straight path:', err);
    }

    // Fallback: interpolate points if OSRM is unreachable
    const steps = 25;
    const fallback = [];
    for (let i = 0; i <= steps; i++) {
      const r = i / steps;
      fallback.push([
        start[0] + (end[0] - start[0]) * r,
        start[1] + (end[1] - start[1]) * r,
      ]);
    }
    setRouteCoords(fallback);
    return fallback;
  }, []);

  // Sync city prop change
  useEffect(() => {
    const coords = CITY_COORDINATES[city] || CITY_COORDINATES['Бишкек'];
    setUserLocation(coords.user);
    setCourierLocation(coords.courier);
    fetchRoadRoute(coords.courier, coords.user);

    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(coords.user, 14, { duration: 1.2 });
    }
  }, [city, fetchRoadRoute]);

  // 2. Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: userLocation,
      zoom: 14,
      zoomControl: false,
    });

    L.control.zoom({ position: 'topright' }).addTo(map);

    // Initial tile layer (Standard OSM)
    const baseTile = L.tileLayer(TILE_STREET, {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);
    tileLayerRef.current = baseTile;

    // Custom DivIcon for User Location
    const userDivIcon = L.divIcon({
      className: 'user-pin-marker',
      html: `
        <div style="position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center;">
          <span style="position: absolute; width: 40px; height: 40px; border-radius: 50%; background: #3b82f6; opacity: 0.45; animation: ping 1.4s cubic-bezier(0,0,0.2,1) infinite;"></span>
          <div style="width: 34px; height: 34px; border-radius: 50%; background: #2563eb; border: 3px solid #ffffff; box-shadow: 0 4px 12px rgba(0,0,0,0.35); display: flex; align-items: center; justify-content: center; color: white;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
          </div>
          <div style="margin-top: 4px; background: #1e3a8a; color: #ffffff; font-size: 10px; font-weight: 800; padding: 2px 8px; border-radius: 9999px; box-shadow: 0 2px 6px rgba(0,0,0,0.35); white-space: nowrap;">
            ${t('map.myLocation')}
          </div>
        </div>
      `,
      iconSize: [40, 60],
      iconAnchor: [20, 30],
    });

    // Custom DivIcon for Courier Location
    const courierDivIcon = L.divIcon({
      className: 'courier-pin-marker',
      html: `
        <div style="position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center;">
          <span style="position: absolute; width: 46px; height: 46px; border-radius: 50%; background: #10b981; opacity: 0.5; animation: ping 1.2s cubic-bezier(0,0,0.2,1) infinite;"></span>
          <div style="width: 40px; height: 40px; border-radius: 50%; background: #059669; border: 3px solid #ffffff; box-shadow: 0 4px 16px rgba(16,185,129,0.55); display: flex; align-items: center; justify-content: center; color: white;">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>
          </div>
          <div style="margin-top: 4px; background: #064e3b; color: #a7f3d0; font-size: 10px; font-weight: 800; padding: 2px 8px; border-radius: 9999px; box-shadow: 0 2px 6px rgba(0,0,0,0.35); white-space: nowrap;">
            Азамат (~${currentSpeed} ${t('map.speed')})
          </div>
        </div>
      `,
      iconSize: [46, 64],
      iconAnchor: [23, 32],
    });

    const userMarker = L.marker(userLocation, {
      icon: userDivIcon,
      draggable: true,
    }).addTo(map);

    const courierMarker = L.marker(courierLocation, {
      icon: courierDivIcon,
    }).addTo(map);

    const routePolyline = L.polyline([], {
      color: '#10b981',
      weight: 6,
      opacity: 0.9,
      lineCap: 'round',
      lineJoin: 'round',
    }).addTo(map);

    // Click on map to set pinpoint delivery address
    map.on('click', async (e) => {
      const newPos = [e.latlng.lat, e.latlng.lng];
      userMarker.setLatLng(newPos);
      setUserLocation(newPos);

      // Recalculate legal road route immediately
      fetchRoadRoute(courierLocation, newPos);

      // Reverse geocode street name using Nominatim OpenStreetMap
      let addressStr = `${city}, (${e.latlng.lat.toFixed(4)}, ${e.latlng.lng.toFixed(4)})`;
      try {
        const geoRes = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${e.latlng.lat}&lon=${e.latlng.lng}&zoom=18&addressdetails=1&accept-language=${i18n.language}`
        );
        const geoData = await geoRes.json();
        if (geoData && geoData.address) {
          const road = geoData.address.road || geoData.address.suburb || geoData.address.neighbourhood;
          const house = geoData.address.house_number ? `, ${geoData.address.house_number}` : '';
          if (road) addressStr = `${road}${house}`;
        }
      } catch {
        // silent fallback
      }

      if (onAddressSelect) {
        onAddressSelect({
          lat: e.latlng.lat,
          lng: e.latlng.lng,
          estimatedText: addressStr,
        });
      }
    });

    // Drag marker listener
    userMarker.on('dragend', () => {
      const pos = userMarker.getLatLng();
      const newPos = [pos.lat, pos.lng];
      setUserLocation(newPos);
      fetchRoadRoute(courierLocation, newPos);

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

    // Initial route fetch
    fetchRoadRoute(courierLocation, userLocation);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Route Polyline & Markers on data change
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    if (userMarkerRef.current) userMarkerRef.current.setLatLng(userLocation);
    if (courierMarkerRef.current) courierMarkerRef.current.setLatLng(courierLocation);
    if (routePolylineRef.current && routeCoords.length > 0) {
      routePolylineRef.current.setLatLngs(routeCoords);
    }
  }, [userLocation, courierLocation, routeCoords]);

  // Update Traffic Light Markers on the map
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // Clear previous traffic light markers
    trafficLightMarkersRef.current.forEach((m) => m.remove());
    trafficLightMarkersRef.current = [];

    // Create custom Traffic Light DivIcons
    trafficLights.forEach((tl) => {
      const colorBg = tl.state === 'RED' ? '#ef4444' : tl.state === 'YELLOW' ? '#f59e0b' : '#10b981';
      const labelText = 'Светофор';

      const tlIcon = L.divIcon({
        className: 'tl-marker',
        html: `
          <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <div style="background: #0f172a; padding: 4px; border-radius: 8px; border: 2px solid ${colorBg}; box-shadow: 0 4px 10px rgba(0,0,0,0.4); display: flex; flex-direction: column; gap: 3px;">
              <span style="width: 8px; height: 8px; border-radius: 50%; background: ${tl.state === 'RED' ? '#ef4444' : '#334155'}; box-shadow: ${tl.state === 'RED' ? '0 0 8px #ef4444' : 'none'};"></span>
              <span style="width: 8px; height: 8px; border-radius: 50%; background: ${tl.state === 'YELLOW' ? '#f59e0b' : '#334155'}; box-shadow: ${tl.state === 'YELLOW' ? '0 0 8px #f59e0b' : 'none'};"></span>
              <span style="width: 8px; height: 8px; border-radius: 50%; background: ${tl.state === 'GREEN' ? '#10b981' : '#334155'}; box-shadow: ${tl.state === 'GREEN' ? '0 0 8px #10b981' : 'none'};"></span>
            </div>
            <div style="margin-top: 2px; font-size: 9px; font-weight: 800; color: ${colorBg}; background: #0f172a; padding: 1px 4px; border-radius: 4px; white-space: nowrap;">
              ${labelText}
            </div>
          </div>
        `,
        iconSize: [28, 48],
        iconAnchor: [14, 24],
      });

      const marker = L.marker(tl.pos, { icon: tlIcon }).addTo(mapInstanceRef.current);
      trafficLightMarkersRef.current.push(marker);
    });
  }, [trafficLights]);

  // 3. Tile Layer Switcher: Street vs Satellite
  const toggleMapLayer = () => {
    if (!mapInstanceRef.current || !tileLayerRef.current) return;

    mapInstanceRef.current.removeLayer(tileLayerRef.current);
    if (mapLayer === 'street') {
      const satLayer = L.tileLayer(TILE_SATELLITE, {
        maxZoom: 19,
        attribution: 'Tiles &copy; Esri World Imagery',
      }).addTo(mapInstanceRef.current);
      tileLayerRef.current = satLayer;
      setMapLayer('satellite');
    } else {
      const streetLayer = L.tileLayer(TILE_STREET, {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors',
      }).addTo(mapInstanceRef.current);
      tileLayerRef.current = streetLayer;
      setMapLayer('street');
    }
  };

  // 4. Live Simulation with Real Traffic Light Stops
  useEffect(() => {
    if (!isSimulating || routeCoords.length === 0) {
      if (animationTimerRef.current) clearInterval(animationTimerRef.current);
      return;
    }

    let currentIndex = 0;
    let isWaitingTrafficLight = false;
    setStatusKey('statusMoving');

    animationTimerRef.current = setInterval(() => {
      if (isWaitingTrafficLight) return;

      currentIndex++;
      if (currentIndex >= routeCoords.length) {
        setIsSimulating(false);
        setEtaMinutes(1);
        setDistanceKm(0.1);
        setCurrentSpeed(0);
        setStatusKey('statusArrived');
        clearInterval(animationTimerRef.current);
        return;
      }

      const nextPos = routeCoords[currentIndex];
      if (courierMarkerRef.current) {
        courierMarkerRef.current.setLatLng(nextPos);
      }

      // Check if courier reached a traffic light
      const hitTl = trafficLights.find((tl) => Math.abs(tl.index - currentIndex) <= 1 && tl.state === 'RED');
      if (hitTl) {
        isWaitingTrafficLight = true;
        setCurrentSpeed(0);
        setStatusKey('statusTrafficLight');

        // Turn red -> yellow -> green after 2.5 seconds
        setTimeout(() => {
          setTrafficLights((prev) =>
            prev.map((t) => (t.id === hitTl.id ? { ...t, state: 'YELLOW' } : t))
          );
        }, 1500);

        setTimeout(() => {
          setTrafficLights((prev) =>
            prev.map((t) => (t.id === hitTl.id ? { ...t, state: 'GREEN' } : t))
          );
          setStatusKey('statusGreenLight');
          setCurrentSpeed(28);
          isWaitingTrafficLight = false;
        }, 3000);
      } else {
        setCurrentSpeed(Math.floor(22 + Math.random() * 8));
      }

      // Dynamically calculate progress & update ETA
      const progress = currentIndex / routeCoords.length;
      const remDistance = Math.max(0.1, +(distanceKm * (1 - progress)).toFixed(1));
      const remEta = Math.max(1, Math.round(etaMinutes * (1 - progress)));

      setDistanceKm(remDistance);
      setEtaMinutes(remEta);
    }, 1100);

    return () => {
      if (animationTimerRef.current) clearInterval(animationTimerRef.current);
    };
  }, [isSimulating, routeCoords, trafficLights, distanceKm, etaMinutes]);

  // Center on user location
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

  // Fit bounds to show whole route
  const handleFitBounds = () => {
    if (mapInstanceRef.current && routeCoords.length > 0) {
      const bounds = L.latLngBounds(routeCoords);
      mapInstanceRef.current.fitBounds(bounds, { padding: [50, 50] });
    }
  };

  // Reset simulation
  const handleReset = () => {
    setIsSimulating(false);
    const coords = CITY_COORDINATES[city] || CITY_COORDINATES['Бишкек'];
    setCourierLocation(coords.courier);
    if (courierMarkerRef.current) courierMarkerRef.current.setLatLng(coords.courier);
    setStatusKey('statusWarehouse');
    setCurrentSpeed(25);
    fetchRoadRoute(coords.courier, userLocation);
    handleFitBounds();
  };

  // High-Accuracy GPS Geolocation
  const handleDetectGPS = () => {
    if (!navigator.geolocation) {
      setGpsError('Геолокация не поддерживается вашим браузером');
      return;
    }

    setGpsLoading(true);
    setGpsError('');

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        setGpsLoading(false);
        const newCoords = [pos.coords.latitude, pos.coords.longitude];
        setGpsAccuracy(Math.round(pos.coords.accuracy));
        setUserLocation(newCoords);

        if (userMarkerRef.current) userMarkerRef.current.setLatLng(newCoords);

        // Add GPS accuracy radius circle on map
        if (mapInstanceRef.current) {
          if (accuracyCircleRef.current) {
            accuracyCircleRef.current.remove();
          }
          const circle = L.circle(newCoords, {
            radius: Math.max(15, pos.coords.accuracy),
            color: '#3b82f6',
            fillColor: '#60a5fa',
            fillOpacity: 0.15,
            weight: 2,
          }).addTo(mapInstanceRef.current);
          accuracyCircleRef.current = circle;

          mapInstanceRef.current.flyTo(newCoords, 17, { duration: 1.2 });
        }

        // Fetch legal road route to new GPS position
        fetchRoadRoute(courierLocation, newCoords);

        // Reverse geocode via Nominatim
        let addressText = `${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`;
        try {
          const geoRes = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&zoom=18&addressdetails=1&accept-language=${i18n.language}`
          );
          const geoData = await geoRes.json();
          if (geoData && geoData.address) {
            const road = geoData.address.road || geoData.address.suburb;
            const house = geoData.address.house_number ? `, ${geoData.address.house_number}` : '';
            if (road) addressText = `${road}${house}`;
          }
        } catch {
          // fallback
        }

        if (onAddressSelect) {
          onAddressSelect({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            estimatedText: addressText,
          });
        }
      },
      (err) => {
        setGpsLoading(false);
        setGpsError(err.message || 'Ошибка определения GPS');
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
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
                {t('map.title')}
              </h3>
              <span className="bg-emerald-400 text-emerald-950 font-black text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
                {t('map.liveGps')}
              </span>
            </div>
            <p className="text-xs text-emerald-100 font-medium">
              {city} • {t(`map.${statusKey}`)}
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
                <span>{t('map.pause')}</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                <span>{t('map.liveTracking')}</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="p-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white transition-colors cursor-pointer"
            title={t('map.reset')}
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Map Container */}
      <div className="px-4 sm:px-5">
        <div className="relative w-full h-[380px] sm:h-[450px] rounded-2xl overflow-hidden border border-gray-200 dark:border-darkBorder shadow-inner">
          <div ref={mapContainerRef} className="w-full h-full z-10" />

          {/* Top-Left Quick Controls */}
          <div className="absolute top-3 left-3 z-20 flex flex-col gap-2">
            <button
              type="button"
              onClick={handleDetectGPS}
              disabled={gpsLoading}
              className="bg-white/95 dark:bg-darkCard/95 hover:bg-white text-gray-800 dark:text-gray-100 text-xs font-bold px-3 py-2 rounded-xl shadow-md border border-gray-100 dark:border-darkBorder flex items-center gap-1.5 cursor-pointer transition-all"
            >
              <Navigation className={`w-3.5 h-3.5 text-blue-600 ${gpsLoading ? 'animate-spin' : ''}`} />
              <span>{gpsLoading ? t('map.detectingGps') : t('map.myLocation')}</span>
            </button>

            <button
              type="button"
              onClick={handleCenterCourier}
              className="bg-white/95 dark:bg-darkCard/95 hover:bg-white text-gray-800 dark:text-gray-100 text-xs font-semibold px-3 py-2 rounded-xl shadow-xs border border-gray-100 dark:border-darkBorder flex items-center gap-1.5 cursor-pointer transition-colors hover:border-slate-300"
            >
              <Truck className="w-3.5 h-3.5 text-emerald-500" />
              <span>{t('map.whereCourier')}</span>
            </button>

            <button
              type="button"
              onClick={handleFitBounds}
              className="bg-white/95 dark:bg-darkCard/95 hover:bg-white text-gray-800 dark:text-gray-100 text-xs font-bold px-3 py-2 rounded-xl shadow-md border border-gray-100 dark:border-darkBorder flex items-center gap-1.5 cursor-pointer transition-all"
            >
              <Maximize2 className="w-3.5 h-3.5 text-gray-500" />
              <span>{t('map.fitRoute')}</span>
            </button>

            {/* Satellite / Street Map Layer Switcher */}
            <button
              type="button"
              onClick={toggleMapLayer}
              className="bg-white/95 dark:bg-darkCard/95 hover:bg-white text-gray-800 dark:text-gray-100 text-xs font-bold px-3 py-2 rounded-xl shadow-md border border-gray-100 dark:border-darkBorder flex items-center gap-1.5 cursor-pointer transition-all"
            >
              <Layers className="w-3.5 h-3.5 text-brand-600" />
              <span>{mapLayer === 'street' ? t('map.layerSatellite') : t('map.layerStreet')}</span>
            </button>
          </div>

          {/* GPS Accuracy Indicator */}
          {gpsAccuracy && (
            <div className="absolute top-3 right-14 z-20 bg-white/90 dark:bg-darkCard/90 text-blue-700 dark:text-blue-300 text-[11px] font-bold px-2.5 py-1 rounded-xl shadow-sm border border-blue-100 dark:border-blue-900/40">
              {t('map.gpsAccuracy')} ±{gpsAccuracy}m
            </div>
          )}

          {/* Bottom Map Floating Info Bar */}
          <div className="absolute bottom-3 left-3 right-3 z-20 bg-white/95 dark:bg-darkCard/95 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-gray-100 dark:border-darkBorder flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-extrabold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                  <span>{t('map.deliveryTime')} ~{etaMinutes} min</span>
                  <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                    ({distanceKm} km {t('map.distance')})
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">
                  {currentAddress || t('map.mapHint')}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <a
                href="tel:+996700889900"
                className="flex-1 sm:flex-none px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{t('map.call')}</span>
              </a>

              <a
                href="https://wa.me/996700889900"
                target="_blank"
                rel="noreferrer"
                className="flex-1 sm:flex-none px-3 py-1.5 rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>{t('map.whatsapp')}</span>
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

      {/* Courier Profile & Guarantee Card */}
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
                  {t('map.courierProfile')}
                </h4>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 flex items-center gap-1">
                  {t('map.courierRating')}
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {t('map.courierVehicle')} • {t('map.courierPhone')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-brand-700 dark:text-brand-300">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>{t('map.securityGuarantee')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourierDeliveryMap;
