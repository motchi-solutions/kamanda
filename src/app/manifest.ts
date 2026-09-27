import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Kamanda Management LLC",
    short_name: "Kamanda",
    description:
      "Kamanda Management LLC provides project management, construction support, technology and AI adoption, and business solutions.",
    start_url: "/",
    display: "standalone",
    background_color: "#FAFAFA",
    theme_color: "#1B3A66",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
