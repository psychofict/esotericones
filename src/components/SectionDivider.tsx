interface SectionDividerProps {
  variant?: "wave" | "gradient" | "diagonal";
  direction?: "light-to-dark" | "dark-to-light" | "light-to-tint" | "tint-to-light";
  className?: string;
}

const colorMap = {
  "light-to-dark": { from: "#ffffff", to: "#1A1A2E" },
  "dark-to-light": { from: "#1A1A2E", to: "#ffffff" },
  "light-to-tint": { from: "#ffffff", to: "#EAF4FC" },
  "tint-to-light": { from: "#EAF4FC", to: "#ffffff" },
};

export default function SectionDivider({
  variant = "wave",
  direction = "light-to-dark",
  className = "",
}: SectionDividerProps) {
  const { from, to } = colorMap[direction];

  if (variant === "wave") {
    return (
      <div className={`relative w-full overflow-hidden leading-[0] ${className}`} aria-hidden="true">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-[calc(100%+1.3px)] h-[60px]"
        >
          <path
            d="M0,0 C300,100 900,0 1200,80 L1200,120 L0,120 Z"
            fill={to}
          />
        </svg>
        <div className="absolute inset-0" style={{ background: from }} />
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-[calc(100%+1.3px)] h-[60px] -mt-[60px]"
          style={{ zIndex: 1 }}
        >
          <path
            d="M0,0 C300,100 900,0 1200,80 L1200,120 L0,120 Z"
            fill={to}
          />
        </svg>
      </div>
    );
  }

  if (variant === "gradient") {
    return (
      <div
        className={`w-full h-24 ${className}`}
        style={{
          background: `linear-gradient(to bottom, ${from}, ${to})`,
        }}
        aria-hidden="true"
      />
    );
  }

  // diagonal
  return (
    <div
      className={`relative w-full h-20 overflow-hidden ${className}`}
      aria-hidden="true"
      style={{ background: to }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: from,
          clipPath: "polygon(0 0, 100% 0, 100% 0%, 0 100%)",
        }}
      />
    </div>
  );
}
