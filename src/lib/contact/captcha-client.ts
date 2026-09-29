"use client";

import { ContactError } from "./errors";

export type Recaptcha = {
  ready: (callback: () => void) => void;
  render: (element: HTMLElement, options: {
    sitekey: string; size: "compact";
    callback?: (token: string) => void;
    "expired-callback"?: () => void; "error-callback"?: () => void;
  }) => number;
  execute: (siteKey: string, options: { action: string }) => Promise<string>;
  reset: (id: number) => void;
};
declare global { interface Window { grecaptcha?: { enterprise?: Recaptcha } } }
let loading: Promise<Recaptcha> | undefined;
const unavailable = () => new ContactError("CONTACT_CAPTCHA_SERVICE_UNAVAILABLE");

export function loadCaptcha(): Promise<Recaptcha> {
  if (loading) return loading;
  const key = process.env.NEXT_PUBLIC_RECAPTCHA_V3_SITE_KEY;
  if (!key) return Promise.reject(unavailable());
  loading = new Promise<Recaptcha>((resolve, reject) => {
    const script = document.createElement("script");
    const fail = () => { clearTimeout(timer); script.remove(); loading = undefined; reject(unavailable()); };
    const timer = setTimeout(fail, 12000);
    script.src = `https://www.google.com/recaptcha/enterprise.js?render=${encodeURIComponent(key)}`;
    script.async = true;
    script.defer = true;
    script.onerror = fail;
    script.onload = () => {
      const api = window.grecaptcha?.enterprise;
      if (!api) return fail();
      api.ready(() => { clearTimeout(timer); resolve(api); });
    };
    document.head.appendChild(script);
  });
  return loading;
}

export async function executeV3(): Promise<string> {
  const key = process.env.NEXT_PUBLIC_RECAPTCHA_V3_SITE_KEY;
  if (!key) throw unavailable();
  const api = await loadCaptcha();
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([api.execute(key, { action: "contact_form" }), new Promise<never>((_, reject) => {
      timer = setTimeout(() => reject(unavailable()), 12000);
    })]);
  } catch { throw unavailable(); }
  finally { clearTimeout(timer); }
}
