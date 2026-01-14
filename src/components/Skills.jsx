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
    desc: "Designing cinematic lighting setups to create strong mood and depth.",
  },
  {
    name: "Audio Production",
    desc: "Balancing sound, ambience, and music to enhance emotional storytelling.",
  },
]

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
      {/* Subtle red glow background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(900px 600px at -10% 0%, rgba(230,57,70,0.12), transparent 60%), radial-gradient(900px 600px at 110% 10%, rgba(230,57,70,0.08), transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        {/* Section Title */}
        <motion.div
          className="text-center mb-10 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
        >
          <h2
            id="skills-heading"
            className="
              font-sans text-xl md:text-3xl text-[#f9f9f9]
              inline-block relative
              after:content-[''] after:block after:h-[2px] 
              after:w-12 after:bg-white/70 after:mx-auto after:mt-2 after:rounded
              md:hover:after:w-24 md:after:transition-all md:after:duration-300
            "
          >
            Skills
          </h2>
        </motion.div>

        {/* Skills Grid */}
        <div
          className="
            grid 
            grid-cols-2
            gap-4 sm:gap-6 md:gap-8
          "
        >
          {skills.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className="
                group 
                bg-[#111]
                rounded-xl sm:rounded-2xl 
                p-4 sm:p-6 md:p-8
                border border-white/5
                transition-all duration-300 
                hover:scale-[1.03]
                hover:shadow-[0_0_12px_rgba(230,57,70,0.25)]
              "
            >
              <div className="relative z-10 flex flex-col text-center sm:text-left">

                {/* Title - Perfect mobile sizing */}
                <h3
                  className="
                    font-sans 
                    text-sm xs:text-base sm:text-lg md:text-2xl 
                    font-semibold text-[#e63946]
                    mb-1               /* ⭐ controlled spacing */
                  "
                >
                  {s.name}
                </h3>

                {/* Description - structured spacing */}
                <p
                  className="
                    text-[11px] xs:text-xs sm:text-sm md:text-lg 
                    text-white/70 
                    leading-snug sm:leading-relaxed
                  "
                >
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
