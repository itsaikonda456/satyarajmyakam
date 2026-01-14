"use client"

import { motion } from "framer-motion"
import { FaBirthdayCake, FaRing, FaCarSide, FaUserAlt, FaCalendarAlt, FaFilm } from "react-icons/fa"

export default function Services() {
  const services = [
    {
      title: "Birthday Shoots",
      desc: "Capturing your happiest birthday memories with creative visuals.",
      Icon: FaBirthdayCake,
    },
    {
      title: "Wedding Shoots",
      desc: "Beautifully crafted wedding films and timeless moments.",
      Icon: FaRing,
    },
    {
      title: "Vehicle Shoots",
      desc: "Showcasing your rides with cinematic precision and passion.",
      Icon: FaCarSide,
    },
    {
      title: "Personal Shoots",
      desc: "Portraits and lifestyle shoots that define your personality.",
      Icon: FaUserAlt,
    },
    {
      title: "Event Coverage",
      desc: "Professional coverage for all kinds of celebrations and gatherings.",
      Icon: FaCalendarAlt,
    },
    {
      title: "Creative Edits",
      desc: "Transforming raw footage into stunning cinematic experiences.",
      Icon: FaFilm,
    },
  ]

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.05 },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  }

  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="relative isolate w-full overflow-hidden bg-black py-20 md:py-28"
    >
      {/* subtle backdrop */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(230,57,70,0.12),transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.12] bg-[linear-gradient(#1a1a1a_1px,transparent_1px),linear-gradient(90deg,#1a1a1a_1px,transparent_1px)] bg-[size:28px_28px]" />
      </div>

      {/* Section Header */}
      <div className="mx-auto max-w-5xl px-6 text-center">
        <motion.h2
          id="services-title"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="
            font-sans 
            text-xl md:text-3xl 
            text-[#f9f9f9] 
            inline-block relative
            after:content-[''] after:block after:h-[2px] 
            after:w-12 after:bg-white/70 after:mx-auto after:mt-2 after:rounded
            md:hover:after:w-24 md:after:transition-all md:after:duration-300
          "
        >
          Services
        </motion.h2>
      </div>

      {/* Cards */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="
          mx-auto mt-12 
          grid w-full max-w-6xl 
          grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 
          gap-3 sm:gap-5 md:gap-6 lg:gap-8 
          px-4 sm:px-6
        "
      >
        {services.map(({ title, desc, Icon }) => (
          <motion.article
            key={title}
            variants={item}
            className="
              group relative 
              rounded-xl sm:rounded-2xl 
              border border-white/5 
              bg-[#111] 
              p-4 sm:p-6 md:p-7 
              shadow-[0_0_0_1px_rgba(255,255,255,0.02)] 
              transition-all duration-300 
              will-change-transform 
              hover:scale-[1.02] 
              hover:shadow-[0_0_32px_rgba(230,57,70,0.25)] 
              focus-within:shadow-[0_0_40px_rgba(230,57,70,0.28)]
            "
          >
            {/* Hover Ring */}
            <div className="
              pointer-events-none absolute inset-0 
              rounded-xl sm:rounded-2xl 
              ring-0 ring-[#e63946]/0 
              transition-all duration-300 
              group-hover:ring-2 group-hover:ring-[#e63946]/40
            " />

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 text-center sm:text-left">
              <div
                className="
                  flex h-10 w-10 sm:h-12 sm:w-12 
                  items-center justify-center 
                  rounded-lg sm:rounded-xl 
                  border border-white/10 
                  bg-black/40 
                  text-[#e63946] 
                  shadow-[inset_0_0_10px_rgba(230,57,70,0.25)]
                "
              >
                <Icon className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
              </div>

              <div className="flex-1">
                <h3 className="font-sans text-sm sm:text-base md:text-lg font-semibold leading-tight text-[#f9f9f9]">
                  {title}
                </h3>
                <p className="mt-1 sm:mt-2 line-clamp-2 font-serif text-xs sm:text-sm leading-relaxed text-white/70">
                  {desc}
                </p>
              </div>
            </div>

            <div className="mt-4 sm:mt-6 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </motion.article>
        ))}
      </motion.div>
    </section>
  )
}
