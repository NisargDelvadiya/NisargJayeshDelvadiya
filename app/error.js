"use client";

import { useEffect } from 'react';
import FuzzyText from './components/FuzzyText';

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 developer-font">
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
      <h2 className="text-3xl font-bold mt-2">Something went wrong!</h2>
      <p className="text-zinc-400 mt-4 mb-8 text-lg">An unexpected error has occurred on our end.</p>
      
      <button
        onClick={() => reset()}
        className="px-8 py-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-lg transition-all duration-300 font-medium cursor-pointer"
      >
        Try Again
      </button>
    </div>
  );
}
