"use client";

import { useEffect, useEffectEvent, useRef } from "react";
import { loadCaptcha } from "@/lib/contact/captcha-client";

export function CaptchaChallenge({ resetKey, onToken, onError }: {
  resetKey: number; onToken: (token: string) => void; onError: () => void;
}) {
  const container = useRef<HTMLDivElement>(null);
  const token = useEffectEvent(onToken);
  const error = useEffectEvent(onError);
  useEffect(() => {
    const parent = container.current;
    if (!parent) return;
    const element = document.createElement("div");
    parent.appendChild(element);
    let active = true;
    let reset: (() => void) | undefined;
    void loadCaptcha().then((api) => {
      if (!active) return;
      const key = process.env.NEXT_PUBLIC_RECAPTCHA_V2_SITE_KEY;
      if (!key) { error(); return; }
      const id = api.render(element, { sitekey: key, size: "compact",
        callback: (value) => { if (active) token(value); },
        "expired-callback": () => { if (active) token(""); },
        "error-callback": () => { if (active) { token(""); error(); } },
      });
      reset = () => api.reset(id);
    }).catch(() => { if (active) error(); });
    return () => {
      active = false;
      try { reset?.(); } catch { /* The provider may already have removed the widget. */ }
      element.remove();
    };
  }, [resetKey]);
  return <div ref={container} className="mt-4 min-h-36" />;
}
