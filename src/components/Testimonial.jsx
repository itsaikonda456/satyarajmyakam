/* eslint-disable @next/next/no-img-element */
"use client"

import React from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"

const TESTIMONIALS = [
  {
    quote:
      "The video editing was phenomenal! Every cut, transition, and color grade was perfectly timed. Our project looked more polished than we ever imagined.",
    name: "Sai Konda",
    // role: "Marketing Manager @BrightVision",
    image: "/images/sai/sai.jpg",
  },
  {
    quote:
      "Absolutely amazing work! The edits brought our wedding video to life, capturing every emotion beautifully. Highly professional and creative.",
    name: "Harish Gudelli",
    // role: "Bride & Groom",
    image: "/images/harish/harish1.jpg",
  },
  {
    quote:
      "Their attention to detail and storytelling through video is unmatched. Every corporate and promotional video they produced exceeded our expectations.",
    name: "Rahul ",
    // role: "Creative Lead @TechNova",
    image: "/images/rahul/rahul1.jpg",
  },
]

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
  interval = 5000, // auto-advance every 5s
  autoPlay = true,
  className = "",
}) {
  const [index, setIndex] = React.useState(0)
  const [direction, setDirection] = React.useState(1) // 1 -> next, -1 -> prev
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
      x: prefersReducedMotion ? 0 : dir > 0 ? 40 : -40,
      filter: prefersReducedMotion ? "none" : "blur(6px)",
    }),
    center: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: {
        duration: prefersReducedMotion ? 0.2 : 0.6,
        ease: "easeOut",
      },
    },
    exit: (dir) => ({
      opacity: 0,
      x: prefersReducedMotion ? 0 : dir > 0 ? -40 : 40,
      filter: prefersReducedMotion ? "none" : "blur(6px)",
      transition: {
        duration: prefersReducedMotion ? 0.2 : 0.4,
        ease: "easeIn",
      },
    }),
  }

  return (
    <section
    id="testimonial"
      aria-label="Testimonials"
      // Use explicit brand tokens to satisfy the requested palette
      style={{
        // theming for this section only
        ["--t-bg"]: "#000",
        ["--t-fg"]: "#fff",
        ["--t-accent"]: "#e63946",
        ["--t-panel"]: "rgba(255,255,255,0.06)",
        ["--t-panel-border"]: "rgba(255,255,255,0.12)",
      }}
      className={`w-full bg-[var(--t-bg)] text-[var(--t-fg)] ${className}`}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") next()
        if (e.key === "ArrowLeft") prev()
      }}
    >
      <div className="mx-auto max-w-5xl px-4 py-16 md:py-24">
        <header className="mb-10 text-center md:mb-12">
          <h2 className="font-sans text-2xl md:text-3xl leading-tight text-[#f9f9f9]">What My Clients Say</h2>
            <div className="mt-4 flex justify-center" aria-hidden="true">
            <svg
              className="h-4 w-24 text-white/80"
              viewBox="0 0 96 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 8c6 0 6-6 12-6s6 6 12 6 6-6 12-6 6 6 12 6 6-6 12-6 6 6 12 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div>
        </header>

        <div
          className="relative mx-auto max-w-3xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Slider viewport */}
          <div className="relative min-h-[280px]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.figure
                key={index}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="relative rounded-xl border border-[var(--t-panel-border)] bg-[var(--t-panel)] p-6 shadow-sm md:p-10"
              >
                <div className="mb-6 flex items-center justify-center text-3xl md:mb-8 md:text-4xl">
                  <span className="select-none text-[var(--t-fg)]/70">{"“"}</span>
                </div>

                <blockquote className="text-center text-pretty text-base leading-relaxed md:text-lg">
                  {current.quote}
                </blockquote>

                <div className="mt-8 flex flex-col items-center gap-4 md:mt-10">
                  <img
                    src={current.image || "/placeholder.svg"}
                    alt={`${current.name} avatar`}
                    className="h-16 w-16 rounded-full ring-2 ring-[var(--t-accent)]"
                    loading="lazy"
                  />
                  {/* Accent bar */}
                  <div className="h-1 w-40 rounded-full bg-[var(--t-accent)]" />
                  <figcaption className="text-center">
                    <div className="text-base font-medium md:text-lg">{current.name}</div>
                    <div className="text-sm text-[var(--t-fg)]/70">{current.role}</div>
                  </figcaption>
                </div>
              </motion.figure>
            </AnimatePresence>
          </div>

          {/* Navigation arrows */}
          <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between">
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={prev}
              className="pointer-events-auto ml-1 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--t-panel-border)] bg-white/5 text-[var(--t-fg)]/90 transition hover:bg-[var(--t-accent)]/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--t-accent)] md:ml-2"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                className="translate-x-[1px]"
                aria-hidden="true"
              >
                <path
                  d="M15 19l-7-7 7-7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <button
              type="button"
              aria-label="Next testimonial"
              onClick={next}
              className="pointer-events-auto mr-1 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--t-panel-border)] bg-white/5 text-[var(--t-fg)]/90 transition hover:bg-[var(--t-accent)]/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--t-accent)] md:mr-2"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                className="-translate-x-[1px]"
                aria-hidden="true"
              >
                <path
                  d="M9 5l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Optional: small progress indicators */}
          <div className="mt-6 flex justify-center gap-2">
            {items.map((_, i) => {
              const active = i === index
              return (
                <button
                  key={i}
                  aria-label={`Go to testimonial ${i + 1}`}
                  onClick={() => {
                    setDirection(i > index ? 1 : -1)
                    setIndex(i)
                  }}
                  className={`h-2 w-2 rounded-full transition ${
                    active ? "bg-[var(--t-accent)]" : "bg-white/20 hover:bg-white/40"
                  }`}
                />
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
