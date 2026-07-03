import React from 'react';
import { ShieldCheck, Award, Users, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AboutUsSection() {
  return (
    <section id="about" className="py-24 pt-48 bg-[#0b0f17] border-b border-slate-800 text-left">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Visual Wall */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-3xl overflow-hidden border-2 border-amber-500/30 shadow-2xl group">
              <img 
                src="/images/door_handles.png" 
                alt="Aashapura Hardware Showroom Heritage" 
                className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-slate-950/90 border border-amber-500/30 backdrop-blur-md space-y-2">
                <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest block">Trusted Partner</span>
                <h4 className="font-display font-extrabold text-xl text-white">20+ Years of Architectural Hardware Heritage</h4>
                <p className="text-xs text-slate-300">Serving Chennai's leading architects, interior designers, and luxury builders with certified hardware solutions.</p>
              </div>
            </div>
          </motion.div>

          {/* Right Text Details */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="space-y-2">
              <span className="text-xs font-black uppercase tracking-widest text-amber-400">About Aashapura Hardware</span>
              <h2 className="font-display text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                Premium Hardware Solutions For <span className="text-amber-400">Modern Spaces</span>
              </h2>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed font-normal">
              At **Aashapura Hardware**, we specialize in distributing high-grade architectural door fittings, concealed mortise locks, soft-close drawer channels, and custom PVD-finished brass pulls. Located in 22, Vijaya Vigneshwarar Koil St, Choolai, Chennai, we serve as the premier choice for clients who demand uncompromised durability and sleek modern aesthetics.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-900 border border-slate-800">
                <CheckCircle2 className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-extrabold text-xs text-white">Wholesale Pricing</h4>
                  <p className="text-[11px] text-slate-400">Direct factory bulk tiers</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-900 border border-slate-800">
                <CheckCircle2 className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-extrabold text-xs text-white">Custom PVD Finishes</h4>
                  <p className="text-[11px] text-slate-400">Gold, Rose Gold, Matte Black</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-900 border border-slate-800">
                <CheckCircle2 className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-extrabold text-xs text-white">Load Certified</h4>
                  <p className="text-[11px] text-slate-400">Heavy hydraulic testing</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-900 border border-slate-800">
                <CheckCircle2 className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-extrabold text-xs text-white">Genuine Guarantee</h4>
                  <p className="text-[11px] text-slate-400">100% original manufacturer ply</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
