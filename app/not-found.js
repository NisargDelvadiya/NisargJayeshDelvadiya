"use client";

import Link from 'next/link';
import FuzzyText from './components/FuzzyText';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 developer-font bg-[#010409]">
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
      <h2 className="text-2xl md:text-3xl font-bold mt-2">Page Not Found</h2>
      <p className="text-zinc-400 mt-3 md:mt-4 text-base md:text-lg max-w-[90vw]">Oops! The page you're looking for doesn't exist.</p>
      
      <div className="w-full max-w-md mx-auto my-6 text-left bg-white/5 border border-white/10 rounded-xl p-4 md:p-5">
        <h3 className="text-zinc-200 font-semibold mb-2">Why did this happen?</h3>
        <p className="text-zinc-400 text-sm mb-4">
          The URL you visited might have a typo, or the page may have been moved or deleted.
        </p>
        <h3 className="text-zinc-200 font-semibold mb-2">How to solve this:</h3>
        <ul className="text-zinc-400 text-sm list-disc list-inside space-y-1">
          <li>Check the web address for any typos.</li>
          <li>Click the button below to return to the homepage.</li>
          <li>Use the main navigation menu to find what you need.</li>
        </ul>
      </div>
      
      <Link 
        href="/" 
        className="px-8 py-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-lg transition-all duration-300 font-medium"
      >
        Return Home
      </Link>
    </div>
  );
}
