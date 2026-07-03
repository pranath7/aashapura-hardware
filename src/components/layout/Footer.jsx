import React from 'react';
import { ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-16 bg-[#0E0E0F] border-t border-[#1B1A18] text-left">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#1B1A18]">
        <div className="space-y-4">
          <div className="flex items-center">
            <img 
              src="/images/logo_white.png" 
              alt="Aashapura Hardware Logo" 
              className="h-14 w-auto object-contain" 
            />
          </div>
          <p className="text-xs text-[#4A4845] leading-relaxed">Pioneers in architectural Joinery, solid brass handles, and heavy modular fittings in Choolai since 1998.</p>
          <span className="stamp-badge block">GSTIN: 33FGAPR8096C1Z8</span>
        </div>

        <div className="space-y-3">
          <h4 className="font-display font-black text-base text-[#F5F2ED] uppercase tracking-wider">QUICK LINKS</h4>
          <ul className="space-y-2 text-xs text-[#4A4845]">
            <li><a href="#home" className="hover:text-[#D98E4A]">Home Showcase</a></li>
            <li><a href="#about" className="hover:text-[#D98E4A]">Our Legacy</a></li>
            <li><a href="#categories" className="hover:text-[#D98E4A]">Hardware Categories</a></li>
            <li><a href="#motion" className="hover:text-[#D98E4A]">Motion Studio Lab</a></li>
            <li><a href="#products" className="hover:text-[#D98E4A]">Showroom Products</a></li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="font-display font-black text-base text-[#F5F2ED] uppercase tracking-wider">HARDWARE RANGES</h4>
          <ul className="space-y-2 text-xs text-[#4A4845]">
            <li>Solid Brass Entrance Pulls</li>
            <li>Mortise Computerized Locks</li>
            <li>SS304 Soft-Close Tandem Boxes</li>
            <li>Glass Shower Patch Fittings</li>
            <li>Concealed Hydraulic Door Closers</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="font-display font-black text-base text-[#F5F2ED] uppercase tracking-wider">SHOWROOM DESK</h4>
          <p className="text-xs text-[#4A4845]">22, Vijaya Vigneshwarar Koil St, Choolai, Chennai - 600012</p>
          <p class="text-xs font-mono text-[#D98E4A]">Direct Helpline: +91 63829 48976</p>
          <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-[#B8723C] hover:underline font-bold">
            <ExternalLink className="w-3.5 h-3.5" /> Get Google Maps Directions
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#4A4845] gap-4">
        <p>© 2026 Aashapura Hardware. All Rights Reserved.</p>
        <p className="font-mono">Designed for Architectural Excellence in Chennai</p>
      </div>
    </footer>
  );
}
