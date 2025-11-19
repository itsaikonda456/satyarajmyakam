"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

const skills = [
  {
    name: "Creative Vision",
    desc: "Transforming ideas into visually compelling stories that connect with audiences.",
  },
  {
    name: "Video Editing",
    desc: "Crafting seamless, dynamic edits with storytelling rhythm and visual impact.",
  },
  {
    name: "Lighting Techniques",
    desc: "Designing cinematic lighting setups to create mood, depth, and professional aesthetics.",
  },
  {
    name: "Audio Production",
    desc: "Balancing sound design, voice, and music to enhance the emotional tone of visuals.",
  },
]

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
}

export default function Skills() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { amount: 0.2, once: true })

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative w-full bg-black text-[#f9f9f9] py-14 sm:py-20 md:py-24"
      aria-labelledby="skills-heading"
    >
      {/* 🔴 Background Accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(1200px 600px at -10% -10%, rgba(230,57,70,0.10), transparent 60%), radial-gradient(900px 500px at 110% 10%, rgba(230,57,70,0.06), transparent 65%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* 🔸 Section Title */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          {...fadeUp}
        >
          <h2
            id="skills-heading"
            className="font-sans text-2xl md:text-3xl leading-tight text-[#f9f9f9]"
          >
           Skills
          </h2>

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
        </motion.div>

        {/* 🔸 Skills Grid */}
        <div
          className="
            grid 
            grid-cols-2       /* 👈 2 cards per row on mobile */
            sm:grid-cols-2    
            md:grid-cols-2 
            lg:grid-cols-2 
            gap-4 sm:gap-6 md:gap-8
          "
        >
          {skills.map((s, i) => (
            <motion.div
              key={s.name}
              className="
                group 
                rounded-xl sm:rounded-2xl 
                bg-[#111] 
                p-4 sm:p-6 md:p-8 
                transition-transform duration-300 
                hover:scale-[1.03] 
                hover:shadow-[0_0_0_6px_rgba(230,57,70,0.15)]
                flex flex-col justify-between
              "
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.55,
                ease: "easeOut",
                delay: i * 0.08,
              }}
              role="group"
              aria-label={`${s.name} skill card`}
            >
              <div className="text-center sm:text-left">
                <h3 className="font-sans text-base xs:text-lg sm:text-xl md:text-2xl font-semibold text-[#e63946] mb-2">
                  {s.name}
                </h3>
                <p className="text-xs xs:text-sm sm:text-base md:text-lg text-white/70 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
