import RequestAccessForm from "../components/forms/RequestAccessForm";
import { REQUEST_ACCESS_CONTENT } from "../constants/RequestAccessContent";

export default function RequestAccess() {
  return (
    <section className="min-h-screen bg-slate-50 flex items-center py-20">
      <div className="max-w-6xl mx-auto px-6 w-full">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Side */}

          <div className="hidden lg:flex justify-center">

            <div className="w-full max-w-md aspect-square rounded-3xl bg-gradient-to-br from-blue-100 to-blue-200 shadow-xl flex items-center justify-center">

              <div className="text-center">

                <div className="text-7xl">
                  📝
                </div>

                <h2 className="mt-6 text-2xl font-bold text-slate-700">
                  Request Access
                </h2>

                <p className="mt-3 text-slate-500">
                  Simple. Secure. Fast.
                </p>

              </div>

            </div>

          </div>

          {/* Right Side */}

          <div className="bg-white rounded-3xl shadow-xl p-10">

            <h1 className="text-4xl font-bold text-slate-900">
              {REQUEST_ACCESS_CONTENT.title}
            </h1>

            <p className="mt-4 text-slate-600 leading-7">
              {REQUEST_ACCESS_CONTENT.subtitle}
            </p>

            <div className="mt-10">
              <RequestAccessForm />
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}