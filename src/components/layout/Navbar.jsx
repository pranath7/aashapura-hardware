import React, { useState } from 'react';
import { Menu, X, Phone, MapPin, MessageSquare } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Spec Sheets', href: '#home' },
    { name: 'Categories', href: '#categories' },
    { name: 'Motion Studio', href: '#motion' },
    { name: 'Products', href: '#products' },
    { name: 'Legacy', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleScroll = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0E0E0F]/90 backdrop-blur-md border-b border-[#1B1A18] text-[#F5F2ED]">
      {/* Top Utility Bar */}
      <div className="bg-[#1B1A18] text-[#4A4845] py-2.5 text-xs hidden md:block border-b border-[#1B1A18]">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-[#D98E4A] font-bold">
              <MapPin className="w-3.5 h-3.5" /> 22, Vijaya Vigneshwarar Koil St, Choolai, Chennai 600012
            </span>
            <span>|</span>
            <span class="text-xs uppercase tracking-widest font-mono">GR.42 — Structural Steel & Forged Brass</span>
          </div>

          <div className="flex items-center gap-4 font-bold">
            <a href="tel:+916382948976" className="flex items-center gap-1.5 hover:text-[#D98E4A] transition-colors">
              <Phone className="w-3.5 h-3.5 text-[#D98E4A]" /> Hotline: +91 63829 48976
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        {/* Brand Logo - Crisp transparent monochrome white logo */}
        <a href="#home" onClick={(e) => handleScroll(e, '#home')} className="flex items-center group">
          <img 
            src="/images/logo_white.png" 
            alt="Aashapura Hardware Logo" 
            className="h-14 sm:h-16 w-auto object-contain transition-opacity group-hover:opacity-85" 
          />
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-[#4A4845]">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => handleScroll(e, item.href)}
              className="hover:text-[#D98E4A] transition-colors py-1 relative group"
            >
              {item.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D98E4A] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Action Button */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="https://wa.me/916382948976?text=Hello%20Aashapura%20Hardware,%20I%20want%20to%20get%20a%20quote."
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-[#B8723C] hover:bg-[#D98E4A] text-[#0E0E0F] font-display font-extrabold text-sm uppercase tracking-wider transition-all shadow-md flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4" /> WhatsApp Desk
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded bg-[#1B1A18] text-[#F5F2ED] border border-[#4A4845]"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0E0E0F] border-t border-[#1B1A18] px-6 py-6 space-y-4 text-left shadow-2xl">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => handleScroll(e, item.href)}
              className="block text-[#F5F2ED] font-bold text-sm uppercase tracking-widest hover:text-[#D98E4A] py-1"
            >
              {item.name}
            </a>
          ))}
          <a
            href="https://wa.me/916382948976"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center py-3 bg-[#B8723C] text-[#0E0E0F] font-display font-black text-sm uppercase tracking-wider"
          >
            WhatsApp Desk
          </a>
        </div>
      )}
    </header>
  );
}
