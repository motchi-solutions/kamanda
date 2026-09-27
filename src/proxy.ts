import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import {
  REGION_COOKIE_MAX_AGE,
  REGION_COOKIE_NAME,
  type Region,
} from "@/lib/region";

const crawlerPattern =
  /bot|crawler|spider|slurp|facebookexternalhit|twitterbot|linkedinbot|slackbot|discordbot|whatsapp|applebot|pinterest|yandex|baiduspider|duckduckbot|semrush|ahrefs/i;

function setRegionCookie(response: NextResponse, region: Region) {
  response.cookies.set({
    name: REGION_COOKIE_NAME,
    value: region,
    path: "/",
    maxAge: REGION_COOKIE_MAX_AGE,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    httpOnly: false,
  });
}

function responseWithRegionCookie(region: Region) {
  const response = NextResponse.next();
  setRegionCookie(response, region);
  return response;
}

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname === "/sa") {
    return responseWithRegionCookie("sa");
  }

  if (pathname === "/ae") {
    return responseWithRegionCookie("ae");
  }

  if (pathname !== "/") {
    return NextResponse.next();
  }

  const userAgent = request.headers.get("user-agent") ?? "";
  const country = request.headers.get("x-vercel-ip-country");

  if (!crawlerPattern.test(userAgent) && country === "SA") {
    const response = NextResponse.redirect(new URL("/sa", request.url));
    setRegionCookie(response, "sa");
    return response;
  }

  return responseWithRegionCookie("ae");
}

export const config = {
  matcher: ["/", "/ae", "/sa"],
};