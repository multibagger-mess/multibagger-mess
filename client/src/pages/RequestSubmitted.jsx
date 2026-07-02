import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

import Button from "../components/ui/Button";
import { ROUTES } from "../constants/routes";

export default function RequestSubmitted() {
  return (
    <section className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      <div className="max-w-lg w-full bg-white rounded-3xl shadow-xl p-10 text-center">

        <CheckCircle2
          size={70}
          className="mx-auto text-green-500"
        />

        <h1 className="mt-6 text-4xl font-bold text-slate-900">
          Request Submitted
        </h1>

        <p className="mt-5 text-slate-600 leading-7">
          Your request has been received successfully.
        </p>

        <div className="mt-10">
          <Link to={ROUTES.HOME}>
            <Button>
              Return to Home
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
}