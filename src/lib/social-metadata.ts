import type { Metadata } from "next";

const images = {
  default: {
    url: "/seo/og-default.png",
    width: 1733,
    height: 908,
    alt: "Kamanda Management LLC — management, technology and business solutions",
  },
  ae: {
    url: "/seo/og-dubai.png",
    width: 1733,
    height: 908,
    alt: "Kamanda Management LLC — management, technology and business solutions with the Dubai skyline",
  },
  sa: {
    url: "/seo/og-riyadh.png",
    width: 1733,
    height: 907,
    alt: "Kamanda Management LLC in Saudi Arabia",
  },
};

export function socialMetadata({
  title,
  description,
  path,
  region = "default",
}: {
  title: string;
  description: string;
  path: string;
  region?: "default" | "ae" | "sa";
}): Pick<Metadata, "openGraph" | "twitter"> {
  return {
    openGraph: {
      type: "website",
      siteName: "Kamanda Management LLC",
      locale: region === "sa" ? "en_SA" : "en_AE",
      url: path,
      title,
      description,
      images: [images[region]],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [images[region]],
    },
  };
}
