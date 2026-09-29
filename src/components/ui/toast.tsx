"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { LuCheck, LuInfo, LuX } from "react-icons/lu";

export type ToastMessage = {
  id: number; kind: "success" | "error"; title: string; message: string; reference?: string;
};

const subscribe = () => () => {};

export function Toast({ message, onDismiss }: { message: ToastMessage | null; onDismiss: () => void }) {
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  const [pausedId, setPausedId] = useState<number | null>(null);
  const paused = message?.id === pausedId;
  useEffect(() => {
    if (!message || paused) return;
    const timer = setTimeout(onDismiss, message.kind === "error" ? 12000 : 8000);
    return () => clearTimeout(timer);
  }, [message, onDismiss, paused]);
  if (!mounted) return null;
  return createPortal(
    <div className="pointer-events-none fixed inset-x-4 top-[calc(var(--site-header-height)+1rem)] z-[100] sm:left-auto sm:right-6 sm:w-96" aria-live="polite" aria-atomic="true">
      {message && (
        <div className="contact-toast pointer-events-auto flex gap-3 rounded-xl border border-gold/50 bg-snow p-4 text-navy shadow-lg"
          onMouseEnter={() => setPausedId(message.id)} onMouseLeave={() => setPausedId(null)}
          onFocusCapture={() => setPausedId(message.id)} onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setPausedId(null);
          }}>
          <span className="mt-1 shrink-0 text-navy" aria-hidden="true">{message.kind === "success" ? <LuCheck /> : <LuInfo />}</span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold">{message.title}</p>
            <p className="mt-1 text-sm leading-6">{message.message}</p>
            {message.reference && <p className="mt-2 break-words text-xs text-carbon/65">{message.reference.length <= 3 ? "Error code" : "Reference"}: {message.reference}</p>}
          </div>
          <button type="button" aria-label="Dismiss notification" onClick={onDismiss} className="-m-2 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md hover:bg-navy/5 focus-visible:bg-navy/5">
            <LuX aria-hidden="true" />
          </button>
        </div>
      )}
    </div>, document.body
  );
}
