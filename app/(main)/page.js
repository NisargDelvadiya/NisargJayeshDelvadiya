"use client";
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const CircularGallery = dynamic(() => import('@/app/components/CircularGallery'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[160px] flex flex-col justify-center items-center gap-3 bg-zinc-900/30 rounded-xl border border-zinc-800/50 backdrop-blur-sm animate-pulse">
      <div className="w-6 h-6 border-2 border-zinc-700 border-t-zinc-400 rounded-full animate-spin"></div>
      <p className="text-zinc-500 text-xs tracking-widest uppercase developer-font">Loading 3D Gallery...</p>
    </div>
  )
});
import SplitText from '@/app/components/SplitText';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PROJECT_ITEMS = [
  { image: '/Assets/mytodo.png', link: '/mytodo' },
  { image: 'https://picsum.photos/seed/1/800/600?grayscale' },
  { image: 'https://picsum.photos/seed/2/800/600?grayscale' },
  { image: 'https://picsum.photos/seed/3/800/600?grayscale' },
  { image: 'https://picsum.photos/seed/4/800/600?grayscale' },
  { image: 'https://picsum.photos/seed/5/800/600?grayscale' }
];

/**
 * Main Landing Page Component
 * Represents the entire portfolio layout, handling animations, 
 * contact form submissions, and smooth scrolling for navigation.
 */
