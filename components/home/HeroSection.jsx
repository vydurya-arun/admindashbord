'use client'
import React,{useRef,useEffect} from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin);

const HeroSection = () => {
    const contentRef = useRef(null);

useEffect(() => {
  const el = contentRef.current;
  if (!el) return;

  const text = "Content Writer";
  el.textContent = "";
  const charSpeed = 0.06; // seconds per character — smaller is faster
  const duration = Math.max(0.6, text.length * charSpeed);

  const tl = gsap.timeline();
  tl.to(el, {
    duration,
    text,
    ease: "none",
  });

  // optional caret: add class that displays caret via CSS
  el.classList.add("typed");

  return () => {
    tl.kill();
    el.classList.remove("typed");
  };
}, []);

  return (
    <>
        <section  className="bg-[url('/images/Bg-pattern.png')] bg-cover bg-no-repeat min-h-screen hero-section opacity-0  px-2 md:px-15 md:mb-0 mb-40 mt-15 md:mt-0 overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col gap-10 md:gap-0 md:flex-row justify-between items-center min-h-screen px-8">
                {/* Left column */}
                <div className="flex flex-col gap-4 max-w-xl">
                <div className="flex gap-4 items-center tracking-[1px]">
                    <span className="text-white text-5xl font-bold">Hi!</span>
                    <Image
                    src="/images/waving-hand.svg"
                    width={60}
                    height={60}
                    alt="waving hand"
                    />
                </div>
                
                <div>
                    <span className="text-3xl md:text-5xl text-white font-bold w-80 md:w-110 block tracking-[1px]">
                    Hima Sree Hari is a
                    </span>
                </div>

                <div>
                    <div className="relative mt-10 flex gap-3 items-center">
                        <span className=" text-[#69727d] text-xl md:text-3xl font-semibold">
                            Professional
                        </span>

                        <p
                            ref={contentRef}
                            className="relative text-2xl md:text-3xl font-bold gradient-text"
                            aria-label="Content Writer"
                        />
                    </div>
                </div>

                <div>
                    <p className="w-80 md:w-120 [word-spacing:2px] text-white leading-7">
                    Content writer, I create impactful content with clarity and
                    purpose. I have years of experience and many clients are happy
                    with the results delivered across projects.
                    </p>
                </div>

                {/* Buttons / socials block (this will be animated by GSAP as hero-sec-socials) */}
                <div className="flex flex-col md:flex-row gap-6 mt-5 items-center hero-sec-socials opacity-0">
                    <Link
                    href="#"
                    className="flex justify-center items-center gap-2 w-40 h-12 rounded-full text-white font-bold
                                bg-[linear-gradient(90deg,#BB6FFB_0%,#FC5F67_52%,#FFB054_100%)]"
                    >
                    <span>Hire Me</span>
                    <Image src="/images/arrow.svg" width={25} height={25} alt="arrow" />
                    </Link>

                    <Link
                    href="#"
                    className="flex justify-center items-center gap-2 w-48 h-12 rounded-md bg-[#69727d] text-white font-bold"
                    >
                    <span>View my work</span>
                    <Image src="/images/arrow.svg" width={25} height={25} alt="arrow" />
                    </Link>
                </div>
                </div>

                {/* Right column - visuals */}
                <div className="relative">
                    <Image
                        src="/images/4-shape.png"
                        className="absolute right-[-200] top-[-80]"
                        width={100}
                        height={70}
                        alt="4 Shape Image"
                    />
                    <Image
                        src="/images/profile-bg.png"
                        className="absolute left-5 top-20 rotate-180"
                        width={130}
                        height={80}
                        alt="profile bg"
                    />
                    <Image
                        src="/images/hero-design-round.png"
                        className="absolute right-0"
                        width={60}
                        height={60}
                        alt="hero round"
                    />
                    <Image
                        src="/images/hima.png"
                        width={350}
                        height={250}
                        className="relative z-20"
                        alt="hima"
                    />
                    <Image
                        src="/images/profile-bg.png"
                        className="absolute right-[-10px] bottom-[-30px]"
                        width={130}
                        height={80}
                        alt="profile bg 2"
                    />
                    <Image
                        src="/images/hero-design-round.png"
                        className="absolute left-0"
                        width={60}
                        height={60}
                        alt="hero round 2"
                    />
                </div>
            </div>
        </section>
        <style jsx>{`
  /* caret for typed text */
  .typed::after {
    content: "";
    display: inline-block;
    width: 2px;
    height: 1.15em;
    margin-left: 8px;
    background: currentColor;
    animation: blink 1s steps(2, start) infinite;
    vertical-align: middle;
  }
  @keyframes blink {
    50% { opacity: 0; }
  }
`}</style>

    </>
  );
};

export default HeroSection;
