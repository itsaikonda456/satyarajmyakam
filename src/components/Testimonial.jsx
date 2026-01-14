"use client"

import React from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"

const TESTIMONIALS = [
  {
    quote:
      "The photoshoot was absolutely fantastic! The lighting, angles, and attention to detail made every photo look premium and professionally captured.",
    name: "Sai",
    image: "/images/sai/sai1.jpg",
  },
  {
    quote:
      "An incredible photoshoot experience! The creativity and composition were on point, and every picture beautifully captured the moments and emotions.",
    name: "Harish",
    image: "/images/harish/harish1.jpg",
  },
  {
    quote:
      "Outstanding photoshoot work! The visuals were sharp, well-composed, and perfectly edited. Every photo exceeded our expectations.",
    name: "Rahul",
    image: "/images/rahul/rahul1.jpg",
  },
];


function useInterval(callback, delay, active = true) {
  const savedCb = React.useRef(callback)
  React.useEffect(() => {
    savedCb.current = callback
  }, [callback])
  React.useEffect(() => {
    if (!active || delay == null) return
    const id = setInterval(() => savedCb.current?.(), delay)
    return () => clearInterval(id)
  }, [delay, active])
}

export default function Testimonials({
  items = TESTIMONIALS,
  interval = 5000,
  autoPlay = true,
  className = "",
}) {
  const [index, setIndex] = React.useState(0)
  const [direction, setDirection] = React.useState(1)
  const [paused, setPaused] = React.useState(false)
  const prefersReducedMotion = useReducedMotion()

  const len = items.length
  const current = items[index % len]

  const next = React.useCallback(() => {
    setDirection(1)
    setIndex((i) => (i + 1) % len)
  }, [len])

  const prev = React.useCallback(() => {
    setDirection(-1)
    setIndex((i) => (i - 1 + len) % len)
  }, [len])

  useInterval(next, interval, autoPlay && !paused)

  const variants = {
    enter: (dir) => ({
      opacity: 0,
      x: prefersReducedMotion ? 0 : dir > 0 ? 60 : -60,
      scale: 0.95,
      filter: prefersReducedMotion ? "none" : "blur(8px)",
    }),
    center: {
      opacity: 1,
      x: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: prefersReducedMotion ? 0.2 : 0.65,
        ease: "easeOut",
      },
    },
    exit: (dir) => ({
      opacity: 0,
      x: prefersReducedMotion ? 0 : dir > 0 ? -60 : 60,
      scale: 0.95,
      filter: prefersReducedMotion ? "none" : "blur(8px)",
      transition: {
        duration: prefersReducedMotion ? 0.2 : 0.45,
        ease: "easeIn",
      },
    }),
  }

  return (
    <section
      id="feedback"
      aria-label="Testimonials"
      style={{
        ["--t-bg"]: "#000",
        ["--t-fg"]: "#fff",
        ["--t-accent"]: "#e63946",
        ["--t-panel"]: "rgba(255,255,255,0.08)",
        ["--t-panel-border"]: "rgba(255,255,255,0.14)",
      }}
      className={`w-full bg-[var(--t-bg)] text-[var(--t-fg)] ${className}`}
    >
      <div className="mx-auto max-w-5xl px-4 py-16 sm:py-20 md:py-28">

        {/* TITLE */}
        <header className="mb-10 text-center md:mb-14">
          <h2
            className="
              font-sans text-xl sm:text-2xl md:text-4xl tracking-wide 
              text-[#f1f1f1]
              inline-block relative
              after:content-[''] after:block after:h-[3px]
              after:w-16 sm:after:w-20 after:bg-[var(--t-fg)] 
              after:mx-auto after:mt-3 after:rounded-full
            "
          >
            What My Clients Say
          </h2>
        </header>

        {/* MAIN SLIDER */}
        <div
          className="relative mx-auto max-w-3xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative min-h-[260px] sm:min-h-[300px] md:min-h-[340px]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
      <motion.figure
  key={index}
  custom={direction}
  variants={variants}
  initial="enter"
  animate="center"
  exit="exit"
  className="
    relative rounded-2xl
    border border-[var(--t-panel-border)]
    bg-[var(--t-panel)]
    p-6 sm:p-8 md:p-10
    shadow-[0_0_25px_rgba(255,255,255,0.05)]
    backdrop-blur-xl
  "
>
  <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center md:items-start">
    
    {/* IMAGE */}
    <img
      src={current.image}
      alt={current.name}
      className="
        w-32 h-32
        sm:w-36 sm:h-36
        md:w-44 md:h-52
        lg:w-48 lg:h-56
        object-cover rounded-xl
         ring-[var(--t-accent)]
        shadow-lg
        flex-shrink-0
      "
    />

    {/* CONTENT */}
    <div className="flex-1 text-center md:text-left">
      
      {/* QUOTE */}
      <blockquote
        className="
          text-base sm:text-lg md:text-xl
          text-[#eeeeee] leading-relaxed
        "
      >
        {current.quote}
      </blockquote>

      {/* NAME + ICON */}
<figcaption className="mt-20">
  <div className="flex items-center justify-center md:justify-start gap-3">
    
    {/* Icon */}
    <i className="fa-solid fa-circle-user text-[var(--t-accent)] text-lg sm:text-2xl md:text-2xl" />

    {/* Name */}
    <span className="text-lg sm:text-2xl md:text-2xl font-semibold text-white">
      {current.name}
    </span>

  </div>
</figcaption>

    </div>
  </div>
</motion.figure>


            </AnimatePresence>
          </div>

         

          {/* DOT INDICATORS */}
          <div className="mt-6 flex justify-center gap-2">
            {items.map((_, i) => {
              const active = i === index
              return (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > index ? 1 : -1)
                    setIndex(i)
                  }}
                  className={`
                    h-2.5 w-2.5 rounded-full transition-all
                    ${active ? "bg-[var(--t-accent)] scale-110" : "bg-white/25"}
                  `}
                />
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
