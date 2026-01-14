import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Camera, Menu, X } from "lucide-react"

const leftLinks = ["Home", "Gallery", "About", "Services"]
const rightLinks = ["Skills", "Work", "Feedback", "Contact"]

function NavLinks({ items, align = "left", active, setActive, onClick }) {
  const scrollToSection = (item) => {
    const sectionId = item.toLowerCase()
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
    setActive(item)
    onClick?.()
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
              className={`relative px-1 py-2 hover:text-white transition-colors ${
                isActive ? "text-white font-medium" : ""
              }`}
            >
              {item}
              {isActive && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute inset-x-0 -bottom-[2px] h-[2px] bg-white rounded"
                />
              )}
            </button>
          </li>
        )
      })}
    </ul>
  )
}

export default function Header() {
  const [active, setActive] = useState("Home")
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-500 ${
        scrolled
          ? "bg-black/40 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex items-center justify-between py-4">

          {/* Left */}
          <div className="hidden md:flex flex-1 justify-end pr-10">
            <NavLinks items={leftLinks} active={active} setActive={setActive} />
          </div>

          {/* Logo */}
          <button
            onClick={() => {
              document.getElementById("home")?.scrollIntoView({ behavior: "smooth" })
              setActive("Home")
              setMenuOpen(false)
            }}
            className="flex items-center gap-1.5 text-lg sm:text-2xl font-semibold"
          >
            <Camera className="w-5 h-5 sm:w-6 sm:h-6" />
            Satyas_FX
          </button>

          {/* Right */}
          <div className="hidden md:flex flex-1 justify-start pl-10">
            <NavLinks
              items={rightLinks}
              align="right"
              active={active}
              setActive={setActive}
            />
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-3xl ml-2"
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
          className="md:hidden bg-black/90 backdrop-blur-md border-t border-white/10 py-4"
        >
          <NavLinks
            items={[...leftLinks, ...rightLinks]}
            active={active}
            setActive={setActive}
            onClick={() => setMenuOpen(false)}
          />
        </motion.div>
      )}
    </motion.nav>
  )
}
