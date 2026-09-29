import type { ComponentProps } from "react";
import { LuChevronDown } from "react-icons/lu";

export function FormSelect({
  children,
  className = "",
  ...props
}: ComponentProps<"select">) {
  return (
    <div className="form-select-wrap">
      <select {...props} className={`form-control ${className}`}>
        {children}
      </select>
      <LuChevronDown
        className="form-select-chevron"
        aria-hidden="true"
        focusable="false"
      />
    </div>
  );
}
