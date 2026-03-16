interface SectionDividerProps {
  variant?: "wave" | "gradient" | "diagonal";
  direction?: "dark-to-surface" | "surface-to-dark" | "dark-to-darker" | "darker-to-dark";
  className?: string;
}

const colorMap = {
  "dark-to-surface": { from: "#0A0A0A", to: "#141414" },
  "surface-to-dark": { from: "#141414", to: "#0A0A0A" },
  "dark-to-darker": { from: "#0A0A0A", to: "#050505" },
  "darker-to-dark": { from: "#050505", to: "#0A0A0A" },
};

export default function SectionDivider({
  variant = "wave",
  direction = "dark-to-surface",
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
