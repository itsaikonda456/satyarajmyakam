"use client"

import { motion } from "framer-motion"

export default function About() {
  return (
    <section
      id="about"
      className="relative bg-[#000] text-[#f9f9f9] scroll-mt-24"
      aria-labelledby="about-title"
    >
      <div
        className="
          mx-auto max-w-7xl 
          px-4 py-10                   
          md:px-6 md:py-28 md:pl-20
        "
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto mb-6 text-center md:mb-16"
        >
          <h4
            id="about-title"
            className="
              font-sans text-xl md:text-3xl text-[#f9f9f9] inline-block relative
              after:content-[''] after:block after:h-[2px] after:w-12 after:bg-white/70
              after:mx-auto after:mt-2 after:rounded 
              md:hover:after:w-24 md:after:transition-all md:after:duration-300
            "
          >
            About Me
          </h4>
        </motion.div>

        {/* Main Content Grid */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="
            grid 
            gap-2                   
            md:grid-cols-2 md:gap-10
            items-start
          "
        >

          {/* Left Image — optimized for mobile */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
            className="
              relative 
              w-full overflow-hidden 
              -mt-1

              /* Height optimized for mobile */
              h-[240px]       
              sm:h-[260px]

              /* Desktop layout */
              md:aspect-[3/4] 
              md:h-[70vh]

              /* ⭐ Small gap under image only on mobile */
              mb-2 md:mb-0
            "
          >
  <img
  src="/images/satya.png"
  alt="Professional portrait"
  className="
    h-full w-full 
    object-cover object-center 
    rounded-2xl shadow-lg shadow-black/50
  "
/>


          </motion.div>

          {/* Right Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="
              w-full 
              md:border-l md:border-white/10 md:pl-10
            "
          >
            <h3
              className="
                font-sans 
                text-lg font-semibold      
                leading-[1.2]              
                md:text-3xl md:leading-tight
                text-[#f9f9f9]

                /* ⭐ Slight breathing space above title ONLY mobile */
                mt-1 md:mt-0
              "
            >
              SATYARAJ S. MYAKAM
            </h3>

            <div
              className="
                mt-1                     
                md:mt-6
                space-y-1                
                md:space-y-6
                text-xs leading-relaxed  
                sm:text-sm
                md:text-lg
                text-[#f9f9f9]/85
              "
            >
              <p>
                I'm a passionate video creator dedicated to transforming moments
                into cinematic stories. I specialize in crafting visually compelling
                videos for birthdays, weddings, vehicle shoots, and more.
              </p>

              <p>
                With a strong eye for detail and storytelling, I capture genuine
                emotions and convert them into timeless, cinematic visuals.
              </p>

              <p>
                My mission is simple — create visuals that connect emotionally and
                leave a lasting impact.
              </p>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}
