"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamically import the map component to avoid SSR 'window' errors
const DynamicMap = dynamic(() => import("./DynamicMap"), {
  ssr: false,
  loading: () => <div className="w-full h-full flex items-center justify-center bg-surface-container-low text-on-surface-variant">Loading Map...</div>
});

export default function ExploreMap() {
  const [currentZoom, setCurrentZoom] = useState(13);
  const [mapCenter, setMapCenter] = useState([21.2514, 81.6296]); // Default center (e.g., Raipur)
  const [userLocation, setUserLocation] = useState(null);
  
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [isLocating, setIsLocating] = useState(false);

  const [potholes, setPotholes] = useState([]);
  const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";

  useEffect(() => {
    // Auth check
    const savedUser = localStorage.getItem("user");
    if (!localStorage.getItem("accessToken") || !savedUser) {
      window.location.href = "/login";
      return;
    }

    const fetchPotholes = async () => {
      try {
        const res = await fetch(`${backendUrl}/dashboard/map`);
        const json = await res.json();
        if (json.success && json.data) {
          setPotholes(json.data);
        }
      } catch (err) {
        console.error("Failed to fetch map data", err);
      }
    };
    fetchPotholes();
  }, [backendUrl]);

  const handleZoom = (delta) => {
    setCurrentZoom(prev => Math.min(Math.max(prev + delta, 3), 18));
  };

  const triggerGeolocation = () => {
    setIsLocating(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setIsLocating(false);
          const newLoc = [pos.coords.latitude, pos.coords.longitude];
          setUserLocation(newLoc);
          setMapCenter(newLoc);
          setCurrentZoom(16);
          displayToast(`Location locked: ${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`);
        },
        (err) => {
          setIsLocating(false);
          displayToast('Unable to fetch GPS position. Check permissions.');
        },
        { timeout: 5000 }
      );
    } else {
      setTimeout(() => {
        setIsLocating(false);
        displayToast('Geolocation is not supported by your browser.');
      }, 500);
    }
  };

  const displayToast = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3500);
  };

  const handleSearch = async (e) => {
    if (e.key === 'Enter') {
      const q = e.target.value.trim();
      if (q) {
        displayToast(`Searching for "${q}"...`);
        try {
          // Simple Nominatim Geocoding Search
          const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}`);
          const data = await res.json();
          if (data && data.length > 0) {
            const result = data[0];
            setMapCenter([parseFloat(result.lat), parseFloat(result.lon)]);
            setCurrentZoom(14);
            displayToast(`Found: ${result.display_name.substring(0, 30)}...`);
          } else {
            displayToast(`No results found for "${q}"`);
          }
        } catch (err) {
          displayToast('Error fetching location data.');
        }
      }
    }
  };

  return (
    <main className="w-full pt-16 bg-background flex-1">
      <div className="flex flex-col w-full h-full relative">
        {/* Interactive Map Canvas Container */}
        <div 
          className="relative w-full h-[calc(100vh-4rem)] overflow-hidden bg-surface-container-low" 
          id="map"
        >
          {/* Render the actual Leaflet Map */}
          <div className="absolute inset-0 z-0">
            <DynamicMap 
              center={mapCenter} 
              zoom={currentZoom} 
              userLocation={userLocation} 
              potholes={potholes} 
            />
          </div>

          {/* Back Button */}
          <div className="absolute top-4 left-4 z-50 pointer-events-none">
            <button
              onClick={() => window.history.back()}
              className="pointer-events-auto w-11 h-11 bg-surface-container-lowest/95 backdrop-blur-md rounded-xl shadow-xl border border-outline-variant/20 flex items-center justify-center text-on-surface hover:bg-surface-container-low transition-colors"
              title="Go Back"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            </button>
          </div>

          {/* Floating Overlay: Search Bar */}
          <div className="absolute top-4 left-20 right-4 z-40 max-w-2xl mx-auto pointer-events-none">
            <div className="pointer-events-auto bg-surface-container-lowest/95 backdrop-blur-md rounded-2xl shadow-xl p-2 sm:p-2.5 flex flex-col sm:flex-row items-center gap-2 border border-outline-variant/20">
              <div className="relative flex-1 w-full flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-[20px]">search</span>
                <input 
                  className="w-full h-11 pl-10 pr-4 bg-surface-container-low rounded-xl font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all border-none" 
                  id="location-search-input" 
                  onKeyDown={handleSearch} 
                  placeholder="Search location... (e.g., MG Road, Raipur)" 
                  type="text" 
                />
              </div>
              <button 
                className="w-full sm:w-auto h-11 px-4 rounded-xl bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-container transition-all flex items-center justify-center gap-2 shrink-0 shadow-sm group" 
                id="btn-geolocation" 
                onClick={triggerGeolocation}
              >
                {isLocating ? (
                  <>
                    <span className="material-symbols-outlined text-[18px] animate-spin">refresh</span>
                    <span>Locating...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[18px]">my_location</span>
                    <span className="whitespace-nowrap">Use My Location</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Floating Controls: Zoom & Location */}
          <div className="absolute top-24 right-4 z-30 flex flex-col gap-2 pointer-events-none">
            <div className="flex flex-col bg-surface-container-lowest rounded-xl shadow-lg overflow-hidden border border-outline-variant/30 pointer-events-auto">
              <button 
                className="w-10 h-10 flex items-center justify-center text-on-surface hover:bg-surface-container active:bg-surface-container-high transition-colors" 
                onClick={() => handleZoom(1)} 
                title="Zoom in"
              >
                <span className="material-symbols-outlined text-[20px]">add</span>
              </button>
              <div className="h-[1px] w-full bg-surface-container"></div>
              <button 
                className="w-10 h-10 flex items-center justify-center text-on-surface hover:bg-surface-container active:bg-surface-container-high transition-colors" 
                onClick={() => handleZoom(-1)} 
                title="Zoom out"
              >
                <span className="material-symbols-outlined text-[20px]">remove</span>
              </button>
            </div>
            <button 
              className="w-10 h-10 rounded-xl bg-surface-container-lowest text-primary hover:bg-surface-container shadow-lg flex items-center justify-center transition-colors border border-outline-variant/30 pointer-events-auto" 
              onClick={triggerGeolocation} 
              title="My Location"
            >
              <span className="material-symbols-outlined text-[20px]">my_location</span>
            </button>
          </div>

          {/* Floating Legend */}
          <div className="absolute bottom-6 left-4 z-30 max-w-xs pointer-events-none">
            <div className="p-3.5 rounded-2xl bg-surface-container-lowest/95 backdrop-blur-md shadow-xl border border-outline-variant/20 flex flex-col gap-2.5 pointer-events-auto">
              <div className="flex items-center gap-1.5 text-on-surface font-headline-sm text-[13px] font-bold">
                <span className="material-symbols-outlined text-[16px] text-primary">legend_toggle</span>
                <span>Hazard Severity Legend</span>
              </div>
              <div className="space-y-1.5 text-[12px]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-error shrink-0"></span>
                  <span className="font-medium text-on-surface">Critical</span>
                  <span className="text-on-surface-variant text-[11px] ml-auto">Deep / structural</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#EA580C] shrink-0"></span>
                  <span className="font-medium text-on-surface">High</span>
                  <span className="text-on-surface-variant text-[11px] ml-auto">Severe impact</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#CA8A04] shrink-0"></span>
                  <span className="font-medium text-on-surface">Medium</span>
                  <span className="text-on-surface-variant text-[11px] ml-auto">Moderate dip</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-tertiary shrink-0"></span>
                  <span className="font-medium text-on-surface">Low</span>
                  <span className="text-on-surface-variant text-[11px] ml-auto">Minor crack</span>
                </div>
              </div>
            </div>
          </div>

          {/* Geo Toast */}
          <div 
            className={`absolute top-20 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 transform ${showToast ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6 pointer-events-none'} bg-inverse-surface text-inverse-on-surface px-4 py-2 rounded-xl shadow-xl flex items-center gap-2 text-body-sm font-medium`} 
            id="geo-toast"
          >
            <span className="material-symbols-outlined text-[18px] text-primary-fixed">gps_fixed</span>
            <span id="geo-toast-msg">{toastMessage}</span>
          </div>
        </div>
      </div>
    </main>
  );
}
