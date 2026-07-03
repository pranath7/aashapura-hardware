import React, { useState } from 'react';
import { Sparkles, ShieldCheck, MessageSquare, ArrowRight, DoorOpen, Box, Droplets, Grid, Wrench } from 'lucide-react';
import { motion } from 'framer-motion';

const applications = [
  {
    id: "main-door",
    title: "Heavy Main Entrance Door",
    icon: DoorOpen,
    recFitting: "Solid Brass Pull Handle (600mm) + Concealed Mortise Lock System",
    recHinge: "4BB Ball Bearing SS304 Butt Hinges (120kg Capacity)",
    finish: "Royal Brushed Brass Gold PVD",
    warranty: "10 Years Guarantee",
    desc: "Main entrance doors require maximum security and high structural load capacity. Heavy ball-bearing butt hinges prevent door sag over time."
  },
  {
    id: "kitchen-drawers",
    title: "Modular Kitchen Drawers",
    icon: Box,
    recFitting: "Soft-Close Hydraulic Tandem Box Runners (45kg Capacity)",
    recHinge: "110° Clip-on 3D Adjustable Soft-Close Auto Hinges",
    finish: "Satin Nickel / Anthracite Grey",
    warranty: "15 Years Guarantee",
    desc: "Kitchen drawers experience heavy pot and utensil loads. Soft-close hydraulic mechanisms prevent slamming and ensure silent smooth operation."
  },
  {
    id: "shower-glass",
    title: "Glass Shower Enclosure",
    icon: Droplets,
    recFitting: "Glass-to-Glass 90° Brass Patch Fittings & Stabilizer Bar",
    recHinge: "Heavy Duty Self-Closing Glass-to-Wall Hinges",
    finish: "Matte Black or Rose Gold PVD",
    warranty: "10 Years Water Corrosion Guarantee",
    desc: "Bathroom glass enclosures face high humidity. High-grade solid brass fittings with synthetic water-gaskets ensure zero rusting."
  },
  {
    id: "sliding-wardrobe",
    title: "Heavy Wardrobe Sliding Systems",
    icon: Grid,
    recFitting: "Top-Hung Soft-Closing Roller Mechanism + Aluminium Profile Handles",
    recHinge: "Integrated Track Rollers with Anti-Jumping Clips",
    finish: "Black Anodized / Rose Gold",
    warranty: "10 Years Smooth Gliding Warranty",
    desc: "Large floor-to-ceiling wardrobe doors require top-hung synchronized sliding systems for effortless finger-touch gliding."
  }
];

export default function HardwareAdvisor() {
  const [activeApp, setActiveApp] = useState(applications[0]);

  return (
    <section id="advisor" className="py-24 bg-[#090d16] border-b border-slate-800 text-left">
      <div className="container mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-black text-amber-400 uppercase tracking-widest">
            <Sparkles className="h-4 w-4 text-amber-400" /> Interactive Hardware Advisor
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-black text-white tracking-tight">
            Which Hardware Fittings Does Your Project Need?
          </h2>
          <p className="text-sm text-slate-400 font-medium">Select your intended architectural fitting application below to view recommended load capacities, hinge standards, and warranties.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Application Selector Buttons */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse"></span> Select Fitting Application
            </h3>

            {applications.map((app) => {
              const Icon = app.icon;
              const isActive = activeApp.id === app.id;
              return (
                <motion.button
                  key={app.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveApp(app)}
                  className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-300 flex items-center justify-between shadow-md ${
                    isActive
                      ? "border-amber-400 bg-slate-900 shadow-xl shadow-amber-950/20"
                      : "border-slate-800 bg-slate-950 hover:border-slate-700 hover:bg-slate-900"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`h-12 w-12 rounded-xl flex items-center justify-center transition-all ${
                      isActive ? "bg-amber-500 text-slate-950 shadow-md font-bold" : "bg-slate-800 text-slate-400"
                    }`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-base text-white">{app.title}</h4>
                      <p className="text-xs font-semibold text-amber-400">Click for Fitting Recommendation</p>
                    </div>
                  </div>

                  <ArrowRight className={`h-5 w-5 transition-transform ${isActive ? "text-amber-400 translate-x-1" : "text-slate-600"}`} />
                </motion.button>
              );
            })}
          </div>

          {/* Right Recommendation Card */}
          <div className="lg:col-span-7 flex flex-col">
            <motion.div 
              key={activeApp.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="rounded-3xl border-2 border-slate-800 bg-slate-900 p-6 sm:p-8 shadow-2xl flex-grow space-y-6 relative overflow-hidden flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-[10px] font-extrabold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full uppercase tracking-wider border border-amber-500/30">
                      Architectural Recommendation
                    </span>
                    <h3 className="font-display font-black text-2xl text-white mt-2">{activeApp.title}</h3>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/30">
                    <ShieldCheck className="h-4 w-4" /> {activeApp.warranty}
                  </div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed font-normal">{activeApp.desc}</p>

                {/* Technical Specifications Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Recommended Fitting / Handle</span>
                    <strong className="text-xs font-bold text-white block">{activeApp.recFitting}</strong>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Hinge & Runner Capacity</span>
                    <strong className="text-xs font-bold text-white block">{activeApp.recHinge}</strong>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1 col-span-1 sm:col-span-2">
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Ideal Coating Finish</span>
                    <strong className="text-xs font-bold text-amber-400 block">{activeApp.finish}</strong>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs font-bold text-slate-400">Need architectural consultation for your site?</span>
                <a 
                  href={`https://wa.me/916382948976?text=Hello%20Aashapura%20Hardware,%20I%20need%20fittings%20for%20${encodeURIComponent(activeApp.title)}.%20Please%20guide%20me.`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-6 py-3 text-xs font-black text-white shadow-lg shadow-emerald-950/40 transition-all active:scale-95 w-full sm:w-auto justify-center cursor-pointer"
                >
                  <MessageSquare className="h-4 w-4" /> Consult on WhatsApp
                </a>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
