import {

    Link,

    useLocation,

} from "react-router-dom";
import { CheckCircle2, MessageCircle, Smartphone } from "lucide-react";

import Button from "../components/ui/Button";
import telegramService from "../services/telegramService";
import { ROUTES } from "../constants/routes";

export default function RequestSubmitted() {

  const location = useLocation();

  const phoneNumber =
    location.state?.phoneNumber || "";

  const name =
    location.state?.name || "";

    const handleConnectTelegram = async () => {

    try {

        const response =
            await telegramService.generateTelegramLink(
                phoneNumber
            );

        if (response.success) {

            window.open(response.telegramUrl, "_blank");

        }

    }

    catch (error) {

        console.error(error);

        alert(
            "Unable to connect Telegram at the moment."
        );

    }

};

  return (
    <section className="min-h-screen bg-slate-50 flex items-center justify-center px-6">

      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl p-10">

        {/* Success Icon */}

        <div className="flex justify-center">
          <CheckCircle2
            size={72}
            className="text-green-500"
          />
        </div>

        {/* Heading */}

        <h1 className="mt-6 text-center text-4xl font-bold text-slate-900">
          Request Received!
        </h1>

        {/* Intro */}

        <p className="mt-5 text-center text-lg text-slate-600 leading-8">
          Thank you for your interest in
          <span className="font-semibold text-slate-800">
            {" "}
            The Multi-Bagger Mess
          </span>.
        </p>

        <p className="mt-3 text-center text-slate-600 leading-7">
          Your request has been successfully received and is awaiting review.
        </p>

        {/* Divider */}

        <div className="my-10 border-t"></div>

        {/* What Happens Next */}

        <h2 className="text-2xl font-semibold text-slate-900">
          What happens next?
        </h2>

        <div className="mt-6 space-y-5">

          <div className="flex items-start gap-4">
            <div className="text-green-500 text-xl">✓</div>

            <p className="text-slate-700 leading-7">
              We'll review your request as soon as possible.
            </p>
          </div>

          <div className="flex items-start gap-4">

            <MessageCircle
              className="text-green-600"
              size={22}
            />

            <p className="text-slate-700 leading-7">
              Once approved, you'll receive a
              <strong> WhatsApp message</strong>
              with instructions to view the complete hostel details.
            </p>

          </div>

          <div className="flex items-start gap-4">

            <Smartphone
              className="text-blue-600"
              size={22}
            />

            <p className="text-slate-700 leading-7">
              You'll also receive an
              <strong> SMS notification</strong>
              confirming that your request has been approved.
            </p>

          </div>

        </div>

        {/* Blue Information Box */}

        <div className="mt-10 rounded-2xl bg-blue-50 border border-blue-200 p-6">

          <h3 className="font-semibold text-blue-700">
            Didn't receive the notification?
          </h3>

          <p className="mt-3 text-slate-700 leading-7">
            No worries.
            You can always return to the website and click
            <strong> "View Hostel Details"</strong>
            in the navigation bar.

            Enter your registered mobile number to check your approval status
            and access the complete hostel information.
          </p>

        </div>

        {/* Telegram Notification */}

<div className="mt-10 rounded-2xl border border-sky-200 bg-sky-50 p-6">

    <h3 className="text-xl font-semibold text-sky-700">

        🔔 Instant Telegram Notifications

    </h3>

    <p className="mt-3 text-slate-700 leading-7">

        You'll receive approval updates through
        <strong> WhatsApp </strong>
        and
        <strong> SMS</strong>.

    </p>

    <p className="mt-3 text-slate-700 leading-7">

        Want even faster Telegram notifications?

        Connect your Telegram account below.

    </p>

    <button

        onClick={handleConnectTelegram}

        className="

            mt-6

            rounded-full

            bg-sky-600

            px-6

            py-3

            font-medium

            text-white

            transition

            hover:bg-sky-700

        "

    >

        📲 Connect Telegram

    </button>

</div>

        {/* Review Time */}

        <div className="mt-10 text-center">

          <p className="text-sm uppercase tracking-widest text-slate-400">
            Estimated Review Time
          </p>

          <p className="mt-2 text-lg font-semibold text-slate-800">
            Usually within a few hours
          </p>

        </div>

        {/* Buttons */}

        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">

          <Link to={ROUTES.HOME}>
            <Button>
              Return to Home
            </Button>
          </Link>

          <Link to={ROUTES.ACCESS_DETAILS}>
            <button
              className="
                px-7
                py-3
                rounded-full
                border-2
                border-blue-600
                text-blue-600
                hover:bg-blue-600
                hover:text-white
                transition
                font-medium
              "
            >
              View Hostel Details
            </button>
          </Link>

        </div>

      </div>

    </section>
  );
}