"use client";
import React from "react";
import Image from "next/image";

export default function ServiceCard({
  index = 0,
  title,
  description,
  image,
  className = "",
}) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <article
      className={`relative bg-[#0b0b0b] rounded-md p-6 md:p-8 overflow-hidden ${className}`}
    >
      {/* gradient arrow button top-right */}
      <button
        aria-label="open"
        className="absolute right-6 top-6 w-10 h-10 p-[2px] rounded-full bg-[linear-gradient(90deg,#bb6ffb_0%,#fc5f67_52%,#ffb054_100%)] flex items-center justify-center"
      >
        <span className="w-full h-full rounded-full bg-[#0b0b0b] flex items-center justify-center">
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
      </button>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* IMAGE */}
        <div className="md:col-span-4 col-span-1">
          <div className="w-full aspect-[4/3] rounded-sm border border-[#1f1f1f] bg-[#080808] overflow-hidden flex items-center justify-center">
            {image ? (
              <Image
                src={image}
                alt={title}
                width={600}
                height={450}
                className="object-contain w-full h-full"
              />
            ) : (
              <div className="text-sm text-[#777] px-4">No image</div>
            )}
          </div>
        </div>

        {/* CONTENT */}
        <div className="md:col-span-8 col-span-1 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl md:text-2xl font-extrabold mb-3 gradient-heading">
              {title}
            </h3>

            <p className="text-sm text-[#bfc1c6] max-w-[90%]">{description}</p>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-full text-white bg-[#0b0b0b] border border-[#1f1f1f] font-semibold">
              {num}
            </span>

            <a className="text-sm text-[#d9d9d9] hover:text-white" href="#">
              Read more
            </a>

            <div className="hidden md:block w-[45%] ms-10">
                {/* horizontal divider */}
                <div className="h-[1px] bg-gradient-to-r from-transparent via-[#3b3b3b] to-transparent" />
            </div>
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
    </article>
  );
}
