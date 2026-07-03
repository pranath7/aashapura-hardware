import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-24 border-b border-[#1B1A18] text-left bg-[#1B1A18]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        <div className="lg:col-span-6">
          <div className="bg-[#0E0E0F] p-4 border-2 border-[#B8723C]/40">
            <img src="/images/doors_plywood.png" alt="Aashapura Hardware Showroom" className="w-full h-80 object-cover" />
          </div>
        </div>

        <div className="lg:col-span-6 space-y-6">
          <h2 className="font-display font-black text-4xl sm:text-5xl text-[#F5F2ED] uppercase">
            25+ YEARS OF ARCHITECTURAL PRECISION
          </h2>
          <p className="text-[#4A4845] text-sm leading-relaxed">
            Located in Choolai, Chennai, Aashapura Hardware has been the trusted trade partner for top architects, interior decorators, and builders. We stock certified high-grade architectural joinery, PVD coated door hardware, and modular kitchen motion mechanics.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="flex items-center gap-2.5 text-xs font-bold text-[#F5F2ED] uppercase tracking-wider font-mono">
              <CheckCircle2 className="w-4 h-4 text-[#D98E4A] flex-shrink-0" /> Wholesale Tiers
            </div>
            <div className="flex items-center gap-2.5 text-xs font-bold text-[#F5F2ED] uppercase tracking-wider font-mono">
              <CheckCircle2 className="w-4 h-4 text-[#D98E4A] flex-shrink-0" /> Custom PVD Gold
            </div>
            <div className="flex items-center gap-2.5 text-xs font-bold text-[#F5F2ED] uppercase tracking-wider font-mono">
              <CheckCircle2 className="w-4 h-4 text-[#D98E4A] flex-shrink-0" /> Certified SS304
            </div>
            <div className="flex items-center gap-2.5 text-xs font-bold text-[#F5F2ED] uppercase tracking-wider font-mono">
              <CheckCircle2 className="w-4 h-4 text-[#D98E4A] flex-shrink-0" /> 10 Year Warranty
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
