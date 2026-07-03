"use client";
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}




/**
 * Main Landing Page Component
 * Represents the entire portfolio layout, handling animations, 
 * contact form submissions, and smooth scrolling for navigation.
 */
export default function Home() {
  // Reference hooks
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

        /* Arratai Hover Styles */
        .light-button.arratai button.bt:hover .button-holder svg {
          fill: rgba(255, 214, 0, 1);
        }
        .light-button.arratai button.bt:hover .button-holder {
          color: rgba(255, 214, 0, 1);
          outline: rgba(255, 214, 0, 0.4) 2px solid;
          outline-offset: 2px;
          border-color: rgba(255, 214, 0, 0.5);
        }
        .light-button.arratai button.bt:hover .light-holder .light {
          background: linear-gradient(
            180deg,
            rgba(255, 214, 0, 0.4) 0%,
            rgba(255, 214, 0, 0) 75%
          );
        }


        /* Circular Glass Cards styling for Projects Section */
        .projects-container {
          position: relative;
          width: 600px;
          height: 600px;
          margin: 4rem auto;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: visible;
        }

        .projects-container .glass {
          position: absolute;
          width: 150px;
          height: 200px;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02));
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 15px 25px rgba(0, 0, 0, 0.25);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.6s ease, border-color 0.6s ease;
          border-radius: 12px;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          cursor: pointer;
          z-index: 1;
          left: 50%;
          top: 50%;
          /* 
            Radial rotation: translate to center, rotate around it, translate outward along Y
          */
          transform: translate(-50%, -50%) rotate(calc(var(--r) * 1deg)) translateY(-255px);
        }

        /* Hover: pull radially outward from the center */
        .projects-container .glass:hover {
          transform: translate(-50%, -50%) rotate(calc(var(--r) * 1deg)) translateY(-315px);
          z-index: 100; /* Raise z-index higher than normal state cards to overlay them correctly */
          border-color: rgba(255, 255, 255, 0.35);
          box-shadow: 0 30px 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 255, 255, 0.15);
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.04));
        }

        .projects-container .glass::before {
          content: attr(data-text);
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 35px;
          background: rgba(255, 255, 255, 0.03);
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          display: flex;
          justify-content: center;
          align-items: center;
          color: rgba(255, 255, 255, 0.7);
          font-family: "JetBrains Mono", monospace;
          font-size: 0.68rem;
          border-bottom-left-radius: 11px;
          border-bottom-right-radius: 11px;
          letter-spacing: 0.02em;
          padding: 0 6px;
          box-sizing: border-box;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .projects-container .glass img {
          width: 80%;
          height: auto;
          max-height: 110px;
          object-fit: contain;
          border-radius: 6px;
          transition: transform 0.5s ease;
          pointer-events: none;
        }

        .projects-container .glass:hover img {
          transform: scale(1.05);
        }

        /* Prevent card hover jitter by extending hit area on hover */
        .projects-container .glass:hover::after {
          content: '';
          position: absolute;
          bottom: -70px;
          left: 0;
          width: 100%;
          height: 70px;
          background: transparent;
          pointer-events: auto;
        }

        @media (max-width: 640px) {
          .projects-container {
            width: 100%;
            height: auto;
            margin: 2rem auto;
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            padding: 0 1rem;
          }
          .projects-container .glass {
            position: relative;
            left: auto;
            top: auto;
            width: 100%;
            max-width: 300px;
            height: 200px;
            margin: 0 auto;
            transform: none !important;
            border-radius: 16px;
          }
          .projects-container .glass:hover {
            transform: translateY(-8px) !important;
            z-index: 10;
          }
          .projects-container .glass::before {
            font-size: 0.8rem;
            height: 35px;
          }
        }
      `}</style>

      <div className="flex justify-center items-center gap-2 font-bold text-4xl md:text-5xl mb-16 md:mb-8 mt-1 md:mt-1 text-center px-4 developer-font">Namaste /\
      </div>
      <div className="flex justify-center items-center gap-2 font-bold text-4xl md:text-5xl mb-16 md:mb-8 md:mt-1 text-center px-4 developer-font">Welcome to my Portfolio Website :)
      </div>

      <div className="w-full max-w-xl bg-[#1e1e1e] rounded-lg border border-zinc-800 shadow-2xl p-4 sm:p-6 developer-font relative mb-32 md:mb-64 overflow-hidden">
        <div className="flex gap-1.5 absolute top-3 left-4">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        </div>

        <div className="text-xs text-zinc-500 text-center border-b border-zinc-800/60 pb-2 mb-4 select-none">
          floatMath.js
        </div>

        <div className="min-h-[350px] sm:min-h-[250px] flex flex-col justify-between w-full">
          <div className="text-left text-xs sm:text-sm md:text-lg leading-relaxed whitespace-pre pl-2 overflow-x-auto max-w-full pb-2">
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
        <div id="about" className="flex items-center w-full max-w-6xl my-12 select-none">
          <span className="h-px flex-1 bg-zinc-800"></span>
          <span className="shrink-0 px-6 text-zinc-400 font-medium tracking-wider uppercase text-sm developer-font">
            Who Am I?
          </span>
          <span className="h-px flex-1 bg-zinc-800"></span>
        </div>
        <section className="w-full flex flex-col justify-center items-center py-12 px-6 md:px-12 gap-8 md:gap-16 box-border">
          <div className="w-full max-w-6xl flex flex-col md:flex-row justify-between items-center gap-12">
            <div ref={profileImageRef} className="flex items-center justify-center shrink-0">
              <img
                className="object-cover rounded-full border border-zinc-800 shadow-xl w-56 h-56 md:w-[300px] md:h-[300px]"
                alt="hero"
                src="/Assets/hero.jpg"
                width="300"
                height="300"
              />
            </div>
            <div ref={profileTextRef} className="flex flex-col justify-center items-center text-center grow w-full max-w-2xl gap-y-6 min-w-0">
              <div className="petit-formal-script-regular text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-wide wrap-break-word w-full">
                Hello, I'm Nisarg Jayesh Delvadiya
              </div>
              <div className="text-zinc-400 text-sm sm:text-base md:text-lg leading-relaxed font-normal wrap-break-word w-full">
                A passionate and dedicated web developer with a strong focus on creating innovative and user-friendly web applications. I have a keen interest in next.js development especially frontend side, and I enjoy bringing ideas to life through clean and efficient code. My goal is to continuously learn and grow as a developer, while contributing to projects that make a positive impact on users' experiences.
              </div>
              {/* 
                INSTRUCTIONS: 
                To make this work, place your resume PDF file inside the "public/Assets/" folder
                and name it exactly "Nisarg_Jayesh_Delvadiya_Resume.pdf". 
              */}
              <a
                href="/Assets/Nisarg_Jayesh_Delvadiya_Resume.pdf"
                download="Nisarg_Jayesh_Delvadiya_Resume.pdf"
                className="cursor-pointer inline-block rounded-xl bg-blue-600 px-8 py-3 text-sm font-semibold text-center leading-6 text-white transition-colors duration-200 hover:bg-blue-700 focus-visible:bg-blue-700"
              >
                Download Resume
              </a>
            </div>
          </div>
        </section>
        {/* --- EDUCATION SECTION --- */}
        <div id="education" className="flex items-center w-full max-w-6xl my-12 select-none">
          <span className="h-px flex-1 bg-zinc-800"></span>
          <span className="shrink-0 px-6 text-zinc-400 font-medium tracking-wider uppercase text-sm developer-font">
            I Studied At...
          </span>
          <span className="h-px flex-1 bg-zinc-800"></span>
        </div>
        <section className="w-full flex flex-col justify-center items-center py-12 px-6 md:px-12 gap-8 md:gap-16 box-border">
          <div className="w-full max-w-6xl flex flex-col-reverse md:flex-row justify-between items-center gap-12">
            <div ref={educationTextRef} className="flex flex-col justify-center items-center text-center grow w-full max-w-2xl min-w-0">
              <div className="petit-formal-script-regular text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 tracking-wide leading-tight wrap-break-word w-full">
                Manipal University Jaipur
              </div>
              <div className="text-zinc-400 text-sm sm:text-base md:text-lg leading-relaxed font-normal wrap-break-word w-full">
                Bachelors in Information Technology, 2024-2028.
              </div>
            </div>

            <div ref={educationImageRef} className="flex items-center justify-center shrink-0">
              <img
                className="object-cover rounded-full border border-zinc-800 shadow-xl w-56 h-56 md:w-[300px] md:h-[300px]"
                alt="hero"
                src="/Assets/MUJ.jpg"
                width="300"
                height="300" />
            </div>
          </div>
        </section>
        {/* --- PROJECTS SECTION --- */}
        <div id="projects" className="flex items-center w-full max-w-6xl my-12 select-none">
          <span className="h-px flex-1 bg-zinc-800"></span>
          <span className="shrink-0 px-6 text-zinc-400 font-medium tracking-wider uppercase text-sm developer-font">
            Have a look at my projects...
          </span>
          <span className="h-px flex-1 bg-zinc-800"></span>
        </div>
        {/* From Uiverse.io by codebykay101 */}
        <section className="relative w-full flex justify-center items-center overflow-visible py-16">
          <div className="projects-container">
            <Link href="/mytodo" style={{ display: 'contents' }}>
              <div data-text="MyTodo" style={{ '--r': '0' }} className="glass">
                <img src="/Assets/mytodo.png" alt="Todo Project" />
              </div>
            </Link>
            <div data-text="" style={{ '--r': '51.4' }} className="glass">
              <img src="null" alt="" />
            </div>
            <div data-text="" style={{ '--r': '102.9' }} className="glass">
              <img src="null" alt="" />
            </div>
            <div data-text="" style={{ '--r': '154.3' }} className="glass">
              <img src="null" alt="" />
            </div>
            <div data-text="" style={{ '--r': '205.7' }} className="glass">
              <img src="null" alt="" />
            </div>
            <div data-text="" style={{ '--r': '257.1' }} className="glass">
              <img src="null" alt="" />
            </div>
            <div data-text="" style={{ '--r': '308.6' }} className="glass">
              <img src="null" alt="" />
            </div>
          </div>
        </section>

        {/* --- SKILLS SECTION --- */}
        <div id="skills" className="flex items-center w-full max-w-6xl my-12 select-none">
          <span className="h-px flex-1 bg-zinc-800"></span>
          <span className="shrink-0 px-6 text-zinc-400 font-medium tracking-wider uppercase text-sm developer-font">
            I am good at...
          </span>
          <span className="h-px flex-1 bg-zinc-800"></span>
        </div>
        <section>
          <div className="w-full max-w-6xl overflow-hidden relative mask-edges py-8 select-none">
            <div className="flex w-max animate-marquee whitespace-nowrap hover:[animation-play-state:paused]">
              <div className="flex gap-16 items-center shrink-0 text-[#9f9fa9] pr-16">
                <svg viewBox="0 0 128 128">
                  <path fill="#9f9fa9" d="M0 51.098V76.86h4.422V56.604L20.73 76.87h27.694v-4.113H30.553v-6.801h14.37v-4.113h-14.37v-6.621h17.87v-4.116H26.13v4.116h.002V76.68L5.527 51.098H0zm85.09.01v4.115h9.03v21.65h4.42v-21.65h8.847v-4.116H85.09zm-31.322.011 20.73 25.764h5.803L69.936 64.01l10.35-12.871-5.79.01-7.459 9.261-7.48-9.29h-5.79zm70.158 14.598c-.761 0-1.445.128-2.051.394-.602.263-1.078.633-1.426 1.108-.35.476-.525 1.032-.525 1.664 0 .77.258 1.384.78 1.847.517.464 1.227.809 2.124 1.036l1.24.312a7.02 7.02 0 0 1 1.026.334 1.91 1.91 0 0 1 .683.461 1.034 1.034 0 0 1 .248.697 1.25 1.25 0 0 1-.283.803 1.77 1.77 0 0 1-.76.535 3.11 3.11 0 0 1-1.132.192 3.24 3.24 0 0 1-1.116-.182 1.902 1.902 0 0 1-.804-.557 1.63 1.63 0 0 1-.352-.931h-1.941c.027.71.216 1.316.566 1.812s.836.873 1.46 1.13c.62.26 1.357.39 2.202.39.875 0 1.619-.136 2.233-.4.617-.27 1.088-.643 1.414-1.118.327-.479.488-1.028.488-1.658 0-.466-.09-.872-.266-1.217a2.726 2.726 0 0 0-.72-.887 4.227 4.227 0 0 0-1.028-.607 7.09 7.09 0 0 0-1.19-.385l-1.02-.25a6.975 6.975 0 0 1-.667-.195 2.82 2.82 0 0 1-.597-.285 1.304 1.304 0 0 1-.43-.418 1.037 1.037 0 0 1-.158-.58 1.21 1.21 0 0 1 .238-.717c.156-.21.385-.376.678-.5a2.771 2.771 0 0 1 1.056-.184c.585 0 1.062.126 1.43.383a1.424 1.424 0 0 1 .623 1.07h1.9a2.775 2.775 0 0 0-.513-1.607c-.333-.466-.792-.833-1.377-1.096-.584-.265-1.26-.394-2.033-.394zm-7.998.144v7.55c-.003.377-.062.697-.176.954a1.25 1.25 0 0 1-.506.584c-.218.133-.488.2-.803.2-.29 0-.546-.057-.771-.17a1.247 1.247 0 0 1-.522-.481 1.474 1.474 0 0 1-.195-.75h-1.963c0 .661.147 1.213.447 1.656a2.768 2.768 0 0 0 1.211 1.002 4.22 4.22 0 0 0 1.72.34c.697 0 1.311-.134 1.835-.4a2.97 2.97 0 0 0 1.236-1.149c.293-.499.444-1.093.448-1.787v-7.549h-1.961zm-53.332.059-8.844 10.982h5.805l5.937-7.38-2.898-3.602zm45.785 8.498c-.324 0-.6.112-.83.336a1.07 1.07 0 0 0-.344.807 1.082 1.082 0 0 0 .344.818c.23.225.506.336.83.336a1.105 1.105 0 0 0 .574-.156c.177-.101.318-.24.428-.416a1.115 1.115 0 0 0 .166-.582 1.097 1.097 0 0 0-.354-.807 1.133 1.133 0 0 0-.814-.336z"></path>
                </svg>
                <svg viewBox="0 0 128 128">
                  <g fill="#9f9fa9"><circle cx="64" cy="47.5" r="9.3"></circle><path d="M64 81.7C71.3 88.8 78.5 93 84.3 93c1.9 0 3.7-.4 5.2-1.3 5.2-3 7.1-10.5 5.3-21.2-.3-1.9-.7-3.8-1.2-5.8 2-.6 3.8-1.2 5.6-1.8 10.1-3.9 15.7-9.3 15.7-15.2 0-6-5.6-11.4-15.7-15.2-1.8-.7-3.6-1.3-5.6-1.8.5-2 .9-3.9 1.2-5.8 1.7-10.9-.2-18.5-5.4-21.5-1.5-.9-3.3-1.3-5.2-1.3-5.7 0-13 4.2-20.3 11.3C56.7 6.3 49.5 2.1 43.7 2.1c-1.9 0-3.7.4-5.2 1.3-5.2 3-7.1 10.5-5.3 21.2.3 1.9.7 3.8 1.2 5.8-2 .6-3.8 1.2-5.6 1.8-10.1 3.9-15.7 9.3-15.7 15.2 0 6 5.6 11.4 15.7 15.2 1.8.7 3.6 1.3 5.6 1.8-.5 2-.9 3.9-1.2 5.8-1.7 10.7.2 18.3 5.3 21.2 1.5.9 3.3 1.3 5.2 1.3 5.8.2 13-4 20.3-11zm-5.6-13.5c1.8.1 3.7.1 5.6.1 1.9 0 3.8 0 5.6-.1-1.8 2.4-3.7 4.6-5.6 6.7-1.9-2.1-3.8-4.3-5.6-6.7zM46 57.9c1 1.7 1.9 3.3 3 4.9-3.1-.4-6-.9-8.8-1.5.9-2.7 1.9-5.5 3.1-8.3.8 1.6 1.7 3.3 2.7 4.9zm-5.8-24.1c2.8-.6 5.7-1.1 8.8-1.5-1 1.6-2 3.2-3 4.9-1 1.7-1.9 3.3-2.7 5-1.3-2.9-2.3-5.7-3.1-8.4zm5.5 13.7c1.3-2.7 2.7-5.4 4.3-8.1 1.5-2.6 3.2-5.2 4.9-7.8 3-.2 6-.3 9.1-.3 3.2 0 6.2.1 9.1.3 1.8 2.6 3.4 5.2 4.9 7.8 1.6 2.7 3 5.4 4.3 8.1-1.3 2.7-2.7 5.4-4.3 8.1-1.5 2.6-3.2 5.2-4.9 7.8-3 .2-6 .3-9.1.3-3.2 0-6.2-.1-9.1-.3-1.8-2.6-3.4-5.2-4.9-7.8-1.6-2.7-3-5.4-4.3-8.1zm39.1-5.4l-2.7-5c-1-1.7-1.9-3.3-3-4.9 3.1.4 6 .9 8.8 1.5-.9 2.8-1.9 5.6-3.1 8.4zm0 10.8c1.2 2.8 2.2 5.6 3.1 8.3-2.8.6-5.7 1.1-8.8 1.5 1-1.6 2-3.2 3-4.9.9-1.5 1.8-3.2 2.7-4.9zm2.3 34.7c-.8.5-1.8.7-2.9.7-4.9 0-11-4-17-10 2.9-3.1 5.7-6.6 8.5-10.5 4.7-.4 9.2-1.1 13.4-2.1.5 1.8.8 3.6 1.1 5.4 1.4 8.5.3 14.6-3.1 16.5zm5.2-52.7c11.2 3.2 17.9 8.1 17.9 12.6 0 3.9-4.6 7.8-12.7 10.9-1.6.6-3.4 1.2-5.2 1.7-1.3-4.1-2.9-8.3-4.9-12.6 2-4.3 3.7-8.5 4.9-12.6zm-8-28.2c1.1 0 2 .2 2.9.7 3.3 1.9 4.5 7.9 3.1 16.5-.3 1.7-.7 3.5-1.1 5.4-4.2-.9-8.7-1.6-13.4-2.1-2.7-3.9-5.6-7.4-8.5-10.5 6-5.9 12.1-10 17-10zM69.6 26.8c-1.8-.1-3.7-.1-5.6-.1s-3.8 0-5.6.1c1.8-2.4 3.7-4.6 5.6-6.7 1.9 2.1 3.8 4.4 5.6 6.7zM40.9 7.4c.8-.5 1.8-.7 2.9-.7 4.9 0 11 4 17 10-2.9 3.1-5.7 6.6-8.5 10.5-4.7.4-9.2 1.1-13.4 2.1-.5-1.8-.8-3.6-1.1-5.4-1.4-8.5-.3-14.5 3.1-16.5zm-5.2 52.7C24.5 56.9 17.8 52 17.8 47.5c0-3.9 4.6-7.8 12.7-10.9 1.6-.6 3.4-1.2 5.2-1.7 1.3 4.1 2.9 8.3 4.9 12.6-2 4.3-3.7 8.6-4.9 12.6zm2.1 11c.3-1.7.7-3.5 1.1-5.4 4.2.9 8.7 1.6 13.4 2.1 2.7 3.9 5.6 7.4 8.5 10.5-6 5.9-12.1 10-17 10-1.1 0-2-.2-2.9-.7-3.4-1.9-4.5-8-3.1-16.5zm-4.2 41.2c2.2-2.7 2.3-5.7 1.1-8.7-1.2-3-3.7-4.4-6.8-4.5-3.7-.1-7.5 0-11.2 0H16V125h3v-9.8h4.7c.6 0 1.1.2 1.4.7l6 9.3c.1.2.4.5.6.5h3.9c-2.4-3.7-4.7-7.2-7.1-10.8 2.1-.3 3.9-1 5.1-2.6zm-14.6-.2v-9.9h1.1c2.3 0 4.7-.1 7 .1 2.7.1 4.6 2.2 4.6 4.9s-2.2 4.8-4.9 4.9c-2.4.1-4.8 0-7.8 0zm38.7 1.3c-1.6-7-8-8.8-12.9-6.6-3.8 1.7-5.5 5-5.6 9.1-.1 3.1.8 5.9 3.2 8 2.7 2.4 6 2.7 9.4 2.1 1.9-.4 3.6-1.3 4.9-2.7-.5-.7-1-1.4-1.5-2-2.8 2.4-5.9 3.2-9.3 1.6-2.2-1.1-3.3-3.8-3.5-5.8h15.5v-1.3c.1-.9 0-1.7-.2-2.4zM42.6 115c-.3-3 2.7-6.2 6-6.2 3.8-.1 6.2 2.2 6.3 6.2H42.6zm30.7-8.7c-1.5-.3-3.1-.4-4.6-.3-2.4.2-4.5 1.3-6.2 3.1.5.7.9 1.4 1.5 2.2.2-.2.4-.4.6-.5 1.6-1.5 3.5-2.3 5.8-2.1 1.8.1 3.5.7 4 2.5.4 1.4.3 2.9.4 4.4-.3 0-.4-.1-.5-.2-2.4-2-5.1-2.4-8-1.7-2.7.7-4.4 2.8-4.6 5.5-.2 3.1 1.2 5.4 3.9 6.5 1.7.7 3.6.7 5.4.3 1.4-.3 2-1.1 4-2.2v1.3h2.8c0-4 .1-8.9 0-13.5 0-2.9-1.7-4.7-4.5-5.3zm1.4 12.6c-.1.3 0 .6 0 .9 0 2.1-.5 2.8-2.5 3.6-1.4.5-2.9.7-4.4.2-1.7-.5-2.9-2-2.9-3.7-.1-1.7 1-3.4 2.7-3.9 2.3-.8 4.4-.3 6.3 1.1.6.5 1 1 .8 1.8zm15.6-9.9c2.6-.8 5-.3 6.8 1.9l.3.2c.7-.6 1.3-1.2 2.1-1.9-.3-.3-.4-.5-.6-.8-2.9-3.1-8.6-3.5-12.1-1-4.9 3.6-4.8 10.6-2.4 14.3 2.3 3.5 5.6 4.7 9.5 4.2 2.3-.3 4.2-1.4 5.7-3.3-.7-.6-1.4-1.2-2.1-1.9-.2.2-.3.3-.4.5-2.7 3-7.2 2.7-9.6-.5-1.4-1.9-1.7-4.1-1.3-6.3.2-2.5 1.5-4.5 4.1-5.4zm20.8 13.6c-.2.1-.3.2-.3.2-.8.6-1.6.7-2.5.4-.9-.4-1-1.2-1.1-2v-11.4c0-.2 0 .2.1-.8h3.8v-3h-4v-5h-3v5.4h-2.6c-.2 0-.5.2-.5.4-.1.7 0 1.2 0 2.2h3.2v12.8c0 1.6.4 3 1.8 3.8 1.5.9 4.4.7 5.7-.4.2-.1.3-.5.3-.6-.3-.6-.6-1.3-.9-2z"></path></g>
                </svg>
                <svg viewBox="0 0 128 128">
                  <path fillRule="evenodd" clipRule="evenodd" fill="#9f9fa9" d="M82.803 34.23c-2.604-8.108-6.781-15.284-12.667-21.459-1.488-1.562-3.142-2.993-4.18-4.936-.656-1.23-1.281-2.477-1.92-3.715l-.406-1.021-.113.402c-.053 2.02-1.197 3.389-2.621 4.668-1.604 1.438-3.096 3-4.636 4.509l-4.736 6.229-3.829 7.042-2.561 6.915-.077.107c-1.409 4.629-2.104 9.389-2.445 14.195-.129 1.807.019 3.639.12 5.455.145 2.596.596 5.147 1.272 7.66 2.457 9.126 7.444 16.695 14.263 23.127 1.266 1.195 2.635 2.282 3.956 3.418l.585 2.008.544 3.116.26 3.253c-.003.66-.03 1.323.009 1.981.011.169.231.325.355.487l1.104.388 1.149.447-.197-2.891-.009-2.848.397-4.338.288-.944.825-1.461c1.018-.818 2.109-1.562 3.036-2.473 1.677-1.647 3.351-3.317 4.852-5.122a38.489 38.489 0 004.969-7.636c.899-1.833 1.747-3.703 2.448-5.618.618-1.688 1.001-3.463 1.488-5.2l.128-.375c1.005-4.688 1.174-9.424.805-14.19-.297-3.841-1.2-7.548-2.456-11.18zm-19.9 50.275c.154-.771.345-1.538.484-2.312-.139.774-.329 1.541-.484 2.312zm3.417.532l-.646-1.415.646 1.415.949.811-.949-.811zm40.154 17.927c-.826-1.583-2.038-2.785-3.64-3.574-1.342-.66-2.785-.95-4.269-.992-1.112-.032-2.228.025-3.342.039-.989.012-1.979.029-2.968.02-1.163-.012-2.326-.047-3.489-.08-.193-.006-.33.033-.42.229-.141.305-.308.599-.481.933l.194.062c.577.102 1.157.189 1.731.304.738.147 1.07.571 1.104 1.193.05.886.07 1.774.067 2.662-.015 3.514-.04 7.028-.066 10.541-.002.232-.006.474-.069.692-.073.252-.152.578-.34.702a2.907 2.907 0 01-1.115.425c-.561.092-.655.117-.83.669l-.076.276c-.084.301-.039.36.275.363 1.802.02 3.603.059 5.404.053 1.643-.006 3.286.094 4.923-.215 1.547-.291 2.991-.801 4.309-1.664 1.71-1.121 2.94-2.619 3.589-4.574.524-1.579.641-3.19.463-4.841a8.928 8.928 0 00-.954-3.223zm-3.157 9.661c-.964 1.794-2.402 2.992-4.457 3.308-1.287.197-2.576.14-3.803-.347-.777-.308-1.066-.979-1.09-1.772a82.426 82.426 0 01-.033-2.332c-.004-2.734-.004-5.468 0-8.201.002-.861.017-1.724.031-2.586.01-.606.137-.809.728-.858 2.596-.218 5.073.062 7.13 1.889 1.272 1.13 1.996 2.571 2.297 4.226.125.69.163 1.396.241 2.096-.063 1.598-.279 3.153-1.044 4.577zm21.789-2.961c-.512-1.246-1.482-2.027-2.701-2.527-.416-.171-.845-.312-1.294-.478l.157-.1c.485-.311 1.025-.562 1.443-.945 1.016-.931 1.438-2.102 1.24-3.493-.188-1.323-.848-2.294-2.027-2.924-1.07-.57-2.224-.778-3.418-.777-2.066.002-4.133.033-6.199.037-.712.001-1.424-.052-2.136-.062-.138-.002-.343.033-.402.125-.163.25-.271.538-.387.816-.067.162-.001.251.184.275.497.068.993.153 1.491.227.688.103 1.021.461 1.063 1.154l.009.411c.001 2.155.008 4.31-.001 6.465a926.932 926.932 0 01-.061 6.456c-.003.271-.04.543-.079.812-.059.406-.276.686-.692.774l-1.177.232c-.139.028-.34.024-.397.11-.216.323-.39.676-.366 1.102l.121.033 3.953.097.793-.003c1.368-.016 2.738.011 4.104-.059 1.479-.074 2.868-.513 4.152-1.268 1.367-.805 2.419-1.866 2.793-3.462.24-1.019.241-2.044-.166-3.028zm-10.043-9.181c.006-.433.197-.621.627-.632 1.059-.029 2.111-.023 3.133.342 1.322.472 2.135 1.612 2.12 3.005-.007.535.001 1.065-.196 1.579-.389 1.012-1.135 1.546-2.193 1.65-.552.056-1.109.062-1.601.088l-1.642-.072c-.218-.008-.313-.104-.312-.328l.064-5.632zm6.806 13.494c-.529 1.151-1.493 1.756-2.7 1.966a6.823 6.823 0 01-2.892-.127c-.706-.181-.994-.748-1.135-1.377-.095-.421-.079-.922-.087-1.36-.013-.676-.003-2.079-.003-2.079h-.014c0-1 .003-1.866-.003-2.825-.001-.207.034-.31.287-.302.898.027 1.799.042 2.697.077.803.031 1.555.269 2.262.65 1.076.58 1.724 1.468 1.902 2.688.136.925.078 1.835-.314 2.689zm-98.587 1.078l.019-5.437c.003-.818-.101-1.62-.369-2.396-.739-2.137-2.777-3.11-4.899-2.343-.965.349-1.83.878-2.656 1.478-.481.35-.481.35-.829-.149-.985-1.412-2.392-1.895-4.03-1.374-1.059.336-1.985.911-2.862 1.579-.082.062-.247.131-.296.094-.082-.061-.139-.206-.137-.315l.06-.966c.005-.203-.034-.407-.054-.62-.396.137-.712.274-1.043.354-1.023.25-2.053.48-3.082.715-.249.057-.512.132-.536.418-.025.281.246.328.456.412.442.178.881.367 1.318.559.367.162.504.455.502.849-.007 1.685.004 3.368-.006 5.053-.004.685-.036 1.369-.067 2.054-.028.607-.235.861-.823 1.014-.312.082-.629.137-.943.211-.069.016-.187.06-.188.094-.013.297-.029.601.021.89.01.052.324.052.498.072l.117-.007c1.212-.018 2.424-.037 3.637-.05.643-.007 1.285-.001 1.983-.001l.075-.97c-.4-.073-.757-.128-1.109-.205-.549-.12-.783-.411-.797-.965l-.01-.793c-.006-2.057-.014-4.113-.014-6.17 0-.299.124-.536.387-.715.557-.376 1.145-.675 1.796-.842 1.372-.351 2.562.137 3.09 1.304.167.368.298.775.335 1.175.194 2.062.11 4.126-.007 6.188-.025.445-.234.669-.673.778l-1.032.218c-.083.021-.204-.035-.21.034-.023.285-.01.722-.01.722h.246l3.142.103c.861-.002 1.723.102 2.583.124.154.003.291.026.3-.152a8.492 8.492 0 00-.011-.829l-.164-.029-.885-.199c-.597-.141-.803-.368-.805-.972-.007-1.489.013-2.977 0-4.465a45.225 45.225 0 00-.095-2.551c-.015-.226.02-.374.2-.501a5.311 5.311 0 011.732-.835c1.935-.51 3.519.551 3.619 2.546.098 1.924.057 3.855.042 5.783-.005.671-.227.874-.888 1.054l-.228.059c-.677.162-.671.162-.631.881.013.225.075.283.315.277 1.379-.031 2.758-.039 4.137-.051.564-.005 1.128 0 1.742 0l.125-.936c-.539-.143-1.036-.249-1.516-.406-.424-.144-.574-.4-.572-.848zm47.489-8.241c.568-.527.572-1.223.413-1.996-.45.471-.954.688-1.529.729-.771.055-1.528-.012-2.246-.319-1.942-.834-3.854-.775-5.76.14-1.603.768-2.589 1.965-2.688 3.78-.063 1.163.155 2.264.931 3.189.465.554 1.062.913 1.735 1.161.29.107.312.245.069.43a7.01 7.01 0 01-.557.38 73.2 73.2 0 01-1.226.754c-.241.146-.323.332-.244.617.231.838.826 1.322 1.57 1.675l.271.189-.237.237c-.729.591-1.487 1.149-2.185 1.776-.586.527-.775 1.233-.598 2.012.357 1.555 1.388 2.517 2.851 2.959 2.557.774 4.958.33 7.147-1.185 1.298-.899 2.229-2.069 2.512-3.679.317-1.809-.688-3.379-2.487-3.703-1.19-.216-2.408-.278-3.612-.416-.562-.064-1.132-.102-1.679-.231-.465-.11-.696-.489-.653-.859.043-.364.43-.703.873-.738.892-.072 1.766-.211 2.588-.587 2.178-.996 3.189-2.74 2.936-5.088-.033-.316-.105-.628-.17-.996.697.117 1.41.294 1.975-.231zm-6.609 11.017c.886.026 1.894.081 2.868.366.857.25 1.562.688 1.77 1.645.251 1.156-.305 2.306-1.424 2.924-1.048.578-2.186.626-3.34.507-.988-.102-1.877-.444-2.589-1.174-.938-.961-.943-2.291-.004-3.249.839-.856 1.288-1.033 2.719-1.019zm2.217-6.962c-.516 1.651-2.018 1.879-3.195 1.351-1.003-.449-1.44-1.333-1.669-2.342-.089-.388-.11-.791-.162-1.188.021-.569.115-1.115.36-1.627.751-1.577 2.596-1.483 3.617-.769.438.306.743.722.934 1.215a4.998 4.998 0 01.115 3.36zm-9.37 5.263a7.984 7.984 0 01-1.057-.236c-.608-.186-.682-.3-.689-.943-.018-1.792-.03-3.584-.05-5.375-.01-.806-.106-1.601-.353-2.371-.65-2.03-2.641-3.12-4.633-2.521-1.104.333-2.052.952-2.935 1.679l-.322.247.001-.331c.021-.381.062-.762.059-1.143-.002-.199-.078-.399-.115-.574-.753.227-1.428.455-2.117.629-.691.174-1.396.292-2.095.434-.347.07-.602.28-.596.519.009.337.288.402.532.503.442.181.883.364 1.32.558.312.139.439.397.436.732-.022 2.329-.036 4.659-.07 6.989-.01.736-.196.93-.92 1.092l-.316.063c-.67.115-.689.142-.643.849l.004.117c-.008.272.111.36.391.357 1.78-.021 3.561-.031 5.341-.024.763.003.845-.057.829-.841l-.036-.337c-.436-.073-.853-.126-1.261-.216-.427-.095-.58-.27-.62-.704-.037-.397-.049-.8-.053-1.2-.02-1.831-.036-3.662-.045-5.492-.002-.461.083-.889.507-1.186a4.14 4.14 0 012.125-.762c1.588-.109 2.795.832 2.881 2.415.106 1.953.074 3.913.099 5.87.002.146-.024.293-.044.438-.038.286-.178.501-.468.575-.283.074-.57.14-.859.184-.431.064-.44.061-.473.496l.011.293c.051.506.052.491.564.486 1.722-.014 3.443-.023 5.164-.021.72.002.771-.032.777-.774l-.002-.176c.011-.19-.074-.267-.269-.298zm24.052-11.323c-1.805-.441-3.517-.113-5.143.728-1.58.817-2.636 2.08-3.038 3.824-.406 1.763-.212 3.483.567 5.12.507 1.063 1.287 1.885 2.349 2.419 2.486 1.252 5.527.684 7.477-.991 1.539-1.321 2.104-3.08 2.138-5.257-.021-.218-.042-.638-.1-1.054-.327-2.37-1.968-4.231-4.25-4.789zm1.367 9.155c-.479 1.886-2.11 2.724-3.95 2.076-.939-.33-1.641-.961-2.113-1.814-1.086-1.96-1.295-4.044-.677-6.182.412-1.424 1.584-2.203 2.978-2.105 1.246.087 2.204.685 2.907 1.699.741 1.07 1.027 2.287 1.103 3.565.013.205.002.41.002.616l.088.01c-.11.713-.162 1.44-.338 2.135zm-46.764-9.186c-1.899-.434-3.678-.005-5.326.96-1.425.834-2.346 2.08-2.699 3.708-.331 1.521-.196 3.016.343 4.473.328.888.825 1.669 1.554 2.278 1.535 1.281 3.329 1.605 5.238 1.248 1.616-.303 3.036-1.021 4.068-2.364.966-1.256 1.334-2.698 1.372-4.261-.057-.495-.071-.999-.176-1.482-.522-2.411-1.932-4.003-4.374-4.56zm1.549 9.18c-.463 1.876-2.12 2.735-3.947 2.087-1.173-.417-1.937-1.276-2.42-2.377-.774-1.769-.932-3.61-.431-5.476.384-1.427 1.541-2.478 3.312-2.226 1.087.154 1.935.709 2.567 1.592.854 1.191 1.135 2.555 1.174 3.988v.293l.072.011c-.105.704-.157 1.42-.327 2.108z"></path>
                </svg>
                <svg viewBox="0 0 128 128">
                  <path fill="#9f9fa9" d="M8.983 78.08c-.937.246-2.276 1.019-2.908 1.687l-.622.628-.173-2.212H2.987L2.935 86.2l-.039 8.033h2.61l.074-5.224c.086-5.895.19-6.455 1.305-7.594.81-.825 2.08-1.284 3.19-1.158.936.103 1.588.524 2.082 1.365.332.564.35.967.407 6.598l.052 6.013h2.61l.051-5.575c.052-5.349.07-5.596.442-6.299 1.357-2.506 4.939-2.89 6.117-.664.355.664.373 1.033.425 6.611l.069 5.927h2.454l-.056-6.541-.052-6.526-.495-.927c-1.092-2.072-4.11-2.878-6.61-1.79-.408.178-1.184.755-1.73 1.261-.914.863-1.005.916-1.196.6-.46-.79-1.219-1.492-1.978-1.86-.901-.405-2.804-.612-3.684-.37zm0 0"></path><path fill="#9f9fa9" d="M30.953 78.097c-2.133.455-4.196 1.98-5.007 3.736-1.253 2.65-1.201 6.456.122 9.03 1.343 2.632 4.816 4.14 7.971 3.49 4.306-.91 6.313-3.91 6.013-8.977-.052-.877-.212-1.981-.368-2.489-.598-1.912-2.327-3.702-4.27-4.422-1.145-.437-3.296-.61-4.461-.368zm3.616 2.528c1.886.875 2.804 2.683 2.788 5.54-.018 2.896-.864 4.699-2.628 5.596-1.183.61-3.156.628-4.253.07-.755-.404-1.656-1.318-2.081-2.125-.794-1.526-.828-5.085-.069-6.714.846-1.842 2.242-2.754 4.196-2.771.85-.017 1.379.086 2.047.404zm11.887-2.476c-1.254.368-2.012.789-2.736 1.526-.386.386-.759.702-.828.702-.07 0-.139-.507-.139-1.14V78.08l-1.096.05-1.11.053-.052 8.016-.036 8.033h2.645v-5.05c.018-5.332.104-6.208.81-7.261.495-.773 1.817-1.51 2.983-1.665 1.674-.23 3.386.737 3.773 2.137.125.442.194 2.735.194 6.264v5.575h2.662l-.052-6.277-.052-6.26-.46-.984c-.529-1.105-1.321-1.825-2.574-2.315-1.093-.422-2.91-.543-3.932-.247Zm12.87-.07c-2.661.581-4.547 2.598-5.288 5.632-.334 1.348-.282 3.91.086 5.172 1.08 3.72 3.477 5.562 6.95 5.315 1.34-.105 2.505-.56 3.402-1.35.6-.527.655-.545.76-.211.177.577-.105 2.839-.443 3.611-.667 1.51-1.99 2.193-4.214 2.193-1.99-.016-3.334-.754-3.65-2.033-.087-.333-.264-.42-.915-.51a12.985 12.985 0 0 1-1.218-.192c-.369-.07-.408-.017-.408.668.018 1.682 1.288 3.156 3.334 3.858.903.317 1.553.403 2.927.403 3.177 0 5.362-1.123 6.42-3.281.793-1.596.919-3.455.862-11.978l-.052-7.192h-2.293l-.052.915c-.034.507-.104.927-.155.927-.057 0-.373-.244-.725-.542-1.34-1.174-3.632-1.773-5.327-1.404zm3.477 2.562c.495.264 1.127.737 1.392 1.088 1.976 2.576 1.603 7.89-.688 9.537-2.239 1.617-5.36.737-6.47-1.803-.567-1.3-.706-4.244-.264-5.839.333-1.284 1.283-2.51 2.363-3.07.949-.51 2.536-.477 3.667.087zm11.072-2.475c-1.461.421-1.903.633-2.874 1.37-1.887 1.405-2.766 3.559-2.749 6.714 0 2.299.352 3.686 1.305 5.16 1.27 1.946 3.438 3.035 6.082 3.053 3.052.016 5.467-1.337 6.685-3.738l.616-1.227.546 1.122c1.994 4.193 8.237 5.208 11.783 1.947.563-.51 1.18-1.226 1.357-1.56.195-.351.385-.633.437-.633.057 0 .248.369.425.841.885 2.107 3.07 3.264 6.19 3.246 1.817 0 3.157-.332 4.375-1.105.724-.455 1.886-1.756 1.886-2.124 0-.069.087-.35.195-.61l.173-.495.511.88c2.208 3.858 8.363 4.716 11.71 1.647.866-.806 2.046-2.891 1.765-3.156-.088-.086-.686-.23-1.34-.3l-1.161-.155-.287.594c-.793 1.647-1.92 2.475-3.629 2.614-2.7.247-4.729-1.422-5.258-4.278-.087-.508-.122-.967-.07-1.02.052-.051 2.788-.086 6.065-.086h5.96v-.945c0-1.214-.229-2.406-.718-3.703-.569-1.509-2.293-3.19-3.862-3.77-1.696-.633-4.041-.594-5.715.086-2.804 1.14-4.5 3.984-4.517 7.508v1.21l-.702-.616c-.76-.629-2.275-1.244-4.673-1.873-2.684-.702-3.582-1.054-4.058-1.6-.511-.61-.546-1.013-.177-1.716.407-.807 1.533-1.244 3.211-1.244 1.92 0 2.784.437 3.404 1.7.35.718.51.892.793.84a20.47 20.47 0 0 1 1.196-.173c.989-.122 1.063-.386.408-1.773-.863-1.843-2.857-2.788-5.835-2.77-1.396.016-1.977.086-2.804.42-1.8.685-2.823 1.895-3.088 3.667l-.125.807-.546-1.054c-2.75-5.263-10.934-5.154-13.383.174l-.442.966-.616-1.226c-.777-1.544-1.994-2.632-3.65-3.265-1.465-.56-3.511-.702-4.799-.35zm3.932 2.493c1.816.893 2.718 2.719 2.718 5.505-.018 3.858-1.799 6.139-4.799 6.139-1.834 0-3.368-1.019-4.196-2.752-.438-.946-.477-1.176-.477-3.386 0-2.58.195-3.313 1.218-4.51 1.218-1.434 3.72-1.89 5.536-.996zm14.037-.195c.85.35 1.994 1.405 2.401 2.194.777 1.508.898 4.664.266 6.506-.355 1.036-1.323 2.176-2.26 2.632-1.587.807-3.88.541-5.184-.6-2.15-1.875-2.415-7.134-.46-9.397 1.218-1.44 3.563-2.016 5.238-1.335zm27.298.073c1.397.595 2.436 2.016 2.489 3.4l.034.736h-8.99l.052-.525c.12-1.474 1.143-2.856 2.592-3.576.95-.477 2.766-.495 3.823-.034zm-20.383 4.96c.706.65 1.695 1.036 4.833 1.876 1.496.404 2.927.881 3.174 1.055 1.517 1.087.724 3.19-1.414 3.702-1.27.294-2.996.139-4.018-.386-.707-.351-.92-.599-1.358-1.526l-.528-1.088-2.08.208.121-.824c.051-.455.108-1.665.108-2.683v-1.86l.333.529c.174.282.547.737.829.997zM69.77 25.244c-1.609.065-4.318.495-4.318.677 0 .077 1.912 1.032 2.055 1.032.139 0 2.359 1.11 2.848 1.417.646.41 1.105.785.971.785-.086 0-2.367-.88-3.23-1.254-.702-.299-3.624-1.166-5.05-1.504-.767-.178-1.092-.247-2.402-.485-1.933-.355-4.2-.373-5.193-.048-1.413.46-1.73 1.023-1.73 3.108 0 1.145.056 1.634.308 2.666.104.45.412 1.435.56 1.77.038.103.172.428.286.719.116.286.463 1.023.77 1.625 1.721 3.412 4.297 6.26 7.93 8.765 1.143.785 4.262 2.277 5.51 2.633.317.086.424.268.165.268-.291 0-2.922-.729-3.464-.958a9.908 9.908 0 0 0-.625-.247c-1.872-.759-4.266-2.315-6.247-4.084a20.48 20.48 0 0 1-5.09-6.954c-.757-1.711-1.273-3.71-1.399-5.449-.077-.992-.155-1.235-.416-1.222-.086 0-.902-.03-1.809-.077-2.448-.105-5.804.164-9.12.737-6.347 1.078-13.192 3.575-20.24 7.382a88.8 88.8 0 0 0-3.474 1.976c-.133.078-.555.333-.94.577-.385.238-.837.508-1.001.61-.364.21-4.392 2.945-4.872 3.308-.183.135-.686.508-1.107.811-1.912 1.419-6.077 4.812-6.315 5.155-.118.173.064.26.316.173.125-.047.45-.112.71-.152.27-.038.963-.22 1.54-.41a47.98 47.98 0 0 1 1.396-.422c1.421-.333 1.997-.45 2.835-.572.373-.052.932-.134 1.249-.182 3.906-.577 5.77-.72 7.507-.585 3.781.308 7.396.945 9.465 1.682 1.547.555 4.698 2.258 6.086 3.282.798.602 3.373 3.165 3.94 3.94.443.612.932 1.145 1.05 1.145.034 0 .086-1.951.095-4.33l.026-4.323 5.059-.03c3.98-.018 5.085.013 5.155.1.095.122.325.532 1.083 1.937.725 1.349 1.08 1.998 1.3 2.393.114.209.382.707.608 1.096.207.395.602 1.12.87 1.617.27.5.491.92.491.937 0 .087.394.603.464.603.04 0 .133-.144.2-.303.078-.175.28-.555.442-.842.173-.29.48-.854.693-1.244.212-.395.503-.936.655-1.196.424-.755.866-1.578 1.23-2.246.183-.346.474-.88.642-1.197.173-.316.425-.762.56-1.005a4.905 4.905 0 0 1 .33-.55c.073-.087 1.209-.118 5.305-.1l5.203.03.025 8.445c.023 6.654.048 8.431.148 8.431.055-.009.442-.23.837-.507.555-.39.797-.628 1.053-1.07.59-1.002 2.25-2.58 3.368-3.192a15.87 15.87 0 0 1 4.326-1.624c1.54-.325 1.99-.373 5.48-.5 6.373-.22 7.318-.26 7.366-.307.025-.027-.061-.278-.182-.564-.134-.277-.368-.793-.53-1.135-.606-1.314-.606-1.751.027-2.394.433-.446 1.547-.84 3.463-1.222.317-.07.711-.152.877-.213.16-.047.364-.082.45-.082.239 0 2.154-.473 2.558-.624.278-.113 1.777-.438 3.567-.784.777-.152 2.797-.555 4.47-.89 1.058-.208 2.163-.429 2.45-.485.29-.06.702-.143.914-.182.212-.048.49-.104.625-.126.133-.03.81-.16 1.49-.303a34.027 34.027 0 0 1 1.548-.3c.481-.047 4.106-.918 4.942-1.183 1.327-.432 1.72-.602 2.558-1.166.906-.616 1.153-.95 2.046-2.727.993-1.98 1.136-2.315 1.414-3.147.432-1.326.407-1.833-.145-2.388-.38-.382-1.208-.777-1.815-.864-.45-.055-.507-.039-.733.204-.134.144-.247.312-.247.373 0 .082-.156.508-.585 1.54-.039.103-.125.364-.195.571a6.215 6.215 0 0 1-.239.668c-.125.269-.133.221-.087-.525.048-.737.175-1.357.452-2.292.048-.182.117-.491.142-.682l.048-.342-.997-.403a129.623 129.623 0 0 1-2.452-1.032 67.753 67.753 0 0 0-.964-.373 15.992 15.992 0 0 1-.987-.395 31.478 31.478 0 0 0-1.01-.42c-.647-.247-2.897-1.009-4.809-1.613-.52-.164-3.546-1.07-3.845-1.157a37.918 37.918 0 0 1-1.343-.373c-.157-.039-.53-.142-.82-.221-1.69-.468-2.133-.585-2.74-.755a17.671 17.671 0 0 0-1.01-.268c-.182-.048-.68-.164-1.106-.269-.741-.182-3.845-.897-5.526-1.278a106.296 106.296 0 0 0-1.206-.278 21.523 21.523 0 0 0-.863-.173 41.008 41.008 0 0 1-1.2-.238 84.375 84.375 0 0 0-1.878-.348 192.56 192.56 0 0 0-1.682-.294c-2.652-.477-2.836-.507-7.595-1.032-2.935-.333-6.876-.61-7.838-.564a75.2 75.2 0 0 0-1.88.087zm-11.115 4.712c2.535.825 5.007 1.942 6.702 3.03 1.343.872 3.017 2.26 3.468 2.88l.195.26-.369-.144c-.2-.086-.624-.268-.94-.42-1.69-.785-1.873-.855-1.873-.68 0 .047.394.68.862 1.386.482.715.867 1.349.867 1.404 0 .048-.182-.03-.403-.182-.866-.593-2.896-1.442-3.013-1.27-.025.048.6.842 1.396 1.77.788.927 1.443 1.72 1.443 1.776 0 .145-.155.126-.883-.143-.75-.268-.946-.294-.946-.116 0 .125 1.626 2.315 2.272 3.074.182.207.325.407.325.455 0 .23-2.25-1.232-3.845-2.494-2.28-1.815-4.483-4.257-5.645-6.272-.949-1.647-1.278-2.536-1.278-3.512 0-.572.03-.689.243-.888.122-.135.277-.24.333-.24.06 0 .538.145 1.089.326zm30.354 3.405c.924.164 2.18.38 2.787.49.607.104 1.344.229 1.635.277.286.055.702.134.914.182.209.047.625.13.91.2.955.207 1.185.255 2.742.62 1.672.394 2.036.467 2.548.576.432.082.866.247.866.325 0 .025-.32.209-.701.407-.79.395-.954.422-4.202.546-2.215.096-3.393.07-4.472-.103-2.173-.334-3.296-.946-4.172-2.267-.307-.452-.51-.582-1.213-.764-.26-.078-.655-.182-.863-.25-.212-.066-.577-.17-.81-.24-.69-.181-.296-.286 1.096-.286.962 0 1.635.066 2.935.287zm11.564 13.36a.573.573 0 0 1-.241 0c-.066-.032-.018-.048.116-.048s.182.016.125.047zm-.416.112c0 .047-.112.117-.26.144a57.5 57.5 0 0 0-1.855.537c-.133.048-.564.182-.958.294-.993.286-3.395 1.071-4.04 1.318-1.209.46-4.058 1.973-4.46 2.371-.594.586-.78 1.219-.694 2.424.03.502.1 1.144.155 1.421.113.603.048.768-.182.469-.233-.294-.724-1.365-.867-1.89-.077-.243-.164-.555-.212-.71-.174-.543-.104-1.185.165-1.579.364-.555 1.673-1.443 3.212-2.18.728-.352 2.853-1.08 4.808-1.653.394-.116.824-.25.958-.285 1.387-.468 4.23-.919 4.23-.681zm-30.41.642c-.026.026-.113.039-.182.008-.078-.03-.048-.056.055-.056.11-.009.167.017.127.047zm0 0"></path><path fill="#9f9fa9" d="M49.585 65.968v6.692h4.79c3.595 0 4.817-.03 4.903-.117.144-.143.174-13.27.031-13.27-.047 0-.117.075-.147.161-.035.087-1.085 1.72-2.336 3.633-1.978 3.022-2.529 3.758-2.529 3.386 0-.066-3.277-5.18-4.114-6.416a3.465 3.465 0 0 1-.3-.507c-.077-.145-.172-.256-.22-.256-.039 0-.078 3.012-.078 6.693zm0 0"></path>
                </svg>
                <svg viewBox="0 0 128 128">
                  <path fill="#9f9fa9" d="M40.53 77.82V50.74H42V55a5.57 5.57 0 00.48-.6 7.28 7.28 0 016.64-4.12c3.35-.1 6.07 1.14 7.67 4.12a13.24 13.24 0 01.32 12.14c-1.49 3.34-5.17 5-9.11 4.39a7.37 7.37 0 01-5.88-3.88v10.77zM42 60.32c.13 1.32.18 2.26.33 3.18.58 3.62 2.72 5.77 6.08 6.16A6.91 6.91 0 0056 65.27a11.77 11.77 0 00-.26-9.68 6.77 6.77 0 00-7.13-3.94 6.59 6.59 0 00-5.89 4.87 33.4 33.4 0 00-.72 3.8zM88.41 64a7.92 7.92 0 01-7.74 7c-6.16.31-9.05-3.78-9.51-8.5a13.62 13.62 0 011.2-7.5 8.37 8.37 0 018.71-4.67 8 8 0 017.1 6.09 41.09 41.09 0 01.69 4.5H72.67c-.3 4.28 2 7.72 5.26 8.55 4.06 1 7.53-.76 8.79-4.62.28-.99.79-1.13 1.69-.85zm-15.74-4.45h14.47c-.09-4.56-2.93-7.86-6.78-7.91-4.36-.07-7.5 3.11-7.69 7.91zM91.39 64.1h1.42a5.69 5.69 0 003.34 4.9 8.73 8.73 0 007.58-.2 3.41 3.41 0 002-3.35 3.09 3.09 0 00-2.08-3.09c-1.56-.58-3.22-.9-4.81-1.41A35.25 35.25 0 0194 59.18c-2.56-1.25-2.72-6.12.18-7.66a10.21 10.21 0 019.76-.15 5.14 5.14 0 012.6 5.24h-1.22c0-.06-.11-.11-.11-.17-.15-3.89-3.41-5.09-6.91-4.75a9.17 9.17 0 00-3 .91 3 3 0 00-1.74 3 3 3 0 002 2.82c1.54.56 3.15.92 4.73 1.36 1.27.35 2.59.58 3.82 1a4.51 4.51 0 013.1 4.07 4.81 4.81 0 01-2.59 5c-3.34 1.89-8.84 1.39-11.29-1a6.67 6.67 0 01-1.94-4.75zM125.21 56.61h-1.33c0-.18-.07-.34-.09-.49a4.35 4.35 0 00-3.54-4.18 8.73 8.73 0 00-5.61.27 3.41 3.41 0 00-2.47 3.25 3.14 3.14 0 002.4 3.16c2 .62 4.05 1 6.08 1.56a17 17 0 011.94.59 5 5 0 01.27 9.31 11.13 11.13 0 01-9 .09 6.24 6.24 0 01-3.76-6.06h1.3a7.29 7.29 0 0011.1 4.64 3.57 3.57 0 001.92-3.34 3.09 3.09 0 00-2.11-3.07c-1.56-.58-3.22-.89-4.81-1.4a35.43 35.43 0 01-4.87-1.75c-2.5-1.23-2.7-6.06.15-7.6a10.07 10.07 0 019.92-.11 5.23 5.23 0 012.51 5.13zM38.1 70.51a2.29 2.29 0 01-2.84-1.08c-1.63-2.44-3.43-4.77-5.16-7.15l-.75-1c-2.06 2.76-4.12 5.41-6 8.16a2.2 2.2 0 01-2.7 1.06l7.73-10.37-7.19-9.37a2.39 2.39 0 012.85 1c1.67 2.44 3.52 4.77 5.36 7.24 1.85-2.45 3.68-4.79 5.39-7.21a2.15 2.15 0 012.68-1l-2.79 3.7c-1.25 1.65-2.48 3.31-3.78 4.92a1 1 0 000 1.49c2.39 3.17 4.76 6.35 7.2 9.61zM70.92 50.66v1.4a7.25 7.25 0 00-7.72 7.49v11h-1.43V50.74h1.4v4.06c1.73-2.96 4.4-4.06 7.75-4.14zM2.13 60c.21-1 .34-2.09.63-3.11 1.73-6.15 8.78-8.71 13.63-4.9 2.84 2.23 3.55 5.39 3.41 8.95h-16c-.26 6.36 4.33 10.2 10.2 8.24a6.09 6.09 0 003.87-4.31c.31-1 .81-1.17 1.76-.88a8.12 8.12 0 01-3.88 5.93 9.4 9.4 0 01-10.95-1.4 9.85 9.85 0 01-2.46-5.78c0-.34-.13-.68-.2-1q-.01-.89-.01-1.74zm1.69-.43h14.47c-.09-4.61-3-7.88-6.88-7.91-4.32-.06-7.41 3.14-7.6 7.89z"></path>
                </svg>
                <svg viewBox="0 0 128 128">
                  <path fill="#9f9fa9" d="M64.144 56.789c-4.976 0-8.563 3.245-8.563 8.112s4.034 8.113 9.014 8.113c3.006 0 5.656-1.19 7.297-3.195l-3.448-1.992c-.91.996-2.294 1.577-3.849 1.577-2.159 0-3.993-1.127-4.674-2.93H72.55a8.151 8.151 0 0 0 .158-1.577c0-4.863-3.583-8.108-8.564-8.108zm-4.259 6.535c.563-1.798 2.105-2.93 4.26-2.93 2.158 0 3.7 1.132 4.259 2.93zm-1.019-11.493L46.377 73.465 33.884 51.83h4.683l7.806 13.521 7.806-13.521zm-42.212-2.253 16.653 28.845H0Zm74.172 15.324c0 2.704 1.767 4.507 4.507 4.507 1.857 0 3.25-.843 3.966-2.218l3.462 1.997c-1.434 2.388-4.12 3.826-7.428 3.826-4.98 0-8.563-3.245-8.563-8.112 0-4.868 3.587-8.113 8.563-8.113 3.308 0 5.99 1.438 7.428 3.826l-3.462 1.997c-.716-1.375-2.109-2.218-3.966-2.218-2.736 0-4.507 1.803-4.507 4.508zM128 51.83v20.732h-4.056V51.831Zm-15.324 4.958c-4.976 0-8.563 3.245-8.563 8.112s4.038 8.113 9.014 8.113c3.006 0 5.656-1.19 7.297-3.195l-3.448-1.992c-.91.996-2.294 1.577-3.85 1.577-2.158 0-3.992-1.127-4.673-2.93h12.629a8.16 8.16 0 0 0 .157-1.577c0-4.863-3.583-8.108-8.563-8.108zm-4.26 6.535c.564-1.798 2.101-2.93 4.26-2.93s3.7 1.132 4.26 2.93zm-22.999-6.085v4.368a5.157 5.157 0 0 0-1.442-.221c-2.618 0-4.507 1.803-4.507 4.507v6.67h-4.056V57.24h4.056v4.147c0-2.29 2.664-4.147 5.95-4.147z"></path>
                </svg>
                <svg viewBox="0 0 128 128">
                  <path fill="#9f9fa9" d="M64.727 23.539a17.54 17.54 0 0 0-17.54 17.54 17.54 17.54 0 0 0 17.54 17.54 17.54 17.54 0 0 0 17.54-17.54 17.54 17.54 0 0 0-17.54-17.54zm8.398 5.941a3.462 5.539 24.166 0 1 .894.195 3.462 5.539 24.166 0 1 .891 6.47 3.462 5.539 24.166 0 1-5.426 3.637 3.462 5.539 24.166 0 1-.89-6.471 3.462 5.539 24.166 0 1 4.53-3.83zM58.957 0a45.234 45.234 0 0 0-45.232 45.234 45.234 45.234 0 0 0 45.232 45.234 45.234 45.234 0 0 0 43.855-34.9 36.002 36.002 0 0 1-7.656 10.617A33.464 33.464 0 0 1 67.65 80.697a33.464 33.464 0 0 1-14.727-3.475 39.233 39.233 0 0 1-28.97-37.758A39.233 39.233 0 0 1 63.133.234a45.234 45.234 0 0 0-4.176-.232zm5.078.23a50.08 50.08 0 0 0-.383.014 39.233 39.233 0 0 1 .803.02 39.233 39.233 0 0 1 .482-.022 50.08 50.08 0 0 0-.902-.012zm1.154 0a39.233 39.233 0 0 0-39.234 39.234A39.233 39.233 0 0 0 48.002 74.68a39.233 39.233 0 0 1-.455-.187 33.464 33.464 0 0 0 2.168.978 33.464 33.464 0 0 1-6.91-5.937 33.464 33.464 0 0 0 22.846 9.164 33.464 33.464 0 0 0 33.463-33.463 33.464 33.464 0 0 0-8.371-22.086 33.464 33.464 0 0 1 10.371 24.086 33.464 33.464 0 0 1-5.799 18.742 36.002 36.002 0 0 0 8.875-23.512 36.002 36.002 0 0 0-36-36.002 36.002 36.002 0 0 0-25.113 10.406 36.002 36.002 0 0 1 .192-.205A36.002 36.002 0 0 1 70.19 4.462a36.002 36.002 0 0 1 36 36.002 36.002 36.002 0 0 1-2.4 12.67 45.234 45.234 0 0 1-44.833 39.334 45.234 45.234 0 0 1-44.756-38.717 50.08 50.08 0 0 0 49.834 46.641 50.08 50.08 0 0 0 50.08-50.08A50.08 50.08 0 0 0 73.986 1.23 39.233 39.233 0 0 0 65.19.232zm-2.462 9.31a23.54 23.54 0 0 1 16.949 7.372 23.54 23.54 0 0 0-14.95-5.373 23.54 23.54 0 0 0-23.538 23.54 23.54 23.54 0 0 0 5.45 14.817 19.138 19.138 0 0 1-1.794-8.072A19.138 19.138 0 0 1 63.98 22.687 19.138 19.138 0 0 1 83.12 41.824a19.138 19.138 0 0 1-19.14 19.139 19.138 19.138 0 0 1-17.075-10.578 23.54 23.54 0 0 1-7.717-17.307 23.54 23.54 0 0 1 23.539-23.54zm7 6.23h.002a20.54 20.54 0 0 1 20.539 20.54 20.54 20.54 0 0 1-6.475 14.8 20.54 20.54 0 0 0 4.475-12.8 20.54 20.54 0 0 0-20.54-20.54h-.001a20.54 20.54 0 0 0-12.74 4.441 20.54 20.54 0 0 1 14.74-6.441zm-29.78 4.968a27.925 27.925 0 0 0-7.529 18.957A27.925 27.925 0 0 0 60.342 67.62a27.925 27.925 0 0 0 19.135-7.675 27.925 27.925 0 0 1-21.135 9.675 27.925 27.925 0 0 1-24.697-15.037 27.925 27.925 0 0 1-.002 0 27.925 27.925 0 0 1-3.224-12.887 27.925 27.925 0 0 1 8.547-20.014 36.002 36.002 0 0 1 .005-.007 27.925 27.925 0 0 1 .977-.936zm11.149 5.676a20.54 20.54 0 0 0-.116.184 20.54 20.54 0 0 1 .116-.184zm32.617 24.777a20.54 20.54 0 0 1-.844.875 20.54 20.54 0 0 1-.313.281 20.54 20.54 0 0 0 1.156-1.156zm-3.92 3.645a20.54 20.54 0 0 1-.598.375 20.54 20.54 0 0 0 .598-.375zm-3.698 2.172a20.54 20.54 0 0 1-.955.334 20.54 20.54 0 0 0 .955-.334zm49.424 70.652c-.169 0-.253-.084-.422-.253l-2.786-4.222-1.52 1.604v2.618c0 .084-.084.253-.253.253h-2.11c-.085 0-.254-.084-.254-.253v-13.931c0-.085.084-.254.253-.254h2.11c.085 0 .254.085.254.254v8.274l3.8-4.053a.464.464 0 0 1 .421-.253h2.364c.085 0 .254.084.085.253l-3.546 3.715 3.968 6.079c.084.084.084.253-.085.253zm-17.31-2.53c-.253-.675-.422-1.435-.422-2.533s.084-1.857.422-2.533c.675-1.857 2.364-2.786 4.56-2.786 1.688 0 2.954.59 3.798 1.604.085.085.085.254-.084.254l-1.435 1.182c-.085.084-.254.084-.338-.085-.59-.59-1.098-.844-2.026-.844-1.014 0-1.773.422-2.11 1.35-.254.507-.254 1.098-.254 1.858s.084 1.35.253 1.942c.338.844 1.097 1.35 2.11 1.35.93 0 1.52-.337 2.027-.843.084-.085.253-.085.338-.085l1.435 1.182c.084.085.084.253.084.253-.844.93-2.195 1.52-3.799 1.52-2.195.085-3.884-.93-4.559-2.786zm-4.13 2.53c-.084 0-.253-.084-.253-.253v-.76c-.507.675-1.52 1.182-3.124 1.182-2.026 0-3.715-.93-3.715-3.124s1.69-3.293 4.39-3.293h2.195c.085 0 .085-.084.085-.084v-.507c0-1.182-.59-1.688-2.449-1.688-1.182 0-2.026.338-2.532.675-.085.085-.254.085-.338-.084l-.844-1.351c-.085-.084-.085-.253.084-.253.844-.591 2.11-1.013 3.884-1.013 3.377 0 4.56 1.097 4.56 3.546v6.585c0 .084-.086.253-.254.253zm-.253-3.377v-.76c0-.084-.085-.084-.085-.084h-1.857c-1.689 0-2.364.422-2.364 1.35 0 .845.675 1.267 1.942 1.267 1.435-.085 2.364-.591 2.364-1.773zm-9.46 3.637c-2.196 0-3.125-1.013-3.125-2.955v-5.403c0-.085-.084-.085-.084-.085h-.676c-.084 0-.253-.084-.253-.253v-1.435c0-.085.085-.254.253-.254h.676c.084 0 .084-.084.084-.084v-2.786c0-.085.085-.253.253-.253h2.111c.085 0 .253.084.253.253v2.786c0 .084.085.084.085.084h1.52c.084 0 .253.085.253.254v1.435c0 .084-.085.253-.253.253h-1.52c-.085 0-.085.085-.085.085v5.319c0 .675.338.928 1.014.928h.59c.085 0 .254.085.254.253v1.69c0 .083-.085.252-.253.252zm-16.295-1.78c-.084-.084-.084-.253-.084-.338l1.435-1.52c.084-.084.253-.084.338-.084 1.013.76 2.532 1.52 4.221 1.52 1.857 0 2.955-.844 2.955-2.11 0-1.014-.675-1.69-2.786-2.027l-.844-.085c-2.955-.422-4.644-1.688-4.644-4.052 0-2.617 2.11-4.39 5.235-4.39 1.941 0 3.8.59 4.98 1.435.085.084.085.169.085.253l-1.097 1.52c-.085.084-.254.084-.338.084-1.266-.76-2.448-1.097-3.715-1.097-1.604 0-2.448.76-2.448 1.942 0 1.013.76 1.688 2.87 1.94l.845.086c2.955.422 4.643 1.688 4.643 4.22s-2.026 4.476-5.825 4.476c-2.449.084-4.644-.76-5.826-1.773zm-8.02 1.52c-.085 0-.254-.084-.254-.253v-9.794c0-.084.084-.253.253-.253h2.11c.085 0 .254.084.254.253v.844h.084c.507-.76 1.52-1.35 2.87-1.35.845 0 1.774.337 2.28.844.085.084.085.253.085.253l-1.182 1.435c-.085.085-.253.085-.338.085-.506-.253-1.013-.507-1.688-.507-1.436 0-2.11.929-2.11 2.618v5.487c0 .085-.086.254-.254.254zm-11.23-2.53c-.253-.675-.422-1.435-.422-2.533s.084-1.857.422-2.533c.675-1.857 2.28-2.786 4.56-2.786s3.883 1.098 4.558 2.786c.253.676.422 1.436.422 3.124 0 .085-.084.253-.253.253h-6.923c-.084 0-.084.085-.084.085 0 .253.084.59.168.76.423 1.013 1.182 1.52 2.45 1.52s2.025-.423 2.616-.93c.085-.084.253-.084.422-.084l1.351 1.098c.084.084.084.253.084.253-.928 1.013-2.532 1.773-4.559 1.773-2.532.085-4.22-.928-4.812-2.786zm6.67-4.56c-.253-.843-1.098-1.35-2.11-1.35s-1.858.507-2.196 1.35c-.084.254-.084.507-.084.845 0 .085.084.085.084.085h4.39c.085 0 .085-.085.085-.085-.085-.253-.085-.59-.17-.844zm-17.814 5.74c-.085-.084-.085-.253 0-.253l1.35-1.267a.257.257 0 0 1 .338 0c.76.676 2.111 1.182 3.293 1.182 1.35 0 2.026-.506 2.026-1.182 0-.59-.422-1.013-1.857-1.097l-1.182-.085c-2.195-.253-3.377-1.266-3.377-2.955 0-1.941 1.52-3.292 4.221-3.292 1.69 0 3.124.506 4.137 1.182.085.084.085.253.085.253l-1.098 1.182c-.084.084-.253.084-.338.084-.675-.422-1.857-.844-2.87-.844-1.098 0-1.689.422-1.689 1.098 0 .59.422.928 1.858 1.097l1.182.085c2.28.253 3.377 1.35 3.377 2.955 0 2.026-1.604 3.46-4.644 3.46-2.28.086-3.883-.76-4.812-1.603zm-6.08 1.35c-.084 0-.252-.084-.252-.253l-2.11-6.586h-.086l-2.11 6.5c-.085.086-.085.254-.254.254H34.93c-.084 0-.253-.084-.253-.253l-3.462-9.793c-.084-.085.085-.254.17-.254h2.194c.17 0 .253.085.253.254l2.111 6.754h.085l2.11-6.754c.085-.085.17-.254.254-.254h1.688c.085 0 .253.085.253.254l2.196 6.754h.084l2.026-6.754c.085-.17.085-.254.254-.254h2.195c.084 0 .253.085.17.254l-3.379 9.793c-.084.085-.084.253-.253.253zm-20.515-2.53c-.253-.675-.422-1.35-.422-2.533s.084-1.857.422-2.533c.675-1.857 2.28-2.786 4.56-2.786s3.883 1.013 4.558 2.786c.253.676.422 1.35.422 2.533s-.084 1.858-.422 2.533c-.675 1.857-2.28 2.786-4.56 2.786-2.279 0-3.967-.93-4.558-2.786zm6.67-.591c.253-.507.253-1.013.253-1.857 0-.845-.085-1.351-.253-1.858-.338-.844-1.013-1.35-2.11-1.35-1.014 0-1.774.506-2.11 1.35-.255.59-.255 1.013-.255 1.858 0 .844.084 1.35.253 1.857.338.844 1.013 1.35 2.11 1.35 1.014 0 1.69-.506 2.112-1.35zm-14.69 3.12c-.086 0-.255-.083-.255-.252v-9.794c0-.084.085-.253.254-.253h2.11c.085 0 .254.084.254.253v.844h.084c.507-.76 1.52-1.35 2.87-1.35.845 0 1.774.337 2.28.844.084.084.084.253.084.253l-1.182 1.435c-.084.085-.253.085-.337.085-.507-.253-1.013-.507-1.689-.507-1.435 0-2.11.929-2.11 2.618v5.487c0 .085-.085.254-.254.254zM.058 113.65c0-.083.084-.252.253-.252h5.825c3.293 0 4.813 1.52 4.813 3.799 0 1.689-.844 2.533-1.858 3.04v.084c.93.337 2.111 1.52 2.111 3.292 0 2.87-1.942 4.222-5.319 4.222H.314c-.085 0-.254-.085-.254-.253V113.65zm5.994 5.742c1.35 0 2.195-.76 2.195-1.857 0-1.182-.844-1.942-2.195-1.942H2.93c-.084 0-.084.084-.084.084v3.546c0 .085.084.085.084.085-.084.084 3.124.084 3.124.084zm-3.208 6.079H6.14c1.52 0 2.364-.76 2.364-2.026 0-1.267-.845-2.027-2.364-2.027H2.846c-.085 0-.085.085-.085.085v3.715c-.084.253.085.253.085.253z"></path>
                </svg>
                <svg viewBox="0 0 128 128">
                  <path fill="#9f9fa9" d="M21.95 47.426a16.584 16.584 0 0 0-4.833.57A16.577 16.577 0 0 0 5.02 61.891a16.579 16.579 0 0 0 8.199 16.496 16.58 16.58 0 0 0 18.379-1.272c7.253-5.596 8.565-16.002 2.984-23.248a16.584 16.584 0 0 0-12.633-6.441zm6.952 6.18a2.48 2.48 0 0 1 1.493.511l-2.153 2.168a.209.209 0 0 0-.076.123v.004a.233.233 0 0 0-.006.045.217.217 0 0 0 0 .002v.002a.227.227 0 0 0 .006.027.217.217 0 0 0 .076.145l1.63 1.629a2.414 2.414 0 0 1-2.536-.38l-.008-.005c-.004-.004-.007-.01-.012-.014a.257.257 0 0 0-.007-.004 2.45 2.45 0 0 1-.118-.109 2.426 2.426 0 0 1-.52-2.64 2.424 2.424 0 0 1 2.231-1.505zm1.903.917c.35.425.543.96.543 1.516a2.43 2.43 0 0 1-.72 1.727 2.46 2.46 0 0 1-.278.23l-1.584-1.543 2.039-1.93zm-.159 1.106a.207.207 0 0 0-.084.02.247.247 0 0 0-.105.113c-.027.05-.012.105.012.152a.59.59 0 0 1-.07.621.184.184 0 0 0 0 .262.143.143 0 0 0 .113 0 .183.183 0 0 0 .18-.055.956.956 0 0 0 .124-1.008l.008-.004a.207.207 0 0 0-.178-.101zm-5.234 1.826a1.494 1.494 0 0 1 1.045.326 1.266 1.266 0 0 0-.73.356l-6.092 6.05L18.445 63c3.157-3.14 5.087-4.767 6.285-5.32a1.494 1.494 0 0 1 .682-.225zm1.082.768h.002a.769.769 0 0 1 .668.218.733.733 0 0 1 .065.069 1.567 1.567 0 0 1 .12.21.733.733 0 0 1 .006.014.733.733 0 0 1 .043.27.77.77 0 0 1-.261.555L20.64 65.21l-.694-.691 6.121-6.08a.769.769 0 0 1 .426-.217zm45.041.166a2.644 2.644 0 0 0-.547.05c-1.735.347-2.527 1.325-2.379 3.118.098 1.34.844 1.978 1.832 2.423.692.36 1.395.596 1.93 1.19a2.125 2.125 0 0 1 .445 2.226c-.3.843-.843 1.188-1.582 1.239-.793.039-1.438-.144-2.03-.79-.213-.25-.493-.45-.743-.154-.297.348-.047.694.148.944.65.788 1.484.986 2.524.986v-.012c.347-.1.89-.048 1.387-.396 1.089-.641 1.386-1.633 1.386-2.918 0-1.387-.593-2.336-1.683-2.871-.692-.344-1.434-.555-2.078-1.086-.496-.45-.595-1.04-.497-1.734.101-.692.606-1.04 1.141-1.137.645-.098 1.338-.098 1.98.25.299.144.64.343.79-.154.148-.43-.149-.727-.493-.829-.483-.184-.995-.34-1.53-.345zm36.342.02c-.527.032-.577.626-.717 1.04l-2.426 8.961c-.097.395-.246.891.25 1.086.493.137.543-.344.645-.691.593-1.798.593-1.797 2.273-1.797h.438c1.352 0 1.353 0 1.793 1.52.052.201.149.449.199.644.09.297.285.347.531.297.297-.051.348-.297.348-.645l-.008.028a5.705 5.705 0 0 0-.195-.891l-2.278-8.512c-.097-.442-.207-.989-.742-1.039a.81.81 0 0 0-.111-.002zm-48.373.032c-1.484 0-2.472.691-2.672 2.13-.297 2.22-.246 4.49 0 6.718.199 1.538 1.141 2.23 2.773 2.23 1.536 0 2.375-.757 2.622-2.277.15-1.087.052-2.124.101-3.207-.05-1.14.098-2.278-.152-3.465-.246-1.387-1.188-2.129-2.672-2.129zm20.441.004c-.245 0-.445.2-.445.496 0 .383.203.538.496.538s.642.046.938 0c.743-.102 1.089.197 1.039 1.134v7.969c0 .383 0 .828.496.828.446 0 .496-.433.496-.828v-8.115c0-.742.2-1.09.89-1.04.348.05.743 0 1.086 0 .301 0 .496-.187.496-.534 0-.293-.195-.448-.445-.448h-5.047zm-34.207.008c-.582 0-.828.246-.828.988v4.586l-.023.018v4.65c0 .395 0 .793.445.793s.492-.394.492-.742c0-.828.051-1.733 0-2.623-.047-.743.203-1.088.895-1.041.453.05.836 0 1.281 0 1.547-.098 2.438-1.12 2.488-2.918.051-2.625-.793-3.66-3.07-3.71h-1.68zm76.961.106c-.285 0-.481.152-.531.496-.051.246-.05.441-.05.691v5.8c0 .2.05.497-.196.599-.301.097-.3-.199-.399-.399-.148-.398-.347-.742-.496-1.137l-2.422-5.398c-.203-.395-.45-.744-.89-.594-.398.1-.348.548-.348.89v9.122c0 .394 0 .939.535.89.496 0 .395-.546.395-.89v-5.89c0-.35-.099-.743.2-1.04l.01-.02c.337.147.388.493.536.79l2.77 6.136c.2.446.407.988.94.793.494-.153.345-.69.345-1.09v-9.156c0-.297-.102-.543-.399-.593zm-30.531.029a.722.722 0 0 0-.176.033c-.445.15-.344.691-.344 1.086v9.305c.047.246.149.445.446.496.285 0 .481-.2.531-.496.05-.297.05-.596.05-.89v-5.99c0-.185-.05-.484.2-.53.195-.051.195.246.297.394l1.332 2.922c.152.344.199.738.598.738.28 0 .383-.394.53-.691l1.634-3.512.007-.016c.395.4.294.793.344 1.188v5.691c0 .5-.156 1.192.535 1.192.645 0 .493-.697.493-1.14v-8.61c0-.448.136-.989-.395-1.14-.543-.099-.793.347-.988.792l-1.52 3.266c-.152.297-.2.89-.644.89-.4-.062-.446-.593-.594-.89l-1.524-3.364c-.17-.389-.42-.744-.812-.724zm-65.664.113a.458.458 0 0 0-.09.082l.09-.082zm21.133.754c.476.006.933.12 1.328.516.746.789.742 1.78.496 2.818-.247 1.043-.789 1.389-2.227 1.389-1.386 0-1.386 0-1.386-1.586v-2.227c0-.348 0-.79.347-.79.471-.027.966-.126 1.442-.12zm11.824.068c1.138-.05 1.829.697 1.879 1.98v2.54c0 .891.05 1.742 0 2.574-.047 1.34-.741 2.028-1.88 2.028-1.104-.051-1.746-.747-1.796-2.028v-5.113c.066-1.29.712-1.98 1.797-1.98zm-32.057.52c-.484 1.785-2.84 4.182-5.326 6.535l-1-1 6.326-5.535zm80.541.621c.297 0 .247.344.297.594l.942 3.512c.343 1.234.293 1.285-.793 1.285h-.496l.003.02c-1.585 0-1.636 0-1.14-1.798l.793-2.968c.05-.301.097-.645.394-.645zm-89.86 2.68.028.025.985.985-2.575.552 1.563-1.562zm1.548 1.547.328.336a.302.302 0 0 0 .004.021l.017.002.3.305-1.534.232-.004-.008.889-.888zm1.012 1.103.98.97a34.022 34.022 0 0 1-6.91 4.45.387.387 0 0 0-.207.441l.277 1.204a.071.071 0 0 1 0 .093.083.083 0 0 1-.11 0l-1.628-1.656 5.045-5.117 2.553-.385zm-7.965 5.861.117.11 1.307 1.306-2.674-.173 1.25-1.243z"></path>
                </svg>
                <svg viewBox="0 0 128 128">
                  <path fill="#9f9fa9" d="M2 38.5h124v43.71H64v7.29H36.44v-7.29H2zm6.89 36.43h13.78V53.07h6.89v21.86h6.89V45.79H8.89zm34.44-29.14v36.42h13.78v-7.28h13.78V45.79zm13.78 7.29H64v14.56h-6.89zm20.67-7.29v29.14h13.78V53.07h6.89v21.86h6.89V53.07h6.89v21.86h6.89V45.79z"></path>
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
                  <path fill="#9f9fa9" d="M19.67 26l8.069 90.493 36.206 10.05 36.307-10.063L108.33 26H19.67zm69.21 50.488L86.53 98.38l.009 1.875L64 106.55v.001l-.018.015-22.719-6.225L39.726 83h11.141l.79 8.766 12.347 3.295-.004.015v-.032l12.394-3.495L77.702 77H51.795l-.222-2.355-.506-5.647L50.802 66h27.886l1.014-11H37.229l-.223-2.589-.506-6.03L36.235 43h55.597l-.267 3.334-2.685 30.154M89 14.374L81.851 6H89V1H73v4.363L81.39 13H73v5h16zm-19 0L63.193 6H70V1H55v4.363L62.733 13H55v5h15zM52 13h-8V6h8V1H38v17h14z"></path>
                </svg>
                <svg viewBox="0 0 128 128">
                  <path fill="#9f9fa9" d="M19.569 27l8.087 89.919 36.289 9.682 36.39-9.499L108.431 27H19.569zM91.61 47.471l-.507 5.834L90.88 56H48.311l1.017 12h40.54l-.271 2.231-2.615 28.909-.192 1.69L64 106.964v-.005l-.027.012-22.777-5.916L39.65 84h11.168l.791 8.46 12.385 3.139.006-.234v.012l12.412-2.649L77.708 79H39.153l-2.734-30.836L36.152 45h55.724l-.266 2.471zM27.956 1.627h5.622v5.556h5.144V1.627h5.623v16.822h-5.623v-5.633h-5.143v5.633h-5.623V1.627zm23.782 5.579h-4.95V1.627h15.525v5.579h-4.952v11.243h-5.623V7.206zm13.039-5.579h5.862l3.607 5.911 3.603-5.911h5.865v16.822h-5.601v-8.338l-3.867 5.981h-.098l-3.87-5.981v8.338h-5.502V1.627zm21.736 0h5.624v11.262h7.907v5.561H86.513V1.627z"></path>
                </svg>
                <svg viewBox="0 0 128 128">
                  <g fill="#9f9fa9"><path fillRule="evenodd" clipRule="evenodd" d="M64 1.512c-23.493 0-42.545 19.047-42.545 42.545 0 18.797 12.19 34.745 29.095 40.37 2.126.394 2.907-.923 2.907-2.047 0-1.014-.04-4.366-.058-7.92-11.837 2.573-14.334-5.02-14.334-5.02-1.935-4.918-4.724-6.226-4.724-6.226-3.86-2.64.29-2.586.29-2.586 4.273.3 6.523 4.385 6.523 4.385 3.794 6.504 9.953 4.623 12.38 3.536.383-2.75 1.485-4.628 2.702-5.69-9.45-1.075-19.384-4.724-19.384-21.026 0-4.645 1.662-8.44 4.384-11.42-.442-1.072-1.898-5.4.412-11.26 0 0 3.572-1.142 11.7 4.363 3.395-.943 7.035-1.416 10.65-1.432 3.616.017 7.258.49 10.658 1.432 8.12-5.504 11.688-4.362 11.688-4.362 2.316 5.86.86 10.187.418 11.26 2.728 2.978 4.378 6.774 4.378 11.42 0 16.34-9.953 19.938-19.427 20.99 1.526 1.32 2.886 3.91 2.886 7.88 0 5.692-.048 10.273-.048 11.674 0 1.13.766 2.458 2.922 2.04 16.896-5.632 29.07-21.574 29.07-40.365C106.545 20.56 87.497 1.512 64 1.512z"></path><path d="M37.57 62.596c-.095.212-.428.275-.73.13-.31-.14-.482-.427-.382-.64.09-.216.424-.277.733-.132.31.14.486.43.38.642zM39.293 64.52c-.203.187-.6.1-.87-.198-.278-.297-.33-.694-.124-.884.208-.188.593-.1.87.197.28.3.335.693.123.884zm1.677 2.448c-.26.182-.687.012-.95-.367-.262-.377-.262-.83.005-1.013.264-.182.684-.018.95.357.262.385.262.84-.005 1.024zm2.298 2.368c-.233.257-.73.188-1.093-.163-.372-.343-.475-.83-.242-1.087.237-.257.736-.185 1.102.163.37.342.482.83.233 1.086zm3.172 1.374c-.104.334-.582.485-1.064.344-.482-.146-.796-.536-.7-.872.1-.336.582-.493 1.067-.342.48.144.795.53.696.87zm3.48.255c.013.35-.396.642-.902.648-.508.012-.92-.272-.926-.618 0-.354.4-.642.908-.65.506-.01.92.272.92.62zm3.24-.551c.06.342-.29.694-.793.787-.494.092-.95-.12-1.014-.46-.06-.35.297-.7.79-.792.503-.088.953.118 1.017.466zm0 0"></path></g><path d="M24.855 108.302h-10.7a.5.5 0 00-.5.5v5.232a.5.5 0 00.5.5h4.173v6.5s-.937.32-3.53.32c-3.056 0-7.327-1.116-7.327-10.508 0-9.393 4.448-10.63 8.624-10.63 3.614 0 5.17.636 6.162.943.31.094.6-.216.6-.492l1.193-5.055a.468.468 0 00-.192-.39c-.403-.288-2.857-1.66-9.058-1.66-7.144 0-14.472 3.038-14.472 17.65 0 14.61 8.39 16.787 15.46 16.787 5.854 0 9.405-2.502 9.405-2.502.146-.08.162-.285.162-.38v-16.316a.5.5 0 00-.5-.5zM79.506 94.81H73.48a.5.5 0 00-.498.503l.002 11.644h-9.392V95.313a.5.5 0 00-.497-.503H57.07a.5.5 0 00-.498.503v31.53c0 .277.224.503.498.503h6.025a.5.5 0 00.497-.504v-13.486h9.392l-.016 13.486c0 .278.224.504.5.504h6.038a.5.5 0 00.497-.504v-31.53a.497.497 0 00-.497-.502zm-47.166.717c-2.144 0-3.884 1.753-3.884 3.923 0 2.167 1.74 3.925 3.884 3.925 2.146 0 3.885-1.758 3.885-3.925 0-2.17-1.74-3.923-3.885-3.923zm2.956 9.608H29.29c-.276 0-.522.284-.522.56v20.852c0 .613.382.795.876.795h5.41c.595 0 .74-.292.74-.805v-20.899a.5.5 0 00-.498-.502zm67.606.047h-5.98a.5.5 0 00-.496.504v15.46s-1.52 1.11-3.675 1.11-2.727-.977-2.727-3.088v-13.482a.5.5 0 00-.497-.504h-6.068a.502.502 0 00-.498.504v14.502c0 6.27 3.495 7.804 8.302 7.804 3.944 0 7.124-2.18 7.124-2.18s.15 1.15.22 1.285c.07.136.247.273.44.273l3.86-.017a.502.502 0 00.5-.504l-.003-21.166a.504.504 0 00-.5-.502zm16.342-.708c-3.396 0-5.706 1.515-5.706 1.515V95.312a.5.5 0 00-.497-.503H107a.5.5 0 00-.5.503v31.53a.5.5 0 00.5.503h4.192c.19 0 .332-.097.437-.268.103-.17.254-1.454.254-1.454s2.47 2.34 7.148 2.34c5.49 0 8.64-2.784 8.64-12.502s-5.03-10.988-8.428-10.988zm-2.36 17.764c-2.073-.063-3.48-1.004-3.48-1.004v-9.985s1.388-.85 3.09-1.004c2.153-.193 4.228.458 4.228 5.594 0 5.417-.935 6.486-3.837 6.398zm-63.689-.118c-.263 0-.937.107-1.63.107-2.22 0-2.973-1.032-2.973-2.368v-8.866h4.52a.5.5 0 00.5-.504v-4.856a.5.5 0 00-.5-.502h-4.52l-.007-5.97c0-.227-.116-.34-.378-.34h-6.16c-.238 0-.367.106-.367.335v6.17s-3.087.745-3.295.805a.5.5 0 00-.36.48v3.877a.5.5 0 00.497.503h3.158v9.328c0 6.93 4.86 7.61 8.14 7.61 1.497 0 3.29-.48 3.586-.59.18-.067.283-.252.283-.453l.004-4.265a.51.51 0 00-.5-.502z" fill="#9f9fa9"></path>
                </svg>
                <svg viewBox="0 0 128 128">
                  <path fill="#9f9fa9" d="M117.688 98.242c-6.973-.191-12.297.461-16.852 2.379-1.293.547-3.355.559-3.566 2.18.711.746.82 1.859 1.387 2.777 1.086 1.754 2.922 4.113 4.559 5.352 1.789 1.348 3.633 2.793 5.551 3.961 3.414 2.082 7.223 3.27 10.504 5.352 1.938 1.23 3.859 2.777 5.75 4.164.934.684 1.563 1.75 2.773 2.18v-.195c-.637-.812-.801-1.93-1.387-2.777l-2.578-2.578c-2.52-3.344-5.719-6.281-9.117-8.719-2.711-1.949-8.781-4.578-9.91-7.73l-.199-.199c1.922-.219 4.172-.914 5.949-1.391 2.98-.797 5.645-.59 8.719-1.387l4.164-1.187v-.793c-1.555-1.594-2.664-3.707-4.359-5.152-4.441-3.781-9.285-7.555-14.273-10.703-2.766-1.746-6.184-2.883-9.117-4.363-.988-.496-2.719-.758-3.371-1.586-1.539-1.961-2.379-4.449-3.566-6.738-2.488-4.793-4.93-10.023-7.137-15.066-1.504-3.437-2.484-6.828-4.359-9.91-9-14.797-18.687-23.73-33.695-32.508-3.195-1.867-7.039-2.605-11.102-3.57l-6.543-.395c-1.332-.555-2.715-2.184-3.965-2.977C16.977 3.52 4.223-3.312.539 5.672-1.785 11.34 4.016 16.871 6.09 19.746c1.457 2.012 3.32 4.273 4.359 6.539.688 1.492.805 2.984 1.391 4.559 1.438 3.883 2.695 8.109 4.559 11.695.941 1.816 1.98 3.727 3.172 5.352.727.996 1.98 1.438 2.18 2.973-1.227 1.715-1.297 4.375-1.984 6.543-3.098 9.77-1.926 21.91 2.578 29.137 1.383 2.223 4.641 6.98 9.117 5.156 3.918-1.598 3.043-6.539 4.164-10.902.254-.988.098-1.715.594-2.379v.199l3.57 7.133c2.641 4.254 7.324 8.699 11.297 11.699 2.059 1.555 3.68 4.242 6.344 5.152v-.199h-.199c-.516-.805-1.324-1.137-1.98-1.781-1.551-1.523-3.277-3.414-4.559-5.156-3.613-4.902-6.805-10.27-9.711-15.855-1.391-2.668-2.598-5.609-3.77-8.324-.453-1.047-.445-2.633-1.387-3.172-1.281 1.988-3.172 3.598-4.164 5.945-1.582 3.754-1.789 8.336-2.375 13.082-.348.125-.195.039-.398.199-2.762-.668-3.73-3.508-4.758-5.949-2.594-6.164-3.078-16.09-.793-23.191.59-1.836 3.262-7.617 2.18-9.316-.516-1.691-2.219-2.672-3.172-3.965-1.18-1.598-2.355-3.703-3.172-5.551-2.125-4.805-3.113-10.203-5.352-15.062-1.07-2.324-2.875-4.676-4.359-6.738-1.645-2.289-3.484-3.977-4.758-6.742-.453-.984-1.066-2.559-.398-3.566.215-.684.516-.969 1.191-1.191 1.148-.887 4.352.297 5.547.793 3.18 1.32 5.832 2.578 8.527 4.363 1.289.855 2.598 2.512 4.16 2.973h1.785c2.789.641 5.914.195 8.523.988 4.609 1.402 8.738 3.582 12.488 5.949 11.422 7.215 20.766 17.48 27.156 29.734 1.027 1.973 1.473 3.852 2.379 5.945 1.824 4.219 4.125 8.559 5.941 12.688 1.816 4.113 3.582 8.27 6.148 11.695 1.348 1.801 6.551 2.766 8.918 3.766 1.66.699 4.379 1.43 5.949 2.379 3 1.809 5.906 3.965 8.723 5.945 1.402.992 5.73 3.168 5.945 4.957zm-88.605-75.52c-1.453-.027-2.48.156-3.566.395v.199h.195c.695 1.422 1.918 2.34 2.777 3.566l1.98 4.164.199-.195c1.227-.867 1.789-2.25 1.781-4.363-.492-.52-.562-1.164-.992-1.785-.562-.824-1.66-1.289-2.375-1.98zm0 0"></path>
                </svg>
                <svg viewBox="0 0 128 128">
                  <path fill="#9f9fa9" d="M53.595 67.817c-13.224 3.694 8.044 11.325 24.88 4.112-2.757-1.071-4.735-2.309-4.735-2.309-7.508 1.419-10.99 1.531-17.805.753-5.625-.644-2.34-2.556-2.34-2.556zm22.864-7.207c-9.95 1.915-15.698 1.854-22.979 1.103-5.629-.582-1.944-3.311-1.944-3.311-14.563 4.834 8.106 10.318 28.459 4.365-2.162-.761-3.536-2.157-3.536-2.157zm7.799-41.731s-29.439 7.351-15.38 23.552c4.151 4.778-1.088 9.074-1.088 9.074s10.533-5.437 5.696-12.248c-4.518-6.349-7.982-9.502 10.772-20.378zM37.48 81.305c34.324 5.563 62.567-2.506 53.666-6.523 0 0 2.431 2.005-2.679 3.555-9.715 2.943-40.444 3.831-48.979.117-3.066-1.335 2.687-3.187 4.496-3.576 1.887-.409 2.965-.334 2.965-.334-3.412-2.404-22.055 4.718-9.469 6.761zm41.868-27.42c1.65-1.126 3.93-2.104 3.93-2.104s-6.492 1.161-12.961 1.704c-7.918.664-16.412.795-20.676.225-10.095-1.35 5.534-5.063 5.534-5.063s-6.07-.411-13.533 3.199c-8.827 4.269 21.832 6.214 37.706 2.039zm3.865 10.432c-.074.2-.322.425-.322.425 21.546-5.664 13.624-19.965 3.322-16.345-.903.319-1.378 1.063-1.378 1.063s.571-.23 1.845-.496c5.207-1.084 12.669 6.972-3.467 15.353zM65.006 48.492c-3.179-7.186-13.957-13.471.005-24.498 17.41-13.742 8.476-22.682 8.476-22.682 3.604 14.197-12.711 18.486-18.6 27.328-4.01 6.024 1.969 12.499 10.119 19.852zm18.79 35.651c-13.219 2.488-29.524 2.199-39.191.603 0 0 1.98 1.64 12.157 2.294 15.484.99 39.269-.551 39.832-7.878 0-.001-1.082 2.776-12.798 4.981zM51.131 99.535c-2.887 0-5.351.714-7.408 1.622l.624 2.493c1.619-.595 3.618-1.147 5.674-1.147 2.85 0 3.979 1.147 3.979 3.521V108h-1.2c-6.921 0-10.044 2.585-10.044 6.624 0 3.479 2.059 5.407 5.933 5.407 2.49 0 4.351-.845 6.088-2.35l.316 2.319H58v-14.492c0-3.599-1.924-5.973-6.869-5.973zM54 115.037c-1 1.266-2.893 1.978-4.279 1.978-1.973 0-2.988-1.371-2.988-3.27 0-2.056 1.202-3.745 5.794-3.745H54v5.037zm15.611.644l-.835-3.608L65.02 100h-4.39l6.051 20h5.026c2.884-7 4.943-14 6.086-20h-4.271c-.671 5-2.016 10.424-3.911 15.681zm18.404-16.146c-2.889 0-5.411.714-7.467 1.622l.596 2.493c1.621-.595 3.722-1.147 5.778-1.147 2.846 0 4.078 1.147 4.078 3.521V108h-1.428c-6.923 0-10.045 2.585-10.045 6.624 0 3.479 2.056 5.407 5.93 5.407 2.492 0 4.349-.845 6.091-2.35l.318 2.319H95v-14.492c0-3.599-2.044-5.973-6.985-5.973zm-1.411 17.462c-1.975 0-3.046-1.363-3.046-3.261 0-2.055 1.149-3.736 5.736-3.736H91v5h-.067c-1.465 1-2.947 1.997-4.329 1.997zM36 115.373c0 3.271-.445 4.638-.979 5.701-.615 1.193-2.053 2.475-3.601 3.269l1.934 2.345c2.032-.749 3.943-2.078 5.092-3.757 1.15-1.723 1.554-3.491 1.554-7.867V93h-4v22.373z"></path>
                </svg>
              </div>
              <div className="flex gap-16 items-center shrink-0 text-[#9f9fa9] pr-16" aria-hidden="true">
                <svg viewBox="0 0 128 128">
                  <path fill="#9f9fa9" d="M0 51.098V76.86h4.422V56.604L20.73 76.87h27.694v-4.113H30.553v-6.801h14.37v-4.113h-14.37v-6.621h17.87v-4.116H26.13v4.116h.002V76.68L5.527 51.098H0zm85.09.01v4.115h9.03v21.65h4.42v-21.65h8.847v-4.116H85.09zm-31.322.011 20.73 25.764h5.803L69.936 64.01l10.35-12.871-5.79.01-7.459 9.261-7.48-9.29h-5.79zm70.158 14.598c-.761 0-1.445.128-2.051.394-.602.263-1.078.633-1.426 1.108-.35.476-.525 1.032-.525 1.664 0 .77.258 1.384.78 1.847.517.464 1.227.809 2.124 1.036l1.24.312a7.02 7.02 0 0 1 1.026.334 1.91 1.91 0 0 1 .683.461 1.034 1.034 0 0 1 .248.697 1.25 1.25 0 0 1-.283.803 1.77 1.77 0 0 1-.76.535 3.11 3.11 0 0 1-1.132.192 3.24 3.24 0 0 1-1.116-.182 1.902 1.902 0 0 1-.804-.557 1.63 1.63 0 0 1-.352-.931h-1.941c.027.71.216 1.316.566 1.812s.836.873 1.46 1.13c.62.26 1.357.39 2.202.39.875 0 1.619-.136 2.233-.4.617-.27 1.088-.643 1.414-1.118.327-.479.488-1.028.488-1.658 0-.466-.09-.872-.266-1.217a2.726 2.726 0 0 0-.72-.887 4.227 4.227 0 0 0-1.028-.607 7.09 7.09 0 0 0-1.19-.385l-1.02-.25a6.975 6.975 0 0 1-.667-.195 2.82 2.82 0 0 1-.597-.285 1.304 1.304 0 0 1-.43-.418 1.037 1.037 0 0 1-.158-.58 1.21 1.21 0 0 1 .238-.717c.156-.21.385-.376.678-.5a2.771 2.771 0 0 1 1.056-.184c.585 0 1.062.126 1.43.383a1.424 1.424 0 0 1 .623 1.07h1.9a2.775 2.775 0 0 0-.513-1.607c-.333-.466-.792-.833-1.377-1.096-.584-.265-1.26-.394-2.033-.394zm-7.998.144v7.55c-.003.377-.062.697-.176.954a1.25 1.25 0 0 1-.506.584c-.218.133-.488.2-.803.2-.29 0-.546-.057-.771-.17a1.247 1.247 0 0 1-.522-.481 1.474 1.474 0 0 1-.195-.75h-1.963c0 .661.147 1.213.447 1.656a2.768 2.768 0 0 0 1.211 1.002 4.22 4.22 0 0 0 1.72.34c.697 0 1.311-.134 1.835-.4a2.97 2.97 0 0 0 1.236-1.149c.293-.499.444-1.093.448-1.787v-7.549h-1.961zm-53.332.059-8.844 10.982h5.805l5.937-7.38-2.898-3.602zm45.785 8.498c-.324 0-.6.112-.83.336a1.07 1.07 0 0 0-.344.807 1.082 1.082 0 0 0 .344.818c.23.225.506.336.83.336a1.105 1.105 0 0 0 .574-.156c.177-.101.318-.24.428-.416a1.115 1.115 0 0 0 .166-.582 1.097 1.097 0 0 0-.354-.807 1.133 1.133 0 0 0-.814-.336z"></path>
                </svg>
                <svg viewBox="0 0 128 128">
                  <g fill="#9f9fa9"><circle cx="64" cy="47.5" r="9.3"></circle><path d="M64 81.7C71.3 88.8 78.5 93 84.3 93c1.9 0 3.7-.4 5.2-1.3 5.2-3 7.1-10.5 5.3-21.2-.3-1.9-.7-3.8-1.2-5.8 2-.6 3.8-1.2 5.6-1.8 10.1-3.9 15.7-9.3 15.7-15.2 0-6-5.6-11.4-15.7-15.2-1.8-.7-3.6-1.3-5.6-1.8.5-2 .9-3.9 1.2-5.8 1.7-10.9-.2-18.5-5.4-21.5-1.5-.9-3.3-1.3-5.2-1.3-5.7 0-13 4.2-20.3 11.3C56.7 6.3 49.5 2.1 43.7 2.1c-1.9 0-3.7.4-5.2 1.3-5.2 3-7.1 10.5-5.3 21.2.3 1.9.7 3.8 1.2 5.8-2 .6-3.8 1.2-5.6 1.8-10.1 3.9-15.7 9.3-15.7 15.2 0 6 5.6 11.4 15.7 15.2 1.8.7 3.6 1.3 5.6 1.8-.5 2-.9 3.9-1.2 5.8-1.7 10.7.2 18.3 5.3 21.2 1.5.9 3.3 1.3 5.2 1.3 5.8.2 13-4 20.3-11zm-5.6-13.5c1.8.1 3.7.1 5.6.1 1.9 0 3.8 0 5.6-.1-1.8 2.4-3.7 4.6-5.6 6.7-1.9-2.1-3.8-4.3-5.6-6.7zM46 57.9c1 1.7 1.9 3.3 3 4.9-3.1-.4-6-.9-8.8-1.5.9-2.7 1.9-5.5 3.1-8.3.8 1.6 1.7 3.3 2.7 4.9zm-5.8-24.1c2.8-.6 5.7-1.1 8.8-1.5-1 1.6-2 3.2-3 4.9-1 1.7-1.9 3.3-2.7 5-1.3-2.9-2.3-5.7-3.1-8.4zm5.5 13.7c1.3-2.7 2.7-5.4 4.3-8.1 1.5-2.6 3.2-5.2 4.9-7.8 3-.2 6-.3 9.1-.3 3.2 0 6.2.1 9.1.3 1.8 2.6 3.4 5.2 4.9 7.8 1.6 2.7 3 5.4 4.3 8.1-1.3 2.7-2.7 5.4-4.3 8.1-1.5 2.6-3.2 5.2-4.9 7.8-3 .2-6 .3-9.1.3-3.2 0-6.2-.1-9.1-.3-1.8-2.6-3.4-5.2-4.9-7.8-1.6-2.7-3-5.4-4.3-8.1zm39.1-5.4l-2.7-5c-1-1.7-1.9-3.3-3-4.9 3.1.4 6 .9 8.8 1.5-.9 2.8-1.9 5.6-3.1 8.4zm0 10.8c1.2 2.8 2.2 5.6 3.1 8.3-2.8.6-5.7 1.1-8.8 1.5 1-1.6 2-3.2 3-4.9.9-1.5 1.8-3.2 2.7-4.9zm2.3 34.7c-.8.5-1.8.7-2.9.7-4.9 0-11-4-17-10 2.9-3.1 5.7-6.6 8.5-10.5 4.7-.4 9.2-1.1 13.4-2.1.5 1.8.8 3.6 1.1 5.4 1.4 8.5.3 14.6-3.1 16.5zm5.2-52.7c11.2 3.2 17.9 8.1 17.9 12.6 0 3.9-4.6 7.8-12.7 10.9-1.6.6-3.4 1.2-5.2 1.7-1.3-4.1-2.9-8.3-4.9-12.6 2-4.3 3.7-8.5 4.9-12.6zm-8-28.2c1.1 0 2 .2 2.9.7 3.3 1.9 4.5 7.9 3.1 16.5-.3 1.7-.7 3.5-1.1 5.4-4.2-.9-8.7-1.6-13.4-2.1-2.7-3.9-5.6-7.4-8.5-10.5 6-5.9 12.1-10 17-10zM69.6 26.8c-1.8-.1-3.7-.1-5.6-.1s-3.8 0-5.6.1c1.8-2.4 3.7-4.6 5.6-6.7 1.9 2.1 3.8 4.4 5.6 6.7zM40.9 7.4c.8-.5 1.8-.7 2.9-.7 4.9 0 11 4 17 10-2.9 3.1-5.7 6.6-8.5 10.5-4.7.4-9.2 1.1-13.4 2.1-.5-1.8-.8-3.6-1.1-5.4-1.4-8.5-.3-14.5 3.1-16.5zm-5.2 52.7C24.5 56.9 17.8 52 17.8 47.5c0-3.9 4.6-7.8 12.7-10.9 1.6-.6 3.4-1.2 5.2-1.7 1.3 4.1 2.9 8.3 4.9 12.6-2 4.3-3.7 8.6-4.9 12.6zm2.1 11c.3-1.7.7-3.5 1.1-5.4 4.2.9 8.7 1.6 13.4 2.1 2.7 3.9 5.6 7.4 8.5 10.5-6 5.9-12.1 10-17 10-1.1 0-2-.2-2.9-.7-3.4-1.9-4.5-8-3.1-16.5zm-4.2 41.2c2.2-2.7 2.3-5.7 1.1-8.7-1.2-3-3.7-4.4-6.8-4.5-3.7-.1-7.5 0-11.2 0H16V125h3v-9.8h4.7c.6 0 1.1.2 1.4.7l6 9.3c.1.2.4.5.6.5h3.9c-2.4-3.7-4.7-7.2-7.1-10.8 2.1-.3 3.9-1 5.1-2.6zm-14.6-.2v-9.9h1.1c2.3 0 4.7-.1 7 .1 2.7.1 4.6 2.2 4.6 4.9s-2.2 4.8-4.9 4.9c-2.4.1-4.8 0-7.8 0zm38.7 1.3c-1.6-7-8-8.8-12.9-6.6-3.8 1.7-5.5 5-5.6 9.1-.1 3.1.8 5.9 3.2 8 2.7 2.4 6 2.7 9.4 2.1 1.9-.4 3.6-1.3 4.9-2.7-.5-.7-1-1.4-1.5-2-2.8 2.4-5.9 3.2-9.3 1.6-2.2-1.1-3.3-3.8-3.5-5.8h15.5v-1.3c.1-.9 0-1.7-.2-2.4zM42.6 115c-.3-3 2.7-6.2 6-6.2 3.8-.1 6.2 2.2 6.3 6.2H42.6zm30.7-8.7c-1.5-.3-3.1-.4-4.6-.3-2.4.2-4.5 1.3-6.2 3.1.5.7.9 1.4 1.5 2.2.2-.2.4-.4.6-.5 1.6-1.5 3.5-2.3 5.8-2.1 1.8.1 3.5.7 4 2.5.4 1.4.3 2.9.4 4.4-.3 0-.4-.1-.5-.2-2.4-2-5.1-2.4-8-1.7-2.7.7-4.4 2.8-4.6 5.5-.2 3.1 1.2 5.4 3.9 6.5 1.7.7 3.6.7 5.4.3 1.4-.3 2-1.1 4-2.2v1.3h2.8c0-4 .1-8.9 0-13.5 0-2.9-1.7-4.7-4.5-5.3zm1.4 12.6c-.1.3 0 .6 0 .9 0 2.1-.5 2.8-2.5 3.6-1.4.5-2.9.7-4.4.2-1.7-.5-2.9-2-2.9-3.7-.1-1.7 1-3.4 2.7-3.9 2.3-.8 4.4-.3 6.3 1.1.6.5 1 1 .8 1.8zm15.6-9.9c2.6-.8 5-.3 6.8 1.9l.3.2c.7-.6 1.3-1.2 2.1-1.9-.3-.3-.4-.5-.6-.8-2.9-3.1-8.6-3.5-12.1-1-4.9 3.6-4.8 10.6-2.4 14.3 2.3 3.5 5.6 4.7 9.5 4.2 2.3-.3 4.2-1.4 5.7-3.3-.7-.6-1.4-1.2-2.1-1.9-.2.2-.3.3-.4.5-2.7 3-7.2 2.7-9.6-.5-1.4-1.9-1.7-4.1-1.3-6.3.2-2.5 1.5-4.5 4.1-5.4zm20.8 13.6c-.2.1-.3.2-.3.2-.8.6-1.6.7-2.5.4-.9-.4-1-1.2-1.1-2v-11.4c0-.2 0 .2.1-.8h3.8v-3h-4v-5h-3v5.4h-2.6c-.2 0-.5.2-.5.4-.1.7 0 1.2 0 2.2h3.2v12.8c0 1.6.4 3 1.8 3.8 1.5.9 4.4.7 5.7-.4.2-.1.3-.5.3-.6-.3-.6-.6-1.3-.9-2z"></path></g>
                </svg>
                <svg viewBox="0 0 128 128">
                  <path fillRule="evenodd" clipRule="evenodd" fill="#9f9fa9" d="M82.803 34.23c-2.604-8.108-6.781-15.284-12.667-21.459-1.488-1.562-3.142-2.993-4.18-4.936-.656-1.23-1.281-2.477-1.92-3.715l-.406-1.021-.113.402c-.053 2.02-1.197 3.389-2.621 4.668-1.604 1.438-3.096 3-4.636 4.509l-4.736 6.229-3.829 7.042-2.561 6.915-.077.107c-1.409 4.629-2.104 9.389-2.445 14.195-.129 1.807.019 3.639.12 5.455.145 2.596.596 5.147 1.272 7.66 2.457 9.126 7.444 16.695 14.263 23.127 1.266 1.195 2.635 2.282 3.956 3.418l.585 2.008.544 3.116.26 3.253c-.003.66-.03 1.323.009 1.981.011.169.231.325.355.487l1.104.388 1.149.447-.197-2.891-.009-2.848.397-4.338.288-.944.825-1.461c1.018-.818 2.109-1.562 3.036-2.473 1.677-1.647 3.351-3.317 4.852-5.122a38.489 38.489 0 004.969-7.636c.899-1.833 1.747-3.703 2.448-5.618.618-1.688 1.001-3.463 1.488-5.2l.128-.375c1.005-4.688 1.174-9.424.805-14.19-.297-3.841-1.2-7.548-2.456-11.18zm-19.9 50.275c.154-.771.345-1.538.484-2.312-.139.774-.329 1.541-.484 2.312zm3.417.532l-.646-1.415.646 1.415.949.811-.949-.811zm40.154 17.927c-.826-1.583-2.038-2.785-3.64-3.574-1.342-.66-2.785-.95-4.269-.992-1.112-.032-2.228.025-3.342.039-.989.012-1.979.029-2.968.02-1.163-.012-2.326-.047-3.489-.08-.193-.006-.33.033-.42.229-.141.305-.308.599-.481.933l.194.062c.577.102 1.157.189 1.731.304.738.147 1.07.571 1.104 1.193.05.886.07 1.774.067 2.662-.015 3.514-.04 7.028-.066 10.541-.002.232-.006.474-.069.692-.073.252-.152.578-.34.702a2.907 2.907 0 01-1.115.425c-.561.092-.655.117-.83.669l-.076.276c-.084.301-.039.36.275.363 1.802.02 3.603.059 5.404.053 1.643-.006 3.286.094 4.923-.215 1.547-.291 2.991-.801 4.309-1.664 1.71-1.121 2.94-2.619 3.589-4.574.524-1.579.641-3.19.463-4.841a8.928 8.928 0 00-.954-3.223zm-3.157 9.661c-.964 1.794-2.402 2.992-4.457 3.308-1.287.197-2.576.14-3.803-.347-.777-.308-1.066-.979-1.09-1.772a82.426 82.426 0 01-.033-2.332c-.004-2.734-.004-5.468 0-8.201.002-.861.017-1.724.031-2.586.01-.606.137-.809.728-.858 2.596-.218 5.073.062 7.13 1.889 1.272 1.13 1.996 2.571 2.297 4.226.125.69.163 1.396.241 2.096-.063 1.598-.279 3.153-1.044 4.577zm21.789-2.961c-.512-1.246-1.482-2.027-2.701-2.527-.416-.171-.845-.312-1.294-.478l.157-.1c.485-.311 1.025-.562 1.443-.945 1.016-.931 1.438-2.102 1.24-3.493-.188-1.323-.848-2.294-2.027-2.924-1.07-.57-2.224-.778-3.418-.777-2.066.002-4.133.033-6.199.037-.712.001-1.424-.052-2.136-.062-.138-.002-.343.033-.402.125-.163.25-.271.538-.387.816-.067.162-.001.251.184.275.497.068.993.153 1.491.227.688.103 1.021.461 1.063 1.154l.009.411c.001 2.155.008 4.31-.001 6.465a926.932 926.932 0 01-.061 6.456c-.003.271-.04.543-.079.812-.059.406-.276.686-.692.774l-1.177.232c-.139.028-.34.024-.397.11-.216.323-.39.676-.366 1.102l.121.033 3.953.097.793-.003c1.368-.016 2.738.011 4.104-.059 1.479-.074 2.868-.513 4.152-1.268 1.367-.805 2.419-1.866 2.793-3.462.24-1.019.241-2.044-.166-3.028zm-10.043-9.181c.006-.433.197-.621.627-.632 1.059-.029 2.111-.023 3.133.342 1.322.472 2.135 1.612 2.12 3.005-.007.535.001 1.065-.196 1.579-.389 1.012-1.135 1.546-2.193 1.65-.552.056-1.109.062-1.601.088l-1.642-.072c-.218-.008-.313-.104-.312-.328l.064-5.632zm6.806 13.494c-.529 1.151-1.493 1.756-2.7 1.966a6.823 6.823 0 01-2.892-.127c-.706-.181-.994-.748-1.135-1.377-.095-.421-.079-.922-.087-1.36-.013-.676-.003-2.079-.003-2.079h-.014c0-1 .003-1.866-.003-2.825-.001-.207.034-.31.287-.302.898.027 1.799.042 2.697.077.803.031 1.555.269 2.262.65 1.076.58 1.724 1.468 1.902 2.688.136.925.078 1.835-.314 2.689zm-98.587 1.078l.019-5.437c.003-.818-.101-1.62-.369-2.396-.739-2.137-2.777-3.11-4.899-2.343-.965.349-1.83.878-2.656 1.478-.481.35-.481.35-.829-.149-.985-1.412-2.392-1.895-4.03-1.374-1.059.336-1.985.911-2.862 1.579-.082.062-.247.131-.296.094-.082-.061-.139-.206-.137-.315l.06-.966c.005-.203-.034-.407-.054-.62-.396.137-.712.274-1.043.354-1.023.25-2.053.48-3.082.715-.249.057-.512.132-.536.418-.025.281.246.328.456.412.442.178.881.367 1.318.559.367.162.504.455.502.849-.007 1.685.004 3.368-.006 5.053-.004.685-.036 1.369-.067 2.054-.028.607-.235.861-.823 1.014-.312.082-.629.137-.943.211-.069.016-.187.06-.188.094-.013.297-.029.601.021.89.01.052.324.052.498.072l.117-.007c1.212-.018 2.424-.037 3.637-.05.643-.007 1.285-.001 1.983-.001l.075-.97c-.4-.073-.757-.128-1.109-.205-.549-.12-.783-.411-.797-.965l-.01-.793c-.006-2.057-.014-4.113-.014-6.17 0-.299.124-.536.387-.715.557-.376 1.145-.675 1.796-.842 1.372-.351 2.562.137 3.09 1.304.167.368.298.775.335 1.175.194 2.062.11 4.126-.007 6.188-.025.445-.234.669-.673.778l-1.032.218c-.083.021-.204-.035-.21.034-.023.285-.01.722-.01.722h.246l3.142.103c.861-.002 1.723.102 2.583.124.154.003.291.026.3-.152a8.492 8.492 0 00-.011-.829l-.164-.029-.885-.199c-.597-.141-.803-.368-.805-.972-.007-1.489.013-2.977 0-4.465a45.225 45.225 0 00-.095-2.551c-.015-.226.02-.374.2-.501a5.311 5.311 0 011.732-.835c1.935-.51 3.519.551 3.619 2.546.098 1.924.057 3.855.042 5.783-.005.671-.227.874-.888 1.054l-.228.059c-.677.162-.671.162-.631.881.013.225.075.283.315.277 1.379-.031 2.758-.039 4.137-.051.564-.005 1.128 0 1.742 0l.125-.936c-.539-.143-1.036-.249-1.516-.406-.424-.144-.574-.4-.572-.848zm47.489-8.241c.568-.527.572-1.223.413-1.996-.45.471-.954.688-1.529.729-.771.055-1.528-.012-2.246-.319-1.942-.834-3.854-.775-5.76.14-1.603.768-2.589 1.965-2.688 3.78-.063 1.163.155 2.264.931 3.189.465.554 1.062.913 1.735 1.161.29.107.312.245.069.43a7.01 7.01 0 01-.557.38 73.2 73.2 0 01-1.226.754c-.241.146-.323.332-.244.617.231.838.826 1.322 1.57 1.675l.271.189-.237.237c-.729.591-1.487 1.149-2.185 1.776-.586.527-.775 1.233-.598 2.012.357 1.555 1.388 2.517 2.851 2.959 2.557.774 4.958.33 7.147-1.185 1.298-.899 2.229-2.069 2.512-3.679.317-1.809-.688-3.379-2.487-3.703-1.19-.216-2.408-.278-3.612-.416-.562-.064-1.132-.102-1.679-.231-.465-.11-.696-.489-.653-.859.043-.364.43-.703.873-.738.892-.072 1.766-.211 2.588-.587 2.178-.996 3.189-2.74 2.936-5.088-.033-.316-.105-.628-.17-.996.697.117 1.41.294 1.975-.231zm-6.609 11.017c.886.026 1.894.081 2.868.366.857.25 1.562.688 1.77 1.645.251 1.156-.305 2.306-1.424 2.924-1.048.578-2.186.626-3.34.507-.988-.102-1.877-.444-2.589-1.174-.938-.961-.943-2.291-.004-3.249.839-.856 1.288-1.033 2.719-1.019zm2.217-6.962c-.516 1.651-2.018 1.879-3.195 1.351-1.003-.449-1.44-1.333-1.669-2.342-.089-.388-.11-.791-.162-1.188.021-.569.115-1.115.36-1.627.751-1.577 2.596-1.483 3.617-.769.438.306.743.722.934 1.215a4.998 4.998 0 01.115 3.36zm-9.37 5.263a7.984 7.984 0 01-1.057-.236c-.608-.186-.682-.3-.689-.943-.018-1.792-.03-3.584-.05-5.375-.01-.806-.106-1.601-.353-2.371-.65-2.03-2.641-3.12-4.633-2.521-1.104.333-2.052.952-2.935 1.679l-.322.247.001-.331c.021-.381.062-.762.059-1.143-.002-.199-.078-.399-.115-.574-.753.227-1.428.455-2.117.629-.691.174-1.396.292-2.095.434-.347.07-.602.28-.596.519.009.337.288.402.532.503.442.181.883.364 1.32.558.312.139.439.397.436.732-.022 2.329-.036 4.659-.07 6.989-.01.736-.196.93-.92 1.092l-.316.063c-.67.115-.689.142-.643.849l.004.117c-.008.272.111.36.391.357 1.78-.021 3.561-.031 5.341-.024.763.003.845-.057.829-.841l-.036-.337c-.436-.073-.853-.126-1.261-.216-.427-.095-.58-.27-.62-.704-.037-.397-.049-.8-.053-1.2-.02-1.831-.036-3.662-.045-5.492-.002-.461.083-.889.507-1.186a4.14 4.14 0 012.125-.762c1.588-.109 2.795.832 2.881 2.415.106 1.953.074 3.913.099 5.87.002.146-.024.293-.044.438-.038.286-.178.501-.468.575-.283.074-.57.14-.859.184-.431.064-.44.061-.473.496l.011.293c.051.506.052.491.564.486 1.722-.014 3.443-.023 5.164-.021.72.002.771-.032.777-.774l-.002-.176c.011-.19-.074-.267-.269-.298zm24.052-11.323c-1.805-.441-3.517-.113-5.143.728-1.58.817-2.636 2.08-3.038 3.824-.406 1.763-.212 3.483.567 5.12.507 1.063 1.287 1.885 2.349 2.419 2.486 1.252 5.527.684 7.477-.991 1.539-1.321 2.104-3.08 2.138-5.257-.021-.218-.042-.638-.1-1.054-.327-2.37-1.968-4.231-4.25-4.789zm1.367 9.155c-.479 1.886-2.11 2.724-3.95 2.076-.939-.33-1.641-.961-2.113-1.814-1.086-1.96-1.295-4.044-.677-6.182.412-1.424 1.584-2.203 2.978-2.105 1.246.087 2.204.685 2.907 1.699.741 1.07 1.027 2.287 1.103 3.565.013.205.002.41.002.616l.088.01c-.11.713-.162 1.44-.338 2.135zm-46.764-9.186c-1.899-.434-3.678-.005-5.326.96-1.425.834-2.346 2.08-2.699 3.708-.331 1.521-.196 3.016.343 4.473.328.888.825 1.669 1.554 2.278 1.535 1.281 3.329 1.605 5.238 1.248 1.616-.303 3.036-1.021 4.068-2.364.966-1.256 1.334-2.698 1.372-4.261-.057-.495-.071-.999-.176-1.482-.522-2.411-1.932-4.003-4.374-4.56zm1.549 9.18c-.463 1.876-2.12 2.735-3.947 2.087-1.173-.417-1.937-1.276-2.42-2.377-.774-1.769-.932-3.61-.431-5.476.384-1.427 1.541-2.478 3.312-2.226 1.087.154 1.935.709 2.567 1.592.854 1.191 1.135 2.555 1.174 3.988v.293l.072.011c-.105.704-.157 1.42-.327 2.108z"></path>
                </svg>
                <svg viewBox="0 0 128 128">
                  <path fill="#9f9fa9" d="M8.983 78.08c-.937.246-2.276 1.019-2.908 1.687l-.622.628-.173-2.212H2.987L2.935 86.2l-.039 8.033h2.61l.074-5.224c.086-5.895.19-6.455 1.305-7.594.81-.825 2.08-1.284 3.19-1.158.936.103 1.588.524 2.082 1.365.332.564.35.967.407 6.598l.052 6.013h2.61l.051-5.575c.052-5.349.07-5.596.442-6.299 1.357-2.506 4.939-2.89 6.117-.664.355.664.373 1.033.425 6.611l.069 5.927h2.454l-.056-6.541-.052-6.526-.495-.927c-1.092-2.072-4.11-2.878-6.61-1.79-.408.178-1.184.755-1.73 1.261-.914.863-1.005.916-1.196.6-.46-.79-1.219-1.492-1.978-1.86-.901-.405-2.804-.612-3.684-.37zm0 0"></path><path fill="#9f9fa9" d="M30.953 78.097c-2.133.455-4.196 1.98-5.007 3.736-1.253 2.65-1.201 6.456.122 9.03 1.343 2.632 4.816 4.14 7.971 3.49 4.306-.91 6.313-3.91 6.013-8.977-.052-.877-.212-1.981-.368-2.489-.598-1.912-2.327-3.702-4.27-4.422-1.145-.437-3.296-.61-4.461-.368zm3.616 2.528c1.886.875 2.804 2.683 2.788 5.54-.018 2.896-.864 4.699-2.628 5.596-1.183.61-3.156.628-4.253.07-.755-.404-1.656-1.318-2.081-2.125-.794-1.526-.828-5.085-.069-6.714.846-1.842 2.242-2.754 4.196-2.771.85-.017 1.379.086 2.047.404zm11.887-2.476c-1.254.368-2.012.789-2.736 1.526-.386.386-.759.702-.828.702-.07 0-.139-.507-.139-1.14V78.08l-1.096.05-1.11.053-.052 8.016-.036 8.033h2.645v-5.05c.018-5.332.104-6.208.81-7.261.495-.773 1.817-1.51 2.983-1.665 1.674-.23 3.386.737 3.773 2.137.125.442.194 2.735.194 6.264v5.575h2.662l-.052-6.277-.052-6.26-.46-.984c-.529-1.105-1.321-1.825-2.574-2.315-1.093-.422-2.91-.543-3.932-.247Zm12.87-.07c-2.661.581-4.547 2.598-5.288 5.632-.334 1.348-.282 3.91.086 5.172 1.08 3.72 3.477 5.562 6.95 5.315 1.34-.105 2.505-.56 3.402-1.35.6-.527.655-.545.76-.211.177.577-.105 2.839-.443 3.611-.667 1.51-1.99 2.193-4.214 2.193-1.99-.016-3.334-.754-3.65-2.033-.087-.333-.264-.42-.915-.51a12.985 12.985 0 0 1-1.218-.192c-.369-.07-.408-.017-.408.668.018 1.682 1.288 3.156 3.334 3.858.903.317 1.553.403 2.927.403 3.177 0 5.362-1.123 6.42-3.281.793-1.596.919-3.455.862-11.978l-.052-7.192h-2.293l-.052.915c-.034.507-.104.927-.155.927-.057 0-.373-.244-.725-.542-1.34-1.174-3.632-1.773-5.327-1.404zm3.477 2.562c.495.264 1.127.737 1.392 1.088 1.976 2.576 1.603 7.89-.688 9.537-2.239 1.617-5.36.737-6.47-1.803-.567-1.3-.706-4.244-.264-5.839.333-1.284 1.283-2.51 2.363-3.07.949-.51 2.536-.477 3.667.087zm11.072-2.475c-1.461.421-1.903.633-2.874 1.37-1.887 1.405-2.766 3.559-2.749 6.714 0 2.299.352 3.686 1.305 5.16 1.27 1.946 3.438 3.035 6.082 3.053 3.052.016 5.467-1.337 6.685-3.738l.616-1.227.546 1.122c1.994 4.193 8.237 5.208 11.783 1.947.563-.51 1.18-1.226 1.357-1.56.195-.351.385-.633.437-.633.057 0 .248.369.425.841.885 2.107 3.07 3.264 6.19 3.246 1.817 0 3.157-.332 4.375-1.105.724-.455 1.886-1.756 1.886-2.124 0-.069.087-.35.195-.61l.173-.495.511.88c2.208 3.858 8.363 4.716 11.71 1.647.866-.806 2.046-2.891 1.765-3.156-.088-.086-.686-.23-1.34-.3l-1.161-.155-.287.594c-.793 1.647-1.92 2.475-3.629 2.614-2.7.247-4.729-1.422-5.258-4.278-.087-.508-.122-.967-.07-1.02.052-.051 2.788-.086 6.065-.086h5.96v-.945c0-1.214-.229-2.406-.718-3.703-.569-1.509-2.293-3.19-3.862-3.77-1.696-.633-4.041-.594-5.715.086-2.804 1.14-4.5 3.984-4.517 7.508v1.21l-.702-.616c-.76-.629-2.275-1.244-4.673-1.873-2.684-.702-3.582-1.054-4.058-1.6-.511-.61-.546-1.013-.177-1.716.407-.807 1.533-1.244 3.211-1.244 1.92 0 2.784.437 3.404 1.7.35.718.51.892.793.84a20.47 20.47 0 0 1 1.196-.173c.989-.122 1.063-.386.408-1.773-.863-1.843-2.857-2.788-5.835-2.77-1.396.016-1.977.086-2.804.42-1.8.685-2.823 1.895-3.088 3.667l-.125.807-.546-1.054c-2.75-5.263-10.934-5.154-13.383.174l-.442.966-.616-1.226c-.777-1.544-1.994-2.632-3.65-3.265-1.465-.56-3.511-.702-4.799-.35zm3.932 2.493c1.816.893 2.718 2.719 2.718 5.505-.018 3.858-1.799 6.139-4.799 6.139-1.834 0-3.368-1.019-4.196-2.752-.438-.946-.477-1.176-.477-3.386 0-2.58.195-3.313 1.218-4.51 1.218-1.434 3.72-1.89 5.536-.996zm14.037-.195c.85.35 1.994 1.405 2.401 2.194.777 1.508.898 4.664.266 6.506-.355 1.036-1.323 2.176-2.26 2.632-1.587.807-3.88.541-5.184-.6-2.15-1.875-2.415-7.134-.46-9.397 1.218-1.44 3.563-2.016 5.238-1.335zm27.298.073c1.397.595 2.436 2.016 2.489 3.4l.034.736h-8.99l.052-.525c.12-1.474 1.143-2.856 2.592-3.576.95-.477 2.766-.495 3.823-.034zm-20.383 4.96c.706.65 1.695 1.036 4.833 1.876 1.496.404 2.927.881 3.174 1.055 1.517 1.087.724 3.19-1.414 3.702-1.27.294-2.996.139-4.018-.386-.707-.351-.92-.599-1.358-1.526l-.528-1.088-2.08.208.121-.824c.051-.455.108-1.665.108-2.683v-1.86l.333.529c.174.282.547.737.829.997zM69.77 25.244c-1.609.065-4.318.495-4.318.677 0 .077 1.912 1.032 2.055 1.032.139 0 2.359 1.11 2.848 1.417.646.41 1.105.785.971.785-.086 0-2.367-.88-3.23-1.254-.702-.299-3.624-1.166-5.05-1.504-.767-.178-1.092-.247-2.402-.485-1.933-.355-4.2-.373-5.193-.048-1.413.46-1.73 1.023-1.73 3.108 0 1.145.056 1.634.308 2.666.104.45.412 1.435.56 1.77.038.103.172.428.286.719.116.286.463 1.023.77 1.625 1.721 3.412 4.297 6.26 7.93 8.765 1.143.785 4.262 2.277 5.51 2.633.317.086.424.268.165.268-.291 0-2.922-.729-3.464-.958a9.908 9.908 0 0 0-.625-.247c-1.872-.759-4.266-2.315-6.247-4.084a20.48 20.48 0 0 1-5.09-6.954c-.757-1.711-1.273-3.71-1.399-5.449-.077-.992-.155-1.235-.416-1.222-.086 0-.902-.03-1.809-.077-2.448-.105-5.804.164-9.12.737-6.347 1.078-13.192 3.575-20.24 7.382a88.8 88.8 0 0 0-3.474 1.976c-.133.078-.555.333-.94.577-.385.238-.837.508-1.001.61-.364.21-4.392 2.945-4.872 3.308-.183.135-.686.508-1.107.811-1.912 1.419-6.077 4.812-6.315 5.155-.118.173.064.26.316.173.125-.047.45-.112.71-.152.27-.038.963-.22 1.54-.41a47.98 47.98 0 0 1 1.396-.422c1.421-.333 1.997-.45 2.835-.572.373-.052.932-.134 1.249-.182 3.906-.577 5.77-.72 7.507-.585 3.781.308 7.396.945 9.465 1.682 1.547.555 4.698 2.258 6.086 3.282.798.602 3.373 3.165 3.94 3.94.443.612.932 1.145 1.05 1.145.034 0 .086-1.951.095-4.33l.026-4.323 5.059-.03c3.98-.018 5.085.013 5.155.1.095.122.325.532 1.083 1.937.725 1.349 1.08 1.998 1.3 2.393.114.209.382.707.608 1.096.207.395.602 1.12.87 1.617.27.5.491.92.491.937 0 .087.394.603.464.603.04 0 .133-.144.2-.303.078-.175.28-.555.442-.842.173-.29.48-.854.693-1.244.212-.395.503-.936.655-1.196.424-.755.866-1.578 1.23-2.246.183-.346.474-.88.642-1.197.173-.316.425-.762.56-1.005a4.905 4.905 0 0 1 .33-.55c.073-.087 1.209-.118 5.305-.1l5.203.03.025 8.445c.023 6.654.048 8.431.148 8.431.055-.009.442-.23.837-.507.555-.39.797-.628 1.053-1.07.59-1.002 2.25-2.58 3.368-3.192a15.87 15.87 0 0 1 4.326-1.624c1.54-.325 1.99-.373 5.48-.5 6.373-.22 7.318-.26 7.366-.307.025-.027-.061-.278-.182-.564-.134-.277-.368-.793-.53-1.135-.606-1.314-.606-1.751.027-2.394.433-.446 1.547-.84 3.463-1.222.317-.07.711-.152.877-.213.16-.047.364-.082.45-.082.239 0 2.154-.473 2.558-.624.278-.113 1.777-.438 3.567-.784.777-.152 2.797-.555 4.47-.89 1.058-.208 2.163-.429 2.45-.485.29-.06.702-.143.914-.182.212-.048.49-.104.625-.126.133-.03.81-.16 1.49-.303a34.027 34.027 0 0 1 1.548-.3c.481-.047 4.106-.918 4.942-1.183 1.327-.432 1.72-.602 2.558-1.166.906-.616 1.153-.95 2.046-2.727.993-1.98 1.136-2.315 1.414-3.147.432-1.326.407-1.833-.145-2.388-.38-.382-1.208-.777-1.815-.864-.45-.055-.507-.039-.733.204-.134.144-.247.312-.247.373 0 .082-.156.508-.585 1.54-.039.103-.125.364-.195.571a6.215 6.215 0 0 1-.239.668c-.125.269-.133.221-.087-.525.048-.737.175-1.357.452-2.292.048-.182.117-.491.142-.682l.048-.342-.997-.403a129.623 129.623 0 0 1-2.452-1.032 67.753 67.753 0 0 0-.964-.373 15.992 15.992 0 0 1-.987-.395 31.478 31.478 0 0 0-1.01-.42c-.647-.247-2.897-1.009-4.809-1.613-.52-.164-3.546-1.07-3.845-1.157a37.918 37.918 0 0 1-1.343-.373c-.157-.039-.53-.142-.82-.221-1.69-.468-2.133-.585-2.74-.755a17.671 17.671 0 0 0-1.01-.268c-.182-.048-.68-.164-1.106-.269-.741-.182-3.845-.897-5.526-1.278a106.296 106.296 0 0 0-1.206-.278 21.523 21.523 0 0 0-.863-.173 41.008 41.008 0 0 1-1.2-.238 84.375 84.375 0 0 0-1.878-.348 192.56 192.56 0 0 0-1.682-.294c-2.652-.477-2.836-.507-7.595-1.032-2.935-.333-6.876-.61-7.838-.564a75.2 75.2 0 0 0-1.88.087zm-11.115 4.712c2.535.825 5.007 1.942 6.702 3.03 1.343.872 3.017 2.26 3.468 2.88l.195.26-.369-.144c-.2-.086-.624-.268-.94-.42-1.69-.785-1.873-.855-1.873-.68 0 .047.394.68.862 1.386.482.715.867 1.349.867 1.404 0 .048-.182-.03-.403-.182-.866-.593-2.896-1.442-3.013-1.27-.025.048.6.842 1.396 1.77.788.927 1.443 1.72 1.443 1.776 0 .145-.155.126-.883-.143-.75-.268-.946-.294-.946-.116 0 .125 1.626 2.315 2.272 3.074.182.207.325.407.325.455 0 .23-2.25-1.232-3.845-2.494-2.28-1.815-4.483-4.257-5.645-6.272-.949-1.647-1.278-2.536-1.278-3.512 0-.572.03-.689.243-.888.122-.135.277-.24.333-.24.06 0 .538.145 1.089.326zm30.354 3.405c.924.164 2.18.38 2.787.49.607.104 1.344.229 1.635.277.286.055.702.134.914.182.209.047.625.13.91.2.955.207 1.185.255 2.742.62 1.672.394 2.036.467 2.548.576.432.082.866.247.866.325 0 .025-.32.209-.701.407-.79.395-.954.422-4.202.546-2.215.096-3.393.07-4.472-.103-2.173-.334-3.296-.946-4.172-2.267-.307-.452-.51-.582-1.213-.764-.26-.078-.655-.182-.863-.25-.212-.066-.577-.17-.81-.24-.69-.181-.296-.286 1.096-.286.962 0 1.635.066 2.935.287zm11.564 13.36a.573.573 0 0 1-.241 0c-.066-.032-.018-.048.116-.048s.182.016.125.047zm-.416.112c0 .047-.112.117-.26.144a57.5 57.5 0 0 0-1.855.537c-.133.048-.564.182-.958.294-.993.286-3.395 1.071-4.04 1.318-1.209.46-4.058 1.973-4.46 2.371-.594.586-.78 1.219-.694 2.424.03.502.1 1.144.155 1.421.113.603.048.768-.182.469-.233-.294-.724-1.365-.867-1.89-.077-.243-.164-.555-.212-.71-.174-.543-.104-1.185.165-1.579.364-.555 1.673-1.443 3.212-2.18.728-.352 2.853-1.08 4.808-1.653.394-.116.824-.25.958-.285 1.387-.468 4.23-.919 4.23-.681zm-30.41.642c-.026.026-.113.039-.182.008-.078-.03-.048-.056.055-.056.11-.009.167.017.127.047zm0 0"></path><path fill="#9f9fa9" d="M49.585 65.968v6.692h4.79c3.595 0 4.817-.03 4.903-.117.144-.143.174-13.27.031-13.27-.047 0-.117.075-.147.161-.035.087-1.085 1.72-2.336 3.633-1.978 3.022-2.529 3.758-2.529 3.386 0-.066-3.277-5.18-4.114-6.416a3.465 3.465 0 0 1-.3-.507c-.077-.145-.172-.256-.22-.256-.039 0-.078 3.012-.078 6.693zm0 0"></path>
                </svg>
                <svg viewBox="0 0 128 128">
                  <path fill="#9f9fa9" d="M40.53 77.82V50.74H42V55a5.57 5.57 0 00.48-.6 7.28 7.28 0 016.64-4.12c3.35-.1 6.07 1.14 7.67 4.12a13.24 13.24 0 01.32 12.14c-1.49 3.34-5.17 5-9.11 4.39a7.37 7.37 0 01-5.88-3.88v10.77zM42 60.32c.13 1.32.18 2.26.33 3.18.58 3.62 2.72 5.77 6.08 6.16A6.91 6.91 0 0056 65.27a11.77 11.77 0 00-.26-9.68 6.77 6.77 0 00-7.13-3.94 6.59 6.59 0 00-5.89 4.87 33.4 33.4 0 00-.72 3.8zM88.41 64a7.92 7.92 0 01-7.74 7c-6.16.31-9.05-3.78-9.51-8.5a13.62 13.62 0 011.2-7.5 8.37 8.37 0 018.71-4.67 8 8 0 017.1 6.09 41.09 41.09 0 01.69 4.5H72.67c-.3 4.28 2 7.72 5.26 8.55 4.06 1 7.53-.76 8.79-4.62.28-.99.79-1.13 1.69-.85zm-15.74-4.45h14.47c-.09-4.56-2.93-7.86-6.78-7.91-4.36-.07-7.5 3.11-7.69 7.91zM91.39 64.1h1.42a5.69 5.69 0 003.34 4.9 8.73 8.73 0 007.58-.2 3.41 3.41 0 002-3.35 3.09 3.09 0 00-2.08-3.09c-1.56-.58-3.22-.9-4.81-1.41A35.25 35.25 0 0194 59.18c-2.56-1.25-2.72-6.12.18-7.66a10.21 10.21 0 019.76-.15 5.14 5.14 0 012.6 5.24h-1.22c0-.06-.11-.11-.11-.17-.15-3.89-3.41-5.09-6.91-4.75a9.17 9.17 0 00-3 .91 3 3 0 00-1.74 3 3 3 0 002 2.82c1.54.56 3.15.92 4.73 1.36 1.27.35 2.59.58 3.82 1a4.51 4.51 0 013.1 4.07 4.81 4.81 0 01-2.59 5c-3.34 1.89-8.84 1.39-11.29-1a6.67 6.67 0 01-1.94-4.75zM125.21 56.61h-1.33c0-.18-.07-.34-.09-.49a4.35 4.35 0 00-3.54-4.18 8.73 8.73 0 00-5.61.27 3.41 3.41 0 00-2.47 3.25 3.14 3.14 0 002.4 3.16c2 .62 4.05 1 6.08 1.56a17 17 0 011.94.59 5 5 0 01.27 9.31 11.13 11.13 0 01-9 .09 6.24 6.24 0 01-3.76-6.06h1.3a7.29 7.29 0 0011.1 4.64 3.57 3.57 0 001.92-3.34 3.09 3.09 0 00-2.11-3.07c-1.56-.58-3.22-.89-4.81-1.4a35.43 35.43 0 01-4.87-1.75c-2.5-1.23-2.7-6.06.15-7.6a10.07 10.07 0 019.92-.11 5.23 5.23 0 012.51 5.13zM38.1 70.51a2.29 2.29 0 01-2.84-1.08c-1.63-2.44-3.43-4.77-5.16-7.15l-.75-1c-2.06 2.76-4.12 5.41-6 8.16a2.2 2.2 0 01-2.7 1.06l7.73-10.37-7.19-9.37a2.39 2.39 0 012.85 1c1.67 2.44 3.52 4.77 5.36 7.24 1.85-2.45 3.68-4.79 5.39-7.21a2.15 2.15 0 012.68-1l-2.79 3.7c-1.25 1.65-2.48 3.31-3.78 4.92a1 1 0 000 1.49c2.39 3.17 4.76 6.35 7.2 9.61zM70.92 50.66v1.4a7.25 7.25 0 00-7.72 7.49v11h-1.43V50.74h1.4v4.06c1.73-2.96 4.4-4.06 7.75-4.14zM2.13 60c.21-1 .34-2.09.63-3.11 1.73-6.15 8.78-8.71 13.63-4.9 2.84 2.23 3.55 5.39 3.41 8.95h-16c-.26 6.36 4.33 10.2 10.2 8.24a6.09 6.09 0 003.87-4.31c.31-1 .81-1.17 1.76-.88a8.12 8.12 0 01-3.88 5.93 9.4 9.4 0 01-10.95-1.4 9.85 9.85 0 01-2.46-5.78c0-.34-.13-.68-.2-1q-.01-.89-.01-1.74zm1.69-.43h14.47c-.09-4.61-3-7.88-6.88-7.91-4.32-.06-7.41 3.14-7.6 7.89z"></path>
                </svg>
                <svg viewBox="0 0 128 128">
                  <path fill="#9f9fa9" d="M64.144 56.789c-4.976 0-8.563 3.245-8.563 8.112s4.034 8.113 9.014 8.113c3.006 0 5.656-1.19 7.297-3.195l-3.448-1.992c-.91.996-2.294 1.577-3.849 1.577-2.159 0-3.993-1.127-4.674-2.93H72.55a8.151 8.151 0 0 0 .158-1.577c0-4.863-3.583-8.108-8.564-8.108zm-4.259 6.535c.563-1.798 2.105-2.93 4.26-2.93 2.158 0 3.7 1.132 4.259 2.93zm-1.019-11.493L46.377 73.465 33.884 51.83h4.683l7.806 13.521 7.806-13.521zm-42.212-2.253 16.653 28.845H0Zm74.172 15.324c0 2.704 1.767 4.507 4.507 4.507 1.857 0 3.25-.843 3.966-2.218l3.462 1.997c-1.434 2.388-4.12 3.826-7.428 3.826-4.98 0-8.563-3.245-8.563-8.112 0-4.868 3.587-8.113 8.563-8.113 3.308 0 5.99 1.438 7.428 3.826l-3.462 1.997c-.716-1.375-2.109-2.218-3.966-2.218-2.736 0-4.507 1.803-4.507 4.508zM128 51.83v20.732h-4.056V51.831Zm-15.324 4.958c-4.976 0-8.563 3.245-8.563 8.112s4.038 8.113 9.014 8.113c3.006 0 5.656-1.19 7.297-3.195l-3.448-1.992c-.91.996-2.294 1.577-3.85 1.577-2.158 0-3.992-1.127-4.673-2.93h12.629a8.16 8.16 0 0 0 .157-1.577c0-4.863-3.583-8.108-8.563-8.108zm-4.26 6.535c.564-1.798 2.101-2.93 4.26-2.93s3.7 1.132 4.26 2.93zm-22.999-6.085v4.368a5.157 5.157 0 0 0-1.442-.221c-2.618 0-4.507 1.803-4.507 4.507v6.67h-4.056V57.24h4.056v4.147c0-2.29 2.664-4.147 5.95-4.147z"></path>
                </svg>
                <svg viewBox="0 0 128 128">
                  <path fill="#9f9fa9" d="M64.727 23.539a17.54 17.54 0 0 0-17.54 17.54 17.54 17.54 0 0 0 17.54 17.54 17.54 17.54 0 0 0 17.54-17.54 17.54 17.54 0 0 0-17.54-17.54zm8.398 5.941a3.462 5.539 24.166 0 1 .894.195 3.462 5.539 24.166 0 1 .891 6.47 3.462 5.539 24.166 0 1-5.426 3.637 3.462 5.539 24.166 0 1-.89-6.471 3.462 5.539 24.166 0 1 4.53-3.83zM58.957 0a45.234 45.234 0 0 0-45.232 45.234 45.234 45.234 0 0 0 45.232 45.234 45.234 45.234 0 0 0 43.855-34.9 36.002 36.002 0 0 1-7.656 10.617A33.464 33.464 0 0 1 67.65 80.697a33.464 33.464 0 0 1-14.727-3.475 39.233 39.233 0 0 1-28.97-37.758A39.233 39.233 0 0 1 63.133.234a45.234 45.234 0 0 0-4.176-.232zm5.078.23a50.08 50.08 0 0 0-.383.014 39.233 39.233 0 0 1 .803.02 39.233 39.233 0 0 1 .482-.022 50.08 50.08 0 0 0-.902-.012zm1.154 0a39.233 39.233 0 0 0-39.234 39.234A39.233 39.233 0 0 0 48.002 74.68a39.233 39.233 0 0 1-.455-.187 33.464 33.464 0 0 0 2.168.978 33.464 33.464 0 0 1-6.91-5.937 33.464 33.464 0 0 0 22.846 9.164 33.464 33.464 0 0 0 33.463-33.463 33.464 33.464 0 0 0-8.371-22.086 33.464 33.464 0 0 1 10.371 24.086 33.464 33.464 0 0 1-5.799 18.742 36.002 36.002 0 0 0 8.875-23.512 36.002 36.002 0 0 0-36-36.002 36.002 36.002 0 0 0-25.113 10.406 36.002 36.002 0 0 1 .192-.205A36.002 36.002 0 0 1 70.19 4.462a36.002 36.002 0 0 1 36 36.002 36.002 36.002 0 0 1-2.4 12.67 45.234 45.234 0 0 1-44.833 39.334 45.234 45.234 0 0 1-44.756-38.717 50.08 50.08 0 0 0 49.834 46.641 50.08 50.08 0 0 0 50.08-50.08A50.08 50.08 0 0 0 73.986 1.23 39.233 39.233 0 0 0 65.19.232zm-2.462 9.31a23.54 23.54 0 0 1 16.949 7.372 23.54 23.54 0 0 0-14.95-5.373 23.54 23.54 0 0 0-23.538 23.54 23.54 23.54 0 0 0 5.45 14.817 19.138 19.138 0 0 1-1.794-8.072A19.138 19.138 0 0 1 63.98 22.687 19.138 19.138 0 0 1 83.12 41.824a19.138 19.138 0 0 1-19.14 19.139 19.138 19.138 0 0 1-17.075-10.578 23.54 23.54 0 0 1-7.717-17.307 23.54 23.54 0 0 1 23.539-23.54zm7 6.23h.002a20.54 20.54 0 0 1 20.539 20.54 20.54 20.54 0 0 1-6.475 14.8 20.54 20.54 0 0 0 4.475-12.8 20.54 20.54 0 0 0-20.54-20.54h-.001a20.54 20.54 0 0 0-12.74 4.441 20.54 20.54 0 0 1 14.74-6.441zm-29.78 4.968a27.925 27.925 0 0 0-7.529 18.957A27.925 27.925 0 0 0 60.342 67.62a27.925 27.925 0 0 0 19.135-7.675 27.925 27.925 0 0 1-21.135 9.675 27.925 27.925 0 0 1-24.697-15.037 27.925 27.925 0 0 1-.002 0 27.925 27.925 0 0 1-3.224-12.887 27.925 27.925 0 0 1 8.547-20.014 36.002 36.002 0 0 1 .005-.007 27.925 27.925 0 0 1 .977-.936zm11.149 5.676a20.54 20.54 0 0 0-.116.184 20.54 20.54 0 0 1 .116-.184zm32.617 24.777a20.54 20.54 0 0 1-.844.875 20.54 20.54 0 0 1-.313.281 20.54 20.54 0 0 0 1.156-1.156zm-3.92 3.645a20.54 20.54 0 0 1-.598.375 20.54 20.54 0 0 0 .598-.375zm-3.698 2.172a20.54 20.54 0 0 1-.955.334 20.54 20.54 0 0 0 .955-.334zm49.424 70.652c-.169 0-.253-.084-.422-.253l-2.786-4.222-1.52 1.604v2.618c0 .084-.084.253-.253.253h-2.11c-.085 0-.254-.084-.254-.253v-13.931c0-.085.084-.254.253-.254h2.11c.085 0 .254.085.254.254v8.274l3.8-4.053a.464.464 0 0 1 .421-.253h2.364c.085 0 .254.084.085.253l-3.546 3.715 3.968 6.079c.084.084.084.253-.085.253zm-17.31-2.53c-.253-.675-.422-1.435-.422-2.533s.084-1.857.422-2.533c.675-1.857 2.364-2.786 4.56-2.786 1.688 0 2.954.59 3.798 1.604.085.085.085.254-.084.254l-1.435 1.182c-.085.084-.254.084-.338-.085-.59-.59-1.098-.844-2.026-.844-1.014 0-1.773.422-2.11 1.35-.254.507-.254 1.098-.254 1.858s.084 1.35.253 1.942c.338.844 1.097 1.35 2.11 1.35.93 0 1.52-.337 2.027-.843.084-.085.253-.085.338-.085l1.435 1.182c.084.085.084.253.084.253-.844.93-2.195 1.52-3.799 1.52-2.195.085-3.884-.93-4.559-2.786zm-4.13 2.53c-.084 0-.253-.084-.253-.253v-.76c-.507.675-1.52 1.182-3.124 1.182-2.026 0-3.715-.93-3.715-3.124s1.69-3.293 4.39-3.293h2.195c.085 0 .085-.084.085-.084v-.507c0-1.182-.59-1.688-2.449-1.688-1.182 0-2.026.338-2.532.675-.085.085-.254.085-.338-.084l-.844-1.351c-.085-.084-.085-.253.084-.253.844-.591 2.11-1.013 3.884-1.013 3.377 0 4.56 1.097 4.56 3.546v6.585c0 .084-.086.253-.254.253zm-.253-3.377v-.76c0-.084-.085-.084-.085-.084h-1.857c-1.689 0-2.364.422-2.364 1.35 0 .845.675 1.267 1.942 1.267 1.435-.085 2.364-.591 2.364-1.773zm-9.46 3.637c-2.196 0-3.125-1.013-3.125-2.955v-5.403c0-.085-.084-.085-.084-.085h-.676c-.084 0-.253-.084-.253-.253v-1.435c0-.085.085-.254.253-.254h.676c.084 0 .084-.084.084-.084v-2.786c0-.085.085-.253.253-.253h2.111c.085 0 .253.084.253.253v2.786c0 .084.085.084.085.084h1.52c.084 0 .253.085.253.254v1.435c0 .084-.085.253-.253.253h-1.52c-.085 0-.085.085-.085.085v5.319c0 .675.338.928 1.014.928h.59c.085 0 .254.085.254.253v1.69c0 .083-.085.252-.253.252zm-16.295-1.78c-.084-.084-.084-.253-.084-.338l1.435-1.52c.084-.084.253-.084.338-.084 1.013.76 2.532 1.52 4.221 1.52 1.857 0 2.955-.844 2.955-2.11 0-1.014-.675-1.69-2.786-2.027l-.844-.085c-2.955-.422-4.644-1.688-4.644-4.052 0-2.617 2.11-4.39 5.235-4.39 1.941 0 3.8.59 4.98 1.435.085.084.085.169.085.253l-1.097 1.52c-.085.084-.254.084-.338.084-1.266-.76-2.448-1.097-3.715-1.097-1.604 0-2.448.76-2.448 1.942 0 1.013.76 1.688 2.87 1.94l.845.086c2.955.422 4.643 1.688 4.643 4.22s-2.026 4.476-5.825 4.476c-2.449.084-4.644-.76-5.826-1.773zm-8.02 1.52c-.085 0-.254-.084-.254-.253v-9.794c0-.084.084-.253.253-.253h2.11c.085 0 .254.084.254.253v.844h.084c.507-.76 1.52-1.35 2.87-1.35.845 0 1.774.337 2.28.844.085.084.085.253.085.253l-1.182 1.435c-.085.085-.253.085-.338.085-.506-.253-1.013-.507-1.688-.507-1.436 0-2.11.929-2.11 2.618v5.487c0 .085-.086.254-.254.254zm-11.23-2.53c-.253-.675-.422-1.435-.422-2.533s.084-1.857.422-2.533c.675-1.857 2.28-2.786 4.56-2.786s3.883 1.098 4.558 2.786c.253.676.422 1.436.422 3.124 0 .085-.084.253-.253.253h-6.923c-.084 0-.084.085-.084.085 0 .253.084.59.168.76.423 1.013 1.182 1.52 2.45 1.52s2.025-.423 2.616-.93c.085-.084.253-.084.422-.084l1.351 1.098c.084.084.084.253.084.253-.928 1.013-2.532 1.773-4.559 1.773-2.532.085-4.22-.928-4.812-2.786zm6.67-4.56c-.253-.843-1.098-1.35-2.11-1.35s-1.858.507-2.196 1.35c-.084.254-.084.507-.084.845 0 .085.084.085.084.085h4.39c.085 0 .085-.085.085-.085-.085-.253-.085-.59-.17-.844zm-17.814 5.74c-.085-.084-.085-.253 0-.253l1.35-1.267a.257.257 0 0 1 .338 0c.76.676 2.111 1.182 3.293 1.182 1.35 0 2.026-.506 2.026-1.182 0-.59-.422-1.013-1.857-1.097l-1.182-.085c-2.195-.253-3.377-1.266-3.377-2.955 0-1.941 1.52-3.292 4.221-3.292 1.69 0 3.124.506 4.137 1.182.085.084.085.253.085.253l-1.098 1.182c-.084.084-.253.084-.338.084-.675-.422-1.857-.844-2.87-.844-1.098 0-1.689.422-1.689 1.098 0 .59.422.928 1.858 1.097l1.182.085c2.28.253 3.377 1.35 3.377 2.955 0 2.026-1.604 3.46-4.644 3.46-2.28.086-3.883-.76-4.812-1.603zm-6.08 1.35c-.084 0-.252-.084-.252-.253l-2.11-6.586h-.086l-2.11 6.5c-.085.086-.085.254-.254.254H34.93c-.084 0-.253-.084-.253-.253l-3.462-9.793c-.084-.085.085-.254.17-.254h2.194c.17 0 .253.085.253.254l2.111 6.754h.085l2.11-6.754c.085-.085.17-.254.254-.254h1.688c.085 0 .253.085.253.254l2.196 6.754h.084l2.026-6.754c.085-.17.085-.254.254-.254h2.195c.084 0 .253.085.17.254l-3.379 9.793c-.084.085-.084.253-.253.253zm-20.515-2.53c-.253-.675-.422-1.35-.422-2.533s.084-1.857.422-2.533c.675-1.857 2.28-2.786 4.56-2.786s3.883 1.013 4.558 2.786c.253.676.422 1.35.422 2.533s-.084 1.858-.422 2.533c-.675 1.857-2.28 2.786-4.56 2.786-2.279 0-3.967-.93-4.558-2.786zm6.67-.591c.253-.507.253-1.013.253-1.857 0-.845-.085-1.351-.253-1.858-.338-.844-1.013-1.35-2.11-1.35-1.014 0-1.774.506-2.11 1.35-.255.59-.255 1.013-.255 1.858 0 .844.084 1.35.253 1.857.338.844 1.013 1.35 2.11 1.35 1.014 0 1.69-.506 2.112-1.35zm-14.69 3.12c-.086 0-.255-.083-.255-.252v-9.794c0-.084.085-.253.254-.253h2.11c.085 0 .254.084.254.253v.844h.084c.507-.76 1.52-1.35 2.87-1.35.845 0 1.774.337 2.28.844.084.084.084.253.084.253l-1.182 1.435c-.084.085-.253.085-.337.085-.507-.253-1.013-.507-1.689-.507-1.435 0-2.11.929-2.11 2.618v5.487c0 .085-.085.254-.254.254zM.058 113.65c0-.083.084-.252.253-.252h5.825c3.293 0 4.813 1.52 4.813 3.799 0 1.689-.844 2.533-1.858 3.04v.084c.93.337 2.111 1.52 2.111 3.292 0 2.87-1.942 4.222-5.319 4.222H.314c-.085 0-.254-.085-.254-.253V113.65zm5.994 5.742c1.35 0 2.195-.76 2.195-1.857 0-1.182-.844-1.942-2.195-1.942H2.93c-.084 0-.084.084-.084.084v3.546c0 .085.084.085.084.085-.084.084 3.124.084 3.124.084zm-3.208 6.079H6.14c1.52 0 2.364-.76 2.364-2.026 0-1.267-.845-2.027-2.364-2.027H2.846c-.085 0-.085.085-.085.085v3.715c-.084.253.085.253.085.253z"></path>
                </svg>
                <svg viewBox="0 0 128 128">
                  <path fill="#9f9fa9" d="M21.95 47.426a16.584 16.584 0 0 0-4.833.57A16.577 16.577 0 0 0 5.02 61.891a16.579 16.579 0 0 0 8.199 16.496 16.58 16.58 0 0 0 18.379-1.272c7.253-5.596 8.565-16.002 2.984-23.248a16.584 16.584 0 0 0-12.633-6.441zm6.952 6.18a2.48 2.48 0 0 1 1.493.511l-2.153 2.168a.209.209 0 0 0-.076.123v.004a.233.233 0 0 0-.006.045.217.217 0 0 0 0 .002v.002a.227.227 0 0 0 .006.027.217.217 0 0 0 .076.145l1.63 1.629a2.414 2.414 0 0 1-2.536-.38l-.008-.005c-.004-.004-.007-.01-.012-.014a.257.257 0 0 0-.007-.004 2.45 2.45 0 0 1-.118-.109 2.426 2.426 0 0 1-.52-2.64 2.424 2.424 0 0 1 2.231-1.505zm1.903.917c.35.425.543.96.543 1.516a2.43 2.43 0 0 1-.72 1.727 2.46 2.46 0 0 1-.278.23l-1.584-1.543 2.039-1.93zm-.159 1.106a.207.207 0 0 0-.084.02.247.247 0 0 0-.105.113c-.027.05-.012.105.012.152a.59.59 0 0 1-.07.621.184.184 0 0 0 0 .262.143.143 0 0 0 .113 0 .183.183 0 0 0 .18-.055.956.956 0 0 0 .124-1.008l.008-.004a.207.207 0 0 0-.178-.101zm-5.234 1.826a1.494 1.494 0 0 1 1.045.326 1.266 1.266 0 0 0-.73.356l-6.092 6.05L18.445 63c3.157-3.14 5.087-4.767 6.285-5.32a1.494 1.494 0 0 1 .682-.225zm1.082.768h.002a.769.769 0 0 1 .668.218.733.733 0 0 1 .065.069 1.567 1.567 0 0 1 .12.21.733.733 0 0 1 .006.014.733.733 0 0 1 .043.27.77.77 0 0 1-.261.555L20.64 65.21l-.694-.691 6.121-6.08a.769.769 0 0 1 .426-.217zm45.041.166a2.644 2.644 0 0 0-.547.05c-1.735.347-2.527 1.325-2.379 3.118.098 1.34.844 1.978 1.832 2.423.692.36 1.395.596 1.93 1.19a2.125 2.125 0 0 1 .445 2.226c-.3.843-.843 1.188-1.582 1.239-.793.039-1.438-.144-2.03-.79-.213-.25-.493-.45-.743-.154-.297.348-.047.694.148.944.65.788 1.484.986 2.524.986v-.012c.347-.1.89-.048 1.387-.396 1.089-.641 1.386-1.633 1.386-2.918 0-1.387-.593-2.336-1.683-2.871-.692-.344-1.434-.555-2.078-1.086-.496-.45-.595-1.04-.497-1.734.101-.692.606-1.04 1.141-1.137.645-.098 1.338-.098 1.98.25.299.144.64.343.79-.154.148-.43-.149-.727-.493-.829-.483-.184-.995-.34-1.53-.345zm36.342.02c-.527.032-.577.626-.717 1.04l-2.426 8.961c-.097.395-.246.891.25 1.086.493.137.543-.344.645-.691.593-1.798.593-1.797 2.273-1.797h.438c1.352 0 1.353 0 1.793 1.52.052.201.149.449.199.644.09.297.285.347.531.297.297-.051.348-.297.348-.645l-.008.028a5.705 5.705 0 0 0-.195-.891l-2.278-8.512c-.097-.442-.207-.989-.742-1.039a.81.81 0 0 0-.111-.002zm-48.373.032c-1.484 0-2.472.691-2.672 2.13-.297 2.22-.246 4.49 0 6.718.199 1.538 1.141 2.23 2.773 2.23 1.536 0 2.375-.757 2.622-2.277.15-1.087.052-2.124.101-3.207-.05-1.14.098-2.278-.152-3.465-.246-1.387-1.188-2.129-2.672-2.129zm20.441.004c-.245 0-.445.2-.445.496 0 .383.203.538.496.538s.642.046.938 0c.743-.102 1.089.197 1.039 1.134v7.969c0 .383 0 .828.496.828.446 0 .496-.433.496-.828v-8.115c0-.742.2-1.09.89-1.04.348.05.743 0 1.086 0 .301 0 .496-.187.496-.534 0-.293-.195-.448-.445-.448h-5.047zm-34.207.008c-.582 0-.828.246-.828.988v4.586l-.023.018v4.65c0 .395 0 .793.445.793s.492-.394.492-.742c0-.828.051-1.733 0-2.623-.047-.743.203-1.088.895-1.041.453.05.836 0 1.281 0 1.547-.098 2.438-1.12 2.488-2.918.051-2.625-.793-3.66-3.07-3.71h-1.68zm76.961.106c-.285 0-.481.152-.531.496-.051.246-.05.441-.05.691v5.8c0 .2.05.497-.196.599-.301.097-.3-.199-.399-.399-.148-.398-.347-.742-.496-1.137l-2.422-5.398c-.203-.395-.45-.744-.89-.594-.398.1-.348.548-.348.89v9.122c0 .394 0 .939.535.89.496 0 .395-.546.395-.89v-5.89c0-.35-.099-.743.2-1.04l.01-.02c.337.147.388.493.536.79l2.77 6.136c.2.446.407.988.94.793.494-.153.345-.69.345-1.09v-9.156c0-.297-.102-.543-.399-.593zm-30.531.029a.722.722 0 0 0-.176.033c-.445.15-.344.691-.344 1.086v9.305c.047.246.149.445.446.496.285 0 .481-.2.531-.496.05-.297.05-.596.05-.89v-5.99c0-.185-.05-.484.2-.53.195-.051.195.246.297.394l1.332 2.922c.152.344.199.738.598.738.28 0 .383-.394.53-.691l1.634-3.512.007-.016c.395.4.294.793.344 1.188v5.691c0 .5-.156 1.192.535 1.192.645 0 .493-.697.493-1.14v-8.61c0-.448.136-.989-.395-1.14-.543-.099-.793.347-.988.792l-1.52 3.266c-.152.297-.2.89-.644.89-.4-.062-.446-.593-.594-.89l-1.524-3.364c-.17-.389-.42-.744-.812-.724zm-65.664.113a.458.458 0 0 0-.09.082l.09-.082zm21.133.754c.476.006.933.12 1.328.516.746.789.742 1.78.496 2.818-.247 1.043-.789 1.389-2.227 1.389-1.386 0-1.386 0-1.386-1.586v-2.227c0-.348 0-.79.347-.79.471-.027.966-.126 1.442-.12zm11.824.068c1.138-.05 1.829.697 1.879 1.98v2.54c0 .891.05 1.742 0 2.574-.047 1.34-.741 2.028-1.88 2.028-1.104-.051-1.746-.747-1.796-2.028v-5.113c.066-1.29.712-1.98 1.797-1.98zm-32.057.52c-.484 1.785-2.84 4.182-5.326 6.535l-1-1 6.326-5.535zm80.541.621c.297 0 .247.344.297.594l.942 3.512c.343 1.234.293 1.285-.793 1.285h-.496l.003.02c-1.585 0-1.636 0-1.14-1.798l.793-2.968c.05-.301.097-.645.394-.645zm-89.86 2.68.028.025.985.985-2.575.552 1.563-1.562zm1.548 1.547.328.336a.302.302 0 0 0 .004.021l.017.002.3.305-1.534.232-.004-.008.889-.888zm1.012 1.103.98.97a34.022 34.022 0 0 1-6.91 4.45.387.387 0 0 0-.207.441l.277 1.204a.071.071 0 0 1 0 .093.083.083 0 0 1-.11 0l-1.628-1.656 5.045-5.117 2.553-.385zm-7.965 5.861.117.11 1.307 1.306-2.674-.173 1.25-1.243z"></path>
                </svg>
                <svg viewBox="0 0 128 128">
                  <path fill="#9f9fa9" d="M2 38.5h124v43.71H64v7.29H36.44v-7.29H2zm6.89 36.43h13.78V53.07h6.89v21.86h6.89V45.79H8.89zm34.44-29.14v36.42h13.78v-7.28h13.78V45.79zm13.78 7.29H64v14.56h-6.89zm20.67-7.29v29.14h13.78V53.07h6.89v21.86h6.89V53.07h6.89v21.86h6.89V45.79z"></path>
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
                  <path fill="#9f9fa9" d="M19.67 26l8.069 90.493 36.206 10.05 36.307-10.063L108.33 26H19.67zm69.21 50.488L86.53 98.38l.009 1.875L64 106.55v.001l-.018.015-22.719-6.225L39.726 83h11.141l.79 8.766 12.347 3.295-.004.015v-.032l12.394-3.495L77.702 77H51.795l-.222-2.355-.506-5.647L50.802 66h27.886l1.014-11H37.229l-.223-2.589-.506-6.03L36.235 43h55.597l-.267 3.334-2.685 30.154M89 14.374L81.851 6H89V1H73v4.363L81.39 13H73v5h16zm-19 0L63.193 6H70V1H55v4.363L62.733 13H55v5h15zM52 13h-8V6h8V1H38v17h14z"></path>
                </svg>
                <svg viewBox="0 0 128 128">
                  <path fill="#9f9fa9" d="M19.569 27l8.087 89.919 36.289 9.682 36.39-9.499L108.431 27H19.569zM91.61 47.471l-.507 5.834L90.88 56H48.311l1.017 12h40.54l-.271 2.231-2.615 28.909-.192 1.69L64 106.964v-.005l-.027.012-22.777-5.916L39.65 84h11.168l.791 8.46 12.385 3.139.006-.234v.012l12.412-2.649L77.708 79H39.153l-2.734-30.836L36.152 45h55.724l-.266 2.471zM27.956 1.627h5.622v5.556h5.144V1.627h5.623v16.822h-5.623v-5.633h-5.143v5.633h-5.623V1.627zm23.782 5.579h-4.95V1.627h15.525v5.579h-4.952v11.243h-5.623V7.206zm13.039-5.579h5.862l3.607 5.911 3.603-5.911h5.865v16.822h-5.601v-8.338l-3.867 5.981h-.098l-3.87-5.981v8.338h-5.502V1.627zm21.736 0h5.624v11.262h7.907v5.561H86.513V1.627z"></path>
                </svg>
                <svg viewBox="0 0 128 128">
                  <g fill="#9f9fa9"><path fillRule="evenodd" clipRule="evenodd" d="M64 1.512c-23.493 0-42.545 19.047-42.545 42.545 0 18.797 12.19 34.745 29.095 40.37 2.126.394 2.907-.923 2.907-2.047 0-1.014-.04-4.366-.058-7.92-11.837 2.573-14.334-5.02-14.334-5.02-1.935-4.918-4.724-6.226-4.724-6.226-3.86-2.64.29-2.586.29-2.586 4.273.3 6.523 4.385 6.523 4.385 3.794 6.504 9.953 4.623 12.38 3.536.383-2.75 1.485-4.628 2.702-5.69-9.45-1.075-19.384-4.724-19.384-21.026 0-4.645 1.662-8.44 4.384-11.42-.442-1.072-1.898-5.4.412-11.26 0 0 3.572-1.142 11.7 4.363 3.395-.943 7.035-1.416 10.65-1.432 3.616.017 7.258.49 10.658 1.432 8.12-5.504 11.688-4.362 11.688-4.362 2.316 5.86.86 10.187.418 11.26 2.728 2.978 4.378 6.774 4.378 11.42 0 16.34-9.953 19.938-19.427 20.99 1.526 1.32 2.886 3.91 2.886 7.88 0 5.692-.048 10.273-.048 11.674 0 1.13.766 2.458 2.922 2.04 16.896-5.632 29.07-21.574 29.07-40.365C106.545 20.56 87.497 1.512 64 1.512z"></path><path d="M37.57 62.596c-.095.212-.428.275-.73.13-.31-.14-.482-.427-.382-.64.09-.216.424-.277.733-.132.31.14.486.43.38.642zM39.293 64.52c-.203.187-.6.1-.87-.198-.278-.297-.33-.694-.124-.884.208-.188.593-.1.87.197.28.3.335.693.123.884zm1.677 2.448c-.26.182-.687.012-.95-.367-.262-.377-.262-.83.005-1.013.264-.182.684-.018.95.357.262.385.262.84-.005 1.024zm2.298 2.368c-.233.257-.73.188-1.093-.163-.372-.343-.475-.83-.242-1.087.237-.257.736-.185 1.102.163.37.342.482.83.233 1.086zm3.172 1.374c-.104.334-.582.485-1.064.344-.482-.146-.796-.536-.7-.872.1-.336.582-.493 1.067-.342.48.144.795.53.696.87zm3.48.255c.013.35-.396.642-.902.648-.508.012-.92-.272-.926-.618 0-.354.4-.642.908-.65.506-.01.92.272.92.62zm3.24-.551c.06.342-.29.694-.793.787-.494.092-.95-.12-1.014-.46-.06-.35.297-.7.79-.792.503-.088.953.118 1.017.466zm0 0"></path></g><path d="M24.855 108.302h-10.7a.5.5 0 00-.5.5v5.232a.5.5 0 00.5.5h4.173v6.5s-.937.32-3.53.32c-3.056 0-7.327-1.116-7.327-10.508 0-9.393 4.448-10.63 8.624-10.63 3.614 0 5.17.636 6.162.943.31.094.6-.216.6-.492l1.193-5.055a.468.468 0 00-.192-.39c-.403-.288-2.857-1.66-9.058-1.66-7.144 0-14.472 3.038-14.472 17.65 0 14.61 8.39 16.787 15.46 16.787 5.854 0 9.405-2.502 9.405-2.502.146-.08.162-.285.162-.38v-16.316a.5.5 0 00-.5-.5zM79.506 94.81H73.48a.5.5 0 00-.498.503l.002 11.644h-9.392V95.313a.5.5 0 00-.497-.503H57.07a.5.5 0 00-.498.503v31.53c0 .277.224.503.498.503h6.025a.5.5 0 00.497-.504v-13.486h9.392l-.016 13.486c0 .278.224.504.5.504h6.038a.5.5 0 00.497-.504v-31.53a.497.497 0 00-.497-.502zm-47.166.717c-2.144 0-3.884 1.753-3.884 3.923 0 2.167 1.74 3.925 3.884 3.925 2.146 0 3.885-1.758 3.885-3.925 0-2.17-1.74-3.923-3.885-3.923zm2.956 9.608H29.29c-.276 0-.522.284-.522.56v20.852c0 .613.382.795.876.795h5.41c.595 0 .74-.292.74-.805v-20.899a.5.5 0 00-.498-.502zm67.606.047h-5.98a.5.5 0 00-.496.504v15.46s-1.52 1.11-3.675 1.11-2.727-.977-2.727-3.088v-13.482a.5.5 0 00-.497-.504h-6.068a.502.502 0 00-.498.504v14.502c0 6.27 3.495 7.804 8.302 7.804 3.944 0 7.124-2.18 7.124-2.18s.15 1.15.22 1.285c.07.136.247.273.44.273l3.86-.017a.502.502 0 00.5-.504l-.003-21.166a.504.504 0 00-.5-.502zm16.342-.708c-3.396 0-5.706 1.515-5.706 1.515V95.312a.5.5 0 00-.497-.503H107a.5.5 0 00-.5.503v31.53a.5.5 0 00.5.503h4.192c.19 0 .332-.097.437-.268.103-.17.254-1.454.254-1.454s2.47 2.34 7.148 2.34c5.49 0 8.64-2.784 8.64-12.502s-5.03-10.988-8.428-10.988zm-2.36 17.764c-2.073-.063-3.48-1.004-3.48-1.004v-9.985s1.388-.85 3.09-1.004c2.153-.193 4.228.458 4.228 5.594 0 5.417-.935 6.486-3.837 6.398zm-63.689-.118c-.263 0-.937.107-1.63.107-2.22 0-2.973-1.032-2.973-2.368v-8.866h4.52a.5.5 0 00.5-.504v-4.856a.5.5 0 00-.5-.502h-4.52l-.007-5.97c0-.227-.116-.34-.378-.34h-6.16c-.238 0-.367.106-.367.335v6.17s-3.087.745-3.295.805a.5.5 0 00-.36.48v3.877a.5.5 0 00.497.503h3.158v9.328c0 6.93 4.86 7.61 8.14 7.61 1.497 0 3.29-.48 3.586-.59.18-.067.283-.252.283-.453l.004-4.265a.51.51 0 00-.5-.502z" fill="#9f9fa9"></path>
                </svg>
                <svg viewBox="0 0 128 128">
                  <path fill="#9f9fa9" d="M117.688 98.242c-6.973-.191-12.297.461-16.852 2.379-1.293.547-3.355.559-3.566 2.18.711.746.82 1.859 1.387 2.777 1.086 1.754 2.922 4.113 4.559 5.352 1.789 1.348 3.633 2.793 5.551 3.961 3.414 2.082 7.223 3.27 10.504 5.352 1.938 1.23 3.859 2.777 5.75 4.164.934.684 1.563 1.75 2.773 2.18v-.195c-.637-.812-.801-1.93-1.387-2.777l-2.578-2.578c-2.52-3.344-5.719-6.281-9.117-8.719-2.711-1.949-8.781-4.578-9.91-7.73l-.199-.199c1.922-.219 4.172-.914 5.949-1.391 2.98-.797 5.645-.59 8.719-1.387l4.164-1.187v-.793c-1.555-1.594-2.664-3.707-4.359-5.152-4.441-3.781-9.285-7.555-14.273-10.703-2.766-1.746-6.184-2.883-9.117-4.363-.988-.496-2.719-.758-3.371-1.586-1.539-1.961-2.379-4.449-3.566-6.738-2.488-4.793-4.93-10.023-7.137-15.066-1.504-3.437-2.484-6.828-4.359-9.91-9-14.797-18.687-23.73-33.695-32.508-3.195-1.867-7.039-2.605-11.102-3.57l-6.543-.395c-1.332-.555-2.715-2.184-3.965-2.977C16.977 3.52 4.223-3.312.539 5.672-1.785 11.34 4.016 16.871 6.09 19.746c1.457 2.012 3.32 4.273 4.359 6.539.688 1.492.805 2.984 1.391 4.559 1.438 3.883 2.695 8.109 4.559 11.695.941 1.816 1.98 3.727 3.172 5.352.727.996 1.98 1.438 2.18 2.973-1.227 1.715-1.297 4.375-1.984 6.543-3.098 9.77-1.926 21.91 2.578 29.137 1.383 2.223 4.641 6.98 9.117 5.156 3.918-1.598 3.043-6.539 4.164-10.902.254-.988.098-1.715.594-2.379v.199l3.57 7.133c2.641 4.254 7.324 8.699 11.297 11.699 2.059 1.555 3.68 4.242 6.344 5.152v-.199h-.199c-.516-.805-1.324-1.137-1.98-1.781-1.551-1.523-3.277-3.414-4.559-5.156-3.613-4.902-6.805-10.27-9.711-15.855-1.391-2.668-2.598-5.609-3.77-8.324-.453-1.047-.445-2.633-1.387-3.172-1.281 1.988-3.172 3.598-4.164 5.945-1.582 3.754-1.789 8.336-2.375 13.082-.348.125-.195.039-.398.199-2.762-.668-3.73-3.508-4.758-5.949-2.594-6.164-3.078-16.09-.793-23.191.59-1.836 3.262-7.617 2.18-9.316-.516-1.691-2.219-2.672-3.172-3.965-1.18-1.598-2.355-3.703-3.172-5.551-2.125-4.805-3.113-10.203-5.352-15.062-1.07-2.324-2.875-4.676-4.359-6.738-1.645-2.289-3.484-3.977-4.758-6.742-.453-.984-1.066-2.559-.398-3.566.215-.684.516-.969 1.191-1.191 1.148-.887 4.352.297 5.547.793 3.18 1.32 5.832 2.578 8.527 4.363 1.289.855 2.598 2.512 4.16 2.973h1.785c2.789.641 5.914.195 8.523.988 4.609 1.402 8.738 3.582 12.488 5.949 11.422 7.215 20.766 17.48 27.156 29.734 1.027 1.973 1.473 3.852 2.379 5.945 1.824 4.219 4.125 8.559 5.941 12.688 1.816 4.113 3.582 8.27 6.148 11.695 1.348 1.801 6.551 2.766 8.918 3.766 1.66.699 4.379 1.43 5.949 2.379 3 1.809 5.906 3.965 8.723 5.945 1.402.992 5.73 3.168 5.945 4.957zm-88.605-75.52c-1.453-.027-2.48.156-3.566.395v.199h.195c.695 1.422 1.918 2.34 2.777 3.566l1.98 4.164.199-.195c1.227-.867 1.789-2.25 1.781-4.363-.492-.52-.562-1.164-.992-1.785-.562-.824-1.66-1.289-2.375-1.98zm0 0"></path>
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
                    disabled={submitStatus === 'loading'}
                    className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 sm:w-fit"
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
                <div className="light-button arratai scale-105 sm:scale-100">
                  <a href="https://aratt.ai/user/@nisargjayeshdelvadiya" target="_blank" rel="noopener noreferrer">
                    <button className="bt">
                      <div className="light-holder">
                        <div className="dot"></div>
                        <div className="light"></div>
                      </div>
                      <div className="button-holder">
                        <svg viewBox="0 0 48 48">
                          <path fillRule="evenodd" clipRule="evenodd" d="M42,37c0,2.76-2.24,5-5,5H11c-2.76,0-5-2.24-5-5V11c0-2.76,2.24-5,5-5h26c2.76,0,5,2.24,5,5V37z M35,33.957c-0.553,0-1-0.448-1-1v-18c0-0.552,0.447-1,1-1s1,0.448,1,1v18 C36,33.509,35.553,33.957,35,33.957z M30,33.957c-0.138,0-0.276-0.028-0.406-0.086l-4.306-1.914H14c-1.103,0-2-0.897-2-2v-7 c0-0.552,0.447-1,1-1h10c0.553,0,1,0.448,1,1s-0.447,1-1,1h-9v6h11.5c0.14,0,0.278,0.029,0.406,0.086L29,31.418V15.957H18v3 c0,0.552-0.447,1-1,1s-1-0.448-1-1v-3c0-1.103,0.897-2,2-2h11c1.103,0,2,0.897,2,2v17c0,0.338-0.171,0.654-0.455,0.838 C30.38,33.902,30.19,33.957,30,33.957z" />
                        </svg>
                        <p>Arratai</p>
                      </div>
                    </button>
                  </a>
                </div>
                {/* From Uiverse.io by Gaurang7717 */}
                <div className="light-button github scale-105 sm:scale-100">
                  <a href="https://github.com/NisargDelvadiya" target="_blank" rel="noopener noreferrer">
                    <button className="bt">
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
                  <a href="https://www.linkedin.com/in/nisargjayeshdelvadiya/" target="_blank" rel="noopener noreferrer">
                    <button className="bt">
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
                <a href="mailto:nisarg.delvadiya1@zohomail.in" className="text-zinc-400 hover:text-white transition-colors duration-300 text-lg font-medium tracking-wide">
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