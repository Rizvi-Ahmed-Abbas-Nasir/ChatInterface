import React, { useRef, useLayoutEffect } from "react";

interface SpotlightCardProps extends React.PropsWithChildren {
  className?: string;
  spotlightColor?: string;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = "",
  spotlightColor = "rgba(255, 255, 255, 0.25)",
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const element = divRef.current;
    const spotlight = spotlightRef.current;
    if (!element || !spotlight) return;

    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        spotlight.style.background = `radial-gradient(600px at ${x}px ${y}px, ${spotlightColor}, transparent 80%)`;
      });
    };

    const handleMouseEnter = () => {
      spotlight.style.opacity = "0.6";
    };
    const handleMouseLeave = () => {
      spotlight.style.opacity = "0";
    };

    element.addEventListener("mousemove", handleMouseMove, { passive: true });
    element.addEventListener("mouseenter", handleMouseEnter, { passive: true });
    element.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [spotlightColor]);

  return (
    <div
      ref={divRef}
      className={`relative rounded-3xl border border-neutral-800 bg-neutral-900 overflow-hidden p-8 transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,0,0,0.4)] ${className}`}
    >
      <div
        ref={spotlightRef}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 ease-out"
      />
      <div className="relative z-10 text-white">{children}</div>
    </div>
  );
};

export default React.memo(SpotlightCard);
