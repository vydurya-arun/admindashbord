'use client'
import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { PiLineVerticalLight } from "react-icons/pi";
import AboutStats from '@/constants/AboutStats';
import SocialIcons from './SocialIcons';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
    const sectionRef = useRef(null);
    const imageRef = useRef(null);
    const contentRef = useRef(null);
    const statsRef = useRef([]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top center",
                    toggleActions: "play none none none",
                }
            });

            // Animate profile image and decorations
            tl.fromTo(imageRef.current, { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, 0);

            // Animate about content
            tl.fromTo(contentRef.current, { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, 0);

            // Stagger animation for stats
            tl.fromTo(statsRef.current, { y: 20, opacity: 0 }, {
                y: 0,
                opacity: 1,
                stagger: 0.2,
                duration: 0.5,
                ease: "power2.out"
            }, 0.5); // Starts half a second after the main animations

            // Animate globe image
            gsap.fromTo(".globe-image", 
                { opacity: 0, scale: 0.5 }, 
                { 
                    opacity: 0.4, 
                    scale: 1, 
                    duration: 1.5, 
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top center",
                        toggleActions: "play none none none",
                    }
                }
            );
        }
    }, []);

    return (
        <>
            <section  className='mb-20 max-w-7xl mx-auto px-2 md:px-15 overflow-hidden mt-30'>
                <div
                    ref={sectionRef}
                    className='relative flex flex-col md:flex-row justify-between items-center mt-20'
                >
                    <img src="/images/globe.svg" className='globe-image absolute right-[-60] md:right-[-60] md:top-[-50] opacity-0 md:w-[300px] md:h-[300px] w-[200px] h-[150px]' alt='Globe Illustration Image' />

                    {/* Profile Image and Decorations */}
                    <div ref={imageRef} className='relative mt-20'>
                        <Image src="/images/profile-bg.png" className='absolute left-5 top-2 rotate-180' width={130} height={80} alt='Profile Background Image' />
                        <Image src="/images/hima-2.png" width={400} height={250} className='relative z-10' alt='Hima Image' />
                        <Image src="/images/profile-bg.png" className='absolute right-13 bottom-[-13]' width={130} height={80} alt='Profile Background Image' />
                    </div>

                    {/* About Content */}
                    <div ref={contentRef} className='relative z-10 flex flex-col items-center md:items-start gap-10'>
                        <h2 className='text-5xl font-bold gradient-text-2'>About Me</h2>
                        <p className='text-white w-90 md:w-150 leading-7 [word-spacing:3px]'>I’m a passionate content writer who creates impactful content with clarity, creativity, and purpose. With years of experience in crafting engaging articles, blogs, website copy, and marketing materials, I help businesses communicate their message effectively.</p>
                        
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-15'>
                            {AboutStats.map((item, index) => (
                                <div ref={el => statsRef.current[index] = el} key={item.id} className='flex flex-col items-start gap-3'>
                                    <span className='gradient-text-2 text-4xl font-bold'>{item.value}</span>
                                    <p className='text-white md:w-40'>{item.description}</p>
                                </div>
                            ))}
                        </div>
                        
                        {/* Download CV & Social Icons */}
                        <div className='flex flex-col md:flex-row gap-3 items-center'>
                            <Link
                                href="#"
                                className="flex justify-center items-center gap-2 w-55 h-12 rounded-full text-white font-semibold
                                bg-[linear-gradient(90deg,#BB6FFB_0%,#FC5F67_52%,#FFB054_100%)]"
                            >
                                <span className='text-lg tracking-[1]'>Download CV</span>
                                <Image src="/images/arrow.svg" width={25} height={25} alt="arrow" className='rotate-135' />
                            </Link>
                            <SocialIcons />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default AboutSection;
