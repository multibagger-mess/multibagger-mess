// Validate Full Name
export function validateName(name) {
  const trimmedName = name.trim();

  if (!trimmedName) {
    return "Name is required.";
  }

  if (trimmedName.length < 3) {
    return "Name must be at least 3 characters.";
  }

  if (trimmedName.length > 50) {
    return "Name cannot exceed 50 characters.";
  }

  return "";
}

// Validate Mobile Number
export function validatePhone(phone) {
  const trimmedPhone = phone.trim();

  if (!trimmedPhone) {
    return "Mobile number is required.";
  }

  if (!/^[0-9]+$/.test(trimmedPhone)) {
    return "Mobile number should contain only digits.";
  }

  if (trimmedPhone.length !== 10) {
    return "Mobile number must be exactly 10 digits.";
  }

  return "";
}