/**
 * Home Component
 * The main landing page of the portfolio website.
 * It integrates a 3D circular gallery, dynamic SplitText animations,
 * and a contact form with error/success handling.
export default function Home() {
  const contactRef = useRef(null);
  const router = useRouter();
  const profileImageRef = useRef(null);
  const profileTextRef = useRef(null);
  const educationImageRef = useRef(null);
  const educationTextRef = useRef(null);

  // Animation constants
  const errorTokens = [
    { text: "const ", className: "text-fuchsia-400" },
    { text: "sum = ", className: "text-sky-300" },
    { text: "0.1 + 0.2", className: "text-amber-200" },
    { text: ";\n", className: "text-slate-300" },
    { text: "if ", className: "text-fuchsia-400" },
    { text: "(sum === ", className: "text-sky-300" },
    { text: "0.3", className: "text-amber-200" },
    { text: ") {\n", className: "text-slate-300" },
    { text: "  console.log(", className: "text-yellow-200" },
    { text: '"Math works! ✅"', className: "text-amber-200" },
    { text: ");\n", className: "text-slate-300" },
    { text: "} ", className: "text-slate-300" },
    { text: "else ", className: "text-fuchsia-400" },
    { text: "{\n", className: "text-slate-300" },
    { text: "  throw new ", className: "text-fuchsia-400" },
    { text: "Error(", className: "text-yellow-200" },
    { text: '"IEEE 754 error"', className: "text-amber-200" },
    { text: ")", className: "text-red-400 font-bold bg-red-950/40 px-1 rounded vs-error-squiggly" },
    { text: ";\n}", className: "text-slate-300" }
  ];

  const correctTokens = [
    { text: "const ", className: "text-fuchsia-400" },
    { text: "sum = ", className: "text-sky-300" },
    { text: "0.1 + 0.2", className: "text-amber-200" },
    { text: ";\n", className: "text-slate-300" },
    { text: "// Fixing float precision with epsilon\n", className: "text-zinc-500 italic" },
    { text: "if ", className: "text-fuchsia-400" },
    { text: "(Math.abs(sum - ", className: "text-sky-300" },
    { text: "0.3", className: "text-amber-200" },
    { text: ") < Number.EPSILON) {\n", className: "text-sky-300" },
    { text: "  console.log(", className: "text-yellow-200" },
    { text: '"Math works (with EPSILON)! 🛟"', className: "text-amber-200" },
    { text: ");\n", className: "text-slate-300" },
    { text: "}", className: "text-slate-300" }
  ];

  const [phase, setPhase] = useState(0);
  const [visibleChars, setVisibleChars] = useState(0);

  const isErrorCycle = phase === 0 || phase === 1;
  const currentTokens = isErrorCycle ? errorTokens : correctTokens;
  const maxLength = currentTokens.reduce((acc, t) => acc + t.text.length, 0);

  const [formData, setFormData] = useState({
    email: '',
    subject: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState('idle'); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
        setErrorMessage(data.error || 'Failed to send message.');
      }
    } catch (err) {
      console.error('Contact form submission error:', err);
      setSubmitStatus('error');
      setErrorMessage('An unexpected error occurred. Please try again.');
    }
  };

  useEffect(() => {
    const profilePhoto = profileImageRef.current;
    if (profilePhoto) {
      gsap.fromTo(profilePhoto,
        { clipPath: 'circle(0% at 50% 50%)', scale: 0.85, opacity: 0 },
        {
          clipPath: 'circle(100% at 50% 50%)',
          scale: 1,
          opacity: 1,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: profilePhoto,
            start: 'top 90%',
            end: 'top 50%',
            scrub: 1
          }
        }
      );
    }

    const profileText = profileTextRef.current;
    if (profileText) {
      gsap.fromTo(profileText,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: profileText,
            start: 'top 92%',
            end: 'top 55%',
            scrub: 1
          }
        }
      );
    }

    const uniPhoto = educationImageRef.current;
    if (uniPhoto) {
      gsap.fromTo(uniPhoto,
        { clipPath: 'circle(0% at 50% 50%)', scale: 0.85, opacity: 0 },
        {
          clipPath: 'circle(100% at 50% 50%)',
          scale: 1,
          opacity: 1,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: uniPhoto,
            start: 'top 90%',
            end: 'top 50%',
            scrub: 1
          }
        }
      );
    }

    const eduText = educationTextRef.current;
    if (eduText) {
      gsap.fromTo(eduText,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: eduText,
            start: 'top 92%',
            end: 'top 55%',
            scrub: 1
          }
        }
      );
    }
  }, []);


  useEffect(() => {
    let timer;

    if (phase === 0) {
      if (visibleChars < maxLength) {
        timer = setTimeout(() => setVisibleChars((p) => p + 1), 60);
      } else {
        timer = setTimeout(() => setPhase(1), 2000);
      }
    }
    else if (phase === 1) {
      if (visibleChars > 0) {
        timer = setTimeout(() => setVisibleChars((p) => p - 1), 25);
      } else {
        timer = setTimeout(() => setPhase(2), 400);
      }
    }
    else if (phase === 2) {
      if (visibleChars < maxLength) {
        timer = setTimeout(() => setVisibleChars((p) => p + 1), 60);
      } else {
        timer = setTimeout(() => setPhase(3), 3500);
      }
    }
    else if (phase === 3) {
      if (visibleChars > 0) {
        timer = setTimeout(() => setVisibleChars((p) => p - 1), 25);
      } else {
        timer = setTimeout(() => setPhase(0), 400);
      }
    }
    return () => clearTimeout(timer);
  }, [visibleChars, phase, maxLength]);

  const renderTypedText = () => {
    let charCount = 0;
    const renderedElements = [];

    for (let i = 0; i < currentTokens.length; i++) {
      if (charCount >= visibleChars) break;

      const token = currentTokens[i];
      const remainingSpace = visibleChars - charCount;
      const textToRender = token.text.slice(0, remainingSpace);
      charCount += token.text.length;

      renderedElements.push(
        <span key={i} className={token.className}>
          {textToRender}
        </span>
      );
    }
    return renderedElements;
  };

  return (
    <div className="flex flex-col justify-center items-center text-white min-h-screen py-8 px-4 overflow-hidden w-full">

      <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Petit+Formal+Script&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Lexend+Deca:wght@400;500;700&display=swap');
          
          .petit-formal-script-regular {
            font-family: "Petit Formal Script", cursive;
            font-weight: 400;
            font-style: normal;
            }

        .developer-font {
          font-family: "JetBrains Mono", monospace;
        }

        .lexend-font {
          font-family: "Lexend Deca", sans-serif;
        }

        @keyframes blink-cursor {
          50% { border-color: transparent; }
        }
        .animate-cursor {
          animation: blink-cursor 0.7s infinite;
        }

        .vs-error-squiggly {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='6' height='3'%3E%3Cpath d='M0 2 Q1.5 0 3 2 T6 2' fill='none' stroke='%23ef4444' strokeWidth='1'/%3E%3C/svg%3E");
          background-repeat: repeat-x;
          background-position: bottom;
          padding-bottom: 2px;
        }

        @keyframes slide-top {
          0% { transform: translateY(0); }
          50% { transform: translateY(-70px) rotate(90deg); }
          60% { transform: translateY(-70px) rotate(90deg); }
          100% { transform: translateY(-8px) rotate(90deg); }
        }

        @keyframes slide-post {
          50% { transform: translateY(0); }
          100% { transform: translateY(-70px); }
        }

        @keyframes fade-in-fwd {
          0% { opacity: 0; transform: translateY(-5px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        .group:hover .animate-card {
          animation: slide-top 1.2s cubic-bezier(0.645, 0.045, 0.355, 1) both;
        }

        .group:hover .animate-post {
          animation: slide-post 1s cubic-bezier(0.165, 0.84, 0.44, 1) both;
        }

        .group:hover .animate-rupee {
          animation: fade-in-fwd 0.3s 1s backwards;
        }


        /* From Uiverse.io by Gaurang7717 */ 
        .light-button button.bt {
          position: relative;
          height: 150px;
          display: flex;
          align-items: flex-end;
          outline: none;
          background: none;
          border: none;
          cursor: pointer;
        }

        .light-button button.bt .button-holder {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 90px;
          width: 90px;
          background-color: #0c0c0e;
          border: 1px solid #1f2023;
          border-radius: 8px;
          color: #55555d;
          font-size: 11px;
          font-weight: 700;
          transition: 300ms;
          outline: #0c0c0e 2px solid;
          outline-offset: 20px;
        }

        .light-button button.bt .button-holder svg {
          height: 28px;
          width: 28px;
          fill: #55555d;
          transition: 300ms;
          margin-bottom: 8px;
        }

        .light-button button.bt .light-holder {
          position: absolute;
          height: 150px;
          width: 90px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .light-button button.bt .light-holder .dot {
          position: absolute;
          top: 0;
          width: 6px;
          height: 6px;
          background-color: #0c0c0e;
          border-radius: 10px;
          z-index: 2;
        }

        .light-button button.bt .light-holder .light {
          position: absolute;
          top: 0;
          width: 140px;
          height: 150px;
          clip-path: polygon(50% 0%, 20% 100%, 80% 100%);
          background: transparent;
          pointer-events: none;
        }



        /* GitHub Hover Styles */
        .light-button.github button.bt:hover .button-holder svg {
          fill: rgba(255, 255, 255, 1);
        }
        .light-button.github button.bt:hover .button-holder {
          color: rgba(255, 255, 255, 1);
          outline: rgba(255, 255, 255, 0.4) 2px solid;
          outline-offset: 2px;
          border-color: rgba(255, 255, 255, 0.5);
        }
        .light-button.github button.bt:hover .light-holder .light {
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.3) 0%,
            rgba(255, 255, 255, 0) 75%
          );
        }

        /* LinkedIn Hover Styles */
        .light-button.linkedin button.bt:hover .button-holder svg {
          fill: rgba(10, 102, 194, 1);
        }
        .light-button.linkedin button.bt:hover .button-holder {
          color: rgba(10, 102, 194, 1);
          outline: rgba(10, 102, 194, 0.4) 2px solid;
          outline-offset: 2px;
          border-color: rgba(10, 102, 194, 0.5);
        }
        .light-button.linkedin button.bt:hover .light-holder .light {
          background: linear-gradient(
            180deg,
            rgba(10, 102, 194, 0.4) 0%,
            rgba(10, 102, 194, 0) 75%
          );
        }

        


        }
      `}</style>

      <SplitText
        text="Namaste /\"
        className="block font-bold text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl mb-16 md:mb-8 mt-1 md:mt-1 text-center px-4 developer-font transition-all duration-300"
        delay={50}
        duration={1.25}
        ease="power3.out"
        splitType="chars"
        from={{ opacity: 0, y: 40 }}
        to={{ opacity: 1, y: 0 }}
      />
      <SplitText
        text="Welcome to my Portfolio Website :)"
        className="block font-bold text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl mb-16 md:mb-8 md:mt-1 text-center px-4 developer-font transition-all duration-300"
        delay={50}
        duration={1.25}
        ease="power3.out"
        splitType="chars"
        from={{ opacity: 0, y: 40 }}
        to={{ opacity: 1, y: 0 }}
      />

      <div className="w-full max-w-xl lg:max-w-2xl xl:max-w-3xl 2xl:max-w-4xl bg-[#1e1e1e] rounded-lg border border-zinc-800 shadow-2xl p-4 sm:p-6 lg:p-8 xl:p-10 developer-font relative mb-32 md:mb-64 overflow-hidden transition-all duration-300">
        <div className="flex gap-1.5 absolute top-3 left-4">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        </div>

        <div className="text-xs text-zinc-500 text-center border-b border-zinc-800/60 pb-2 mb-4 select-none">
          floatMath.js
        </div>

        <div className="min-h-[350px] sm:min-h-[250px] lg:min-h-[300px] xl:min-h-[350px] flex flex-col justify-between w-full">
          <div className="text-left text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl leading-relaxed whitespace-pre pl-2 overflow-x-auto max-w-full pb-2">
            {renderTypedText()}
            <span className="animate-cursor border-r-2 border-r-white ml-0.5">&nbsp;</span>
          </div>

          <div className="min-h-[2.5rem] mt-2">
            {isErrorCycle && visibleChars === maxLength && (
              <div className="text-xs bg-red-950/30 border border-red-900/50 text-red-400 p-2 rounded flex items-center gap-2 animate-pulse">
                <span>❌</span>
                <span>Uncaught Error: IEEE 754: 0.30000000000000004. Float math precision has left the chat.</span>
              </div>
            )}
          </div>
        </div>
      </div>


      <div className="w-full flex flex-col items-center justify-center">
        {/* --- ABOUT SECTION --- */}
        <div id="about" className="flex items-center w-full max-w-6xl xl:max-w-7xl 2xl:max-w-[1400px] my-12 select-none transition-all duration-300">
          <span className="h-px flex-1 bg-zinc-800"></span>
          <span className="shrink-0 px-6 text-zinc-400 font-medium tracking-wider uppercase text-sm developer-font">
            Who Am I?
          </span>
          <span className="h-px flex-1 bg-zinc-800"></span>
        </div>
        <section className="w-full flex flex-col justify-center items-center py-12 px-6 md:px-12 gap-8 md:gap-16 box-border">
          <div className="w-full max-w-6xl xl:max-w-7xl 2xl:max-w-[1400px] flex flex-col md:flex-row justify-between items-center gap-12 xl:gap-20 2xl:gap-32 transition-all duration-300">
            <div ref={profileImageRef} className="flex items-center justify-center shrink-0">
              <img
                className="object-cover rounded-full border border-zinc-800 shadow-xl w-56 h-56 md:w-[300px] md:h-[300px] lg:w-[350px] lg:h-[350px] xl:w-[450px] xl:h-[450px] 2xl:w-[550px] 2xl:h-[550px] transition-all duration-300"
                alt="hero"
                src="/Assets/hero.jpg"
                width="300"
                height="300"
                loading="lazy"
              />
            </div>
            <div ref={profileTextRef} className="flex flex-col justify-center items-center text-center md:text-left md:items-start grow w-full max-w-2xl xl:max-w-4xl 2xl:max-w-5xl gap-y-6 min-w-0 transition-all duration-300">
              <div className="petit-formal-script-regular text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-white tracking-wide wrap-break-word w-full transition-all duration-300">
                Hello, I'm Nisarg Jayesh Delvadiya
              </div>
              <div className="text-zinc-400 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed font-normal wrap-break-word w-full transition-all duration-300">
                A passionate and dedicated web developer with a strong focus on creating innovative and user-friendly web applications. I have a keen interest in next.js development especially frontend side, and I enjoy bringing ideas to life through clean and efficient code. My goal is to continuously learn and grow as a developer, while contributing to projects that make a positive impact on users' experiences.
              </div>
              {/* 
                INSTRUCTIONS: 
                To make this work, place your resume PDF file inside the "public/Assets/" folder
                and name it exactly "Nisarg_Jayesh_Delvadiya_Resume.pdf". 
              */}
              <a
                href="/Assets/Nisarg_Jayesh_Delvadiya_Resume.pdf" title="Go to /Assets/Nisarg_Jayesh_Delvadiya_Resume.pdf"
                download="Nisarg_Jayesh_Delvadiya_Resume.pdf"
                className="cursor-pointer inline-block rounded-xl bg-blue-600 px-8 py-3 text-sm lg:text-base xl:text-lg font-semibold text-center leading-6 text-white transition-colors duration-200 hover:bg-blue-700 focus-visible:bg-blue-700 mt-4 xl:mt-8 2xl:px-12 2xl:py-4"
              >
                Download Resume
              </a>
            </div>
          </div>
        </section>
        {/* --- EDUCATION SECTION --- */}
        <div id="education" className="flex items-center w-full max-w-6xl xl:max-w-7xl 2xl:max-w-[1400px] my-12 select-none transition-all duration-300">
          <span className="h-px flex-1 bg-zinc-800"></span>
          <span className="shrink-0 px-6 text-zinc-400 font-medium tracking-wider uppercase text-sm developer-font">
            I Studied At...
          </span>
          <span className="h-px flex-1 bg-zinc-800"></span>
        </div>
        <section className="w-full flex flex-col justify-center items-center py-12 px-6 md:px-12 gap-8 md:gap-16 box-border">
          <div className="w-full max-w-6xl xl:max-w-7xl 2xl:max-w-[1400px] flex flex-col-reverse md:flex-row justify-between items-center gap-12 xl:gap-20 2xl:gap-32 transition-all duration-300">
            <div ref={educationTextRef} className="flex flex-col justify-center items-center text-center md:text-left md:items-start grow w-full max-w-2xl xl:max-w-4xl 2xl:max-w-5xl min-w-0 transition-all duration-300">
              <div className="petit-formal-script-regular text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-white mb-6 tracking-wide leading-tight wrap-break-word w-full transition-all duration-300">
                Manipal University Jaipur
              </div>
              <div className="text-zinc-400 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed font-normal wrap-break-word w-full transition-all duration-300">
                Bachelors in Information Technology, 2024-2028.
              </div>
            </div>

            <div ref={educationImageRef} className="flex items-center justify-center shrink-0">
              <img
                className="object-cover rounded-full border border-zinc-800 shadow-xl w-56 h-56 md:w-[300px] md:h-[300px] lg:w-[350px] lg:h-[350px] xl:w-[450px] xl:h-[450px] 2xl:w-[550px] 2xl:h-[550px] transition-all duration-300"
                alt="hero"
                src="/Assets/MUJ.jpg"
                width="300"
                height="300"
                loading="lazy"
              />
            </div>
          </div>
        </section>
        {/* --- PROJECTS SECTION --- */}
        <div id="projects" className="flex items-center w-full max-w-6xl xl:max-w-7xl 2xl:max-w-[1400px] my-12 select-none transition-all duration-300">
          <span className="h-px flex-1 bg-zinc-800"></span>
          <span className="shrink-0 px-6 text-zinc-400 font-medium tracking-wider uppercase text-sm developer-font">
            Have a look at my projects...
          </span>
          <span className="h-px flex-1 bg-zinc-800"></span>
        </div>
        <section className="relative w-full flex justify-center items-center overflow-visible my-8">
          <div style={{ height: '160px', position: 'relative', width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
            <CircularGallery
              bend={3}
              textColor="#ffffff"
              borderRadius={0.05}
              scrollEase={0.02}
              fontUrl=""
              font="bold 30px Orbitron"
              scrollSpeed={2}
              items={PROJECT_ITEMS}
              onItemClick={(link) => router.push(link)}
            />
          </div>
        </section>

        {/* --- SKILLS SECTION --- */}
        <div id="skills" className="flex items-center w-full max-w-6xl xl:max-w-7xl 2xl:max-w-[1400px] my-12 select-none transition-all duration-300">
          <span className="h-px flex-1 bg-zinc-800"></span>
          <span className="shrink-0 px-6 text-zinc-400 font-medium tracking-wider uppercase text-sm developer-font">
            I am good at...
          </span>
          <span className="h-px flex-1 bg-zinc-800"></span>
        </div>
        <section>
          <div className="w-full max-w-6xl xl:max-w-7xl 2xl:max-w-[1400px] overflow-hidden relative mask-edges py-8 select-none transition-all duration-300">
            <div className="flex w-max animate-marquee whitespace-nowrap hover:[animation-play-state:paused]">
              <div className="flex gap-16 xl:gap-24 items-center shrink-0 text-[#9f9fa9] pr-16 xl:pr-24 [&>svg]:w-24 [&>svg]:h-24 [&>svg]:xl:w-32 [&>svg]:xl:h-32">
                <svg viewBox="0 0 128 128">
                  <path fill="#9f9fa9" d="M0 51.098V76.86h4.422V56.604L20.73 76.87h27.694v-4.113H30.553v-6.801h14.37v-4.113h-14.37v-6.621h17.87v-4.116H26.13v4.116h.002V76.68L5.527 51.098H0zm85.09.01v4.115h9.03v21.65h4.42v-21.65h8.847v-4.116H85.09zm-31.322.011 20.73 25.764h5.803L69.936 64.01l10.35-12.871-5.79.01-7.459 9.261-7.48-9.29h-5.79zm70.158 14.598c-.761 0-1.445.128-2.051.394-.602.263-1.078.633-1.426 1.108-.35.476-.525 1.032-.525 1.664 0 .77.258 1.384.78 1.847.517.464 1.227.809 2.124 1.036l1.24.312a7.02 7.02 0 0 1 1.026.334 1.91 1.91 0 0 1 .683.461 1.034 1.034 0 0 1 .248.697 1.25 1.25 0 0 1-.283.803 1.77 1.77 0 0 1-.76.535 3.11 3.11 0 0 1-1.132.192 3.24 3.24 0 0 1-1.116-.182 1.902 1.902 0 0 1-.804-.557 1.63 1.63 0 0 1-.352-.931h-1.941c.027.71.216 1.316.566 1.812s.836.873 1.46 1.13c.62.26 1.357.39 2.202.39.875 0 1.619-.136 2.233-.4.617-.27 1.088-.643 1.414-1.118.327-.479.488-1.028.488-1.658 0-.466-.09-.872-.266-1.217a2.726 2.726 0 0 0-.72-.887 4.227 4.227 0 0 0-1.028-.607 7.09 7.09 0 0 0-1.19-.385l-1.02-.25a6.975 6.975 0 0 1-.667-.195 2.82 2.82 0 0 1-.597-.285 1.304 1.304 0 0 1-.43-.418 1.037 1.037 0 0 1-.158-.58 1.21 1.21 0 0 1 .238-.717c.156-.21.385-.376.678-.5a2.771 2.771 0 0 1 1.056-.184c.585 0 1.062.126 1.43.383a1.424 1.424 0 0 1 .623 1.07h1.9a2.775 2.775 0 0 0-.513-1.607c-.333-.466-.792-.833-1.377-1.096-.584-.265-1.26-.394-2.033-.394zm-7.998.144v7.55c-.003.377-.062.697-.176.954a1.25 1.25 0 0 1-.506.584c-.218.133-.488.2-.803.2-.29 0-.546-.057-.771-.17a1.247 1.247 0 0 1-.522-.481 1.474 1.474 0 0 1-.195-.75h-1.963c0 .661.147 1.213.447 1.656a2.768 2.768 0 0 0 1.211 1.002 4.22 4.22 0 0 0 1.72.34c.697 0 1.311-.134 1.835-.4a2.97 2.97 0 0 0 1.236-1.149c.293-.499.444-1.093.448-1.787v-7.549h-1.961zm-53.332.059-8.844 10.982h5.805l5.937-7.38-2.898-3.602zm45.785 8.498c-.324 0-.6.112-.83.336a1.07 1.07 0 0 0-.344.807 1.082 1.082 0 0 0 .344.818c.23.225.506.336.83.336a1.105 1.105 0 0 0 .574-.156c.177-.101.318-.24.428-.416a1.115 1.115 0 0 0 .166-.582 1.097 1.097 0 0 0-.354-.807 1.133 1.133 0 0 0-.814-.336z"></path>
                </svg>
                <svg viewBox="0 0 128 128">
                  <path fill="#9f9fa9" d="m86.07 24.66a0.71 0.71 0 0 0-0.3516 0.08984 0.755 0.755 0 0 0-0.375 0.6367v18.93a0.564 0.564 0 0 1-0.2637 0.4648 0.549 0.549 0 0 1-0.5195 0l-3.066-1.773a1.486 1.486 0 0 0-1.479 0l-12.27 7.135a1.48 1.48 0 0 0-0.7539 1.279v14.24c0 0.524 0.2909 1.021 0.7539 1.283l12.27 7.135a1.486 1.486 0 0 0 1.477 0l12.27-7.135c0.463-0.262 0.7539-0.7592 0.7539-1.283v-35.5c0-0.553-0.2909-1.051-0.7539-1.311l-7.32-4.104a0.836 0.836 0 0 0-0.373-0.08984zm-72.39 17.77c-0.23 0-0.4601 0.08717-0.6621 0.2012l-12.27 7.107a1.493 1.493 0 0 0-0.7539 1.309l0.0293 19.1c0 0.263 0.143 0.5256 0.375 0.6426a0.656 0.656 0 0 0 0.7246 0l7.295-4.193a1.48 1.48 0 0 0 0.75-1.281v-8.939c0-0.524 0.2899-1.021 0.7539-1.283l3.096-1.805a1.39 1.39 0 0 1 0.752-0.2031c0.26 0 0.5216 0.05713 0.7246 0.2031l3.096 1.805c0.463 0.262 0.7539 0.7592 0.7539 1.283v8.939c0 0.522 0.288 1.021 0.75 1.281l7.236 4.193a0.704 0.704 0 0 0 0.752 0 0.724 0.724 0 0 0 0.377-0.6426v-19.1c0-0.524-0.2899-1.02-0.7539-1.283l-12.24-7.133a1.763 1.763 0 0 0-0.6641-0.2012h-0.1211zm100.7 0.207v0.001953l-0.00195 0.001953c-0.253 0-0.5043 0.06527-0.7363 0.1973l-12.27 7.131c-0.463 0.264-0.75 0.7582-0.75 1.283v14.24c0 0.524 0.287 1.02 0.75 1.281l12.18 6.988a1.43 1.43 0 0 0 1.447 0l7.381-4.133a0.724 0.724 0 0 0 0.375-0.6426 0.724 0.724 0 0 0-0.375-0.6406l-12.33-7.135a0.76 0.76 0 0 1-0.375-0.6465v-4.455a0.72 0.72 0 0 1 0.375-0.6367l3.855-2.213a0.705 0.705 0 0 1 0.752 0l3.844 2.213a0.762 0.762 0 0 1 0.377 0.6367v3.494c0 0.263 0.144 0.5246 0.375 0.6406a0.704 0.704 0 0 0 0.7539 0l7.291-4.279a1.46 1.46 0 0 0 0.7285-1.279v-3.465c0-0.524-0.2935-1.02-0.7285-1.283l-12.18-7.1a1.499 1.499 0 0 0-0.7402-0.2012h-0.00195zm-67.19 0.2344c-0.1712 0.02912-0.3392 0.08545-0.4941 0.1758l-11.87 6.893 13.15 24.26c0.0696-0.02714 0.1393-0.05957 0.2051-0.09766l12.26-7.121c0.1751-0.102 0.3237-0.237 0.4414-0.3945l-13.69-23.72zm1.283 0.3496 8.127 14.09 3.855-7.131c-0.007358-0.004457-0.01403-0.009333-0.02148-0.01367l-11.96-6.941zm-14.42 7.268c-0.2244 0.2655-0.3555 0.6048-0.3555 0.9629v14.24c0 0.1761 0.03375 0.3452 0.0918 0.5059l4.525-7.848-4.262-7.865zm27.04 0.4824-3.943 7.287 4.025 6.977v-13.78c0-0.1668-0.0298-0.3272-0.08203-0.4805zm19.69 2.303c0.065 0 0.1295 0.01492 0.1895 0.04492l4.193 2.447c0.116 0.058 0.1758 0.2014 0.1758 0.3184v4.893c0 0.146-0.06078 0.2643-0.1758 0.3223l-4.195 2.445a0.431 0.431 0 0 1-0.377 0l-4.195-2.443c-0.116-0.058-0.1758-0.2053-0.1758-0.3223v-4.893c0-0.146 0.06078-0.2613 0.1758-0.3203l4.195-2.447a0.425 0.425 0 0 1 0.1895-0.04492zm33.55 1.98a0.26 0.26 0 0 0-0.1445 0.04492l-2.346 1.369a0.3 0.3 0 0 0-0.1426 0.2598v2.74c0 0.116 0.05558 0.2037 0.1426 0.2617l2.346 1.369a0.262 0.262 0 0 0 0.2891 0l2.344-1.369a0.308 0.308 0 0 0 0.1445-0.2617v-2.738a0.303 0.303 0 0 0-0.1445-0.2598l-2.344-1.371a0.26 0.26 0 0 0-0.1445-0.04297v-0.001953zm-75.5 4.066-4.414 7.654c0.004874 0.002915 0.008757 0.006903 0.01367 0.009766l12.25 7.121c0.06838 0.03947 0.1405 0.0719 0.2129 0.09961l-8.066-14.88zm24.41 12.32c-0.427 0-0.8528 0.1007-1.215 0.3047l-11.55 6.73a2.457 2.457 0 0 0-1.215 2.125v13.42c0 0.874 0.4628 1.689 1.215 2.127l3.041 1.746c1.475 0.728 1.995 0.7227 2.66 0.7227 2.17 0 3.416-1.337 3.416-3.637v-13.24a0.356 0.356 0 0 0-0.3457-0.3516h-1.475a0.356 0.356 0 0 0-0.3516 0.3516v13.25c0 1.019-1.066 2.039-2.773 1.166l-3.156-1.834c-0.116-0.058-0.1738-0.2063-0.1738-0.3223v-13.43c0-0.116 0.05783-0.2633 0.1738-0.3203l11.54-6.695c0.087-0.058 0.2316-0.058 0.3496 0l11.54 6.695c0.115 0.06 0.1758 0.1763 0.1758 0.3203v13.42c0 0.145-0.05978 0.2643-0.1758 0.3223l-11.55 6.727c-0.087 0.058-0.2316 0.058-0.3496 0l-2.949-1.777c-0.088-0.058-0.205-0.0853-0.291-0.0293-0.81 0.468-0.9524 0.5271-1.734 0.7891-0.174 0.058-0.4628 0.1722 0.1152 0.4922l3.852 2.303c0.376 0.203 0.7798 0.3184 1.215 0.3184 0.434 0 0.8659-0.1148 1.213-0.2598l11.55-6.727a2.463 2.463 0 0 0 1.215-2.129v-13.42c0-0.874-0.4628-1.686-1.215-2.123l-11.55-6.73a2.488 2.488 0 0 0-1.213-0.3047v-0.001953zm18.03 6.129a2.236 2.236 0 0 0-2.227 2.244 2.236 2.236 0 0 0 2.227 2.242c1.217 0 2.23-1.02 2.23-2.242a2.254 2.254 0 0 0-2.23-2.242v-0.001953zm-0.0293 0.377h0.001953a1.86 1.86 0 0 1 1.883 1.867c0 1.02-0.8408 1.891-1.883 1.891-1.012 0-1.854-0.8426-1.854-1.891 0-1.048 0.8696-1.865 1.852-1.867zm-0.8105 0.6133v2.561h0.4941v-1.014h0.4375c0.174 0 0.2298 0.05812 0.2598 0.2031 0 0.03 0.08594 0.6692 0.08594 0.7852h0.5195c-0.06-0.116-0.08623-0.4679-0.1152-0.6719-0.028-0.32-0.0563-0.5511-0.4043-0.5801 0.174-0.059 0.4609-0.1453 0.4609-0.6113 0-0.67-0.5801-0.6699-0.8691-0.6699l-0.8691-0.001953zm0.4375 0.4082h0.4023c0.146 0 0.3789-3.91e-4 0.3789 0.3496 0 0.116-0.05891 0.3496-0.3789 0.3496h-0.4023v-0.6992zm-14.47 2.01c-3.3 0-5.271 1.399-5.271 3.758 0 2.534 1.968 3.229 5.123 3.549 3.79 0.38 4.08 0.9344 4.08 1.691 0 1.31-1.042 1.861-3.473 1.861-3.068 0-3.735-0.7568-3.967-2.299 0-0.176-0.1405-0.291-0.3145-0.291h-1.504a0.35 0.35 0 0 0-0.3516 0.3516c0 1.98 1.045 4.307 6.111 4.307 3.645 0 5.754-1.456 5.754-4.02 0-2.503-1.68-3.175-5.238-3.641-3.59-0.466-3.965-0.7283-3.965-1.572 0-0.699 0.3205-1.629 2.98-1.629 2.375 0 3.273 0.524 3.621 2.125a0.34 0.34 0 0 0 0.3145 0.2637h1.535c0.087 0 0.1773-0.05723 0.2363-0.1152a0.476 0.476 0 0 0 0.08594-0.2637c-0.231-2.795-2.053-4.076-5.758-4.076z"></path>
                </svg>
                <svg viewBox="0 0 128 128">
                  <path fill="#9f9fa9" d="M2 1v125h125V1H2zm66.119 106.513c-1.845 3.749-5.367 6.212-9.448 7.401-6.271 1.44-12.269.619-16.731-2.059-2.986-1.832-5.318-4.652-6.901-7.901l9.52-5.83c.083.035.333.487.667 1.071 1.214 2.034 2.261 3.474 4.319 4.485 2.022.69 6.461 1.131 8.175-2.427 1.047-1.81.714-7.628.714-14.065C58.433 78.073 58.48 68 58.48 58h11.709c0 11 .06 21.418 0 32.152.025 6.58.596 12.446-2.07 17.361zm48.574-3.308c-4.07 13.922-26.762 14.374-35.83 5.176-1.916-2.165-3.117-3.296-4.26-5.795 4.819-2.772 4.819-2.772 9.508-5.485 2.547 3.915 4.902 6.068 9.139 6.949 5.748.702 11.531-1.273 10.234-7.378-1.333-4.986-11.77-6.199-18.873-11.531-7.211-4.843-8.901-16.611-2.975-23.335 1.975-2.487 5.343-4.343 8.877-5.235l3.688-.477c7.081-.143 11.507 1.727 14.756 5.355.904.916 1.642 1.904 3.022 4.045-3.772 2.404-3.76 2.381-9.163 5.879-1.154-2.486-3.069-4.046-5.093-4.724-3.142-.952-7.104.083-7.926 3.403-.285 1.023-.226 1.975.227 3.665 1.273 2.903 5.545 4.165 9.377 5.926 11.031 4.474 14.756 9.271 15.672 14.981.882 4.916-.213 8.105-.38 8.581z"></path>
                </svg>
                <svg viewBox="0 0 128 128">
                  <path fill="#9f9fa9" d="M13.227 56.074c-3.528 0-5.727 1.778-6.602 5.3C7.95 59.603 9.5 58.95 11.25 59.399c1 .25 1.728.977 2.524 1.801 1.3 1.324 2.8 2.852 6.078 2.852 3.523 0 5.723-1.778 6.598-5.301-1.324 1.773-2.875 2.425-4.625 1.976-1-.25-1.723-.976-2.524-1.8-1.3-1.324-2.801-2.852-6.074-2.852zm43.922.477v13.574h2V56.55h-2zm-3.324.324c-.7 0-1.274.574-1.274 1.273 0 .676.575 1.277 1.274 1.277.699 0 1.3-.6 1.277-1.277 0-.699-.577-1.273-1.277-1.273zm23 0c-.7 0-1.274.574-1.274 1.273 0 .677.575 1.277 1.274 1.277.727 0 1.3-.6 1.277-1.277 0-.699-.577-1.273-1.277-1.273zm21.352.226v5.024c-.7-.977-1.801-1.574-3.25-1.574-2.528 0-4.625 2.125-4.625 4.898 0 2.75 2.097 4.902 4.625 4.902 1.449 0 2.55-.6 3.25-1.578v1.352h2V57.102h-2zm-60.824.625-2 .598v2.5H33.65v1.926h1.703v4.476c0 2.421 1.224 3.274 4.324 2.899v-1.801c-1.527.074-2.3.101-2.3-1.098V62.75h2.273v-1.926h-2.297v-3.098zm7.875 2.825c-2.528 0-4.625 2.125-4.625 4.898 0 2.75 2.098 4.902 4.625 4.902 1.45 0 2.547-.6 3.25-1.578v1.352h2v-9.301h-2v1.3c-.704-.976-1.801-1.573-3.25-1.573zm39.824.023c-1.25 0-2.25.477-2.875 1.477v-1.2h-2v9.297h2v-5c0-1.898 1.05-2.672 2.375-2.672 1.25 0 2.074.723 2.074 2.149v5.5h2v-5.727c0-2.398-1.5-3.824-3.574-3.824zm21.848 0c-2.824 0-4.922 2.124-4.922 4.902 0 2.75 2.126 4.899 4.922 4.899 1.829 0 3.426-.95 4.176-2.426l-1.723-.973c-.454.847-1.352 1.422-2.477 1.422-1.625 0-2.875-1.25-2.875-2.922 0-1.676 1.227-2.926 2.875-2.926 1.125 0 2.051.551 2.45 1.426l1.726-1c-.75-1.453-2.323-2.402-4.152-2.402zm8.875.027c-1.898 0-3.399 1.098-3.399 2.848 0 3.323 5 2.403 5 4.05 0 .75-.676 1.052-1.574 1.052-1.028 0-1.778-.5-2.074-1.352l-1.727 1c.601 1.324 1.95 2.176 3.801 2.176 2 0 3.625-1.023 3.625-2.875 0-3.45-5-2.425-5-4.125 0-.65.626-.977 1.348-.95.778 0 1.426.324 1.75 1.051l1.703-.953c-.653-1.222-1.925-1.922-3.453-1.922zm8.578 0c-1.903 0-3.402 1.098-3.402 2.848 0 3.323 5 2.403 5 4.05 0 .75-.677 1.052-1.575 1.052-1.024 0-1.774-.5-2.074-1.352l-1.726 1c.6 1.324 1.948 2.176 3.8 2.176 2 0 3.625-1.023 3.625-2.875 0-3.45-5-2.425-5-4.125 0-.65.626-.977 1.352-.95.774 0 1.422.324 1.75 1.051l1.7-.953c-.654-1.222-1.927-1.922-3.45-1.922zm-71.527.223v9.3h2v-9.3h-2zm7.852 0 2.925 9.3h1.973l1.95-6.273 1.925 6.274h1.977l2.925-9.301h-2.125l-1.83 6.426-1.92-6.426h-1.925L64.6 67.25l-1.798-6.426h-2.125zm15.148 0v9.3h2v-9.3h-2zM45.525 62.5c1.676 0 2.953 1.25 2.953 2.976 0 1.722-1.277 2.973-2.953 2.973-1.672 0-2.922-1.25-2.95-2.973 0-1.727 1.279-2.976 2.95-2.976zm49.703 0c1.672 0 2.949 1.25 2.949 2.976 0 1.722-1.277 2.973-2.95 2.973-1.675 0-2.953-1.25-2.953-2.973 0-1.727 1.278-2.976 2.953-2.976zM6.603 64C3.075 64 .876 65.774 0 69.3c1.324-1.776 2.875-2.425 4.625-1.976 1 .25 1.727.977 2.523 1.8 1.301 1.325 2.8 2.852 6.078 2.852 3.523 0 5.723-1.777 6.598-5.3-1.324 1.773-2.875 2.426-4.625 1.972-1-.25-1.722-.973-2.523-1.797C11.399 65.522 9.899 64 6.603 64z"></path>
                </svg>
                <svg viewBox="0 0 128 128">
                  <path fill="#9f9fa9" d="M19.569 27l8.087 89.919 36.289 9.682 36.39-9.499L108.431 27H19.569zM91.61 47.471l-.507 5.834L90.88 56H48.311l1.017 12h40.54l-.271 2.231-2.615 28.909-.192 1.69L64 106.964v-.005l-.027.012-22.777-5.916L39.65 84h11.168l.791 8.46 12.385 3.139.006-.234v.012l12.412-2.649L77.708 79H39.153l-2.734-30.836L36.152 45h55.724l-.266 2.471zM27.956 1.627h5.622v5.556h5.144V1.627h5.623v16.822h-5.623v-5.633h-5.143v5.633h-5.623V1.627zm23.782 5.579h-4.95V1.627h15.525v5.579h-4.952v11.243h-5.623V7.206zm13.039-5.579h5.862l3.607 5.911 3.603-5.911h5.865v16.822h-5.601v-8.338l-3.867 5.981h-.098l-3.87-5.981v8.338h-5.502V1.627zm21.736 0h5.624v11.262h7.907v5.561H86.513V1.627z"></path>
                </svg>
                <svg viewBox="0 0 128 128">
                  <path fill="#9f9fa9" d="M53.595 67.817c-13.224 3.694 8.044 11.325 24.88 4.112-2.757-1.071-4.735-2.309-4.735-2.309-7.508 1.419-10.99 1.531-17.805.753-5.625-.644-2.34-2.556-2.34-2.556zm22.864-7.207c-9.95 1.915-15.698 1.854-22.979 1.103-5.629-.582-1.944-3.311-1.944-3.311-14.563 4.834 8.106 10.318 28.459 4.365-2.162-.761-3.536-2.157-3.536-2.157zm7.799-41.731s-29.439 7.351-15.38 23.552c4.151 4.778-1.088 9.074-1.088 9.074s10.533-5.437 5.696-12.248c-4.518-6.349-7.982-9.502 10.772-20.378zM37.48 81.305c34.324 5.563 62.567-2.506 53.666-6.523 0 0 2.431 2.005-2.679 3.555-9.715 2.943-40.444 3.831-48.979.117-3.066-1.335 2.687-3.187 4.496-3.576 1.887-.409 2.965-.334 2.965-.334-3.412-2.404-22.055 4.718-9.469 6.761zm41.868-27.42c1.65-1.126 3.93-2.104 3.93-2.104s-6.492 1.161-12.961 1.704c-7.918.664-16.412.795-20.676.225-10.095-1.35 5.534-5.063 5.534-5.063s-6.07-.411-13.533 3.199c-8.827 4.269 21.832 6.214 37.706 2.039zm3.865 10.432c-.074.2-.322.425-.322.425 21.546-5.664 13.624-19.965 3.322-16.345-.903.319-1.378 1.063-1.378 1.063s.571-.23 1.845-.496c5.207-1.084 12.669 6.972-3.467 15.353zM65.006 48.492c-3.179-7.186-13.957-13.471.005-24.498 17.41-13.742 8.476-22.682 8.476-22.682 3.604 14.197-12.711 18.486-18.6 27.328-4.01 6.024 1.969 12.499 10.119 19.852zm18.79 35.651c-13.219 2.488-29.524 2.199-39.191.603 0 0 1.98 1.64 12.157 2.294 15.484.99 39.269-.551 39.832-7.878 0-.001-1.082 2.776-12.798 4.981zM51.131 99.535c-2.887 0-5.351.714-7.408 1.622l.624 2.493c1.619-.595 3.618-1.147 5.674-1.147 2.85 0 3.979 1.147 3.979 3.521V108h-1.2c-6.921 0-10.044 2.585-10.044 6.624 0 3.479 2.059 5.407 5.933 5.407 2.49 0 4.351-.845 6.088-2.35l.316 2.319H58v-14.492c0-3.599-1.924-5.973-6.869-5.973zM54 115.037c-1 1.266-2.893 1.978-4.279 1.978-1.973 0-2.988-1.371-2.988-3.27 0-2.056 1.202-3.745 5.794-3.745H54v5.037zm15.611.644l-.835-3.608L65.02 100h-4.39l6.051 20h5.026c2.884-7 4.943-14 6.086-20h-4.271c-.671 5-2.016 10.424-3.911 15.681zm18.404-16.146c-2.889 0-5.411.714-7.467 1.622l.596 2.493c1.621-.595 3.722-1.147 5.778-1.147 2.846 0 4.078 1.147 4.078 3.521V108h-1.428c-6.923 0-10.045 2.585-10.045 6.624 0 3.479 2.056 5.407 5.93 5.407 2.492 0 4.349-.845 6.091-2.35l.318 2.319H95v-14.492c0-3.599-2.044-5.973-6.985-5.973zm-1.411 17.462c-1.975 0-3.046-1.363-3.046-3.261 0-2.055 1.149-3.736 5.736-3.736H91v5h-.067c-1.465 1-2.947 1.997-4.329 1.997zM36 115.373c0 3.271-.445 4.638-.979 5.701-.615 1.193-2.053 2.475-3.601 3.269l1.934 2.345c2.032-.749 3.943-2.078 5.092-3.757 1.15-1.723 1.554-3.491 1.554-7.867V93h-4v22.373z"></path>
                </svg>
              </div>
              <div className="flex gap-16 xl:gap-24 items-center shrink-0 text-[#9f9fa9] pr-16 xl:pr-24 [&>svg]:w-24 [&>svg]:h-24 [&>svg]:xl:w-32 [&>svg]:xl:h-32">
                <svg viewBox="0 0 128 128">
                  <path fill="#9f9fa9" d="M0 51.098V76.86h4.422V56.604L20.73 76.87h27.694v-4.113H30.553v-6.801h14.37v-4.113h-14.37v-6.621h17.87v-4.116H26.13v4.116h.002V76.68L5.527 51.098H0zm85.09.01v4.115h9.03v21.65h4.42v-21.65h8.847v-4.116H85.09zm-31.322.011 20.73 25.764h5.803L69.936 64.01l10.35-12.871-5.79.01-7.459 9.261-7.48-9.29h-5.79zm70.158 14.598c-.761 0-1.445.128-2.051.394-.602.263-1.078.633-1.426 1.108-.35.476-.525 1.032-.525 1.664 0 .77.258 1.384.78 1.847.517.464 1.227.809 2.124 1.036l1.24.312a7.02 7.02 0 0 1 1.026.334 1.91 1.91 0 0 1 .683.461 1.034 1.034 0 0 1 .248.697 1.25 1.25 0 0 1-.283.803 1.77 1.77 0 0 1-.76.535 3.11 3.11 0 0 1-1.132.192 3.24 3.24 0 0 1-1.116-.182 1.902 1.902 0 0 1-.804-.557 1.63 1.63 0 0 1-.352-.931h-1.941c.027.71.216 1.316.566 1.812s.836.873 1.46 1.13c.62.26 1.357.39 2.202.39.875 0 1.619-.136 2.233-.4.617-.27 1.088-.643 1.414-1.118.327-.479.488-1.028.488-1.658 0-.466-.09-.872-.266-1.217a2.726 2.726 0 0 0-.72-.887 4.227 4.227 0 0 0-1.028-.607 7.09 7.09 0 0 0-1.19-.385l-1.02-.25a6.975 6.975 0 0 1-.667-.195 2.82 2.82 0 0 1-.597-.285 1.304 1.304 0 0 1-.43-.418 1.037 1.037 0 0 1-.158-.58 1.21 1.21 0 0 1 .238-.717c.156-.21.385-.376.678-.5a2.771 2.771 0 0 1 1.056-.184c.585 0 1.062.126 1.43.383a1.424 1.424 0 0 1 .623 1.07h1.9a2.775 2.775 0 0 0-.513-1.607c-.333-.466-.792-.833-1.377-1.096-.584-.265-1.26-.394-2.033-.394zm-7.998.144v7.55c-.003.377-.062.697-.176.954a1.25 1.25 0 0 1-.506.584c-.218.133-.488.2-.803.2-.29 0-.546-.057-.771-.17a1.247 1.247 0 0 1-.522-.481 1.474 1.474 0 0 1-.195-.75h-1.963c0 .661.147 1.213.447 1.656a2.768 2.768 0 0 0 1.211 1.002 4.22 4.22 0 0 0 1.72.34c.697 0 1.311-.134 1.835-.4a2.97 2.97 0 0 0 1.236-1.149c.293-.499.444-1.093.448-1.787v-7.549h-1.961zm-53.332.059-8.844 10.982h5.805l5.937-7.38-2.898-3.602zm45.785 8.498c-.324 0-.6.112-.83.336a1.07 1.07 0 0 0-.344.807 1.082 1.082 0 0 0 .344.818c.23.225.506.336.83.336a1.105 1.105 0 0 0 .574-.156c.177-.101.318-.24.428-.416a1.115 1.115 0 0 0 .166-.582 1.097 1.097 0 0 0-.354-.807 1.133 1.133 0 0 0-.814-.336z"></path>
                </svg>
                <svg viewBox="0 0 128 128">
                  <path fill="#9f9fa9" d="m86.07 24.66a0.71 0.71 0 0 0-0.3516 0.08984 0.755 0.755 0 0 0-0.375 0.6367v18.93a0.564 0.564 0 0 1-0.2637 0.4648 0.549 0.549 0 0 1-0.5195 0l-3.066-1.773a1.486 1.486 0 0 0-1.479 0l-12.27 7.135a1.48 1.48 0 0 0-0.7539 1.279v14.24c0 0.524 0.2909 1.021 0.7539 1.283l12.27 7.135a1.486 1.486 0 0 0 1.477 0l12.27-7.135c0.463-0.262 0.7539-0.7592 0.7539-1.283v-35.5c0-0.553-0.2909-1.051-0.7539-1.311l-7.32-4.104a0.836 0.836 0 0 0-0.373-0.08984zm-72.39 17.77c-0.23 0-0.4601 0.08717-0.6621 0.2012l-12.27 7.107a1.493 1.493 0 0 0-0.7539 1.309l0.0293 19.1c0 0.263 0.143 0.5256 0.375 0.6426a0.656 0.656 0 0 0 0.7246 0l7.295-4.193a1.48 1.48 0 0 0 0.75-1.281v-8.939c0-0.524 0.2899-1.021 0.7539-1.283l3.096-1.805a1.39 1.39 0 0 1 0.752-0.2031c0.26 0 0.5216 0.05713 0.7246 0.2031l3.096 1.805c0.463 0.262 0.7539 0.7592 0.7539 1.283v8.939c0 0.522 0.288 1.021 0.75 1.281l7.236 4.193a0.704 0.704 0 0 0 0.752 0 0.724 0.724 0 0 0 0.377-0.6426v-19.1c0-0.524-0.2899-1.02-0.7539-1.283l-12.24-7.133a1.763 1.763 0 0 0-0.6641-0.2012h-0.1211zm100.7 0.207v0.001953l-0.00195 0.001953c-0.253 0-0.5043 0.06527-0.7363 0.1973l-12.27 7.131c-0.463 0.264-0.75 0.7582-0.75 1.283v14.24c0 0.524 0.287 1.02 0.75 1.281l12.18 6.988a1.43 1.43 0 0 0 1.447 0l7.381-4.133a0.724 0.724 0 0 0 0.375-0.6426 0.724 0.724 0 0 0-0.375-0.6406l-12.33-7.135a0.76 0.76 0 0 1-0.375-0.6465v-4.455a0.72 0.72 0 0 1 0.375-0.6367l3.855-2.213a0.705 0.705 0 0 1 0.752 0l3.844 2.213a0.762 0.762 0 0 1 0.377 0.6367v3.494c0 0.263 0.144 0.5246 0.375 0.6406a0.704 0.704 0 0 0 0.7539 0l7.291-4.279a1.46 1.46 0 0 0 0.7285-1.279v-3.465c0-0.524-0.2935-1.02-0.7285-1.283l-12.18-7.1a1.499 1.499 0 0 0-0.7402-0.2012h-0.00195zm-67.19 0.2344c-0.1712 0.02912-0.3392 0.08545-0.4941 0.1758l-11.87 6.893 13.15 24.26c0.0696-0.02714 0.1393-0.05957 0.2051-0.09766l12.26-7.121c0.1751-0.102 0.3237-0.237 0.4414-0.3945l-13.69-23.72zm1.283 0.3496 8.127 14.09 3.855-7.131c-0.007358-0.004457-0.01403-0.009333-0.02148-0.01367l-11.96-6.941zm-14.42 7.268c-0.2244 0.2655-0.3555 0.6048-0.3555 0.9629v14.24c0 0.1761 0.03375 0.3452 0.0918 0.5059l4.525-7.848-4.262-7.865zm27.04 0.4824-3.943 7.287 4.025 6.977v-13.78c0-0.1668-0.0298-0.3272-0.08203-0.4805zm19.69 2.303c0.065 0 0.1295 0.01492 0.1895 0.04492l4.193 2.447c0.116 0.058 0.1758 0.2014 0.1758 0.3184v4.893c0 0.146-0.06078 0.2643-0.1758 0.3223l-4.195 2.445a0.431 0.431 0 0 1-0.377 0l-4.195-2.443c-0.116-0.058-0.1758-0.2053-0.1758-0.3223v-4.893c0-0.146 0.06078-0.2613 0.1758-0.3203l4.195-2.447a0.425 0.425 0 0 1 0.1895-0.04492zm33.55 1.98a0.26 0.26 0 0 0-0.1445 0.04492l-2.346 1.369a0.3 0.3 0 0 0-0.1426 0.2598v2.74c0 0.116 0.05558 0.2037 0.1426 0.2617l2.346 1.369a0.262 0.262 0 0 0 0.2891 0l2.344-1.369a0.308 0.308 0 0 0 0.1445-0.2617v-2.738a0.303 0.303 0 0 0-0.1445-0.2598l-2.344-1.371a0.26 0.26 0 0 0-0.1445-0.04297v-0.001953zm-75.5 4.066-4.414 7.654c0.004874 0.002915 0.008757 0.006903 0.01367 0.009766l12.25 7.121c0.06838 0.03947 0.1405 0.0719 0.2129 0.09961l-8.066-14.88zm24.41 12.32c-0.427 0-0.8528 0.1007-1.215 0.3047l-11.55 6.73a2.457 2.457 0 0 0-1.215 2.125v13.42c0 0.874 0.4628 1.689 1.215 2.127l3.041 1.746c1.475 0.728 1.995 0.7227 2.66 0.7227 2.17 0 3.416-1.337 3.416-3.637v-13.24a0.356 0.356 0 0 0-0.3457-0.3516h-1.475a0.356 0.356 0 0 0-0.3516 0.3516v13.25c0 1.019-1.066 2.039-2.773 1.166l-3.156-1.834c-0.116-0.058-0.1738-0.2063-0.1738-0.3223v-13.43c0-0.116 0.05783-0.2633 0.1738-0.3203l11.54-6.695c0.087-0.058 0.2316-0.058 0.3496 0l11.54 6.695c0.115 0.06 0.1758 0.1763 0.1758 0.3203v13.42c0 0.145-0.05978 0.2643-0.1758 0.3223l-11.55 6.727c-0.087 0.058-0.2316 0.058-0.3496 0l-2.949-1.777c-0.088-0.058-0.205-0.0853-0.291-0.0293-0.81 0.468-0.9524 0.5271-1.734 0.7891-0.174 0.058-0.4628 0.1722 0.1152 0.4922l3.852 2.303c0.376 0.203 0.7798 0.3184 1.215 0.3184 0.434 0 0.8659-0.1148 1.213-0.2598l11.55-6.727a2.463 2.463 0 0 0 1.215-2.129v-13.42c0-0.874-0.4628-1.686-1.215-2.123l-11.55-6.73a2.488 2.488 0 0 0-1.213-0.3047v-0.001953zm18.03 6.129a2.236 2.236 0 0 0-2.227 2.244 2.236 2.236 0 0 0 2.227 2.242c1.217 0 2.23-1.02 2.23-2.242a2.254 2.254 0 0 0-2.23-2.242v-0.001953zm-0.0293 0.377h0.001953a1.86 1.86 0 0 1 1.883 1.867c0 1.02-0.8408 1.891-1.883 1.891-1.012 0-1.854-0.8426-1.854-1.891 0-1.048 0.8696-1.865 1.852-1.867zm-0.8105 0.6133v2.561h0.4941v-1.014h0.4375c0.174 0 0.2298 0.05812 0.2598 0.2031 0 0.03 0.08594 0.6692 0.08594 0.7852h0.5195c-0.06-0.116-0.08623-0.4679-0.1152-0.6719-0.028-0.32-0.0563-0.5511-0.4043-0.5801 0.174-0.059 0.4609-0.1453 0.4609-0.6113 0-0.67-0.5801-0.6699-0.8691-0.6699l-0.8691-0.001953zm0.4375 0.4082h0.4023c0.146 0 0.3789-3.91e-4 0.3789 0.3496 0 0.116-0.05891 0.3496-0.3789 0.3496h-0.4023v-0.6992zm-14.47 2.01c-3.3 0-5.271 1.399-5.271 3.758 0 2.534 1.968 3.229 5.123 3.549 3.79 0.38 4.08 0.9344 4.08 1.691 0 1.31-1.042 1.861-3.473 1.861-3.068 0-3.735-0.7568-3.967-2.299 0-0.176-0.1405-0.291-0.3145-0.291h-1.504a0.35 0.35 0 0 0-0.3516 0.3516c0 1.98 1.045 4.307 6.111 4.307 3.645 0 5.754-1.456 5.754-4.02 0-2.503-1.68-3.175-5.238-3.641-3.59-0.466-3.965-0.7283-3.965-1.572 0-0.699 0.3205-1.629 2.98-1.629 2.375 0 3.273 0.524 3.621 2.125a0.34 0.34 0 0 0 0.3145 0.2637h1.535c0.087 0 0.1773-0.05723 0.2363-0.1152a0.476 0.476 0 0 0 0.08594-0.2637c-0.231-2.795-2.053-4.076-5.758-4.076z"></path>
                </svg>
                <svg viewBox="0 0 128 128">
                  <path fill="#9f9fa9" d="M2 1v125h125V1H2zm66.119 106.513c-1.845 3.749-5.367 6.212-9.448 7.401-6.271 1.44-12.269.619-16.731-2.059-2.986-1.832-5.318-4.652-6.901-7.901l9.52-5.83c.083.035.333.487.667 1.071 1.214 2.034 2.261 3.474 4.319 4.485 2.022.69 6.461 1.131 8.175-2.427 1.047-1.81.714-7.628.714-14.065C58.433 78.073 58.48 68 58.48 58h11.709c0 11 .06 21.418 0 32.152.025 6.58.596 12.446-2.07 17.361zm48.574-3.308c-4.07 13.922-26.762 14.374-35.83 5.176-1.916-2.165-3.117-3.296-4.26-5.795 4.819-2.772 4.819-2.772 9.508-5.485 2.547 3.915 4.902 6.068 9.139 6.949 5.748.702 11.531-1.273 10.234-7.378-1.333-4.986-11.77-6.199-18.873-11.531-7.211-4.843-8.901-16.611-2.975-23.335 1.975-2.487 5.343-4.343 8.877-5.235l3.688-.477c7.081-.143 11.507 1.727 14.756 5.355.904.916 1.642 1.904 3.022 4.045-3.772 2.404-3.76 2.381-9.163 5.879-1.154-2.486-3.069-4.046-5.093-4.724-3.142-.952-7.104.083-7.926 3.403-.285 1.023-.226 1.975.227 3.665 1.273 2.903 5.545 4.165 9.377 5.926 11.031 4.474 14.756 9.271 15.672 14.981.882 4.916-.213 8.105-.38 8.581z"></path>
                </svg>
                <svg viewBox="0 0 128 128">
                  <path fill="#9f9fa9" d="M13.227 56.074c-3.528 0-5.727 1.778-6.602 5.3C7.95 59.603 9.5 58.95 11.25 59.399c1 .25 1.728.977 2.524 1.801 1.3 1.324 2.8 2.852 6.078 2.852 3.523 0 5.723-1.778 6.598-5.301-1.324 1.773-2.875 2.425-4.625 1.976-1-.25-1.723-.976-2.524-1.8-1.3-1.324-2.801-2.852-6.074-2.852zm43.922.477v13.574h2V56.55h-2zm-3.324.324c-.7 0-1.274.574-1.274 1.273 0 .676.575 1.277 1.274 1.277.699 0 1.3-.6 1.277-1.277 0-.699-.577-1.273-1.277-1.273zm23 0c-.7 0-1.274.574-1.274 1.273 0 .677.575 1.277 1.274 1.277.727 0 1.3-.6 1.277-1.277 0-.699-.577-1.273-1.277-1.273zm21.352.226v5.024c-.7-.977-1.801-1.574-3.25-1.574-2.528 0-4.625 2.125-4.625 4.898 0 2.75 2.097 4.902 4.625 4.902 1.449 0 2.55-.6 3.25-1.578v1.352h2V57.102h-2zm-60.824.625-2 .598v2.5H33.65v1.926h1.703v4.476c0 2.421 1.224 3.274 4.324 2.899v-1.801c-1.527.074-2.3.101-2.3-1.098V62.75h2.273v-1.926h-2.297v-3.098zm7.875 2.825c-2.528 0-4.625 2.125-4.625 4.898 0 2.75 2.098 4.902 4.625 4.902 1.45 0 2.547-.6 3.25-1.578v1.352h2v-9.301h-2v1.3c-.704-.976-1.801-1.573-3.25-1.573zm39.824.023c-1.25 0-2.25.477-2.875 1.477v-1.2h-2v9.297h2v-5c0-1.898 1.05-2.672 2.375-2.672 1.25 0 2.074.723 2.074 2.149v5.5h2v-5.727c0-2.398-1.5-3.824-3.574-3.824zm21.848 0c-2.824 0-4.922 2.124-4.922 4.902 0 2.75 2.126 4.899 4.922 4.899 1.829 0 3.426-.95 4.176-2.426l-1.723-.973c-.454.847-1.352 1.422-2.477 1.422-1.625 0-2.875-1.25-2.875-2.922 0-1.676 1.227-2.926 2.875-2.926 1.125 0 2.051.551 2.45 1.426l1.726-1c-.75-1.453-2.323-2.402-4.152-2.402zm8.875.027c-1.898 0-3.399 1.098-3.399 2.848 0 3.323 5 2.403 5 4.05 0 .75-.676 1.052-1.574 1.052-1.028 0-1.778-.5-2.074-1.352l-1.727 1c.601 1.324 1.95 2.176 3.801 2.176 2 0 3.625-1.023 3.625-2.875 0-3.45-5-2.425-5-4.125 0-.65.626-.977 1.348-.95.778 0 1.426.324 1.75 1.051l1.703-.953c-.653-1.222-1.925-1.922-3.453-1.922zm8.578 0c-1.903 0-3.402 1.098-3.402 2.848 0 3.323 5 2.403 5 4.05 0 .75-.677 1.052-1.575 1.052-1.024 0-1.774-.5-2.074-1.352l-1.726 1c.6 1.324 1.948 2.176 3.8 2.176 2 0 3.625-1.023 3.625-2.875 0-3.45-5-2.425-5-4.125 0-.65.626-.977 1.352-.95.774 0 1.422.324 1.75 1.051l1.7-.953c-.654-1.222-1.927-1.922-3.45-1.922zm-71.527.223v9.3h2v-9.3h-2zm7.852 0 2.925 9.3h1.973l1.95-6.273 1.925 6.274h1.977l2.925-9.301h-2.125l-1.83 6.426-1.92-6.426h-1.925L64.6 67.25l-1.798-6.426h-2.125zm15.148 0v9.3h2v-9.3h-2zM45.525 62.5c1.676 0 2.953 1.25 2.953 2.976 0 1.722-1.277 2.973-2.953 2.973-1.672 0-2.922-1.25-2.95-2.973 0-1.727 1.279-2.976 2.95-2.976zm49.703 0c1.672 0 2.949 1.25 2.949 2.976 0 1.722-1.277 2.973-2.95 2.973-1.675 0-2.953-1.25-2.953-2.973 0-1.727 1.278-2.976 2.953-2.976zM6.603 64C3.075 64 .876 65.774 0 69.3c1.324-1.776 2.875-2.425 4.625-1.976 1 .25 1.727.977 2.523 1.8 1.301 1.325 2.8 2.852 6.078 2.852 3.523 0 5.723-1.777 6.598-5.3-1.324 1.773-2.875 2.426-4.625 1.972-1-.25-1.722-.973-2.523-1.797C11.399 65.522 9.899 64 6.603 64z"></path>
                </svg>
                <svg viewBox="0 0 128 128">
                  <path fill="#9f9fa9" d="M19.569 27l8.087 89.919 36.289 9.682 36.39-9.499L108.431 27H19.569zM91.61 47.471l-.507 5.834L90.88 56H48.311l1.017 12h40.54l-.271 2.231-2.615 28.909-.192 1.69L64 106.964v-.005l-.027.012-22.777-5.916L39.65 84h11.168l.791 8.46 12.385 3.139.006-.234v.012l12.412-2.649L77.708 79H39.153l-2.734-30.836L36.152 45h55.724l-.266 2.471zM27.956 1.627h5.622v5.556h5.144V1.627h5.623v16.822h-5.623v-5.633h-5.143v5.633h-5.623V1.627zm23.782 5.579h-4.95V1.627h15.525v5.579h-4.952v11.243h-5.623V7.206zm13.039-5.579h5.862l3.607 5.911 3.603-5.911h5.865v16.822h-5.601v-8.338l-3.867 5.981h-.098l-3.87-5.981v8.338h-5.502V1.627zm21.736 0h5.624v11.262h7.907v5.561H86.513V1.627z"></path>
                </svg>
                <svg viewBox="0 0 128 128">
                  <path fill="#9f9fa9" d="M53.595 67.817c-13.224 3.694 8.044 11.325 24.88 4.112-2.757-1.071-4.735-2.309-4.735-2.309-7.508 1.419-10.99 1.531-17.805.753-5.625-.644-2.34-2.556-2.34-2.556zm22.864-7.207c-9.95 1.915-15.698 1.854-22.979 1.103-5.629-.582-1.944-3.311-1.944-3.311-14.563 4.834 8.106 10.318 28.459 4.365-2.162-.761-3.536-2.157-3.536-2.157zm7.799-41.731s-29.439 7.351-15.38 23.552c4.151 4.778-1.088 9.074-1.088 9.074s10.533-5.437 5.696-12.248c-4.518-6.349-7.982-9.502 10.772-20.378zM37.48 81.305c34.324 5.563 62.567-2.506 53.666-6.523 0 0 2.431 2.005-2.679 3.555-9.715 2.943-40.444 3.831-48.979.117-3.066-1.335 2.687-3.187 4.496-3.576 1.887-.409 2.965-.334 2.965-.334-3.412-2.404-22.055 4.718-9.469 6.761zm41.868-27.42c1.65-1.126 3.93-2.104 3.93-2.104s-6.492 1.161-12.961 1.704c-7.918.664-16.412.795-20.676.225-10.095-1.35 5.534-5.063 5.534-5.063s-6.07-.411-13.533 3.199c-8.827 4.269 21.832 6.214 37.706 2.039zm3.865 10.432c-.074.2-.322.425-.322.425 21.546-5.664 13.624-19.965 3.322-16.345-.903.319-1.378 1.063-1.378 1.063s.571-.23 1.845-.496c5.207-1.084 12.669 6.972-3.467 15.353zM65.006 48.492c-3.179-7.186-13.957-13.471.005-24.498 17.41-13.742 8.476-22.682 8.476-22.682 3.604 14.197-12.711 18.486-18.6 27.328-4.01 6.024 1.969 12.499 10.119 19.852zm18.79 35.651c-13.219 2.488-29.524 2.199-39.191.603 0 0 1.98 1.64 12.157 2.294 15.484.99 39.269-.551 39.832-7.878 0-.001-1.082 2.776-12.798 4.981zM51.131 99.535c-2.887 0-5.351.714-7.408 1.622l.624 2.493c1.619-.595 3.618-1.147 5.674-1.147 2.85 0 3.979 1.147 3.979 3.521V108h-1.2c-6.921 0-10.044 2.585-10.044 6.624 0 3.479 2.059 5.407 5.933 5.407 2.49 0 4.351-.845 6.088-2.35l.316 2.319H58v-14.492c0-3.599-1.924-5.973-6.869-5.973zM54 115.037c-1 1.266-2.893 1.978-4.279 1.978-1.973 0-2.988-1.371-2.988-3.27 0-2.056 1.202-3.745 5.794-3.745H54v5.037zm15.611.644l-.835-3.608L65.02 100h-4.39l6.051 20h5.026c2.884-7 4.943-14 6.086-20h-4.271c-.671 5-2.016 10.424-3.911 15.681zm18.404-16.146c-2.889 0-5.411.714-7.467 1.622l.596 2.493c1.621-.595 3.722-1.147 5.778-1.147 2.846 0 4.078 1.147 4.078 3.521V108h-1.428c-6.923 0-10.045 2.585-10.045 6.624 0 3.479 2.056 5.407 5.93 5.407 2.492 0 4.349-.845 6.091-2.35l.318 2.319H95v-14.492c0-3.599-2.044-5.973-6.985-5.973zm-1.411 17.462c-1.975 0-3.046-1.363-3.046-3.261 0-2.055 1.149-3.736 5.736-3.736H91v5h-.067c-1.465 1-2.947 1.997-4.329 1.997zM36 115.373c0 3.271-.445 4.638-.979 5.701-.615 1.193-2.053 2.475-3.601 3.269l1.934 2.345c2.032-.749 3.943-2.078 5.092-3.757 1.15-1.723 1.554-3.491 1.554-7.867V93h-4v22.373z"></path>
                </svg>
              </div>
            </div>
          </div>
        </section >


        {/* --- CONTACT SECTION --- */}
        <div id="contact" className="flex items-center w-full max-w-6xl my-12 select-none">
          <span className="h-px flex-1 bg-zinc-800"></span>
          <span className="shrink-0 px-6 text-zinc-400 font-medium tracking-wider uppercase text-sm developer-font">
            Let's get in touch...
          </span>
          <span className="h-px flex-1 bg-zinc-800"></span>
        </div>
        <section>
          <div className="py-12 px-6 md:px-4 mx-auto max-w-5xl">
            <h2 className="mb-4 text-3xl md:text-4xl tracking-tight font-extrabold text-center text-white">Have Something For Me?</h2>
            <p className="mb-12 font-light text-center text-zinc-400 sm:text-xl max-w-2xl mx-auto">Feel free to reach out if you have any questions, feedback, or opportunities!</p>

            <div className="mx-auto max-w-3xl">
              <form onSubmit={handleFormSubmit} autoComplete="off" className="space-y-8">
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
                  <input
                    type="email"
                    id="email"
                    autoComplete="off"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                    placeholder="name@zohomail.in"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    autoComplete="off"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                    placeholder="Let me know what you have"
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your message</label>
                  <textarea
                    id="message"
                    rows="6"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Leave a comment..."
                    required
                  ></textarea>
                </div>
                <div className="flex flex-col items-center gap-4">
                  <button
                    type="submit"
                    title="Send Message"
                    disabled={submitStatus === 'loading'}
                    className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 sm:w-fit cursor-pointer"
                  >
                    {submitStatus === 'loading' ? 'Sending...' : 'Send message'}
                  </button>

                  {submitStatus === 'success' && (
                    <p className="text-green-400 text-sm font-semibold tracking-wide animate-fade-in-fwd">
                      ✓ Message sent successfully! I will reply to you at the email provided.
                    </p>
                  )}
                  {submitStatus === 'error' && (
                    <p className="text-red-400 text-sm font-semibold tracking-wide animate-fade-in-fwd">
                      ✗ {errorMessage || 'Failed to send message. Please try again later.'}
                    </p>
                  )}
                </div>
              </form>
            </div>
            <div className="mt-16 text-center">
              <p className="text-zinc-500 text-xs font-semibold uppercase tracking-widest mb-8">Or reach out directly via</p>
              <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center sm:items-end gap-8 sm:gap-16 min-h-[160px]">
                {/* From Uiverse.io by Gaurang7717 */}
                <div className="light-button github scale-105 sm:scale-100">
                  <a href="https://github.com/NisargDelvadiya" title="Go to https://github.com/NisargDelvadiya" target="_blank" rel="noopener noreferrer">
                    <button className="bt cursor-pointer">
                      <div className="light-holder">
                        <div className="dot"></div>
                        <div className="light"></div>
                      </div>
                      <div className="button-holder">
                        <svg viewBox="0 0 24 24">
                          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                        </svg>
                        <p>GitHub</p>
                      </div>
                    </button>
                  </a>
                </div>
                {/* From Uiverse.io by Gaurang7717 */}
                <div className="light-button linkedin scale-105 sm:scale-100">
                  <a href="https://www.linkedin.com/in/nisargjayeshdelvadiya/" title="Go to https://www.linkedin.com/in/nisargjayeshdelvadiya/" target="_blank" rel="noopener noreferrer">
                    <button className="bt cursor-pointer">
                      <div className="light-holder">
                        <div className="dot"></div>
                        <div className="light"></div>
                      </div>
                      <div className="button-holder">
                        <svg viewBox="0 0 16 16">
                          <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
                        </svg>
                        <p>LinkedIn</p>
                      </div>
                    </button>
                  </a>
                </div>
              </div>
              <div className="mt-12 text-center">
                <a href="mailto:nisarg.delvadiya1@zohomail.in" title="Go to mailto:nisarg.delvadiya1@zohomail.in" className="text-zinc-400 hover:text-white transition-colors duration-300 text-lg font-medium tracking-wide cursor-pointer">
                  nisarg.delvadiya1@zohomail.in
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}