import React from 'react';

export default function App() {
  return (
    <div className="fixed inset-0 bg-[#000000] flex flex-col items-center justify-center text-center p-6 z-[99999] font-sans">
      <div className="max-w-md space-y-6">
        <div className="w-16 h-16 mx-auto bg-red-950/20 border border-red-500/20 rounded-full flex items-center justify-center text-red-500">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h1 className="text-xl font-bold tracking-wider text-neutral-100 uppercase">
          Website Out of Service
        </h1>
        <p className="text-sm text-neutral-400 leading-relaxed">
          This website is temporarily offline due to non-payment of outstanding dues. Please contact the administrator to resolve this issue.
        </p>
        <div className="pt-4 border-t border-neutral-900">
          <p className="text-xs text-neutral-500 font-mono">
            Status: HTTP 402 (Payment Required)
          </p>
        </div>
      </div>
    </div>
  );
}
