import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, RotateCcw, ArrowUp } from 'lucide-react';

const PRODUCT_EXPERIENCES = {
  hinge: {
    title: "Hydraulic Soft-Close Hinge",
    desc: "Heavy-duty SS304 hinge featuring a silent fluid hydraulic oil dampener core. Prevents cabinet slamming by dissipating door speed into pure hydraulic friction.",
    material: "SS304 Certified Steel",
    capacity: "Fluid Dampener Core",
    technology: "Auto Eased in last 25°",
    waQuery: " rates for Soft Close Hinges."
  },
  shutter: {
    title: "Acrylic Rolling Shutter",
    desc: "Premium vertical roll-up shutter cabinet ideal for hiding kitchen appliances. Drag the pull-handle vertically upwards to open, and let go to experience the silent counterbalance spring action.",
    material: "Tempered Acrylic Glass / Aluminium",
    capacity: "Torsion Spring Counterbalance",
    technology: "Dual Brush Seal silent tracks",
    waQuery: " rates for Kitchen Cabinet Vertical Rolling Shutters."
  }
};

export default function MotionExperience() {
  const [activeTab, setActiveTab] = useState('shutter'); // default to rolling shutter first as requested

  // 1. Hinge simulation states
  const [doorAngle, setDoorAngle] = useState(90); // 0 to 90 degrees
  const [dbLevel, setDbLevel] = useState(0);
  const [isHingeAnimating, setIsHingeAnimating] = useState(false);

  // 2. Rolling Shutter pointer drag states (SFIT Style)
  const [dragProgress, setDragProgress] = useState(0); // 0 to 1
  const [isDragging, setIsDragging] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const containerRef = useRef(null);
  const startDragPos = useRef(0);
  const currentProgress = useRef(0);
  const [scale, setScale] = useState(1);

  // Auto-scaling logic for mobile responsiveness (SFIT style)
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const parentWidth = containerRef.current.parentElement.getBoundingClientRect().width;
      const containerWidth = Math.max(280, parentWidth - 32);
      const newScale = Math.min(1, containerWidth / 480);
      setScale(newScale);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    const timeout = setTimeout(handleResize, 150);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeout);
    };
  }, [activeTab]);

  // Hinge close animation
  const triggerSoftClose = () => {
    if (isHingeAnimating) return;
    setIsHingeAnimating(true);
    
    let currentAngle = doorAngle;
    const duration = 1200; // ms
    const startTime = performance.now();

    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      let nextAngle;
      if (progress < 0.4) {
        nextAngle = currentAngle * (1 - progress * 1.5);
      } else {
        const dampProgress = (progress - 0.4) / 0.6;
        nextAngle = (currentAngle * 0.4) * Math.pow(1 - dampProgress, 3);
      }

      const finalAngle = Math.max(0, nextAngle);
      setDoorAngle(finalAngle);

      if (finalAngle > 25) {
        setDbLevel(Math.floor(finalAngle * 0.4));
      } else if (finalAngle > 0) {
        setDbLevel(Math.floor(finalAngle * 0.1));
      } else {
        setDbLevel(0);
      }

      if (progress < 1 && finalAngle > 0) {
        requestAnimationFrame(animate);
      } else {
        setDoorAngle(0);
        setDbLevel(0);
        setIsHingeAnimating(false);
      }
    };

    requestAnimationFrame(animate);
  };

  // Rolling Shutter pointer events drag (SFIT style)
  const handlePointerDown = (e) => {
    if (isClosing) return;
    setIsDragging(true);
    e.target.setPointerCapture(e.pointerId);
    // 180px travel distance
    startDragPos.current = e.clientY - (currentProgress.current * 180);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    // Drag Y decreases as shutter pulls UP. So delta Y is start - current
    const delta = startDragPos.current - e.clientY;
    const progress = Math.max(0, Math.min(delta / 180, 1));
    currentProgress.current = progress;
    setDragProgress(progress);
  };

  const handlePointerUp = (e) => {
    if (!isDragging) return;
    setIsDragging(false);
    e.target.releasePointerCapture(e.pointerId);
    if (currentProgress.current > 0) {
      triggerShutterSoftReturn();
    }
  };

  const triggerShutterSoftReturn = () => {
    setIsClosing(true);
    const startVal = currentProgress.current;
    const startTime = performance.now();
    const duration = 1000; // ms

    const animateClose = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 4); // Soft elastic rebound
      const nextProgress = startVal * (1 - ease);
      
      currentProgress.current = nextProgress;
      setDragProgress(nextProgress);

      if (progress < 1) {
        requestAnimationFrame(animateClose);
      } else {
        currentProgress.current = 0;
        setDragProgress(0);
        setIsClosing(false);
      }
    };
    requestAnimationFrame(animateClose);
  };

  // Run auto-hint open animation on tab change to rolling shutter
  useEffect(() => {
    if (activeTab === 'shutter' && currentProgress.current === 0 && !isDragging) {
      let startHint = 0;
      const step = (now) => {
        if (!startHint) startHint = now;
        const elapsed = now - startHint;
        if (elapsed < 300) {
          const p = (elapsed / 300) * 0.35; // open 35% for hint
          currentProgress.current = p;
          setDragProgress(p);
          requestAnimationFrame(step);
        } else if (elapsed < 500) {
          requestAnimationFrame(step);
        } else {
          triggerShutterSoftReturn();
        }
      };
      requestAnimationFrame(step);
    }
  }, [activeTab]);

  const details = PRODUCT_EXPERIENCES[activeTab];

  return (
    <section id="motion" className="py-16 sm:py-24 border-b border-[#1B1A18] text-left bg-[#1B1A18]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8 sm:space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="stamp-badge">LAB.SPEC — INTERACTIVE SIMULATION</span>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#F5F2ED] uppercase">HARDWARE MOTION STUDIO</h2>
          <p className="text-xs text-[#4A4845] uppercase tracking-widest font-mono">Test cabinet swing physics, and vertical roll-up shutter drag counterbalance.</p>
        </div>

        {/* Tab Selector Buttons */}
        <div className="flex flex-wrap gap-2 border-b border-[#4A4845] pb-4">
          <button
            onClick={() => {
              setActiveTab('shutter');
              currentProgress.current = 0;
              setDragProgress(0);
            }}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all border ${
              activeTab === 'shutter'
                ? 'border-[#B8723C] bg-[#0E0E0F] text-[#D98E4A]'
                : 'border-[#4A4845] text-slate-400 hover:text-white hover:bg-[#0E0E0F]/50'
            }`}
          >
            🔒 Rolling Shutter
          </button>
          <button
            onClick={() => {
              setActiveTab('hinge');
              currentProgress.current = 0;
              setDragProgress(0);
            }}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all border ${
              activeTab === 'hinge'
                ? 'border-[#B8723C] bg-[#0E0E0F] text-[#D98E4A]'
                : 'border-[#4A4845] text-slate-400 hover:text-white hover:bg-[#0E0E0F]/50'
            }`}
          >
            ⚙️ Hydraulic Hinge
          </button>
        </div>

        {/* Simulator Sandbox */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Visual Simulator Canvas (8 cols) */}
          <div className="lg:col-span-8 bg-[#0E0E0F] border-2 border-[#B8723C]/40 p-4 sm:p-6 flex flex-col justify-between min-h-[460px]">
            <div className="space-y-6 flex-1 flex flex-col justify-between">
              
              {/* Tab Test Headers */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-[#4A4845] pb-3">
                <span className="stamp-badge">
                  {activeTab === 'hinge' && 'TEST 01 — SOFT-CLOSE SWING DECIBELS'}
                  {activeTab === 'shutter' && 'TEST 02 — ROLLING SHUTTER VERTICAL SPRING DRAG'}
                </span>
                <span className="text-xs font-mono text-[#D98E4A]">
                  {activeTab === 'hinge' && `Decibel Output: ${dbLevel} dB`}
                  {activeTab === 'shutter' && `Counterbalance Load: ${Math.floor(dragProgress * 100)}%`}
                </span>
              </div>

              {/* Graphical Simulator Box */}
              <div 
                className="w-full flex items-center justify-center overflow-visible py-4"
                style={{ minHeight: '300px' }}
              >
                <div 
                  ref={containerRef}
                  className="relative w-[480px] h-[300px] bg-[#1B1A18] border-2 border-slate-800 rounded-2xl shadow-2xl overflow-hidden select-none touch-none flex-shrink-0"
                  style={{ 
                    transform: `scale(${scale})`,
                    transformOrigin: 'center center'
                  }}
                >
                  {/* Cabinet Interior Shadow Map */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />

                  {/* 1. Hinge Simulation View */}
                  {activeTab === 'hinge' && (
                    <div className="absolute inset-0">
                      <div className="absolute inset-4 sm:inset-10 border border-[#4A4845]/20 flex items-center justify-center">
                        <div className="w-[35%] h-2 bg-slate-700 absolute right-1/2 mr-2"></div>
                        <div className="w-4 h-4 bg-[#B8723C] rounded-full absolute left-1/2 -translate-x-1/2 z-20"></div>
                        <div 
                          className="w-[35%] h-2 bg-[#D98E4A] origin-left absolute left-1/2 z-10 transition-transform duration-75"
                          style={{ transform: `translateX(4px) rotate(-${doorAngle}deg)` }}
                        ></div>
                        <div className="absolute left-1/2 w-[35%] h-[35%] border-l border-dashed border-[#B8723C]/20 rounded-full pointer-events-none opacity-30"></div>
                      </div>
                      <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md px-2.5 py-1.5 border border-[#4A4845] text-[10px] sm:text-xs font-mono text-white">
                        {doorAngle <= 25 && doorAngle > 0 ? '🌊 Hydraulic Dampener Active' : doorAngle === 0 ? '🤫 Door Fully Closed (0 dB)' : '🚪 Door Sweeping'}
                      </div>
                    </div>
                  )}

                  {/* 2. Rolling Shutter Simulation View (Tactile SFIT Drag Style) */}
                  {activeTab === 'shutter' && (
                    <div className="absolute inset-0">
                      {/* Inner appliances garage revealed as shutter pulls up */}
                      <div className="absolute inset-x-16 bottom-6 top-10 bg-slate-950/50 rounded-xl p-4 flex flex-col justify-end gap-2 border border-slate-800">
                        <div className="flex justify-around items-end h-32">
                          <span className="text-4xl filter drop-shadow animate-bounce" style={{ animationDelay: '0.1s' }}>☕</span>
                          <span className="text-4xl filter drop-shadow">🍞</span>
                          <span className="text-4xl filter drop-shadow animate-bounce" style={{ animationDelay: '0.3s' }}>🥛</span>
                        </div>
                        <div className="h-1 bg-slate-800 w-full rounded" />
                        <div className="text-[9px] font-mono text-center text-slate-500">Appliance Garage Shelf</div>
                      </div>

                      {/* Sliding Shutter Door */}
                      <div 
                        className="absolute inset-x-8 top-6 bg-slate-900 border border-slate-800 flex flex-col overflow-hidden rounded-lg shadow-inner"
                        style={{
                          height: `${240 - (dragProgress * 180)}px`
                        }}
                      >
                        {/* Rendering Visual Slats */}
                        {[...Array(15)].map((_, i) => (
                          <div 
                            key={i} 
                            className="h-4 border-b border-slate-950/40 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 flex-shrink-0"
                          />
                        ))}

                        {/* Drag Handle Bar on Shutter bottom edge */}
                        <div 
                          onPointerDown={handlePointerDown}
                          onPointerMove={handlePointerMove}
                          onPointerUp={handlePointerUp}
                          onPointerCancel={handlePointerUp}
                          className="absolute bottom-0 inset-x-0 h-10 bg-slate-950 border-t-2 border-[#B8723C] cursor-grab active:cursor-grabbing flex items-center justify-center shadow-lg touch-none"
                          style={{ touchAction: 'none' }}
                        >
                          <div className="w-20 h-1.5 bg-[#B8723C] rounded-full" />
                          
                          {dragProgress === 0 && (
                            <div className="absolute bottom-12 bg-black/95 text-white text-[10px] font-semibold py-1.5 px-3 rounded-full flex items-center gap-1 shadow-md border border-[#4A4845] pointer-events-none animate-pulse">
                              <span>Drag Upwards</span>
                              <ArrowUp className="w-3 h-3 text-[#D98E4A]" />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              </div>

              {/* Simulation Interaction Controls */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {activeTab === 'hinge' && (
                  <>
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-[#4A4845] uppercase flex justify-between">
                        <span>Door Open Angle</span>
                        <span className="text-[#D98E4A]">{Math.floor(doorAngle)}°</span>
                      </label>
                      <input 
                        type="range" 
                        min="0" 
                        max="90" 
                        value={doorAngle} 
                        disabled={isHingeAnimating}
                        onChange={(e) => setDoorAngle(parseInt(e.target.value))}
                        className="w-full accent-[#B8723C] bg-[#1B1A18]" 
                      />
                    </div>
                    <div className="flex gap-2 items-end">
                      <button 
                        onClick={triggerSoftClose}
                        disabled={isHingeAnimating || doorAngle === 0}
                        className="w-full py-3 bg-[#B8723C] hover:bg-[#D98E4A] text-black font-display font-black text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 disabled:opacity-30"
                      >
                        <Play className="w-3.5 h-3.5" /> Trigger Soft Close
                      </button>
                      <button 
                        onClick={() => { setDoorAngle(90); setDbLevel(0); }}
                        className="p-3 bg-[#1B1A18] hover:bg-[#4A4845] text-white border border-[#4A4845]"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    </div>
                  </>
                )}

                {activeTab === 'shutter' && (
                  <div className="md:col-span-2 py-3 text-center border border-dashed border-[#4A4845] text-xs font-mono text-slate-400">
                    <span className="flex items-center justify-center gap-1.5">
                      <span className={`w-2.5 h-2.5 rounded-full ${isDragging ? 'bg-amber-500 animate-ping' : isClosing ? 'bg-blue-400 animate-pulse' : 'bg-green-500'}`} />
                      Status: {isDragging ? 'Dragging (Counterbalance active)' : isClosing ? 'Soft-Stop Elastic Closing' : 'Closed / Drag handle up to test'}
                    </span>
                  </div>
                )}

              </div>

            </div>
          </div>

          {/* Right Specifications Sheet */}
          <div className="lg:col-span-4 bg-[#1B1A18] border border-[#4A4845] p-6 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="stamp-badge">PRODUCT SPECIFICATION</span>
              <h3 className="font-display font-black text-3xl text-white uppercase">{details.title}</h3>
              <p className="text-xs text-[#4A4845] leading-relaxed">{details.desc}</p>
              
              <div className="space-y-2 border-t border-[#4A4845] pt-4">
                <div className="flex justify-between text-xs font-mono py-1">
                  <span className="text-[#4A4845]">Material Type</span>
                  <span className="text-white">{details.material}</span>
                </div>
                <div className="flex justify-between text-xs font-mono py-1">
                  <span className="text-[#4A4845]">Load Capacity</span>
                  <span className="text-white">{details.capacity}</span>
                </div>
                <div className="flex justify-between text-xs font-mono py-1">
                  <span className="text-[#4A4845]">Action Physics</span>
                  <span className="text-white">{details.technology}</span>
                </div>
              </div>
            </div>

            <a 
              href={`https://wa.me/916382948976?text=Hello%20Aashapura%20Hardware,%20I%20want%20${encodeURIComponent(details.waQuery)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 w-full py-3 bg-[#B8723C] hover:bg-[#D98E4A] text-black font-display font-black text-xs uppercase tracking-wider text-center block transition-all"
            >
              Enquire Custom Specifications 💬
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
