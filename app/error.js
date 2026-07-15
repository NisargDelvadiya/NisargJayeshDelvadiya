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
        >
          500
        </FuzzyText>
      </div>
      <h2 className="text-2xl md:text-3xl font-bold mt-2">Server Error</h2>
      <p className="text-zinc-400 mt-3 md:mt-4 text-base md:text-lg max-w-[90vw]">Oops! Something went wrong on our end.</p>
      
      <div className="w-full max-w-md mx-auto my-6 text-left bg-white/5 border border-white/10 rounded-xl p-4 md:p-5">
        <h3 className="text-zinc-200 font-semibold mb-2">Why did this happen?</h3>
        <p className="text-zinc-400 text-sm mb-4">
          The application encountered an unexpected internal error or a temporary network disruption while trying to load this page.
        </p>
        <h3 className="text-zinc-200 font-semibold mb-2">How to solve this:</h3>
        <ul className="text-zinc-400 text-sm list-disc list-inside space-y-1">
          <li>Try refreshing the page (Ctrl/Cmd + R).</li>
          <li>Check your internet connection.</li>
          <li>Wait a few minutes and try again.</li>
        </ul>
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
