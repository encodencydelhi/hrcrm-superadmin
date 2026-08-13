"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// -----------------------------------------------------------------
// FormInput — reusable input component for the Super Admin portal
// Variants:
//   "default"  → rounded-lg, h-9, border-zinc-200 (forms, settings)
//   "dark"     → dark header search bar (transparent bg, white text)
//   "filter"   → small h-8, date/filter inputs in tables
//   "search"   → search bars with icon prefix support
// -----------------------------------------------------------------

export type FormInputVariant = "default" | "dark" | "filter" | "search";

export interface FormInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: FormInputVariant;
}

const variantClasses: Record<FormInputVariant, string> = {
  default:
    "w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-[12.5px] text-zinc-800 shadow-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-colors placeholder:text-zinc-400 disabled:cursor-not-allowed disabled:opacity-50",
  dark:
    "w-full h-7 pl-8 pr-12 text-xs rounded-md border text-white placeholder:text-white/40 focus:outline-none focus:ring-1 transition-colors disabled:cursor-not-allowed disabled:opacity-50",
  filter:
    "h-8 border border-zinc-200 rounded-lg text-xs px-2 bg-white outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-100 transition-colors disabled:cursor-not-allowed disabled:opacity-50",
  search:
    "rounded-lg border border-zinc-200 bg-white pl-8 pr-3 py-2 text-[12px] text-zinc-800 shadow-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-colors placeholder:text-zinc-400 disabled:cursor-not-allowed disabled:opacity-50",
};

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ className, variant = "default", type = "text", style, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        style={style}
        className={cn(variantClasses[variant], className)}
        {...props}
      />
    );
  }
);

FormInput.displayName = "FormInput";

export { FormInput };
