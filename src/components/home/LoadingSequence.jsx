import React, { useState, useEffect } from 'react';

export default function LoadingSequence({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setFadeOut(true);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 600);
          return 100;
        }
        return prev + 5;
      });
    }, 25);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0E0E0F] text-white transition-opacity duration-600 ${fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <div className="space-y-6 text-center">
        <div className="flex items-center justify-center">
          <img 
            src="/images/logo_white.png" 
            alt="Aashapura Hardware Logo" 
            className="h-20 sm:h-24 w-auto object-contain animate-pulse" 
          />
        </div>
        <div className="w-48 h-1 bg-[#1B1A18] mx-auto overflow-hidden relative rounded-full border border-[#4A4845]">
          <div 
            className="h-full bg-gradient-to-r from-[#B8723C] to-[#D98E4A] transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="font-mono text-xs text-[#4A4845] font-bold block">{progress}% CALIBRATING MECHANICAL SPECIFICATIONS</span>
      </div>
    </div>
  );
}
