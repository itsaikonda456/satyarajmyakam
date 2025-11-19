/* eslint-disable @next/next/no-img-element */
"use client";

import { useCallback, useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

// =======================
// 🔥 BACKEND VIDEO LINKS
// =======================
const BASE_URL = "http://localhost:5000"; // Change when deployed

const videosData = [
  {
    id: 1,
    type: "video",
    title: "Ganpati Festival Highlights",
    author: "Satyas_FX",
    src: `${BASE_URL}/videos/satya1.mp4`,
  },
  {
    id: 2,
    type: "video",
    title: "Cinematic Bike Shoot",
    author: "Satyas_FX",
    src: `${BASE_URL}/videos/satya2.mp4`,
  },
  {
    id: 3,
    type: "video",
    title: "Fort Exploration Cinematic",
    author: "Satyas_FX",
    src: `${BASE_URL}/videos/satya3.mp4`,
  },
  {
    id: 4,
    type: "video",
    title: "RSS Event Coverage",
    author: "Satyas_FX",
    src: `${BASE_URL}/videos/satya4.mp4`,
  },
  {
    id: 5,
    type: "video",
    title: "Bathukamma Festival Celebration",
    author: "Satyas_FX",
    src: `${BASE_URL}/videos/satya5.mp4`,
  },
  {
    id: 6,
    type: "video",
    title: "Navratri Garba Night Highlights",
    author: "Satyas_FX",
    src: `${BASE_URL}/videos/satya6.mp4`,
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

  // =============================
  // ⭕ GENERATE POSTERS (1st frame)
  // =============================
  useEffect(() => {
    videos.forEach((vid, i) => {
      const video = document.createElement("video");

      video.src = vid.src;
      video.crossOrigin = "anonymous";
      video.muted = true;
      video.preload = "metadata";

      video.addEventListener("loadeddata", () => {
        video.currentTime = 0.05;
      });

      video.addEventListener("seeked", () => {
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const poster = canvas.toDataURL("image/jpeg");

        setVideos((prev) => {
          const newVideos = [...prev];
          newVideos[i].poster = poster;
          return newVideos;
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

  // KEYBOARD NAVIGATION
  useEffect(() => {
    if (!open) return;
    const handle = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [open]);

  return (
    <section
      id="work"
      className={`w-full bg-black text-white ${className}`}
    >
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
        <header className="mb-8 text-center md:mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold">Work</h2>
        </header>

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
              className="group w-full rounded-lg overflow-hidden border border-white/10 bg-white/5 hover:-translate-y-1 transition"
            >
              <div
                onClick={() => openAt(i)}
                className="relative aspect-[16/9] cursor-pointer overflow-hidden"
              >
                <video
                  src={vid.src}
                  poster={vid.poster}
                  muted
                  loop
                  playsInline
                  className="h-full w-full object-cover group-hover:scale-105 transition"
                />
              </div>

              <div className="p-2 text-center">
                <h3 className="text-xs md:text-lg">{vid.title}</h3>
                <p className="text-[10px] text-white/60">By {vid.author}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              onClick={close}
              className="absolute top-5 right-5 text-3xl text-white"
            >
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
