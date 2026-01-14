"use client"

import { useCallback, useEffect, useState, useMemo } from "react"
import { AnimatePresence, motion } from "framer-motion"

const folderStructure = {
  sai: { name: "Sai", count: 3 },
  shalini: { name: "Shalini", count: 3 },
  paro: { name: "Paro", count: 3 },
  naushad: { name: "Naushad", count: 3 },
  rahul: { name: "Rahul", count: 3 },
  aaru: { name: "Aaru", count: 3 },
  harish: { name: "Harish", count: 3 },
  priyanka: { name: "Priyanka", count: 3 },
  sanjana: { name: "Sanjana", count: 3 },
}

const generateMedia = () => {
  const allMedia = []
  Object.entries(folderStructure).forEach(([folder, { count }]) => {
    for (let i = 1; i <= count; i++) {
      allMedia.push({
        group: folder,
        type: "image",
        src: `/images/${folder}/${folder}${i}.jpg`,
        alt: `${folder} - image ${i}`,
      })
    }
  })
  return allMedia
}

const media = generateMedia()

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.15, ease: "easeOut" },
  }),
}

export default function PortfolioSection() {
  const [open, setOpen] = useState(false)
  const [group, setGroup] = useState(null)
  const [index, setIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  const groupMedia = useMemo(() => media.filter((m) => m.group === group), [group])

  const close = useCallback(() => setOpen(false), [])
  const openGroup = useCallback((folder) => {
    setGroup(folder)
    setIndex(0)
    setOpen(true)
  }, [])

  const prev = useCallback(
    () => setIndex((i) => (i - 1 + groupMedia.length) % groupMedia.length),
    [groupMedia]
  )
  const next = useCallback(
    () => setIndex((i) => (i + 1) % groupMedia.length),
    [groupMedia]
  )

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === "Escape") close()
      if (e.key === "ArrowLeft") prev()
      if (e.key === "ArrowRight") next()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, close, prev, next])

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const displayFolders = useMemo(() => {
    const folders = Object.entries(folderStructure)
    if (isMobile) {
      while (folders.length < 9) {
        folders.push(["placeholder", { name: "Placeholder" }])
      }
    } else {
      return folders.slice(0, 8)
    }
    return folders
  }, [isMobile])

  return (
    <section id="gallery" className="bg-black text-white">
      <div className="mx-auto max-w-6xl px-4 md:px-8 py-16 md:py-24">

        {/* ⭐ Section Title with Animated Underline */}
      <h2
  className="
    font-sans text-xl md:text-3xl text-[#f9f9f9] mb-10 
    text-center w-full
    inline-block mx-auto relative
    after:content-[''] after:block after:h-[2px] 
    after:w-12 after:bg-white/70 after:mx-auto after:mt-2 
    after:rounded md:hover:after:w-24 
    md:after:transition-all md:after:duration-300
  "
>
  Gallery
</h2>


        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {displayFolders.map(([folder, { name }], i) => {
            if (folder === "placeholder") {
              return (
                <div
                  key={`placeholder-${i}`}
                  className="aspect-square rounded-lg bg-gray-800/50"
                />
              )
            }

            const firstImage = media.find((m) => m.group === folder)

            return (
              <motion.button
                key={folder}
                onClick={() => openGroup(folder)}
                className="
                  relative aspect-square overflow-hidden rounded-lg 
                  focus:outline-none focus:ring-2 focus:ring-white/60 
                  shadow-lg shadow-gray-900/40
                "
                variants={itemVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                custom={i}
              >
                <img
                  src={firstImage?.src}
                  alt={name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 hover:bg-black/30 transition-all duration-300" />
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* ⭐ Lightbox */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              onClick={close}
              className="absolute right-4 top-4 h-10 w-10 rounded-full bg-white/10 text-white hover:bg-white/20 flex items-center justify-center"
            >
              <span className="text-2xl leading-none">&times;</span>
            </button>

            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
            >
              ❮
            </button>

            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
            >
              ❯
            </button>

            <div className="max-w-5xl w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={groupMedia[index]?.src || index}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-center justify-center"
                >
                  <img
                    src={groupMedia[index]?.src}
                    alt={groupMedia[index]?.alt}
                    className="max-h-[80vh] w-auto rounded-lg object-contain"
                  />
                </motion.div>
              </AnimatePresence>

              <div className="mt-4 text-center text-xs text-white/70">
                {index + 1} / {groupMedia.length} —{" "}
                {folderStructure[group]?.name?.toUpperCase()}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
