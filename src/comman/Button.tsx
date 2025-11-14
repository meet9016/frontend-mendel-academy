import React from "react";
import clsx from "clsx";

type ButtonSize = "sm" | "md" | "lg" | "xxl";
type ButtonVariant = "primary" | "secondary" | "outline" | "danger";

interface CommonButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  variant?: ButtonVariant;
  className?: string;
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  fontSize?: number; // 👈 px size dynamic
  fontWeight?: number | string;
  pyClass?: string; // 👈 tailwind class
  pxClass?: string;
}

const CommonButton: React.FC<CommonButtonProps> = ({
  children,
  size = "md",
  variant = "primary",
  className = "",
  onClick,
  fontSize, // 👈 added
  fontWeight,
  pyClass,
  pxClass,
  ...props
}) => {
  const base =
    "ff-font font-weidth cursor-pointer inline-flex items-center justify-center rounded-md font-medium transition duration-200 focus:outline-none";

  const sizes: Record<ButtonSize, string> = {
    sm: "px-3 py-1.5",
    md: "px-4 py-2",
    lg: "",
    xxl: "w-full",
  };

  const variants: Record<ButtonVariant, string> = {
    primary: "bg-[#ffca00] hover:bg-[#e6b604] text-black",
    secondary: "bg-[#ffca00] text-black hover:bg-[#e6b604]",
    outline:
      "border border-[#ffca00] text-[#ffca00] hover:bg-[#ffca00] hover:text-black",
    danger: "bg-[#ffca00] hover:bg-[#e6b604] text-black",
  };

  return (
    <button
      onClick={onClick}
      className={clsx(
        base,
        sizes[size],
        variants[variant],
        pyClass,
        pxClass,
        className
      )}
      style={{
        fontSize: fontSize ? `${fontSize}px` : undefined, // 👈 dynamic px font size
        fontWeight: fontWeight ? fontWeight : undefined,
      }}
      {...props}
    >
      {children}
    </button>
  );
};

export default CommonButton;
