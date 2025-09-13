import { Facebook, Instagram, Twitter } from "lucide-react";

export default function SocialIcons() {
  return (
    <div className="flex items-center justify-center gap-6 p-6">
      {/* Instagram */}
      <a
        href="#"
        aria-label="Instagram"
        className="group"
      >
        <div className="w-13 h-13 rounded-full p-[3px] bg-gradient-to-r from-[#BB6FFB] via-[#FC5F67] to-[#FFB054] transition-transform transform-gpu group-hover:scale-105">
          <div className="w-full h-full rounded-full bg-[#0f0f0f] flex items-center justify-center text-white">
            <Instagram/>
          </div>
        </div>
      </a>

      {/* Twitter */}
      <a
        href="#"
        aria-label="Twitter"
        className="group"
      >
        <div className="w-13 h-13 rounded-full p-[3px] bg-gradient-to-r from-[#BB6FFB] via-[#FC5F67] to-[#FFB054] transition-transform transform-gpu group-hover:scale-105">
          <div className="w-full h-full rounded-full bg-[#0f0f0f] flex items-center justify-center text-white">
            <Twitter/>
          </div>
        </div>
      </a>

      {/* Facebook */}
      <a
        href="#"
        aria-label="Facebook"
        className="group"
      >
        <div className="w-13 h-13 rounded-full p-[3px] bg-gradient-to-r from-[#BB6FFB] via-[#FC5F67] to-[#FFB054] transition-transform transform-gpu group-hover:scale-105">
          <div className="w-full h-full rounded-full bg-[#0f0f0f] flex items-center justify-center text-white ">
            <Facebook/>
          </div>
        </div>
      </a>
    </div>
  );
}
