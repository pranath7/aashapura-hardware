import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Award, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section id="home" className="relative pt-16 pb-20 lg:pt-24 lg:pb-32 bg-white border-b border-slate-200 text-slate-900 text-left overflow-hidden">
      {/* Soft Architectural Lighting */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-[#c5a059]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-slate-900/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Thesis & Headline */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-7 space-y-6"
          >


            <h1 className="font-sans font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.1] text-slate-900">
              Architectural Joinery & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b38f48] via-[#c5a059] to-[#8c6b2d]">
                Master Brass Hardware
              </span>
            </h1>

            <p className="text-slate-600 text-base sm:text-lg max-w-xl font-medium leading-relaxed">
              We supply certified solid brass entrance pulls, hydraulic soft-close systems, concealed mortise locks, and multi-layer PVD architectural fittings for luxury residences across Chennai.
            </p>

            {/* Active Voice Action Controls */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <motion.a
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                href="#products"
                className="px-7 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2 cursor-pointer"
              >
                Browse Hardware Catalog <ArrowRight className="w-4 h-4 text-[#c5a059]" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                href="#motion"
                className="px-6 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs uppercase tracking-wider transition-all border border-slate-300 flex items-center gap-2 cursor-pointer"
              >
                Test Mechanical Motion ⚙️
              </motion.a>
            </div>

            {/* Grounded Material Verifications */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-200 max-w-lg">
              <motion.div whileHover={{ y: -2 }} className="cursor-default">
                <span className="block font-black text-lg text-slate-900">SS304 Grade</span>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Certified Steel</span>
              </motion.div>
              <motion.div whileHover={{ y: -2 }} className="cursor-default">
                <span className="block font-black text-lg text-[#c5a059]">PVD Gold</span>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Salt-Spray Tested</span>
              </motion.div>
              <motion.div whileHover={{ y: -2 }} className="cursor-default">
                <span className="block font-black text-lg text-slate-900">500,000</span>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Cycle Guarantee</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Tactile Showcase Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <motion.div 
              whileHover={{ rotateY: 4, rotateX: -2, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="rounded-3xl bg-slate-50 border border-slate-200 p-4 shadow-xl overflow-hidden group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl">
                <img 
                  src="/images/door_handles.png" 
                  alt="Solid Brass Pull Handles" 
                  className="w-full h-[380px] object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute top-4 right-4 bg-slate-900/90 text-white text-[10px] font-mono font-bold uppercase px-3 py-1.5 rounded-full backdrop-blur-md border border-[#c5a059]/40">
                  Tactile Showcase
                </div>
              </div>
              
              <div className="p-4 text-left">
                <span className="text-xs font-bold text-[#c5a059] uppercase tracking-wider block">Featured Specimen</span>
                <h3 className="font-extrabold text-lg text-slate-900 mt-0.5">Solid Brass Mortise Handles</h3>
                <p className="text-xs text-slate-600 mt-1 font-medium">Forged from high-density brass alloy with dual-action spring return.</p>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
