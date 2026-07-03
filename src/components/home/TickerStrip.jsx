import React from 'react';

export default function TickerStrip() {
  return (
    <div className="bg-[#1B1A18] border-b border-[#4A4845] py-4 overflow-hidden whitespace-nowrap">
      <div className="animate-marquee-slow flex items-center gap-12 font-display font-black text-xl uppercase tracking-widest text-[#4A4845]">
        <span className="flex items-center gap-3 text-[#D98E4A]">⚙️ GR.42 STRUCTURAL STEEL</span>
        <span>•</span>
        <span>COPPER PVD ARCHITECTURAL FITTINGS</span>
        <span>•</span>
        <span className="text-[#D98E4A]">CONCEALED MORTISE SECURITY LOCKS</span>
        <span>•</span>
        <span>HYDRAULIC SOFT-CLOSE FITTINGS</span>
        <span>•</span>
        <span className="text-[#D98E4A]">PARK TOWN CHENNAI</span>
        <span>•</span>
        <span className="flex items-center gap-3 text-[#D98E4A]">⚙️ GR.42 STRUCTURAL STEEL</span>
        <span>•</span>
        <span>COPPER PVD ARCHITECTURAL FITTINGS</span>
      </div>
    </div>
  );
}
