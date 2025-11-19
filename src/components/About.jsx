"use client"

import { motion } from "framer-motion"

export default function About() {
  return (
    <section
      id="about"
      className="relative bg-[#000] text-[#f9f9f9] scroll-mt-24"
      aria-labelledby="about-title"
    >
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28 md:pl-20">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto mb-12 text-center md:mb-16"
        >
          <h4
            id="about-title"
            className="font-sans text-2xl md:text-3xl leading-tight text-[#f9f9f9]"
          >
            About Me
          </h4>

          {/* Wavy ornament */}
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

          <div
            className="mx-auto mt-8 h-px w-full max-w-4xl bg-white/10"
            aria-hidden="true"
          />
        </motion.div>

        {/* Main Content Grid */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="grid items-start gap-10 md:grid-cols-2"
        >
          {/* Left: Portrait */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
            className="relative aspect-[4/5] w-full overflow-hidden md:h-[70vh]"
          >
            <img
              src="/images/satya.png"
              alt="Professional portrait"
              className="h-full w-full object-cover object-center rounded-xl"
            />

            {/* Overlay gradient for contrast */}
            <div
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.95)_0%,rgba(0,0,0,0.85)_28%,rgba(0,0,0,0.35)_44%,rgba(0,0,0,0.08)_58%,rgba(0,0,0,0)_68%)]"
              aria-hidden="true"
            />

            {/* Dotted accent */}
            <div
              className="pointer-events-none absolute -bottom-4 right-4 h-28 w-28 opacity-40"
              aria-hidden="true"
            >
              <div className="h-full w-full bg-[radial-gradient(circle,_rgba(255,255,255,0.28)_1px,_transparent_1.5px)] [background-size:10px_10px]" />
            </div>
          </motion.div>

          {/* Right: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="w-full md:border-l md:border-white/10 md:pl-10"
          >
            <h3 className="font-sans text-2xl md:text-3xl font-semibold text-[#f9f9f9]">
              SATYARAJ S.MYAKAM
            </h3>

            <div className="mt-6 space-y-6 font-sans text-base/relaxed md:text-lg text-[#f9f9f9]/85">
              <p>
                I'm a passionate video creator dedicated to transforming moments into cinematic stories. I specialize in crafting visually compelling videos for birthdays, weddings, vehicle shoots, personal shoots, and a variety of other events.{" "}
              </p>
              <p>
                With a creative eye for detail and a strong sense of storytelling, I aim to capture genuine emotions and turn them into timeless visuals. Whether it’s the joy of a celebration, the elegance of a wedding, or the power of a cinematic vehicle shoot, I bring a professional touch to every frame.
              </p>
              <p>
                My goal is simple — to create videos that don’t just look beautiful but also connect emotionally and leave a lasting impression.
              </p>
            </div>

            {/* Download CV Button */}
           
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
