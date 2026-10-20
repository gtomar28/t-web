type SectionLabelProps = {
  children: React.ReactNode;
  className?: string;
};

export function SectionLabel({ children, className = "" }: SectionLabelProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-plum-lavender/25 bg-plum-primary/35 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-plum-lavender ${className}`}
    >
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-plum-accent shadow-[0_0_8px_#F6CDCE]" />
      {children}
    </span>
  );
}
