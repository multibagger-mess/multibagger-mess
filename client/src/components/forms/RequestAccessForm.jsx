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

    const response = await requestService.submitRequest(formData);

if (response.success) {

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
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div>
        <InputField
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

      <Button>
        {REQUEST_ACCESS_CONTENT.buttonText}
      </Button>
    </form>
  );
}