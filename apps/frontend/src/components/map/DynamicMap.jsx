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

// Helper to get color based on severity
const getSeverityColor = (severity) => {
  switch(severity?.toUpperCase()) {
    case 'CRITICAL': return '#ba1a1a'; // red
    case 'HIGH': return '#ea580c'; // orange
    case 'MEDIUM': return '#ca8a04'; // yellow
    case 'LOW': return '#4c662b'; // green
    default: return '#ba1a1a'; // default to red
  }
};

const createCustomIcon = (severity) => {
  const color = getSeverityColor(severity);
  return L.divIcon({
    className: 'custom-pothole-marker',
    html: `<div style="background-color: ${color}; width: 16px; height: 16px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.4);"></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
    popupAnchor: [0, -10]
  });
};

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
        <Marker 
          key={pothole.id} 
          position={[parseFloat(pothole.latitude), parseFloat(pothole.longitude)]}
          icon={createCustomIcon(pothole.severity)}
        >
          <Popup className="custom-popup">
            <div className="flex flex-col gap-2 min-w-[200px] p-0.5">
              {pothole.media && pothole.media.length > 0 && (
                <div className="w-full h-32 rounded-lg overflow-hidden relative">
                  <img 
                    src={pothole.media[0].url} 
                    alt="Pothole" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-1 right-1 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded backdrop-blur-sm">
                    {pothole.confidence ? `${Math.round(pothole.confidence * 100)}% Match` : 'Reported'}
                  </div>
                </div>
              )}
              
              <div className="flex flex-col gap-1.5 mt-1">
                <div className="flex items-center gap-2 pb-1 border-b border-gray-100">
                  <div style={{ backgroundColor: getSeverityColor(pothole.severity) }} className="w-2.5 h-2.5 rounded-full shadow-sm"></div>
                  <span className="font-bold text-[14px] text-gray-800 leading-tight">
                    {pothole.severity ? `${pothole.severity} Severity` : 'Reported Pothole'}
                  </span>
                </div>
                
                <div className="text-[12px] text-gray-600 flex flex-col gap-1">
                  <p className="flex justify-between items-center">
                    <span className="font-medium text-gray-500">Status:</span> 
                    <span className="font-semibold text-gray-800 bg-gray-100 px-1.5 py-0.5 rounded-md text-[11px] uppercase tracking-wider">{pothole.status || 'Pending'}</span>
                  </p>
                  <p className="flex justify-between items-center">
                    <span className="font-medium text-gray-500">Date:</span> 
                    <span className="font-medium text-gray-800">{pothole.createdAt ? new Date(pothole.createdAt).toLocaleDateString() : 'Unknown'}</span>
                  </p>
                  <p className="flex justify-between items-center">
                    <span className="font-medium text-gray-500">Coordinates:</span> 
                    <span className="font-medium text-gray-800">{parseFloat(pothole.latitude).toFixed(4)}, {parseFloat(pothole.longitude).toFixed(4)}</span>
                  </p>
                </div>
              </div>
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
