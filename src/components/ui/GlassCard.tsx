import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  glowColor?: "blue" | "purple" | "cyan" | "none";
}

export function GlassCard({
  children,
  className,
  glowColor = "none",
  ...props
}: GlassCardProps) {
  const glowClasses = {
    blue: "hover:shadow-[0_0_30px_rgba(0,240,255,0.15)]",
    purple: "hover:shadow-[0_0_30px_rgba(176,38,255,0.15)]",
    cyan: "hover:shadow-[0_0_30px_rgba(0,255,209,0.15)]",
    none: "",
  };

  return (
    <div
      className={cn(
        "glass-panel p-6 relative overflow-hidden transition-all duration-300",
        glowClasses[glowColor],
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      {children}
    </div>
  );
}
