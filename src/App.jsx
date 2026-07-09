import React, { useState, useEffect, useCallback } from 'react';
import LoadingSequence from './components/home/LoadingSequence';
import Navbar from './components/layout/Navbar';
import Hero from './components/home/Hero';
import TickerStrip from './components/home/TickerStrip';
import Categories from './components/home/Categories';
import MotionExperience from './components/home/MotionExperience';
import HardwareCatalog from './components/HardwareCatalog';
import About from './components/home/About';
import CTABanner from './components/home/CTABanner';
import ContactForm from './components/home/ContactForm';
import Footer from './components/layout/Footer';
import AdminPortal from './components/admin/AdminPortal';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [currentHash, setCurrentHash] = useState(window.location.hash);

  const handleLoadComplete = useCallback(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const isAdminView = currentHash === '#admin';

  return (
    <>
      {loading && <LoadingSequence onComplete={handleLoadComplete} />}

      <div className={`transition-opacity duration-500 min-h-screen bg-[#0E0E0F] text-[#F5F2ED] font-sans ${isAdminView ? '' : 'pb-20 md:pb-0'} ${loading ? 'opacity-0' : 'opacity-100'}`}>
        {isAdminView ? (
          <AdminPortal />
        ) : (
          <>
            <Navbar />

            <main>
              <Hero />
              <TickerStrip />
              <Categories />
              <MotionExperience />
              <HardwareCatalog />
              <About />
              <CTABanner />
              <ContactForm />
            </main>

            <Footer />

            {/* Sticky Mobile Bottom Bar */}
            <div className="fixed bottom-0 left-0 right-0 md:hidden bg-[#0E0E0F]/90 backdrop-blur-md border-t border-slate-800/80 p-3 flex gap-3 z-[9999]">
              <a
                href="https://wa.me/916382948976?text=Hello%20Aashapura%20Hardware,%20I%20want%20to%20enquire%20about%20your%20products."
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-colors shadow-lg"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.455L0 24zm6.59-4.846c1.66.986 3.284 1.48 4.961 1.48 5.275 0 9.56-4.283 9.564-9.559a9.512 9.512 0 00-2.8-6.758A9.516 9.516 0 0012.008 1.62c-5.276 0-9.563 4.287-9.567 9.563-.002 1.884.51 3.722 1.482 5.378l-.97 3.546 3.694-.969z"/>
                </svg>
                WhatsApp
              </a>
              <a
                href="tel:+916382948976"
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-colors border border-slate-700 shadow-lg"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/>
                </svg>
                Call Now
              </a>
            </div>
          </>
        )}
      </div>
    </>
  );
}
