import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "gold";
type Size = "sm" | "md" | "lg";

interface ButtonProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  fullWidth?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-blue-primary text-white border border-blue-primary hover:bg-blue-dark hover:border-blue-dark shadow-blue",
  secondary:
    "bg-white text-blue-primary border border-blue-primary hover:bg-off-white",
  ghost:
    "bg-transparent text-gold-primary border border-gold-primary/40 hover:border-gold-primary hover:bg-gold-primary/5",
  gold:
    "bg-[#C5A059] text-[#0A1628] border border-[#C5A059] shadow-gold hover:bg-[#D4AF37] hover:border-[#D4AF37]",
};

const sizeStyles: Record<Size, string> = {
  sm: "px-4 py-2 text-sm rounded-md gap-1.5",
  md: "px-6 py-3 text-base rounded-lg gap-2",
  lg: "px-8 py-4 text-lg rounded-xl gap-2.5",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  onClick,
  type = "button",
  disabled = false,
  className = "",
  fullWidth = false,
  icon,
  iconPosition = "left",
}: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={[
        "inline-flex items-center justify-center font-semibold tracking-wide",
        "transition-all duration-200 cursor-pointer select-none",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        variantStyles[variant],
        sizeStyles[size],
        fullWidth ? "w-full" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {icon && iconPosition === "left" && <span className="shrink-0">{icon}</span>}
      {children}
      {icon && iconPosition === "right" && <span className="shrink-0">{icon}</span>}
    </motion.button>
  );
}
