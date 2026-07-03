import React, { useState } from 'react';
import { Sparkles, ShieldCheck, CheckCircle2, Flame, Layers, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const finishes = [
  {
    id: "brass-gold",
    name: "Royal Brushed Brass Gold",
    tag: "Architectural Favorite",
    color: "#d4af37",
    coating: "Physical Vapor Deposition (PVD) Titanium Coating",
    corrosionRating: "Grade 5 (Salt Spray Tested 480 Hours)",
    durability: "Lifetime Scratch Resistance",
    desc: "Provides a warm, opulent satin gold luster that elevates luxury main entrance doors, teak wood joinery, and high-end residential villas."
  },
  {
    id: "antique-copper",
    name: "Antique Weathered Copper",
    tag: "Vintage Heritage",
    color: "#b45309",
    coating: "Electroplated Antique Oxidation Seal",
    corrosionRating: "Grade 4.5 (Moisture Resistant)",
    durability: "Hand-blended patina seal",
    desc: "A rich, rustic reddish-bronze tone crafted for heritage bungalows, traditional temple wood carving doors, and vintage interior aesthetics."
  },
  {
    id: "obsidian-black",
    name: "Obsidian Matte Velvet Black",
    tag: "Modern Minimalist",
    color: "#18181b",
    coating: "Electrophoretic Matte Polyurethane Shield",
    corrosionRating: "Grade 5 (Fingerprint & Stain Proof)",
    durability: "Ultra-durable anti-fade coat",
    desc: "Designed for sleek contemporary minimalist interiors, frosted glass partitions, industrial office doors, and monochrome luxury cabinetry."
  },
  {
    id: "satin-chrome",
    name: "Satin Pearl Chrome SS304",
    tag: "Commercial & Corporate",
    color: "#94a3b8",
    coating: "Satin Brushed Nickel Electroplating",
    corrosionRating: "Grade 5 (Heavy Commercial Use)",
    durability: "High tensile stainless core",
    desc: "The gold standard for high-traffic corporate offices, commercial glass hardware, hospitals, and heavy-duty utility doors."
  }
];

export default function MaterialFinishStudio() {
  const [activeFinish, setActiveFinish] = useState(finishes[0]);

  return (
    <section id="finish-studio" className="py-24 bg-[#0b0f17] border-b border-slate-800 text-left">
      <div className="container mx-auto px-4 sm:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-black text-amber-400 uppercase tracking-widest">
            <Sparkles className="h-4 w-4 text-amber-400" /> Interactive Studio
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-black text-white tracking-tight">
            PVD Metal Finish Inspection Studio
          </h2>
          <p className="text-sm text-slate-400 font-medium">Select a custom hardware finish below to inspect its coating technology, corrosion ratings, and ideal interior applications.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Finish Selection Cards */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse"></span> Select Metal Finish Swatch
            </h3>

            {finishes.map((f) => {
              const isActive = activeFinish.id === f.id;
              return (
                <motion.button
                  key={f.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveFinish(f)}
                  className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-300 flex items-center justify-between shadow-md ${
                    isActive
                      ? "border-amber-400 bg-slate-900 shadow-xl shadow-amber-950/20"
                      : "border-slate-800 bg-slate-950 hover:border-slate-700 hover:bg-slate-900"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div 
                      className="h-12 w-12 rounded-xl border-2 border-white/20 shadow-inner flex-shrink-0 flex items-center justify-center"
                      style={{ backgroundColor: f.color }}
                    >
                      {isActive && <CheckCircle2 className="h-6 w-6 text-white drop-shadow-md" />}
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-base text-white">{f.name}</h4>
                      <span className="text-[10px] font-extrabold text-amber-400 uppercase tracking-wider block">{f.tag}</span>
                    </div>
                  </div>

                  <span className={`text-xs font-black ${isActive ? "text-amber-400" : "text-slate-500"}`}>Inspect →</span>
                </motion.button>
              );
            })}
          </div>

          {/* Right Detailed Preview Card */}
          <div className="lg:col-span-7 flex flex-col">
            <motion.div 
              key={activeFinish.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="rounded-3xl border-2 border-amber-500/30 bg-slate-900 p-6 sm:p-8 shadow-2xl flex-grow space-y-6 relative overflow-hidden flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-[10px] font-extrabold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full uppercase tracking-wider border border-amber-500/30">
                      PVD Coating Technology
                    </span>
                    <h3 className="font-display font-black text-2xl text-white mt-2">{activeFinish.name}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full border border-white/30" style={{ backgroundColor: activeFinish.color }}></div>
                  </div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed font-normal">{activeFinish.desc}</p>

                {/* Specs Box */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Coating Layer Technology</span>
                    <strong className="text-xs font-bold text-white block">{activeFinish.coating}</strong>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Corrosion Standard</span>
                    <strong className="text-xs font-bold text-amber-400 block">{activeFinish.corrosionRating}</strong>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1 col-span-1 sm:col-span-2">
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Scratch & Wear Guarantee</span>
                    <strong className="text-xs font-bold text-emerald-400 block">{activeFinish.durability}</strong>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs font-bold text-slate-400">Want custom finish samples delivered to your site?</span>
                <a 
                  href={`https://wa.me/916382948976?text=Hello%20Aashapura%20Hardware,%20I%20want%20to%20request%20finish%20samples%20for%20${encodeURIComponent(activeFinish.name)}.`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 px-6 py-3 text-xs font-black text-slate-950 shadow-lg transition-all active:scale-95 w-full sm:w-auto justify-center cursor-pointer"
                >
                  Request Swatch Samples on WhatsApp
                </a>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
