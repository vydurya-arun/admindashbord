"use client";
import React, { useEffect, useRef, useState } from "react";
import InsightsCard from "@/constants/InsightsCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getAllBlogsInpublic } from "@/api_controller/blogsController";

gsap.registerPlugin(ScrollTrigger);

const InsightsSection = () => {
  const headingContainerRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const powerfulTextRef = useRef(null);
  const [blogsData, setBlogsData] = useState([]);

  useEffect(() => {
    // Fetch blogs data
    const fetchBlogs = async () => {
      try {
        const data = await getAllBlogsInpublic();
        setBlogsData(data);
        console.log(data, "frontend");
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    if (!headingContainerRef.current || !cardsContainerRef.current || !powerfulTextRef.current) return;

    // Animate heading
    gsap.fromTo(
      headingContainerRef.current.children,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: { trigger: headingContainerRef.current, start: "top center", once: true },
      }
    );

    // Animate cards
    gsap.fromTo(
      cardsContainerRef.current.children,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: { trigger: cardsContainerRef.current, start: "top bottom", once: true },
      }
    );

    // Animate final text
    gsap.fromTo(
      powerfulTextRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: { trigger: powerfulTextRef.current, start: "top bottom", once: true },
      }
    );
  }, [blogsData]); // re-run animations after blogsData loads

  return (
    <section className="bg-[linear-gradient(to_bottom,_#1E1E1E_0%,_#171614_100%)] text-white py-20 px-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute h-130 w-130 left-[-150] bottom-0 rounded-full bg-[radial-gradient(circle_at_50%_50%,_rgba(155,81,224,0.9)_0%,_rgba(155,81,224,0.20)_0%,_transparent_70%)]"></div>
      <div className="absolute bottom-0 left-[-50] overflow-hidden">
        <img src="/images/vector.svg" alt="Vector Image" className="opacity-60 w-50 h-50 md:w-70 md:h-70 rotate-45" />
      </div>
      <div className="absolute h-130 w-130 right-[-150] bottom-[30] hidden md:block rounded-full bg-[radial-gradient(circle_at_50%_50%,_rgba(155,81,224,0.9)_0%,_rgba(155,81,224,0.20)_0%,_transparent_70%)]"></div>
      <div className="absolute bottom-20 right-[-10]">
        <img src="/images/vector.svg" alt="Vector Image" className="opacity-60 w-70 h-70 hidden md:block" />
      </div>

      <div className="max-w-7xl mx-auto text-center relative z-20">
        {/* Heading */}
        <div ref={headingContainerRef} className="mb-12 flex flex-col gap-4">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-500 to-orange-400 text-transparent bg-clip-text inline-block mb-2">
            Insights and Updates
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Stay up-to-date with the latest trends. My blog is filled with
            valuable insights, tips, and news to help you navigate the digital
            landscape.
          </p>
        </div>

        {/* Cards */}
        <div ref={cardsContainerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 px-2 md:px-15">
          {blogsData.length > 0
            ? blogsData.map((post) => (
                <a key={post._id} href={`/blogs/${post._id}`} className="group relative rounded-xl overflow-hidden shadow-xl transform transition-transform duration-300 hover:scale-105 opacity-0">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-6 bg-black/70 backdrop-blur-sm transform translate-y-full opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <h3 className="text-lg font-bold leading-tight mb-2 text-white">{post.title}</h3>
                    <span className="text-sm font-semibold text-orange-400">Learn more</span>
                  </div>
                </a>
              ))
            : InsightsCard.map((post) => (
                <a key={post.id} href={post.link} className="group relative rounded-xl overflow-hidden shadow-xl transform transition-transform duration-300 hover:scale-105 opacity-0">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-6 bg-black/70 backdrop-blur-sm transform translate-y-full opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <h3 className="text-lg font-bold leading-tight mb-2 text-white">{post.title}</h3>
                    <span className="text-sm font-semibold text-orange-400">Learn more</span>
                  </div>
                </a>
              ))}
        </div>

        {/* Final Text */}
        <div className="px-2 md:px-15">
          <p ref={powerfulTextRef} className="text-start text-3xl md:text-6xl font-bold gradient-text-2 mt-30">
            Powerful Writing for <br /> Powerful Results.
          </p>
        </div>
      </div>
    </section>
  );
};

export default InsightsSection;
