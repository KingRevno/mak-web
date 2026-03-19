type LogoProps = {
  className?: string;
};

export function Logo({ className = "" }: LogoProps) {
  return (
    <span
      className={`inline-flex items-center gap-0.5 text-lg tracking-tight ${className}`}
      aria-label="Mak logo"
    >
      <span className="font-mono text-sky-200/90">{`<`}</span>
      <span className="font-semibold gradient-text">Mak</span>
      <span className="font-mono text-sky-200/90">{` />`}</span>
    </span>
  );
}
