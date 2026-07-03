import React, { useState } from 'react';
import { Phone, MapPin, ArrowRight, Menu, X, ChevronDown, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HeaderNav() {
  const [activeTab, setActiveTab] = useState("Home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Catalog", href: "#catalog" },
    { name: "Finish Studio", href: "#finish-studio" },
    { name: "Fitting Advisor", href: "#advisor" },
    { name: "Gallery", href: "#gallery" },
    { name: "Contact", href: "#contact" },
  ];

  const handleScroll = (e, href, name) => {
    e.preventDefault();
    setActiveTab(name);
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header id="home" className="w-full bg-[#0d121f] text-white sticky top-0 z-50 shadow-2xl border-b border-amber-500/20">
      {/* Top Utility Strip */}
      <div className="border-b border-slate-800/80 py-2.5 text-xs text-slate-300">
        <div className="container mx-auto px-4 sm:px-8 flex items-center justify-between">
          
          {/* Brand Logo & Name */}
          <a href="#home" onClick={(e) => handleScroll(e, "#home", "Home")} className="flex items-center gap-3.5 group">
            <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 p-0.5 border border-amber-300 shadow-lg shadow-amber-950/50 group-hover:scale-105 transition-transform flex items-center justify-center">
              <div className="h-full w-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <span className="font-display font-black text-amber-400 text-xl tracking-tight">AH</span>
              </div>
            </div>
            <div className="text-left">
              <h1 className="font-display font-extrabold text-xl text-white tracking-tight leading-none">Aashapura Hardware</h1>
              <p className="text-[10px] font-bold text-amber-400 uppercase tracking-widest mt-0.5">Architectural Fittings & Door Handles</p>
            </div>
          </a>

          {/* Right Utility Contact Details */}
          <div className="hidden md:flex items-center gap-8 text-xs font-semibold">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-amber-500/15 text-amber-400 flex items-center justify-center border border-amber-500/30">
                <Phone className="h-4 w-4" />
              </div>
              <div className="text-left">
                <span className="block text-[10px] text-slate-400 font-bold uppercase">Call Desk</span>
                <a href="tel:9940177773" className="font-bold text-amber-300 hover:text-white transition-colors">+91 63829 48976</a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-amber-500/15 text-amber-400 flex items-center justify-center border border-amber-500/30">
                <MapPin className="h-4 w-4" />
              </div>
              <div className="text-left">
                <span className="block text-[10px] text-slate-400 font-bold uppercase">Showroom Address</span>
                <span className="font-semibold text-slate-200">22, Vijaya Vigneshwarar Koil St, Choolai, Chennai 600012</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="container mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-extrabold">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => handleScroll(e, item.href, item.name)}
              className={`relative py-1 transition-colors flex items-center gap-1.5 ${
                activeTab === item.name ? "text-amber-400 font-black" : "text-slate-300 hover:text-amber-400"
              }`}
            >
              {item.name}
              {activeTab === item.name && (
                <motion.div
                  layoutId="activeNavIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          ))}
        </nav>

        {/* High-Contrast CTA Button */}
        <div className="hidden sm:block">
          <a
            href="#contact"
            onClick={(e) => handleScroll(e, "#contact", "Contact")}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-600 px-6 py-2.5 text-xs font-black text-slate-950 shadow-xl shadow-amber-950/60 border-2 border-amber-300 transition-all active:scale-95 cursor-pointer"
          >
            Get Hardware Quote <ArrowRight className="h-4 w-4 stroke-[3]" />
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2.5 rounded-xl bg-slate-900 text-amber-400 border border-amber-500/30"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-[#0d121f] px-6 py-6 space-y-4 text-left">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => handleScroll(e, item.href, item.name)}
              className="block text-slate-100 font-extrabold text-base hover:text-amber-400 py-1"
            >
              {item.name}
            </a>
          ))}
          <div className="pt-4 border-t border-slate-800">
            <a
              href="#contact"
              onClick={(e) => handleScroll(e, "#contact", "Contact")}
              className="inline-flex items-center justify-center gap-2 w-full rounded-xl bg-amber-500 py-3 text-sm font-black text-slate-950 shadow-md"
            >
              Get Hardware Quote <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
