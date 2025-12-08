"use client";

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';

// Fix for default marker icons in Next.js
delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface InteractiveMapProps {
    center: [number, number];
    zoom?: number;
    markers?: Array<{
        position: [number, number];
        title: string;
        content?: string;
    }>;
    route?: [number, number][];
}

function MapUpdater({ center, zoom }: { center: [number, number], zoom: number }) {
    const map = useMap();
    useEffect(() => {
        map.flyTo(center, zoom);
    }, [center, zoom, map]);
    return null;
}

export default function InteractiveMap({ center, zoom = 10, markers = [], route = [] }: InteractiveMapProps) {
    return (
        <div className="h-[400px] w-full rounded-xl overflow-hidden border border-arctic-ice/20 shadow-lg relative z-0">
            <MapContainer
                center={center}
                zoom={zoom}
                scrollWheelZoom={false}
                className="h-full w-full bg-arctic-ice/5"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <MapUpdater center={center} zoom={zoom} />

                {markers.map((marker, idx) => (
                    <Marker key={idx} position={marker.position}>
                        <Popup>
                            <div className="font-sans">
                                <h3 className="font-bold text-arctic-blue">{marker.title}</h3>
                                {marker.content && <p className="text-sm text-arctic-night/80">{marker.content}</p>}
                            </div>
                        </Popup>
                    </Marker>
                ))}

                {route.length > 0 && (
                    <Polyline
                        positions={route}
                        color="#0A2540" // Arctic Blue
                        weight={3}
                        opacity={0.7}
                        dashArray="10, 10"
                    />
                )}
            </MapContainer>
        </div>
    );
}
