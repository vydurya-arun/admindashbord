"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ServiceCard from "./ServiceCard";
import Services from "@/constants/Services"; // adjust path if needed

gsap.registerPlugin(ScrollTrigger);

export default function ServicesSection() {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const mmRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const left = leftRef.current;
    const right = rightRef.current;
    if (!section || !left || !right) return;

    // wait until images inside right column are loaded
    const waitForImages = () => {
      const imgs = Array.from(right.querySelectorAll("img"));
      if (!imgs.length) return Promise.resolve();
      return Promise.all(
        imgs.map(
          (img) =>
            new Promise((resolve) => {
              if (img.complete && img.naturalWidth !== 0) return resolve();
              img.addEventListener("load", resolve, { once: true });
              img.addEventListener("error", resolve, { once: true });
            })
        )
      );
    };

    const computeEnd = () => {
      const rightScrollHeight = right.scrollHeight;
      const endDistance = Math.max(
        0,
        rightScrollHeight - window.innerHeight + (left.offsetHeight || 0) + 40
      );
      return endDistance;
    };

    const init = async () => {
      await waitForImages();

      // revert previous matchMedia if exists
      if (mmRef.current) {
        mmRef.current.revert();
        mmRef.current = null;
      }

      const mm = gsap.matchMedia();
      mmRef.current = mm;

      // Desktop: pin left
      mm.add(
        {
          isDesktop: "(min-width: 1024px)",
        },
        (context) => {
          if (!context.conditions.isDesktop) return;

          const pinTrigger = ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: () => `+=${computeEnd()}`,
            pin: left,
            pinSpacing: true,
            anticipatePin: 1,
            // markers: true,
          });

          // animate each service-card as it enters the viewport
          const cards = gsap.utils.toArray(".service-card", right);
          cards.forEach((card) => {
            gsap.fromTo(
              card,
              { y: 30, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.7,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: card,
                  start: "top 80%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          });

          const ro = new ResizeObserver(() => ScrollTrigger.refresh());
          ro.observe(right);
          ro.observe(left);

          return () => {
            pinTrigger.kill();
            ro.disconnect();
          };
        }
      );

      // Mobile / tablet: reveal animations only
      mm.add(
        {
          isMobile: "(max-width: 1023px)",
        },
        () => {
          const cards = gsap.utils.toArray(".service-card", right);
          cards.forEach((card) =>
            gsap.fromTo(
              card,
              { y: 20, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.6,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: card,
                  start: "top 90%",
                  toggleActions: "play none none reverse",
                },
              }
            )
          );
        }
      );
    };

    // initial run
    init();

    // re-init on resize (debounced)
    let resizeTimeout = null;
    const onResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => init(), 200);
    };
    window.addEventListener("resize", onResize);

    // detect dynamic content changes in right column
    const mutationObserver = new MutationObserver(() => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => init(), 200);
    });
    mutationObserver.observe(right, { childList: true, subtree: true });

    // cleanup
    return () => {
      window.removeEventListener("resize", onResize);
      mutationObserver.disconnect();
      if (mmRef.current) {
        mmRef.current.revert();
        mmRef.current = null;
      }
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef} 
      className="bg-[linear-gradient(to_bottom,_#1E1E1E_0%,_#171614_100%)] text-white px-6 md:px-12 py-30"
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div ref={leftRef} className="lg:col-span-5 col-span-1 mb-8 lg:mb-0">
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight gradient-heading">
              Professional Writing Services to
              <br />
              Elevate Your Brand
            </h2>

            <p className="mt-6 text-base text-[#d1d1d1] max-w-[520px]">
              Offering a wide range of content writing services tailored to your
              business needs – from website content and blogs to SEO writing and
              social media posts. Clear, engaging, and result-driven content to
              help your brand stand out.
            </p>
          </div>

          <div
            ref={rightRef}
            className="lg:col-span-7 col-span-1 flex flex-col gap-12"
          >
            {Services.map((s, i) => (
              <ServiceCard
                key={i}
                index={i}
                title={s.title}
                description={s.description}
                image={s.image}
                className="service-card opacity-0"
              />
            ))}

            <div className="h-20" />
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
