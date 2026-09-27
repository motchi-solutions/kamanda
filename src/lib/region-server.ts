import { cookies } from "next/headers";

import {
  getRegionFromCookieValue,
  REGION_COOKIE_NAME,
  type Region,
} from "@/lib/region";

export async function getCurrentRegion(): Promise<Region> {
  const cookieStore = await cookies();
  return getRegionFromCookieValue(cookieStore.get(REGION_COOKIE_NAME)?.value);
}