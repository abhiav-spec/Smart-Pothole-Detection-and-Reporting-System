"use client";
import React, { useRef, useState, useEffect } from "react";

export default function ExploreMap() {
  const mapWorldRef = useRef(null);
  const mapViewportRef = useRef(null);
  
  const [currentZoom, setCurrentZoom] = useState(1);
  const [currentX, setCurrentX] = useState(-120);
  const [currentY, setCurrentY] = useState(-80);
  
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [isLocating, setIsLocating] = useState(false);

  const updateMapTransform = (x, y, zoom) => {
    if (mapWorldRef.current) {
      mapWorldRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${zoom})`;
    }
  };

  const handleZoom = (delta) => {
    const newZoom = Math.min(Math.max(currentZoom + delta, 0.75), 1.6);
    setCurrentZoom(newZoom);
    updateMapTransform(currentX, currentY, newZoom);
  };

  const triggerGeolocation = () => {
    setIsLocating(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setIsLocating(false);
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

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      const q = e.target.value.trim();
      if (q) {
        displayToast(`Searching for "${q}"...`);
      }
    }
  };

  // Dragging logic
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDraggingRef.current) return;
      const newX = e.clientX - startXRef.current;
      const newY = e.clientY - startYRef.current;
      setCurrentX(newX);
      setCurrentY(newY);
      updateMapTransform(newX, newY, currentZoom);
    };

    const handleMouseUp = () => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        if (mapWorldRef.current) {
          mapWorldRef.current.style.transition = 'transform 0.5s ease-out';
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [currentZoom]);

  const handleMouseDown = (e) => {
    if (e.target.closest('button, input, a')) return;
    isDraggingRef.current = true;
    startXRef.current = e.clientX - currentX;
    startYRef.current = e.clientY - currentY;
    if (mapWorldRef.current) {
      mapWorldRef.current.style.transition = 'none';
    }
  };

  return (
    <main className="w-full pt-16 bg-background">
      <div className="flex flex-col w-full relative">
        {/* Interactive Map Canvas Container */}
        <div 
          className="relative w-full h-[calc(100vh-4rem)] overflow-hidden select-none bg-surface-container-low" 
          id="map"
          ref={mapViewportRef}
          onMouseDown={handleMouseDown}
        >
          {/* Clean Vector Stylized Map Base */}
          <div 
            className="absolute -inset-[25%] w-[150%] h-[150%] transition-transform duration-500 ease-out cursor-grab active:cursor-grabbing origin-center" 
            id="map-world"
            ref={mapWorldRef}
            style={{ transform: `translate3d(${currentX}px, ${currentY}px, 0px) scale(${currentZoom})` }}
          >
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern height="120" id="osm-grid" patternUnits="userSpaceOnUse" width="120">
                  <rect fill="#f8fafc" height="120" width="120"></rect>
                  <rect fill="#f1f5f9" height="104" opacity="0.8" rx="6" width="104" x="8" y="8"></rect>
                </pattern>
                <pattern height="60" id="park-fill" patternUnits="userSpaceOnUse" width="60">
                  <rect fill="#e8f5e9" height="60" width="60"></rect>
                  <circle cx="20" cy="20" fill="#c8e6c9" r="1.5"></circle>
                  <circle cx="45" cy="40" fill="#c8e6c9" r="2"></circle>
                </pattern>
              </defs>
              {/* Base Landmass Grid */}
              <rect fill="url(#osm-grid)" height="100%" width="100%"></rect>
              {/* River / Stream Channel */}
              <path d="M-100 800 C 400 700, 700 900, 1100 750 C 1500 600, 1900 850, 2400 800" fill="none" stroke="#dbeafe" strokeLinecap="round" strokeWidth="48"></path>
              <path d="M-100 800 C 400 700, 700 900, 1100 750 C 1500 600, 1900 850, 2400 800" fill="none" stroke="#bfdbfe" strokeLinecap="round" strokeWidth="36"></path>
              {/* Green Areas / Municipal Parks */}
              <polygon fill="url(#park-fill)" points="320,240 580,210 620,440 360,460"></polygon>
              <polygon fill="url(#park-fill)" points="1200,340 1480,310 1520,580 1240,610"></polygon>
              <polygon fill="url(#park-fill)" points="780,820 1020,790 980,1020 740,990"></polygon>
              {/* Major Arterial Highways */}
              <path d="M-200 420 L 2600 420" stroke="#fde047" strokeLinecap="round" strokeWidth="26"></path>
              <path d="M-200 420 L 2600 420" stroke="#ffffff" strokeLinecap="round" strokeWidth="22"></path>
              {/* Main Road Corridor */}
              <path d="M720 -100 L 720 1600" stroke="#fde047" strokeLinecap="round" strokeWidth="24"></path>
              <path d="M720 -100 L 720 1600" stroke="#ffffff" strokeLinecap="round" strokeWidth="20"></path>
              {/* Station Road & Junction Spurs */}
              <path d="M100 1100 L 1900 200" stroke="#cbd5e1" strokeLinecap="round" strokeWidth="18"></path>
              <path d="M100 1100 L 1900 200" stroke="#ffffff" strokeLinecap="round" strokeWidth="14"></path>
              {/* Ring Road Outer Arc */}
              <path d="M250 1400 Q 1400 1350 1750 350" fill="none" stroke="#94a3b8" strokeWidth="18"></path>
              <path d="M250 1400 Q 1400 1350 1750 350" fill="none" stroke="#f8fafc" strokeWidth="14"></path>
              {/* Local Streets & Urban Grid */}
              <g stroke="#ffffff" strokeLinecap="square" strokeWidth="8">
                <line x1="200" x2="1200" y1="180" y2="180"></line>
                <line x1="300" x2="1400" y1="620" y2="620"></line>
                <line x1="450" x2="1600" y1="840" y2="840"></line>
                <line x1="380" x2="380" y1="100" y2="900"></line>
                <line x1="1040" x2="1040" y1="100" y2="1100"></line>
                <line x1="1380" x2="1380" y1="200" y2="1200"></line>
              </g>
            </svg>
            {/* Marker Layer */}
            <div className="absolute inset-0 pointer-events-none" id="api-marker-layer"></div>
          </div>

          {/* Floating Overlay: Search Bar */}
          <div className="absolute top-4 left-4 right-4 z-40 max-w-2xl mx-auto pointer-events-none">
            <div className="pointer-events-auto bg-surface-container-lowest/95 backdrop-blur-md rounded-2xl shadow-xl p-2 sm:p-2.5 flex flex-col sm:flex-row items-center gap-2 border border-outline-variant/20">
              <div className="relative flex-1 w-full flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-[20px]">search</span>
                <input 
                  className="w-full h-11 pl-10 pr-4 bg-surface-container-low rounded-xl font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all border-none" 
                  id="location-search-input" 
                  onKeyDown={handleSearch} 
                  placeholder="Search location... (e.g., MG Road, Guna, Raipur)" 
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
          <div className="absolute top-24 right-4 z-30 flex flex-col gap-2">
            <div className="flex flex-col bg-surface-container-lowest rounded-xl shadow-lg overflow-hidden border border-outline-variant/30">
              <button 
                className="w-10 h-10 flex items-center justify-center text-on-surface hover:bg-surface-container active:bg-surface-container-high transition-colors" 
                onClick={() => handleZoom(0.15)} 
                title="Zoom in"
              >
                <span className="material-symbols-outlined text-[20px]">add</span>
              </button>
              <div className="h-[1px] w-full bg-surface-container"></div>
              <button 
                className="w-10 h-10 flex items-center justify-center text-on-surface hover:bg-surface-container active:bg-surface-container-high transition-colors" 
                onClick={() => handleZoom(-0.15)} 
                title="Zoom out"
              >
                <span className="material-symbols-outlined text-[20px]">remove</span>
              </button>
            </div>
            <button 
              className="w-10 h-10 rounded-xl bg-surface-container-lowest text-primary hover:bg-surface-container shadow-lg flex items-center justify-center transition-colors border border-outline-variant/30" 
              onClick={triggerGeolocation} 
              title="My Location"
            >
              <span className="material-symbols-outlined text-[20px]">my_location</span>
            </button>
          </div>

          {/* Floating Legend */}
          <div className="absolute bottom-6 left-4 z-30 max-w-xs">
            <div className="p-3.5 rounded-2xl bg-surface-container-lowest/95 backdrop-blur-md shadow-xl border border-outline-variant/20 flex flex-col gap-2.5">
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
