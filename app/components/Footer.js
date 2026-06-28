"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link';

/**
 * Footer Component
 * Contains legal links, donation links, and handles Google Translate integration.
 */
const Footer = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    };
    
    const cookieVal = getCookie('googtrans');
    if (cookieVal) {
      const lang = cookieVal.split('/').pop();
      if (lang) {
        setCurrentLanguage(lang);
      }
    }

    // Load Google Translate script dynamically if not present
    if (!document.getElementById("google-translate-script")) {
      const addScript = document.createElement("script");
      addScript.id = "google-translate-script";
      addScript.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      addScript.async = true;
      document.body.appendChild(addScript);

      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement({
          pageLanguage: 'en',
          includedLanguages: 'as,bn,brx,doi,gu,hi,kn,ks,gom,mai,ml,mni,mr,ne,or,pa,sa,sat,sd,ta,te,ur,en',
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false
        }, 'google_translate_element');
      };
    }
  }, []);

  const changeLanguage = (langCode) => {
    if (langCode === 'en') {
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" + window.location.hostname;
    } else {
      document.cookie = `googtrans=/en/${langCode}; path=/;`;
      document.cookie = `googtrans=/en/${langCode}; path=/; domain=${window.location.hostname};`;
    }
    window.location.reload();
  };

  return (
    <footer className="bg-[#1a1a1a] text-white">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="flex flex-row justify-center gap-16 sm:gap-32 text-left">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-heading uppercase">Legal</h2>
              <ul className="text-body font-medium">
                <li className="mb-4">
                  <a href="/privacy" className="hover:underline text-[#555]">Privacy Policy</a>
                </li>
                <li>
                  <a href="/t&c" className="hover:underline text-[#555]">Terms &amp; Conditions</a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-heading uppercase">Donation</h2>
              <ul className="text-body font-medium">
                <li className="mb-4">
                  <a href="https://www.akshayapatra.org" target="_blank" rel="noopener noreferrer" className="hover:underline text-[#555]">Akshaya Patra Foundation</a>
                </li>
                <li>
                  <a href="https://hindu.fund" target="_blank" rel="noopener noreferrer" className="hover:underline text-[#555]">Hindu Fund</a>
                </li>
              </ul>
            </div>
        </div>
        <hr className="my-6 border-default sm:mx-auto lg:my-8" />
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 flex-wrap pb-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto text-center sm:text-left">
            <span className="text-sm text-body text-[#555]">&copy; 2026 <a href="https://www.nisargjayeshdelvadiya.com" className="hover:underline">NisargJayeshDelvadiya &trade;</a> • Made with ❤️ in Bharat 🇮🇳 | All Rights are Reserved
            </span>
          </div>

          <div className="flex flex-row items-center justify-center gap-6 w-full sm:w-auto mt-2 sm:mt-0">
            <div className="relative inline-block text-left">
              <select
                aria-label="Select Language"
                onChange={(e) => changeLanguage(e.target.value)}
                value={currentLanguage}
                className="bg-[#2a2a2a] text-[#ccc] border border-[#444] rounded-md px-3 py-1.5 text-xs focus:outline-none focus:border-blue-500 hover:text-white transition duration-200 cursor-pointer"
              >
                <option value="en">English</option>
                <option value="as">অসমীয়া (Assamese)</option>
                <option value="bn">বাংলা (Bengali)</option>
                <option value="brx">बोडो (Bodo)</option>
                <option value="doi">डोगरी (Dogri)</option>
                <option value="gu">ગુજરાતી (Gujarati)</option>
                <option value="hi">हिन्दी (Hindi)</option>
                <option value="kn">ಕನ್ನಡ (Kannada)</option>
                <option value="ks">कॉशुर / كأشُر (Kashmiri)</option>
                <option value="gom">कोंकणी (Konkani)</option>
                <option value="mai">मैथिली (Maithili)</option>
                <option value="ml">മലയാളം (Malayalam)</option>
                <option value="mni">মণিপুরী / মৈতৈলোন (Manipuri)</option>
                <option value="mr">मराठी (Marathi)</option>
                <option value="ne">नेपाली (Nepali)</option>
                <option value="or">ଓଡ଼ିଆ (Odia)</option>
                <option value="pa">ਪੰਜਾਬੀ (Punjabi)</option>
                <option value="sa">संस्कृतम् (Sanskrit)</option>
                <option value="sat">संताली (Santali)</option>
                <option value="sd">सिन्धी / سنڌي (Sindhi)</option>
                <option value="ta">தமிழ் (Tamil)</option>
                <option value="te">తెలుగు (Telugu)</option>
              </select>
            </div>
            
            <div id="google_translate_element" style={{ display: 'none' }}></div>
          </div>
        </div>
      </div>
    </footer >
  )
}

export default Footer