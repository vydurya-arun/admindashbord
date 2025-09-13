"use client";
import { useEffect } from "react";
import gsap from "gsap";
import Image from "next/image";

export default function Preloader() {
  useEffect(() => {
    // lock scroll while preloader runs
    document.body.classList.add("overflow-hidden");

    const preloader = gsap.timeline({
      paused: true,
      onComplete: () => {
        // restore scroll
        document.body.classList.remove("overflow-hidden");

        // notify other parts of the app (Header) that preloader finished
        if (typeof window !== "undefined") {
          window.dispatchEvent(new Event("preloader:done"));
        }
      },
    });

    // ensure these elements are hidden until the timeline shows them
    gsap.set(".navbar", { opacity: 0 });
    gsap.set(".hero-section", { opacity: 0 });
    gsap.set(".hero-sec-socials", { opacity: 0 });

    preloader
      .to(".logo-container", { opacity: 1, delay: 1, duration: 0.5 })
      .to(".loading-screen", {
        yPercent: -100,
        duration: 1.3,
        ease: "expo.inOut",
      })
      .to(".hero-section", { opacity: 1, duration: 0.3 })
      .to(".navbar", { opacity: 1, duration: 0.3 })
      .to(".hero-sec-socials", { opacity: 1, duration: 0.3 });

    preloader.play();

    // cleanup if component unmounts before timeline completes
    return () => {
      preloader.kill();
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  return (
    <div className="loading-screen fixed top-0 left-0 w-full h-full bg-black z-50 flex items-center justify-center">
      <div className="logo-container opacity-0 text-white text-3xl font-bold flex justify-center">
        {/* give the image a real height to avoid layout reflow */}
        <Image src="/images/logo.png" width={200} height={40} alt="logo" />
      </div>
    </div>
  );
}
