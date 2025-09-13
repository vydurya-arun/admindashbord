"use client";
import React, { useEffect, useRef } from "react";
import Services from "@/constants/Services";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function ServicesSectionVariant() {
    const sectionRef = useRef(null);
    const leftContentRef = useRef(null);
    const rightContentRef = useRef(null);

    useEffect(() => {
        if (!sectionRef.current || !leftContentRef.current || !rightContentRef.current) {
            return;
        }

        const section = sectionRef.current;
        const leftContent = leftContentRef.current;
        const rightContent = rightContentRef.current;

        // Animate the left side content
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top center",
                once: true,
            },
        });

        tl.fromTo(leftContent.children, 
            { y: 50, opacity: 0 }, 
            { y: 0, opacity: 1, stagger: 0.2, duration: 0.8, ease: "power2.out" }
        );

        // Animate the service cards with a stagger
        gsap.fromTo(rightContent.children,
            { x: 50, opacity: 0 },
            { 
                x: 0, 
                opacity: 1, 
                stagger: 0.15, 
                duration: 0.7, 
                ease: "power2.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top center",
                    once: true,
                }
            }
        );

    }, []);

    return (
        <section ref={sectionRef} className="relative text-white py-24 px-6 md:px-12 lg:px-20  overflow-hidden" >
            <div className="absolute h-130 w-130 left-[-150] bottom-0 rounded-full bg-[radial-gradient(circle_at_50%_50%,_rgba(155,81,224,0.9)_0%,_rgba(155,81,224,0.20)_0%,_transparent_70%)]">
            </div>
            <div className="absolute bottom-0 left-[-50] ">
                <img src="/images/vector.svg" alt="Vector Image" className=" opacity-60 w-40 h-40 md:w-70 md:h-70 rotate-45"/>
            </div>
            <div className="absolute h-130 w-130 right-[-150] top-[-150] rounded-full bg-[radial-gradient(circle_at_50%_50%,_rgba(155,81,224,0.9)_0%,_rgba(155,81,224,0.20)_0%,_transparent_70%)]">
            </div>
            <div className="absolute top-0 right-[-10] ">
                <img src="/images/vector.svg" alt="Vector Image" className=" opacity-60 w-40 h-40 md:w-70 md:h-70 "/>
            </div>
            <div className="relative z-10 max-w-[1200px] mx-auto ">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    {/* LEFT */}
                    <div ref={leftContentRef} className="relative lg:col-span-5 col-span-1 flex flex-col gap-8">
                        <div className="flex items-center gap-4">
                            <Image src="/images/border-star.png" width={200} height={100} alt="Arrow Image"/>
                        </div>

                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight gradient-heading">
                            Services That I
                            <br />
                            Provide
                        </h2>

                        <p className="text-sm md:text-base text-[#cfcfcf] max-w-[520px]">
                            Offering a wide range of content writing services tailored to your
                            business needs – from website content and blogs to SEO writing and
                            social media posts. Clear, engaging, and result-driven content to
                            help your brand stand out.
                        </p>
                    </div>

                    {/* RIGHT — titles only */}
                    <div ref={rightContentRef} className="lg:col-span-7 col-span-1 flex flex-col gap-6">
                        {Services.map((s, i) => (
                            <button
                                key={i}
                                className="group relative w-full overflow-hidden rounded-md bg-[#0b0b0b] border border-[#1e1e1e] p-6 flex items-center justify-between gap-4 hover:shadow-[0_12px_30px_rgba(0,0,0,0.6)] transition-shadow duration-300"
                                aria-label={`Open ${s.title}`}
                            >
                                {/* left accent bar */}
                                <span
                                    aria-hidden
                                    className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#BB6FFB] via-[#FC5F67] to-[#FFB054] opacity-90"
                                />

                                {/* content */}
                                <div className="flex items-center gap-6">
                                    <span className="text-xl md:text-3xl font-extrabold text-white">
                                        {s.title}
                                    </span>
                                </div>

                                {/* right area: number badge + circular action */}
                                <div className="flex items-center gap-4">
                                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#0b0b0b] border border-[#222] text-white font-semibold">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>

                                    <span className="p-[3px] rounded-full bg-gradient-to-r from-[#BB6FFB] via-[#FC5F67] to-[#FFB054]">
                                        <span className=" w-9 h-9 rounded-full bg-[#0b0b0b] flex items-center justify-center">
                                            <svg
                                                width="14"
                                                height="14"
                                                viewBox="0 0 24 24"
                                                fill="white"
                                                aria-hidden
                                            >
                                                <path d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z" />
                                            </svg>
                                        </span>
                                    </span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
                .gradient-heading {
                    background: linear-gradient(
                        90deg,
                        #bb6ffb 0%,
                        #fc5f67 52%,
                        #ffb054 100%
                    );
                    -webkit-background-clip: text;
                    background-clip: text;
                    color: transparent;
                }
            `}</style>
        </section>
    );
}
