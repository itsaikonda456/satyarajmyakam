"use client"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Camera, Menu, X } from "lucide-react"

const leftLinks = ["Home", "Gallery", "About", "Skills"]
const rightLinks = ["Work", "Feedback", "Pricing","Contact"]

function NavLinks({ items, align = "left", active, setActive, onClick }) {
  const scrollToSection = (item) => {
    const sectionId = item.toLowerCase()
    const section = document.getElementById(sectionId)
    section?.scrollIntoView({ behavior: "smooth" })
    setActive(item)
    if (onClick) onClick()
  }

  return (
    <ul
      className={`flex flex-col md:flex-row items-center gap-5 text-sm text-white/80 ${
        align === "right" ? "md:justify-end" : "md:justify-start"
      }`}
    >
      {items.map((item) => {
        const isActive = item === active
        return (
          <li key={item} className="relative">
            <button
              onClick={() => scrollToSection(item)}
              className={`relative inline-block px-1 py-2 transition-colors hover:text-white ${
                isActive ? "text-white font-medium" : ""
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              <span>{item}</span>

              {isActive && (
                <motion.span
                  layoutId="nav-underline"
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="absolute inset-x-0 -bottom-[2px] h-[2px] bg-white rounded origin-center"
                />
              )}
            </button>
          </li>
        )
      })}
    </ul>
  )
}

export default function HeroSection() {
  const [active, setActive] = useState("Home")
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // ⭐ UPDATED → scrolls to PORTFOLIO section (Gallery)
  const handleScrollToPortfolio = () => {
    const target = document.getElementById("gallery")
    if (target) {
      target.scrollIntoView({ behavior: "smooth" })
      setActive("Gallery")
    }
  }

  return (
    <section
      className="relative isolate min-h-svh w-full bg-black text-white overflow-x-hidden"
      id="home"
    >
      {/* Background Image */}
      <img
        src="/images/satya.png"
        alt="Background portrait"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-[center_-60px] sm:object-center md:object-center"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

      {/* Navbar */}
     <motion.nav
  initial={{ opacity: 0, y: -12 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
  className={`sticky top-0 z-[99999] isolate transition-all duration-500 ${
    scrolled
      ? "bg-black/40 backdrop-blur-md shadow-lg"
      : "bg-transparent backdrop-blur-none"
  }`}
  aria-label="Primary"
>

        <div className="mx-auto w-full max-w-7xl px-4 md:px-8 overflow-hidden">
          <div className="flex items-center justify-between py-4 w-full">
            
            {/* Left Links */}
            <div className="hidden md:flex flex-1 justify-end pr-10">
              <NavLinks
                items={leftLinks}
                align="left"
                active={active}
                setActive={setActive}
              />
            </div>

            {/* Logo */}
            <button
              onClick={() => {
                document.getElementById("home")?.scrollIntoView({ behavior: "smooth" })
                setActive("Home")
                setMenuOpen(false)
              }}
              className="flex items-center gap-1.5 text-lg sm:text-2xl font-semibold tracking-wide text-white flex-shrink-0"
              aria-label="Satyas FX home"
            >
              <Camera className="w-5 h-5 sm:w-6 sm:h-6" />
              <span>Satyas_FX</span>
            </button>

            {/* Right Links */}
            <div className="hidden md:flex flex-1 justify-start pl-10">
              <NavLinks
                items={rightLinks}
                align="right"
                active={active}
                setActive={setActive}
              />
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-white text-3xl focus:outline-none flex-shrink-0 ml-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation"
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed top-[64px] left-0 right-0 w-full bg-black/90 backdrop-blur-md border-t border-white/10 flex flex-col items-center py-4 overflow-hidden"
          >
            <div className="w-full max-w-full px-4 mx-auto overflow-hidden">
              <NavLinks
                items={[...leftLinks, ...rightLinks]}
                active={active}
                setActive={setActive}
                onClick={() => setMenuOpen(false)}
              />
            </div>
          </motion.div>
        )}
      </motion.nav>

      {/* Hero Content */}
      <div className="relative z-10 flex min-h-svh flex-col items-center justify-center px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className="text-5xl font-bold leading-tight sm:text-6xl md:text-8xl text-white/95"
        >
          Satyas_FX
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.25 }}
          className="mt-4 max-w-3xl text-balance text-sm font-light text-white/95 sm:text-base md:mt-6 md:text-2xl"
        >
          Craftsmanship in every clip. Perfection in every cut.
        </motion.p>
      </div>

      {/* ⭐ Scroll Button → NOW SCROLLS TO GALLERY */}
      <div
        onClick={handleScrollToPortfolio}
        className="absolute inset-x-0 bottom-6 z-20 flex flex-col items-center gap-2 cursor-pointer"
      >
        <div className="flex items-start justify-center">
          <div className="flex h-8 w-5 items-start justify-center rounded-full border border-white/80 p-1">
            <span className="h-1 w-1 rounded-full bg-white/90 animate-bounce" />
          </div>
        </div>
        <span className="text-[10px] tracking-[0.2em] text-white/70">
          SCROLL
        </span>
      </div>
    </section>
  )
}
