/* eslint-disable @next/next/no-img-element */
"use client"

import { motion } from "framer-motion"
import { Mail, Phone, MapPin } from "lucide-react"
import { useForm, ValidationError } from "@formspree/react"
import { toast } from "react-toastify"
import { useState } from "react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    message: "",
  })

  const [state, handleSubmit] = useForm("myzbewje") // <-- your Formspree form ID

  // Handle custom submit for toast + Formspree
  const onSubmit = async (e) => {
    e.preventDefault()
    await handleSubmit(e) // sends to Formspree

    if (state.succeeded) {
      toast.success("✅ Message sent successfully!")
      setFormData({ name: "", mobile: "", email: "", message: "" })
    } else if (state.errors.length > 0) {
      toast.error("⚠️ Failed to send message. Try again later.")
    }
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
    <section id="contact" className="relative isolate bg-black text-white py-20 md:py-28 px-6 overflow-x-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.08] bg-[linear-gradient(#1a1a1a_1px,transparent_1px),linear-gradient(90deg,#1a1a1a_1px,transparent_1px)] bg-[size:28px_28px]"
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
          <h2 className="font-sans text-2xl md:text-3xl leading-tight text-[#f9f9f9]">
            Get In Touch
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

        {/* Form & Contact Info */}
        <motion.div variants={container} className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          {/* FORM */}
          <motion.form variants={item} onSubmit={onSubmit} className="space-y-6">
            {/* Name + Mobile */}
            <div className="flex flex-row gap-4 sm:gap-6 flex-nowrap">
              <div className="flex-1 min-w-0">
                <label className="block text-sm sm:text-base font-semibold mb-1 sm:mb-2">NAME</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-transparent border-b border-white/40 py-2 text-sm sm:text-base focus:border-[#e63946] outline-none transition-colors"
                />
              </div>

              <div className="flex-1 min-w-0">
                <label className="block text-sm sm:text-base font-semibold mb-1 sm:mb-2">MOBILE NO</label>
                <input
                  type="tel"
                  name="mobile"
                  required
                  pattern="[0-9]{10}"
                  title="Enter a valid 10-digit mobile number"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  className="w-full bg-transparent border-b border-white/40 py-2 text-sm sm:text-base focus:border-[#e63946] outline-none transition-colors"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm sm:text-base font-semibold mb-1 sm:mb-2">EMAIL</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-transparent border-b border-white/40 py-2 text-sm sm:text-base focus:border-[#e63946] outline-none transition-colors"
              />
              <ValidationError prefix="Email" field="email" errors={state.errors} />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm sm:text-base font-semibold mb-1 sm:mb-2">WRITE YOUR MESSAGE...</label>
              <textarea
                name="message"
                rows="5"
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-transparent border-b border-white/40 py-2 text-sm sm:text-base focus:border-[#e63946] outline-none transition-colors resize-none"
              />
              <ValidationError prefix="Message" field="message" errors={state.errors} />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={state.submitting}
              className={`mt-6 inline-flex items-center justify-center rounded-full border border-[#e63946] px-6 sm:px-8 py-3 text-sm sm:text-base font-semibold tracking-wide transition-all duration-300 ${
                state.submitting
                  ? "opacity-60 cursor-not-allowed"
                  : "hover:bg-[#e63946] hover:shadow-[0_0_20px_rgba(230,57,70,0.5)]"
              }`}
            >
              {state.submitting ? "Sending..." : "SEND MESSAGE"}
            </button>
          </motion.form>

          {/* CONTACT DETAILS */}
          <motion.div variants={item} className="space-y-8 md:space-y-10">
            <div className="flex flex-col sm:flex-row sm:gap-6">
              <div className="flex-1 min-w-0">
                <h3 className="text-xs sm:text-sm font-semibold tracking-wide mb-1 text-white/60">EMAIL</h3>
                <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-[#e63946]" />
                  <a href="mailto:satyarajmyakam@gmail.com" className="hover:text-[#e63946] transition-colors duration-300 truncate">
                    satyarajmyakam@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex-1 min-w-0 mt-4 sm:mt-0">
                <h3 className="text-xs sm:text-sm font-semibold tracking-wide mb-1 text-white/60">PHONE</h3>
                <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-[#e63946]" />
                  <p className="truncate">+91 88300 80208</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xs sm:text-sm font-semibold tracking-wide mb-1 text-white/60">ADDRESS</h3>
              <div className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#e63946] mt-1" />
                <p>
                  Dattu Kolekar chawl
                  <br />
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
