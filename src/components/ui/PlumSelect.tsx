import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { soundEngine } from "../../utils/audioEngine";

export type PlumSelectOption<T extends string = string> = {
  value: T;
  label: string;
};

type PlumSelectProps<T extends string> = {
  label: string;
  value: T;
  options: readonly PlumSelectOption<T>[];
  onChange: (value: T) => void;
  required?: boolean;
};

export function PlumSelect<T extends string>({
  label,
  value,
  options,
  onChange,
  required,
}: PlumSelectProps<T>) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <label className="mb-1.5 block font-mono-accent text-[11px] uppercase tracking-wide text-[#B9A6D1]">
        {label}
        {required ? " *" : ""}
      </label>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        onClick={() => {
          soundEngine.playClick("soft");
          setOpen((o) => !o);
        }}
        className="flex w-full items-center justify-between gap-3 rounded-xl border border-[#B9A6D1]/35 bg-[#2A1830]/90 px-4 py-2.5 text-left text-sm text-[#F8F6FB] transition hover:border-[#B9A6D1]/50 focus:border-[#E8A9C2] focus:outline-none"
      >
        <span className={selected ? "" : "text-[#B9A6D1]/55"}>
          {selected?.label ?? "Select an option"}
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-[#B9A6D1] transition ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>
      {open ? (
        <ul
          id={listboxId}
          role="listbox"
          className="absolute z-30 mt-1.5 max-h-56 w-full overflow-auto rounded-xl border border-[#B9A6D1]/35 bg-[#1E1024] py-1 shadow-[0_16px_40px_rgba(0,0,0,0.45)]"
        >
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <li key={opt.value} role="option" aria-selected={isSelected}>
                <button
                  type="button"
                  className={`flex w-full items-center justify-between gap-2 px-4 py-2.5 text-left text-sm transition ${
                    isSelected
                      ? "bg-[#6B4A87]/35 text-[#F8F6FB]"
                      : "text-[#D8CCE6] hover:bg-[#2A1830]/90"
                  }`}
                  onClick={() => {
                    soundEngine.playClick("soft");
                    onChange(opt.value);
                    setOpen(false);
                  }}
                >
                  <span>{opt.label}</span>
                  {isSelected ? (
                    <Check className="h-4 w-4 shrink-0 text-[#E8A9C2]" aria-hidden />
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
