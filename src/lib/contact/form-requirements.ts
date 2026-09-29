import { isSupportedCountry, parsePhoneNumberFromString } from "libphonenumber-js";
import { isEmail } from "./validation";

export function remainingRequirements(form?: HTMLFormElement): string[] {
  const value = (name: string) => {
    const field = form?.elements.namedItem(name);
    return field && "value" in field ? String(field.value).normalize("NFKC").trim() : "";
  };
  const missing: string[] = [];
  const type = value("client-type");
  if (!type) missing.push("Choose Individual or Business");
  if (type && (!value("name") || value("name").length > 100)) missing.push("Full name");
  if (type === "business" && (!value("business-name") || value("business-name").length > 150)) missing.push("Business name");
  if (type && !isEmail(value("email"))) missing.push(type === "business" ? "Valid business email" : "Valid email address");
  if (!value("service")) missing.push("Service of interest");
  if (!value("subject") || value("subject").length > 150) missing.push("Subject (up to 150 characters)");
  if (value("message").length < 20 || value("message").length > 4000) missing.push("Message (min 20, max 4,000 characters)");
  const phone = value("phone");
  const country = value("phone-country");
  const parsed = phone && isSupportedCountry(country)
    ? parsePhoneNumberFromString(phone, { defaultCountry: country, extract: false }) : undefined;
  if (type && phone && (!parsed?.isPossible() || parsed.ext)) missing.push("Complete phone number, or leave it blank");
  const extensionField = form?.elements.namedItem("phone-extension");
  const extension = form && extensionField instanceof HTMLInputElement && !extensionField.matches(":disabled") ? value("phone-extension") : "";
  if (type && extension && (!phone || !/^\d{1,10}$/.test(extension))) missing.push("Extension: 1–10 digits with a phone number, or leave it blank");
  return missing;
}

