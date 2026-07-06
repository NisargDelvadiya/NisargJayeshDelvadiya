"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link';

const ALL_LANGUAGES = [
  { code: "en", name: "English" },
  { code: "af", name: "Afrikaans" },
  { code: "sq", name: "Albanian" },
  { code: "am", name: "Amharic" },
  { code: "ar", name: "Arabic" },
  { code: "hy", name: "Armenian" },
  { code: "as", name: "Assamese" },
  { code: "ay", name: "Aymara" },
  { code: "az", name: "Azerbaijani" },
  { code: "bm", name: "Bambara" },
  { code: "eu", name: "Basque" },
  { code: "be", name: "Belarusian" },
  { code: "bn", name: "Bengali" },
  { code: "bho", name: "Bhojpuri" },
  { code: "bs", name: "Bosnian" },
  { code: "bg", name: "Bulgarian" },
  { code: "ca", name: "Catalan" },
  { code: "ceb", name: "Cebuano" },
  { code: "ny", name: "Chichewa" },
  { code: "zh-CN", name: "Chinese (Simplified)" },
  { code: "zh-TW", name: "Chinese (Traditional)" },
  { code: "co", name: "Corsican" },
  { code: "hr", name: "Croatian" },
  { code: "cs", name: "Czech" },
  { code: "da", name: "Danish" },
  { code: "dv", name: "Divehi" },
  { code: "nl", name: "Dutch" },
  { code: "eo", name: "Esperanto" },
  { code: "et", name: "Estonian" },
  { code: "ee", name: "Ewe" },
  { code: "tl", name: "Filipino" },
  { code: "fi", name: "Finnish" },
  { code: "fr", name: "French" },
  { code: "fy", name: "Frisian" },
  { code: "gl", name: "Galician" },
  { code: "lg", name: "Ganda" },
  { code: "ka", name: "Georgian" },
  { code: "de", name: "German" },
  { code: "el", name: "Greek" },
  { code: "gn", name: "Guarani" },
  { code: "gu", name: "Gujarati" },
  { code: "ht", name: "Haitian Creole" },
  { code: "ha", name: "Hausa" },
  { code: "haw", name: "Hawaiian" },
  { code: "iw", name: "Hebrew" },
  { code: "hi", name: "Hindi" },
  { code: "hmn", name: "Hmong" },
  { code: "hu", name: "Hungarian" },
  { code: "is", name: "Icelandic" },
  { code: "ig", name: "Igbo" },
  { code: "ilo", name: "Iloko" },
  { code: "id", name: "Indonesian" },
  { code: "ga", name: "Irish" },
  { code: "it", name: "Italian" },
  { code: "ja", name: "Japanese" },
  { code: "jw", name: "Javanese" },
  { code: "kn", name: "Kannada" },
  { code: "kk", name: "Kazakh" },
  { code: "km", name: "Khmer" },
  { code: "rw", name: "Kinyarwanda" },
  { code: "ko", name: "Korean" },
  { code: "kri", name: "Krio" },
  { code: "ku", name: "Kurdish (Kurmanji)" },
  { code: "ckb", name: "Kurdish (Sorani)" },
  { code: "ky", name: "Kyrgyz" },
  { code: "lo", name: "Lao" },
  { code: "la", name: "Latin" },
  { code: "lv", name: "Latvian" },
  { code: "ln", name: "Lingala" },
  { code: "lt", name: "Lithuanian" },
  { code: "lb", name: "Luxembourgish" },
  { code: "mk", name: "Macedonian" },
  { code: "mai", name: "Maithili" },
  { code: "mg", name: "Malagasy" },
  { code: "ms", name: "Malay" },
  { code: "ml", name: "Malayalam" },
  { code: "mt", name: "Maltese" },
  { code: "mi", name: "Maori" },
  { code: "mr", name: "Marathi" },
  { code: "mni-Mtei", name: "Meiteilon (Manipuri)" },
  { code: "lus", name: "Mizo" },
  { code: "mn", name: "Mongolian" },
  { code: "my", name: "Myanmar (Burmese)" },
  { code: "ne", name: "Nepali" },
  { code: "no", name: "Norwegian" },
  { code: "or", name: "Odia (Oriya)" },
  { code: "om", name: "Oromo" },
  { code: "ps", name: "Pashto" },
  { code: "fa", name: "Persian" },
  { code: "pl", name: "Polish" },
  { code: "pt", name: "Portuguese" },
  { code: "pa", name: "Punjabi" },
  { code: "qu", name: "Quechua" },
  { code: "ro", name: "Romanian" },
  { code: "ru", name: "Russian" },
  { code: "sm", name: "Samoan" },
  { code: "sa", name: "Sanskrit" },
  { code: "gd", name: "Scots Gaelic" },
  { code: "nso", name: "Sepedi" },
  { code: "sr", name: "Serbian" },
  { code: "st", name: "Sesotho" },
  { code: "sn", name: "Shona" },
  { code: "sd", name: "Sindhi" },
  { code: "si", name: "Sinhala" },
  { code: "sk", name: "Slovak" },
  { code: "sl", name: "Slovenian" },
  { code: "so", name: "Somali" },
  { code: "es", name: "Spanish" },
  { code: "su", name: "Sundanese" },
  { code: "sw", name: "Swahili" },
  { code: "sv", name: "Swedish" },
  { code: "tg", name: "Tajik" },
  { code: "ta", name: "Tamil" },
  { code: "tt", name: "Tatar" },
  { code: "te", name: "Telugu" },
  { code: "th", name: "Thai" },
  { code: "ti", name: "Tigrinya" },
  { code: "ts", name: "Tsonga" },
  { code: "tr", name: "Turkish" },
  { code: "tk", name: "Turkmen" },
  { code: "ak", name: "Twi" },
  { code: "uk", name: "Ukrainian" },
  { code: "ur", name: "Urdu" },
  { code: "ug", name: "Uyghur" },
  { code: "uz", name: "Uzbek" },
  { code: "vi", name: "Vietnamese" },
  { code: "cy", name: "Welsh" },
  { code: "xh", name: "Xhosa" },
  { code: "yi", name: "Yiddish" },
  { code: "yo", name: "Yoruba" },
  { code: "zu", name: "Zulu" },
]

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
      <div className="mx-auto w-full max-w-7xl p-4 py-6 lg:py-8">
        <div className="flex flex-row justify-center gap-16 sm:gap-32 text-left">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-heading uppercase">Legal</h2>
              <ul className="text-body font-medium">
                <li className="mb-4">
                  <a href="/t&c" className="hover:underline text-[#555]">Terms &amp; Conditions</a>
                </li>
                <li>
                  <a href="/privacy" className="hover:underline text-[#555]">Privacy Policy</a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-heading uppercase" title="dātavyam iti yad dānaṁ dīyate 'nupakāriṇe deśhe kāle cha pātre cha tad dānaṁ sāttvikaṁ smṛitam — Charity given to a worthy person simply because it is right to give, without consideration of anything in return, at the proper time and in the proper place, is stated to be in the mode of goodness. (Bhagavad Gita, Chapter 17, Verse 20)">Donation</h2>
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
                {ALL_LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>{lang.name}</option>
                ))}
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