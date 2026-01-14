/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const BASE_URL = "http://localhost:5000";

const videosData = [
  {
    id: 1,
    type: "video",
    title: "Wedding Invitation Card",
    src: "https://res.cloudinary.com/dlybuktui/video/upload/v1763820975/satya1_qdwxrq.mov",
  },
  {
    id: 2,
    type: "video",
    title: "Cinematic Bike Shoot",
    src: "https://res.cloudinary.com/dlybuktui/video/upload/v1763808782/satya2_jzzutl.mp4",
  },
  {
    id: 3,
    type: "video",
    title: "Fort Exploration Cinematic",
    src: "https://res.cloudinary.com/dlybuktui/video/upload/v1763808781/satya3_vjdyyv.mp4",
  },
  {
    id: 4,
    type: "video",
    title: "RSS Event Coverage",
    src: "https://res.cloudinary.com/dlybuktui/video/upload/v1763808827/satya4_hhf8m8.mp4",
  },
  {
    id: 5,
    type: "video",
    title: "Bathukamma Festival",
    src: "https://res.cloudinary.com/dlybuktui/video/upload/v1763808808/satya5_bhbukj.mp4",
  },
  {
    id: 6,
    type: "video",
    title: "Navratri Garba Night Highlights",
    src: "https://res.cloudinary.com/dlybuktui/video/upload/v1763808821/satya6_gtl11f.mp4",
  },
];

const container = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

export default function Work({ className = "" }) {
  const [videos, setVideos] = useState(
    videosData.map((v) => ({ ...v, poster: "" }))
  );
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);

  // Generate posters from first frame
  useEffect(() => {
    videos.forEach((vid, i) => {
      const videoEl = document.createElement("video");
      videoEl.src = vid.src;
      videoEl.crossOrigin = "anonymous";
      videoEl.muted = true;
      videoEl.preload = "metadata";

      videoEl.addEventListener("loadeddata", () => {
        videoEl.currentTime = 0.05;
      });

      videoEl.addEventListener("seeked", () => {
        const canvas = document.createElement("canvas");
        canvas.width = videoEl.videoWidth;
        canvas.height = videoEl.videoHeight;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(videoEl, 0, 0, canvas.width, canvas.height);

        const poster = canvas.toDataURL("image/jpeg");

        setVideos((prev) => {
          const arr = [...prev];
          arr[i].poster = poster;
          return arr;
        });
      });
    });
  }, []);

  const openAt = (i) => {
    setIndex(i);
    setOpen(true);
  };

  const close = () => setOpen(false);
  const prev = () => setIndex((i) => (i - 1 + videos.length) % videos.length);
  const next = () => setIndex((i) => (i + 1) % videos.length);

  return (
    <section id="work" className={`w-full bg-black text-white ${className}`}>
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">

        {/* Heading */}
        <header className="mb-8 text-center md:mb-10">
          <h2
            className="
              font-sans text-xl md:text-3xl leading-tight text-[#f9f9f9]
              inline-block relative
              after:content-[''] after:block after:h-[2px]
              after:w-12 after:bg-white/70 after:mx-auto after:mt-2 after:rounded
              md:hover:after:w-24 md:after:transition-all md:after:duration-300
            "
          >
            Work
          </h2>
        </header>

        {/* Video Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-3 gap-3 md:gap-6 place-items-center"
        >
          {videos.map((vid, i) => (
            <motion.article
              key={vid.id}
              variants={item}
              className="
                group w-full rounded-lg overflow-hidden 
                border border-white/10 bg-white/5 
                hover:-translate-y-1 transition
              "
            >
              <div
                onClick={() => openAt(i)}
                className="
                  relative 
                  w-full 
                  overflow-hidden 
                  pb-[56.25%]     /* ⭐ FIXED 16:9 RATIO ALWAYS */
                  cursor-pointer
                "
              >
                <video
                  src={vid.src}
                  poster={vid.poster}
                  muted
                  loop
                  playsInline
                  className="
                    absolute top-0 left-0
                    h-full w-full 
                    object-cover 
                    group-hover:scale-105 transition
                  "
                />
              </div>

              <div className="p-2 text-center">
                <h3 className="text-[10px] sm:text-xs md:text-lg">
                  {vid.title}
                </h3>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button onClick={close} className="absolute top-5 right-5 text-3xl text-white">
              ×
            </button>

            <button
              onClick={prev}
              className="absolute left-5 top-1/2 text-4xl text-white"
            >
              ❮
            </button>

            <button
              onClick={next}
              className="absolute right-5 top-1/2 text-4xl text-white"
            >
              ❯
            </button>

            <video
              src={videos[index].src}
              autoPlay
              controls
              className="max-h-[80vh] rounded-xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
