import RequestAccessForm from "../components/forms/RequestAccessForm";
import { REQUEST_ACCESS_CONTENT } from "../constants/RequestAccessContent";
import {
  FaWhatsapp,
  FaUserGraduate,
  FaShieldAlt,
  FaBolt,
  FaHome,
  FaClipboardList,
  FaUserCheck,
  FaCheckCircle,
  FaArrowRight,
} from "react-icons/fa";

import { MdSms } from "react-icons/md";

export default function RequestAccess() {
  return (
    <section className="min-h-screen bg-slate-50 flex items-center py-20">
      <div className="max-w-6xl mx-auto px-6 w-full">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Side */}

<div className="hidden lg:flex">

    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 rounded-3xl p-10 text-white shadow-2xl w-full">

        <div className="text-5xl">

            <FaHome className="text-5xl text-blue-300" />

        </div>

        <h2 className="mt-6 text-3xl font-bold">

            The Multi-Bagger Mess

        </h2>

        <p className="mt-2 text-blue-100">

            Student Access Portal

        </p>

        <p className="mt-6 leading-8 text-slate-200">

            Request secure access to complete hostel details.

            Every request is reviewed by the administrator to

            ensure genuine student enquiries and protect

            resident privacy.

        </p>

        <div className="mt-10 space-y-5">

    <div className="flex items-center gap-3">

        <FaShieldAlt className="text-xl text-blue-300" />

        <span>Privacy Protected</span>

    </div>

    <div className="flex items-center gap-3">

        <FaBolt className="text-xl text-yellow-300" />

        <span>Fast Approval Process</span>

    </div>

    <div className="flex items-center gap-3">

        <FaUserGraduate className="text-xl text-purple-300" />

        <span>Student Verification</span>

    </div>

    <div className="flex items-center gap-3">

        <MdSms className="text-xl text-sky-300" />

        <FaWhatsapp className="text-xl text-green-400" />

        <span>SMS & WhatsApp Updates after Approval</span>

    </div>

</div>

    </div>

</div>

          {/* Right Side */}

          <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 p-10">

            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
              {REQUEST_ACCESS_CONTENT.title}
            </h1>

            <p className="mt-4 text-slate-600 leading-7">
              {REQUEST_ACCESS_CONTENT.subtitle}
            </p>

            <div className="mt-8 rounded-2xl bg-blue-50 border border-blue-100 p-6">

    <h3 className="font-semibold text-blue-900">

        How it works

    </h3>

    <div className="mt-6 flex items-center justify-between">

        {/* Request */}
        <div>

            <div className="flex justify-center">

                <FaClipboardList className="text-3xl text-blue-600 transition-transform duration-300 hover:scale-110" />

            </div>

            <p className="mt-2 text-sm">

                Request

            </p>

        </div>

        <FaArrowRight className="text-blue-300 text-lg" />

        {/* Review */}
        <div>

            <div className="flex justify-center">

                <FaUserCheck className="text-3xl text-amber-500" />

            </div>

            <p className="mt-2 text-sm">

                Review

            </p>

        </div>

        <FaArrowRight className="text-blue-300 text-lg" />

        {/* Approval */}
        <div>

            <div className="flex justify-center">

                <FaCheckCircle className="text-3xl text-green-500" />

            </div>

            <p className="mt-2 text-sm">

                Approval

            </p>

        </div>

        <FaArrowRight className="text-blue-300 text-lg" />

        {/* Details */}
        <div>

            <div className="flex justify-center">

                <FaHome className="text-3xl text-blue-500" />

            </div>

            <p className="mt-2 text-sm">

                Details

            </p>

        </div>

    </div>

</div>

            <div className="mt-10">
              <RequestAccessForm />
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}