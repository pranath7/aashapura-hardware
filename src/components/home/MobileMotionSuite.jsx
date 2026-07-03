import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ShieldCheck, MessageSquare, Phone, Download, ZoomIn, X, ChevronRight, Sliders } from 'lucide-react';

const finishes = [
  { id: 'gold', name: 'Royal Brass Gold PVD', color: '#B8723C', coat: 'Titanium Salt-Spray Grade 5', desc: 'Sleek satin copper luster ideal for teak entrance doors.' },
  { id: 'black', name: 'Obsidian Matte Black', color: '#0E0E0F', coat: 'Polyurethane Anti-Fingerprint', desc: 'Minimalist velvet black engineered for modern interiors.' },
  { id: 'rose', name: 'Rose Gold Metallic', color: '#D98E4A', coat: 'Multi-layer Electroplate', desc: 'Warm luxury rose bronze crafted for high-end cabinetry.' },
  { id: 'chrome', name: 'Satin Pearl Chrome', color: '#4A4845', coat: 'SS304 Brushed Finish', desc: 'High-durability stainless steel for heavy commercial use.' }
];

export default function MobileMotionSuite() {
  const [activeFinishIdx, setActiveFinishIdx] = useState(0);
  const [doorWeight, setDoorWeight] = useState(80); 
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [inspectorOpen, setInspectorOpen] = useState(false);

  const activeFinish = finishes[activeFinishIdx];

  return (
    <section className="py-24 border-b border-[#1B1A18] text-left bg-[#0E0E0F] max-w-7xl mx-auto px-6 space-y-16">
      
      {/* Section Header */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <div className="stamp-badge">LAB.SPEC — INTERACTIVE SWITE</div>
        <h2 className="font-display font-black text-4xl sm:text-5xl text-[#F5F2ED] uppercase">Touch & Motion Experience</h2>
        <p className="text-xs text-[#4A4845] uppercase tracking-widest font-mono">Test real-time hardware physics, weight loads, and metal finishes.</p>
      </div>

      {/* --- Swatch Swiper --- */}
      <div className="bg-[#1B1A18] border border-[#4A4845] p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="stamp-badge">TEST 01 — FINISH SWATCHES</span>
            <h3 className="font-display font-black text-2xl text-white mt-1">TOUCH FINISH SWATCH STUDIO</h3>
          </div>
          <span className="text-xs font-mono text-[#D98E4A]">Swipe Swatches ↔️</span>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2">
          {finishes.map((f, idx) => (
            <button
              key={f.id}
              onClick={() => setActiveFinishIdx(idx)}
              className={`flex-shrink-0 px-5 py-3 rounded-none border transition-all flex items-center gap-3 ${
                activeFinishIdx === idx
                  ? 'border-[#B8723C] bg-[#0E0E0F]'
                  : 'border-[#4A4845] bg-[#1B1A18] hover:bg-[#0E0E0F]'
              }`}
            >
              <div className="w-5 h-5 rounded-full border border-[#4A4845]" style={{ backgroundColor: f.color }} />
              <span className="text-xs font-bold text-white uppercase tracking-wider">{f.name}</span>
            </button>
          ))}
        </div>

        <motion.div 
          key={activeFinish.id}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="p-6 bg-[#0E0E0F] border border-[#4A4845] text-white space-y-4 flex flex-col sm:flex-row justify-between items-start sm:items-center"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: activeFinish.color }} />
              <span className="text-xs font-mono text-[#D98E4A] uppercase">{activeFinish.coat}</span>
            </div>
            <h4 className="font-display font-black text-2xl text-white">{activeFinish.name}</h4>
            <p className="text-xs text-[#4A4845] font-medium max-w-md">{activeFinish.desc}</p>
          </div>

          <button 
            onClick={() => setInspectorOpen(true)}
            className="px-5 py-2.5 bg-[#B8723C] hover:bg-[#D98E4A] text-black font-display font-black text-xs uppercase tracking-wider transition-all"
          >
            Inspect 360° View 🔍
          </button>
        </motion.div>
      </div>

      {/* --- Door Weight Slider --- */}
      <div className="bg-[#1B1A18] border border-[#4A4845] p-6 sm:p-8 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <span className="stamp-badge">TEST 02 — WEIGHT LOAD CALCULATOR</span>
            <h3 className="font-display font-black text-2xl text-white mt-1">DOOR SPEC WEIGHT LOAD SLIDER</h3>
          </div>
          <span className="text-xs font-mono text-[#D98E4A]">Adjust slider ↕️</span>
        </div>

        <div className="space-y-4">
          <input 
            type="range" 
            min="40" 
            max="120" 
            value={doorWeight} 
            onChange={(e) => setDoorWeight(parseInt(e.target.value))}
            className="w-full accent-[#B8723C] bg-[#0E0E0F]" 
          />
          <div className="flex justify-between text-xs font-mono text-[#4A4845] font-bold">
            <span>LIGHT DOORS (40KG)</span>
            <span className="text-[#D98E4A] font-black text-sm">{doorWeight} KG</span>
            <span>HEAVY ENTRANCES (120KG)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-[#4A4845]">
          <div className="p-4 bg-[#0E0E0F] border border-[#4A4845]">
            <span className="text-[10px] font-mono text-[#4A4845] block">RECOMMENDED HINGE SPEC</span>
            <strong className="font-display font-black text-2xl text-white">
              {doorWeight > 100 ? '4X HEAVY SS304 BALL BEARING' : doorWeight > 70 ? '3X CONCEALED HYDRAULIC HINGE' : '2X CONCEALED HYDRAULIC HINGE'}
            </strong>
          </div>
          <div className="p-4 bg-[#0E0E0F] border border-[#4A4845]">
            <span className="text-[10px] font-mono text-[#4A4845] block">DAMPENING FORCE NEEDED</span>
            <strong className="font-display font-black text-2xl text-[#D98E4A]">
              {doorWeight > 100 ? '120N HIGH-TENSION PISTON' : doorWeight > 70 ? '100N MEDIUM DAMPENER' : '80N SOFT-CLOSE DAMPENER'}
            </strong>
          </div>
        </div>
      </div>
    </section>
  );
}
