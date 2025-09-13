'use client'
import { Facebook, Instagram, Twitter } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const [showGoUpBtn, setShowGoUpBtn] = useState(false);
  const footerRef = useRef(null);

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

  useEffect(() => {
    // Set up scroll trigger for the main footer animation
    gsap.fromTo(
      footerRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 95%",
          once: true,
        },
      }
    );

    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowGoUpBtn(true);
      } else {
        setShowGoUpBtn(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer ref={footerRef} className=" text-white py-12 px-4 relative md:mt-20 2xl:mt-0">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-500 to-orange-400 text-transparent bg-clip-text">
            Hima Sree Hari
          </h1>
          <nav className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-gray-400 transition-colors">Home</a>
            <a href="#" className="hover:text-gray-400 transition-colors">About</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Services</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Blog</a>
          </nav>
        </div>

        <hr className="w-full border-t border-gray-700 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © Copyright 2025 Hima Sree Hari - All Rights Reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="relative flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm bg-[#1a1a2e]">
              <span className="z-10">View my work</span>
              <Image src="/images/arrow.svg" width={25} height={25} alt="arrow" className="z-10 rotate-135"/>
              <span className="absolute inset-0 rounded-full p-0.5 bg-gradient-to-r from-purple-500 to-orange-400 z-0"></span>
            </a>
            <div className="flex gap-2">
              <a href="#" className="relative w-10 h-10 rounded-full bg-black overflow-hidden flex items-center justify-center">
                <Instagram/>
                <span className="absolute inset-0 rounded-full p-0.5 z-0"></span>
              </a>
              <a href="#" className="relative w-10 h-10 rounded-full bg-black overflow-hidden flex items-center justify-center">
                <Twitter/>
                <span className="absolute inset-0 rounded-full p-0.5 z-0"></span>
              </a>
              <a href="#" className="relative w-10 h-10 rounded-full bg-black overflow-hidden flex items-center justify-center">
                <Facebook/>
                <span className="absolute inset-0 rounded-full p-0.5 z-0"></span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {showGoUpBtn && (
        <button
          onClick={handleScrollToTop}
          className="absolute up-arrow right-0 bottom-50 2xl:right-55 2xl:bottom-25 z-50 text-gray-400 hover:text-white transform rotate-90 transition-colors flex items-center"
        >
          <span className="text-xl inline-block transform -rotate-90">^</span>
          <span className="text-sm font-bold tracking-wide">GO UP</span>
        </button>
      )}
    </footer>
  );
};

export default Footer;
