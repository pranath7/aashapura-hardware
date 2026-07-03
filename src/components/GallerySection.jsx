import React, { useState } from 'react';
import { Sparkles, Maximize2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const galleryItems = [
  { id: 1, title: "Royal Brass Pull Handle Setup", category: "Door Hardware", img: "/images/door_handles.png" },
  { id: 2, title: "Modular Soft-Close Kitchen Baskets", category: "Kitchen Fittings", img: "/images/kitchen_fittings.png" },
  { id: 3, title: "Glass Shower Patch Fittings", category: "Glass Fittings", img: "/images/glass_fittings.png" },
  { id: 4, title: "Mortise Concealed Lock System", category: "Door Hardware", img: "/images/door_handles.png" },
  { id: 5, title: "Telescopic Soft-Close Runners", category: "Kitchen Fittings", img: "/images/kitchen_fittings.png" },
  { id: 6, title: "Hydraulic Self-Closing Glass Hinge", category: "Glass Fittings", img: "/images/glass_fittings.png" },
];

export default function GallerySection() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);

  const categories = ["All", "Door Hardware", "Kitchen Fittings", "Glass Fittings"];

  const filteredItems = activeFilter === "All" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeFilter);

  return (
    <section id="gallery" className="py-24 bg-[#0b0f17] border-b border-slate-800 text-left">
      <div className="container mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-black text-amber-400 uppercase tracking-widest">
            <Sparkles className="h-4 w-4 text-amber-400" /> Architectural Showcase
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-black text-white tracking-tight">
            Hardware Installations Gallery
          </h2>
          <p className="text-sm text-slate-400 font-medium">Explore real site installations of Aashapura Hardware across luxury villas, corporate offices, and modern kitchens.</p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-6 py-2.5 rounded-full text-xs font-extrabold transition-all duration-300 ${
                activeFilter === cat
                  ? "bg-amber-500 text-slate-950 shadow-lg shadow-amber-950/40"
                  : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group relative rounded-3xl overflow-hidden border-2 border-slate-800 bg-slate-900 shadow-xl cursor-pointer"
                onClick={() => setSelectedImage(item)}
              >
                <div className="h-64 w-full overflow-hidden">
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-90" 
                  />
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity"></div>

                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest block">{item.category}</span>
                    <h4 className="font-display font-bold text-base text-white mt-0.5">{item.title}</h4>
                  </div>
                  <div className="h-9 w-9 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/40 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                    <Maximize2 className="h-4 w-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Fullscreen Lightbox Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="relative max-w-4xl w-full rounded-3xl bg-slate-900 border-2 border-slate-800 overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 z-10 h-10 w-10 rounded-full bg-slate-950/80 text-white flex items-center justify-center hover:bg-amber-500 hover:text-slate-950 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
                <img src={selectedImage.img} alt={selectedImage.title} className="w-full max-h-[70vh] object-cover" />
                <div className="p-6 bg-slate-950 flex justify-between items-center text-left">
                  <div>
                    <span className="text-xs font-black text-amber-400 uppercase tracking-widest">{selectedImage.category}</span>
                    <h3 className="font-display font-extrabold text-xl text-white mt-1">{selectedImage.title}</h3>
                  </div>
                  <a
                    href={`https://wa.me/916382948976?text=Hello%20Aashapura%20Hardware,%20I%20am%20interested%20in%20${encodeURIComponent(selectedImage.title)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl bg-amber-500 hover:bg-amber-400 px-6 py-2.5 text-xs font-black text-slate-950 shadow-md"
                  >
                    Inquire on WhatsApp
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
