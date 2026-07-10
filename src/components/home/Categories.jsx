import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { getCategories, getProducts } from '../../utils/db';

export default function Categories() {
  const [categoriesList, setCategoriesList] = useState([]);
  const [productsList, setProductsList] = useState([]);

  // Load database on mount
  useEffect(() => {
    setCategoriesList(getCategories());
    setProductsList(getProducts());
  }, []);

  // Listen for database updates from the admin dashboard
  useEffect(() => {
    const handleUpdate = () => {
      setCategoriesList(getCategories());
      setProductsList(getProducts());
    };
    window.addEventListener('ah_db_update', handleUpdate);
    return () => window.removeEventListener('ah_db_update', handleUpdate);
  }, []);

  return (
    <section id="categories" className="py-16 sm:py-24 border-b border-[#1B1A18] text-left max-w-7xl mx-auto px-4 sm:px-6 space-y-8 sm:space-y-12 bg-[#0E0E0F]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6"
      >
        <div>
          <div className="stamp-badge mb-2">CAT.SPEC — SOLUTION RANGES</div>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#F5F2ED] uppercase">
            INDUSTRIAL HARDWARE CATEGORIES
          </h2>
        </div>
        <p className="text-[#4A4845] text-xs sm:text-sm max-w-md">
          Certified architectural hardware engineered for daily heavy cycle loads and coastal corrosion resistance.
        </p>
      </motion.div>

      {/* Hexagonal Bento Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {categoriesList.map((cat, idx) => {
          const meta = {
            stamp: cat.stamp || 'RANGE 00',
            img: cat.img || '/images/door_handles.png',
            desc: cat.desc || 'Architectural hardware fittings.'
          };
          const count = productsList.filter(p => p.category === cat.id).length;

          return (
            <motion.div 
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.06 }}
              className="hexagon-wrap group relative w-full border-none bg-transparent transition-all duration-500 cursor-pointer"
            >
              {/* Hexagon Border */}
              <div className="hexagon-border shadow-md" />

              {/* Hexagon Inner Content */}
              <div className="hexagon-inner p-4 sm:p-6 flex flex-col items-center justify-between">
                
                {/* Background Product Image inside Hexagon (Soft blend) */}
                <img 
                  src={meta.img} 
                  alt={cat.name} 
                  className="absolute inset-0 w-full h-full object-cover opacity-15 mix-blend-luminosity group-hover:opacity-25 transition-all duration-500 scale-105 group-hover:scale-110 pointer-events-none" 
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#1B1A18]/90 via-[#1B1A18]/40 to-[#0E0E0F] opacity-70 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none" />

                {/* Top Section: Range stamp */}
                <div className="z-10 mt-1">
                  <span className="text-[7px] sm:text-[8px] font-mono tracking-widest text-[#D98E4A] bg-black/60 px-2 py-0.5 border border-[#B8723C]/20">
                    {meta.stamp}
                  </span>
                </div>

                {/* Middle Section: Title & Description */}
                <div className="z-10 text-center space-y-1.5 px-1 sm:px-2 flex-1 flex flex-col justify-center">
                  <h3 className="font-display font-black text-sm sm:text-base md:text-lg lg:text-xl text-[#F5F2ED] group-hover:text-[#D98E4A] transition-colors line-clamp-2 leading-tight uppercase">
                    {cat.name}
                  </h3>
                  <p className="text-[9px] sm:text-[10px] text-slate-400 line-clamp-2 leading-normal">
                    {meta.desc}
                  </p>
                </div>

                {/* Bottom Section: Model Counts and Action */}
                <div className="z-10 flex flex-col items-center gap-1.5 mb-1 w-full">
                  {/* Count Badge */}
                  <span className="px-2 py-0.5 bg-black/80 text-[#D98E4A] border border-[#B8723C]/30 text-[8px] font-bold uppercase tracking-wider">
                    {count} {count === 1 ? 'Model' : 'Models'}
                  </span>
                  
                  {/* View Details */}
                  <div className="flex items-center gap-1 text-[8px] sm:text-[9px] font-mono font-bold text-[#D98E4A] uppercase tracking-widest group-hover:text-white transition-colors">
                    <span>Explore</span>
                    <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
