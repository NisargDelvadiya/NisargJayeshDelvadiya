"use client";

import Link from 'next/link';
import FuzzyText from './components/FuzzyText';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 developer-font">
      <div className="mb-4">
        <FuzzyText 
          baseIntensity={0.2}
          hoverIntensity={0.5}
          enableHover
          fontSize="clamp(6rem, 20vw, 15rem)"
        >
          404
        </FuzzyText>
      </div>
      <h2 className="text-3xl font-bold mt-2">Page Not Found</h2>
      <p className="text-zinc-400 mt-4 mb-8 text-lg">Oops! The page you're looking for doesn't exist.</p>
      
      <Link 
        href="/" 
        className="px-8 py-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-lg transition-all duration-300 font-medium"
      >
        Return Home
      </Link>
    </div>
  );
}
