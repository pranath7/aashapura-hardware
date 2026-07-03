import React from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram, MessageSquare } from 'lucide-react';

export default function FooterRef() {
  return (
    <footer className="bg-[#070a10] text-white pt-16 pb-12 border-t border-slate-800/80 text-left">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800/60">
          
          {/* Brand Logo Left */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 p-0.5 border border-amber-300 shadow-xl flex items-center justify-center">
                <div className="h-full w-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <span className="font-display font-black text-amber-400 text-2xl tracking-tight">AH</span>
                </div>
              </div>
              <div>
                <h3 className="font-display font-black text-2xl text-white tracking-tight">Aashapura Hardware</h3>
                <p className="text-xs font-bold text-amber-400 uppercase tracking-widest">Architectural Fittings & Handles</p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Authorized distributor of premium architectural door handles, mortise locks, soft-close hydraulic hinges, glass fittings, and custom PVD hardware finishes in Chennai.
            </p>
          </div>

          {/* Quick Links Middle */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-amber-400">Quick Links</h4>
            <ul className="grid grid-cols-2 gap-2 text-xs text-slate-300 font-medium">
              <li><a href="#home" className="hover:text-amber-400 transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-amber-400 transition-colors">About Us</a></li>
              <li><a href="#catalog" className="hover:text-amber-400 transition-colors">Catalog</a></li>
              <li><a href="#finish-studio" className="hover:text-amber-400 transition-colors">Finish Studio</a></li>
              <li><a href="#advisor" className="hover:text-amber-400 transition-colors">Fitting Advisor</a></li>
              <li><a href="#contact" className="hover:text-amber-400 transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Contact Details Right */}
          <div className="md:col-span-5 space-y-4">
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-amber-400">Showroom Desk</h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-amber-400 flex-shrink-0" />
                <a href="tel:6382948976" className="hover:text-amber-400 transition-colors font-semibold">+91 63829 48976</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-amber-400 flex-shrink-0" />
                <a href="mailto:aashapurahardware@gmail.com" className="hover:text-amber-400 transition-colors">aashapurahardware@gmail.com</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>22, Vijaya Vigneshwarar Koil St, Choolai, Chennai, Chennai, Tamil Nadu 600001</span>
              </li>
            </ul>

            {/* Social icons */}
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="h-8 w-8 rounded-full bg-slate-900 border border-slate-800 text-amber-400 flex items-center justify-center hover:bg-amber-500 hover:text-slate-950 transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="h-8 w-8 rounded-full bg-slate-900 border border-slate-800 text-amber-400 flex items-center justify-center hover:bg-amber-500 hover:text-slate-950 transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="https://wa.me/916382948976" target="_blank" rel="noopener noreferrer" className="h-8 w-8 rounded-full bg-slate-900 border border-slate-800 text-amber-400 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-colors">
                <MessageSquare className="h-4 w-4" />
              </a>
            </div>
          </div>

        </div>

        <div className="pt-8 text-center text-xs text-slate-500 font-medium">
          <p>&copy; 2026 Aashapura Hardware. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
