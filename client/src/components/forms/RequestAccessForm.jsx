import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../ui/Button";
import InputField from "../ui/InputField";

import { REQUEST_ACCESS_CONTENT } from "../../constants/RequestAccessContent";
import { ROUTES } from "../../constants/routes";
import requestService from "../../services/requestService";
import {
  validateName,
  validatePhone,
} from "../../utils/validators";
import { motion } from "framer-motion";
import {
  FaUser,
  FaPhoneAlt,
  FaSpinner,
} from "react-icons/fa";

export default function RequestAccessForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    phone: "",
  });

  const [serverResponse, setServerResponse] = useState(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

 const handleChange = (field) => (event) => {

    let value = event.target.value;

    if (field === "name") {

        value = value.replace(/[^A-Za-z ]/g, "");

    }

    if (field === "phone") {

        value = value.replace(/\D/g, "").slice(0, 10);

    }

    setFormData((previous) => ({
        ...previous,
        [field]: value,
    }));

    setErrors((previous) => ({
        ...previous,
        [field]: "",
    }));

};

 const handleSubmit = async (event) => {

    event.preventDefault();

    const nameError = validateName(formData.name);
    const phoneError = validatePhone(formData.phone);

    if (nameError || phoneError) {

        setErrors({

            name: nameError,

            phone: phoneError,

        });

        return;

    }

    try {

          setServerResponse(null);

          setIsSubmitting(true);

          const response =
              await requestService.submitRequest(formData);

        if (response.success) {

            setIsSubmitting(false);

            navigate(
                ROUTES.REQUEST_SUBMITTED,
                {
                    state: {
                        phoneNumber: formData.phone,
                        name: formData.name,
                    },
                }
            );

        }

    }

    catch (error) {

    setIsSubmitting(false);

    const data = error.response?.data;

    setServerResponse(data);

}

};

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div>
        <InputField
          icon={<FaUser />}
          label={REQUEST_ACCESS_CONTENT.fields.name.label}
          placeholder={REQUEST_ACCESS_CONTENT.fields.name.placeholder}
          value={formData.name}
          onChange={handleChange("name")}
        />

        {errors.name && (
          <p className="mt-2 text-sm text-red-500">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <InputField
          icon={<FaPhoneAlt />}
          label={REQUEST_ACCESS_CONTENT.fields.phone.label}
          type="tel"
          placeholder={REQUEST_ACCESS_CONTENT.fields.phone.placeholder}
          value={formData.phone}
          onChange={handleChange("phone")}
        />

        {errors.phone && (
          <p className="mt-2 text-sm text-red-500">
            {errors.phone}
          </p>
        )}
      </div>

{serverResponse && (

<motion.div
key={serverResponse.code}
initial={{
    opacity: 0,
    y: 15,
    scale: 0.97,
}}
animate={{
    opacity: 1,
    y: 0,
    scale: 1,
}}
transition={{
    duration: 0.35,
    ease: "easeOut",
}}
className={`rounded-2xl border p-6 shadow-sm transition-all duration-300

${
serverResponse.code === "REQUEST_ALREADY_PENDING"
? "border-amber-300 bg-amber-50"

: serverResponse.code === "REQUEST_ALREADY_APPROVED"
? "border-green-300 bg-green-50"

: serverResponse.code === "REJECTION_COOLDOWN"
? "border-red-300 bg-red-50"

: "border-blue-300 bg-blue-50"

}
`}
>

<h3 className="text-xl font-bold">

{

serverResponse.code === "REQUEST_ALREADY_PENDING"

? "⏳ Request Under Review"

: serverResponse.code === "REQUEST_ALREADY_APPROVED"

? "✅ Access Already Granted"

: serverResponse.code === "REJECTION_COOLDOWN"

? "❌ Request Rejected"

: "ℹ️ Notice"

}

</h3>

<p className="mt-3 leading-7 text-slate-700">

{serverResponse.message}

</p>

{

serverResponse.code === "REJECTION_COOLDOWN" && (

<>

<p className="mt-4 font-semibold">

You may submit another request after

</p>

<div className="mt-4 space-y-3">

    <div className="inline-block rounded-lg bg-white px-4 py-2 shadow-sm">

        📅 {" "}
        {new Date(serverResponse.cooldownEnds).toLocaleDateString("en-GB", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
        })}

    </div>

    <br />

    <div className="inline-block rounded-lg bg-white px-4 py-2 shadow-sm">

        🕒 {" "}
        {new Date(serverResponse.cooldownEnds).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        })}

    </div>

</div>

</>

)

}

{

serverResponse.code === "REQUEST_ALREADY_APPROVED" && (

<div className="mt-5">

    <p className="mb-4 text-slate-700">

        🎉 Your access has already been approved.

        You can now open the complete hostel details directly.

    </p>

    <button

    onClick={() =>
        navigate(ROUTES.ACCESS_DETAILS)
    }

    className="
        w-full
        flex
        justify-center
        items-center
        gap-3
        bg-gradient-to-r
        from-green-600
        to-emerald-600
        hover:from-green-700
        hover:to-emerald-700
        text-white
        py-3
        rounded-xl
        font-semibold
        shadow-lg
        hover:scale-[1.02]
        transition-all
        duration-200
        cursor-pointer
    "

>

    🏡

    View Hostel Details

</button>

<p className="mt-3 text-sm text-slate-500 text-center">

You won't need to submit another request unless your access is revoked.

</p>

</div>

)

}

</motion.div>

)}

      <Button
    type="submit"
    disabled={isSubmitting}
    className="w-full"
>
    {isSubmitting ? (
        <>
            <FaSpinner className="animate-spin" />
            Submitting Request...
        </>
    ) : (
        REQUEST_ACCESS_CONTENT.buttonText
    )}
</Button>
    </form>
  );
}