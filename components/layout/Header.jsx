'use client'
import { Facebook, Instagram, Twitter } from "lucide-react";
import React, { useState, useEffect } from "react";
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Header = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // show header when preloader signals it's done
        const onPreloaderDone = () => setIsVisible(true);
        window.addEventListener('preloader:done', onPreloaderDone);

        // fallback: in case preloader doesn't exist or event missed, reveal after 3s
        const fallback = setTimeout(() => setIsVisible(true), 3000);

        return () => {
        window.removeEventListener('preloader:done', onPreloaderDone);
        clearTimeout(fallback);
        };
    }, []);

    const pathname = usePathname() || '/'
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const isActive = (href) => {
        // This logic is for highlighting the active link, not for scrolling.
        return pathname === href;
    };

    const handleSmoothScroll = (e, sectionId) => {
        e.preventDefault();
        const section = document.getElementById(sectionId);
        if (section) {
            window.scrollTo({
                top: section.offsetTop,
                behavior: 'smooth'
            });
        }
        if (isMenuOpen) {
            toggleMenu();
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useGSAP(()=>{
        gsap.fromTo(".up-arrow",
          {
            y:0
          },
          {
            y:2,
            repeat:-1,
            yoyo:true,
            duration:1.7,
            ease:"power2.inOut"
          }
        )
      })

    return (
        <>
            <header
              className={`sticky top-0 navbar px-5 py-3 sm:px-10 lg:px-15 text-[#B8B8B8] z-50 transition-all duration-300 ease-in-out ${isScrolled ? 'backdrop-blur-xl bg-black/30' : ''}`}
              // control initial visibility so header doesn't flash before preloader finishes
              style={{
                opacity: isVisible ? 1 : 0,
                pointerEvents: isVisible ? 'auto' : 'none',
                transition: 'opacity 250ms ease'
              }}
            >
                <nav className='flex justify-between items-center'>
                    <div className='flex items-center'>
                        {/* give the logo a real height to avoid layout reflow */}
                        <Image src="/images/logo.png" width={200} height={36} alt="Logo" />
                    </div>

                    {/* Desktop Menu */}
                    <div className='hidden md:flex flex-1 justify-center gap-10'>
                        <a
                            href="/"
                            onClick={(e) => handleSmoothScroll(e, 'home')}
                            className={`text-base transition-colors duration-200 ${isActive('#home') ? 'gradient-text' : 'text-[#B8B8B8]'} hover:gradient-text`}
                        >
                            Home
                        </a>
                        <a href="#about" onClick={(e) => handleSmoothScroll(e, 'about')} className={`text-base transition-colors duration-200 ${isActive('#about') ? 'gradient-text' : 'text-[#B8B8B8]'} hover:text-gradient-text`}>
                            About
                        </a>
                        <a href="#services" onClick={(e) => handleSmoothScroll(e, 'services')} className={`text-base transition-colors duration-200 ${isActive('#services') ? 'gradient-text' : 'text-[#B8B8B8]'} hover:gradient-text`}>
                            Services
                        </a>
                        <a href="#blog" onClick={(e) => handleSmoothScroll(e, 'blog')} className={`text-base transition-colors duration-200 ${isActive('#blog') ? 'gradient-text' : 'text-[#B8B8B8]'} hover:gradient-text`}>
                            Blog
                        </a>
                    </div>

                    <div className='hidden md:block'>
                        <a href="#" className='text-lg tracking-wide px-5 py-2 text-white font-bold bg-[#69727d] flex gap-2 justify-center items-center border-color'>
                            <span>Get In Touch</span>
                            <span><Image src="/images/arrow.svg" width={20} height={20} alt='Arrow Symbol' /></span>
                        </a>
                    </div>

                    {/* Hamburger menu for mobile */}
                    <div className='md:hidden'>
                        <button onClick={toggleMenu} className="focus:outline-none">
                            <svg className="w-8 h-8 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                {isMenuOpen ? (
                                    <path d="M6 18L18 6M6 6l12 12"></path>
                                ) : (
                                    <path d="M4 6h16M4 12h16m-7 6h7"></path>
                                )}
                            </svg>
                        </button>
                    </div>
                </nav>

                {/* Mobile Menu */}
                <div 
                    className={`md:hidden absolute top-full left-0 right-0 w-full flex flex-col items-center gap-4 bg-[#1a1a2e] pb-4 transition-all duration-300 ease-in-out ${
                        isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                    }`}
                >
                    <a
                        href="#home"
                        onClick={(e) => handleSmoothScroll(e, 'home')}
                        className={`text-base transition-colors duration-200 ${isActive('/') ? 'text-blue-600' : 'text-[#B8B8B8]'} hover:text-blue-600`}
                    >
                        Home
                    </a>
                    <a href="#about" onClick={(e) => handleSmoothScroll(e, 'about')} className={`text-base transition-colors duration-200 ${isActive('/about') ? 'gradient-text' : 'text-[#B8B8B8]'} hover:gradient-text`}>
                        About
                    </a>
                    <a href="#services" onClick={(e) => handleSmoothScroll(e, 'services')} className={`text-base transition-colors duration-200 ${isActive('/services') ? 'gradient-text' : 'text-[#B8B8B8]'} hover:gradient-text`}>
                        Services
                    </a>
                    <a href="#blog" onClick={(e) => handleSmoothScroll(e, 'blog')} className={`text-base transition-colors duration-200 ${isActive('/blog') ? 'gradient-text' : 'text-[#B8B8B8]'} hover:gradient-text`}>
                        Blog
                    </a>
                    <a href="#" className='text-lg tracking-wide px-5 py-2 text-white font-bold bg-[#69727d] flex gap-2 justify-center items-center border-color mt-4'>
                        <span>Get In Touch</span>
                    </a>
                </div>
            </header>
        </>
    );
}

export default Header;
