import { isSupportedCountry, parsePhoneNumberFromString } from "libphonenumber-js";
import { ContactError } from "./errors";

export const services = {
  "technology-ai": "Technology & AI Adoption",
  "construction-support": "Construction Support",
  "project-management": "Project Management",
  "business-solutions": "Business Solutions",
} as const;

export type Enquiry = {
  name: string; businessName: string; email: string; phone: string; subject: string; message: string;
  clientType: "individual" | "business"; service: keyof typeof services;
};
export type Submission = Enquiry & {
  website: string; recaptchaToken: string; recaptchaVersion: "v3" | "v2";
};
export const isEmail = (value: string) => value.length <= 254 && /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9.-]*[a-zA-Z0-9])?\.[a-zA-Z]{2,63}$/.test(value);

export function validate(value: unknown): Submission {
  const fail = () => { throw new ContactError("CONTACT_VALIDATION_FAILED"); };
  if (!value || typeof value !== "object" || Array.isArray(value)) return fail();
  const data = value as Record<string, unknown>;
  const keys = ["name", "businessName", "email", "phone", "phoneCountry", "phoneExtension", "subject", "message", "clientType", "service", "website", "recaptchaToken", "recaptchaVersion"];
  if (Object.keys(data).some((key) => !keys.includes(key))) return fail();
  const field = (key: string, max: number, optional = false) => {
    if (optional && data[key] === undefined) return "";
    if (typeof data[key] !== "string") return fail();
    const result = data[key].normalize("NFKC").trim();
    if ((!optional && !result) || result.length > max || /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(result)) return fail();
    return result;
  };
  const name = field("name", 100);
  const businessName = field("businessName", 150, data.clientType !== "business");
  const email = field("email", 254).toLowerCase();
  const rawPhone = field("phone", 40, true);
  const phoneCountry = field("phoneCountry", 2);
  const extension = field("phoneExtension", 10, true);
  if (!isSupportedCountry(phoneCountry) || (extension && (!/^\d{1,10}$/.test(extension) || !rawPhone))) return fail();
  const parsedPhone = rawPhone ? parsePhoneNumberFromString(rawPhone, { defaultCountry: phoneCountry, extract: false }) : undefined;
  if (rawPhone && (!parsedPhone?.isPossible() || parsedPhone.ext)) return fail();
  const phone = parsedPhone ? `${parsedPhone.number}${extension ? ` ext. ${extension}` : ""}` : "";
  const subject = field("subject", 150);
  const message = field("message", 4000);
  if (message.length < 20) return fail();
  const website = field("website", 200, true);
  if (/[\r\n]/.test(name + businessName + email + rawPhone + subject) || !isEmail(email)) return fail();
  if (data.clientType !== "individual" && data.clientType !== "business") return fail();
  if (typeof data.service !== "string" || !Object.hasOwn(services, data.service)) return fail();
  if ((data.recaptchaVersion !== "v3" && data.recaptchaVersion !== "v2") ||
    typeof data.recaptchaToken !== "string" || !data.recaptchaToken.trim() || data.recaptchaToken.length > 8192) {
    throw new ContactError("CONTACT_CAPTCHA_FAILED");
  }
  return { name, businessName: data.clientType === "business" ? businessName : "", email, phone, subject, message, website, clientType: data.clientType,
    service: data.service as keyof typeof services,
    recaptchaVersion: data.recaptchaVersion, recaptchaToken: data.recaptchaToken };
}
