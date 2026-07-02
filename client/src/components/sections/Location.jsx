import {
  MapPin,
  CheckCircle,
} from "lucide-react";

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

        <div className="grid lg:grid-cols-2 gap-14 items-center mt-16">

          {/* LEFT */}

          <div>

            <div className="space-y-5">

              {LOCATION_CONTENT.highlights.map((item) => (

                <div
                  key={item}
                  className="flex items-center gap-4"
                >

                  <CheckCircle
                    className="text-blue-600"
                    size={22}
                  />

                  <span className="text-lg text-slate-700">

                    {item}

                  </span>

                </div>

              ))}

            </div>

            <button
              className="mt-10 inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full transition-all"
            >

              <MapPin size={20} />

              {LOCATION_CONTENT.buttonText}

            </button>

          </div>

          {/* RIGHT */}

          <div className="flex justify-center">

            <div
              className="
                w-full
                max-w-md
                aspect-square
                rounded-3xl
                bg-gradient-to-br
                from-blue-100
                to-blue-200
                shadow-xl
                flex
                items-center
                justify-center
              "
            >

              <div className="text-center">

                <div className="text-7xl">

                  🗺️

                </div>

                <h3 className="mt-4 text-2xl font-bold text-slate-700">

                  Google Map

                </h3>

                <p className="text-slate-500 mt-2">

                  Interactive Map Coming Soon

                </p>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}