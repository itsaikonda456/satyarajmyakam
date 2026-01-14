import React from "react";

const Pricing = () => {
  const services = [
    "Birthday Shoots",
    "Personal Shoots",
    "Wedding Shoots",
    "Wedding Films",
    "Event Coverage",
    "Vehicle Shoots",
    "Creative Edits",
    "Cinematic Color Grading",
    "Advanced Color Correction",
    "Smooth Transitions",
    "Music Sync",
    "Audio Enhancement",
    "Motion Graphics",
    "Unlimited Revisions",
    "Social Media Reels",
  ];

  return (
    <section className="w-full py-16 px-4 sm:px-6 lg:px-12 bg-black text-white">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-wide">
          Pricing
        </h2>
        <p className="mt-4 text-gray-400 text-sm sm:text-base">
          One complete cinematic editing package for all your video needs.
        </p>
      </div>

      {/* Centered Pricing Card */}
      <div className="flex justify-center">
        <div
          className="
            relative w-full max-w-md sm:max-w-lg lg:max-w-xl
            rounded-2xl border border-red-500
            bg-gradient-to-b from-[#111] to-[#0a0a0a]
            p-6 sm:p-8 lg:p-10 shadow-xl
          "
        >
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-500 text-black text-xs font-semibold px-4 py-1 rounded-full">
            All-in-One Package
          </span>

          <h3 className="text-2xl font-semibold mb-2 text-center">
            Professional Video Editing
          </h3>

          <p className="text-gray-400 text-sm text-center mb-6">
            Crafted for creators, brands & cinematic storytellers.
          </p>

          <div className="text-4xl font-bold text-center mb-8">
            ₹9,999
          </div>

          {/* Services */}
          <ul
            className="
              grid grid-cols-3        /* 📱 Mobile: 3 columns */
              gap-y-3 gap-x-4
              text-sm text-gray-300
              sm:grid-cols-3         /* 💻 Tablet */
              lg:grid-cols-3         /* 🖥 Laptop/Desktop */
            "
          >
            {services.map((service, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="w-2 h-2 mt-2 rounded-full bg-red-500 shrink-0" />
                <span className="leading-snug">{service}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
