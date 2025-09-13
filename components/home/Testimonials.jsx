"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonialsData = [
  {
    id: 1,
    name: "Ravi Kumar,",
    title: "Digital Marketing Manager",
    quote:
      "Hima Sree is an exceptional content writer who understands the balance between creativity and clarity. She consistently delivers well-researched, SEO-friendly content tailored to our brand voice. Her professionalism, timely delivery, and adaptability make her a valuable asset to any content team.",
  },
  {
    id: 2,
    name: "Anjali Nair",
    title: "Small Business Owner",
    quote:
      "\"Working with Hima Sree has been a breeze! She's not only talented with words but also easy to communicate with and always meets deadlines. Whether it's a blog post, website content, or social media copy—she nails the tone every single time.\"",
  },
];

const Testimonials = () => {
  const headingRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    if (!headingRef.current || !cardsRef.current) return;

    // Animate the main heading and paragraph
    gsap.fromTo(
      headingRef.current.children,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top center",
          once: true,
        },
      }
    );

    // Animate the testimonial cards with a stagger
    gsap.fromTo(
      cardsRef.current.children,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top bottom",
          once: true,
        },
      }
    );
  }, []);

  return (
    <div className=" text-white py-20 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center relative">
        <div className="absolute h-130 w-130 md:top-[-100] md:right-[-10] 2xl:right-[-350] 2xl:top-[-150] rounded-full bg-[radial-gradient(circle_at_50%_50%,_rgba(155,81,224,0.9)_0%,_rgba(155,81,224,0.20)_0%,_transparent_70%)]">
            </div>
            <div className="absolute right-[-30] top-20 md:top-0 md:right-5 2xl:top-[-100] 2xl:right-[-300] ">
                <img src="/images/globe.svg" alt="Vector Image" className=" opacity-20 w-40 h-40 md:w-70 md:h-70 "/>
            </div>
        <div ref={headingRef} className="mb-12 relative z-20">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-500 to-orange-400 text-transparent bg-clip-text inline-block mb-2">
            What client say about
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Here's what my clients have to say about working with me. Their
            success stories are a testament to my commitment to delivering
            top-notch web solutions
          </p>
        </div>

        <div
          ref={cardsRef}
          className="flex flex-col md:flex-row justify-center gap-8"
        >
          {testimonialsData.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-[#2a2a4a] rounded-2xl p-8 shadow-xl max-w-xl text-left flex-1 flex flex-col justify-between opacity-0"
            >
              <div>
                <p className="text-lg leading-relaxed mb-6">
                  {testimonial.quote}
                </p>
              </div>
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                <div className="text-yellow-400 text-xl mb-4">
                  <span>⭐️</span>
                  <span>⭐️</span>
                  <span>⭐️</span>
                  <span>⭐️</span>
                  <span>⭐️</span>
                </div>
                <div className="text-start md:text-right text-gray-400 text-sm italic">
                  <span className="font-bold text-white block">
                    {testimonial.name}
                  </span>
                  <span className="block">{testimonial.title}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
