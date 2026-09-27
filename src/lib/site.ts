const fallbackProductionUrl = "https://kamandagroup.com";

export function getBaseUrl(): string {
  if (process.env.SITE_URL) {
    return process.env.SITE_URL;
  }

  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  }

  return fallbackProductionUrl;
}

export const siteConfig = {
  name: "Kamanda Management LLC",
  shortName: "Kamanda",
  description:
    "Kamanda Management LLC provides project management, construction support, technology and AI adoption, and specialized business solutions.",
  url: getBaseUrl(),
};
