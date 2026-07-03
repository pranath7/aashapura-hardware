import React from 'react';
import { ArrowRight, MessageSquare, ShieldCheck, Cpu, Flame, Award, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HeroShowroom() {
  const highlights = [
    { icon: ShieldCheck, title: "Architectural Grade", desc: "Solid Brass & SS304" },
    { icon: Flame, title: "Corrosion Proof", desc: "PVD Coated Finishes" },
    { icon: Cpu, title: "Precision Engineered", desc: "Soft-close hydraulic mechanics" },
    { icon: Layers, title: "Heavy Load Capacity", desc: "Tested up to 120kg per leaf" },
    { icon: Award, title: "10 Year Warranty", desc: "Certified durability guarantee" },
  ];

  return (
    <section className="relative w-full bg-[#090d16] pb-28 pt-16 lg:pb-36 lg:pt-24 overflow-hidden text-left">
      {/* Background Hero Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/door_handles.png" 
          alt="Aashapura Hardware Luxury Handles Showcase" 
          className="w-full h-full object-cover opacity-25 filter brightness-75 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#090d16] via-[#090d16]/90 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#090d16]/50 to-[#0b0f17]"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[440px]">
          
          {/* Left Hero Content */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center gap-2.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-black text-amber-400 uppercase tracking-widest shadow-lg">
              <ShieldCheck className="h-4 w-4 text-amber-400" /> Premium Architectural Fittings
            </div>

            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.08] tracking-tight">
              Crafting Excellence in <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-600 drop-shadow-lg">
                Door Handles & Hardware
              </span>
            </h2>

            <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed font-normal">
              Elevate your residential and commercial joinery with solid brass pull handles, mortise locks, hydraulic hinges, and custom PVD architectural finishes in Chennai.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href="#catalog"
                className="inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-600 px-8 py-4 text-sm font-black text-slate-950 shadow-2xl shadow-amber-950/80 border-2 border-amber-300 transition-all cursor-pointer"
              >
                Explore Hardware Catalog <ArrowRight className="h-4 w-4 stroke-[3]" />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href="https://wa.me/916382948976?text=Hello%20Aashapura%20Hardware,%20I%20want%20to%20get%20a%20quote."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 px-7 py-4 text-sm font-black text-white shadow-2xl border-2 border-slate-700 transition-all cursor-pointer"
              >
                Get WhatsApp Quote <MessageSquare className="h-4 w-4 text-emerald-400 fill-emerald-400" />
              </motion.a>
            </div>
          </motion.div>

          {/* Right Illuminated 3D Emblem Showcase */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 hidden lg:flex flex-col items-center justify-center text-center"
          >
            <div className="rounded-3xl border-2 border-amber-500/40 bg-slate-950/80 backdrop-blur-md p-10 shadow-2xl shadow-amber-950/50 flex flex-col items-center gap-5 group hover:border-amber-400 transition-all">
              <div className="h-28 w-28 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 p-1 border-2 border-amber-300 shadow-2xl shadow-amber-950/80 group-hover:scale-105 transition-transform flex items-center justify-center">
                <div className="h-full w-full bg-slate-950 rounded-xl flex items-center justify-center">
                  <span className="font-display font-black text-amber-400 text-4xl tracking-tight">AH</span>
                </div>
              </div>
              <div>
                <h3 className="font-display font-black text-3xl text-white tracking-tight">Aashapura Hardware</h3>
                <p className="text-xs font-extrabold text-amber-400 uppercase tracking-widest mt-1">Architectural Brass & Fittings</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Floating 5-Feature Pill Card */}
      <div className="container mx-auto px-4 sm:px-8 relative z-20 -mb-40 mt-12">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="rounded-3xl bg-slate-900 p-6 sm:p-8 shadow-2xl border-2 border-slate-800 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 text-left divide-y md:divide-y-0 md:divide-x divide-slate-800"
        >
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className={`pt-4 md:pt-0 ${idx !== 0 ? "md:pl-6" : ""} space-y-2 group cursor-default`}>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors flex-shrink-0 border border-amber-500/30">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h4 className="font-extrabold text-sm text-white leading-tight">{item.title}</h4>
                </div>
                <p className="text-xs text-slate-400 font-medium pl-13">{item.desc}</p>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
