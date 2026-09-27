export type Region = "ae" | "sa";

export const REGION_COOKIE_NAME = "kamanda-region";
export const REGION_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export function isRegion(value: string | undefined): value is Region {
  return value === "ae" || value === "sa";
}

export function getRegionFromCookieValue(value: string | undefined): Region {
  return isRegion(value) ? value : "ae";
}
