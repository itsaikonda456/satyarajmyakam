import React from "react";

const Pricing = () => {
  const services = [
    "Birthday Shoots",
    "Personal Shoots",
    "Pre-Wedding & Wedding Shoots",
    "Event Coverage",
    "Vehicle Shoots",
    "Social Media Reels",
    "Political Shoots",
    "Promotional Shoot",
    "And Many More...",
  ];

  return (
    <section
      id="pricing"
      className="w-full py-16 px-4 sm:px-6 lg:px-12 bg-black text-white"
    >
      {/* Pricing Card */}
      <div className="flex justify-center">
        <div
          className="
            relative w-full max-w-md sm:max-w-lg lg:max-w-xl
            rounded-2xl border border-red-500
            bg-gradient-to-b from-[#111] to-[#0a0a0a]
            p-6 sm:p-8 lg:p-10 shadow-2xl
          "
        >
          {/* Badge */}
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-500 text-black text-[10px] sm:text-xs font-semibold px-4 py-1 rounded-full">
            Pay Per Video
          </span>

          {/* Title */}
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-2 text-center">
            Cinematic Video Editing
          </h3>

          {/* Statement */}
          <p className="text-gray-400 text-xs sm:text-sm lg:text-base text-center mb-6 leading-relaxed">
            Professional cinematic edits designed to enhance storytelling,
            engagement, and visual quality.
          </p>

          {/* Price */}
          <div className="text-center mb-8">
            <span className="text-xl sm:text-2xl font-bold">
              ₹  1,000 – 2,000
            </span>
            <p className="mt-2 text-gray-400 text-xs sm:text-sm">
              Pricing varies based on video length & complexity
            </p>
          </div>

          {/* Services */}
         <ul
  className="
    grid grid-cols-2 sm:grid-cols-3
    gap-y-3 sm:gap-y-4 gap-x-4
    text-xs sm:text-sm text-gray-300
  "
>
  {services.map((service, index) => {
    const isHighlight = service === "And Many More...";

    return (
      <li key={index} className="flex items-start gap-2">
        <span className="w-2 h-2 mt-2 rounded-full bg-red-500 shrink-0" />
        <span
          className={`leading-snug ${
            isHighlight
              ? "font-semibold text-white"
              : ""
          }`}
        >
          {service}
        </span>
      </li>
    );
  })}
</ul>

        </div>
      </div>
    </section>
  );
};

export default Pricing;
