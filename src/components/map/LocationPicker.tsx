'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L, { LatLngLiteral } from 'leaflet';

// --- Fix Leaflet marker icons in Next ---
const DefaultIcon = L.icon({
  iconUrl:   'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize:  [25, 41],
  iconAnchor:[12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

interface PickedLocation {
  latitude: string;
  longitude: string;
  address: string;
}

interface LocationPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (loc: PickedLocation) => void;
  initialCenter?: LatLngLiteral; // default Lagos
  initialZoom?: number;          // default 12
  nominatimEmail?: string;       // optional
}

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

async function reverseGeocode(lat: number, lon: number, email?: string) {
  const params = new URLSearchParams({
    format: 'jsonv2',
    lat: String(lat),
    lon: String(lon),
    'accept-language': 'en',
  });
  if (email) params.set('email', email);

  const url = `https://nominatim.openstreetmap.org/reverse?${params.toString()}`;
  const res = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error(`Reverse geocoding failed (${res.status})`);
  const data = await res.json();
  return (data?.display_name as string) || '';
}

function ClickCapture({ onPoint }: { onPoint: (latlng: LatLngLiteral) => void }) {
  useMapEvents({
    click(e) {
      onPoint({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return null;
}

// Re-invalidate whenever modal opens
function InvalidateOnOpen({ isOpen }: { isOpen: boolean }) {
  const map = useMap();
  useEffect(() => {
    if (isOpen) {
      // let the modal finish layout, then fix size
      setTimeout(() => map.invalidateSize(), 0);
    }
  }, [isOpen, map]);
  return null;
}

export default function LocationPickerModal({
  isOpen,
  onClose,
  onSave,
  initialCenter = { lat: 6.5244, lng: 3.3792 },
  initialZoom = 12,
  nominatimEmail,
}: LocationPickerModalProps) {
  const [marker, setMarker] = useState<LatLngLiteral | null>(null);
  const [picked, setPicked] = useState<PickedLocation | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const lastClickRef = useRef<number>(0);

  // render map only in browser
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  const onBackdropClick = () => onClose();
  const stop = (e: React.MouseEvent) => e.stopPropagation();

  // wrapper has fixed height; map fills it
  const wrapperClass = 'h-[360px] w-full rounded-lg overflow-hidden';

  const handlePoint = useCallback(
    async (latlng: LatLngLiteral) => {
      const now = Date.now();
      if (now - lastClickRef.current < 400) return; // throttle
      lastClickRef.current = now;

      setErr(null);
      setLoading(true);
      setMarker(latlng);
      try {
        await sleep(50);
        const address = await reverseGeocode(latlng.lat, latlng.lng, nominatimEmail);
        setPicked({
          latitude: `${latlng.lat}`,
          longitude: `${latlng.lng}`,
          address,
        });
      } catch (e: any) {
        setErr(e?.message || 'Failed to resolve address');
      } finally {
        setLoading(false);
      }
    },
    [nominatimEmail]
  );

  const handleUseThisLocation = () => {
    if (picked) onSave(picked);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/10 backdrop-blur-sm z-50"
        onClick={onBackdropClick}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onBackdropClick}>
        <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6" onClick={stop}>
          {/* Title */}
          <h2 className="text-xl font-bold text-gray-900 mb-2">Pick a location</h2>

          {/* Instruction */}
          <p className="text-sm text-gray-600 mb-4">
            Click on the map to choose a spot. We’ll resolve the address automatically.
          </p>

          {/* Map wrapper with explicit height */}
          <div className={`mb-4 ${wrapperClass}`}>
            {isClient ? (
              <MapContainer
                key={isOpen ? 'open' : 'closed'}         // force fresh mount when opened
                center={initialCenter}
                zoom={initialZoom}
                className="h-full w-full"                 // fill wrapper
              >
                <TileLayer
                  attribution="&copy; OpenStreetMap contributors"
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <InvalidateOnOpen isOpen={isOpen} />
                <ClickCapture onPoint={handlePoint} />
                {marker && <Marker position={marker} />}
              </MapContainer>
            ) : (
              <div className="h-full w-full" />
            )}
          </div>

          {/* Result */}
          <div className="text-sm text-gray-800 space-y-1 mb-6 min-h-[64px]">
            <div><b>Address:</b> {loading ? 'Resolving…' : picked?.address || '—'}</div>
            <div><b>Latitude:</b> {picked ? picked.latitude : '—'}</div>
            <div><b>Longitude:</b> {picked ? picked.longitude : '—'}</div>
            {err && <div className="text-red-600"><b>Error:</b> {err}</div>}
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 font-medium rounded hover:bg-gray-100 transition-colors"
            >
              CANCEL
            </button>
            <button
              onClick={handleUseThisLocation}
              disabled={!picked || loading}
              className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'PLEASE WAIT…' : 'USE THIS LOCATION'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
