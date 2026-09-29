import { services } from "./validation";
import { getCountryCallingCode, isSupportedCountry, parsePhoneNumberFromString } from "libphonenumber-js";

export type EmailDraft = { recipients: string[]; subject: string; body: string };

export function emailDraft(fields: FormData): EmailDraft {
  const get = (name: string) => String(fields.get(name) ?? "").trim();
  const country = get("phone-country");
  const rawPhone = get("phone");
  const phone = rawPhone && isSupportedCountry(country)
    ? parsePhoneNumberFromString(rawPhone, country)?.formatInternational() || `+${getCountryCallingCode(country)} ${rawPhone}` : rawPhone;
  const service = get("service");
  return {
    recipients: service === "technology-ai" ? ["info@kamandagroup.com", "admin@motchi.ca"] : ["info@kamandagroup.com"],
    subject: get("subject"),
    body: [
      `Full name: ${get("name")}`,
      `Client type: ${get("client-type") === "business" ? "Business" : "Individual"}`,
      ...(get("client-type") === "business" ? [`Business name: ${get("business-name")}`] : []),
      `Email: ${get("email")}`,
      `Phone: ${phone || "Not provided"}${get("phone-extension") ? ` ext. ${get("phone-extension")}` : ""}`,
      `Service: ${services[service as keyof typeof services] || service}`,
      `Subject: ${get("subject")}`, "", "Message:", get("message"),
    ].join("\n"),
  };
}
