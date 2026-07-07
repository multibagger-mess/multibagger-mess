import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    BedDouble,
    Users,
    CheckCircle2,
} from "lucide-react";

import occupantService from "../../services/occupantService";

export default function HostelAvailabilityCard() {

    const [availability, setAvailability] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchAvailability = async () => {

            const response =
                await occupantService.getHostelAvailability();

            if (response.success) {

                setAvailability(response.data);

            }

            setLoading(false);

        };

        fetchAvailability();

    }, []);

    if (loading) {

        return (

            <div className="mt-12 text-center text-slate-500">

                Loading hostel availability...

            </div>

        );

    }

const {
    status,
    statusColor,
    progressColor,
} =
    availability.availableBeds === 0
        ? {
              status: "🔴 Hostel Full",
              statusColor: "text-red-600",
              progressColor: "bg-red-500",
          }
        : availability.availableBeds === 1
        ? {
              status: "🟠 Last Seat Available",
              statusColor: "text-orange-600",
              progressColor: "bg-orange-500",
          }
        : availability.availableBeds <= 3
        ? {
              status: "🟡 Limited Availability",
              statusColor: "text-yellow-600",
              progressColor: "bg-yellow-500",
          }
        : {
              status: "🟢 Seats Available",
              statusColor: "text-green-600",
              progressColor: "bg-green-500",
          };

const occupancyPercentage =
    (availability.occupiedBeds /
        availability.totalBeds) *
    100;

    return (

        <motion.section

            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12"

        >

            <div className="bg-white rounded-3xl shadow-xl p-8">

                <h2 className="text-3xl font-bold text-slate-900">

                    🛏 Hostel Availability

                </h2>

                <p className="mt-3 text-slate-600 leading-7">

                    Live availability is updated automatically whenever
                    a student joins or leaves the hostel.

                </p>

                {/* Progress Bar */}

                <div className="mt-10">

                    <div className="flex justify-between mb-2">

                        <span className="font-medium">

                            Occupancy

                        </span>

                        <span className="font-semibold">

                            {occupancyPercentage}%

                        </span>

                    </div>

                    <div className="w-full h-4 rounded-full bg-slate-200 overflow-hidden">

                        <div

                            className={`${progressColor} h-full rounded-full transition-all duration-700`}

                            style={{

                                width: `${occupancyPercentage}%`

                            }}

                        />

                    </div>

                </div>

                {/* Cards */}

                <div className="grid md:grid-cols-3 gap-6 mt-10">

                    <div className="bg-blue-50 rounded-2xl p-6">

                        <BedDouble className="text-blue-600" size={32} />

                        <h3 className="mt-4 font-semibold">

                            Total Capacity

                        </h3>

                        <p className="text-4xl font-bold mt-3">

                            {availability.totalBeds}

                        </p>

                        <p className="text-slate-500">

                            Students

                        </p>

                    </div>

                    <div className="bg-indigo-50 rounded-2xl p-6">

                        <Users className="text-indigo-600" size={32} />

                        <h3 className="mt-4 font-semibold">

                            Occupied

                        </h3>

                        <p className="text-4xl font-bold mt-3">

                            {availability.occupiedBeds}

                        </p>

                        <p className="text-slate-500">

                            Students

                        </p>

                    </div>

                    <div className="bg-green-50 rounded-2xl p-6">

                        <CheckCircle2
                            className="text-green-600"
                            size={32}
                        />

                        <h3 className="mt-4 font-semibold">

                            Available

                        </h3>

                        <p className="text-4xl font-bold mt-3">

                            {availability.availableBeds}

                        </p>

                        <p className="text-slate-500">

                            Students

                        </p>

                    </div>

                </div>

                {/* Status */}

                <div className="mt-10 border border-slate-200 rounded-2xl p-6 text-center">

                    <h3 className="text-xl font-semibold">

                        Current Status

                    </h3>

                    <p className={`mt-4 text-2xl font-bold ${statusColor}`}>

                        {status}

                    </p>

                </div>

            </div>

        </motion.section>

    );

}