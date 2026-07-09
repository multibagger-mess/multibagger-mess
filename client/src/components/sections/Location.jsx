import {
  MapPin,
  CheckCircle,
} from "lucide-react";

import { motion } from "framer-motion";

import SectionTitle from "../ui/SectionTitle";

import { LOCATION_CONTENT } from "../../constants/LocationContent";

export default function Location() {
  return (
    <section
      id="location"
      className="py-28 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6">

        <SectionTitle
          badge={LOCATION_CONTENT.badge}
          title={LOCATION_CONTENT.title}
          subtitle={LOCATION_CONTENT.description}
        />

        <div className="grid lg:grid-cols-5 gap-16 items-center mt-16">

          {/* LEFT */}

          <motion.div
    className="lg:col-span-2"

    initial={{
        opacity: 0,
        x: -80,
    }}

    whileInView={{
        opacity: 1,
        x: 0,
    }}

    transition={{
        duration: 0.8,
    }}

    viewport={{
        once: true,
    }}
>

  <div className="grid grid-cols-3 gap-4 mb-8">

    <div
        className="
            bg-blue-50
            rounded-2xl
            p-4
            text-center
            border
            border-blue-100
            hover:-translate-y-1
            transition-all
            duration-300
        "
    >
        <div className="text-2xl">🚶</div>

        <div className="font-bold mt-2">
            Short Walk
        </div>

        <div className="text-sm text-slate-500">
            Near J.K. College
        </div>
    </div>

    <div
        className="
            bg-green-50
            rounded-2xl
            p-4
            text-center
            border
            border-green-100
            hover:-translate-y-1
            transition-all
            duration-300
        "
    >
        <div className="text-2xl">🌿</div>

        <div className="font-bold mt-2">
            Peaceful
        </div>

        <div className="text-sm text-slate-500">
            Calm surroundings
        </div>
    </div>

    <div
        className="
            bg-orange-50
            rounded-2xl
            p-4
            text-center
            border
            border-orange-100
            hover:-translate-y-1
            transition-all
            duration-300
        "
    >
        <div className="text-2xl">🏠</div>

        <div className="font-bold mt-2">
            Verified
        </div>

        <div className="text-sm text-slate-500">
            Hostel location
        </div>
    </div>

</div>

            <div className="space-y-5">

              {LOCATION_CONTENT.highlights.map((item, index) => (

                <motion.div

    key={item}

    initial={{
        opacity:0,
        x:-20,
    }}

    whileInView={{
        opacity:1,
        x:0,
    }}

    transition={{
        duration:0.4,
        delay:index*0.15,
    }}

    viewport={{
        once:true,
    }}

    className="flex items-center gap-4"

>

                  <CheckCircle
                    className="text-blue-600"
                    size={22}
                  />

                  <span className="text-lg text-slate-700">

                    {item}

                  </span>

                </motion.div>

              ))}

            </div>

                  <a
                      href="https://maps.google.com/?q=The+Multi-Bagger+Mess"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                          mt-10
                          inline-flex
                          items-center
                          gap-3
                          bg-blue-600
                          hover:bg-blue-700
                          text-white
                          px-8
                          py-4
                          rounded-full
                          transition-all
                          hover:scale-105
                          shadow-lg
                      "
                  >

              <MapPin size={20} />

              {LOCATION_CONTENT.buttonText}


                  </a>

                <p
                    className="
                          mt-3
                          text-sm
                          text-slate-500
                          flex
                          items-center
                          gap-2
                      "
                >
                      <span>↗</span>

                      Opens Google Maps in a new tab
                </p>

            <div
    className="
        mt-8
        p-6
        rounded-2xl
        bg-gradient-to-r
        from-blue-50
        to-indigo-50
        border
        border-blue-100
    "
>

    <h3 className="font-bold text-xl text-slate-800 mb-3">

        📍 Verified Hostel Location

    </h3>

    <p className="text-slate-600 leading-7">

        Feel free to visit the hostel before making your
        decision. The location is verified and easy to
        find, helping students and parents visit with
        confidence.

    </p>

</div>

          </motion.div>

          {/* RIGHT */}

          <motion.div
    className="lg:col-span-3 flex justify-center"

    initial={{
        opacity: 0,
        x: 80,
    }}

    whileInView={{
        opacity: 1,
        x: 0,
    }}

    transition={{
        duration: 0.8,
        delay: 0.2,
    }}

    viewport={{
        once: true,
    }}
>

<div
    className="
        relative
        w-full
        rounded-[32px]
        overflow-hidden
        shadow-2xl
        border
        border-slate-200
        bg-white
        hover:shadow-[0_25px_60px_rgba(37,99,235,0.25)]
        hover:scale-[1.02]
        transition-all
        duration-500
    "
>

    <div
        className="
            absolute
            top-5
            left-5
            z-10
            bg-white/90
            backdrop-blur-md
            px-5
            py-3
            rounded-2xl
            shadow-lg
        "
    >

        <div className="font-bold text-slate-800">

            📍 The Multi-Bagger Mess

        </div>

        <div className="text-sm text-slate-500">

            Near J.K. College

        </div>

    </div>

    <div
        className="
            absolute
            bottom-5
            right-5
            z-10
            bg-green-500
            text-white
            px-4
            py-2
            rounded-full
            font-semibold
            shadow-lg
        "
    >

        🏠 Verified Hostel

    </div>

    <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d457.9961951417953!2d86.371157215218!3d23.31686315611421!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f67d822919e357%3A0x1d6c7346970afaeb!2sThe%20Multi-Bagger%20Mess!5e0!3m2!1sen!2sin!4v1783619694112!5m2!1sen!2sin"
        className="w-full h-[550px]"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
    />

</div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}