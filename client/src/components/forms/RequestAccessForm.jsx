import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../ui/Button";
import InputField from "../ui/InputField";

import { REQUEST_ACCESS_CONTENT } from "../../constants/RequestAccessContent";
import { ROUTES } from "../../constants/routes";

export default function RequestAccessForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });

  const handleChange = (field) => (event) => {
    setFormData((previous) => ({
      ...previous,
      [field]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(formData);

    // Backend will be connected later.

    navigate(ROUTES.REQUEST_SUBMITTED);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <InputField
        label={REQUEST_ACCESS_CONTENT.fields.name.label}
        placeholder={REQUEST_ACCESS_CONTENT.fields.name.placeholder}
        value={formData.name}
        onChange={handleChange("name")}
        required
      />

      <InputField
        label={REQUEST_ACCESS_CONTENT.fields.phone.label}
        placeholder={REQUEST_ACCESS_CONTENT.fields.phone.placeholder}
        value={formData.phone}
        onChange={handleChange("phone")}
        required
      />

      <Button>
        {REQUEST_ACCESS_CONTENT.buttonText}
      </Button>
    </form>
  );
}