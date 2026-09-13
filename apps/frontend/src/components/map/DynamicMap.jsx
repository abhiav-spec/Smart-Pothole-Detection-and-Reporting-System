"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import L from "leaflet";

// Component to handle external control of the map (zoom/center)
function MapController({ center, zoom, userLocation }) {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.setView(center, map.getZoom());
    }
  }, [center, map]);

  useEffect(() => {
    if (zoom) {
      map.setZoom(zoom);
    }
  }, [zoom, map]);

  useEffect(() => {
    if (userLocation) {
      map.flyTo(userLocation, 16);
    }
  }, [userLocation, map]);

  return null;
}

export default function DynamicMap({ center, zoom, userLocation, potholes }) {
  return (
    <MapContainer
      center={center || [21.2514, 81.6296]}
      zoom={zoom || 13}
      style={{ height: "100%", width: "100%", zIndex: 10, background: "#eaedff" }}
      zoomControl={false} // We are using custom zoom controls
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapController center={center} zoom={zoom} userLocation={userLocation} />
      
      {/* Example logic for rendering potholes */}
      {potholes && potholes.map((pothole) => (
        <Marker key={pothole.id} position={[pothole.latitude, pothole.longitude]}>
          <Popup>
            <div className="text-sm">
              <p className="font-bold">Severity: {pothole.severity}</p>
              <p>Status: {pothole.status}</p>
            </div>
          </Popup>
        </Marker>
      ))}

      {/* Render user location if available */}
      {userLocation && (
        <Marker position={userLocation}>
          <Popup>You are here</Popup>
        </Marker>
      )}
    </MapContainer>
  );
}
