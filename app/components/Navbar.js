"use client"
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

/**
 * Navigation Bar Component
 * Handles site navigation, smooth scrolling to page sections, 
 * and mobile menu state management.
 */
const Navbar = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (e, targetId) => {
    setIsMobileMenuOpen(false); // Close mobile menu when an item is clicked
    if (pathname === '/') {
      e.preventDefault();
      
      if (targetId === 'top') {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      } else {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    }
  };

  const navLinks = [
    { name: 'Home', id: 'top', path: '/' },
    { name: 'About', id: 'about', path: '/#about' },
    { name: 'Education', id: 'education', path: '/#education' },
    { name: 'Projects', id: 'projects', path: '/#projects' },
    { name: 'Skills', id: 'skills', path: '/#skills' },
    { name: 'Contact', id: 'contact', path: '/#contact' },
  ];

  return (
    <nav className="text-white flex items-center justify-between px-8 h-20 sticky top-0 z-50 bg-[#1a1a1a]">

      <a href="https://www.nisargjayeshdelvadiya.com" className="logo flex relative items-center">
        <div className="logo2">
          <img src="/Assets/Logo2.png" alt="logo" width="40" />
        </div>
        <div className="logo1 mt-2">
          <img src="/Assets/Logo1.png" alt="logo" width="140" />
        </div>
      </a>

      {/* Desktop Menu - From Uiverse.io by SelfMadeSystem */}
      <div className="hidden md:flex items-center justify-end flex-grow">
        <div className="nav">
          <div className="container">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.path} 
                onClick={(e) => handleNavClick(e, link.id)} 
                className="btn text-center text-zinc-400 hover:text-white transition cursor-pointer flex items-center justify-center"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Hamburger Toggle */}
      <div className="md:hidden flex items-center">
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
          className="text-white hover:text-zinc-300 transition focus:outline-none p-2"
        >
          <img 
            src={isMobileMenuOpen ? "/Assets/close.svg" : "/Assets/menu.svg"} 
            alt={isMobileMenuOpen ? "Close menu" : "Open menu"} 
            className="w-8 h-8" 
          />
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-20 left-0 w-full bg-[#1a1a1a] flex flex-col items-center py-6 shadow-2xl md:hidden border-t border-zinc-800 gap-6">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              href={link.path} 
              onClick={(e) => handleNavClick(e, link.id)} 
              className="text-lg font-medium text-zinc-400 hover:text-white transition cursor-pointer"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}

      <style dangerouslySetInnerHTML={{
        __html: `
        /* From Uiverse.io by SelfMadeSystem */
        .nav { 
          position: relative; 
          width: 100%;
          max-width: 650px; 
          height: 60px; 
        }
        .container { position: absolute; inset: 0; display: flex; flex-direction: row; justify-content: space-between; align-items: center; padding: 0.5em; }
        .btn { padding: 0.5em 1.2em; color: #fff; cursor: pointer; transition: 0.1s; border-radius: 13px; font-weight: 600; font-size: 0.95rem; text-decoration: none; }
        .btn:hover { background: rgba(46, 142, 255, 0.2); color: #fff; }
      `}} />
    </nav>
  );
};

export default Navbar;