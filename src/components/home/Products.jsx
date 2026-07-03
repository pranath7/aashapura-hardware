import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

const productList = [
  { id: 1, name: "Royal Brass Pull Handle 600mm", category: "Door Handles", finish: "PVD COPPER", img: "/images/door_handles.png" },
  { id: 2, name: "Concealed Euro Mortise Lockset", category: "Locks", finish: "SATIN NICKEL", img: "/images/door_handles.png" },
  { id: 3, name: "Hydraulic Soft-Close Auto Hinge", category: "Hinges", finish: "SS304 GRADE", img: "/images/kitchen_fittings.png" },
  { id: 4, name: "Tandem Box Soft-Close Drawer", category: "Kitchen", finish: "ANTHRACITE", img: "/images/kitchen_fittings.png" },
  { id: 5, name: "Glass Shower 90° Brass Patch Hinge", category: "Glass", finish: "MATTE BLACK", img: "/images/glass_fittings.png" },
  { id: 6, name: "Heavy Wardrobe Top-Hung Roller", category: "Sliding", finish: "BLACK ANODIZED", img: "/images/door_handles.png" },
];

export default function Products() {
  return (
    <section id="products" className="py-24 border-b border-[#1B1A18] text-left max-w-7xl mx-auto px-6 space-y-12 bg-[#0E0E0F]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-xl mx-auto space-y-2"
      >
        <div className="stamp-badge">CATALOG.SPEC — FEATURED ITEMS</div>
        <h2 className="font-display font-black text-4xl sm:text-5xl text-[#F5F2ED] uppercase">SHOWROOM PRODUCTS</h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {productList.map((prod, idx) => (
          <motion.div 
            key={prod.id} 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            whileHover={{ y: -6 }}
            className="bg-[#1B1A18] border border-[#4A4845] p-5 space-y-4 hover:border-[#B8723C] transition-all group flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="h-52 w-full overflow-hidden bg-[#0E0E0F] relative">
                <img src={prod.img} alt={prod.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <span className="absolute top-3 left-3 bg-black text-[#D98E4A] border border-[#B8723C]/40 text-[9px] font-bold uppercase tracking-wider">
                  {prod.finish}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#D98E4A] uppercase block">{prod.category}</span>
                <h3 className="font-display font-black text-2xl text-[#F5F2ED] group-hover:text-[#D98E4A] transition-colors mt-0.5">{prod.name}</h3>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-[#4A4845]">
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={`https://wa.me/916382948976?text=Hello%20Aashapura%20Hardware,%20I%20want%20to%20buy%20${encodeURIComponent(prod.name)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-[#0E0E0F] hover:bg-[#B8723C] text-[#F5F2ED] hover:text-black font-display font-bold text-xs uppercase tracking-wider block text-center transition-all border border-[#4A4845]"
              >
                Enquire Rate on WhatsApp 💬
              </motion.a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
