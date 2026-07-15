"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // Check local storage to see if consent has already been granted
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      // Add a slight delay before showing the banner for a smoother user experience
      const timer = setTimeout(() => {
        setShowConsent(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "true");
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 md:p-8 pointer-events-none flex justify-center">
      <div 
        className="pointer-events-auto bg-[#1a1a1a]/85 backdrop-blur-xl border border-[#333] shadow-[0_-10px_40px_rgba(0,0,0,0.3)] rounded-2xl p-5 sm:p-6 max-w-4xl w-full flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 animate-fade-in-up"
        style={{ animation: 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
      >
        <div className="text-sm sm:text-base text-[#ccc] flex-1 text-center md:text-left">
          <p>
            We use cookies to enhance your browsing experience, primarily to remember your language preferences via Google Translate. 
            By continuing to use this site, you consent to our use of cookies.{" "}
            <Link href="/privacy" className="text-blue-400 hover:text-blue-300 transition-colors underline whitespace-nowrap">
              Learn more
            </Link>
          </p>
        </div>
        <div className="flex shrink-0 w-full md:w-auto justify-center">
          <button
            onClick={acceptCookies}
            className="w-full md:w-auto bg-white hover:bg-gray-200 text-black font-semibold py-2.5 px-8 rounded-xl transition-colors focus:ring-4 focus:ring-gray-500 focus:outline-none shadow-md"
          >
            Accept & Continue
          </button>
        </div>
      </div>
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default CookieConsent;
