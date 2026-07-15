"use client";

import { useEffect } from 'react';
import FuzzyText from './components/FuzzyText';

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 developer-font bg-[#010409]">
      <div className="mb-4">
        <FuzzyText 
          baseIntensity={0.2}
          hoverIntensity={0.5}
          enableHover
          fontSize="clamp(6rem, 20vw, 15rem)"
          color="#ef4444" // red-500 color for error
        >
          500
        </FuzzyText>
      </div>
      <h2 className="text-3xl font-bold mt-2">Application Error</h2>
      <p className="text-zinc-400 mt-2 text-lg max-w-xl">
        Something unexpected happened. Here are the details to help you debug:
      </p>
      
      <div className="bg-black/50 border border-red-900/50 rounded-xl p-6 my-8 text-left max-w-2xl w-full mx-auto shadow-2xl">
        <div className="mb-4">
          <span className="text-red-400 font-semibold text-sm uppercase tracking-wider">Error Message</span>
          <p className="text-zinc-300 font-mono text-sm mt-1 break-all bg-red-950/30 p-3 rounded border border-red-900/30">{error.message || "Unknown Error"}</p>
        </div>
        {error.digest && (
          <div className="mb-4">
            <span className="text-zinc-500 font-semibold text-sm uppercase tracking-wider">Digest ID</span>
            <p className="text-zinc-400 font-mono text-xs mt-1">{error.digest}</p>
          </div>
        )}
        <div>
          <span className="text-blue-400 font-semibold text-sm uppercase tracking-wider">How to Fix</span>
          <ul className="list-disc list-inside text-zinc-400 text-sm mt-2 space-y-1">
            <li>Check your browser console for the full stack trace.</li>
            <li>If this is a chunk load error, try doing a hard refresh (Ctrl/Cmd + Shift + R).</li>
            <li>If you are in development mode, check your terminal for compilation errors.</li>
          </ul>
        </div>
      </div>
      <button
        onClick={() => reset()}
        className="px-8 py-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-lg transition-all duration-300 font-medium cursor-pointer"
      >
        Try Again
      </button>
    </div>
  );
}
