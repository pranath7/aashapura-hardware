import React from 'react';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BulkQuoteBanner() {
  return (
    <section className="py-16 bg-[#090d16] border-b border-slate-800 text-left">
      <div className="container mx-auto px-4 sm:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl bg-gradient-to-r from-slate-900 via-[#131b2e] to-slate-900 p-8 sm:p-10 border-2 border-amber-500/30 shadow-2xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
        >
          {/* Left Hardware Graphic */}
          <div className="md:col-span-4 flex justify-center md:justify-start">
            <div className="relative w-full max-w-[280px] h-36 rounded-2xl overflow-hidden border-2 border-amber-500/30 shadow-lg group">
              <img 
                src="/images/door_handles.png" 
                alt="Architectural Hardware Wholesale Bulk Orders" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-amber-950/20"></div>
            </div>
          </div>

          {/* Middle Text Content */}
          <div className="md:col-span-5 space-y-2">
            <h3 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight leading-tight">
              Architect or Contractor looking for <span className="text-amber-400">Wholesale Pricing?</span>
            </h3>
            <p className="text-sm text-slate-300 font-medium">
              Get direct factory B2B discounts for commercial projects, residential towers, and hotel hardware contracts.
            </p>
          </div>

          {/* Right Action Buttons */}
          <div className="md:col-span-3 flex flex-col sm:flex-row md:flex-col gap-3 justify-center items-stretch">
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 px-7 py-4 text-xs font-black text-slate-950 shadow-lg border-2 border-amber-300 transition-all cursor-pointer"
            >
              Get Bulk Quote Now <ArrowRight className="h-4 w-4 stroke-[3]" />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="https://wa.me/916382948976?text=Hello%20Aashapura%20Hardware,%20I%20want%20to%20inquire%20about%20wholesale%20architectural%20pricing."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-7 py-4 text-xs font-black text-white shadow-lg border-2 border-emerald-400 transition-all cursor-pointer"
            >
              <MessageSquare className="h-4 w-4 fill-white" /> WhatsApp B2B Desk
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
