import React from 'react';

export default function CTABanner() {
  return (
    <section className="py-16 bg-gradient-to-r from-[#B8723C] via-[#D98E4A] to-[#B8723C] text-black text-left">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-2">
          <span className="px-3 py-1 bg-black text-white font-mono text-[10px] uppercase font-bold">TRADE PROGRAM</span>
          <h2 className="font-display font-black text-3xl sm:text-4xl uppercase">ARE YOU AN ARCHITECT OR INTERIOR CONTRACTOR?</h2>
          <p className="text-sm font-medium">Get wholesale pricing, custom sampling, and dedicated trade account managers for bulk projects.</p>
        </div>
        <a 
          href="https://wa.me/916382948976?text=Hello,%20I%20am%20an%20architect%20interested%20in%20trade%20discount." 
          target="_blank" 
          rel="noopener noreferrer" 
          className="px-8 py-4 bg-black hover:bg-[#1B1A18] text-white font-display font-black text-sm uppercase tracking-wider shadow-2xl flex-shrink-0"
        >
          Register for Trade Account 🤝
        </a>
      </div>
    </section>
  );
}
