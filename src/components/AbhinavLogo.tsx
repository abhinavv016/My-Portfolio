type LogoSize = 'xl' | 'lg' | 'md' | 'sm';

interface AbhinavLogoProps {
  size?: LogoSize;
  className?: string;
}

const PALETTE = [
  "#4285F4", "#EA4335", "#FBBC04", "#4285F4", "#34A853", "#EA4335", "#4285F4",
];

const LETTERS = ["A", "b", "h", "i", "n", "a", "v"];

const sizeMap = {
  xl: "text-7xl sm:text-8xl md:text-9xl",
  lg: "text-6xl",
  md: "text-2xl",
  sm: "text-xl",
};


const AbhinavLogo = ({ size = "xl", className = "" }: AbhinavLogoProps) => {
  return (
    <h1
      className={`font-logo font-medium tracking-tight select-none ${sizeMap[size]} ${className}`}
      style={{ letterSpacing: "-0.04em" }}
      aria-label="Abhinav"
    >
      {LETTERS.map((ch, i) => (
        <span key={i} style={{ color: PALETTE[i] }}>
          {ch}
        </span>
      ))}
    </h1>
  );
};

export default AbhinavLogo;