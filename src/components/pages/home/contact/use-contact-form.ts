"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import { executeV3 } from "@/lib/contact/captcha-client";
import { contactErrors, type ContactErrorCode, type ContactResponse } from "@/lib/contact/errors";
import { remainingRequirements } from "@/lib/contact/form-requirements";
import { emailDraft, type EmailDraft } from "@/lib/contact/email-draft";

const subscribe = () => () => {};

export function useContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [requirements, setRequirements] = useState<string[]>(() => remainingRequirements());
  const hydrated = useSyncExternalStore(subscribe, () => true, () => false);
  const [message, setMessage] = useState("");
  const [messageTouched, setMessageTouched] = useState(false);
  const messageLength = message.normalize("NFKC").trim().length;
  const messageInvalid = messageTouched && messageLength > 0 && (messageLength < 20 || messageLength > 4000);
  const [formReset, setFormReset] = useState(0);
  const [validationNotice, setValidationNotice] = useState("");
  const [clientType, setClientType] = useState<"individual" | "business" | "">("");
  const [busy, setBusy] = useState(false);
  const sending = useRef(false);
  const active = useRef(true);
  const challengeHeading = useRef<HTMLParagraphElement>(null);
  const [challenge, setChallenge] = useState(false);
  const [v2Token, setV2Token] = useState("");
  const [captchaReset, setCaptchaReset] = useState(0);
  const [success, setSuccess] = useState<string | null>(null);
  const [fallback, setFallback] = useState<EmailDraft | null>(null);
  const submittedDraft = useRef<EmailDraft | null>(null);
  const [notice, setNotice] = useState<{ message: string; reference?: string } | null>(null);
  const controller = useRef<AbortController | null>(null);
  const failedAttempt = useRef<{ code: ContactErrorCode; expiresAt: number } | null>(null);

  useEffect(() => {
    active.current = true;
    const frame = requestAnimationFrame(() => { if (formRef.current) setRequirements(remainingRequirements(formRef.current)); });
    return () => { cancelAnimationFrame(frame); active.current = false; controller.current?.abort(); };
  }, []);
  useEffect(() => {
    if (challenge) challengeHeading.current?.focus({ preventScroll: true });
  }, [challenge]);

  const showError = (code: ContactErrorCode) => {
    // Replaying an error must not extend the original retry window.
    const cached = failedAttempt.current;
    if (cached && performance.now() < cached.expiresAt) {
      code = cached.code;
    } else {
      failedAttempt.current = { code, expiresAt: performance.now() + 60000 };
    }
    const serviceFailure = contactErrors[code].status >= 500;
    setNotice({
      message: serviceFailure ? "Something went wrong. We couldn’t confirm your submission." : contactErrors[code].message,
      reference: contactErrors[code].shortCode,
    });
    const draft = submittedDraft.current ?? (formRef.current ? emailDraft(new FormData(formRef.current)) : null);
    if (draft) setFallback({ ...draft, body: `${draft.body}\n\nI am sending this directly since the contact form had error ${contactErrors[code].shortCode}.` });
  };

  const retry = () => {
    setFallback(null);
    setNotice(null);
    requestAnimationFrame(() => {
      if (formRef.current) {
        setRequirements(remainingRequirements(formRef.current));
        formRef.current.querySelector<HTMLInputElement>('input[name="name"]')?.focus();
      }
    });
  };

  const startAnother = () => {
    setSuccess(null);
    setNotice(null);
    setFallback(null);
    submittedDraft.current = null;
    failedAttempt.current = null;
    requestAnimationFrame(() => formRef.current?.querySelector<HTMLInputElement>('input[name="client-type"]')?.focus());
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sending.current) return;
    const form = event.currentTarget;
    const missing = remainingRequirements(form);
    setRequirements(missing);
    if (missing.length || !form.reportValidity()) return;
    const fields = new FormData(form);
    submittedDraft.current = emailDraft(fields);
    const cached = failedAttempt.current;
    if (cached && performance.now() < cached.expiresAt) {
      showError(cached.code);
      return;
    }
    failedAttempt.current = null;
    if (challenge && !v2Token) { showError("CONTACT_CAPTCHA_FAILED"); return; }
    sending.current = true;
    setBusy(true);
    setNotice(null);
    setFallback(null);
    let phase: "captcha" | "send" = "captcha";
    let timeout: ReturnType<typeof setTimeout> | undefined;
    try {
      const recaptchaToken = challenge ? v2Token : await executeV3();
      if (!active.current) return;
      phase = "send";
      const abort = new AbortController();
      controller.current = abort;
      timeout = setTimeout(() => abort.abort(), 50000);
      const response = await fetch("/api/contact", {
        method: "POST", headers: { "Content-Type": "application/json" }, signal: abort.signal,
        body: JSON.stringify({ name: fields.get("name"), email: fields.get("email"), phone: fields.get("phone") ?? "",
          phoneCountry: fields.get("phone-country") ?? "AE", phoneExtension: fields.get("phone-extension") ?? "", subject: fields.get("subject"),
          clientType: fields.get("client-type"), businessName: fields.get("business-name") ?? "", service: fields.get("service"), message: fields.get("message"),
          website: fields.get("website"), recaptchaToken, recaptchaVersion: challenge ? "v2" : "v3" }),
      });
      const result: ContactResponse = await response.json();
      if (!active.current) return;
      if (result?.ok === true && response.ok && /^KAM-\d{8}-[A-F0-9]{12}$/.test(result.referenceId)) {
        failedAttempt.current = null;
        setSuccess(result.referenceId);
        form.reset();
        setRequirements(remainingRequirements());
        setClientType("");
        setMessage("");
        setMessageTouched(false);
        setFormReset((value) => value + 1);
        setValidationNotice("");
        setChallenge(false);

      } else if (result?.ok === false && Object.hasOwn(contactErrors, result.code)) {
        if (result.code === "CONTACT_CAPTCHA_REQUIRED") {
          setChallenge(true);
          setNotice({ message: contactErrors.CONTACT_CAPTCHA_REQUIRED.message });
        } else {
          showError(result.code);
        }
      } else { showError("CONTACT_INTERNAL_ERROR"); }
    } catch {
      if (active.current) showError(phase === "captcha" ? "CONTACT_CAPTCHA_SERVICE_UNAVAILABLE" : "CONTACT_INTERNAL_ERROR");
    } finally {
      clearTimeout(timeout);
      controller.current = null;
      sending.current = false;
      if (active.current) {
        setV2Token("");
        setCaptchaReset((value) => value + 1);
        setBusy(false);
      }
    }
  };

  return { formRef, requirements, setRequirements, hydrated, message, setMessage, messageTouched, setMessageTouched, messageLength, messageInvalid, formReset, validationNotice, setValidationNotice, clientType, setClientType, busy, challengeHeading, challenge, v2Token, setV2Token, captchaReset, setCaptchaReset, notice, fallback, success, startAnother, retry, showError, submit };
}

export type ContactFormState = ReturnType<typeof useContactForm>;
