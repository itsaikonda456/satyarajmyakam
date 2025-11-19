import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { Camera } from "lucide-react";

export default function Footer() {
  const socialLinks = [
    { icon: <FaInstagram size={18} />, href: "https://www.instagram.com/satyas_fx/" },
    { icon: <FaYoutube size={18} />, href: "https://www.youtube.com/@SatyarajMyakam" },
    // { icon: <FaTwitter size={18} />, href: "#" },
    // { icon: <FaFacebookF size={18} />, href: "#" },
  ];

  return (
    <footer className="bg-[#1b1b1b] text-gray-300 py-14 text-center border-t border-white/5">
      {/* Logo with Camera Icon */}
      <h2 className="flex items-center justify-center gap-2 text-2xl font-semibold text-white mb-6">
        <Camera className="w-5 h-5 text-[#ffffff]" />
        <span>Satyas_FX</span>
        <span className="text-[#e63946]">.</span>
      </h2>

      {/* Social Icons */}
      <div className="flex justify-center gap-8 mb-8">
        {socialLinks.map((link, i) => (
          <a
            key={i}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm tracking-wider font-semibold text-gray-400 hover:text-[#e63946] transition-colors duration-300 uppercase"
          >
            {link.icon && (
              <span className="inline-block mr-1 align-middle">{link.icon}</span>
            )}
          </a>
        ))}
      </div>

      {/* Divider */}
      <div className="w-16 h-[1px] bg-white/10 mx-auto mb-6"></div>

      {/* Copyright */}
      <p className="text-sm text-gray-400">
        © 2025 All rights reserved | Designed by{" "}
        <span className="font-medium text-white">Sai Konda</span>
      </p>
    </footer>
  );
}
