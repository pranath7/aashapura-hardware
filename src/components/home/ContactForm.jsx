import React, { useState } from 'react';
import { MapPin, Phone, Send, Clock } from 'lucide-react';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [requirement, setRequirement] = useState('');
  const [mapInteractive, setMapInteractive] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = `Hello Aashapura Hardware,\n\nMy Name: *${name}*\nMy Phone: *${phone}*\n\nMy Requirement:\n${requirement}`;
    const whatsappUrl = `https://wa.me/916382948976?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="contact" className="py-16 sm:py-24 border-b border-[#1B1A18] text-left max-w-7xl mx-auto px-4 sm:px-6">
      <div className="space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12">
          
          {/* Left Column: Contact Details */}
          <div className="lg:col-span-6 space-y-6">
            <div className="stamp-badge">LOCATION.SPEC — SHOWROOM DESK</div>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-[#F5F2ED] uppercase">VISIT OUR SHOWROOM</h2>
            <div className="space-y-4 text-xs sm:text-sm text-slate-400">
              <p className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#D98E4A] flex-shrink-0 mt-0.5" />
                <span><strong>Address:</strong> 22, Vijaya Vigneshwarar Koil St, Choolai, Chennai - 600012, Tamil Nadu.</span>
              </p>
              <p className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#D98E4A] flex-shrink-0" />
                <span><strong>Phone:</strong> +91 63829 48976</span>
              </p>
              <p className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-[#D98E4A] flex-shrink-0" />
                <span><strong>Hours:</strong> Mon - Sat: 09:00 AM - 09:30 PM (Sunday Closed)</span>
              </p>
              <p className="flex items-center gap-3 pt-2">
                <span className="text-[9px] font-mono bg-slate-900 px-2 py-0.5 border border-[#B8723C]/30 text-[#D98E4A] uppercase tracking-widest rounded font-bold">
                  GSTIN
                </span>
                <span className="font-mono text-xs text-white"><strong>GSTIN/UIN:</strong> 33FGAPR8096C1Z8</span>
              </p>
            </div>
          </div>

          {/* Right Column: WhatsApp Form */}
          <div className="lg:col-span-6 bg-[#1B1A18] p-6 sm:p-8 border border-[#4A4845] space-y-4">
            <h3 className="font-display font-black text-xl sm:text-2xl text-[#F5F2ED] uppercase">SEND DIRECT WHATSAPP INQUIRY</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input 
                type="text" 
                placeholder="Your Full Name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required 
                className="w-full p-3 bg-[#0E0E0F] border border-[#4A4845] text-white text-xs focus:border-[#B8723C] outline-none" 
              />
              <input 
                type="tel" 
                placeholder="Mobile Number" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required 
                className="w-full p-3 bg-[#0E0E0F] border border-[#4A4845] text-white text-xs focus:border-[#B8723C] outline-none" 
              />
              <textarea 
                placeholder="Requirement Details (e.g. Brass Handles, Mortise Locks)" 
                rows="3" 
                value={requirement}
                onChange={(e) => setRequirement(e.target.value)}
                required 
                className="w-full p-3 bg-[#0E0E0F] border border-[#4A4845] text-white text-xs focus:border-[#B8723C] outline-none"
              ></textarea>
              <button type="submit" className="w-full py-3 bg-[#B8723C] hover:bg-[#D98E4A] text-black font-display font-black text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2">
                <Send className="w-4 h-4" /> Send Requirement on WhatsApp 💬
              </button>
            </form>
          </div>

        </div>

        {/* Interactive Google Map (Scroll Lock & Tap-to-Interact for mobile friendliness) */}
        <div 
          onClick={() => setMapInteractive(true)}
          onMouseLeave={() => setMapInteractive(false)}
          className="w-full h-[300px] sm:h-[450px] border border-[#4A4845] relative overflow-hidden bg-[#1B1A18] rounded-xl shadow-2xl cursor-pointer"
        >
          <iframe 
            title="Aashapura Hardware Location Map"
            src="https://maps.google.com/maps?q=Aashapura%20Hardware,%20Vijaya%20Vigneshwarar%20Koil%20St,%20Choolai,%20Chennai&t=&z=16&ie=UTF8&iwloc=&output=embed" 
            className={`absolute inset-0 w-full h-full border-0 grayscale invert opacity-75 contrast-125 transition-all duration-300 ${
              mapInteractive ? 'pointer-events-auto opacity-100' : 'pointer-events-none'
            }`}
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          />

          {/* Overlay to prevent scroll hijacking on mobile */}
          {!mapInteractive && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[1px] transition-all pointer-events-none">
              <span className="px-4 py-2 bg-[#0E0E0F]/90 text-[#D98E4A] border border-[#B8723C]/30 text-xs font-mono uppercase tracking-widest rounded-lg shadow-lg font-bold">
                Tap to interact with map 📍
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
