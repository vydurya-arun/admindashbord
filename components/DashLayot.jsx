"use client";

import React, { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import gsap from "gsap";

const DashLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [renderSidebar, setRenderSidebar] = useState(false);
  const sidebarRef = useRef(null);
  const overlayRef = useRef(null);

  const openSidebar = () => {
    setRenderSidebar(true);
    setIsOpen(true);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  // GSAP animations
  useEffect(() => {
    if (isOpen && sidebarRef.current && overlayRef.current) {
      // Animate IN
      gsap.fromTo(
        sidebarRef.current,
        { x: -300 },
        { x: 0, duration: 0.4, ease: "power3.out" }
      );
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 0.5, duration: 0.4, ease: "power2.out" }
      );
    } else if (!isOpen && sidebarRef.current && overlayRef.current) {
      // Animate OUT
      gsap.to(sidebarRef.current, {
        x: -300,
        duration: 0.4,
        ease: "power3.in",
        onComplete: () => setRenderSidebar(false), // remove from DOM after animation
      });
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
      });
    }
  }, [isOpen]);

  return (
    <div>
      <div className="w-screen h-screen grid grid-cols-10 grid-rows-10 relative z-0">
        <nav className="row-start-1 row-end-2 col-start-1 md:col-start-3 col-end-11 shadow-[0_2px_4px_rgba(0,0,0,0.1)] flex items-center px-4 bg-white">
          <button onClick={openSidebar}>
            <Menu className="md:hidden" />
          </button>
        </nav>

        {/* Sidebar (Desktop) */}
        <section className="hidden md:block row-start-1 row-end-11 col-start-1 col-end-3 p-4 ">
          sidebar
        </section>

        {/* Main Content */}
        <main className="bg-[#F5F6FA] row-start-2 row-end-11 col-start-1 md:col-start-3 col-end-11 p-4">
          {children}
        </main>
      </div>

      {/* Mobile Sidebar + Overlay */}
      {renderSidebar && (
        <>
          <div
            ref={sidebarRef}
            className="bg-white w-[300px] h-screen absolute top-0 left-0 md:hidden flex justify-between items-start px-3 py-3 z-20 shadow-lg"
          >
            <p>Logo</p>
            <button
              onClick={closeSidebar}
              className="rounded-full bg-gray-200 p-2"
            >
              <X />
            </button>
          </div>

          {/* Overlay */}
          <div
            ref={overlayRef}
            onClick={closeSidebar}
            className="bg-black absolute w-screen h-screen top-0 left-0 md:hidden z-10"
          />
        </>
      )}
    </div>
  );
};

export default DashLayout;
