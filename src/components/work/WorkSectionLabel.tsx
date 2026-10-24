export function WorkSectionLabel({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-4">
      <p className="font-mono-accent text-[11px] uppercase tracking-[0.2em] text-[#E8A9C2] sm:text-xs">
        {children}
      </p>
      <span
        className="h-px max-w-[7rem] flex-1 bg-gradient-to-r from-[#B9A6D1]/55 to-transparent"
        aria-hidden
      />
    </div>
  );
}
