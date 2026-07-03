import React, { useState, useEffect } from 'react';
import { ArrowRight, Key, ShieldCheck, Cpu, Box, Sparkles, Droplets, Grid, Wrench, Layers, DoorOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import { getProducts, getCategories } from '../utils/db';

export default function HardwareCatalog() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [productsList, setProductsList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);

  // Load database on mount
  useEffect(() => {
    setProductsList(getProducts());
    setCategoriesList(getCategories());
  }, []);

  // Listen for real-time dashboard updates
  useEffect(() => {
    const handleUpdate = () => {
      setProductsList(getProducts());
      setCategoriesList(getCategories());
    };
    window.addEventListener('ah_db_update', handleUpdate);
    return () => window.removeEventListener('ah_db_update', handleUpdate);
  }, []);

  // Filter products by category and search query
  const filteredProducts = productsList.filter(p => {
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Get icon for categories
  const getCategoryIcon = (categoryName) => {
    switch (categoryName) {
      case 'kitchen-accessories': return Box;
      case 'pvd-profile': return Layers;
      case 'wardrobe-accessories': return Grid;
      case 'sliding-fitting': return Grid;
      case 'door-closer': return ShieldCheck;
      case 'hinges': return Cpu;
      case 'telescopic-channel': return Layers;
      default: return Wrench;
    }
  };

  return (
    <section id="catalog" className="py-16 sm:py-24 bg-[#090d16] border-b border-slate-800 text-left">
      <div className="container mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-black text-amber-400 uppercase tracking-widest">
            <Sparkles className="h-4 w-4 text-amber-400" /> Complete Hardware Range
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-black text-white tracking-tight">
            Explore Architectural Product Catalog
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-medium">Browse our certified range of brass handles, locks, hinges, and kitchen fittings.</p>
        </div>

        {/* Amazon-Style Layout: Sidebar on Desktop, tabs on Mobile */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Left Sidebar — Categories Filter (Desktop only: hidden lg:block) */}
          <div className="w-full lg:w-1/4 lg:sticky lg:top-32 hidden lg:block bg-[#0E0E0F]/45 p-4 rounded-2xl border border-slate-800/80 flex-shrink-0">
            <h3 className="font-display font-black text-2xl text-white mb-6 pb-3 border-b border-slate-800 uppercase tracking-wider">
              Categories
            </h3>
            <div className="space-y-1">
              <button
                onClick={() => setActiveCategory('all')}
                className={`w-full text-left font-sans font-bold text-sm py-2.5 px-4 rounded-xl transition-all duration-300 flex items-center justify-between gap-1.5 ${
                  activeCategory === 'all'
                    ? 'bg-white text-black font-semibold shadow-md'
                    : 'text-slate-355 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span className="flex items-center gap-2">📦 All Products</span>
                <span className="text-xs font-mono opacity-60">
                  {productsList.length}
                </span>
              </button>
              {categoriesList.map((cat) => {
                const count = productsList.filter(p => p.category === cat.id).length;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`w-full text-left font-sans font-bold text-sm py-2.5 px-4 rounded-xl transition-all duration-300 flex items-center justify-between gap-1.5 ${
                      activeCategory === cat.id
                        ? 'bg-white text-black font-semibold shadow-md'
                        : 'text-slate-355 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{cat.emoji}</span>
                      <span>{cat.name}</span>
                    </span>
                    <span className="text-xs font-mono opacity-60">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Mobile Filter pills, Search bar, and Products Grid */}
          <div className="flex-1 w-full space-y-6">
            
            {/* Mobile Category Horizontal Tabs (Mobile only: lg:hidden) */}
            <div className="w-full lg:hidden overflow-x-auto pb-3 flex gap-2 scrollbar-none">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-300 ${
                  activeCategory === 'all'
                    ? 'bg-white text-black shadow-md'
                    : 'bg-[#1B1A18] text-slate-300 border border-slate-800'
                }`}
              >
                📦 All Products
              </button>
              {categoriesList.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-300 ${
                    activeCategory === cat.id
                      ? 'bg-white text-black shadow-md'
                      : 'bg-[#1B1A18] text-slate-300 border border-slate-800'
                  }`}
                >
                  {cat.emoji} {cat.shortName || cat.name}
                </button>
              ))}
            </div>

            {/* Search Input Bar (Visible on both viewports) */}
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-3 pl-11 pr-4 bg-slate-900 border border-slate-800 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-[#B8723C] transition-colors"
              />
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35" />
              </svg>
            </div>

            {/* Products Grid (2 columns on mobile, 3 columns on desktop/tablet) */}
            {filteredProducts.length === 0 ? (
              <div className="py-16 text-center text-slate-500 border border-dashed border-slate-800 rounded-2xl px-4">
                <p className="text-xs sm:text-sm font-medium">No products match your active filters.</p>
                <button 
                  onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
                  className="mt-4 text-xs font-bold text-[#D98E4A] hover:underline"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                {filteredProducts.map((item, idx) => {
                  const CategoryIcon = getCategoryIcon(item.category);
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.04 }}
                      whileHover={{ y: -6 }}
                      className="group rounded-xl sm:rounded-2xl bg-slate-900 border border-slate-800/80 shadow-lg hover:shadow-2xl hover:border-[#B8723C] transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer p-3 sm:p-4 text-left relative"
                    >
                      <div className="h-24 xs:h-28 sm:h-40 w-full rounded-lg sm:rounded-xl overflow-hidden bg-slate-950 mb-3 relative border border-slate-800/60">
                        <img 
                          src={item.img} 
                          alt={item.name} 
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-90" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                        <span className="absolute bottom-2 left-2 text-[7px] sm:text-[9px] font-extrabold text-[#D98E4A] uppercase bg-black/80 px-1.5 py-0.5 rounded border border-[#B8723C]/30 animate-fade-in">
                          {categoriesList.find(c => c.id === item.category)?.shortName || item.category}
                        </span>
                      </div>

                      {/* Product Title & Full-Width WhatsApp Button */}
                      <div className="space-y-3 flex-grow flex flex-col justify-between">
                        <h4 className="font-sans font-bold text-[10px] sm:text-sm text-white group-hover:text-[#D98E4A] transition-colors truncate">
                          {item.name}
                        </h4>
                        
                        <div className="pt-2 border-t border-slate-800/60">
                          <a
                            href={`https://wa.me/916382948976?text=Hello%20Aashapura%2520Hardware,%2520I%2520want%2520to%2520enquire%2520about%252520${encodeURIComponent(item.name)}.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-1.5 bg-slate-950 hover:bg-[#B8723C] text-slate-350 hover:text-black font-sans font-bold text-[8px] sm:text-xs uppercase tracking-wider block text-center transition-all border border-slate-800/80 rounded-lg sm:rounded-xl"
                          >
                            Enquire 💬
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>

        </div>

        {/* High-Contrast CTA */}
        <div className="mt-14 text-center">
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href="#contact"
            className="inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-[#B8723C] via-[#D98E4A] to-[#B8723C] hover:from-[#D98E4A] hover:to-[#8c6b2d] px-9 py-4 text-xs sm:text-sm font-black text-black border border-[#D98E4A]/30 shadow-2xl transition-all cursor-pointer"
          >
            Request Complete Hardware Pricelist <ArrowRight className="h-4 w-4 stroke-[3]" />
          </motion.a>
        </div>

      </div>
    </section>
  );
}
