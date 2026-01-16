/* eslint-disable @next/next/no-img-element */
"use client"

import { motion } from "framer-motion"
import { Mail, Phone, MapPin } from "lucide-react"
import { toast } from "react-toastify"
import { useState } from "react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    date: "",
    message: "",
  })

  const [loading, setLoading] = useState(false)

const onSubmit = async (e) => {
  e.preventDefault()
  setLoading(true)

  try {
    const response = await fetch("https://formspree.io/f/xdaakove", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        mobile: formData.mobile,
        email: formData.email,
        date: formData.date,
        message: formData.message,
      }),
    })

    const result = await response.json()

    if (response.ok) {
      toast.success("Message sent successfully!")
      setFormData({
        name: "",
        mobile: "",
        email: "",
        date: "",
        message: "",
      })
    } else {
      toast.error(result?.error || "Failed to send message.")
    }
  } catch (error) {
    toast.error("Something went wrong. Try again.")
  }

  setLoading(false)
}


  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } },
  }

  const item = {
    hidden: { opacity: 0, y: 25 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  }

  return (
    <section
      id="contact"
      className="relative isolate bg-black text-white py-20 md:py-28 px-6 overflow-x-hidden"
    >
      {/* Background Grid */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0 opacity-[0.08]
          bg-[linear-gradient(#1a1a1a_1px,transparent_1px),
          linear-gradient(90deg,#1a1a1a_1px,transparent_1px)]
          bg-[size:28px_28px]
        "
      />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="relative mx-auto max-w-6xl md:translate-x-8"
      >
        {/* Title */}
        <motion.div variants={item} className="text-center mb-12">
          <h2
            className="
              font-sans text-2xl md:text-3xl leading-tight text-[#f9f9f9]
              inline-block relative
              after:content-[''] after:block after:h-[2px]
              after:w-12 after:bg-white/70 after:mx-auto after:mt-2 after:rounded
              md:hover:after:w-24 md:after:transition-all md:after:duration-300
            "
          >
            Get In Touch
          </h2>
        </motion.div>

        {/* Form + Details */}
        <motion.div
          variants={container}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16"
        >
          {/* FORM */}
          <motion.form variants={item} onSubmit={onSubmit} className="space-y-6">
            {/* Name + Mobile */}
            <div className="flex flex-row gap-4 sm:gap-6 flex-nowrap">
              <div className="flex-1 min-w-0">
                <label htmlFor="name" className="block text-sm sm:text-base font-semibold mb-1 sm:mb-2">
                  NAME
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  name="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-transparent border-b border-white/40 py-2
                  text-sm sm:text-base focus:border-[#e63946] 
                  outline-none transition-colors"
                />
              </div>

              <div className="flex-1 min-w-0">
                <label htmlFor="mobile" className="block text-sm sm:text-base font-semibold mb-1 sm:mb-2">
                  MOBILE NO
                </label>
                <input
                  id="mobile"
                  type="tel"
                  required
                  pattern="[0-9]{10}"
                  name="mobile"
                  value={formData.mobile}
                  onChange={(e) =>
                    setFormData({ ...formData, mobile: e.target.value })
                  }
                  className="w-full bg-transparent border-b border-white/40 py-2
                  text-sm sm:text-base focus:border-[#e63946] 
                  outline-none transition-colors"
                />
              </div>
            </div>

            {/* Email + Date */}
            <div className="flex flex-row gap-4 sm:gap-6 flex-nowrap">
              <div className="flex-1 min-w-0">
                <label htmlFor="email" className="block text-sm sm:text-base font-semibold mb-1 sm:mb-2">
                  EMAIL
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  name="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full bg-transparent border-b border-white/40 py-2
                  text-sm sm:text-base focus:border-[#e63946] 
                  outline-none transition-colors"
                />
              </div>

              <div className="flex-1 min-w-0">
                <label htmlFor="date" className="block text-sm sm:text-base font-semibold mb-1 sm:mb-2">
                  DATE
                </label>
                <input
                  id="date"
                  type="date"
                  required
                  name="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className="w-full bg-transparent border-b border-white/40 py-2
                  text-sm sm:text-base focus:border-[#e63946] 
                  outline-none transition-colors [color-scheme:dark]"
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm sm:text-base font-semibold mb-1 sm:mb-2">
                WRITE YOUR MESSAGE...
              </label>
              <textarea
                id="message"
                rows="5"
                required
                name="message"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full bg-transparent border-b border-white/40 py-2
                text-sm sm:text-base focus:border-[#e63946] 
                outline-none transition-colors resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`
                mt-6 inline-flex items-center justify-center rounded-full border border-[#e63946]
                px-6 sm:px-8 py-3 text-sm sm:text-base font-semibold tracking-wide 
                transition-all duration-300
                ${
                  loading
                    ? "opacity-60 cursor-not-allowed"
                    : "hover:bg-[#e63946] hover:shadow-[0_0_20px_rgba(230,57,70,0.5)]"
                }
              `}
            >
              {loading ? "Sending..." : "SEND MESSAGE"}
            </button>
          </motion.form>

          {/* CONTACT INFO */}
          <motion.div variants={item} className="space-y-8 md:space-y-10">
            <div className="flex flex-col sm:flex-row sm:gap-6">
              <div className="flex-1 min-w-0">
                <h3 className="text-xs sm:text-sm font-semibold tracking-wide mb-1 text-white/60">
                  EMAIL
                </h3>
                <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-[#e63946]" />
                  <a
                    href="mailto:satyarajmyakam@gmail.com"
                    className="hover:text-[#e63946] transition-colors duration-300 truncate"
                  >
                    satyarajmyakam@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex-1 min-w-0 mt-4 sm:mt-0">
                <h3 className="text-xs sm:text-sm font-semibold tracking-wide mb-1 text-white/60">
                  PHONE
                </h3>
                <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-[#e63946]" />
                  <p className="truncate">+91 88300 80208</p>
                </div>
              </div>
            </div>

            {/* Address */}
            <div>
              <h3 className="text-xs sm:text-sm font-semibold tracking-wide mb-1 text-white/60">
                ADDRESS
              </h3>
              <div className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#e63946] mt-1" />
                <p>
                  Dattu Kolekar chawl <br />
                  Kombadpada, Bhiwandi, Thane
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}