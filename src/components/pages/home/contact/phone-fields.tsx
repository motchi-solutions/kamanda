"use client";

import { LuPlus, LuMinus } from "react-icons/lu";
import { FormSelect } from "@/components/ui/form-select";

import { useRef, useState } from "react";
import { AsYouType, getCountryCallingCode, parsePhoneNumberFromString, type CountryCode } from "libphonenumber-js";

// Static labels and ordering avoid Node/browser ICU differences during hydration.
import countries from "@/lib/contact/phone-countries.json";

export function PhoneFields({ onFieldsChange }: { onFieldsChange: () => void }) {
  const [country, setCountry] = useState<CountryCode>("AE");
  const phone = useRef<HTMLInputElement>(null);
  const [showExtension, setShowExtension] = useState(false);
  const [error, setError] = useState("");

  function format(input: HTMLInputElement, selected: CountryCode, deleting = false) {
    const previous = input.value;
    const caret = input.selectionStart ?? previous.length;
    let digitsBefore = previous.slice(0, caret).replace(/\D/g, "").length;
    const normalized = previous.trim().replace(/^00/, "+");
    let local = normalized;
    let activeCountry = selected;
    if (normalized.startsWith("+")) {
      const international = new AsYouType();
      international.input(normalized);
      const detected = international.getCountry();
      if (detected) {
        activeCountry = detected;
        const callingCode = getCountryCallingCode(detected);
        local = normalized.replace(/\D/g, "").slice(callingCode.length);
        digitsBefore = Math.max(0, digitsBefore - callingCode.length - (previous.trim().startsWith("00") ? 2 : 0));
        setCountry(detected);
        // Keep the bubbling form validation in sync before React commits state.
        const countrySelect = input.form?.elements.namedItem("phone-country");
        if (countrySelect instanceof HTMLSelectElement) countrySelect.value = detected;
      }
    }
    const gulfNumber = activeCountry === "AE" || activeCountry === "SA";
    if (gulfNumber && !local.startsWith("+")) {
      const withoutTrunk = local.replace(/^0(?=[1-9])/, "");
      if (withoutTrunk !== local) digitsBefore = Math.max(0, digitsBefore - 1);
      local = withoutTrunk;
    }
    let formatted = local;
    if (!deleting && local) {
      if (gulfNumber && !local.startsWith("+")) {
        const prefix = `+${getCountryCallingCode(activeCountry)}`;
        formatted = new AsYouType(activeCountry).input(prefix + local).slice(prefix.length).trimStart();
      } else {
        formatted = new AsYouType(activeCountry).input(local);
      }
    }
    input.value = formatted;
    if (document.activeElement === input && caret < previous.length) {
      let position = 0;
      let digits = 0;
      while (position < formatted.length && digits < digitsBefore) {
        if (/\d/.test(formatted[position])) digits++;
        position++;
      }
      input.setSelectionRange(position, position);
    }
    const parsed = parsePhoneNumberFromString(formatted, { defaultCountry: activeCountry, extract: false });
    const message = formatted && (!parsed?.isPossible() || !!parsed.ext) ? "Enter a complete phone number for the selected country." : "";
    input.setCustomValidity(message);
    return message;
  }

  return (
    <fieldset className="contact-phone min-w-0">
      <legend className="form-label contact-group-heading">Phone <span className="text-xs font-normal text-carbon/65">(Optional)</span></legend>
      <p id="phone-help" className="form-help">Enter your local number, or type/paste a full number starting with + or 00. We’ll select the country code for you.</p>
      <div className="contact-phone-grid mt-2 grid gap-3">
        <div>
          <label htmlFor="phone-country" className="form-label contact-sublabel">Country code</label>
          <FormSelect id="phone-country" name="phone-country" value={country} autoComplete="tel-country-code" aria-describedby="phone-help"
            title={countries.find((item) => item.code === country)?.name}
            className="form-control" onChange={(event) => {
              const selected = event.target.value as CountryCode;
              setCountry(selected);
              if (phone.current) {
                const parsed = parsePhoneNumberFromString(phone.current.value, country);
                if (phone.current.value.startsWith("+") && parsed) phone.current.value = parsed.nationalNumber;
                setError(format(phone.current, selected));
              }
            }}>
            {countries.map(({ code, name, callingCode }) => <option key={code} value={code} label={code === country ? `${code} (+${callingCode})` : `${name} (+${callingCode})`}>{name} (+{callingCode})</option>)}
          </FormSelect>
        </div>
        <div>
          <label htmlFor="phone" className="form-label contact-sublabel">Phone number</label>
          <input ref={phone} id="phone" name="phone" type="tel" autoComplete="tel-national" maxLength={40}
            placeholder={country === "AE" || country === "SA" ? "e.g., 56 123 4567" : "Your local phone number"}
            className="form-control" aria-describedby="phone-help phone-error" aria-invalid={!!error}
            onChange={(event) => { format(event.currentTarget, country, (event.nativeEvent as InputEvent).inputType?.startsWith("delete")); if (error) setError(event.currentTarget.validationMessage); }}
            onBlur={(event) => setError(format(event.currentTarget, country))}
            onInvalid={(event) => setError(event.currentTarget.validationMessage)} />
        </div>
      </div>
      <button type="button" className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-md border border-navy/25 bg-white px-3 text-sm font-medium text-navy transition-colors hover:border-navy/50 hover:bg-navy/5 focus-visible:outline-offset-2 motion-reduce:transition-none"
        aria-expanded={showExtension} aria-controls="phone-extension-panel"
        onClick={() => {
          setShowExtension((shown) => !shown);
          requestAnimationFrame(onFieldsChange);
        }}>
        {showExtension ? <LuMinus aria-hidden="true" className="h-4 w-4" /> : <LuPlus aria-hidden="true" className="h-4 w-4" />}
        {showExtension ? "Hide extension" : "Add extension"}
      </button>
      <div id="phone-extension-panel" className="contact-details-reveal" data-open={showExtension} inert={!showExtension}>
        <div className="min-h-0 overflow-hidden">
          <fieldset disabled={!showExtension} className="max-w-40 pt-3 pb-2">
            <label htmlFor="phone-extension" className="form-label contact-sublabel">Ext. <span className="text-xs font-normal text-carbon/65">(Optional)</span></label>
            <input id="phone-extension" name="phone-extension" type="text" inputMode="numeric" autoComplete="tel-extension"
              pattern="[0-9]{1,10}" maxLength={10} title="Use up to 10 digits for the extension." className="form-control" />
          </fieldset>
        </div>
      </div>
      <p id="phone-error" className="text-xs text-red-700 empty:hidden" aria-live="polite">{error}</p>
    </fieldset>
  );
}
