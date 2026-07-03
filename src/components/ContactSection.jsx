import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="py-24 border-b border-slate-800 bg-[#0b0f17] text-left">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Contact Details */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-2">
              <p className="text-xs font-black uppercase tracking-widest text-amber-400">Visit Our Hardware Showroom</p>
              <h2 className="font-display text-3xl sm:text-4xl font-black text-white tracking-tight">Get in Touch with Aashapura Hardware</h2>
              <p className="text-sm text-slate-400">Have questions about mortise lock backsets, hydraulic hinge loads, or custom PVD finish matching? Drop by our showroom or call us directly.</p>
            </div>

            <div className="space-y-5">
              <div className="flex items-start gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-md">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/15 text-amber-400 flex-shrink-0 border border-amber-500/30">
                  <MapPin className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white">Showroom & Distribution Warehouse</h4>
                  <p className="text-xs text-slate-300">22, Vijaya Vigneshwarar Koil St, Choolai, Chennai, Chennai, Tamil Nadu 600001</p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-md">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/15 text-amber-400 flex-shrink-0 border border-amber-500/30">
                  <Phone className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white">Contact Desk / Phone</h4>
                  <p className="text-xs text-slate-300">
                    <strong className="text-white">Sales Helpline:</strong> <a href="tel:6382948976" className="text-amber-400 font-bold hover:underline">+91 63829 48976</a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-md">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/15 text-amber-400 flex-shrink-0 border border-amber-500/30">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white">Official Email Inquiry</h4>
                  <p className="text-xs text-slate-300">
                    <a href="mailto:aashapurahardware@gmail.com" className="text-amber-400 hover:underline font-semibold">aashapurahardware@gmail.com</a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-md">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400 flex-shrink-0 border border-emerald-500/30">
                  <Clock className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white">Showroom Timings</h4>
                  <p className="text-xs text-slate-300">Monday – Saturday: 10:00 AM – 8:30 PM<br />Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl border-2 border-slate-800 bg-slate-900 p-7 sm:p-9 shadow-2xl space-y-6">
              <h3 className="font-display text-xl font-black text-white flex items-center gap-2.5">
                <Send className="h-5 w-5 text-amber-400" /> Send Hardware Requirement
              </h3>

              {submitted ? (
                <div className="rounded-2xl border-2 border-emerald-500/40 bg-emerald-500/10 p-7 text-center space-y-2 shadow-sm">
                  <CheckCircle2 className="h-10 w-10 text-emerald-400 mx-auto" />
                  <h4 className="text-base font-bold text-white">Requirement Submitted Successfully!</h4>
                  <p className="text-xs text-slate-300">Our sales desk has received your specs and will contact you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Your Full Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Vikram Sharma" 
                      className="w-full rounded-xl border-2 border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white font-medium focus:border-amber-400 focus:outline-none transition-all shadow-inner" 
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Mobile / WhatsApp Number</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="e.g. 98765 43210" 
                      className="w-full rounded-xl border-2 border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white font-medium focus:border-amber-400 focus:outline-none transition-all shadow-inner" 
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Hardware Requirement Details</label>
                    <textarea 
                      required
                      rows="4" 
                      placeholder="Mention fittings required (e.g. 20 pairs Brass handles, SS mortise locks, soft-close hinges...)" 
                      className="w-full rounded-xl border-2 border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white font-medium focus:border-amber-400 focus:outline-none transition-all shadow-inner" 
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-600 py-4 text-base font-black text-slate-950 shadow-xl border-2 border-amber-300 transition-all active:scale-95 flex items-center justify-center gap-2.5 cursor-pointer mt-2"
                  >
                    <Send className="h-5 w-5 stroke-[2.5]" /> Submit Hardware Requirement
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
